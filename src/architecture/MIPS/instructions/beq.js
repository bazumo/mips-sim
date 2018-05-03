'use strict';

import InstructionI from './InstructionI';

export default class beq extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    if (R[rt] === R[rs]) {
      simulator.nPC += 4 * this.toSigned(immediate, 16);
    }
  }

  getName() {
    return 'beq';
  }

  getOpcode() {
    return 0x4;
  }
}
