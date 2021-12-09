

import ParserToken from './ParserToken';
import StaticRegExToken from './StaticRegExToken';

/**
 * A token that expects the newline RegEx defined by the parser.
 */
export default class EndOfLineToken extends ParserToken {
  static parse(parser) {
    const regex = parser.newlineRegex;
    return parser.parse(StaticRegExToken(regex));
  }

  constructor() {
    super();
    throw new Error(
        "Can't instantiate EndOfLineToken! Please use EndOfLineToken.parse()" +
      "instead"
    );
  }
}
