'use strict';

import ParserToken from './ParserToken';
import ParserError from 'assembler/Parser/ParserError';
import EitherToken from './EitherToken';
import DummyToken from './DummyToken';

/**
 * Matches exactly zero or one occurences of the parsing instruction.
 */
export default function(instruction) {
  return EitherToken(instruction, DummyToken);
}
