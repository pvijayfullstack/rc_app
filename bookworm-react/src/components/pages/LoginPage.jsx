import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm from '../forms/LoginForm';
import { login } from '../../actions/auth';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  submit = data =>
    this.props.login(data).then(() => this.props.history.push('/dashboard'));

  render() {
    return (
      <div>
        <h3>Login Page</h3>
        <LoginForm submit={this.submit} />
        <Link to="/forgot_password">Forgot password</Link>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);
