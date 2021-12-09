

import InstructionI from './InstructionI';

export default class sh extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    const M = simulator.memory;
    const data = R[rt];
    const pos = R[rs] + immediate;
    M[pos + 2] = data >>> 8 & 255;
    M[pos + 3] = data >>> 0 % 255;
  }

  getName() {
    return 'sh';
  }

  getOpcode() {
    return 0x38;
  }

  isImmediateSigned() {
    return true;
  }
}
