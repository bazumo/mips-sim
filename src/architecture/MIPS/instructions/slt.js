'use strict';

import InstructionR from './InstructionR';

export default class slt extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    let R = simulator.registers;
    R[rd] = this.toSigned(R[rs], 16) < this.toSigned(R[rt], 16) ? 1 : 0;
  }

  getName() {
    return 'slt';
  }

  getFunct() {
    return 0x2a;
  }
}
