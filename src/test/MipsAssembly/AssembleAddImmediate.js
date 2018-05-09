'use strict';

import Assembler from 'assembler/Assembler';
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';


let assembler = new Assembler(new MipsArchitecture());
let dataView = assembler.assemble("addi $t0, $t1, 5");
expect(dataView).toBeInstanceOf(DataView);
expect(dataView.byteLength).toBe(4);
expect(dataView.getUint32(0)).toBe(0b00100001000010010000000000000101);
