import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';

export default class Contact extends Component {
  state = {
    showContactData: false
  };

  onShowData = e => {
    this.setState({ showContactData: !this.state.showContactData });
  };

  onDeleteData = async (id, dispatch) => {
    const url = `http://jsonplaceholder.typicode.com/users/${id}`;
    try {
      await axios.delete(url);
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id
      });
    } catch (e) {
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id
      });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactData } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={this.onShowData}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteData.bind(this, id, dispatch)}
                />
                <Link to={`contact/update/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactData ? (
                <ul className="list-group">
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
