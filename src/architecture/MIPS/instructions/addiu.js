'use strict';

import InstructionI from './InstructionI';

export default class addiu extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    R[rt] = R[rs] + this.toSigned(immediate, 16);
  }

  getName() {
    return 'addiu';
  }

  getOpcode() {
    return 0x9;
  }
}
