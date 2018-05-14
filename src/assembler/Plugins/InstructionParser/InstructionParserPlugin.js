'use strict';

import AssemblerPlugin from 'assembler/Plugins/AssemblerPlugin';
import RepetitiveToken from 'assembler/Parser/ParserTokens/RepetitiveToken';
import EndOfLineToken from 'assembler/Parser/ParserTokens/EndOfLineToken';
import InstructionToken from './InstructionToken';

/**
 * Implementation of AssemblerPlugin parsing assembler instructions in the following format: [instruction_name] [arg_1], [arg_2], [...], [arg_n]
 */
export default class InstructionParserPlugin extends AssemblerPlugin {
  constructor(architecture) {
    super(architecture);
    this.architecture = architecture;
  }

  getTopLevelParserSyntax() {
    return [
      ["", RepetitiveToken(InstructionToken(this.architecture), EndOfLineToken), null]
    ];
  }
}
