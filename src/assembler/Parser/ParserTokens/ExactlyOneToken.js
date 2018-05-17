'use strict';

import ParserToken from './ParserToken';


/**
 * Matches exactly one of the given syntax descriptors. Similar to EitherToken,
   but fails if there's more than one match.
 *
 * @param {...SyntaxDescriptor} syntaxDescriptors Any number of syntax
   descriptors.
 * @return {object} An object with a .parse function.
 */
export default function(...syntaxDescriptors) {
  return class ExactlyOneToken extends ParserToken {
    static parse(parser) {
      return [parser.exactlyOne(...syntaxDescriptors)];
    }

    constructor() {
      super();
      throw new Error(
        "Can't instantiate ExactlyOneToken! Please use " +
        "ExactlyOneToken.parse() instead"
      );
    }
  };
}
