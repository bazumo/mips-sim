'use strict';

import InstructionI from './InstructionI';

export default class addi extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    R[rt] = R[rs] + immediate;
  }

  getName() {
    return 'addi';
  }

  getOpcode() {
    return 0x8;
  }
}
