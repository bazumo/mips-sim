import MipsSimulator from '../../simulator/MipsSimulator';

let sim = new MipsSimulator();

sim.loadIntoMemory(new Uint32Array([
  0b00100001000010010000000000000101    // addi $t1, $t0, 5
]), 0x0);
sim.setRegister(MipsSimulator.REGISTERS.t0, 2);

sim.simulateStep();

expect(sim.getRegister(MipsSimulator.REGISTERS.t1)).toBe(7);
