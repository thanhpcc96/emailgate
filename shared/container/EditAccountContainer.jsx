import React, { PropTypes, Component } from 'react';
import Header from '../components/Header';
import AccountForm from '../components/AccountForm';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import _ from 'lodash';

class EditAccountContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.update = this.update.bind(this);
    this.back = this.back.bind(this);
    this.checkConnection = this.checkConnection.bind(this);

    this.account = _.find(this.props.accounts, { _id: this.props.params.id }) || {};
  }

  componentDidMount() {
    this.checkConnectionIfNeeded();
  }

  componentWillReceiveProps(nextProps) {
    this.account = _.find(nextProps.accounts, { _id: nextProps.params.id }) || {};
  }

  update(props) {
    this.props.dispatch(Actions.updateAccount(this.props.params.id, {
      email: props.email,
      password: props.password,
      host: props.host,
      port: props.port,
    }, () => {
      this.checkConnectionIfNeeded();
    }));
  }

  checkConnection() {
    this.props.dispatch(Actions.checkAccountConnection(this.account));
  }

  checkConnectionIfNeeded() {
    if (this.account.checkingConnection) { return; }

    if (!this.account.connectionCheckedAt || this.account.connectionCheckedAt < this.account.updatedAt) {
      this.checkConnection();
    }
  }

  back() {
    this.context.router.goBack();
  }

  render() {
    return (
      <div className="edit-account-container">
        <Header />
        <div className="container">
          <h1>Edit Account</h1>
          <AccountForm checkConnection={this.checkConnection} account={this.account} submitForm={this.update} back={this.back} />
        </div>
      </div>
    );
  }
}

EditAccountContainer.need = [(params, cookie) => {
  return Actions.getAccounts.bind(null, cookie)();
}];

function mapStateToProps(store) {
  return {
    accounts: store.accounts,
  };
}

EditAccountContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};

EditAccountContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  accounts: PropTypes.array,
  params: PropTypes.object,
};

export default connect(mapStateToProps)(EditAccountContainer);