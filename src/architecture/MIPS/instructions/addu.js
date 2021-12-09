

import InstructionR from './InstructionR';

export default class addu extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = R[rs] + R[rt];
  }

  getName() {
    return 'addu';
  }

  getFunct() {
    return 0x21;
  }
}
