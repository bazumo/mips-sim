'use strict';

import Instructions from 'architecture/MIPS/MipsInstructions';

for (let key of Object.keys(Instructions)) {
  it(key, () => {
    expect(Instructions[key].getName()).toBe(key);
  });
}
