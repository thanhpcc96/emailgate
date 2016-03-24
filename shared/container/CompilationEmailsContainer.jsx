import React, { PropTypes, Component } from 'react';
import Header from '../components/Header';
import CompilationNav from '../components/CompilationNav';
import CompilationEmailsListContainer from './CompilationEmailsListContainer';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import _ from 'lodash';
import { Link } from 'react-router';

class CompilationEmailsContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.removeEmail = this.removeEmail.bind(this);

    this.compilation = _.find(this.props.compilations, { _id: this.props.params.compilationId }) || {};

    if (this.props.compilations.length < 1) {
      this.props.dispatch(Actions.getCompilations());
    }

    if (this.props.compilationEmails.length < 1) {
      this.props.dispatch(Actions.getCompilationEmails(this.props.params.compilationId));
    }

    this.currentEmail = _.find(this.props.compilationEmails, { _id: this.props.params.emailId });
  }
  componentWillReceiveProps(nextProps) {
    // console.log('CompilationEmailsContainer componentWillReceiveProps');
    // this._compilation = this.compilation;
    // this._currentEmail = this.currentEmail;

    this.compilation = _.find(nextProps.compilations, { _id: nextProps.params.compilationId }) || {};
    this.currentEmail = _.find(nextProps.compilationEmails, { _id: nextProps.params.emailId });

    // if (this._compilation !== this.compilation || this._currentEmail !== this.currentEmail) {
    //   console.log('force updating');
    //   this.forceUpdate();
    // }
  }
  removeEmail() {
    this.props.dispatch(Actions.removeEmailFromCompilationEmails(this.compilation._id, this.currentEmail));
  }
  renderAddLink() {
    return (<Link
      className="btn btn-primary btn-block bottom-bumper"
      to={`/compilations/${this.props.params.compilationId}/emails/add`}
    >
      Add Emails
    </Link>);
  }
  renderChildren() {
    if (this.props.children) {
      return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { compilation: this.compilation, currentEmail: this.currentEmail });
      });
    }
  }

  render() {
    return (
      <div className="edit-account-container">
        <Header />
        <CompilationNav compilationId={this.props.params.compilationId} currentPage="emails" />
        <div className="container">
          <h1>Compilation Emails ({this.props.compilationEmails.length})</h1>
          <div className="row">
            <div className="col-md-3">
              {this.renderAddLink()}
              <CompilationEmailsListContainer currentEmailId={this.props.params.emailId} compilation={this.compilation} />
            </div>
            <div className="col-md-9">
              { this.renderChildren() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CompilationEmailsContainer.need = [
  (params, cookie) => {
    return Actions.getCompilations.bind(null, cookie)();
  },
  (params, cookie) => {
    return Actions.getCompilationEmails.bind(null, params.compilationId, cookie)();
  },
];

function mapStateToProps(store) {
  return {
    compilations: store.compilations,
    compilationEmails: store.compilationEmails,
    editingCurrentCompilationEmail: store.editingCurrentCompilationEmail,
  };
}

CompilationEmailsContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};

CompilationEmailsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  compilations: PropTypes.array,
  compilationEmails: PropTypes.array,
  editingCurrentCompilationEmail: PropTypes.bool.isRequired,
  params: PropTypes.object,
};

export default connect(mapStateToProps)(CompilationEmailsContainer);
