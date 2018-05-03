'use strict;'

import add from './instructions/add';
import addi from './instructions/addi';

export default {
  add: new add(),
  addi: new addi(),
};
