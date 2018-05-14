'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';
import EitherToken from './EitherToken';
import SequentialToken from './SequentialToken';
import DummyToken from './DummyToken';

/**
 * Matches exactly zero or one occurences of the parsing syntax descriptors.
 */
export default function(...syntaxDescriptors) {
  return EitherToken(new SequentialToken(...syntaxDescriptors), DummyToken);
}
