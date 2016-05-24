import Mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import _ from 'lodash';
import { pageHtml } from '../util/pdf';
import queue from '../queue';

const PageSchema = new Schema({
  _id: { type: String, unique: true, default: shortid.generate },
  _compilation: { type: String, ref: 'User' },
  type: String,
  content: {},
  html: String,
  pdf: {},
}, {
  timestamps: true,
});

PageSchema.statics.defaultPages = function defaultPages() {
  return [
    { type: 'cover' },
    { type: 'title-page' },
    { type: 'message-page' },
    { type: 'table-of-contents' },
  ];
};

PageSchema.post('init', function () {  // eslint-disable-line func-names
  this._original = this.toObject();
});

PageSchema.pre('save', function (next) { // eslint-disable-line func-names
  this.getHtml()
  .then(() => {
    return this.schedulePdfTask();
  })
  .then(() => {
    next();
  });
});

PageSchema.methods.schedulePdfTask = function schedulePdfTask() {
  if (this.propChanged('html')) {
    queue.create('pdf', {
      title: 'Building pdf file for page',
      kind: 'page-pdf',
      pageId: this._id,
    }).save((err) => {
      if (err) console.log('An error happened adding page-pdf job to queue');
    });
  }

  return Promise.resolve(this);
};

PageSchema.methods.getHtml = function getHtml() {
  return pageHtml(this)
  .then((html) => {
    this.html = html;
    return Promise.resolve(this);
  });
};

PageSchema.methods.propChanged = function propChanged(propsString) {
  const original = this._original || {};
  const current = this.toObject();

  const originalProp = _.get(original, propsString);
  const currentProp = _.get(current, propsString);

  return !_.isEqual(originalProp, currentProp);
};

export default Mongoose.model('Page', PageSchema);
