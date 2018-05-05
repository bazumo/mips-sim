'use strict';

import Parser from 'assembler/Parser/Parser';
import ParserToken from 'assembler/Parser/ParserTokens/ParserToken';
import ParserError from 'assembler/Parser/ParserError';
import StaticStringToken from 'assembler/Parser/ParserTokens/StaticStringToken';
import EitherToken from 'assembler/Parser/ParserTokens/EitherToken';


test(" 2 3 a bc_ ", true);
test("\n \t    \r\n\n1 a b c  \n ", true);
test("2 3 a b c ", true);
test(" 2 3 abc_ ", false);
test(" 2 3 ab c _", false);
test(" 12 3 a bc_ ", false);
test("2 3 a b c ", true);


function test(cmd, expected) {
  it("\"" + cmd  + "\" should" + (expected ? " " : " not ") + "parse", () => {
    let result = new Parser(cmd).exactlyOne(TestToken);
    expect(result).toBeInstanceOf(expected ? ParserToken : ParserError);
  });
}

class TestToken extends ParserToken {
  static parse(parser) {
    return parser.parse(
      "",
      EitherToken(StaticStringToken("1"), StaticStringToken("2 3")),
      " ",
      StaticStringToken("a"),
      " ",
      "b",
      "",
      StaticStringToken("c"),
      EitherToken(" ", StaticStringToken("_")),
      "",
      null
    );
  }
}
