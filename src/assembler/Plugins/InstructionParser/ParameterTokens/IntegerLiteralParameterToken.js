'use strict';

import ParameterParserToken from './ParameterParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token representing an integer literal parameter in the range [min, max].
 * @param {number} min The lower bound for the literal.
 * @param {number} max The upper bound for the literal.
 * @return {object} An object with a .parse function.
 */
export default function(min, max) {
  return class IntegerLiteralParameterToken extends ParameterParserToken {
    static parse(parser) {
      const pos = parser.pos;
      const line = parser.getLineNumber();
      const posInLine = parser.getPositionInLine();

      // eslint-disable-next-line max-len
      // let regex = /-?((0d|d|)[0-9_]+|(0h|0x|&h|h)[0-9a-f_]+|(0b|&b|b)[01_]+|(0o|&o|o)[0-7_]+)/i; // TODO Write a more advanced number parser allowing for binary and octal
      const regex = /-?(0x[0-9a-f]+|[0-9]+)/i;
      const s = parser.readRegEx(regex);
      if (s === undefined) return [];

      const parsed = parseInt(s);
      if (parsed < min || parsed > max) {
        return [new ParserError(parser,
            "Integer literal " + parsed +
                                 " out of bounds [" + min + ", " + max + "]")];
      }

      return [new IntegerLiteralParameterToken(parser,
          pos,
          line,
          posInLine,
          parsed)];
    }
  };
}
