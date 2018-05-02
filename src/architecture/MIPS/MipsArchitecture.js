'use strict';

import Architecture from 'architecture/Architecture';
import MipsInstructions from './MipsInstructions';
import InstructionR from './instructions/InstructionR';



const allInstructions = Object.values(MipsInstructions);

const instructionsR = {};
const instructionsNonR = {};

for (let instr of allInstructions) {
  if (instr instanceof InstructionR) {
    instructionsR[instr.getFunct()] = instr;
  } else {
    instructionsNonR[instr.getOpcode()] = instr;
  }
}


/**
 * Class describing the MIPS architecture
 */
export default class MipsArchitecture extends Architecture {
  getInstructions() {
    return allInstructions;
  }

  getInstructionFor(machineCode) {
    let opcode = machineCode >> 26;
    if (opcode === 0) {
      return instructionsR[machineCode & 0b111111];
    } else {
      return instructionsNonR[opcode];
    }
  }

  executeMachineCode(simulator, machineCode) {
    this.getInstructionFor(machineCode).run(simulator, machineCode);
  }

  getRegisterCount() {
    return 32;
  }

  getMemorySize() {
    return 1024;
  }
}
