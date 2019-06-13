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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  color: ", ";\n  font-size: 12px;\n  text-decoration: underline;\n\n  :hover {\n    cursor: pointer;\n    font-weight: 500;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var Wrapper = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.textColorLT;
});
/*
Inspired by https://github.com/okonet/react-dropzone/blob/master/src/index.js
*/


var UploadButton =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(UploadButton, _Component);

  function UploadButton() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, UploadButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(UploadButton)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onClick", function () {
      _this._fileInput.value = null;

      _this._fileInput.click();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onChange", function (_ref) {
      var files = _ref.target.files;

      if (!files) {
        return;
      }

      _this.props.onUpload(files);
    });
    return _this;
  }

  (0, _createClass2["default"])(UploadButton, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(Wrapper, null, _react["default"].createElement("input", {
        type: "file",
        ref: function ref(_ref2) {
          _this2._fileInput = _ref2;
        },
        style: {
          display: 'none'
        },
        onChange: this._onChange
      }), _react["default"].createElement("span", {
        onClick: this._onClick
      }, this.props.children));
    }
  }]);
  return UploadButton;
}(_react.Component);

exports["default"] = UploadButton;
(0, _defineProperty2["default"])(UploadButton, "propTypes", {
  onUpload: _propTypes["default"].func.isRequired
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWxlLXVwbG9hZGVyL3VwbG9hZC1idXR0b24uanMiXSwibmFtZXMiOlsiV3JhcHBlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3JMVCIsIlVwbG9hZEJ1dHRvbiIsIl9maWxlSW5wdXQiLCJ2YWx1ZSIsImNsaWNrIiwiZmlsZXMiLCJ0YXJnZXQiLCJvblVwbG9hZCIsInJlZiIsImRpc3BsYXkiLCJfb25DaGFuZ2UiLCJfb25DbGljayIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiZnVuYyIsImlzUmVxdWlyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyw2QkFBT0MsR0FBVixvQkFFRixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFdBQWhCO0FBQUEsQ0FGSCxDQUFiO0FBV0E7Ozs7O0lBR3FCQyxZOzs7Ozs7Ozs7Ozs7Ozs7OztpR0FLUixZQUFNO0FBQ2YsWUFBS0MsVUFBTCxDQUFnQkMsS0FBaEIsR0FBd0IsSUFBeEI7O0FBQ0EsWUFBS0QsVUFBTCxDQUFnQkUsS0FBaEI7QUFDRCxLO2tHQUVXLGdCQUF1QjtBQUFBLFVBQVpDLEtBQVksUUFBckJDLE1BQXFCLENBQVpELEtBQVk7O0FBQ2pDLFVBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFFRCxZQUFLUCxLQUFMLENBQVdTLFFBQVgsQ0FBb0JGLEtBQXBCO0FBQ0QsSzs7Ozs7OzZCQUVRO0FBQUE7O0FBQ1AsYUFDRSxnQ0FBQyxPQUFELFFBQ0U7QUFDRSxRQUFBLElBQUksRUFBQyxNQURQO0FBRUUsUUFBQSxHQUFHLEVBQUUsYUFBQUcsS0FBRyxFQUFJO0FBQUMsVUFBQSxNQUFJLENBQUNOLFVBQUwsR0FBa0JNLEtBQWxCO0FBQXNCLFNBRnJDO0FBR0UsUUFBQSxLQUFLLEVBQUU7QUFBQ0MsVUFBQUEsT0FBTyxFQUFFO0FBQVYsU0FIVDtBQUlFLFFBQUEsUUFBUSxFQUFFLEtBQUtDO0FBSmpCLFFBREYsRUFPRTtBQUFNLFFBQUEsT0FBTyxFQUFFLEtBQUtDO0FBQXBCLFNBQStCLEtBQUtiLEtBQUwsQ0FBV2MsUUFBMUMsQ0FQRixDQURGO0FBV0Q7OztFQTlCdUNDLGdCOzs7aUNBQXJCWixZLGVBQ0E7QUFDakJNLEVBQUFBLFFBQVEsRUFBRU8sc0JBQVVDLElBQVYsQ0FBZUM7QUFEUixDO0FBOEJwQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgfVxuYDtcbi8qXG5JbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vb2tvbmV0L3JlYWN0LWRyb3B6b25lL2Jsb2IvbWFzdGVyL3NyYy9pbmRleC5qc1xuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZEJ1dHRvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25VcGxvYWQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgfTtcblxuICBfb25DbGljayA9ICgpID0+IHtcbiAgICB0aGlzLl9maWxlSW5wdXQudmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX2ZpbGVJbnB1dC5jbGljaygpO1xuICB9O1xuXG4gIF9vbkNoYW5nZSA9ICh7dGFyZ2V0OiB7ZmlsZXN9fSkgPT4ge1xuICAgIGlmICghZmlsZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uVXBsb2FkKGZpbGVzKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxXcmFwcGVyPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgcmVmPXtyZWYgPT4ge3RoaXMuX2ZpbGVJbnB1dCA9IHJlZn19XG4gICAgICAgICAgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgICAgPHNwYW4gb25DbGljaz17dGhpcy5fb25DbGlja30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9zcGFuPlxuICAgICAgPC9XcmFwcGVyPlxuICAgICk7XG4gIH1cbn07XG4iXX0=