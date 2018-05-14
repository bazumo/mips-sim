'use strict';

import AssemblyError from 'assembler/AssemblyError';
import ParserToken from './ParserToken';
import DummyToken from './DummyToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Expects a sequence of tokens in that exact order. Only parses successfully if each individual syntax descriptor parsed successfully.
 *
 * By passing an object instead of an syntax descriptor with properties name and syntax descriptor, one can set an syntax descriptor name. That syntax descriptor can then be accessed by using SequentialToken.<name>.
 */
export default function(...syntaxDescriptors) {
  return iterableConstructor(syntaxDescriptors);
}


export function iterableConstructor(iterable) {
  return class SequentialTokenInstanceClass extends SequentialToken {
    static parse(parser) {
      let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();
      let stp = [[parser, [], {}]];
      let res = [];

      for (let instruction of iterable) {
        let ntp = [];
        for (let tp of stp) {
          let nparser = tp[0];
          let inst = instruction;
          let name = undefined;
          if (typeof inst === 'object' && inst !== null && inst.name !== undefined && inst.instruction !== undefined) {
            name = inst.name;
            inst = inst.instruction;
          }
          let ret = nparser.parse(inst);
          for (let r of ret) {
            if (r instanceof ParserError) {
              res.push(r);
            } else {
              let narr = tp[1];
              // If the token is another SequentialToken, we want to split it in pieces.
              // This is solely due to performance reasons; long chains of recursion can cause
              // stack overflows, slow parsing, and memory issues. By splitting SequentialTokens
              // that are children of another SequentialToken we highly reduce recursion as created
              // by eg. RepetitiveToken.
              if (r instanceof SequentialToken) {
                narr = narr.concat(r.tokens);
              } else if (!(r instanceof DummyToken)) {  // We also disregard dummy tokens for performance reasons
                narr = narr.slice();
                narr.push(r);
              }
              let nobj = tp[2];
              if (name !== undefined) {
                nobj = {...tp[2]};
                nobj[name] = r;
              }
              ntp.push([r.parser, narr, nobj]);
            }
          }
        }
        stp = ntp;
        if (stp.length === 0) break; // Iterable might have an infinite length, so break when we're done
      }

      for (let tp of stp) {
        res.push(new SequentialToken(tp[0], pos, line, posInLine, tp[1], tp[2]));
      }
      return res;
    }
  }
}



class SequentialToken extends ParserToken {

  constructor(parser, sourceStart, sourceLine, sourcePosInLine, tokens, objNamed) {
    super(parser, sourceStart, sourceLine, sourcePosInLine);
    this.tokens = tokens;
    Object.assign(this, objNamed);
  }

  getAssembledLength() {
    let res = 0;
    for (let token of this.tokens) {
      let r = token.getAssembledLength();
      if (r instanceof AssemblyError) {
        return r;
      }
      res += r;
    }
    return res;
  }

  writeAssembly(dataView, index) {
    for (let token of this.tokens) {
      index = token.writeAssembly(dataView, index);
    }
    return index;
  }
}
