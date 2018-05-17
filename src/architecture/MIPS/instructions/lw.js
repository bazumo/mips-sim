'use strict';

import InstructionI from './InstructionI';

export default class lw extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    let M = simulator.memory;
    let pos = R[rs] + immediate;
    R[rt] = (M[pos] << 24)
          + (M[pos + 1] << 16)
          + (M[pos + 2] << 8)
          + M[pos + 3];
  }

  getName() {
    return 'lw';
  }

  getOpcode() {
    return 0x23;
  }

  isImmediateSigned() {
    return true;
  }
}
