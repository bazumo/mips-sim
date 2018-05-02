'use strict';

import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';

let instructionName = new MipsArchitecture().getInstructionFor(0b00100001000010010000000000000101).getName();
expect(instructionName).toBe('addi');
