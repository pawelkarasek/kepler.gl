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

var _d3Scale = require("d3-scale");

var _d3Selection = require("d3-selection");

var _d3Axis = require("d3-axis");

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  pointer-events: none;\n  position: absolute;\n  top: 0;\n  .axis text {\n    font-size: 9px;\n    fill: ", ";\n  }\n\n  .axis line,\n  .axis path {\n    fill: none;\n    stroke: ", ";\n    shape-rendering: crispEdges;\n    stroke-width: 2;\n  }\n\n  .axis .domain {\n    display: none;\n  }\n\n  .value {\n    fill: ", ";\n    font-size: 10px;\n\n    &.start {\n      text-anchor: start;\n    }\n\n    &.end {\n      text-anchor: end;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var TimeSliderContainer = _styledComponents["default"].svg(_templateObject(), function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.sliderBarBgd;
}, function (props) {
  return props.theme.textColor;
});

var height = 30;

var TimeSliderMarker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(TimeSliderMarker, _Component);

  function TimeSliderMarker() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, TimeSliderMarker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(TimeSliderMarker)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "domainSelector", function (props) {
      return props.domain;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "widthSelector", function (props) {
      return props.width;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "scaleSelector", (0, _reselect.createSelector)(_this.domainSelector, _this.widthSelector, function (domain, width) {
      return Array.isArray(domain) ? (0, _d3Scale.scaleUtc)().domain(domain).range([0, width]) : null;
    }));
    return _this;
  }

  (0, _createClass2["default"])(TimeSliderMarker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._updateAxis(this.scaleSelector(this.props));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.scaleSelector(this.props) !== this.scaleSelector(nextProps)) {
        this._updateAxis(this.scaleSelector(nextProps));
      }
    }
  }, {
    key: "_updateAxis",
    value: function _updateAxis(scale) {
      if (!scale) {
        return;
      }

      var xAxis = (0, _d3Axis.axisBottom)(scale).ticks(4).tickSize(8).tickPadding(6);
      var svg = (0, _d3Selection.select)(this.svgContainer);
      svg.select('.x.axis').call(xAxis).selectAll('text');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(TimeSliderContainer, {
        className: "time-slider-marker",
        width: this.props.width,
        height: height,
        ref: function ref(comp) {
          _this2.svgContainer = comp;
        }
      }, _react["default"].createElement("g", {
        className: "x axis",
        transform: "translate(0, 0)"
      }));
    }
  }]);
  return TimeSliderMarker;
}(_react.Component);

exports["default"] = TimeSliderMarker;
(0, _defineProperty2["default"])(TimeSliderMarker, "propTypes", {
  domain: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  width: _propTypes["default"].number.isRequired
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi90aW1lLXNsaWRlci1tYXJrZXIuanMiXSwibmFtZXMiOlsiVGltZVNsaWRlckNvbnRhaW5lciIsInN0eWxlZCIsInN2ZyIsInByb3BzIiwidGhlbWUiLCJ0ZXh0Q29sb3IiLCJzbGlkZXJCYXJCZ2QiLCJoZWlnaHQiLCJUaW1lU2xpZGVyTWFya2VyIiwiZG9tYWluIiwid2lkdGgiLCJkb21haW5TZWxlY3RvciIsIndpZHRoU2VsZWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJyYW5nZSIsIl91cGRhdGVBeGlzIiwic2NhbGVTZWxlY3RvciIsIm5leHRQcm9wcyIsInNjYWxlIiwieEF4aXMiLCJ0aWNrcyIsInRpY2tTaXplIiwidGlja1BhZGRpbmciLCJzdmdDb250YWluZXIiLCJzZWxlY3QiLCJjYWxsIiwic2VsZWN0QWxsIiwiY29tcCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwibnVtYmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLG1CQUFtQixHQUFHQyw2QkFBT0MsR0FBVixvQkFNYixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFNBQWhCO0FBQUEsQ0FOUSxFQVlYLFVBQUFGLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUUsWUFBaEI7QUFBQSxDQVpNLEVBc0JiLFVBQUFILEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsU0FBaEI7QUFBQSxDQXRCUSxDQUF6Qjs7QUFtQ0EsSUFBTUUsTUFBTSxHQUFHLEVBQWY7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7dUdBZ0JGLFVBQUFMLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNNLE1BQVY7QUFBQSxLO3NHQUNOLFVBQUFOLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNPLEtBQVY7QUFBQSxLO3NHQUNMLDhCQUNkLE1BQUtDLGNBRFMsRUFFZCxNQUFLQyxhQUZTLEVBR2QsVUFBQ0gsTUFBRCxFQUFTQyxLQUFUO0FBQUEsYUFDRUcsS0FBSyxDQUFDQyxPQUFOLENBQWNMLE1BQWQsSUFDSSx5QkFDR0EsTUFESCxDQUNVQSxNQURWLEVBRUdNLEtBRkgsQ0FFUyxDQUFDLENBQUQsRUFBSUwsS0FBSixDQUZULENBREosR0FJSSxJQUxOO0FBQUEsS0FIYyxDOzs7Ozs7d0NBWkk7QUFDbEIsV0FBS00sV0FBTCxDQUFpQixLQUFLQyxhQUFMLENBQW1CLEtBQUtkLEtBQXhCLENBQWpCO0FBQ0Q7Ozs4Q0FFeUJlLFMsRUFBVztBQUNuQyxVQUFJLEtBQUtELGFBQUwsQ0FBbUIsS0FBS2QsS0FBeEIsTUFBbUMsS0FBS2MsYUFBTCxDQUFtQkMsU0FBbkIsQ0FBdkMsRUFBc0U7QUFDcEUsYUFBS0YsV0FBTCxDQUFpQixLQUFLQyxhQUFMLENBQW1CQyxTQUFuQixDQUFqQjtBQUNEO0FBQ0Y7OztnQ0FlV0MsSyxFQUFPO0FBQ2pCLFVBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1Y7QUFDRDs7QUFDRCxVQUFNQyxLQUFLLEdBQUcsd0JBQVdELEtBQVgsRUFDWEUsS0FEVyxDQUNMLENBREssRUFFWEMsUUFGVyxDQUVGLENBRkUsRUFHWEMsV0FIVyxDQUdDLENBSEQsQ0FBZDtBQUtBLFVBQU1yQixHQUFHLEdBQUcseUJBQU8sS0FBS3NCLFlBQVosQ0FBWjtBQUVBdEIsTUFBQUEsR0FBRyxDQUNBdUIsTUFESCxDQUNVLFNBRFYsRUFFR0MsSUFGSCxDQUVRTixLQUZSLEVBR0dPLFNBSEgsQ0FHYSxNQUhiO0FBSUQ7Ozs2QkFFUTtBQUFBOztBQUNQLGFBQ0UsZ0NBQUMsbUJBQUQ7QUFDRSxRQUFBLFNBQVMsRUFBQyxvQkFEWjtBQUVFLFFBQUEsS0FBSyxFQUFFLEtBQUt4QixLQUFMLENBQVdPLEtBRnBCO0FBR0UsUUFBQSxNQUFNLEVBQUVILE1BSFY7QUFJRSxRQUFBLEdBQUcsRUFBRSxhQUFBcUIsSUFBSSxFQUFJO0FBQ1gsVUFBQSxNQUFJLENBQUNKLFlBQUwsR0FBb0JJLElBQXBCO0FBQ0Q7QUFOSCxTQVFFO0FBQUcsUUFBQSxTQUFTLEVBQUMsUUFBYjtBQUFzQixRQUFBLFNBQVMsRUFBQztBQUFoQyxRQVJGLENBREY7QUFZRDs7O0VBM0QyQ0MsZ0I7OztpQ0FBekJyQixnQixlQUNBO0FBQ2pCQyxFQUFBQSxNQUFNLEVBQUVxQixzQkFBVUMsT0FBVixDQUFrQkQsc0JBQVVFLEdBQTVCLEVBQWlDQyxVQUR4QjtBQUVqQnZCLEVBQUFBLEtBQUssRUFBRW9CLHNCQUFVSSxNQUFWLENBQWlCRDtBQUZQLEM7QUEyRHBCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtzY2FsZVV0Y30gZnJvbSAnZDMtc2NhbGUnO1xuaW1wb3J0IHtzZWxlY3R9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQge2F4aXNCb3R0b219IGZyb20gJ2QzLWF4aXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFRpbWVTbGlkZXJDb250YWluZXIgPSBzdHlsZWQuc3ZnYFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIC5heGlzIHRleHQge1xuICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgIGZpbGw6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgfVxuXG4gIC5heGlzIGxpbmUsXG4gIC5heGlzIHBhdGgge1xuICAgIGZpbGw6IG5vbmU7XG4gICAgc3Ryb2tlOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNsaWRlckJhckJnZH07XG4gICAgc2hhcGUtcmVuZGVyaW5nOiBjcmlzcEVkZ2VzO1xuICAgIHN0cm9rZS13aWR0aDogMjtcbiAgfVxuXG4gIC5heGlzIC5kb21haW4ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAudmFsdWUge1xuICAgIGZpbGw6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICBmb250LXNpemU6IDEwcHg7XG5cbiAgICAmLnN0YXJ0IHtcbiAgICAgIHRleHQtYW5jaG9yOiBzdGFydDtcbiAgICB9XG5cbiAgICAmLmVuZCB7XG4gICAgICB0ZXh0LWFuY2hvcjogZW5kO1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgaGVpZ2h0ID0gMzA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVTbGlkZXJNYXJrZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGRvbWFpbjogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fdXBkYXRlQXhpcyh0aGlzLnNjYWxlU2VsZWN0b3IodGhpcy5wcm9wcykpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5zY2FsZVNlbGVjdG9yKHRoaXMucHJvcHMpICE9PSB0aGlzLnNjYWxlU2VsZWN0b3IobmV4dFByb3BzKSkge1xuICAgICAgdGhpcy5fdXBkYXRlQXhpcyh0aGlzLnNjYWxlU2VsZWN0b3IobmV4dFByb3BzKSk7XG4gICAgfVxuICB9XG5cbiAgZG9tYWluU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5kb21haW47XG4gIHdpZHRoU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy53aWR0aDtcbiAgc2NhbGVTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgIHRoaXMuZG9tYWluU2VsZWN0b3IsXG4gICAgdGhpcy53aWR0aFNlbGVjdG9yLFxuICAgIChkb21haW4sIHdpZHRoKSA9PlxuICAgICAgQXJyYXkuaXNBcnJheShkb21haW4pXG4gICAgICAgID8gc2NhbGVVdGMoKVxuICAgICAgICAgICAgLmRvbWFpbihkb21haW4pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIHdpZHRoXSlcbiAgICAgICAgOiBudWxsXG4gICk7XG5cbiAgX3VwZGF0ZUF4aXMoc2NhbGUpIHtcbiAgICBpZiAoIXNjYWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHhBeGlzID0gYXhpc0JvdHRvbShzY2FsZSlcbiAgICAgIC50aWNrcyg0KVxuICAgICAgLnRpY2tTaXplKDgpXG4gICAgICAudGlja1BhZGRpbmcoNik7XG5cbiAgICBjb25zdCBzdmcgPSBzZWxlY3QodGhpcy5zdmdDb250YWluZXIpO1xuXG4gICAgc3ZnXG4gICAgICAuc2VsZWN0KCcueC5heGlzJylcbiAgICAgIC5jYWxsKHhBeGlzKVxuICAgICAgLnNlbGVjdEFsbCgndGV4dCcpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8VGltZVNsaWRlckNvbnRhaW5lclxuICAgICAgICBjbGFzc05hbWU9XCJ0aW1lLXNsaWRlci1tYXJrZXJcIlxuICAgICAgICB3aWR0aD17dGhpcy5wcm9wcy53aWR0aH1cbiAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5zdmdDb250YWluZXIgPSBjb21wO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8ZyBjbGFzc05hbWU9XCJ4IGF4aXNcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoMCwgMClcIiAvPlxuICAgICAgPC9UaW1lU2xpZGVyQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn07XG4iXX0=