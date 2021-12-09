

import BinaryInstruction from 'architecture/BinaryInstruction';
// eslint-disable-next-line max-len
import IntegerLiteralParameterToken from 'assembler/Plugins/InstructionParser/ParameterTokens/IntegerLiteralParameterToken';

/**
 * Super-class for J-type MIPS instructions
 */
export default class InstructionJ extends BinaryInstruction {
  getSplitSizes() {
    return [6, 26];
  }

  asMachineCode(rs, address) {
    return this.merge(this.getOpcode(), rs, address);
  }

  getOpcode() {
    throw new Error("InstructionJ.getOpcode() not implemented!");
  }

  getParameterParserTokens(architecture) {
    return [IntegerLiteralParameterToken(-(1 << 31), (1 << 32) - 1)];
  }




  getAssembledLength(architecture, parameters) {
    return 2 * architecture.getWordSize();
  }

  writeAssembly(architecture, parameters, dataView, index) {
    index = super.writeAssembly(architecture,
        [(parameters[0] >>> 2) & ((1 << 26) - 1)],
        dataView,
        index);
    dataView.setUint8(index++, (parameters[0] >>> 24) & 0b11110000);
    return index;
  }
}
