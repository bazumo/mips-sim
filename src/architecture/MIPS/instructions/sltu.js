'use strict';

import InstructionR from './InstructionR';

export default class sltu extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    let R = simulator.registers;
    R[rd] = R[rs] < R[rt] ? 1 : 0;
  }

  getName() {
    return 'sltu';
  }

  getFunct() {
    return 0x2b;
  }
}
