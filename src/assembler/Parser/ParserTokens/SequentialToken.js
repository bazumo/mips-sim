'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Expects a sequence of tokens in that exact order. Only parses successfully if each individual instruction parsed successfully.
 */
export default function(...instructions) {
  return class SequentialToken extends ParserToken {
    static parse(parser) {
      let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();
      let stp = [[parser, []]];
      let res = [];

      for (let instruction of instructions) {
        let ntp = [];
        for (let tp of stp) {
          let nparser = tp[0];
          let ret = nparser.parse(instruction);
          for (let r of ret) {
            if (r instanceof ParserError) {
              res.push(r);
            } else {
              let narr = tp[1].slice();
              narr.push(r);
              ntp.push([r.parser, narr]);
            }
          }
        }
        stp = ntp;
      }

      for (let tp of stp) {
        res.push(new SequentialToken(tp[0], pos, line, posInLine, tp[1]));
      }
      return res;
    }

    constructor(parser, sourceStart, sourceLine, sourcePosInLine, tokens) {
      super(parser, sourceStart, sourceLine, sourcePosInLine);
      this.tokens = tokens;
    }

    isAssemblable() {
      return true;
    }

    writeAssembly(arrayBuffer, index) {
      for (let token of this.tokens) {
        let res = token.writeAssembly(arrayBuffer, index);
        if (res instanceof AssemblyError) {
          return res;
        }
        index = res;
      }
      return index;
    }
  }
}
