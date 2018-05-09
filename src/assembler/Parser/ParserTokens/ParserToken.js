'use strict';

/**
 * An abstract superclass for parser tokens. A parser token might be anything from an entire statement to an integer literal. It is the object representation of a piece of functional assembly code.
 */
export default class ParserToken {
  /**
   * Reads and parses this token at the Parser's current position. Returns an array consisting of ParserTokens and ParserErrors. This action is considered successful if at least one of the array elements is an instance of this class.
   */
  static parse(parser) {
    throw new Error("static ParserToken.parse() not implemented!");
  }

  /**
   * Creates a new ParserToken instance. Should never be called on ParserToken itself since it is abstract. A ParserToken is supposed to be immutable after construction, so that it is safe to put early compilation and assembly preparations here.
   */
  constructor(parser, sourceStart, sourceLine, sourcePosInLine) {
    this.parser = parser;
    this.sourceStart = sourceStart;
    this.sourceLine = sourceLine;
    this.sourcePosInLine = sourcePosInLine;
  }

  /**
   * Returns a number indicating the length of the assembled instruction. May return an AssemblyError, indicating the token can't be assembled.
   */
  getAssembledLength() {
    return new AssemblyError(this.sourceStart, this.sourceLine, this.sourcePosInLine, "Can't assemble this type of parser token");
  }

  /**
   * Tries to write the token's binary assembly representation into dataView starting at (byte) index and returns the index of the first byte that was not written. Behaviour of this function if getAssembledLength() returns an AssemblyError is undefined.
   */
   writeAssembly(dataView, index) {
     return index;
   }
}
