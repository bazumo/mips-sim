'use strict';

import ParameterParserToken from './ParameterParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token representing an integer literal parameter in the range [min, max].
 */
 export default function(min, max) {
   return class IntegerLiteralParameterToken extends ParameterParserToken {
     static parse(parser) {
       let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();

       //let regex = /-?((0d|d|)[0-9_]+|(0h|0x|&h|h)[0-9a-f_]+|(0b|&b|b)[01_]+|(0o|&o|o)[0-7_]+)/i; // TODO Write a more advanced number parser allowing for binary and octal
       let regex = /-?(0x[0-9a-f]+|[0-9]+)/i;
       let s = parser.readRegEx(regex);
       if (s === undefined) return [];

       let parsed = parseInt(s);
       if (parsed < min || parsed > max) {
         return [new ParserError(parser, "Integer literal " + parsed + " out of bounds [" + min + ", " + max + "]")];
       }

       return [new IntegerLiteralParameterToken(parser, pos, line, posInLine, parsed)];
     }
   }
 }
