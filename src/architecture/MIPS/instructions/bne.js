

import InstructionI from './InstructionI';

export default class bne extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    if (R[rt] !== R[rs]) {
      simulator.nPC += 4 * immediate;
    }
  }

  getName() {
    return 'bne';
  }

  getOpcode() {
    return 0x5;
  }
}
