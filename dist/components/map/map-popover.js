"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MapPopover = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents2 = require("../common/styled-components");

var _icons = require("../common/icons");

var _defaultSettings = require("../../constants/default-settings");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: 12px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n  padding-left: 14px;\n  margin-top: 12px;\n\n  svg {\n    margin-right: 4px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  left: 50%;\n  transform: rotate(30deg);\n  top: 10px;\n  color: ", ";\n\n  :hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  font-size: 11px;\n  font-weight: 500;\n  background-color: ", ";\n  color: ", ";\n  z-index: 1001;\n  position: absolute;\n  overflow-x: auto;\n\n  .gutter {\n    height: 6px;\n  }\n\n  table {\n    margin: 2px 12px 12px 12px;\n    width: auto;\n\n    tbody {\n      border-top: transparent;\n      border-bottom: transparent;\n    }\n\n    td {\n      border-color: transparent;\n      padding: 4px;\n      color: ", ";\n    }\n\n    td.row__value {\n      text-align: right;\n      font-weight: 500;\n      color: ", ";\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var MAX_WIDTH = 800;
var MAX_HEIGHT = 600;

var StyledMapPopover = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.scrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.textColorHl;
});

var StyledPin = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.linkBtnColor;
});

var StyledLayerName = (0, _styledComponents["default"])(_styledComponents2.CenterFlexbox)(_templateObject3(), function (props) {
  return props.theme.textColorHl;
});

var MapPopover =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(MapPopover, _Component);

  function MapPopover(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MapPopover);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MapPopover).call(this, props));
    _this.state = {
      isMouseOver: false,
      width: 380,
      height: 160
    };
    return _this;
  }

  (0, _createClass2["default"])(MapPopover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._setContainerSize();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._setContainerSize();
    }
  }, {
    key: "_setContainerSize",
    value: function _setContainerSize() {
      var node = this.popover;

      if (!node) {
        return;
      }

      var width = Math.min(node.scrollWidth, MAX_WIDTH);
      var height = Math.min(node.scrollHeight, MAX_HEIGHT);

      if (width !== this.state.width || height !== this.state.height) {
        this.setState({
          width: width,
          height: height
        });
      }
    }
  }, {
    key: "_getPosition",
    value: function _getPosition(x, y) {
      var topOffset = 30;
      var leftOffset = 30;
      var mapState = this.props.mapState;
      var _this$state = this.state,
          width = _this$state.width,
          height = _this$state.height;
      var pos = {};

      if (x + leftOffset + width > mapState.width) {
        pos.right = mapState.width - x + leftOffset;
      } else {
        pos.left = x + leftOffset;
      }

      if (y + topOffset + height > mapState.height) {
        pos.bottom = 10;
      } else {
        pos.top = y + topOffset;
      }

      return pos;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          x = _this$props.x,
          y = _this$props.y,
          isVisible = _this$props.isVisible,
          data = _this$props.data,
          layer = _this$props.layer,
          freezed = _this$props.freezed,
          fields = _this$props.fields,
          _this$props$fieldsToS = _this$props.fieldsToShow,
          fieldsToShow = _this$props$fieldsToS === void 0 ? [] : _this$props$fieldsToS;
      var hidden = !isVisible && !this.state.isMouseOver;
      var width = this.state.width;

      if (!data || !layer || !fieldsToShow.length) {
        return null;
      }

      var infoProps = {
        data: data,
        layer: layer,
        fieldsToShow: fieldsToShow,
        fields: fields
      };
      var style = Number.isFinite(x) && Number.isFinite(y) ? this._getPosition(x, y) : {};
      return _react["default"].createElement(StyledMapPopover, {
        ref: function ref(comp) {
          _this2.popover = comp;
        },
        className: (0, _classnames["default"])('map-popover', {
          hidden: hidden
        }),
        style: (0, _objectSpread2["default"])({}, style, {
          maxWidth: width
        }),
        onMouseEnter: function onMouseEnter() {
          _this2.setState({
            isMouseOver: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          _this2.setState({
            isMouseOver: false
          });
        }
      }, freezed ? _react["default"].createElement("div", {
        className: "map-popover__top"
      }, _react["default"].createElement("div", {
        className: "gutter"
      }), _react["default"].createElement(StyledPin, {
        className: "popover-pin",
        onClick: this.props.onClose
      }, _react["default"].createElement(_icons.Pin, {
        height: "16px"
      }))) : null, _react["default"].createElement(StyledLayerName, {
        className: "map-popover__layer-name"
      }, _react["default"].createElement(_icons.Layers, {
        height: "12px"
      }), layer.config.label), _react["default"].createElement("table", {
        className: "map-popover__table"
      }, layer.isAggregated ? _react["default"].createElement(CellInfo, infoProps) : _react["default"].createElement(EntryInfo, infoProps)));
    }
  }]);
  return MapPopover;
}(_react.Component);

exports.MapPopover = MapPopover;
(0, _defineProperty2["default"])(MapPopover, "propTypes", {
  fields: _propTypes["default"].arrayOf(_propTypes["default"].any),
  fieldsToShow: _propTypes["default"].arrayOf(_propTypes["default"].any),
  isVisible: _propTypes["default"].bool,
  layer: _propTypes["default"].object,
  data: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].any), _propTypes["default"].object]),
  freezed: _propTypes["default"].bool,
  x: _propTypes["default"].number,
  y: _propTypes["default"].number,
  onClose: _propTypes["default"].func,
  mapState: _propTypes["default"].object.isRequired
});

var Row = function Row(_ref) {
  var name = _ref.name,
      value = _ref.value,
      url = _ref.url;

  // Set 'url' to 'value' if it looks like a url
  if (!url && value && typeof value === 'string' && value.match(/^http/)) {
    url = value;
  }

  var asImg = /<img>/.test(name);
  var isRestaurants = name === 'restaurants';
  return _react["default"].createElement("tr", {
    className: "row",
    key: name
  }, _react["default"].createElement("td", {
    className: "row__name"
  }, name), _react["default"].createElement("td", {
    className: "row__value"
  }, asImg ? _react["default"].createElement("img", {
    src: value
  }) : url ? _react["default"].createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: url
  }, value) : isRestaurants ? _react["default"].createElement("pre", null, "value") : value));
};

var EntryInfo = function EntryInfo(_ref2) {
  var fieldsToShow = _ref2.fieldsToShow,
      fields = _ref2.fields,
      data = _ref2.data;
  return _react["default"].createElement("tbody", null, fieldsToShow.map(function (name) {
    return _react["default"].createElement(EntryInfoRow, {
      key: name,
      name: name,
      fields: fields,
      data: data
    });
  }));
};

var EntryInfoRow = function EntryInfoRow(_ref3) {
  var name = _ref3.name,
      fields = _ref3.fields,
      data = _ref3.data;
  var field = fields.find(function (f) {
    return f.name === name;
  });

  if (!field) {
    return null;
  }

  var valueIdx = field.tableFieldIndex - 1;

  var format = _getCellFormat(field.type);

  return _react["default"].createElement(Row, {
    name: name,
    value: format ? format(data[valueIdx]) : data[valueIdx]
  });
};

var CellInfo = function CellInfo(_ref4) {
  var data = _ref4.data,
      layer = _ref4.layer;
  var _layer$config = layer.config,
      colorField = _layer$config.colorField,
      sizeField = _layer$config.sizeField;
  return _react["default"].createElement("tbody", null, _react["default"].createElement(Row, {
    name: 'total points',
    key: "count",
    value: data.points && data.points.length
  }), colorField && layer.visualChannels.color ? _react["default"].createElement(Row, {
    name: layer.getVisualChannelDescription('color').measure,
    key: "color",
    value: data.colorValue || 'N/A'
  }) : null, sizeField && layer.visualChannels.size ? _react["default"].createElement(Row, {
    name: layer.getVisualChannelDescription('size').measure,
    key: "size",
    value: data.elevationValue || 'N/A'
  }) : null);
};

function _getCellFormat(type) {
  return _defaultSettings.FIELD_DISPLAY_FORMAT[type];
}

var MapPopoverFactory = function MapPopoverFactory() {
  return MapPopover;
};

var _default = MapPopoverFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtcG9wb3Zlci5qcyJdLCJuYW1lcyI6WyJNQVhfV0lEVEgiLCJNQVhfSEVJR0hUIiwiU3R5bGVkTWFwUG9wb3ZlciIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzY3JvbGxCYXIiLCJwYW5lbEJhY2tncm91bmQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsIlN0eWxlZFBpbiIsInByaW1hcnlCdG5CZ2QiLCJsaW5rQnRuQ29sb3IiLCJTdHlsZWRMYXllck5hbWUiLCJDZW50ZXJGbGV4Ym94IiwiTWFwUG9wb3ZlciIsInN0YXRlIiwiaXNNb3VzZU92ZXIiLCJ3aWR0aCIsImhlaWdodCIsIl9zZXRDb250YWluZXJTaXplIiwibm9kZSIsInBvcG92ZXIiLCJNYXRoIiwibWluIiwic2Nyb2xsV2lkdGgiLCJzY3JvbGxIZWlnaHQiLCJzZXRTdGF0ZSIsIngiLCJ5IiwidG9wT2Zmc2V0IiwibGVmdE9mZnNldCIsIm1hcFN0YXRlIiwicG9zIiwicmlnaHQiLCJsZWZ0IiwiYm90dG9tIiwidG9wIiwiaXNWaXNpYmxlIiwiZGF0YSIsImxheWVyIiwiZnJlZXplZCIsImZpZWxkcyIsImZpZWxkc1RvU2hvdyIsImhpZGRlbiIsImxlbmd0aCIsImluZm9Qcm9wcyIsInN0eWxlIiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJfZ2V0UG9zaXRpb24iLCJjb21wIiwibWF4V2lkdGgiLCJvbkNsb3NlIiwiY29uZmlnIiwibGFiZWwiLCJpc0FnZ3JlZ2F0ZWQiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJhcnJheU9mIiwiYW55IiwiYm9vbCIsIm9iamVjdCIsIm9uZU9mVHlwZSIsIm51bWJlciIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiUm93IiwibmFtZSIsInZhbHVlIiwidXJsIiwibWF0Y2giLCJhc0ltZyIsInRlc3QiLCJpc1Jlc3RhdXJhbnRzIiwiRW50cnlJbmZvIiwibWFwIiwiRW50cnlJbmZvUm93IiwiZmllbGQiLCJmaW5kIiwiZiIsInZhbHVlSWR4IiwidGFibGVGaWVsZEluZGV4IiwiZm9ybWF0IiwiX2dldENlbGxGb3JtYXQiLCJ0eXBlIiwiQ2VsbEluZm8iLCJjb2xvckZpZWxkIiwic2l6ZUZpZWxkIiwicG9pbnRzIiwidmlzdWFsQ2hhbm5lbHMiLCJjb2xvciIsImdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbiIsIm1lYXN1cmUiLCJjb2xvclZhbHVlIiwic2l6ZSIsImVsZXZhdGlvblZhbHVlIiwiRklFTERfRElTUExBWV9GT1JNQVQiLCJNYXBQb3BvdmVyRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLFNBQVMsR0FBRyxHQUFsQjtBQUNBLElBQU1DLFVBQVUsR0FBRyxHQUFuQjs7QUFFQSxJQUFNQyxnQkFBZ0IsR0FBR0MsNkJBQU9DLEdBQVYsb0JBQ2xCLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsU0FBaEI7QUFBQSxDQURhLEVBSUEsVUFBQUYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZRSxlQUFoQjtBQUFBLENBSkwsRUFLWCxVQUFBSCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlHLFNBQWhCO0FBQUEsQ0FMTSxFQTBCUCxVQUFBSixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlHLFNBQWhCO0FBQUEsQ0ExQkUsRUFnQ1AsVUFBQUosS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZSSxXQUFoQjtBQUFBLENBaENFLENBQXRCOztBQXFDQSxJQUFNQyxTQUFTLEdBQUdSLDZCQUFPQyxHQUFWLHFCQUtKLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWU0sYUFB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Q0Q7O0FBRUQsSUFBTWEsaUJBQWlCLEdBQUksU0FBckJBLGlCQUFxQjtBQUFBLFNBQU1uRixVQUFOO0FBQUEsQ0FBM0I7O2VBQ2VtRixpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQge0NlbnRlckZsZXhib3h9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7UGluLCBMYXllcnN9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7RklFTERfRElTUExBWV9GT1JNQVR9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgTUFYX1dJRFRIID0gODAwO1xuY29uc3QgTUFYX0hFSUdIVCA9IDYwMDtcblxuY29uc3QgU3R5bGVkTWFwUG9wb3ZlciA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Nyb2xsQmFyfVxuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgei1pbmRleDogMTAwMTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvdmVyZmxvdy14OiBhdXRvO1xuXG4gIC5ndXR0ZXIge1xuICAgIGhlaWdodDogNnB4O1xuICB9XG5cbiAgdGFibGUge1xuICAgIG1hcmdpbjogMnB4IDEycHggMTJweCAxMnB4O1xuICAgIHdpZHRoOiBhdXRvO1xuXG4gICAgdGJvZHkge1xuICAgICAgYm9yZGVyLXRvcDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItYm90dG9tOiB0cmFuc3BhcmVudDtcbiAgICB9XG5cbiAgICB0ZCB7XG4gICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgcGFkZGluZzogNHB4O1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICB9XG5cbiAgICB0ZC5yb3dfX3ZhbHVlIHtcbiAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZFBpbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogNTAlO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSgzMGRlZyk7XG4gIHRvcDogMTBweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZH07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGlua0J0bkNvbG9yfTtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTGF5ZXJOYW1lID0gc3R5bGVkKENlbnRlckZsZXhib3gpYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIHBhZGRpbmctbGVmdDogMTRweDtcbiAgbWFyZ2luLXRvcDogMTJweDtcblxuICBzdmcge1xuICAgIG1hcmdpbi1yaWdodDogNHB4O1xuICB9XG5gO1xuXG5leHBvcnQgY2xhc3MgTWFwUG9wb3ZlciBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBmaWVsZHNUb1Nob3c6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgIGlzVmlzaWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgbGF5ZXI6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZGF0YTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSksIFByb3BUeXBlcy5vYmplY3RdKSxcbiAgICBmcmVlemVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIHk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgbWFwU3RhdGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc01vdXNlT3ZlcjogZmFsc2UsXG4gICAgICB3aWR0aDogMzgwLFxuICAgICAgaGVpZ2h0OiAxNjBcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyU2l6ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIHRoaXMuX3NldENvbnRhaW5lclNpemUoKTtcbiAgfVxuXG4gIF9zZXRDb250YWluZXJTaXplKCkge1xuICAgIGNvbnN0IG5vZGUgPSB0aGlzLnBvcG92ZXI7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLm1pbihub2RlLnNjcm9sbFdpZHRoLCBNQVhfV0lEVEgpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWluKG5vZGUuc2Nyb2xsSGVpZ2h0LCBNQVhfSEVJR0hUKTtcblxuICAgIGlmICh3aWR0aCAhPT0gdGhpcy5zdGF0ZS53aWR0aCB8fCBoZWlnaHQgIT09IHRoaXMuc3RhdGUuaGVpZ2h0KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHt3aWR0aCwgaGVpZ2h0fSk7XG4gICAgfVxuICB9XG5cbiAgX2dldFBvc2l0aW9uKHgsIHkpIHtcbiAgICBjb25zdCB0b3BPZmZzZXQgPSAzMDtcbiAgICBjb25zdCBsZWZ0T2Zmc2V0ID0gMzA7XG4gICAgY29uc3Qge21hcFN0YXRlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge3dpZHRoLCBoZWlnaHR9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBwb3MgPSB7fTtcbiAgICBpZiAoeCArIGxlZnRPZmZzZXQgKyB3aWR0aCA+IG1hcFN0YXRlLndpZHRoKSB7XG4gICAgICBwb3MucmlnaHQgPSBtYXBTdGF0ZS53aWR0aCAtIHggKyBsZWZ0T2Zmc2V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBwb3MubGVmdCA9IHggKyBsZWZ0T2Zmc2V0O1xuICAgIH1cblxuICAgIGlmICh5ICsgdG9wT2Zmc2V0ICsgaGVpZ2h0ID4gbWFwU3RhdGUuaGVpZ2h0KSB7XG4gICAgICBwb3MuYm90dG9tID0gMTA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvcy50b3AgPSB5ICsgdG9wT2Zmc2V0O1xuICAgIH1cblxuICAgIHJldHVybiBwb3M7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgeCxcbiAgICAgIHksXG4gICAgICBpc1Zpc2libGUsXG4gICAgICBkYXRhLFxuICAgICAgbGF5ZXIsXG4gICAgICBmcmVlemVkLFxuICAgICAgZmllbGRzLFxuICAgICAgZmllbGRzVG9TaG93ID0gW11cbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBoaWRkZW4gPSAhaXNWaXNpYmxlICYmICF0aGlzLnN0YXRlLmlzTW91c2VPdmVyO1xuICAgIGNvbnN0IHt3aWR0aH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgaWYgKCFkYXRhIHx8ICFsYXllciB8fCAhZmllbGRzVG9TaG93Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgaW5mb1Byb3BzID0ge2RhdGEsIGxheWVyLCBmaWVsZHNUb1Nob3csIGZpZWxkc307XG5cbiAgICBjb25zdCBzdHlsZSA9XG4gICAgICBOdW1iZXIuaXNGaW5pdGUoeCkgJiYgTnVtYmVyLmlzRmluaXRlKHkpID8gdGhpcy5fZ2V0UG9zaXRpb24oeCwgeSkgOiB7fTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTWFwUG9wb3ZlclxuICAgICAgICByZWY9e2NvbXAgPT4ge1xuICAgICAgICAgIHRoaXMucG9wb3ZlciA9IGNvbXA7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnbWFwLXBvcG92ZXInLCB7aGlkZGVufSl9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgICAgbWF4V2lkdGg6IHdpZHRoXG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTW91c2VPdmVyOiB0cnVlfSk7XG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTW91c2VPdmVyOiBmYWxzZX0pO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7ZnJlZXplZCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyX190b3BcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3V0dGVyXCIgLz5cbiAgICAgICAgICAgIDxTdHlsZWRQaW4gY2xhc3NOYW1lPVwicG9wb3Zlci1waW5cIiBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xvc2V9PlxuICAgICAgICAgICAgICA8UGluIGhlaWdodD1cIjE2cHhcIiAvPlxuICAgICAgICAgICAgPC9TdHlsZWRQaW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8U3R5bGVkTGF5ZXJOYW1lIGNsYXNzTmFtZT1cIm1hcC1wb3BvdmVyX19sYXllci1uYW1lXCI+XG4gICAgICAgICAgPExheWVycyBoZWlnaHQ9XCIxMnB4XCIvPntsYXllci5jb25maWcubGFiZWx9PC9TdHlsZWRMYXllck5hbWU+XG4gICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtYXAtcG9wb3Zlcl9fdGFibGVcIj5cbiAgICAgICAgICB7bGF5ZXIuaXNBZ2dyZWdhdGVkID8gKFxuICAgICAgICAgICAgPENlbGxJbmZvIHsuLi5pbmZvUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFbnRyeUluZm8gey4uLmluZm9Qcm9wc30gLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L3RhYmxlPlxuICAgICAgPC9TdHlsZWRNYXBQb3BvdmVyPlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgUm93ID0gKHtuYW1lLCB2YWx1ZSwgdXJsfSkgPT4ge1xuICAvLyBTZXQgJ3VybCcgdG8gJ3ZhbHVlJyBpZiBpdCBsb29rcyBsaWtlIGEgdXJsXG4gIGlmICghdXJsICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUubWF0Y2goL15odHRwLykpIHtcbiAgICB1cmwgPSB2YWx1ZTtcbiAgfVxuXG4gIGNvbnN0IGFzSW1nID0gLzxpbWc+Ly50ZXN0KG5hbWUpO1xuICBjb25zdCBpc1Jlc3RhdXJhbnRzID1uYW1lID09PSAncmVzdGF1cmFudHMnO1xuICByZXR1cm4gKFxuICAgIDx0ciBjbGFzc05hbWU9XCJyb3dcIiBrZXk9e25hbWV9PlxuICAgICAgPHRkIGNsYXNzTmFtZT1cInJvd19fbmFtZVwiPntuYW1lfTwvdGQ+XG4gICAgICA8dGQgY2xhc3NOYW1lPVwicm93X192YWx1ZVwiPlxuICAgICAgICB7YXNJbWcgPyAoXG4gICAgICAgICAgPGltZyBzcmM9e3ZhbHVlfSAvPlxuICAgICAgICApIDogdXJsID8gKFxuICAgICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPXt1cmx9PlxuICAgICAgICAgICAge3ZhbHVlfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgKSA6aXNSZXN0YXVyYW50cyA/KFxuICAgICAgICAgIDxwcmU+dmFsdWU8L3ByZT5cbiAgICAgICAgKSA6KFxuICAgICAgICB2YWx1ZVxuICAgICAgICApfVxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICApO1xufTtcblxuY29uc3QgRW50cnlJbmZvID0gKHtmaWVsZHNUb1Nob3csIGZpZWxkcywgZGF0YX0pID0+IChcbiAgPHRib2R5PlxuICAgIHtmaWVsZHNUb1Nob3cubWFwKG5hbWUgPT4gKFxuICAgICAgPEVudHJ5SW5mb1JvdyBrZXk9e25hbWV9IG5hbWU9e25hbWV9IGZpZWxkcz17ZmllbGRzfSBkYXRhPXtkYXRhfSAvPlxuICAgICkpfVxuICA8L3Rib2R5PlxuKTtcblxuY29uc3QgRW50cnlJbmZvUm93ID0gKHtuYW1lLCBmaWVsZHMsIGRhdGF9KSA9PiB7XG4gIGNvbnN0IGZpZWxkID0gZmllbGRzLmZpbmQoZiA9PiBmLm5hbWUgPT09IG5hbWUpO1xuICBpZiAoIWZpZWxkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB2YWx1ZUlkeCA9IGZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDE7XG4gIGNvbnN0IGZvcm1hdCA9IF9nZXRDZWxsRm9ybWF0KGZpZWxkLnR5cGUpO1xuXG4gIHJldHVybiAoXG4gICAgPFJvdyBuYW1lPXtuYW1lfSB2YWx1ZT17Zm9ybWF0ID8gZm9ybWF0KGRhdGFbdmFsdWVJZHhdKSA6IGRhdGFbdmFsdWVJZHhdfSAvPlxuICApO1xufTtcblxuY29uc3QgQ2VsbEluZm8gPSAoe2RhdGEsIGxheWVyfSkgPT4ge1xuICBjb25zdCB7Y29sb3JGaWVsZCwgc2l6ZUZpZWxkfSA9IGxheWVyLmNvbmZpZztcblxuICByZXR1cm4gKFxuICAgIDx0Ym9keT5cbiAgICAgIDxSb3cgbmFtZT17J3RvdGFsIHBvaW50cyd9IGtleT1cImNvdW50XCIgdmFsdWU9e2RhdGEucG9pbnRzICYmIGRhdGEucG9pbnRzLmxlbmd0aH0gLz5cbiAgICAgIHtjb2xvckZpZWxkICYmIGxheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yID8gKFxuICAgICAgICA8Um93XG4gICAgICAgICAgbmFtZT17bGF5ZXIuZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKCdjb2xvcicpLm1lYXN1cmV9XG4gICAgICAgICAga2V5PVwiY29sb3JcIlxuICAgICAgICAgIHZhbHVlPXtkYXRhLmNvbG9yVmFsdWUgfHwgJ04vQSd9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICAgIHtzaXplRmllbGQgJiYgbGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSA/IChcbiAgICAgICAgPFJvd1xuICAgICAgICAgIG5hbWU9e2xheWVyLmdldFZpc3VhbENoYW5uZWxEZXNjcmlwdGlvbignc2l6ZScpLm1lYXN1cmV9XG4gICAgICAgICAga2V5PVwic2l6ZVwiXG4gICAgICAgICAgdmFsdWU9e2RhdGEuZWxldmF0aW9uVmFsdWUgfHwgJ04vQSd9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L3Rib2R5PlxuICApO1xufTtcblxuZnVuY3Rpb24gX2dldENlbGxGb3JtYXQodHlwZSkge1xuICByZXR1cm4gRklFTERfRElTUExBWV9GT1JNQVRbdHlwZV07XG59XG5cbmNvbnN0IE1hcFBvcG92ZXJGYWN0b3J5ID0gICgpID0+IE1hcFBvcG92ZXI7XG5leHBvcnQgZGVmYXVsdCBNYXBQb3BvdmVyRmFjdG9yeTtcbiJdfQ==