import React, { PropTypes, Component } from 'react';
import { prettyPrice } from '../helpers';
import Loading from './Loading';

class CartItemForm extends Component {
  constructor(props, context) {
    super(props, context);

    // this.setFormState = this.setFormState.bind(this);
    this.remove = this.remove.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.removeQuantity = this.removeQuantity.bind(this);
  }
  // setFormState(event) {
  //   const newState = {};
  //   newState[event.target.getAttribute('name')] = event.target.value;
  //
  //   this.props.update(this.props.cartItem, newState);
  // }
  remove() {
    this.props.remove(this.props.cartItem);
  }
  addQuantity() {
    this.props.update(this.props.cartItem, { quantity: (this.props.cartItem.quantity + 1) });
  }
  removeQuantity() {
    if (this.props.cartItem.quantity > 0) {
      this.props.update(this.props.cartItem, { quantity: (this.props.cartItem.quantity - 1) });
    }
  }
  renderProductDesc() {
    const { compilation } = this.props.cartItem.props; // eslint-disable-line

    return (<td className="cart-product-desc">
      <div className="compilation-thumb">
        <img role="presentation" src={compilation.thumbnail.url} />
      </div>
      <div className="details">
        <h4>{compilation.title} - about {compilation.meta.estimatedPagePdfPages} pages</h4>
        <h5>{compilation.subtitle}</h5>
        <h6>{this.props.product.desc}</h6>
      </div>
    </td>);
  }
  renderProductPrice() {
    return (<td>${prettyPrice(this.props.product.price)}</td>);
  }
  renderItemQuantity() {
    if (this.props.editable !== false) {
      return (<td className="text-center">
        <span className="btn btn-default basic no-margin" onClick={this.removeQuantity}>-</span>
        <span className="cart-quantity">{this.props.cartItem.quantity}</span>
        <span className="btn btn-default basic no-margin" onClick={this.addQuantity}>+</span>
      </td>);
    }

    return (<td className="text-center">
      {this.props.cartItem.quantity}
    </td>);
  }
  renderSubtotal() {
    const subtotal = prettyPrice(this.props.product.price * this.props.cartItem.quantity);
    return (<td className={this.props.editable ? 'text-center' : 'text-right'}>
      ${subtotal}
    </td>);
  }
  renderRemoveAction() {
    return (<span className="btn btn-danger btn-xs basic right-most" onClick={this.remove}>
      <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
    </span>);
  }
  renderActions() {
    if (this.props.editable !== false) {
      if (this.props.cartItem.fetching) {
        return <td className="actions"><Loading /></td>;
      }

      return (<td className="actions">
        {this.renderRemoveAction()}
      </td>);
    }
  }
  render() {
    return (<tr>
      {this.renderProductDesc()}
      {this.renderProductPrice()}
      {this.renderItemQuantity()}
      {this.renderSubtotal()}
      {this.renderActions()}
    </tr>);
  }
}

CartItemForm.propTypes = {
  cartItem: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  remove: PropTypes.func,
  update: PropTypes.func,
  editable: PropTypes.bool,
};

export default CartItemForm;
