import React from 'react'
import axios from "axios";
import styled from 'styled-components';
import Switch from '@mui/material/Switch';

import Footer from "./elements/Footer";
import { Background } from "./elements/";


const CenterRectangle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 435px;
  height: 370px;
  padding: 60px 222px 60px 220px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(72, 72, 72, 0.5);
  background-color: #fff;
`;


const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  margin-right: 40px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;

  margin-left: 40px;
`;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      age: null,
      car: "AUDI",
      price: null,
      form: true,
      policyPrice: null,
      errorMessage: null,
      isFormValid: true,
      displayMonthly: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => this.validate());
  }

  handleSwitchChange() {
    this.setState({ displayMonthly: !this.state.displayMonthly })
  }

  validate() {
    let error = null;
    const age = this.state.age;
    const car = this.state.car;
    const price = this.state.price;
    console.log(age, car, price)
    if (age !== null && price !== null) {
      if (age < 18)
        error = "Sorry! The driver is too young";
      if (car === "PORSCHE" && age < 25)
        error = "Sorry! We can not accept this particular risk";
      if (price < 5000)
        error = "Sorry! The price of the car is too low";
    }

    if (!error) {
      this.setState({ isFormValid: true })
      this.setState({ errorMessage: null })
    } else {
      this.setState({ errorMessage: error })
      this.setState({ isFormValid: false })
    }
  }

  formatPrice(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '€'
  }

  handleSubmit(event) {
    event.preventDefault();
    const backend_url = "http://localhost:8000"
    axios.defaults.headers.post['Content-Type'] = 'application/json'

    axios.get(backend_url + "/policies/price",
      {
        params: {
          age: this.state.age,
          price: this.state.price,
          car: this.state.car
        },
      }).then((response) => {
        if (response.data.res) {
          this.setState({ policyPrice: response.data.res });
          this.setState({ form: false });
        }
        if (response.data.errorMessage)
          this.setState({ errorMessage: response.data.errorMessage });
      }
      );
  }

  render() {
    const form = (
      <CenterRectangle>
        <form onSubmit={this.handleSubmit}>
          <div> {this.state.errorMessage} </div>

          <Box>
            <LeftColumn>
              <label >Age of the driver</label>
              <label >Car</label>

              <label >Purchase price</label>
            </LeftColumn>
            <RightColumn>
              <input type="string" name="age" placeholder="25" value={this.state.age} onChange={this.handleChange} />

              <select name="car" id="car" value={this.state.car} onChange={this.handleChange} >
                <option value="AUDI">Audi</option>
                <option value="BMW">BMW</option>
                <option value="PORSCHE">Porsche</option>
              </select>

              <input type="string" name="price" placeholder="10.000" value={this.state.price} onChange={this.handleChange} />
            </RightColumn>
          </Box>
          <div>
            <input type="submit" value="Get a price" disabled={!this.state.isFormValid} />
          </div>
        </form>
      </CenterRectangle>
    );
    const res = (
      <div>
        <CenterRectangle>
          <Switch label={"Monthly"} onChange={this.handleSwitchChange} />
          <Box>
            <LeftColumn>
              <div>Global price</div>
              {this.state.displayMonthly ? (
                <div>{this.state.policyPrice &&
                  this.formatPrice(this.state.policyPrice["universalPriceMonthly"])} monthly</div>
              ) : (
                <div>{this.state.policyPrice &&
                  this.formatPrice(this.state.policyPrice["globalPrice"])} yearly</div>
              )}
              <a href="/policies/select-global">Select me</a>
            </LeftColumn>

            <RightColumn>
              <div>Universal plan</div>
              {this.state.displayMonthly ? (
                <div>{this.state.policyPrice &&
                  this.formatPrice(this.state.policyPrice["globalPriceMonthly"])} monthly</div>
              ) : (
                <div>{this.state.policyPrice &&
                  this.formatPrice(this.state.policyPrice["globalPrice"])} yearly</div>
              )}
              <a href="/policies/select-universal">Select me</a>
            </RightColumn>
          </Box>
          <button onClick={() => this.setState({ form: true })}>Back to form!</button>
        </CenterRectangle>
      </div>
    );
    return (
      <Background>
        {this.state.form ? form : res}
        <Footer setToken={this.props.setToken} />
      </Background>
    );
  }
}

export default Login;