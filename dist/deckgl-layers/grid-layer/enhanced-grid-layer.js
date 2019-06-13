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
var defaultProps = (0, _objectSpread2["default"])({}, _deck.GridLayer.defaultProps, {
  colorScale: 'quantile'
});

var EnhancedGridLayer =
/*#__PURE__*/
function (_GridLayer) {
  (0, _inherits2["default"])(EnhancedGridLayer, _GridLayer);

  function EnhancedGridLayer() {
    (0, _classCallCheck2["default"])(this, EnhancedGridLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(EnhancedGridLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(EnhancedGridLayer, [{
    key: "getDimensionUpdaters",
    value: function getDimensionUpdaters() {
      var dimensionUpdaters = (0, _get2["default"])((0, _getPrototypeOf2["default"])(EnhancedGridLayer.prototype), "getDimensionUpdaters", this).call(this); // add colorScale to dimension updates

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
  return EnhancedGridLayer;
}(_deck.GridLayer);

exports["default"] = EnhancedGridLayer;
EnhancedGridLayer.layerName = 'EnhancedGridLayer';
EnhancedGridLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2dyaWQtbGF5ZXIvZW5oYW5jZWQtZ3JpZC1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJHcmlkTGF5ZXIiLCJjb2xvclNjYWxlIiwiRW5oYW5jZWRHcmlkTGF5ZXIiLCJkaW1lbnNpb25VcGRhdGVycyIsImdldENvbG9yIiwidHJpZ2dlcnMiLCJwdXNoIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQSxJQUFNQSxZQUFZLHNDQUNiQyxnQkFBVUQsWUFERztBQUVoQkUsRUFBQUEsVUFBVSxFQUFFO0FBRkksRUFBbEI7O0lBS3FCQyxpQjs7Ozs7Ozs7Ozs7OzJDQUNJO0FBQ3JCLFVBQU1DLGlCQUFpQixnSUFBdkIsQ0FEcUIsQ0FFckI7O0FBQ0FBLE1BQUFBLGlCQUFpQixDQUFDQyxRQUFsQixDQUEyQixDQUEzQixFQUE4QkMsUUFBOUIsQ0FBdUNDLElBQXZDLENBQTRDLFlBQTVDO0FBQ0EsYUFBT0gsaUJBQVA7QUFDRDtBQUVEOzs7Ozs7OzBDQUlzQjtBQUNwQixzQ0FBb0IsSUFBcEI7QUFDRDs7O29DQUVlO0FBQ2Qsd0NBQXNCLElBQXRCO0FBQ0Q7OztFQWxCNENILGU7OztBQXNCL0NFLGlCQUFpQixDQUFDSyxTQUFsQixHQUE4QixtQkFBOUI7QUFDQUwsaUJBQWlCLENBQUNILFlBQWxCLEdBQWlDQSxZQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7R3JpZExheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7Z2V0Q29sb3JWYWx1ZURvbWFpbiwgZ2V0Q29sb3JTY2FsZUZ1bmN0aW9ufSBmcm9tICcuLi9sYXllci11dGlscy91dGlscyc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uR3JpZExheWVyLmRlZmF1bHRQcm9wcyxcbiAgY29sb3JTY2FsZTogJ3F1YW50aWxlJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5oYW5jZWRHcmlkTGF5ZXIgZXh0ZW5kcyBHcmlkTGF5ZXIge1xuICBnZXREaW1lbnNpb25VcGRhdGVycygpIHtcbiAgICBjb25zdCBkaW1lbnNpb25VcGRhdGVycyA9IHN1cGVyLmdldERpbWVuc2lvblVwZGF0ZXJzKCk7XG4gICAgLy8gYWRkIGNvbG9yU2NhbGUgdG8gZGltZW5zaW9uIHVwZGF0ZXNcbiAgICBkaW1lbnNpb25VcGRhdGVycy5nZXRDb2xvclsxXS50cmlnZ2Vycy5wdXNoKCdjb2xvclNjYWxlJyk7XG4gICAgcmV0dXJuIGRpbWVuc2lvblVwZGF0ZXJzO1xuICB9XG5cbiAgLypcbiAgICogb3ZlcnJpZGUgZGVmYXVsdCBsYXllciBtZXRob2QgdG8gY2FsY3VsYXRlIGNvbG9yIGRvbWFpblxuICAgKiBhbmQgc2NhbGUgZnVuY3Rpb24gYmFzZSBvbiBjb2xvciBzY2FsZSB0eXBlXG4gICAqL1xuICBnZXRDb2xvclZhbHVlRG9tYWluKCkge1xuICAgIGdldENvbG9yVmFsdWVEb21haW4odGhpcyk7XG4gIH1cblxuICBnZXRDb2xvclNjYWxlKCkge1xuICAgIGdldENvbG9yU2NhbGVGdW5jdGlvbih0aGlzKTtcbiAgfVxuXG59XG5cbkVuaGFuY2VkR3JpZExheWVyLmxheWVyTmFtZSA9ICdFbmhhbmNlZEdyaWRMYXllcic7XG5FbmhhbmNlZEdyaWRMYXllci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4iXX0=