'use strict';

import ParserToken from 'assembler/Parser/ParserTokens/ParserToken';

/**
 * A token representing a single machine instruction name.
 *
 * @param {Architecture} architecture The upper bound for the literal.
 * @return {object} An object with a .parse function.
 */
export default function(architecture) {
  return class InstructionNameToken extends ParserToken {
    static parse(parser) {
      const pos = parser.pos;
      const line = parser.getLineNumber();
      const posInLine = parser.getPositionInLine();

      const instnames = architecture.getInstructionMap();
      let best = undefined;
      for (const key of Object.keys(instnames)) {
        if (parser.isNext(key)) {
          if (best === undefined || key.length > best.length) {
            best = key;
          }
        }
      }

      if (best === undefined) return [];
      parser.readNext(best.length);
      return [new InstructionNameToken(parser,
          pos,
          line,
          posInLine,
          instnames[best])];
    }

    constructor(parser, sourceStart, sourceLine, sourcePosInLine, instruction) {
      super(parser, sourceStart, sourceLine, sourcePosInLine);
      this.instruction = instruction;
    }
  };
}
