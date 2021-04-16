'use strict';

import InstructionR from './InstructionR';

export default class or extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = R[rs] | R[rt];
  }

  getName() {
    return 'or';
  }

  getFunct() {
    return 0x25;
  }
}
