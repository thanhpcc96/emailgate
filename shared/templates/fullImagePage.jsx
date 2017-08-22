import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { renderToString } from 'react-dom/server';

class ImageDropzone extends Component {
  constructor(props, context) {
    super(props, context);

    this.onDrop = this.onDrop.bind(this);
  }
  // onDrop(acceptedFiles, rejectedFiles) {
  onDrop(acceptedFiles) {
    // console.log('Accepted files: ', acceptedFiles);
    // console.log('Rejected files: ', rejectedFiles);

    const setFormState = this.props.setFormState;

    _.forEach(acceptedFiles, (file) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', file.preview, true);
      xhr.responseType = 'arraybuffer';

      // xhr.onload = function(e) {
      xhr.onload = function () { // eslint-disable-line func-names
        const image = {
          contentType: file.type,
          fileName: file.name,
          contentDisposition: 'attachment',
          length: file.size,
          content: (new Buffer(this.response)).toString('base64'),
        };

        setFormState(undefined, { image });
      };
      xhr.send();
    });
  }
  render() {
    return (<div>
      <div>Click on the image to change it.</div>
      <Dropzone className="pointer" style={{ height: '100%', width: '100%' }} onDrop={this.onDrop}>
        {this.props.renderImage()}
        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => { // eslint-disable-line
          if (isDragActive) {
            return 'This file is authorized';
          }
          if (isDragReject) {
            return 'This file is not authorized';
          }
          if (rejectedFiles.length) {
            return 'File rejected. Please try again.';
          }
          return 'Drop or click to add image attachment...';
        }}
      </Dropzone>
    </div>);
  }
}

ImageDropzone.propTypes = {
  renderImage: PropTypes.func.isRequired,
  setFormState: PropTypes.func.isRequired,
};

class FullImagePageTemplate {
  constructor(page, content) {
    this.page = page;

    this.defaultContent = {
      image: {
        url: 'http://via.placeholder.com/800x600',
      },
      header: 'Edit Page to Change This Header',
    };

    this.content = content || this.page.content || this.defaultContent;
    this.renderImage = this.renderImage.bind(this);
  }
  initialFormState() {
    return this.content;
  }
  renderImage() {
    const image = this.content.image;

    let src = '';
    if (image.url) {
      src = `${image.url}?t=${image.updatedAt}`;
    } else if (image.content && ['image/jpeg', 'image/png'].indexOf(image.contentType) > -1) {
      const dataUriPrefix = `data:${image.contentType};base64,`;
      src = dataUriPrefix + image.content;
    }

    return (<div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img style={{ height: '100%', width: '100%' }} role="presentation" src={src} />
    </div>);
  }
  renderHeader(header) {
    const divStyle = {
      fontFamily: '\'Montserrat\', sans-serif !important',
      fontWeight: 'bold',
      fontSize: '18px',
      marginBottom: '10px',
    };

    return <div style={divStyle}>{header || this.content.header}</div>;
  }
  render() {
    return (<div>
      {this.renderHeader()}
      {this.renderImage()}
    </div>);
  }
  renderForm(setFormState) {
    this.setFormState = setFormState;
    const headerInput = <div className="editable" name="header" contentEditable onBlur={setFormState}>{this.content.header}</div>;

    return (<div>
      {this.renderHeader(headerInput)}
      <ImageDropzone setFormState={setFormState} renderImage={this.renderImage} />
    </div>);
  }

  toString() {
    return `
<html>
  <head>
    <meta charset="utf8">
    <style>
      html, body {
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        box-sizing: border-box;
      }
    </style>
    <link href='https://fonts.googleapis.com/css?family=Libre+Baskerville' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet' type='text/css'>
  </head>
  <body>
  ${renderToString(this.render())}
  </body>
</html>
    `;
  }
}

export default FullImagePageTemplate;