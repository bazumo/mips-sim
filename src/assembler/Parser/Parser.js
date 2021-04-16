'use strict';

import util from 'util';
import ParserError from './ParserError';
import ParserToken from './ParserTokens/ParserToken';
import SequentialToken from './ParserTokens/SequentialToken';
import StaticStringToken from './ParserTokens/StaticStringToken';
import StaticRegExToken from './ParserTokens/StaticRegExToken';
import WhitespaceToken from './ParserTokens/WhitespaceToken';
import OptionalToken from './ParserTokens/OptionalToken';
import EndOFStreamToken from './ParserTokens/EndOfStreamToken';

/**
 * A string wrapper class with several utility functions for parsing.
 *
 * Wherever a function takes a parser syntax descriptor as an argument, it may
   be either of the following:
 * - a constructor function (uninstantiated) of a ParserToken,
 * - a String with at least one non-whitespace character (implicitly converted
     into a StaticStringToken),
 * - a RegEx (implicitly converted into a StaticRegExToken),
 * - an empty String (implicitly converted into an
     OptionalToken(WhitespaceToken)),
 * - a String containg only whitespace characters (implicitly converted into a
     WhitespaceToken),
 * - an array of parser syntax descriptors (implicitly converted into a
     SequentialToken),
 * - or null (implicitly converted into an EndOfFileToken).
 * This behaviour is defined in Parser.parse().
 *
 * The result of most parsing operations is an array of ParserTokens and
   ParserErrors. Each elemenent represents an interpretation; for example, in a
   fictional programming language, the statement "x = 10" could be interpreted
   as assignment of a variable 'x' to the value '10', or as a call of the
   function 'x' with arguments '=' and '10'. The former would likely succeed and
   return a ParserToken; the latter would likely fail and return a ParserError
   with a message noting that '=' is not a valid identifier.
 *
 * Instead of trying to understand this, just read test/Parser/ParserTest.js.
 */
export default class Parser {
  /**
   * Creates a new Parser object starting at the beginning of the string.
   *
   * @param {string} s The string to be parsed.
   */
  constructor(s) {
    this.s = s;
    this.pos = 0;
    this.whitespaceRegex = /\s+/;
    this.newlineRegex = /\s*(\r?\n)+\s*/;
    this.identifierRegex = /[a-zA-Z_][a-zA-Z0-9_]+/;
  }

  /**
   * Returns a clone of this Parser object at position pos.
   *
   * @param {number} pos The starting position of the clone.
   * @return {Parser} A clone of this object.
   */
  clone(pos = this.pos) {
    const res = new Parser(this.s);
    res.pos = pos;
    res.whitespaceRegex = this.whitespaceRegex;
    return res;
  }

  /**
   * Reads the given number of characters from the code, returns them and
     increases the position.
   *
   * @param {number} chars The number of characters to read.
   * @return {string} The string read.
   */
  readNext(chars) {
    const c = this.s.substring(this.pos, this.pos + chars);
    this.pos += chars;
    return c;
  }

  /**
   * Checks whether the next substring matches the argument exactly without
     reading anything.
   *
   * @param {string} s The string to be matched.
   * @return {boolean} A boolean value indicating whether the string equals the
     next substring.
   */
  isNext(s) {
    const c = this.s.substring(this.pos, this.pos + s.length);
    return c === s;
  }

  /**
   * Reads the string passed as an argument if and only if it matches exactly
     the next substring. Returns true if something was read, false if not.
   *
   * @param {string} s The string to be expected and read.
   * @return {boolean} A boolean value indicating whether anything was read.
   */
  readIfNext(s) {
    if (this.isNext(s)) {
      this.pos += s.length;
      return true;
    }
    return false;
  }

  /**
   * Reads a string matching the RegEx. Returns undefined if no RegEx match was
     found at the current position.
   *
   * @param {RegEx} regex The RegEx object
   * @return {string} A string matching the RegEx, or undefined if no matches
     were found.
   */
  readRegEx(regex) {
    const match = regex.exec(this.s.substring(this.pos));
    if (!match) return undefined;
    if (match.index !== 0) return undefined;
    this.pos += match[0].length;
    return match[0];
  }


  /**
   * Returns a boolean whether the parser reached the end of the stream
   *
   * @return {boolean} True if the parser reached the end of the stream.
   */
  isEndOfStream() {
    return this.s.length <= this.pos;
  }


  /**
   * Takes any amount of syntax descriptors and returns the result of the
     parsing operations applied sequentially.
   *
   * @param {...SyntaxDescriptor} syntaxDescriptors The syntax descriptor
     objects, applied sequentially.
   * @return {ParserResult[]} An array containing the parsing
     results.
   */
  parse(...syntaxDescriptors) {
    if (syntaxDescriptors.length == 0) {
      throw new Error("Invalid argument count: " + this.arguments.length);
    }

    if (syntaxDescriptors.length > 1) {
      return this.parse(syntaxDescriptors);
    }


    let syntaxDescriptor = syntaxDescriptors[0];


    if (Array.isArray(syntaxDescriptor)) {
      if (syntaxDescriptor.length === 1) {
        syntaxDescriptor = syntaxDescriptor[0];
      } else {
        syntaxDescriptor =
            SequentialToken.apply(SequentialToken, syntaxDescriptor);
      }
    }
    if (typeof syntaxDescriptor === 'string') {
      const whitespaceRegex = '^' + this.whitespaceRegex.source + '$';
      if (syntaxDescriptor === '') {
        syntaxDescriptor = OptionalToken(WhitespaceToken);
      } else if (new RegExp(whitespaceRegex).test(syntaxDescriptor)) {
        syntaxDescriptor = WhitespaceToken;
      } else {
        syntaxDescriptor = StaticStringToken(syntaxDescriptor);
      }
    }
    if (syntaxDescriptor instanceof RegExp) {
      syntaxDescriptor = StaticRegExToken(syntaxDescriptor);
    }
    if (syntaxDescriptor === null) {
      syntaxDescriptor = EndOFStreamToken;
    }


    if (typeof syntaxDescriptor.parse !== 'function') {
      throw new Error(
          "The object passed is not a valid syntax descriptor! " +
        util.inspect(syntaxDescriptor)
      );
    }

    const parsed = syntaxDescriptor.parse(this.clone());
    // console.log(syntaxDescriptor, parsed);
    return parsed;
  }

  /**
   * Takes any amount of syntax descriptors and returns the result of each of
     the parsing operations in a concatted array.
   *
   * @param {...SyntaxDescriptor} syntaxDescriptors Any number of syntax
     descriptors, of which all fitting ones are chosen.
   * @return {ParserResult[]} An array containing the parsing
     results.
   */
  either(...syntaxDescriptors) {
    let res = [];
    for (let i = 0; i < syntaxDescriptors.length; i++) {
      const parsed = this.parse(syntaxDescriptors[i]);
      res = res.concat(parsed);
    }
    return res;
  }

  /**
   * Similar to either(...), but instead of an array returns either a
     ParserToken if there is a unique interpretation or a ParserError if either
     none or more than one interpretations exist.
   *
   * @param {...SyntaxDescriptor} syntaxDescriptors Any number of syntax
     descriptors, of which exactly one match is chosen.
   * @return {ParserResult[]} An array containing the parsing
     results.
   */
  exactlyOne(...syntaxDescriptors) {
    const res = this.either(...syntaxDescriptors);
    if (res.length === 1) {
      return res[0];
    } else if (res.length === 0) {
      return new ParserError(
          this,
          "No matching tokens"
      );
    }
    const tokens = [];
    const errors = [];
    for (const o of res) {
      if (o instanceof ParserToken) {
        tokens.push(o);
      } else if (o instanceof ParserError) {
        errors.push(o);
      } else {
        throw new Error(
            "Parser result element " +
          o +
          " is neither a ParserToken nor a ParserError!"
        );
      }
    }
    if (tokens.length === 0) {
      return new ParserError(
          this,
          "No matching tokens. Error messages: \n[" + errors + "]"
      );
    } else if (tokens.length === 1) {
      return tokens[0];
    } else {
      return new ParserError(
          this,
          "Code is ambiguous: " + tokens
      );
    }
  }

  /**
   * Parses the given syntax descriptor and and maps tokens and errors with the
     function given.
   *
   * Please note that you cannot use an indefinite amount of arguments like you
     can with most of the other parsing methods. You can, however, pass an array
    of syntax descriptors as the first argument instead.
   *
   * If the wrapper function returns undefined, the elements are mapped using
     the identity function.
   *
   * @param {SyntaxDescriptor} syntaxDescriptor A single syntax
     descriptor.
   * @param {function} tokenMapper A function mapping tokens. Default: Identity
   * @param {function} errorMapper A function mapping errors. Default: Identity
   * @return {[]} An array containing the mapped values.
   */
  parseAndMap(syntaxDescriptor, tokenMapper = (a=>a), errorMapper = (a=>a)) {
    const arr = this.parse(syntaxDescriptor);
    return arr.map((o) => {
      if (o instanceof ParserToken) {
        return tokenMapper(o);
      } else if (o instanceof ParserError) {
        return errorMapper(o);
      } else {
        throw new Error(
            "Parser result element " +
          o +
          " is neither a ParserToken nor a ParserError!"
        );
      }
    });
  }

  /**
   * Returns the line number for the current position.
   *
   * @return {number} The current position's line number.
   */
  getLineNumber() {
    return 0; // TODO
  }


  /**
   * Returns the character position in the current line.
   *
   * @return {number} The current position in the current line.
   */
  getPositionInLine() {
    return 0; // TODO
  }
}
