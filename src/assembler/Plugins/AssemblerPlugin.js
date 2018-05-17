'use strict';

/**
 * Abstract superclass for all assembler plugins. May be added to the assembler
   to perform tasks
 */
export default class AssemblerPlugin {
  /**
   * Returns an array of assembler plugin objects which are required for this
     plugin.
   *
   * @return {AssemblerPlugin[]} An array of dependency plugins.
   */
  getDependencies() {
    return [];
  }

  /**
   * Returns an array of all top level parser syntax descriptors, ie. those
     which the parser searches for without context.
   *
   * @return {SyntaxDescriptor[]} An array of syntax descriptors.
   */
  getTopLevelParserSyntax() {
    return [];
  }
}
