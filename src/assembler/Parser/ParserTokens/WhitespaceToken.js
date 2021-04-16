'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects one or more whitespaces. It does not assemble to
   anything and is therefore only useful for syntactical sugar.
 */
export default class WhitespaceToken extends ParserToken {
  static parse(parser) {
    const regex = parser.whitespaceRegex;
    const pos = parser.pos;
    const line = parser.getLineNumber();
    const posInLine = parser.getPositionInLine();
    const s = parser.readRegEx(regex);
    if (s !== undefined) {
      return [new WhitespaceToken(parser, pos, line, posInLine)];
    } else {
      return [new ParserError(pos, line, posInLine, "Expected whitespace")];
    }
  }

  getAssembledLength() {
    return 0;
  }

  writeAssembly(dataView, index) {
    return index;
  }
}
