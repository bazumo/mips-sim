

describe("MIPS Architecture", () => {
  it("MipsArchitecture.getInstructionFor() returns addi instruction when queried for it", () => {
    require('./CheckInstructionFind.js');
  });
  describe("MipsInstructions.default key and Instruction.getName() consistency", () => {
    require('./CheckInstructionNameConsistency.js');
  });
});
