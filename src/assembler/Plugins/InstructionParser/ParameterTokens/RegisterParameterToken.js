

import ParameterParserToken from './ParameterParserToken';

/**
 * A token representing a hardware register.
 * @param {Architecture} architecture The upper bound for the literal.
 * @return {object} An object with a .parse function.
 */
export default function(architecture) {
  class RegisterParameterToken extends ParameterParserToken {
    static parse(parser) {
      const pos = parser.pos;
      const line = parser.getLineNumber();
      const posInLine = parser.getPositionInLine();

      const regnames = architecture.getRegisterNames();
      let best = undefined;
      for (const key of Object.keys(regnames)) {
        if (parser.isNext(key)) {
          if (best === undefined || key.length > best.length) {
            best = key;
          }
        }
      }

      if (best === undefined) return [];
      parser.readNext(best.length);
      return [new RegisterParameterToken(parser,
          pos,
          line,
          posInLine,
          regnames[best])];
    }
  };
  return RegisterParameterToken;
}
