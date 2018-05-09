'use strict';

import util from 'util';
import ParserError from './ParserError';
import ParserToken from './ParserTokens/ParserToken';
import SequentialToken from './ParserTokens/SequentialToken';
import StaticStringToken from './ParserTokens/StaticStringToken';
import StaticRegExToken from './ParserTokens/StaticRegExToken';
import WhitespaceToken from './ParserTokens/WhitespaceToken';
import OptionalToken from './ParserTokens/OptionalToken';
import EndOfFileToken from './ParserTokens/EndOfFileToken';

/**
 * A string wrapper class with several utility functions for parsing.
 *
 * Wherever a function takes a parsing instruction as an argument, it may either of the following:
 * - a constructor function (uninstantiated) of a ParserToken,
 * - a String with at least one non-whitespace character (implicitly converted into a StaticStringToken),
 * - a RegEx (implicitly converted into a StaticRegExToken),
 * - an empty String (implicitly converted into an OptionalToken(WhitespaceToken)),
 * - a String containg only whitespace characters (implicitly converted into a WhitespaceToken),
 * - an array of parsing instructions (implicitly converted into a SequentialToken),
 * - or null (implicitly converted into an EndOfFileToken).
 * This behaviour is defined in Parser.parse().
 *
 * The result of most parsing operations is an array of ParserTokens and ParserErrors. Each elemenent represents an interpretation; for example, in a fictional programming language, the statement "x = 10" could be interpreted as assignment of a variable 'x' to the value '10', or as a call of the function 'x' with arguments '=' and '10'. The former would likely succeed and return a ParserToken; the latter would likely fail and return a ParserError with a message noting that '=' is not a valid identifier.
 *
 * Instead of trying to understand this, just read test/Parser/ParserTest.js.
 */
export default class Parser {
  /**
   * Creates a new Parser object starting at the beginning of the string.
   */
  constructor(s) {
    this.s = s;
    this.pos = 0;
    this.whitespaceRegex = /\s+/;
    this.newlineRegex = /\s+\n+\s+/;
    this.identifierRegex = /[a-zA-Z_][a-zA-Z0-9_]+/;
  }

  /**
   * Returns a clone of this Parser object at position pos.
   */
  clone(pos = this.pos) {
    let res = new Parser(this.s);
    res.pos = pos;
    res.whitespaceRegex = this.whitespaceRegex;
    return res;
  }

  /**
   * Reads the given number of characters from the code, returns them and increases the position.
   */
  readNext(chars) {
    let c = this.s.substring(this.pos, this.pos + chars);
    this.pos += chars;
    return c;
  }

  /**
   * Checks whether the next substring matches the argument exactly without reading anything.
   */
  isNext(s) {
    let c = this.s.substring(this.pos, this.pos + s.length);
    if (c === s)
      return true;
    else
      return false;
  }

  /**
   * Reads the string passed as an argument if and only if it matches exactly the next substring. Returns true if something was read, false if not.
   */
  readIfNext(s) {
    if (this.isNext(s)) {
      this.pos += s.length;
      return true;
    } else {
      return false;
    }
  }

  /**
   * Reads a string matching the RegEx. Returns undefined if no RegEx match was found at the current position.
   */
  readRegEx(regex) {
    let match = regex.exec(this.s.substring(this.pos));
    if (!match) return undefined;
    if (match.index !== 0) return undefined;
    this.pos += match[0].length;
    return match[0];
  }


  /**
   * Returns a boolean whether the parser reached the end of the stream (ignore that the method name speaks of a file. There's no file)
   */
  isEndOfFile() {
    return this.s.length <= this.pos;
  }


  /**
   * Takes any amount of parsing instructions and returns the result of the parsing operations applied sequentially.
   */
  parse(...instructions) {
    if (instructions.length == 0) {
      throw new Error("Invalid argument count: " + this.arguments.length);
    }

    if (instructions.length > 1) {
      return this.parse(instructions);
    }



    let instruction = instructions[0];


    if (Array.isArray(instruction)) {
      if (instruction.length === 1) {
        instruction = instruction[0];
      } else {
        instruction = SequentialToken.apply(SequentialToken, instruction);
      }
    }
    if (typeof instruction === 'string') {
      if (instruction === '') {
        instruction = OptionalToken(WhitespaceToken);
      } else if (new RegExp('^' + this.whitespaceRegex.source + '$').test(instruction)) {
          instruction = WhitespaceToken;
      } else {
          instruction = StaticStringToken(instruction);
      }
    }
    if (instruction instanceof RegExp) {
      instruction = StaticRegExToken(instruction);
    }
    if (instruction === null) {
      instruction = EndOfFileToken;
    }


    if (typeof instruction.parse !== 'function') {
      throw new Error("The object passed is not a valid instruction! " + util.inspect(instruction));
    }

    let parsed = instruction.parse(this.clone());
    //console.log(instructions, parsed);
    return parsed;
  }

  /**
   * Takes any amount of parsing instructions and returns the result of each of the parsing operations in a concatted array.
   */
  either(...instructions) {
    let res = [];
    for (let i = 0; i < instructions.length; i++) {
      let parsed = this.parse(instructions[i]);
      res = res.concat(parsed);
    }
    return res;
  }

  /**
   * Similar to either(...), but instead of an array returns either a ParserToken if there is a unique interpretation or a ParserError if either none or more than one interpretations exist.
   */
  exactlyOne(...instructions) {
    let res = this.either.apply(this, instructions);
    if (res.length === 1) {
      return res[0];
    } else if (res.length === 0) {
      return new ParserError(this, "No matching tokens");
    }
    let tokens = [];
    let errors = [];
    for (let o of res) {
      if (o instanceof ParserToken) {
        tokens.push(o);
      } else if (o instanceof ParserError) {
        errors.push(o);
      } else {
        throw new Error("Parser result element " + o + " is neither a ParserToken nor a ParserError!");
      }
    }
    if (tokens.length === 0) {
      return new ParserError(this, "No matching tokens. Error messages: \n[" + errors + "]");
    } else if (tokens.length === 1) {
      return tokens[0];
    } else {
      return new ParserError(this, "Code is ambiguous: " + tokens);
    }
  }

  /**
   * Parses the given instruction and and maps tokens and errors with the function given.
   *
   * Please note that you cannot use an indefinite amount of arguments like you can with most of the other parsing methods. You can, however, pass an array of instructions as the first argument instead.
   *
   * If the wrapper function returns undefined, the elements are mapped using the identity function.
   */
  parseAndMap(singleInstruction, tokenMapper = (a => a), errorMapper = (a => a)) {
    let arr = this.parse(singleInstruction);
    return arr.map((o) => {
      if (o instanceof ParserToken)
        return tokenMapper(o);
      else if (o instanceof ParserError)
        return errorMapper(o);
      else
        throw new Error("Parser result element " + o + " is neither a ParserToken nor a ParserError!");
    });
  }

  /**
   * Returns the line number for the current position.
   */
  getLineNumber() {
    return 0; // TODO
  }


  /**
   * Returns the character position in the current line.
   */
  getPositionInLine() {
    return 0; // TODO
  }

}
