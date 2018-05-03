'use strict';

import InstructionR from './InstructionR';

export default class add extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    let R = simulator.registers;
    R[rd] = R[rs] + R[rt];
  }

  getName() {
    return 'add';
  }

  getFunct() {
    return 0x20;
  }
}
