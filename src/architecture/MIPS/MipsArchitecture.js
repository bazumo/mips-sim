

import Architecture from 'architecture/Architecture';
import MipsInstructions from './MipsInstructions';
import MipsRegisters from './MipsRegisters';
import InstructionR from './instructions/InstructionR';
// eslint-disable-next-line max-len
import InstructionParserPlugin from 'assembler/Plugins/InstructionParser/InstructionParserPlugin';



const allInstructions = Object.values(MipsInstructions);

const instructionsR = {};
const instructionsNonR = {};

for (const instr of allInstructions) {
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
  constructor(memorySize = 1024) {
    super();
    this.memorySize = memorySize;
    this.assemblerPlugins = [
      new InstructionParserPlugin(this)
    ];
  }

  getInstructions() {
    return allInstructions;
  }

  getInstructionMap() {
    return MipsInstructions;
  }

  getWordSize() {
    return 4;
  }

  getEndianness(n) {
    return Architecture.Endianness.BIG_ENDIAN(n);
  }

  getInstructionFor(machineCode) {
    const opcode = machineCode >> 26;
    let result = undefined;
    if (opcode === 0) {
      result = instructionsR[machineCode & 0b111111];
    } else {
      result = instructionsNonR[opcode];
    }

    if (result === undefined) {
      return new Error(
          "Undefined instruction for machine code " +
        this.getPrintedMachineCode(machineCode)
      );
    }
    return result;
  }

  getRegisterNames() {
    return MipsRegisters;
  }

  getPrintedMachineCode(machineCode) {
    return machineCode.toString(2);
  }

  getAssemblerPlugins() {
    return this.assemblerPlugins;
  }

  getRegisterCount() {
    return 32;
  }

  getMemorySize() {
    return this.memorySize;
  }
}


/**
 * Returns a big endian DataView from the given array consisting of 32-bit
   numbers (either normal JS array or Uint32Array).
 *
 * Most modern architectures use little endian; this function returns big
   endian.
 *
 * @param {number[] | Uint32Array} array The input array.
 * @return {DataView} The DataView, in big endian.
 */
MipsArchitecture.array32ToDataView = function(array) {
  const view = new DataView(new ArrayBuffer(4 * array.length));
  for (let i = 0; i < array.length; i++) {
    view.setUint32(4*i, array[i], false);
  }
  return view;
};


MipsArchitecture.unsignInt32 = function(int) {
  return int >>> 0;
};
