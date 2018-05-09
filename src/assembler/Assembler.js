'use strict';

import util from 'util';
import AssemblyError from './AssemblyError';
import Parser from './Parser/Parser';
import ParserError from './Parser/ParserError';

/**
 * Generic assembler class. Not supposed to be subclassed, rather constructed with an architecture argument. The assembler itself does nothing except provide basic parsing functionality; plugins are required, usually provided in the architecture class.
 *
 * Unlike the simulator and the architecture classes, the Assembler always assembles into binary representation of an array buffer. If the architecture does not support binary machine code, you might want to consider either compiling the binary code into your own machine code, or only using this class as a parse using Assembler.parse().
 */
export default class Assembler {
  /**
   * Default constructor. Initializes the assembler for a given architecture using its plugins, or no plugins if no architecture is passed.
   */
  constructor(architecture = null) {
    this.plugins = [];
    if (architecture !== null) {
      for (let plugin of architecture.getAssemblerPlugins()) {
        this.addPlugin(plugin);
      }
    }
  }

  /**
   * Adds a plugin to the assembler.
   */
  addPlugin(plugin) {
    if (this.plugins.includes(plugin)) return;

    this.plugins.push(plugin);
    for (let dependency of plugin.getDependencies()) {
      this.addPlugin(dependency);
    }
  }

  /**
   * Returns an array with all plugins enabled in this assembler.
   */
  getPlugins() {
    return [...this.plugins];
  }

  /**
   * Parses the given string. Returns either a ParserError or a ParserToken.
   */
  parse(s) {
    let result = [];

    let topLevelTokens = [];
    let plugins = this.getPlugins();
    for (let plugin of plugins) {
      let n = plugin.getTopLevelParserInstructions();
      if (n.length >= 1) topLevelTokens = topLevelTokens.concat(n);
    }

    let parser = new Parser(s, this.architecture);
    return parser.exactlyOne.apply(parser, topLevelTokens);
  }

  /**
   * Parses and assembles the given string. Returns either a ParserError, AssembleError or a data view containing the assembled binary machine code.
   */
  assemble(s) {
    let token = this.parse(s);
    if (token instanceof ParserError) return token;

    let len = token.getAssembledLength();
    if (len instanceof AssemblyError) return len;

    let dataView = new DataView(new ArrayBuffer(len));
    if (len !== token.writeAssembly(dataView, 0)) {
      throw new Error("Data view indices somehow didn't sum up to the calculated length - what went wrong?");
    }
    return dataView;
  }

}
