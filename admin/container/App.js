import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import * as Actions from '../redux/actions/index';
// import _ from 'lodash';

class App extends Component { // eslint-disable-line
  // constructor(props, context) {
  //   super(props, context);
  // }
  render() {
    return (<div>
      {this.props.children}
    </div>);
  }
}

App.need = [];

function mapStateToProps(store) {
  return {
    config: store.config,
    user: store.user,
    cart: store.cart,
  };
}

App.contextTypes = {
  router: PropTypes.object.isRequired,
};

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(App);
