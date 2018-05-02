'use strict';

/**
 * Abstract super-class for all architectures. An architecture defines the behaviour of a Simulator.
 */
export default class Architecture {
  /**
   * Returns an array containing all instructions.
   */
  getInstructions() {
    throw new Error("Architecture.getInstructions() not implemented!");
  }

  /**
   * Returns the instruction object for the given machine code.
   */
  getInstructionFor(machineCode) {
    throw new Error("Architecture.getInstructionFor() not implemented!");
  }

  /**
   * Returns the number of registers of this architecture. Each register has a size of one word. Word size is currently hard-set to 32-bit.
   */
  getRegisterCount() {
    throw new Error("Architecture.getRegisterCount() not implemented!");
  }

  /**
   * Returns the memory size, in bytes.
   */
  getMemorySize() {
    throw new Error("Architecture.getMemorySize() not implemented!");
  }
}
