"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactJsonPretty = _interopRequireDefault(require("react-json-pretty"));

var _userGuides = require("../../constants/user-guides");

var _icons = require("../common/icons");

var _styledComponents2 = require("../common/styled-components");

var _defaultSettings = require("../../constants/default-settings");

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .note {\n    color: ", ";\n    font-size: 11px;\n  }\n  \n  .viewer {\n    border: 1px solid ", ";\n    background-color: white;\n    border-radius: 2px;\n    display: inline-block;\n    font: inherit;\n    line-height: 1.5em;\n    padding: 0.5em 3.5em 0.5em 1em;\n    margin: 0;\n    box-sizing: border-box;\n    height: 180px;\n    width: 100%;\n    overflow-y: scroll;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .disclaimer {\n    font-size: ", ";\n    color: ", ";\n    margin-top: 12px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  text-decoration-line: underline !important;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-weight: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  padding: ", ";\n  color: ", ";\n  height: ", ";\n  outline: 0;\n  font-size: ", ";\n  \n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    outline: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledInput = _styledComponents["default"].input(_templateObject(), function (props) {
  return props.theme.inputPadding;
}, function (props) {
  return props.error ? 'red' : props.theme.titleColorLT;
}, function (props) {
  return props.theme.inputBoxHeight;
}, function (props) {
  return props.theme.inputFontSize;
});

var StyledWarning = _styledComponents["default"].span(_templateObject2(), function (props) {
  return props.theme.errorColor;
}, function (props) {
  return props.theme.selectFontWeightBold;
});

var StyledLink = _styledComponents["default"].a(_templateObject3());

var INTRA_SECTION_MARGING = '8px';
var ExportMapStyledExportSection = (0, _styledComponents["default"])(_styledComponents2.StyledExportSection)(_templateObject4(), function (props) {
  return props.theme.inputFontSize;
}, function (props) {
  return props.theme.inputColor;
});

var Link = function Link(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2["default"])(_ref, ["children"]);
  return _react["default"].createElement(StyledLink, (0, _extends2["default"])({
    target: "_blank",
    rel: "noopener noreferrer"
  }, props), children);
};

var exportHtmlPropTypes = {
  options: _propTypes["default"].object,
  onEditUserMapboxAccessToken: _propTypes["default"].func.isRequired
};

var ExportHtmlMap = function ExportHtmlMap(_ref2) {
  var _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? {} : _ref2$options,
      _ref2$onEditUserMapbo = _ref2.onEditUserMapboxAccessToken,
      onEditUserMapboxAccessToken = _ref2$onEditUserMapbo === void 0 ? function () {} : _ref2$onEditUserMapbo;
  return _react["default"].createElement("div", null, _react["default"].createElement(_styledComponents2.StyledExportSection, {
    style: {
      marginTop: INTRA_SECTION_MARGING
    }
  }, _react["default"].createElement("div", {
    className: "description"
  }), _react["default"].createElement("div", {
    className: "selection"
  }, "Export your map into an interactive html file.")), _react["default"].createElement(ExportMapStyledExportSection, {
    className: "export-map-modal__html-options"
  }, _react["default"].createElement("div", {
    className: "description"
  }, _react["default"].createElement("div", {
    className: "title"
  }, "Mapbox access token"), _react["default"].createElement("div", {
    className: "subtitle"
  }, "Use your own Mapbox access token in the html (optional)")), _react["default"].createElement("div", {
    className: "selection"
  }, _react["default"].createElement(StyledInput, {
    onChange: function onChange(e) {
      return onEditUserMapboxAccessToken(e.target.value);
    },
    type: "text",
    placeholder: "Paste your Mapbox access token",
    value: options ? options.userMapboxToken : ''
  }), _react["default"].createElement("div", {
    className: "disclaimer"
  }, _react["default"].createElement(StyledWarning, null, _defaultSettings.TOKEN_MISUSE_WARNING), _react["default"].createElement("span", null, _defaultSettings.DISCLAIMER), _react["default"].createElement(Link, {
    href: _userGuides.GITHUB_EXPORT_HTML_MAP
  }, "How to update an existing map token.")))));
};

ExportHtmlMap.propTypes = exportHtmlPropTypes;
var StyledJsonExportSection = (0, _styledComponents["default"])(ExportMapStyledExportSection)(_templateObject5(), function (props) {
  return props.theme.errorColor;
}, function (props) {
  return props.theme.selectBorderColorLT;
});
var exportJsonPropTypes = {
  options: _propTypes["default"].object
};

var ExportJsonMap = function ExportJsonMap(_ref3) {
  var _ref3$config = _ref3.config,
      config = _ref3$config === void 0 ? {} : _ref3$config;
  return _react["default"].createElement("div", null, _react["default"].createElement(_styledComponents2.StyledExportSection, {
    style: {
      marginTop: INTRA_SECTION_MARGING
    }
  }, _react["default"].createElement("div", {
    className: "description"
  }), _react["default"].createElement("div", {
    className: "selection"
  }, "Export current map data and config into a single Json file. You can later open the same map by uploading this file to kepler.gl.")), _react["default"].createElement(StyledJsonExportSection, {
    className: "export-map-modal__json-options"
  }, _react["default"].createElement("div", {
    className: "description"
  }, _react["default"].createElement("div", {
    className: "title"
  }, "Map Config"), _react["default"].createElement("div", {
    className: "subtitle"
  }, _defaultSettings.MAP_CONFIG_DESCRIPTION, _react["default"].createElement(Link, {
    href: _userGuides.GITHUB_ADD_DATA_TO_MAP
  }, "addDataToMap"), ".")), _react["default"].createElement("div", {
    className: "selection"
  }, _react["default"].createElement("div", {
    className: "viewer"
  }, _react["default"].createElement(_reactJsonPretty["default"], {
    id: "json-pretty",
    json: config
  })), _react["default"].createElement("div", {
    className: "disclaimer"
  }, _react["default"].createElement(StyledWarning, null, "* Map config is coupled with loaded datasets. \u2018dataId\u2019 is used to bind layers, filters, and tooltips to a specific dataset. When passing this config to addDataToMap, make sure the dataset id matches the dataId/s in this config.")))));
};

ExportJsonMap.propTypes = exportJsonPropTypes;
var propTypes = {
  options: _propTypes["default"].object,
  onEditUserMapboxAccessToken: _propTypes["default"].func.isRequired,
  onChangeExportData: _propTypes["default"].func,
  onChangeExportMapType: _propTypes["default"].func,
  mapFormat: _propTypes["default"].string
};

var ExportMapModal = function ExportMapModal(_ref4) {
  var _EXPORT_MAP_FORMAT$HT;

  var _ref4$config = _ref4.config,
      config = _ref4$config === void 0 ? {} : _ref4$config,
      _ref4$onChangeExportD = _ref4.onChangeExportData,
      onChangeExportData = _ref4$onChangeExportD === void 0 ? function () {} : _ref4$onChangeExportD,
      _ref4$onChangeExportM = _ref4.onChangeExportMapFormat,
      onChangeExportMapFormat = _ref4$onChangeExportM === void 0 ? function () {} : _ref4$onChangeExportM,
      _ref4$onEditUserMapbo = _ref4.onEditUserMapboxAccessToken,
      onEditUserMapboxAccessToken = _ref4$onEditUserMapbo === void 0 ? function () {} : _ref4$onEditUserMapbo,
      _ref4$options = _ref4.options,
      options = _ref4$options === void 0 ? {} : _ref4$options;
  return _react["default"].createElement(_styledComponents2.StyledModalContent, {
    className: "export-map-modal"
  }, _react["default"].createElement("div", {
    style: {
      width: '100%'
    }
  }, _react["default"].createElement(_styledComponents2.StyledExportSection, {
    style: {
      marginBottom: INTRA_SECTION_MARGING
    }
  }, _react["default"].createElement("div", {
    className: "description"
  }, _react["default"].createElement("div", {
    className: "title"
  }, "Map format"), _react["default"].createElement("div", {
    className: "subtitle"
  }, "Choose the format to export your map to")), _react["default"].createElement("div", {
    className: "selection"
  }, _defaultSettings.EXPORT_MAP_FORMAT_OPTIONS.map(function (op) {
    return _react["default"].createElement(_styledComponents2.StyledType, {
      key: op.id,
      selected: options.format === op.id,
      available: op.available,
      onClick: function onClick() {
        return op.available && onChangeExportMapFormat(op.id);
      }
    }, _react["default"].createElement(_icons.FileType, {
      ext: op.label,
      height: "80px",
      fontSize: "11px"
    }));
  }))), (_EXPORT_MAP_FORMAT$HT = {}, (0, _defineProperty2["default"])(_EXPORT_MAP_FORMAT$HT, _defaultSettings.EXPORT_MAP_FORMAT.HTML, _react["default"].createElement(ExportHtmlMap, {
    options: options[options.format],
    onEditUserMapboxAccessToken: onEditUserMapboxAccessToken
  })), (0, _defineProperty2["default"])(_EXPORT_MAP_FORMAT$HT, _defaultSettings.EXPORT_MAP_FORMAT.JSON, _react["default"].createElement(ExportJsonMap, {
    config: config,
    onChangeExportData: onChangeExportData,
    options: options[options.format]
  })), _EXPORT_MAP_FORMAT$HT)[options.format]));
};

ExportMapModal.propTypes = propTypes;

var ExportMapModalFactory = function ExportMapModalFactory() {
  return ExportMapModal;
};

var _default = ExportMapModalFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9leHBvcnQtbWFwLW1vZGFsLmpzIl0sIm5hbWVzIjpbIlN0eWxlZElucHV0Iiwic3R5bGVkIiwiaW5wdXQiLCJwcm9wcyIsInRoZW1lIiwiaW5wdXRQYWRkaW5nIiwiZXJyb3IiLCJ0aXRsZUNvbG9yTFQiLCJpbnB1dEJveEhlaWdodCIsImlucHV0Rm9udFNpemUiLCJTdHlsZWRXYXJuaW5nIiwic3BhbiIsImVycm9yQ29sb3IiLCJzZWxlY3RGb250V2VpZ2h0Qm9sZCIsIlN0eWxlZExpbmsiLCJhIiwiSU5UUkFfU0VDVElPTl9NQVJHSU5HIiwiRXhwb3J0TWFwU3R5bGVkRXhwb3J0U2VjdGlvbiIsIlN0eWxlZEV4cG9ydFNlY3Rpb24iLCJpbnB1dENvbG9yIiwiTGluayIsImNoaWxkcmVuIiwiZXhwb3J0SHRtbFByb3BUeXBlcyIsIm9wdGlvbnMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJvbkVkaXRVc2VyTWFwYm94QWNjZXNzVG9rZW4iLCJmdW5jIiwiaXNSZXF1aXJlZCIsIkV4cG9ydEh0bWxNYXAiLCJtYXJnaW5Ub3AiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJ1c2VyTWFwYm94VG9rZW4iLCJUT0tFTl9NSVNVU0VfV0FSTklORyIsIkRJU0NMQUlNRVIiLCJHSVRIVUJfRVhQT1JUX0hUTUxfTUFQIiwicHJvcFR5cGVzIiwiU3R5bGVkSnNvbkV4cG9ydFNlY3Rpb24iLCJzZWxlY3RCb3JkZXJDb2xvckxUIiwiZXhwb3J0SnNvblByb3BUeXBlcyIsIkV4cG9ydEpzb25NYXAiLCJjb25maWciLCJNQVBfQ09ORklHX0RFU0NSSVBUSU9OIiwiR0lUSFVCX0FERF9EQVRBX1RPX01BUCIsIm9uQ2hhbmdlRXhwb3J0RGF0YSIsIm9uQ2hhbmdlRXhwb3J0TWFwVHlwZSIsIm1hcEZvcm1hdCIsInN0cmluZyIsIkV4cG9ydE1hcE1vZGFsIiwib25DaGFuZ2VFeHBvcnRNYXBGb3JtYXQiLCJ3aWR0aCIsIm1hcmdpbkJvdHRvbSIsIkVYUE9SVF9NQVBfRk9STUFUX09QVElPTlMiLCJtYXAiLCJvcCIsImlkIiwiZm9ybWF0IiwiYXZhaWxhYmxlIiwibGFiZWwiLCJFWFBPUlRfTUFQX0ZPUk1BVCIsIkhUTUwiLCJKU09OIiwiRXhwb3J0TWFwTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLElBQU1BLFdBQVcsR0FBR0MsNkJBQU9DLEtBQVYsb0JBRUosVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxZQUFoQjtBQUFBLENBRkQsRUFHTixVQUFBRixLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDRyxLQUFOLEdBQWMsS0FBZCxHQUFzQkgsS0FBSyxDQUFDQyxLQUFOLENBQVlHLFlBQXRDO0FBQUEsQ0FIQyxFQUlMLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUksY0FBaEI7QUFBQSxDQUpBLEVBTUYsVUFBQUwsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZSyxhQUFoQjtBQUFBLENBTkgsQ0FBakI7O0FBZ0JBLElBQU1DLGFBQWEsR0FBR1QsNkJBQU9VLElBQVYscUJBQ1IsVUFBQVIsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZUSxVQUFoQjtBQUFBLENBREcsRUFFRixVQUFBVCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlTLG9CQUFoQjtBQUFBLENBRkgsQ0FBbkI7O0FBS0EsSUFBTUMsVUFBVSxHQUFHYiw2QkFBT2MsQ0FBVixvQkFBaEI7O0FBSUEsSUFBTUMscUJBQXFCLEdBQUcsS0FBOUI7QUFFQSxJQUFNQyw0QkFBNEIsR0FBRyxrQ0FBT0Msc0NBQVAsQ0FBSCxxQkFFakIsVUFBQWYsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZSyxhQUFoQjtBQUFBLENBRlksRUFHckIsVUFBQU4sS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZZSxVQUFoQjtBQUFBLENBSGdCLENBQWxDOztBQVFBLElBQU1DLElBQUksR0FBRyxTQUFQQSxJQUFPO0FBQUEsTUFBRUMsUUFBRixRQUFFQSxRQUFGO0FBQUEsTUFBZWxCLEtBQWY7QUFBQSxTQUNYLGdDQUFDLFVBQUQ7QUFBWSxJQUFBLE1BQU0sRUFBQyxRQUFuQjtBQUNZLElBQUEsR0FBRyxFQUFDO0FBRGhCLEtBQzBDQSxLQUQxQyxHQUVHa0IsUUFGSCxDQURXO0FBQUEsQ0FBYjs7QUFPQSxJQUFNQyxtQkFBbUIsR0FBRztBQUMxQkMsRUFBQUEsT0FBTyxFQUFFQyxzQkFBVUMsTUFETztBQUUxQkMsRUFBQUEsMkJBQTJCLEVBQUVGLHNCQUFVRyxJQUFWLENBQWVDO0FBRmxCLENBQTVCOztBQUtBLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0I7QUFBQSw0QkFDcEJOLE9BRG9CO0FBQUEsTUFDcEJBLE9BRG9CLDhCQUNWLEVBRFU7QUFBQSxvQ0FFcEJHLDJCQUZvQjtBQUFBLE1BRXBCQSwyQkFGb0Isc0NBRVUsWUFBTSxDQUFFLENBRmxCO0FBQUEsU0FJcEIsNkNBQ0UsZ0NBQUMsc0NBQUQ7QUFBcUIsSUFBQSxLQUFLLEVBQUU7QUFBQ0ksTUFBQUEsU0FBUyxFQUFFZDtBQUFaO0FBQTVCLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLElBREYsRUFFRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsc0RBRkYsQ0FERixFQU9FLGdDQUFDLDRCQUFEO0FBQThCLElBQUEsU0FBUyxFQUFDO0FBQXhDLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLDJCQURGLEVBSUU7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLCtEQUpGLENBREYsRUFTRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsS0FDRSxnQ0FBQyxXQUFEO0FBQ0UsSUFBQSxRQUFRLEVBQUUsa0JBQUFlLENBQUM7QUFBQSxhQUFJTCwyQkFBMkIsQ0FBQ0ssQ0FBQyxDQUFDQyxNQUFGLENBQVNDLEtBQVYsQ0FBL0I7QUFBQSxLQURiO0FBRUUsSUFBQSxJQUFJLEVBQUMsTUFGUDtBQUdFLElBQUEsV0FBVyxFQUFDLGdDQUhkO0FBSUUsSUFBQSxLQUFLLEVBQUVWLE9BQU8sR0FBR0EsT0FBTyxDQUFDVyxlQUFYLEdBQTZCO0FBSjdDLElBREYsRUFPRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsS0FDRSxnQ0FBQyxhQUFELFFBQWdCQyxxQ0FBaEIsQ0FERixFQUVFLDhDQUFPQywyQkFBUCxDQUZGLEVBR0UsZ0NBQUMsSUFBRDtBQUFNLElBQUEsSUFBSSxFQUFFQztBQUFaLDRDQUhGLENBUEYsQ0FURixDQVBGLENBSm9CO0FBQUEsQ0FBdEI7O0FBdUNBUixhQUFhLENBQUNTLFNBQWQsR0FBMEJoQixtQkFBMUI7QUFFQSxJQUFNaUIsdUJBQXVCLEdBQUcsa0NBQU90Qiw0QkFBUCxDQUFILHFCQUVoQixVQUFBZCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlRLFVBQWhCO0FBQUEsQ0FGVyxFQU9MLFVBQUFULEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWW9DLG1CQUFoQjtBQUFBLENBUEEsQ0FBN0I7QUFzQkEsSUFBTUMsbUJBQW1CLEdBQUc7QUFDMUJsQixFQUFBQSxPQUFPLEVBQUVDLHNCQUFVQztBQURPLENBQTVCOztBQUlBLElBQU1pQixhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0FBQUEsMkJBQ3BCQyxNQURvQjtBQUFBLE1BQ3BCQSxNQURvQiw2QkFDWCxFQURXO0FBQUEsU0FHcEIsNkNBQ0UsZ0NBQUMsc0NBQUQ7QUFBcUIsSUFBQSxLQUFLLEVBQUU7QUFBQ2IsTUFBQUEsU0FBUyxFQUFFZDtBQUFaO0FBQTVCLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLElBREYsRUFFRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsd0lBRkYsQ0FERixFQU9FLGdDQUFDLHVCQUFEO0FBQXlCLElBQUEsU0FBUyxFQUFDO0FBQW5DLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLGtCQURGLEVBSUU7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0c0Qix1Q0FESCxFQUVFLGdDQUFDLElBQUQ7QUFBTSxJQUFBLElBQUksRUFBRUM7QUFBWixvQkFGRixNQUpGLENBREYsRUFZRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsS0FDRTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsS0FDRSxnQ0FBQywyQkFBRDtBQUFZLElBQUEsRUFBRSxFQUFDLGFBQWY7QUFBNkIsSUFBQSxJQUFJLEVBQUVGO0FBQW5DLElBREYsQ0FERixFQUlFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFLGdDQUFDLGFBQUQsd1BBREYsQ0FKRixDQVpGLENBUEYsQ0FIb0I7QUFBQSxDQUF0Qjs7QUFvQ0FELGFBQWEsQ0FBQ0osU0FBZCxHQUEwQkcsbUJBQTFCO0FBRUEsSUFBTUgsU0FBUyxHQUFHO0FBQ2hCZixFQUFBQSxPQUFPLEVBQUVDLHNCQUFVQyxNQURIO0FBRWhCQyxFQUFBQSwyQkFBMkIsRUFBRUYsc0JBQVVHLElBQVYsQ0FBZUMsVUFGNUI7QUFHaEJrQixFQUFBQSxrQkFBa0IsRUFBRXRCLHNCQUFVRyxJQUhkO0FBSWhCb0IsRUFBQUEscUJBQXFCLEVBQUV2QixzQkFBVUcsSUFKakI7QUFLaEJxQixFQUFBQSxTQUFTLEVBQUV4QixzQkFBVXlCO0FBTEwsQ0FBbEI7O0FBUUEsSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQjtBQUFBOztBQUFBLDJCQUNyQlAsTUFEcUI7QUFBQSxNQUNyQkEsTUFEcUIsNkJBQ1osRUFEWTtBQUFBLG9DQUVyQkcsa0JBRnFCO0FBQUEsTUFFckJBLGtCQUZxQixzQ0FFQSxZQUFNLENBQUUsQ0FGUjtBQUFBLG9DQUdyQkssdUJBSHFCO0FBQUEsTUFHckJBLHVCQUhxQixzQ0FHTSxZQUFNLENBQUUsQ0FIZDtBQUFBLG9DQUlyQnpCLDJCQUpxQjtBQUFBLE1BSXJCQSwyQkFKcUIsc0NBSVMsWUFBTSxDQUFFLENBSmpCO0FBQUEsNEJBS3JCSCxPQUxxQjtBQUFBLE1BS3JCQSxPQUxxQiw4QkFLWCxFQUxXO0FBQUEsU0FPckIsZ0NBQUMscUNBQUQ7QUFBb0IsSUFBQSxTQUFTLEVBQUM7QUFBOUIsS0FDRTtBQUFLLElBQUEsS0FBSyxFQUFFO0FBQUM2QixNQUFBQSxLQUFLLEVBQUU7QUFBUjtBQUFaLEtBQ0UsZ0NBQUMsc0NBQUQ7QUFBcUIsSUFBQSxLQUFLLEVBQUU7QUFBQ0MsTUFBQUEsWUFBWSxFQUFFckM7QUFBZjtBQUE1QixLQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixrQkFERixFQUlFO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZiwrQ0FKRixDQURGLEVBU0U7QUFBSyxJQUFBLFNBQVMsRUFBQztBQUFmLEtBQ0dzQywyQ0FBMEJDLEdBQTFCLENBQThCLFVBQUFDLEVBQUU7QUFBQSxXQUMvQixnQ0FBQyw2QkFBRDtBQUNFLE1BQUEsR0FBRyxFQUFFQSxFQUFFLENBQUNDLEVBRFY7QUFFRSxNQUFBLFFBQVEsRUFBRWxDLE9BQU8sQ0FBQ21DLE1BQVIsS0FBbUJGLEVBQUUsQ0FBQ0MsRUFGbEM7QUFHRSxNQUFBLFNBQVMsRUFBRUQsRUFBRSxDQUFDRyxTQUhoQjtBQUlFLE1BQUEsT0FBTyxFQUFFO0FBQUEsZUFBTUgsRUFBRSxDQUFDRyxTQUFILElBQWdCUix1QkFBdUIsQ0FBQ0ssRUFBRSxDQUFDQyxFQUFKLENBQTdDO0FBQUE7QUFKWCxPQU1FLGdDQUFDLGVBQUQ7QUFBVSxNQUFBLEdBQUcsRUFBRUQsRUFBRSxDQUFDSSxLQUFsQjtBQUF5QixNQUFBLE1BQU0sRUFBQyxNQUFoQztBQUF1QyxNQUFBLFFBQVEsRUFBQztBQUFoRCxNQU5GLENBRCtCO0FBQUEsR0FBaEMsQ0FESCxDQVRGLENBREYsRUF1QkcscUZBQ0VDLG1DQUFrQkMsSUFEcEIsRUFFRyxnQ0FBQyxhQUFEO0FBQ0UsSUFBQSxPQUFPLEVBQUV2QyxPQUFPLENBQUNBLE9BQU8sQ0FBQ21DLE1BQVQsQ0FEbEI7QUFFRSxJQUFBLDJCQUEyQixFQUFFaEM7QUFGL0IsSUFGSCwyREFPRW1DLG1DQUFrQkUsSUFQcEIsRUFRRyxnQ0FBQyxhQUFEO0FBQ0UsSUFBQSxNQUFNLEVBQUVwQixNQURWO0FBRUUsSUFBQSxrQkFBa0IsRUFBRUcsa0JBRnRCO0FBR0UsSUFBQSxPQUFPLEVBQUV2QixPQUFPLENBQUNBLE9BQU8sQ0FBQ21DLE1BQVQ7QUFIbEIsSUFSSCwwQkFjQ25DLE9BQU8sQ0FBQ21DLE1BZFQsQ0F2QkgsQ0FERixDQVBxQjtBQUFBLENBQXZCOztBQWtEQVIsY0FBYyxDQUFDWixTQUFmLEdBQTJCQSxTQUEzQjs7QUFFQSxJQUFNMEIscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QjtBQUFBLFNBQU1kLGNBQU47QUFBQSxDQUE5Qjs7ZUFFZWMscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IEpTT05QcmV0dHkgZnJvbSAncmVhY3QtanNvbi1wcmV0dHknO1xuaW1wb3J0IHtHSVRIVUJfRVhQT1JUX0hUTUxfTUFQLCBHSVRIVUJfQUREX0RBVEFfVE9fTUFQfSBmcm9tICdjb25zdGFudHMvdXNlci1ndWlkZXMnO1xuaW1wb3J0IHtGaWxlVHlwZX0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuaW1wb3J0IHtcbiAgU3R5bGVkTW9kYWxDb250ZW50LFxuICBTdHlsZWRFeHBvcnRTZWN0aW9uLFxuICBTdHlsZWRUeXBlXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7XG4gIERJU0NMQUlNRVIsXG4gIEVYUE9SVF9NQVBfRk9STUFULFxuICBFWFBPUlRfTUFQX0ZPUk1BVF9PUFRJT05TLFxuICBNQVBfQ09ORklHX0RFU0NSSVBUSU9OLFxuICBUT0tFTl9NSVNVU0VfV0FSTklOR1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IFN0eWxlZElucHV0ID0gc3R5bGVkLmlucHV0YFxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFBhZGRpbmd9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5lcnJvciA/ICdyZWQnIDogcHJvcHMudGhlbWUudGl0bGVDb2xvckxUfTtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Qm94SGVpZ2h0fTtcbiAgb3V0bGluZTogMDtcbiAgZm9udC1zaXplOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Rm9udFNpemV9O1xuICBcbiAgOmFjdGl2ZSxcbiAgOmZvY3VzLFxuICAmLmZvY3VzLFxuICAmLmFjdGl2ZSB7XG4gICAgb3V0bGluZTogMDtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkV2FybmluZyA9IHN0eWxlZC5zcGFuYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5lcnJvckNvbG9yfTtcbiAgZm9udC13ZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0Rm9udFdlaWdodEJvbGR9O1xuYDtcblxuY29uc3QgU3R5bGVkTGluayA9IHN0eWxlZC5hYFxuICB0ZXh0LWRlY29yYXRpb24tbGluZTogdW5kZXJsaW5lICFpbXBvcnRhbnQ7XG5gO1xuXG5jb25zdCBJTlRSQV9TRUNUSU9OX01BUkdJTkcgPSAnOHB4JztcblxuY29uc3QgRXhwb3J0TWFwU3R5bGVkRXhwb3J0U2VjdGlvbiA9IHN0eWxlZChTdHlsZWRFeHBvcnRTZWN0aW9uKWBcbiAgLmRpc2NsYWltZXIge1xuICAgIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEZvbnRTaXplfTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dENvbG9yfTtcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICB9XG5gO1xuXG5jb25zdCBMaW5rID0gKHtjaGlsZHJlbiwgLi4ucHJvcHN9KSA9PiAoXG4gIDxTdHlsZWRMaW5rIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiB7Li4ucHJvcHN9PlxuICAgIHtjaGlsZHJlbn1cbiAgPC9TdHlsZWRMaW5rPlxuKTtcblxuY29uc3QgZXhwb3J0SHRtbFByb3BUeXBlcyA9IHtcbiAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcbiAgb25FZGl0VXNlck1hcGJveEFjY2Vzc1Rva2VuOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG59O1xuXG5jb25zdCBFeHBvcnRIdG1sTWFwID0gKHtcbiAgb3B0aW9ucyA9IHt9LFxuICBvbkVkaXRVc2VyTWFwYm94QWNjZXNzVG9rZW4gPSAoKSA9PiB7fVxufSkgPT4gKFxuICA8ZGl2PlxuICAgIDxTdHlsZWRFeHBvcnRTZWN0aW9uIHN0eWxlPXt7bWFyZ2luVG9wOiBJTlRSQV9TRUNUSU9OX01BUkdJTkd9fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGVzY3JpcHRpb25cIiAvPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3Rpb25cIj5cbiAgICAgICAgRXhwb3J0IHlvdXIgbWFwIGludG8gYW4gaW50ZXJhY3RpdmUgaHRtbCBmaWxlLlxuICAgICAgPC9kaXY+XG4gICAgPC9TdHlsZWRFeHBvcnRTZWN0aW9uPlxuICAgIDxFeHBvcnRNYXBTdHlsZWRFeHBvcnRTZWN0aW9uIGNsYXNzTmFtZT1cImV4cG9ydC1tYXAtbW9kYWxfX2h0bWwtb3B0aW9uc1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgTWFwYm94IGFjY2VzcyB0b2tlblxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPlxuICAgICAgICAgIFVzZSB5b3VyIG93biBNYXBib3ggYWNjZXNzIHRva2VuIGluIHRoZSBodG1sIChvcHRpb25hbClcbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0aW9uXCI+XG4gICAgICAgIDxTdHlsZWRJbnB1dFxuICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IG9uRWRpdFVzZXJNYXBib3hBY2Nlc3NUb2tlbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzdGUgeW91ciBNYXBib3ggYWNjZXNzIHRva2VuXCJcbiAgICAgICAgICB2YWx1ZT17b3B0aW9ucyA/IG9wdGlvbnMudXNlck1hcGJveFRva2VuIDogJyd9XG4gICAgICAgIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGlzY2xhaW1lclwiPlxuICAgICAgICAgIDxTdHlsZWRXYXJuaW5nPntUT0tFTl9NSVNVU0VfV0FSTklOR308L1N0eWxlZFdhcm5pbmc+XG4gICAgICAgICAgPHNwYW4+e0RJU0NMQUlNRVJ9PC9zcGFuPlxuICAgICAgICAgIDxMaW5rIGhyZWY9e0dJVEhVQl9FWFBPUlRfSFRNTF9NQVB9PlxuICAgICAgICAgICAgSG93IHRvIHVwZGF0ZSBhbiBleGlzdGluZyBtYXAgdG9rZW4uXG4gICAgICAgICAgPC9MaW5rPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvRXhwb3J0TWFwU3R5bGVkRXhwb3J0U2VjdGlvbj5cbiAgPC9kaXY+XG4pO1xuXG5FeHBvcnRIdG1sTWFwLnByb3BUeXBlcyA9IGV4cG9ydEh0bWxQcm9wVHlwZXM7XG5cbmNvbnN0IFN0eWxlZEpzb25FeHBvcnRTZWN0aW9uID0gc3R5bGVkKEV4cG9ydE1hcFN0eWxlZEV4cG9ydFNlY3Rpb24pYFxuICAubm90ZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZXJyb3JDb2xvcn07XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICB9XG4gIFxuICAudmlld2VyIHtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udDogaW5oZXJpdDtcbiAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgcGFkZGluZzogMC41ZW0gMy41ZW0gMC41ZW0gMWVtO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGhlaWdodDogMTgwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICB9XG5gO1xuXG5jb25zdCBleHBvcnRKc29uUHJvcFR5cGVzID0ge1xuICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0XG59O1xuXG5jb25zdCBFeHBvcnRKc29uTWFwID0gKHtcbiAgY29uZmlnID0ge31cbn0pID0+IChcbiAgPGRpdj5cbiAgICA8U3R5bGVkRXhwb3J0U2VjdGlvbiBzdHlsZT17e21hcmdpblRvcDogSU5UUkFfU0VDVElPTl9NQVJHSU5HfX0+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0aW9uXCI+XG4gICAgICAgIEV4cG9ydCBjdXJyZW50IG1hcCBkYXRhIGFuZCBjb25maWcgaW50byBhIHNpbmdsZSBKc29uIGZpbGUuIFlvdSBjYW4gbGF0ZXIgb3BlbiB0aGUgc2FtZSBtYXAgYnkgdXBsb2FkaW5nIHRoaXMgZmlsZSB0byBrZXBsZXIuZ2wuXG4gICAgICA8L2Rpdj5cbiAgICA8L1N0eWxlZEV4cG9ydFNlY3Rpb24+XG4gICAgPFN0eWxlZEpzb25FeHBvcnRTZWN0aW9uIGNsYXNzTmFtZT1cImV4cG9ydC1tYXAtbW9kYWxfX2pzb24tb3B0aW9uc1wiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgTWFwIENvbmZpZ1xuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzdWJ0aXRsZVwiPlxuICAgICAgICAgIHtNQVBfQ09ORklHX0RFU0NSSVBUSU9OfVxuICAgICAgICAgIDxMaW5rIGhyZWY9e0dJVEhVQl9BRERfREFUQV9UT19NQVB9PlxuICAgICAgICAgICAgYWRkRGF0YVRvTWFwXG4gICAgICAgICAgPC9MaW5rPi5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0aW9uXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld2VyXCI+XG4gICAgICAgICAgPEpTT05QcmV0dHkgaWQ9XCJqc29uLXByZXR0eVwiIGpzb249e2NvbmZpZ30vPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXNjbGFpbWVyXCI+XG4gICAgICAgICAgPFN0eWxlZFdhcm5pbmc+XG4gICAgICAgICAgICAqIE1hcCBjb25maWcgaXMgY291cGxlZCB3aXRoIGxvYWRlZCBkYXRhc2V0cy4g4oCYZGF0YUlk4oCZIGlzIHVzZWQgdG8gYmluZCBsYXllcnMsIGZpbHRlcnMsIGFuZCB0b29sdGlwcyB0byBhIHNwZWNpZmljIGRhdGFzZXQuIFdoZW4gcGFzc2luZyB0aGlzIGNvbmZpZyB0byBhZGREYXRhVG9NYXAsIG1ha2Ugc3VyZSB0aGUgZGF0YXNldCBpZCBtYXRjaGVzIHRoZSBkYXRhSWQvcyBpbiB0aGlzIGNvbmZpZy5cbiAgICAgICAgICA8L1N0eWxlZFdhcm5pbmc+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9TdHlsZWRKc29uRXhwb3J0U2VjdGlvbj5cbiAgPC9kaXY+XG4pO1xuXG5FeHBvcnRKc29uTWFwLnByb3BUeXBlcyA9IGV4cG9ydEpzb25Qcm9wVHlwZXM7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcbiAgb25FZGl0VXNlck1hcGJveEFjY2Vzc1Rva2VuOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBvbkNoYW5nZUV4cG9ydERhdGE6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNoYW5nZUV4cG9ydE1hcFR5cGU6IFByb3BUeXBlcy5mdW5jLFxuICBtYXBGb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmdcbn07XG5cbmNvbnN0IEV4cG9ydE1hcE1vZGFsID0gKHtcbiAgY29uZmlnID0ge30sXG4gIG9uQ2hhbmdlRXhwb3J0RGF0YSA9ICgpID0+IHt9LFxuICBvbkNoYW5nZUV4cG9ydE1hcEZvcm1hdCAgPSAoKSA9PiB7fSxcbiAgb25FZGl0VXNlck1hcGJveEFjY2Vzc1Rva2VuID0gKCkgPT4ge30sXG4gIG9wdGlvbnMgPSB7fVxufSkgPT4gKFxuICA8U3R5bGVkTW9kYWxDb250ZW50IGNsYXNzTmFtZT1cImV4cG9ydC1tYXAtbW9kYWxcIj5cbiAgICA8ZGl2IHN0eWxlPXt7d2lkdGg6ICcxMDAlJ319PlxuICAgICAgPFN0eWxlZEV4cG9ydFNlY3Rpb24gc3R5bGU9e3ttYXJnaW5Cb3R0b206IElOVFJBX1NFQ1RJT05fTUFSR0lOR319PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgTWFwIGZvcm1hdFxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VidGl0bGVcIj5cbiAgICAgICAgICAgIENob29zZSB0aGUgZm9ybWF0IHRvIGV4cG9ydCB5b3VyIG1hcCB0b1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZWxlY3Rpb25cIj5cbiAgICAgICAgICB7RVhQT1JUX01BUF9GT1JNQVRfT1BUSU9OUy5tYXAob3AgPT5cbiAgICAgICAgICAgIDxTdHlsZWRUeXBlXG4gICAgICAgICAgICAgIGtleT17b3AuaWR9XG4gICAgICAgICAgICAgIHNlbGVjdGVkPXtvcHRpb25zLmZvcm1hdCA9PT0gb3AuaWR9XG4gICAgICAgICAgICAgIGF2YWlsYWJsZT17b3AuYXZhaWxhYmxlfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvcC5hdmFpbGFibGUgJiYgb25DaGFuZ2VFeHBvcnRNYXBGb3JtYXQob3AuaWQpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmlsZVR5cGUgZXh0PXtvcC5sYWJlbH0gaGVpZ2h0PVwiODBweFwiIGZvbnRTaXplPVwiMTFweFwiIC8+XG4gICAgICAgICAgICA8L1N0eWxlZFR5cGU+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L1N0eWxlZEV4cG9ydFNlY3Rpb24+XG4gICAgICB7e1xuICAgICAgICBbRVhQT1JUX01BUF9GT1JNQVQuSFRNTF06ICAoXG4gICAgICAgICAgPEV4cG9ydEh0bWxNYXBcbiAgICAgICAgICAgIG9wdGlvbnM9e29wdGlvbnNbb3B0aW9ucy5mb3JtYXRdfVxuICAgICAgICAgICAgb25FZGl0VXNlck1hcGJveEFjY2Vzc1Rva2VuPXtvbkVkaXRVc2VyTWFwYm94QWNjZXNzVG9rZW59XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgW0VYUE9SVF9NQVBfRk9STUFULkpTT05dOiAoXG4gICAgICAgICAgPEV4cG9ydEpzb25NYXBcbiAgICAgICAgICAgIGNvbmZpZz17Y29uZmlnfVxuICAgICAgICAgICAgb25DaGFuZ2VFeHBvcnREYXRhPXtvbkNoYW5nZUV4cG9ydERhdGF9XG4gICAgICAgICAgICBvcHRpb25zPXtvcHRpb25zW29wdGlvbnMuZm9ybWF0XX1cbiAgICAgICAgICAvPlxuICAgICAgICApXG4gICAgICB9W29wdGlvbnMuZm9ybWF0XX1cbiAgICA8L2Rpdj5cbiAgPC9TdHlsZWRNb2RhbENvbnRlbnQ+XG4pO1xuXG5FeHBvcnRNYXBNb2RhbC5wcm9wVHlwZXMgPSBwcm9wVHlwZXM7XG5cbmNvbnN0IEV4cG9ydE1hcE1vZGFsRmFjdG9yeSA9ICgpID0+IEV4cG9ydE1hcE1vZGFsO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBvcnRNYXBNb2RhbEZhY3Rvcnk7XG4iXX0=