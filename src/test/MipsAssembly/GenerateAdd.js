

import Registers from 'architecture/MIPS/MipsRegisters';
const { $t0, $t1, $t2 } = Registers;
import Instructions from 'architecture/MIPS/MipsInstructions';

const instruction = Instructions.add.asMachineCode($t1, $t2, $t0, 0);
const expected = 0b00000001001010100100000000100000;
expect(instruction).toBe(expected);
