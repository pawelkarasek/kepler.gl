"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregationTypeSelector = exports.AggrColorScaleSelector = exports.ChannelByValueSelector = exports.ColorRangeConfig = exports.ArcLayerColorSelector = exports.LayerColorSelector = exports.HowToButton = exports["default"] = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("../../common/styled-components");

var _itemSelector = _interopRequireDefault(require("../../common/item-selector/item-selector"));

var _visConfigByFieldSelector = _interopRequireDefault(require("./vis-config-by-field-selector"));

var _layerColumnConfig = _interopRequireDefault(require("./layer-column-config"));

var _layerTypeSelector = _interopRequireDefault(require("./layer-type-selector"));

var _dimensionScaleSelector = _interopRequireDefault(require("./dimension-scale-selector"));

var _colorSelector = _interopRequireDefault(require("./color-selector"));

var _sourceDataSelector = _interopRequireDefault(require("../source-data-selector"));

var _visConfigSwitch = _interopRequireDefault(require("./vis-config-switch"));

var _visConfigSlider = _interopRequireDefault(require("./vis-config-slider"));

var _layerConfigGroup = _interopRequireWildcard(require("./layer-config-group"));

var _textLabelPanel = _interopRequireDefault(require("./text-label-panel"));

var _layerFactory = require("../../../layers/layer-factory");

var _utils = require("../../../utils/utils");

var _defaultSettings = require("../../../constants/default-settings");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: absolute;\n  right: 12px;\n  top: -4px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-top: 12px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  position: relative;\n  margin-top: 12px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledLayerConfigurator = _styledComponents["default"].div.attrs({
  className: 'layer-panel__config'
})(_templateObject());

var StyledLayerVisualConfigurator = _styledComponents["default"].div.attrs({
  className: 'layer-panel__config__visualC-config'
})(_templateObject2());

var LayerConfigurator =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(LayerConfigurator, _Component);

  function LayerConfigurator() {
    (0, _classCallCheck2["default"])(this, LayerConfigurator);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LayerConfigurator).apply(this, arguments));
  }

  (0, _createClass2["default"])(LayerConfigurator, [{
    key: "_renderPointLayerConfig",
    value: function _renderPointLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: "_renderIconLayerConfig",
    value: function _renderIconLayerConfig(props) {
      return this._renderScatterplotLayerConfig(props);
    }
  }, {
    key: "_renderScatterplotLayerConfig",
    value: function _renderScatterplotLayerConfig(_ref) {
      var layer = _ref.layer,
          visConfiguratorProps = _ref.visConfiguratorProps,
          layerChannelConfigProps = _ref.layerChannelConfigProps,
          layerConfiguratorProps = _ref.layerConfiguratorProps;
      return _react["default"].createElement(StyledLayerVisualConfigurator, null, _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, layer.visConfigSettings.filled, visConfiguratorProps, {
        collapsible: true
      }), layer.config.colorField ? _react["default"].createElement(ColorRangeConfig, visConfiguratorProps) : _react["default"].createElement(LayerColorSelector, layerConfiguratorProps), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))), layer.type === _defaultSettings.LAYER_TYPES.point ? _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, layer.visConfigSettings.outline, visConfiguratorProps, {
        collapsible: true
      }), layer.config.strokeColorField ? _react["default"].createElement(ColorRangeConfig, (0, _extends2["default"])({}, visConfiguratorProps, {
        property: "strokeColorRange"
      })) : _react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
        selectedColor: layer.config.visConfig.strokeColor,
        property: "strokeColor"
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.strokeColor
      }, layerChannelConfigProps)), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.thickness, visConfiguratorProps, {
        label: false,
        disabled: !layer.config.visConfig.outline
      })))) : null, _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'radius',
        collapsible: true
      }, !layer.config.sizeField ? _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
        label: false,
        disabled: Boolean(layer.config.sizeField)
      })) : _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
        label: false,
        disabled: !layer.config.sizeField || layer.config.visConfig.fixedRadius
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)), layer.config.sizeField ? _react["default"].createElement(_visConfigSwitch["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.fixedRadius, visConfiguratorProps)) : null)), _react["default"].createElement(_textLabelPanel["default"], {
        fields: visConfiguratorProps.fields,
        updateLayerTextLabel: this.props.updateLayerTextLabel,
        textLabel: layer.config.textLabel
      }));
    }
  }, {
    key: "_renderClusterLayerConfig",
    value: function _renderClusterLayerConfig(_ref2) {
      var layer = _ref2.layer,
          visConfiguratorProps = _ref2.visConfiguratorProps,
          layerConfiguratorProps = _ref2.layerConfiguratorProps,
          layerChannelConfigProps = _ref2.layerChannelConfigProps;
      return _react["default"].createElement(StyledLayerVisualConfigurator, null, _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'color',
        collapsible: true
      }, _react["default"].createElement(ColorRangeConfig, visConfiguratorProps), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(AggrColorScaleSelector, layerConfiguratorProps), _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
        channel: layer.visualChannels.color
      })) : null, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'radius',
        collapsible: true
      }, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.clusterRadius, visConfiguratorProps)), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.radiusRange, visConfiguratorProps)))));
    }
  }, {
    key: "_renderHeatmapLayerConfig",
    value: function _renderHeatmapLayerConfig(_ref3) {
      var layer = _ref3.layer,
          visConfiguratorProps = _ref3.visConfiguratorProps,
          layerConfiguratorProps = _ref3.layerConfiguratorProps,
          layerChannelConfigProps = _ref3.layerChannelConfigProps;
      return _react["default"].createElement(StyledLayerVisualConfigurator, null, _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'color',
        collapsible: true
      }, _react["default"].createElement(ColorRangeConfig, visConfiguratorProps), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'radius'
      }, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.radius, visConfiguratorProps, {
        label: false
      }))), _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'weight'
      }, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.weight
      }, layerChannelConfigProps))));
    }
  }, {
    key: "_renderGridLayerConfig",
    value: function _renderGridLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: "_renderHexagonLayerConfig",
    value: function _renderHexagonLayerConfig(props) {
      return this._renderAggregationLayerConfig(props);
    }
  }, {
    key: "_renderAggregationLayerConfig",
    value: function _renderAggregationLayerConfig(_ref4) {
      var layer = _ref4.layer,
          visConfiguratorProps = _ref4.visConfiguratorProps,
          layerConfiguratorProps = _ref4.layerConfiguratorProps,
          layerChannelConfigProps = _ref4.layerChannelConfigProps;
      var config = layer.config;
      var enable3d = config.visConfig.enable3d;
      var elevationByDescription = 'When off, height is based on count of points';
      var colorByDescription = 'When off, color is based on count of points';
      return _react["default"].createElement(StyledLayerVisualConfigurator, null, _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'color',
        collapsible: true
      }, _react["default"].createElement(ColorRangeConfig, visConfiguratorProps), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(AggrColorScaleSelector, layerConfiguratorProps), _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), layer.visConfigSettings.colorAggregation.condition(layer.config) ? _react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.colorAggregation, layerChannelConfigProps, {
        descreiption: colorByDescription,
        channel: layer.visualChannels.color
      })) : null, layer.visConfigSettings.percentile && layer.visConfigSettings.percentile.condition(layer.config) ? _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.percentile, visConfiguratorProps)) : null, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.opacity, visConfiguratorProps)))), _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'radius',
        collapsible: true
      }, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.worldUnitSize, visConfiguratorProps)), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.coverage, visConfiguratorProps)))), layer.visConfigSettings.enable3d ? _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, layer.visConfigSettings.enable3d, visConfiguratorProps, {
        collapsible: true
      }), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.elevationScale, visConfiguratorProps)), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({}, layerChannelConfigProps, {
        channel: layer.visualChannels.size,
        description: elevationByDescription,
        disabled: !enable3d
      })), layer.visConfigSettings.sizeAggregation.condition(layer.config) ? _react["default"].createElement(AggregationTypeSelector, (0, _extends2["default"])({}, layer.visConfigSettings.sizeAggregation, layerChannelConfigProps, {
        channel: layer.visualChannels.size
      })) : null, layer.visConfigSettings.elevationPercentile.condition(layer.config) ? _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.elevationPercentile, visConfiguratorProps)) : null)) : null);
    } // TODO: Shan move these into layer class

  }, {
    key: "_renderHexagonIdLayerConfig",
    value: function _renderHexagonIdLayerConfig(_ref5) {
      var layer = _ref5.layer,
          visConfiguratorProps = _ref5.visConfiguratorProps,
          layerConfiguratorProps = _ref5.layerConfiguratorProps,
          layerChannelConfigProps = _ref5.layerChannelConfigProps;
      return _react["default"].createElement(StyledLayerVisualConfigurator, null, _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'color',
        collapsible: true
      }, layer.config.colorField ? _react["default"].createElement(ColorRangeConfig, visConfiguratorProps) : _react["default"].createElement(LayerColorSelector, layerConfiguratorProps), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))), _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'coverage',
        collapsible: true
      }, !layer.config.coverageField ? _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.coverage, visConfiguratorProps, {
        label: false
      })) : _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, layer.visConfigSettings.coverageRange, visConfiguratorProps, {
        label: false
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.coverage
      }, layerChannelConfigProps)))), _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.enable3d, visConfiguratorProps, {
        collapsible: true
      }), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.elevationRange, visConfiguratorProps, {
        label: false
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)))));
    }
  }, {
    key: "_renderArcLayerConfig",
    value: function _renderArcLayerConfig(args) {
      return this._renderLineLayerConfig(args);
    }
  }, {
    key: "_renderLineLayerConfig",
    value: function _renderLineLayerConfig(_ref6) {
      var layer = _ref6.layer,
          visConfiguratorProps = _ref6.visConfiguratorProps,
          layerConfiguratorProps = _ref6.layerConfiguratorProps,
          layerChannelConfigProps = _ref6.layerChannelConfigProps;
      return _react["default"].createElement(StyledLayerVisualConfigurator, null, _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'color',
        collapsible: true
      }, layer.config.colorField ? _react["default"].createElement(ColorRangeConfig, visConfiguratorProps) : _react["default"].createElement(ArcLayerColorSelector, {
        layer: layer,
        onChangeConfig: layerConfiguratorProps.onChange,
        onChangeVisConfig: visConfiguratorProps.onChange
      }), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))), _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'stroke',
        collapsible: true
      }, layer.config.sizeField ? _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
        disabled: !layer.config.sizeField,
        label: false
      })) : _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps, {
        label: false
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)))));
    }
  }, {
    key: "_renderGeojsonLayerConfig",
    value: function _renderGeojsonLayerConfig(_ref7) {
      var layer = _ref7.layer,
          visConfiguratorProps = _ref7.visConfiguratorProps,
          layerConfiguratorProps = _ref7.layerConfiguratorProps,
          layerChannelConfigProps = _ref7.layerChannelConfigProps;
      var _layer$meta$featureTy = layer.meta.featureTypes,
          featureTypes = _layer$meta$featureTy === void 0 ? {} : _layer$meta$featureTy,
          visConfig = layer.config.visConfig;
      return _react["default"].createElement(StyledLayerVisualConfigurator, null, featureTypes.polygon || featureTypes.point ? _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, layer.visConfigSettings.filled, visConfiguratorProps, {
        label: "Fill Color",
        collapsible: true
      }), layer.config.colorField ? _react["default"].createElement(ColorRangeConfig, visConfiguratorProps) : _react["default"].createElement(LayerColorSelector, layerConfiguratorProps), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.color
      }, layerChannelConfigProps)), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.opacity, visConfiguratorProps)))) : null, _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, layer.visConfigSettings.stroked, visConfiguratorProps, {
        label: "Stroke Color",
        collapsible: true
      }), layer.config.strokeColorField ? _react["default"].createElement(ColorRangeConfig, (0, _extends2["default"])({}, visConfiguratorProps, {
        property: "strokeColorRange"
      })) : _react["default"].createElement(LayerColorSelector, (0, _extends2["default"])({}, visConfiguratorProps, {
        selectedColor: layer.config.visConfig.strokeColor,
        property: "strokeColor"
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.strokeColor
      }, layerChannelConfigProps)))), _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, visConfiguratorProps, featureTypes.polygon ? _layerFactory.LAYER_VIS_CONFIGS.stroked : {}, {
        label: "Stroke Width",
        collapsible: true
      }), layer.config.sizeField ? _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.strokeWidthRange, visConfiguratorProps, {
        label: false
      })) : _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.thickness, visConfiguratorProps, {
        label: false
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.size
      }, layerChannelConfigProps)))), featureTypes.polygon && visConfig.filled ? _react["default"].createElement(_layerConfigGroup["default"], (0, _extends2["default"])({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.enable3d, {
        collapsible: true
      }), _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.elevationScale, visConfiguratorProps, {
        label: false
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.height
      }, layerChannelConfigProps)), _react["default"].createElement(_visConfigSwitch["default"], (0, _extends2["default"])({}, visConfiguratorProps, _layerFactory.LAYER_VIS_CONFIGS.wireframe)))) : null, featureTypes.point ? _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'radius',
        collapsible: true
      }, !layer.config.radiusField ? _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.radius, visConfiguratorProps, {
        label: false,
        disabled: Boolean(layer.config.radiusField)
      })) : _react["default"].createElement(_visConfigSlider["default"], (0, _extends2["default"])({}, _layerFactory.LAYER_VIS_CONFIGS.radiusRange, visConfiguratorProps, {
        label: false,
        disabled: !layer.config.radiusField
      })), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, _react["default"].createElement(ChannelByValueSelector, (0, _extends2["default"])({
        channel: layer.visualChannels.radius
      }, layerChannelConfigProps)))) : null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          layer = _this$props.layer,
          datasets = _this$props.datasets,
          updateLayerConfig = _this$props.updateLayerConfig,
          layerTypeOptions = _this$props.layerTypeOptions,
          updateLayerType = _this$props.updateLayerType;

      var _ref8 = layer.config.dataId ? datasets[layer.config.dataId] : {},
          _ref8$fields = _ref8.fields,
          fields = _ref8$fields === void 0 ? [] : _ref8$fields,
          fieldPairs = _ref8.fieldPairs;

      var config = layer.config;
      var commonConfigProp = {
        layer: layer,
        fields: fields
      };
      var visConfiguratorProps = (0, _objectSpread3["default"])({}, commonConfigProp, {
        onChange: this.props.updateLayerVisConfig
      });
      var layerConfiguratorProps = (0, _objectSpread3["default"])({}, commonConfigProp, {
        onChange: updateLayerConfig
      });
      var layerChannelConfigProps = (0, _objectSpread3["default"])({}, commonConfigProp, {
        onChange: this.props.updateLayerVisualChannelConfig
      });
      var renderTemplate = layer.type && "_render".concat((0, _utils.capitalizeFirstLetter)(layer.type), "LayerConfig");
      return _react["default"].createElement(StyledLayerConfigurator, null, layer.layerInfoModal ? _react["default"].createElement(HowToButton, {
        onClick: function onClick() {
          return _this.props.openModal(layer.layerInfoModal);
        }
      }) : null, _react["default"].createElement(_layerConfigGroup["default"], {
        label: 'basic',
        collapsible: true,
        expanded: !layer.hasAllColumns()
      }, _react["default"].createElement(_layerTypeSelector["default"], {
        layer: layer,
        layerTypeOptions: layerTypeOptions,
        onSelect: updateLayerType
      }), _react["default"].createElement(_layerConfigGroup.ConfigGroupCollapsibleContent, null, Object.keys(datasets).length > 1 && _react["default"].createElement(_sourceDataSelector["default"], {
        datasets: datasets,
        id: layer.id,
        disabled: layer.type && config.columns,
        dataId: config.dataId,
        onSelect: function onSelect(value) {
          return updateLayerConfig({
            dataId: value
          });
        }
      }), _react["default"].createElement(_layerColumnConfig["default"], {
        layer: layer,
        fields: fields,
        fieldPairs: fieldPairs,
        updateLayerConfig: updateLayerConfig,
        updateLayerType: this.props.updateLayerType
      }))), this[renderTemplate] && this[renderTemplate]({
        layer: layer,
        visConfiguratorProps: visConfiguratorProps,
        layerChannelConfigProps: layerChannelConfigProps,
        layerConfiguratorProps: layerConfiguratorProps
      }));
    }
  }]);
  return LayerConfigurator;
}(_react.Component);
/*
 * Componentize config component into pure functional components
 */


exports["default"] = LayerConfigurator;
(0, _defineProperty2["default"])(LayerConfigurator, "propTypes", {
  layer: _propTypes["default"].object.isRequired,
  datasets: _propTypes["default"].object.isRequired,
  layerTypeOptions: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  openModal: _propTypes["default"].func.isRequired,
  updateLayerConfig: _propTypes["default"].func.isRequired,
  updateLayerType: _propTypes["default"].func.isRequired,
  updateLayerVisConfig: _propTypes["default"].func.isRequired,
  updateLayerVisualChannelConfig: _propTypes["default"].func.isRequired
});

var StyledHowToButton = _styledComponents["default"].div(_templateObject3());

var HowToButton = function HowToButton(_ref9) {
  var onClick = _ref9.onClick;
  return _react["default"].createElement(StyledHowToButton, null, _react["default"].createElement(_styledComponents2.Button, {
    link: true,
    small: true,
    onClick: onClick
  }, "How to"));
};

exports.HowToButton = HowToButton;

var LayerColorSelector = function LayerColorSelector(_ref10) {
  var layer = _ref10.layer,
      onChange = _ref10.onChange,
      label = _ref10.label,
      selectedColor = _ref10.selectedColor,
      _ref10$property = _ref10.property,
      property = _ref10$property === void 0 ? 'color' : _ref10$property;
  return _react["default"].createElement(_styledComponents2.SidePanelSection, null, _react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: selectedColor || layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChange((0, _defineProperty2["default"])({}, property, rgbValue));
      }
    }]
  }));
};

exports.LayerColorSelector = LayerColorSelector;

var ArcLayerColorSelector = function ArcLayerColorSelector(_ref11) {
  var layer = _ref11.layer,
      onChangeConfig = _ref11.onChangeConfig,
      onChangeVisConfig = _ref11.onChangeVisConfig;
  return _react["default"].createElement(_styledComponents2.SidePanelSection, null, _react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeConfig({
          color: rgbValue
        });
      },
      label: 'Source'
    }, {
      selectedColor: layer.config.visConfig.targetColor || layer.config.color,
      setColor: function setColor(rgbValue) {
        return onChangeVisConfig({
          targetColor: rgbValue
        });
      },
      label: 'Target'
    }]
  }));
};

exports.ArcLayerColorSelector = ArcLayerColorSelector;

var ColorRangeConfig = function ColorRangeConfig(_ref12) {
  var layer = _ref12.layer,
      onChange = _ref12.onChange,
      _ref12$property = _ref12.property,
      property = _ref12$property === void 0 ? 'colorRange' : _ref12$property;
  return _react["default"].createElement(_styledComponents2.SidePanelSection, null, _react["default"].createElement(_colorSelector["default"], {
    colorSets: [{
      selectedColor: layer.config.visConfig[property],
      isRange: true,
      setColor: function setColor(colorRange) {
        return onChange((0, _defineProperty2["default"])({}, property, colorRange));
      }
    }]
  }));
};

exports.ColorRangeConfig = ColorRangeConfig;

var ChannelByValueSelector = function ChannelByValueSelector(_ref13) {
  var layer = _ref13.layer,
      channel = _ref13.channel,
      onChange = _ref13.onChange,
      fields = _ref13.fields,
      description = _ref13.description;
  var channelScaleType = channel.channelScaleType,
      domain = channel.domain,
      field = channel.field,
      key = channel.key,
      property = channel.property,
      range = channel.range,
      scale = channel.scale,
      defaultMeasure = channel.defaultMeasure,
      supportedFieldTypes = channel.supportedFieldTypes;
  var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];
  var supportedFields = fields.filter(function (_ref14) {
    var type = _ref14.type;
    return channelSupportedFieldTypes.includes(type);
  });
  var scaleOptions = layer.getScaleOptions(channel.key);
  var showScale = !layer.isAggregated && layer.config[scale] && scaleOptions.length > 1;
  var defaultDescription = "Calculate ".concat(property, " based on selected field");
  return _react["default"].createElement(_visConfigByFieldSelector["default"], {
    channel: channel.key,
    description: description || defaultDescription,
    domain: layer.config[domain],
    fields: supportedFields,
    id: layer.id,
    key: "".concat(key, "-channel-selector"),
    property: property,
    placeholder: defaultMeasure || 'Select a field',
    range: layer.config.visConfig[range],
    scaleOptions: scaleOptions,
    scaleType: scale ? layer.config[scale] : null,
    selectedField: layer.config[field],
    showScale: showScale,
    updateField: function updateField(val) {
      return onChange((0, _defineProperty2["default"])({}, field, val), key);
    },
    updateScale: function updateScale(val) {
      return onChange((0, _defineProperty2["default"])({}, scale, val), key);
    }
  });
};

exports.ChannelByValueSelector = ChannelByValueSelector;

var AggrColorScaleSelector = function AggrColorScaleSelector(_ref15) {
  var layer = _ref15.layer,
      onChange = _ref15.onChange;
  var scaleOptions = layer.getScaleOptions('color');
  return Array.isArray(scaleOptions) && scaleOptions.length > 1 ? _react["default"].createElement(_dimensionScaleSelector["default"], {
    label: "Color Scale",
    options: scaleOptions,
    scaleType: layer.config.colorScale,
    onSelect: function onSelect(val) {
      return onChange({
        colorScale: val
      }, 'color');
    }
  }) : null;
};

exports.AggrColorScaleSelector = AggrColorScaleSelector;

var AggregationTypeSelector = function AggregationTypeSelector(_ref16) {
  var layer = _ref16.layer,
      channel = _ref16.channel,
      _onChange5 = _ref16.onChange;
  var field = channel.field,
      aggregation = channel.aggregation,
      key = channel.key;
  var selectedField = layer.config[field];
  var visConfig = layer.config.visConfig; // aggregation should only be selectable when field is selected

  var aggregationOptions = layer.getAggregationOptions(key);
  return _react["default"].createElement(_styledComponents2.SidePanelSection, null, _react["default"].createElement(_styledComponents2.PanelLabel, null, "Aggregate ".concat(selectedField.name, " by")), _react["default"].createElement(_itemSelector["default"], {
    selectedItems: visConfig[aggregation],
    options: aggregationOptions,
    multiSelect: false,
    searchable: false,
    onChange: function onChange(value) {
      return _onChange5({
        visConfig: (0, _objectSpread3["default"])({}, layer.config.visConfig, (0, _defineProperty2["default"])({}, aggregation, value))
      }, channel.key);
    }
  }));
};
/* eslint-enable max-params */


exports.AggregationTypeSelector = AggregationTypeSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvbGF5ZXItY29uZmlndXJhdG9yLmpzIl0sIm5hbWVzIjpbIlN0eWxlZExheWVyQ29uZmlndXJhdG9yIiwic3R5bGVkIiwiZGl2IiwiYXR0cnMiLCJjbGFzc05hbWUiLCJTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciIsIkxheWVyQ29uZmlndXJhdG9yIiwicHJvcHMiLCJfcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyIsImxheWVyIiwidmlzQ29uZmlndXJhdG9yUHJvcHMiLCJsYXllckNoYW5uZWxDb25maWdQcm9wcyIsImxheWVyQ29uZmlndXJhdG9yUHJvcHMiLCJ2aXNDb25maWdTZXR0aW5ncyIsImZpbGxlZCIsImNvbmZpZyIsImNvbG9yRmllbGQiLCJ2aXN1YWxDaGFubmVscyIsImNvbG9yIiwiTEFZRVJfVklTX0NPTkZJR1MiLCJvcGFjaXR5IiwidHlwZSIsIkxBWUVSX1RZUEVTIiwicG9pbnQiLCJvdXRsaW5lIiwic3Ryb2tlQ29sb3JGaWVsZCIsInZpc0NvbmZpZyIsInN0cm9rZUNvbG9yIiwidGhpY2tuZXNzIiwic2l6ZUZpZWxkIiwicmFkaXVzIiwiQm9vbGVhbiIsInJhZGl1c1JhbmdlIiwiZml4ZWRSYWRpdXMiLCJzaXplIiwiZmllbGRzIiwidXBkYXRlTGF5ZXJUZXh0TGFiZWwiLCJ0ZXh0TGFiZWwiLCJjb2xvckFnZ3JlZ2F0aW9uIiwiY29uZGl0aW9uIiwiY2x1c3RlclJhZGl1cyIsIndlaWdodCIsIl9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnIiwiZW5hYmxlM2QiLCJlbGV2YXRpb25CeURlc2NyaXB0aW9uIiwiY29sb3JCeURlc2NyaXB0aW9uIiwicGVyY2VudGlsZSIsIndvcmxkVW5pdFNpemUiLCJjb3ZlcmFnZSIsImVsZXZhdGlvblNjYWxlIiwic2l6ZUFnZ3JlZ2F0aW9uIiwiZWxldmF0aW9uUGVyY2VudGlsZSIsImNvdmVyYWdlRmllbGQiLCJjb3ZlcmFnZVJhbmdlIiwiZWxldmF0aW9uUmFuZ2UiLCJhcmdzIiwiX3JlbmRlckxpbmVMYXllckNvbmZpZyIsIm9uQ2hhbmdlIiwic3Ryb2tlV2lkdGhSYW5nZSIsIm1ldGEiLCJmZWF0dXJlVHlwZXMiLCJwb2x5Z29uIiwic3Ryb2tlZCIsImhlaWdodCIsIndpcmVmcmFtZSIsInJhZGl1c0ZpZWxkIiwiZGF0YXNldHMiLCJ1cGRhdGVMYXllckNvbmZpZyIsImxheWVyVHlwZU9wdGlvbnMiLCJ1cGRhdGVMYXllclR5cGUiLCJkYXRhSWQiLCJmaWVsZFBhaXJzIiwiY29tbW9uQ29uZmlnUHJvcCIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwidXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnIiwicmVuZGVyVGVtcGxhdGUiLCJsYXllckluZm9Nb2RhbCIsIm9wZW5Nb2RhbCIsImhhc0FsbENvbHVtbnMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiaWQiLCJjb2x1bW5zIiwidmFsdWUiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImZ1bmMiLCJTdHlsZWRIb3dUb0J1dHRvbiIsIkhvd1RvQnV0dG9uIiwib25DbGljayIsIkxheWVyQ29sb3JTZWxlY3RvciIsImxhYmVsIiwic2VsZWN0ZWRDb2xvciIsInByb3BlcnR5Iiwic2V0Q29sb3IiLCJyZ2JWYWx1ZSIsIkFyY0xheWVyQ29sb3JTZWxlY3RvciIsIm9uQ2hhbmdlQ29uZmlnIiwib25DaGFuZ2VWaXNDb25maWciLCJ0YXJnZXRDb2xvciIsIkNvbG9yUmFuZ2VDb25maWciLCJpc1JhbmdlIiwiY29sb3JSYW5nZSIsIkNoYW5uZWxCeVZhbHVlU2VsZWN0b3IiLCJjaGFubmVsIiwiZGVzY3JpcHRpb24iLCJjaGFubmVsU2NhbGVUeXBlIiwiZG9tYWluIiwiZmllbGQiLCJrZXkiLCJyYW5nZSIsInNjYWxlIiwiZGVmYXVsdE1lYXN1cmUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMiLCJDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFMiLCJzdXBwb3J0ZWRGaWVsZHMiLCJmaWx0ZXIiLCJpbmNsdWRlcyIsInNjYWxlT3B0aW9ucyIsImdldFNjYWxlT3B0aW9ucyIsInNob3dTY2FsZSIsImlzQWdncmVnYXRlZCIsImRlZmF1bHREZXNjcmlwdGlvbiIsInZhbCIsIkFnZ3JDb2xvclNjYWxlU2VsZWN0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJjb2xvclNjYWxlIiwiQWdncmVnYXRpb25UeXBlU2VsZWN0b3IiLCJhZ2dyZWdhdGlvbiIsInNlbGVjdGVkRmllbGQiLCJhZ2dyZWdhdGlvbk9wdGlvbnMiLCJnZXRBZ2dyZWdhdGlvbk9wdGlvbnMiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFLQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxJQUFNQSx1QkFBdUIsR0FBR0MsNkJBQU9DLEdBQVAsQ0FBV0MsS0FBWCxDQUFpQjtBQUMvQ0MsRUFBQUEsU0FBUyxFQUFFO0FBRG9DLENBQWpCLENBQUgsbUJBQTdCOztBQU9BLElBQU1DLDZCQUE2QixHQUFHSiw2QkFBT0MsR0FBUCxDQUFXQyxLQUFYLENBQWlCO0FBQ3JEQyxFQUFBQSxTQUFTLEVBQUU7QUFEMEMsQ0FBakIsQ0FBSCxvQkFBbkM7O0lBTXFCRSxpQjs7Ozs7Ozs7Ozs7OzRDQVlLQyxLLEVBQU87QUFDN0IsYUFBTyxLQUFLQyw2QkFBTCxDQUFtQ0QsS0FBbkMsQ0FBUDtBQUNEOzs7MkNBRXNCQSxLLEVBQU87QUFDNUIsYUFBTyxLQUFLQyw2QkFBTCxDQUFtQ0QsS0FBbkMsQ0FBUDtBQUNEOzs7d0RBT0U7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SCxLQUE4QixVQUE5QkEsS0FBOEI7QUFBQSxNQUF2Qm9HLE9BQXVCLFVBQXZCQSxPQUF1QjtBQUFBLE1BQWRwRCxVQUFjLFVBQWRBLFFBQWM7QUFBQSxNQUM5RHdELEtBRDhELEdBQ25DSixPQURtQyxDQUM5REksS0FEOEQ7QUFBQSxNQUN2RHNCLFdBRHVELEdBQ25DMUIsT0FEbUMsQ0FDdkQwQixXQUR1RDtBQUFBLE1BQzFDckIsR0FEMEMsR0FDbkNMLE9BRG1DLENBQzFDSyxHQUQwQztBQUVyRSxNQUFNc0IsYUFBYSxHQUFHL0gsS0FBSyxDQUFDTSxNQUFOLENBQWFrRyxLQUFiLENBQXRCO0FBRnFFLE1BRzlEdkYsU0FIOEQsR0FHakRqQixLQUFLLENBQUNNLE1BSDJDLENBRzlEVyxTQUg4RCxFQUtyRTs7QUFDQSxNQUFNK0csa0JBQWtCLEdBQUdoSSxLQUFLLENBQUNpSSxxQkFBTixDQUE0QnhCLEdBQTVCLENBQTNCO0FBRUEsU0FDRSxnQ0FBQyxtQ0FBRCxRQUNFLGdDQUFDLDZCQUFELDRCQUEwQnNCLGFBQWEsQ0FBQ0csSUFBeEMsU0FERixFQUVFLGdDQUFDLHdCQUFEO0FBQ0UsSUFBQSxhQUFhLEVBQUVqSCxTQUFTLENBQUM2RyxXQUFELENBRDFCO0FBRUUsSUFBQSxPQUFPLEVBQUVFLGtCQUZYO0FBR0UsSUFBQSxXQUFXLEVBQUUsS0FIZjtBQUlFLElBQUEsVUFBVSxFQUFFLEtBSmQ7QUFLRSxJQUFBLFFBQVEsRUFBRSxrQkFBQXJELEtBQUs7QUFBQSxhQUNiM0IsVUFBUSxDQUNOO0FBQ0UvQixRQUFBQSxTQUFTLHFDQUNKakIsS0FBSyxDQUFDTSxNQUFOLENBQWFXLFNBRFQsdUNBRU42RyxXQUZNLEVBRVFuRCxLQUZSO0FBRFgsT0FETSxFQU9OeUIsT0FBTyxDQUFDSyxHQVBGLENBREs7QUFBQTtBQUxqQixJQUZGLENBREY7QUFzQkQsQ0E5Qk07QUErQlAiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgQnV0dG9uLFxuICBQYW5lbExhYmVsLFxuICBTaWRlUGFuZWxTZWN0aW9uXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcblxuaW1wb3J0IFZpc0NvbmZpZ0J5RmllbGRTZWxlY3RvciBmcm9tICcuL3Zpcy1jb25maWctYnktZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IExheWVyQ29sdW1uQ29uZmlnIGZyb20gJy4vbGF5ZXItY29sdW1uLWNvbmZpZyc7XG5pbXBvcnQgTGF5ZXJUeXBlU2VsZWN0b3IgZnJvbSAnLi9sYXllci10eXBlLXNlbGVjdG9yJztcbmltcG9ydCBEaW1lbnNpb25TY2FsZVNlbGVjdG9yIGZyb20gJy4vZGltZW5zaW9uLXNjYWxlLXNlbGVjdG9yJztcbmltcG9ydCBDb2xvclNlbGVjdG9yIGZyb20gJy4vY29sb3Itc2VsZWN0b3InO1xuaW1wb3J0IFNvdXJjZURhdGFTZWxlY3RvciBmcm9tICdjb21wb25lbnRzL3NpZGUtcGFuZWwvc291cmNlLWRhdGEtc2VsZWN0b3InO1xuaW1wb3J0IFZpc0NvbmZpZ1N3aXRjaCBmcm9tICcuL3Zpcy1jb25maWctc3dpdGNoJztcbmltcG9ydCBWaXNDb25maWdTbGlkZXIgZnJvbSAnLi92aXMtY29uZmlnLXNsaWRlcic7XG5pbXBvcnQgTGF5ZXJDb25maWdHcm91cCwge1xuICBDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudFxufSBmcm9tICcuL2xheWVyLWNvbmZpZy1ncm91cCc7XG5pbXBvcnQgVGV4dExhYmVsUGFuZWwgZnJvbSAnLi90ZXh0LWxhYmVsLXBhbmVsJztcblxuaW1wb3J0IHtMQVlFUl9WSVNfQ09ORklHU30gZnJvbSAnbGF5ZXJzL2xheWVyLWZhY3RvcnknO1xuXG5pbXBvcnQge2NhcGl0YWxpemVGaXJzdExldHRlcn0gZnJvbSAndXRpbHMvdXRpbHMnO1xuXG5pbXBvcnQge1xuICBMQVlFUl9UWVBFUyxcbiAgQ0hBTk5FTF9TQ0FMRV9TVVBQT1JURURfRklFTERTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU3R5bGVkTGF5ZXJDb25maWd1cmF0b3IgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnbGF5ZXItcGFuZWxfX2NvbmZpZydcbn0pYFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1hcmdpbi10b3A6IDEycHg7XG5gO1xuXG5jb25zdCBTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvciA9IHN0eWxlZC5kaXYuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdsYXllci1wYW5lbF9fY29uZmlnX192aXN1YWxDLWNvbmZpZydcbn0pYFxuICBtYXJnaW4tdG9wOiAxMnB4O1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGF5ZXJDb25maWd1cmF0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGxheWVyOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICBsYXllclR5cGVPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KS5pc1JlcXVpcmVkLFxuICAgIG9wZW5Nb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGVMYXllckNvbmZpZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICB1cGRhdGVMYXllclR5cGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlTGF5ZXJWaXNDb25maWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gIH07XG5cbiAgX3JlbmRlclBvaW50TGF5ZXJDb25maWcocHJvcHMpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyU2NhdHRlcnBsb3RMYXllckNvbmZpZyhwcm9wcyk7XG4gIH1cblxuICBfcmVuZGVySWNvbkxheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXJDb25maWcocHJvcHMpO1xuICB9XG5cbiAgX3JlbmRlclNjYXR0ZXJwbG90TGF5ZXJDb25maWcoe1xuICAgIGxheWVyLFxuICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzLFxuICAgIGxheWVyQ29uZmlndXJhdG9yUHJvcHNcbiAgfSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBGaWxsIENvbG9yICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5maWxsZWR9XG4gICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIGNvbGxhcHNpYmxlXG4gICAgICAgID5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxMYXllckNvbG9yU2VsZWN0b3Igey4uLmxheWVyQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLm9wYWNpdHl9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBvdXRsaW5lIGNvbG9yICovfVxuICAgICAgICB7bGF5ZXIudHlwZSA9PT0gTEFZRVJfVFlQRVMucG9pbnQgPyAoXG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXBcbiAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vdXRsaW5lfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGF5ZXIuY29uZmlnLnN0cm9rZUNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnXG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIHByb3BlcnR5PVwic3Ryb2tlQ29sb3JSYW5nZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yXG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I9e2xheWVyLmNvbmZpZy52aXNDb25maWcuc3Ryb2tlQ29sb3J9XG4gICAgICAgICAgICAgICAgcHJvcGVydHk9XCJzdHJva2VDb2xvclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnN0cm9rZUNvbG9yfVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy50aGlja25lc3N9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyLmNvbmZpZy52aXNDb25maWcub3V0bGluZX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7LyogUmFkaXVzICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J3JhZGl1cyd9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgIHshbGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnJhZGl1c31cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKGxheWVyLmNvbmZpZy5zaXplRmllbGQpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MucmFkaXVzUmFuZ2V9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17XG4gICAgICAgICAgICAgICAgIWxheWVyLmNvbmZpZy5zaXplRmllbGQgfHwgbGF5ZXIuY29uZmlnLnZpc0NvbmZpZy5maXhlZFJhZGl1c1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU3dpdGNoXG4gICAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmZpeGVkUmFkaXVzfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogdGV4dCBsYWJlbCAqL31cbiAgICAgICAgPFRleHRMYWJlbFBhbmVsXG4gICAgICAgICAgZmllbGRzPXt2aXNDb25maWd1cmF0b3JQcm9wcy5maWVsZHN9XG4gICAgICAgICAgdXBkYXRlTGF5ZXJUZXh0TGFiZWw9e3RoaXMucHJvcHMudXBkYXRlTGF5ZXJUZXh0TGFiZWx9XG4gICAgICAgICAgdGV4dExhYmVsPXtsYXllci5jb25maWcudGV4dExhYmVsfVxuICAgICAgICAvPlxuICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICApO1xuICB9XG5cbiAgX3JlbmRlckNsdXN0ZXJMYXllckNvbmZpZyh7XG4gICAgbGF5ZXIsXG4gICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNoYW5uZWxDb25maWdQcm9wc1xuICB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvbG9yJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgPENvbG9yUmFuZ2VDb25maWcgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxBZ2dyQ29sb3JTY2FsZVNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB7bGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY29sb3JBZ2dyZWdhdGlvbi5jb25kaXRpb24oXG4gICAgICAgICAgICAgIGxheWVyLmNvbmZpZ1xuICAgICAgICAgICAgKSA/IChcbiAgICAgICAgICAgICAgPEFnZ3JlZ2F0aW9uVHlwZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb259XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5vcGFjaXR5fVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogQ2x1c3RlciBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNsdXN0ZXJSYWRpdXN9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5yYWRpdXNSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVySGVhdG1hcExheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3Mub3BhY2l0eX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnJhZGl1c31cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgIHsvKiBXZWlnaHQgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnd2VpZ2h0J30+XG4gICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLndlaWdodH1cbiAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyR3JpZExheWVyQ29uZmlnKHByb3BzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckFnZ3JlZ2F0aW9uTGF5ZXJDb25maWcocHJvcHMpO1xuICB9XG5cbiAgX3JlbmRlckhleGFnb25MYXllckNvbmZpZyhwcm9wcykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHByb3BzKTtcbiAgfVxuXG4gIF9yZW5kZXJBZ2dyZWdhdGlvbkxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICBjb25zdCB7Y29uZmlnfSA9IGxheWVyO1xuICAgIGNvbnN0IHtcbiAgICAgIHZpc0NvbmZpZzoge2VuYWJsZTNkfVxuICAgIH0gPSBjb25maWc7XG4gICAgY29uc3QgZWxldmF0aW9uQnlEZXNjcmlwdGlvbiA9XG4gICAgICAnV2hlbiBvZmYsIGhlaWdodCBpcyBiYXNlZCBvbiBjb3VudCBvZiBwb2ludHMnO1xuICAgIGNvbnN0IGNvbG9yQnlEZXNjcmlwdGlvbiA9ICdXaGVuIG9mZiwgY29sb3IgaXMgYmFzZWQgb24gY291bnQgb2YgcG9pbnRzJztcblxuICAgIHJldHVybiAoXG4gICAgICA8U3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgICAgIHsvKiBDb2xvciAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydjb2xvcid9IGNvbGxhcHNpYmxlPlxuICAgICAgICAgIDxDb2xvclJhbmdlQ29uZmlnIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8QWdnckNvbG9yU2NhbGVTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmNvbG9yQWdncmVnYXRpb24uY29uZGl0aW9uKFxuICAgICAgICAgICAgICBsYXllci5jb25maWdcbiAgICAgICAgICAgICkgPyAoXG4gICAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb2xvckFnZ3JlZ2F0aW9ufVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICBkZXNjcmVpcHRpb249e2NvbG9yQnlEZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5jb2xvcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnBlcmNlbnRpbGUgJiZcbiAgICAgICAgICAgIGxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnBlcmNlbnRpbGUuY29uZGl0aW9uKGxheWVyLmNvbmZpZykgPyAoXG4gICAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MucGVyY2VudGlsZX1cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLm9wYWNpdHl9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBDZWxsIHNpemUgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsncmFkaXVzJ30gY29sbGFwc2libGU+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLndvcmxkVW5pdFNpemV9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5sYXllci52aXNDb25maWdTZXR0aW5ncy5jb3ZlcmFnZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIEVsZXZhdGlvbiAqL31cbiAgICAgICAge2xheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVuYWJsZTNkID8gKFxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZW5hYmxlM2R9XG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICBjaGFubmVsPXtsYXllci52aXN1YWxDaGFubmVscy5zaXplfVxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtlbGV2YXRpb25CeURlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXshZW5hYmxlM2R9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5zaXplQWdncmVnYXRpb24uY29uZGl0aW9uKFxuICAgICAgICAgICAgICAgIGxheWVyLmNvbmZpZ1xuICAgICAgICAgICAgICApID8gKFxuICAgICAgICAgICAgICAgIDxBZ2dyZWdhdGlvblR5cGVTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnNpemVBZ2dyZWdhdGlvbn1cbiAgICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIHtsYXllci52aXNDb25maWdTZXR0aW5ncy5lbGV2YXRpb25QZXJjZW50aWxlLmNvbmRpdGlvbihcbiAgICAgICAgICAgICAgICBsYXllci5jb25maWdcbiAgICAgICAgICAgICAgKSA/IChcbiAgICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuZWxldmF0aW9uUGVyY2VudGlsZX1cbiAgICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvU3R5bGVkTGF5ZXJWaXN1YWxDb25maWd1cmF0b3I+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFRPRE86IFNoYW4gbW92ZSB0aGVzZSBpbnRvIGxheWVyIGNsYXNzXG4gIF9yZW5kZXJIZXhhZ29uSWRMYXllckNvbmZpZyh7XG4gICAgbGF5ZXIsXG4gICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNoYW5uZWxDb25maWdQcm9wc1xuICB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxTdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICAgICAgey8qIENvbG9yICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cCBsYWJlbD17J2NvbG9yJ30gY29sbGFwc2libGU+XG4gICAgICAgICAge2xheWVyLmNvbmZpZy5jb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgPENvbG9yUmFuZ2VDb25maWcgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8TGF5ZXJDb2xvclNlbGVjdG9yIHsuLi5sYXllckNvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy5vcGFjaXR5fVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogQ292ZXJhZ2UgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY292ZXJhZ2UnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICB7IWxheWVyLmNvbmZpZy5jb3ZlcmFnZUZpZWxkID8gKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY292ZXJhZ2V9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4ubGF5ZXIudmlzQ29uZmlnU2V0dGluZ3MuY292ZXJhZ2VSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY292ZXJhZ2V9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBoZWlnaHQgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmVuYWJsZTNkfVxuICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICA+XG4gICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmVsZXZhdGlvblJhbmdlfVxuICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgPENoYW5uZWxCeVZhbHVlU2VsZWN0b3JcbiAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZX1cbiAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICBfcmVuZGVyQXJjTGF5ZXJDb25maWcoYXJncykge1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJMaW5lTGF5ZXJDb25maWcoYXJncyk7XG4gIH1cblxuICBfcmVuZGVyTGluZUxheWVyQ29uZmlnKHtcbiAgICBsYXllcixcbiAgICB2aXNDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzLFxuICAgIGxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzXG4gIH0pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogQ29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwIGxhYmVsPXsnY29sb3InfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLmNvbG9yRmllbGQgPyAoXG4gICAgICAgICAgICA8Q29sb3JSYW5nZUNvbmZpZyB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxBcmNMYXllckNvbG9yU2VsZWN0b3JcbiAgICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgICBvbkNoYW5nZUNvbmZpZz17bGF5ZXJDb25maWd1cmF0b3JQcm9wcy5vbkNoYW5nZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2VWaXNDb25maWc9e3Zpc0NvbmZpZ3VyYXRvclByb3BzLm9uQ2hhbmdlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLmNvbG9yfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mub3BhY2l0eX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG5cbiAgICAgICAgey8qIHRoaWNrbmVzcyAqL31cbiAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydzdHJva2UnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICB7bGF5ZXIuY29uZmlnLnNpemVGaWVsZCA/IChcbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnN0cm9rZVdpZHRoUmFuZ2V9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcuc2l6ZUZpZWxkfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgPC9TdHlsZWRMYXllclZpc3VhbENvbmZpZ3VyYXRvcj5cbiAgICApO1xuICB9XG5cbiAgX3JlbmRlckdlb2pzb25MYXllckNvbmZpZyh7XG4gICAgbGF5ZXIsXG4gICAgdmlzQ29uZmlndXJhdG9yUHJvcHMsXG4gICAgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyxcbiAgICBsYXllckNoYW5uZWxDb25maWdQcm9wc1xuICB9KSB7XG4gICAgY29uc3Qge1xuICAgICAgbWV0YToge2ZlYXR1cmVUeXBlcyA9IHt9fSxcbiAgICAgIGNvbmZpZzoge3Zpc0NvbmZpZ31cbiAgICB9ID0gbGF5ZXI7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICAgICB7LyogRmlsbCBDb2xvciAqL31cbiAgICAgICAge2ZlYXR1cmVUeXBlcy5wb2x5Z29uIHx8IGZlYXR1cmVUeXBlcy5wb2ludCA/IChcbiAgICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLmZpbGxlZH1cbiAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgIGxhYmVsPVwiRmlsbCBDb2xvclwiXG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYXllci5jb25maWcuY29sb3JGaWVsZCA/IChcbiAgICAgICAgICAgICAgPENvbG9yUmFuZ2VDb25maWcgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfSAvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvciB7Li4ubGF5ZXJDb25maWd1cmF0b3JQcm9wc30gLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuY29sb3J9XG4gICAgICAgICAgICAgICAgey4uLmxheWVyQ2hhbm5lbENvbmZpZ1Byb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLm9wYWNpdHl9XG4gICAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHsvKiBzdHJva2UgY29sb3IgKi99XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgey4uLmxheWVyLnZpc0NvbmZpZ1NldHRpbmdzLnN0cm9rZWR9XG4gICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgIGxhYmVsPVwiU3Ryb2tlIENvbG9yXCJcbiAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICA+XG4gICAgICAgICAge2xheWVyLmNvbmZpZy5zdHJva2VDb2xvckZpZWxkID8gKFxuICAgICAgICAgICAgPENvbG9yUmFuZ2VDb25maWdcbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBwcm9wZXJ0eT1cInN0cm9rZUNvbG9yUmFuZ2VcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPExheWVyQ29sb3JTZWxlY3RvclxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIHNlbGVjdGVkQ29sb3I9e2xheWVyLmNvbmZpZy52aXNDb25maWcuc3Ryb2tlQ29sb3J9XG4gICAgICAgICAgICAgIHByb3BlcnR5PVwic3Ryb2tlQ29sb3JcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnN0cm9rZUNvbG9yfVxuICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvQ29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cblxuICAgICAgICB7LyogU3Ryb2tlIFdpZHRoICovfVxuICAgICAgICA8TGF5ZXJDb25maWdHcm91cFxuICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICB7Li4uKGZlYXR1cmVUeXBlcy5wb2x5Z29uID8gTEFZRVJfVklTX0NPTkZJR1Muc3Ryb2tlZCA6IHt9KX1cbiAgICAgICAgICBsYWJlbD1cIlN0cm9rZSBXaWR0aFwiXG4gICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgPlxuICAgICAgICAgIHtsYXllci5jb25maWcuc2l6ZUZpZWxkID8gKFxuICAgICAgICAgICAgPFZpc0NvbmZpZ1NsaWRlclxuICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Muc3Ryb2tlV2lkdGhSYW5nZX1cbiAgICAgICAgICAgICAgey4uLnZpc0NvbmZpZ3VyYXRvclByb3BzfVxuICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgIHsuLi5MQVlFUl9WSVNfQ09ORklHUy50aGlja25lc3N9XG4gICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICAgIDxDb25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnNpemV9XG4gICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuXG4gICAgICAgIHsvKiBFbGV2YXRpb24gKi99XG4gICAgICAgIHtmZWF0dXJlVHlwZXMucG9seWdvbiAmJiB2aXNDb25maWcuZmlsbGVkID8gKFxuICAgICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1MuZW5hYmxlM2R9XG4gICAgICAgICAgICBjb2xsYXBzaWJsZVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxWaXNDb25maWdTbGlkZXJcbiAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLmVsZXZhdGlvblNjYWxlfVxuICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgIGxhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICAgIDxDaGFubmVsQnlWYWx1ZVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgY2hhbm5lbD17bGF5ZXIudmlzdWFsQ2hhbm5lbHMuaGVpZ2h0fVxuICAgICAgICAgICAgICAgIHsuLi5sYXllckNoYW5uZWxDb25maWdQcm9wc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPFZpc0NvbmZpZ1N3aXRjaFxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICB7Li4uTEFZRVJfVklTX0NPTkZJR1Mud2lyZWZyYW1lfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgICA8L0xheWVyQ29uZmlnR3JvdXA+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHsvKiBSYWRpdXMgKi99XG4gICAgICAgIHtmZWF0dXJlVHlwZXMucG9pbnQgPyAoXG4gICAgICAgICAgPExheWVyQ29uZmlnR3JvdXAgbGFiZWw9eydyYWRpdXMnfSBjb2xsYXBzaWJsZT5cbiAgICAgICAgICAgIHshbGF5ZXIuY29uZmlnLnJhZGl1c0ZpZWxkID8gKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnJhZGl1c31cbiAgICAgICAgICAgICAgICB7Li4udmlzQ29uZmlndXJhdG9yUHJvcHN9XG4gICAgICAgICAgICAgICAgbGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtCb29sZWFuKGxheWVyLmNvbmZpZy5yYWRpdXNGaWVsZCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8VmlzQ29uZmlnU2xpZGVyXG4gICAgICAgICAgICAgICAgey4uLkxBWUVSX1ZJU19DT05GSUdTLnJhZGl1c1JhbmdlfVxuICAgICAgICAgICAgICAgIHsuLi52aXNDb25maWd1cmF0b3JQcm9wc31cbiAgICAgICAgICAgICAgICBsYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFsYXllci5jb25maWcucmFkaXVzRmllbGR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPENvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgICAgICA8Q2hhbm5lbEJ5VmFsdWVTZWxlY3RvclxuICAgICAgICAgICAgICAgIGNoYW5uZWw9e2xheWVyLnZpc3VhbENoYW5uZWxzLnJhZGl1c31cbiAgICAgICAgICAgICAgICB7Li4ubGF5ZXJDaGFubmVsQ29uZmlnUHJvcHN9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0NvbmZpZ0dyb3VwQ29sbGFwc2libGVDb250ZW50PlxuICAgICAgICAgIDwvTGF5ZXJDb25maWdHcm91cD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L1N0eWxlZExheWVyVmlzdWFsQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgbGF5ZXIsXG4gICAgICBkYXRhc2V0cyxcbiAgICAgIHVwZGF0ZUxheWVyQ29uZmlnLFxuICAgICAgbGF5ZXJUeXBlT3B0aW9ucyxcbiAgICAgIHVwZGF0ZUxheWVyVHlwZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHtmaWVsZHMgPSBbXSwgZmllbGRQYWlyc30gPSBsYXllci5jb25maWcuZGF0YUlkXG4gICAgICA/IGRhdGFzZXRzW2xheWVyLmNvbmZpZy5kYXRhSWRdXG4gICAgICA6IHt9O1xuICAgIGNvbnN0IHtjb25maWd9ID0gbGF5ZXI7XG5cbiAgICBjb25zdCBjb21tb25Db25maWdQcm9wID0ge1xuICAgICAgbGF5ZXIsXG4gICAgICBmaWVsZHNcbiAgICB9O1xuXG4gICAgY29uc3QgdmlzQ29uZmlndXJhdG9yUHJvcHMgPSB7XG4gICAgICAuLi5jb21tb25Db25maWdQcm9wLFxuICAgICAgb25DaGFuZ2U6IHRoaXMucHJvcHMudXBkYXRlTGF5ZXJWaXNDb25maWdcbiAgICB9O1xuXG4gICAgY29uc3QgbGF5ZXJDb25maWd1cmF0b3JQcm9wcyA9IHtcbiAgICAgIC4uLmNvbW1vbkNvbmZpZ1Byb3AsXG4gICAgICBvbkNoYW5nZTogdXBkYXRlTGF5ZXJDb25maWdcbiAgICB9O1xuXG4gICAgY29uc3QgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMgPSB7XG4gICAgICAuLi5jb21tb25Db25maWdQcm9wLFxuICAgICAgb25DaGFuZ2U6IHRoaXMucHJvcHMudXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnXG4gICAgfTtcblxuICAgIGNvbnN0IHJlbmRlclRlbXBsYXRlID1cbiAgICAgIGxheWVyLnR5cGUgJiYgYF9yZW5kZXIke2NhcGl0YWxpemVGaXJzdExldHRlcihsYXllci50eXBlKX1MYXllckNvbmZpZ2A7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFN0eWxlZExheWVyQ29uZmlndXJhdG9yPlxuICAgICAgICB7bGF5ZXIubGF5ZXJJbmZvTW9kYWwgPyAoXG4gICAgICAgICAgPEhvd1RvQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLnByb3BzLm9wZW5Nb2RhbChsYXllci5sYXllckluZm9Nb2RhbCl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxMYXllckNvbmZpZ0dyb3VwXG4gICAgICAgICAgbGFiZWw9eydiYXNpYyd9XG4gICAgICAgICAgY29sbGFwc2libGVcbiAgICAgICAgICBleHBhbmRlZD17IWxheWVyLmhhc0FsbENvbHVtbnMoKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxMYXllclR5cGVTZWxlY3RvclxuICAgICAgICAgICAgbGF5ZXI9e2xheWVyfVxuICAgICAgICAgICAgbGF5ZXJUeXBlT3B0aW9ucz17bGF5ZXJUeXBlT3B0aW9uc31cbiAgICAgICAgICAgIG9uU2VsZWN0PXt1cGRhdGVMYXllclR5cGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Q29uZmlnR3JvdXBDb2xsYXBzaWJsZUNvbnRlbnQ+XG4gICAgICAgICAgICB7T2JqZWN0LmtleXMoZGF0YXNldHMpLmxlbmd0aCA+IDEgJiYgKFxuICAgICAgICAgICAgICA8U291cmNlRGF0YVNlbGVjdG9yXG4gICAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICAgIGlkPXtsYXllci5pZH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGF5ZXIudHlwZSAmJiBjb25maWcuY29sdW1uc31cbiAgICAgICAgICAgICAgICBkYXRhSWQ9e2NvbmZpZy5kYXRhSWR9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Q9e3ZhbHVlID0+IHVwZGF0ZUxheWVyQ29uZmlnKHtkYXRhSWQ6IHZhbHVlfSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPExheWVyQ29sdW1uQ29uZmlnXG4gICAgICAgICAgICAgIGxheWVyPXtsYXllcn1cbiAgICAgICAgICAgICAgZmllbGRzPXtmaWVsZHN9XG4gICAgICAgICAgICAgIGZpZWxkUGFpcnM9e2ZpZWxkUGFpcnN9XG4gICAgICAgICAgICAgIHVwZGF0ZUxheWVyQ29uZmlnPXt1cGRhdGVMYXllckNvbmZpZ31cbiAgICAgICAgICAgICAgdXBkYXRlTGF5ZXJUeXBlPXt0aGlzLnByb3BzLnVwZGF0ZUxheWVyVHlwZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9Db25maWdHcm91cENvbGxhcHNpYmxlQ29udGVudD5cbiAgICAgICAgPC9MYXllckNvbmZpZ0dyb3VwPlxuICAgICAgICB7dGhpc1tyZW5kZXJUZW1wbGF0ZV0gJiZcbiAgICAgICAgICB0aGlzW3JlbmRlclRlbXBsYXRlXSh7XG4gICAgICAgICAgICBsYXllcixcbiAgICAgICAgICAgIHZpc0NvbmZpZ3VyYXRvclByb3BzLFxuICAgICAgICAgICAgbGF5ZXJDaGFubmVsQ29uZmlnUHJvcHMsXG4gICAgICAgICAgICBsYXllckNvbmZpZ3VyYXRvclByb3BzXG4gICAgICAgICAgfSl9XG4gICAgICA8L1N0eWxlZExheWVyQ29uZmlndXJhdG9yPlxuICAgICk7XG4gIH1cbn1cblxuLypcbiAqIENvbXBvbmVudGl6ZSBjb25maWcgY29tcG9uZW50IGludG8gcHVyZSBmdW5jdGlvbmFsIGNvbXBvbmVudHNcbiAqL1xuXG5jb25zdCBTdHlsZWRIb3dUb0J1dHRvbiA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDEycHg7XG4gIHRvcDogLTRweDtcbmA7XG5cbmV4cG9ydCBjb25zdCBIb3dUb0J1dHRvbiA9ICh7b25DbGlja30pID0+IChcbiAgPFN0eWxlZEhvd1RvQnV0dG9uPlxuICAgIDxCdXR0b24gbGluayBzbWFsbCBvbkNsaWNrPXtvbkNsaWNrfT5cbiAgICAgIEhvdyB0b1xuICAgIDwvQnV0dG9uPlxuICA8L1N0eWxlZEhvd1RvQnV0dG9uPlxuKTtcblxuZXhwb3J0IGNvbnN0IExheWVyQ29sb3JTZWxlY3RvciA9ICh7XG4gIGxheWVyLFxuICBvbkNoYW5nZSxcbiAgbGFiZWwsXG4gIHNlbGVjdGVkQ29sb3IsXG4gIHByb3BlcnR5ID0gJ2NvbG9yJ1xufSkgPT4gKFxuICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBzZWxlY3RlZENvbG9yIHx8IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2Uoe1twcm9wZXJ0eV06IHJnYlZhbHVlfSlcbiAgICAgICAgfVxuICAgICAgXX1cbiAgICAvPlxuICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4pO1xuXG5leHBvcnQgY29uc3QgQXJjTGF5ZXJDb2xvclNlbGVjdG9yID0gKHtcbiAgbGF5ZXIsXG4gIG9uQ2hhbmdlQ29uZmlnLFxuICBvbkNoYW5nZVZpc0NvbmZpZ1xufSkgPT4gKFxuICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBsYXllci5jb25maWcuY29sb3IsXG4gICAgICAgICAgc2V0Q29sb3I6IHJnYlZhbHVlID0+IG9uQ2hhbmdlQ29uZmlnKHtjb2xvcjogcmdiVmFsdWV9KSxcbiAgICAgICAgICBsYWJlbDogJ1NvdXJjZSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNlbGVjdGVkQ29sb3I6XG4gICAgICAgICAgICBsYXllci5jb25maWcudmlzQ29uZmlnLnRhcmdldENvbG9yIHx8IGxheWVyLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICBzZXRDb2xvcjogcmdiVmFsdWUgPT4gb25DaGFuZ2VWaXNDb25maWcoe3RhcmdldENvbG9yOiByZ2JWYWx1ZX0pLFxuICAgICAgICAgIGxhYmVsOiAnVGFyZ2V0J1xuICAgICAgICB9XG4gICAgICBdfVxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBjb25zdCBDb2xvclJhbmdlQ29uZmlnID0gKHtcbiAgbGF5ZXIsXG4gIG9uQ2hhbmdlLFxuICBwcm9wZXJ0eSA9ICdjb2xvclJhbmdlJ1xufSkgPT4gKFxuICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICA8Q29sb3JTZWxlY3RvclxuICAgICAgY29sb3JTZXRzPXtbXG4gICAgICAgIHtcbiAgICAgICAgICBzZWxlY3RlZENvbG9yOiBsYXllci5jb25maWcudmlzQ29uZmlnW3Byb3BlcnR5XSxcbiAgICAgICAgICBpc1JhbmdlOiB0cnVlLFxuICAgICAgICAgIHNldENvbG9yOiBjb2xvclJhbmdlID0+IG9uQ2hhbmdlKHtbcHJvcGVydHldOiBjb2xvclJhbmdlfSlcbiAgICAgICAgfVxuICAgICAgXX1cbiAgICAvPlxuICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4pO1xuXG5leHBvcnQgY29uc3QgQ2hhbm5lbEJ5VmFsdWVTZWxlY3RvciA9ICh7XG4gIGxheWVyLFxuICBjaGFubmVsLFxuICBvbkNoYW5nZSxcbiAgZmllbGRzLFxuICBkZXNjcmlwdGlvblxufSkgPT4ge1xuICBjb25zdCB7XG4gICAgY2hhbm5lbFNjYWxlVHlwZSxcbiAgICBkb21haW4sXG4gICAgZmllbGQsXG4gICAga2V5LFxuICAgIHByb3BlcnR5LFxuICAgIHJhbmdlLFxuICAgIHNjYWxlLFxuICAgIGRlZmF1bHRNZWFzdXJlLFxuICAgIHN1cHBvcnRlZEZpZWxkVHlwZXNcbiAgfSA9IGNoYW5uZWw7XG4gIGNvbnN0IGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzID1cbiAgICBzdXBwb3J0ZWRGaWVsZFR5cGVzIHx8IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1tjaGFubmVsU2NhbGVUeXBlXTtcbiAgY29uc3Qgc3VwcG9ydGVkRmllbGRzID0gZmllbGRzLmZpbHRlcigoe3R5cGV9KSA9PlxuICAgIGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzLmluY2x1ZGVzKHR5cGUpXG4gICk7XG4gIGNvbnN0IHNjYWxlT3B0aW9ucyA9IGxheWVyLmdldFNjYWxlT3B0aW9ucyhjaGFubmVsLmtleSk7XG4gIGNvbnN0IHNob3dTY2FsZSA9XG4gICAgIWxheWVyLmlzQWdncmVnYXRlZCAmJiBsYXllci5jb25maWdbc2NhbGVdICYmIHNjYWxlT3B0aW9ucy5sZW5ndGggPiAxO1xuICBjb25zdCBkZWZhdWx0RGVzY3JpcHRpb24gPSBgQ2FsY3VsYXRlICR7cHJvcGVydHl9IGJhc2VkIG9uIHNlbGVjdGVkIGZpZWxkYDtcblxuICByZXR1cm4gKFxuICAgIDxWaXNDb25maWdCeUZpZWxkU2VsZWN0b3JcbiAgICAgIGNoYW5uZWw9e2NoYW5uZWwua2V5fVxuICAgICAgZGVzY3JpcHRpb249e2Rlc2NyaXB0aW9uIHx8IGRlZmF1bHREZXNjcmlwdGlvbn1cbiAgICAgIGRvbWFpbj17bGF5ZXIuY29uZmlnW2RvbWFpbl19XG4gICAgICBmaWVsZHM9e3N1cHBvcnRlZEZpZWxkc31cbiAgICAgIGlkPXtsYXllci5pZH1cbiAgICAgIGtleT17YCR7a2V5fS1jaGFubmVsLXNlbGVjdG9yYH1cbiAgICAgIHByb3BlcnR5PXtwcm9wZXJ0eX1cbiAgICAgIHBsYWNlaG9sZGVyPXtkZWZhdWx0TWVhc3VyZSB8fCAnU2VsZWN0IGEgZmllbGQnfVxuICAgICAgcmFuZ2U9e2xheWVyLmNvbmZpZy52aXNDb25maWdbcmFuZ2VdfVxuICAgICAgc2NhbGVPcHRpb25zPXtzY2FsZU9wdGlvbnN9XG4gICAgICBzY2FsZVR5cGU9e3NjYWxlID8gbGF5ZXIuY29uZmlnW3NjYWxlXSA6IG51bGx9XG4gICAgICBzZWxlY3RlZEZpZWxkPXtsYXllci5jb25maWdbZmllbGRdfVxuICAgICAgc2hvd1NjYWxlPXtzaG93U2NhbGV9XG4gICAgICB1cGRhdGVGaWVsZD17dmFsID0+IG9uQ2hhbmdlKHtbZmllbGRdOiB2YWx9LCBrZXkpfVxuICAgICAgdXBkYXRlU2NhbGU9e3ZhbCA9PiBvbkNoYW5nZSh7W3NjYWxlXTogdmFsfSwga2V5KX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEFnZ3JDb2xvclNjYWxlU2VsZWN0b3IgPSAoe2xheWVyLCBvbkNoYW5nZX0pID0+IHtcbiAgY29uc3Qgc2NhbGVPcHRpb25zID0gbGF5ZXIuZ2V0U2NhbGVPcHRpb25zKCdjb2xvcicpO1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShzY2FsZU9wdGlvbnMpICYmIHNjYWxlT3B0aW9ucy5sZW5ndGggPiAxID8gKFxuICAgIDxEaW1lbnNpb25TY2FsZVNlbGVjdG9yXG4gICAgICBsYWJlbD1cIkNvbG9yIFNjYWxlXCJcbiAgICAgIG9wdGlvbnM9e3NjYWxlT3B0aW9uc31cbiAgICAgIHNjYWxlVHlwZT17bGF5ZXIuY29uZmlnLmNvbG9yU2NhbGV9XG4gICAgICBvblNlbGVjdD17dmFsID0+IG9uQ2hhbmdlKHtjb2xvclNjYWxlOiB2YWx9LCAnY29sb3InKX1cbiAgICAvPlxuICApIDogbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBBZ2dyZWdhdGlvblR5cGVTZWxlY3RvciA9ICh7bGF5ZXIsIGNoYW5uZWwsIG9uQ2hhbmdlfSkgPT4ge1xuICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBrZXl9ID0gY2hhbm5lbDtcbiAgY29uc3Qgc2VsZWN0ZWRGaWVsZCA9IGxheWVyLmNvbmZpZ1tmaWVsZF07XG4gIGNvbnN0IHt2aXNDb25maWd9ID0gbGF5ZXIuY29uZmlnO1xuXG4gIC8vIGFnZ3JlZ2F0aW9uIHNob3VsZCBvbmx5IGJlIHNlbGVjdGFibGUgd2hlbiBmaWVsZCBpcyBzZWxlY3RlZFxuICBjb25zdCBhZ2dyZWdhdGlvbk9wdGlvbnMgPSBsYXllci5nZXRBZ2dyZWdhdGlvbk9wdGlvbnMoa2V5KTtcblxuICByZXR1cm4gKFxuICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgPFBhbmVsTGFiZWw+e2BBZ2dyZWdhdGUgJHtzZWxlY3RlZEZpZWxkLm5hbWV9IGJ5YH08L1BhbmVsTGFiZWw+XG4gICAgICA8SXRlbVNlbGVjdG9yXG4gICAgICAgIHNlbGVjdGVkSXRlbXM9e3Zpc0NvbmZpZ1thZ2dyZWdhdGlvbl19XG4gICAgICAgIG9wdGlvbnM9e2FnZ3JlZ2F0aW9uT3B0aW9uc31cbiAgICAgICAgbXVsdGlTZWxlY3Q9e2ZhbHNlfVxuICAgICAgICBzZWFyY2hhYmxlPXtmYWxzZX1cbiAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+XG4gICAgICAgICAgb25DaGFuZ2UoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHZpc0NvbmZpZzoge1xuICAgICAgICAgICAgICAgIC4uLmxheWVyLmNvbmZpZy52aXNDb25maWcsXG4gICAgICAgICAgICAgICAgW2FnZ3JlZ2F0aW9uXTogdmFsdWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoYW5uZWwua2V5XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAvPlxuICAgIDwvU2lkZVBhbmVsU2VjdGlvbj5cbiAgKTtcbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1wYXJhbXMgKi9cbiJdfQ==