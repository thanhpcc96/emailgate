import React, { PropTypes, Component } from 'react';
import EmailsListItem from './EmailsListItem';

class EmailsList extends Component {
  constructor(props, context) {
    super(props, context);
  }
  renderEmails() {
    return this.props.emails.map((email, index) => {
      return (<EmailsListItem
        key={`${email.mid}-${index}`}
        email={email}
        selected={email.selected}
        previewing={email.mid === this.props.previewEmailMid}
        selectEmail={this.props.selectEmail}
        deselectEmail={this.props.deselectEmail}
        setPreviewEmail={this.props.setPreviewEmail}
      />);
    });
  }
  render() {
    return (
      <div className="emails-list">
        {this.renderEmails()}
      </div>
    );
  }
}

EmailsList.propTypes = {
  emails: PropTypes.array.isRequired,
  previewEmailMid: PropTypes.string,
  selectEmail: PropTypes.func.isRequired,
  deselectEmail: PropTypes.func.isRequired,
  setPreviewEmail: PropTypes.func.isRequired,
};

export default EmailsList;