'use strict';

/**
 * Abstract superclass for all assembler plugins. May be added to the assembler to perform tasks
 */
export default class AssemblerPlugin {
  /**
   * Returns a list of assembler plugin object which are required for this plugin.
   */
   getDependencies() {
     return [];
   }
}
