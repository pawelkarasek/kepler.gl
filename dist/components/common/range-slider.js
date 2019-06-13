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

var _rangePlot = _interopRequireDefault(require("./range-plot"));

var _slider = _interopRequireDefault(require("./slider/slider"));

var _styledComponents2 = require("./styled-components");

var _dataUtils = require("../../utils/data-utils");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 6px;\n  display: flex;\n  justify-content: space-between;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  position: relative;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  height: ", "px;\n  width: ", "px;\n  padding: 4px 6px;\n  margin-left: ", "px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SliderInput = (0, _styledComponents["default"])(_styledComponents2.Input)(_templateObject(), function (props) {
  return props.theme.sliderInputHeight;
}, function (props) {
  return props.theme.sliderInputWidth;
}, function (props) {
  return props.flush ? 0 : 24;
});

var SliderWrapper = _styledComponents["default"].div(_templateObject2());

var RangeInputWrapper = _styledComponents["default"].div(_templateObject3());

var RangeSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(RangeSlider, _Component);

  function RangeSlider() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, RangeSlider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(RangeSlider)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      value0: 0,
      value1: 1,
      width: 288
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setValueFromProps", function (props) {
      var value0 = props.value0,
          value1 = props.value1;

      if (!isNaN(value0) && !isNaN(value1)) {
        _this.setState({
          value0: value0,
          value1: value1
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isVal0InRange", function (val) {
      var _this$props = _this.props,
          value1 = _this$props.value1,
          range = _this$props.range;
      return Boolean(val >= range[0] && val <= value1);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isVal1InRange", function (val) {
      var _this$props2 = _this.props,
          range = _this$props2.range,
          value0 = _this$props2.value0;
      return Boolean(val <= range[1] && val >= value0);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_roundValToStep", function (val) {
      var _this$props3 = _this.props,
          range = _this$props3.range,
          step = _this$props3.step;
      return (0, _dataUtils.roundValToStep)(range[0], step, val);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setRangeVal1", function (val) {
      var _this$props4 = _this.props,
          value0 = _this$props4.value0,
          onChange = _this$props4.onChange;
      val = Number(val);

      if (_this._isVal1InRange(val)) {
        onChange([value0, _this._roundValToStep(val)]);
        return true;
      }

      return false;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setRangeVal0", function (val) {
      var _this$props5 = _this.props,
          value1 = _this$props5.value1,
          onChange = _this$props5.onChange;
      val = Number(val);

      if (_this._isVal0InRange(val)) {
        onChange([_this._roundValToStep(val), value1]);
        return true;
      }

      return false;
    });
    return _this;
  }

  (0, _createClass2["default"])(RangeSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setValueFromProps(this.props);

      this._resize();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this._setValueFromProps(nextProps);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._resize();
    }
  }, {
    key: "_resize",
    value: function _resize() {
      var width = this.sliderContainer.offsetWidth;

      if (width !== this.state.width) {
        this.setState({
          width: width
        });
      }
    }
  }, {
    key: "_renderInput",
    value: function _renderInput(key) {
      var _this2 = this;

      var setRange = key === 'value0' ? this._setRangeVal0 : this._setRangeVal1;

      var update = function update(e) {
        if (!setRange(e.target.value)) {
          _this2.setState((0, _defineProperty2["default"])({}, key, _this2.state[key]));
        }
      };

      return _react["default"].createElement(SliderInput, {
        className: "kg-range-slider__input",
        type: "number",
        ref: function ref(comp) {
          _this2["input-".concat(key)] = comp;
        },
        id: "slider-input-".concat(key),
        key: key,
        value: this.state[key],
        onChange: function onChange(e) {
          _this2.setState((0, _defineProperty2["default"])({}, key, e.target.value));
        },
        onKeyPress: function onKeyPress(e) {
          if (e.key === 'Enter') {
            update(e);

            _this2["input-".concat(key)].blur();
          }
        },
        onBlur: update,
        flush: key === 'value0',
        secondary: this.props.inputTheme === 'secondary'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props6 = this.props,
          isRanged = _this$props6.isRanged,
          showInput = _this$props6.showInput,
          histogram = _this$props6.histogram,
          lineChart = _this$props6.lineChart,
          plotType = _this$props6.plotType,
          isEnlarged = _this$props6.isEnlarged,
          range = _this$props6.range,
          onChange = _this$props6.onChange,
          value0 = _this$props6.value0,
          value1 = _this$props6.value1,
          sliderHandleWidth = _this$props6.sliderHandleWidth,
          step = _this$props6.step;
      var height = isRanged && showInput ? '16px' : '24px';
      var width = this.state.width;
      var plotWidth = width - sliderHandleWidth;
      return _react["default"].createElement("div", {
        className: "kg-range-slider",
        style: {
          width: '100%',
          padding: "0 ".concat(sliderHandleWidth / 2, "px")
        },
        ref: function ref(comp) {
          _this3.sliderContainer = comp;
        }
      }, histogram && histogram.length ? _react["default"].createElement(_rangePlot["default"], {
        histogram: histogram,
        lineChart: lineChart,
        plotType: plotType,
        isEnlarged: isEnlarged,
        onBrush: function onBrush(val0, val1) {
          onChange([_this3._roundValToStep(val0), _this3._roundValToStep(val1)]);
        },
        range: range,
        value: [value0, value1],
        width: plotWidth
      }) : null, _react["default"].createElement(SliderWrapper, {
        style: {
          height: height
        },
        className: "kg-range-slider__slider"
      }, this.props.xAxis ? _react["default"].createElement(this.props.xAxis, {
        width: plotWidth,
        domain: range
      }) : null, _react["default"].createElement(_slider["default"], {
        showValues: false,
        isRanged: isRanged,
        minValue: range[0],
        maxValue: range[1],
        value0: value0,
        value1: value1,
        step: step,
        handleWidth: sliderHandleWidth,
        onSlider0Change: this._setRangeVal0,
        onSlider1Change: this._setRangeVal1,
        onSliderBarChange: function onSliderBarChange(val0, val1) {
          onChange([val0, val1]);
        },
        enableBarDrag: true
      }), !isRanged && showInput ? this._renderInput('value1') : null), isRanged && showInput ? _react["default"].createElement(RangeInputWrapper, {
        className: "range-slider__input-group"
      }, this._renderInput('value0'), this._renderInput('value1')) : null);
    }
  }]);
  return RangeSlider;
}(_react.Component);

exports["default"] = RangeSlider;
(0, _defineProperty2["default"])(RangeSlider, "propTypes", {
  range: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  value0: _propTypes["default"].number.isRequired,
  value1: _propTypes["default"].number.isRequired,
  onChange: _propTypes["default"].func.isRequired,
  histogram: _propTypes["default"].arrayOf(_propTypes["default"].any),
  isRanged: _propTypes["default"].bool,
  isEnlarged: _propTypes["default"].bool,
  showInput: _propTypes["default"].bool,
  inputTheme: _propTypes["default"].string,
  step: _propTypes["default"].number,
  sliderHandleWidth: _propTypes["default"].number,
  xAxis: _propTypes["default"].func
});
(0, _defineProperty2["default"])(RangeSlider, "defaultProps", {
  isEnlarged: false,
  isRanged: true,
  showInput: true,
  sliderHandleWidth: 12,
  onChange: function onChange() {}
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXIuanMiXSwibmFtZXMiOlsiU2xpZGVySW5wdXQiLCJJbnB1dCIsInByb3BzIiwidGhlbWUiLCJzbGlkZXJJbnB1dEhlaWdodCIsInNsaWRlcklucHV0V2lkdGgiLCJmbHVzaCIsIlNsaWRlcldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJSYW5nZUlucHV0V3JhcHBlciIsIlJhbmdlU2xpZGVyIiwidmFsdWUwIiwidmFsdWUxIiwid2lkdGgiLCJpc05hTiIsInNldFN0YXRlIiwidmFsIiwicmFuZ2UiLCJCb29sZWFuIiwic3RlcCIsIm9uQ2hhbmdlIiwiTnVtYmVyIiwiX2lzVmFsMUluUmFuZ2UiLCJfcm91bmRWYWxUb1N0ZXAiLCJfaXNWYWwwSW5SYW5nZSIsIl9zZXRWYWx1ZUZyb21Qcm9wcyIsIl9yZXNpemUiLCJuZXh0UHJvcHMiLCJzbGlkZXJDb250YWluZXIiLCJvZmZzZXRXaWR0aCIsInN0YXRlIiwia2V5Iiwic2V0UmFuZ2UiLCJfc2V0UmFuZ2VWYWwwIiwiX3NldFJhbmdlVmFsMSIsInVwZGF0ZSIsImUiLCJ0YXJnZXQiLCJ2YWx1ZSIsImNvbXAiLCJibHVyIiwiaW5wdXRUaGVtZSIsImlzUmFuZ2VkIiwic2hvd0lucHV0IiwiaGlzdG9ncmFtIiwibGluZUNoYXJ0IiwicGxvdFR5cGUiLCJpc0VubGFyZ2VkIiwic2xpZGVySGFuZGxlV2lkdGgiLCJoZWlnaHQiLCJwbG90V2lkdGgiLCJwYWRkaW5nIiwibGVuZ3RoIiwidmFsMCIsInZhbDEiLCJ4QXhpcyIsIl9yZW5kZXJJbnB1dCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwiZnVuYyIsImFueSIsImJvb2wiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7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dEIsS0FBS0EsWUFBTCxDQUFrQixRQUFsQixDQUZzQixDQUF4QixHQUdzQixJQS9DekIsQ0FERjtBQW1ERDs7O0VBdk1zQ0MsZ0I7OztpQ0FBcEIvQyxXLGVBQ0E7QUFDakJPLEVBQUFBLEtBQUssRUFBRXlDLHNCQUFVQyxPQUFWLENBQWtCRCxzQkFBVUUsTUFBNUIsRUFBb0NDLFVBRDFCO0FBRWpCbEQsRUFBQUEsTUFBTSxFQUFFK0Msc0JBQVVFLE1BQVYsQ0FBaUJDLFVBRlI7QUFHakJqRCxFQUFBQSxNQUFNLEVBQUU4QyxzQkFBVUUsTUFBVixDQUFpQkMsVUFIUjtBQUlqQnpDLEVBQUFBLFFBQVEsRUFBRXNDLHNCQUFVSSxJQUFWLENBQWVELFVBSlI7QUFLakJqQixFQUFBQSxTQUFTLEVBQUVjLHNCQUFVQyxPQUFWLENBQWtCRCxzQkFBVUssR0FBNUIsQ0FMTTtBQU1qQnJCLEVBQUFBLFFBQVEsRUFBRWdCLHNCQUFVTSxJQU5IO0FBT2pCakIsRUFBQUEsVUFBVSxFQUFFVyxzQkFBVU0sSUFQTDtBQVFqQnJCLEVBQUFBLFNBQVMsRUFBRWUsc0JBQVVNLElBUko7QUFTakJ2QixFQUFBQSxVQUFVLEVBQUVpQixzQkFBVU8sTUFUTDtBQVVqQjlDLEVBQUFBLElBQUksRUFBRXVDLHNCQUFVRSxNQVZDO0FBV2pCWixFQUFBQSxpQkFBaUIsRUFBRVUsc0JBQVVFLE1BWFo7QUFZakJMLEVBQUFBLEtBQUssRUFBRUcsc0JBQVVJO0FBWkEsQztpQ0FEQXBELFcsa0JBZ0JHO0FBQ3BCcUMsRUFBQUEsVUFBVSxFQUFFLEtBRFE7QUFFcEJMLEVBQUFBLFFBQVEsRUFBRSxJQUZVO0FBR3BCQyxFQUFBQSxTQUFTLEVBQUUsSUFIUztBQUlwQkssRUFBQUEsaUJBQWlCLEVBQUUsRUFKQztBQUtwQjVCLEVBQUFBLFFBQVEsRUFBRSxvQkFBTSxDQUFFO0FBTEUsQztBQXdMdkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IFJhbmdlUGxvdCBmcm9tICcuL3JhbmdlLXBsb3QnO1xuaW1wb3J0IFNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zbGlkZXIvc2xpZGVyJztcbmltcG9ydCB7SW5wdXR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtyb3VuZFZhbFRvU3RlcH0gZnJvbSAndXRpbHMvZGF0YS11dGlscyc7XG5cbmNvbnN0IFNsaWRlcklucHV0ID0gc3R5bGVkKElucHV0KWBcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlcklucHV0SGVpZ2h0fXB4O1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zbGlkZXJJbnB1dFdpZHRofXB4O1xuICBwYWRkaW5nOiA0cHggNnB4O1xuICBtYXJnaW4tbGVmdDogJHtwcm9wcyA9PiBwcm9wcy5mbHVzaCA/IDAgOiAyNH1weDtcbmA7XG5cbmNvbnN0IFNsaWRlcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBmbGV4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5gO1xuXG5jb25zdCBSYW5nZUlucHV0V3JhcHBlciA9c3R5bGVkLmRpdmBcbiAgbWFyZ2luLXRvcDogNnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5nZVNsaWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgdmFsdWUwOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgdmFsdWUxOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgaGlzdG9ncmFtOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBpc1JhbmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaXNFbmxhcmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd0lucHV0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpbnB1dFRoZW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgeEF4aXM6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpc0VubGFyZ2VkOiBmYWxzZSxcbiAgICBpc1JhbmdlZDogdHJ1ZSxcbiAgICBzaG93SW5wdXQ6IHRydWUsXG4gICAgc2xpZGVySGFuZGxlV2lkdGg6IDEyLFxuICAgIG9uQ2hhbmdlOiAoKSA9PiB7fVxuICB9O1xuXG4gIHN0YXRlID0ge3ZhbHVlMDogMCwgdmFsdWUxOiAxLCB3aWR0aDogMjg4fTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLl9zZXRWYWx1ZUZyb21Qcm9wcyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5fc2V0VmFsdWVGcm9tUHJvcHMobmV4dFByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLl9yZXNpemUoKTtcbiAgfVxuXG4gIF9zZXRWYWx1ZUZyb21Qcm9wcyA9IHByb3BzID0+IHtcbiAgICBjb25zdCB7dmFsdWUwLCB2YWx1ZTF9ID0gcHJvcHM7XG5cbiAgICBpZiAoIWlzTmFOKHZhbHVlMCkgJiYgIWlzTmFOKHZhbHVlMSkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlMCwgdmFsdWUxfSk7XG4gICAgfVxuICB9O1xuXG4gIF9pc1ZhbDBJblJhbmdlID0gdmFsID0+IHtcbiAgICBjb25zdCB7dmFsdWUxLCByYW5nZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIEJvb2xlYW4odmFsID49IHJhbmdlWzBdICYmIHZhbCA8PSB2YWx1ZTEpO1xuICB9O1xuXG4gIF9pc1ZhbDFJblJhbmdlID0gdmFsID0+IHtcbiAgICBjb25zdCB7cmFuZ2UsIHZhbHVlMH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIEJvb2xlYW4odmFsIDw9IHJhbmdlWzFdICYmIHZhbCA+PSB2YWx1ZTApO1xuICB9O1xuXG4gIF9yb3VuZFZhbFRvU3RlcCA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3JhbmdlLCBzdGVwfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gcm91bmRWYWxUb1N0ZXAocmFuZ2VbMF0sIHN0ZXAsIHZhbCk7XG4gIH07XG5cbiAgX3NldFJhbmdlVmFsMSA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMCwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICB2YWwgPSBOdW1iZXIodmFsKTtcblxuICAgIGlmICh0aGlzLl9pc1ZhbDFJblJhbmdlKHZhbCkpIHtcbiAgICAgIG9uQ2hhbmdlKFt2YWx1ZTAsIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbCldKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3NldFJhbmdlVmFsMCA9IHZhbCA9PiB7XG4gICAgY29uc3Qge3ZhbHVlMSwgb25DaGFuZ2V9ID0gdGhpcy5wcm9wcztcbiAgICB2YWwgPSBOdW1iZXIodmFsKTtcblxuICAgIGlmICh0aGlzLl9pc1ZhbDBJblJhbmdlKHZhbCkpIHtcbiAgICAgIG9uQ2hhbmdlKFt0aGlzLl9yb3VuZFZhbFRvU3RlcCh2YWwpLCB2YWx1ZTFdKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgX3Jlc2l6ZSgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuc2xpZGVyQ29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgIGlmICh3aWR0aCAhPT0gdGhpcy5zdGF0ZS53aWR0aCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7d2lkdGh9KTtcbiAgICB9XG4gIH1cblxuICBfcmVuZGVySW5wdXQoa2V5KSB7XG4gICAgY29uc3Qgc2V0UmFuZ2UgPSBrZXkgPT09ICd2YWx1ZTAnID8gdGhpcy5fc2V0UmFuZ2VWYWwwIDogdGhpcy5fc2V0UmFuZ2VWYWwxO1xuICAgIGNvbnN0IHVwZGF0ZSA9IGUgPT4ge1xuICAgICAgaWYgKCFzZXRSYW5nZShlLnRhcmdldC52YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7W2tleV06IHRoaXMuc3RhdGVba2V5XX0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNsaWRlcklucHV0XG4gICAgICAgIGNsYXNzTmFtZT1cImtnLXJhbmdlLXNsaWRlcl9faW5wdXRcIlxuICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgcmVmPXtjb21wID0+IHtcbiAgICAgICAgICB0aGlzW2BpbnB1dC0ke2tleX1gXSA9IGNvbXA7XG4gICAgICAgIH19XG4gICAgICAgIGlkPXtgc2xpZGVyLWlucHV0LSR7a2V5fWB9XG4gICAgICAgIGtleT17a2V5fVxuICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZVtrZXldfVxuICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7W2tleV06IGUudGFyZ2V0LnZhbHVlfSk7XG4gICAgICAgIH19XG4gICAgICAgIG9uS2V5UHJlc3M9e2UgPT4ge1xuICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdXBkYXRlKGUpO1xuICAgICAgICAgICAgdGhpc1tgaW5wdXQtJHtrZXl9YF0uYmx1cigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgb25CbHVyPXt1cGRhdGV9XG4gICAgICAgIGZsdXNoPXtrZXkgPT09ICd2YWx1ZTAnfVxuICAgICAgICBzZWNvbmRhcnk9e3RoaXMucHJvcHMuaW5wdXRUaGVtZSA9PT0gJ3NlY29uZGFyeSd9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNSYW5nZWQsXG4gICAgICBzaG93SW5wdXQsXG4gICAgICBoaXN0b2dyYW0sXG4gICAgICBsaW5lQ2hhcnQsXG4gICAgICBwbG90VHlwZSxcbiAgICAgIGlzRW5sYXJnZWQsXG4gICAgICByYW5nZSxcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgdmFsdWUwLFxuICAgICAgdmFsdWUxLFxuICAgICAgc2xpZGVySGFuZGxlV2lkdGgsXG4gICAgICBzdGVwXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBoZWlnaHQgPSBpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyAnMTZweCcgOiAnMjRweCc7XG4gICAgY29uc3Qge3dpZHRofSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgcGxvdFdpZHRoID0gIHdpZHRoIC0gc2xpZGVySGFuZGxlV2lkdGg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJrZy1yYW5nZS1zbGlkZXJcIiBzdHlsZT17e3dpZHRoOiAnMTAwJScsIHBhZGRpbmc6IGAwICR7c2xpZGVySGFuZGxlV2lkdGggLyAyfXB4YH19XG4gICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5zbGlkZXJDb250YWluZXIgPSBjb21wO1xuICAgICAgICB9fT5cbiAgICAgICAge2hpc3RvZ3JhbSAmJiBoaXN0b2dyYW0ubGVuZ3RoID8gKFxuICAgICAgICAgIDxSYW5nZVBsb3RcbiAgICAgICAgICAgIGhpc3RvZ3JhbT17aGlzdG9ncmFtfVxuICAgICAgICAgICAgbGluZUNoYXJ0PXtsaW5lQ2hhcnR9XG4gICAgICAgICAgICBwbG90VHlwZT17cGxvdFR5cGV9XG4gICAgICAgICAgICBpc0VubGFyZ2VkPXtpc0VubGFyZ2VkfVxuICAgICAgICAgICAgb25CcnVzaD17KHZhbDAsIHZhbDEpID0+IHtcbiAgICAgICAgICAgICAgb25DaGFuZ2UoW1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDApLFxuICAgICAgICAgICAgICAgIHRoaXMuX3JvdW5kVmFsVG9TdGVwKHZhbDEpXG4gICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHJhbmdlPXtyYW5nZX1cbiAgICAgICAgICAgIHZhbHVlPXtbdmFsdWUwLCB2YWx1ZTFdfVxuICAgICAgICAgICAgd2lkdGg9e3Bsb3RXaWR0aH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPFNsaWRlcldyYXBwZXJcbiAgICAgICAgICBzdHlsZT17e2hlaWdodH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwia2ctcmFuZ2Utc2xpZGVyX19zbGlkZXJcIj5cbiAgICAgICAgICB7dGhpcy5wcm9wcy54QXhpcyA/IDx0aGlzLnByb3BzLnhBeGlzIHdpZHRoPXtwbG90V2lkdGh9IGRvbWFpbj17cmFuZ2V9Lz4gOiBudWxsfVxuICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgIHNob3dWYWx1ZXM9e2ZhbHNlfVxuICAgICAgICAgICAgaXNSYW5nZWQ9e2lzUmFuZ2VkfVxuICAgICAgICAgICAgbWluVmFsdWU9e3JhbmdlWzBdfVxuICAgICAgICAgICAgbWF4VmFsdWU9e3JhbmdlWzFdfVxuICAgICAgICAgICAgdmFsdWUwPXt2YWx1ZTB9XG4gICAgICAgICAgICB2YWx1ZTE9e3ZhbHVlMX1cbiAgICAgICAgICAgIHN0ZXA9e3N0ZXB9XG4gICAgICAgICAgICBoYW5kbGVXaWR0aD17c2xpZGVySGFuZGxlV2lkdGh9XG4gICAgICAgICAgICBvblNsaWRlcjBDaGFuZ2U9e3RoaXMuX3NldFJhbmdlVmFsMH1cbiAgICAgICAgICAgIG9uU2xpZGVyMUNoYW5nZT17dGhpcy5fc2V0UmFuZ2VWYWwxfVxuICAgICAgICAgICAgb25TbGlkZXJCYXJDaGFuZ2U9eyh2YWwwLCB2YWwxKSA9PiB7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKFt2YWwwLCB2YWwxXSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgZW5hYmxlQmFyRHJhZ1xuICAgICAgICAgIC8+XG4gICAgICAgICAgeyFpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyB0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUxJykgOiBudWxsfVxuICAgICAgICA8L1NsaWRlcldyYXBwZXI+XG4gICAgICAgIHtpc1JhbmdlZCAmJiBzaG93SW5wdXQgPyA8UmFuZ2VJbnB1dFdyYXBwZXIgY2xhc3NOYW1lPVwicmFuZ2Utc2xpZGVyX19pbnB1dC1ncm91cFwiPlxuICAgICAgICAgIHt0aGlzLl9yZW5kZXJJbnB1dCgndmFsdWUwJyl9XG4gICAgICAgICAge3RoaXMuX3JlbmRlcklucHV0KCd2YWx1ZTEnKX1cbiAgICAgICAgPC9SYW5nZUlucHV0V3JhcHBlcj4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufTtcbiJdfQ==