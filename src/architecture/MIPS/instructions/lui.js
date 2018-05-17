'use strict';

import InstructionI from './InstructionI';

export default class lui extends InstructionI {
  apply(simulator, opcode, rs, rt, immediate) {
    let R = simulator.registers;
    R[rt] = immediate << 16;
  }

  getName() {
    return 'lui';
  }

  getOpcode() {
    return 0xf;
  }

  getParameterParserTokens(architecture) {
    let RPT = RegisterParameterToken(architecture);
    let ILPT = IntegerLiteralParameterToken;
    return [RPT, this.isImmediateSigned() ? ILPT(-32768, 32767)
                                          : ILPT(0, 65535)];
  }

  writeAssembly(architecture, p, dataView, index) {
    return super.writeAssembly(architecture, [p[0], 0, p[1]], dataView, index);
  }
}
