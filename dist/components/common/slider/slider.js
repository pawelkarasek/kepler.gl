"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _sliderHandle = _interopRequireDefault(require("./slider-handle"));

var _sliderBarHandle = _interopRequireDefault(require("./slider-bar-handle"));

var _dataUtils = require("../../../utils/data-utils");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  flex-grow: 1;\n  margin-top: ", "px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  margin-bottom: 12px;\n  background-color: ", ";\n  ", ";\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function noop() {}

var StyledRangeSlider = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.sliderBarBgd;
}, function (props) {
  return "".concat(props.vertical ? 'width' : 'height', ": ").concat(props.theme.sliderBarHeight, "px");
}, function (props) {
  return "".concat(props.vertical ? 'height' : 'width', ": 100%");
});

var SliderWrapper = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.isRanged ? 0 : 10;
});

var Slider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(Slider, _Component);

  function Slider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, Slider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(Slider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "ref", undefined);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_saveRef", function (ref) {
      _this.ref = ref;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isVal0InRange", function (val) {
      var _this$props = _this.props,
          value1 = _this$props.value1,
          minValue = _this$props.minValue;
      return Boolean(val >= minValue && val <= value1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isVal1InRange", function (val) {
      var _this$props2 = _this.props,
          maxValue = _this$props2.maxValue,
          value0 = _this$props2.value0;
      return Boolean(val <= maxValue && val >= value0);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "slide0Listener", function (x) {
      var val = _this._getValue(_this.props.value0, x);

      if (_this._isVal0InRange(val)) {
        _this.props.onSlider0Change(val);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "slide1Listener", function (x) {
      var val = _this._getValue(_this.props.value1, x);

      if (_this._isVal1InRange(val)) {
        _this.props.onSlider1Change(val);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "sliderBarListener", function (x) {
      var val0 = _this._getValue(_this.props.value0, x);

      var val1 = _this._getValue(_this.props.value1, x);

      if (_this._isVal1InRange(val1) && _this._isVal0InRange(val0)) {
        _this.props.onSliderBarChange(val0, val1);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "calcHandleLeft0", function (w, l, num) {
      return w === 0 ? "calc(".concat(l, "% - ").concat(_this.props.sliderHandleWidth / 2, "px)") : "calc(".concat(l, "% - ").concat(_this.props.sliderHandleWidth / 2, "px)");
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "calcHandleLeft1", function (w, l) {
      return _this.props.isRanged && w === 0 ? "".concat(l, "%") : "calc(".concat(l + w, "% - ").concat(_this.props.sliderHandleWidth / 2, "px)");
    });
    return _this;
  }

  (0, _createClass2["default"])(Slider, [{
    key: "_getBaseDistance",
    value: function _getBaseDistance() {
      return this.props.vertical ? this.ref.offsetHeight : this.ref.offsetWidth;
    }
  }, {
    key: "_getValDelta",
    value: function _getValDelta(x) {
      var percent = x / this._getBaseDistance();

      var maxDelta = this.props.maxValue - this.props.minValue;
      return percent * maxDelta;
    }
  }, {
    key: "_getValue",
    value: function _getValue(val, offset) {
      var delta = this._getValDelta(offset);

      var rawValue = this.props.vertical ? val - delta : val + delta;
      return this._roundValToStep(rawValue);
    }
  }, {
    key: "_roundValToStep",
    value: function _roundValToStep(val) {
      var _this$props3 = this.props,
          minValue = _this$props3.minValue,
          step = _this$props3.step;
      return (0, _dataUtils.roundValToStep)(minValue, step, val);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          classSet = _this$props4.classSet,
          isRanged = _this$props4.isRanged,
          maxValue = _this$props4.maxValue,
          minValue = _this$props4.minValue,
          value1 = _this$props4.value1,
          vertical = _this$props4.vertical,
          sliderHandleWidth = _this$props4.sliderHandleWidth,
          showTooltip = _this$props4.showTooltip;
      var value0 = !isRanged && minValue > 0 ? minValue : this.props.value0;
      var currValDelta = value1 - value0;
      var maxDelta = maxValue - minValue;
      var width = currValDelta / maxDelta * 100;
      var v0Left = (value0 - minValue) / maxDelta * 100;
      return _react["default"].createElement(SliderWrapper, {
        className: (0, _classnames["default"])('kg-slider', (0, _objectSpread2["default"])({}, classSet)),
        ref: this._saveRef,
        isRanged: isRanged,
        vertical: vertical
      }, _react["default"].createElement(StyledRangeSlider, {
        className: "kg-range-slider",
        vertical: vertical
      }, _react["default"].createElement(_sliderHandle["default"], {
        className: "kg-range-slider__handle",
        left: this.calcHandleLeft0(width, v0Left),
        valueListener: this.slide0Listener,
        sliderHandleWidth: sliderHandleWidth,
        display: isRanged,
        vertical: vertical,
        showTooltip: showTooltip
      }), _react["default"].createElement(_sliderHandle["default"], {
        className: "kg-range-slider__handle",
        left: this.calcHandleLeft1(width, v0Left),
        valueListener: this.slide1Listener,
        sliderHandleWidth: sliderHandleWidth,
        vertical: vertical,
        value: value1,
        showTooltip: showTooltip
      }), _react["default"].createElement(_sliderBarHandle["default"], {
        width: width,
        v0Left: v0Left,
        enableBarDrag: this.props.enableBarDrag,
        sliderBarListener: this.sliderBarListener,
        vertical: vertical
      })));
    }
  }]);
  return Slider;
}(_react.Component);

exports["default"] = Slider;
(0, _defineProperty2["default"])(Slider, "propTypes", {
  title: _propTypes["default"].string,
  isRanged: _propTypes["default"].bool,
  value0: _propTypes["default"].number,
  value1: _propTypes["default"].number,
  minValue: _propTypes["default"].number,
  maxValue: _propTypes["default"].number,
  sliderHandleWidth: _propTypes["default"].number,
  onSlider0Change: _propTypes["default"].func,
  onInput0Change: _propTypes["default"].func,
  onSlider1Change: _propTypes["default"].func,
  onInput1Change: _propTypes["default"].func,
  onSliderBarChange: _propTypes["default"].func,
  step: _propTypes["default"].number,
  enableBarDrag: _propTypes["default"].bool,
  showTooltip: _propTypes["default"].bool
});
(0, _defineProperty2["default"])(Slider, "defaultProps", {
  title: '',
  isRanged: true,
  value0: 0,
  value1: 100,
  minValue: 0,
  maxValue: 100,
  step: 1,
  sliderHandleWidth: 12,
  enableBarDrag: false,
  onSlider0Change: noop,
  onInput0Change: noop,
  onSlider1Change: noop,
  onInput1Change: noop,
  onSliderBarChange: noop,
  disabled: false,
  vertical: false,
  showTooltip: false
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyLmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJTdHlsZWRSYW5nZVNsaWRlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJCYXJCZ2QiLCJ2ZXJ0aWNhbCIsInNsaWRlckJhckhlaWdodCIsIlNsaWRlcldyYXBwZXIiLCJpc1JhbmdlZCIsIlNsaWRlciIsInVuZGVmaW5lZCIsInJlZiIsInZhbCIsInZhbHVlMSIsIm1pblZhbHVlIiwiQm9vbGVhbiIsIm1heFZhbHVlIiwidmFsdWUwIiwieCIsIl9nZXRWYWx1ZSIsIl9pc1ZhbDBJblJhbmdlIiwib25TbGlkZXIwQ2hhbmdlIiwiX2lzVmFsMUluUmFuZ2UiLCJvblNsaWRlcjFDaGFuZ2UiLCJ2YWwwIiwidmFsMSIsIm9uU2xpZGVyQmFyQ2hhbmdlIiwidyIsImwiLCJudW0iLCJzbGlkZXJIYW5kbGVXaWR0aCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFdpZHRoIiwicGVyY2VudCIsIl9nZXRCYXNlRGlzdGFuY2UiLCJtYXhEZWx0YSIsIm9mZnNldCIsImRlbHRhIiwiX2dldFZhbERlbHRhIiwicmF3VmFsdWUiLCJfcm91bmRWYWxUb1N0ZXAiLCJzdGVwIiwiY2xhc3NTZXQiLCJzaG93VG9vbHRpcCIsImN1cnJWYWxEZWx0YSIsIndpZHRoIiwidjBMZWZ0IiwiX3NhdmVSZWYiLCJjYWxjSGFuZGxlTGVmdDAiLCJzbGlkZTBMaXN0ZW5lciIsImNhbGNIYW5kbGVMZWZ0MSIsInNsaWRlMUxpc3RlbmVyIiwiZW5hYmxlQmFyRHJhZyIsInNsaWRlckJhckxpc3RlbmVyIiwiQ29tcG9uZW50IiwidGl0bGUiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJib29sIiwibnVtYmVyIiwiZnVuYyIsIm9uSW5wdXQwQ2hhbmdlIiwib25JbnB1dDFDaGFuZ2UiLCJkaXNhYmxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7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MDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IFNsaWRlckhhbmRsZSBmcm9tICcuL3NsaWRlci1oYW5kbGUnO1xuaW1wb3J0IFNsaWRlckJhckhhbmRsZSBmcm9tICcuL3NsaWRlci1iYXItaGFuZGxlJztcbmltcG9ydCB7cm91bmRWYWxUb1N0ZXB9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuY29uc3QgU3R5bGVkUmFuZ2VTbGlkZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2xpZGVyQmFyQmdkfTtcbiAgJHtwcm9wcyA9PlxuICAgIGAke3Byb3BzLnZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnfTogJHtwcm9wcy50aGVtZS5zbGlkZXJCYXJIZWlnaHR9cHhgfTtcbiAgJHtwcm9wcyA9PiBgJHtwcm9wcy52ZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJ306IDEwMCVgfTtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBmbGV4LWdyb3c6IDE7XG4gIG1hcmdpbi10b3A6ICR7cHJvcHMgPT4gKHByb3BzLmlzUmFuZ2VkID8gMCA6IDEwKX1weDtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaXNSYW5nZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHZhbHVlMDogUHJvcFR5cGVzLm51bWJlcixcbiAgICB2YWx1ZTE6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWluVmFsdWU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgbWF4VmFsdWU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25TbGlkZXIwQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0MENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TbGlkZXIxQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbklucHV0MUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25TbGlkZXJCYXJDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZW5hYmxlQmFyRHJhZzogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd1Rvb2x0aXA6IFByb3BUeXBlcy5ib29sXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0aXRsZTogJycsXG4gICAgaXNSYW5nZWQ6IHRydWUsXG4gICAgdmFsdWUwOiAwLFxuICAgIHZhbHVlMTogMTAwLFxuICAgIG1pblZhbHVlOiAwLFxuICAgIG1heFZhbHVlOiAxMDAsXG4gICAgc3RlcDogMSxcbiAgICBzbGlkZXJIYW5kbGVXaWR0aDogMTIsXG4gICAgZW5hYmxlQmFyRHJhZzogZmFsc2UsXG4gICAgb25TbGlkZXIwQ2hhbmdlOiBub29wLFxuICAgIG9uSW5wdXQwQ2hhbmdlOiBub29wLFxuICAgIG9uU2xpZGVyMUNoYW5nZTogbm9vcCxcbiAgICBvbklucHV0MUNoYW5nZTogbm9vcCxcbiAgICBvblNsaWRlckJhckNoYW5nZTogbm9vcCxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgdmVydGljYWw6IGZhbHNlLFxuICAgIHNob3dUb29sdGlwOiBmYWxzZVxuICB9O1xuXG4gIHJlZiA9IHVuZGVmaW5lZDtcblxuICBfc2F2ZVJlZiA9IHJlZiA9PiB7XG4gICAgdGhpcy5yZWYgPSByZWY7XG4gIH07XG5cbiAgX2dldEJhc2VEaXN0YW5jZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy52ZXJ0aWNhbCA/IHRoaXMucmVmLm9mZnNldEhlaWdodCA6IHRoaXMucmVmLm9mZnNldFdpZHRoO1xuICB9XG5cbiAgX2dldFZhbERlbHRhKHgpIHtcbiAgICBjb25zdCBwZXJjZW50ID0geCAvIHRoaXMuX2dldEJhc2VEaXN0YW5jZSgpO1xuICAgIGNvbnN0IG1heERlbHRhID0gdGhpcy5wcm9wcy5tYXhWYWx1ZSAtIHRoaXMucHJvcHMubWluVmFsdWU7XG4gICAgcmV0dXJuIHBlcmNlbnQgKiBtYXhEZWx0YTtcbiAgfVxuXG4gIF9nZXRWYWx1ZSh2YWwsIG9mZnNldCkge1xuICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZ2V0VmFsRGVsdGEob2Zmc2V0KTtcbiAgICBjb25zdCByYXdWYWx1ZSA9ICB0aGlzLnByb3BzLnZlcnRpY2FsID8gdmFsIC0gZGVsdGEgOiB2YWwgKyBkZWx0YTtcblxuICAgIHJldHVybiB0aGlzLl9yb3VuZFZhbFRvU3RlcChyYXdWYWx1ZSk7XG4gIH1cblxuICBfaXNWYWwwSW5SYW5nZSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMSwgbWluVmFsdWV9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gQm9vbGVhbih2YWwgPj0gbWluVmFsdWUgJiYgdmFsIDw9IHZhbHVlMSk7XG4gIH07XG5cbiAgX2lzVmFsMUluUmFuZ2UgPSB2YWwgPT4ge1xuICAgIGNvbnN0IHttYXhWYWx1ZSwgdmFsdWUwfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIEJvb2xlYW4odmFsIDw9IG1heFZhbHVlICYmIHZhbCA+PSB2YWx1ZTApO1xuICB9O1xuXG4gIF9yb3VuZFZhbFRvU3RlcCh2YWwpIHtcbiAgICBjb25zdCB7bWluVmFsdWUsIHN0ZXB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gcm91bmRWYWxUb1N0ZXAobWluVmFsdWUsIHN0ZXAsIHZhbCk7XG4gIH1cblxuICBzbGlkZTBMaXN0ZW5lciA9IHggPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMuX2dldFZhbHVlKHRoaXMucHJvcHMudmFsdWUwLCB4KTtcbiAgICBpZiAodGhpcy5faXNWYWwwSW5SYW5nZSh2YWwpKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2xpZGVyMENoYW5nZSh2YWwpO1xuICAgIH1cbiAgfTtcblxuICBzbGlkZTFMaXN0ZW5lciA9IHggPT4ge1xuICAgIGNvbnN0IHZhbCA9IHRoaXMuX2dldFZhbHVlKHRoaXMucHJvcHMudmFsdWUxLCB4KTtcbiAgICBpZiAodGhpcy5faXNWYWwxSW5SYW5nZSh2YWwpKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2xpZGVyMUNoYW5nZSh2YWwpO1xuICAgIH1cbiAgfTtcblxuICBzbGlkZXJCYXJMaXN0ZW5lciA9IHggPT4ge1xuICAgIGNvbnN0IHZhbDAgPSB0aGlzLl9nZXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlMCwgeCk7XG4gICAgY29uc3QgdmFsMSA9IHRoaXMuX2dldFZhbHVlKHRoaXMucHJvcHMudmFsdWUxLCB4KTtcbiAgICBpZiAodGhpcy5faXNWYWwxSW5SYW5nZSh2YWwxKSAmJiB0aGlzLl9pc1ZhbDBJblJhbmdlKHZhbDApKSB7XG4gICAgICB0aGlzLnByb3BzLm9uU2xpZGVyQmFyQ2hhbmdlKHZhbDAsIHZhbDEpO1xuICAgIH1cbiAgfTtcblxuICBjYWxjSGFuZGxlTGVmdDAgPSAodywgbCwgbnVtKSA9PiB7XG4gICAgcmV0dXJuIHcgPT09IDBcbiAgICAgID8gYGNhbGMoJHtsfSUgLSAke3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGggLyAyfXB4KWBcbiAgICAgIDogYGNhbGMoJHtsfSUgLSAke3RoaXMucHJvcHMuc2xpZGVySGFuZGxlV2lkdGggLyAyfXB4KWA7XG4gIH07XG5cbiAgY2FsY0hhbmRsZUxlZnQxID0gKHcsIGwpID0+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5pc1JhbmdlZCAmJiB3ID09PSAwXG4gICAgICA/IGAke2x9JWBcbiAgICAgIDogYGNhbGMoJHtsICsgd30lIC0gJHt0aGlzLnByb3BzLnNsaWRlckhhbmRsZVdpZHRoIC8gMn1weClgO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBjbGFzc1NldCxcbiAgICAgIGlzUmFuZ2VkLFxuICAgICAgbWF4VmFsdWUsXG4gICAgICBtaW5WYWx1ZSxcbiAgICAgIHZhbHVlMSxcbiAgICAgIHZlcnRpY2FsLFxuICAgICAgc2xpZGVySGFuZGxlV2lkdGgsXG4gICAgICBzaG93VG9vbHRpcFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHZhbHVlMCA9ICFpc1JhbmdlZCAmJiBtaW5WYWx1ZSA+IDAgPyBtaW5WYWx1ZSA6IHRoaXMucHJvcHMudmFsdWUwO1xuICAgIGNvbnN0IGN1cnJWYWxEZWx0YSA9IHZhbHVlMSAtIHZhbHVlMDtcbiAgICBjb25zdCBtYXhEZWx0YSA9IG1heFZhbHVlIC0gbWluVmFsdWU7XG4gICAgY29uc3Qgd2lkdGggPSAoY3VyclZhbERlbHRhIC8gbWF4RGVsdGEpICogMTAwO1xuICAgIGNvbnN0IHYwTGVmdCA9ICgodmFsdWUwIC0gbWluVmFsdWUpIC8gbWF4RGVsdGEpICogMTAwO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxTbGlkZXJXcmFwcGVyXG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygna2ctc2xpZGVyJywgey4uLmNsYXNzU2V0fSl9XG4gICAgICAgIHJlZj17dGhpcy5fc2F2ZVJlZn1cbiAgICAgICAgaXNSYW5nZWQ9e2lzUmFuZ2VkfVxuICAgICAgICB2ZXJ0aWNhbD17dmVydGljYWx9XG4gICAgICA+XG4gICAgICAgIDxTdHlsZWRSYW5nZVNsaWRlciBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIiB2ZXJ0aWNhbD17dmVydGljYWx9PlxuICAgICAgICAgIDxTbGlkZXJIYW5kbGVcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9faGFuZGxlXCJcbiAgICAgICAgICAgIGxlZnQ9e3RoaXMuY2FsY0hhbmRsZUxlZnQwKHdpZHRoLCB2MExlZnQpfVxuICAgICAgICAgICAgdmFsdWVMaXN0ZW5lcj17dGhpcy5zbGlkZTBMaXN0ZW5lcn1cbiAgICAgICAgICAgIHNsaWRlckhhbmRsZVdpZHRoPXtzbGlkZXJIYW5kbGVXaWR0aH1cbiAgICAgICAgICAgIGRpc3BsYXk9e2lzUmFuZ2VkfVxuICAgICAgICAgICAgdmVydGljYWw9e3ZlcnRpY2FsfVxuICAgICAgICAgICAgc2hvd1Rvb2x0aXA9e3Nob3dUb29sdGlwfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNsaWRlckhhbmRsZVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwia2ctcmFuZ2Utc2xpZGVyX19oYW5kbGVcIlxuICAgICAgICAgICAgbGVmdD17dGhpcy5jYWxjSGFuZGxlTGVmdDEod2lkdGgsIHYwTGVmdCl9XG4gICAgICAgICAgICB2YWx1ZUxpc3RlbmVyPXt0aGlzLnNsaWRlMUxpc3RlbmVyfVxuICAgICAgICAgICAgc2xpZGVySGFuZGxlV2lkdGg9e3NsaWRlckhhbmRsZVdpZHRofVxuICAgICAgICAgICAgdmVydGljYWw9e3ZlcnRpY2FsfVxuICAgICAgICAgICAgdmFsdWU9e3ZhbHVlMX1cbiAgICAgICAgICAgIHNob3dUb29sdGlwPXtzaG93VG9vbHRpcH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTbGlkZXJCYXJIYW5kbGVcbiAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgIHYwTGVmdD17djBMZWZ0fVxuICAgICAgICAgICAgZW5hYmxlQmFyRHJhZz17dGhpcy5wcm9wcy5lbmFibGVCYXJEcmFnfVxuICAgICAgICAgICAgc2xpZGVyQmFyTGlzdGVuZXI9e3RoaXMuc2xpZGVyQmFyTGlzdGVuZXJ9XG4gICAgICAgICAgICB2ZXJ0aWNhbD17dmVydGljYWx9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9TdHlsZWRSYW5nZVNsaWRlcj5cbiAgICAgIDwvU2xpZGVyV3JhcHBlcj5cbiAgICApO1xuICB9XG59XG4iXX0=