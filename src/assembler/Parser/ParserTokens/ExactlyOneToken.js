'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Matches exactly one of the given syntax descriptors. Similar to EitherToken, but fails if there's more than one match.
 */
export default function(...instructions) {
  return class ExactlyOneToken extends ParserToken {
    static parse(parser) {
      return [parser.exactlyOne.apply(parser, instructions)];
    }

    constructor() {
      super();
      throw new Error("Can't instantiate ExactlyOneToken! Please use ExactlyOneToken.parse() instead");
    }
  }
}
