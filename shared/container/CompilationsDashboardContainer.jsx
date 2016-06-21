import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions/index';
import CompilationsListContainer from '../container/CompilationsListContainer';

class CompilationsDashboardContainer extends Component {
  componentDidMount() {
    if (this.props.compilations.length < 1 && !this.props.fetching.compilations) {
      this.props.dispatch(Actions.getCompilations());
    }
  }
  render() {
    return (<div>
      <h1>Compilations</h1>
      <CompilationsListContainer />
    </div>);
  }
}

CompilationsDashboardContainer.need = [
  (params, cookie) => {
    return Actions.getCompilations.bind(null, cookie)();
  },
];

function mapStateToProps(store) {
  return {
    compilations: store.compilations,
    fetching: store.fetching,
  };
}

CompilationsDashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  compilations: PropTypes.array.isRequired,
  fetching: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(CompilationsDashboardContainer);
