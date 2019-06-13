"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultColorRange = exports.COLOR_RANGES = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _colorbrewer = _interopRequireDefault(require("colorbrewer"));

var _customColorRanges = require("./custom-color-ranges");

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
var colorBrewerMap = {
  YlGn: _customColorRanges.SEQ,
  YlGnBu: _customColorRanges.SEQ,
  GnBu: _customColorRanges.SEQ,
  BuGn: _customColorRanges.SEQ,
  PuBuGn: _customColorRanges.SEQ,
  PuBu: _customColorRanges.SEQ,
  BuPu: _customColorRanges.SEQ,
  RdPu: _customColorRanges.SEQ,
  PuRd: _customColorRanges.SEQ,
  OrRd: _customColorRanges.SEQ,
  YlOrRd: _customColorRanges.SEQ,
  YlOrBr: _customColorRanges.SEQ,
  Purples: _customColorRanges.SEQ,
  Blues: _customColorRanges.SEQ,
  Greens: _customColorRanges.SEQ,
  Oranges: _customColorRanges.SEQ,
  Reds: _customColorRanges.SEQ,
  Greys: _customColorRanges.SEQ,
  PuOr: _customColorRanges.DIV,
  BrBG: _customColorRanges.DIV,
  PRGn: _customColorRanges.DIV,
  PiYG: _customColorRanges.DIV,
  RdBu: _customColorRanges.DIV,
  RdGy: _customColorRanges.DIV,
  RdYlBu: _customColorRanges.DIV,
  Spectral: _customColorRanges.DIV,
  RdYlGn: _customColorRanges.DIV,
  Accent: _customColorRanges.QUA,
  Dark2: _customColorRanges.QUA,
  Paired: _customColorRanges.QUA,
  Pastel1: _customColorRanges.QUA,
  Pastel2: _customColorRanges.QUA,
  Set1: _customColorRanges.QUA,
  Set2: _customColorRanges.QUA,
  Set3: _customColorRanges.QUA
};
var colorRanges = (0, _toConsumableArray2["default"])(_customColorRanges.VizColorPalette); // Add colorbrewer color schemes (Data Science requirement)
// See http://colorbrewer2.org/

function entries(obj) {
  return Object.keys(obj).map(function (k) {
    return [k, obj[k]];
  });
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = entries(_colorbrewer["default"])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = (0, _slicedToArray2["default"])(_step.value, 2),
        keyName = _step$value[0],
        colorScheme = _step$value[1];

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = entries(colorScheme)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = (0, _slicedToArray2["default"])(_step2.value, 2),
            lenKey = _step2$value[0],
            colors = _step2$value[1];

        colorRanges.push({
          name: "ColorBrewer ".concat(keyName, "-").concat(lenKey),
          type: colorBrewerMap[keyName],
          category: 'ColorBrewer',
          colors: colors
        });
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var COLOR_RANGES = colorRanges;
exports.COLOR_RANGES = COLOR_RANGES;
var DefaultColorRange = colorRanges.find(function (_ref) {
  var name = _ref.name;
  return name === 'Global Warming';
});
exports.DefaultColorRange = DefaultColorRange;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvY29sb3ItcmFuZ2VzLmpzIl0sIm5hbWVzIjpbImNvbG9yQnJld2VyTWFwIiwiWWxHbiIsIlNFUSIsIllsR25CdSIsIkduQnUiLCJCdUduIiwiUHVCdUduIiwiUHVCdSIsIkJ1UHUiLCJSZFB1IiwiUHVSZCIsIk9yUmQiLCJZbE9yUmQiLCJZbE9yQnIiLCJQdXJwbGVzIiwiQmx1ZXMiLCJHcmVlbnMiLCJPcmFuZ2VzIiwiUmVkcyIsIkdyZXlzIiwiUHVPciIsIkRJViIsIkJyQkciLCJQUkduIiwiUGlZRyIsIlJkQnUiLCJSZEd5IiwiUmRZbEJ1IiwiU3BlY3RyYWwiLCJSZFlsR24iLCJBY2NlbnQiLCJRVUEiLCJEYXJrMiIsIlBhaXJlZCIsIlBhc3RlbDEiLCJQYXN0ZWwyIiwiU2V0MSIsIlNldDIiLCJTZXQzIiwiY29sb3JSYW5nZXMiLCJWaXpDb2xvclBhbGV0dGUiLCJlbnRyaWVzIiwib2JqIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImsiLCJjb2xvcmJyZXdlciIsImtleU5hbWUiLCJjb2xvclNjaGVtZSIsImxlbktleSIsImNvbG9ycyIsInB1c2giLCJuYW1lIiwidHlwZSIsImNhdGVnb3J5IiwiQ09MT1JfUkFOR0VTIiwiRGVmYXVsdENvbG9yUmFuZ2UiLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBLElBQU1BLGNBQWMsR0FBRztBQUNyQkMsRUFBQUEsSUFBSSxFQUFFQyxzQkFEZTtBQUVyQkMsRUFBQUEsTUFBTSxFQUFFRCxzQkFGYTtBQUdyQkUsRUFBQUEsSUFBSSxFQUFFRixzQkFIZTtBQUlyQkcsRUFBQUEsSUFBSSxFQUFFSCxzQkFKZTtBQUtyQkksRUFBQUEsTUFBTSxFQUFFSixzQkFMYTtB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Q0FEK0IsQ0FBMUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgY29sb3JicmV3ZXIgZnJvbSAnY29sb3JicmV3ZXInO1xuaW1wb3J0IHtTRVEsIFFVQSwgRElWLCBWaXpDb2xvclBhbGV0dGV9IGZyb20gJy4vY3VzdG9tLWNvbG9yLXJhbmdlcyc7XG5cbmNvbnN0IGNvbG9yQnJld2VyTWFwID0ge1xuICBZbEduOiBTRVEsXG4gIFlsR25CdTogU0VRLFxuICBHbkJ1OiBTRVEsXG4gIEJ1R246IFNFUSxcbiAgUHVCdUduOiBTRVEsXG4gIFB1QnU6IFNFUSxcbiAgQnVQdTogU0VRLFxuICBSZFB1OiBTRVEsXG4gIFB1UmQ6IFNFUSxcbiAgT3JSZDogU0VRLFxuICBZbE9yUmQ6IFNFUSxcbiAgWWxPckJyOiBTRVEsXG4gIFB1cnBsZXM6IFNFUSxcbiAgQmx1ZXM6IFNFUSxcbiAgR3JlZW5zOiBTRVEsXG4gIE9yYW5nZXM6IFNFUSxcbiAgUmVkczogU0VRLFxuICBHcmV5czogU0VRLFxuICBQdU9yOiBESVYsXG4gIEJyQkc6IERJVixcbiAgUFJHbjogRElWLFxuICBQaVlHOiBESVYsXG4gIFJkQnU6IERJVixcbiAgUmRHeTogRElWLFxuICBSZFlsQnU6IERJVixcbiAgU3BlY3RyYWw6IERJVixcbiAgUmRZbEduOiBESVYsXG4gIEFjY2VudDogUVVBLFxuICBEYXJrMjogUVVBLFxuICBQYWlyZWQ6IFFVQSxcbiAgUGFzdGVsMTogUVVBLFxuICBQYXN0ZWwyOiBRVUEsXG4gIFNldDE6IFFVQSxcbiAgU2V0MjogUVVBLFxuICBTZXQzOiBRVUFcbn07XG5cbmNvbnN0IGNvbG9yUmFuZ2VzID0gWy4uLlZpekNvbG9yUGFsZXR0ZV07XG5cbi8vIEFkZCBjb2xvcmJyZXdlciBjb2xvciBzY2hlbWVzIChEYXRhIFNjaWVuY2UgcmVxdWlyZW1lbnQpXG4vLyBTZWUgaHR0cDovL2NvbG9yYnJld2VyMi5vcmcvXG5mdW5jdGlvbiBlbnRyaWVzKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoayA9PiBbaywgb2JqW2tdXSk7XG59XG5cbmZvciAoY29uc3QgW2tleU5hbWUsIGNvbG9yU2NoZW1lXSBvZiBlbnRyaWVzKGNvbG9yYnJld2VyKSkge1xuICBmb3IgKGNvbnN0IFtsZW5LZXksIGNvbG9yc10gb2YgZW50cmllcyhjb2xvclNjaGVtZSkpIHtcbiAgICBjb2xvclJhbmdlcy5wdXNoKHtcbiAgICAgIG5hbWU6IGBDb2xvckJyZXdlciAke2tleU5hbWV9LSR7bGVuS2V5fWAsXG4gICAgICB0eXBlOiBjb2xvckJyZXdlck1hcFtrZXlOYW1lXSxcbiAgICAgIGNhdGVnb3J5OiAnQ29sb3JCcmV3ZXInLFxuICAgICAgY29sb3JzXG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IENPTE9SX1JBTkdFUyA9IGNvbG9yUmFuZ2VzO1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdENvbG9yUmFuZ2UgPSBjb2xvclJhbmdlcy5maW5kKFxuICAoe25hbWV9KSA9PiBuYW1lID09PSAnR2xvYmFsIFdhcm1pbmcnXG4pO1xuIl19