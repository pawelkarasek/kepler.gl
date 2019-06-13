"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ModalFooter = exports.ModalTitle = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _icons = require("./icons");

var _styledComponents2 = require("./styled-components");

var _mediaBreakpoints = require("../../styles/media-breakpoints");

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding-left: 0;\n    padding-right: 0;\n  "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding-left: 24px;\n    padding-right: 24px;\n  "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  top: 0;\n  left: 0;\n  transition: ", ";\n  padding-left: 40px;\n  padding-right: 40px;\n\n  ", ";\n\n  ", ";\n\n  :focus {\n    outline: 0\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: flex-end;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  display: flex;\n  justify-content: flex-end;\n  z-index: 10005;\n  position: absolute;\n  top: 24px;\n  right: 24px;\n\n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding-top: 16px;\n  "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding-top: 24px;\n  "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  left: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  padding-top: 24px;\n  ", ";\n\n  ", ";\n  z-index: 10001;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: ", ";\n  color: ", ";\n  margin-bottom: 10px;\n  position: relative;\n  z-index: 10003;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  z-index: 10002;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding: 12px 36px 24px;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  overflow-y: scroll;\n  max-width: 960px;\n  max-height: 70vh;\n  padding: 24px 72px 40px;\n  position: relative;\n  top: 92px;\n  left: 0;\n  right: 0;\n  margin: 0 auto;\n  background-color: #ffffff;\n  border-radius: 4px;\n  transition: ", ";\n  box-sizing: border-box;\n  font-size: 12px;\n  color: ", ";\n  ", ";\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ModalContentWrapper = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.transition;
}, function (props) {
  return props.theme.labelColorLT;
}, function (props) {
  return props.cssStyle || '';
}, _mediaBreakpoints.media.portable(_templateObject2()));

var ModalContent = _styledComponents["default"].div(_templateObject3());

var ModalTitle = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.theme.modalTitleFontSize;
}, function (props) {
  return props.theme.modalTitleColor;
});

exports.ModalTitle = ModalTitle;

var StyledModalFooter = _styledComponents["default"].div(_templateObject5(), _mediaBreakpoints.media.portable(_templateObject6()), _mediaBreakpoints.media.palm(_templateObject7()));

var CloseButton = _styledComponents["default"].div(_templateObject8(), function (props) {
  return props.theme.titleColorLT;
});

var FooterActionWrapper = _styledComponents["default"].div(_templateObject9());

var defaultCancelButton = {
  link: true,
  large: true,
  children: 'Cancel'
};
var defaultConfirmButton = {
  large: true,
  width: '160px',
  children: 'Confirm'
};

var ModalFooter = function ModalFooter(_ref) {
  var cancel = _ref.cancel,
      confirm = _ref.confirm,
      cancelButton = _ref.cancelButton,
      confirmButton = _ref.confirmButton;
  var cancelButtonProps = (0, _objectSpread2["default"])({}, defaultCancelButton, cancelButton);
  var confirmButtonProps = (0, _objectSpread2["default"])({}, defaultConfirmButton, confirmButton);
  return _react["default"].createElement(StyledModalFooter, {
    className: "modal--footer"
  }, _react["default"].createElement(FooterActionWrapper, null, _react["default"].createElement(_styledComponents2.Button, (0, _extends2["default"])({}, cancelButtonProps, {
    onClick: cancel
  }), cancelButtonProps.children), _react["default"].createElement(_styledComponents2.Button, (0, _extends2["default"])({}, confirmButtonProps, {
    onClick: confirm
  }), confirmButtonProps.children)));
};

exports.ModalFooter = ModalFooter;

var ModalDialog =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ModalDialog, _Component);

  function ModalDialog() {
    (0, _classCallCheck2["default"])(this, ModalDialog);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ModalDialog).apply(this, arguments));
  }

  (0, _createClass2["default"])(ModalDialog, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return _react["default"].createElement(_reactModal["default"], (0, _extends2["default"])({
        className: this.props.className
      }, props, {
        ariaHideApp: false,
        style: {
          overlay: (0, _objectSpread2["default"])({
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }, props.style)
        }
      }), _react["default"].createElement(ModalContentWrapper, {
        className: "modal--wrapper",
        cssStyle: props.cssStyle,
        footer: props.footer
      }, props.close && _react["default"].createElement(CloseButton, {
        className: "modal--close",
        onClick: props.close
      }, _react["default"].createElement(_icons.Delete, {
        height: "14px"
      })), _react["default"].createElement("div", null, props.title && _react["default"].createElement(ModalTitle, {
        className: "modal--title"
      }, props.title), _react["default"].createElement(ModalContent, {
        className: "modal--body"
      }, props.children), props.footer && _react["default"].createElement(ModalFooter, {
        cancel: props.close,
        confirm: props.onConfirm,
        cancelButton: props.cancelButton,
        confirmButton: props.confirmButton
      }))));
    }
  }]);
  return ModalDialog;
}(_react.Component);

(0, _defineProperty2["default"])(ModalDialog, "propTypes", {
  footer: _propTypes["default"].bool,
  close: _propTypes["default"].func.isRequired,
  onConfirm: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  confirmButton: _propTypes["default"].object,
  confirmButtonLabel: _propTypes["default"].string,
  cancelButton: _propTypes["default"].object,
  cancelButtonLabel: _propTypes["default"].string,
  cssStyle: _propTypes["default"].arrayOf(_propTypes["default"].any)
});
(0, _defineProperty2["default"])(ModalDialog, "defaultProps", {
  footer: false,
  close: function close() {},
  onConfirm: function onConfirm() {},
  onCancel: function onCancel() {},
  cancelButton: defaultCancelButton,
  confirmButton: defaultConfirmButton,
  cssStyle: []
});
var StyledModal = (0, _styledComponents["default"])(ModalDialog)(_templateObject10(), function (props) {
  return props.theme.transition;
}, _mediaBreakpoints.media.portable(_templateObject11()), _mediaBreakpoints.media.palm(_templateObject12()));
var _default = StyledModal;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9tb2RhbC5qcyJdLCJuYW1lcyI6WyJNb2RhbENvbnRlbnRXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsInRyYW5zaXRpb24iLCJsYWJlbENvbG9yTFQiLCJjc3NTdHlsZSIsIm1lZGlhIiwicG9ydGFibGUiLCJNb2RhbENvbnRlbnQiLCJNb2RhbFRpdGxlIiwibW9kYWxUaXRsZUZvbnRTaXplIiwibW9kYWxUaXRsZUNvbG9yIiwiU3R5bGVkTW9kYWxGb290ZXIiLCJwYWxtIiwiQ2xvc2VCdXR0b24iLCJ0aXRsZUNvbG9yTFQiLCJGb290ZXJBY3Rpb25XcmFwcGVyIiwiZGVmYXVsdENhbmNlbEJ1dHRvbiIsImxpbmsiLCJsYXJnZSIsImNoaWxkcmVuIiwiZGVmYXVsdENvbmZpcm1CdXR0b24iLCJ3aWR0aCIsIk1vZGFsRm9vdGVyIiwiY2FuY2VsIiwiY29uZmlybSIsImNhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b24iLCJjYW5jZWxCdXR0b25Qcm9wcyIsImNvbmZpcm1CdXR0b25Qcm9wcyIsIk1vZGFsRGlhbG9nIiwiY2xhc3NOYW1lIiwib3ZlcmxheSIsImJhY2tncm91bmRDb2xvciIsInpJbmRleCIsInN0eWxlIiwiZm9vdGVyIiwiY2xvc2UiLCJ0aXRsZSIsIm9uQ29uZmlybSIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImJvb2wiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIm9uQ2FuY2VsIiwib2JqZWN0IiwiY29uZmlybUJ1dHRvbkxhYmVsIiwic3RyaW5nIiwiY2FuY2VsQnV0dG9uTGFiZWwiLCJhcnJheU9mIiwiYW55IiwiU3R5bGVkTW9kYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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LElBSkg7QUFLakJoQixFQUFBQSxhQUFhLEVBQUVjLHNCQUFVSyxNQUxSO0FBTWpCQyxFQUFBQSxrQkFBa0IsRUFBRU4sc0JBQVVPLE1BTmI7QUFPakJ0QixFQUFBQSxZQUFZLEVBQUVlLHNCQUFVSyxNQVBQO0FBUWpCRyxFQUFBQSxpQkFBaUIsRUFBRVIsc0JBQVVPLE1BUlo7QUFTakIzQyxFQUFBQSxRQUFRLEVBQUVvQyxzQkFBVVMsT0FBVixDQUFrQlQsc0JBQVVVLEdBQTVCO0FBVE8sQztpQ0FEZnJCLFcsa0JBYWtCO0FBQ3BCTSxFQUFBQSxNQUFNLEVBQUUsS0FEWTtBQUVwQkMsRUFBQUEsS0FBSyxFQUFFLGlCQUFNLENBQUUsQ0FGSztBQUdwQkUsRUFBQUEsU0FBUyxFQUFFLHFCQUFNLENBQUUsQ0FIQztBQUlwQk0sRUFBQUEsUUFBUSxFQUFFLG9CQUFNLENBQUUsQ0FKRTtBQUtwQm5CLEVBQUFBLFlBQVksRUFBRVQsbUJBTE07QUFNcEJVLEVBQUFBLGFBQWEsRUFBRU4sb0JBTks7QUFPcEJoQixFQUFBQSxRQUFRLEVBQUU7QUFQVSxDO0FBeUR4QixJQUFNK0MsV0FBVyxHQUFHLGtDQUFPdEIsV0FBUCxDQUFILHNCQUdELFVBQUE3QixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFVBQWhCO0FBQUEsQ0FISixFQU9iRyx3QkFBTUMsUUFQTyx1QkFZYkQsd0JBQU1PLElBWk8sc0JBQWpCO2VBc0JldUMsVyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgTW9kYWwgZnJvbSAncmVhY3QtbW9kYWwnO1xuaW1wb3J0IHtEZWxldGV9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7QnV0dG9ufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge21lZGlhfSBmcm9tICdzdHlsZXMvbWVkaWEtYnJlYWtwb2ludHMnO1xuXG5jb25zdCBNb2RhbENvbnRlbnRXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICBtYXgtd2lkdGg6IDk2MHB4O1xuICBtYXgtaGVpZ2h0OiA3MHZoO1xuICBwYWRkaW5nOiAyNHB4IDcycHggNDBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0b3A6IDkycHg7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBtYXJnaW46IDAgYXV0bztcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3JMVH07XG4gICR7cHJvcHMgPT4gcHJvcHMuY3NzU3R5bGUgfHwgJyd9O1xuICAke21lZGlhLnBvcnRhYmxlYFxuICAgIHBhZGRpbmc6IDEycHggMzZweCAyNHB4O1xuICBgfVxuYDtcblxuY29uc3QgTW9kYWxDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAxMDAwMjtcbmA7XG5cbmV4cG9ydCBjb25zdCBNb2RhbFRpdGxlID0gc3R5bGVkLmRpdmBcbiAgZm9udC1zaXplOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1vZGFsVGl0bGVGb250U2l6ZX07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1vZGFsVGl0bGVDb2xvcn07XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTAwMDM7XG5gO1xuXG5jb25zdCBTdHlsZWRNb2RhbEZvb3RlciA9IHN0eWxlZC5kaXZgXG4gIHdpZHRoOiAxMDAlO1xuICBsZWZ0OiAwO1xuICBib3R0b206IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIHBhZGRpbmctdG9wOiAyNHB4O1xuICAke21lZGlhLnBvcnRhYmxlYFxuICAgIHBhZGRpbmctdG9wOiAyNHB4O1xuICBgfTtcblxuICAke21lZGlhLnBhbG1gXG4gICAgcGFkZGluZy10b3A6IDE2cHg7XG4gIGB9O1xuICB6LWluZGV4OiAxMDAwMTtcbmA7XG5cbmNvbnN0IENsb3NlQnV0dG9uID0gc3R5bGVkLmRpdmBcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGl0bGVDb2xvckxUfTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgei1pbmRleDogMTAwMDU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyNHB4O1xuICByaWdodDogMjRweDtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgfVxuYDtcblxuY29uc3QgRm9vdGVyQWN0aW9uV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5gO1xuXG5jb25zdCBkZWZhdWx0Q2FuY2VsQnV0dG9uID0ge1xuICBsaW5rOiB0cnVlLFxuICBsYXJnZTogdHJ1ZSxcbiAgY2hpbGRyZW46ICdDYW5jZWwnXG59O1xuXG5jb25zdCBkZWZhdWx0Q29uZmlybUJ1dHRvbiA9IHtcbiAgbGFyZ2U6IHRydWUsXG4gIHdpZHRoOiAnMTYwcHgnLFxuICBjaGlsZHJlbjogJ0NvbmZpcm0nXG59O1xuXG5leHBvcnQgY29uc3QgTW9kYWxGb290ZXIgPSAoe1xuICBjYW5jZWwsXG4gIGNvbmZpcm0sXG4gIGNhbmNlbEJ1dHRvbixcbiAgY29uZmlybUJ1dHRvblxufSkgPT4ge1xuICBjb25zdCBjYW5jZWxCdXR0b25Qcm9wcyA9IHsuLi5kZWZhdWx0Q2FuY2VsQnV0dG9uLCAuLi5jYW5jZWxCdXR0b259O1xuICBjb25zdCBjb25maXJtQnV0dG9uUHJvcHMgPSB7Li4uZGVmYXVsdENvbmZpcm1CdXR0b24sIC4uLmNvbmZpcm1CdXR0b259O1xuICByZXR1cm4gKFxuICAgIDxTdHlsZWRNb2RhbEZvb3RlciBjbGFzc05hbWU9XCJtb2RhbC0tZm9vdGVyXCI+XG4gICAgICA8Rm9vdGVyQWN0aW9uV3JhcHBlcj5cbiAgICAgICAgPEJ1dHRvbiB7Li4uY2FuY2VsQnV0dG9uUHJvcHN9IG9uQ2xpY2s9e2NhbmNlbH0+XG4gICAgICAgICAge2NhbmNlbEJ1dHRvblByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPEJ1dHRvbiB7Li4uY29uZmlybUJ1dHRvblByb3BzfSBvbkNsaWNrPXtjb25maXJtfT5cbiAgICAgICAgICB7Y29uZmlybUJ1dHRvblByb3BzLmNoaWxkcmVufVxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvRm9vdGVyQWN0aW9uV3JhcHBlcj5cbiAgICA8L1N0eWxlZE1vZGFsRm9vdGVyPlxuICApO1xufTtcblxuY2xhc3MgTW9kYWxEaWFsb2cgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGZvb3RlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xvc2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25Db25maXJtOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29uZmlybUJ1dHRvbjogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBjb25maXJtQnV0dG9uTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2FuY2VsQnV0dG9uOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIGNhbmNlbEJ1dHRvbkxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNzc1N0eWxlOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgZm9vdGVyOiBmYWxzZSxcbiAgICBjbG9zZTogKCkgPT4ge30sXG4gICAgb25Db25maXJtOiAoKSA9PiB7fSxcbiAgICBvbkNhbmNlbDogKCkgPT4ge30sXG4gICAgY2FuY2VsQnV0dG9uOiBkZWZhdWx0Q2FuY2VsQnV0dG9uLFxuICAgIGNvbmZpcm1CdXR0b246IGRlZmF1bHRDb25maXJtQnV0dG9uLFxuICAgIGNzc1N0eWxlOiBbXVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cHJvcHN9ID0gdGhpcztcbiAgICByZXR1cm4gKFxuICAgICAgPE1vZGFsXG4gICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgYXJpYUhpZGVBcHA9e2ZhbHNlfVxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG92ZXJsYXk6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICAgICAgICB6SW5kZXg6IDEwMDAsXG4gICAgICAgICAgICAvLyBpbiBjYXNlIHdlIHdhbnQgdG8gb3ZlcnJpZGUgdGhlIG1vZGFsIGRpYWxvZyBzdHlsZVxuICAgICAgICAgICAgLi4ucHJvcHMuc3R5bGVcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxNb2RhbENvbnRlbnRXcmFwcGVyXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kYWwtLXdyYXBwZXJcIlxuICAgICAgICAgIGNzc1N0eWxlPXtwcm9wcy5jc3NTdHlsZX1cbiAgICAgICAgICBmb290ZXI9e3Byb3BzLmZvb3Rlcn1cbiAgICAgICAgPlxuICAgICAgICAgIHtwcm9wcy5jbG9zZSAmJiAoXG4gICAgICAgICAgICA8Q2xvc2VCdXR0b24gY2xhc3NOYW1lPVwibW9kYWwtLWNsb3NlXCIgb25DbGljaz17cHJvcHMuY2xvc2V9PlxuICAgICAgICAgICAgICA8RGVsZXRlIGhlaWdodD1cIjE0cHhcIiAvPlxuICAgICAgICAgICAgPC9DbG9zZUJ1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7cHJvcHMudGl0bGUgJiYgKFxuICAgICAgICAgICAgICA8TW9kYWxUaXRsZSBjbGFzc05hbWU9XCJtb2RhbC0tdGl0bGVcIj57cHJvcHMudGl0bGV9PC9Nb2RhbFRpdGxlPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxNb2RhbENvbnRlbnQgY2xhc3NOYW1lPVwibW9kYWwtLWJvZHlcIj57cHJvcHMuY2hpbGRyZW59PC9Nb2RhbENvbnRlbnQ+XG4gICAgICAgICAgICB7cHJvcHMuZm9vdGVyICYmIChcbiAgICAgICAgICAgICAgPE1vZGFsRm9vdGVyXG4gICAgICAgICAgICAgICAgY2FuY2VsPXtwcm9wcy5jbG9zZX1cbiAgICAgICAgICAgICAgICBjb25maXJtPXtwcm9wcy5vbkNvbmZpcm19XG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uPXtwcm9wcy5jYW5jZWxCdXR0b259XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbj17cHJvcHMuY29uZmlybUJ1dHRvbn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9Nb2RhbENvbnRlbnRXcmFwcGVyPlxuICAgICAgPC9Nb2RhbD5cbiAgICApO1xuICB9XG59XG5cbmNvbnN0IFN0eWxlZE1vZGFsID0gc3R5bGVkKE1vZGFsRGlhbG9nKWBcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuICBwYWRkaW5nLWxlZnQ6IDQwcHg7XG4gIHBhZGRpbmctcmlnaHQ6IDQwcHg7XG5cbiAgJHttZWRpYS5wb3J0YWJsZWBcbiAgICBwYWRkaW5nLWxlZnQ6IDI0cHg7XG4gICAgcGFkZGluZy1yaWdodDogMjRweDtcbiAgYH07XG5cbiAgJHttZWRpYS5wYWxtYFxuICAgIHBhZGRpbmctbGVmdDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICBgfTtcblxuICA6Zm9jdXMge1xuICAgIG91dGxpbmU6IDBcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgU3R5bGVkTW9kYWw7XG4iXX0=