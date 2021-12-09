

import InstructionR from './InstructionR';

export default class subu extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = R[rs] - R[rt];
  }

  getName() {
    return 'subu';
  }

  getFunct() {
    return 0x23;
  }
}
