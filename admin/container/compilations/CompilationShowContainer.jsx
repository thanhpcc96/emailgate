import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import CompilationView from '../../components/compilations/CompilationView';
import * as Actions from '../../redux/actions/index';

class CompilationShowContainer extends Component { // eslint-disable-line
  constructor(props, context) {
    super(props, context);
    this.buildPdf = this.buildPdf.bind(this);
  }
  buildPdf() {
    this.props.dispatch(Actions.buildCompilationPdf(this.props.compilation._id));
  }
  render() {
    return (<div>
      <CompilationView compilation={this.props.compilation} buildPdf={this.buildPdf} />
    </div>);
  }
}

CompilationShowContainer.propTypes = {
  dispatch: PropTypes.func,
  compilation: PropTypes.object,
};

export default connect()(CompilationShowContainer);
