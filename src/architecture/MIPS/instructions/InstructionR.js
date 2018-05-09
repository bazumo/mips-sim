'use strict';

import BinaryInstruction from 'architecture/BinaryInstruction';
import RegisterParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/RegisterParameterToken';
import IntegerLiteralParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/IntegerLiteralParameterToken';

/**
 * Super-class for I-type MIPS instructions
 */
export default class InstructionR extends BinaryInstruction {
  getSplitSizes() {
    return [6, 5, 5, 5, 5, 6];
  }

  asMachineCode(rs, rt, rd, shamt) {
    return this.merge(0x0, rs, rt, rd, shamt, this.getFunct());
  }

  getFunct() {
    throw new Error("InstructionR.getFunct() not implemented!");
  }

  getParameterParserTokens(architecture) {
    let RPT = RegisterParameterToken(architecture);
    return [RPT, RPT, RPT, IntegerLiteralParameterToken(0, 31)];
  }
}
