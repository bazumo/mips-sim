

describe("MIPS Assembler", () => {
  it("Can generate add instruction from binary opcode and arguments", () => {
    require('./GenerateAdd.js');
  });

  it("Can generate addi instruction from binary opcode and arguments", () => {
    require('./GenerateAddImmediate.js');
  });

  it("Can parse and assemble simple addi instruction", () => {
    require('./AssembleAddImmediate.js');
  });
});
