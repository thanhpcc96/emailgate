import bleedMap from './bleedMap';
import moment from 'moment';
import _ from 'lodash';
import { renderToString } from 'react-dom/server';

export function getBleedType(props) {
  return props.bleedType || 'casebound';
}
export function getPx(measurement) {
  const pixelsPerInch = 72;

  return measurement * pixelsPerInch;
}
export function getUnits(measurement) {
  const unitType = 'px';

  return `${getPx(measurement)}${unitType}`;
}

export function getMeasurementProps(props) {
  const boardWidth = 5.818;
  const boardHeight = 9.25;
  const spineWidth = props.compilation.cover.spineWidth || 0.625;

  const bleedWidth = bleedMap[getBleedType(props)].bleedWidth;
  const gutterWidth = bleedMap[getBleedType(props)].gutterWidth;

  const coverWidth = bleedWidth + boardWidth + gutterWidth;
  const fullWidth = coverWidth + spineWidth + coverWidth;
  const fullHeight = bleedWidth + boardHeight + bleedWidth;

  return {
    boardWidth: getUnits(boardWidth),
    boardWidthPx: getPx(boardWidth),

    boardHeight: getUnits(boardHeight),
    boardHeightPx: getPx(boardHeight),

    spineWidth: getUnits(spineWidth),
    spineWidthPx: getPx(spineWidth),

    bleedWidth: getUnits(bleedWidth),
    bleedWidthPx: getPx(bleedWidth),

    gutterWidth: getUnits(gutterWidth),
    gutterWidthPx: getPx(gutterWidth),

    coverWidth: getUnits(coverWidth),
    coverWidthPx: getPx(coverWidth),

    coverHeight: getUnits(fullHeight),
    coverHeightPx: getPx(fullHeight),

    fullWidth: getUnits(fullWidth),
    fullHeight: getUnits(fullHeight),

    fullWidthPx: getPx(fullWidth),
    fullHeightPx: getPx(fullHeight),
  };
}

export function getDateProps(props) {
  const startDate = _.get(props.compilation, 'meta.startingDate');
  const endDate = _.get(props.compilation, 'meta.endingDate');
  const prettyFormat = 'MMM YYYY';

  return {
    startDate,
    endDate,
    prettyStartDate: moment(startDate).format(prettyFormat),
    prettyEndDate: moment(endDate).format(prettyFormat),
  };
}

export function toStringWrapper(props) {
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
  <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
  ${props.primaryFont.link}
  ${props.primaryFont.link !== props.secondaryFont.link ? props.secondaryFont.link : ''}
</head>
<body>
  ${renderToString(props.render())}
</body>
</html>
  `;
}

export function hexToRgba(hex, a) {
  a = a || 1;

  if (hex.length === 4) {
    hex = hex + hex.substr(hex.length - 3);
  }

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return result ? `rgba(${r}, ${g}, ${b}, ${a})` : null;
}
