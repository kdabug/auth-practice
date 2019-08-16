import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showError: false
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  async handleSubmitForm(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const { handleLogin } = this.props;

    this.setState({ showError: false });

    try {
      await handleLogin({ email, password });
    } catch (e) {
      this.setState({ showError: true });
    }
  }

  handleTextInput(event) {
    const fieldName = event.target.name;
    const value = event.target.value;

    this.setState(state => {
      return { [fieldName]: value };
    });
  }

  render() {
    const { showError } = this.state;
    const { isSignedIn } = this.props;

    let errorMessage;

    if (showError) {
      errorMessage = (
        <div className="errorMessage">
          <span>
            An error occurred, please ensure your credentials are correct
          </span>
        </div>
      );
    }

    if (isSignedIn) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div>
        {errorMessage}
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

export default LoginForm;
