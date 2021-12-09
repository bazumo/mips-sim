

import EitherToken from './EitherToken';
import SequentialToken from './SequentialToken';
import DummyToken from './DummyToken';

/**
 * Matches exactly zero or one occurences of the parsing syntax descriptors.
 *
 * @param {...SyntaxDescriptor} syntaxDescriptors Any number of syntax
   descriptors, parsed sequentially.
 * @return {object} An object with a .parse function.
 */
export default function(...syntaxDescriptors) {
  return EitherToken(new SequentialToken(...syntaxDescriptors), DummyToken);
}
