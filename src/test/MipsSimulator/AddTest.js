'use strict';

import Simulator from 'simulator/Simulator';
import Registers from 'architecture/MIPS/MipsRegisters';
const { $t0, $t1, $t2 } = Registers;
import Instructions from 'architecture/MIPS/MipsInstructions';
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';



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





const regValues = [0, 3, 5, -4, (1 << 31) - 4, 4294967292];

for (let i of regValues) {
  for (let j of regValues) {
    simulate("$t0 = $t1 + $t2, $t1 = " + i + ", $t2 = " + j, 1, (sim) => {
        sim.loadIntoMemory(MipsArchitecture.array32ToDataView([
          Instructions.add.asMachineCode($t1, $t2, $t0, 0)
        ]), 0x0);
        sim.registers[$t1] = i;
        sim.registers[$t2] = j;
    }, (sim) => {
      expect(sim.registers[$t0]).toBe(MipsArchitecture.unsignInt32(i+j));
    });
  }
}
