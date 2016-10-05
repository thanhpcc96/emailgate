import React, { PropTypes, Component } from 'react';
import PurchaseOrdersListItem from './PurchaseOrdersListItem';

class PurchaseOrdersList extends Component {
  renderOrdersList() {
    return this.props.purchaseOrders.map((purchaseOrder) => {
      return <PurchaseOrdersListItem key={purchaseOrder._id} purchaseOrder={purchaseOrder} />;
    });
  }
  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          {this.renderOrdersList()}
        </div>
      </div>
    );
  }
}

PurchaseOrdersList.propTypes = {
  purchaseOrders: PropTypes.array.isRequired,
};

export default PurchaseOrdersList;
