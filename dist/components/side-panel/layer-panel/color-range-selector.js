"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _styledComponents2 = require("../../common/styled-components");

var _rangeSlider = _interopRequireDefault(require("../../common/range-slider"));

var _switch = _interopRequireDefault(require("../../common/switch"));

var _colorPalette = _interopRequireDefault(require("./color-palette"));

var _colorRanges = require("../../../constants/color-ranges");

var _dataUtils = require("../../../utils/data-utils");

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 0 8px;\n  :hover {\n    background-color: ", ";\n    cursor: pointer;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 8px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  .color-palette__config__label {\n    flex-grow: 1;\n  }\n  .color-palette__config__select {\n    flex-grow: 1;\n  }\n  .item-selector .item-selector__dropdown {\n    ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding-bottom: 12px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 12px 12px 0 12px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ALL_TYPES = (0, _lodash["default"])(_colorRanges.COLOR_RANGES.map(function (c) {
  return c.type;
}).concat(['all']));
var ALL_STEPS = (0, _lodash["default"])(_colorRanges.COLOR_RANGES.map(function (d) {
  return d.colors.length;
})).sort(_dataUtils.numberSort);

var StyledColorConfig = _styledComponents["default"].div(_templateObject());

var ColorRangeSelector = _styledComponents["default"].div(_templateObject2());

var ColorRangeSelect =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ColorRangeSelect, _Component);

  function ColorRangeSelect() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, ColorRangeSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(ColorRangeSelect)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      config: {
        type: {
          type: 'select',
          value: 'all',
          options: ALL_TYPES
        },
        steps: {
          type: 'select',
          value: 6,
          options: ALL_STEPS
        },
        reversed: {
          type: 'switch',
          value: false,
          options: [true, false]
        }
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateConfig", function (_ref) {
      var key = _ref.key,
          value = _ref.value;
      var currentValue = _this.state.config[key].value;

      if (value !== currentValue) {
        _this.setState({
          config: (0, _objectSpread3["default"])({}, _this.state.config, (0, _defineProperty2["default"])({}, key, (0, _objectSpread3["default"])({}, _this.state.config[key], {
            value: value
          })))
        });
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(ColorRangeSelect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var config = this.state.config;
      return _react["default"].createElement(ColorRangeSelector, {
        className: "color-range-selector"
      }, _react["default"].createElement(StyledColorConfig, null, Object.keys(config).map(function (key) {
        return _react["default"].createElement(PaletteConfig, {
          key: key,
          label: key,
          config: config[key],
          onChange: function onChange(value) {
            return _this2._updateConfig({
              key: key,
              value: value
            });
          }
        });
      })), _react["default"].createElement(ColorPaletteGroup, {
        config: config,
        colorRanges: this.props.colorRanges,
        onSelect: this.props.onSelectColorRange,
        selected: this.props.selectedColorRange
      }));
    }
  }]);
  return ColorRangeSelect;
}(_react.Component);

exports["default"] = ColorRangeSelect;
(0, _defineProperty2["default"])(ColorRangeSelect, "propTypes", {
  colorRanges: _propTypes["default"].arrayOf(_propTypes["default"].any),
  selectedColorRange: _propTypes["default"].object,
  onSelectColorRange: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(ColorRangeSelect, "defaultProps", {
  colorRanges: _colorRanges.COLOR_RANGES,
  onSelectColorRange: function onSelectColorRange() {}
});

var StyledPaletteConfig = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.theme.secondaryInput;
});

var PaletteConfig = function PaletteConfig(_ref2) {
  var category = _ref2.category,
      label = _ref2.label,
      _ref2$config = _ref2.config,
      type = _ref2$config.type,
      value = _ref2$config.value,
      options = _ref2$config.options,
      _onChange = _ref2.onChange;
  return _react["default"].createElement(StyledPaletteConfig, {
    className: "color-palette__config",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, _react["default"].createElement("div", {
    className: "color-palette__config__label"
  }, _react["default"].createElement(_styledComponents2.PanelLabel, null, label)), type === 'select' && _react["default"].createElement("div", {
    className: "color-palette__config__select"
  }, _react["default"].createElement(_itemSelector["default"], {
    selectedItems: value,
    options: options,
    multiSelect: false,
    searchable: false,
    onChange: _onChange
  })), type === 'slider' && _react["default"].createElement("div", {
    className: "color-palette__config__slider"
  }, _react["default"].createElement("div", {
    className: "color-palette__config__slider__slider"
  }, _react["default"].createElement(_rangeSlider["default"], {
    range: options,
    value0: options[0],
    value1: value,
    step: 1,
    isRanged: false,
    showInput: false,
    onChange: function onChange(val) {
      return _onChange(val[1]);
    }
  })), _react["default"].createElement("div", {
    className: "color-palette__config__slider__number"
  }, value)), type === 'switch' && _react["default"].createElement(_switch["default"], {
    checked: value,
    id: "".concat(category, "-").concat(label, "-toggle"),
    onChange: function onChange() {
      return _onChange(!value);
    },
    secondary: true
  }));
};

var StyledColorRange = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.theme.panelBackgroundHover;
});

var ColorPaletteGroup = function ColorPaletteGroup(_ref3) {
  var _ref3$config = _ref3.config,
      config = _ref3$config === void 0 ? {} : _ref3$config,
      onSelect = _ref3.onSelect,
      selected = _ref3.selected,
      colorRanges = _ref3.colorRanges;
  var steps = config.steps,
      reversed = config.reversed,
      type = config.type;
  var filtered = colorRanges.filter(function (colorRange) {
    var isType = !type || type.value === 'all' || type.value === colorRange.type;
    var isStep = !steps || Number(steps.value) === colorRange.colors.length;
    return isType && isStep;
  });
  var isReversed = Boolean(reversed && reversed.value);
  return _react["default"].createElement("div", {
    className: "color-palette__group"
  }, filtered.map(function (colorRange) {
    return _react["default"].createElement(StyledColorRange, {
      className: "color-ranges",
      key: colorRange.name,
      onClick: function onClick(e) {
        return onSelect((0, _objectSpread3["default"])({}, colorRange, {
          reversed: isReversed,
          colors: isReversed ? colorRange.colors.slice().reverse() : colorRange.colors
        }), e);
      }
    }, _react["default"].createElement(_colorPalette["default"], {
      colors: colorRange.colors,
      isReversed: isReversed,
      isSelected: colorRange.name === selected.name && isReversed === Boolean(selected.reversed)
    }));
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvY29sb3ItcmFuZ2Utc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiQUxMX1RZUEVTIiwiQ09MT1JfUkFOR0VTIiwibWFwIiwiYyIsInR5cGUiLCJjb25jYXQiLCJBTExfU1RFUFMiLCJkIiwiY29sb3JzIiwibGVuZ3RoIiwic29ydCIsIm51bWJlclNvcnQiLCJTdHlsZWRDb2xvckNvbmZpZyIsInN0eWxlZCIsImRpdiIsIkNvbG9yUmFuZ2VTZWxlY3RvciIsIkNvbG9yUmFuZ2VTZWxlY3QiLCJjb25maWciLCJ2YWx1ZSIsIm9wdGlvbnMiLCJzdGVwcyIsInJldmVyc2VkIiwia2V5IiwiY3VycmVudFZhbHVlIiwic3RhdGUiLCJzZXRTdGF0ZSIsIk9iamVjdCIsImtleXMiLCJfdXBkYXRlQ29uZmlnIiwicHJvcHMiLCJjb2xvclJhbmdlcyIsIm9uU2VsZWN0Q29sb3JSYW5nZSIsInNlbGVjdGVkQ29sb3JSYW5nZSIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJvYmplY3QiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIlN0eWxlZFBhbGV0dGVDb25maWciLCJ0aGVtZSIsInNlY29uZGFyeUlucHV0IiwiUGFsZXR0ZUNvbmZpZyIsImNhdGVnb3J5IiwibGFiZWwiLCJvbkNoYW5nZSIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ2YWwiLCJTdHlsZWRDb2xvclJhbmdlIiwicGFuZWxCYWNrZ3JvdW5kSG92ZXIiLCJDb2xvclBhbGV0dGVHcm91cCIsIm9uU2VsZWN0Iiwic2VsZWN0ZWQiLCJmaWx0ZXJlZCIsImZpbHRlciIsImNvbG9yUmFuZ2UiLCJpc1R5cGUiLCJpc1N0ZXAiLCJOdW1iZXIiLCJpc1JldmVyc2VkIiwiQm9vbGVhbiIsIm5hbWUiLCJzbGljZSIsInJldmVyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FB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QixnQ0FBQyxnQkFBRDtBQUNFLE1BQUEsU0FBUyxFQUFDLGNBRFo7QUFFRSxNQUFBLEdBQUcsRUFBRUEsVUFBVSxDQUFDTSxJQUZsQjtBQUdFLE1BQUEsT0FBTyxFQUFFLGlCQUFBaEIsQ0FBQztBQUFBLGVBQ1JNLFFBQVEsb0NBRURJLFVBRkM7QUFHSnBDLFVBQUFBLFFBQVEsRUFBRXdDLFVBSE47QUFJSnJELFVBQUFBLE1BQU0sRUFBRXFELFVBQVUsR0FDZEosVUFBVSxDQUFDakQsTUFBWCxDQUFrQndELEtBQWxCLEdBQTBCQyxPQUExQixFQURjLEdBRWRSLFVBQVUsQ0FBQ2pEO0FBTlgsWUFRTnVDLENBUk0sQ0FEQTtBQUFBO0FBSFosT0FnQkUsZ0NBQUMsd0JBQUQ7QUFDRSxNQUFBLE1BQU0sRUFBRVUsVUFBVSxDQUFDakQsTUFEckI7QUFFRSxNQUFBLFVBQVUsRUFBRXFELFVBRmQ7QUFHRSxNQUFBLFVBQVUsRUFDUkosVUFBVSxDQUFDTSxJQUFYLEtBQW9CVCxRQUFRLENBQUNTLElBQTdCLElBQ0FGLFVBQVUsS0FBS0MsT0FBTyxDQUFDUixRQUFRLENBQUNqQyxRQUFWO0FBTDFCLE1BaEJGLENBRHNCO0FBQUEsR0FBdkIsQ0FESCxDQURGO0FBK0JELENBNUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2l0ZW0tc2VsZWN0b3IvaXRlbS1zZWxlY3Rvcic7XG5pbXBvcnQge1BhbmVsTGFiZWx9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXInO1xuaW1wb3J0IFN3aXRjaCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zd2l0Y2gnO1xuaW1wb3J0IENvbG9yUGFsZXR0ZSBmcm9tICcuL2NvbG9yLXBhbGV0dGUnO1xuXG5pbXBvcnQge0NPTE9SX1JBTkdFU30gZnJvbSAnY29uc3RhbnRzL2NvbG9yLXJhbmdlcyc7XG5pbXBvcnQge251bWJlclNvcnR9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5jb25zdCBBTExfVFlQRVMgPSB1bmlxKENPTE9SX1JBTkdFUy5tYXAoYyA9PiBjLnR5cGUpLmNvbmNhdChbJ2FsbCddKSk7XG5jb25zdCBBTExfU1RFUFMgPSB1bmlxKENPTE9SX1JBTkdFUy5tYXAoZCA9PiBkLmNvbG9ycy5sZW5ndGgpKS5zb3J0KG51bWJlclNvcnQpO1xuXG5jb25zdCBTdHlsZWRDb2xvckNvbmZpZyA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDEycHggMTJweCAwIDEycHg7XG5gO1xuXG5jb25zdCBDb2xvclJhbmdlU2VsZWN0b3IgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbmA7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclJhbmdlU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBjb2xvclJhbmdlczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgc2VsZWN0ZWRDb2xvclJhbmdlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9uU2VsZWN0Q29sb3JSYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgY29sb3JSYW5nZXM6IENPTE9SX1JBTkdFUyxcbiAgICBvblNlbGVjdENvbG9yUmFuZ2U6ICgpID0+IHt9XG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgY29uZmlnOiB7XG4gICAgICB0eXBlOiB7XG4gICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICB2YWx1ZTogJ2FsbCcsXG4gICAgICAgIG9wdGlvbnM6IEFMTF9UWVBFU1xuICAgICAgfSxcbiAgICAgIHN0ZXBzOiB7XG4gICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICB2YWx1ZTogNixcbiAgICAgICAgb3B0aW9uczogQUxMX1NURVBTXG4gICAgICB9LFxuICAgICAgcmV2ZXJzZWQ6IHtcbiAgICAgICAgdHlwZTogJ3N3aXRjaCcsXG4gICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgb3B0aW9uczogW3RydWUsIGZhbHNlXVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfdXBkYXRlQ29uZmlnID0gKHtrZXksIHZhbHVlfSkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMuc3RhdGUuY29uZmlnW2tleV0udmFsdWU7XG4gICAgaWYgKHZhbHVlICE9PSBjdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLmNvbmZpZyxcbiAgICAgICAgICBba2V5XToge1xuICAgICAgICAgICAgLi4udGhpcy5zdGF0ZS5jb25maWdba2V5XSxcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjb25maWd9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbG9yUmFuZ2VTZWxlY3RvciBjbGFzc05hbWU9XCJjb2xvci1yYW5nZS1zZWxlY3RvclwiPlxuICAgICAgICA8U3R5bGVkQ29sb3JDb25maWc+XG4gICAgICAgICAge09iamVjdC5rZXlzKGNvbmZpZykubWFwKGtleSA9PiAoXG4gICAgICAgICAgICA8UGFsZXR0ZUNvbmZpZ1xuICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgbGFiZWw9e2tleX1cbiAgICAgICAgICAgICAgY29uZmlnPXtjb25maWdba2V5XX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IHRoaXMuX3VwZGF0ZUNvbmZpZyh7a2V5LCB2YWx1ZX0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9TdHlsZWRDb2xvckNvbmZpZz5cbiAgICAgICAgPENvbG9yUGFsZXR0ZUdyb3VwXG4gICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgY29sb3JSYW5nZXM9e3RoaXMucHJvcHMuY29sb3JSYW5nZXN9XG4gICAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3RDb2xvclJhbmdlfVxuICAgICAgICAgIHNlbGVjdGVkPXt0aGlzLnByb3BzLnNlbGVjdGVkQ29sb3JSYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvQ29sb3JSYW5nZVNlbGVjdG9yPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgU3R5bGVkUGFsZXR0ZUNvbmZpZyA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAuY29sb3ItcGFsZXR0ZV9fY29uZmlnX19sYWJlbCB7XG4gICAgZmxleC1ncm93OiAxO1xuICB9XG4gIC5jb2xvci1wYWxldHRlX19jb25maWdfX3NlbGVjdCB7XG4gICAgZmxleC1ncm93OiAxO1xuICB9XG4gIC5pdGVtLXNlbGVjdG9yIC5pdGVtLXNlbGVjdG9yX19kcm9wZG93biB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dH07XG4gIH1cbmA7XG5cbmNvbnN0IFBhbGV0dGVDb25maWcgPSAoe1xuICBjYXRlZ29yeSxcbiAgbGFiZWwsXG4gIGNvbmZpZzoge3R5cGUsIHZhbHVlLCBvcHRpb25zfSxcbiAgb25DaGFuZ2Vcbn0pID0+IChcbiAgPFN0eWxlZFBhbGV0dGVDb25maWdcbiAgICBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19jb25maWdcIlxuICAgIG9uQ2xpY2s9e2UgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgPlxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sb3ItcGFsZXR0ZV9fY29uZmlnX19sYWJlbFwiPlxuICAgICAgPFBhbmVsTGFiZWw+e2xhYmVsfTwvUGFuZWxMYWJlbD5cbiAgICA8L2Rpdj5cbiAgICB7dHlwZSA9PT0gJ3NlbGVjdCcgJiYgKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19jb25maWdfX3NlbGVjdFwiPlxuICAgICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgICAgc2VsZWN0ZWRJdGVtcz17dmFsdWV9XG4gICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICAgICAgc2VhcmNoYWJsZT17ZmFsc2V9XG4gICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKX1cbiAgICB7dHlwZSA9PT0gJ3NsaWRlcicgJiYgKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19jb25maWdfX3NsaWRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2NvbmZpZ19fc2xpZGVyX19zbGlkZXJcIj5cbiAgICAgICAgICA8UmFuZ2VTbGlkZXJcbiAgICAgICAgICAgIHJhbmdlPXtvcHRpb25zfVxuICAgICAgICAgICAgdmFsdWUwPXtvcHRpb25zWzBdfVxuICAgICAgICAgICAgdmFsdWUxPXt2YWx1ZX1cbiAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICBpc1JhbmdlZD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3ZhbCA9PiBvbkNoYW5nZSh2YWxbMV0pfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbG9yLXBhbGV0dGVfX2NvbmZpZ19fc2xpZGVyX19udW1iZXJcIj57dmFsdWV9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApfVxuICAgIHt0eXBlID09PSAnc3dpdGNoJyAmJiAoXG4gICAgICA8U3dpdGNoXG4gICAgICAgIGNoZWNrZWQ9e3ZhbHVlfVxuICAgICAgICBpZD17YCR7Y2F0ZWdvcnl9LSR7bGFiZWx9LXRvZ2dsZWB9XG4gICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBvbkNoYW5nZSghdmFsdWUpfVxuICAgICAgICBzZWNvbmRhcnlcbiAgICAgIC8+XG4gICAgKX1cbiAgPC9TdHlsZWRQYWxldHRlQ29uZmlnPlxuKTtcblxuY29uc3QgU3R5bGVkQ29sb3JSYW5nZSA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDAgOHB4O1xuICA6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJ9O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuYDtcblxuY29uc3QgQ29sb3JQYWxldHRlR3JvdXAgPSAoe2NvbmZpZyA9IHt9LCBvblNlbGVjdCwgc2VsZWN0ZWQsIGNvbG9yUmFuZ2VzfSkgPT4ge1xuICBjb25zdCB7c3RlcHMsIHJldmVyc2VkLCB0eXBlfSA9IGNvbmZpZztcblxuICBjb25zdCBmaWx0ZXJlZCA9IGNvbG9yUmFuZ2VzLmZpbHRlcihjb2xvclJhbmdlID0+IHtcbiAgICBjb25zdCBpc1R5cGUgPVxuICAgICAgIXR5cGUgfHwgdHlwZS52YWx1ZSA9PT0gJ2FsbCcgfHwgdHlwZS52YWx1ZSA9PT0gY29sb3JSYW5nZS50eXBlO1xuICAgIGNvbnN0IGlzU3RlcCA9ICFzdGVwcyB8fCBOdW1iZXIoc3RlcHMudmFsdWUpID09PSBjb2xvclJhbmdlLmNvbG9ycy5sZW5ndGg7XG5cbiAgICByZXR1cm4gaXNUeXBlICYmIGlzU3RlcDtcbiAgfSk7XG5cbiAgY29uc3QgaXNSZXZlcnNlZCA9IEJvb2xlYW4ocmV2ZXJzZWQgJiYgcmV2ZXJzZWQudmFsdWUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJjb2xvci1wYWxldHRlX19ncm91cFwiPlxuICAgICAge2ZpbHRlcmVkLm1hcChjb2xvclJhbmdlID0+IChcbiAgICAgICAgPFN0eWxlZENvbG9yUmFuZ2VcbiAgICAgICAgICBjbGFzc05hbWU9XCJjb2xvci1yYW5nZXNcIlxuICAgICAgICAgIGtleT17Y29sb3JSYW5nZS5uYW1lfVxuICAgICAgICAgIG9uQ2xpY2s9e2UgPT5cbiAgICAgICAgICAgIG9uU2VsZWN0KFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4uY29sb3JSYW5nZSxcbiAgICAgICAgICAgICAgICByZXZlcnNlZDogaXNSZXZlcnNlZCxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IGlzUmV2ZXJzZWRcbiAgICAgICAgICAgICAgICAgID8gY29sb3JSYW5nZS5jb2xvcnMuc2xpY2UoKS5yZXZlcnNlKClcbiAgICAgICAgICAgICAgICAgIDogY29sb3JSYW5nZS5jb2xvcnNcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgPlxuICAgICAgICAgIDxDb2xvclBhbGV0dGVcbiAgICAgICAgICAgIGNvbG9ycz17Y29sb3JSYW5nZS5jb2xvcnN9XG4gICAgICAgICAgICBpc1JldmVyc2VkPXtpc1JldmVyc2VkfVxuICAgICAgICAgICAgaXNTZWxlY3RlZD17XG4gICAgICAgICAgICAgIGNvbG9yUmFuZ2UubmFtZSA9PT0gc2VsZWN0ZWQubmFtZSAmJlxuICAgICAgICAgICAgICBpc1JldmVyc2VkID09PSBCb29sZWFuKHNlbGVjdGVkLnJldmVyc2VkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvU3R5bGVkQ29sb3JSYW5nZT5cbiAgICAgICkpfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==