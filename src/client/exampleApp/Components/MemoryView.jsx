import React, { Component } from 'react';
import HexView from './HexView.jsx';
//TODO implement MemoryView component
class MemoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <h4>Memory</h4>
        <HexView buffer={this.props.data} />
      </div>
    );
  }
}

export default MemoryView;
