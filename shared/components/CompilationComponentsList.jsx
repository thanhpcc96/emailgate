import React, { PropTypes, Component } from 'react';
import CompilationEmailsListItem from './CompilationEmailsListItem';
import CompilationPagesListItem from './CompilationPagesListItem';
import * as sharedHelpers from '../helpers';
import { Link } from 'react-router';

class CompilationComponentsList extends Component {
  constructor(props, context) {
    super(props, context);
    this.sortedEmails = this.sortedEmails.bind(this);
    this.sortedPages = this.sortedPages.bind(this);
  }
  sortedEmails() {
    return sharedHelpers.sortedEmails(this.props.emails);
  }
  sortedPages() {
    return sharedHelpers.sortedPages(this.props.pages);
  }
  renderEmails() {
    return this.sortedEmails().map((email) => {
      const current = email._id === this.props.currentEmailId;
      let show = 'thumb';
      if (current && this.props.edit) {
        show = 'edit';
      } else if (current) {
        show = 'view';
      }

      return (<CompilationEmailsListItem
        key={`${email._id}`}
        email={email}
        show={show}
      />);
    });
  }
  renderPages() {
    return this.sortedPages().map((page) => {
      return (<CompilationPagesListItem
        key={`${page._id}`}
        current={page._id === this.props.currentPageId}
        page={page}
        edit={this.props.edit}
      />);
    });
  }
  renderAddEmailLink() {
    return (<Link
      className="btn btn-success btn-block bottom-bumper"
      to={`/compilations/${this.props.compilation._id}/add-emails`}
    >
      Add Emails
    </Link>);
  }
  render() {
    return (<div className="row">
      <div className="component-list col-md-6 col-md-offset-3">
        <div className="pages-list">
          {this.renderPages()}
        </div>
        <div className="emails-list">
          {this.renderEmails()}
        </div>
      </div>
    </div>);
  }
}

CompilationComponentsList.propTypes = {
  compilation: PropTypes.object.isRequired,
  emails: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
  currentEmailId: PropTypes.string,
  currentPageId: PropTypes.string,
  edit: PropTypes.func,
};

export default CompilationComponentsList;
