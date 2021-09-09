import React, { Component } from 'react';
import './RegistryView.css';

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
          <div>{e.name}</div>
          <input

            value={e.value}
            onChange={this.updateRegister}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="registryView">
        <h4>Registers</h4>
        <div className="registryView_wrapper">
          <div>PC</div>
          <div>
            <input
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
