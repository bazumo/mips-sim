'use strict';

import Simulator from 'simulator/Simulator';
import Registers from 'architecture/MIPS/MipsRegisters';
const { $t0, $t1 } = Registers;
import Instructions from 'architecture/MIPS/MipsInstructions';
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';



function simulate(name, steps, setup, exp) {
  it(name, () => {
    const sim = new Simulator(new MipsArchitecture());

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
const regValues = [0, 2, 4, -4, (1 << 31) - 4, 4294967292];

for (const i of addiValues) {
  for (const r of regValues) {
    simulate("$t1 = $t0 + " + i + ", $t0 = " + r, 1, (sim) => {
      sim.loadIntoMemory(MipsArchitecture.array32ToDataView([
        Instructions.addi.asMachineCode($t0, $t1, i)
      ]), 0x0);
      sim.registers[$t0] = r;
    }, (sim) => {
      expect(sim.registers[$t1]).toBe(MipsArchitecture.unsignInt32(i+r));
    });
  }
}







simulate("$t1 = ($t0 + 4) - 8, $t0 = 2", 2, (sim) => {
  sim.loadIntoMemory(MipsArchitecture.array32ToDataView([
    Instructions.addi.asMachineCode($t0, $t1, 4),
    Instructions.addi.asMachineCode($t1, $t1, -8)
  ]), 0x0);
  sim.registers[$t0] = 2;
}, (sim) => {
  expect(sim.registers[$t1]).toBe(MipsArchitecture.unsignInt32(-2));
});
