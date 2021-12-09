

import Instruction from 'architecture/Instruction';


/**
 * Abstract class for an instruction that is represented by binary machine code
  on an architecture with the base unit of 1 byte, and can be split further into
  smaller pieces (eg. opcode and parameters), each with a size of a whole number
  of bits.
 *
 * Most instructions on binary architectures should extend this.
 */
export default class BinaryInstruction extends Instruction {
  run(simulator, machineCode) {
    this.apply(simulator, ...this.split(machineCode));
  }

  /**
   * Merges the pieces of the instruction's machine code representation. Usually
    used in the implementation's .asMachineCode() method. Uses .getSplitSizes()
    to get the size for each of the pieces.
   *
   * @param {...Any} args The individual pieces to merge.
   * @return {MachineCode} The machine code.
   */
  merge(...args) {
    const splitSizes = this.getSplitSizes();
    let res = 0;
    for (let i = 0; i < splitSizes.length; i++) {
      const e = args[i];
      const l = Math.abs(splitSizes[i]);
      res <<= l;
      res |= e & ((1 << l) - 1);
    }
    return res;
  }

  /**
   * Splits the binary machine code into its pieces (eg. opcode, argument 1,
     argument 2, etc.). Uses .getSplitSizes() to get the size for each of
     the pieces.
   *
   * @param {MachineCode} machineCode The machine code.
   * @return {[]} The pieces.
   */
  split(machineCode) {
    const splitSizes = this.getSplitSizes();
    const res = Array(splitSizes.length);
    for (let i = splitSizes.length - 1; i >= 0; i--) {
      let l = splitSizes[i];
      let signed = false;
      if (l < 0) {
        signed = true;
        l = -l;
      }
      res[i] = machineCode & ((1 << l) - 1);
      if (signed) {
        res[i] = this.toSigned(res[i], l);
      }
      machineCode >>>= l;
    }
    return res;
  }


  /**
   * Converts an unsigned int of bit length l to a signed int. Utility function.
   *
   * @param {number} unsigned The unsigned number.
   * @param {number} l The number length, in bits.
   * @return {number} Signed version with the same bit representation.
   */
  toSigned(unsigned, l) {
    if ((unsigned & (1 << l-1)) !== 0) {
      unsigned -= (1 << l);
    }
    return unsigned;
  }



  /*
   * Default behaviour for getAssembledLength() and writeAssembly(): Convert the
     machine code to 1-word-sized binary data and write it onto the dataview.
   * Sub-classes may override this.
   */
  getAssembledLength(architecture, parameters) {
    return architecture.getWordSize();
  }

  writeAssembly(architecture, parameters, dataView, index) {
    const machineCode = this.asMachineCode(...parameters);

    const n = architecture.getWordSize();
    const endianness = architecture.getEndianness(n);
    for (let i = n - 1; i >= 0; i--) {
      const j = endianness.next().value;
      dataView.setUint8(index + j, machineCode >>> (8 * i) & 255);
    }

    return index + n;
  }



  /**
   * Returns an array of the pieces' sizes in bits. For example, if the
     instruction has a 16-bit binary representation oooo oooo 1111 2222 where o
     is the opcode, 1 the first argument and 2 the second argument, then
     .getSplitSizes() should return [8, 4, 4].
   *
   * By default, all pieces are unsigned integers. However, if you want a piece
     to be signed (most significant bit is sign bit), then add a minus sign
     before the corresponding getSplitSizes() entry; eg. if arguments 1 and 2 in
     the examples above are signed, then .getSplitSizes() should
     return [8, -4, -4].
   *
   * @return {number[]} An array of split sizes.
   */
  getSplitSizes() {
    throw new Error("BinaryInstruction.getSplitSizes() not implemented!");
    return undefined;
  }

  /**
   * Runs the instruction using the pieces obtained by .split(). Technically
     equivalent to .run() but takes .getSplitSizes().length pieces as arguments
     instead of the machine code.
   *
   * @param {Simulator} simulator The simulator to apply this instruction on.
   * @param {...Any} pieces The pieces/split parameters.
   */
  apply(simulator, ...pieces) {
    throw new Error("BinaryInstruction.apply() not implemented!");
  }
}
