

import InstructionI from './InstructionI';

export default class beq extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    if (R[rt] === R[rs]) {
      simulator.nPC += 4 * immediate;
    }
  }

  getName() {
    return 'beq';
  }

  getOpcode() {
    return 0x4;
  }
}
