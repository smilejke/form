import React from "react";
import Table from "./table.js";
import WrappedHorizontalLoginForm from "./form.js";

import "../index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: this.props.global.workers,
      editor: {},
      editorMode: false
    };

    this.employeePusher = this.employeePusher.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.editRow = this.editRow.bind(this);
    this.buttonValueChange = this.buttonValueChange.bind(this);
    this.searcher = this.searcher.bind(this);
  }

  employeePusher(person) {
    let staff = [...this.state.staff];

    if (!this.state.editorMode) {
      staff.push(person);
      this.setState({
        staff: staff
      });
    } else {
      const searchIndexToChange = staff.indexOf(
        this.searcher(staff, this.state.editor.id)
      );

      staff[searchIndexToChange] = {
        name: person.name,
        contract: person.contract,
        position: person.position,
        id: this.state.editor.id
      };

      this.setState({
        staff: staff,
        editorMode: false
      });
    }
  }

  searcher(container, identificator) {
    return container.find(item => {
      return item.id === identificator;
    });
  }

  buttonValueChange() {
    return this.state.editorMode ? "Accept changes" : "Add Employee";
  }

  editRow(e) {
    let staff = [...this.state.staff];
    const target = e.currentTarget;
    const id = target.getAttribute("data-id");

    const targetPerson = this.searcher(staff, id);

    this.setState({
      editor: targetPerson,
      editorMode: true
    });
  }

  deleteRow(e) {
    let staff = [...this.state.staff];
    const target = e.currentTarget;
    const id = target.getAttribute("data-id");

    staff.splice(staff.indexOf(this.searcher(staff, id)), 1);

    this.setState({
      staff: staff
    });
  }

  render() {
    const tableMethods = {
      del: this.deleteRow,
      edit: this.editRow
    };
    const formMethods = {
      addWorker: this.employeePusher,
      buttonName: this.buttonValueChange
    };

    const options = this.props.global.positions;

    return (
      <div className="App">
        {
          <WrappedHorizontalLoginForm
            actions={formMethods}
            editable={this.state.editor}
            categories={options}
          />
        }
        <Table staff={this.state.staff} actions={tableMethods} />
      </div>
    );
  }
}

export default App;
