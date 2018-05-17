'use strict';

import ParserToken from 'assembler/Parser/ParserTokens/ParserToken';
import SequentialToken from 'assembler/Parser/ParserTokens/SequentialToken';
import ExactlyOneToken from 'assembler/Parser/ParserTokens/ExactlyOneToken';
import InstructionNameToken from './InstructionNameToken';
import InstructionParametersToken from './InstructionParametersToken';

/**
 * A token representing a single instruction.
 *
 * @param {Architecture} architecture The upper bound for the literal.
 * @return {object} An object with a .parse function.
 */
 export default function(architecture) {
   return class InstructionToken extends ParserToken {
    static parse(parser) {
      let nres = [];
      parser.parseAndMap(InstructionNameToken(architecture),
        (r) => {
          r.parser.parseAndMap(
            SequentialToken(
              "",
              {
                name: "parametersToken",
                instruction: ExactlyOneToken(
                               InstructionParametersToken(architecture,
                                                          r.instruction)
                             )
              }
            ),
            (a) => {
              nres.push(
                new InstructionToken(
                  a.parser,
                  a.sourceStart,
                  a.sourceLine,
                  a.sourcePosInLine,
                  r,
                  a.parametersToken
                )
              );
            }
          );
        }
      );
      return nres;
    }

    constructor(parser,
                sourceStart,
                sourceLine,
                sourcePosInLine,
                instructionNameToken,
                parametersToken) {
      super(parser, sourceStart, sourceLine, sourcePosInLine);
      this.instruction = instructionNameToken.instruction;
      this.parameters = parametersToken.parameterValues;
    }

    getAssembledLength() {
      let r = this.instruction.getAssembledLength(architecture,
                                                  this.parameters);
      if (r < 0) return super.getAssembledLength();
      return r;
    }

    writeAssembly(dataView, index) {
      return this.instruction.writeAssembly(architecture,
                                            this.parameters,
                                            dataView,
                                            index);
    }
  };
}
