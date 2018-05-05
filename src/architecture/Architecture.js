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
   * Returns a map mapping register names to register IDs.
   */
  getRegisterNames() {
    throw new Error("Architecture.getRegisterNames() not implemented!");
  }

  /**
   * Returns a printed, human readable version of the machine code. Defaults to String(machineCode).
   */
  getPrintedMachineCode(machineCode) {
    return String(machineCode);
  }

  /**
   * Executes the instruction represented by machineCode. Default implementation should work for most architectures.
   */
  executeMachineCode(simulator, machineCode) {
    let instruction = this.getInstructionFor(machineCode);
    if (instruction === undefined) {
      throw new Error("Undefined instruction for machine code " + this.getPrintedMachineCode(machineCode));
    } else if (instruction instanceof Error) {
      throw instruction;
    }
    instruction.run(simulator, machineCode);
  }

  /**
   * Returns a list of all assembler plugins to be used in the assembler.
   */
  getAssemblerPlugins() {
    return [];
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
