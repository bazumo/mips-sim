'use strict';

import InstructionI from './InstructionI';

export default class bne extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    if (R[rt] !== R[rs]) {
      simulator.nPC += 4 * this.toSigned(immediate, 16);
    }
  }

  getName() {
    return 'bne';
  }

  getOpcode() {
    return 0x5;
  }
}
