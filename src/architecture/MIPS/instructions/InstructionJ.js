'use strict';

import BinaryInstruction from 'architecture/BinaryInstruction';

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
}
