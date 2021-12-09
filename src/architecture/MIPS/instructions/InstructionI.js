

import BinaryInstruction from 'architecture/BinaryInstruction';
// eslint-disable-next-line max-len
import RegisterParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/RegisterParameterToken';
// eslint-disable-next-line max-len
import IntegerLiteralParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/IntegerLiteralParameterToken';

/**
 * Super-class for I-type MIPS instructions
 */
export default class InstructionI extends BinaryInstruction {
  getSplitSizes() {
    return [6, 5, 5, this.isImmediateSigned() ? -16 : 16];
  }

  asMachineCode(rs, rt, immediate) {
    return this.merge(this.getOpcode(), rs, rt, immediate);
  }

  /**
   * Returns a boolean indicating whether the immediate value is a signed value
     or not. Default: false
   *
   * @return {boolean} Boolean value indicating whether the immediate value is
     signed or not.
   */
  isImmediateSigned() {
    return false;
  }

  getOpcode() {
    throw new Error("InstructionI.getOpcode() not implemented!");
  }

  getParameterParserTokens(architecture) {
    const RPT = RegisterParameterToken(architecture);
    const ILPT = IntegerLiteralParameterToken;
    const isSigned = this.isImmediateSigned();
    return [RPT, RPT, isSigned ? ILPT(-32768, 32767) : ILPT(0, 65535)];
  }

  writeAssembly(architecture, p, dataView, index) {
    return super.writeAssembly(architecture,
        [p[1], p[0], p[2]],
        dataView,
        index);
  }
}
