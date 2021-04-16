'use strict';

/**
 * Abstract super-class for all architectures. An architecture defines the
   behaviour of a Simulator.
 */
export default class Architecture {
  /**
   * Returns an array containing all instructions.
   *
   * @return {Instruction[]} A list of all instructions on this architecture.
   */
  getInstructions() {
    throw new Error("Architecture.getInstructions() not implemented!");
    return undefined;
  }

  /**
   * Returns the instruction object for the given machine code.
   *
   * @param {MachineCode} machineCode The machine code used to look the
     instruction up.
   * @return {Instruction} The instruction.
   */
  getInstructionFor(machineCode) {
    throw new Error("Architecture.getInstructionFor() not implemented!");
    return undefined;
  }

  /**
   * Returns a map mapping register names to register IDs.
   *
   * @return {String[]} A list of all register names.
   */
  getRegisterNames() {
    throw new Error("Architecture.getRegisterNames() not implemented!");
    return undefined;
  }

  /**
   * Returns the word size of this architecture in the architecture's base unit
     (usually bytes). Currently not enforced across all of the code; at some
     points it's hard-coded to 4.
   *
   * @return {number} The word size, in the architecture's base unit.
   */
  getWordSize() {
    throw new Error("Architecture.getWordSize() not implemented!");
    return undefined;
  }

  /**
   * A coroutine taking an integer n as an argument and yielding the numbers
     0...n-1, in an order which defines the architecture's endianness. Given n
     pieces, the position of the most significant piece is yielded first, second
    most significant piece yielded second, up until the least significant piece
    which is yielded last.
   *
   * Example: Big Endian yields in the order 0, 1, 2, ..., n-2, n-1; Little
     Endian yields in the order n-1, n-2, ..., 2, 1, 0. Mixed Endian yields in
     the order 1, 0, 3, 2, 5, 4 ..., or similar.
   *
   * Most modern architectures use Little Endian. Many older architectures use
     big endian. If your architecture uses anything else, you might want to
     switch architectures.
   *
   * Writing this function as a normal function instead of a coroutine and
     returning Architecture.Endianness.BIG_ENDIAN(n) or
     Architecture.Endianness.LITTLE_ENDIAN(n) usually suffices.

   * @param {number} n The number of bytes.
   * @return {Generator} A generator generating the unit order, from 1 to n.
   */
  *getEndianness(n) {
    throw new Error("Architecture.getEndianness() not implemented!");
    return undefined;
  }

  /**
   * Returns a printed, human readable version of the machine code. Defaults to
     String(machineCode).
   *
   * @param {MachineCode} machineCode The machine code to be converted.
   * @return {string} A human-readable string representing the machine code.
   */
  getPrintedMachineCode(machineCode) {
    return String(machineCode);
  }

  /**
   * Executes the instruction represented by machineCode.
   *
   * @param {Simulator} simulator The simulator to execute the instruction on.
   * @param {MachineCode} machineCode The instruction's machine code.
   */
  executeMachineCode(simulator, machineCode) {
    const instruction = this.getInstructionFor(machineCode);
    if (instruction === undefined) {
      throw new Error("Undefined instruction for machine code " +
                      this.getPrintedMachineCode(machineCode)
      );
    } else if (instruction instanceof Error) {
      throw instruction;
    }
    instruction.run(simulator, machineCode);
  }

  /**
   * Returns a list of all assembler plugins to be used in the assembler. By
     default, an empty list; architectures need to specify assembler plugins in
     order to support assembling by the Assembler.
   *
   * @return {AssemblerPlugin[]} A list of all assembler plugins.
   */
  getAssemblerPlugins() {
    return [];
  }

  /**
   * Returns the number of registers of this architecture. Each register has a
     size of one word. Word size is currently hard-set to 32-bit.
   *
   * @return {number} The number of registers of this architecture.
   */
  getRegisterCount() {
    throw new Error("Architecture.getRegisterCount() not implemented!");
    return undefined;
  }

  /**
   * Returns the memory size, in bytes.
   *
   * @return {number} The memory size, in bytes.
   */
  getMemorySize() {
    throw new Error("Architecture.getMemorySize() not implemented!");
    return undefined;
  }
}


Architecture.Endianness = {
  BIG_ENDIAN: function*(n) {
    for (let i = 0; i < n; i++) {
      yield i;
    }
  },

  LITTLE_ENDIAN: function*(n) {
    for (let i = n-1; i >= 0; i--) {
      yield i;
    }
  }
};
