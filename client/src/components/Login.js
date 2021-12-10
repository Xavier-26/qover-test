import React from 'react'
import axios from "axios";


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const backend_url = "http://localhost:8000"
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.post(backend_url + "/users/login",
      {
        username: this.state.username,
        password: this.state.password,
        withCredentials: true
      }).then((response) => {
        if (response.data.token) {
          this.props.setToken({token: response.data.token});
        }
      }
      );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="string"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
    );
  }
}

export default Login;