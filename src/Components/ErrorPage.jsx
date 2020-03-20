import React, { Component } from "react";

class ErrorPage extends Component {
  state = { status: 404, msg: "Page Not Found" };

  componentDidMount() {
    const { status, msg } = this.props;
    if (status && msg !== undefined) {
      this.setState({ msg: msg, status: status });
    }
  }

  render() {
    const { status, msg } = this.state;
    return <h2 className="err-msg">Error {status + ": " + msg}</h2>;
  }
}

export default ErrorPage;
