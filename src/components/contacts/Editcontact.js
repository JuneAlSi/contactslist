import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export default class Editcontact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const url = `http://jsonplaceholder.typicode.com/users/${id}`;
    const response = await axios.get(url);
    const contact = response.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  submitForm = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    // check for error inputs
    if (name === '') {
      this.setState({ errors: { name: 'Name is required!' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required!' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required!' } });
      return;
    }

    const updateContact = {
      name,
      email,
      phone
    };

    const { id } = this.props.match.params;
    const url = `http://jsonplaceholder.typicode.com/users/${id}`;
    const response = await axios.put(url, updateContact);

    dispatch({ type: 'UPDATE_CONTACT', payload: response.data });

    // clear state(form)
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    // redirect to homepage
    this.props.history.push('/');
  };

  inputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Update Contact</div>
              <div className="card-body">
                <form onSubmit={this.submitForm.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.inputChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.inputChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.inputChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
