import React from "react";
import styled from 'styled-components';


const Rectangle22 = styled.input`
  width: 310px;
  border: none;
  margin-top: 10px;
  border-bottom: 2px solid #317bda;
`

export class LoginInput extends React.Component {

  render() {
    return (
      <Rectangle22 {...this.props}/>
    );
  }
};
