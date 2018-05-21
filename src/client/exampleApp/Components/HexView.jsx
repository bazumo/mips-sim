import React, { Component } from 'react';
import './HexView.css';

class HexView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderAddressView(buffer) {
    const view = new Uint8Array(buffer);
    const result = [];
    for (let i = 0; i < view.length; i += 8) {
      console.log(i);
      const address = '0x' + i.toString(16).padStart(5, '0');
      result.push(<div key={i}>{address}</div>);
    }
    return result;
  }
  renderHex(buffer) {
    const view = new Uint8Array(buffer);
    const result = [];
    for (let i = 0; i < view.length; i++) {
      const byte = view[i];
      const hexByte = byte.toString(16).padStart(2, '0');
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
    console.log(this.props);
    return (
      <div className="HexView">
        <div className="HexView_AddressView">
          {this.renderAddressView(this.props.buffer)}
        </div>
        <div className="HexView_ByteView">
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
