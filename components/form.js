import React from "react";
import "../index.css";
import nanoid from "nanoid";
import { Button, Input, Checkbox, Form, Icon } from "antd";

class HorizontalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    let { name, contract, position, id } = this.props.editable;

    this.state = {
      name: name ? name : "",
      contract: contract ? contract : true,
      position: position ? position : "",
      id: id ? id : ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    let { name, contract, position, id } = this.props.editable;

    if (this.props.editable.id === prevProps.editable.id) {
      return null;
    } else {
      this.setState({
        name: name,
        contract: contract,
        position: position,
        id: id
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const addWorker = this.props.actions.addWorker;
    let { name, contract, position } = this.state;

    const person = {
      name: name,
      contract: contract,
      position: position,
      id: nanoid()
    };

    addWorker(person);

    this.setState({
      name: "",
      contract: true,
      position: "",
      id: ""
    });
  }

  handleInputChange(e) {
    let target = e.target;
    let name = e.target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  isJunior() {}

  render() {
    let { name, contract, position } = this.state;
    const options = this.props.categories;
    const changeName = this.props.actions.buttonName();
    const isJunior =
      this.state.position === "Junior Back-end developer" ||
      this.state.position === "Junior Front-end developer";

    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        className="form-container"
      >
        <div className="row1">
          <Form.Item>
            <Input
              size="large"
              placeholder="Worker's name"
              value={name}
              type="text"
              name="name"
              onChange={this.handleInputChange}
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              name="contract"
              onChange={this.handleInputChange}
              checked={isJunior ? !contract : contract}
              disabled={isJunior}
            >
              <span className="checkbox-descr">On Contract</span>
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <select
              name="position"
              value={position}
              onChange={this.handleInputChange}
            >
              {options.map(option => {
                return <option key={option.value}>{option.text}</option>;
              })}
            </select>
          </Form.Item>
        </div>
        <div className="row2">
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit">
              {changeName}
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create({ name: "horizontal_login" })(
  HorizontalLoginForm
);
export default WrappedHorizontalLoginForm;
