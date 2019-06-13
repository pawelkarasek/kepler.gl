"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unique = unique;
exports.findMapBounds = findMapBounds;
exports.getLatLngBounds = getLatLngBounds;
exports.clamp = clamp;
exports.getSampleData = getSampleData;
exports.maybeToDate = maybeToDate;
exports.notNullorUndefined = notNullorUndefined;
exports.isPlainObject = isPlainObject;
exports.numberSort = numberSort;
exports.getSortingFunction = getSortingFunction;
exports.preciseRound = preciseRound;
exports.getRoundingDecimalFromStep = getRoundingDecimalFromStep;
exports.roundValToStep = roundValToStep;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _moment = _interopRequireDefault(require("moment"));

var _assert = _interopRequireDefault(require("assert"));

var _defaultSettings = require("../constants/default-settings");

// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var MAX_LATITUDE = 90;
var MIN_LATITUDE = -90;
var MAX_LONGITUDE = 180;
var MIN_LONGITUDE = -180;
/**
 * simple getting unique values of an array
 *
 * @param {array} values
 * @returns {array} unique values
 */

function unique(values) {
  var results = [];
  values.forEach(function (v) {
    if (!results.includes(v) && v !== null && v !== undefined) {
      results.push(v);
    }
  });
  return results;
}
/* eslint-disable max-statements */

/**
 * return center of map from given points
 * @param {array} layers
 * @param {string} dataId
 * @returns {object} coordinates of map center, empty if not found
 */


function findMapBounds(layers) {
  // find bounds in formatted layerData
  // take ALL layers into account when finding map bounds
  var availableLayerBounds = layers.reduce(function (res, l) {
    if (l.meta && l.meta.bounds) {
      res.push(l.meta.bounds);
    }

    return res;
  }, []); // return null if no layer is available

  if (availableLayerBounds.length === 0) {
    return null;
  } // merge bounds in each layer


  var newBounds = availableLayerBounds.reduce(function (res, b) {
    return [Math.min(res[0], b[0]), Math.min(res[1], b[1]), Math.max(res[2], b[2]), Math.max(res[3], b[3])];
  }, [MAX_LONGITUDE, MAX_LATITUDE, MIN_LONGITUDE, MIN_LATITUDE]);
  return newBounds;
}
/* eslint-enable max-statements */


function getLatLngBounds(points, idx, limit) {
  var lats = points.map(function (d) {
    return Array.isArray(d) && d[idx];
  }).filter(Number.isFinite).sort(numberSort);

  if (!lats.length) {
    return null;
  } // use 99 percentile to filter out outliers
  // clamp to limit


  return [Math.max(lats[Math.floor(0.01 * (lats.length - 1))], limit[0]), Math.min(lats[Math.ceil(0.99 * (lats.length - 1))], limit[1])];
}

function clamp(_ref, val) {
  var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      min = _ref2[0],
      max = _ref2[1];

  return val <= min ? min : val >= max ? max : val;
}

;

function getSampleData(data) {
  var sampleSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var sampleStep = Math.max(Math.floor(data.length / sampleSize), 1);
  var output = [];

  for (var i = 0; i < data.length; i += sampleStep) {
    output.push(data[i]);
  }

  return output;
}

function maybeToDate(isTime, fieldIdx, format, d) {
  if (isTime) {
    if (notNullorUndefined(d[fieldIdx])) {
      return typeof d[fieldIdx] === 'string' ? _moment["default"].utc(d[fieldIdx], format).valueOf() : format === 'x' ? d[fieldIdx] * 1000 : d[fieldIdx];
    }

    return null;
  }

  return d[fieldIdx];
}

function notNullorUndefined(d) {
  return d !== undefined && d !== null;
}

function isPlainObject(obj) {
  return obj === Object(obj) && typeof obj !== 'function' && !Array.isArray(obj);
}

function numberSort(a, b) {
  return a - b;
}

function getSortingFunction(fieldType) {
  switch (fieldType) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return numberSort;

    default:
      return undefined;
  }
}
/**
 * round number with exact number of decimals
 * return as a string
 * @param {number} num
 * @param {number} decimals
 * @returns {string} - a rounded number in string format
 */


function preciseRound(num, decimals) {
  var t = Math.pow(10, decimals);
  return (Math.round(num * t + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
}
/**
 * get number of decimals to round to for slider from step
 * @param {number} step
 * @returns {number} - number of decimal
 */


function getRoundingDecimalFromStep(step) {
  if (isNaN(step)) {
    (0, _assert["default"])('step is not a number');
    (0, _assert["default"])(step);
  }

  var splitZero = step.toString().split('.');

  if (splitZero.length === 1) {
    return 0;
  }

  return splitZero[1].length;
}
/**
 * round the value to step for the slider
 * @param {number} minValue
 * @param {number} step
 * @param {number} val
 * @returns {number} - rounded number
 */


function roundValToStep(minValue, step, val) {
  if (isNaN(step)) {
    return val;
  }

  var decimal = getRoundingDecimalFromStep(step);
  var steps = Math.floor((val - minValue) / step);
  var remain = val - (steps * step + minValue); // has to round because javascript turns 0.1 into 0.9999999999999987

  remain = Number(preciseRound(remain, 8));
  var closest;

  if (remain === 0) {
    closest = val;
  } else if (remain < step / 2) {
    closest = steps * step + minValue;
  } else {
    closest = (steps + 1) * step + minValue;
  } // precise round return a string rounded to the defined decimal


  var rounded = preciseRound(closest, decimal);
  return Number(rounded);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhLXV0aWxzLmpzIl0sIm5hbWVzIjpbIk1BWF9MQVRJVFVERSIsIk1JTl9MQVRJVFVERSIsIk1BWF9MT05HSVRVREUiLCJNSU5fTE9OR0lUVURFIiwidW5pcXVlIiwidmFsdWVzIiwicmVzdWx0cyIsImZvckVhY2giLCJ2IiwiaW5jbHVkZXMiLCJ1bmRlZmluZWQiLCJwdXNoIiwiZmluZE1hcEJvdW5kcyIsImxheWVycyIsImF2YWlsYWJsZUxheWVyQm91bmRzIiwicmVkdWNlIiwicmVzIiwibCIsIm1ldGEiLCJib3VuZHMiLCJsZW5ndGgiLCJuZXdCb3VuZHMiLCJiIiwiTWF0aCIsIm1pbiIsIm1heCIsImdldExhdExuZ0JvdW5kcyIsInBvaW50cyIsImlkeCIsImxpbWl0IiwibGF0cyIsIm1hcCIsImQiLCJBcnJheSIsImlzQXJyYXkiLCJmaWx0ZXIiLCJOdW1iZXIiLCJpc0Zpbml0ZSIsInNvcnQiLCJudW1iZXJTb3J0IiwiZmxvb3IiLCJjZWlsIiwiY2xhbXAiLCJ2YWwiLCJnZXRTYW1wbGVEYXRhIiwiZGF0YSIsInNhbXBsZVNpemUiLCJzYW1wbGVTdGVwIiwib3V0cHV0IiwiaSIsIm1heWJlVG9EYXRlIiwiaXNUaW1lIiwiZmllbGRJZHgiLCJmb3JtYXQiLCJub3ROdWxsb3JVbmRlZmluZWQiLCJtb21lbnQiLCJ1dGMiLCJ2YWx1ZU9mIiwiaXNQbGFpbk9iamVjdCIsIm9iaiIsIk9iamVjdCIsImEiLCJnZXRTb3J0aW5nRnVuY3Rpb24iLCJmaWVsZFR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJyZWFsIiwiaW50ZWdlciIsInRpbWVzdGFtcCIsInByZWNpc2VSb3VuZCIsIm51bSIsImRlY2ltYWxzIiwidCIsInBvdyIsInJvdW5kIiwic2lnbiIsInRvRml4ZWQiLCJnZXRSb3VuZGluZ0RlY2ltYWxGcm9tU3RlcCIsInN0ZXAiLCJpc05hTiIsInNwbGl0WmVybyIsInRvU3RyaW5nIiwic3BsaXQiLCJyb3VuZFZhbFRvU3RlcCIsIm1pblZhbHVlIiwiZGVjaW1hbCIsInN0ZXBzIiwicmVtYWluIiwiY2xvc2VzdCIsInJvdW5kZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQXRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU1BLElBQU1BLFlBQVksR0FBRyxFQUFyQjtBQUNBLElBQU1DLFlBQVksR0FBRyxDQUFDLEVBQXRCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLEdBQXRCO0FBQ0EsSUFBTUMsYUFBYSxHQUFHLENBQUMsR0FBdkI7QUFFQTs7Ozs7OztBQU1PLFNBQVNDLE1BQVQsQ0FBZ0JDLE1BQWhCLEVBQXdCO0FBQzdCLE1BQU1DLE9BQU8sR0FBRyxFQUFoQjtBQUNBRCxFQUFBQSxNQUFNLENBQUNFLE9BQVAsQ0FBZSxVQUFBQyxDQUFDLEVBQUk7QUFDbEIsUUFBSSxDQUFDRixPQUFPLENBQUNHLFFBQVIsQ0FBaUJELENBQWpCLENBQUQsSUFBd0JBLENBQUMsS0FBSyxJQUE5QixJQUFzQ0EsQ0FBQyxLQUFLRSxTQUFoRCxFQUEyRDtBQUN6REosTUFBQUEsT0FBTyxDQUFDSyxJQUFSLENBQWFILENBQWI7QUFDRDtBQUNGLEdBSkQ7QUFNQSxTQUFPRixPQUFQO0FBQ0Q7QUFFRDs7QUFDQTs7Ozs7Ozs7QUFNTyxTQUFTTSxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUNwQztBQUNBO0FBQ0EsTUFBTUMsb0JBQW9CLEdBQUdELE1BQU0sQ0FBQ0UsTUFBUCxDQUFjLFVBQUNDLEdBQUQsRUFBTUMsQ0FBTixFQUFZO0FBQ3JELFFBQUlBLENBQUMsQ0FBQ0MsSUFBRixJQUFVRCxDQUFDLENBQUNDLElBQUYsQ0FBT0MsTUFBckIsRUFBNkI7QUFDM0JILE1BQUFBLEdBQUcsQ0FBQ0wsSUFBSixDQUFTTSxDQUFDLENBQUNDLElBQUYsQ0FBT0MsTUFB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QWxDLEVBQXdDbEMsR0FBeEMsRUFBNkM7QUFDbEQsTUFBSW1DLEtBQUssQ0FBQ0QsSUFBRCxDQUFULEVBQWlCO0FBQ2YsV0FBT2xDLEdBQVA7QUFDRDs7QUFFRCxNQUFNeUMsT0FBTyxHQUFHUiwwQkFBMEIsQ0FBQ0MsSUFBRCxDQUExQztBQUNBLE1BQU1RLEtBQUssR0FBRzlELElBQUksQ0FBQ2lCLEtBQUwsQ0FBVyxDQUFDRyxHQUFHLEdBQUd3QyxRQUFQLElBQW1CTixJQUE5QixDQUFkO0FBQ0EsTUFBSVMsTUFBTSxHQUFHM0MsR0FBRyxJQUFJMEMsS0FBSyxHQUFHUixJQUFSLEdBQWVNLFFBQW5CLENBQWhCLENBUGtELENBU2xEOztBQUNBRyxFQUFBQSxNQUFNLEdBQUdsRCxNQUFNLENBQUNnQyxZQUFZLENBQUNrQixNQUFELEVBQVMsQ0FBVCxDQUFiLENBQWY7QUFFQSxNQUFJQyxPQUFKOztBQUNBLE1BQUlELE1BQU0sS0FBSyxDQUFmLEVBQWtCO0FBQ2hCQyxJQUFBQSxPQUFPLEdBQUc1QyxHQUFWO0FBQ0QsR0FGRCxNQUVPLElBQUkyQyxNQUFNLEdBQUdULElBQUksR0FBRyxDQUFwQixFQUF1QjtBQUM1QlUsSUFBQUEsT0FBTyxHQUFHRixLQUFLLEdBQUdSLElBQVIsR0FBZU0sUUFBekI7QUFDRCxHQUZNLE1BRUE7QUFDTEksSUFBQUEsT0FBTyxHQUFHLENBQUNGLEtBQUssR0FBRyxDQUFULElBQWNSLElBQWQsR0FBcUJNLFFBQS9CO0FBQ0QsR0FuQmlELENBcUJsRDs7O0FBQ0EsTUFBTUssT0FBTyxHQUFHcEIsWUFBWSxDQUFDbUIsT0FBRCxFQUFVSCxPQUFWLENBQTVCO0FBRUEsU0FBT2hELE1BQU0sQ0FBQ29ELE9BQUQsQ0FBYjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgTUFYX0xBVElUVURFID0gOTA7XG5jb25zdCBNSU5fTEFUSVRVREUgPSAtOTA7XG5jb25zdCBNQVhfTE9OR0lUVURFID0gMTgwO1xuY29uc3QgTUlOX0xPTkdJVFVERSA9IC0xODA7XG5cbi8qKlxuICogc2ltcGxlIGdldHRpbmcgdW5pcXVlIHZhbHVlcyBvZiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlc1xuICogQHJldHVybnMge2FycmF5fSB1bmlxdWUgdmFsdWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWUodmFsdWVzKSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgdmFsdWVzLmZvckVhY2godiA9PiB7XG4gICAgaWYgKCFyZXN1bHRzLmluY2x1ZGVzKHYpICYmIHYgIT09IG51bGwgJiYgdiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXN1bHRzLnB1c2godik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LXN0YXRlbWVudHMgKi9cbi8qKlxuICogcmV0dXJuIGNlbnRlciBvZiBtYXAgZnJvbSBnaXZlbiBwb2ludHNcbiAqIEBwYXJhbSB7YXJyYXl9IGxheWVyc1xuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFJZFxuICogQHJldHVybnMge29iamVjdH0gY29vcmRpbmF0ZXMgb2YgbWFwIGNlbnRlciwgZW1wdHkgaWYgbm90IGZvdW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kTWFwQm91bmRzKGxheWVycykge1xuICAvLyBmaW5kIGJvdW5kcyBpbiBmb3JtYXR0ZWQgbGF5ZXJEYXRhXG4gIC8vIHRha2UgQUxMIGxheWVycyBpbnRvIGFjY291bnQgd2hlbiBmaW5kaW5nIG1hcCBib3VuZHNcbiAgY29uc3QgYXZhaWxhYmxlTGF5ZXJCb3VuZHMgPSBsYXllcnMucmVkdWNlKChyZXMsIGwpID0+IHtcbiAgICBpZiAobC5tZXRhICYmIGwubWV0YS5ib3VuZHMpIHtcbiAgICAgIHJlcy5wdXNoKGwubWV0YS5ib3VuZHMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9LCBbXSlcbiAgLy8gcmV0dXJuIG51bGwgaWYgbm8gbGF5ZXIgaXMgYXZhaWxhYmxlXG4gIGlmIChhdmFpbGFibGVMYXllckJvdW5kcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBtZXJnZSBib3VuZHMgaW4gZWFjaCBsYXllclxuICBjb25zdCBuZXdCb3VuZHMgPSBhdmFpbGFibGVMYXllckJvdW5kcy5yZWR1Y2UoKHJlcywgYikgPT4ge1xuICAgIHJldHVybiBbXG4gICAgICBNYXRoLm1pbihyZXNbMF0sIGJbMF0pLFxuICAgICAgTWF0aC5taW4ocmVzWzFdLCBiWzFdKSxcbiAgICAgIE1hdGgubWF4KHJlc1syXSwgYlsyXSksXG4gICAgICBNYXRoLm1heChyZXNbM10sIGJbM10pXG4gICAgXTtcbiAgfSwgW01BWF9MT05HSVRVREUsIE1BWF9MQVRJVFVERSwgTUlOX0xPTkdJVFVERSwgTUlOX0xBVElUVURFXSk7XG4gIHJldHVybiBuZXdCb3VuZHM7XG59XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXRMbmdCb3VuZHMocG9pbnRzLCBpZHgsIGxpbWl0KSB7XG4gIGNvbnN0IGxhdHMgPSBwb2ludHNcbiAgICAubWFwKGQgPT4gQXJyYXkuaXNBcnJheShkKSAmJiBkW2lkeF0pXG4gICAgLmZpbHRlcihOdW1iZXIuaXNGaW5pdGUpXG4gICAgLnNvcnQobnVtYmVyU29ydCk7XG5cbiAgaWYgKCFsYXRzLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIHVzZSA5OSBwZXJjZW50aWxlIHRvIGZpbHRlciBvdXQgb3V0bGllcnNcbiAgLy8gY2xhbXAgdG8gbGltaXRcbiAgcmV0dXJuIFtcbiAgICBNYXRoLm1heChsYXRzW01hdGguZmxvb3IoMC4wMSAqIChsYXRzLmxlbmd0aCAtIDEpKV0sIGxpbWl0WzBdKSxcbiAgICBNYXRoLm1pbihsYXRzW01hdGguY2VpbCgwLjk5ICogKGxhdHMubGVuZ3RoIC0gMSkpXSwgbGltaXRbMV0pXG4gIF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGFtcChbbWluLCBtYXhdLCB2YWwpIHtcbiAgcmV0dXJuIHZhbCA8PSBtaW4gPyBtaW4gOiB2YWwgPj0gbWF4ID8gbWF4IDogdmFsO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNhbXBsZURhdGEoZGF0YSwgc2FtcGxlU2l6ZSA9IDUwMCkge1xuICBjb25zdCBzYW1wbGVTdGVwID0gTWF0aC5tYXgoTWF0aC5mbG9vcihkYXRhLmxlbmd0aCAvIHNhbXBsZVNpemUpLCAxKTtcbiAgY29uc3Qgb3V0cHV0ID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gc2FtcGxlU3RlcCkge1xuICAgIG91dHB1dC5wdXNoKGRhdGFbaV0pO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heWJlVG9EYXRlKGlzVGltZSwgZmllbGRJZHgsIGZvcm1hdCwgZCkge1xuICBpZiAoaXNUaW1lKSB7XG4gICAgaWYgKG5vdE51bGxvclVuZGVmaW5lZChkW2ZpZWxkSWR4XSkpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZFtmaWVsZElkeF0gPT09ICdzdHJpbmcnXG4gICAgICAgID8gbW9tZW50LnV0YyhkW2ZpZWxkSWR4XSwgZm9ybWF0KS52YWx1ZU9mKClcbiAgICAgICAgOiBmb3JtYXQgPT09ICd4JyA/IGRbZmllbGRJZHhdICogMTAwMCA6IGRbZmllbGRJZHhdO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGRbZmllbGRJZHhdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90TnVsbG9yVW5kZWZpbmVkKGQpIHtcbiAgcmV0dXJuIGQgIT09IHVuZGVmaW5lZCAmJiBkICE9PSBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvYmopIHtcbiAgcmV0dXJuIChcbiAgICBvYmogPT09IE9iamVjdChvYmopICYmIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicgJiYgIUFycmF5LmlzQXJyYXkob2JqKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyU29ydChhLCBiKSB7XG4gIHJldHVybiBhIC0gYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNvcnRpbmdGdW5jdGlvbihmaWVsZFR5cGUpIHtcbiAgc3dpdGNoIChmaWVsZFR5cGUpIHtcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5yZWFsOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgcmV0dXJuIG51bWJlclNvcnQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiByb3VuZCBudW1iZXIgd2l0aCBleGFjdCBudW1iZXIgb2YgZGVjaW1hbHNcbiAqIHJldHVybiBhcyBhIHN0cmluZ1xuICogQHBhcmFtIHtudW1iZXJ9IG51bVxuICogQHBhcmFtIHtudW1iZXJ9IGRlY2ltYWxzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIGEgcm91bmRlZCBudW1iZXIgaW4gc3RyaW5nIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJlY2lzZVJvdW5kKG51bSwgZGVjaW1hbHMpIHtcbiAgY29uc3QgdCA9IE1hdGgucG93KDEwLCBkZWNpbWFscyk7XG4gIHJldHVybiAoXG4gICAgTWF0aC5yb3VuZChcbiAgICAgIG51bSAqIHQgK1xuICAgICAgICAoZGVjaW1hbHMgPiAwID8gMSA6IDApICpcbiAgICAgICAgICAoTWF0aC5zaWduKG51bSkgKiAoMTAgLyBNYXRoLnBvdygxMDAsIGRlY2ltYWxzKSkpXG4gICAgKSAvIHRcbiAgKS50b0ZpeGVkKGRlY2ltYWxzKTtcbn1cblxuLyoqXG4gKiBnZXQgbnVtYmVyIG9mIGRlY2ltYWxzIHRvIHJvdW5kIHRvIGZvciBzbGlkZXIgZnJvbSBzdGVwXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcFxuICogQHJldHVybnMge251bWJlcn0gLSBudW1iZXIgb2YgZGVjaW1hbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um91bmRpbmdEZWNpbWFsRnJvbVN0ZXAoc3RlcCkge1xuICBpZiAoaXNOYU4oc3RlcCkpIHtcbiAgICBhc3NlcnQoJ3N0ZXAgaXMgbm90IGEgbnVtYmVyJyk7XG4gICAgYXNzZXJ0KHN0ZXApO1xuICB9XG5cbiAgY29uc3Qgc3BsaXRaZXJvID0gc3RlcC50b1N0cmluZygpLnNwbGl0KCcuJyk7XG4gIGlmIChzcGxpdFplcm8ubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIHNwbGl0WmVyb1sxXS5sZW5ndGg7XG59XG5cbi8qKlxuICogcm91bmQgdGhlIHZhbHVlIHRvIHN0ZXAgZm9yIHRoZSBzbGlkZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW5WYWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXBcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWxcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gcm91bmRlZCBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kVmFsVG9TdGVwKG1pblZhbHVlLCBzdGVwLCB2YWwpIHtcbiAgaWYgKGlzTmFOKHN0ZXApKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIGNvbnN0IGRlY2ltYWwgPSBnZXRSb3VuZGluZ0RlY2ltYWxGcm9tU3RlcChzdGVwKTtcbiAgY29uc3Qgc3RlcHMgPSBNYXRoLmZsb29yKCh2YWwgLSBtaW5WYWx1ZSkgLyBzdGVwKTtcbiAgbGV0IHJlbWFpbiA9IHZhbCAtIChzdGVwcyAqIHN0ZXAgKyBtaW5WYWx1ZSk7XG5cbiAgLy8gaGFzIHRvIHJvdW5kIGJlY2F1c2UgamF2YXNjcmlwdCB0dXJucyAwLjEgaW50byAwLjk5OTk5OTk5OTk5OTk5ODdcbiAgcmVtYWluID0gTnVtYmVyKHByZWNpc2VSb3VuZChyZW1haW4sIDgpKTtcblxuICBsZXQgY2xvc2VzdDtcbiAgaWYgKHJlbWFpbiA9PT0gMCkge1xuICAgIGNsb3Nlc3QgPSB2YWw7XG4gIH0gZWxzZSBpZiAocmVtYWluIDwgc3RlcCAvIDIpIHtcbiAgICBjbG9zZXN0ID0gc3RlcHMgKiBzdGVwICsgbWluVmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgY2xvc2VzdCA9IChzdGVwcyArIDEpICogc3RlcCArIG1pblZhbHVlO1xuICB9XG5cbiAgLy8gcHJlY2lzZSByb3VuZCByZXR1cm4gYSBzdHJpbmcgcm91bmRlZCB0byB0aGUgZGVmaW5lZCBkZWNpbWFsXG4gIGNvbnN0IHJvdW5kZWQgPSBwcmVjaXNlUm91bmQoY2xvc2VzdCwgZGVjaW1hbCk7XG5cbiAgcmV0dXJuIE51bWJlcihyb3VuZGVkKTtcbn1cbiJdfQ==