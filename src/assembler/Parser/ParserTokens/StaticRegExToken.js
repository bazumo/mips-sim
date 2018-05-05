'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects a static RegEx. It does not assemble to anything and is therefore only useful for syntactical sugar.
 */
export default function(regex) {
  return class StaticRegExToken extends ParserToken {
    static parse(parser) {
      let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();
      let s = parser.readRegEx(regex);
      if (s !== undefined) {
        return [new StaticRegExToken(parser, pos, line, posInLine)];
      } else {
        return [new ParserError(pos, line, posInLine, "Can't match expected regular expression " + regex)];
      }
    }

    isAssemblable() {
      return true;
    }

    writeAssembly(arrayBuffer, index) {
      return index;
    }
  }
}
