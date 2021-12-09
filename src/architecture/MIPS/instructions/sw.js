

import InstructionI from './InstructionI';

export default class sw extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    const M = simulator.memory;
    const data = R[rt];
    const pos = R[rs] + immediate;
    M[pos] = data >>> 24 & 255;
    M[pos + 1] = data >>> 16 & 255;
    M[pos + 2] = data >>> 8 & 255;
    M[pos + 3] = data >>> 0 % 255;
  }

  getName() {
    return 'sw';
  }

  getOpcode() {
    return 0x2b;
  }

  isImmediateSigned() {
    return true;
  }
}
