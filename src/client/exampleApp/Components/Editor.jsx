import React, { Component } from 'react';
import AceEditor from 'react-ace';

import 'brace/mode/mips_assembler';
import 'brace/theme/github';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight - 133 + 'px'
    };
    this.editor = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  /**
   * Ugly updateDimension needed to resize editor because of bug
   */

  updateDimensions() {
    console.log(window.innerHeight - 133 + 'px');
    this.setState({
      ...this.state,
      height: window.innerHeight - 133 + 'px'
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    return (
      <div>
        <AceEditor
          ref={this.editor}
          mode="mips_assembler"
          value={this.props.value}
          theme="github"
          width="100%"
          height={this.state.height}
          className="aceEditor_wrapper"
          onChange={this.props.onChange}
          name="code_editor"
          editorProps={{ $blockScrolling: true }}
        />
      </div>
    );
  }
}

export default Editor;
