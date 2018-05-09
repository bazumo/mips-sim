'use strict';

import ParserToken from './ParserToken';
import EitherToken from './EitherToken';
import EndOfFileToken from './EndOfFileToken';
import StaticRegExToken from './StaticRegExToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token that expects the newline RegEx defined by the parser.
 */
export default class EndOfLineToken extends ParserToken {
  static parse(parser) {
    let regex = parser.newlineRegex;
    return parser.parse(StaticRegExToken(regex));
  }

  constructor() {
    super();
    throw new Error("Can't instantiate EndOfLineToken! Please use EndOfLineToken.parse() instead");
  }
}
