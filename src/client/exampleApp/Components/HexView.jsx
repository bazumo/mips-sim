import React, { Component } from 'react';
import './HexView.css';

class HexView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderHex(buffer) {
    const view = new Uint8Array(buffer);
    const result = [];
    for (let i = 0; i < view.length; i++) {
      const byte = view[i];
      const hexByte = byte.toString(16);
      result.push(<span key={i}>{hexByte}</span>);
    }
    return result;
  }
  renderHexPreview(buffer) {
    const view = new Uint8Array(buffer);
    const result = [];
    for (let i = 0; i < view.length; i++) {
      const byte = view[i];
      const char = String.fromCharCode(byte);
      result.push(<span key={i}>{char}</span>);
    }
    return result;
  }

  render() {
    return (
      <div className="HexView">
        <div className="HexView_Byteview">
          {this.renderHex(this.props.buffer)}
        </div>
        <div className="HewView_Preview">
          {this.renderHexPreview(this.props.buffer)}
        </div>
      </div>
    );
  }
}

export default HexView;
