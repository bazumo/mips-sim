'use strict';

import InstructionI from './InstructionI';

export default class addi extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    R[rt] = R[rs] + immediate;
    // TODO Add overflow trap
  }

  getName() {
    return 'addi';
  }

  getOpcode() {
    return 0x8;
  }

  isImmediateSigned() {
    return true;
  }
}
