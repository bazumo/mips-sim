'use strict';

const options = {
  registerCount: 32,
  memorySize: 128
};


const REGISTERS = {
  $0: 0,
  $at: 1,
  $v0: 2,
  // TODO
};

const I_OPCODES = {

};

const R_OPCODES = {
  0x20: require('./opcodes/add')
};

const J_OPCODES = {

};

const $0 = REGISTERS.$0;
// TODO

export default class MipsSimulator {
  constructor() {
    this.registers = new Uint32Array(options.registerCount);
    this.memory = new Uint32Array(options.memorySize);
  }

  /**
   * Loads the 32-bit view specified by dataView into memory at position pos.
   */
  loadIntoMemory(dataView, pos) {
    // TODO
  }

  /**
   * Simulates one step in the emulator.
   */
  simulateStep() {
    // TODO
  }



}


MipsSimulator.REGISTERS = REGISTERS;
