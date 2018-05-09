'use strict';

import Parser from './Parser';

/**
 * An error class representing an error during the parsing phase.
 */
export default class ParserError {
  constructor(pos, lineNumber, linePos, errorMessage) {
    if (pos instanceof Parser && typeof lineNumber === 'string') {
      errorMessage = lineNumber;
      linePos = pos.getPositionInLine();
      lineNumber = pos.getLineNumber();
      pos = pos.pos;
    }

    this.pos = pos;
    this.lineNumber = lineNumber;
    this.linePos = linePos;
    this.errorMessage = errorMessage;
  }

  toString() {
    return "Parsing error at " + this.lineNumber + ":" + this.linePos + " (" + this.pos + "): " + this.errorMessage;
  }
}
