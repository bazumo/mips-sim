import React, { Component } from 'react';
import Editor from './Components/Editor.jsx';
//import SimulationControls from './Components/SimulationControlls.jsx';
import RegistryView from './Components/RegistryView.jsx';
import MemoryView from './Components/MemoryView.jsx';
import './App.css';
import Assembler from 'assembler/Assembler';
import Simulator from 'simulator/Simulator';
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';

const arch = new MipsArchitecture();
const assembler = new Assembler(arch);
const simulator = new Simulator(arch);

// Temporary dummy data for registry

function updateRegisterData() {
  let mappedRegister = {};
  let registerNames = arch.getRegisterNames();
  Object.keys(registerNames).forEach(e => {
    mappedRegister[e] = simulator.registers[registerNames[e]];
  });
  return mappedRegister;
}

function updateMemoryData() {
  return simulator.memory;
}

//TODO find a good ui framework
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: updateRegisterData(),
      memory: updateMemoryData(),
      sourceCode: 'addi  $rt, $rs, 0'
    };
    this.assembleAndSave = this.assembleAndSave.bind(this);
    this.onSourceCodeChange = this.onSourceCodeChange.bind(this);
  }

  assembleAndSave() {
    const dataview = assembler.assemble(this.state.sourceCode);
    if (!ArrayBuffer.isView(dataview)) {
      console.error(dataview);
      return;
    }
    simulator.loadIntoMemory(dataview, 0);
  }

  onSourceCodeChange(newValue) {
    console.log('change', newValue);
    this.setState({
      ...this.state,
      sourceCode: newValue
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <nav className="navbar">
            <a href="/">Mips Sim</a>
            <button onClick={this.assembleAndSave}>Assemble</button>
            <button>Run</button>
            <button>Step</button>
          </nav>
          <div className="editor">
            <Editor
              onChange={this.onSourceCodeChange}
              value={this.state.sourceCode}
            />
          </div>
          <div className="sidebar">
            <MemoryView data={this.state.memory} />
            <RegistryView data={this.state.register} />
          </div>
          <div className="footer">...</div>
        </div>
      </div>
    );
  }
}

export default App;
