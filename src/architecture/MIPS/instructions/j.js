'use strict';

import InstructionJ from './InstructionJ';

export default class j extends InstructionJ {
  apply(simulator, opcode, address) {
    let jumpAddress = simulator.memory[PC+4] & 0b11110000;
    jumpAddress <<= 24;
    jumpAddress |= address * 4;
    simulator.nPC = jumpAddress;
  }

  getName() {
    return 'j';
  }

  getOpcode() {
    return 0x2;
  }
}
