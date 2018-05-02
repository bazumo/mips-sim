'use strict';

import { } from 'architecture/MIPS/MipsRegisters';

/**
 * A simulator class used to simulate a specific architecture. This class is supposed to be instantiated directly, and while sub-classing is possible it is not required.
 */
export default class Simulator {
  constructor(architecture) {
    this.architecture = architecture;
    this.registers = new Uint32Array(architecture.getRegisterCount());       // TODO Disallow setting of certain registers (eg. $zero) in certain architectures
    this.memory = new Uint8Array(architecture.getMemorySize());
  }

  /**
   * Loads the view specified by dataView into memory at position pos.
   */
  loadIntoMemory(dataView, pos) {
    for (let i = 0; i < dataView.length; i++) {
      this.memory[pos + i] = dataView[i];
    }
  }

  /**
   * Simulates one step in the emulator.
   */
  simulateStep() {
    // TODO Implement a program counter
    let PC = 0;
    this.architecture.executeMachineCode(this, this.memory[PC]);
  }



}
