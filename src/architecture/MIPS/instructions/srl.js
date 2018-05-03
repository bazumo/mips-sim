'use strict';

import InstructionR from './InstructionR';

export default class srl extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    let R = simulator.registers;
    R[rd] = R[rs] >>> shamt;
  }

  getName() {
    return 'srl';
  }

  getFunct() {
    return 0x2;
  }
}
