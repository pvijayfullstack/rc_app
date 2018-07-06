import React from 'react';
import PropTypes from 'prop-types';
import { Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth.js';

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
      .then(() => {
        console.log('Bam');
        this.setState({ loading: false, success: true });
      })
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div>
        {loading && (
          <Message>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email123</Message.Header>
          </Message>
        )}
        {!loading &&
          success && (
            <Message success icon>
              <Icon name="checkmark" />
              <Message.Content>
                <Message.Header>Your account has been veryfied</Message.Header>
                <Link to="/dashboard">Dashboard</Link>
              </Message.Content>
            </Message>
          )}

        {!loading &&
          !success && (
            <Message negative icon>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>
                  Woops... Invalid token. Or you have been already veryfied.
                </Message.Header>
              </Message.Content>
            </Message>
          )}
      </div>
    );
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage);
