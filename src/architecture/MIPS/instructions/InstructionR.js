'use strict';

import BinaryInstruction from 'architecture/BinaryInstruction';
// eslint-disable-next-line max-len
import RegisterParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/RegisterParameterToken';
// eslint-disable-next-line max-len
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

  /**
   * Boolean value indicating whether the shamt parameter is used or not.
     Default: false
   *
   * @return {boolean} Boolean value indicating whether the shamt parameter is
     used or not.
   */
  getUseShamt() {
    return false;
  }


  getParameterParserTokens(architecture) {
    let RPT = RegisterParameterToken(architecture);
    if (this.getUseShamt()) {
      return [RPT, RPT, IntegerLiteralParameterToken(0, 31)];
    } else {
      return [RPT, RPT, RPT];
    }
  }

  writeAssembly(architecture, p, dataView, index) {
    return super.writeAssembly(architecture,
                               this.getUseShamt() ? [p[1], p[0], p[2]]
                                                  : [p[2], p[0], p[1]],
                               dataView,
                               index);
  }
}
