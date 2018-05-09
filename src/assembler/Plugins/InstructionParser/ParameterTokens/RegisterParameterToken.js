'use strict';

import ParameterParserToken from './ParameterParserToken';
import ParserError from 'assembler/Parser/ParserError';

/**
 * A token representing a hardware register.
 */
 export default function(architecture) {
   return class RegisterParameterToken extends ParameterParserToken {
     static parse(parser) {
       let pos = parser.pos, line = parser.getLineNumber(), posInLine = parser.getPositionInLine();

       let regnames = architecture.getRegisterNames();
       let best = undefined;
       for (let key of Object.keys(regnames)) {
         if (parser.isNext(key)) {
           if (best === undefined || key.length > best.length) {
             best = key;
           }
         }
       }

       if (best === undefined) return [];
       parser.readNext(best.length);
       return [new RegisterParameterToken(parser, pos, line, posInLine, regnames[best])];
     }
   }
 }
