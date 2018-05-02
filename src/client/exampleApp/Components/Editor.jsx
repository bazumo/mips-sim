import React, { Component } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/mips_assembler';
import 'brace/theme/github';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <AceEditor
        mode="mips_assembler"
        defaultValue={`
// Welcome to Mips Sim
addi  $rt, $rs, 0
        `}
        theme="github"
        width="100%"
        height="100%"
        onChange={this.props.onChange}
        name="code_editor"
        editorProps={{ $blockScrolling: true }}
      />
    );
  }
}

export default Editor;
