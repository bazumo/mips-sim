

import InstructionI from './InstructionI';

export default class lbu extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    R[rt] = simulator.memory[R[rs] + immediate];
  }

  getName() {
    return 'lbu';
  }

  getOpcode() {
    return 0x24;
  }

  isImmediateSigned() {
    return true;
  }
}
