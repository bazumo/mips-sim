'use strict';

import Instruction from 'architecture/Instruction';


/**
 * Abstract class for an instruction that is represented by binary machine code, and can be split further into smaller pieces (eg. opcode and parameters), each with a size of a whole number of bits.
 *
 * Usual instructions on binary computers should implement this.
 */
export default class BinaryInstruction extends Instruction {
  run(simulator, machineCode) {
    this.apply.apply(this, [simulator].concat(this.split(machineCode)));
  }

  /**
   * Merges the pieces of the instruction's machine code representation. Usually used in the implementation's .asMachineCode() method. Uses .getSplitSizes() to get the size for each of the pieces.
   */
  merge(...args) {
    let splitSizes = this.getSplitSizes();
    let res = 0;
    for (let i = 0; i < splitSizes.length; i++) {
      let e = args[i];
      let l = splitSizes[i];
      res <<= l;
      res |= e & ((1 << l) - 1);
    }
    return res;
  }

  /**
   * Splits the binary machine code into its pieces (eg. opcode, argument 1, argument 2, etc.). Uses .getSplitSizes() to get the size for each of the pieces.
   */
  split(machineCode) {
    let splitSizes = this.getSplitSizes();
    let res = Array(splitSizes.length);
    for (let i = splitSizes.length - 1; i >= 0; i--) {
      let l = splitSizes[i];
      res[i] = machineCode & ((1 << l) - 1);
      machineCode >>= l;
    }
    return res;
  }

  /**
   * Returns an array of the pieces' sizes in bits. For example, if the instruction has a 16-bit binary representation oooo oooo 1111 2222 where o is the opcode, 1 the first argument and 2 the second argument, then .getSplitSizes() should return [8, 4, 4].
   */
  getSplitSizes() {
    throw new Error("BinaryInstruction.getSplitSizes() not implemented!");
  }

  /**
   * Runs the instruction using the pieces obtained by .split(). Technically equivalent to .run() but takes .getSplitSizes().length pieces as arguments instead of the machine code.
   */
  apply(simulator, ...pieces) {
    throw new Error("BinaryInstruction.apply() not implemented!");
  }
}
