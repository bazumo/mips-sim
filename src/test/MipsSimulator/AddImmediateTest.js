'use strict';

import Simulator from 'simulator/Simulator';
import Registers from 'architecture/MIPS/MipsRegisters';
const { $t0, $t1 } = Registers;
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';

let sim = new Simulator(new MipsArchitecture());

sim.loadIntoMemory(new Uint32Array([
  0b00100001, 0b00001001, 0b00000000, 0b00000101    // addi $t1, $t0, 5
]), 0x0);
sim.registers[$t0] = 2;

sim.simulateStep();

expect(sim.registers[$t1]).toBe(7);
