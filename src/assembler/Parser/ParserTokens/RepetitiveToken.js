'use strict';

import ParserToken from './ParserToken';
import SequentialToken from './SequentialToken';
import OptionalToken from './OptionalToken';
import DummyToken from './DummyToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * Matches the given syntax descriptors either once or more than once, but not zero times. Expects the occurences to be split by splitBy (which is DummyToken by default). If allowSplitAtEnd is set (default true), then splitBy is optionally allowed at the end.
 *
 * Example: RepetitiveToken("a", ",", true) will match "a", "a,a,a" and "a,a,", but will not match "aa,a", "a,,a", "a, a", or ",a,a".
 */
export default function RepetitiveToken(syntaxDescriptors, splitBy = DummyToken, allowSplitAtEnd = true) {
  class Repetition extends ParserToken {
    static parse(parser) {
      return parser.parse(OptionalToken(splitBy, syntaxDescriptors, Repetition));
    }
  }

  return class RepetitiveTokenClass extends ParserToken {
    static parse(parser) {
      return parser.parse(syntaxDescriptors, Repetition, allowSplitAtEnd ? OptionalToken(splitBy) : DummyToken);
    }

    constructor() {
      super();
      throw new Error("Can't instantiate RepetitiveToken! Please use RepetitiveToken.parse() instead");
    }
  }
}
