import React from 'react'
import axios from "axios";
import styled from 'styled-components';

import { Background, Label, LoginInput } from "./elements/";
import logo from "../logo.svg";

const RectangleCopy = styled.div`
  width: 350px;
  height: 332px;
  margin: 30px 0 20px;
  padding: 30px 20px 20px;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 #d4dce2;
  background-color: #fff;
`;

const Welcome = styled.span`
  width: 147px;
  height: 28px;
  margin: 0 81px 20px 66px;
  font-family: Roboto;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: center;
  color: var(--blue-grey);
`;


class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };

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
          this.props.setToken({ token: response.data.token });
        }
      }
      );
  }



  render() {
    const loginForm = (
      <form onSubmit={this.handleSubmit}>
        <div>
          <Label>Username</Label>
          <LoginInput
            type="string"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <Label>Password</Label>
          <LoginInput
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

    return (
      <Background>
        <img src={logo} alt="logo" />
        <RectangleCopy>
          <Welcome>Welcome at QOver </Welcome>

          {loginForm}
        </RectangleCopy>

      </Background>
    );
  }
}

export default Login;