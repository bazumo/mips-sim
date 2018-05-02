'use strict';

/**
 * Abstract super-class for all instructions on all architectures. Does not require that the instruction has a binary or even numerical representation; machineCode may be of any type.
 */
export default class Instruction {
  /**
   * Runs the instruction on the simulator. Solely runs the instruction, does not deal with side effects like PC increment. Safe to use from a debugger to inject instructions from the outside.
   */
  run(simulator, machineCode) {
    throw new Error("Instruction.run() not implemented!");
  }

  /**
   * Returns the instruction's short name, as used in assembly language. Not necessarily the human readable or descriptive name (but usually the human needs to at least be able to type it).
   */
  getName() {
    throw new Error("Instruction.getName() not implemented!");
  }

  /**
   * Returns the machine code representation. Commonly but not necessarily a number representing the binary representation of the instruction (see BinaryInstruction).
   */
  asMachineCode() {
    throw new Error("Instruction.generateBinary() not implemented!");
  }
}
