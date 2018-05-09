'use strict';

import InstructionI from './InstructionI';

export default class addiu extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    R[rt] = R[rs] + immediate;
  }

  getName() {
    return 'addiu';
  }

  getOpcode() {
    return 0x9;
  }

  isImmediateSigned() {
    return true;
  }
}
