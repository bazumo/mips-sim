'use strict';

describe("Example tests", () => {
  it("Doesn't miss lethal", () => {
    require('./ReckfulLethal.js');
  });

  it("Knows what 9 + 10 is", () => {
    require('./BadVine.js');
  });

  it("Can approximate simple floating point arithmetics", () => {
    require('./FloatArithmetics.js');
  });

  it("Can do quick maffs", () => {
    require('./QuickMaffs.js');
  });
});
