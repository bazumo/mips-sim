import React, { Component } from "react";
import HexView from "./HexView.jsx";
import SidebarItem from "./SidebarItem.jsx";

class MemoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SidebarItem title="Memory" style={{height: "300px", flexGrow: 1}}>
        <HexView
          buffer={this.props.data}
          updateMemoryCount={this.props.updateMemoryCount}
        />
      </SidebarItem>

    );
  }
}

export default MemoryView;
