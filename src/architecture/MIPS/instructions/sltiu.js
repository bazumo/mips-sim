'use strict';

import InstructionI from './InstructionI';

export default class sltiu extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    R[rt] = R[rs] < immediate ? 1 : 0;
  }

  getName() {
    return 'sltiu';
  }

  getOpcode() {
    return 0xa;
  }
}
