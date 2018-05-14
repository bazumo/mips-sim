'use strict';

import ParserToken from 'assembler/Parser/ParserTokens/ParserToken';
import AssemblyError from 'assembler/AssemblyError';

/**
 * A token representing a single machine instruction name.
 */
export default function(architecture) {
  return class InstructionNameToken extends ParserToken {
    static parse(parser) {
      let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();

      let instnames = architecture.getInstructionMap();
      let best = undefined;
      for (let key of Object.keys(instnames)) {
        if (parser.isNext(key)) {
          if (best === undefined || key.length > best.length) {
            best = key;
          }
        }
      }

      if (best === undefined) return [];
      parser.readNext(best.length);
      return [new InstructionNameToken(parser, pos, line, posInLine, instnames[best])];
    }

    constructor(parser, sourceStart, sourceLine, sourcePosInLine, instruction) {
      super(parser, sourceStart, sourceLine, sourcePosInLine);
      this.instruction = instruction;
    }

  }
}
