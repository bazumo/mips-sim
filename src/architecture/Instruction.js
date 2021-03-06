

/**
 * Abstract super-class for all instructions on all architectures. Does not
   require that the instruction has a binary or even numerical representation;
   machineCode may be of any type.
 */
export default class Instruction {
  /**
   * Runs the instruction on the simulator. Solely runs the instruction, does
     not deal with side effects like PC increment. Safe to use from a debugger
     to inject instructions from the outside.
   *
   * @param {Simulator} simulator The simulator used to run this instruction.
   * @param {MachineCode} machineCode The machine code that should be run.
   */
  run(simulator, machineCode) {
    throw new Error("Instruction.run() not implemented!");
  }

  /**
   * Returns the instruction's short name, as used in assembly language. Not
     necessarily the human readable or descriptive name (but usually the human
     needs to at least be able to type it).
   *
   * @return {string} The name of the instruction.
   */
  getName() {
    throw new Error("Instruction.getName() not implemented!");
    return undefined;
  }

  /**
   * Returns the machine code representation. Commonly but not necessarily a
     number representing the binary representation of the instruction
     (see BinaryInstruction).
   *
   * @return {MachineCode} This instruction, represented as machine code.
   */
  asMachineCode(...parameters) {
    throw new Error("Instruction.asMachineCode() not implemented!");
    return undefined;
  }

  /**
   * Returns the length of this instruction in words using the given parameters
     (passed as an array, or a negative number if the instruction can't be
     assembled. For simulation this method does not require implementation;
     however, custom assembler implementations or plugins (most notably
     InstructionParserPlugin) may make use of it.
   *
   * @param {Architecture} architecture The architecture.
   * @param {[]} parameters The parameters.
   * @return {number} The assembled length of this instruction.
   */
  getAssembledLength(architecture, parameters) {
    throw new Error("Instruction.getAssembledLength() not implemented! Please consider either implementing it or removing the source that called it.");
    return undefined;
  }

  /**
   * Writes the instruction to the specified data view at byte index, and
     returns the index of the next unwritten byte. For simulation this method
     does not require implementation; however, custom assembler implementations
     or plugins (most notably InstructionParserPlugin) may make use of it.
   *
   * @param {Architecture} architecture The architecture.
   * @param {[]} parameters The parameters, as returned by the
     ParameterParserTokens.
   * @param {DataView} dataView The data view to write to.
   * @param {number} index The starting byte index to start writing at.
   * @return {number} Index of the next unwritten byte.
   */
  writeAssembly(architecture, parameters, dataView, index) {
    throw new Error("Instruction.writeAssembly() not implemented! Please consider either implementing it or removing the source that called it.");
    return undefined;
  }

  /**
   * Returns an array of ParameterParserTokens, one each for each element
     expected for the parameters argument in writeAssembly(). For simulation
     this method does not require implementation; however, custom assembler
     implementations or plugins (most notably InstructionParserPlugin) may make
     use of it.
   *
   * @param {Architecture} architecture The architecture.
   * @return {ParserToken[]} An array of token objects.
   */
  getParameterParserTokens(architecture) {
    throw new Error("Instruction.getParameterParserTokens() not implemented! Please consider either implementing it or removing the source that called it.");
    return undefined;
  }
}
