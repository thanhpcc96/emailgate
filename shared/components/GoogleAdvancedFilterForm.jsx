import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class GoogleAdvancedFilterForm extends Component { // eslint-disable-line
  render() {
    const {
      fields: {
        from,
        to,
        contains,
        doesntContain,
        before,
        after,
      },
      handleSubmit,
    } = this.props;

    return (<div>
      <div className="toggle-search-help hide-advanced"><span onClick={this.props.toggleAdvanced}>hide advanced</span></div>
      <div className="padded-box top-bumper">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">From</label>
                <input type="text" className="form-control" {...from} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">To</label>
                <input type="text" className="form-control" {...to} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label">Has the words</label>
            <input type="text" className="form-control" {...contains} />
          </div>
          <div className="form-group">
            <label className="control-label">Doesnt have</label>
            <input type="text" className="form-control" {...doesntContain} />
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">Start date</label>
                <input type="text" className="form-control" {...after} />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label className="control-label">End date</label>
                <input type="text" className="form-control" {...before} />
              </div>
            </div>
          </div>
          <div className="text-right">
            <button className="btn btn-success marginless-right" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>);
  }
}

GoogleAdvancedFilterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  toggleAdvanced: PropTypes.func.isRequired,
};

GoogleAdvancedFilterForm = reduxForm({ // eslint-disable-line no-class-assign
  form: 'googleAdvanced',
  fields: [
    'from',
    'to',
    'contains',
    'doesntContain',
    'city',
    'before',
    'after',
  ],
})(GoogleAdvancedFilterForm);

export default GoogleAdvancedFilterForm;