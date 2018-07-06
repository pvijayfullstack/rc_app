import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';
import SignupPage from './components/pages/SignupPage';
import ConfirmationPage from './components/pages/ConfirmationPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import NewBookPage from './components/pages/NewBookPage';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';

const App = ({ location, isAuthenticated }) => (
  <Container>
    {isAuthenticated && <TopNavigation />}
    <Route location={location} exact path="/" component={HomePage} />
    <Route
      location={location}
      exact
      path="/confirmation/:token"
      component={ConfirmationPage}
    />
    <GuestRoute location={location} exact path="/login" component={LoginPage} />
    <GuestRoute
      location={location}
      exact
      path="/signup"
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      exact
      path="/forgot_password"
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      exact
      path="/reset_password/:token"
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      exact
      path="/dashboard"
      component={DashboardPage}
    />
    <UserRoute
      location={location}
      exact
      path="/books/new"
      component={NewBookPage}
    />
  </Container>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.email
});

export default connect(mapStateToProps)(App);
