import React, { Component } from 'react';

class Loading extends Component {
  renderLoadingGif() {
    return <span dangerouslySetInnerHTML={{ __html: `<?xml version="1.0" encoding="utf-8"?><svg width='198px' height='198px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-ring-alt"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><circle cx="50" cy="50" r="40" stroke="#cec9c9" fill="none" stroke-width="10" stroke-linecap="round"></circle><circle cx="50" cy="50" r="40" stroke="#3c302e" fill="none" stroke-width="6" stroke-linecap="round"><animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502"></animate><animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4"></animate></circle></svg>` }} />; // eslint-disable-line max-len
  }
  render() {
    return (<span className="loading">
      {this.renderLoadingGif()}
    </span>);
  }
}

export default Loading;