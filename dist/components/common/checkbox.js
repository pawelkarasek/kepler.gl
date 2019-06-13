"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _lodash = _interopRequireDefault(require("lodash.pick"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  line-height: 0;\n  height: ", ";\n  margin-left: ", "px;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  display: none;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function noop() {}

var StyledSwitchInput = _styledComponents["default"].label(_templateObject(), function (props) {
  return props.secondary ? props.theme.secondarySwitch : props.theme.inputSwitch;
});

var StyledCheckboxInput = _styledComponents["default"].label(_templateObject2(), function (props) {
  return props.theme.inputCheckbox;
});

var HiddenInput = _styledComponents["default"].input(_templateObject3());

var StyledCheckbox = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.theme.switchBtnHeight;
}, function (props) {
  return props.theme.switchLabelMargin;
});

var Checkbox =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Checkbox, _Component);

  function Checkbox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Checkbox);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(_args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      focused: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleFocus", function (args) {
      _this.setState({
        focused: true
      });

      _this.props.onFocus(args);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleBlur", function (args) {
      _this.setState({
        focused: false
      });

      _this.props.onBlur(args);
    });
    return _this;
  }

  (0, _createClass2["default"])(Checkbox, [{
    key: "render",
    value: function render() {
      var inputProps = (0, _objectSpread2["default"])({}, (0, _lodash["default"])(this.props, ['checked', 'disabled', 'id', 'onChange', 'value']), {
        type: 'checkbox',
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      });
      var labelProps = (0, _objectSpread2["default"])({}, (0, _lodash["default"])(this.props, ['checked', 'disabled', 'secondary']), {
        htmlFor: this.props.id
      });
      var LabelElement = this.props.type === 'checkbox' ? StyledCheckboxInput : StyledSwitchInput;
      return _react["default"].createElement(StyledCheckbox, {
        className: "kg-checkbox"
      }, _react["default"].createElement(HiddenInput, inputProps), _react["default"].createElement(LabelElement, (0, _extends2["default"])({
        className: "kg-checkbox__label"
      }, labelProps), this.props.label));
    }
  }]);
  return Checkbox;
}(_react.Component);

exports["default"] = Checkbox;
(0, _defineProperty2["default"])(Checkbox, "propTypes", {
  id: _propTypes["default"].string.isRequired,
  label: _propTypes["default"].node,
  value: _propTypes["default"].oneOf([true, false, 'indeterminate']),
  checked: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  error: _propTypes["default"].string,
  "switch": _propTypes["default"].bool,
  activeColor: _propTypes["default"].string,
  secondary: _propTypes["default"].bool,
  onBlur: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onFocus: _propTypes["default"].func
});
(0, _defineProperty2["default"])(Checkbox, "defaultProps", {
  disabled: false,
  checked: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  label: ''
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9jaGVja2JveC5qcyJdLCJuYW1lcyI6WyJub29wIiwiU3R5bGVkU3dpdGNoSW5wdXQiLCJzdHlsZWQiLCJsYWJlbCIsInByb3BzIiwic2Vjb25kYXJ5IiwidGhlbWUiLCJzZWNvbmRhcnlTd2l0Y2giLCJpbnB1dFN3aXRjaCIsIlN0eWxlZENoZWNrYm94SW5wdXQiLCJpbnB1dENoZWNrYm94IiwiSGlkZGVuSW5wdXQiLCJpbnB1dCIsIlN0eWxlZENoZWNrYm94IiwiZGl2Iiwic3dpdGNoQnRuSGVpZ2h0Iiwic3dpdGNoTGFiZWxNYXJnaW4iLCJDaGVja2JveCIsImZvY3VzZWQiLCJhcmdzIiwic2V0U3RhdGUiLCJvbkZvY3VzIiwib25CbHVyIiwiaW5wdXRQcm9wcyIsInR5cGUiLCJoYW5kbGVGb2N1cyIsImhhbmRsZUJsdXIiLCJsYWJlbFByb3BzIiwiaHRtbEZvciIsImlkIiwiTGFiZWxFbGVtZW50IiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsIm5vZGUiLCJ2YWx1ZSIsIm9uZU9mIiwiY2hlY2tlZCIsImJvb2wiLCJkaXNhYmxlZCIsImVycm9yIiwiYWN0aXZlQ29sb3IiLCJmdW5jIiwib25DaGFuZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLFNBQVNBLElBQVQsR0FBZ0IsQ0FBRTs7QUFFbEIsSUFBTUMsaUJBQWlCLEdBQUdDLDZCQUFPQyxLQUFWLG9CQUNuQixVQUFBQyxLQUFLO0FBQUEsU0FDTEEsS0FBSyxDQUFDQyxTQUFOLEdBQWtCRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsZUFBOUIsR0FBZ0RILEtBQUssQ0FBQ0UsS0FBTixDQUFZRSxXQUR2RDtBQUFBLENBRGMsQ0FBdkI7O0FBS0Es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QUNwQnVCLEVBQUFBLFFBQVEsRUFBRSxLQURVO0FBRXBCRixFQUFBQSxPQUFPLEVBQUUsS0FGVztBQUdwQmhCLEVBQUFBLE1BQU0sRUFBRXRCLElBSFk7QUFJcEI0QyxFQUFBQSxRQUFRLEVBQUU1QyxJQUpVO0FBS3BCcUIsRUFBQUEsT0FBTyxFQUFFckIsSUFMVztBQU1wQkcsRUFBQUEsS0FBSyxFQUFFO0FBTmEsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHBpY2sgZnJvbSAnbG9kYXNoLnBpY2snO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuY29uc3QgU3R5bGVkU3dpdGNoSW5wdXQgPSBzdHlsZWQubGFiZWxgXG4gICR7cHJvcHMgPT5cbiAgICBwcm9wcy5zZWNvbmRhcnkgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlTd2l0Y2ggOiBwcm9wcy50aGVtZS5pbnB1dFN3aXRjaH07XG5gO1xuXG5jb25zdCBTdHlsZWRDaGVja2JveElucHV0ID0gc3R5bGVkLmxhYmVsYFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Q2hlY2tib3h9XG5gO1xuXG5jb25zdCBIaWRkZW5JbnB1dCA9IHN0eWxlZC5pbnB1dGBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBub25lO1xuYDtcblxuY29uc3QgU3R5bGVkQ2hlY2tib3ggPSBzdHlsZWQuZGl2YFxuICBsaW5lLWhlaWdodDogMDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ0bkhlaWdodH07XG4gIG1hcmdpbi1sZWZ0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaExhYmVsTWFyZ2lufXB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbGFiZWw6IFByb3BUeXBlcy5ub2RlLFxuICAgIHZhbHVlOiBQcm9wVHlwZXMub25lT2YoW3RydWUsIGZhbHNlLCAnaW5kZXRlcm1pbmF0ZSddKSxcbiAgICBjaGVja2VkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICBlcnJvcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzd2l0Y2g6IFByb3BUeXBlcy5ib29sLFxuICAgIGFjdGl2ZUNvbG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNlY29uZGFyeTogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Gb2N1czogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBjaGVja2VkOiBmYWxzZSxcbiAgICBvbkJsdXI6IG5vb3AsXG4gICAgb25DaGFuZ2U6IG5vb3AsXG4gICAgb25Gb2N1czogbm9vcCxcbiAgICBsYWJlbDogJydcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBmb2N1c2VkOiBmYWxzZVxuICB9O1xuXG4gIGhhbmRsZUZvY3VzID0gYXJncyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Zm9jdXNlZDogdHJ1ZX0pO1xuICAgIHRoaXMucHJvcHMub25Gb2N1cyhhcmdzKTtcbiAgfTtcblxuICBoYW5kbGVCbHVyID0gYXJncyA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Zm9jdXNlZDogZmFsc2V9KTtcbiAgICB0aGlzLnByb3BzLm9uQmx1cihhcmdzKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgaW5wdXRQcm9wcyA9IHtcbiAgICAgIC4uLnBpY2sodGhpcy5wcm9wcywgWydjaGVja2VkJywgJ2Rpc2FibGVkJywgJ2lkJywgJ29uQ2hhbmdlJywgJ3ZhbHVlJ10pLFxuICAgICAgdHlwZTogJ2NoZWNrYm94JyxcbiAgICAgIG9uRm9jdXM6IHRoaXMuaGFuZGxlRm9jdXMsXG4gICAgICBvbkJsdXI6IHRoaXMuaGFuZGxlQmx1clxuICAgIH07XG5cbiAgICBjb25zdCBsYWJlbFByb3BzID0ge1xuICAgICAgLi4ucGljayh0aGlzLnByb3BzLCBbJ2NoZWNrZWQnLCAnZGlzYWJsZWQnLCAnc2Vjb25kYXJ5J10pLFxuICAgICAgaHRtbEZvcjogdGhpcy5wcm9wcy5pZFxuICAgIH07XG5cbiAgICBjb25zdCBMYWJlbEVsZW1lbnQgPSB0aGlzLnByb3BzLnR5cGUgPT09ICdjaGVja2JveCcgPyBTdHlsZWRDaGVja2JveElucHV0IDogU3R5bGVkU3dpdGNoSW5wdXQ7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRDaGVja2JveCBjbGFzc05hbWU9XCJrZy1jaGVja2JveFwiPlxuICAgICAgICA8SGlkZGVuSW5wdXQgey4uLmlucHV0UHJvcHN9IC8+XG4gICAgICAgIDxMYWJlbEVsZW1lbnQgY2xhc3NOYW1lPVwia2ctY2hlY2tib3hfX2xhYmVsXCIgey4uLmxhYmVsUHJvcHN9PlxuICAgICAgICAgIHt0aGlzLnByb3BzLmxhYmVsfVxuICAgICAgICA8L0xhYmVsRWxlbWVudD5cbiAgICAgIDwvU3R5bGVkQ2hlY2tib3g+XG4gICAgKTtcbiAgfVxufVxuIl19