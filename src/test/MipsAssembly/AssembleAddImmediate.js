'use strict';

import Assembler from 'assembler/Assembler';
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';


const assembler = new Assembler(new MipsArchitecture());
const dataView = assembler.assemble("addi $t1, $t0, 5");
expect(dataView).toBeInstanceOf(DataView);
expect(dataView.byteLength).toBe(4);
expect(dataView.getUint32(0)).toBe(0b00100001000010010000000000000101);
