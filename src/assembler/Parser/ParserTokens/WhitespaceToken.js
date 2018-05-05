'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects one or more whitespaces. It does not assemble to anything and is therefore only useful for syntactical sugar.
 */
export default class WhitespaceToken extends ParserToken {
  static parse(parser) {
    let regex = parser.whitespaceRegex;
    let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();
    let s = parser.readRegEx(regex);
    if (s !== undefined) {
      return [new WhitespaceToken(parser, pos, line, posInLine)];
    } else {
      return [new ParserError(pos, line, posInLine, "Expected whitespace")];
    }
  }

  isAssemblable() {
    return true;
  }

  writeAssembly(arrayBuffer, index) {
    return index;
  }
}
