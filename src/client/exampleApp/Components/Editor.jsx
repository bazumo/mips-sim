import React, { Component } from 'react';
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
        value={this.props.value}
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
