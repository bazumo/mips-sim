'use strict';

import InstructionI from './InstructionI';

export default class slti extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    R[rt] = this.toSigned(R[rs], 16) < immediate ? 1 : 0;
  }

  getName() {
    return 'slti';
  }

  getOpcode() {
    return 0xa;
  }

  isImmediateSigned() {
    return true;
  }
}
