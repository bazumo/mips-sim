'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects a static String. It does not assemble to anything and is therefore only useful for syntactical sugar.
 */
export default function(str) {
  return class StaticStringToken extends ParserToken {
    static parse(parser) {
      let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();
      let s = parser.readNext(str.length);
      if (s === str) {
        return [new StaticStringToken(parser, pos, line, posInLine)];
      } else {
        return [new ParserError(pos, line, posInLine, "Expected " + str + ", received " + s)];
      }
    }

    getAssembledLength() {
      return 0;
    }

    writeAssembly(dataView, index) {
      return index;
    }
  }
}
