'use strict';

import InstructionR from './InstructionR';

export default class sll extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = R[rt] << shamt;
  }

  getName() {
    return 'sll';
  }

  getFunct() {
    return 0x0;
  }

  getUseShamt() {
    return true;
  }
}
