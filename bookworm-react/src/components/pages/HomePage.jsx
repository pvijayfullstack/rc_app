import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const HomePage = ({ isAuthenticated, logout }) => (
  <div>
    <h3>Home Page</h3>
    {isAuthenticated ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <div>
        <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link>
      </div>
    )}
  </div>
);

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.token
});

export default connect(mapStateToProps, { logout })(HomePage);
