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

  it("Understands negative numbers", () => {
    expect(-3 - 5).toBe(-8);
  });
});
