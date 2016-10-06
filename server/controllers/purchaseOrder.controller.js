import PurchaseOrder from '../models/purchaseOrder';

export function findOne(req, res) {
  PurchaseOrder.findOne({ _id: req.params.id })
  .then((purchaseOrder) => {
    res.json(purchaseOrder);
  });
}

export function get(req, res) {
  console.log(req.query);
  PurchaseOrder.find({})
  .then((purchaseOrders) => {
    res.json(purchaseOrders);
  });
}

export function create(req, res) {
  const newPurchaseOrder = new PurchaseOrder(req.body);
  newPurchaseOrder.save()
  .then((purchaseOrder) => {
    res.json(purchaseOrder);
  })
  .catch((err) => {
    console.log('An error happened', err);
  });
}

export function patch(req, res) {
  PurchaseOrder.findOne({ _id: req.params.id })
  .then((purchaseOrder) => {
    purchaseOrder.authProps = req.body.authProps; // eslint-disable-line no-param-reassign

    return purchaseOrder.save();
  })
  .then((purchaseOrder) => {
    res.json(purchaseOrder);
  });
}

export function remove(req, res) {
  PurchaseOrder.remove({ _id: req.params.id })
  .then((purchaseOrder) => {
    res.json(purchaseOrder);
  });
}

export function addOrder(req, res) {
  PurchaseOrder.findOne({ _id: req.params.purchaseOrderId })
  .then((purchaseOrder) => {
    purchaseOrder.addOrder(req.params.orderId);
  })
  .then(PurchaseOrder.findOne({ _id: req.params.purchaseOrderId }))
  .then((purchaseOrder) => {
    res.json(purchaseOrder);
  });
}
