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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _slider = _interopRequireDefault(require("../common/slider/slider"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  right: 96px;\n  bottom: 10px;\n  width: 40px;\n  padding-left: 18px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  width: 20px;\n  height: 120px;\n  flex-direction: column;\n  display: flex;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SliderWrapper = _styledComponents["default"].div(_templateObject());

var VerticalSliderContainer = _styledComponents["default"].div(_templateObject2());

var AnimationSpeedToggle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(AnimationSpeedToggle, _Component);

  function AnimationSpeedToggle() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, AnimationSpeedToggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(AnimationSpeedToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClickOutside", function (e) {
      _this.props.onHide();
    });
    return _this;
  }

  (0, _createClass2["default"])(AnimationSpeedToggle, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          updateAnimationSpeed = _this$props.updateAnimationSpeed,
          speed = _this$props.speed;
      return _react["default"].createElement(VerticalSliderContainer, null, _react["default"].createElement(SliderWrapper, null, _react["default"].createElement(_slider["default"], {
        minValue: 0,
        maxValue: 10,
        step: 0.1,
        value1: speed,
        onSlider1Change: updateAnimationSpeed,
        isRanged: false,
        vertical: true,
        showTooltip: true
      })));
    }
  }]);
  return AnimationSpeedToggle;
}(_react.Component);

var _default = (0, _reactOnclickoutside["default"])(AnimationSpeedToggle);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvYW5pbWF0aW9uLXNwZWVkLXRvZ2dsZS5qcyJdLCJuYW1lcyI6WyJTbGlkZXJXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwiVmVydGljYWxTbGlkZXJDb250YWluZXIiLCJBbmltYXRpb25TcGVlZFRvZ2dsZSIsImUiLCJwcm9wcyIsIm9uSGlkZSIsInVwZGF0ZUFuaW1hdGlvblNwZWVkIiwic3BlZWQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGFBQWEsR0FBR0MsNkJBQU9DLEdBQVYsbUJBQW5COztBQVFBLElBQU1DLHVCQUF1QixHQUFHRiw2QkFBT0MsR0FBVixvQkFBN0I7O0lBUU1FLG9COzs7Ozs7Ozs7Ozs7Ozs7OzsyR0FDaUIsVUFBQUMsQ0FBQyxFQUFJO0FBQ3hCLFlBQUtDLEtBQUwsQ0FBV0MsTUFBWDtBQUNELEs7Ozs7Ozs2QkFFUTtBQUFBLHdCQUMrQixLQUFLRCxLQURwQztBQUFBLFVBQ0FFLG9CQURBLGVBQ0FBLG9CQURBO0FBQUEsVUFDc0JDLEtBRHRCLGVBQ3NCQSxLQUR0QjtBQUVQLGFBQ0UsZ0NBQUMsdUJBQUQsUUFDRSxnQ0FBQyxhQUFELFFBQ0UsZ0NBQUMsa0JBQUQ7QUFDRSxRQUFBLFFBQVEsRUFBRSxDQURaO0FBRUUsUUFBQSxRQUFRLEVBQUUsRUFGWjtBQUdFLFFBQUEsSUFBSSxFQUFFLEdBSFI7QUFJRSxRQUFBLE1BQU0sRUFBRUEsS0FKVjtBQUtFLFFBQUEsZUFBZSxFQUFFRCxvQkFMbkI7QUFNRSxRQUFBLFFBQVEsRUFBRSxLQU5aO0FBT0UsUUFBQSxRQUFRLE1BUFY7QUFRRSxRQUFBLFdBQVc7QUFSYixRQURGLENBREYsQ0FERjtBQWdCRDs7O0VBdkJnQ0UsZ0I7O2VBMEJwQixxQ0FBZU4sb0JBQWYsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgU2xpZGVyIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3NsaWRlci9zbGlkZXInO1xuaW1wb3J0IG9uQ2xpY2tPdXRzaWRlIGZyb20gJ3JlYWN0LW9uY2xpY2tvdXRzaWRlJztcblxuY29uc3QgU2xpZGVyV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMTIwcHg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGRpc3BsYXk6IGZsZXg7XG5gO1xuXG5jb25zdCBWZXJ0aWNhbFNsaWRlckNvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDk2cHg7XG4gIGJvdHRvbTogMTBweDtcbiAgd2lkdGg6IDQwcHg7XG4gIHBhZGRpbmctbGVmdDogMThweDtcbmA7XG5cbmNsYXNzIEFuaW1hdGlvblNwZWVkVG9nZ2xlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gZSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbkhpZGUoKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3VwZGF0ZUFuaW1hdGlvblNwZWVkLCBzcGVlZH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8VmVydGljYWxTbGlkZXJDb250YWluZXI+XG4gICAgICAgIDxTbGlkZXJXcmFwcGVyPlxuICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgIG1pblZhbHVlPXswfVxuICAgICAgICAgICAgbWF4VmFsdWU9ezEwfVxuICAgICAgICAgICAgc3RlcD17MC4xfVxuICAgICAgICAgICAgdmFsdWUxPXtzcGVlZH1cbiAgICAgICAgICAgIG9uU2xpZGVyMUNoYW5nZT17dXBkYXRlQW5pbWF0aW9uU3BlZWR9XG4gICAgICAgICAgICBpc1JhbmdlZD17ZmFsc2V9XG4gICAgICAgICAgICB2ZXJ0aWNhbFxuICAgICAgICAgICAgc2hvd1Rvb2x0aXBcbiAgICAgICAgICAvPlxuICAgICAgICA8L1NsaWRlcldyYXBwZXI+XG4gICAgICA8L1ZlcnRpY2FsU2xpZGVyQ29udGFpbmVyPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgb25DbGlja091dHNpZGUoQW5pbWF0aW9uU3BlZWRUb2dnbGUpO1xuIl19