'use strict';

import AssemblyError from './AssemblyError';
import Parser from './Parser/Parser';
import ParserError from './Parser/ParserError';

/**
 * Generic assembler class. Not supposed to be subclassed, rather constructed
   with an architecture argument. The assembler itself does nothing except
   provide basic parsing functionality; plugins are required, usually provided
   in the architecture class.
 *
 * Unlike the simulator and the architecture classes, the Assembler always
   assembles into binary representation of a data view. If the architecture does
   not support binary machine code, you might want to consider either compiling
   the binary code into your own machine code, or using Assembler.parse().
 */
export default class Assembler {
  /**
   * Default constructor. Initializes the assembler for a given architecture
     using its plugins, or no plugins if no architecture is passed.
   *
   * @param {Architecture} architecture The architecture used.
   */
  constructor(architecture = null) {
    this.plugins = [];
    if (architecture !== null) {
      for (const plugin of architecture.getAssemblerPlugins()) {
        this.addPlugin(plugin);
      }
    }
  }

  /**
   * Adds a plugin to the assembler.
   *
   * @param {AssemblerPlugin} plugin The plugin to add.
   */
  addPlugin(plugin) {
    if (this.plugins.includes(plugin)) return;

    this.plugins.push(plugin);
    for (const dependency of plugin.getDependencies()) {
      this.addPlugin(dependency);
    }
  }

  /**
   * Returns an array with all plugins enabled in this assembler.
   *
   * @return {AssemblerPlugin[]} An array containing all plugins enabled in this
     assembler.
   */
  getPlugins() {
    return [...this.plugins];
  }

  /**
   * Parses the given string. Returns either a ParserError or a
   * ParserToken.
   *
   * @param {string} s The string to be parsed.
   * @return {ParserResult} The result.
   */
  parse(s) {
    let topLevelTokens = [];
    const plugins = this.getPlugins();
    for (const plugin of plugins) {
      const n = plugin.getTopLevelParserSyntax();
      if (n.length >= 1) topLevelTokens = topLevelTokens.concat(n);
    }

    const parser = new Parser(s, this.architecture);
    return parser.exactlyOne(...topLevelTokens);
  }

  /**
   * Parses and assembles the given string. Returns either a ParserError,
     AssembleError or a data view containing the assembled binary machine code.
   *
   * @param {string} s The string to be parsed and assembled.
   * @return {DataView} The resulting DataView.
   */
  assemble(s) {
    const token = this.parse(s);
    if (token instanceof ParserError) return token;

    const len = token.getAssembledLength();
    if (len instanceof AssemblyError) return len;

    const dataView = new DataView(new ArrayBuffer(len));
    if (len !== token.writeAssembly(dataView, 0)) {
      throw new Error(
          "Data view indices somehow didn't sum up to the calculated length - " +
        "what went wrong?"
      );
    }
    return dataView;
  }

}
