

import Instructions from 'architecture/MIPS/MipsInstructions';

for (const key of Object.keys(Instructions)) {
  it(key, () => {
    expect(Instructions[key].getName()).toBe(key);
  });
}
