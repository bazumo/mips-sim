

import Registers from 'architecture/MIPS/MipsRegisters';
const { $t0, $t1 } = Registers;
import Instructions from 'architecture/MIPS/MipsInstructions';

const instruction = Instructions.addi.asMachineCode($t0, $t1, 5);
const expected = 0b00100001000010010000000000000101;
expect(instruction).toBe(expected);
