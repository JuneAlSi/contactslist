import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

export default class Addcontact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

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

    const newContact = {
      name,
      email,
      phone,
      errors: {}
    };

    const response = await axios.post(
      'http://jsonplaceholder.typicode.com/users',
      newContact
    );

    dispatch({ type: 'ADD_CONTACT', payload: response.data });

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
              <div className="card-header">Add Contact</div>
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
                    value="Add Contact"
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
