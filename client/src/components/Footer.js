import React from "react";
import styled from 'styled-components';
import axios from "axios";

const Box = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const LogoutButton = styled.button`
`;

class Footer extends React.Component {

  render() {
    const logout = async () => {
      const backend_url = "http://localhost:8000"
      axios.defaults.headers.post['Content-Type'] = 'application/json'

      axios.get(backend_url + "/users/logout");

      this.props.setToken({token: null})
    };

    return (
      <Box>
        <LogoutButton onClick={logout}>Logout</LogoutButton>;
      </Box>
    );
  }
};
export default Footer;