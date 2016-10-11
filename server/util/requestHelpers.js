import _ from 'lodash';

// function decPrice(price) {
//   return price / 100;
// }

function getPurchaseOrderId(purchaseOrder) {
  return `purc-${purchaseOrder._id}`;
}

function getAddressId(address) {
  return `addr-${address._id}`;
}

function getItemId(compilation) {
  return `comp-${compilation._id}`;
}

function requestShipToItems(order) {
  return order.items.map((item) => {
    return {
      ItemId: getItemId(item.props.compilation),
      Qty: item.quantity,
    };
  });
}

function requestShipTo(order) {
  return {
    AddressId: getAddressId(order.shippingAddress),
    CarrierAccountNumber: '',
    Currency: 'USD',
    EndCustomerId: '',
    Items: requestShipToItems(order),
    Method: '',
    OrgId: '',
    PackingSlip: {
      Currency: 'USD',
      MessageLine1: 'Thank you for your order',
      MessageLine2: 'Please tell your friends about myemailbook.com',
    },
  };
}

function requestShipTos(orders) {
  return orders.map((order) => {
    return requestShipTo(order);
  });
}

export function requestAddress(address) {
  return {
    Id: getAddressId(address),
    City: address.city,
    Company: `${address.firstName} ${address.lastName}`,
    Country: 'USA',
    Line1: address.address1,
    Line2: address.address2,
    PostalCode: address.postalCode,
    Province: address.region,
    ContactLastName: address.lastName,
    PhoneNumber: address.phone,
  };
}

export function requestItem(item) {
  const compilation = item.props.compilation;
  return {
    Id: getItemId(item.props.compilation),
    BindingType: 'Hardcover',
    BookTypeId: 999999,
    BookBlock: {
      FileVersion: '2007-05-30 11:47:15',
      Url: compilation.pdf.url,
    },
    Cover: {
      FileVersion: '2007-05-30 11:47:15',
      Url: compilation.pdf.url,
      Color: 'Red',
    },
    PageCount: compilation.pdf.pageCount,
  };
}

export function requestAddresses(orders) {
  return orders.map((order) => {
    return requestAddress(order.shippingAddress);
  });
}

export function requestItems(orders) {
  return _.flatten(orders.map((order) => {
    return order.items.map((item) => {
      return requestItem(item);
    });
  }));
}

export function requestOrder(purchaseOrder, orders) {
  return {
    BillToAddressId: '',
    Id: getPurchaseOrderId(purchaseOrder),
    OrderReference1: '',
    ReturnToAddressId: '',
    ServiceLevel: '',
    ShipTos: requestShipTos(orders),
  };
}

export function buildRequest(purchaseOrder, orders) {
  return {
    Auth: 'yoda2',
    CustomerId: '',
    PayloadId: '',
    Addresses: requestAddresses(orders),
    Items: requestItems(orders),
    Order: requestOrder(purchaseOrder, orders),
  };
}