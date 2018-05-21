import React, { Component } from 'react';
import HexView from './HexView.jsx';
//TODO implement MemoryView component
class MemoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.buffer = new Uint8Array([
      41,
      41,
      41,
      41,
      42,
      123,
      45,
      163,
      56,
      27,
      65
    ]);
  }
  render() {
    return (
      <div>
        <h4>Memory</h4>
        <HexView buffer={this.buffer} />
      </div>
    );
  }
}

export default MemoryView;
