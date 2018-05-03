'use strict';

import InstructionR from './InstructionR';

export default class jr extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    let R = simulator.registers;
    simulator.nPC = R[rs];
  }

  getName() {
    return 'jr';
  }

  getFunct() {
    return 0x8;
  }
}
