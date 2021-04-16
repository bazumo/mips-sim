'use strict';

import ParserToken from './ParserToken';
import OptionalToken from './OptionalToken';
import DummyToken from './DummyToken';

/**
 * Matches the given syntax descriptors either once or more than once, but not
   zero times. Expects the occurences to be split by splitBy (which is
   DummyToken by default). If allowSplitAtEnd is set (default true), then
   splitBy is optionally allowed at the end.
 *
 * Example: RepetitiveToken("a", ",", true) will match "a", "a,a,a" and "a,a,";
   but will not match "aa,a", "a,,a", "a, a", or ",a,a".
 *
 * @param {SyntaxDescriptor} syntaxDescriptor The syntax descriptor to be
   repeated.
 * @param {SyntaxDescriptor} splitBy The syntax descriptor that is used
   inbetween each repetition.
 * @param {boolean} allowSplitAtEnd Whether the split descriptor may be expected
   at the very end, after all repetitions.
 * @return {object} An object with a .parse function.
 */
export default function RepetitiveToken(syntaxDescriptor,
    splitBy = DummyToken,
    allowSplitAtEnd = true) {
  class Repetition extends ParserToken {
    static parse(parser) {
      return parser.parse(OptionalToken(splitBy, syntaxDescriptor, Repetition));
    }
  }

  return class RepetitiveTokenClass extends ParserToken {
    static parse(parser) {
      return parser.parse(syntaxDescriptor, Repetition,
                                      allowSplitAtEnd ? OptionalToken(splitBy) :
                                                      DummyToken);
    }

    constructor() {
      super();
      throw new Error(
          "Can't instantiate RepetitiveToken! Please use " +
        " RepetitiveToken.parse() instead"
      );
    }
  };
}
