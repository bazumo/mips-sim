

import ParserToken from './ParserToken';

/**
 * Matches either of the given syntax descriptors.
 *
 * @param {...SyntaxDescriptor} syntaxDescriptor Any number of syntax
   descriptors, all of whose results will be returned.
 * @return {object} An object with a .parse function.
 */
export default function(...syntaxDescriptors) {
  return class EitherToken extends ParserToken {
    static parse(parser) {
      return parser.either(...syntaxDescriptors);
    }

    constructor() {
      super();
      throw new Error(
          "Can't instantiate EitherToken! Please use EitherToken.parse() instead"
      );
    }
  };
}
