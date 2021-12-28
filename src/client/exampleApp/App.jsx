import React, { Component } from "react";
import Editor from "./Components/Editor.jsx";
//import SimulationControls from './Components/SimulationControlls.jsx';
import RegistryView from "./Components/RegistryView.jsx";
import MemoryView from "./Components/MemoryView.jsx";
import "./App.css";
import Assembler from "assembler/Assembler";
import Simulator from "simulator/Simulator";
import MipsArchitecture from "architecture/MIPS/MipsArchitecture";
import snackbar from "client/util/snackbar.js";

const madeBy = ["bazumo", "N2D4"].sort(() => (Math.random() < 0.5 ? 1 : -1));

//TODO find a good ui framework
class App extends Component {
  constructor(props) {
    super(props);

    this.arch = new MipsArchitecture();
    this.assembler = new Assembler(this.arch);
    this.simulator = new Simulator(this.arch);

    let sourceCode =
      "lui $t0, 0x1d\n" +
      "ori $t0, $t0, 9647\n" +
      "sll $t1, $t0, 3\n" +
      "sub $t0, $t1, $t0\n" +
      "ori $t1, $zero, 0\n";

    try {
      sourceCode =
        localStorage.getItem("bazumo-n2d4/mips-sim/source-code") || sourceCode;
    } catch (e) {
      console.warn(`Can't read from local storage - is it disabled?`, e);
    }

    this.state = {
      simulatorStateChanges: 0, // increase whenever simulator state changes
      sourceCode,
      instructions: null,
    };
    this.assembleAndSave = this.assembleAndSave.bind(this);
    this.onSourceCodeChange = this.onSourceCodeChange.bind(this);
    this.updateRegister = this.updateRegister.bind(this);
  }

  step() {
    this.simulator.simulateStep();
    this.setState((state) => ({
      ...state,
      simulatorStateChanges: state.simulatorStateChanges + 1,
    }));
  }

  updatePC(newPC) {
    this.simulator.PC = newPC;
    this.setState((state) => ({
      ...state,
      simulatorStateChanges: state.simulatorStateChanges + 1,
    }));
  }

  assembleAndSave() {
    const data = this.assembler.assemble(this.state.sourceCode);
    const dataview = data.dataView;
    if (!ArrayBuffer.isView(dataview)) {
      snackbar.error("Parse error: " + dataview.errorMessage);
      console.log(`Parse error`, dataview);
      return;
    }
    this.simulator.reset();
    this.simulator.loadIntoMemory(dataview, 0);
    this.setState((state) => ({
      ...state,
      simulatorStateChanges: state.simulatorStateChanges + 1,
      instructions: data.instructions,
    }));
    snackbar.success(`Assembling successful!`);
  }

  updateRegister(index, value) {
    this.simulator.registers[index] = value;
    this.setState((state) => ({
      ...state,
      simulatorStateChanges: state.simulatorStateChanges + 1,
    }));
  }

  onSourceCodeChange(newValue) {
    try {
      localStorage.setItem("bazumo-n2d4/mips-sim/source-code", newValue);
    } catch (e) {
      console.warn(`Can't write to local storage - is it disabled?`, e);
    }

    this.setState({
      ...this.state,
      sourceCode: newValue,
      instructions: null,
    });
  }

  render() {
    const instrs = this.state.instructions?.get(this.simulator.PC) ?? [];
    return (
      <div className="App">
        <div id="container">
          <header>
            <button onClick={() => this.assembleAndSave()}>Assemble</button>
            <button onClick={() => this.step()}>Step</button>
          </header>
          <main id="content">
            <Editor
              onChange={this.onSourceCodeChange}
              value={this.state.sourceCode}
              pcLines={instrs.map((x) => x.sourceLine)}
            />
          </main>
          <aside id="aside">
            <MemoryView
              data={this.simulator.memory}
              updateMemoryCount={this.state.simulatorStateChanges}
            />
            <RegistryView
              pc={this.simulator.PC}
              updatePC={(newPC) => this.updatePC(newPC)}
              data={this.simulator.getRegisters()}
              updateRegister={this.updateRegister}
            />
          </aside>
          <footer id="footer">
            <span>
              Made by{" "}
              {madeBy.map((x, i) => (
                <React.Fragment key={x}>
                  {i !== 0 && " & "}
                  <a
                    href={`https://github.com/${x}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {x}
                  </a>
                </React.Fragment>
              ))}
            </span>
            <span>
              <a
                href={`https://github.com/bazumo/mips-sim`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source
              </a>
            </span>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
