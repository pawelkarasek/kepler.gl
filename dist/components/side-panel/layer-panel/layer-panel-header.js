"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactSortableHoc = require("react-sortable-hoc");

var _panelHeaderAction = _interopRequireDefault(require("../panel-header-action"));

var _icons = require("../../common/icons");

var _styledComponents2 = require("../../common/styled-components");

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  opacity: 0;\n  z-index: 1000;\n\n  :hover {\n    cursor: move;\n    opacity: 1;\n    color: ", ";\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-left: 12px;\n\n  .layer__title__type {\n    color: ", ";\n    font-size: 10px;\n    line-height: 12px;\n    letter-spacing: 0.37px;\n    text-transform: capitalize;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .layer__remove-layer {\n    opacity: 0;\n  }\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n\n    .layer__drag-handle {\n      opacity: 1;\n    }\n\n    .layer__remove-layer {\n      opacity: 1;\n    }\n\n    .layer__enable-config {\n      color: white\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  // required
  id: _propTypes["default"].string.isRequired,
  isDragNDropEnabled: _propTypes["default"].bool,
  isVisible: _propTypes["default"].bool.isRequired,
  label: _propTypes["default"].string.isRequired,
  onToggleVisibility: _propTypes["default"].func.isRequired,
  // optional
  className: _propTypes["default"].string,
  idx: _propTypes["default"].number,
  isConfigActive: _propTypes["default"].bool,
  labelRCGColorValues: _propTypes["default"].arrayOf(_propTypes["default"].number),
  onUpdateLayerLabel: _propTypes["default"].func,
  onRemoveLayer: _propTypes["default"].func
};
var defaultProps = {
  isDragNDropEnabled: true,
  showRemoveLayer: true
};
var StyledLayerPanelHeader = (0, _styledComponents["default"])(_styledComponents2.StyledPanelHeader)(_templateObject(), function (props) {
  return props.theme.panelBackgroundHover;
});

var HeaderLabelSection = _styledComponents["default"].div(_templateObject2(), function (props) {
  return props.theme.textColor;
});

var HeaderActionSection = _styledComponents["default"].div(_templateObject3());

var LayerTitleSection = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.theme.subtextColor;
});

var StyledDragHandle = _styledComponents["default"].div(_templateObject5(), function (props) {
  return props.theme.textColorHl;
});

var DragHandle = (0, _reactSortableHoc.sortableHandle)(function (_ref) {
  var className = _ref.className,
      children = _ref.children;
  return _react["default"].createElement(StyledDragHandle, {
    classname: className
  }, children);
});

var LayerPanelHeader = function LayerPanelHeader(_ref2) {
  var className = _ref2.className,
      idx = _ref2.idx,
      isConfigActive = _ref2.isConfigActive,
      isDragNDropEnabled = _ref2.isDragNDropEnabled,
      isVisible = _ref2.isVisible,
      label = _ref2.label,
      layerId = _ref2.layerId,
      layerType = _ref2.layerType,
      labelRCGColorValues = _ref2.labelRCGColorValues,
      onToggleVisibility = _ref2.onToggleVisibility,
      onUpdateLayerLabel = _ref2.onUpdateLayerLabel,
      onToggleEnableConfig = _ref2.onToggleEnableConfig,
      onRemoveLayer = _ref2.onRemoveLayer,
      showRemoveLayer = _ref2.showRemoveLayer;
  return _react["default"].createElement(StyledLayerPanelHeader, {
    className: (0, _classnames["default"])('layer-panel__header', {
      'sort--handle': !isConfigActive
    }),
    active: isConfigActive,
    labelRCGColorValues: labelRCGColorValues,
    onClick: onToggleEnableConfig
  }, _react["default"].createElement(HeaderLabelSection, {
    className: "layer-panel__header__content"
  }, isDragNDropEnabled && _react["default"].createElement(DragHandle, {
    className: "layer__drag-handle"
  }, _react["default"].createElement(_icons.VertDots, {
    height: "20px"
  })), _react["default"].createElement(_panelHeaderAction["default"], {
    className: "layer__visibility-toggle",
    id: layerId,
    tooltip: isVisible ? 'hide layer' : 'show layer',
    onClick: onToggleVisibility,
    IconComponent: isVisible ? _icons.EyeSeen : _icons.EyeUnseen,
    active: isVisible,
    flush: true
  }), _react["default"].createElement(LayerTitleSection, {
    className: "layer__title"
  }, _react["default"].createElement("div", null, _react["default"].createElement(LayerLabelEditor, {
    label: label,
    onEdit: onUpdateLayerLabel
  }), _react["default"].createElement("div", {
    className: "layer__title__type"
  }, layerType)))), _react["default"].createElement(HeaderActionSection, {
    className: "layer-panel__header__actions"
  }, showRemoveLayer ? _react["default"].createElement(_panelHeaderAction["default"], {
    className: "layer__remove-layer",
    id: layerId,
    tooltip: 'Remove layer',
    onClick: onRemoveLayer,
    tooltipType: "error",
    IconComponent: _icons.Trash
  }) : null, _react["default"].createElement(_panelHeaderAction["default"], {
    className: "layer__enable-config",
    id: layerId,
    tooltip: 'Layer settings',
    onClick: onToggleEnableConfig,
    IconComponent: _icons.ArrowDown
  })));
};

var LayerLabelEditor = function LayerLabelEditor(_ref3) {
  var label = _ref3.label,
      onEdit = _ref3.onEdit;
  return _react["default"].createElement(_styledComponents2.InlineInput, {
    type: "text",
    className: "layer__title__editor",
    value: label,
    onClick: function onClick(e) {
      e.stopPropagation();
    },
    onChange: onEdit,
    id: "input-layer-label"
  });
};

LayerPanelHeader.propTypes = propTypes;
LayerPanelHeader.defaultProps = defaultProps;
var _default = LayerPanelHeader;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItcGFuZWwtaGVhZGVyLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsImlkIiwiUHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImlzRHJhZ05Ecm9wRW5hYmxlZCIsImJvb2wiLCJpc1Zpc2libGUiLCJsYWJlbCIsIm9uVG9nZ2xlVmlzaWJpbGl0eSIsImZ1bmMiLCJjbGFzc05hbWUiLCJpZHgiLCJudW1iZXIiLCJpc0NvbmZpZ0FjdGl2ZSIsImxhYmVsUkNHQ29sb3JWYWx1ZXMiLCJhcnJheU9mIiwib25VcGRhdGVMYXllckxhYmVsIiwib25SZW1vdmVMYXllciIsImRlZmF1bHRQcm9wcyIsInNob3dSZW1vdmVMYXllciIsIlN0eWxlZExheWVyUGFuZWxIZWFkZXIiLCJTdHlsZWRQYW5lbEhlYWRlciIsInByb3BzIiwidGhlbWUiLCJwYW5lbEJhY2tncm91bmRIb3ZlciIsIkhlYWRlckxhYmVsU2VjdGlvbiIsInN0eWxlZCIsImRpdiIsInRleHRDb2xvciIsIkhlYWRlckFjdGlvblNlY3Rpb24iLCJMYXllclRpdGxlU2VjdGlvbiIsInN1YnRleHRDb2xvciIsIlN0eWxlZERyYWdIYW5kbGUiLCJ0ZXh0Q29sb3JIbCIsIkRyYWdIYW5kbGUiLCJjaGlsZHJlbiIsIkxheWVyUGFuZWxIZWFkZXIiLCJsYXllcklkIiwibGF5ZXJUeXBlIiwib25Ub2dnbGVFbmFibGVDb25maWciLCJFeWVTZWVuIiwiRXllVW5zZWVuIiwiVHJhc2giLCJBcnJvd0Rvd24iLCJMYXllckxhYmVsRWRpdG9yIiwib25FZGl0IiwiZSIsInN0b3BQcm9wYWdhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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Slg7QUFLRSxJQUFBLFdBQVcsRUFBQyxPQUxkO0FBTUUsSUFBQSxhQUFhLEVBQUV5QjtBQU5qQixJQURjLEdBU1osSUFWTixFQVdFLGdDQUFDLDZCQUFEO0FBQ0UsSUFBQSxTQUFTLEVBQUMsc0JBRFo7QUFFRSxJQUFBLEVBQUUsRUFBRUwsT0FGTjtBQUdFLElBQUEsT0FBTyxFQUFFLGdCQUhYO0FBSUUsSUFBQSxPQUFPLEVBQUVFLG9CQUpYO0FBS0UsSUFBQSxhQUFhLEVBQUVJO0FBTGpCLElBWEYsQ0E5QkYsQ0FoQnVCO0FBQUEsQ0FBekI7O0FBb0VBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFckMsS0FBRixTQUFFQSxLQUFGO0FBQUEsTUFBU3NDLE1BQVQsU0FBU0EsTUFBVDtBQUFBLFNBQ3ZCLGdDQUFDLDhCQUFEO0FBQ0UsSUFBQSxJQUFJLEVBQUMsTUFEUDtBQUVFLElBQUEsU0FBUyxFQUFDLHNCQUZaO0FBR0UsSUFBQSxLQUFLLEVBQUV0QyxLQUhUO0FBSUUsSUFBQSxPQUFPLEVBQUUsaUJBQUF1QyxDQUFDLEVBQUk7QUFDWkEsTUFBQUEsQ0FBQyxDQUFDQyxlQUFGO0FBQ0QsS0FOSDtBQU9FLElBQUEsUUFBUSxFQUFFRixNQVBaO0FBUUUsSUFBQSxFQUFFLEVBQUM7QUFSTCxJQUR1QjtBQUFBLENBQXpCOztBQWFBVCxnQkFBZ0IsQ0FBQ3JDLFNBQWpCLEdBQTZCQSxTQUE3QjtBQUNBcUMsZ0JBQWdCLENBQUNsQixZQUFqQixHQUFnQ0EsWUFBaEM7ZUFFZWtCLGdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtzb3J0YWJsZUhhbmRsZX0gZnJvbSAncmVhY3Qtc29ydGFibGUtaG9jJztcbmltcG9ydCBQYW5lbEhlYWRlckFjdGlvbiBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyLWFjdGlvbic7XG5pbXBvcnQge1xuICBFeWVTZWVuLFxuICBFeWVVbnNlZW4sXG4gIFZlcnREb3RzLFxuICBBcnJvd0Rvd24sXG4gIFRyYXNoXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcblxuaW1wb3J0IHtJbmxpbmVJbnB1dCwgU3R5bGVkUGFuZWxIZWFkZXJ9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgcHJvcFR5cGVzID0ge1xuICAvLyByZXF1aXJlZFxuICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBpc0RyYWdORHJvcEVuYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBpc1Zpc2libGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGxhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG9uVG9nZ2xlVmlzaWJpbGl0eTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcblxuICAvLyBvcHRpb25hbFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGlkeDogUHJvcFR5cGVzLm51bWJlcixcbiAgaXNDb25maWdBY3RpdmU6IFByb3BUeXBlcy5ib29sLFxuICBsYWJlbFJDR0NvbG9yVmFsdWVzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcbiAgb25VcGRhdGVMYXllckxhYmVsOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25SZW1vdmVMYXllcjogUHJvcFR5cGVzLmZ1bmNcbn07XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgaXNEcmFnTkRyb3BFbmFibGVkOiB0cnVlLFxuICBzaG93UmVtb3ZlTGF5ZXI6IHRydWVcbn07XG5cbmNvbnN0IFN0eWxlZExheWVyUGFuZWxIZWFkZXIgPSBzdHlsZWQoU3R5bGVkUGFuZWxIZWFkZXIpYFxuICAubGF5ZXJfX3JlbW92ZS1sYXllciB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZEhvdmVyfTtcblxuICAgIC5sYXllcl9fZHJhZy1oYW5kbGUge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG5cbiAgICAubGF5ZXJfX3JlbW92ZS1sYXllciB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgIH1cblxuICAgIC5sYXllcl9fZW5hYmxlLWNvbmZpZyB7XG4gICAgICBjb2xvcjogd2hpdGVcbiAgICB9XG4gIH1cbmA7XG5cbmNvbnN0IEhlYWRlckxhYmVsU2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG5gO1xuXG5jb25zdCBIZWFkZXJBY3Rpb25TZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbmA7XG5cbmNvbnN0IExheWVyVGl0bGVTZWN0aW9uID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XG5cbiAgLmxheWVyX190aXRsZV9fdHlwZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3VidGV4dENvbG9yfTtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDEycHg7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMzdweDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkRHJhZ0hhbmRsZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG9wYWNpdHk6IDA7XG4gIHotaW5kZXg6IDEwMDA7XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IG1vdmU7XG4gICAgb3BhY2l0eTogMTtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gIH1cbmA7XG5cbmNvbnN0IERyYWdIYW5kbGUgPSBzb3J0YWJsZUhhbmRsZSgoe2NsYXNzTmFtZSwgY2hpbGRyZW59KSA9PlxuICA8U3R5bGVkRHJhZ0hhbmRsZSBjbGFzc25hbWU9e2NsYXNzTmFtZX0+XG4gICAge2NoaWxkcmVufVxuICA8L1N0eWxlZERyYWdIYW5kbGU+XG4pO1xuXG5jb25zdCBMYXllclBhbmVsSGVhZGVyID0gKHtcbiAgY2xhc3NOYW1lLFxuICBpZHgsXG4gIGlzQ29uZmlnQWN0aXZlLFxuICBpc0RyYWdORHJvcEVuYWJsZWQsXG4gIGlzVmlzaWJsZSxcbiAgbGFiZWwsXG4gIGxheWVySWQsXG4gIGxheWVyVHlwZSxcbiAgbGFiZWxSQ0dDb2xvclZhbHVlcyxcbiAgb25Ub2dnbGVWaXNpYmlsaXR5LFxuICBvblVwZGF0ZUxheWVyTGFiZWwsXG4gIG9uVG9nZ2xlRW5hYmxlQ29uZmlnLFxuICBvblJlbW92ZUxheWVyLFxuICBzaG93UmVtb3ZlTGF5ZXJcbn0pID0+IChcbiAgPFN0eWxlZExheWVyUGFuZWxIZWFkZXJcbiAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2xheWVyLXBhbmVsX19oZWFkZXInLCB7XG4gICAgICAnc29ydC0taGFuZGxlJzogIWlzQ29uZmlnQWN0aXZlXG4gICAgfSl9XG4gICAgYWN0aXZlPXtpc0NvbmZpZ0FjdGl2ZX1cbiAgICBsYWJlbFJDR0NvbG9yVmFsdWVzPXtsYWJlbFJDR0NvbG9yVmFsdWVzfVxuICAgIG9uQ2xpY2s9e29uVG9nZ2xlRW5hYmxlQ29uZmlnfVxuICA+XG4gICAgPEhlYWRlckxhYmVsU2VjdGlvbiBjbGFzc05hbWU9XCJsYXllci1wYW5lbF9faGVhZGVyX19jb250ZW50XCI+XG4gICAgICB7aXNEcmFnTkRyb3BFbmFibGVkICYmIChcbiAgICAgICAgPERyYWdIYW5kbGUgY2xhc3NOYW1lPVwibGF5ZXJfX2RyYWctaGFuZGxlXCI+XG4gICAgICAgICAgPFZlcnREb3RzIGhlaWdodD1cIjIwcHhcIiAvPlxuICAgICAgICA8L0RyYWdIYW5kbGU+XG4gICAgICApfVxuICAgICAgPFBhbmVsSGVhZGVyQWN0aW9uXG4gICAgICAgIGNsYXNzTmFtZT1cImxheWVyX192aXNpYmlsaXR5LXRvZ2dsZVwiXG4gICAgICAgIGlkPXtsYXllcklkfVxuICAgICAgICB0b29sdGlwPXtpc1Zpc2libGUgPyAnaGlkZSBsYXllcicgOiAnc2hvdyBsYXllcid9XG4gICAgICAgIG9uQ2xpY2s9e29uVG9nZ2xlVmlzaWJpbGl0eX1cbiAgICAgICAgSWNvbkNvbXBvbmVudD17aXNWaXNpYmxlID8gRXllU2VlbiA6IEV5ZVVuc2Vlbn1cbiAgICAgICAgYWN0aXZlPXtpc1Zpc2libGV9XG4gICAgICAgIGZsdXNoXG4gICAgICAvPlxuICAgICAgPExheWVyVGl0bGVTZWN0aW9uIGNsYXNzTmFtZT1cImxheWVyX190aXRsZVwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxMYXllckxhYmVsRWRpdG9yIGxhYmVsPXtsYWJlbH0gb25FZGl0PXtvblVwZGF0ZUxheWVyTGFiZWx9IC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYXllcl9fdGl0bGVfX3R5cGVcIj57bGF5ZXJUeXBlfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTGF5ZXJUaXRsZVNlY3Rpb24+XG4gICAgPC9IZWFkZXJMYWJlbFNlY3Rpb24+XG4gICAgPEhlYWRlckFjdGlvblNlY3Rpb24gY2xhc3NOYW1lPVwibGF5ZXItcGFuZWxfX2hlYWRlcl9fYWN0aW9uc1wiPlxuICAgICAge3Nob3dSZW1vdmVMYXllciA/IChcbiAgICAgICAgPFBhbmVsSGVhZGVyQWN0aW9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwibGF5ZXJfX3JlbW92ZS1sYXllclwiXG4gICAgICAgICAgaWQ9e2xheWVySWR9XG4gICAgICAgICAgdG9vbHRpcD17J1JlbW92ZSBsYXllcid9XG4gICAgICAgICAgb25DbGljaz17b25SZW1vdmVMYXllcn1cbiAgICAgICAgICB0b29sdGlwVHlwZT1cImVycm9yXCJcbiAgICAgICAgICBJY29uQ29tcG9uZW50PXtUcmFzaH1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPFBhbmVsSGVhZGVyQWN0aW9uXG4gICAgICAgIGNsYXNzTmFtZT1cImxheWVyX19lbmFibGUtY29uZmlnXCJcbiAgICAgICAgaWQ9e2xheWVySWR9XG4gICAgICAgIHRvb2x0aXA9eydMYXllciBzZXR0aW5ncyd9XG4gICAgICAgIG9uQ2xpY2s9e29uVG9nZ2xlRW5hYmxlQ29uZmlnfVxuICAgICAgICBJY29uQ29tcG9uZW50PXtBcnJvd0Rvd259XG4gICAgICAvPlxuICAgIDwvSGVhZGVyQWN0aW9uU2VjdGlvbj5cbiAgPC9TdHlsZWRMYXllclBhbmVsSGVhZGVyPlxuKTtcblxuY29uc3QgTGF5ZXJMYWJlbEVkaXRvciA9ICh7bGFiZWwsIG9uRWRpdH0pID0+IChcbiAgPElubGluZUlucHV0XG4gICAgdHlwZT1cInRleHRcIlxuICAgIGNsYXNzTmFtZT1cImxheWVyX190aXRsZV9fZWRpdG9yXCJcbiAgICB2YWx1ZT17bGFiZWx9XG4gICAgb25DbGljaz17ZSA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH19XG4gICAgb25DaGFuZ2U9e29uRWRpdH1cbiAgICBpZD1cImlucHV0LWxheWVyLWxhYmVsXCJcbiAgLz5cbik7XG5cbkxheWVyUGFuZWxIZWFkZXIucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuTGF5ZXJQYW5lbEhlYWRlci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyUGFuZWxIZWFkZXI7XG4iXX0=