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
    let result = undefined;
    if (opcode === 0) {
      result = instructionsR[machineCode & 0b111111];
    } else {
      result = instructionsNonR[opcode];
    }

    if (result === undefined) {
      return new Error("Undefined instruction for machine code " + this.getPrintedMachineCode(machineCode));
    }
    return result;
  }

  getPrintedMachineCode(machineCode) {
   return machineCode.toString(2);
  }

  getRegisterCount() {
    return 32;
  }

  getMemorySize() {
    return 1024;
  }
}


/**
 * Returns a big endian DataView from the given array consisting of 32-bit numbers (either normal JS array or Uint32Array).
 *
 * Please note that this is required as usual arrays use the platform's endianness; MIPS requires big endian.
 */
MipsArchitecture.array32ToDataView = function(array) {
  let view = new DataView(new ArrayBuffer(4 * array.length));
  for (let i = 0; i < array.length; i++) {
    view.setUint32(4*i, array[i], false);
  }
  return view;
}
