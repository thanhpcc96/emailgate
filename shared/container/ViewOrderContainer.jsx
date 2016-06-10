import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import _ from 'lodash';
import * as Actions from '../redux/actions/index';
import Loading from '../components/Loading';
import OrderView from '../components/OrderView';

class ViewOrderContainer extends Component {
  constructor(props, context) {
    super(props, context);

    this.order = _.find(this.props.orders, { _id: this.props.params.id }) || {};
  }
  componentDidMount() {
    if (this.props.orders.length < 1) {
      this.props.dispatch(Actions.getOrders());
    }
  }
  componentWillReceiveProps(nextProps) {
    this.order = _.find(nextProps.orders, { _id: nextProps.params.id }) || {};
  }
  renderView() {
    if (this.props.fetching.orders) {
      return <span className="alone-loading"><Loading /></span>;
    } else if (this.order) {
      return <OrderView order={this.order} />;
    }
  }

  render() {
    return (<div>
      <Header />
      <div className="container">
        {this.renderView()}
      </div>
    </div>);
  }
}

ViewOrderContainer.need = [
  (params, cookie) => {
    return Actions.getOrders.bind(null, cookie)();
  },
];

function mapStateToProps(store) {
  return {
    orders: store.orders,
    fetching: store.fetching,
  };
}

ViewOrderContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  fetching: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ViewOrderContainer);