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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _layerConfigurator = _interopRequireDefault(require("./layer-configurator"));

var _layerPanelHeader = _interopRequireDefault(require("./layer-panel-header"));

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 12px;\n  border-radius: 1px;\n  margin-bottom: 8px;\n  z-index: 1000;\n\n  &.dragging {\n    cursor: move;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var PanelWrapper = _styledComponents["default"].div(_templateObject());

function LayerPanelFactory() {
  var LayerPanel =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(LayerPanel, _Component);

    function LayerPanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, LayerPanel);

      for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
        _args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(LayerPanel)).call.apply(_getPrototypeOf2, [this].concat(_args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateLayerConfig", function (newProp) {
        _this.props.layerConfigChange(_this.props.layer, newProp);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateLayerType", function (newType) {
        _this.props.layerTypeChange(_this.props.layer, newType);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateLayerVisConfig", function (newVisConfig) {
        _this.props.layerVisConfigChange(_this.props.layer, newVisConfig);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateLayerTextLabel", function () {
        var _this$props;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        (_this$props = _this.props).layerTextLabelChange.apply(_this$props, [_this.props.layer].concat(args));
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateLayerVisualChannelConfig", function (newConfig, channel, scaleKey) {
        _this.props.layerVisualChannelConfigChange(_this.props.layer, newConfig, channel, scaleKey);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateLayerLabel", function (_ref) {
        var value = _ref.target.value;

        _this.updateLayerConfig({
          label: value
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleVisibility", function (e) {
        e.stopPropagation();
        var isVisible = !_this.props.layer.config.isVisible;

        _this.updateLayerConfig({
          isVisible: isVisible
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleEnableConfig", function (e) {
        e.stopPropagation();
        var isConfigActive = _this.props.layer.config.isConfigActive;

        _this.updateLayerConfig({
          isConfigActive: !isConfigActive
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_removeLayer", function (e) {
        e.stopPropagation();

        _this.props.removeLayer(_this.props.idx);
      });
      return _this;
    }

    (0, _createClass2["default"])(LayerPanel, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            layer = _this$props2.layer,
            idx = _this$props2.idx,
            datasets = _this$props2.datasets,
            layerTypeOptions = _this$props2.layerTypeOptions;
        var config = layer.config;
        var isConfigActive = config.isConfigActive;
        return _react["default"].createElement(PanelWrapper, {
          active: isConfigActive,
          className: "layer-panel ".concat(this.props.className),
          style: this.props.style,
          onMouseDown: this.props.onMouseDown,
          onTouchStart: this.props.onTouchStart
        }, _react["default"].createElement(_layerPanelHeader["default"], {
          isConfigActive: isConfigActive,
          id: layer.id,
          idx: idx,
          isVisible: config.isVisible,
          label: config.label,
          labelRCGColorValues: datasets[config.dataId].color,
          layerType: layer.name,
          onToggleEnableConfig: this._toggleEnableConfig,
          onToggleVisibility: this._toggleVisibility,
          onUpdateLayerLabel: this._updateLayerLabel,
          onRemoveLayer: this._removeLayer
        }), isConfigActive && _react["default"].createElement(_layerConfigurator["default"], {
          layer: layer,
          datasets: datasets,
          layerTypeOptions: layerTypeOptions,
          openModal: this.props.openModal,
          updateLayerConfig: this.updateLayerConfig,
          updateLayerVisualChannelConfig: this.updateLayerVisualChannelConfig,
          updateLayerType: this.updateLayerType,
          updateLayerTextLabel: this.updateLayerTextLabel,
          updateLayerVisConfig: this.updateLayerVisConfig
        }));
      }
    }]);
    return LayerPanel;
  }(_react.Component);

  (0, _defineProperty2["default"])(LayerPanel, "propTypes", {
    layer: _propTypes["default"].object.isRequired,
    datasets: _propTypes["default"].object.isRequired,
    idx: _propTypes["default"].number.isRequired,
    layerConfigChange: _propTypes["default"].func.isRequired,
    layerTypeChange: _propTypes["default"].func.isRequired,
    openModal: _propTypes["default"].func.isRequired,
    removeLayer: _propTypes["default"].func.isRequired,
    onCloseConfig: _propTypes["default"].func,
    layerTypeOptions: _propTypes["default"].arrayOf(_propTypes["default"].any),
    layerVisConfigChange: _propTypes["default"].func,
    layerVisualChannelConfigChange: _propTypes["default"].func
  });
  return LayerPanel;
}

var _default = LayerPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItcGFuZWwuanMiXSwibmFtZXMiOlsiUGFuZWxXcmFwcGVyIiwic3R5bGVkIiwiZGl2IiwiTGF5ZXJQYW5lbEZhY3RvcnkiLCJMYXllclBhbmVsIiwibmV3UHJvcCIsInByb3BzIiwibGF5ZXJDb25maWdDaGFuZ2UiLCJsYXllciIsIm5ld1R5cGUiLCJsYXllclR5cGVDaGFuZ2UiLCJuZXdWaXNDb25maWciLCJsYXllclZpc0NvbmZpZ0NoYW5nZSIsImFyZ3MiLCJsYXllclRleHRMYWJlbENoYW5nZSIsIm5ld0NvbmZpZyIsImNoYW5uZWwiLCJzY2FsZUtleSIsImxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZSIsInZhbHVlIiwidGFyZ2V0IiwidXBkYXRlTGF5ZXJDb25maWciLCJsYWJlbCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJpc1Zpc2libGUiLCJjb25maWciLCJpc0NvbmZpZ0FjdGl2ZSIsInJlbW92ZUxheWVyIiwiaWR4IiwiZGF0YXNldHMiLCJsYXllclR5cGVPcHRpb25zIiwiY2xhc3NOYW1lIiwic3R5bGUiLCJvbk1vdXNlRG93biIsIm9uVG91Y2hTdGFydCIsImlkIiwiZGF0YUlkIiwiY29sb3IiLCJuYW1lIiwiX3RvZ2dsZUVuYWJsZUNvbmZpZyIsIl90b2dnbGVWaXNpYmlsaXR5IiwiX3VwZGF0ZUxheWVyTGFiZWwiLCJfcmVtb3ZlTGF5ZXIiLCJvcGVuTW9kYWwiLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWciLCJ1cGRhdGVMYXllclR5cGUiLCJ1cGRhdGVMYXllclRleHRMYWJlbCIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsIm51bWJlciIsImZ1bmMiLCJvbkNsb3NlQ29uZmlnIiwiYXJyYXlPZiIsImFueSJdLCJtYXBwaW5ncyI6Ijs7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QjtBQVFFLFVBQUEsb0JBQW9CLEVBQUUsS0FBS0Msb0JBUjdCO0FBU0UsVUFBQSxvQkFBb0IsRUFBRSxLQUFLQztBQVQ3QixVQXJCSixDQURGO0FBb0NEO0FBekd3QjtBQUFBO0FBQUEsSUFFRkMsZ0JBRkU7O0FBQUEsbUNBRXJCN0MsVUFGcUIsZUFHTjtBQUNqQkksSUFBQUEsS0FBSyxFQUFFMEMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBRFA7QUFFakJ0QixJQUFBQSxRQUFRLEVBQUVvQixzQkFBVUMsTUFBVixDQUFpQkMsVUFGVjtBQUdqQnZCLElBQUFBLEdBQUcsRUFBRXFCLHNCQUFVRyxNQUFWLENBQWlCRCxVQUhMO0FBSWpCN0MsSUFBQUEsaUJBQWlCLEVBQUUyQyxzQkFBVUksSUFBVixDQUFlRixVQUpqQjtBQUtqQjFDLElBQUFBLGVBQWUsRUFBRXdDLHNCQUFVSSxJQUFWLENBQWVGLFVBTGY7QUFNakJSLElBQUFBLFNBQVMsRUFBRU0sc0JBQVVJLElBQVYsQ0FBZUYsVUFOVDtBQU9qQnhCLElBQUFBLFdBQVcsRUFBRXNCLHNCQUFVSSxJQUFWLENBQWVGLFVBUFg7QUFRakJHLElBQUFBLGFBQWEsRUFBRUwsc0JBQVVJLElBUlI7QUFVakJ2QixJQUFBQSxnQkFBZ0IsRUFBRW1CLHNCQUFVTSxPQUFWLENBQWtCTixzQkFBVU8sR0FBNUIsQ0FWRDtBQVdqQjdDLElBQUFBLG9CQUFvQixFQUFFc0Msc0JBQVVJLElBWGY7QUFZakJwQyxJQUFBQSw4QkFBOEIsRUFBRWdDLHNCQUFVSTtBQVp6QixHQUhNO0FBNEczQixTQUFPbEQsVUFBUDtBQUNEOztlQUVjRCxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgTGF5ZXJDb25maWd1cmF0b3IgZnJvbSAnLi9sYXllci1jb25maWd1cmF0b3InO1xuaW1wb3J0IExheWVyUGFuZWxIZWFkZXIgZnJvbSAnLi9sYXllci1wYW5lbC1oZWFkZXInO1xuXG5jb25zdCBQYW5lbFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBmb250LXNpemU6IDEycHg7XG4gIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICB6LWluZGV4OiAxMDAwO1xuXG4gICYuZHJhZ2dpbmcge1xuICAgIGN1cnNvcjogbW92ZTtcbiAgfVxuYDtcblxuZnVuY3Rpb24gTGF5ZXJQYW5lbEZhY3RvcnkoKSB7XG5cbiAgY2xhc3MgTGF5ZXJQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgaWR4OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICBsYXllckNvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyVHlwZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIG9wZW5Nb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJlbW92ZUxheWVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgb25DbG9zZUNvbmZpZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAgIGxheWVyVHlwZU9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLFxuICAgICAgbGF5ZXJWaXNDb25maWdDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xuICAgIH07XG5cbiAgICB1cGRhdGVMYXllckNvbmZpZyA9IG5ld1Byb3AgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sYXllckNvbmZpZ0NoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdQcm9wKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlTGF5ZXJUeXBlID0gbmV3VHlwZSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxheWVyVHlwZUNoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdUeXBlKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlTGF5ZXJWaXNDb25maWcgPSBuZXdWaXNDb25maWcgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sYXllclZpc0NvbmZpZ0NoYW5nZSh0aGlzLnByb3BzLmxheWVyLCBuZXdWaXNDb25maWcpO1xuICAgIH07XG5cbiAgICB1cGRhdGVMYXllclRleHRMYWJlbCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmxheWVyVGV4dExhYmVsQ2hhbmdlKHRoaXMucHJvcHMubGF5ZXIsIC4uLmFyZ3MpO1xuICAgIH07XG5cbiAgICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWcgPSAobmV3Q29uZmlnLCBjaGFubmVsLCBzY2FsZUtleSkgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5sYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2UoXG4gICAgICAgIHRoaXMucHJvcHMubGF5ZXIsXG4gICAgICAgIG5ld0NvbmZpZyxcbiAgICAgICAgY2hhbm5lbCxcbiAgICAgICAgc2NhbGVLZXlcbiAgICAgICk7XG4gICAgfTtcblxuICAgIF91cGRhdGVMYXllckxhYmVsID0gKHt0YXJnZXQ6IHt2YWx1ZX19KSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtsYWJlbDogdmFsdWV9KTtcbiAgICB9O1xuXG4gICAgX3RvZ2dsZVZpc2liaWxpdHkgPSBlID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCBpc1Zpc2libGUgPSAhdGhpcy5wcm9wcy5sYXllci5jb25maWcuaXNWaXNpYmxlO1xuICAgICAgdGhpcy51cGRhdGVMYXllckNvbmZpZyh7aXNWaXNpYmxlfSk7XG4gICAgfTtcblxuICAgIF90b2dnbGVFbmFibGVDb25maWcgPSBlID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBjb25zdCB7bGF5ZXI6IHtjb25maWc6IHtpc0NvbmZpZ0FjdGl2ZX19fSA9IHRoaXMucHJvcHM7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtpc0NvbmZpZ0FjdGl2ZTogIWlzQ29uZmlnQWN0aXZlfSk7XG4gICAgfTtcblxuICAgIF9yZW1vdmVMYXllciA9IGUgPT4ge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXMucHJvcHMucmVtb3ZlTGF5ZXIodGhpcy5wcm9wcy5pZHgpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7bGF5ZXIsIGlkeCwgZGF0YXNldHMsIGxheWVyVHlwZU9wdGlvbnN9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHtjb25maWd9ID0gbGF5ZXI7XG4gICAgICBjb25zdCB7aXNDb25maWdBY3RpdmV9ID0gY29uZmlnO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UGFuZWxXcmFwcGVyXG4gICAgICAgICAgYWN0aXZlPXtpc0NvbmZpZ0FjdGl2ZX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BsYXllci1wYW5lbCAke3RoaXMucHJvcHMuY2xhc3NOYW1lfWB9XG4gICAgICAgICAgc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9XG4gICAgICAgICAgb25Nb3VzZURvd249e3RoaXMucHJvcHMub25Nb3VzZURvd259XG4gICAgICAgICAgb25Ub3VjaFN0YXJ0PXt0aGlzLnByb3BzLm9uVG91Y2hTdGFydH1cbiAgICAgICAgPlxuICAgICAgICAgIDxMYXllclBhbmVsSGVhZGVyXG4gICAgICAgICAgICBpc0NvbmZpZ0FjdGl2ZT17aXNDb25maWdBY3RpdmV9XG4gICAgICAgICAgICBpZD17bGF5ZXIuaWR9XG4gICAgICAgICAgICBpZHg9e2lkeH1cbiAgICAgICAgICAgIGlzVmlzaWJsZT17Y29uZmlnLmlzVmlzaWJsZX1cbiAgICAgICAgICAgIGxhYmVsPXtjb25maWcubGFiZWx9XG4gICAgICAgICAgICBsYWJlbFJDR0NvbG9yVmFsdWVzPXtkYXRhc2V0c1tjb25maWcuZGF0YUlkXS5jb2xvcn1cbiAgICAgICAgICAgIGxheWVyVHlwZT17bGF5ZXIubmFtZX1cbiAgICAgICAgICAgIG9uVG9nZ2xlRW5hYmxlQ29uZmlnPXt0aGlzLl90b2dnbGVFbmFibGVDb25maWd9XG4gICAgICAgICAgICBvblRvZ2dsZVZpc2liaWxpdHk9e3RoaXMuX3RvZ2dsZVZpc2liaWxpdHl9XG4gICAgICAgICAgICBvblVwZGF0ZUxheWVyTGFiZWw9e3RoaXMuX3VwZGF0ZUxheWVyTGFiZWx9XG4gICAgICAgICAgICBvblJlbW92ZUxheWVyPXt0aGlzLl9yZW1vdmVMYXllcn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIHtpc0NvbmZpZ0FjdGl2ZSAmJiAoXG4gICAgICAgICAgICA8TGF5ZXJDb25maWd1cmF0b3JcbiAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgIGxheWVyVHlwZU9wdGlvbnM9e2xheWVyVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICAgIG9wZW5Nb2RhbD17dGhpcy5wcm9wcy5vcGVuTW9kYWx9XG4gICAgICAgICAgICAgIHVwZGF0ZUxheWVyQ29uZmlnPXt0aGlzLnVwZGF0ZUxheWVyQ29uZmlnfVxuICAgICAgICAgICAgICB1cGRhdGVMYXllclZpc3VhbENoYW5uZWxDb25maWc9e3RoaXMudXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnfVxuICAgICAgICAgICAgICB1cGRhdGVMYXllclR5cGU9e3RoaXMudXBkYXRlTGF5ZXJUeXBlfVxuICAgICAgICAgICAgICB1cGRhdGVMYXllclRleHRMYWJlbD17dGhpcy51cGRhdGVMYXllclRleHRMYWJlbH1cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJWaXNDb25maWc9e3RoaXMudXBkYXRlTGF5ZXJWaXNDb25maWd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvUGFuZWxXcmFwcGVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTGF5ZXJQYW5lbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJQYW5lbEZhY3Rvcnk7XG4iXX0=