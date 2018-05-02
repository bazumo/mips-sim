'use strict';

describe("Example tests", () => {
  it("Doesn't miss lethal like Reckful", () => {
    require('./ReckfulLethal.js');
  });

  it("Knows what 9 + 10 is", () => {
    require('./BadVine.js');
  });

  it("Can approximate simple floating point arithmetics", () => {
    require('./FloatArithmetics.js');
  });

  it("Can do quick maffs", () => {
    expect(2 + 2).toBe(4);
    expect(4 - 1).toBe(3);
    // QUICK MAFFS!
  });
});
