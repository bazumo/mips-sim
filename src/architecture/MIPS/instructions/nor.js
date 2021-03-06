

import InstructionR from './InstructionR';

export default class nor extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = !(R[rs] | R[rt]);
  }

  getName() {
    return 'nor';
  }

  getFunct() {
    return 0x27;
  }
}
