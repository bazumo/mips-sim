'use strict';

import BinaryInstruction from 'architecture/BinaryInstruction';

/**
 * Super-class for I-type MIPS instructions
 */
export default class InstructionI extends BinaryInstruction {
  getSplitSizes() {
    return [6, 5, 5, -16];
  }

  asMachineCode(rs, rt, immediate) {
    return this.merge(this.getOpcode(), rs, rt, immediate);
  }

  getOpcode() {
    throw new Error("InstructionI.getOpcode() not implemented!");
  }
}
