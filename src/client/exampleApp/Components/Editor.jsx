import React, { Component } from 'react';
import AceEditor from 'react-ace';
import './Editor.css';

import 'brace/mode/mips_assembler';
import 'brace/theme/chaos';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 32
    };
    this.containerDiv = React.createRef();
    this.editor = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  /**
   * Ugly updateDimension needed to resize editor because of bug
   */

  updateDimensions() {
    console.log(this.containerDiv.current.clientHeight);
    this.setState({
      ...this.state,
      height: this.containerDiv.current.clientHeight
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
    const markers = this.props.pcLines.map(p => ({
      startRow: p,
      endRow: p,
      startCol: 0,
      endCol: 1,
      className: "pc-line-marker",
      type: "fullLine",
    }));

    return (
      <div ref={this.containerDiv} style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}>
        <AceEditor
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            height: "auto",
          }}
          ref={this.editor}
          mode="mips_assembler"
          value={this.props.value}
          theme="chaos"
          width="100%"
          height={this.state.height + "px"}
          className="aceEditor_wrapper"
          onChange={this.props.onChange}
          name="code_editor"
          editorProps={{ $blockScrolling: true }}
          markers={markers}
        />
      </div>
    );
  }
}

export default Editor;
