import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/index';
import _ from 'lodash';

class PurchaseOrdersWrapper extends Component { // eslint-disable-line
  constructor(props, context) {
    super(props, context);

    this.order = _.find(this.props.purchaseOrders, { _id: this.props.params.purchaseOrderId });
  }
  componentDidMount() {
    if (this.props.purchaseOrders.length === 0) {
      this.props.dispatch(Actions.getOrders());
    }
  }
  componentWillReceiveProps(nextProps) {
    this.order = _.find(nextProps.orders, { _id: nextProps.params.orderId });
  }
  renderChildren() {
    if (this.props.children) {
      return React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, { purchaseOrder: this.purchaseOrder, purchaseOrders: this.props.purchaseOrders });
      });
    }
  }
  render() {
    return <div>{this.renderChildren()}</div>;
  }
}

PurchaseOrdersWrapper.need = [
  (params, cookie) => {
    return Actions.getPurchaseOrders.bind(null, cookie)();
  },
];

function mapStateToProps(store) {
  return {
    purchaseOrders: store.purchaseOrders,
  };
}

PurchaseOrdersWrapper.propTypes = {
  children: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  purchaseOrders: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(PurchaseOrdersWrapper);
