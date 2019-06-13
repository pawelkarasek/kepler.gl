"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _base = _interopRequireDefault(require("../../components/common/icons/base"));

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
var LineLayerIcon =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(LineLayerIcon, _Component);

  function LineLayerIcon() {
    (0, _classCallCheck2["default"])(this, LineLayerIcon);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LineLayerIcon).apply(this, arguments));
  }

  (0, _createClass2["default"])(LineLayerIcon, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(_base["default"], this.props, _react["default"].createElement("path", {
        d: "M57.8,58.3c-0.4,0-0.8-0.2-1.1-0.5L33.1,32.1c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1l23.7,25.8 c0.6,0.6,0.5,1.6-0.1,2.1C58.5,58.2,58.2,58.3,57.8,58.3z",
        className: "cr1"
      }), _react["default"].createElement("path", {
        d: "M34.2,33.6c-0.6,0-1.2-0.2-1.7-0.6c-1-0.9-1.1-2.5-0.2-3.5l18.5-21c0.9-1,2.5-1.1,3.5-0.2c1,0.9,1.1,2.5,0.2,3.5L36,32.7 C35.5,33.3,34.9,33.6,34.2,33.6z",
        className: "cr2"
      }), _react["default"].createElement("path", {
        d: "M34.2,32.6c-0.5,0-1-0.3-1.3-0.8L20.7,10.2c-0.4-0.7-0.1-1.6,0.6-2c0.7-0.4,1.6-0.1,2,0.6l12.1,21.6c0.4,0.7,0.1,1.6-0.6,2 C34.7,32.5,34.4,32.6,34.2,32.6z",
        className: "cr3"
      }), _react["default"].createElement("path", {
        d: "M15.8,58.4c-0.3,0-0.6-0.1-0.9-0.3c-0.7-0.5-0.8-1.4-0.4-2.1l18.3-25.8c0.5-0.7,1.4-0.8,2.1-0.4s0.8,1.4,0.4,2.1L17.1,57.7 C16.8,58.2,16.3,58.4,15.8,58.4z",
        className: "cr4"
      }), _react["default"].createElement("path", {
        d: "M34.2,32.1c-0.1,0-0.3,0-0.4-0.1l-28.5-14c-0.5-0.2-0.7-0.8-0.5-1.3c0.2-0.5,0.8-0.7,1.3-0.5l28.5,14 c0.5,0.2,0.7,0.8,0.5,1.3C34.9,31.9,34.5,32.1,34.2,32.1z",
        className: "cr5"
      }));
    }
  }]);
  return LineLayerIcon;
}(_react.Component);

exports["default"] = LineLayerIcon;
(0, _defineProperty2["default"])(LineLayerIcon, "propTypes", {
  /** Set the height of the icon, ex. '16px' */
  height: _propTypes["default"].string,
  colors: _propTypes["default"].arrayOf(_propTypes["default"].string)
});
(0, _defineProperty2["default"])(LineLayerIcon, "defaultProps", {
  height: '16px',
  predefinedClassName: 'line-layer-icon',
  totalColor: 5
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvbGluZS1sYXllci9saW5lLWxheWVyLWljb24uanMiXSwibmFtZXMiOlsiTGluZUxheWVySWNvbiIsInByb3BzIiwiQ29tcG9uZW50IiwiaGVpZ2h0IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiY29sb3JzIiwiYXJyYXlPZiIsInByZWRlZmluZWRDbGFzc05hbWUiLCJ0b3RhbENvbG9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7SUFNcUJBLGE7Ozs7Ozs7Ozs7Ozs2QkFhVjtBQUNQLGFBQ0UsZ0NBQUMsZ0JBQUQsRUFBVSxLQUFLQyxLQUFmLEVBQ0U7QUFDRSxRQUFBLENBQUMsRUFBQyxnS0FESjtBQUdFLFFBQUEsU0FBUyxFQUFDO0FBSFosUUFERixFQU1FO0FBQ0UsUUFBQSxDQUFDLEVBQUMsc0pBREo7QUFHRSxRQUFBLFNBQVMsRUFBQztBQUhaLFFBTkYsRUFXRTtBQUNFLFFBQUEsQ0FBQyxFQUFDLHdKQURKO0FBR0UsUUFBQSxTQUFTLEVBQUM7QUFIWixRQVhGLEVBZ0JFO0FBQ0UsUUFBQSxDQUFDLEVBQUMsd0pBREo7QUFHRSxRQUFBLFNBQVMsRUFBQztBQUhaLFFBaEJGLEVBcUJFO0FBQ0UsUUFBQSxDQUFDLEVBQUMsMkpBREo7QUFHRSxRQUFBLFNBQVMsRUFBQztBQUhaLFFBckJGLENBREY7QUE2QkQ7OztFQTNDd0NDLGdCOzs7aUNBQXRCRixhLGVBQ0E7QUFDakI7QUFDQUcsRUFBQUEsTUFBTSxFQUFFQyxzQkFBVUMsTUFGRDtBQUdqQkMsRUFBQUEsTUFBTSxFQUFFRixzQkFBVUcsT0FBVixDQUFrQkgsc0JBQVVDLE1BQTVCO0FBSFMsQztpQ0FEQUwsYSxrQkFPRztBQUNwQkcsRUFBQUEsTUFBTSxFQUFFLE1BRFk7QUFFcEJLLEVBQUFBLG1CQUFtQixFQUFFLGlCQUZEO0FBR3BCQyxFQUFBQSxVQUFVLEVBQUU7QUFIUSxDO0FBcUN2QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBCYXNlIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zL2Jhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lTGF5ZXJJY29uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKiogU2V0IHRoZSBoZWlnaHQgb2YgdGhlIGljb24sIGV4LiAnMTZweCcgKi9cbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29sb3JzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc3RyaW5nKVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaGVpZ2h0OiAnMTZweCcsXG4gICAgcHJlZGVmaW5lZENsYXNzTmFtZTogJ2xpbmUtbGF5ZXItaWNvbicsXG4gICAgdG90YWxDb2xvcjogNVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEJhc2Ugey4uLnRoaXMucHJvcHN9PlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNNTcuOCw1OC4zYy0wLjQsMC0wLjgtMC4yLTEuMS0wLjVMMzMuMSwzMi4xYy0wLjYtMC42LTAuNS0xLjYsMC4xLTIuMWMwLjYtMC42LDEuNi0wLjUsMi4xLDAuMWwyMy43LDI1LjhcbiAgICAgICAgICBjMC42LDAuNiwwLjUsMS42LTAuMSwyLjFDNTguNSw1OC4yLDU4LjIsNTguMyw1Ny44LDU4LjN6XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjFcIlxuICAgICAgICAvPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNMzQuMiwzMy42Yy0wLjYsMC0xLjItMC4yLTEuNy0wLjZjLTEtMC45LTEuMS0yLjUtMC4yLTMuNWwxOC41LTIxYzAuOS0xLDIuNS0xLjEsMy41LTAuMmMxLDAuOSwxLjEsMi41LDAuMiwzLjVMMzYsMzIuN1xuICAgICAgICAgIEMzNS41LDMzLjMsMzQuOSwzMy42LDM0LjIsMzMuNnpcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyMlwiXG4gICAgICAgIC8+XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgZD1cIk0zNC4yLDMyLjZjLTAuNSwwLTEtMC4zLTEuMy0wLjhMMjAuNywxMC4yYy0wLjQtMC43LTAuMS0xLjYsMC42LTJjMC43LTAuNCwxLjYtMC4xLDIsMC42bDEyLjEsMjEuNmMwLjQsMC43LDAuMSwxLjYtMC42LDJcbiAgICAgICAgICBDMzQuNywzMi41LDM0LjQsMzIuNiwzNC4yLDMyLjZ6XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJjcjNcIlxuICAgICAgICAvPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNMTUuOCw1OC40Yy0wLjMsMC0wLjYtMC4xLTAuOS0wLjNjLTAuNy0wLjUtMC44LTEuNC0wLjQtMi4xbDE4LjMtMjUuOGMwLjUtMC43LDEuNC0wLjgsMi4xLTAuNHMwLjgsMS40LDAuNCwyLjFMMTcuMSw1Ny43XG4gICAgICAgICAgQzE2LjgsNTguMiwxNi4zLDU4LjQsMTUuOCw1OC40elwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiY3I0XCJcbiAgICAgICAgLz5cbiAgICAgICAgPHBhdGhcbiAgICAgICAgICBkPVwiTTM0LjIsMzIuMWMtMC4xLDAtMC4zLDAtMC40LTAuMWwtMjguNS0xNGMtMC41LTAuMi0wLjctMC44LTAuNS0xLjNjMC4yLTAuNSwwLjgtMC43LDEuMy0wLjVsMjguNSwxNFxuICAgICAgICAgIGMwLjUsMC4yLDAuNywwLjgsMC41LDEuM0MzNC45LDMxLjksMzQuNSwzMi4xLDM0LjIsMzIuMXpcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImNyNVwiXG4gICAgICAgIC8+XG4gICAgICA8L0Jhc2U+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==