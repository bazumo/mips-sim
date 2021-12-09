

/**
 * An error class representing an error during the assembly phase.
 */
export default class AssemblyError {
  constructor(pos, lineNumber, linePos, errorMessage) {
    this.pos = pos;
    this.lineNumber = lineNumber;
    this.linePos = linePos;
    this.errorMessage = errorMessage;
  }

  toString() {
    return "Assembly error at " + this.lineNumber + ":" + this.linePos +
           ": " + this.errorMessage;
  }
}
