

/**
 * A simulator class used to simulate any architecture. This class is supposed
   to be instantiated directly, and while sub-classing is possible it is not
   required.
 */
export default class Simulator {
  constructor(architecture) {
    this.architecture = architecture;
    this.registers = new Uint32Array(this.architecture.getRegisterCount()); // TODO Disallow writing certain registers (eg. $zero) in certain architectures
    this.memory = new Uint8Array(this.architecture.getMemorySize());
    this.reset();
  }

  /**
   * Resets the simulator back to an initial state.
   */
  reset() {
    this.registers.fill(0);
    this.memory.fill(0);
    this.PC = 0;
    this.nPC = undefined;
  }

  /**
   * Loads the view specified by dataView into memory at address memoryAddress.
     dataView may either be a DataView, ArrayBuffer or a Uint8Array.
   *
   * Please make sure you're using the correct endianness. Many modern CPUs use
     Little Endian while many older CPUs use Big Endian. Endianness cannot be
     set with typed arrays like Uint32Array, which is why DataViews are more
     favorable.
   *
   * @param {DataView} dataView The data view to be loaded into memory.
   * @param {number} memoryAddress The memory address.
   */
  loadIntoMemory(dataView, memoryAddress) {
    if (dataView instanceof DataView) {
      dataView = dataView.buffer;
    }
    if (dataView instanceof ArrayBuffer) {
      dataView = new Uint8Array(dataView);
    }
    if (!(dataView instanceof Uint8Array)) {
      throw new Error(
          'dataView must be of type DataView, ArrayBuffer or Uint8Array!'
      );
    }

    for (let i = 0; i < dataView.length; i++) {
      this.memory[memoryAddress + i] = dataView[i];
    }
  }

  /**
   * Returns an array where the i-th element contains
   * name and value of the i-th register.
   *
   * @return {Array} result
   */
  getRegisters() {
    const regnames = this.architecture.getRegisterNames();
    const result = new Array(this.architecture.getRegisterCount);
    for (const key of Object.keys(regnames)) {
      // Ignore all registers that start with a number (duplicates)
      if (isNaN(parseInt(key[1], 10))) {
        const index = regnames[key];
        result[index] = {
          name: key,
          value: this.registers[index]
        };
      }
    }
    return result;
  }

  simulateStep() {
    this.nPC = this.PC + 4;

    let machineCode = 0;
    for (let i = 0; i < 4; i++) {
      machineCode <<= 8;
      machineCode |= this.memory[this.PC + i];
    }
    this.architecture.executeMachineCode(this, machineCode);

    this.PC = this.nPC;
  }
}
