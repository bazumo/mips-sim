import React, { Component } from "react";
import "./RegistryView.css";
import SidebarItem from "./SidebarItem.jsx";

function Register({ name, value, onChange }) {
  return (
    <>
      <span>{name}</span>
      <input value={"0x" + value.toString(16)} onChange={onChange} />
    </>
  );
}

class RegistryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateRegister = this.updateRegister.bind(this);
  }

  updateRegister(e) {
    const target = e.target;
    this.props.updateRegister(target.name, +target.value);
  }

  /**
   * Helper function for the registry list
   */

  getTableEntries() {
    return this.props.data.map((e, i) => {
      return (
        <Register
          key={e.name}
          name={e.name}
          value={e.value}
          onChange={this.updateRegister}
        ></Register>
      );
    });
  }

  render() {
    return (
      <SidebarItem title="Registers">
        <div className="registryView_wrapper">
          <div className="registryView_registers">
            <Register
              name="PC"
              value={this.props.pc}
              onChange={(e) => this.props.updatePC(+e.target.value)}
            />
            {this.getTableEntries()}
          </div>
        </div>
      </SidebarItem>

    );
  }
}

export default RegistryView;
