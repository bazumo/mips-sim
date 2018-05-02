import React, { Component } from 'react';
import Editor from './Components/Editor.jsx';
import SimulationControls from './Components/SimulationControlls.jsx';
import RegistryView from './Components/RegistryView.jsx';
import MemoryView from './Components/MemoryView.jsx';
import logo from './logo.svg';
import './App.css';

// Temporary dummy data for registry
const dummyRegistry = {
  $zero: 637,
  $at: 23,
  $v0: 2353,
  $v1: 12,
  $a0: 637,
  $usw: 24235
};

//TODO find a good ui framework
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <nav className="navbar">
            <a href="/">Mips Sim</a>
            <button>Run</button>
            <button>Step</button>
          </nav>
          <div className="editor">
            <Editor onChange={(v, e) => console.log(v, e)} />
          </div>
          <div className="sidebar">
            <RegistryView data={dummyRegistry} />
            <MemoryView />
          </div>
          <div className="footer">...</div>
        </div>
      </div>
    );
  }
}

export default App;
