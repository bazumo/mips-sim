

import InstructionR from './InstructionR';

export default class add extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = R[rs] - R[rt];
    // TODO Add overflow trap
  }

  getName() {
    return 'sub';
  }

  getFunct() {
    return 0x22;
  }
}
