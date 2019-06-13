"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

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

var _colorUtils = require("../../../utils/color-utils");

var _singleColorPalette = _interopRequireDefault(require("./single-color-palette"));

var _colorRangeSelector = _interopRequireDefault(require("./color-range-selector"));

var _colorPalette = _interopRequireDefault(require("./color-palette"));

var _styledComponents2 = require("../../common/styled-components");

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: space-between;\n\n  .color-select__input-group {\n    flex-grow: 1;\n  }\n  .color-select__input-group:nth-child(2) {\n    margin-left: 12px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n  height: ", ";\n\n  .color-selector__selector__label {\n    text-transform: capitalize;\n    font-size: 12px;\n    text-align: center;\n    color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 32px;\n  height: 18px;\n  border-radius: 1px;\n  background-color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ColorBlock = _styledComponents["default"].div(_templateObject(), function (props) {
  return "rgb(".concat(props.color.slice(0, 3).join(','), ")");
});

var ColorSelectorInput = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.inputTheme === 'secondary' ? props.theme.secondaryInput : props.theme.input;
}, function (props) {
  return props.theme.inputBoxHeight;
}, function (props) {
  return props.theme.inputPlaceholderColor;
});

var InputBoxContainer = _styledComponents["default"].div(_templateObject3());

var ColorSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ColorSelector, _Component);

  function ColorSelector() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, ColorSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(ColorSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      editing: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClickOutside", function (e) {
      if (_this.state.editing !== false) {
        _this.setState({
          editing: false
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onSelectColor", function (color, e) {
      e.stopPropagation();

      if (_this.props.colorSets[_this.state.editing]) {
        _this.props.colorSets[_this.state.editing].setColor(color);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_showDropdown", function (e, i) {
      e.stopPropagation();
      e.preventDefault();

      _this.setState({
        editing: i
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(ColorSelector, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          colorSets = _this$props.colorSets,
          disabled = _this$props.disabled,
          inputTheme = _this$props.inputTheme;
      var editing = this.state.editing;
      var currentEditing = colorSets[editing] && (0, _typeof2["default"])(colorSets[editing]) === 'object';
      return _react["default"].createElement("div", {
        className: "color-selector"
      }, _react["default"].createElement(InputBoxContainer, null, colorSets.map(function (cSet, i) {
        return _react["default"].createElement("div", {
          className: "color-select__input-group",
          key: i
        }, _react["default"].createElement(ColorSelectorInput, {
          className: "color-selector__selector",
          active: editing === i,
          disabled: disabled,
          inputTheme: inputTheme,
          onMouseDown: function onMouseDown(e) {
            return _this2._showDropdown(e, i);
          }
        }, cSet.isRange ? _react["default"].createElement(_colorPalette["default"], {
          colors: cSet.selectedColor.colors
        }) : _react["default"].createElement(ColorBlock, {
          className: "color-selector__selector__block",
          color: cSet.selectedColor
        }), cSet.label ? _react["default"].createElement("div", {
          className: "color-selector__selector__label"
        }, cSet.label) : null));
      })), currentEditing ? _react["default"].createElement(_styledComponents2.StyledPanelDropdown, {
        className: "color-selector__dropdown"
      }, colorSets[editing].isRange ? _react["default"].createElement(_colorRangeSelector["default"], {
        selectedColorRange: colorSets[editing].selectedColor,
        onSelectColorRange: this._onSelectColor
      }) : _react["default"].createElement(_singleColorPalette["default"], {
        selectedColor: (0, _colorUtils.rgbToHex)(colorSets[editing].selectedColor),
        onSelectColor: this._onSelectColor
      })) : null);
    }
  }]);
  return ColorSelector;
}(_react.Component);

(0, _defineProperty2["default"])(ColorSelector, "propTypes", {
  colorSets: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    selectedColor: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].any), _propTypes["default"].object]),
    setColor: _propTypes["default"].func.isRequired,
    isRange: _propTypes["default"].bool,
    label: _propTypes["default"].string
  })),
  inputTheme: _propTypes["default"].string,
  disabled: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(ColorSelector, "defaultProps", {
  colorSets: []
});
;

var _default = (0, _reactOnclickoutside["default"])(ColorSelector);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3Itc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiQ29sb3JCbG9jayIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiY29sb3IiLCJzbGljZSIsImpvaW4iLCJDb2xvclNlbGVjdG9ySW5wdXQiLCJpbnB1dFRoZW1lIiwidGhlbWUiLCJzZWNvbmRhcnlJbnB1dCIsImlucHV0IiwiaW5wdXRCb3hIZWlnaHQiLCJpbnB1dFBsYWNlaG9sZGVyQ29sb3IiLCJJbnB1dEJveENvbnRhaW5lciIsIkNvbG9yU2VsZWN0b3IiLCJlZGl0aW5nIiwiZSIsInN0YXRlIiwic2V0U3RhdGUiLCJzdG9wUHJvcGFnYXRpb24iLCJjb2xvclNldHMiLCJzZXRDb2xvciIsImkiLCJwcmV2ZW50RGVmYXVsdCIsImRpc2FibGVkIiwiY3VycmVudEVkaXRpbmciLCJtYXAiLCJjU2V0IiwiX3Nob3dEcm9wZG93biIsImlzUmFuZ2UiLCJzZWxlY3RlZENvbG9yIiwiY29sb3JzIiwibGFiZWwiLCJfb25TZWxlY3RDb2xvciIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJzaGFwZSIsIm9uZU9mVHlwZSIsImFueSIsIm9iamVjdCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYm9vbCIsInN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsVUFBVSxHQUFHQyw2QkFBT0MsR0FBVixvQkFJTSxVQUFBQyxLQUFLO0FBQUEsdUJBQVdBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxLQUFaLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLEVBQXdCQyxJQUF4QixDQUE2QixHQUE3QixDQUFYO0FBQUEs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Y2tCO0FBQ3BCTSxFQUFBQSxTQUFTLEVBQUU7QUFEUyxDO0FBNkV2Qjs7ZUFFYyxxQ0FBZU4sYUFBZixDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge3JnYlRvSGV4fSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQgU2luZ2xlQ29sb3JQYWxldHRlIGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9sYXllci1wYW5lbC9zaW5nbGUtY29sb3ItcGFsZXR0ZSc7XG5pbXBvcnQgQ29sb3JSYW5nZVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9sYXllci1wYW5lbC9jb2xvci1yYW5nZS1zZWxlY3Rvcic7XG5pbXBvcnQgQ29sb3JQYWxldHRlIGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9sYXllci1wYW5lbC9jb2xvci1wYWxldHRlJztcbmltcG9ydCB7U3R5bGVkUGFuZWxEcm9wZG93bn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gJ3JlYWN0LW9uY2xpY2tvdXRzaWRlJztcblxuY29uc3QgQ29sb3JCbG9jayA9IHN0eWxlZC5kaXZgXG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBgcmdiKCR7cHJvcHMuY29sb3Iuc2xpY2UoMCwgMykuam9pbignLCcpfSlgfTtcbmA7XG5cbmNvbnN0IENvbG9yU2VsZWN0b3JJbnB1dCA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT5cbiAgICBwcm9wcy5pbnB1dFRoZW1lID09PSAnc2Vjb25kYXJ5J1xuICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dFxuICAgICAgOiBwcm9wcy50aGVtZS5pbnB1dH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEJveEhlaWdodH07XG5cbiAgLmNvbG9yLXNlbGVjdG9yX19zZWxlY3Rvcl9fbGFiZWwge1xuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRQbGFjZWhvbGRlckNvbG9yfTtcbiAgfVxuYDtcblxuY29uc3QgSW5wdXRCb3hDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5cbiAgLmNvbG9yLXNlbGVjdF9faW5wdXQtZ3JvdXAge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgfVxuICAuY29sb3Itc2VsZWN0X19pbnB1dC1ncm91cDpudGgtY2hpbGQoMikge1xuICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xuICB9XG5gO1xuXG5jbGFzcyBDb2xvclNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb2xvclNldHM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgc2VsZWN0ZWRDb2xvcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksIFByb3BUeXBlcy5vYmplY3RdKSxcbiAgICAgICAgc2V0Q29sb3I6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIGlzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBsYWJlbDogUHJvcFR5cGVzLnN0cmluZ1xuICAgICAgfSlcbiAgICApLFxuICAgIGlucHV0VGhlbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBjb2xvclNldHM6IFtdXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZWRpdGluZzogZmFsc2VcbiAgfTtcblxuICBoYW5kbGVDbGlja091dHNpZGUgPSBlID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5lZGl0aW5nICE9PSBmYWxzZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogZmFsc2V9KTtcbiAgICB9XG4gIH07XG5cbiAgX29uU2VsZWN0Q29sb3IgPSAoY29sb3IsIGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLnByb3BzLmNvbG9yU2V0c1t0aGlzLnN0YXRlLmVkaXRpbmddKSB7XG4gICAgICB0aGlzLnByb3BzLmNvbG9yU2V0c1t0aGlzLnN0YXRlLmVkaXRpbmddLnNldENvbG9yKGNvbG9yKTtcbiAgICB9XG4gIH07XG5cbiAgX3Nob3dEcm9wZG93biA9IChlLCBpKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZWRpdGluZzogaX0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7Y29sb3JTZXRzLCBkaXNhYmxlZCwgaW5wdXRUaGVtZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtlZGl0aW5nfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgY3VycmVudEVkaXRpbmcgPVxuICAgICAgY29sb3JTZXRzW2VkaXRpbmddICYmIHR5cGVvZiBjb2xvclNldHNbZWRpdGluZ10gPT09ICdvYmplY3QnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sb3Itc2VsZWN0b3JcIj5cbiAgICAgICAgPElucHV0Qm94Q29udGFpbmVyPlxuICAgICAgICAgIHtjb2xvclNldHMubWFwKChjU2V0LCBpKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXNlbGVjdF9faW5wdXQtZ3JvdXBcIiBrZXk9e2l9PlxuXG4gICAgICAgICAgICAgIDxDb2xvclNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjb2xvci1zZWxlY3Rvcl9fc2VsZWN0b3JcIlxuICAgICAgICAgICAgICAgIGFjdGl2ZT17ZWRpdGluZyA9PT0gaX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgaW5wdXRUaGVtZT17aW5wdXRUaGVtZX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB0aGlzLl9zaG93RHJvcGRvd24oZSwgaSl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y1NldC5pc1JhbmdlID8gKFxuICAgICAgICAgICAgICAgICAgPENvbG9yUGFsZXR0ZSBjb2xvcnM9e2NTZXQuc2VsZWN0ZWRDb2xvci5jb2xvcnN9IC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxDb2xvckJsb2NrXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbG9yLXNlbGVjdG9yX19zZWxlY3Rvcl9fYmxvY2tcIlxuICAgICAgICAgICAgICAgICAgICBjb2xvcj17Y1NldC5zZWxlY3RlZENvbG9yfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHtjU2V0LmxhYmVsID8gPGRpdiBjbGFzc05hbWU9XCJjb2xvci1zZWxlY3Rvcl9fc2VsZWN0b3JfX2xhYmVsXCI+e2NTZXQubGFiZWx9PC9kaXY+IDogbnVsbH1cbiAgICAgICAgICAgICAgPC9Db2xvclNlbGVjdG9ySW5wdXQ+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9JbnB1dEJveENvbnRhaW5lcj5cbiAgICAgICAge2N1cnJlbnRFZGl0aW5nID8gKFxuICAgICAgICAgIDxTdHlsZWRQYW5lbERyb3Bkb3duIGNsYXNzTmFtZT1cImNvbG9yLXNlbGVjdG9yX19kcm9wZG93blwiPlxuICAgICAgICAgICAge2NvbG9yU2V0c1tlZGl0aW5nXS5pc1JhbmdlID8gKFxuICAgICAgICAgICAgICA8Q29sb3JSYW5nZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvclJhbmdlPXtjb2xvclNldHNbZWRpdGluZ10uc2VsZWN0ZWRDb2xvcn1cbiAgICAgICAgICAgICAgICBvblNlbGVjdENvbG9yUmFuZ2U9e3RoaXMuX29uU2VsZWN0Q29sb3J9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8U2luZ2xlQ29sb3JQYWxldHRlXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvcj17cmdiVG9IZXgoY29sb3JTZXRzW2VkaXRpbmddLnNlbGVjdGVkQ29sb3IpfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0Q29sb3I9e3RoaXMuX29uU2VsZWN0Q29sb3J9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU3R5bGVkUGFuZWxEcm9wZG93bj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBvbkNsaWNrT3V0c2lkZShDb2xvclNlbGVjdG9yKTtcbiJdfQ==