'use strict';

import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';

let architecture = new MipsArchitecture();

let machineCode = 0b00100001000010010000000000000101;
let instructionName = architecture.getInstructionFor(machineCode).getName();
expect(instructionName).toBe('addi');
