"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DatasetTag = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _d3Format = require("d3-format");

var _styledComponents2 = require("../common/styled-components");

var _icons = require("../common/icons");

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 11px;\n  color: ", ";\n  padding-left: 19px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-left: 12px;\n  height: 16px;\n  opacity: 0;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  color: ", ";\n  font-size: 11px;\n  letter-spacing: 0.2px;\n  overflow: auto;\n\n  .dataset-color {\n    flex-shrink: 0;\n    margin-top: 5px;\n  }\n\n  .dataset-name {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  display: flex;\n  align-items: flex-start;\n\n  .source-data-arrow {\n    height: 16px;\n  }\n  :hover {\n    color: ", ";\n    cursor: ", ";\n\n    .dataset-action {\n      color: ", ";\n      opacity: 1;\n    }\n\n    .dataset-action:hover {\n      color: white;\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var defaultRemoveDataset = function defaultRemoveDataset(datasetKey) {};

var numFormat = (0, _d3Format.format)(',');

var SourceDataCatelogWrapper = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.transition;
});

var DatasetTitle = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.clickable ? props.theme.textColorHl : props.theme.textColor;
}, function (props) {
  return props.clickable ? 'pointer' : 'auto';
}, function (props) {
  return props.theme.textColorHl;
});

var DatasetTagWrapper = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.theme.textColor;
});

var DataTagAction = _styledComponents["default"].div(_templateObject4());

var DataRowCount = _styledComponents["default"].div(_templateObject5(), function (props) {
  return props.theme.subtextColor;
});

var DatasetTag = function DatasetTag(_ref) {
  var onClick = _ref.onClick,
      dataset = _ref.dataset;
  return _react["default"].createElement(DatasetTagWrapper, {
    className: "source-data-tag",
    onClick: onClick
  }, _react["default"].createElement(_styledComponents2.DatasetSquare, {
    className: "dataset-color",
    color: dataset.color
  }), _react["default"].createElement("div", {
    className: "dataset-name"
  }, dataset.label));
};

exports.DatasetTag = DatasetTag;

var ShowDataTable = function ShowDataTable(_ref2) {
  var id = _ref2.id,
      showDatasetTable = _ref2.showDatasetTable;
  return _react["default"].createElement(DataTagAction, {
    className: "dataset-action show-data-table",
    "data-tip": true,
    "data-for": "data-table-".concat(id)
  }, _react["default"].createElement(_icons.Table, {
    height: "16px",
    onClick: function onClick() {
      return showDatasetTable(id);
    }
  }), _react["default"].createElement(_styledComponents2.Tooltip, {
    id: "data-table-".concat(id),
    effect: "solid"
  }, _react["default"].createElement("span", null, "Show data table")));
};

var RemoveDataset = function RemoveDataset(_ref3) {
  var datasetKey = _ref3.datasetKey,
      _ref3$removeDataset = _ref3.removeDataset,
      removeDataset = _ref3$removeDataset === void 0 ? defaultRemoveDataset : _ref3$removeDataset;
  return _react["default"].createElement(DataTagAction, {
    className: "dataset-action remove-dataset",
    "data-tip": true,
    "data-for": "delete-".concat(datasetKey)
  }, _react["default"].createElement(_icons.Trash, {
    height: "16px",
    onClick: function onClick(e) {
      e.stopPropagation();
      removeDataset(datasetKey);
    }
  }), _react["default"].createElement(_styledComponents2.Tooltip, {
    id: "delete-".concat(datasetKey),
    effect: "solid",
    type: "error"
  }, _react["default"].createElement("span", null, "Remove dataset")));
};

function SourceDataCatalogFactory() {
  var SourceDataCatalog = function SourceDataCatalog(_ref4) {
    var datasets = _ref4.datasets,
        showDatasetTable = _ref4.showDatasetTable,
        removeDataset = _ref4.removeDataset,
        _ref4$showDeleteDatas = _ref4.showDeleteDataset,
        showDeleteDataset = _ref4$showDeleteDatas === void 0 ? false : _ref4$showDeleteDatas;
    return _react["default"].createElement(SourceDataCatelogWrapper, {
      className: "source-data-catalog"
    }, Object.values(datasets).map(function (dataset, index) {
      return _react["default"].createElement(_styledComponents2.SidePanelSection, {
        key: dataset.id
      }, _react["default"].createElement(DatasetTitle, {
        className: "source-data-title",
        clickable: Boolean(showDatasetTable)
      }, _react["default"].createElement(DatasetTag, {
        dataset: dataset,
        onClick: showDatasetTable ? function () {
          return showDatasetTable(dataset.id);
        } : null
      }), showDatasetTable ? _react["default"].createElement(_styledComponents2.CenterFlexbox, {
        className: "source-data-arrow"
      }, _react["default"].createElement(_icons.ArrowRight, {
        height: "12px"
      })) : null, showDatasetTable ? _react["default"].createElement(ShowDataTable, {
        id: dataset.id,
        showDatasetTable: showDatasetTable
      }) : null, showDeleteDataset ? _react["default"].createElement(RemoveDataset, {
        datasetKey: dataset.id,
        removeDataset: removeDataset
      }) : null), showDatasetTable ? _react["default"].createElement(DataRowCount, {
        className: "source-data-rows"
      }, "".concat(numFormat(dataset.allData.length), " rows")) : null);
    }));
  };

  return SourceDataCatalog;
}

var _default = SourceDataCatalogFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvc291cmNlLWRhdGEtY2F0YWxvZy5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UmVtb3ZlRGF0YXNldCIsImRhdGFzZXRLZXkiLCJudW1Gb3JtYXQiLCJTb3VyY2VEYXRhQ2F0ZWxvZ1dyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwidHJhbnNpdGlvbiIsIkRhdGFzZXRUaXRsZSIsInRleHRDb2xvciIsImNsaWNrYWJsZSIsInRleHRDb2xvckhsIiwiRGF0YXNldFRhZ1dyYXBwZXIiLCJEYXRhVGFnQWN0aW9uIiwiRGF0YVJvd0NvdW50Iiwic3VidGV4dENvbG9yIiwiRGF0YXNldFRhZyIsIm9uQ2xpY2siLCJkYXRhc2V0IiwiY29sb3IiLCJsYWJlbCIsIlNob3dEYXRhVGFibGUiLCJpZCIsInNob3dEYXRhc2V0VGFibGUiLCJSZW1vdmVEYXRhc2V0IiwicmVtb3ZlRGF0YXNldCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJTb3VyY2VEYXRhQ2F0YWxvZ0ZhY3RvcnkiLCJTb3VyY2VEYXRhQ2F0YWxvZyIsImRhdGFzZXRzIiwic2hvd0RlbGV0ZURhdGFzZXQiLCJPYmplY3QiLCJ2YWx1ZXMiLCJtYXAiLCJpbmRleCIsIkJvb2xlYW4iLCJhbGxEYXRhIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQUMsVUFBVSxFQUFJLENBQUUsQ0FBN0M7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLHNCQUFPLEdBQVAsQ0FBbEI7O0FBRUEsSUFBTUMsd0JBQXdCLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUNkLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtB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O0FBRUUsUUFBQSxnQkFBZ0IsRUFBRUM7QUFGcEIsUUFEZSxHQUtiLElBaEJOLEVBaUJHUSxpQkFBaUIsR0FDaEIsZ0NBQUMsYUFBRDtBQUNFLFFBQUEsVUFBVSxFQUFFYixPQUFPLENBQUNJLEVBRHRCO0FBRUUsUUFBQSxhQUFhLEVBQUVHO0FBRmpCLFFBRGdCLEdBS2QsSUF0Qk4sQ0FERixFQXlCR0YsZ0JBQWdCLEdBQ2YsZ0NBQUMsWUFBRDtBQUFjLFFBQUEsU0FBUyxFQUFDO0FBQXhCLG1CQUErQ3RCLFNBQVMsQ0FDdERpQixPQUFPLENBQUNtQixPQUFSLENBQWdCQyxNQURzQyxDQUF4RCxXQURlLEdBSWIsSUE3Qk4sQ0FEMkI7QUFBQSxLQUE1QixDQURILENBTndCO0FBQUEsR0FBMUI7O0FBMkNBLFNBQU9ULGlCQUFQO0FBQ0Q7O2VBRWNELHdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ2QzLWZvcm1hdCc7XG5cbmltcG9ydCB7U2lkZVBhbmVsU2VjdGlvbiwgVG9vbHRpcCwgRGF0YXNldFNxdWFyZSwgQ2VudGVyRmxleGJveH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtUYWJsZSwgVHJhc2gsIEFycm93UmlnaHR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcblxuY29uc3QgZGVmYXVsdFJlbW92ZURhdGFzZXQgPSBkYXRhc2V0S2V5ID0+IHt9O1xuY29uc3QgbnVtRm9ybWF0ID0gZm9ybWF0KCcsJyk7XG5cbmNvbnN0IFNvdXJjZURhdGFDYXRlbG9nV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvbn07XG5gO1xuXG5jb25zdCBEYXRhc2V0VGl0bGUgPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcblxuICAuc291cmNlLWRhdGEtYXJyb3cge1xuICAgIGhlaWdodDogMTZweDtcbiAgfVxuICA6aG92ZXIge1xuICAgIGNvbG9yOiAke3Byb3BzID0+XG4gICAgICBwcm9wcy5jbGlja2FibGUgPyBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbCA6IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gICAgY3Vyc29yOiAke3Byb3BzID0+IChwcm9wcy5jbGlja2FibGUgPyAncG9pbnRlcicgOiAnYXV0bycpfTtcblxuICAgIC5kYXRhc2V0LWFjdGlvbiB7XG4gICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cblxuICAgIC5kYXRhc2V0LWFjdGlvbjpob3ZlciB7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuICB9XG5gO1xuXG5jb25zdCBEYXRhc2V0VGFnV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMnB4O1xuICBvdmVyZmxvdzogYXV0bztcblxuICAuZGF0YXNldC1jb2xvciB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICB9XG5cbiAgLmRhdGFzZXQtbmFtZSB7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB9XG5gO1xuXG5jb25zdCBEYXRhVGFnQWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XG4gIGhlaWdodDogMTZweDtcbiAgb3BhY2l0eTogMDtcbmA7XG5cbmNvbnN0IERhdGFSb3dDb3VudCA9IHN0eWxlZC5kaXZgXG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yfTtcbiAgcGFkZGluZy1sZWZ0OiAxOXB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IERhdGFzZXRUYWcgPSAoe29uQ2xpY2ssIGRhdGFzZXR9KSA9PiAoXG4gIDxEYXRhc2V0VGFnV3JhcHBlciBjbGFzc05hbWU9XCJzb3VyY2UtZGF0YS10YWdcIiBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICA8RGF0YXNldFNxdWFyZSBjbGFzc05hbWU9XCJkYXRhc2V0LWNvbG9yXCIgY29sb3I9e2RhdGFzZXQuY29sb3J9IC8+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJkYXRhc2V0LW5hbWVcIj57ZGF0YXNldC5sYWJlbH08L2Rpdj5cbiAgPC9EYXRhc2V0VGFnV3JhcHBlcj5cbik7XG5cbmNvbnN0IFNob3dEYXRhVGFibGUgPSAoe2lkLCBzaG93RGF0YXNldFRhYmxlfSkgPT4gKFxuICA8RGF0YVRhZ0FjdGlvblxuICAgIGNsYXNzTmFtZT1cImRhdGFzZXQtYWN0aW9uIHNob3ctZGF0YS10YWJsZVwiXG4gICAgZGF0YS10aXBcbiAgICBkYXRhLWZvcj17YGRhdGEtdGFibGUtJHtpZH1gfVxuICA+XG4gICAgPFRhYmxlIGhlaWdodD1cIjE2cHhcIiBvbkNsaWNrPXsoKSA9PiBzaG93RGF0YXNldFRhYmxlKGlkKX0gLz5cbiAgICA8VG9vbHRpcCBpZD17YGRhdGEtdGFibGUtJHtpZH1gfSBlZmZlY3Q9XCJzb2xpZFwiPlxuICAgICAgPHNwYW4+U2hvdyBkYXRhIHRhYmxlPC9zcGFuPlxuICAgIDwvVG9vbHRpcD5cbiAgPC9EYXRhVGFnQWN0aW9uPlxuKTtcblxuY29uc3QgUmVtb3ZlRGF0YXNldCA9ICh7ZGF0YXNldEtleSwgcmVtb3ZlRGF0YXNldCA9IGRlZmF1bHRSZW1vdmVEYXRhc2V0fSkgPT4gKFxuICA8RGF0YVRhZ0FjdGlvblxuICAgIGNsYXNzTmFtZT1cImRhdGFzZXQtYWN0aW9uIHJlbW92ZS1kYXRhc2V0XCJcbiAgICBkYXRhLXRpcFxuICAgIGRhdGEtZm9yPXtgZGVsZXRlLSR7ZGF0YXNldEtleX1gfVxuICA+XG4gICAgPFRyYXNoXG4gICAgICBoZWlnaHQ9XCIxNnB4XCJcbiAgICAgIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICByZW1vdmVEYXRhc2V0KGRhdGFzZXRLZXkpO1xuICAgICAgfX1cbiAgICAvPlxuICAgIDxUb29sdGlwIGlkPXtgZGVsZXRlLSR7ZGF0YXNldEtleX1gfSBlZmZlY3Q9XCJzb2xpZFwiIHR5cGU9XCJlcnJvclwiPlxuICAgICAgPHNwYW4+UmVtb3ZlIGRhdGFzZXQ8L3NwYW4+XG4gICAgPC9Ub29sdGlwPlxuICA8L0RhdGFUYWdBY3Rpb24+XG4pO1xuXG5mdW5jdGlvbiBTb3VyY2VEYXRhQ2F0YWxvZ0ZhY3RvcnkoKSB7XG4gIGNvbnN0IFNvdXJjZURhdGFDYXRhbG9nID0gKHtcbiAgICBkYXRhc2V0cyxcbiAgICBzaG93RGF0YXNldFRhYmxlLFxuICAgIHJlbW92ZURhdGFzZXQsXG4gICAgc2hvd0RlbGV0ZURhdGFzZXQgPSBmYWxzZVxuICB9KSA9PiAoXG4gICAgPFNvdXJjZURhdGFDYXRlbG9nV3JhcHBlciBjbGFzc05hbWU9XCJzb3VyY2UtZGF0YS1jYXRhbG9nXCI+XG4gICAgICB7T2JqZWN0LnZhbHVlcyhkYXRhc2V0cykubWFwKChkYXRhc2V0LCBpbmRleCkgPT4gKFxuICAgICAgICA8U2lkZVBhbmVsU2VjdGlvbiBrZXk9e2RhdGFzZXQuaWR9PlxuICAgICAgICAgIDxEYXRhc2V0VGl0bGUgY2xhc3NOYW1lPVwic291cmNlLWRhdGEtdGl0bGVcIiBjbGlja2FibGU9e0Jvb2xlYW4oc2hvd0RhdGFzZXRUYWJsZSl9PlxuICAgICAgICAgICAgPERhdGFzZXRUYWdcbiAgICAgICAgICAgICAgZGF0YXNldD17ZGF0YXNldH1cbiAgICAgICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZSA/ICgpID0+IHNob3dEYXRhc2V0VGFibGUoZGF0YXNldC5pZCkgOiBudWxsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7c2hvd0RhdGFzZXRUYWJsZSA/XG4gICAgICAgICAgICAgIDxDZW50ZXJGbGV4Ym94IGNsYXNzTmFtZT1cInNvdXJjZS1kYXRhLWFycm93XCI+XG4gICAgICAgICAgICAgICAgPEFycm93UmlnaHQgaGVpZ2h0PVwiMTJweFwiIC8+XG4gICAgICAgICAgICAgIDwvQ2VudGVyRmxleGJveD4gOiBudWxsfVxuICAgICAgICAgICAge3Nob3dEYXRhc2V0VGFibGUgPyAoXG4gICAgICAgICAgICAgIDxTaG93RGF0YVRhYmxlXG4gICAgICAgICAgICAgICAgaWQ9e2RhdGFzZXQuaWR9XG4gICAgICAgICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZT17c2hvd0RhdGFzZXRUYWJsZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge3Nob3dEZWxldGVEYXRhc2V0ID8gKFxuICAgICAgICAgICAgICA8UmVtb3ZlRGF0YXNldFxuICAgICAgICAgICAgICAgIGRhdGFzZXRLZXk9e2RhdGFzZXQuaWR9XG4gICAgICAgICAgICAgICAgcmVtb3ZlRGF0YXNldD17cmVtb3ZlRGF0YXNldH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvRGF0YXNldFRpdGxlPlxuICAgICAgICAgIHtzaG93RGF0YXNldFRhYmxlID8gKFxuICAgICAgICAgICAgPERhdGFSb3dDb3VudCBjbGFzc05hbWU9XCJzb3VyY2UtZGF0YS1yb3dzXCI+e2Ake251bUZvcm1hdChcbiAgICAgICAgICAgICAgZGF0YXNldC5hbGxEYXRhLmxlbmd0aFxuICAgICAgICAgICAgKX0gcm93c2B9PC9EYXRhUm93Q291bnQ+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICkpfVxuICAgIDwvU291cmNlRGF0YUNhdGVsb2dXcmFwcGVyPlxuICApO1xuXG4gIHJldHVybiBTb3VyY2VEYXRhQ2F0YWxvZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgU291cmNlRGF0YUNhdGFsb2dGYWN0b3J5O1xuIl19