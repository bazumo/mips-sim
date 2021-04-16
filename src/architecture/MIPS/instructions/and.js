'use strict';

import InstructionR from './InstructionR';

export default class and extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = R[rs] & R[rt];
  }

  getName() {
    return 'and';
  }

  getFunct() {
    return 0x24;
  }
}
