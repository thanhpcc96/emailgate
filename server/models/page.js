import Mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import _ from 'lodash';
import { pageTemplateFactory } from '../util/helpers';

const PageSchema = new Schema({
  _id: { type: String, unique: true, default: shortid.generate },
  _compilation: { type: String, ref: 'Compilation' },
  type: String,
  html: String,
  content: {},
  pdf: {},
  estimatedPageCount: { type: Number, default: 1 },
}, {
  timestamps: true,
});

PageSchema.statics.defaultPages = function defaultPages() {
  return [
    { type: 'cover' },
    { type: 'title-page' },
    // { type: 'message-page' },
    { type: 'table-of-contents' },
  ];
};

PageSchema.post('init', function () {  // eslint-disable-line func-names
  this._original = this.toObject();
});

PageSchema.pre('save', function (next) { // eslint-disable-line func-names
  let tasks = Promise.resolve();

  tasks = tasks.then(this.getHtml);

  tasks.then(() => { next(); });
});

PageSchema.methods.getHtml = function getHtml() {
  return pageTemplateFactory(this)
  .then((template) => {
    this.html = template.toString();

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
