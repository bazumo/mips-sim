

import ParserToken from 'assembler/Parser/ParserTokens/ParserToken';

/**
 * An abstract token class representing a parameter.
 */
export default class ParameterParserToken extends ParserToken {
  constructor(parser, sourceStart, sourceLine, sourcePosInLine, value) {
    super(parser, sourceStart, sourceLine, sourcePosInLine);
    if (value === undefined) {
      throw new Error("Parameter value may not be " + value +
                      "! If this is intentional, use null instead");
    }
    this.parameterValue = value;
  }
}
