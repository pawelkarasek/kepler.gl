"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.StyledConfigGroupHeader = exports.StyledLayerConfigGroup = exports.ConfigGroupCollapsibleHeader = exports.ConfigGroupCollapsibleContent = exports.StyledLayerConfigGroupAction = exports.StyledLayerConfigGroupLabel = void 0;

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

var _classnames = _interopRequireDefault(require("classnames"));

var _switch = _interopRequireDefault(require("../../common/switch"));

var _icons = require("../../common/icons");

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  &.disabled {\n    opacity: 0.3;\n    pointer-events: none;\n    * {\n      pointer-events: none;\n    }\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n\n  :hover {\n    cursor: pointer;\n    .layer-config-group__label {\n      color: ", ";\n      border-left: 2px solid ", ";\n    }\n\n    .layer-config-group__action {\n      color:  ", ";\n    }\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding-left: 18px;\n  margin-bottom: 12px;\n\n  &.collapsed {\n    .layer-config-group__header__collapsible {\n      overflow: visible;\n      max-height: 600px;\n    }\n    .layer-config-group__content {\n\n      .layer-config-group__content__collapsible {\n        overflow: hidden;\n        max-height: 0;\n      }\n    }\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  overflow: visible;\n  overflow: hidden;\n  max-height: 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  overflow: visible;\n  transition: max-height 0.3s ease-out;\n  height: max-content;\n  max-height: 600px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-left: 2px solid ", ";\n  color: ", ";\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 12px;\n  margin-left: -12px;\n  padding-left: 10px;\n  text-transform: capitalize;\n  letter-spacing: 0.2px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledLayerConfigGroupLabel = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.textColor;
});

exports.StyledLayerConfigGroupLabel = StyledLayerConfigGroupLabel;

var StyledLayerConfigGroupAction = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.textColor;
});

exports.StyledLayerConfigGroupAction = StyledLayerConfigGroupAction;

var ConfigGroupCollapsibleContent = _styledComponents["default"].div.attrs({
  className: 'layer-config-group__content__collapsible'
})(_templateObject3());

exports.ConfigGroupCollapsibleContent = ConfigGroupCollapsibleContent;

var ConfigGroupCollapsibleHeader = _styledComponents["default"].div.attrs({
  className: 'layer-config-group__header__collapsible'
})(_templateObject4());

exports.ConfigGroupCollapsibleHeader = ConfigGroupCollapsibleHeader;

var StyledLayerConfigGroup = _styledComponents["default"].div(_templateObject5());

exports.StyledLayerConfigGroup = StyledLayerConfigGroup;

var StyledConfigGroupHeader = _styledComponents["default"].div(_templateObject6(), function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});

exports.StyledConfigGroupHeader = StyledConfigGroupHeader;

var ConfigGroupContent = _styledComponents["default"].div(_templateObject7());

var LayerConfigGroup =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(LayerConfigGroup, _Component);

  function LayerConfigGroup() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, LayerConfigGroup);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(LayerConfigGroup)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      collapsed: true
    });
    return _this;
  }

  (0, _createClass2["default"])(LayerConfigGroup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setCollapseState(this.props.expanded);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this._setCollapseState(nextProps.expanded);
    }
  }, {
    key: "_setCollapseState",
    value: function _setCollapseState(expanded) {
      // if props,expanded, and state collapsed, set collapsed to be false
      if (expanded && this.state.collapsed) {
        this.setState({
          collapsed: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          label = _this$props.label,
          children = _this$props.children,
          property = _this$props.property,
          layer = _this$props.layer,
          _onChange2 = _this$props.onChange,
          collapsible = _this$props.collapsible;
      var collapsed = this.state.collapsed;
      return _react["default"].createElement(StyledLayerConfigGroup, {
        className: (0, _classnames["default"])('layer-config-group', {
          collapsed: collapsed
        })
      }, _react["default"].createElement(StyledConfigGroupHeader, {
        className: "layer-config-group__header",
        onClick: function onClick() {
          return _this2.setState({
            collapsed: !_this2.state.collapsed
          });
        }
      }, _react["default"].createElement(StyledLayerConfigGroupLabel, {
        className: "layer-config-group__label"
      }, label), _react["default"].createElement(StyledLayerConfigGroupAction, {
        className: "layer-config-group__action"
      }, property ? _react["default"].createElement(_switch["default"], {
        checked: layer.config.visConfig[property],
        id: "".concat(layer.id, "-").concat(property),
        onChange: function onChange() {
          return _onChange2((0, _defineProperty2["default"])({}, property, !layer.config.visConfig[property]));
        }
      }) : null, collapsible ? _react["default"].createElement(_icons.VertThreeDots, {
        height: "18px"
      }) : null)), _react["default"].createElement(ConfigGroupContent, {
        className: (0, _classnames["default"])('layer-config-group__content', {
          disabled: property && !layer.config.visConfig[property]
        })
      }, children));
    }
  }]);
  return LayerConfigGroup;
}(_react.Component);

exports["default"] = LayerConfigGroup;
(0, _defineProperty2["default"])(LayerConfigGroup, "defaultProps", {
  collapsible: false,
  expanded: false,
  onChange: function onChange() {}
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlnLWdyb3VwLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlnR3JvdXBMYWJlbCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwidGV4dENvbG9yIiwiU3R5bGVkTGF5ZXJDb25maWdHcm91cEFjdGlvbiIsIkNvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJDb25maWdHcm91cENvbGxhcHNpYmxlSGVhZGVyIiwiU3R5bGVkTGF5ZXJDb25maWdHcm91cCIsIlN0eWxlZENvbmZpZ0dyb3VwSGVhZGVyIiwidGV4dENvbG9ySGwiLCJDb25maWdHcm91cENvbnRlbnQiLCJMYXllckNvbmZpZ0dyb3VwIiwiY29sbGFwc2VkIiwiX3NldENvbGxhcHNlU3RhdGUiLCJleHBhbmRlZCIsIm5leHRQcm9wcyIsInN0YXRlIiwic2V0U3RhdGUiLCJsYWJlbCIsImNoaWxkcmVuIiwicHJvcGVydHkiLCJsYXllciIsIm9uQ2hhbmdlIiwiY29sbGFwc2libGUiLCJjb25maWciLCJ2aXNDb25maWciLCJpZCIsImRpc2FibGVkIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLDJCQUEyQixHQUFHQyw2QkFBT0MsR0FBVixvQkFDYixVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFVBQWhCO0FBQUEsQ0FEUSxFQUU3QixVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlFLFNBQWhCO0FB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VUFBUSxzQ0FBR0YsUUFBSCxFQUFjLENBQUNDLEtBQUssQ0FBQ0csTUFBTixDQUFhQyxTQUFiLENBQXVCTCxRQUF2QixDQUFmLEVBREE7QUFBQTtBQUhaLFFBRE8sR0FRTCxJQVROLEVBVUdHLFdBQVcsR0FBRyxnQ0FBQyxvQkFBRDtBQUFlLFFBQUEsTUFBTSxFQUFDO0FBQXRCLFFBQUgsR0FBb0MsSUFWbEQsQ0FORixDQURGLEVBb0JFLGdDQUFDLGtCQUFEO0FBQ0UsUUFBQSxTQUFTLEVBQUUsNEJBQVcsNkJBQVgsRUFBMEM7QUFDbkRJLFVBQUFBLFFBQVEsRUFBRVAsUUFBUSxJQUFJLENBQUNDLEtBQUssQ0FBQ0csTUFBTixDQUFhQyxTQUFiLENBQXVCTCxRQUF2QjtBQUQ0QixTQUExQztBQURiLFNBS0dELFFBTEgsQ0FwQkYsQ0FERjtBQThCRDs7O0VBckUyQ1MsZ0I7OztpQ0FBekJqQixnQixrQkFFRztBQUNwQlksRUFBQUEsV0FBVyxFQUFFLEtBRE87QUFFcEJULEVBQUFBLFFBQVEsRUFBRSxLQUZVO0FBR3BCUSxFQUFBQSxRQUFRLEVBQUUsb0JBQU0sQ0FBRTtBQUhFLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5pbXBvcnQge1ZlcnRUaHJlZURvdHN9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExheWVyQ29uZmlnR3JvdXBMYWJlbCA9IHN0eWxlZC5kaXZgXG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMTJweDtcbiAgbWFyZ2luLWxlZnQ6IC0xMnB4O1xuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xuICBsZXR0ZXItc3BhY2luZzogMC4ycHg7XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkTGF5ZXJDb25maWdHcm91cEFjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG5gO1xuXG5leHBvcnQgY29uc3QgQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnbGF5ZXItY29uZmlnLWdyb3VwX19jb250ZW50X19jb2xsYXBzaWJsZSdcbn0pYFxuICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjNzIGVhc2Utb3V0O1xuICBoZWlnaHQ6IG1heC1jb250ZW50O1xuICBtYXgtaGVpZ2h0OiA2MDBweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBDb25maWdHcm91cENvbGxhcHNpYmxlSGVhZGVyID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2xheWVyLWNvbmZpZy1ncm91cF9faGVhZGVyX19jb2xsYXBzaWJsZSdcbn0pYFxuICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWF4LWhlaWdodDogMDtcbmBcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExheWVyQ29uZmlnR3JvdXAgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWxlZnQ6IDE4cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG5cbiAgJi5jb2xsYXBzZWQge1xuICAgIC5sYXllci1jb25maWctZ3JvdXBfX2hlYWRlcl9fY29sbGFwc2libGUge1xuICAgICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgICBtYXgtaGVpZ2h0OiA2MDBweDtcbiAgICB9XG4gICAgLmxheWVyLWNvbmZpZy1ncm91cF9fY29udGVudCB7XG5cbiAgICAgIC5sYXllci1jb25maWctZ3JvdXBfX2NvbnRlbnRfX2NvbGxhcHNpYmxlIHtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgbWF4LWhlaWdodDogMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRDb25maWdHcm91cEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAubGF5ZXItY29uZmlnLWdyb3VwX19sYWJlbCB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBib3JkZXItbGVmdDogMnB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cblxuICAgIC5sYXllci1jb25maWctZ3JvdXBfX2FjdGlvbiB7XG4gICAgICBjb2xvcjogICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgQ29uZmlnR3JvdXBDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgJi5kaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC4zO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICoge1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllckNvbmZpZ0dyb3VwIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGNvbGxhcHNpYmxlOiBmYWxzZSxcbiAgICBleHBhbmRlZDogZmFsc2UsXG4gICAgb25DaGFuZ2U6ICgpID0+IHt9XG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgY29sbGFwc2VkOiB0cnVlXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fc2V0Q29sbGFwc2VTdGF0ZSh0aGlzLnByb3BzLmV4cGFuZGVkKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgdGhpcy5fc2V0Q29sbGFwc2VTdGF0ZShuZXh0UHJvcHMuZXhwYW5kZWQpO1xuICB9XG5cbiAgX3NldENvbGxhcHNlU3RhdGUoZXhwYW5kZWQpIHtcbiAgICAvLyBpZiBwcm9wcyxleHBhbmRlZCwgYW5kIHN0YXRlIGNvbGxhcHNlZCwgc2V0IGNvbGxhcHNlZCB0byBiZSBmYWxzZVxuICAgIGlmIChleHBhbmRlZCAmJiB0aGlzLnN0YXRlLmNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29sbGFwc2VkOiBmYWxzZX0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBsYWJlbCxcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgcHJvcGVydHksXG4gICAgICBsYXllcixcbiAgICAgIG9uQ2hhbmdlLFxuICAgICAgY29sbGFwc2libGVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtjb2xsYXBzZWR9ID0gdGhpcy5zdGF0ZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJDb25maWdHcm91cCBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2xheWVyLWNvbmZpZy1ncm91cCcsIHtjb2xsYXBzZWR9KX0+XG4gICAgICAgIDxTdHlsZWRDb25maWdHcm91cEhlYWRlciBjbGFzc05hbWU9XCJsYXllci1jb25maWctZ3JvdXBfX2hlYWRlclwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5zZXRTdGF0ZSh7Y29sbGFwc2VkOiAhdGhpcy5zdGF0ZS5jb2xsYXBzZWR9KX1cbiAgICAgICAgPlxuICAgICAgICAgIDxTdHlsZWRMYXllckNvbmZpZ0dyb3VwTGFiZWwgY2xhc3NOYW1lPVwibGF5ZXItY29uZmlnLWdyb3VwX19sYWJlbFwiPlxuICAgICAgICAgICAge2xhYmVsfVxuICAgICAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cExhYmVsPlxuICAgICAgICAgIDxTdHlsZWRMYXllckNvbmZpZ0dyb3VwQWN0aW9uIGNsYXNzTmFtZT1cImxheWVyLWNvbmZpZy1ncm91cF9fYWN0aW9uXCI+XG4gICAgICAgICAgICB7cHJvcGVydHkgPyAoXG4gICAgICAgICAgICAgIDxTd2l0Y2hcbiAgICAgICAgICAgICAgICBjaGVja2VkPXtsYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XX1cbiAgICAgICAgICAgICAgICBpZD17YCR7bGF5ZXIuaWR9LSR7cHJvcGVydHl9YH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHtbcHJvcGVydHldOiAhbGF5ZXIuY29uZmlnLnZpc0NvbmZpZ1twcm9wZXJ0eV19KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2NvbGxhcHNpYmxlID8gPFZlcnRUaHJlZURvdHMgaGVpZ2h0PVwiMThweFwiLz4gOiBudWxsfVxuICAgICAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cEFjdGlvbj5cbiAgICAgICAgPC9TdHlsZWRDb25maWdHcm91cEhlYWRlcj5cbiAgICAgICAgPENvbmZpZ0dyb3VwQ29udGVudFxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnbGF5ZXItY29uZmlnLWdyb3VwX19jb250ZW50Jywge1xuICAgICAgICAgICAgZGlzYWJsZWQ6IHByb3BlcnR5ICYmICFsYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XVxuICAgICAgICAgIH0pfVxuICAgICAgICA+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0NvbmZpZ0dyb3VwQ29udGVudD5cbiAgICAgIDwvU3R5bGVkTGF5ZXJDb25maWdHcm91cD5cbiAgICApO1xuICB9XG59XG5cbiJdfQ==