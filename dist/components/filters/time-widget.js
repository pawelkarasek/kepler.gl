"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TimeWidget = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reselect = require("reselect");

var _fieldSelector = _interopRequireDefault(require("../common/field-selector"));

var _styledComponents2 = require("../common/styled-components");

var _timeRangeFilter = _interopRequireDefault(require("./time-range-filter"));

var _icons = require("../common/icons");

var _animationSpeedToggle = _interopRequireDefault(require("./animation-speed-toggle"));

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  flex-grow: 0;\n  color: ", ";\n  margin-right: 10px;\n\n  .bottom-widget__icon {\n    margin-right: 6px;\n  }\n  .bottom-widget__icon.speed {\n    margin-right: 0;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-bottom: 1px solid\n    ", ";\n  color: ", ";\n  display: inline-block;\n  font-size: 12px;\n  height: 24px;\n  margin-right: 4px;\n  text-align: center;\n  width: 24px;\n  line-height: 24px;\n\n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding-right: 76px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  padding-right: ", "px;\n  color: ", ";\n\n  .bottom-widget__y-axis {\n    flex-grow: 1;\n    margin-left: 20px;\n  }\n\n  .bottom-widget__field-select {\n    width: 160px;\n    display: inline-block;\n\n    .item-selector__dropdown {\n      background: transparent;\n      padding: 4px 10px 4px 4px;\n      border-color: transparent;\n\n      :active,\n      :focus,\n      &.focus,\n      &.active {\n        background: transparent;\n        border-color: transparent;\n      }\n    }\n\n    .item-selector__dropdown:hover {\n      background: transparent;\n      border-color: transparent;\n\n      .item-selector__dropdown__value {\n        color: ", ";\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  padding-top: ", "px;\n  padding-right: ", "px;\n  padding-bottom: ", "px;\n  padding-left: ", "px;\n  bottom: 0;\n  right: 0;\n  z-index: 1;\n  width: ", "px;\n\n  .bottom-widget--inner {\n    background-color: ", ";\n    padding: 6px ", "px 10px ", "px;\n    position: relative;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var innerPdSide = 32;

var WidgetContainer = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.sidePanel.margin.top;
}, function (props) {
  return props.theme.sidePanel.margin.right;
}, function (props) {
  return props.theme.sidePanel.margin.bottom;
}, function (props) {
  return props.theme.sidePanel.margin.left;
}, function (props) {
  return props.width;
}, function (props) {
  return props.theme.sidePanelBg;
}, innerPdSide, innerPdSide);

var TopSectionWrapper = _styledComponents["default"].div(_templateObject2(), innerPdSide * 2, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.hoverColor ? props.theme[props.hoverColor] : props.theme.textColorHl;
});
/* eslint-disable no-unused-vars */


var Tabs = _styledComponents["default"].div(_templateObject3());

var Tab = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.active ? props.theme.textColorHl : 'transparent';
}, function (props) {
  return props.active ? props.theme.textColorHl : props.theme.labelColor;
});
/* eslint-enable no-unused-vars */


var StyledTitle = (0, _styledComponents["default"])(_styledComponents2.CenterFlexbox)(_templateObject5(), function (props) {
  return props.theme.textColor;
});

var TimeWidget =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(TimeWidget, _Component);

  function TimeWidget() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, TimeWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(TimeWidget)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      showSpeedControl: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleSpeedControl", function () {
      _this.setState({
        showSpeedControl: !_this.state.showSpeedControl
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldSelector", function (props) {
      return props.fields;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "yAxisFieldsSelector", (0, _reselect.createSelector)(_this.fieldSelector, function (fields) {
      return fields.filter(function (f) {
        return f.type === 'integer' || f.type === 'real';
      });
    }));
    return _this;
  }

  (0, _createClass2["default"])(TimeWidget, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          enlargedIdx = _this$props.enlargedIdx,
          enlargeFilter = _this$props.enlargeFilter,
          filter = _this$props.filter,
          isAnyFilterAnimating = _this$props.isAnyFilterAnimating,
          _setFilter = _this$props.setFilter,
          setFilterPlot = _this$props.setFilterPlot,
          _toggleAnimation = _this$props.toggleAnimation,
          _updateAnimationSpeed = _this$props.updateAnimationSpeed,
          width = _this$props.width;
      var showSpeedControl = this.state.showSpeedControl;
      return _react["default"].createElement(WidgetContainer, {
        width: width
      }, _react["default"].createElement("div", {
        className: "bottom-widget--inner"
      }, _react["default"].createElement(TopSectionWrapper, null, _react["default"].createElement(StyledTitle, {
        className: "bottom-widget__field"
      }, _react["default"].createElement(_styledComponents2.CenterFlexbox, {
        className: "bottom-widget__icon"
      }, _react["default"].createElement(_icons.Clock, {
        height: "15px"
      })), _react["default"].createElement(_styledComponents2.SelectTextBold, null, filter.name)), _react["default"].createElement(StyledTitle, {
        className: "bottom-widget__y-axis"
      }, _react["default"].createElement(_styledComponents2.CenterFlexbox, {
        className: "bottom-widget__icon"
      }, _react["default"].createElement(_icons.LineChart, {
        height: "15px"
      })), _react["default"].createElement("div", {
        className: "bottom-widget__field-select"
      }, _react["default"].createElement(_fieldSelector["default"], {
        fields: this.yAxisFieldsSelector(this.props),
        placement: "top",
        id: "selected-time-widget-field",
        value: filter.yAxis ? filter.yAxis.name : null,
        onSelect: function onSelect(value) {
          return setFilterPlot(enlargedIdx, {
            yAxis: value
          });
        },
        inputTheme: "secondary",
        placeholder: "Y Axis",
        erasable: true,
        showToken: false
      }))), _react["default"].createElement(StyledTitle, {
        className: "bottom-widget__speed"
      }, _react["default"].createElement(_styledComponents2.Button, {
        link: true,
        width: "80px",
        onClick: this._toggleSpeedControl
      }, _react["default"].createElement(_styledComponents2.CenterFlexbox, {
        className: "bottom-widget__icon speed"
      }, _react["default"].createElement(_icons.Rocket, {
        height: "15px"
      })), _react["default"].createElement("div", {
        style: {
          visibility: !showSpeedControl ? 'visible' : 'hidden',
          display: 'inline-block',
          width: '27px'
        }
      }, filter.speed, "x")), showSpeedControl ? _react["default"].createElement(_animationSpeedToggle["default"], {
        onHide: this._toggleSpeedControl,
        updateAnimationSpeed: function updateAnimationSpeed(speed) {
          return _updateAnimationSpeed(enlargedIdx, speed);
        },
        speed: filter.speed
      }) : null), _react["default"].createElement(_styledComponents2.CenterFlexbox, null, _react["default"].createElement(_styledComponents2.IconRoundSmall, null, _react["default"].createElement(_icons.Close, {
        height: "12px",
        onClick: function onClick() {
          return enlargeFilter(enlargedIdx);
        }
      })))), _react["default"].createElement(_timeRangeFilter["default"], {
        filter: filter,
        setFilter: function setFilter(value) {
          return _setFilter(enlargedIdx, 'value', value);
        },
        isAnyFilterAnimating: isAnyFilterAnimating,
        updateAnimationSpeed: function updateAnimationSpeed(speed) {
          return _updateAnimationSpeed(enlargedIdx, speed);
        },
        toggleAnimation: function toggleAnimation() {
          return _toggleAnimation(enlargedIdx);
        }
      })));
    }
  }]);
  return TimeWidget;
}(_react.Component);

exports.TimeWidget = TimeWidget;

var TimeWidgetFactory = function TimeWidgetFactory() {
  return TimeWidget;
};

var _default = TimeWidgetFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvdGltZS13aWRnZXQuanMiXSwibmFtZXMiOlsiaW5uZXJQZFNpZGUiLCJXaWRnZXRDb250YWluZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwic2lkZVBhbmVsIiwibWFyZ2luIiwidG9wIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0Iiwid2lkdGgiLCJzaWRlUGFuZWxCZyIsIlRvcFNlY3Rpb25XcmFwcGVyIiwibGFiZWxDb2xvciIsImhvdmVyQ29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlRhYnMiLCJUYWIiLCJhY3RpdmUiLCJTdHlsZWRUaXRsZSIsIkNlbnRlckZsZXhib3giLCJ0ZXh0Q29sb3IiLCJUaW1lV2lkZ2V0Iiwic2hvd1NwZWVkQ29udHJvbCIsInNldFN0YXRlIiwic3RhdGUiLCJmaWVsZHMiLCJmaWVsZFNlbGVjdG9yIiwiZmlsdGVyIiwiZiIsInR5cGUiLCJlbmxhcmdlZElkeCIsImVubGFyZ2VGaWx0ZXIiLCJpc0FueUZpbHRlckFuaW1hdGluZyIsInNldEZpbHRlciIsInNldEZpbHRlclBsb3QiLCJ0b2dnbGVBbmltYXRpb24iLCJ1cGRhdGVBbmltYXRpb25TcGVlZCIsIm5hbWUiLCJ5QXhpc0ZpZWxkc1NlbGVjdG9yIiwieUF4aXMiLCJ2YWx1ZSIsIl90b2dnbGVTcGVlZENvbnRyb2wiLCJ2aXNpYmlsaXR5IiwiZGlzcGxheSIsInNwZWVkIiwiQ29tcG9uZW50IiwiVGltZVdpZGdldEZhY3RvcnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVcsR0FBRyxFQUFwQjs7QUFFQSxJQUFNQyxlQUFlLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUVKLFVB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QURGLENBekNGLENBREYsRUFnREUsZ0NBQUMsMkJBQUQ7QUFDRSxRQUFBLE1BQU0sRUFBRUgsTUFEVjtBQUVFLFFBQUEsU0FBUyxFQUFFLG1CQUFBYSxLQUFLO0FBQUEsaUJBQUlQLFVBQVMsQ0FBQ0gsV0FBRCxFQUFjLE9BQWQsRUFBdUJVLEtBQXZCLENBQWI7QUFBQSxTQUZsQjtBQUdFLFFBQUEsb0JBQW9CLEVBQUVSLG9CQUh4QjtBQUlFLFFBQUEsb0JBQW9CLEVBQUUsOEJBQUNZLEtBQUQ7QUFBQSxpQkFBV1IscUJBQW9CLENBQUNOLFdBQUQsRUFBY2MsS0FBZCxDQUEvQjtBQUFBLFNBSnhCO0FBS0UsUUFBQSxlQUFlLEVBQUU7QUFBQSxpQkFBTVQsZ0JBQWUsQ0FBQ0wsV0FBRCxDQUFyQjtBQUFBO0FBTG5CLFFBaERGLENBREYsQ0FERjtBQTRERDs7O0VBeEY2QmUsZ0I7Ozs7QUEyRmhDLElBQU1DLGlCQUFpQixHQUFHLFNBQXBCQSxpQkFBb0I7QUFBQSxTQUFNekIsVUFBTjtBQUFBLENBQTFCOztlQUNleUIsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuXG5pbXBvcnQgRmllbGRTZWxlY3RvciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9maWVsZC1zZWxlY3Rvcic7XG5pbXBvcnQge0J1dHRvbiwgU2VsZWN0VGV4dEJvbGQsIEljb25Sb3VuZFNtYWxsLCBDZW50ZXJGbGV4Ym94fSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgVGltZVJhbmdlRmlsdGVyIGZyb20gJ2NvbXBvbmVudHMvZmlsdGVycy90aW1lLXJhbmdlLWZpbHRlcic7XG5pbXBvcnQge0Nsb3NlLCBDbG9jaywgTGluZUNoYXJ0LCBSb2NrZXR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBBbmltYXRpb25TcGVlZFRvZ2dsZSBmcm9tICcuL2FuaW1hdGlvbi1zcGVlZC10b2dnbGUnO1xuXG5jb25zdCBpbm5lclBkU2lkZSA9IDMyO1xuXG5jb25zdCBXaWRnZXRDb250YWluZXIgPSBzdHlsZWQuZGl2YFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHBhZGRpbmctdG9wOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4udG9wfXB4O1xuICBwYWRkaW5nLXJpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4ucmlnaHR9cHg7XG4gIHBhZGRpbmctYm90dG9tOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNpZGVQYW5lbC5tYXJnaW4uYm90dG9tfXB4O1xuICBwYWRkaW5nLWxlZnQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsLm1hcmdpbi5sZWZ0fXB4O1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAxO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy53aWR0aH1weDtcblxuICAuYm90dG9tLXdpZGdldC0taW5uZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsQmd9O1xuICAgIHBhZGRpbmc6IDZweCAke2lubmVyUGRTaWRlfXB4IDEwcHggJHtpbm5lclBkU2lkZX1weDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cbmA7XG5cbmNvbnN0IFRvcFNlY3Rpb25XcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nLXJpZ2h0OiAke2lubmVyUGRTaWRlICogMn1weDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG5cbiAgLmJvdHRvbS13aWRnZXRfX3ktYXhpcyB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICB9XG5cbiAgLmJvdHRvbS13aWRnZXRfX2ZpZWxkLXNlbGVjdCB7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgIC5pdGVtLXNlbGVjdG9yX19kcm9wZG93biB7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIHBhZGRpbmc6IDRweCAxMHB4IDRweCA0cHg7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuXG4gICAgICA6YWN0aXZlLFxuICAgICAgOmZvY3VzLFxuICAgICAgJi5mb2N1cyxcbiAgICAgICYuYWN0aXZlIHtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLml0ZW0tc2VsZWN0b3JfX2Ryb3Bkb3duOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcblxuICAgICAgLml0ZW0tc2VsZWN0b3JfX2Ryb3Bkb3duX192YWx1ZSB7XG4gICAgICAgIGNvbG9yOiAke3Byb3BzID0+XG4gICAgICAgIHByb3BzLmhvdmVyQ29sb3JcbiAgICAgICAgICA/IHByb3BzLnRoZW1lW3Byb3BzLmhvdmVyQ29sb3JdXG4gICAgICAgICAgOiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgVGFicyA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmctcmlnaHQ6IDc2cHg7XG5gO1xuXG5jb25zdCBUYWIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXItYm90dG9tOiAxcHggc29saWRcbiAgICAke3Byb3BzID0+IChwcm9wcy5hY3RpdmUgPyBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbCA6ICd0cmFuc3BhcmVudCcpfTtcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUudGV4dENvbG9ySGwgOiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDEycHg7XG4gIGhlaWdodDogMjRweDtcbiAgbWFyZ2luLXJpZ2h0OiA0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG5jb25zdCBTdHlsZWRUaXRsZSA9IHN0eWxlZChDZW50ZXJGbGV4Ym94KWBcbiAgZmxleC1ncm93OiAwO1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG5cbiAgLmJvdHRvbS13aWRnZXRfX2ljb24ge1xuICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICB9XG4gIC5ib3R0b20td2lkZ2V0X19pY29uLnNwZWVkIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG4gIH1cbmA7XG5cbmV4cG9ydCBjbGFzcyBUaW1lV2lkZ2V0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgc2hvd1NwZWVkQ29udHJvbDogZmFsc2VcbiAgfTtcblxuICBfdG9nZ2xlU3BlZWRDb250cm9sID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dTcGVlZENvbnRyb2w6ICF0aGlzLnN0YXRlLnNob3dTcGVlZENvbnRyb2x9KVxuICB9O1xuXG4gIGZpZWxkU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWVsZHM7XG4gIHlBeGlzRmllbGRzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmZpZWxkU2VsZWN0b3IsIGZpZWxkcyA9PlxuICAgIGZpZWxkcy5maWx0ZXIoZiA9PiBmLnR5cGUgPT09ICdpbnRlZ2VyJyB8fCBmLnR5cGUgPT09ICdyZWFsJylcbiAgKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgZW5sYXJnZWRJZHgsXG4gICAgICBlbmxhcmdlRmlsdGVyLFxuICAgICAgZmlsdGVyLFxuICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmcsXG4gICAgICBzZXRGaWx0ZXIsXG4gICAgICBzZXRGaWx0ZXJQbG90LFxuICAgICAgdG9nZ2xlQW5pbWF0aW9uLFxuICAgICAgdXBkYXRlQW5pbWF0aW9uU3BlZWQsXG4gICAgICB3aWR0aFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3Qge3Nob3dTcGVlZENvbnRyb2x9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gKFxuICAgICAgPFdpZGdldENvbnRhaW5lciB3aWR0aD17d2lkdGh9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXQtLWlubmVyXCI+XG4gICAgICAgICAgPFRvcFNlY3Rpb25XcmFwcGVyPlxuICAgICAgICAgICAgPFN0eWxlZFRpdGxlIGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ZpZWxkXCI+XG4gICAgICAgICAgICAgIDxDZW50ZXJGbGV4Ym94IGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX2ljb25cIj5cbiAgICAgICAgICAgICAgICA8Q2xvY2sgaGVpZ2h0PVwiMTVweFwiLz5cbiAgICAgICAgICAgICAgPC9DZW50ZXJGbGV4Ym94PlxuICAgICAgICAgICAgICA8U2VsZWN0VGV4dEJvbGQ+e2ZpbHRlci5uYW1lfTwvU2VsZWN0VGV4dEJvbGQ+XG4gICAgICAgICAgICA8L1N0eWxlZFRpdGxlPlxuICAgICAgICAgICAgPFN0eWxlZFRpdGxlIGNsYXNzTmFtZT1cImJvdHRvbS13aWRnZXRfX3ktYXhpc1wiPlxuICAgICAgICAgICAgICA8Q2VudGVyRmxleGJveCBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X19pY29uXCI+XG4gICAgICAgICAgICAgICAgPExpbmVDaGFydCBoZWlnaHQ9XCIxNXB4XCIvPlxuICAgICAgICAgICAgICA8L0NlbnRlckZsZXhib3g+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm90dG9tLXdpZGdldF9fZmllbGQtc2VsZWN0XCI+XG4gICAgICAgICAgICAgICAgPEZpZWxkU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgIGZpZWxkcz17dGhpcy55QXhpc0ZpZWxkc1NlbGVjdG9yKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgICAgICAgICAgICAgIGlkPVwic2VsZWN0ZWQtdGltZS13aWRnZXQtZmllbGRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2ZpbHRlci55QXhpcyA/IGZpbHRlci55QXhpcy5uYW1lIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiBzZXRGaWx0ZXJQbG90KGVubGFyZ2VkSWR4LCB7eUF4aXM6IHZhbHVlfSl9XG4gICAgICAgICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiWSBBeGlzXCJcbiAgICAgICAgICAgICAgICAgIGVyYXNhYmxlXG4gICAgICAgICAgICAgICAgICBzaG93VG9rZW49e2ZhbHNlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9TdHlsZWRUaXRsZT5cbiAgICAgICAgICAgIDxTdHlsZWRUaXRsZSBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X19zcGVlZFwiPlxuICAgICAgICAgICAgICA8QnV0dG9uIGxpbmsgd2lkdGg9XCI4MHB4XCIgb25DbGljaz17dGhpcy5fdG9nZ2xlU3BlZWRDb250cm9sfT5cbiAgICAgICAgICAgICAgICA8Q2VudGVyRmxleGJveCBjbGFzc05hbWU9XCJib3R0b20td2lkZ2V0X19pY29uIHNwZWVkXCI+XG4gICAgICAgICAgICAgICAgICA8Um9ja2V0IGhlaWdodD1cIjE1cHhcIi8+XG4gICAgICAgICAgICAgICAgPC9DZW50ZXJGbGV4Ym94PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHk6ICFzaG93U3BlZWRDb250cm9sID8gJ3Zpc2libGUnIDogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAnMjdweCdcbiAgICAgICAgICAgICAgICB9fT57ZmlsdGVyLnNwZWVkfXg8L2Rpdj5cbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIHtzaG93U3BlZWRDb250cm9sID8gPEFuaW1hdGlvblNwZWVkVG9nZ2xlXG4gICAgICAgICAgICAgICAgb25IaWRlPXt0aGlzLl90b2dnbGVTcGVlZENvbnRyb2x9XG4gICAgICAgICAgICAgICAgdXBkYXRlQW5pbWF0aW9uU3BlZWQ9eyhzcGVlZCkgPT4gdXBkYXRlQW5pbWF0aW9uU3BlZWQoZW5sYXJnZWRJZHgsIHNwZWVkKX1cbiAgICAgICAgICAgICAgICBzcGVlZD17ZmlsdGVyLnNwZWVkfS8+IDogbnVsbH1cbiAgICAgICAgICAgIDwvU3R5bGVkVGl0bGU+XG4gICAgICAgICAgICA8Q2VudGVyRmxleGJveD5cbiAgICAgICAgICAgICAgPEljb25Sb3VuZFNtYWxsPlxuICAgICAgICAgICAgICAgIDxDbG9zZSBoZWlnaHQ9XCIxMnB4XCIgb25DbGljaz17KCkgPT4gZW5sYXJnZUZpbHRlcihlbmxhcmdlZElkeCl9IC8+XG4gICAgICAgICAgICAgIDwvSWNvblJvdW5kU21hbGw+XG4gICAgICAgICAgICA8L0NlbnRlckZsZXhib3g+XG4gICAgICAgICAgPC9Ub3BTZWN0aW9uV3JhcHBlcj5cbiAgICAgICAgICA8VGltZVJhbmdlRmlsdGVyXG4gICAgICAgICAgICBmaWx0ZXI9e2ZpbHRlcn1cbiAgICAgICAgICAgIHNldEZpbHRlcj17dmFsdWUgPT4gc2V0RmlsdGVyKGVubGFyZ2VkSWR4LCAndmFsdWUnLCB2YWx1ZSl9XG4gICAgICAgICAgICBpc0FueUZpbHRlckFuaW1hdGluZz17aXNBbnlGaWx0ZXJBbmltYXRpbmd9XG4gICAgICAgICAgICB1cGRhdGVBbmltYXRpb25TcGVlZD17KHNwZWVkKSA9PiB1cGRhdGVBbmltYXRpb25TcGVlZChlbmxhcmdlZElkeCwgc3BlZWQpfVxuICAgICAgICAgICAgdG9nZ2xlQW5pbWF0aW9uPXsoKSA9PiB0b2dnbGVBbmltYXRpb24oZW5sYXJnZWRJZHgpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9XaWRnZXRDb250YWluZXI+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCBUaW1lV2lkZ2V0RmFjdG9yeSA9ICgpID0+IFRpbWVXaWRnZXQ7XG5leHBvcnQgZGVmYXVsdCBUaW1lV2lkZ2V0RmFjdG9yeTtcbiJdfQ==