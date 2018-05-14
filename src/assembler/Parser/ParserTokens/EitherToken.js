'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Matches either of the given syntax descriptors.
 */
export default function(...syntaxDescriptors) {
  return class EitherToken extends ParserToken {
    static parse(parser) {
      return parser.either.apply(parser, syntaxDescriptors);
    }

    constructor() {
      super();
      throw new Error("Can't instantiate EitherToken! Please use EitherToken.parse() instead");
    }
  }
}
