'use strict';

import InstructionI from './InstructionI';

export default class lhu extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    let M = simulator.memory;
    let pos = R[rs] + immediate;
    R[rt] = (M[pos] << 8) + M[pos + 1];
  }

  getName() {
    return 'lhu';
  }

  getOpcode() {
    return 0x25;
  }

  isImmediateSigned() {
    return true;
  }
}
