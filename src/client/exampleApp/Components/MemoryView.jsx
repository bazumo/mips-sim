import React, { Component } from 'react';
import HexView from './HexView.jsx';
//TODO implement MemoryView component
class MemoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h4>Memory</h4>
        <HexView
          buffer={this.props.data}
          updateMemoryCount={this.props.updateMemoryCount}
        />
      </div>
    );
  }
}

export default MemoryView;
