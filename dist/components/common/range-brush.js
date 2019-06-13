"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _d3Selection = require("d3-selection");

var _d3Brush = require("d3-brush");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .selection {\n    stroke: none;\n    fill: ", ";\n    opacity: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledG = _styledComponents["default"].g(_templateObject(), function (props) {
  return props.theme.rangeBrushBgd;
});

var RangeBrush =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(RangeBrush, _Component);

  function RangeBrush() {
    (0, _classCallCheck2["default"])(this, RangeBrush);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(RangeBrush).apply(this, arguments));
  }

  (0, _createClass2["default"])(RangeBrush, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      // We want the React app to respond to brush state and vice-versa
      // but d3-brush fires the same events for both user-initiated brushing
      // and programmatic brushing (brush.move). We need these flags to
      // distinguish between the uses.
      //
      // We don't use state because that would trigger another `componentDidUpdate`
      this.brushing = false;
      this.moving = false;
      this.root = (0, _d3Selection.select)(this.rootContainer);
      this.brush = (0, _d3Brush.brushX)().on('start', function () {
        _this.brushing = true;
      }).on('brush', function () {
        if (_this.moving) {
          return;
        }

        _d3Selection.event.selection === null ? _this._reset() : _this._brush(_d3Selection.event.selection);
      }).on('end', function () {
        if (!_this.moving && _d3Selection.event.selection === null) {
          _this._reset();
        }

        _this.brushing = false;
        _this.moving = false;
      });
      this.root.call(this.brush);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          _this$props$value = (0, _slicedToArray2["default"])(_this$props.value, 2),
          val0 = _this$props$value[0],
          val1 = _this$props$value[1],
          width = _this$props.width;

      var _prevProps$value = (0, _slicedToArray2["default"])(prevProps.value, 2),
          prevVal0 = _prevProps$value[0],
          prevVal1 = _prevProps$value[1];

      if (prevProps.width !== width) {
        // width change should not trigger this._brush
        this.moving = true;
        this.root.call(this.brush);

        this._move(val0, val1);
      }

      if (!this.brushing && !this.moving) {
        if (prevVal0 !== val0 || prevVal1 !== val1) {
          this.moving = true;

          this._move(val0, val1);
        }
      }
    }
  }, {
    key: "_reset",
    value: function _reset() {
      var _this$props$range = (0, _slicedToArray2["default"])(this.props.range, 2),
          minValue = _this$props$range[0],
          maxValue = _this$props$range[1];

      this._onBrush(minValue, maxValue);
    }
  }, {
    key: "_move",
    value: function _move(val0, val1) {
      var _this$props2 = this.props,
          _this$props2$domain = (0, _slicedToArray2["default"])(_this$props2.domain, 2),
          min = _this$props2$domain[0],
          max = _this$props2$domain[1],
          width = _this$props2.width;

      var scale = function scale(x) {
        return (x - min) * width / (max - min);
      };

      this.brush.move(this.root, [scale(val0), scale(val1)]);
    }
  }, {
    key: "_brush",
    value: function _brush(_ref) {
      var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
          sel0 = _ref2[0],
          sel1 = _ref2[1];

      var _this$props3 = this.props,
          _this$props3$domain = (0, _slicedToArray2["default"])(_this$props3.domain, 2),
          min = _this$props3$domain[0],
          max = _this$props3$domain[1],
          width = _this$props3.width;

      var invert = function invert(x) {
        return x * (max - min) / width + min;
      };

      this._onBrush(invert(sel0), invert(sel1));
    }
  }, {
    key: "_onBrush",
    value: function _onBrush(val0, val1) {
      var _this$props$value2 = (0, _slicedToArray2["default"])(this.props.value, 2),
          currentVal0 = _this$props$value2[0],
          currentVal1 = _this$props$value2[1];

      if (currentVal0 === val0 && currentVal1 === val1) {
        return;
      }

      this.props.onBrush(val0, val1);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement(StyledG, {
        className: "kg-range-slider__brush",
        ref: function ref(comp) {
          _this2.rootContainer = comp;
        }
      });
    }
  }]);
  return RangeBrush;
}(_react.Component);

exports["default"] = RangeBrush;
(0, _defineProperty2["default"])(RangeBrush, "propTypes", {
  domain: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  onBrush: _propTypes["default"].func.isRequired,
  range: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  value: _propTypes["default"].arrayOf(_propTypes["default"].number).isRequired,
  width: _propTypes["default"].number.isRequired
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9yYW5nZS1icnVzaC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRHIiwic3R5bGVkIiwiZyIsInByb3BzIiwidGhlbWUiLCJyYW5nZUJydXNoQmdkIiwiUmFuZ2VCcnVzaCIsImJydXNoaW5nIiwibW92aW5nIiwicm9vdCIsInJvb3RDb250YWluZXIiLCJicnVzaCIsIm9uIiwiZXZlbnQiLCJzZWxlY3Rpb24iLCJfcmVzZXQiLCJfYnJ1c2giLCJjYWxsIiwicHJldlByb3BzIiwidmFsdWUiLCJ2YWwwIiwidmFsMSIsIndpZHRoIiwicHJldlZhbDAiLCJwcmV2VmFsMSIsIl9tb3ZlIiwicmFuZ2UiLCJtaW5WYWx1ZSIsIm1heFZhbHVlIiwiX29uQnJ1c2giLCJkb21haW4iLCJtaW4iLCJtYXgiLCJzY2FsZSIsIngiLCJtb3ZlIiwic2VsMCIsInNlbDEiLCJpbnZlcnQiLCJjdXJyZW50VmFsMCIsImN1cnJlbnRWYWwxIiwib25CcnVzaCIsImNvbXAiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsT0FBTyxHQUFHQyw2QkFBT0MsQ0FBVixvQkFHRCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLGFBQWhCO0FBQUEsQ0FISixDQUFiOztJQVFxQkMsVTs7Ozs7Ozs7Ozs7O3dDQVNDO0FBQUE7O0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLFdBQUtDLFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxXQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUVBLFdBQUtDLElBQUwsR0FBWSx5QkFBTyxLQUFLQyxhQUFaLENBQVo7QUFDQSxXQUFLQyxLQUFMLEdB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dGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7ZXZlbnQsIHNlbGVjdH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7YnJ1c2hYfSBmcm9tICdkMy1icnVzaCc7XG5cbmNvbnN0IFN0eWxlZEcgPSBzdHlsZWQuZ2BcbiAgLnNlbGVjdGlvbiB7XG4gICAgc3Ryb2tlOiBub25lO1xuICAgIGZpbGw6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucmFuZ2VCcnVzaEJnZH07XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFuZ2VCcnVzaCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZG9tYWluOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKS5pc1JlcXVpcmVkLFxuICAgIG9uQnJ1c2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcmFuZ2U6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgdmFsdWU6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLmlzUmVxdWlyZWQsXG4gICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIC8vIFdlIHdhbnQgdGhlIFJlYWN0IGFwcCB0byByZXNwb25kIHRvIGJydXNoIHN0YXRlIGFuZCB2aWNlLXZlcnNhXG4gICAgLy8gYnV0IGQzLWJydXNoIGZpcmVzIHRoZSBzYW1lIGV2ZW50cyBmb3IgYm90aCB1c2VyLWluaXRpYXRlZCBicnVzaGluZ1xuICAgIC8vIGFuZCBwcm9ncmFtbWF0aWMgYnJ1c2hpbmcgKGJydXNoLm1vdmUpLiBXZSBuZWVkIHRoZXNlIGZsYWdzIHRvXG4gICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiB0aGUgdXNlcy5cbiAgICAvL1xuICAgIC8vIFdlIGRvbid0IHVzZSBzdGF0ZSBiZWNhdXNlIHRoYXQgd291bGQgdHJpZ2dlciBhbm90aGVyIGBjb21wb25lbnREaWRVcGRhdGVgXG5cbiAgICB0aGlzLmJydXNoaW5nID0gZmFsc2U7XG4gICAgdGhpcy5tb3ZpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMucm9vdCA9IHNlbGVjdCh0aGlzLnJvb3RDb250YWluZXIpO1xuICAgIHRoaXMuYnJ1c2ggPSBicnVzaFgoKVxuICAgICAgLm9uKCdzdGFydCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5icnVzaGluZyA9IHRydWU7XG4gICAgICB9KVxuICAgICAgLm9uKCdicnVzaCcsICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMubW92aW5nKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50LnNlbGVjdGlvbiA9PT0gbnVsbCA/IHRoaXMuX3Jlc2V0KCkgOiB0aGlzLl9icnVzaChldmVudC5zZWxlY3Rpb24pO1xuICAgICAgfSlcbiAgICAgIC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMubW92aW5nICYmIGV2ZW50LnNlbGVjdGlvbiA9PT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX3Jlc2V0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJydXNoaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubW92aW5nID0gZmFsc2U7XG4gICAgICB9KTtcblxuICAgIHRoaXMucm9vdC5jYWxsKHRoaXMuYnJ1c2gpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcykge1xuICAgIGNvbnN0IHt2YWx1ZTogW3ZhbDAsIHZhbDFdLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IFtwcmV2VmFsMCwgcHJldlZhbDFdID0gcHJldlByb3BzLnZhbHVlO1xuXG4gICAgaWYgKHByZXZQcm9wcy53aWR0aCAhPT0gd2lkdGgpIHtcblxuICAgICAgLy8gd2lkdGggY2hhbmdlIHNob3VsZCBub3QgdHJpZ2dlciB0aGlzLl9icnVzaFxuICAgICAgdGhpcy5tb3ZpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5yb290LmNhbGwodGhpcy5icnVzaCk7XG4gICAgICB0aGlzLl9tb3ZlKHZhbDAsIHZhbDEpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5icnVzaGluZyAmJiAhdGhpcy5tb3ZpbmcpIHtcblxuICAgICAgaWYgKHByZXZWYWwwICE9PSB2YWwwIHx8IHByZXZWYWwxICE9PSB2YWwxKSB7XG4gICAgICAgIHRoaXMubW92aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbW92ZSh2YWwwLCB2YWwxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfcmVzZXQoKSB7XG4gICAgY29uc3QgW21pblZhbHVlLCBtYXhWYWx1ZV0gPSB0aGlzLnByb3BzLnJhbmdlO1xuICAgIHRoaXMuX29uQnJ1c2gobWluVmFsdWUsIG1heFZhbHVlKTtcbiAgfVxuXG4gIF9tb3ZlKHZhbDAsIHZhbDEpIHtcbiAgICBjb25zdCB7ZG9tYWluOiBbbWluLCBtYXhdLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHNjYWxlID0geCA9PiAoeCAtIG1pbikgKiB3aWR0aCAvIChtYXggLSBtaW4pO1xuICAgIHRoaXMuYnJ1c2gubW92ZSh0aGlzLnJvb3QsIFtzY2FsZSh2YWwwKSwgc2NhbGUodmFsMSldKTtcbiAgfVxuXG4gIF9icnVzaChbc2VsMCwgc2VsMV0pIHtcbiAgICBjb25zdCB7ZG9tYWluOiBbbWluLCBtYXhdLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGludmVydCA9IHggPT4geCAqIChtYXggLSBtaW4pIC8gd2lkdGggKyBtaW47XG4gICAgdGhpcy5fb25CcnVzaChpbnZlcnQoc2VsMCksIGludmVydChzZWwxKSk7XG4gIH1cblxuICBfb25CcnVzaCh2YWwwLCB2YWwxKSB7XG4gICAgY29uc3Qge3ZhbHVlOiBbY3VycmVudFZhbDAsIGN1cnJlbnRWYWwxXX0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGN1cnJlbnRWYWwwID09PSB2YWwwICYmIGN1cnJlbnRWYWwxID09PSB2YWwxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbkJydXNoKHZhbDAsIHZhbDEpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZEdcbiAgICAgICAgY2xhc3NOYW1lPVwia2ctcmFuZ2Utc2xpZGVyX19icnVzaFwiXG4gICAgICAgIHJlZj17Y29tcCA9PiB7XG4gICAgICAgICAgdGhpcy5yb290Q29udGFpbmVyID0gY29tcDtcbiAgICAgIH19Lz5cbiAgICApO1xuICB9XG59O1xuIl19