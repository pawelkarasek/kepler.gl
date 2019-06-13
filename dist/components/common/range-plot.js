"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Scale = require("d3-scale");

var _moment = _interopRequireDefault(require("moment"));

var _d3Array = require("d3-array");

var _reselect = require("reselect");

var _reactVis = require("react-vis");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _rangeBrush = _interopRequireDefault(require("./range-brush"));

var _filterUtils = require("../../utils/filter-utils");

var _base = require("../../styles/base");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: #d3d8e0;\n  border-radius: 2px;\n  color: ", ";\n  font-size: 9px;\n  margin: 4px;\n  padding: 3px 6px;\n  pointer-events: none;\n  user-select: none;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .rv-xy-plot__inner path {\n    fill: none;\n    stroke-width: 1.5;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var chartMargin = {
  top: 18,
  bottom: 0,
  left: 0,
  right: 0
};
var chartH = 52;
var containerH = 78;
var histogramStyle = {
  highlightW: 0.7,
  unHighlightedW: 0.4,
  highlightedColor: _base.theme.activeColor,
  unHighlightedColor: _base.theme.sliderBarColor
};

var RangePlot =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(RangePlot, _Component);

  function RangePlot() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, RangePlot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(RangePlot)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      hoveredDP: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "domainSelector", function (props) {
      return props.lineChart && props.lineChart.xDomain;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hintFormatter", (0, _reselect.createSelector)(_this.domainSelector, function (domain) {
      return (0, _filterUtils.getTimeWidgetHintFormatter)(domain);
    }));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMouseMove", function (hoveredDP) {
      _this.setState({
        hoveredDP: hoveredDP
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(RangePlot, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onBrush = _this$props.onBrush,
          range = _this$props.range,
          value = _this$props.value,
          width = _this$props.width,
          plotType = _this$props.plotType,
          lineChart = _this$props.lineChart,
          histogram = _this$props.histogram;
      var domain = [histogram[0].x0, histogram[histogram.length - 1].x1];

      var brushComponent = _react["default"].createElement(_rangeBrush["default"], {
        domain: domain,
        onBrush: onBrush,
        range: range,
        value: value,
        width: width
      });

      return _react["default"].createElement("div", {
        style: {
          height: "".concat(containerH, "px"),
          position: 'relative'
        }
      }, plotType === 'lineChart' ? _react["default"].createElement(LineChart, {
        hoveredDP: this.state.hoveredDP,
        width: width,
        height: containerH,
        margin: chartMargin,
        children: brushComponent,
        onMouseMove: this.onMouseMove,
        yDomain: lineChart.yDomain,
        hintFormat: this.hintFormatter(this.props),
        data: lineChart.series
      }) : _react["default"].createElement(Histogram, {
        width: width,
        height: chartH,
        value: value,
        margin: chartMargin,
        histogram: histogram,
        brushComponent: brushComponent
      }));
    }
  }]);
  return RangePlot;
}(_react.Component);

exports["default"] = RangePlot;
(0, _defineProperty2["default"])(RangePlot, "propTypes", {
  value: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  histogram: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    x0: _propTypes["default"].number,
    x1: _propTypes["default"].number
  })),
  lineChart: _propTypes["default"].object,
  plotType: _propTypes["default"].string,
  isEnlarged: _propTypes["default"].bool,
  onBlur: _propTypes["default"].func,
  width: _propTypes["default"].number.isRequired
});

var Histogram = function Histogram(_ref) {
  var width = _ref.width,
      height = _ref.height,
      margin = _ref.margin,
      histogram = _ref.histogram,
      value = _ref.value,
      brushComponent = _ref.brushComponent;
  var domain = [histogram[0].x0, histogram[histogram.length - 1].x1];
  var barWidth = width / histogram.length;
  var x = (0, _d3Scale.scaleLinear)().domain(domain).range([0, width]);
  var y = (0, _d3Scale.scaleLinear)().domain([0, (0, _d3Array.max)(histogram, function (d) {
    return d.count;
  })]).range([0, height]);
  return _react["default"].createElement("svg", {
    width: width,
    height: height,
    style: {
      marginTop: "".concat(margin.top, "px")
    }
  }, _react["default"].createElement("g", {
    className: "histogram-bars"
  }, histogram.map(function (bar) {
    var inRange = bar.x0 >= value[0] && bar.x1 <= value[1];
    var fill = inRange ? histogramStyle.highlightedColor : histogramStyle.unHighlightedColor;
    var wRatio = inRange ? histogramStyle.highlightW : histogramStyle.unHighlightedW;
    return _react["default"].createElement("rect", {
      key: bar.x0,
      fill: fill,
      height: y(bar.count),
      width: barWidth * wRatio,
      x: x(bar.x0) + barWidth * (1 - wRatio) / 2,
      rx: 1,
      ry: 1,
      y: height - y(bar.count)
    });
  })), brushComponent);
};

var LineChartWrapper = _styledComponents["default"].div(_templateObject());

var LineChart = function LineChart(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      yDomain = _ref2.yDomain,
      hintFormat = _ref2.hintFormat,
      hoveredDP = _ref2.hoveredDP,
      margin = _ref2.margin,
      color = _ref2.color,
      data = _ref2.data,
      onMouseMove = _ref2.onMouseMove,
      children = _ref2.children;
  var brushData = [{
    x: data[0].x,
    y: yDomain[1],
    customComponent: function customComponent() {
      return children;
    }
  }];
  return _react["default"].createElement(LineChartWrapper, null, _react["default"].createElement(_reactVis.XYPlot, {
    width: width,
    height: height,
    margin: (0, _objectSpread2["default"])({}, margin, {
      bottom: 12
    })
  }, _react["default"].createElement(_reactVis.LineSeries, {
    strokeWidth: 2,
    color: color,
    data: data,
    onNearestX: onMouseMove
  }), _react["default"].createElement(_reactVis.MarkSeries, {
    data: hoveredDP ? [hoveredDP] : [],
    color: color,
    size: 3
  }), _react["default"].createElement(_reactVis.CustomSVGSeries, {
    data: brushData
  }), hoveredDP ? _react["default"].createElement(_reactVis.Hint, {
    value: hoveredDP
  }, _react["default"].createElement(HintContent, (0, _extends2["default"])({}, hoveredDP, {
    format: function format(val) {
      return _moment["default"].utc(val).format(hintFormat);
    }
  }))) : null));
};

var StyledHint = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.textColorLT;
});

var HintContent = function HintContent(_ref3) {
  var x = _ref3.x,
      y = _ref3.y,
      format = _ref3.format;
  return _react["default"].createElement(StyledHint, null, _react["default"].createElement("div", {
    className: "hint--x"
  }, format(x)), _react["default"].createElement("div", {
    className: "row"
  }, y));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1wbG90LmpzIl0sIm5hbWVzIjpbImNoYXJ0TWFyZ2luIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiY2hhcnRIIiwiY29udGFpbmVySCIsImhpc3RvZ3JhbVN0eWxlIiwiaGlnaGxpZ2h0VyIsInVuSGlnaGxpZ2h0ZWRXIiwiaGlnaGxpZ2h0ZWRDb2xvciIsInRoZW1lIiwiYWN0aXZlQ29sb3IiLCJ1bkhpZ2hsaWdodGVkQ29sb3IiLCJzbGlkZXJCYXJDb2xvciIsIlJhbmdlUGxvdCIsImhvdmVyZWREUCIsInByb3BzIiwibGluZUNoYXJ0IiwieERvbWFpbiIsImRvbWFpblNlbGVjdG9yIiwiZG9tYWluIiwic2V0U3RhdGUiLCJvbkJydXNoIiwicmFuZ2UiLCJ2YWx1ZSIsIndpZHRoIiwicGxvdFR5cGUiLCJoaXN0b2dyYW0iLCJ4MCIsImxlbmd0aCIsIngxIiwiYnJ1c2hDb21wb25lbnQiLCJoZWlnaHQiLCJwb3NpdGlvbiIsInN0YXRlIiwib25Nb3VzZU1vdmUiLCJ5RG9tYWluIiwiaGludEZvcm1hdHRlciIsInNlcmllcyIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwic2hhcGUiLCJvYmplY3QiLCJzdHJpbmciLCJpc0VubGFyZ2VkIiwiYm9vbCIsIm9uQmx1ciIsImZ1bmMiLCJIaXN0b2dyYW0iLCJtYXJnaW4iLCJiYXJXaWR0aCIsIngiLCJ5IiwiZCIsImNvdW50IiwibWFyZ2luVG9wIiwibWFwIiwiYmFyIiwiaW5SYW5nZSIsImZpbGwiLCJ3UmF0aW8iLCJMaW5lQ2hhcnRXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwiTGluZUNoYXJ0IiwiaGludEZvcm1hdCIsImNvbG9yIiwiZGF0YSIsImNoaWxkcmVuIiwiYnJ1c2hEYXRhIiwiY3VzdG9tQ29tcG9uZW50IiwidmFsIiwibW9tZW50IiwidXRjIiwiZm9ybWF0Iiwi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O0FBVUEsSUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxNQUFFMUIsQ0FBRixTQUFFQSxDQUFGO0FBQUEsTUFBS0MsQ0FBTCxTQUFLQSxDQUFMO0FBQUEsTUFBUXNCLE1BQVIsU0FBUUEsTUFBUjtBQUFBLFNBQ2xCLGdDQUFDLFVBQUQsUUFDRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsS0FBMEJBLE1BQU0sQ0FBQ3ZCLENBQUQsQ0FBaEMsQ0FERixFQUVFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUFzQkMsQ0FBdEIsQ0FGRixDQURrQjtBQUFBLENBQXBCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtzY2FsZUxpbmVhcn0gZnJvbSAnZDMtc2NhbGUnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHttYXh9IGZyb20gJ2QzLWFycmF5JztcbmltcG9ydCB7Y3JlYXRlU2VsZWN0b3J9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCB7TGluZVNlcmllcywgWFlQbG90LCBDdXN0b21TVkdTZXJpZXMsIEhpbnQsIE1hcmtTZXJpZXN9IGZyb20gJ3JlYWN0LXZpcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBSYW5nZUJydXNoIGZyb20gJy4vcmFuZ2UtYnJ1c2gnO1xuaW1wb3J0IHtnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcn0gZnJvbSAndXRpbHMvZmlsdGVyLXV0aWxzJztcbmltcG9ydCB7dGhlbWV9IGZyb20gJ3N0eWxlcy9iYXNlJztcblxuY29uc3QgY2hhcnRNYXJnaW4gPSB7dG9wOiAxOCwgYm90dG9tOiAwLCBsZWZ0OiAwLCByaWdodDogMH07XG5jb25zdCBjaGFydEggPSA1MjtcbmNvbnN0IGNvbnRhaW5lckggPSA3ODtcbmNvbnN0IGhpc3RvZ3JhbVN0eWxlID0ge1xuICBoaWdobGlnaHRXOiAwLjcsXG4gIHVuSGlnaGxpZ2h0ZWRXOiAwLjQsXG4gIGhpZ2hsaWdodGVkQ29sb3I6IHRoZW1lLmFjdGl2ZUNvbG9yLFxuICB1bkhpZ2hsaWdodGVkQ29sb3I6IHRoZW1lLnNsaWRlckJhckNvbG9yXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5nZVBsb3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHZhbHVlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIGhpc3RvZ3JhbTogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICB4MDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgeDE6IFByb3BUeXBlcy5udW1iZXJcbiAgICAgIH0pXG4gICAgKSxcbiAgICBsaW5lQ2hhcnQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgcGxvdFR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaXNFbmxhcmdlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25CbHVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgaG92ZXJlZERQOiBudWxsXG4gIH07XG5cbiAgZG9tYWluU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5saW5lQ2hhcnQgJiYgcHJvcHMubGluZUNoYXJ0LnhEb21haW47XG4gIGhpbnRGb3JtYXR0ZXIgPSBjcmVhdGVTZWxlY3Rvcih0aGlzLmRvbWFpblNlbGVjdG9yLCBkb21haW4gPT5cbiAgICBnZXRUaW1lV2lkZ2V0SGludEZvcm1hdHRlcihkb21haW4pXG4gICk7XG5cbiAgb25Nb3VzZU1vdmUgPSBob3ZlcmVkRFAgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe2hvdmVyZWREUH0pO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBvbkJydXNoLFxuICAgICAgcmFuZ2UsXG4gICAgICB2YWx1ZSxcbiAgICAgIHdpZHRoLFxuICAgICAgcGxvdFR5cGUsXG4gICAgICBsaW5lQ2hhcnQsXG4gICAgICBoaXN0b2dyYW1cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBkb21haW4gPSBbaGlzdG9ncmFtWzBdLngwLCBoaXN0b2dyYW1baGlzdG9ncmFtLmxlbmd0aCAtIDFdLngxXTtcblxuICAgIGNvbnN0IGJydXNoQ29tcG9uZW50ID0gKFxuICAgICAgPFJhbmdlQnJ1c2hcbiAgICAgICAgZG9tYWluPXtkb21haW59XG4gICAgICAgIG9uQnJ1c2g9e29uQnJ1c2h9XG4gICAgICAgIHJhbmdlPXtyYW5nZX1cbiAgICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAvPlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGhlaWdodDogYCR7Y29udGFpbmVySH1weGAsXG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge3Bsb3RUeXBlID09PSAnbGluZUNoYXJ0JyA/IChcbiAgICAgICAgICA8TGluZUNoYXJ0XG4gICAgICAgICAgICBob3ZlcmVkRFA9e3RoaXMuc3RhdGUuaG92ZXJlZERQfVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtjb250YWluZXJIfVxuICAgICAgICAgICAgbWFyZ2luPXtjaGFydE1hcmdpbn1cbiAgICAgICAgICAgIGNoaWxkcmVuPXticnVzaENvbXBvbmVudH1cbiAgICAgICAgICAgIG9uTW91c2VNb3ZlPXt0aGlzLm9uTW91c2VNb3ZlfVxuICAgICAgICAgICAgeURvbWFpbj17bGluZUNoYXJ0LnlEb21haW59XG4gICAgICAgICAgICBoaW50Rm9ybWF0PXt0aGlzLmhpbnRGb3JtYXR0ZXIodGhpcy5wcm9wcyl9XG4gICAgICAgICAgICBkYXRhPXtsaW5lQ2hhcnQuc2VyaWVzfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEhpc3RvZ3JhbVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtjaGFydEh9XG4gICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICBtYXJnaW49e2NoYXJ0TWFyZ2lufVxuICAgICAgICAgICAgaGlzdG9ncmFtPXtoaXN0b2dyYW19XG4gICAgICAgICAgICBicnVzaENvbXBvbmVudD17YnJ1c2hDb21wb25lbnR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgSGlzdG9ncmFtID0gKHtcbiAgd2lkdGgsXG4gIGhlaWdodCxcbiAgbWFyZ2luLFxuICBoaXN0b2dyYW0sXG4gIHZhbHVlLFxuICBicnVzaENvbXBvbmVudFxufSkgPT4ge1xuICBjb25zdCBkb21haW4gPSBbaGlzdG9ncmFtWzBdLngwLCBoaXN0b2dyYW1baGlzdG9ncmFtLmxlbmd0aCAtIDFdLngxXTtcbiAgY29uc3QgYmFyV2lkdGggPSB3aWR0aCAvIGhpc3RvZ3JhbS5sZW5ndGg7XG5cbiAgY29uc3QgeCA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKGRvbWFpbilcbiAgICAucmFuZ2UoWzAsIHdpZHRoXSk7XG5cbiAgY29uc3QgeSA9IHNjYWxlTGluZWFyKClcbiAgICAuZG9tYWluKFswLCBtYXgoaGlzdG9ncmFtLCBkID0+IGQuY291bnQpXSlcbiAgICAucmFuZ2UoWzAsIGhlaWdodF0pO1xuXG4gIHJldHVybiAoXG4gICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBzdHlsZT17e21hcmdpblRvcDogYCR7bWFyZ2luLnRvcH1weGB9fT5cbiAgICAgIDxnIGNsYXNzTmFtZT1cImhpc3RvZ3JhbS1iYXJzXCI+XG4gICAgICAgIHtoaXN0b2dyYW0ubWFwKGJhciA9PiB7XG4gICAgICAgICAgY29uc3QgaW5SYW5nZSA9IGJhci54MCA+PSB2YWx1ZVswXSAmJiBiYXIueDEgPD0gdmFsdWVbMV07XG4gICAgICAgICAgY29uc3QgZmlsbCA9IGluUmFuZ2UgPyBoaXN0b2dyYW1TdHlsZS5oaWdobGlnaHRlZENvbG9yIDogaGlzdG9ncmFtU3R5bGUudW5IaWdobGlnaHRlZENvbG9yO1xuICAgICAgICAgIGNvbnN0IHdSYXRpbyA9IGluUmFuZ2UgPyBoaXN0b2dyYW1TdHlsZS5oaWdobGlnaHRXIDogaGlzdG9ncmFtU3R5bGUudW5IaWdobGlnaHRlZFc7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgICAga2V5PXtiYXIueDB9XG4gICAgICAgICAgICAgIGZpbGw9e2ZpbGx9XG4gICAgICAgICAgICAgIGhlaWdodD17eShiYXIuY291bnQpfVxuICAgICAgICAgICAgICB3aWR0aD17YmFyV2lkdGggKiB3UmF0aW99XG4gICAgICAgICAgICAgIHg9e3goYmFyLngwKSArIGJhcldpZHRoICogKDEgLSB3UmF0aW8pIC8gMn1cbiAgICAgICAgICAgICAgcng9ezF9XG4gICAgICAgICAgICAgIHJ5PXsxfVxuICAgICAgICAgICAgICB5PXtoZWlnaHQgLSB5KGJhci5jb3VudCl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9nPlxuICAgICAge2JydXNoQ29tcG9uZW50fVxuICAgIDwvc3ZnPlxuICApO1xufTtcblxuY29uc3QgTGluZUNoYXJ0V3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIC5ydi14eS1wbG90X19pbm5lciBwYXRoIHtcbiAgICBmaWxsOiBub25lO1xuICAgIHN0cm9rZS13aWR0aDogMS41O1xuICB9XG5gO1xuXG5jb25zdCBMaW5lQ2hhcnQgPSAoe1xuICB3aWR0aCxcbiAgaGVpZ2h0LFxuICB5RG9tYWluLFxuICBoaW50Rm9ybWF0LFxuICBob3ZlcmVkRFAsXG4gIG1hcmdpbixcbiAgY29sb3IsXG4gIGRhdGEsXG4gIG9uTW91c2VNb3ZlLFxuICBjaGlsZHJlblxufSkgPT4ge1xuICBjb25zdCBicnVzaERhdGEgPSBbXG4gICAge3g6IGRhdGFbMF0ueCwgeTogeURvbWFpblsxXSwgY3VzdG9tQ29tcG9uZW50OiAoKSA9PiBjaGlsZHJlbn1cbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxMaW5lQ2hhcnRXcmFwcGVyPlxuICAgICAgPFhZUGxvdCB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBtYXJnaW49e3suLi5tYXJnaW4sIGJvdHRvbTogMTJ9fT5cbiAgICAgICAgPExpbmVTZXJpZXNcbiAgICAgICAgICBzdHJva2VXaWR0aD17Mn1cbiAgICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgICBvbk5lYXJlc3RYPXtvbk1vdXNlTW92ZX1cbiAgICAgICAgLz5cbiAgICAgICAgPE1hcmtTZXJpZXNcbiAgICAgICAgICBkYXRhPXtob3ZlcmVkRFAgPyBbaG92ZXJlZERQXSA6IFtdfVxuICAgICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgICBzaXplPXszfVxuICAgICAgICAvPlxuICAgICAgICA8Q3VzdG9tU1ZHU2VyaWVzIGRhdGE9e2JydXNoRGF0YX0gLz5cbiAgICAgICAge2hvdmVyZWREUCA/IChcbiAgICAgICAgICA8SGludCB2YWx1ZT17aG92ZXJlZERQfT5cbiAgICAgICAgICAgIDxIaW50Q29udGVudFxuICAgICAgICAgICAgICB7Li4uaG92ZXJlZERQfVxuICAgICAgICAgICAgICBmb3JtYXQ9e3ZhbCA9PiBtb21lbnQudXRjKHZhbCkuZm9ybWF0KGhpbnRGb3JtYXQpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0hpbnQ+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9YWVBsb3Q+XG4gICAgPC9MaW5lQ2hhcnRXcmFwcGVyPlxuICApO1xufTtcblxuY29uc3QgU3R5bGVkSGludCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICNkM2Q4ZTA7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICBmb250LXNpemU6IDlweDtcbiAgbWFyZ2luOiA0cHg7XG4gIHBhZGRpbmc6IDNweCA2cHg7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbmA7XG5jb25zdCBIaW50Q29udGVudCA9ICh7eCwgeSwgZm9ybWF0fSkgPT4gKFxuICA8U3R5bGVkSGludD5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImhpbnQtLXhcIj57Zm9ybWF0KHgpfTwvZGl2PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+e3l9PC9kaXY+XG4gIDwvU3R5bGVkSGludD5cbik7XG4iXX0=