import React, { PropTypes, Component } from 'react';
import Modal from '../components/Modal';
import CompilationBuildContainer from './CompilationBuildContainer';
import CompilationPageForm from '../components/CompilationPageForm';
import MessagePageTemplate from '../templates/messagePage';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import _ from 'lodash';

class CompilationMessageContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.update = this.update.bind(this);
    this.back = this.back.bind(this);

    this.messagePage = _.find(this.props.compilationPages, { type: 'message-page' });
  }
  template() {
    return new MessagePageTemplate(this.messagePage);
  }
  update(props) {
    this.props.dispatch(Actions.updateCompilationPageFetch(this.props.compilation._id, this.messagePage, props, (compilation) => {
      this.context.router.push(`/compilations/${compilation._id}/build`);
    }));
  }
  back() {
    this.context.router.push(`/compilations/${this.props.compilation._id}/build`);
  }
  render() {
    return (<div>
      <CompilationBuildContainer compilation={this.props.compilation} ffooter={false} />;
      <Modal close={this.back}>
        <div>
          <h1 className="text-center">Edit Message</h1>
          <CompilationPageForm page={this.messagePage} template={this.template()} submitForm={this.update} />
        </div>
      </Modal>
    </div>);
  }
}

function mapStateToProps(store) {
  return {
    compilationPages: store.compilationPages,
  };
}

CompilationMessageContainer.contextTypes = {
  router: PropTypes.object.isRequired,
};

CompilationMessageContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  compilation: PropTypes.object.isRequired,
  compilationPages: PropTypes.array.isRequired,
  params: PropTypes.object,
};

export default connect(mapStateToProps)(CompilationMessageContainer);
