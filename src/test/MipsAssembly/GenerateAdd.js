'use strict';

import Registers from 'architecture/MIPS/MipsRegisters';
const { $t0, $t1, $t2 } = Registers;
import Instructions from 'architecture/MIPS/MipsInstructions';


expect(Instructions.add.asMachineCode($t1, $t2, $t0, 0)).toBe(0b00000001001010100100000000100000);
