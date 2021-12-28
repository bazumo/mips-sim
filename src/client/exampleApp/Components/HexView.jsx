import React, { PureComponent } from "react";
import "./HexView.css";



function isPrintaleAscii(code) {
  return (code >= 32 && code <= 126);
}

class HexView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};

    if (typeof this.props.updateMemoryCount !== "number") {
      throw new Error(
          `Error! HexView props.updateMemoryCount is required. Update it whenever the memory buffer changes`
      );
    }
  }
  renderAddressView(buffer) {
    const view = new Uint8Array(buffer);
    const result = [];
    for (let i = 0; i < view.length; i += 8) {
      const address = "0x" + i.toString(16).padStart(5, "0");
      result.push(<div key={i}>{address}</div>);
    }
    return result;
  }
  renderHex(buffer) {
    const view = new Uint8Array(buffer);
    const result = [];
    for (let i = 0; i < view.length; i++) {
      const byte = view[i];
      const hexByte = byte.toString(16).padStart(2, "0");
      result.push(<span key={i}>{hexByte}</span>);
    }
    return result;
  }
  renderHexPreview(buffer) {
    const view = new Uint8Array(buffer);
    const result = [];
    for (let i = 0; i < view.length; i++) {
      const byte = view[i];
      if (isPrintaleAscii(byte)) {
        const char = String.fromCharCode(byte);
        result.push(<span key={i}>{char}</span>);
      } else {
        result.push(<span className="HewView_Preview-nonPrintable" key={i}>.</span>);

      }

    }
    return result;
  }

  render() {
    return (
      <div className="HexView_Wrapper">
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
      </div>
    );
  }
}

export default HexView;
