'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects end of stream. No whitespaces are skipped. It does not
   assemble to anything and is therefore only useful for syntactical sugar.
 */
export default class EndOfStreamToken extends ParserToken {
  static parse(parser) {
    const pos = parser.pos;
    const line = parser.getLineNumber();
    const posInLine = parser.getPositionInLine();
    if (parser.isEndOfStream()) {
      return [new EndOfStreamToken(parser, pos, line, posInLine)];
    } else {
      return [new ParserError(pos, line, posInLine, "Expected end of file")];
    }
  }

  getAssembledLength() {
    return 0;
  }

  writeAssembly(dataView, index) {
    return index;
  }
}
