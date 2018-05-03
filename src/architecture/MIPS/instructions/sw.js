'use strict';

import InstructionI from './InstructionI';

export default class sw extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    let M = simulator.memory;
    let data = R[rt];
    let pos = R[rs] + this.toSigned(immediate, 16);
    M[pos] = data >>> 24 & 255;
    M[pos + 1] = data >>> 16 & 255;
    M[pos + 2] = data >>> 8 & 255;
    M[pos + 3] = data >>> 0 % 255;
  }

  getName() {
    return 'sw';
  }

  getOpcode() {
    return 0x2b;
  }
}
