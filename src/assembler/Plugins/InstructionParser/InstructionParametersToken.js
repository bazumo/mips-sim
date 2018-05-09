'use strict';


import ParserToken from 'assembler/Parser/ParserTokens/ParserToken';
import SequentialToken from 'assembler/Parser/ParserTokens/SequentialToken';

/**
 * A token representing an assembly instruction's parameters.
 */
export default function(architecture, instruction) {
  let ppts = instruction.getParameterParserTokens(architecture);
  let parr = [];
  for (let i = 0; i < ppts.length; i++) {
    if (i !== 0) parr = parr.concat(["", ",", ""]);
    parr.push(ppts[i]);
  }
  let Seq = SequentialToken(parr);

  return class InstructionParametersToken extends ParserToken {
    static parse(parser) {
      return parser.parseAndMap(Seq, (a) => new InstructionParametersToken(a.parser, a.sourceStart, a.sourceLine, a.sourcePosInLine, a.tokens));
    }

    constructor(parser, sourceStart, sourceLine, sourcePosInLine, parameterTokens) {
      super(parser, sourceStart, sourceLine, sourcePosInLine);
      this.parameterValues = parameterTokens.map(a => a.parameterValue).filter(a => a !== undefined);
    }
  }
}
