import React, { Component } from "react";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  async handleSubmitForm(event) {
    event.preventDefault();

    console.log(`submitting the form`);
  }

  handleTextInput(event) {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState(state => {
      return { [fieldName]: value };
    });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmitForm}>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>

          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForms;
