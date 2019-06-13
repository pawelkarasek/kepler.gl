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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _uploadButton = _interopRequireDefault(require("./upload-button"));

var _icons = require("../icons");

var _loadingSpinner = _interopRequireDefault(require("../loading-spinner"));

var _utils = require("../../../utils/utils");

var _mediaBreakpoints = require("../../../styles/media-breakpoints");

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin: 0 auto;\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 16px;\n  "]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 24px;\n  "]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 32px;\n  ", ";\n  ", "\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .filter-upload__input {\n    visibility: hidden;\n    height: 0;\n    position: absolute;\n  }\n\n  .file-drop {\n    position: relative;\n  }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 8px;\n  "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 16px;\n  "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 24px;\n  ", ";\n  ", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 8px;\n  "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin-bottom: 16px;\n  "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  margin-bottom: 48px;\n  \n  ", ";\n  ", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: 20px;\n  height: 36px;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    padding: 16px 4px 0;\n  "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: white;\n  border-radius: 4px;\n  border-style: dashed;\n  border-width: 1px;\n  border-color: ", ";\n  text-align: center;\n  width: 100%;\n  padding: 48px 8px 0;\n\n  .file-upload-or {\n    color: ", ";\n    padding-right: 4px;\n  }\n  \n  ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 10px;\n  color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    font-size: 12px;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: 14px;\n  margin-bottom: 12px;\n  \n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var FileDrop = typeof document !== 'undefined' ? require('react-file-drop') : null; // File.type is not reliable if the OS does not have a
// registered mapping for the extension.
// NOTE: Shapefiles must be in a compressed format since
// it requires multiple files to be present.

var defaultValidFileExt = ['csv', // 'tar.gz',
// 'tgz',
// 'zip',
// 'gpx',
// 'kml',
'json', 'geojson'];
var MESSAGE = ' Drag & Drop Your File(s) Here';
var CHROME_MSG = '*Chrome user: Limit file size to 250mb, if need to upload larger file, try Safari';
var DISCLAIMER = '*Kepler.gl is a client-side application with no server backend. Data lives only on your machine/browser. ' + 'No information or map data is sent to any server.';
var CONFIG_UPLOAD_MESSAGE = 'Upload data files or upload a saved map via previously exported single Json of both config and data';
var fileIconColor = '#D3D8E0';

var StyledUploadMessage = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.textColorLT;
}, _mediaBreakpoints.media.portable(_templateObject2()));

var WarningMsg = _styledComponents["default"].span(_templateObject3(), function (props) {
  return props.theme.errorColor;
});

var PositiveMsg = _styledComponents["default"].span(_templateObject4(), function (props) {
  return props.theme.primaryBtnActBgd;
});

var StyledFileDrop = _styledComponents["default"].div(_templateObject5(), function (props) {
  return props.theme.subtextColorLT;
}, function (props) {
  return props.theme.linkBtnColor;
}, _mediaBreakpoints.media.portable(_templateObject6()));

var MsgWrapper = _styledComponents["default"].div(_templateObject7(), function (props) {
  return props.theme.modalTitleColor;
});

var StyledDragNDropIcon = _styledComponents["default"].div(_templateObject8(), fileIconColor, _mediaBreakpoints.media.portable(_templateObject9()), _mediaBreakpoints.media.palm(_templateObject10()));

var StyledFileTypeFow = _styledComponents["default"].div(_templateObject11(), _mediaBreakpoints.media.portable(_templateObject12()), _mediaBreakpoints.media.palm(_templateObject13()));

var StyledFileUpload = _styledComponents["default"].div(_templateObject14());

var StyledMessage = _styledComponents["default"].div(_templateObject15());

var StyledDragFileWrapper = _styledComponents["default"].div(_templateObject16(), _mediaBreakpoints.media.portable(_templateObject17()), _mediaBreakpoints.media.portable(_templateObject18()));

var StyledDisclaimer = (0, _styledComponents["default"])(StyledMessage)(_templateObject19());

var FileUpload =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(FileUpload, _Component);

  function FileUpload() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, FileUpload);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(FileUpload)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      dragOver: false,
      files: [],
      errorFiles: []
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isValidFileType", function (filename) {
      var validFileExt = _this.props.validFileExt;
      var fileExt = validFileExt.find(function (ext) {
        return filename.endsWith(ext);
      });
      return Boolean(fileExt);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleFileInput", function (files, e) {
      if (e) {
        e.stopPropagation();
      }

      var nextState = {
        files: [],
        errorFiles: [],
        dragOver: false
      };

      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        if (file && _this._isValidFileType(file.name)) {
          nextState.files.push(file);
        } else {
          nextState.errorFiles.push(file.name);
        }
      }

      _this.setState(nextState, function () {
        return nextState.files.length ? _this.props.onFileUpload(nextState.files) : null;
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleDragState", function (newState) {
      _this.setState({
        dragOver: newState
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(FileUpload, [{
    key: "_renderMessage",
    value: function _renderMessage() {
      var _this$state = this.state,
          errorFiles = _this$state.errorFiles,
          files = _this$state.files;

      if (errorFiles.length) {
        return _react["default"].createElement(WarningMsg, null, "File ".concat(errorFiles.join(', '), " is not supported."));
      }

      if (!files.length) {
        return null;
      }

      return _react["default"].createElement(StyledMessage, {
        className: "file-uploader__message"
      }, _react["default"].createElement("div", null, "Uploading..."), _react["default"].createElement(PositiveMsg, null, "".concat(files.map(function (f) {
        return f.name;
      }).join(' and '), "...")), _react["default"].createElement(_loadingSpinner["default"], {
        size: 20
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          dragOver = _this$state2.dragOver,
          files = _this$state2.files;
      var validFileExt = this.props.validFileExt;
      return _react["default"].createElement(StyledFileUpload, {
        className: "file-uploader",
        ref: function ref(cmp) {
          return _this2.frame = cmp;
        }
      }, _react["default"].createElement("input", {
        className: "filter-upload__input",
        type: "file",
        onChange: this._onChange
      }), FileDrop ? _react["default"].createElement(FileDrop, {
        frame: this.frame,
        targetAlwaysVisible: true,
        onDragOver: function onDragOver() {
          return _this2._toggleDragState(true);
        },
        onDragLeave: function onDragLeave() {
          return _this2._toggleDragState(false);
        },
        onDrop: this._handleFileInput
      }, _react["default"].createElement(StyledUploadMessage, {
        className: "file-upload__message"
      }, CONFIG_UPLOAD_MESSAGE), _react["default"].createElement(StyledFileDrop, {
        dragOver: dragOver
      }, _react["default"].createElement("div", {
        style: {
          opacity: dragOver ? 0.5 : 1
        }
      }, _react["default"].createElement(StyledDragNDropIcon, null, _react["default"].createElement(StyledFileTypeFow, {
        className: "file-type-row"
      }, validFileExt.map(function (ext) {
        return _react["default"].createElement(_icons.FileType, {
          key: ext,
          ext: ext,
          height: "50px",
          fontSize: "9px"
        });
      })), _react["default"].createElement(_icons.DragNDrop, {
        height: "44px"
      })), _react["default"].createElement("div", null, this._renderMessage())), !files.length ? _react["default"].createElement(StyledDragFileWrapper, null, _react["default"].createElement(MsgWrapper, null, MESSAGE), _react["default"].createElement("span", {
        className: "file-upload-or"
      }, "or"), _react["default"].createElement(_uploadButton["default"], {
        onUpload: this._handleFileInput
      }, "browse your files")) : null, _react["default"].createElement(StyledDisclaimer, null, DISCLAIMER))) : null, _react["default"].createElement(WarningMsg, null, (0, _utils.isChrome)() ? CHROME_MSG : ''));
    }
  }]);
  return FileUpload;
}(_react.Component);

exports["default"] = FileUpload;
(0, _defineProperty2["default"])(FileUpload, "defaultProps", {
  validFileExt: defaultValidFileExt
});
(0, _defineProperty2["default"])(FileUpload, "propTypes", {
  onFileUpload: _propTypes["default"].func.isRequired,
  validFileExt: _propTypes["default"].arrayOf(_propTypes["default"].string)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9maWxlLXVwbG9hZGVyL2ZpbGUtdXBsb2FkLmpzIl0sIm5hbWVzIjpbIkZpbGVEcm9wIiwiZG9jdW1lbnQiLCJyZXF1aXJlIiwiZGVmYXVsdFZhbGlkRmlsZUV4dCIsIk1FU1NBR0UiLCJDSFJPTUVfTVNHIiwiRElTQ0xBSU1FUiIsIkNPTkZJR19VUExPQURfTUVTU0FHRSIsImZpbGVJY29uQ29sb3IiLCJTdHlsZWRVcGxvYWRNZXNzYWdlIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsInRleHRDb2xvckxUIiwibWVkaWEiLCJwb3J0YWJsZSIsIldhcm5pbmdNc2ciLCJzcGFuIiwiZXJyb3JDb2xvciIsIlBvc2l0aXZlTXNnIiwicHJpbWFyeUJ0bkFjdEJnZCIsIlN0eWxlZEZpbGVEcm9wIiwic3VidGV4dENvbG9yTFQiLCJsaW5rQnRuQ29sb3IiLCJNc2dXcmFwcGVyIiwibW9kYWxUaXRsZUNvbG9yIiwiU3R5bGVkRHJhZ05Ecm9wSWNvbiIsInBhbG0iLCJTdHlsZWRGaWxlVHlwZUZvdyIsIlN0eWxlZEZpbGVVcGxvYWQiLCJTdHlsZWRNZXNzYWdlIiwiU3R5bGVkRHJhZ0ZpbGVXcmFwcGVyIiwiU3R5bGVkRGlzY2xhaW1lciIsIkZpbGVVcGxvYWQiLCJkcmFnT3ZlciIsImZpbGVzIiwiZXJyb3JGaWxlcyIsImZpbGVuYW1lIiwidmFsaWRGaWxlRXh0IiwiZmlsZUV4dCIsImZpbmQiLCJleHQiLCJlbmRzV2l0aCIsIkJvb2xlYW4iLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwibmV4dFN0YXRlIiwiaSIsImxlbmd0aCIsImZpbGUiLCJfaXNWYWxpZEZpbGVUeXBlIiwibmFtZSIsInB1c2giLCJzZXRTdGF0ZSIsIm9uRmlsZVVwbG9hZCIsIm5ld1N0YXRlIiwic3RhdGUiLCJqb2luIiwibWFwIiwiZiIsImNtcCIsImZyYW1lIiwiX29uQ2hhbmdlIiwiX3RvZ2dsZURyYWdTdGF0ZSIsIl9oYW5kbGVGaWxlSW5wdXQiLCJvcGFjaXR5IiwiX3JlbmRlck1lc3NhZ2UiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsImFycmF5T2YiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUSxHQUNaLE9BQU9DLFFBQVAsS0FBb0IsV0FBcEIsR0FBa0NDLE9BQU8sQ0FBQyxpQkFBRCxDQUF6QyxHQUErRCxJQURqRSxDLENBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBTUMsbUJBQW1CLEdBQUcsQ0FDMUIsS0FEMEIsRUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BUDBCLEVBUTFCLFNBUjBCLENBQTVCO0FBV0EsSUFBTUMsT0FBTyxHQUFHLGdDQUFoQjtBQUNBLElBQU1DLFVBQVUsR0FDZCxtRkFERjtBQUVBLElBQU1DLFVBQVUsR0FBRyw4R0FDakIsbURBREY7QUFFQSxJQUFNQyxxQkFBcUIsR0FBRyxxR0FBOUI7QUFFQSxJQUFNQyxhQUFhLEdBQUcsU0FBdEI7O0FBRUEsSUFBTUMsbUJBQW1CLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUNkLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsV0FBaEI7QUFBQSxDQURTLEVBS3JCQyx3QkFBTUMsUUFMZSxxQkFBekI7O0FBVUEsSUFBTUMsVUFBVSxHQUFHUCw2QkFBT1EsSUFBVixxQkFFTCxVQUFBTixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlNLFVBQWhCO0FBQUEsQ0FGQSxDQUFoQjs7QUFLQSxJQUFNQyxXQUFXLEdBQUdWLDZCQUFPUSxJQUFWLHFCQUNOLFVBQUFOLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWVEsZ0JBQWhCO0FBQUEsQ0FEQyxDQUFqQjs7QUFJQSxJQUFNQyxjQUFjLEdBQUdaLDZCQUFPQyxHQUFWLHFCQUtGLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWVUsY0FBaEI7QUFBQSxDQUxILEVBV1AsVUFBQVgsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZVyxZQUFoQjtBQUFBLENBWEUsRUFlaEJULHdCQUFNQyxRQWZVLHFCQUFwQjs7QUFvQkEsSUFBTVMsVUFBVSxHQUFHZiw2QkFBT0MsR0FBVixxQkFDTCxVQUFBQyxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlhLGVBQWhCO0FBQUEsQ0FEQSxDQUFoQjs7QUFNQSxJQUFNQyxtQkFBbUIsR0FBR2pCLDZCQUFPQyxHQUFWLHFCQUNkSCxhQURjLEVBSXJCTyx3QkFBTUMsUUFKZSxzQkFPckJELHdCQUFNYSxJQVBlLHNCQUF6Qjs7QUFZQSxJQUFNQyxpQkFBaUIsR0FBR25CLDZCQUFPQyxHQUFWLHNCQUVuQkksd0JBQU1DLFFBRmEsdUJBS25CRCx3QkFBTWEsSUFMYSxzQkFBdkI7O0FBVUEsSUFBTUUsZ0JBQWdCLEdBQUdwQiw2QkFBT0MsR0FBVixxQkFBdEI7O0FBWUEsSUFBTW9CLGFBQWEsR0FBR3JCLDZCQUFPQyxHQUFWLHFCQUFuQjs7QUFNQSxJQUFNcUIscUJBQXFCLEdBQUd0Qiw2QkFBT0MsR0FBVixzQkFFdkJJLHdCQUFNQyxRQUZpQix1QkFLdkJELHdCQUFNQyxRQUxpQixzQkFBM0I7O0FBVUEsSUFBTWlCLGdCQUFnQixHQUFHLGtDQUFPRixhQUFQLENBQUgscUJBQXRCOztJQUlxQkcsVTs7Ozs7Ozs7Ozs7Ozs7Ozs7OEZBVVg7QUFDTkMsTUFBQUEsUUFBUSxFQUFFLEtBREo7QUFFTkMsTUFBQUEsS0FBSyxFQUFFLEVBRkQ7QUFHTkMsTUFBQUEsVUFBVSxFQUFFO0FBSE4sSzt5R0FNVyxVQUFBQyxRQUFRLEVBQUk7QUFBQSxVQUN0QkMsWUFEc0IsR0FDTixNQUFLM0IsS0FEQyxDQUN0QjJCLFlBRHNCO0FBRTdCLFVBQU1DLE9BQU8sR0FBR0QsWUFBWSxDQUFDRSxJQUFiLENBQWtCLFVBQUFDLEdBQUc7QUFBQSxlQUFJSixRQUFRLENBQUNLLFFBQVQsQ0FBa0JELEdBQWxCLENBQUo7QUFBQSxPQUFyQixDQUFoQjtBQUVBLGFBQU9FLE9BQU8sQ0FBQ0osT0FBRCxDQUFkO0FBQ0QsSzt5R0FFa0IsVUFBQ0osS0FBRCxFQUFRUyxDQUFSLEVBQWM7QUFDL0IsVUFBSUEsQ0FBSixFQUFPO0FBQ0xBLFFBQUFBLENBQUMsQ0FBQ0MsZUFBRjtBQUNEOztBQUVELFVBQU1DLFNBQVMsR0FBRztBQUFDWCxRQUFBQSxLQUFLLEVBQUUsRUFBUjtBQUFZQyxRQUFBQSxVQUFVLEVBQUUsRUFBeEI7QUFBNEJGLFFBQUFBLFFBQVEsRUFBRTtBQUF0QyxPQUFsQjs7QUFDQSxXQUFLLElBQUlhLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdaLEtBQUssQ0FBQ2EsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDckMsWUFBTUUsSUFBSSxHQUFHZCxLQUFLLENBQUNZLENBQUQsQ0FBbEI7O0FBRUEsWUFBSUUsSUFBSSxJQUFJLE1BQUtDLGdCQUFMLENBQXNCRCxJQUFJLENBQUNFLElBQTNCLENBQVosRUFBOEM7QUFDNUNMLFVBQUFBLFNBQVMsQ0FBQ1gsS0FBVixDQUFnQmlCLElBQWhCLENBQXFCSCxJQUFyQjtBQUNELFNBRkQsTUFFTztBQUNMSCxVQUFBQSxTQUFTLENBQUNWLFVBQVYsQ0FBcUJnQixJQUFyQixDQUEwQkgsSUFBSSxDQUFDRSxJQUEvQjtBQUNEO0FBQ0Y7O0FBRUQsWUFBS0UsUUFBTCxDQUNFUCxTQURGLEVBRUU7QUFBQSxlQUNFQSxTQUFTLENBQUNYLEtBQVYsQ0FBZ0JhLE1BQWhCLEdBQXlCLE1BQUtyQyxLQUFMLENBQVcyQyxZQUFYLENBQXdCUixTQUFTLENBQUNYLEtBQWxDLENBQXpCLEdBQW9FLElBRHRFO0FBQUEsT0FGRjtBQUtELEs7eUdBRWtCLFVBQUFvQixRQUFRLEVBQUk7QUFDN0IsWUFBS0YsUUFBTCxDQUFjO0FBQUNuQixRQUFBQSxRQUFRLEVBQUVxQjtBQUFYLE9BQWQ7QUFDRCxLOzs7Ozs7cUNBRWdCO0FBQUEsd0JBQ2EsS0FBS0MsS0FEbEI7QUFBQSxVQUNScEIsVUFEUSxlQUNSQSxVQURRO0FBQUEsVUFDSUQsS0FESixlQUNJQSxLQURKOztBQUdmLFVBQUlDLFVBQVUsQ0FBQ1ksTUFBZixFQUF1QjtBQUNyQixlQUNFLGdDQUFDLFVBQUQsdUJBQ1daLFVBQVUsQ0FBQ3FCLElBQVgsQ0FBZ0IsSUFBaEIsQ0FEWCx3QkFERjtBQUtEOztBQUVELFVBQUksQ0FBQ3RCLEtBQUssQ0FBQ2EsTUFBWCxFQUFtQjtBQUNqQixlQUFPLElBQVA7QUFDRDs7QUFFRCxhQUNFLGdDQUFDLGFBQUQ7QUFBZSxRQUFBLFNBQVMsRUFBQztBQUF6QixTQUNFLDREQURGLEVBRUUsZ0NBQUMsV0FBRCxrQkFDTWIsS0FBSyxDQUFDdUIsR0FBTixDQUFVLFVBQUFDLENBQUM7QUFBQSxlQUFJQSxDQUFDLENBQUNSLElBQU47QUFBQSxPQUFYLEVBQXVCTSxJQUF2QixDQUE0QixPQUE1QixDQUROLFNBRkYsRUFLRSxnQ0FBQywwQkFBRDtBQUFnQixRQUFBLElBQUksRUFBRTtBQUF0QixRQUxGLENBREY7QUFTRDs7OzZCQUVRO0FBQUE7O0FBQUEseUJBQ21CLEtBQUtELEtBRHhCO0FBQUEsVUFDQXRCLFFBREEsZ0JBQ0FBLFFBREE7QUFBQSxVQUNVQyxLQURWLGdCQUNVQSxLQURWO0FBQUEsVUFFQUcsWUFGQSxHQUVnQixLQUFLM0IsS0FGckIsQ0FFQTJCLFlBRkE7QUFHUCxhQUNFLGdDQUFDLGdCQUFEO0FBQ0UsUUFBQSxTQUFTLEVBQUMsZUFEWjtBQUVFLFFBQUEsR0FBRyxFQUFFLGFBQUFzQixHQUFHO0FBQUEsaUJBQUssTUFBSSxDQUFDQyxLQUFMLEdBQWFELEdBQWxCO0FBQUE7QUFGVixTQUlFO0FBQ0UsUUFBQSxTQUFTLEVBQUMsc0JBRFo7QUFFRSxRQUFBLElBQUksRUFBQyxNQUZQO0FBR0UsUUFBQSxRQUFRLEVBQUUsS0FBS0U7QUFIakIsUUFKRixFQVNHL0QsUUFBUSxHQUNQLGdDQUFDLFFBQUQ7QUFDRSxRQUFBLEtBQUssRUFBRSxLQUFLOEQsS0FEZDtBQUVFLFFBQUEsbUJBQW1CLE1BRnJCO0FBR0UsUUFBQSxVQUFVLEVBQUU7QUFBQSxpQkFBTSxNQUFJLENBQUNFLGdCQUFMLENBQXNCLElBQXRCLENBQU47QUFBQSxTQUhkO0FBSUUsUUFBQSxXQUFXLEVBQUU7QUFBQSxpQkFBTSxNQUFJLENBQUNBLGdCQUFMLENBQXNCLEtBQXRCLENBQU47QUFBQSxTQUpmO0FBS0UsUUFBQSxNQUFNLEVBQUUsS0FBS0M7QUFMZixTQU9FLGdDQUFDLG1CQUFEO0FBQXFCLFFBQUEsU0FBUyxFQUFDO0FBQS9CLFNBQXVEMUQscUJBQXZELENBUEYsRUFRRSxnQ0FBQyxjQUFEO0FBQWdCLFFBQUEsUUFBUSxFQUFFNEI7QUFBMUIsU0FDRTtBQUFLLFFBQUEsS0FBSyxFQUFFO0FBQUMrQixVQUFBQSxPQUFPLEVBQUUvQixRQUFRLEdBQUcsR0FBSCxHQUFTO0FBQTNCO0FBQVosU0FDRSxnQ0FBQyxtQkFBRCxRQUNFLGdDQUFDLGlCQUFEO0FBQW1CLFFBQUEsU0FBUyxFQUFDO0FBQTdCLFNBQ0dJLFlBQVksQ0FBQ29CLEdBQWIsQ0FBaUIsVUFBQWpCLEdBQUc7QUFBQSxlQUNuQixnQ0FBQyxlQUFEO0FBQVUsVUFBQSxHQUFHLEVBQUVBLEdBQWY7QUFBb0IsVUFBQSxHQUFHLEVBQUVBLEdBQXpCO0FBQThCLFVBQUEsTUFBTSxFQUFDLE1BQXJDO0FBQTRDLFVBQUEsUUFBUSxFQUFDO0FBQXJELFVBRG1CO0FBQUEsT0FBcEIsQ0FESCxDQURGLEVBTUUsZ0NBQUMsZ0JBQUQ7QUFBVyxRQUFBLE1BQU0sRUFBQztBQUFsQixRQU5GLENBREYsRUFTRSw2Q0FBTSxLQUFLeUIsY0FBTCxFQUFOLENBVEYsQ0FERixFQVlHLENBQUMvQixLQUFLLENBQUNhLE1BQVAsR0FDRyxnQ0FBQyxxQkFBRCxRQUNFLGdDQUFDLFVBQUQsUUFBYTdDLE9BQWIsQ0FERixFQUVFO0FBQU0sUUFBQSxTQUFTLEVBQUM7QUFBaEIsY0FGRixFQUdFLGdDQUFDLHdCQUFEO0FBQWMsUUFBQSxRQUFRLEVBQUUsS0FBSzZEO0FBQTdCLDZCQUhGLENBREgsR0FRRyxJQXBCTixFQXFCRSxnQ0FBQyxnQkFBRCxRQUFtQjNELFVBQW5CLENBckJGLENBUkYsQ0FETyxHQWlDTCxJQTFDTixFQTRDRSxnQ0FBQyxVQUFELFFBQWEseUJBQWFELFVBQWIsR0FBMEIsRUFBdkMsQ0E1Q0YsQ0FERjtBQWdERDs7O0VBL0hxQytELGdCOzs7aUNBQW5CbEMsVSxrQkFDRztBQUNwQkssRUFBQUEsWUFBWSxFQUFFcEM7QUFETSxDO2lDQURIK0IsVSxlQUtBO0FBQ2pCcUIsRUFBQUEsWUFBWSxFQUFFYyxzQkFBVUMsSUFBVixDQUFlQyxVQURaO0FBRWpCaEMsRUFBQUEsWUFBWSxFQUFFOEIsc0JBQVVHLE9BQVYsQ0FBa0JILHNCQUFVSSxNQUE1QjtBQUZHLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IFVwbG9hZEJ1dHRvbiBmcm9tICcuL3VwbG9hZC1idXR0b24nO1xuaW1wb3J0IHtGaWxlVHlwZSwgRHJhZ05Ecm9wfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSAnY29tcG9uZW50cy9jb21tb24vbG9hZGluZy1zcGlubmVyJztcbmltcG9ydCB7aXNDaHJvbWV9IGZyb20gJ3V0aWxzL3V0aWxzJztcbi8vIEJyZWFrcG9pbnRzXG5pbXBvcnQge21lZGlhfSBmcm9tICdzdHlsZXMvbWVkaWEtYnJlYWtwb2ludHMnO1xuXG5jb25zdCBGaWxlRHJvcCA9XG4gIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCdyZWFjdC1maWxlLWRyb3AnKSA6IG51bGw7XG5cbi8vIEZpbGUudHlwZSBpcyBub3QgcmVsaWFibGUgaWYgdGhlIE9TIGRvZXMgbm90IGhhdmUgYVxuLy8gcmVnaXN0ZXJlZCBtYXBwaW5nIGZvciB0aGUgZXh0ZW5zaW9uLlxuLy8gTk9URTogU2hhcGVmaWxlcyBtdXN0IGJlIGluIGEgY29tcHJlc3NlZCBmb3JtYXQgc2luY2Vcbi8vIGl0IHJlcXVpcmVzIG11bHRpcGxlIGZpbGVzIHRvIGJlIHByZXNlbnQuXG5jb25zdCBkZWZhdWx0VmFsaWRGaWxlRXh0ID0gW1xuICAnY3N2JyxcbiAgLy8gJ3Rhci5neicsXG4gIC8vICd0Z3onLFxuICAvLyAnemlwJyxcbiAgLy8gJ2dweCcsXG4gIC8vICdrbWwnLFxuICAnanNvbicsXG4gICdnZW9qc29uJ1xuXTtcblxuY29uc3QgTUVTU0FHRSA9ICcgRHJhZyAmIERyb3AgWW91ciBGaWxlKHMpIEhlcmUnO1xuY29uc3QgQ0hST01FX01TRyA9XG4gICcqQ2hyb21lIHVzZXI6IExpbWl0IGZpbGUgc2l6ZSB0byAyNTBtYiwgaWYgbmVlZCB0byB1cGxvYWQgbGFyZ2VyIGZpbGUsIHRyeSBTYWZhcmknO1xuY29uc3QgRElTQ0xBSU1FUiA9ICcqS2VwbGVyLmdsIGlzIGEgY2xpZW50LXNpZGUgYXBwbGljYXRpb24gd2l0aCBubyBzZXJ2ZXIgYmFja2VuZC4gRGF0YSBsaXZlcyBvbmx5IG9uIHlvdXIgbWFjaGluZS9icm93c2VyLiAnICtcbiAgJ05vIGluZm9ybWF0aW9uIG9yIG1hcCBkYXRhIGlzIHNlbnQgdG8gYW55IHNlcnZlci4nO1xuY29uc3QgQ09ORklHX1VQTE9BRF9NRVNTQUdFID0gJ1VwbG9hZCBkYXRhIGZpbGVzIG9yIHVwbG9hZCBhIHNhdmVkIG1hcCB2aWEgcHJldmlvdXNseSBleHBvcnRlZCBzaW5nbGUgSnNvbiBvZiBib3RoIGNvbmZpZyBhbmQgZGF0YSc7XG5cbmNvbnN0IGZpbGVJY29uQ29sb3IgPSAnI0QzRDhFMCc7XG5cbmNvbnN0IFN0eWxlZFVwbG9hZE1lc3NhZ2UgPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgXG4gICR7bWVkaWEucG9ydGFibGVgXG4gICAgZm9udC1zaXplOiAxMnB4O1xuICBgfVxuYDtcblxuY29uc3QgV2FybmluZ01zZyA9IHN0eWxlZC5zcGFuYFxuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5lcnJvckNvbG9yfTtcbmA7XG5cbmNvbnN0IFBvc2l0aXZlTXNnID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5BY3RCZ2R9O1xuYDtcblxuY29uc3QgU3R5bGVkRmlsZURyb3AgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBib3JkZXItc3R5bGU6IGRhc2hlZDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3JMVH07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDQ4cHggOHB4IDA7XG5cbiAgLmZpbGUtdXBsb2FkLW9yIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5saW5rQnRuQ29sb3J9O1xuICAgIHBhZGRpbmctcmlnaHQ6IDRweDtcbiAgfVxuICBcbiAgJHttZWRpYS5wb3J0YWJsZWBcbiAgICBwYWRkaW5nOiAxNnB4IDRweCAwO1xuICBgfTtcbmA7XG5cbmNvbnN0IE1zZ1dyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tb2RhbFRpdGxlQ29sb3J9O1xuICBmb250LXNpemU6IDIwcHg7XG4gIGhlaWdodDogMzZweDtcbmA7XG5cbmNvbnN0IFN0eWxlZERyYWdORHJvcEljb24gPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtmaWxlSWNvbkNvbG9yfTtcbiAgbWFyZ2luLWJvdHRvbTogNDhweDtcbiAgXG4gICR7bWVkaWEucG9ydGFibGVgXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgYH07XG4gICR7bWVkaWEucGFsbWBcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGB9O1xuYDtcblxuY29uc3QgU3R5bGVkRmlsZVR5cGVGb3cgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAke21lZGlhLnBvcnRhYmxlYFxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIGB9O1xuICAke21lZGlhLnBhbG1gXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICBgfTtcbmA7XG5cbmNvbnN0IFN0eWxlZEZpbGVVcGxvYWQgPSBzdHlsZWQuZGl2YFxuICAuZmlsdGVyLXVwbG9hZF9faW5wdXQge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBoZWlnaHQ6IDA7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICB9XG5cbiAgLmZpbGUtZHJvcCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRNZXNzYWdlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5gO1xuXG5jb25zdCBTdHlsZWREcmFnRmlsZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAzMnB4O1xuICAke21lZGlhLnBvcnRhYmxlYFxuICAgIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGB9O1xuICAke21lZGlhLnBvcnRhYmxlYFxuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gIGB9XG5gO1xuXG5jb25zdCBTdHlsZWREaXNjbGFpbWVyID0gc3R5bGVkKFN0eWxlZE1lc3NhZ2UpYFxuICBtYXJnaW46IDAgYXV0bztcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVVcGxvYWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHZhbGlkRmlsZUV4dDogZGVmYXVsdFZhbGlkRmlsZUV4dFxuICB9O1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgb25GaWxlVXBsb2FkOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIHZhbGlkRmlsZUV4dDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnN0cmluZylcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnT3ZlcjogZmFsc2UsXG4gICAgZmlsZXM6IFtdLFxuICAgIGVycm9yRmlsZXM6IFtdXG4gIH07XG5cbiAgX2lzVmFsaWRGaWxlVHlwZSA9IGZpbGVuYW1lID0+IHtcbiAgICBjb25zdCB7dmFsaWRGaWxlRXh0fSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgZmlsZUV4dCA9IHZhbGlkRmlsZUV4dC5maW5kKGV4dCA9PiBmaWxlbmFtZS5lbmRzV2l0aChleHQpKTtcblxuICAgIHJldHVybiBCb29sZWFuKGZpbGVFeHQpO1xuICB9O1xuXG4gIF9oYW5kbGVGaWxlSW5wdXQgPSAoZmlsZXMsIGUpID0+IHtcbiAgICBpZiAoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7ZmlsZXM6IFtdLCBlcnJvckZpbGVzOiBbXSwgZHJhZ092ZXI6IGZhbHNlfTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG5cbiAgICAgIGlmIChmaWxlICYmIHRoaXMuX2lzVmFsaWRGaWxlVHlwZShmaWxlLm5hbWUpKSB7XG4gICAgICAgIG5leHRTdGF0ZS5maWxlcy5wdXNoKGZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dFN0YXRlLmVycm9yRmlsZXMucHVzaChmaWxlLm5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICBuZXh0U3RhdGUsXG4gICAgICAoKSA9PlxuICAgICAgICBuZXh0U3RhdGUuZmlsZXMubGVuZ3RoID8gdGhpcy5wcm9wcy5vbkZpbGVVcGxvYWQobmV4dFN0YXRlLmZpbGVzKSA6IG51bGxcbiAgICApO1xuICB9O1xuXG4gIF90b2dnbGVEcmFnU3RhdGUgPSBuZXdTdGF0ZSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7ZHJhZ092ZXI6IG5ld1N0YXRlfSk7XG4gIH07XG5cbiAgX3JlbmRlck1lc3NhZ2UoKSB7XG4gICAgY29uc3Qge2Vycm9yRmlsZXMsIGZpbGVzfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoZXJyb3JGaWxlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxXYXJuaW5nTXNnPlxuICAgICAgICAgIHtgRmlsZSAke2Vycm9yRmlsZXMuam9pbignLCAnKX0gaXMgbm90IHN1cHBvcnRlZC5gfVxuICAgICAgICA8L1dhcm5pbmdNc2c+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZE1lc3NhZ2UgY2xhc3NOYW1lPVwiZmlsZS11cGxvYWRlcl9fbWVzc2FnZVwiPlxuICAgICAgICA8ZGl2PlVwbG9hZGluZy4uLjwvZGl2PlxuICAgICAgICA8UG9zaXRpdmVNc2c+XG4gICAgICAgICAge2Ake2ZpbGVzLm1hcChmID0+IGYubmFtZSkuam9pbignIGFuZCAnKX0uLi5gfVxuICAgICAgICA8L1Bvc2l0aXZlTXNnPlxuICAgICAgICA8TG9hZGluZ1NwaW5uZXIgc2l6ZT17MjB9IC8+XG4gICAgICA8L1N0eWxlZE1lc3NhZ2U+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZHJhZ092ZXIsIGZpbGVzfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge3ZhbGlkRmlsZUV4dH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkRmlsZVVwbG9hZFxuICAgICAgICBjbGFzc05hbWU9XCJmaWxlLXVwbG9hZGVyXCJcbiAgICAgICAgcmVmPXtjbXAgPT4gKHRoaXMuZnJhbWUgPSBjbXApfVxuICAgICAgPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBjbGFzc05hbWU9XCJmaWx0ZXItdXBsb2FkX19pbnB1dFwiXG4gICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9vbkNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgICAge0ZpbGVEcm9wID8gKFxuICAgICAgICAgIDxGaWxlRHJvcFxuICAgICAgICAgICAgZnJhbWU9e3RoaXMuZnJhbWV9XG4gICAgICAgICAgICB0YXJnZXRBbHdheXNWaXNpYmxlXG4gICAgICAgICAgICBvbkRyYWdPdmVyPXsoKSA9PiB0aGlzLl90b2dnbGVEcmFnU3RhdGUodHJ1ZSl9XG4gICAgICAgICAgICBvbkRyYWdMZWF2ZT17KCkgPT4gdGhpcy5fdG9nZ2xlRHJhZ1N0YXRlKGZhbHNlKX1cbiAgICAgICAgICAgIG9uRHJvcD17dGhpcy5faGFuZGxlRmlsZUlucHV0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTdHlsZWRVcGxvYWRNZXNzYWdlIGNsYXNzTmFtZT1cImZpbGUtdXBsb2FkX19tZXNzYWdlXCI+e0NPTkZJR19VUExPQURfTUVTU0FHRX08L1N0eWxlZFVwbG9hZE1lc3NhZ2U+XG4gICAgICAgICAgICA8U3R5bGVkRmlsZURyb3AgZHJhZ092ZXI9e2RyYWdPdmVyfT5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e29wYWNpdHk6IGRyYWdPdmVyID8gMC41IDogMX19PlxuICAgICAgICAgICAgICAgIDxTdHlsZWREcmFnTkRyb3BJY29uPlxuICAgICAgICAgICAgICAgICAgPFN0eWxlZEZpbGVUeXBlRm93IGNsYXNzTmFtZT1cImZpbGUtdHlwZS1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAge3ZhbGlkRmlsZUV4dC5tYXAoZXh0ID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8RmlsZVR5cGUga2V5PXtleHR9IGV4dD17ZXh0fSBoZWlnaHQ9XCI1MHB4XCIgZm9udFNpemU9XCI5cHhcIi8+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9TdHlsZWRGaWxlVHlwZUZvdz5cbiAgICAgICAgICAgICAgICAgIDxEcmFnTkRyb3AgaGVpZ2h0PVwiNDRweFwiIC8+XG4gICAgICAgICAgICAgICAgPC9TdHlsZWREcmFnTkRyb3BJY29uPlxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMuX3JlbmRlck1lc3NhZ2UoKX08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIHshZmlsZXMubGVuZ3RoID8gKFxuICAgICAgICAgICAgICAgICAgPFN0eWxlZERyYWdGaWxlV3JhcHBlcj5cbiAgICAgICAgICAgICAgICAgICAgPE1zZ1dyYXBwZXI+e01FU1NBR0V9PC9Nc2dXcmFwcGVyPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmaWxlLXVwbG9hZC1vclwiPm9yPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8VXBsb2FkQnV0dG9uIG9uVXBsb2FkPXt0aGlzLl9oYW5kbGVGaWxlSW5wdXR9PlxuICAgICAgICAgICAgICAgICAgICAgIGJyb3dzZSB5b3VyIGZpbGVzXG4gICAgICAgICAgICAgICAgICAgIDwvVXBsb2FkQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9TdHlsZWREcmFnRmlsZVdyYXBwZXI+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8U3R5bGVkRGlzY2xhaW1lcj57RElTQ0xBSU1FUn08L1N0eWxlZERpc2NsYWltZXI+XG4gICAgICAgICAgICA8L1N0eWxlZEZpbGVEcm9wPlxuICAgICAgICAgIDwvRmlsZURyb3A+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIDxXYXJuaW5nTXNnPntpc0Nocm9tZSgpID8gQ0hST01FX01TRyA6ICcnfTwvV2FybmluZ01zZz5cbiAgICAgIDwvU3R5bGVkRmlsZVVwbG9hZD5cbiAgICApO1xuICB9XG59XG4iXX0=