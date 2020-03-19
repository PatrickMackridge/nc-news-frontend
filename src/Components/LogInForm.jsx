import React, { Component } from "react";
import { getUser } from "../api";

class LogInForm extends Component {
  state = { username: "", msg: "Please log in:" };

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.state;
    getUser(username)
      .then(() => {
        this.props.logIn(username);
        this.setState({ msg: "Please log in:" });
      })
      .catch(err => {
        this.setState({ msg: "Invalid username. Please try again" });
      });

    // getUser then => this.props.logInUser(this.state.username) / catch => setState({msg: "NO"})
    this.setState({ username: "" });
  };

  render() {
    const { user } = this.props;
    const { username, msg } = this.state;
    if (user === null) {
      return (
        <div className="login">
          <p>{msg}</p>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username: <input value={username} onChange={this.handleChange} />
            </label>
            <button>Log in!</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="login">
          <p>Welcome {user}.</p>
          <button onClick={this.props.logOut}>Log Out</button>
        </div>
      );
    }
  }
}

export default LogInForm;
