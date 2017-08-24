import React, { PropTypes, Component } from 'react';
// import { Link } from 'react-router';
import Loading from './Loading';
// import FixedFooter from './FixedFooter';

class CompilationPageForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.template = props.templateFactory(props.page);
    this.state = this.template.initialFormState();
    this.setFormState = this.setFormState.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.rotateImage = this.rotateImage.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.template = nextProps.templateFactory(nextProps.page);
    this.state = this.template.initialFormState();
  }
  componentWillUpdate(nextProps, nextState) {
    this.template = nextProps.templateFactory(nextProps.page, nextState);
    this.state = this.template.initialFormState();
  }
  setFormState(event, newState) {
    if (event) {
      newState = {}; // eslint-disable-line no-param-reassign
      newState[event.target.getAttribute('name')] = event.target.innerHTML; // eslint-disable-line no-param-reassign
    }
    this.setState(newState);
  }
  submitForm(e) {
    if (e) { e.preventDefault(); }

    this.props.submitForm(this.state);
  }
  rotateImage() {
    this.props.rotateImage(this.props.page);
  }
  renderForm() {
    if (this.template) {
      return this.template.renderForm(this.setFormState, this.rotateImage);
    }
  }
  renderSaving() {
    if (this.props.page.saving) {
      return <span className="button-loading"><Loading /></span>;
    }
  }
  render() {
    return (<div>
      <div className="compilation-page">
        <div className="page-container">
          {this.renderForm()}
        </div>
      </div>
    </div>);
  }
}

CompilationPageForm.propTypes = {
  page: PropTypes.object.isRequired,
  templateFactory: PropTypes.func,
  submitForm: PropTypes.func.isRequired,
  rotateImage: PropTypes.func.isRequired,
};

export default CompilationPageForm;
