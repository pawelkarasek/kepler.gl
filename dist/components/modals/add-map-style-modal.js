"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _reactMapGl = _interopRequireDefault(require("react-map-gl"));

var _reactDom = require("react-dom");

var _styledComponents2 = require("../common/styled-components");

var _mediaBreakpoints = require("../../styles/media-breakpoints");

var _mapboxUtils = require("../../utils/map-style-utils/mapbox-utils");

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-weight: 500;\n  \n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  border-radius: 4px;\n  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.18);\n  width: ", "px;\n  height: ", "px;\n  position: relative;\n  \n  .preview-image-placeholder {\n    position: absolute;\n    top: 0;\n    left: 0;\n  }\n\n  .preview-image-spinner {\n    position: absolute;\n    left: calc(50% - 25px);\n    top: calc(50% - 25px);\n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-left: unset;\n    .preview-title {\n      margin-top: 0px;\n    }\n  "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-left: 32px;\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 116px;\n  flex-shrink: 0;\n\n  .preview-title {\n    font-weight: 500;\n    font-size: 10px;\n    padding: 8px 0px;\n  }\n  \n  .preview-title.error {\n    color: ", ";\n  }\n  \n  ", ";\n  \n  ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 16px;\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 24px;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 32px;\n\n  .modal-section-title {\n    font-weight: 500;\n  }\n  .modal-section-subtitle {\n    color: ", ";\n  }\n  \n  input {\n    margin-top: 8px;\n  }\n  \n  ", ";\n  ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n      margin-top: 0;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  font-size: 12px;\n  \n  .modal-section:first-child {\n    margin-top: 24px;\n    ", ";\n  }\n  \n  input {\n    margin-right: 8px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var MapH = 190;
var MapW = 264;
var ErrorMsg = {
  styleError: 'Failed to load map style, make sure it is published. For private style, paste in your access token.'
};

var InstructionPanel = _styledComponents["default"].div(_templateObject(), _mediaBreakpoints.media.palm(_templateObject2()));

var StyledModalSection = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.theme.subtextColorLT;
}, _mediaBreakpoints.media.portable(_templateObject4()), _mediaBreakpoints.media.palm(_templateObject5()));

var PreviewMap = _styledComponents["default"].div(_templateObject6(), function (props) {
  return props.theme.errorColor;
}, _mediaBreakpoints.media.portable(_templateObject7()), _mediaBreakpoints.media.palm(_templateObject8()));

var StyledPreviewImage = _styledComponents["default"].div(_templateObject9(), function (props) {
  return props.theme.modalImagePlaceHolder;
}, MapW, MapH);

var InlineLink = _styledComponents["default"].a(_templateObject10());

var AddMapStyleModal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(AddMapStyleModal, _Component);

  function AddMapStyleModal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, AddMapStyleModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(AddMapStyleModal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      reRenderKey: 0
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadMapStyleJson", function (style) {
      _this.props.loadCustomMapStyle({
        style: style,
        error: false
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadMapStyleIcon", function () {
      if (_this.mapRef) {
        var canvas = (0, _reactDom.findDOMNode)(_this.mapRef).querySelector('.mapboxgl-canvas');
        var dataUri = canvas.toDataURL();

        _this.props.loadCustomMapStyle({
          icon: dataUri
        });
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadMaoStyleError", function () {
      _this.props.loadCustomMapStyle({
        error: true
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(AddMapStyleModal, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.inputStyle.accessToken !== nextProps.inputStyle.accessToken) {
        // toke has changed
        // ReactMapGl doesn't re-create map when token has changed
        // here we force the map to update
        this.setState({
          reRenderKey: this.state.reRenderKey + 1
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var map = this.mapRef && this.mapRef.getMap();

      if (map && this._map !== map) {
        this._map = map;
        map.on('style.load', function () {
          var style = map.getStyle();

          _this2.loadMapStyleJson(style);
        });
        map.on('render', function () {
          if (map.isStyleLoaded()) {
            _this2.loadMapStyleIcon();
          }
        });
        map.on('error', function () {
          _this2.loadMaoStyleError();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          inputStyle = _this$props.inputStyle,
          mapState = _this$props.mapState;
      var mapProps = (0, _objectSpread2["default"])({}, mapState, {
        preserveDrawingBuffer: true,
        mapboxApiAccessToken: inputStyle.accessToken || this.props.mapboxApiAccessToken,
        transformRequest: _mapboxUtils.transformRequest
      });
      return _react["default"].createElement("div", {
        className: "add-map-style-modal"
      }, _react["default"].createElement(_styledComponents2.StyledModalContent, null, _react["default"].createElement(InstructionPanel, null, _react["default"].createElement(StyledModalSection, {
        className: "modal-section"
      }, _react["default"].createElement("div", {
        className: "modal-section-title"
      }, "1. Publish your style at mapbox or provide access token"), _react["default"].createElement("div", {
        className: "modal-section-subtitle"
      }, "You can create your own map style at", _react["default"].createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/studio/styles/"
      }, " mapbox"), " and", _react["default"].createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/help/studio-manual-publish/"
      }, " publish"), " it."), _react["default"].createElement("div", {
        className: "modal-section-subtitle"
      }, "To use private style, paste your", _react["default"].createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/help/how-access-tokens-work/"
      }, " access token"), " here. *kepler.gl is a client-side application, data stays in your browser.."), _react["default"].createElement(_styledComponents2.InputLight, {
        type: "text",
        value: inputStyle.accessToken || '',
        onChange: function onChange(_ref) {
          var value = _ref.target.value;
          return _this3.props.inputMapStyle((0, _objectSpread2["default"])({}, inputStyle, {
            accessToken: value
          }));
        },
        placeholder: "e.g. pk.abcdefg.xxxxxx"
      })), _react["default"].createElement(StyledModalSection, {
        className: "modal-section"
      }, _react["default"].createElement("div", {
        className: "modal-section-title"
      }, "2. Paste style url"), _react["default"].createElement("div", {
        className: "modal-section-subtitle"
      }, "What is a", _react["default"].createElement(InlineLink, {
        target: "_blank",
        href: "https://www.mapbox.com/help/studio-manual-publish/#style-url"
      }, " style URL")), _react["default"].createElement(_styledComponents2.InputLight, {
        type: "text",
        value: inputStyle.url || '',
        onChange: function onChange(_ref2) {
          var value = _ref2.target.value;
          return _this3.props.inputMapStyle((0, _objectSpread2["default"])({}, inputStyle, {
            url: value
          }));
        },
        placeholder: "e.g. mapbox://styles/uberdataviz/abcdefghijklmnopq"
      })), _react["default"].createElement(StyledModalSection, {
        className: "modal-section"
      }, _react["default"].createElement("div", {
        className: "modal-section-title"
      }, "3. Name your style"), _react["default"].createElement(_styledComponents2.InputLight, {
        type: "text",
        value: inputStyle.label || '',
        onChange: function onChange(_ref3) {
          var value = _ref3.target.value;
          return _this3.props.inputMapStyle((0, _objectSpread2["default"])({}, inputStyle, {
            label: value
          }));
        }
      }))), _react["default"].createElement(PreviewMap, null, _react["default"].createElement("div", {
        className: (0, _classnames["default"])('preview-title', {
          error: inputStyle.error
        })
      }, inputStyle.error ? ErrorMsg.styleError : inputStyle.style && inputStyle.style.name || ''), _react["default"].createElement(StyledPreviewImage, {
        className: "preview-image"
      }, !inputStyle.isValid ? _react["default"].createElement("div", {
        className: "preview-image-spinner"
      }) : _react["default"].createElement(_styledComponents2.StyledMapContainer, null, _react["default"].createElement(_reactMapGl["default"], (0, _extends2["default"])({}, mapProps, {
        ref: function ref(el) {
          _this3.mapRef = el;
        },
        key: this.state.reRenderKey,
        width: MapW,
        height: MapH,
        mapStyle: inputStyle.url
      })))))));
    }
  }]);
  return AddMapStyleModal;
}(_react.Component);

(0, _defineProperty2["default"])(AddMapStyleModal, "propTypes", {
  mapState: _propTypes["default"].object.isRequired,
  inputMapStyle: _propTypes["default"].func.isRequired,
  loadCustomMapStyle: _propTypes["default"].func.isRequired,
  inputStyle: _propTypes["default"].object.isRequired
});

var AddMapStyleModalFactory = function AddMapStyleModalFactory() {
  return AddMapStyleModal;
};

var _default = AddMapStyleModalFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9hZGQtbWFwLXN0eWxlLW1vZGFsLmpzIl0sIm5hbWVzIjpbIk1hcEgiLCJNYXBXIiwiRXJyb3JNc2ciLCJzdHlsZUVycm9yIiwiSW5zdHJ1Y3Rpb25QYW5lbCIsInN0eWxlZCIsImRpdiIsIm1lZGlhIiwicGFsbSIsIlN0eWxlZE1vZGFsU2VjdGlvbiIsInByb3BzIiwidGhlbWUiLCJzdWJ0ZXh0Q29sb3JMVCIsInBvcnRhYmxlIiwiUHJldmlld01hcCIsImVycm9yQ29sb3IiLCJTdHlsZWRQcmV2aWV3SW1hZ2UiLCJtb2RhbEltYWdlUGxhY2VIb2xkZXIiLCJJbmxpbmVMaW5rIiwiYSIsIkFkZE1hcFN0eWxlTW9kYWwiLCJyZVJlbmRlcktleSIsInN0eWxlIiwibG9hZEN1c3RvbU1hcFN0eWxlIiwiZXJyb3IiLCJtYXBSZWYiLCJjYW52YXMiLCJxdWVyeVNlbGVjdG9yIiwiZGF0YVVyaSIsInRvRGF0YVVSTCIsImljb24iLCJuZXh0UHJvcHMiLCJpbnB1dFN0eWxlIiwiYWNjZXNzVG9rZW4iLCJzZXRTdGF0ZSIsInN0YXRlIiwibWFwIiwiZ2V0TWFwIiwiX21hcCIsIm9uIiwiZ2V0U3R5bGUiLCJsb2FkTWFwU3R5bGVKc29uIiwiaXNTdHlsZUxvYWRlZCIsImxvYWRNYXBTdHlsZUljb24iLCJsb2FkTWFvU3R5bGVFcnJvciIsIm1hcFN0YXRlIiwibWFwUHJvcHMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsInRyYW5zZm9ybVJlcXVlc3QiLCJ2YWx1ZSIsInRhcmdldCIsImlucHV0TWFwU3R5bGUiLCJ1cmwiLCJsYWJlbCIsIm5hbWUiLCJpc1ZhbGlkIiwiZWwiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZnVuYyIsIkFkZE1hcFN0eWxlTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7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USxFQUFFZ0MsVUFBVSxDQUFDcUI7QUFSdkIsU0FERixDQUhKLENBSkYsQ0ExQ0YsQ0FERixDQURGO0FBb0VEOzs7RUE3STRCSyxnQjs7aUNBQXpCdEMsZ0IsZUFDZTtBQUNqQnlCLEVBQUFBLFFBQVEsRUFBRWMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBRFY7QUFFakJULEVBQUFBLGFBQWEsRUFBRU8sc0JBQVVHLElBQVYsQ0FBZUQsVUFGYjtBQUdqQnRDLEVBQUFBLGtCQUFrQixFQUFFb0Msc0JBQVVHLElBQVYsQ0FBZUQsVUFIbEI7QUFJakI3QixFQUFBQSxVQUFVLEVBQUUyQixzQkFBVUMsTUFBVixDQUFpQkM7QUFKWixDOztBQStJckIsSUFBTUUsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQjtBQUFBLFNBQU0zQyxnQkFBTjtBQUFBLENBQWhDOztlQUNlMkMsdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IE1hcGJveEdMTWFwIGZyb20gJ3JlYWN0LW1hcC1nbCc7XG5pbXBvcnQge2ZpbmRET01Ob2RlfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtTdHlsZWRNb2RhbENvbnRlbnQsIElucHV0TGlnaHQsIFN0eWxlZE1hcENvbnRhaW5lcn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHttZWRpYX0gZnJvbSAnc3R5bGVzL21lZGlhLWJyZWFrcG9pbnRzJztcblxuLy8gVXRpbHNcbmltcG9ydCB7dHJhbnNmb3JtUmVxdWVzdH0gZnJvbSAndXRpbHMvbWFwLXN0eWxlLXV0aWxzL21hcGJveC11dGlscyc7XG5cbmNvbnN0IE1hcEggPSAxOTA7XG5jb25zdCBNYXBXID0gMjY0O1xuY29uc3QgRXJyb3JNc2cgPSB7XG4gIHN0eWxlRXJyb3IgOiAnRmFpbGVkIHRvIGxvYWQgbWFwIHN0eWxlLCBtYWtlIHN1cmUgaXQgaXMgcHVibGlzaGVkLiBGb3IgcHJpdmF0ZSBzdHlsZSwgcGFzdGUgaW4geW91ciBhY2Nlc3MgdG9rZW4uJ1xufTtcblxuY29uc3QgSW5zdHJ1Y3Rpb25QYW5lbCA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBmb250LXNpemU6IDEycHg7XG4gIFxuICAubW9kYWwtc2VjdGlvbjpmaXJzdC1jaGlsZCB7XG4gICAgbWFyZ2luLXRvcDogMjRweDtcbiAgICAke21lZGlhLnBhbG1gXG4gICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIGB9O1xuICB9XG4gIFxuICBpbnB1dCB7XG4gICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gIH1cbmA7XG5cbmNvbnN0IFN0eWxlZE1vZGFsU2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1ib3R0b206IDMycHg7XG5cbiAgLm1vZGFsLXNlY3Rpb24tdGl0bGUge1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIH1cbiAgLm1vZGFsLXNlY3Rpb24tc3VidGl0bGUge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvckxUfTtcbiAgfVxuICBcbiAgaW5wdXQge1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgfVxuICBcbiAgJHttZWRpYS5wb3J0YWJsZWBcbiAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBgfTtcbiAgJHttZWRpYS5wYWxtYFxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIGB9O1xuYDtcblxuY29uc3QgUHJldmlld01hcCA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tbGVmdDogMTE2cHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xuXG4gIC5wcmV2aWV3LXRpdGxlIHtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBwYWRkaW5nOiA4cHggMHB4O1xuICB9XG4gIFxuICAucHJldmlldy10aXRsZS5lcnJvciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZXJyb3JDb2xvcn07XG4gIH1cbiAgXG4gICR7bWVkaWEucG9ydGFibGVgXG4gICAgbWFyZ2luLWxlZnQ6IDMycHg7XG4gIGB9O1xuICBcbiAgJHttZWRpYS5wYWxtYFxuICAgIG1hcmdpbi1sZWZ0OiB1bnNldDtcbiAgICAucHJldmlldy10aXRsZSB7XG4gICAgICBtYXJnaW4tdG9wOiAwcHg7XG4gICAgfVxuICBgfTtcbmA7XG5cbmNvbnN0IFN0eWxlZFByZXZpZXdJbWFnZSA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxJbWFnZVBsYWNlSG9sZGVyfTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3gtc2hhZG93OiAwIDhweCAxNnB4IDAgcmdiYSgwLDAsMCwwLjE4KTtcbiAgd2lkdGg6ICR7TWFwV31weDtcbiAgaGVpZ2h0OiAke01hcEh9cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgXG4gIC5wcmV2aWV3LWltYWdlLXBsYWNlaG9sZGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gIH1cblxuICAucHJldmlldy1pbWFnZS1zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogY2FsYyg1MCUgLSAyNXB4KTtcbiAgICB0b3A6IGNhbGMoNTAlIC0gMjVweCk7XG4gIH1cbmA7XG5cbmNvbnN0IElubGluZUxpbmsgPSBzdHlsZWQuYWBcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuXG5jbGFzcyBBZGRNYXBTdHlsZU1vZGFsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBtYXBTdGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgIGlucHV0TWFwU3R5bGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgbG9hZEN1c3RvbU1hcFN0eWxlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGlucHV0U3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIHJlUmVuZGVyS2V5OiAwXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBpZiAodGhpcy5wcm9wcy5pbnB1dFN0eWxlLmFjY2Vzc1Rva2VuICE9PSBuZXh0UHJvcHMuaW5wdXRTdHlsZS5hY2Nlc3NUb2tlbikge1xuICAgICAgLy8gdG9rZSBoYXMgY2hhbmdlZFxuICAgICAgLy8gUmVhY3RNYXBHbCBkb2Vzbid0IHJlLWNyZWF0ZSBtYXAgd2hlbiB0b2tlbiBoYXMgY2hhbmdlZFxuICAgICAgLy8gaGVyZSB3ZSBmb3JjZSB0aGUgbWFwIHRvIHVwZGF0ZVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHJlUmVuZGVyS2V5OiB0aGlzLnN0YXRlLnJlUmVuZGVyS2V5ICsgMVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IG1hcCA9IHRoaXMubWFwUmVmICYmIHRoaXMubWFwUmVmLmdldE1hcCgpO1xuICAgIGlmIChtYXAgJiYgdGhpcy5fbWFwICE9PSBtYXApIHtcbiAgICAgIHRoaXMuX21hcCA9IG1hcDtcblxuICAgICAgbWFwLm9uKCdzdHlsZS5sb2FkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdHlsZSA9IG1hcC5nZXRTdHlsZSgpO1xuICAgICAgICB0aGlzLmxvYWRNYXBTdHlsZUpzb24oc3R5bGUpO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcC5vbigncmVuZGVyJywgKCkgPT4ge1xuICAgICAgICBpZiAobWFwLmlzU3R5bGVMb2FkZWQoKSkge1xuICAgICAgICAgIHRoaXMubG9hZE1hcFN0eWxlSWNvbigpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgbWFwLm9uKCdlcnJvcicsICgpID0+IHtcbiAgICAgICAgdGhpcy5sb2FkTWFvU3R5bGVFcnJvcigpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBsb2FkTWFwU3R5bGVKc29uID0gKHN0eWxlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5sb2FkQ3VzdG9tTWFwU3R5bGUoe3N0eWxlLCBlcnJvcjogZmFsc2V9KTtcbiAgfTtcblxuICBsb2FkTWFwU3R5bGVJY29uID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLm1hcFJlZikge1xuICAgICAgY29uc3QgY2FudmFzID0gZmluZERPTU5vZGUodGhpcy5tYXBSZWYpLnF1ZXJ5U2VsZWN0b3IoJy5tYXBib3hnbC1jYW52YXMnKTtcbiAgICAgIGNvbnN0IGRhdGFVcmkgPSBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgICB0aGlzLnByb3BzLmxvYWRDdXN0b21NYXBTdHlsZSh7XG4gICAgICAgIGljb246IGRhdGFVcmlcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBsb2FkTWFvU3R5bGVFcnJvciA9ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLmxvYWRDdXN0b21NYXBTdHlsZSh7ZXJyb3I6IHRydWV9KTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2lucHV0U3R5bGUsIG1hcFN0YXRlfSA9IHRoaXMucHJvcHM7XG5cbiAgY29uc3QgbWFwUHJvcHMgPSB7XG4gICAgLi4ubWFwU3RhdGUsXG4gICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlLFxuICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBpbnB1dFN0eWxlLmFjY2Vzc1Rva2VuIHx8IHRoaXMucHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgdHJhbnNmb3JtUmVxdWVzdFxuICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWRkLW1hcC1zdHlsZS1tb2RhbFwiPlxuICAgICAgICA8U3R5bGVkTW9kYWxDb250ZW50PlxuICAgICAgICAgIDxJbnN0cnVjdGlvblBhbmVsPlxuICAgICAgICAgICAgPFN0eWxlZE1vZGFsU2VjdGlvbiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvbi10aXRsZVwiPjEuIFB1Ymxpc2ggeW91ciBzdHlsZSBhdCBtYXBib3ggb3IgcHJvdmlkZSBhY2Nlc3MgdG9rZW48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uLXN1YnRpdGxlXCI+XG4gICAgICAgICAgICAgICAgWW91IGNhbiBjcmVhdGUgeW91ciBvd24gbWFwIHN0eWxlIGF0XG4gICAgICAgICAgICAgICAgPElubGluZUxpbmsgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1hcGJveC5jb20vc3R1ZGlvL3N0eWxlcy9cIj4gbWFwYm94PC9JbmxpbmVMaW5rPiBhbmRcbiAgICAgICAgICAgICAgICA8SW5saW5lTGluayB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9oZWxwL3N0dWRpby1tYW51YWwtcHVibGlzaC9cIj4gcHVibGlzaDwvSW5saW5lTGluaz4gaXQuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLXNlY3Rpb24tc3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICBUbyB1c2UgcHJpdmF0ZSBzdHlsZSwgcGFzdGUgeW91clxuICAgICAgICAgICAgICAgIDxJbmxpbmVMaW5rIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5tYXBib3guY29tL2hlbHAvaG93LWFjY2Vzcy10b2tlbnMtd29yay9cIj4gYWNjZXNzIHRva2VuPC9JbmxpbmVMaW5rPiBoZXJlLiAqa2VwbGVyLmdsIGlzIGEgY2xpZW50LXNpZGUgYXBwbGljYXRpb24sIGRhdGEgc3RheXMgaW4geW91ciBicm93c2VyLi5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxJbnB1dExpZ2h0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFN0eWxlLmFjY2Vzc1Rva2VuIHx8ICcnfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoe3RhcmdldDoge3ZhbHVlfX0pID0+IHRoaXMucHJvcHMuaW5wdXRNYXBTdHlsZSh7Li4uaW5wdXRTdHlsZSwgYWNjZXNzVG9rZW46IHZhbHVlfSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJlLmcuIHBrLmFiY2RlZmcueHh4eHh4XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkTW9kYWxTZWN0aW9uPlxuICAgICAgICAgICAgPFN0eWxlZE1vZGFsU2VjdGlvbiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvbi10aXRsZVwiPjIuIFBhc3RlIHN0eWxlIHVybDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLXNlY3Rpb24tc3VidGl0bGVcIj5cbiAgICAgICAgICAgICAgICBXaGF0IGlzIGFcbiAgICAgICAgICAgICAgICA8SW5saW5lTGluayB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWFwYm94LmNvbS9oZWxwL3N0dWRpby1tYW51YWwtcHVibGlzaC8jc3R5bGUtdXJsXCI+IHN0eWxlIFVSTDwvSW5saW5lTGluaz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxJbnB1dExpZ2h0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtpbnB1dFN0eWxlLnVybCB8fCAnJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB0aGlzLnByb3BzLmlucHV0TWFwU3R5bGUoey4uLmlucHV0U3R5bGUsIHVybDogdmFsdWV9KX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cImUuZy4gbWFwYm94Oi8vc3R5bGVzL3ViZXJkYXRhdml6L2FiY2RlZmdoaWprbG1ub3BxXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvU3R5bGVkTW9kYWxTZWN0aW9uPlxuICAgICAgICAgICAgPFN0eWxlZE1vZGFsU2VjdGlvbiBjbGFzc05hbWU9XCJtb2RhbC1zZWN0aW9uXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtc2VjdGlvbi10aXRsZVwiPjMuIE5hbWUgeW91ciBzdHlsZTwvZGl2PlxuICAgICAgICAgICAgICA8SW5wdXRMaWdodFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17aW5wdXRTdHlsZS5sYWJlbCB8fCAnJ31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB0aGlzLnByb3BzLmlucHV0TWFwU3R5bGUoey4uLmlucHV0U3R5bGUsIGxhYmVsOiB2YWx1ZX0pfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9TdHlsZWRNb2RhbFNlY3Rpb24+XG4gICAgICAgICAgPC9JbnN0cnVjdGlvblBhbmVsPlxuICAgICAgICAgIDxQcmV2aWV3TWFwPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3ByZXZpZXctdGl0bGUnLCB7ZXJyb3I6IGlucHV0U3R5bGUuZXJyb3J9KX0+XG4gICAgICAgICAgICAgIHtpbnB1dFN0eWxlLmVycm9yID8gRXJyb3JNc2cuc3R5bGVFcnJvciA6XG4gICAgICAgICAgICAgICAgKGlucHV0U3R5bGUuc3R5bGUgJiYgaW5wdXRTdHlsZS5zdHlsZS5uYW1lKSB8fCAnJ308L2Rpdj5cbiAgICAgICAgICAgIDxTdHlsZWRQcmV2aWV3SW1hZ2UgY2xhc3NOYW1lPVwicHJldmlldy1pbWFnZVwiPlxuICAgICAgICAgICAgICB7IWlucHV0U3R5bGUuaXNWYWxpZCA/XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2aWV3LWltYWdlLXNwaW5uZXJcIi8+IDpcbiAgICAgICAgICAgICAgICA8U3R5bGVkTWFwQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgPE1hcGJveEdMTWFwXG4gICAgICAgICAgICAgICAgICAgIHsuLi5tYXBQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgcmVmPXtlbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXBSZWYgPSBlbDtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAga2V5PXt0aGlzLnN0YXRlLnJlUmVuZGVyS2V5fVxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17TWFwV31cbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXtNYXBIfVxuICAgICAgICAgICAgICAgICAgICBtYXBTdHlsZT17aW5wdXRTdHlsZS51cmx9Lz5cbiAgICAgICAgICAgICAgICA8L1N0eWxlZE1hcENvbnRhaW5lcj5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9TdHlsZWRQcmV2aWV3SW1hZ2U+XG4gICAgICAgICAgPC9QcmV2aWV3TWFwPlxuICAgICAgICA8L1N0eWxlZE1vZGFsQ29udGVudD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgQWRkTWFwU3R5bGVNb2RhbEZhY3RvcnkgPSAoKSA9PiBBZGRNYXBTdHlsZU1vZGFsO1xuZXhwb3J0IGRlZmF1bHQgQWRkTWFwU3R5bGVNb2RhbEZhY3Rvcnk7XG4iXX0=