'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects a static RegEx. It does not assemble to anything and is
   therefore only useful for syntactical sugar.
 *
 * @param {RegEx} regex The RegEx to test for.
 * @return {object} An object with a .parse function.
 */
export default function(regex) {
  return class StaticRegExToken extends ParserToken {
    static parse(parser) {
      const pos = parser.pos;
      const line = parser.getLineNumber();
      const posInLine = parser.getPositionInLine();
      const s = parser.readRegEx(regex);
      if (s !== undefined) {
        return [new StaticRegExToken(parser, pos, line, posInLine)];
      } else {
        return [new ParserError(
            pos,
            line,
            posInLine,
            "Can't match expected regular expression " + regex
        )];
      }
    }

    getAssembledLength() {
      return 0;
    }

    writeAssembly(write, index) {
      return index;
    }
  };
}
