'use strict';

import util from 'util';
import Parser from 'assembler/Parser/Parser';
import ParserToken from 'assembler/Parser/ParserTokens/ParserToken';
import ParserError from 'assembler/Parser/ParserError';
import StaticStringToken from 'assembler/Parser/ParserTokens/StaticStringToken';
import RepetitiveToken from 'assembler/Parser/ParserTokens/RepetitiveToken';
import EitherToken from 'assembler/Parser/ParserTokens/EitherToken';


test("0.1 a bc_", true);
test(" 2 3 a bc_ ", true);
test("\n \t    \r\n\n0.1 a b c  \n ", true);
test("2 3 a b c ", true);
test(" 2 3 abc_ ", false);
test(" 2 3 ab c _", false);
test(" 0.12 3 a bc_ ", false);
test("0.1 a b c ", true);
test("1 a b c ", false);
test("0. a b c ", false);
test(".1 a b c ", false);
test("0. 1 a b c ", false);
test("0.1 a b c something", false);
test("0.1 a b,b,b,b,b,b,b,b,b,b,b c ", true);
test("0.1 a b,b, c ", true);
test("0.1 a ,b,b, c ", false);
test("0.1 a b,,b, c ", false);
test("0.1 a bb,b, c ", false);
test("0.1 a b, c ", true);
test("0.1 a b,, c ", false);
test("0.1 a b,b b,b,b c ", false);
test("0.1 a  c ", false);



class TestToken extends ParserToken {
  static parse(parser) {
    return parser.parse(
        "",
        EitherToken(
            [["0", "."], StaticStringToken("1")],
            StaticStringToken("2 3")
        ),
        " ",
        StaticStringToken("a"),
        " ",
        RepetitiveToken("b", ","),
        "",
        StaticStringToken("c"),
        EitherToken(" ", StaticStringToken("_")),
        "",
        null
    );
  }
}


function test(cmd, expected, log = false) {
  it("\"" + cmd + "\" should" + (expected ? " " : " not ") + "parse", () => {
    const result = new Parser(cmd).exactlyOne(TestToken);
    expect(result).toBeInstanceOf(expected ? ParserToken : ParserError);
    if (log) {
      console.log("Command:", cmd);
      console.log("Expects valid:", expected);
      console.log("Actual result:", util.inspect(result, false, null));
    }
  });
}
