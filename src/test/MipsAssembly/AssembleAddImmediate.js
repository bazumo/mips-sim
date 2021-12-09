

import Assembler from 'assembler/Assembler';
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';


const assembler = new Assembler(new MipsArchitecture());
const res = assembler.assemble("addi $t1, $t0, 5");
expect(res.dataView).toBeInstanceOf(DataView);
expect(res.dataView.byteLength).toBe(4);
expect(res.dataView.getUint32(0)).toBe(0b00100001000010010000000000000101);
expect([...res.instructions.entries()]).toEqual([
  [0, [{
    sourceLine: 0,
    sourcePosInLine: 4,
  }]],
]);
