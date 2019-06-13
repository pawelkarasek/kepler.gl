"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SidePanelFactory;
exports.PanelTitleFactory = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

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

var _sideBar = _interopRequireDefault(require("./side-panel/side-bar"));

var _panelHeader = _interopRequireDefault(require("./side-panel/panel-header"));

var _layerManager = _interopRequireDefault(require("./side-panel/layer-manager"));

var _filterManager = _interopRequireDefault(require("./side-panel/filter-manager"));

var _interactionManager = _interopRequireDefault(require("./side-panel/interaction-manager"));

var _mapManager = _interopRequireDefault(require("./side-panel/map-manager"));

var _panelToggle = _interopRequireDefault(require("./side-panel/panel-toggle"));

var _defaultSettings = require("../constants/default-settings");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: 20px;\n  font-weight: 400;\n  letter-spacing: 1.25px;\n  margin-bottom: 14px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n  flex-grow: 1;\n  padding: 16px;\n  overflow-y: scroll;\n  overflow-x: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SidePanelContent = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.sidePanelScrollBar;
});

var PanelTitleFactory = function PanelTitleFactory() {
  return _styledComponents["default"].div(_templateObject2(), function (props) {
    return props.theme.titleTextColor;
  });
};

exports.PanelTitleFactory = PanelTitleFactory;
SidePanelFactory.deps = [_sideBar["default"], _panelHeader["default"], _panelToggle["default"], PanelTitleFactory, _layerManager["default"], _filterManager["default"], _interactionManager["default"], _mapManager["default"]];
/**
 *
 * Vertical sidebar containing input components for the rendering layers
 */

function SidePanelFactory(Sidebar, PanelHeader, PanelToggle, PanelTitle, LayerManager, FilterManager, InteractionManager, MapManager) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_PureComponent) {
    (0, _inherits2["default"])(SidePanel, _PureComponent);

    function SidePanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, SidePanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(SidePanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onOpenOrClose", function () {
        _this.props.uiStateActions.toggleSidePanel(_this.props.uiState.activeSidePanel ? null : 'layer');
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_showDatasetTable", function (dataId) {
        // this will open data table modal
        _this.props.visStateActions.showDatasetTable(dataId);

        _this.props.uiStateActions.toggleModal(_defaultSettings.DATA_TABLE_ID);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_showAddDataModal", function () {
        _this.props.uiStateActions.toggleModal(_defaultSettings.ADD_DATA_ID);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_showAddMapStyleModal", function () {
        _this.props.uiStateActions.toggleModal(_defaultSettings.ADD_MAP_STYLE_ID);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_removeDataset", function (key) {
        // this will show the modal dialog to confirm deletion
        _this.props.uiStateActions.openDeleteModal(key);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportImage", function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_IMAGE_ID);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportData", function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_DATA_ID);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onExportMap", function () {
        return _this.props.uiStateActions.toggleModal(_defaultSettings.EXPORT_MAP_ID);
      });
      return _this;
    }

    (0, _createClass2["default"])(SidePanel, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            appName = _this$props.appName,
            version = _this$props.version,
            datasets = _this$props.datasets,
            filters = _this$props.filters,
            layers = _this$props.layers,
            layerBlending = _this$props.layerBlending,
            layerClasses = _this$props.layerClasses,
            uiState = _this$props.uiState,
            layerOrder = _this$props.layerOrder,
            interactionConfig = _this$props.interactionConfig,
            visStateActions = _this$props.visStateActions,
            mapStyleActions = _this$props.mapStyleActions,
            uiStateActions = _this$props.uiStateActions;
        var activeSidePanel = uiState.activeSidePanel;
        var isOpen = Boolean(activeSidePanel);
        var layerManagerActions = {
          addLayer: visStateActions.addLayer,
          layerConfigChange: visStateActions.layerConfigChange,
          layerTextLabelChange: visStateActions.layerTextLabelChange,
          layerVisualChannelConfigChange: visStateActions.layerVisualChannelConfigChange,
          layerTypeChange: visStateActions.layerTypeChange,
          layerVisConfigChange: visStateActions.layerVisConfigChange,
          updateLayerBlending: visStateActions.updateLayerBlending,
          updateLayerOrder: visStateActions.reorderLayer,
          showDatasetTable: this._showDatasetTable,
          showAddDataModal: this._showAddDataModal,
          removeLayer: visStateActions.removeLayer,
          removeDataset: this._removeDataset
        };
        var filterManagerActions = {
          addFilter: visStateActions.addFilter,
          removeFilter: visStateActions.removeFilter,
          setFilter: visStateActions.setFilter,
          showDatasetTable: this._showDatasetTable,
          showAddDataModal: this._showAddDataModal,
          toggleAnimation: visStateActions.toggleAnimation,
          enlargeFilter: visStateActions.enlargeFilter
        };
        var interactionManagerActions = {
          onConfigChange: visStateActions.interactionConfigChange
        };
        var mapManagerActions = {
          addMapStyleUrl: mapStyleActions.addMapStyleUrl,
          onConfigChange: mapStyleActions.mapConfigChange,
          onStyleChange: mapStyleActions.mapStyleChange,
          onBuildingChange: mapStyleActions.mapBuildingChange,
          showAddMapStyleModal: this._showAddMapStyleModal
        };
        return _react["default"].createElement("div", null, _react["default"].createElement(Sidebar, {
          width: this.props.width,
          isOpen: isOpen,
          minifiedWidth: 0,
          onOpenOrClose: this._onOpenOrClose
        }, _react["default"].createElement(PanelHeader, {
          appName: appName,
          version: version,
          onExportImage: this._onExportImage,
          onExportData: this._onExportData,
          visibleDropdown: uiState.visibleDropdown,
          showExportDropdown: uiStateActions.showExportDropdown,
          hideExportDropdown: uiStateActions.hideExportDropdown,
          onExportMap: this._onExportMap,
          onSaveMap: this.props.onSaveMap
        }), _react["default"].createElement(PanelToggle, {
          panels: _defaultSettings.PANELS,
          activePanel: activeSidePanel,
          togglePanel: uiStateActions.toggleSidePanel
        }), _react["default"].createElement(SidePanelContent, {
          className: "side-panel__content"
        }, _react["default"].createElement("div", null, _react["default"].createElement(PanelTitle, {
          className: "side-panel__content__title"
        }, (_defaultSettings.PANELS.find(function (_ref) {
          var id = _ref.id;
          return id === activeSidePanel;
        }) || {}).label), activeSidePanel === 'layer' && _react["default"].createElement(LayerManager, (0, _extends2["default"])({}, layerManagerActions, {
          datasets: datasets,
          layers: layers,
          layerClasses: layerClasses,
          layerOrder: layerOrder,
          layerBlending: layerBlending,
          openModal: uiStateActions.toggleModal
        })), activeSidePanel === 'filter' && _react["default"].createElement(FilterManager, (0, _extends2["default"])({}, filterManagerActions, {
          datasets: datasets,
          filters: filters
        })), activeSidePanel === 'interaction' && _react["default"].createElement(InteractionManager, (0, _extends2["default"])({}, interactionManagerActions, {
          datasets: datasets,
          interactionConfig: interactionConfig
        })), activeSidePanel === 'map' && _react["default"].createElement(MapManager, (0, _extends2["default"])({}, mapManagerActions, {
          mapStyle: this.props.mapStyle
        }))))));
      }
    }]);
    return SidePanel;
  }(_react.PureComponent), (0, _defineProperty2["default"])(_class, "propTypes", {
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    interactionConfig: _propTypes["default"].object.isRequired,
    layerBlending: _propTypes["default"].string.isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layerClasses: _propTypes["default"].object.isRequired,
    mapStyle: _propTypes["default"].object.isRequired,
    width: _propTypes["default"].number.isRequired,
    datasets: _propTypes["default"].object.isRequired,
    visStateActions: _propTypes["default"].object.isRequired,
    mapStyleActions: _propTypes["default"].object.isRequired
  }), _temp;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwuanMiXSwibmFtZXMiOlsiU2lkZVBhbmVsQ29udGVudCIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJzaWRlUGFuZWxTY3JvbGxCYXIiLCJQYW5lbFRpdGxlRmFjdG9yeSIsInRpdGxlVGV4dENvbG9yIiwiU2lkZVBhbmVsRmFjdG9yeSIsImRlcHMiLCJTaWRlYmFyRmFjdG9yeSIsIlBhbmVsSGVhZGVyRmFjdG9yeSIsIlBhbmVsVG9nZ2xlRmFjdG9yeSIsIkxheWVyTWFuYWdlckZhY3RvcnkiLCJGaWx0ZXJNYW5hZ2VyRmFjdG9yeSIsIkludGVyYWN0aW9uTWFuYWdlckZhY3RvcnkiLCJNYXBNYW5hZ2VyRmFjdG9yeSIsIlNpZGViYXIiLCJQYW5lbEhlYWRlciIsIlBhbmVsVG9nZ2xlIiwiUGFuZWxUaXRsZSIsIkxheWVyTWFuYWdlciIsIkZpbHRlck1hbmFnZXIiLCJJbnRlcmFjdGlvbk1hbmFnZXIiLCJNYXBNYW5hZ2VyIiwidWlTdGF0ZUFjdGlvbnMiLCJ0b2dnbGVTaWRlUGFuZWwiLCJ1aVN0YXRlIiwiYWN0aXZlU2lkZVBhbmVsIiwiZGF0YUlkIiwidmlzU3RhdGVBY3Rpb25zIiwic2hvd0RhdGFzZXRUYWJsZSIsInRvZ2dsZU1vZGFsIiwiREFUQV9UQUJMRV9JRCIsIkFERF9EQVRBX0lEIiwiQUREX01BUF9TVFlMRV9JRCIsImtleSIsIm9wZW5EZWxldGVNb2RhbCIsIkVYUE9SVF9JTUFHRV9JRCIsIkVYUE9SVF9EQVRBX0lEIiwiRVhQT1JUX01BUF9JRCIsImFwcE5hbWUiLCJ2ZXJzaW9uIiwiZGF0YXNldHMiLCJmaWx0ZXJzIiwibGF5ZXJzIiwibGF5ZXJCbGVuZGluZyIsImxheWVyQ2xhc3NlcyIsImxheWVyT3JkZXIiLCJpbnRlcmFjdGlvbkNvbmZpZyIsIm1hcFN0eWxlQWN0aW9ucyIsImlzT3BlbiIsIkJvb2xlYW4iLCJsYXllck1hbmFnZXJBY3Rpb25zIiwiYWRkTGF5ZXIiLCJsYXllckNvbmZpZ0NoYW5nZSIsImxheWVyVGV4dExhYmVsQ2hhbmdlIiwibGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlIiwibGF5ZXJUeXBlQ2hhbmdlIiwibGF5ZXJWaXNDb25maWdDaGFuZ2UiLCJ1cGRhdGVMYXllckJsZW5kaW5nIiwidXBkYXRlTGF5ZXJPcmRlciIsInJlb3JkZXJMYXllciIsIl9zaG93RGF0YXNldFRhYmxlIiwic2hvd0FkZERhdGFNb2RhbCIsIl9zaG93QWRkRGF0YU1vZGFsIiwicmVtb3ZlTGF5ZXIiLCJyZW1vdmVEYXRhc2V0IiwiX3JlbW92ZURhdGFzZXQiLCJmaWx0ZXJNYW5hZ2VyQWN0aW9ucyIsImFkZEZpbHRlciIsInJlbW92ZUZpbHRlciIsInNldEZpbHRlciIsInRvZ2dsZUFuaW1hdGlvbiIsImVubGFyZ2VGaWx0ZXIiLCJpbnRlcmFjdGlvbk1hbmFnZXJBY3Rpb25zIiwib25Db25maWdDaGFuZ2UiLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZSIsIm1hcE1hbmFnZXJBY3Rpb25zIiwiYWRkTWFwU3R5bGVVcmwiLCJtYXBDb25maWdDaGFuZ2UiLCJvblN0eWxlQ2hhbmdlIiwibWFwU3R5bGVDaGFuZ2UiLCJvbkJ1aWxkaW5nQ2hhbmdlIiwibWFwQnVpbGRpbmdDaGFuZ2UiLCJzaG93QWRkTWFwU3R5bGVNb2RhbCIsIl9zaG93QWRkTWFwU3R5bGVNb2RhbCIsIndpZHRoIiwiX29uT3Blbk9yQ2xvc2UiLCJfb25FeHBvcnRJbWFnZSIsIl9vbkV4cG9ydERhdGEiLCJ2aXNpYmxlRHJvcGRvd24iLCJzaG93RXhwb3J0RHJvcGRvd24iLCJoaWRlRXhwb3J0RHJvcGRvd24iLCJfb25FeHBvcnRNYXAiLCJvblNhdmVNYXAiLCJQQU5FTFMiLCJmaW5kIiwiaWQiLCJsYWJlbCIsIm1hcFN0eWxlIiwiUHVyZUNvbXBvbmVudCIsIlByb3BUeXBlcyIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwib2JqZWN0Iiwic3RyaW5nIiwibnVtYmVyIl0sIm1hcHBp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QUVNO0FBSHJCLFdBdkJKLEVBNkJHckIsZUFBZSxLQUFLLEtBQXBCLElBQ0MsZ0NBQUMsVUFBRCxnQ0FDTWtELGlCQUROO0FBRUUsVUFBQSxRQUFRLEVBQUUsS0FBSzNFLEtBQUwsQ0FBV2lHO0FBRnZCLFdBOUJKLENBREYsQ0F0QkYsQ0FERixDQURGO0FBaUVEO0FBeEtIO0FBQUE7QUFBQSxJQUErQkMsb0JBQS9CLHlEQUNxQjtBQUNqQnpELElBQUFBLE9BQU8sRUFBRTBELHNCQUFVQyxPQUFWLENBQWtCRCxzQkFBVUUsR0FBNUIsRUFBaUNDLFVBRHpCO0FBRWpCeEQsSUFBQUEsaUJBQWlCLEVBQUVxRCxzQkFBVUksTUFBVixDQUFpQkQsVUFGbkI7QUFHakIzRCxJQUFBQSxhQUFhLEVBQUV3RCxzQkFBVUssTUFBVixDQUFpQkYsVUFIZjtBQUlqQjVELElBQUFBLE1BQU0sRUFBRXlELHNCQUFVQyxPQUFWLENBQWtCRCxzQkFBVUUsR0FBNUIsRUFBaUNDLFVBSnhCO0FBS2pCMUQsSUFBQUEsWUFBWSxFQUFFdUQsc0JBQVVJLE1BQVYsQ0FBaUJELFVBTGQ7QUFNakJMLElBQUFBLFFBQVEsRUFBRUUsc0JBQVVJLE1BQVYsQ0FBaUJELFVBTlY7QUFPakJsQixJQUFBQSxLQUFLLEVBQUVlLHNCQUFVTSxNQUFWLENBQWlCSCxVQVBQO0FBUWpCOUQsSUFBQUEsUUFBUSxFQUFFMkQsc0JBQVVJLE1BQVYsQ0FBaUJELFVBUlY7QUFTakIzRSxJQUFBQSxlQUFlLEVBQUV3RSxzQkFBVUksTUFBVixDQUFpQkQsVUFUakI7QUFVakJ2RCxJQUFBQSxlQUFlLEVBQUVvRCxzQkFBVUksTUFBVixDQUFpQkQ7QUFWakIsR0FEckI7QUEwS0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtQdXJlQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCBTaWRlYmFyRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwvc2lkZS1iYXInO1xuaW1wb3J0IFBhbmVsSGVhZGVyRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwvcGFuZWwtaGVhZGVyJztcbmltcG9ydCBMYXllck1hbmFnZXJGYWN0b3J5IGZyb20gJy4vc2lkZS1wYW5lbC9sYXllci1tYW5hZ2VyJztcbmltcG9ydCBGaWx0ZXJNYW5hZ2VyRmFjdG9yeSBmcm9tICcuL3NpZGUtcGFuZWwvZmlsdGVyLW1hbmFnZXInO1xuaW1wb3J0IEludGVyYWN0aW9uTWFuYWdlckZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsL2ludGVyYWN0aW9uLW1hbmFnZXInO1xuaW1wb3J0IE1hcE1hbmFnZXJGYWN0b3J5IGZyb20gJy4vc2lkZS1wYW5lbC9tYXAtbWFuYWdlcic7XG5pbXBvcnQgUGFuZWxUb2dnbGVGYWN0b3J5IGZyb20gJy4vc2lkZS1wYW5lbC9wYW5lbC10b2dnbGUnO1xuXG5pbXBvcnQge1xuICBBRERfREFUQV9JRCxcbiAgQUREX01BUF9TVFlMRV9JRCxcbiAgREFUQV9UQUJMRV9JRCxcbiAgRVhQT1JUX0lNQUdFX0lELFxuICBFWFBPUlRfREFUQV9JRCxcbiAgRVhQT1JUX01BUF9JRCxcbiAgUEFORUxTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU2lkZVBhbmVsQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsU2Nyb2xsQmFyfTtcbiAgZmxleC1ncm93OiAxO1xuICBwYWRkaW5nOiAxNnB4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbFRpdGxlRmFjdG9yeSA9ICgpID0+IHN0eWxlZC5kaXZgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRpdGxlVGV4dENvbG9yfTtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsZXR0ZXItc3BhY2luZzogMS4yNXB4O1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xuYDtcblxuU2lkZVBhbmVsRmFjdG9yeS5kZXBzID0gW1xuICBTaWRlYmFyRmFjdG9yeSxcbiAgUGFuZWxIZWFkZXJGYWN0b3J5LFxuICBQYW5lbFRvZ2dsZUZhY3RvcnksXG4gIFBhbmVsVGl0bGVGYWN0b3J5LFxuICBMYXllck1hbmFnZXJGYWN0b3J5LFxuICBGaWx0ZXJNYW5hZ2VyRmFjdG9yeSxcbiAgSW50ZXJhY3Rpb25NYW5hZ2VyRmFjdG9yeSxcbiAgTWFwTWFuYWdlckZhY3Rvcnlcbl07XG5cbi8qKlxuICpcbiAqIFZlcnRpY2FsIHNpZGViYXIgY29udGFpbmluZyBpbnB1dCBjb21wb25lbnRzIGZvciB0aGUgcmVuZGVyaW5nIGxheWVyc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBTaWRlUGFuZWxGYWN0b3J5KFxuICBTaWRlYmFyLFxuICBQYW5lbEhlYWRlcixcbiAgUGFuZWxUb2dnbGUsXG4gIFBhbmVsVGl0bGUsXG4gIExheWVyTWFuYWdlcixcbiAgRmlsdGVyTWFuYWdlcixcbiAgSW50ZXJhY3Rpb25NYW5hZ2VyLFxuICBNYXBNYW5hZ2VyXG4pIHtcblxuICByZXR1cm4gY2xhc3MgU2lkZVBhbmVsIGV4dGVuZHMgUHVyZUNvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGZpbHRlcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBpbnRlcmFjdGlvbkNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJCbGVuZGluZzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJDbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdHlsZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICB2aXNTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0eWxlQWN0aW9uczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG4gICAgfTtcbiAgICAvKiBjb21wb25lbnQgcHJpdmF0ZSBmdW5jdGlvbnMgKi9cbiAgICBfb25PcGVuT3JDbG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlU2lkZVBhbmVsKFxuICAgICAgICB0aGlzLnByb3BzLnVpU3RhdGUuYWN0aXZlU2lkZVBhbmVsID8gbnVsbCA6ICdsYXllcidcbiAgICAgICk7XG4gICAgfTtcblxuICAgIF9zaG93RGF0YXNldFRhYmxlID0gZGF0YUlkID0+IHtcbiAgICAgIC8vIHRoaXMgd2lsbCBvcGVuIGRhdGEgdGFibGUgbW9kYWxcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLnNob3dEYXRhc2V0VGFibGUoZGF0YUlkKTtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwoREFUQV9UQUJMRV9JRCk7XG4gICAgfTtcblxuICAgIF9zaG93QWRkRGF0YU1vZGFsID0gKCkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbChBRERfREFUQV9JRCk7XG4gICAgfTtcblxuICAgIF9zaG93QWRkTWFwU3R5bGVNb2RhbCA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMudWlTdGF0ZUFjdGlvbnMudG9nZ2xlTW9kYWwoQUREX01BUF9TVFlMRV9JRCk7XG4gICAgfTtcblxuICAgIF9yZW1vdmVEYXRhc2V0ID0ga2V5ID0+IHtcbiAgICAgIC8vIHRoaXMgd2lsbCBzaG93IHRoZSBtb2RhbCBkaWFsb2cgdG8gY29uZmlybSBkZWxldGlvblxuICAgICAgdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy5vcGVuRGVsZXRlTW9kYWwoa2V5KTtcbiAgICB9O1xuXG4gICAgX29uRXhwb3J0SW1hZ2UgPSAoKSA9PiB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsKEVYUE9SVF9JTUFHRV9JRCk7XG5cbiAgICBfb25FeHBvcnREYXRhID0gKCkgPT4gdGhpcy5wcm9wcy51aVN0YXRlQWN0aW9ucy50b2dnbGVNb2RhbChFWFBPUlRfREFUQV9JRCk7XG5cbiAgICBfb25FeHBvcnRNYXAgPSAoKSA9PiB0aGlzLnByb3BzLnVpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsKEVYUE9SVF9NQVBfSUQpO1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBhcHBOYW1lLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBsYXllckNsYXNzZXMsXG4gICAgICAgIHVpU3RhdGUsXG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB7YWN0aXZlU2lkZVBhbmVsfSA9IHVpU3RhdGU7XG4gICAgICBjb25zdCBpc09wZW4gPSBCb29sZWFuKGFjdGl2ZVNpZGVQYW5lbCk7XG5cbiAgICAgIGNvbnN0IGxheWVyTWFuYWdlckFjdGlvbnMgPSB7XG4gICAgICAgIGFkZExheWVyOiB2aXNTdGF0ZUFjdGlvbnMuYWRkTGF5ZXIsXG4gICAgICAgIGxheWVyQ29uZmlnQ2hhbmdlOiB2aXNTdGF0ZUFjdGlvbnMubGF5ZXJDb25maWdDaGFuZ2UsXG4gICAgICAgIGxheWVyVGV4dExhYmVsQ2hhbmdlOiB2aXNTdGF0ZUFjdGlvbnMubGF5ZXJUZXh0TGFiZWxDaGFuZ2UsXG4gICAgICAgIGxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZTpcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLmxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZSxcbiAgICAgICAgbGF5ZXJUeXBlQ2hhbmdlOiB2aXNTdGF0ZUFjdGlvbnMubGF5ZXJUeXBlQ2hhbmdlLFxuICAgICAgICBsYXllclZpc0NvbmZpZ0NoYW5nZTogdmlzU3RhdGVBY3Rpb25zLmxheWVyVmlzQ29uZmlnQ2hhbmdlLFxuICAgICAgICB1cGRhdGVMYXllckJsZW5kaW5nOiB2aXNTdGF0ZUFjdGlvbnMudXBkYXRlTGF5ZXJCbGVuZGluZyxcbiAgICAgICAgdXBkYXRlTGF5ZXJPcmRlcjogdmlzU3RhdGVBY3Rpb25zLnJlb3JkZXJMYXllcixcbiAgICAgICAgc2hvd0RhdGFzZXRUYWJsZTogdGhpcy5fc2hvd0RhdGFzZXRUYWJsZSxcbiAgICAgICAgc2hvd0FkZERhdGFNb2RhbDogdGhpcy5fc2hvd0FkZERhdGFNb2RhbCxcbiAgICAgICAgcmVtb3ZlTGF5ZXI6IHZpc1N0YXRlQWN0aW9ucy5yZW1vdmVMYXllcixcbiAgICAgICAgcmVtb3ZlRGF0YXNldDogdGhpcy5fcmVtb3ZlRGF0YXNldFxuICAgICAgfTtcblxuICAgICAgY29uc3QgZmlsdGVyTWFuYWdlckFjdGlvbnMgPSB7XG4gICAgICAgIGFkZEZpbHRlcjogdmlzU3RhdGVBY3Rpb25zLmFkZEZpbHRlcixcbiAgICAgICAgcmVtb3ZlRmlsdGVyOiB2aXNTdGF0ZUFjdGlvbnMucmVtb3ZlRmlsdGVyLFxuICAgICAgICBzZXRGaWx0ZXI6IHZpc1N0YXRlQWN0aW9ucy5zZXRGaWx0ZXIsXG4gICAgICAgIHNob3dEYXRhc2V0VGFibGU6IHRoaXMuX3Nob3dEYXRhc2V0VGFibGUsXG4gICAgICAgIHNob3dBZGREYXRhTW9kYWw6IHRoaXMuX3Nob3dBZGREYXRhTW9kYWwsXG4gICAgICAgIHRvZ2dsZUFuaW1hdGlvbjogdmlzU3RhdGVBY3Rpb25zLnRvZ2dsZUFuaW1hdGlvbixcbiAgICAgICAgZW5sYXJnZUZpbHRlcjogdmlzU3RhdGVBY3Rpb25zLmVubGFyZ2VGaWx0ZXJcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGludGVyYWN0aW9uTWFuYWdlckFjdGlvbnMgPSB7XG4gICAgICAgIG9uQ29uZmlnQ2hhbmdlOiB2aXNTdGF0ZUFjdGlvbnMuaW50ZXJhY3Rpb25Db25maWdDaGFuZ2VcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1hcE1hbmFnZXJBY3Rpb25zID0ge1xuICAgICAgICBhZGRNYXBTdHlsZVVybDogbWFwU3R5bGVBY3Rpb25zLmFkZE1hcFN0eWxlVXJsLFxuICAgICAgICBvbkNvbmZpZ0NoYW5nZTogbWFwU3R5bGVBY3Rpb25zLm1hcENvbmZpZ0NoYW5nZSxcbiAgICAgICAgb25TdHlsZUNoYW5nZTogbWFwU3R5bGVBY3Rpb25zLm1hcFN0eWxlQ2hhbmdlLFxuICAgICAgICBvbkJ1aWxkaW5nQ2hhbmdlOiBtYXBTdHlsZUFjdGlvbnMubWFwQnVpbGRpbmdDaGFuZ2UsXG4gICAgICAgIHNob3dBZGRNYXBTdHlsZU1vZGFsOiB0aGlzLl9zaG93QWRkTWFwU3R5bGVNb2RhbFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U2lkZWJhclxuICAgICAgICAgICAgd2lkdGg9e3RoaXMucHJvcHMud2lkdGh9XG4gICAgICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgICAgIG1pbmlmaWVkV2lkdGg9ezB9XG4gICAgICAgICAgICBvbk9wZW5PckNsb3NlPXt0aGlzLl9vbk9wZW5PckNsb3NlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQYW5lbEhlYWRlclxuICAgICAgICAgICAgICBhcHBOYW1lPXthcHBOYW1lfVxuICAgICAgICAgICAgICB2ZXJzaW9uPXt2ZXJzaW9ufVxuICAgICAgICAgICAgICBvbkV4cG9ydEltYWdlPXt0aGlzLl9vbkV4cG9ydEltYWdlfVxuICAgICAgICAgICAgICBvbkV4cG9ydERhdGE9e3RoaXMuX29uRXhwb3J0RGF0YX1cbiAgICAgICAgICAgICAgdmlzaWJsZURyb3Bkb3duPXt1aVN0YXRlLnZpc2libGVEcm9wZG93bn1cbiAgICAgICAgICAgICAgc2hvd0V4cG9ydERyb3Bkb3duPXt1aVN0YXRlQWN0aW9ucy5zaG93RXhwb3J0RHJvcGRvd259XG4gICAgICAgICAgICAgIGhpZGVFeHBvcnREcm9wZG93bj17dWlTdGF0ZUFjdGlvbnMuaGlkZUV4cG9ydERyb3Bkb3dufVxuICAgICAgICAgICAgICBvbkV4cG9ydE1hcD17dGhpcy5fb25FeHBvcnRNYXB9XG4gICAgICAgICAgICAgIG9uU2F2ZU1hcD17dGhpcy5wcm9wcy5vblNhdmVNYXB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFBhbmVsVG9nZ2xlXG4gICAgICAgICAgICAgIHBhbmVscz17UEFORUxTfVxuICAgICAgICAgICAgICBhY3RpdmVQYW5lbD17YWN0aXZlU2lkZVBhbmVsfVxuICAgICAgICAgICAgICB0b2dnbGVQYW5lbD17dWlTdGF0ZUFjdGlvbnMudG9nZ2xlU2lkZVBhbmVsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxTaWRlUGFuZWxDb250ZW50IGNsYXNzTmFtZT1cInNpZGUtcGFuZWxfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8UGFuZWxUaXRsZSBjbGFzc05hbWU9XCJzaWRlLXBhbmVsX19jb250ZW50X190aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgeyhQQU5FTFMuZmluZCgoe2lkfSkgPT4gaWQgPT09IGFjdGl2ZVNpZGVQYW5lbCkgfHwge30pLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvUGFuZWxUaXRsZT5cbiAgICAgICAgICAgICAgICB7YWN0aXZlU2lkZVBhbmVsID09PSAnbGF5ZXInICYmIChcbiAgICAgICAgICAgICAgICAgIDxMYXllck1hbmFnZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLmxheWVyTWFuYWdlckFjdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzPXtsYXllcnN9XG4gICAgICAgICAgICAgICAgICAgIGxheWVyQ2xhc3Nlcz17bGF5ZXJDbGFzc2VzfVxuICAgICAgICAgICAgICAgICAgICBsYXllck9yZGVyPXtsYXllck9yZGVyfVxuICAgICAgICAgICAgICAgICAgICBsYXllckJsZW5kaW5nPXtsYXllckJsZW5kaW5nfVxuICAgICAgICAgICAgICAgICAgICBvcGVuTW9kYWw9e3VpU3RhdGVBY3Rpb25zLnRvZ2dsZU1vZGFsfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHthY3RpdmVTaWRlUGFuZWwgPT09ICdmaWx0ZXInICYmIChcbiAgICAgICAgICAgICAgICAgIDxGaWx0ZXJNYW5hZ2VyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5maWx0ZXJNYW5hZ2VyQWN0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJzPXtmaWx0ZXJzfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIHthY3RpdmVTaWRlUGFuZWwgPT09ICdpbnRlcmFjdGlvbicgJiYgKFxuICAgICAgICAgICAgICAgICAgPEludGVyYWN0aW9uTWFuYWdlclxuICAgICAgICAgICAgICAgICAgICB7Li4uaW50ZXJhY3Rpb25NYW5hZ2VyQWN0aW9uc31cbiAgICAgICAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZz17aW50ZXJhY3Rpb25Db25maWd9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2FjdGl2ZVNpZGVQYW5lbCA9PT0gJ21hcCcgJiYgKFxuICAgICAgICAgICAgICAgICAgPE1hcE1hbmFnZXJcbiAgICAgICAgICAgICAgICAgICAgey4uLm1hcE1hbmFnZXJBY3Rpb25zfVxuICAgICAgICAgICAgICAgICAgICBtYXBTdHlsZT17dGhpcy5wcm9wcy5tYXBTdHlsZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1NpZGVQYW5lbENvbnRlbnQ+XG4gICAgICAgICAgPC9TaWRlYmFyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuIl19