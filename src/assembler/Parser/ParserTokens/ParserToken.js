'use strict';

/**
 * An abstract superclass for parser tokens. A parser token might be anything
   from an entire statement to an integer literal. It is the object
  representation of a piece of functional assembly code.
 */
export default class ParserToken {
  /**
   * Reads and parses this token at the Parser's current position. Returns an
     array consisting of ParserTokens and ParserErrors. This action is
     considered successful if at least one of the array elements is an instance
     of this class.
   *
   * @param {Parser} parser The parser to be used
   * @return {ParserResult[]} An array of ParserResults.
   */
  static parse(parser) {
    throw new Error("static ParserToken.parse() not implemented!");
    return undefined; // makes ESLint parse this as a function with return type
  }

  /**
   * Creates a new ParserToken instance. Should never be called on ParserToken
     itself since it is abstract. A ParserToken is supposed to be immutable
     after construction, so that it is safe to put early compilation and
     assembly preparations here.
   *
   * @param {Parser} parser The parser used.
   * @param {number} sourceStart The raw position where this token started
   * @param {number} sourceLine The line where this token started
   * @param {number} sourcePosInLine The position in line where this token
   * started
   */
  constructor(parser, sourceStart, sourceLine, sourcePosInLine) {
    if ([sourceStart, sourceLine, sourcePosInLine].forEach((x, i) => {
      if (typeof x !== 'number') throw new Error(`Invalid argument! ${i}: ${x}`);
    }));
    this.parser = parser;
    this.sourceStart = sourceStart;
    this.sourceLine = sourceLine;
    this.sourcePosInLine = sourcePosInLine;
  }

  /**
   * Returns a number indicating the length of the assembled instruction. May
   * return an AssemblyError, indicating the token can't be assembled.
   *
   * @return {number | AssemblyError} Either a number if successful, or an
     AssemblyError if not so.
   */
  getAssembledLength() {
    return new AssemblyError(
        this.sourceStart,
        this.sourceLine,
        this.sourcePosInLine,
        "Can't assemble this type of parser token"
    );
  }

  /**
   * Tries to write the token's binary assembly representation into dataView
     starting at (byte) index and returns the index of the first byte that was
     not written. Behaviour of this function if getAssembledLength() returns an
     AssemblyError is undefined.
   *
   * @param {write} write
   * @param {number} index The first byte to be written.
   * @return {number} The new byte index in the data view.
   */
  writeAssembly(write, index) {
    throw new Error();
    return 0;
  }
}
