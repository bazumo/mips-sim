'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Matches either of the given instructions.
 */
export default function(...instructions) {
  return class EitherToken extends ParserToken {
    static parse(parser) {
      return parser.either.apply(parser, instructions);
    }

    constructor() {
      super();
      throw new Error("Can't instantiate EitherToken! Please use EitherToken.parse() instead");
    }
  }
}
