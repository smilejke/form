import React from "react";
import "../../index.css";
import { Icon, Checkbox } from "antd";

function Row(props) {
  const {
    options: { name, contract, position, id },
    actions: { del, edit }
  } = props;

  return (
    <tr>
      <td>{name}</td>
      <td>
        <Checkbox checked={contract} disabled={true} />
      </td>
      <td>{position}</td>
      <td className="close" data-id={id} onClick={del}>
        <Icon type="delete" theme="twoTone" />
      </td>
      <td className="edit" data-id={id} onClick={edit}>
        <Icon type="edit" theme="twoTone" />
      </td>
    </tr>
  );
}

export default Row;
