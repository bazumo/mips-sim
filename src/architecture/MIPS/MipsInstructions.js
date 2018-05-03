'use strict;'



// TODO Instructions currently missing: ll, sc. To be fixed: add, addi, sub (overflow trap). Also add arithmetic core
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
  let req = require('./instructions/' + name).default;
  if (typeof req !== 'function') throw new Error(name + " is not a valid instruction in the instructions folder, instead it is " + req);
  return new req();
}


const instructions = {};
for (let instruction of instructionList) {
  instructions[instruction] = c(instruction);
}





export default instructions;
