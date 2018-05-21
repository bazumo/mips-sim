import React, { Component } from 'react';
import Editor from './Components/Editor.jsx';
//import SimulationControls from './Components/SimulationControlls.jsx';
import RegistryView from './Components/RegistryView.jsx';
import MemoryView from './Components/MemoryView.jsx';
import './App.css';
import Assembler from 'assembler/Assembler';
import Simulator from 'simulator/Simulator';
import MipsArchitecture from 'architecture/MIPS/MipsArchitecture';
import { Layout, Button, message } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

const arch = new MipsArchitecture();
const assembler = new Assembler(arch);
const simulator = new Simulator(arch);

// Temporary dummy data for registry

function updateRegisterData() {
  return simulator.getRegisters();
}

function getMemory() {
  return simulator.memory;
}

//TODO find a good ui framework
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: updateRegisterData(),
      memory: getMemory(),
      sourceCode: 'addi  $t0, $t1, 0'
    };
    this.assembleAndSave = this.assembleAndSave.bind(this);
    this.onSourceCodeChange = this.onSourceCodeChange.bind(this);
    this.updateRegister = this.updateRegister.bind(this);
  }

  assembleAndSave() {
    const dataview = assembler.assemble(this.state.sourceCode);
    if (!ArrayBuffer.isView(dataview)) {
      message.error('Parse Error: ' + dataview.errorMessage);
      console.log(dataview);
      return;
    }
    simulator.loadIntoMemory(dataview, 0);
    console.log(simulator);
    this.setState({
      ...this.state,
      memory: getMemory()
    });
  }

  updateRegister(index, value) {
    simulator.registers[index] = value;
    this.setState({
      ...this.state,
      register: updateRegisterData()
    });
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
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ position: 'fixed', width: '100%', zIndex: '100' }}>
            <Button onClick={this.assembleAndSave}>Assemble</Button>
          </Header>
          <Layout style={{ marginTop: 64 }}>
            <Content>
              <Editor
                onChange={this.onSourceCodeChange}
                value={this.state.sourceCode}
              />
            </Content>
            <Sider
              width="400px"
              style={{
                backgroundColor: 'white'
              }}
            >
              <MemoryView data={this.state.memory} />
              <RegistryView
                data={this.state.register}
                updateRegister={this.updateRegister}
              />
            </Sider>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

export default App;
