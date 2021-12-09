

import InstructionI from './InstructionI';

export default class sb extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    const R = simulator.registers;
    const M = simulator.memory;
    const data = R[rt];
    const pos = R[rs] + immediate;
    M[pos + 3] = data % 255;
  }

  getName() {
    return 'sb';
  }

  getOpcode() {
    return 0x28;
  }

  isImmediateSigned() {
    return true;
  }
}
