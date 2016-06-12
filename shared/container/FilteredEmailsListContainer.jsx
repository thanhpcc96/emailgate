import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import FilteredEmailsList from '../components/FilteredEmailsList';
import FilteredEmailsListActions from '../components/FilteredEmailsListActions';
import _ from 'lodash';
import { sortedEmails } from '../helpers';

class FilteredEmailsListContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.selectEmail = this.selectEmail.bind(this);
    this.deselectEmail = this.deselectEmail.bind(this);
    this.setCurrentFilteredEmail = this.setCurrentFilteredEmail.bind(this);

    this.selectAll = this.selectAll.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.addSelectedToCompilation = this.addSelectedToCompilation.bind(this);
  }

  setCurrentFilteredEmail(email) {
    this.props.dispatch(Actions.setCurrentFilteredEmailMid(email.mid));
  }
  selectEmail(email) {
    this.props.dispatch(Actions.setPropertyForFilteredAccountEmail(email, 'selected', true));
  }
  deselectEmail(email) {
    this.props.dispatch(Actions.setPropertyForFilteredAccountEmail(email, 'selected', false));
  }
  selectAll() {
    const nonCompilationEmails = _.filter(this.props.filteredAccountEmails, (email) => {
      return !this.props.compilationEmailMids.indexOf(email.mid) > -1;
    });

    const emailMids = _.map(nonCompilationEmails, (email) => { return email.mid; });

    this.props.dispatch(Actions.setPropertyForSomeFilteredAccountEmails(emailMids, 'selected', true));
  }
  deselectAll() {
    const nonCompilationEmails = _.filter(this.props.filteredAccountEmails, (email) => {
      return !this.props.compilationEmailMids.indexOf(email.mid) > -1;
    });

    const emailMids = _.map(nonCompilationEmails, (email) => { return email.mid; });

    this.props.dispatch(Actions.setPropertyForSomeFilteredAccountEmails(emailMids, 'selected', false));
  }
  addSelectedToCompilation() {
    this.props.dispatch(Actions.addEmailsToCompilationEmails(this.props.compilation._id, _.filter(this.props.filteredAccountEmails, { selected: true })));
  }
  isSavingEmails() {
    return _.some(this.props.filteredAccountEmails, (email) => { return email.saving; });
  }
  render() {
    return (
      <div>
        <FilteredEmailsListActions
          selectAll={this.selectAll}
          deselectAll={this.deselectAll}
          addSelectedToCompilation={this.addSelectedToCompilation}
          canAdd={_.some(this.props.filteredAccountEmails, { selected: true })}
          compilationEmailsCount={this.props.compilationEmailMids.length}
          compilationId={this.props.compilation._id}
          saving={this.isSavingEmails()}
        />
        <FilteredEmailsList
          emails={sortedEmails(this.props.filteredAccountEmails)}
          compilationEmailMids={this.props.compilationEmailMids}
          currentFilteredEmailMid={this.props.currentFilteredEmail.mid}
          deselectEmail={this.deselectEmail}
          selectEmail={this.selectEmail}
          setCurrentFilteredEmail={this.setCurrentFilteredEmail}
        />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    filteredAccountEmails: store.filteredAccountEmails,
  };
}

FilteredEmailsListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  filteredAccountEmails: PropTypes.array.isRequired,
  compilationEmailMids: PropTypes.array.isRequired,
  currentFilteredEmail: PropTypes.object,
  compilation: PropTypes.object,
};

export default connect(mapStateToProps)(FilteredEmailsListContainer);
