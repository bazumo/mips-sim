'use strict';

import InstructionI from './InstructionI';

export default class lui extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    R[rt] = immediate << 16;
  }

  getName() {
    return 'lui';
  }

  getOpcode() {
    return 0xf;
  }
}
