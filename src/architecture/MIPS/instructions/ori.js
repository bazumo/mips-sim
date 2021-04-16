'use strict';

import InstructionI from './InstructionI';

export default class andi extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    R[rt] = R[rs] | immediate;
  }

  getName() {
    return 'ori';
  }

  getOpcode() {
    return 0xd;
  }

  isImmediateSigned() {
    return true;
  }
}
