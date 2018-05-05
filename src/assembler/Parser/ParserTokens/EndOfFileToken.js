'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects end of file. No whitespaces are skipped. It does not assemble to anything and is therefore only useful for syntactical sugar.
 */
export default class EndOfFileToken extends ParserToken {
  static parse(parser) {
    let regex = parser.whitespaceRegex;
    let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();
    if (parser.isEndOfFile()) {
      return [new EndOfFileToken(parser, pos, line, posInLine)];
    } else {
      return [new ParserError(pos, line, posInLine, "Expected end of file")];
    }
  }

  isAssemblable() {
    return true;
  }

  writeAssembly(arrayBuffer, index) {
    return index;
  }
}
