'use strict';

import InstructionI from './InstructionI';

export default class sb extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    let M = simulator.memory;
    let data = R[rt];
    let pos = R[rs] + this.toSigned(immediate, 16);
    M[pos + 3] = data % 255;
  }

  getName() {
    return 'sb';
  }

  getOpcode() {
    return 0x28;
  }
}
