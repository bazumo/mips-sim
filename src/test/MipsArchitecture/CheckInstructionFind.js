

import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';

const architecture = new MipsArchitecture();

const machineCode = 0b00100001000010010000000000000101;
const instructionName = architecture.getInstructionFor(machineCode).getName();
expect(instructionName).toBe('addi');
