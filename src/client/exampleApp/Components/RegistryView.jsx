import React, { Component } from "react";
import "./RegistryView.css";
import { Input } from "antd";
import { fixControlledValue } from "antd/lib/input/Input";








function Register({name, value, onChange}) {
  return <div>
    <span>{name}</span>
    <input
      value={value}
      onChange={onChange}
    />
  </div>;
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
        <div key={e.name}>
          <Register name={e.name} value={e.value} onChange={this.updateRegister}></Register>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="registryView">
        <h4>Registers</h4>
        <div className="registryView_wrapper">
          <div>
            <Input
              name="PC"
              addonBefore="PC"
              value={this.props.pc}
              onChange={(e) => this.props.updatePC(+e.target.value)}
            />
          </div>
          <div></div>
          {this.getTableEntries()}
        </div>
      </div>
    );
  }
}

export default RegistryView;
