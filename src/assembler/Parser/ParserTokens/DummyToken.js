'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Dummy token. Expects everything and reads nothing. Always succeeds.
 */
export default class DummyToken extends ParserToken {
  static parse(parser) {
    return [new DummyToken(parser, parser.pos, parser.getLineNumber(), parser.getPositionInLine())];
  }

  isAssemblable() {
    return true;
  }

  writeAssembly(arrayBuffer, index) {
    return index;
  }
}
