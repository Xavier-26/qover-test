import React from 'react'
import axios from "axios";
import styled from 'styled-components';

import { Background, Label, LoginInput, LoginInputSubmit } from "./elements/";
import logo from "../logo.svg";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoBox = styled.img`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 86.1px;
  height: 100px;
  object-fit: contain;
`;

const CenterRectangle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 350px;
  margin-bottom: 20px;
  padding: 0;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 #d4dce2;
  background-color: #fff;
`;

const CenterNestedRectangle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
  margin-top: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Welcome = styled.div`
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
  color: #5b7289;
`;

const AccessRectangle = styled.div`
  width: 350px;
  height: 45px;
  border-radius: 3px;
  border: solid 1px #fff;
`;

const AccessText = styled.text`
  margin: 15px 63.5px 14px 64.5px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`

const Qover2017 = styled.span`
  width: 74px;
  height: 17px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  color: #fff;
`

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
          <LoginInputSubmit type="submit" value="Sign in to your account" />
        </div>
      </form>
    );

    return (
      <Background>
        <Box>
          <LogoBox src={logo} alt="logo" />
          <CenterRectangle>
            <CenterNestedRectangle>
              <Welcome>Welcome at QOver </Welcome>

              {loginForm}
            </CenterNestedRectangle>
          </CenterRectangle>
          <AccessRectangle>
            <AccessText>
              Don’t have an account? Ask access
            </AccessText>
          </AccessRectangle>
        </Box>
        <Box>
          <Qover2017>
            © Qover 2017
          </Qover2017>
        </Box>
      </Background>
    );
  }
}

export default Login;