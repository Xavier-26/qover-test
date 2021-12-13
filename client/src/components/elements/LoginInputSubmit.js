import React from "react";
import styled from 'styled-components';


const Rectangle3 = styled.input`
  width: 310px;
  height: 45px;
  margin: 35px 0 0;
  padding: 15px 82.5px 14px;
  border: none;
  border-radius: 3px;
  background-color: #317bda;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`

export class LoginInputSubmit extends React.Component {

  render() {
    return (
      <Rectangle3 {...this.props}/>
    );
  }
};
