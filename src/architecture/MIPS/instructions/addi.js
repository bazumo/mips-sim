'use strict';

import InstructionI from './InstructionI';

export default class addi extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    R[rt] = R[rs] + this.toSigned(immediate, 16);
    // TODO Add overflow trap
  }

  getName() {
    return 'addi';
  }

  getOpcode() {
    return 0x8;
  }
}
