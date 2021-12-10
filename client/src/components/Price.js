import React from 'react'
import axios from "axios";

import Footer from "./Footer";
import { Background } from "./elements/";

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { age: null, car: "AUDI", price: null, form: true, policyPrice: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
      }
      );
  }

  render() {
    const form = (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label >Age of the driver</label>
          <input type="string" name="age" placeholder="25" value={this.state.age} onChange={this.handleChange} />
        </div>
        <div>
          <label >Car</label>
          <select name="car" id="car" value={this.state.car} onChange={this.handleChange} >
            <option value="AUDI">Audi</option>
            <option value="BMW">BMW</option>
            <option value="PORSCHE">Porsche</option>
          </select>
        </div>
        <div>
          <label >Purchase price</label>
          <input type="string" name="price" placeholder="10.000" value={this.state.price} onChange={this.handleChange} />
        </div>
        <div>
          <input type="submit" value="Get a price" />
        </div>
      </form>
    );
    const res = (
      <div>
        <table>
          <tbody>
            <tr>
              <td>
                Global price
              </td>
              <td>
                {this.state.policyPrice && this.state.policyPrice["globalPrice"]}
              </td>
              <td>
                ({this.state.policyPrice && this.state.policyPrice["universalPriceMonthly"]} monthly)
              </td>
              <td>
                <a href="/policies/select-global">Select me</a>
              </td>
            </tr>
            <tr>
              <td>
                Universal plan
              </td>
              <td>
                {this.state.policyPrice && this.state.policyPrice["globalPrice"]}
              </td>
              <td>
                ({this.state.policyPrice && this.state.policyPrice["globalPriceMonthly"]} monthly)
              </td>
              <td>
                <a href="/policies/select-universal">Select me</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return (
      <Background>
        {this.state.form ? form : res}
        <Footer setToken={this.props.setToken}/>
      </Background>
    );
  }
}

export default Login;