import React, { Component } from 'react';

class RegistryView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTableEntries() {
    return Object.entries(this.props.data).map(e => {
      return (
        <tr key={e[0]}>
          <td>{e[0]}</td>
          <td>{e[1]}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="registryView">
        <table>
          <tbody>{this.getTableEntries()}</tbody>
        </table>
      </div>
    );
  }
}

export default RegistryView;
