'use strict';

import Simulator from 'simulator/Simulator';
import Registers from 'architecture/MIPS/MipsRegisters';
const { $t0, $t1 } = Registers;
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';
import Instructions from 'architecture/MIPS/MipsInstructions'



function simulate(name, steps, setup, exp) {
  it(name, () => {
    let sim = new Simulator(new MipsArchitecture());

    setup(sim);

    for (let i = 0; i < steps; i++) {
      sim.simulateStep();
    }

    exp(sim);
  });
}









simulate("$t1 = $t0 + 5, $t0 = 2, 8-bit memory loading", 1, (sim) => {
    sim.loadIntoMemory(new Uint8Array([
      0b00100001, 0b00001001, 0b00000000, 0b00000101    // addi $t1, $t0, 5
    ]), 0x0);
    sim.registers[$t0] = 2;
}, (sim) => {
  expect(sim.registers[$t1]).toBe(7);
});







const addiValues = [0, 3, 5, -3];
const regValues = [0, 2, 4, -4];

for (let i of addiValues) {
  for (let r of regValues) {
    simulate("$t1 = $t0 + " + i + ", $t0 = " + r, 1, (sim) => {
        sim.loadIntoMemory(MipsArchitecture.array32ToDataView([
          Instructions.addi.asMachineCode($t0, $t1, i)
        ]), 0x0);
        sim.registers[$t0] = r;
    }, (sim) => {
      expect(sim.registers[$t1]).toBe(i+r);
    });
  }
}







simulate("$t1 = ($t0 + 4) - 8, $t0 = 2", 1, (sim) => {
    sim.loadIntoMemory(MipsArchitecture.array32ToDataView([
      Instructions.addi.asMachineCode($t0, $t1, 4),
      Instructions.addi.asMachineCode($t1, $t1, -8)
    ]), 0x0);
    sim.registers[$t0] = 2;
}, (sim) => {
  expect(sim.registers[$t1]).toBe(-2);
});
