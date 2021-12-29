import React, { Component, useState } from "react";
import "./RegistryView.css";
import SidebarItem from "./SidebarItem.jsx";


function Register({ name, value, onChange }) {
  const [val, setVal] = useState(null);

  const displayValue = val ?? "0x" + value.toString(16);

  const handleBlur = () => {
    const newVal = parseInt(val);
    if (newVal !== value) {
      onChange(newVal);
    }
    setVal(null);
  };

  const handleFocus = () => {
    setVal(displayValue);
  };

  return (
    <>
      <span>{name}</span>
      <input
        value={displayValue}
        onChange={(e) => setVal(e.target.value)}
        onBlur={handleBlur}
        onSubmit={handleBlur}
        onFocus={handleFocus}
      />
    </>
  );
}

class RegistryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateRegister = this.updateRegister.bind(this);
  }

  updateRegister({value, name}) {
    this.props.updateRegister(name, value);
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
              onChange={({value}) => this.props.updatePC(value)}
            />
            {this.getTableEntries()}
          </div>
        </div>
      </SidebarItem>
    );
  }
}

export default RegistryView;
