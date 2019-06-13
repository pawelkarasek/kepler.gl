"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _deck = require("deck.gl");

var _hexagonAggregator = require("./hexagon-aggregator");

var _utils = require("../layer-utils/utils");

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
var defaultProps = (0, _objectSpread2["default"])({}, _deck.HexagonLayer.defaultProps, {
  hexagonAggregator: _hexagonAggregator.pointToHexbin,
  colorScale: 'quantile'
});

var EnhancedHexagonLayer =
/*#__PURE__*/
function (_HexagonLayer) {
  (0, _inherits2["default"])(EnhancedHexagonLayer, _HexagonLayer);

  function EnhancedHexagonLayer() {
    (0, _classCallCheck2["default"])(this, EnhancedHexagonLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(EnhancedHexagonLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(EnhancedHexagonLayer, [{
    key: "getDimensionUpdaters",
    value: function getDimensionUpdaters() {
      var dimensionUpdaters = (0, _get2["default"])((0, _getPrototypeOf2["default"])(EnhancedHexagonLayer.prototype), "getDimensionUpdaters", this).call(this); // add colorScale to dimension updates

      dimensionUpdaters.getColor[1].triggers.push('colorScale');
      return dimensionUpdaters;
    }
    /*
     * override default layer method to calculate color domain
     * and scale function base on color scale type
     */

  }, {
    key: "getColorValueDomain",
    value: function getColorValueDomain() {
      (0, _utils.getColorValueDomain)(this);
    }
  }, {
    key: "getColorScale",
    value: function getColorScale() {
      (0, _utils.getColorScaleFunction)(this);
    }
  }]);
  return EnhancedHexagonLayer;
}(_deck.HexagonLayer);

exports["default"] = EnhancedHexagonLayer;
EnhancedHexagonLayer.layerName = 'EnhancedHexagonLayer';
EnhancedHexagonLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2hleGFnb24tbGF5ZXIvZW5oYW5jZWQtaGV4YWdvbi1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJIZXhhZ29uTGF5ZXIiLCJoZXhhZ29uQWdncmVnYXRvciIsInBvaW50VG9IZXhiaW4iLCJjb2xvclNjYWxlIiwiRW5oYW5jZWRIZXhhZ29uTGF5ZXIiLCJkaW1lbnNpb25VcGRhdGVycyIsImdldENvbG9yIiwidHJpZ2dlcnMiLCJwdXNoIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUF2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPQSxJQUFNQSxZQUFZLHNDQUNiQyxtQkFBYUQsWUFEQTtBQUVoQkUsRUFBQUEsaUJBQWlCLEVBQUVDLGdDQUZIO0FBR2hCQyxFQUFBQSxVQUFVLEVBQUU7QUFISSxFQUFsQjs7SUFNcUJDLG9COzs7Ozs7Ozs7Ozs7MkNBQ0k7QUFDckIsVUFBTUMsaUJBQWlCLG1JQUF2QixDQURxQixDQUVyQjs7QUFDQUEsTUFBQUEsaUJBQWlCLENBQUNDLFFBQWxCLENBQTJCLENBQTNCLEVBQThCQyxRQUE5QixDQUF1Q0MsSUFBdkMsQ0FBNEMsWUFBNUM7QUFDQSxhQUFPSCxpQkFBUDtBQUNEO0FBRUQ7Ozs7Ozs7MENBSXNCO0FBQ3BCLHNDQUFvQixJQUFwQjtBQUNEOzs7b0NBRWU7QUFDZCx3Q0FBc0IsSUFBdEI7QUFDRDs7O0VBbEIrQ0wsa0I7OztBQXFCbERJLG9CQUFvQixDQUFDSyxTQUFyQixHQUFpQyxzQkFBakM7QUFDQUwsb0JBQW9CLENBQUNMLFlBQXJCLEdBQW9DQSxZQUFwQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7SGV4YWdvbkxheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7cG9pbnRUb0hleGJpbn0gZnJvbSAnLi9oZXhhZ29uLWFnZ3JlZ2F0b3InO1xuXG5pbXBvcnQge2dldENvbG9yVmFsdWVEb21haW4sIGdldENvbG9yU2NhbGVGdW5jdGlvbn0gZnJvbSAnLi4vbGF5ZXItdXRpbHMvdXRpbHMnO1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIC4uLkhleGFnb25MYXllci5kZWZhdWx0UHJvcHMsXG4gIGhleGFnb25BZ2dyZWdhdG9yOiBwb2ludFRvSGV4YmluLFxuICBjb2xvclNjYWxlOiAncXVhbnRpbGUnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmhhbmNlZEhleGFnb25MYXllciBleHRlbmRzIEhleGFnb25MYXllciB7XG4gIGdldERpbWVuc2lvblVwZGF0ZXJzKCkge1xuICAgIGNvbnN0IGRpbWVuc2lvblVwZGF0ZXJzID0gc3VwZXIuZ2V0RGltZW5zaW9uVXBkYXRlcnMoKTtcbiAgICAvLyBhZGQgY29sb3JTY2FsZSB0byBkaW1lbnNpb24gdXBkYXRlc1xuICAgIGRpbWVuc2lvblVwZGF0ZXJzLmdldENvbG9yWzFdLnRyaWdnZXJzLnB1c2goJ2NvbG9yU2NhbGUnKTtcbiAgICByZXR1cm4gZGltZW5zaW9uVXBkYXRlcnM7XG4gIH1cblxuICAvKlxuICAgKiBvdmVycmlkZSBkZWZhdWx0IGxheWVyIG1ldGhvZCB0byBjYWxjdWxhdGUgY29sb3IgZG9tYWluXG4gICAqIGFuZCBzY2FsZSBmdW5jdGlvbiBiYXNlIG9uIGNvbG9yIHNjYWxlIHR5cGVcbiAgICovXG4gIGdldENvbG9yVmFsdWVEb21haW4oKSB7XG4gICAgZ2V0Q29sb3JWYWx1ZURvbWFpbih0aGlzKTtcbiAgfVxuXG4gIGdldENvbG9yU2NhbGUoKSB7XG4gICAgZ2V0Q29sb3JTY2FsZUZ1bmN0aW9uKHRoaXMpO1xuICB9XG59XG5cbkVuaGFuY2VkSGV4YWdvbkxheWVyLmxheWVyTmFtZSA9ICdFbmhhbmNlZEhleGFnb25MYXllcic7XG5FbmhhbmNlZEhleGFnb25MYXllci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4iXX0=