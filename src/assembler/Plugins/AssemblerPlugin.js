'use strict';

/**
 * Abstract superclass for all assembler plugins. May be added to the assembler to perform tasks
 */
export default class AssemblerPlugin {
  /**
   * Returns an array of assembler plugin objects which are required for this plugin.
   */
  getDependencies() {
    return [];
  }

  /**
   *  Returns an array of all top level parser syntax descriptors, ie. those which the parser searches for without context.
   */
  getTopLevelParserSyntax() {
    return [];
  }
}
