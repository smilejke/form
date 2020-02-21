import React from "react";
import "../index.css";
import Row from "./TableRow/row";

function Table(props) {
  const staff = props.staff;
  const actions = props.actions;

  return (
    <div className="form-container">
      <table>
        <thead>
          <tr>
            <th className="name-th">Name</th>
            <th className="small-th">Contract</th>
            <th className="pos-th">Position</th>
            <th className="small-th">Del</th>
            <th className="small-th">Edit</th>
          </tr>
        </thead>
        <tbody>
          {staff.map(person => {
            return <Row key={person.id} options={person} actions={actions} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
