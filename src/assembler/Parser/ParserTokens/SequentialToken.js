

import AssemblyError from 'assembler/AssemblyError';
import ParserToken from './ParserToken';
import DummyToken from './DummyToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Expects a sequence of tokens in that exact order. Only parses successfully if
   each individual syntax descriptor parsed successfully.
 *
 * By passing an object instead of an syntax descriptor with properties name and
   syntax descriptor, one can set an syntax descriptor name. That syntax
   descriptor can then be accessed by using SequentialToken.<name>.
 *
 * @param {...SyntaxDescriptor} syntaxDescriptor Any number of syntax
   descriptors, all of whose results will be returned.
 * @return {object} An object with a .parse function.
 */
export default function(...syntaxDescriptors) {
  return iterableConstructor(syntaxDescriptors);
}


export function iterableConstructor(iterable) {
  return class SequentialTokenInstanceClass extends SequentialToken {
    static parse(parser) {
      const pos = parser.pos;
      const line = parser.getLineNumber();
      const posInLine = parser.getPositionInLine();
      let stp = [[parser, [], {}]];
      const res = [];

      for (const instruction of iterable) {
        const ntp = [];
        for (const tp of stp) {
          const nparser = tp[0];
          let inst = instruction;
          let name = undefined;
          if (typeof inst === 'object' && inst !== null &&
                                       inst.name !== undefined &&
                                       inst.instruction !== undefined) {
            name = inst.name;
            inst = inst.instruction;
          }
          const ret = nparser.parse(inst);
          for (const r of ret) {
            if (r instanceof ParserError) {
              res.push(r);
            } else {
              let narr = tp[1];
              /* If the token is another SequentialToken, we want to split it
                 in pieces.
               * This is solely due to performance reasons; long chains of
                 recursion can cause stack overflows, slow parsing, and memory
                 issues. By splitting SequentialTokens that are children of
                 another SequentialToken we highly reduce recursion as created
                 by eg. RepetitiveToken.
               */
              if (r instanceof SequentialToken) {
                narr = narr.concat(r.tokens);

              // We also disregard dummy tokens for performance reasons
              } else if (!(r instanceof DummyToken)) {
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
        // Iterable might have an infinite length, so break when we're done
        if (stp.length === 0) break;
      }

      for (const tp of stp) {
        res.push(
            new SequentialToken(tp[0], pos, line, posInLine, tp[1], tp[2])
        );
      }
      return res;
    }
  };
}



class SequentialToken extends ParserToken {

  constructor(parser,
      sourceStart,
      sourceLine,
      sourcePosInLine,
      tokens,
      objNamed) {
    super(parser, sourceStart, sourceLine, sourcePosInLine);
    this.tokens = tokens;
    Object.assign(this, objNamed);
  }

  getAssembledLength() {
    let res = 0;
    for (const token of this.tokens) {
      const r = token.getAssembledLength();
      if (r instanceof AssemblyError) {
        return r;
      }
      res += r;
    }
    return res;
  }

  writeAssembly(write, index) {
    for (const token of this.tokens) {
      index = token.writeAssembly(write, index);
    }
    return index;
  }
}
