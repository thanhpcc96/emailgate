import React, { Component, PropTypes } from 'react';
import ImageSelector from './ImageSelector';
import Loading from './Loading';
import covers from '../templates/covers';
import _ from 'lodash';
import moment from 'moment';
import DatePicker from 'react-datepicker';

class CompilationTitleForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      savable: false,
      coverTemplate: props.compilation.coverTemplate || covers.options[0],
      showImageSelector: false,
      coverProps: {},
      startDate: props.compilation.meta.startingDate,
      endDate: props.compilation.meta.endingDate,
    };

    this.submitForm = this.submitForm.bind(this);
    this.back = this.back.bind(this);
    this.setSaveAbility = this.setSaveAbility.bind(this);
    this.openImageSelector = this.openImageSelector.bind(this);
    this.closeImageSelector = this.closeImageSelector.bind(this);
    this.updateCompilationImage = this.updateCompilationImage.bind(this);
    this.addCompilationImage = this.addCompilationImage.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  setSaveAbility() {
    if (this.formChanged()) {
      this.setState({ savable: true });
    } else {
      this.setState({ savable: false });
    }
  }
  openImageSelector(props) {
    this.setState({ showImageSelector: true, coverProps: props });
  }
  closeImageSelector() {
    this.setState({ showImageSelector: false });
  }
  updateCompilationImage(data) {
    this.setState({ savable: true });
    this.props.submitForm({ coverMeta: data });

    this.closeImageSelector();
  }
  addCompilationImage(data) {
    data = { ...data, uploading: true };

    const newImages = [data];
    this.props.submitForm({
      newImages,
    });
  }
  handleDateChange(params, date) {
    const newState = {};
    newState[date] = params ? params.toDate() : '';
    this.setState(newState);
    this.setSaveAbility();
  }
  formChanged() {
    const titleRef = this.refs.title || {};
    const subtitleRef = this.refs.subtitle || {};

    if (titleRef.value !== this.props.compilation.title) {
      return true;
    } else if (subtitleRef.value !== this.props.compilation.subtitle) {
      return true;
    } else if (this.state.coverTemplate !== this.props.compilation.coverTemplate) {
      return true;
    } else if (this.state.startDate !== _.get(this.props.compilation, 'meta.startingDate')) {
      return true;
    } else if (this.state.endDate !== _.get(this.props.compilation, 'meta.endingDate')) {
      return true;
    }
    return false;
  }
  submitForm(e) {
    e.preventDefault();
    if (!this.state.savable) { return; }

    const titleRef = this.refs.title || {};
    const subtitleRef = this.refs.subtitle || {};

    this.props.submitForm({
      title: titleRef.value,
      subtitle: subtitleRef.value,
      coverTemplate: this.state.coverTemplate,
      meta: {
        startingDate: this.state.startDate,
        endingDate: this.state.endDate,
      },
    });
  }
  back(e) {
    e.preventDefault();
    this.props.back();
  }
  renderLoading() {
    if (this.props.fetching) {
      return <span className="button-loading"><Loading /></span>;
    }
  }
  renderTemplateOption(option) {
    return (<div className="col-xs-2">
      <span
        className={`template-thumb ${this.state.coverTemplate === option ? 'active' : ''}`}
        onClick={() => { this.setState({ coverTemplate: option, savable: true }); }}
      >
        <img role="presentation" className="img-responsive" src={`/img/cover-thumbs/${option}.png`} />
      </span>
    </div>);
  }
  renderTemplateOptions() {
    return covers.options.map((option, index) => {
      return <div key={index}>{this.renderTemplateOption(option)}</div>;
    });
  }
  renderTemplateFormGroup() {
    return (<div className="row cover-templates">
      <div className="col-md-12">
        <div className="form-group">
          <div className="text-center">
            <label htmlFor="compilation-title">Select a Cover Template</label>
          </div>
          <div className="row">
            <div className="col-xs-1"></div>
            {this.renderTemplateOptions()}
          </div>
        </div>
      </div>
    </div>);
  }
  renderTitleFormGroup() {
    return (
      <div className="form-group">
        <label htmlFor="compilation-title">Title</label>
        <input
          ref="title"
          className="form-control"
          type="text"
          id="compilation-title"
          defaultValue={this.props.compilation.title}
          placeholder="My Email Book"
          onChange={this.setSaveAbility}
          onBlur={this.submitForm}
        />
      </div>
    );
  }
  renderSubtitleFormGroup() {
    return (
      <div className="form-group">
        <label htmlFor="compilation-subtitle">Subtitle</label>
        <input
          ref="subtitle"
          className="form-control"
          type="text"
          id="compilation-subtitle"
          defaultValue={this.props.compilation.subtitle}
          placeholder="Optional"
          onChange={this.setSaveAbility}
          onBlur={this.submitForm}
        />
      </div>
    );
  }
  renderDatesFormGroup() {
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="compilation-subtitle">Start Date</label>
            <DatePicker
              style={{ display: 'inline-block' }}
              className="inline-block form-control"
              name="Start Date"
              showYearDropdown
              fixedHeight
              dateFormat="LL"
              selected={this.state.startDate ? moment(this.state.startDate, 'YYYY/M/D') : null}
              onChange={(params) => { this.handleDateChange(params, 'startDate'); }}
              onBlur={this.submitForm}
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
            <label htmlFor="compilation-subtitle">End Date</label>
            <DatePicker
              style={{ display: 'inline-block' }}
              className="inline-block form-control"
              name="End Date"
              showYearDropdown
              fixedHeight
              dateFormat="LL"
              selected={this.state.endDate ? moment(this.state.endDate, 'YYYY/M/D') : null}
              onChange={(params) => { this.handleDateChange(params, 'endDate'); }}
              onBlur={this.submitForm}
            />
          </div>
        </div>
      </div>
    );
  }
  renderErrors(type) {
    if (this.props.errors) {
      return this.props.errors[type].map((error, index) => {
        return <p key={index} className="text-danger">{error}</p>;
      });
    }
  }
  renderBackAction() {
    if (this.props.back) {
      return <button className="btn btn-danger" onClick={this.back}>Back</button>;
    }
  }
  renderCoverPreview() {
    const titleRef = this.refs.title || {};
    const subtitleRef = this.refs.subtitle || {};

    const compilation = {
      title: titleRef.value || this.props.compilation.title,
      subtitle: subtitleRef.value || this.props.compilation.subtitle,
      cover: this.props.compilation.cover,
      images: this.props.compilation.images,
      meta: {
        startingDate: this.state.startDate || _.get(this.props.compilation, 'meta.startingDate'),
        endingDate: this.state.endDate || _.get(this.props.compilation, 'meta.endingDate'),
      },
    };

    // <div dangerouslySetInnerHTML={{ __html: coverTemplate.frontCoverToString() }}></div>;
    // {coverTemplate.renderFrontCover()}

    const coverTemplate = new covers[this.state.coverTemplate]({ compilation, bleedType: 'bleedless', selectImage: this.openImageSelector });
    return (<div style={{ zoom: '100%' }}>
      {coverTemplate.renderWrappedFrontCover()}
    </div>);
  }
  renderCoverHelperText() {
    return (<div className="alert alert-info" role="alert">Click on any cover image to change it.</div>);
  }
  render() {
    const images = _.sortBy((this.props.compilation.images || []), (image) => { return -image.uploadedAt; });
    const newImages = this.props.compilation.newImages || [];

    return (<form onSubmit={this.handleSubmit}>
      <ImageSelector
        isVisible={this.state.showImageSelector}
        close={this.closeImageSelector}
        submit={this.updateCompilationImage}
        upload={this.addCompilationImage}
        coverProps={this.state.coverProps}
        images={[...newImages, ...images]}
      />
      <div className="row">
        <div className="col-md-6">
          {this.renderTitleFormGroup()}
          {this.renderSubtitleFormGroup()}
          {this.renderDatesFormGroup()}
          <hr />
          {this.renderTemplateFormGroup()}
          <hr />
          {this.renderErrors('base')}
          <div className="text-right hidden-sm hidden-xs">
            {this.renderBackAction()}
            <button className={`marginless-right btn btn-success ${this.state.savable ? '' : 'disabled'}`} onClick={this.submitForm}>
              Submit
              {this.renderLoading()}
            </button>
          </div>
        </div>
        <div className="col-md-6">
          {this.renderCoverHelperText()}
          <div className="cover-preview">
            <div className="template">
              {this.renderCoverPreview()}
            </div>
          </div>
          <div className="text-right hidden-md hidden-lg">
            {this.renderBackAction()}
            <button className={`marginless-right btn btn-success ${this.state.savable ? '' : 'disabled'}`} onClick={this.submitForm}>
              Submit
              {this.renderLoading()}
            </button>
          </div>
        </div>
      </div>
    </form>);
  }
}

CompilationTitleForm.propTypes = {
  compilation: PropTypes.object,
  submitForm: PropTypes.func.isRequired,
  back: PropTypes.func,
  errors: PropTypes.object,
  fetching: PropTypes.bool,
};

export default CompilationTitleForm;
