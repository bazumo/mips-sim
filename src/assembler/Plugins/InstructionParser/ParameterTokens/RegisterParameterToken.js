'use strict';

import ParameterParserToken from './ParameterParserToken';

/**
 * A token representing a hardware register.
 * @param {Architecture} architecture The upper bound for the literal.
 * @return {object} An object with a .parse function.
 */
 export default function(architecture) {
   return class RegisterParameterToken extends ParameterParserToken {
     static parse(parser) {
       let pos = parser.pos;
       let line = parser.getLineNumber();
       let posInLine = parser.getPositionInLine();

       let regnames = architecture.getRegisterNames();
       let best = undefined;
       for (let key of Object.keys(regnames)) {
         if (parser.isNext(key)) {
           if (best === undefined || key.length > best.length) {
             best = key;
           }
         }
       }

       if (best === undefined) return [];
       parser.readNext(best.length);
       return [new RegisterParameterToken(parser,
                                          pos,
                                          line,
                                          posInLine,
                                          regnames[best])];
     }
   };
 }
