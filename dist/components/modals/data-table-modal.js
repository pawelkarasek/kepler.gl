"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DatasetTabs = exports.DatasetModalTab = exports.DataTableModal = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _window = _interopRequireDefault(require("global/window"));

var _defaultSettings = require("../../constants/default-settings");

var _fieldToken = _interopRequireDefault(require("../common/field-token"));

var _datasetLabel = _interopRequireDefault(require("../common/dataset-label"));

var _icons = require("../common/icons");

var _mediaBreakpoints = require("../../styles/media-breakpoints");

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  border-bottom: 3px solid ", ";\n  cursor: pointer;\n  display: flex;\n  height: 35px;\n  margin: 0 3px;\n  padding: 0 5px;\n\n  :first-child {\n    margin-left: 0;\n    padding-left: 0;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  padding: 0 ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    margin: 0 -36px;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    .react-grid-Container {\n      /* TODO: replace data-grid component with react-window */\n      /* We need to use important in this case to override data-grid styling */\n      width: 100vw !important;\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .react-grid-Main {\n    outline: 0;\n  }\n\n  .react-grid-Grid {\n    border: 0;\n  }\n\n  .react-grid-Cell {\n    border-right: 0;\n    border-bottom: ", ";\n    padding-left: 16px;\n  }\n\n  .react-grid-HeaderCell {\n    border-right: 0;\n    border-bottom: 0;\n    background: ", ";\n    color: ", ";\n    padding: 14px 8px 14px 0;\n  }\n  .react-grid-Cell:first-child,\n  .react-grid-HeaderCell:first-child {\n    padding-left: ", ";\n  }\n  .react-grid-Cell:last-child,\n  .react-grid-HeaderCell:last-child {\n    padding-right: ", ";\n  }\n  .react-grid-Cell__value {\n    color: ", ";\n  }\n  .react-grid-Canvas {\n    ", ";\n  }\n  \n  ", ";\n  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ReactDataGrid = _window["default"].navigator ? require('react-data-grid/dist/react-data-grid.min') : null;
var shouldPreventScrollBack = false;

if (_window["default"].navigator && _window["default"].navigator.userAgent) {
  var navigator = _window["default"].navigator; // Detect browsers
  // http://stackoverflow.com/questions/5899783/detect-safari-using-jquery

  var isMac = navigator.userAgent.match(/Macintosh/);
  var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
  var is_safari = navigator.userAgent.indexOf('Safari') > -1;
  var is_firefox = navigator.userAgent.indexOf('Firefox') > -1; // prevent chrome scroll back

  shouldPreventScrollBack = isMac && (is_chrome || is_safari || is_firefox);
}

var dgSettings = {
  sidePadding: '38px'
};

var DataGridWrapper = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.panelBorderLT;
}, function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.titleColorLT;
}, dgSettings.sidePadding, dgSettings.sidePadding, function (props) {
  return props.theme.labelColorLT;
}, function (props) {
  return props.theme.modalScrollBar;
}, _mediaBreakpoints.media.palm(_templateObject2()));

var StyledModal = _styledComponents["default"].div(_templateObject3(), _mediaBreakpoints.media.palm(_templateObject4()));

var BooleanFormatter = function BooleanFormatter(_ref) {
  var value = _ref.value;
  return _react["default"].createElement("span", null, String(value));
};

var DataTableModal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(DataTableModal, _Component);

  function DataTableModal(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, DataTableModal);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(DataTableModal).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseWheel", function (e) {
      // Prevent futile scroll, which would trigger the Back/Next page event
      // https://github.com/micho/jQuery.preventMacBackScroll
      // This prevents scroll when reaching the topmost or leftmost
      // positions of a container.
      // react-data-grid canvas element can be scrolled
      var canvas = _this._root.querySelector('.react-grid-Canvas'); // If canvas can not be scrolled left anymore when we try to scroll left


      var prevent_left = e.deltaX < 0 && canvas.scrollLeft <= 0; // If canvas can not be scrolled up when we try to scroll up

      var prevent_up = e.deltaY < 0 && canvas.scrollTop <= 0;

      if (prevent_left || prevent_up) {
        e.preventDefault();
      }
    });
    _this._root = _react["default"].createRef();
    return _this;
  }

  (0, _createClass2["default"])(DataTableModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          datasets = _this$props.datasets,
          dataId = _this$props.dataId,
          showDatasetTable = _this$props.showDatasetTable;

      if (!datasets || !dataId) {
        return null;
      }

      var activeDataset = datasets[dataId]; // TODO: this should be all data

      var rows = activeDataset.data;
      var columns = activeDataset.fields.map(function (field, i) {
        return (0, _objectSpread2["default"])({}, field, {
          key: i,
          headerRenderer: _react["default"].createElement(FieldHeader, field),
          resizable: true,
          formatter: field.type === _defaultSettings.ALL_FIELD_TYPES["boolean"] ? BooleanFormatter : undefined
        });
      }).filter(function (_ref2) {
        var name = _ref2.name;
        return name !== '_geojson';
      });
      return _react["default"].createElement(StyledModal, {
        ref: this._root,
        className: "dataset-modal",
        style: {
          overflow: 'scroll'
        }
      }, _react["default"].createElement(DatasetTabs, {
        activeDataset: activeDataset,
        datasets: datasets,
        showDatasetTable: showDatasetTable
      }), _react["default"].createElement(DataGridWrapper, {
        onWheel: shouldPreventScrollBack ? this._onMouseWheel : null
      }, ReactDataGrid && _react["default"].createElement(ReactDataGrid, {
        headerRowHeight: 72,
        columns: columns,
        minColumnWidth: 172,
        minWidth: this.props.width,
        minHeight: this.props.height - 65,
        rowGetter: function rowGetter(i) {
          return rows[i];
        },
        rowHeight: 48,
        rowsCount: rows.length
      })));
    }
  }]);
  return DataTableModal;
}(_react.Component);

exports.DataTableModal = DataTableModal;
var tagContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

var FieldHeader = function FieldHeader(_ref3) {
  var name = _ref3.name,
      type = _ref3.type;
  return _react["default"].createElement("div", {
    style: tagContainerStyle
  }, _react["default"].createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, _react["default"].createElement("div", {
    style: {
      marginRight: type === 'timestamp' ? '2px' : '18px',
      height: '16px'
    }
  }, type === 'timestamp' ? _react["default"].createElement(_icons.Clock, {
    height: "16px"
  }) : null), name), _react["default"].createElement("div", {
    style: {
      marginLeft: '18px'
    }
  }, _react["default"].createElement(_fieldToken["default"], {
    type: type
  })));
};

var DatasetCatalog = _styledComponents["default"].div(_templateObject5(), dgSettings.sidePadding);

var DatasetModalTab = _styledComponents["default"].div(_templateObject6(), function (props) {
  return props.active ? 'black' : 'transparent';
});

exports.DatasetModalTab = DatasetModalTab;

var DatasetTabs = function DatasetTabs(_ref4) {
  var activeDataset = _ref4.activeDataset,
      datasets = _ref4.datasets,
      showDatasetTable = _ref4.showDatasetTable;
  return _react["default"].createElement(DatasetCatalog, {
    className: "dataset-modal-catalog"
  }, Object.values(datasets).map(function (dataset) {
    return _react["default"].createElement(DatasetModalTab, {
      className: "dataset-modal-tab",
      active: dataset === activeDataset,
      key: dataset.id,
      onClick: function onClick() {
        return showDatasetTable(dataset.id);
      }
    }, _react["default"].createElement(_datasetLabel["default"], {
      dataset: dataset
    }));
  }));
};

exports.DatasetTabs = DatasetTabs;

var DataTableModalFactory = function DataTableModalFactory() {
  return DataTableModal;
};

var _default = DataTableModalFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21vZGFscy9kYXRhLXRhYmxlLW1vZGFsLmpzIl0sIm5hbWVzIjpbIlJlYWN0RGF0YUdyaWQiLCJ3aW5kb3ciLCJuYXZpZ2F0b3IiLCJyZXF1aXJlIiwic2hvdWxkUHJldmVudFNjcm9sbEJhY2siLCJ1c2VyQWdlbnQiLCJpc01hYyIsIm1hdGNoIiwiaXNfY2hyb21lIiwiaW5kZXhPZiIsImlzX3NhZmFyaSIsImlzX2ZpcmVmb3giLCJkZ1NldHRpbmdzIiwic2lkZVBhZGRpbmciLCJEYXRhR3JpZFdyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwicGFuZWxCb3JkZXJMVCIsInBhbmVsQmFja2dyb3VuZExUIiwidGl0bGVDb2xvckxUIiwibGFiZWxDb2xvckxUIiwibW9kYWxTY3JvbGxCYXIiLCJtZWRpYSIsInBhbG0iLCJTdHlsZWRNb2RhbCIsIkJvb2xlYW5Gb3JtYXR0ZXIiLCJ2YWx1ZSIsIlN0cmluZyIsIkRhdGFUYWJsZU1vZGFsIiwiZSIsImNhbnZhcyIsIl9yb290IiwicXVlcnlTZWxlY3RvciIsInByZXZlbnRfbGVmdCIsImRlbHRhWCIsInNjcm9sbExlZnQiLCJwcmV2ZW50X3VwIiwiZGVsdGFZIiwic2Nyb2xsVG9wIiwicHJldmVudERlZmF1bHQiLCJSZWFjdCIsImNyZWF0ZVJlZiIsImRhdGFzZXRzIiwiZGF0YUlkIiwic2hvd0RhdGFzZXRUYWJsZSIsImFjdGl2ZURhdGFzZXQiLCJyb3dzIiwiZGF0YSIsImNvbHVtbnMiLCJmaWVsZHMiLCJtYXAiLCJmaWVsZCIsImkiLCJrZXkiLCJoZWFkZXJSZW5kZXJlciIsInJlc2l6YWJsZSIsImZvcm1hdHRlciIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJ1bmRlZmluZWQiLCJmaWx0ZXIiLCJuYW1lIiwib3ZlcmZsb3ciLCJfb25Nb3VzZVdoZWVsIiwid2lkdGgiLCJoZWlnaHQiLCJsZW5ndGgiLCJDb21wb25lbnQiLCJ0YWdDb250YWluZXJTdHlsZSIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwianVzdGlmeUNvbnRlbnQiLCJGaWVsZEhlYWRlciIsImFsaWduSXRlbXMiLCJtYXJnaW5SaWdodCIsIm1hcmdpbkxlZnQiLCJEYXRhc2V0Q2F0YWxvZyIsIkRhdGFzZXRNb2RhbFRhYiIsImFjdGl2ZSIsIkRhdGFzZXRUYWJzIiwiT2JqZWN0IiwidmFsdWVzIiwiZGF0YXNldCIsImlkIiwiRGF0YVRhYmxlTW9kYWxGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLEdBQUdDLG1CQUFPQyxTQUFQLEdBQW1CQyxPQUFPLENBQUMsMENBQUQsQ0FBMUIsR0FBeUUsSUFBL0Y7QUFFQSxJQUFJQyx1QkFBdUIsR0FBRyxLQUE5Qjs7QUFFQSxJQUFJSCxtQkFBT0MsU0FBUCxJQUFvQkQsbUJBQU9DLFNBQVAsQ0FBaUJHLFNBQXpDLEVBQW9EO0FBQUEsTUFDM0NILFNBRDJDLEdBQzlCRCxrQkFEOEIsQ0FDM0NDLFNBRDJDLEVBRWxEO0FBQ0E7O0FBQ0EsTUFBTUksS0FBSyxHQUFHSixTQUFTLENBQUNHLFNBQVYsQ0FBb0JFLEtBQXBCLENBQTBCLFdBQTFCLENBQWQ7QUFDQSxNQUFNQyxTQUFTLEdBQUdOLFNBQVMsQ0FBQ0csU0FBVixDQUFvQkksT0FBcEIsQ0FBNEIsUUFBNUIsSUFBd0MsQ0FBQyxDQUEzRDtBQUNBLE1BQU1DLFNBQVMsR0FBR1IsU0FBUyxDQUFDRyxTQUFWLENBQW9CSSxPQUFwQixDQUE0QixRQUE1QixJQUF3QyxDQUFDLENBQTNEO0FBQ0EsTUFBTUUsVUFBVSxHQUFHVCxTQUFTLENBQUNHLFNBQVYsQ0FBb0JJLE9BQXBCLENBQTRCLFNBQTVCLElBQXlDLENBQUMs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QSxNQUEyQkUsZ0JBQTNCLFNBQTJCQSxnQkFBM0I7QUFBQSxTQUN6QixnQ0FBQyxjQUFEO0FBQWdCLElBQUEsU0FBUyxFQUFDO0FBQTFCLEtBQ0dvQyxNQUFNLENBQUNDLE1BQVAsQ0FBY3ZDLFFBQWQsRUFBd0JRLEdBQXhCLENBQTRCLFVBQUFnQyxPQUFPO0FBQUEsV0FDbEMsZ0NBQUMsZUFBRDtBQUNFLE1BQUEsU0FBUyxFQUFDLG1CQURaO0FBRUUsTUFBQSxNQUFNLEVBQUVBLE9BQU8sS0FBS3JDLGFBRnRCO0FBR0UsTUFBQSxHQUFHLEVBQUVxQyxPQUFPLENBQUNDLEVBSGY7QUFJRSxNQUFBLE9BQU8sRUFBRTtBQUFBLGVBQU12QyxnQkFBZ0IsQ0FBQ3NDLE9BQU8sQ0FBQ0MsRUFBVCxDQUF0QjtBQUFBO0FBSlgsT0FNRSxnQ0FBQyx3QkFBRDtBQUFjLE1BQUEsT0FBTyxFQUFFRDtBQUF2QixNQU5GLENBRGtDO0FBQUEsR0FBbkMsQ0FESCxDQUR5QjtBQUFBLENBQXBCOzs7O0FBZVAsSUFBTUUscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QjtBQUFBLFNBQU14RCxjQUFOO0FBQUEsQ0FBOUI7O2VBQ2V3RCxxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IEZpZWxkVG9rZW4gZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmllbGQtdG9rZW4nO1xuaW1wb3J0IERhdGFzZXRMYWJlbCBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9kYXRhc2V0LWxhYmVsJztcbmltcG9ydCB7Q2xvY2t9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zL2luZGV4JztcblxuLy8gQnJlYWtwb2ludHNcbmltcG9ydCB7bWVkaWF9IGZyb20gJ3N0eWxlcy9tZWRpYS1icmVha3BvaW50cyc7XG5cbmNvbnN0IFJlYWN0RGF0YUdyaWQgPSB3aW5kb3cubmF2aWdhdG9yID8gcmVxdWlyZSgncmVhY3QtZGF0YS1ncmlkL2Rpc3QvcmVhY3QtZGF0YS1ncmlkLm1pbicpIDogbnVsbDtcblxubGV0IHNob3VsZFByZXZlbnRTY3JvbGxCYWNrID0gZmFsc2U7XG5cbmlmICh3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSB7XG4gIGNvbnN0IHtuYXZpZ2F0b3J9ID0gd2luZG93O1xuICAvLyBEZXRlY3QgYnJvd3NlcnNcbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81ODk5NzgzL2RldGVjdC1zYWZhcmktdXNpbmctanF1ZXJ5XG4gIGNvbnN0IGlzTWFjID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTWFjaW50b3NoLyk7XG4gIGNvbnN0IGlzX2Nocm9tZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMTtcbiAgY29uc3QgaXNfc2FmYXJpID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSA+IC0xO1xuICBjb25zdCBpc19maXJlZm94ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgPiAtMTtcblxuICAvLyBwcmV2ZW50IGNocm9tZSBzY3JvbGwgYmFja1xuICBzaG91bGRQcmV2ZW50U2Nyb2xsQmFjayA9IGlzTWFjICYmIChpc19jaHJvbWUgfHwgaXNfc2FmYXJpIHx8IGlzX2ZpcmVmb3gpO1xufVxuXG5jb25zdCBkZ1NldHRpbmdzID0ge1xuICBzaWRlUGFkZGluZzogJzM4cHgnXG59O1xuXG5jb25zdCBEYXRhR3JpZFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAucmVhY3QtZ3JpZC1NYWluIHtcbiAgICBvdXRsaW5lOiAwO1xuICB9XG5cbiAgLnJlYWN0LWdyaWQtR3JpZCB7XG4gICAgYm9yZGVyOiAwO1xuICB9XG5cbiAgLnJlYWN0LWdyaWQtQ2VsbCB7XG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgIGJvcmRlci1ib3R0b206ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCb3JkZXJMVH07XG4gICAgcGFkZGluZy1sZWZ0OiAxNnB4O1xuICB9XG5cbiAgLnJlYWN0LWdyaWQtSGVhZGVyQ2VsbCB7XG4gICAgYm9yZGVyLXJpZ2h0OiAwO1xuICAgIGJvcmRlci1ib3R0b206IDA7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmRMVH07XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGl0bGVDb2xvckxUfTtcbiAgICBwYWRkaW5nOiAxNHB4IDhweCAxNHB4IDA7XG4gIH1cbiAgLnJlYWN0LWdyaWQtQ2VsbDpmaXJzdC1jaGlsZCxcbiAgLnJlYWN0LWdyaWQtSGVhZGVyQ2VsbDpmaXJzdC1jaGlsZCB7XG4gICAgcGFkZGluZy1sZWZ0OiAke2RnU2V0dGluZ3Muc2lkZVBhZGRpbmd9O1xuICB9XG4gIC5yZWFjdC1ncmlkLUNlbGw6bGFzdC1jaGlsZCxcbiAgLnJlYWN0LWdyaWQtSGVhZGVyQ2VsbDpsYXN0LWNoaWxkIHtcbiAgICBwYWRkaW5nLXJpZ2h0OiAke2RnU2V0dGluZ3Muc2lkZVBhZGRpbmd9O1xuICB9XG4gIC5yZWFjdC1ncmlkLUNlbGxfX3ZhbHVlIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yTFR9O1xuICB9XG4gIC5yZWFjdC1ncmlkLUNhbnZhcyB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tb2RhbFNjcm9sbEJhcn07XG4gIH1cbiAgXG4gICR7bWVkaWEucGFsbWBcbiAgICAucmVhY3QtZ3JpZC1Db250YWluZXIge1xuICAgICAgLyogVE9ETzogcmVwbGFjZSBkYXRhLWdyaWQgY29tcG9uZW50IHdpdGggcmVhY3Qtd2luZG93ICovXG4gICAgICAvKiBXZSBuZWVkIHRvIHVzZSBpbXBvcnRhbnQgaW4gdGhpcyBjYXNlIHRvIG92ZXJyaWRlIGRhdGEtZ3JpZCBzdHlsaW5nICovXG4gICAgICB3aWR0aDogMTAwdncgIWltcG9ydGFudDtcbiAgICB9XG4gIGB9O1xuICBcbmA7XG5jb25zdCBTdHlsZWRNb2RhbCA9IHN0eWxlZC5kaXZgXG4gICR7bWVkaWEucGFsbWBcbiAgICBtYXJnaW46IDAgLTM2cHg7XG4gIGB9XG5gO1xuY29uc3QgQm9vbGVhbkZvcm1hdHRlciA9ICh7dmFsdWV9KSA9PiA8c3Bhbj57U3RyaW5nKHZhbHVlKX08L3NwYW4+O1xuXG5leHBvcnQgY2xhc3MgRGF0YVRhYmxlTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuX3Jvb3QgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgfVxuXG4gIF9vbk1vdXNlV2hlZWwgPSBlID0+IHtcbiAgICAvLyBQcmV2ZW50IGZ1dGlsZSBzY3JvbGwsIHdoaWNoIHdvdWxkIHRyaWdnZXIgdGhlIEJhY2svTmV4dCBwYWdlIGV2ZW50XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21pY2hvL2pRdWVyeS5wcmV2ZW50TWFjQmFja1Njcm9sbFxuICAgIC8vIFRoaXMgcHJldmVudHMgc2Nyb2xsIHdoZW4gcmVhY2hpbmcgdGhlIHRvcG1vc3Qgb3IgbGVmdG1vc3RcbiAgICAvLyBwb3NpdGlvbnMgb2YgYSBjb250YWluZXIuXG5cbiAgICAvLyByZWFjdC1kYXRhLWdyaWQgY2FudmFzIGVsZW1lbnQgY2FuIGJlIHNjcm9sbGVkXG4gICAgY29uc3QgY2FudmFzID0gdGhpcy5fcm9vdC5xdWVyeVNlbGVjdG9yKCcucmVhY3QtZ3JpZC1DYW52YXMnKTtcblxuICAgIC8vIElmIGNhbnZhcyBjYW4gbm90IGJlIHNjcm9sbGVkIGxlZnQgYW55bW9yZSB3aGVuIHdlIHRyeSB0byBzY3JvbGwgbGVmdFxuICAgIGNvbnN0IHByZXZlbnRfbGVmdCA9IGUuZGVsdGFYIDwgMCAmJiBjYW52YXMuc2Nyb2xsTGVmdCA8PSAwO1xuICAgIC8vIElmIGNhbnZhcyBjYW4gbm90IGJlIHNjcm9sbGVkIHVwIHdoZW4gd2UgdHJ5IHRvIHNjcm9sbCB1cFxuICAgIGNvbnN0IHByZXZlbnRfdXAgPSBlLmRlbHRhWSA8IDAgJiYgY2FudmFzLnNjcm9sbFRvcCA8PSAwO1xuXG4gICAgaWYgKHByZXZlbnRfbGVmdCB8fCBwcmV2ZW50X3VwKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7ZGF0YXNldHMsIGRhdGFJZCwgc2hvd0RhdGFzZXRUYWJsZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFkYXRhc2V0cyB8fCAhZGF0YUlkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVEYXRhc2V0ID0gZGF0YXNldHNbZGF0YUlkXTtcbiAgICAvLyBUT0RPOiB0aGlzIHNob3VsZCBiZSBhbGwgZGF0YVxuICAgIGNvbnN0IHJvd3MgPSBhY3RpdmVEYXRhc2V0LmRhdGE7XG4gICAgY29uc3QgY29sdW1ucyA9IGFjdGl2ZURhdGFzZXQuZmllbGRzXG4gICAgICAubWFwKChmaWVsZCwgaSkgPT4gKHtcbiAgICAgICAgLi4uZmllbGQsXG4gICAgICAgIGtleTogaSxcbiAgICAgICAgaGVhZGVyUmVuZGVyZXI6IDxGaWVsZEhlYWRlciB7Li4uZmllbGR9IC8+LFxuICAgICAgICByZXNpemFibGU6IHRydWUsXG4gICAgICAgIGZvcm1hdHRlcjpcbiAgICAgICAgICBmaWVsZC50eXBlID09PSBBTExfRklFTERfVFlQRVMuYm9vbGVhbiA/IEJvb2xlYW5Gb3JtYXR0ZXIgOiB1bmRlZmluZWRcbiAgICAgIH0pKVxuICAgICAgLmZpbHRlcigoe25hbWV9KSA9PiBuYW1lICE9PSAnX2dlb2pzb24nKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTW9kYWwgcmVmPXt0aGlzLl9yb290fSBjbGFzc05hbWU9XCJkYXRhc2V0LW1vZGFsXCIgc3R5bGU9e3tvdmVyZmxvdzogJ3Njcm9sbCd9fT5cbiAgICAgICAgPERhdGFzZXRUYWJzXG4gICAgICAgICAgYWN0aXZlRGF0YXNldD17YWN0aXZlRGF0YXNldH1cbiAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZT17c2hvd0RhdGFzZXRUYWJsZX1cbiAgICAgICAgLz5cbiAgICAgICAgPERhdGFHcmlkV3JhcHBlclxuICAgICAgICAgIG9uV2hlZWw9e3Nob3VsZFByZXZlbnRTY3JvbGxCYWNrID8gdGhpcy5fb25Nb3VzZVdoZWVsIDogbnVsbH1cbiAgICAgICAgPlxuICAgICAgICAgIHtSZWFjdERhdGFHcmlkICYmIChcbiAgICAgICAgICAgIDxSZWFjdERhdGFHcmlkXG4gICAgICAgICAgICAgIGhlYWRlclJvd0hlaWdodD17NzJ9XG4gICAgICAgICAgICAgIGNvbHVtbnM9e2NvbHVtbnN9XG4gICAgICAgICAgICAgIG1pbkNvbHVtbldpZHRoPXsxNzJ9XG4gICAgICAgICAgICAgIG1pbldpZHRoPXt0aGlzLnByb3BzLndpZHRofVxuICAgICAgICAgICAgICBtaW5IZWlnaHQ9e3RoaXMucHJvcHMuaGVpZ2h0IC0gNjV9XG4gICAgICAgICAgICAgIHJvd0dldHRlcj17aSA9PiByb3dzW2ldfVxuICAgICAgICAgICAgICByb3dIZWlnaHQ9ezQ4fVxuICAgICAgICAgICAgICByb3dzQ291bnQ9e3Jvd3MubGVuZ3RofVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L0RhdGFHcmlkV3JhcHBlcj5cbiAgICAgIDwvU3R5bGVkTW9kYWw+XG4gICAgKTtcbiAgfVxufVxuXG5jb25zdCB0YWdDb250YWluZXJTdHlsZSA9IHtcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJ1xufTtcblxuY29uc3QgRmllbGRIZWFkZXIgPSAoe25hbWUsIHR5cGV9KSA9PiAoXG4gIDxkaXYgc3R5bGU9e3RhZ0NvbnRhaW5lclN0eWxlfT5cbiAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJ319PlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpblJpZ2h0OiB0eXBlID09PSAndGltZXN0YW1wJyA/ICcycHgnIDogJzE4cHgnLFxuICAgICAgICAgIGhlaWdodDogJzE2cHgnXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHt0eXBlID09PSAndGltZXN0YW1wJyA/IDxDbG9jayBoZWlnaHQ9XCIxNnB4XCIgLz4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgICB7bmFtZX1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IHN0eWxlPXt7bWFyZ2luTGVmdDogJzE4cHgnfX0+XG4gICAgICA8RmllbGRUb2tlbiB0eXBlPXt0eXBlfSAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IERhdGFzZXRDYXRhbG9nID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgcGFkZGluZzogMCAke2RnU2V0dGluZ3Muc2lkZVBhZGRpbmd9O1xuYDtcblxuZXhwb3J0IGNvbnN0IERhdGFzZXRNb2RhbFRhYiA9IHN0eWxlZC5kaXZgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAke3Byb3BzID0+IChwcm9wcy5hY3RpdmUgPyAnYmxhY2snIDogJ3RyYW5zcGFyZW50Jyl9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMzVweDtcbiAgbWFyZ2luOiAwIDNweDtcbiAgcGFkZGluZzogMCA1cHg7XG5cbiAgOmZpcnN0LWNoaWxkIHtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBEYXRhc2V0VGFicyA9ICh7YWN0aXZlRGF0YXNldCwgZGF0YXNldHMsIHNob3dEYXRhc2V0VGFibGV9KSA9PiAoXG4gIDxEYXRhc2V0Q2F0YWxvZyBjbGFzc05hbWU9XCJkYXRhc2V0LW1vZGFsLWNhdGFsb2dcIj5cbiAgICB7T2JqZWN0LnZhbHVlcyhkYXRhc2V0cykubWFwKGRhdGFzZXQgPT4gKFxuICAgICAgPERhdGFzZXRNb2RhbFRhYlxuICAgICAgICBjbGFzc05hbWU9XCJkYXRhc2V0LW1vZGFsLXRhYlwiXG4gICAgICAgIGFjdGl2ZT17ZGF0YXNldCA9PT0gYWN0aXZlRGF0YXNldH1cbiAgICAgICAga2V5PXtkYXRhc2V0LmlkfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93RGF0YXNldFRhYmxlKGRhdGFzZXQuaWQpfVxuICAgICAgPlxuICAgICAgICA8RGF0YXNldExhYmVsIGRhdGFzZXQ9e2RhdGFzZXR9Lz5cbiAgICAgIDwvRGF0YXNldE1vZGFsVGFiPlxuICAgICkpfVxuICA8L0RhdGFzZXRDYXRhbG9nPlxuKTtcblxuY29uc3QgRGF0YVRhYmxlTW9kYWxGYWN0b3J5ID0gKCkgPT4gRGF0YVRhYmxlTW9kYWw7XG5leHBvcnQgZGVmYXVsdCBEYXRhVGFibGVNb2RhbEZhY3Rvcnk7XG4iXX0=