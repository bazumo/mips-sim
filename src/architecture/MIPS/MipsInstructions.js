'use strict';



// TODO Instructions currently missing: ll, sc.
//      To be fixed: add, addi, sub (overflow trap)
//                   and beg, bne (wrong BranchAddr).
//      Also add arithmetic core
const instructionList = [
  'add',
  'addi',
  'addi',
  'addu',
  'and',
  'andi',
  'beq',
  'bne',
  'j',
  'jal',
  'jr',
  'lbu',
  'lhu',
  // TODO 'll',
  'lui',
  'lw',
  'nor',
  'or',
  'ori',
  'slt',
  'slti',
  'slti',
  'sltu',
  'sll',
  'srl',
  'sb',
  // TODO 'sc',
  'sh',
  'sw',
  'sub',
  'subu',
];




function c(name) {
  const req = require('./instructions/' + name).default;
  if (typeof req !== 'function') {
    throw new Error(name + " is not a valid instruction in the instructions" +
      "folder, instead it is " + req
    );
  }
  return new req();
}


const instructions = {};
for (const instruction of instructionList) {
  instructions[instruction] = c(instruction);
}





export default instructions;
