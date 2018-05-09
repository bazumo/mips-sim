'use strict';

import BinaryInstruction from 'architecture/BinaryInstruction';
import RegisterParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/RegisterParameterToken';
import IntegerLiteralParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/IntegerLiteralParameterToken';

/**
 * Super-class for I-type MIPS instructions
 */
export default class InstructionI extends BinaryInstruction {
  getSplitSizes() {
    return [6, 5, 5, 16];
  }

  asMachineCode(rs, rt, immediate) {
    return this.merge(this.getOpcode(), rs, rt, immediate);
  }

  getOpcode() {
    throw new Error("InstructionI.getOpcode() not implemented!");
  }

  getParameterParserTokens(architecture) {
    let RPT = RegisterParameterToken(architecture);
    return [RPT, RPT, IntegerLiteralParameterToken(-32768, 65535)];
  }
}
