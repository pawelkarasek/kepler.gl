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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _window = require("global/window");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reselect = require("reselect");

var _icons = require("./icons");

var _styledComponents2 = require("./styled-components");

var _filterUtils = require("../../utils/filter-utils");

var _rangeSlider = _interopRequireDefault(require("./range-slider"));

var _timeSliderMarker = _interopRequireDefault(require("./time-slider-marker"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  svg {\n    margin: 0 6px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  margin-right: 42px;\n\n  &.disabled {\n    opacity: 0.4;\n    pointer-events: none;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  height: 32px;\n  align-items: center;\n  font-size: 11px;\n  justify-content: ", ";\n  color: ", ";\n\n  .horizontal-bar {\n    padding: 0 12px;\n  }\n\n  .time-value {\n    display: flex;\n    flex-direction: ", ";\n    align-items: flex-start;\n  }\n\n  .time-value:last-child {\n    align-items: flex-end;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: ", ";\n  align-items: flex-end;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultTimeFormat = function defaultTimeFormat(val) {
  return _moment["default"].utc(val).format('MM/DD/YY hh:mma');
};

var animationControlWidth = 140;

var StyledSliderContainer = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.isEnlarged ? '12px' : '0px';
});

var TimeRangeSlider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(TimeRangeSlider, _Component);

  function TimeRangeSlider(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TimeRangeSlider);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(TimeRangeSlider).call(this, _props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "domainSelector", function (props) {
      return props.domain;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "titleFormatter", (0, _reselect.createSelector)(_this.domainSelector, function (domain) {
      return (0, _filterUtils.getTimeWidgetTitleFormatter)(domain);
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_sliderUpdate", function (args) {
      _this._sliderThrottle.cancel();

      _this._sliderThrottle(args);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_resetAnimation", function () {
      var _this$props = _this.props,
          domain = _this$props.domain,
          value = _this$props.value;
      var value0 = domain[0];
      var value1 = value0 + value[1] - value[0];

      _this.props.onChange([value0, value1]);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_startAnimation", function () {
      _this._pauseAnimation();

      _this.props.toggleAnimation();

      _this.setState({
        isAnimating: true
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_pauseAnimation", function () {
      if (_this._animation) {
        (0, _window.cancelAnimationFrame)(_this._animation);

        _this.props.toggleAnimation();

        _this._animation = null;
      }

      _this.setState({
        isAnimating: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_nextFrame", function () {
      _this._animation = null;
      var _this$props2 = _this.props,
          domain = _this$props2.domain,
          value = _this$props2.value;
      var speed = (domain[1] - domain[0]) / _filterUtils.BASE_SPEED * _this.props.speed; // loop when reaches the end

      var value0 = value[1] + speed > domain[1] ? domain[0] : value[0] + speed;
      var value1 = value0 + value[1] - value[0];

      _this.props.onChange([value0, value1]);
    });
    _this.state = {
      isAnimating: false,
      width: 288
    };
    _this._animation = null;
    _this._sliderThrottle = (0, _lodash["default"])(function () {
      var _this$props3;

      return (_this$props3 = _this.props).onChange.apply(_this$props3, arguments);
    }, 20);
    return _this;
  }

  (0, _createClass2["default"])(TimeRangeSlider, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this._animation && this.state.isAnimating) {
        this._animation = (0, _window.requestAnimationFrame)(this._nextFrame);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          domain = _this$props4.domain,
          value = _this$props4.value,
          isEnlarged = _this$props4.isEnlarged;
      var isAnimating = this.state.isAnimating;
      return _react["default"].createElement("div", {
        className: "time-range-slider"
      }, _react["default"].createElement(TimeTitle, {
        timeFormat: this.titleFormatter(this.props),
        value: value,
        isEnlarged: isEnlarged
      }), _react["default"].createElement(StyledSliderContainer, {
        className: "time-range-slider__container",
        isEnlarged: isEnlarged
      }, isEnlarged ? _react["default"].createElement(AnimationControls, {
        isAnimatable: this.props.isAnimatable,
        isEnlarged: isEnlarged,
        isAnimating: isAnimating,
        pauseAnimation: this._pauseAnimation,
        resetAnimation: this._resetAnimation,
        startAnimation: this._startAnimation
      }) : null, _react["default"].createElement("div", {
        style: {
          width: isEnlarged ? "calc(100% - ".concat(animationControlWidth, "px)") : '100%'
        }
      }, _react["default"].createElement(_rangeSlider["default"], {
        range: domain,
        value0: value[0],
        value1: value[1],
        histogram: this.props.histogram,
        lineChart: this.props.lineChart,
        plotType: this.props.plotType,
        isEnlarged: isEnlarged,
        showInput: false,
        step: this.props.step,
        onChange: this._sliderUpdate,
        xAxis: _timeSliderMarker["default"]
      }))));
    }
  }]);
  return TimeRangeSlider;
}(_react.Component);

exports["default"] = TimeRangeSlider;
(0, _defineProperty2["default"])(TimeRangeSlider, "propTypes", {
  onChange: _propTypes["default"].func.isRequired,
  domain: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  value: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  step: _propTypes["default"].number.isRequired,
  plotType: _propTypes["default"].string,
  histogram: _propTypes["default"].arrayOf(_propTypes["default"].any),
  lineChart: _propTypes["default"].object,
  toggleAnimation: _propTypes["default"].func.isRequired,
  isAnimatable: _propTypes["default"].bool,
  isEnlarged: _propTypes["default"].bool,
  speed: _propTypes["default"].number
});

var TimeValueWrapper = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.isEnlarged ? 'center' : 'space-between';
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.isEnlarged ? 'row' : 'column';
});

var TimeTitle = function TimeTitle(_ref) {
  var value = _ref.value,
      isEnlarged = _ref.isEnlarged,
      _ref$timeFormat = _ref.timeFormat,
      timeFormat = _ref$timeFormat === void 0 ? defaultTimeFormat : _ref$timeFormat;
  return _react["default"].createElement(TimeValueWrapper, {
    isEnlarged: isEnlarged
  }, _react["default"].createElement(TimeValue, {
    key: 0,
    value: _moment["default"].utc(value[0]).format(timeFormat),
    split: !isEnlarged
  }), isEnlarged ? _react["default"].createElement("div", {
    className: "horizontal-bar"
  }, _react["default"].createElement(_icons.Minus, {
    height: "12px"
  })) : null, _react["default"].createElement(TimeValue, {
    key: 1,
    value: _moment["default"].utc(value[1]).format(timeFormat),
    split: !isEnlarged
  }));
};

var TimeValue = function TimeValue(_ref2) {
  var value = _ref2.value,
      split = _ref2.split;
  return (// render two lines if not enlarged
    _react["default"].createElement("div", {
      className: "time-value"
    }, split ? value.split(' ').map(function (v, i) {
      return _react["default"].createElement("div", {
        key: i
      }, i === 0 ? _react["default"].createElement(_styledComponents2.SelectText, null, v) : _react["default"].createElement(_styledComponents2.SelectTextBold, null, v));
    }) : _react["default"].createElement(_styledComponents2.SelectTextBold, null, value))
  );
};

var StyledAnimationControls = _styledComponents["default"].div(_templateObject3());

var IconButton = (0, _styledComponents["default"])(_styledComponents2.Button)(_templateObject4());

var AnimationControls = function AnimationControls(_ref3) {
  var isAnimatable = _ref3.isAnimatable,
      isAnimating = _ref3.isAnimating,
      pauseAnimation = _ref3.pauseAnimation,
      resetAnimation = _ref3.resetAnimation,
      startAnimation = _ref3.startAnimation;
  return _react["default"].createElement(StyledAnimationControls, {
    className: (0, _classnames["default"])('time-range-slider__control', {
      disabled: !isAnimatable
    })
  }, _react["default"].createElement(_styledComponents2.ButtonGroup, null, _react["default"].createElement(IconButton, {
    className: "playback-control-button",
    onClick: resetAnimation,
    secondary: true
  }, _react["default"].createElement(_icons.Reset, {
    height: "12px"
  })), _react["default"].createElement(IconButton, {
    className: (0, _classnames["default"])('playback-control-button', {
      active: isAnimating
    }),
    onClick: isAnimating ? pauseAnimation : startAnimation,
    secondary: true
  }, isAnimating ? _react["default"].createElement(_icons.Pause, {
    height: "12px"
  }) : _react["default"].createElement(_icons.Play, {
    height: "12px"
  }))));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXJhbmdlLXNsaWRlci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0VGltZUZvcm1hdCIsInZhbCIsIm1vbWVudCIsInV0YyIsImZvcm1hdCIsImFuaW1hdGlvbkNvbnRyb2xXaWR0aCIsIlN0eWxlZFNsaWRlckNvbnRhaW5lciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwiaXNFbmxhcmdlZCIsIlRpbWVSYW5nZVNsaWRlciIsImRvbWFpbiIsImRvbWFpblNlbGVjdG9yIiwiYXJncyIsIl9zbGlkZXJUaHJvdHRsZSIsImNhbmNlbCIsInZhbHVlIiwidmFsdWUwIiwidmFsdWUxIiwib25DaGFuZ2UiLCJfcGF1c2VBbmltYXRpb24iLCJ0b2dnbGVBbmltYXRpb24iLCJzZXRTdGF0ZSIsImlzQW5pbWF0aW5nIiwiX2FuaW1hdGlvbiIsInNwZWVkIiwiQkFTRV9TUEVFRCIsInN0YXRlIiwid2lkdGgiLCJfbmV4dEZyYW1lIiwidGl0bGVGb3JtYXR0ZXIiLCJpc0FuaW1hdGFibGUiLCJfcmVzZXRBbmltYXRpb24iLCJfc3RhcnRBbmltYXRpb24iLCJoaXN0b2dyYW0iLCJsaW5lQ2hhcnQiLCJwbG90VHlwZSIsInN0ZXAiLCJfc2xpZGVyVXBkYXRlIiwiVGltZVNsaWRlck1hcmtlciIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsIm51bWJlciIsInN0cmluZyIsImFueSIsIm9iamVjdCIsImJvb2wiLCJUaW1lVmFsdWVXcmFwcGVyIiwidGhlbWUiLCJ0ZXh0Q29sb3JIbCIsIlRpbWVUaXRsZSIsInRpbWVGb3JtYXQiLCJUaW1lVmFsdWUiLCJzcGxpdCIsIm1hcCIsInYiLCJpIiwiU3R5bGVkQW5pbWF0aW9uQ29udHJvbHMiLCJJY29uQnV0dG9uIiwiQnV0dG9uIiwiQW5pbWF0aW9uQ29udHJvbHMiLCJwYXVzZUFuaW1hdGlvbiIsInJlc2V0QW5pbWF0aW9u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ZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudCc7XG5pbXBvcnQge3JlcXVlc3RBbmltYXRpb25GcmFtZSwgY2FuY2VsQW5pbWF0aW9uRnJhbWV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnbG9kYXNoLnRocm90dGxlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtQbGF5LCBSZXNldCwgUGF1c2UsIE1pbnVzfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQge1NlbGVjdFRleHRCb2xkLCBTZWxlY3RUZXh0LCBCdXR0b24sIEJ1dHRvbkdyb3VwfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2dldFRpbWVXaWRnZXRUaXRsZUZvcm1hdHRlciwgQkFTRV9TUEVFRH0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tICcuL3JhbmdlLXNsaWRlcic7XG5pbXBvcnQgVGltZVNsaWRlck1hcmtlciBmcm9tICcuL3RpbWUtc2xpZGVyLW1hcmtlcic7XG5cbmNvbnN0IGRlZmF1bHRUaW1lRm9ybWF0ID0gdmFsID0+IG1vbWVudC51dGModmFsKS5mb3JtYXQoJ01NL0REL1lZIGhoOm1tYScpO1xuY29uc3QgYW5pbWF0aW9uQ29udHJvbFdpZHRoID0gMTQwO1xuXG5jb25zdCBTdHlsZWRTbGlkZXJDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tdG9wOiAke3Byb3BzID0+IHByb3BzLmlzRW5sYXJnZWQgPyAnMTJweCcgOiAnMHB4J307XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZVJhbmdlU2xpZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBkb21haW46IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgc3RlcDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIHBsb3RUeXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksXG4gICAgbGluZUNoYXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHRvZ2dsZUFuaW1hdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICBpc0FuaW1hdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgIGlzRW5sYXJnZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIHNwZWVkOiBQcm9wVHlwZXMubnVtYmVyXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAyODhcbiAgICB9O1xuICAgIHRoaXMuX2FuaW1hdGlvbiA9IG51bGw7XG4gICAgdGhpcy5fc2xpZGVyVGhyb3R0bGUgPSB0aHJvdHRsZSgoLi4udmFsdWUpID0+IHRoaXMucHJvcHMub25DaGFuZ2UoLi4udmFsdWUpLCAyMCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKCF0aGlzLl9hbmltYXRpb24gJiYgdGhpcy5zdGF0ZS5pc0FuaW1hdGluZykge1xuICAgICAgdGhpcy5fYW5pbWF0aW9uID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX25leHRGcmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZG9tYWluU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5kb21haW47XG4gIHRpdGxlRm9ybWF0dGVyID0gY3JlYXRlU2VsZWN0b3IodGhpcy5kb21haW5TZWxlY3RvciwgZG9tYWluID0+XG4gICAgZ2V0VGltZVdpZGdldFRpdGxlRm9ybWF0dGVyKGRvbWFpbilcbiAgKTtcblxuICBfc2xpZGVyVXBkYXRlID0gYXJncyA9PiB7XG4gICAgdGhpcy5fc2xpZGVyVGhyb3R0bGUuY2FuY2VsKCk7XG4gICAgdGhpcy5fc2xpZGVyVGhyb3R0bGUoYXJncyk7XG4gIH07XG5cbiAgX3Jlc2V0QW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIGNvbnN0IHtkb21haW4sIHZhbHVlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmFsdWUwID0gZG9tYWluWzBdO1xuICAgIGNvbnN0IHZhbHVlMSA9IHZhbHVlMCArIHZhbHVlWzFdIC0gdmFsdWVbMF07XG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShbdmFsdWUwLCB2YWx1ZTFdKTtcbiAgfTtcblxuICBfc3RhcnRBbmltYXRpb24gPSAoKSA9PiB7XG4gICAgdGhpcy5fcGF1c2VBbmltYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLnRvZ2dsZUFuaW1hdGlvbigpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2lzQW5pbWF0aW5nOiB0cnVlfSk7XG4gIH07XG5cbiAgX3BhdXNlQW5pbWF0aW9uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLl9hbmltYXRpb24pIHtcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FuaW1hdGlvbik7XG4gICAgICB0aGlzLnByb3BzLnRvZ2dsZUFuaW1hdGlvbigpO1xuICAgICAgdGhpcy5fYW5pbWF0aW9uID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7aXNBbmltYXRpbmc6IGZhbHNlfSk7XG4gIH07XG5cbiAgX25leHRGcmFtZSA9ICgpID0+IHtcbiAgICB0aGlzLl9hbmltYXRpb24gPSBudWxsO1xuXG4gICAgY29uc3Qge2RvbWFpbiwgdmFsdWV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzcGVlZCA9ICgoZG9tYWluWzFdIC0gZG9tYWluWzBdKSAvIEJBU0VfU1BFRUQpICogdGhpcy5wcm9wcy5zcGVlZDtcblxuICAgIC8vIGxvb3Agd2hlbiByZWFjaGVzIHRoZSBlbmRcbiAgICBjb25zdCB2YWx1ZTAgPSB2YWx1ZVsxXSArIHNwZWVkID4gZG9tYWluWzFdID8gZG9tYWluWzBdIDogdmFsdWVbMF0gKyBzcGVlZDtcbiAgICBjb25zdCB2YWx1ZTEgPSB2YWx1ZTAgKyB2YWx1ZVsxXSAtIHZhbHVlWzBdO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UoW3ZhbHVlMCwgdmFsdWUxXSk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtkb21haW4sIHZhbHVlLCBpc0VubGFyZ2VkfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge2lzQW5pbWF0aW5nfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lLXJhbmdlLXNsaWRlclwiPlxuICAgICAgICA8VGltZVRpdGxlXG4gICAgICAgICAgdGltZUZvcm1hdD17dGhpcy50aXRsZUZvcm1hdHRlcih0aGlzLnByb3BzKX1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgLz5cbiAgICAgICAgPFN0eWxlZFNsaWRlckNvbnRhaW5lclxuICAgICAgICAgIGNsYXNzTmFtZT1cInRpbWUtcmFuZ2Utc2xpZGVyX19jb250YWluZXJcIlxuICAgICAgICAgIGlzRW5sYXJnZWQ9e2lzRW5sYXJnZWR9PlxuICAgICAgICAgIHtpc0VubGFyZ2VkID8gPEFuaW1hdGlvbkNvbnRyb2xzXG4gICAgICAgICAgICBpc0FuaW1hdGFibGU9e3RoaXMucHJvcHMuaXNBbmltYXRhYmxlfVxuICAgICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgICAgIGlzQW5pbWF0aW5nPXtpc0FuaW1hdGluZ31cbiAgICAgICAgICAgIHBhdXNlQW5pbWF0aW9uPXt0aGlzLl9wYXVzZUFuaW1hdGlvbn1cbiAgICAgICAgICAgIHJlc2V0QW5pbWF0aW9uPXt0aGlzLl9yZXNldEFuaW1hdGlvbn1cbiAgICAgICAgICAgIHN0YXJ0QW5pbWF0aW9uPXt0aGlzLl9zdGFydEFuaW1hdGlvbn1cbiAgICAgICAgICAvPiA6IG51bGx9XG4gICAgICAgICAgPGRpdiBzdHlsZT17e3dpZHRoOiBpc0VubGFyZ2VkID8gYGNhbGMoMTAwJSAtICR7YW5pbWF0aW9uQ29udHJvbFdpZHRofXB4KWAgOiAnMTAwJSd9fT5cbiAgICAgICAgICAgIDxSYW5nZVNsaWRlclxuICAgICAgICAgICAgICByYW5nZT17ZG9tYWlufVxuICAgICAgICAgICAgICB2YWx1ZTA9e3ZhbHVlWzBdfVxuICAgICAgICAgICAgICB2YWx1ZTE9e3ZhbHVlWzFdfVxuICAgICAgICAgICAgICBoaXN0b2dyYW09e3RoaXMucHJvcHMuaGlzdG9ncmFtfVxuICAgICAgICAgICAgICBsaW5lQ2hhcnQ9e3RoaXMucHJvcHMubGluZUNoYXJ0fVxuICAgICAgICAgICAgICBwbG90VHlwZT17dGhpcy5wcm9wcy5wbG90VHlwZX1cbiAgICAgICAgICAgICAgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH1cbiAgICAgICAgICAgICAgc2hvd0lucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc3RlcD17dGhpcy5wcm9wcy5zdGVwfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5fc2xpZGVyVXBkYXRlfVxuICAgICAgICAgICAgICB4QXhpcz17VGltZVNsaWRlck1hcmtlcn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvU3R5bGVkU2xpZGVyQ29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBUaW1lVmFsdWVXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAzMnB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXNpemU6IDExcHg7XG4gIGp1c3RpZnktY29udGVudDogJHtwcm9wcyA9PiBwcm9wcy5pc0VubGFyZ2VkID8gJ2NlbnRlcicgOiAnc3BhY2UtYmV0d2Vlbid9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG5cbiAgLmhvcml6b250YWwtYmFyIHtcbiAgICBwYWRkaW5nOiAwIDEycHg7XG4gIH1cblxuICAudGltZS12YWx1ZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogJHtwcm9wcyA9PiBwcm9wcy5pc0VubGFyZ2VkID8gJ3JvdycgOiAnY29sdW1uJ307XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIH1cblxuICAudGltZS12YWx1ZTpsYXN0LWNoaWxkIHtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIH1cbmA7XG5cbmNvbnN0IFRpbWVUaXRsZSA9ICh7dmFsdWUsIGlzRW5sYXJnZWQsIHRpbWVGb3JtYXQgPSBkZWZhdWx0VGltZUZvcm1hdH0pID0+IChcbiAgPFRpbWVWYWx1ZVdyYXBwZXIgaXNFbmxhcmdlZD17aXNFbmxhcmdlZH0+XG4gICAgPFRpbWVWYWx1ZSBrZXk9ezB9IHZhbHVlPXttb21lbnQudXRjKHZhbHVlWzBdKS5mb3JtYXQodGltZUZvcm1hdCl9IHNwbGl0PXshaXNFbmxhcmdlZH0vPlxuICAgIHtpc0VubGFyZ2VkID8gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJob3Jpem9udGFsLWJhclwiPlxuICAgICAgICA8TWludXMgaGVpZ2h0PVwiMTJweFwiLz5cbiAgICAgIDwvZGl2PlxuICAgICkgOiBudWxsfVxuICAgIDxUaW1lVmFsdWUga2V5PXsxfSB2YWx1ZT17bW9tZW50LnV0Yyh2YWx1ZVsxXSkuZm9ybWF0KHRpbWVGb3JtYXQpfSBzcGxpdD17IWlzRW5sYXJnZWR9Lz5cbiAgPC9UaW1lVmFsdWVXcmFwcGVyPlxuKTtcblxuY29uc3QgVGltZVZhbHVlID0gKHt2YWx1ZSwgc3BsaXR9KSA9PiAoXG4gIC8vIHJlbmRlciB0d28gbGluZXMgaWYgbm90IGVubGFyZ2VkXG4gIDxkaXYgY2xhc3NOYW1lPVwidGltZS12YWx1ZVwiPlxuICAgIHtzcGxpdCA/IHZhbHVlLnNwbGl0KCcgJykubWFwKCh2LCBpKSA9PiAoXG4gICAgICA8ZGl2IGtleT17aX0+XG4gICAgICAgIHtpID09PSAwID8gPFNlbGVjdFRleHQ+e3Z9PC9TZWxlY3RUZXh0PiA6XG4gICAgICAgIDxTZWxlY3RUZXh0Qm9sZD57dn08L1NlbGVjdFRleHRCb2xkPn1cbiAgICAgIDwvZGl2PlxuICAgICkpIDogPFNlbGVjdFRleHRCb2xkPnt2YWx1ZX08L1NlbGVjdFRleHRCb2xkPn1cbiAgPC9kaXY+XG4pO1xuXG5jb25zdCBTdHlsZWRBbmltYXRpb25Db250cm9scyA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIG1hcmdpbi1yaWdodDogNDJweDtcblxuICAmLmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIH1cbmA7XG5cbmNvbnN0IEljb25CdXR0b24gPSBzdHlsZWQoQnV0dG9uKWBcbiAgc3ZnIHtcbiAgICBtYXJnaW46IDAgNnB4O1xuICB9XG5gO1xuXG5jb25zdCBBbmltYXRpb25Db250cm9scyA9ICh7XG4gIGlzQW5pbWF0YWJsZSxcbiAgaXNBbmltYXRpbmcsXG4gIHBhdXNlQW5pbWF0aW9uLFxuICByZXNldEFuaW1hdGlvbixcbiAgc3RhcnRBbmltYXRpb25cbn0pID0+IChcbiAgPFN0eWxlZEFuaW1hdGlvbkNvbnRyb2xzXG4gICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCd0aW1lLXJhbmdlLXNsaWRlcl9fY29udHJvbCcsIHtkaXNhYmxlZDogIWlzQW5pbWF0YWJsZX0pfVxuICA+XG4gICAgPEJ1dHRvbkdyb3VwPlxuICAgICAgPEljb25CdXR0b24gY2xhc3NOYW1lPVwicGxheWJhY2stY29udHJvbC1idXR0b25cIlxuICAgICAgICBvbkNsaWNrPXtyZXNldEFuaW1hdGlvbn0gc2Vjb25kYXJ5PlxuICAgICAgICA8UmVzZXQgaGVpZ2h0PVwiMTJweFwiLz5cbiAgICAgIDwvSWNvbkJ1dHRvbj5cbiAgICAgIDxJY29uQnV0dG9uIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygncGxheWJhY2stY29udHJvbC1idXR0b24nLCB7YWN0aXZlOiBpc0FuaW1hdGluZ30pfVxuICAgICAgICBvbkNsaWNrPXtpc0FuaW1hdGluZyA/IHBhdXNlQW5pbWF0aW9uIDogc3RhcnRBbmltYXRpb259IHNlY29uZGFyeT5cbiAgICAgICAge2lzQW5pbWF0aW5nID8gPFBhdXNlIGhlaWdodD1cIjEycHhcIi8+IDogPFBsYXkgaGVpZ2h0PVwiMTJweFwiLz59XG4gICAgICA8L0ljb25CdXR0b24+XG4gICAgPC9CdXR0b25Hcm91cD5cbiAgPC9TdHlsZWRBbmltYXRpb25Db250cm9scz5cbik7XG4iXX0=