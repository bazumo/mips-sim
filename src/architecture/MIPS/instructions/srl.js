

import InstructionR from './InstructionR';

export default class srl extends InstructionR {
  apply(simulator, opcode, rs, rt, rd, shamt, funct) {
    const R = simulator.registers;
    R[rd] = R[rt] >>> shamt;
  }

  getName() {
    return 'srl';
  }

  getFunct() {
    return 0x2;
  }

  getUseShamt() {
    return true;
  }
}
