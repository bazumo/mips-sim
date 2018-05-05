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
   * Creates a new ParserToken instance. Should never be called on ParserToken itself since it is abstract.
   */
  constructor(parser, sourceStart, sourceLine, sourcePosInLine) {
    this.parser = parser;
    this.sourceStart = sourceStart;
    this.sourceLine = sourceLine;
    this.sourcePosInLine = sourcePosInLine;
  }

  /**
   * Returns a boolean indicating whether this token can be assembled into binary data. If this is false, .writeAssembly() should always return an AssemblyError. If it is true, .writeAssembly() might still return an AssemblyError.
   */
  isAssemblable() {
    return false;
  }

  /**
   * Tries to write the token's binary assembly representation into arrayBuffer starting at (byte) index and returns the index of the first byte that was not written. This function can also fail, eg. if .isAssemblable() returns false, in which case an AssemblyError must be returned (not thrown).
   */
   writeAssembly(arrayBuffer, index) {
     return new AssemblyError(this.sourceStart, this.sourceLine, this.sourcePosInLine, "Can't assemble this type of token");
   }
}
