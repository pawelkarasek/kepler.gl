"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.colorMaker = exports.layerColors = exports.OVERLAY_TYPE = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread6 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _colorUtils = require("../utils/color-utils");

var _window = require("global/window");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _defaultLayerIcon = _interopRequireDefault(require("./default-layer-icon"));

var _defaultSettings = require("../constants/default-settings");

var _customColorRanges = require("../constants/custom-color-ranges");

var _layerFactory = require("./layer-factory");

var _utils = require("../utils/utils");

var _dataUtils = require("../utils/data-utils");

var _dataScaleUtils = require("../utils/data-scale-utils");

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(generateColor);

/**
 * Approx. number of points to sample in a large data set
 * @type {number}
 */
var MAX_SAMPLE_SIZE = 5000;
var OVERLAY_TYPE = (0, _keymirror["default"])({
  deckgl: null,
  mapboxgl: null
});
exports.OVERLAY_TYPE = OVERLAY_TYPE;
var layerColors = Object.values(_customColorRanges.DataVizColors).map(_colorUtils.hexToRgb);
exports.layerColors = layerColors;

function generateColor() {
  var index;
  return _regenerator["default"].wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < layerColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === layerColors.length) {
            index = 0;
          }

          _context.next = 5;
          return layerColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var colorMaker = generateColor();
exports.colorMaker = colorMaker;

var defaultGetFieldValue = function defaultGetFieldValue(field, d) {
  return d[field.tableFieldIndex - 1];
};

var Layer =
/*#__PURE__*/
function () {
  function Layer() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, Layer);
    this.id = props.id || (0, _utils.generateHashId)(6); // meta

    this.meta = {}; // visConfigSettings

    this.visConfigSettings = {};
    this.config = this.getDefaultLayerConfig((0, _objectSpread6["default"])({
      columns: this.getLayerColumns()
    }, props));
  }

  (0, _createClass2["default"])(Layer, [{
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return {
        dataId: props.dataId || null,
        label: props.label || 'new layer',
        color: props.color || colorMaker.next().value,
        columns: props.columns || null,
        isVisible: props.isVisible || false,
        isConfigActive: props.isConfigActive || false,
        highlightColor: props.highlightColor || [252, 242, 26, 255],
        // TODO: refactor this into separate visual Channel config
        // color by field, domain is set by filters, field, scale type
        colorField: null,
        colorDomain: [0, 1],
        colorScale: 'quantile',
        // color by size, domain is set by filters, field, scale type
        sizeDomain: [0, 1],
        sizeScale: 'linear',
        sizeField: null,
        visConfig: {},
        textLabel: [_layerFactory.DEFAULT_TEXT_LABEL]
      };
    }
    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */

  }, {
    key: "getVisualChannelDescription",
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Vehicle Type
      return {
        label: this.visConfigSettings[this.visualChannels[key].range].label,
        measure: this.config[this.visualChannels[key].field] ? this.config[this.visualChannels[key].field].name : this.visualChannels[key].defaultMeasure
      };
    }
    /**
     * Assign a field to layer column, return column config
     * @param key - Column Key
     * @param field - Selected field
     * @returns {{}} - Column config
     */

  }, {
    key: "assignColumn",
    value: function assignColumn(key, field) {
      // field value could be null for optional columns
      var update = field ? {
        value: field.name,
        fieldIdx: field.tableFieldIndex - 1
      } : {
        value: null,
        fieldIdx: -1
      };
      return (0, _objectSpread6["default"])({}, this.config.columns, (0, _defineProperty2["default"])({}, key, (0, _objectSpread6["default"])({}, this.config.columns[key], update)));
    }
    /**
     * Assign a field pair to column config, return column config
     * @param key - Column Key
     * @param pair - field Pair
     * @returns {{}} - Column config
     */

  }, {
    key: "assignColumnPairs",
    value: function assignColumnPairs(key, pair) {
      var _objectSpread3;

      if (!this.columnPairs || !this.columnPairs[key]) {
        // should not end in this state
        return this.config.columns;
      }

      var _this$columnPairs$key = this.columnPairs[key],
          partnerKey = _this$columnPairs$key.pair,
          fieldPairKey = _this$columnPairs$key.fieldPairKey;
      var partnerFieldPairKey = this.columnPairs[partnerKey].fieldPairKey;
      return (0, _objectSpread6["default"])({}, this.config.columns, (_objectSpread3 = {}, (0, _defineProperty2["default"])(_objectSpread3, key, pair[fieldPairKey]), (0, _defineProperty2["default"])(_objectSpread3, partnerKey, pair[partnerFieldPairKey]), _objectSpread3));
    }
    /**
      * Calculate a radius zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: "getZoomFactor",
    value: function getZoomFactor(_ref) {
      var zoom = _ref.zoom,
          _ref$zoomOffset = _ref.zoomOffset,
          zoomOffset = _ref$zoomOffset === void 0 ? 0 : _ref$zoomOffset;
      return Math.pow(2, Math.max(14 - zoom + zoomOffset, 0));
    }
    /**
      * Calculate a elevation zoom multiplier to render points, so they are visible in all zoom level
      * @param mapState
      * @param mapState.zoom - actual zoom
      * @param mapState.zoomOffset - zoomOffset when render in the plot container for export image
      * @returns {number}
      */

  }, {
    key: "getElevationZoomFactor",
    value: function getElevationZoomFactor(_ref2) {
      var zoom = _ref2.zoom,
          _ref2$zoomOffset = _ref2.zoomOffset,
          zoomOffset = _ref2$zoomOffset === void 0 ? 0 : _ref2$zoomOffset;
      return Math.pow(2, Math.max(8 - zoom + zoomOffset, 0));
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(data, allData, filteredIndex) {
      return {};
    }
  }, {
    key: "renderLayer",
    value: function renderLayer() {
      return [];
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object) {
      if (!object) {
        return null;
      } // by default, each entry of layerData should have a data property points
      // to the original item in the allData array
      // each layer can implement its own getHoverData method


      return object.data;
    }
    /**
     * When change layer type, try to copy over layer configs as much as possible
     * @param configToCopy - config to copy over
     * @param visConfigSettings - visConfig settings of config to copy
     */

  }, {
    key: "assignConfigToLayer",
    value: function assignConfigToLayer(configToCopy, visConfigSettings) {
      var _this = this;

      // don't deep merge visualChannel field
      var notToDeepMerge = Object.values(this.visualChannels).map(function (v) {
        return v.field;
      }); // don't deep merge color range, reversed: is not a key by default

      notToDeepMerge.push('colorRange', 'strokeColorRange'); // don't copy over domain

      var notToCopy = Object.values(this.visualChannels).map(function (v) {
        return v.domain;
      }); // if range is for the same property group copy it, otherwise, not to copy

      Object.values(this.visualChannels).forEach(function (v) {
        if (configToCopy.visConfig[v.range] && visConfigSettings[v.range].group !== _this.visConfigSettings[v.range].group) {
          notToCopy.push(v.range);
        }
      }); // don't copy over visualChannel range

      var currentConfig = this.config;
      var copied = this.copyLayerConfig(currentConfig, configToCopy, {
        notToDeepMerge: notToDeepMerge,
        notToCopy: notToCopy
      });
      this.updateLayerConfig(copied); // validate visualChannel field type and scale types

      Object.keys(this.visualChannels).forEach(function (channel) {
        _this.validateVisualChannel(channel);
      });
    }
    /*
     * Recursively copy config over to an empty layer
     * when received saved config, or copy config over from a different layer type
     * make sure to only copy over value to existing keys
     * @param {object} currentConfig - existing config to be override
     * @param {object} configToCopy - new Config to copy over
     * @param {string[]} notToDeepMerge - array of properties to not to be deep copied
     * @param {string[]} notToCopy - array of properties not to copy
     * @returns {object} - copied config
     */

  }, {
    key: "copyLayerConfig",
    value: function copyLayerConfig(currentConfig, configToCopy) {
      var _this2 = this;

      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref3$notToDeepMerge = _ref3.notToDeepMerge,
          notToDeepMerge = _ref3$notToDeepMerge === void 0 ? [] : _ref3$notToDeepMerge,
          _ref3$notToCopy = _ref3.notToCopy,
          notToCopy = _ref3$notToCopy === void 0 ? [] : _ref3$notToCopy;

      var copied = {};
      Object.keys(currentConfig).forEach(function (key) {
        if ((0, _utils.isPlainObject)(currentConfig[key]) && (0, _utils.isPlainObject)(configToCopy[key]) && !notToDeepMerge.includes(key) && !notToCopy.includes(key)) {
          // recursively assign object value
          copied[key] = _this2.copyLayerConfig(currentConfig[key], configToCopy[key], {
            notToDeepMerge: notToDeepMerge,
            notToCopy: notToCopy
          });
        } else if ((0, _utils.notNullorUndefined)(configToCopy[key]) && !notToCopy.includes(key)) {
          // copy
          copied[key] = configToCopy[key];
        } else {
          // keep existing
          copied[key] = currentConfig[key];
        }
      });
      return copied;
    }
  }, {
    key: "registerVisConfig",
    value: function registerVisConfig(layerVisConfigs) {
      var _this3 = this;

      Object.keys(layerVisConfigs).forEach(function (item) {
        if (typeof item === 'string' && _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]]) {
          // if assigned one of default LAYER_CONFIGS
          _this3.config.visConfig[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]].defaultValue;
          _this3.visConfigSettings[item] = _layerFactory.LAYER_VIS_CONFIGS[layerVisConfigs[item]];
        } else if (['type', 'defaultValue'].every(function (p) {
          return layerVisConfigs[item][p];
        })) {
          // if provided customized visConfig, and has type && defaultValue
          // TODO: further check if customized visConfig is valid
          _this3.config.visConfig[item] = layerVisConfigs[item].defaultValue;
          _this3.visConfigSettings[item] = layerVisConfigs[item];
        }
      });
    }
  }, {
    key: "getLayerColumns",
    value: function getLayerColumns() {
      var required = this.requiredLayerColumns.reduce(function (accu, key) {
        return (0, _objectSpread6["default"])({}, accu, (0, _defineProperty2["default"])({}, key, {
          value: null,
          fieldIdx: -1
        }));
      }, {});
      var optional = this.optionalColumns.reduce(function (accu, key) {
        return (0, _objectSpread6["default"])({}, accu, (0, _defineProperty2["default"])({}, key, {
          value: null,
          fieldIdx: -1,
          optional: true
        }));
      }, {});
      return (0, _objectSpread6["default"])({}, required, optional);
    }
  }, {
    key: "updateLayerConfig",
    value: function updateLayerConfig(newConfig) {
      this.config = (0, _objectSpread6["default"])({}, this.config, newConfig);
      return this;
    }
  }, {
    key: "updateLayerVisConfig",
    value: function updateLayerVisConfig(newVisConfig) {
      this.config.visConfig = (0, _objectSpread6["default"])({}, this.config.visConfig, newVisConfig);
      return this;
    }
    /**
     * Check whether layer has all columns
     *
     * @param {object} layer
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasAllColumns",
    value: function hasAllColumns() {
      var columns = this.config.columns;
      return columns && Object.values(columns).every(function (v) {
        return Boolean(v.optional || v.value && v.fieldIdx > -1);
      });
    }
    /**
     * Check whether layer has data
     *
     * @param {object} layer
     * @param {Array | Object} layerData
     * @returns {boolean} yes or no
     */

  }, {
    key: "hasLayerData",
    value: function hasLayerData(layerData) {
      if (!layerData) {
        return false;
      }

      return Boolean(layerData.data && layerData.data.length);
    }
  }, {
    key: "isValidToSave",
    value: function isValidToSave() {
      return this.type && this.hasAllColumns();
    }
  }, {
    key: "shouldRenderLayer",
    value: function shouldRenderLayer(data) {
      return this.type && this.hasAllColumns() && this.config.isVisible && this.hasLayerData(data);
    }
  }, {
    key: "getVisChannelScale",
    value: function getVisChannelScale(scale, domain, range, fixed) {
      return _defaultSettings.SCALE_FUNC[fixed ? 'linear' : scale]().domain(domain).range(fixed ? domain : range);
    }
  }, {
    key: "getPointsBounds",
    value: function getPointsBounds(allData, getPosition) {
      // no need to loop through the entire dataset
      // get a sample of data to calculate bounds
      var sampleData = allData.length > MAX_SAMPLE_SIZE ? (0, _dataUtils.getSampleData)(allData, MAX_SAMPLE_SIZE) : allData;
      var points = sampleData.map(getPosition);
      var latBounds = (0, _dataUtils.getLatLngBounds)(points, 1, [-90, 90]);
      var lngBounds = (0, _dataUtils.getLatLngBounds)(points, 0, [-180, 180]);

      if (!latBounds || !lngBounds) {
        return null;
      }

      return [lngBounds[0], latBounds[0], lngBounds[1], latBounds[1]];
    }
  }, {
    key: "getLightSettingsFromBounds",
    value: function getLightSettingsFromBounds(bounds) {
      return Array.isArray(bounds) && bounds.length >= 4 ? (0, _objectSpread6["default"])({}, _defaultSettings.DEFAULT_LIGHT_SETTINGS, {
        lightsPosition: [].concat((0, _toConsumableArray2["default"])(bounds.slice(0, 2)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[2]], (0, _toConsumableArray2["default"])(bounds.slice(2, 4)), [_defaultSettings.DEFAULT_LIGHT_SETTINGS.lightsPosition[5]])
      }) : _defaultSettings.DEFAULT_LIGHT_SETTINGS;
    }
  }, {
    key: "getEncodedChannelValue",
    value: function getEncodedChannelValue(scale, data, field) {
      var defaultValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _defaultSettings.NO_VALUE_COLOR;
      var getValue = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : defaultGetFieldValue;
      var type = field.type;
      var value = getValue(field, data);
      var attributeValue;

      if (type === _defaultSettings.ALL_FIELD_TYPES.timestamp) {
        // shouldn't need to convert here
        // scale Function should take care of it
        attributeValue = scale(new Date(value));
      } else {
        attributeValue = scale(value);
      }

      if (!attributeValue) {
        attributeValue = defaultValue;
      }

      return attributeValue;
    }
  }, {
    key: "updateMeta",
    value: function updateMeta(meta) {
      this.meta = (0, _objectSpread6["default"])({}, this.meta, meta);
    }
    /**
     * helper function to update one layer domain when state.data changed
     * if state.data change is due ot update filter, newFiler will be passed
     * called by updateAllLayerDomainData
     * @param {Object} dataset
     * @param {Object} newFilter
     * @returns {object} layer
     */

  }, {
    key: "updateLayerDomain",
    value: function updateLayerDomain(dataset, newFilter) {
      var _this4 = this;

      Object.values(this.visualChannels).forEach(function (channel) {
        var scale = channel.scale;
        var scaleType = _this4.config[scale]; // ordinal domain is based on allData, if only filter changed
        // no need to update ordinal domain

        if (!newFilter || scaleType !== _defaultSettings.SCALE_TYPES.ordinal) {
          var domain = channel.domain;

          var updatedDomain = _this4.calculateLayerDomain(dataset, channel);

          _this4.updateLayerConfig((0, _defineProperty2["default"])({}, domain, updatedDomain));
        }
      });
      return this;
    }
    /**
     * Validate visual channel field and scales based on supported field & scale type
     * @param channel
     */

  }, {
    key: "validateVisualChannel",
    value: function validateVisualChannel(channel) {
      this.validateFieldType(channel);
      this.validateScale(channel);
    }
    /**
     * Validate field type based on channelScaleType
     */

  }, {
    key: "validateFieldType",
    value: function validateFieldType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType,
          supportedFieldTypes = visualChannel.supportedFieldTypes;

      if (this.config[field]) {
        // if field is selected, check if field type is supported
        var channelSupportedFieldTypes = supportedFieldTypes || _defaultSettings.CHANNEL_SCALE_SUPPORTED_FIELDS[channelScaleType];

        if (!channelSupportedFieldTypes.includes(this.config[field].type)) {
          // field type is not supported, set it back to null
          // set scale back to default
          this.updateLayerConfig((0, _defineProperty2["default"])({}, field, null));
        }
      }
    }
    /**
     * Validate scale type based on aggregation
     */

  }, {
    key: "validateScale",
    value: function validateScale(channel) {
      var visualChannel = this.visualChannels[channel];
      var scale = visualChannel.scale;

      if (!scale) {
        // visualChannel doesn't have scale
        return;
      }

      var scaleOptions = this.getScaleOptions(channel); // check if current selected scale is
      // supported, if not, change to default

      if (!scaleOptions.includes(this.config[scale])) {
        this.updateLayerConfig((0, _defineProperty2["default"])({}, scale, scaleOptions[0]));
      }
    }
    /**
     * Get scale options based on current field
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: "getScaleOptions",
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          scale = visualChannel.scale,
          channelScaleType = visualChannel.channelScaleType;
      return this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : [this.getDefaultLayerConfig()[scale]];
    }
  }, {
    key: "updateLayerVisualChannel",
    value: function updateLayerVisualChannel(dataset, channel) {
      var visualChannel = this.visualChannels[channel];
      this.validateVisualChannel(channel); // calculate layer channel domain

      var updatedDomain = this.calculateLayerDomain(dataset, visualChannel);
      this.updateLayerConfig((0, _defineProperty2["default"])({}, visualChannel.domain, updatedDomain));
    }
  }, {
    key: "calculateLayerDomain",
    value: function calculateLayerDomain(dataset, visualChannel) {
      var allData = dataset.allData,
          filteredIndexForDomain = dataset.filteredIndexForDomain;
      var defaultDomain = [0, 1];
      var scale = visualChannel.scale;
      var scaleType = this.config[scale];
      var field = this.config[visualChannel.field];

      if (!field) {
        // if colorField or sizeField were set back to null
        return defaultDomain;
      }

      if (!_defaultSettings.SCALE_TYPES[scaleType]) {
        _window.console.error("scale type ".concat(scaleType, " not supported"));

        return defaultDomain;
      } // TODO: refactor to add valueAccessor to field


      var fieldIdx = field.tableFieldIndex - 1;
      var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;

      var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);

      var indexValueAccessor = function indexValueAccessor(i) {
        return valueAccessor(allData[i]);
      };

      var sortFunction = (0, _dataUtils.getSortingFunction)(field.type);

      switch (scaleType) {
        case _defaultSettings.SCALE_TYPES.ordinal:
        case _defaultSettings.SCALE_TYPES.point:
          // do not recalculate ordinal domain based on filtered data
          // don't need to update ordinal domain every time
          return (0, _dataScaleUtils.getOrdinalDomain)(allData, valueAccessor);

        case _defaultSettings.SCALE_TYPES.quantile:
          return (0, _dataScaleUtils.getQuantileDomain)(filteredIndexForDomain, indexValueAccessor, sortFunction);

        case _defaultSettings.SCALE_TYPES.quantize:
        case _defaultSettings.SCALE_TYPES.linear:
        case _defaultSettings.SCALE_TYPES.sqrt:
        default:
          return (0, _dataScaleUtils.getLinearDomain)(filteredIndexForDomain, indexValueAccessor);
      }
    }
  }, {
    key: "isLayerHovered",
    value: function isLayerHovered(objectInfo) {
      return objectInfo && objectInfo.layer && objectInfo.picked && objectInfo.layer.props.id === this.id;
    }
  }, {
    key: "getRadiusScaleByZoom",
    value: function getRadiusScaleByZoom(mapState, fixedRadius) {
      var radiusChannel = Object.values(this.visualChannels).find(function (vc) {
        return vc.property === 'radius';
      });

      if (!radiusChannel) {
        return 1;
      }

      var field = radiusChannel.field;
      var fixed = fixedRadius === undefined ? this.config.visConfig.fixedRadius : fixedRadius;
      var radius = this.config.visConfig.radius;
      return fixed ? 1 : (this.config[field] ? 1 : radius) * this.getZoomFactor(mapState);
    }
  }, {
    key: "shouldCalculateLayerData",
    value: function shouldCalculateLayerData(props) {
      var _this5 = this;

      return props.some(function (p) {
        return !_this5.noneLayerDataAffectingProps.includes(p);
      });
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _defaultLayerIcon["default"];
    }
  }, {
    key: "overlayType",
    get: function get() {
      return OVERLAY_TYPE.deckgl;
    }
  }, {
    key: "type",
    get: function get() {
      return null;
    }
  }, {
    key: "name",
    get: function get() {
      return this.type;
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return [];
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return ['label', 'opacity', 'thickness', 'isVisible'];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: {
          property: 'color',
          field: 'colorField',
          scale: 'colorScale',
          domain: 'colorDomain',
          range: 'colorRange',
          key: 'color',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color
        },
        size: {
          property: 'size',
          field: 'sizeField',
          scale: 'sizeScale',
          domain: 'sizeDomain',
          range: 'sizeRange',
          key: 'size',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size
        }
      };
    }
    /*
     * Column pairs maps layer column to a specific field pairs,
     * By default, it is set to null
     */

  }, {
    key: "columnPairs",
    get: function get() {
      return null;
    }
    /*
     * Default point column pairs, can be used for point based layers: point, icon etc.
     */

  }, {
    key: "defaultPointColumnPairs",
    get: function get() {
      return {
        lat: {
          pair: 'lng',
          fieldPairKey: 'lat'
        },
        lng: {
          pair: 'lat',
          fieldPairKey: 'lng'
        }
      };
    }
    /*
     * Default link column pairs, can be used for link based layers: arc, line etc
     */

  }, {
    key: "defaultLinkColumnPairs",
    get: function get() {
      return {
        lat0: {
          pair: 'lng0',
          fieldPairKey: 'lat'
        },
        lng0: {
          pair: 'lat0',
          fieldPairKey: 'lng'
        },
        lat1: {
          pair: 'lng1',
          fieldPairKey: 'lat'
        },
        lng1: {
          pair: 'lat1',
          fieldPairKey: 'lng'
        }
      };
    }
    /**
     * Return a React component for to render layer instructions in a modal
     * @returns {object} - an object
     * @example
     *  return {
     *    id: 'iconInfo',
     *    template: IconInfoModal,
     *    modalProps: {
     *      title: 'How to draw icons'
     *   };
     * }
     */

  }, {
    key: "layerInfoModal",
    get: function get() {
      return null;
    }
    /*
     * Given a dataset, automatically create layers based on it
     * and return the props
     * By default, no layers will be found
     */

  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(fieldPairs, dataId) {
      return null;
    }
    /**
     * Given a array of preset required column names
     * found field that has the same name to set as layer column
     *
     * @param {object[]} defaultFields
     * @param {object[]} allFields
     * @returns {object[] | null} all possible required layer column pairs
     */

  }, {
    key: "findDefaultColumnField",
    value: function findDefaultColumnField(defaultFields, allFields) {
      // find all matched fields for each required col
      var requiredColumns = Object.keys(defaultFields).reduce(function (prev, key) {
        var requiredFields = allFields.filter(function (f) {
          return f.name === defaultFields[key] || defaultFields[key].includes(f.name);
        });
        prev[key] = requiredFields.length ? requiredFields.map(function (f) {
          return {
            value: f.name,
            fieldIdx: f.tableFieldIndex - 1
          };
        }) : null;
        return prev;
      }, {});

      if (!Object.values(requiredColumns).every(Boolean)) {
        // if any field missing, return null
        return null;
      }

      return this.getAllPossibleColumnParis(requiredColumns);
    }
  }, {
    key: "getAllPossibleColumnParis",
    value: function getAllPossibleColumnParis(requiredColumns) {
      // for multiple matched field for one required column, return multiple
      // combinations, e. g. if column a has 2 matched, column b has 3 matched
      // 6 possible column pairs will be returned
      var allKeys = Object.keys(requiredColumns);
      var pointers = allKeys.map(function (k, i) {
        return i === allKeys.length - 1 ? -1 : 0;
      });
      var countPerKey = allKeys.map(function (k) {
        return requiredColumns[k].length;
      });
      var pairs = [];
      /* eslint-disable no-loop-func */

      while (incrementPointers(pointers, countPerKey, pointers.length - 1)) {
        var newPair = pointers.reduce(function (prev, cuur, i) {
          prev[allKeys[i]] = requiredColumns[allKeys[i]][cuur];
          return prev;
        }, {});
        pairs.push(newPair);
      }
      /* eslint-enable no-loop-func */
      // recursively increment pointers


      function incrementPointers(pts, counts, index) {
        if (index === 0 && pts[0] === counts[0] - 1) {
          // nothing to increment
          return false;
        }

        if (pts[index] + 1 < counts[index]) {
          pts[index] = pts[index] + 1;
          return true;
        }

        pts[index] = 0;
        return incrementPointers(pts, counts, index - 1);
      }

      return pairs;
    }
  }, {
    key: "hexToRgb",
    value: function hexToRgb(c) {
      return (0, _colorUtils.hexToRgb)(c);
    }
  }]);
  return Layer;
}();

exports["default"] = Layer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYmFzZS1sYXllci5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUNvbG9yIiwiTUFYX1NBTVBMRV9TSVpFIiwiT1ZFUkxBWV9UWVBFIiwiZGVja2dsIiwibWFwYm94Z2wiLCJsYXllckNvbG9ycyIsIk9iamVjdCIsInZhbHVlcyIsIkRhdGFWaXpDb2xvcnMiLCJtYXAiLCJoZXhUb1JnYiIsImluZGV4IiwibGVuZ3RoIiwiY29sb3JNYWtlciIsImRlZmF1bHRHZXRGaWVsZFZhbHVlIiwiZmllbGQiLCJkIiwidGFibGVGaWVsZEluZGV4IiwiTGF5ZXIiLCJwcm9wcyIsImlkIiwibWV0YSIsInZpc0NvbmZpZ1NldHRpbmdzIiwiY29uZmlnIiwiZ2V0RGVmYXVsdExheWVyQ29uZmlnIiwiY29sdW1ucyIsImdldExheWVyQ29sdW1ucyIsImRhdGFJZCIsImxhYmVsIiwiY29sb3IiLCJuZXh0IiwidmFsdWUiLCJpc1Zpc2libGUiLCJpc0NvbmZpZ0FjdGl2ZSIsImhpZ2hsaWdodENvbG9yIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3JTY2FsZSIsInNpemVEb21haW4iLCJzaXplU2NhbGUiLCJzaXplRmllbGQiLCJ2aXNDb25maWciLCJ0ZXh0TGFiZWwiLCJERUZBVUxUX1RFWFRfTEFCRUwiLCJrZXkiLCJ2aXN1YWxDaGFubmVscyIsInJhbmdlIiwibWVhc3VyZSIsIm5hbWUiLCJkZWZhdWx0TWVhc3VyZSIsInVwZGF0ZSIsImZpZWxkSWR4IiwicGFpciIsImNvbHVtblBhaXJzIiwicGFydG5lcktleSIsImZpZWxkUGFpcktleSIsInBhcnRuZXJGaWVsZFBhaXJLZXkiLCJ6b29tIiwiem9vbU9mZnNldCIsIk1hdGgiLCJwb3ciLCJtYXgiLCJkYXRhIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvYmplY3QiLCJjb25maWdUb0NvcHkiLCJub3RUb0RlZXBNZXJnZSIsInYiLCJwdXNoIiwibm90VG9Db3B5IiwiZG9tYWluIiwiZm9yRWFjaCIsImdyb3VwIiwiY3VycmVudENvbmZpZyIsImNvcGllZCIsImNvcHlMYXllckNvbmZpZyIsInVwZGF0ZUxheWVyQ29uZmlnIiwia2V5cyIsImNoYW5uZWwiLCJ2YWxpZGF0ZVZpc3VhbENoYW5uZWwiLCJpbmNsdWRlcyIsImxheWVyVmlzQ29uZmlncyIsIml0ZW0iLCJMQVlFUl9WSVNfQ09ORklHUyIsImRlZmF1bHRWYWx1ZSIsImV2ZXJ5IiwicCIsInJlcXVpcmVkIiwicmVxdWlyZWRMYXllckNvbHVtbnMiLCJyZWR1Y2UiLCJhY2N1Iiwib3B0aW9uYWwiLCJvcHRpb25hbENvbHVtbnMiLCJuZXdDb25maWciLCJuZXdWaXNDb25maWciLCJCb29sZWFuIiwibGF5ZXJEYXRhIiwidHlwZSIsImhhc0FsbENvbHVtbnMiLCJoYXNMYXllckRhdGEiLCJzY2FsZSIsImZpeGVkIiwiU0NBTEVfRlVOQyIsImdldFBvc2l0aW9uIiwic2FtcGxlRGF0YSIsInBvaW50cyIsImxhdEJvdW5kcyIsImxuZ0JvdW5kcyIsImJvdW5kcyIsIkFycmF5IiwiaXNBcnJheSIsIkRFRkFVTFRfTElHSFRfU0VUVElOR1MiLCJsaWdodHNQb3NpdGlvbiIsInNsaWNlIiwiTk9fVkFMVUVfQ09MT1IiLCJnZXRWYWx1ZSIsImF0dHJpYnV0ZVZhbHVlIiwiQUxMX0ZJRUxEX1RZUEVTIiwidGltZXN0YW1wIiwiRGF0ZSIsImRhdGFzZXQiLCJuZXdGaWx0ZXIiLCJzY2FsZVR5cGUiLCJTQ0FMRV9UWVBFUyIsIm9yZGluYWwiLCJ1cGRhdGVkRG9tYWluIiwiY2FsY3VsYXRlTGF5ZXJEb21haW4iLCJ2YWxpZGF0ZUZpZWxkVHlwZSIsInZhbGlkYXRlU2NhbGUiLCJ2aXN1YWxDaGFubmVsIiwiY2hhbm5lbFNjYWxlVHlwZSIsInN1cHBvcnRlZEZpZWxkVHlwZXMiLCJjaGFubmVsU3VwcG9ydGVkRmllbGRUeXBlcyIsIkNIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyIsInNjYWxlT3B0aW9ucyIsImdldFNjYWxlT3B0aW9ucyIsIkZJRUxEX09QVFMiLCJmaWx0ZXJlZEluZGV4Rm9yRG9tYWluIiwiZGVmYXVsdERvbWFpbiIsIkNvbnNvbGUiLCJlcnJvciIsImlzVGltZSIsInZhbHVlQWNjZXNzb3IiLCJtYXliZVRvRGF0ZSIsImJpbmQiLCJmb3JtYXQiLCJpbmRleFZhbHVlQWNjZXNzb3IiLCJpIiwic29ydEZ1bmN0aW9uIiwicG9pbnQiLCJxdWFudGlsZSIsInF1YW50aXplIiwibGluZWFyIiwic3FydCIsIm9iamVjdEluZm8iLCJsYXllciIsInBpY2tlZCIsIm1hcFN0YXRlIiwiZml4ZWRSYWRpdXMiLCJyYWRpdXNDaGFubmVsIiwiZmluZCIsInZjIiwicHJvcGVydHkiLCJ1bmRlZmluZWQiLCJyYWRpdXMiLCJnZXRab29tRmFjdG9yIiwic29tZSIsIm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcyIsIkRlZmF1bHRMYXllckljb24iLCJDSEFOTkVMX1NDQUxFUyIsInNpemUiLCJsYXQiLCJsbmciLCJsYXQwIiwibG5nMCIsImxhdDEiLCJsbmcxIiwiZmllbGRQYWlycyIsImRlZmF1bHRGaWVsZHMiLCJhbGxGaWVsZHMiLCJyZXF1aXJlZENvbHVtbnMiLCJwcmV2IiwicmVxdWlyZWRGaWVsZHMiLCJmaWx0ZXIiLCJmIiwiZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyIsImFsbEtleXMiLCJwb2ludGVycyIsImsiLCJjb3VudFBlcktleSIsInBhaXJzIiwiaW5jcmVtZW50UG9pbnRlcnMiLCJuZXdQYWlyIiwiY3V1ciIsInB0cyIsImNvdW50cyIsImMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFVQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFPQTs7Ozs2QkFrQlVBLGE7O0FBWlY7Ozs7QUFJQSxJQUFNQyxlQUFlLEdBQUcsSUFBeEI7QUFFTyxJQUFNQyxZQUFZLEdBQUcsMkJBQVU7QUFDcENDLEVBQUFBLE1BQU0sRUFBRSxJQUQ0QjtBQUVw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KSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGtleW1pcnJvciBmcm9tICdrZXltaXJyb3InO1xuaW1wb3J0IERlZmF1bHRMYXllckljb24gZnJvbSAnLi9kZWZhdWx0LWxheWVyLWljb24nO1xuXG5pbXBvcnQge1xuICBBTExfRklFTERfVFlQRVMsXG4gIERFRkFVTFRfTElHSFRfU0VUVElOR1MsXG4gIE5PX1ZBTFVFX0NPTE9SLFxuICBTQ0FMRV9UWVBFUyxcbiAgQ0hBTk5FTF9TQ0FMRVMsXG4gIEZJRUxEX09QVFMsXG4gIFNDQUxFX0ZVTkMsXG4gIENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEU1xufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge0RhdGFWaXpDb2xvcnN9IGZyb20gJ2NvbnN0YW50cy9jdXN0b20tY29sb3ItcmFuZ2VzJztcbmltcG9ydCB7TEFZRVJfVklTX0NPTkZJR1MsIERFRkFVTFRfVEVYVF9MQUJFTH0gZnJvbSAnLi9sYXllci1mYWN0b3J5JztcblxuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZCwgbm90TnVsbG9yVW5kZWZpbmVkLCBpc1BsYWluT2JqZWN0fSBmcm9tICd1dGlscy91dGlscyc7XG5cbmltcG9ydCB7XG4gIGdldFNhbXBsZURhdGEsXG4gIGdldExhdExuZ0JvdW5kcyxcbiAgbWF5YmVUb0RhdGUsXG4gIGdldFNvcnRpbmdGdW5jdGlvblxufSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcblxuaW1wb3J0IHtcbiAgZ2V0UXVhbnRpbGVEb21haW4sXG4gIGdldE9yZGluYWxEb21haW4sXG4gIGdldExpbmVhckRvbWFpblxufSBmcm9tICd1dGlscy9kYXRhLXNjYWxlLXV0aWxzJztcblxuLyoqXG4gKiBBcHByb3guIG51bWJlciBvZiBwb2ludHMgdG8gc2FtcGxlIGluIGEgbGFyZ2UgZGF0YSBzZXRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbmNvbnN0IE1BWF9TQU1QTEVfU0laRSA9IDUwMDA7XG5cbmV4cG9ydCBjb25zdCBPVkVSTEFZX1RZUEUgPSBrZXltaXJyb3Ioe1xuICBkZWNrZ2w6IG51bGwsXG4gIG1hcGJveGdsOiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IGxheWVyQ29sb3JzID0gT2JqZWN0LnZhbHVlcyhEYXRhVml6Q29sb3JzKS5tYXAoaGV4VG9SZ2IpO1xuZnVuY3Rpb24qIGdlbmVyYXRlQ29sb3IoKSB7XG4gIGxldCBpbmRleCA9IDA7XG4gIHdoaWxlIChpbmRleCA8IGxheWVyQ29sb3JzLmxlbmd0aCArIDEpIHtcbiAgICBpZiAoaW5kZXggPT09IGxheWVyQ29sb3JzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH1cbiAgICB5aWVsZCBsYXllckNvbG9yc1tpbmRleCsrXTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY29sb3JNYWtlciA9IGdlbmVyYXRlQ29sb3IoKTtcbmNvbnN0IGRlZmF1bHRHZXRGaWVsZFZhbHVlID0gKGZpZWxkLCBkKSA9PiBkW2ZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDFdO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzID0ge30pIHtcbiAgICB0aGlzLmlkID0gcHJvcHMuaWQgfHwgZ2VuZXJhdGVIYXNoSWQoNik7XG5cbiAgICAvLyBtZXRhXG4gICAgdGhpcy5tZXRhID0ge307XG5cbiAgICAvLyB2aXNDb25maWdTZXR0aW5nc1xuICAgIHRoaXMudmlzQ29uZmlnU2V0dGluZ3MgPSB7fTtcblxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5nZXREZWZhdWx0TGF5ZXJDb25maWcoe1xuICAgICAgY29sdW1uczogdGhpcy5nZXRMYXllckNvbHVtbnMoKSxcbiAgICAgIC4uLnByb3BzXG4gICAgfSk7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBEZWZhdWx0TGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IG92ZXJsYXlUeXBlKCkge1xuICAgIHJldHVybiBPVkVSTEFZX1RZUEUuZGVja2dsO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZ2V0IG9wdGlvbmFsQ29sdW1ucygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBnZXQgbm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzKCkge1xuICAgIHJldHVybiBbJ2xhYmVsJywgJ29wYWNpdHknLCAndGhpY2tuZXNzJywgJ2lzVmlzaWJsZSddO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICBwcm9wZXJ0eTogJ2NvbG9yJyxcbiAgICAgICAgZmllbGQ6ICdjb2xvckZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdjb2xvclNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnY29sb3JEb21haW4nLFxuICAgICAgICByYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICAgICAgICBrZXk6ICdjb2xvcicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLmNvbG9yXG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICBwcm9wZXJ0eTogJ3NpemUnLFxuICAgICAgICBmaWVsZDogJ3NpemVGaWVsZCcsXG4gICAgICAgIHNjYWxlOiAnc2l6ZVNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnc2l6ZURvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnc2l6ZVJhbmdlJyxcbiAgICAgICAga2V5OiAnc2l6ZScsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnNpemVcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogQ29sdW1uIHBhaXJzIG1hcHMgbGF5ZXIgY29sdW1uIHRvIGEgc3BlY2lmaWMgZmllbGQgcGFpcnMsXG4gICAqIEJ5IGRlZmF1bHQsIGl0IGlzIHNldCB0byBudWxsXG4gICAqL1xuICBnZXQgY29sdW1uUGFpcnMoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKlxuICAgKiBEZWZhdWx0IHBvaW50IGNvbHVtbiBwYWlycywgY2FuIGJlIHVzZWQgZm9yIHBvaW50IGJhc2VkIGxheWVyczogcG9pbnQsIGljb24gZXRjLlxuICAgKi9cbiAgZ2V0IGRlZmF1bHRQb2ludENvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsYXQ6IHtwYWlyOiAnbG5nJywgZmllbGRQYWlyS2V5OiAnbGF0J30sXG4gICAgICBsbmc6IHtwYWlyOiAnbGF0JywgZmllbGRQYWlyS2V5OiAnbG5nJ31cbiAgICB9O1xuICB9XG5cbiAgLypcbiAgICogRGVmYXVsdCBsaW5rIGNvbHVtbiBwYWlycywgY2FuIGJlIHVzZWQgZm9yIGxpbmsgYmFzZWQgbGF5ZXJzOiBhcmMsIGxpbmUgZXRjXG4gICAqL1xuICBnZXQgZGVmYXVsdExpbmtDb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGF0MDoge3BhaXI6ICdsbmcwJywgZmllbGRQYWlyS2V5OiAnbGF0J30sXG4gICAgICBsbmcwOiB7cGFpcjogJ2xhdDAnLCBmaWVsZFBhaXJLZXk6ICdsbmcnfSxcbiAgICAgIGxhdDE6IHtwYWlyOiAnbG5nMScsIGZpZWxkUGFpcktleTogJ2xhdCd9LFxuICAgICAgbG5nMToge3BhaXI6ICdsYXQxJywgZmllbGRQYWlyS2V5OiAnbG5nJ31cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiBhIFJlYWN0IGNvbXBvbmVudCBmb3IgdG8gcmVuZGVyIGxheWVyIGluc3RydWN0aW9ucyBpbiBhIG1vZGFsXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gYW4gb2JqZWN0XG4gICAqIEBleGFtcGxlXG4gICAqICByZXR1cm4ge1xuICAgKiAgICBpZDogJ2ljb25JbmZvJyxcbiAgICogICAgdGVtcGxhdGU6IEljb25JbmZvTW9kYWwsXG4gICAqICAgIG1vZGFsUHJvcHM6IHtcbiAgICogICAgICB0aXRsZTogJ0hvdyB0byBkcmF3IGljb25zJ1xuICAgKiAgIH07XG4gICAqIH1cbiAgICovXG4gIGdldCBsYXllckluZm9Nb2RhbCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvKlxuICAgKiBHaXZlbiBhIGRhdGFzZXQsIGF1dG9tYXRpY2FsbHkgY3JlYXRlIGxheWVycyBiYXNlZCBvbiBpdFxuICAgKiBhbmQgcmV0dXJuIHRoZSBwcm9wc1xuICAgKiBCeSBkZWZhdWx0LCBubyBsYXllcnMgd2lsbCBiZSBmb3VuZFxuICAgKi9cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyhmaWVsZFBhaXJzLCBkYXRhSWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHaXZlbiBhIGFycmF5IG9mIHByZXNldCByZXF1aXJlZCBjb2x1bW4gbmFtZXNcbiAgICogZm91bmQgZmllbGQgdGhhdCBoYXMgdGhlIHNhbWUgbmFtZSB0byBzZXQgYXMgbGF5ZXIgY29sdW1uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0W119IGRlZmF1bHRGaWVsZHNcbiAgICogQHBhcmFtIHtvYmplY3RbXX0gYWxsRmllbGRzXG4gICAqIEByZXR1cm5zIHtvYmplY3RbXSB8IG51bGx9IGFsbCBwb3NzaWJsZSByZXF1aXJlZCBsYXllciBjb2x1bW4gcGFpcnNcbiAgICovXG4gIHN0YXRpYyBmaW5kRGVmYXVsdENvbHVtbkZpZWxkKGRlZmF1bHRGaWVsZHMsIGFsbEZpZWxkcykge1xuICAgIC8vIGZpbmQgYWxsIG1hdGNoZWQgZmllbGRzIGZvciBlYWNoIHJlcXVpcmVkIGNvbFxuICAgIGNvbnN0IHJlcXVpcmVkQ29sdW1ucyA9IE9iamVjdC5rZXlzKGRlZmF1bHRGaWVsZHMpLnJlZHVjZSgocHJldiwga2V5KSA9PiB7XG4gICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IGFsbEZpZWxkcy5maWx0ZXIoXG4gICAgICAgIGYgPT4gZi5uYW1lID09PSBkZWZhdWx0RmllbGRzW2tleV0gfHwgZGVmYXVsdEZpZWxkc1trZXldLmluY2x1ZGVzKGYubmFtZSlcbiAgICAgICk7XG5cbiAgICAgIHByZXZba2V5XSA9IHJlcXVpcmVkRmllbGRzLmxlbmd0aFxuICAgICAgICA/IHJlcXVpcmVkRmllbGRzLm1hcChmID0+ICh7XG4gICAgICAgICAgdmFsdWU6IGYubmFtZSxcbiAgICAgICAgICBmaWVsZElkeDogZi50YWJsZUZpZWxkSW5kZXggLSAxXG4gICAgICAgIH0pKVxuICAgICAgICA6IG51bGw7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB7fSk7XG5cbiAgICBpZiAoIU9iamVjdC52YWx1ZXMocmVxdWlyZWRDb2x1bW5zKS5ldmVyeShCb29sZWFuKSkge1xuICAgICAgLy8gaWYgYW55IGZpZWxkIG1pc3NpbmcsIHJldHVybiBudWxsXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRBbGxQb3NzaWJsZUNvbHVtblBhcmlzKHJlcXVpcmVkQ29sdW1ucyk7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWxsUG9zc2libGVDb2x1bW5QYXJpcyhyZXF1aXJlZENvbHVtbnMpIHtcbiAgICAvLyBmb3IgbXVsdGlwbGUgbWF0Y2hlZCBmaWVsZCBmb3Igb25lIHJlcXVpcmVkIGNvbHVtbiwgcmV0dXJuIG11bHRpcGxlXG4gICAgLy8gY29tYmluYXRpb25zLCBlLiBnLiBpZiBjb2x1bW4gYSBoYXMgMiBtYXRjaGVkLCBjb2x1bW4gYiBoYXMgMyBtYXRjaGVkXG4gICAgLy8gNiBwb3NzaWJsZSBjb2x1bW4gcGFpcnMgd2lsbCBiZSByZXR1cm5lZFxuICAgIGNvbnN0IGFsbEtleXMgPSBPYmplY3Qua2V5cyhyZXF1aXJlZENvbHVtbnMpO1xuICAgIGNvbnN0IHBvaW50ZXJzID0gYWxsS2V5cy5tYXAoKGssIGkpID0+IChpID09PSBhbGxLZXlzLmxlbmd0aCAtIDEgPyAtMSA6IDApKTtcbiAgICBjb25zdCBjb3VudFBlcktleSA9IGFsbEtleXMubWFwKGsgPT4gcmVxdWlyZWRDb2x1bW5zW2tdLmxlbmd0aCk7XG4gICAgY29uc3QgcGFpcnMgPSBbXTtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWxvb3AtZnVuYyAqL1xuICAgIHdoaWxlIChpbmNyZW1lbnRQb2ludGVycyhwb2ludGVycywgY291bnRQZXJLZXksIHBvaW50ZXJzLmxlbmd0aCAtIDEpKSB7XG4gICAgICBjb25zdCBuZXdQYWlyID0gcG9pbnRlcnMucmVkdWNlKChwcmV2LCBjdXVyLCBpKSA9PiB7XG4gICAgICAgIHByZXZbYWxsS2V5c1tpXV0gPSByZXF1aXJlZENvbHVtbnNbYWxsS2V5c1tpXV1bY3V1cl07XG4gICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgfSwge30pO1xuXG4gICAgICBwYWlycy5wdXNoKG5ld1BhaXIpO1xuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWxvb3AtZnVuYyAqL1xuXG4gICAgLy8gcmVjdXJzaXZlbHkgaW5jcmVtZW50IHBvaW50ZXJzXG4gICAgZnVuY3Rpb24gaW5jcmVtZW50UG9pbnRlcnMocHRzLCBjb3VudHMsIGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPT09IDAgJiYgcHRzWzBdID09PSBjb3VudHNbMF0gLSAxKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgdG8gaW5jcmVtZW50XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHB0c1tpbmRleF0gKyAxIDwgY291bnRzW2luZGV4XSkge1xuICAgICAgICBwdHNbaW5kZXhdID0gcHRzW2luZGV4XSArIDE7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwdHNbaW5kZXhdID0gMDtcbiAgICAgIHJldHVybiBpbmNyZW1lbnRQb2ludGVycyhwdHMsIGNvdW50cywgaW5kZXggLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFpcnM7XG4gIH1cblxuICBzdGF0aWMgaGV4VG9SZ2IoYykge1xuICAgIHJldHVybiBoZXhUb1JnYihjKTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFJZDogcHJvcHMuZGF0YUlkIHx8IG51bGwsXG4gICAgICBsYWJlbDogcHJvcHMubGFiZWwgfHwgJ25ldyBsYXllcicsXG4gICAgICBjb2xvcjogcHJvcHMuY29sb3IgfHwgY29sb3JNYWtlci5uZXh0KCkudmFsdWUsXG4gICAgICBjb2x1bW5zOiBwcm9wcy5jb2x1bW5zIHx8IG51bGwsXG4gICAgICBpc1Zpc2libGU6IHByb3BzLmlzVmlzaWJsZSB8fCBmYWxzZSxcbiAgICAgIGlzQ29uZmlnQWN0aXZlOiBwcm9wcy5pc0NvbmZpZ0FjdGl2ZSB8fCBmYWxzZSxcbiAgICAgIGhpZ2hsaWdodENvbG9yOiBwcm9wcy5oaWdobGlnaHRDb2xvciB8fCBbMjUyLCAyNDIsIDI2LCAyNTVdLFxuXG4gICAgICAvLyBUT0RPOiByZWZhY3RvciB0aGlzIGludG8gc2VwYXJhdGUgdmlzdWFsIENoYW5uZWwgY29uZmlnXG4gICAgICAvLyBjb2xvciBieSBmaWVsZCwgZG9tYWluIGlzIHNldCBieSBmaWx0ZXJzLCBmaWVsZCwgc2NhbGUgdHlwZVxuICAgICAgY29sb3JGaWVsZDogbnVsbCxcbiAgICAgIGNvbG9yRG9tYWluOiBbMCwgMV0sXG4gICAgICBjb2xvclNjYWxlOiAncXVhbnRpbGUnLFxuXG4gICAgICAvLyBjb2xvciBieSBzaXplLCBkb21haW4gaXMgc2V0IGJ5IGZpbHRlcnMsIGZpZWxkLCBzY2FsZSB0eXBlXG4gICAgICBzaXplRG9tYWluOiBbMCwgMV0sXG4gICAgICBzaXplU2NhbGU6ICdsaW5lYXInLFxuICAgICAgc2l6ZUZpZWxkOiBudWxsLFxuXG4gICAgICB2aXNDb25maWc6IHt9LFxuXG4gICAgICB0ZXh0TGFiZWw6IFtERUZBVUxUX1RFWFRfTEFCRUxdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRlc2NyaXB0aW9uIG9mIGEgdmlzdWFsQ2hhbm5lbCBjb25maWdcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcmV0dXJucyB7e2xhYmVsOiBzdHJpbmcsIG1lYXN1cmU6IChzdHJpbmd8c3RyaW5nKX19XG4gICAqL1xuICBnZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oa2V5KSB7XG4gICAgLy8gZS5nLiBsYWJlbDogQ29sb3IsIG1lYXN1cmU6IFZlaGljbGUgVHlwZVxuICAgIHJldHVybiB7XG4gICAgICBsYWJlbDogdGhpcy52aXNDb25maWdTZXR0aW5nc1t0aGlzLnZpc3VhbENoYW5uZWxzW2tleV0ucmFuZ2VdLmxhYmVsLFxuICAgICAgbWVhc3VyZTogdGhpcy5jb25maWdbdGhpcy52aXN1YWxDaGFubmVsc1trZXldLmZpZWxkXVxuICAgICAgICA/IHRoaXMuY29uZmlnW3RoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5maWVsZF0ubmFtZVxuICAgICAgICA6IHRoaXMudmlzdWFsQ2hhbm5lbHNba2V5XS5kZWZhdWx0TWVhc3VyZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ24gYSBmaWVsZCB0byBsYXllciBjb2x1bW4sIHJldHVybiBjb2x1bW4gY29uZmlnXG4gICAqIEBwYXJhbSBrZXkgLSBDb2x1bW4gS2V5XG4gICAqIEBwYXJhbSBmaWVsZCAtIFNlbGVjdGVkIGZpZWxkXG4gICAqIEByZXR1cm5zIHt7fX0gLSBDb2x1bW4gY29uZmlnXG4gICAqL1xuICBhc3NpZ25Db2x1bW4oa2V5LCBmaWVsZCkge1xuICAgIC8vIGZpZWxkIHZhbHVlIGNvdWxkIGJlIG51bGwgZm9yIG9wdGlvbmFsIGNvbHVtbnNcbiAgICBjb25zdCB1cGRhdGUgPSBmaWVsZFxuICAgICAgPyB7XG4gICAgICAgICAgdmFsdWU6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgZmllbGRJZHg6IGZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDFcbiAgICAgICAgfVxuICAgICAgOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMX07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgIFtrZXldOiB7XG4gICAgICAgIC4uLnRoaXMuY29uZmlnLmNvbHVtbnNba2V5XSxcbiAgICAgICAgLi4udXBkYXRlXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ24gYSBmaWVsZCBwYWlyIHRvIGNvbHVtbiBjb25maWcsIHJldHVybiBjb2x1bW4gY29uZmlnXG4gICAqIEBwYXJhbSBrZXkgLSBDb2x1bW4gS2V5XG4gICAqIEBwYXJhbSBwYWlyIC0gZmllbGQgUGFpclxuICAgKiBAcmV0dXJucyB7e319IC0gQ29sdW1uIGNvbmZpZ1xuICAgKi9cbiAgYXNzaWduQ29sdW1uUGFpcnMoa2V5LCBwYWlyKSB7XG4gICAgaWYgKCF0aGlzLmNvbHVtblBhaXJzIHx8ICF0aGlzLmNvbHVtblBhaXJzW2tleV0pIHtcbiAgICAgIC8vIHNob3VsZCBub3QgZW5kIGluIHRoaXMgc3RhdGVcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2x1bW5zO1xuICAgIH1cblxuICAgIGNvbnN0IHtwYWlyOiBwYXJ0bmVyS2V5LCBmaWVsZFBhaXJLZXl9ID0gdGhpcy5jb2x1bW5QYWlyc1trZXldO1xuICAgIGNvbnN0IHtmaWVsZFBhaXJLZXk6IHBhcnRuZXJGaWVsZFBhaXJLZXl9ID0gdGhpcy5jb2x1bW5QYWlyc1twYXJ0bmVyS2V5XTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgW2tleV06IHBhaXJbZmllbGRQYWlyS2V5XSxcbiAgICAgIFtwYXJ0bmVyS2V5XTogcGFpcltwYXJ0bmVyRmllbGRQYWlyS2V5XVxuICAgIH07XG4gIH1cblxuXHQvKipcbiAgICogQ2FsY3VsYXRlIGEgcmFkaXVzIHpvb20gbXVsdGlwbGllciB0byByZW5kZXIgcG9pbnRzLCBzbyB0aGV5IGFyZSB2aXNpYmxlIGluIGFsbCB6b29tIGxldmVsXG4gICAqIEBwYXJhbSBtYXBTdGF0ZVxuICAgKiBAcGFyYW0gbWFwU3RhdGUuem9vbSAtIGFjdHVhbCB6b29tXG4gICAqIEBwYXJhbSBtYXBTdGF0ZS56b29tT2Zmc2V0IC0gem9vbU9mZnNldCB3aGVuIHJlbmRlciBpbiB0aGUgcGxvdCBjb250YWluZXIgZm9yIGV4cG9ydCBpbWFnZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0Wm9vbUZhY3Rvcih7em9vbSwgem9vbU9mZnNldCA9IDB9KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDIsIE1hdGgubWF4KDE0IC0gem9vbSArIHpvb21PZmZzZXQsIDApKTtcbiAgfVxuXG5cdC8qKlxuICAgKiBDYWxjdWxhdGUgYSBlbGV2YXRpb24gem9vbSBtdWx0aXBsaWVyIHRvIHJlbmRlciBwb2ludHMsIHNvIHRoZXkgYXJlIHZpc2libGUgaW4gYWxsIHpvb20gbGV2ZWxcbiAgICogQHBhcmFtIG1hcFN0YXRlXG4gICAqIEBwYXJhbSBtYXBTdGF0ZS56b29tIC0gYWN0dWFsIHpvb21cbiAgICogQHBhcmFtIG1hcFN0YXRlLnpvb21PZmZzZXQgLSB6b29tT2Zmc2V0IHdoZW4gcmVuZGVyIGluIHRoZSBwbG90IGNvbnRhaW5lciBmb3IgZXhwb3J0IGltYWdlXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXRFbGV2YXRpb25ab29tRmFjdG9yKHt6b29tLCB6b29tT2Zmc2V0ID0gMH0pIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMiwgTWF0aC5tYXgoOCAtIHpvb20gKyB6b29tT2Zmc2V0LCAwKSk7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoZGF0YSwgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGdldEhvdmVyRGF0YShvYmplY3QpIHtcbiAgICBpZiAoIW9iamVjdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIGJ5IGRlZmF1bHQsIGVhY2ggZW50cnkgb2YgbGF5ZXJEYXRhIHNob3VsZCBoYXZlIGEgZGF0YSBwcm9wZXJ0eSBwb2ludHNcbiAgICAvLyB0byB0aGUgb3JpZ2luYWwgaXRlbSBpbiB0aGUgYWxsRGF0YSBhcnJheVxuICAgIC8vIGVhY2ggbGF5ZXIgY2FuIGltcGxlbWVudCBpdHMgb3duIGdldEhvdmVyRGF0YSBtZXRob2RcbiAgICByZXR1cm4gb2JqZWN0LmRhdGE7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBjaGFuZ2UgbGF5ZXIgdHlwZSwgdHJ5IHRvIGNvcHkgb3ZlciBsYXllciBjb25maWdzIGFzIG11Y2ggYXMgcG9zc2libGVcbiAgICogQHBhcmFtIGNvbmZpZ1RvQ29weSAtIGNvbmZpZyB0byBjb3B5IG92ZXJcbiAgICogQHBhcmFtIHZpc0NvbmZpZ1NldHRpbmdzIC0gdmlzQ29uZmlnIHNldHRpbmdzIG9mIGNvbmZpZyB0byBjb3B5XG4gICAqL1xuICBhc3NpZ25Db25maWdUb0xheWVyKGNvbmZpZ1RvQ29weSwgdmlzQ29uZmlnU2V0dGluZ3MpIHtcbiAgICAvLyBkb24ndCBkZWVwIG1lcmdlIHZpc3VhbENoYW5uZWwgZmllbGRcbiAgICBjb25zdCBub3RUb0RlZXBNZXJnZSA9IE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykubWFwKHYgPT4gdi5maWVsZCk7XG5cbiAgICAvLyBkb24ndCBkZWVwIG1lcmdlIGNvbG9yIHJhbmdlLCByZXZlcnNlZDogaXMgbm90IGEga2V5IGJ5IGRlZmF1bHRcbiAgICBub3RUb0RlZXBNZXJnZS5wdXNoKCdjb2xvclJhbmdlJywgJ3N0cm9rZUNvbG9yUmFuZ2UnKTtcblxuICAgIC8vIGRvbid0IGNvcHkgb3ZlciBkb21haW5cbiAgICBjb25zdCBub3RUb0NvcHkgPSBPYmplY3QudmFsdWVzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLm1hcCh2ID0+IHYuZG9tYWluKTtcblxuICAgIC8vIGlmIHJhbmdlIGlzIGZvciB0aGUgc2FtZSBwcm9wZXJ0eSBncm91cCBjb3B5IGl0LCBvdGhlcndpc2UsIG5vdCB0byBjb3B5XG4gICAgT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5mb3JFYWNoKHYgPT4ge1xuICAgICAgaWYgKGNvbmZpZ1RvQ29weS52aXNDb25maWdbdi5yYW5nZV0gJiYgdmlzQ29uZmlnU2V0dGluZ3Nbdi5yYW5nZV0uZ3JvdXAgIT09IHRoaXMudmlzQ29uZmlnU2V0dGluZ3Nbdi5yYW5nZV0uZ3JvdXApIHtcbiAgICAgICAgbm90VG9Db3B5LnB1c2godi5yYW5nZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBkb24ndCBjb3B5IG92ZXIgdmlzdWFsQ2hhbm5lbCByYW5nZVxuICAgIGNvbnN0IGN1cnJlbnRDb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICBjb25zdCBjb3BpZWQgPSB0aGlzLmNvcHlMYXllckNvbmZpZyhjdXJyZW50Q29uZmlnLCBjb25maWdUb0NvcHksIHtub3RUb0RlZXBNZXJnZSwgbm90VG9Db3B5fSk7XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKGNvcGllZCk7XG4gICAgLy8gdmFsaWRhdGUgdmlzdWFsQ2hhbm5lbCBmaWVsZCB0eXBlIGFuZCBzY2FsZSB0eXBlc1xuICAgIE9iamVjdC5rZXlzKHRoaXMudmlzdWFsQ2hhbm5lbHMpLmZvckVhY2goY2hhbm5lbCA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIFJlY3Vyc2l2ZWx5IGNvcHkgY29uZmlnIG92ZXIgdG8gYW4gZW1wdHkgbGF5ZXJcbiAgICogd2hlbiByZWNlaXZlZCBzYXZlZCBjb25maWcsIG9yIGNvcHkgY29uZmlnIG92ZXIgZnJvbSBhIGRpZmZlcmVudCBsYXllciB0eXBlXG4gICAqIG1ha2Ugc3VyZSB0byBvbmx5IGNvcHkgb3ZlciB2YWx1ZSB0byBleGlzdGluZyBrZXlzXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50Q29uZmlnIC0gZXhpc3RpbmcgY29uZmlnIHRvIGJlIG92ZXJyaWRlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWdUb0NvcHkgLSBuZXcgQ29uZmlnIHRvIGNvcHkgb3ZlclxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBub3RUb0RlZXBNZXJnZSAtIGFycmF5IG9mIHByb3BlcnRpZXMgdG8gbm90IHRvIGJlIGRlZXAgY29waWVkXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IG5vdFRvQ29weSAtIGFycmF5IG9mIHByb3BlcnRpZXMgbm90IHRvIGNvcHlcbiAgICogQHJldHVybnMge29iamVjdH0gLSBjb3BpZWQgY29uZmlnXG4gICAqL1xuICBjb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZywgY29uZmlnVG9Db3B5LCB7bm90VG9EZWVwTWVyZ2UgPSBbXSwgbm90VG9Db3B5ID0gW119ID0ge30pIHtcbiAgICBjb25zdCBjb3BpZWQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhjdXJyZW50Q29uZmlnKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGlzUGxhaW5PYmplY3QoY3VycmVudENvbmZpZ1trZXldKSAmJlxuICAgICAgICBpc1BsYWluT2JqZWN0KGNvbmZpZ1RvQ29weVtrZXldKSAmJlxuICAgICAgICAhbm90VG9EZWVwTWVyZ2UuaW5jbHVkZXMoa2V5KSAmJlxuICAgICAgICAhbm90VG9Db3B5LmluY2x1ZGVzKGtleSlcbiAgICAgICkge1xuICAgICAgICAvLyByZWN1cnNpdmVseSBhc3NpZ24gb2JqZWN0IHZhbHVlXG4gICAgICAgIGNvcGllZFtrZXldID0gdGhpcy5jb3B5TGF5ZXJDb25maWcoY3VycmVudENvbmZpZ1trZXldLCBjb25maWdUb0NvcHlba2V5XSwge25vdFRvRGVlcE1lcmdlLCBub3RUb0NvcHl9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG5vdE51bGxvclVuZGVmaW5lZChjb25maWdUb0NvcHlba2V5XSkgJiZcbiAgICAgICAgIW5vdFRvQ29weS5pbmNsdWRlcyhrZXkpXG4gICAgICApIHtcbiAgICAgICAgLy8gY29weVxuICAgICAgICBjb3BpZWRba2V5XSA9IGNvbmZpZ1RvQ29weVtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8ga2VlcCBleGlzdGluZ1xuICAgICAgICBjb3BpZWRba2V5XSA9IGN1cnJlbnRDb25maWdba2V5XTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjb3BpZWQ7XG4gIH1cblxuICByZWdpc3RlclZpc0NvbmZpZyhsYXllclZpc0NvbmZpZ3MpIHtcbiAgICBPYmplY3Qua2V5cyhsYXllclZpc0NvbmZpZ3MpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyAmJlxuICAgICAgICBMQVlFUl9WSVNfQ09ORklHU1tsYXllclZpc0NvbmZpZ3NbaXRlbV1dXG4gICAgICApIHtcbiAgICAgICAgLy8gaWYgYXNzaWduZWQgb25lIG9mIGRlZmF1bHQgTEFZRVJfQ09ORklHU1xuICAgICAgICB0aGlzLmNvbmZpZy52aXNDb25maWdbaXRlbV0gPVxuICAgICAgICAgIExBWUVSX1ZJU19DT05GSUdTW2xheWVyVmlzQ29uZmlnc1tpdGVtXV0uZGVmYXVsdFZhbHVlO1xuICAgICAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW2l0ZW1dID0gTEFZRVJfVklTX0NPTkZJR1NbbGF5ZXJWaXNDb25maWdzW2l0ZW1dXTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIFsndHlwZScsICdkZWZhdWx0VmFsdWUnXS5ldmVyeShwID0+IGxheWVyVmlzQ29uZmlnc1tpdGVtXVtwXSlcbiAgICAgICkge1xuICAgICAgICAvLyBpZiBwcm92aWRlZCBjdXN0b21pemVkIHZpc0NvbmZpZywgYW5kIGhhcyB0eXBlICYmIGRlZmF1bHRWYWx1ZVxuICAgICAgICAvLyBUT0RPOiBmdXJ0aGVyIGNoZWNrIGlmIGN1c3RvbWl6ZWQgdmlzQ29uZmlnIGlzIHZhbGlkXG4gICAgICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZ1tpdGVtXSA9IGxheWVyVmlzQ29uZmlnc1tpdGVtXS5kZWZhdWx0VmFsdWU7XG4gICAgICAgIHRoaXMudmlzQ29uZmlnU2V0dGluZ3NbaXRlbV0gPSBsYXllclZpc0NvbmZpZ3NbaXRlbV07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRMYXllckNvbHVtbnMoKSB7XG4gICAgY29uc3QgcmVxdWlyZWQgPSB0aGlzLnJlcXVpcmVkTGF5ZXJDb2x1bW5zLnJlZHVjZShcbiAgICAgIChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMX1cbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuICAgIGNvbnN0IG9wdGlvbmFsID0gdGhpcy5vcHRpb25hbENvbHVtbnMucmVkdWNlKFxuICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgW2tleV06IHt2YWx1ZTogbnVsbCwgZmllbGRJZHg6IC0xLCBvcHRpb25hbDogdHJ1ZX1cbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gICAgcmV0dXJuIHsuLi5yZXF1aXJlZCwgLi4ub3B0aW9uYWx9O1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJDb25maWcobmV3Q29uZmlnKSB7XG4gICAgdGhpcy5jb25maWcgPSB7Li4udGhpcy5jb25maWcsIC4uLm5ld0NvbmZpZ307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB1cGRhdGVMYXllclZpc0NvbmZpZyhuZXdWaXNDb25maWcpIHtcbiAgICB0aGlzLmNvbmZpZy52aXNDb25maWcgPSB7Li4udGhpcy5jb25maWcudmlzQ29uZmlnLCAuLi5uZXdWaXNDb25maWd9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGxheWVyIGhhcyBhbGwgY29sdW1uc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbGF5ZXJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHllcyBvciBub1xuICAgKi9cbiAgaGFzQWxsQ29sdW1ucygpIHtcbiAgICBjb25zdCB7Y29sdW1uc30gPSB0aGlzLmNvbmZpZztcbiAgICByZXR1cm4gKFxuICAgICAgY29sdW1ucyAmJlxuICAgICAgT2JqZWN0LnZhbHVlcyhjb2x1bW5zKS5ldmVyeSh2ID0+IHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4odi5vcHRpb25hbCB8fCAodi52YWx1ZSAmJiB2LmZpZWxkSWR4ID4gLTEpKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIGxheWVyIGhhcyBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBsYXllclxuICAgKiBAcGFyYW0ge0FycmF5IHwgT2JqZWN0fSBsYXllckRhdGFcbiAgICogQHJldHVybnMge2Jvb2xlYW59IHllcyBvciBub1xuICAgKi9cbiAgaGFzTGF5ZXJEYXRhKGxheWVyRGF0YSkge1xuICAgIGlmICghbGF5ZXJEYXRhKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIEJvb2xlYW4obGF5ZXJEYXRhLmRhdGEgJiYgbGF5ZXJEYXRhLmRhdGEubGVuZ3RoKTtcbiAgfVxuXG4gIGlzVmFsaWRUb1NhdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZSAmJiB0aGlzLmhhc0FsbENvbHVtbnMoKTtcbiAgfVxuXG4gIHNob3VsZFJlbmRlckxheWVyKGRhdGEpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy50eXBlICYmXG4gICAgICB0aGlzLmhhc0FsbENvbHVtbnMoKSAmJlxuICAgICAgdGhpcy5jb25maWcuaXNWaXNpYmxlICYmXG4gICAgICB0aGlzLmhhc0xheWVyRGF0YShkYXRhKVxuICAgICk7XG4gIH1cblxuICBnZXRWaXNDaGFubmVsU2NhbGUoc2NhbGUsIGRvbWFpbiwgcmFuZ2UsIGZpeGVkKSB7XG4gICAgcmV0dXJuIFNDQUxFX0ZVTkNbZml4ZWQgPyAnbGluZWFyJyA6IHNjYWxlXSgpXG4gICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgIC5yYW5nZShmaXhlZCA/IGRvbWFpbiA6IHJhbmdlKTtcbiAgfVxuXG4gIGdldFBvaW50c0JvdW5kcyhhbGxEYXRhLCBnZXRQb3NpdGlvbikge1xuICAgIC8vIG5vIG5lZWQgdG8gbG9vcCB0aHJvdWdoIHRoZSBlbnRpcmUgZGF0YXNldFxuICAgIC8vIGdldCBhIHNhbXBsZSBvZiBkYXRhIHRvIGNhbGN1bGF0ZSBib3VuZHNcbiAgICBjb25zdCBzYW1wbGVEYXRhID1cbiAgICAgIGFsbERhdGEubGVuZ3RoID4gTUFYX1NBTVBMRV9TSVpFXG4gICAgICAgID8gZ2V0U2FtcGxlRGF0YShhbGxEYXRhLCBNQVhfU0FNUExFX1NJWkUpXG4gICAgICAgIDogYWxsRGF0YTtcbiAgICBjb25zdCBwb2ludHMgPSBzYW1wbGVEYXRhLm1hcChnZXRQb3NpdGlvbik7XG5cbiAgICBjb25zdCBsYXRCb3VuZHMgPSBnZXRMYXRMbmdCb3VuZHMocG9pbnRzLCAxLCBbLTkwLCA5MF0pO1xuICAgIGNvbnN0IGxuZ0JvdW5kcyA9IGdldExhdExuZ0JvdW5kcyhwb2ludHMsIDAsIFstMTgwLCAxODBdKTtcblxuICAgIGlmICghbGF0Qm91bmRzIHx8ICFsbmdCb3VuZHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBbbG5nQm91bmRzWzBdLCBsYXRCb3VuZHNbMF0sIGxuZ0JvdW5kc1sxXSwgbGF0Qm91bmRzWzFdXTtcbiAgfVxuXG4gIGdldExpZ2h0U2V0dGluZ3NGcm9tQm91bmRzKGJvdW5kcykge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KGJvdW5kcykgJiYgYm91bmRzLmxlbmd0aCA+PSA0XG4gICAgICA/IHtcbiAgICAgICAgICAuLi5ERUZBVUxUX0xJR0hUX1NFVFRJTkdTLFxuICAgICAgICAgIGxpZ2h0c1Bvc2l0aW9uOiBbXG4gICAgICAgICAgICAuLi5ib3VuZHMuc2xpY2UoMCwgMiksXG4gICAgICAgICAgICBERUZBVUxUX0xJR0hUX1NFVFRJTkdTLmxpZ2h0c1Bvc2l0aW9uWzJdLFxuICAgICAgICAgICAgLi4uYm91bmRzLnNsaWNlKDIsIDQpLFxuICAgICAgICAgICAgREVGQVVMVF9MSUdIVF9TRVRUSU5HUy5saWdodHNQb3NpdGlvbls1XVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgOiBERUZBVUxUX0xJR0hUX1NFVFRJTkdTO1xuICB9XG5cbiAgZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICBzY2FsZSxcbiAgICBkYXRhLFxuICAgIGZpZWxkLFxuICAgIGRlZmF1bHRWYWx1ZSA9IE5PX1ZBTFVFX0NPTE9SLFxuICAgIGdldFZhbHVlID0gZGVmYXVsdEdldEZpZWxkVmFsdWVcbiAgKSB7XG4gICAgY29uc3Qge3R5cGV9ID0gZmllbGQ7XG4gICAgY29uc3QgdmFsdWUgPSBnZXRWYWx1ZShmaWVsZCwgZGF0YSk7XG4gICAgbGV0IGF0dHJpYnV0ZVZhbHVlO1xuICAgIGlmICh0eXBlID09PSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wKSB7XG4gICAgICAvLyBzaG91bGRuJ3QgbmVlZCB0byBjb252ZXJ0IGhlcmVcbiAgICAgIC8vIHNjYWxlIEZ1bmN0aW9uIHNob3VsZCB0YWtlIGNhcmUgb2YgaXRcbiAgICAgIGF0dHJpYnV0ZVZhbHVlID0gc2NhbGUobmV3IERhdGUodmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0cmlidXRlVmFsdWUgPSBzY2FsZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgaWYgKCFhdHRyaWJ1dGVWYWx1ZSkge1xuICAgICAgYXR0cmlidXRlVmFsdWUgPSBkZWZhdWx0VmFsdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGF0dHJpYnV0ZVZhbHVlO1xuICB9XG5cbiAgdXBkYXRlTWV0YShtZXRhKSB7XG4gICAgdGhpcy5tZXRhID0gey4uLnRoaXMubWV0YSwgLi4ubWV0YX07XG4gIH1cblxuICAvKipcbiAgICogaGVscGVyIGZ1bmN0aW9uIHRvIHVwZGF0ZSBvbmUgbGF5ZXIgZG9tYWluIHdoZW4gc3RhdGUuZGF0YSBjaGFuZ2VkXG4gICAqIGlmIHN0YXRlLmRhdGEgY2hhbmdlIGlzIGR1ZSBvdCB1cGRhdGUgZmlsdGVyLCBuZXdGaWxlciB3aWxsIGJlIHBhc3NlZFxuICAgKiBjYWxsZWQgYnkgdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBuZXdGaWx0ZXJcbiAgICogQHJldHVybnMge29iamVjdH0gbGF5ZXJcbiAgICovXG4gIHVwZGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIG5ld0ZpbHRlcikge1xuICAgIE9iamVjdC52YWx1ZXModGhpcy52aXN1YWxDaGFubmVscykuZm9yRWFjaChjaGFubmVsID0+IHtcbiAgICAgIGNvbnN0IHtzY2FsZX0gPSBjaGFubmVsO1xuICAgICAgY29uc3Qgc2NhbGVUeXBlID0gdGhpcy5jb25maWdbc2NhbGVdO1xuICAgICAgLy8gb3JkaW5hbCBkb21haW4gaXMgYmFzZWQgb24gYWxsRGF0YSwgaWYgb25seSBmaWx0ZXIgY2hhbmdlZFxuICAgICAgLy8gbm8gbmVlZCB0byB1cGRhdGUgb3JkaW5hbCBkb21haW5cbiAgICAgIGlmICghbmV3RmlsdGVyIHx8IHNjYWxlVHlwZSAhPT0gU0NBTEVfVFlQRVMub3JkaW5hbCkge1xuICAgICAgICBjb25zdCB7ZG9tYWlufSA9IGNoYW5uZWw7XG4gICAgICAgIGNvbnN0IHVwZGF0ZWREb21haW4gPSB0aGlzLmNhbGN1bGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIGNoYW5uZWwpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tkb21haW5dOiB1cGRhdGVkRG9tYWlufSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSB2aXN1YWwgY2hhbm5lbCBmaWVsZCBhbmQgc2NhbGVzIGJhc2VkIG9uIHN1cHBvcnRlZCBmaWVsZCAmIHNjYWxlIHR5cGVcbiAgICogQHBhcmFtIGNoYW5uZWxcbiAgICovXG4gIHZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKSB7XG4gICAgdGhpcy52YWxpZGF0ZUZpZWxkVHlwZShjaGFubmVsKTtcbiAgICB0aGlzLnZhbGlkYXRlU2NhbGUoY2hhbm5lbCk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgZmllbGQgdHlwZSBiYXNlZCBvbiBjaGFubmVsU2NhbGVUeXBlXG4gICAqL1xuICB2YWxpZGF0ZUZpZWxkVHlwZShjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBjaGFubmVsU2NhbGVUeXBlLCBzdXBwb3J0ZWRGaWVsZFR5cGVzfSA9IHZpc3VhbENoYW5uZWw7XG5cbiAgICBpZiAodGhpcy5jb25maWdbZmllbGRdKSB7XG4gICAgICAvLyBpZiBmaWVsZCBpcyBzZWxlY3RlZCwgY2hlY2sgaWYgZmllbGQgdHlwZSBpcyBzdXBwb3J0ZWRcbiAgICAgIGNvbnN0IGNoYW5uZWxTdXBwb3J0ZWRGaWVsZFR5cGVzID0gc3VwcG9ydGVkRmllbGRUeXBlcyB8fCBDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFNbY2hhbm5lbFNjYWxlVHlwZV07XG5cbiAgICAgIGlmICghY2hhbm5lbFN1cHBvcnRlZEZpZWxkVHlwZXMuaW5jbHVkZXModGhpcy5jb25maWdbZmllbGRdLnR5cGUpKSB7XG4gICAgICAgIC8vIGZpZWxkIHR5cGUgaXMgbm90IHN1cHBvcnRlZCwgc2V0IGl0IGJhY2sgdG8gbnVsbFxuICAgICAgICAvLyBzZXQgc2NhbGUgYmFjayB0byBkZWZhdWx0XG4gICAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tmaWVsZF06IG51bGx9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgc2NhbGUgdHlwZSBiYXNlZCBvbiBhZ2dyZWdhdGlvblxuICAgKi9cbiAgdmFsaWRhdGVTY2FsZShjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge3NjYWxlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgaWYgKCFzY2FsZSkge1xuICAgICAgLy8gdmlzdWFsQ2hhbm5lbCBkb2Vzbid0IGhhdmUgc2NhbGVcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2NhbGVPcHRpb25zID0gdGhpcy5nZXRTY2FsZU9wdGlvbnMoY2hhbm5lbCk7XG4gICAgLy8gY2hlY2sgaWYgY3VycmVudCBzZWxlY3RlZCBzY2FsZSBpc1xuICAgIC8vIHN1cHBvcnRlZCwgaWYgbm90LCBjaGFuZ2UgdG8gZGVmYXVsdFxuICAgIGlmICghc2NhbGVPcHRpb25zLmluY2x1ZGVzKHRoaXMuY29uZmlnW3NjYWxlXSkpIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tzY2FsZV06IHNjYWxlT3B0aW9uc1swXX0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc2NhbGUgb3B0aW9ucyBiYXNlZCBvbiBjdXJyZW50IGZpZWxkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG4gIGdldFNjYWxlT3B0aW9ucyhjaGFubmVsKSB7XG4gICAgY29uc3QgdmlzdWFsQ2hhbm5lbCA9IHRoaXMudmlzdWFsQ2hhbm5lbHNbY2hhbm5lbF07XG4gICAgY29uc3Qge2ZpZWxkLCBzY2FsZSwgY2hhbm5lbFNjYWxlVHlwZX0gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnW2ZpZWxkXSA/XG4gICAgICBGSUVMRF9PUFRTW3RoaXMuY29uZmlnW2ZpZWxkXS50eXBlXS5zY2FsZVtjaGFubmVsU2NhbGVUeXBlXSA6XG4gICAgICBbdGhpcy5nZXREZWZhdWx0TGF5ZXJDb25maWcoKVtzY2FsZV1dO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKGRhdGFzZXQsIGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcblxuICAgIHRoaXMudmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpO1xuICAgICAgLy8gY2FsY3VsYXRlIGxheWVyIGNoYW5uZWwgZG9tYWluXG4gICAgY29uc3QgdXBkYXRlZERvbWFpbiA9IHRoaXMuY2FsY3VsYXRlTGF5ZXJEb21haW4oZGF0YXNldCwgdmlzdWFsQ2hhbm5lbCk7XG5cbiAgICB0aGlzLnVwZGF0ZUxheWVyQ29uZmlnKHtbdmlzdWFsQ2hhbm5lbC5kb21haW5dOiB1cGRhdGVkRG9tYWlufSk7XG4gIH1cblxuICBjYWxjdWxhdGVMYXllckRvbWFpbihkYXRhc2V0LCB2aXN1YWxDaGFubmVsKSB7XG4gICAgY29uc3Qge2FsbERhdGEsIGZpbHRlcmVkSW5kZXhGb3JEb21haW59ID0gZGF0YXNldDtcbiAgICBjb25zdCBkZWZhdWx0RG9tYWluID0gWzAsIDFdO1xuICAgIGNvbnN0IHtzY2FsZX0gPSB2aXN1YWxDaGFubmVsO1xuICAgIGNvbnN0IHNjYWxlVHlwZSA9IHRoaXMuY29uZmlnW3NjYWxlXTtcblxuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5jb25maWdbdmlzdWFsQ2hhbm5lbC5maWVsZF07XG4gICAgaWYgKCFmaWVsZCkge1xuICAgICAgLy8gaWYgY29sb3JGaWVsZCBvciBzaXplRmllbGQgd2VyZSBzZXQgYmFjayB0byBudWxsXG4gICAgICByZXR1cm4gZGVmYXVsdERvbWFpbjtcbiAgICB9XG5cbiAgICBpZiAoIVNDQUxFX1RZUEVTW3NjYWxlVHlwZV0pIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoYHNjYWxlIHR5cGUgJHtzY2FsZVR5cGV9IG5vdCBzdXBwb3J0ZWRgKTtcbiAgICAgIHJldHVybiBkZWZhdWx0RG9tYWluO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHJlZmFjdG9yIHRvIGFkZCB2YWx1ZUFjY2Vzc29yIHRvIGZpZWxkXG4gICAgY29uc3QgZmllbGRJZHggPSBmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxO1xuICAgIGNvbnN0IGlzVGltZSA9IGZpZWxkLnR5cGUgPT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXA7XG4gICAgY29uc3QgdmFsdWVBY2Nlc3NvciA9IG1heWJlVG9EYXRlLmJpbmQoXG4gICAgICBudWxsLFxuICAgICAgaXNUaW1lLFxuICAgICAgZmllbGRJZHgsXG4gICAgICBmaWVsZC5mb3JtYXRcbiAgICApO1xuICAgIGNvbnN0IGluZGV4VmFsdWVBY2Nlc3NvciA9IGkgPT4gdmFsdWVBY2Nlc3NvcihhbGxEYXRhW2ldKTtcblxuICAgIGNvbnN0IHNvcnRGdW5jdGlvbiA9IGdldFNvcnRpbmdGdW5jdGlvbihmaWVsZC50eXBlKTtcblxuICAgIHN3aXRjaCAoc2NhbGVUeXBlKSB7XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLm9yZGluYWw6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnBvaW50OlxuICAgICAgICAvLyBkbyBub3QgcmVjYWxjdWxhdGUgb3JkaW5hbCBkb21haW4gYmFzZWQgb24gZmlsdGVyZWQgZGF0YVxuICAgICAgICAvLyBkb24ndCBuZWVkIHRvIHVwZGF0ZSBvcmRpbmFsIGRvbWFpbiBldmVyeSB0aW1lXG4gICAgICAgIHJldHVybiBnZXRPcmRpbmFsRG9tYWluKGFsbERhdGEsIHZhbHVlQWNjZXNzb3IpO1xuXG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnF1YW50aWxlOlxuICAgICAgICByZXR1cm4gZ2V0UXVhbnRpbGVEb21haW4oZmlsdGVyZWRJbmRleEZvckRvbWFpbiwgaW5kZXhWYWx1ZUFjY2Vzc29yLCBzb3J0RnVuY3Rpb24pO1xuXG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnF1YW50aXplOlxuICAgICAgY2FzZSBTQ0FMRV9UWVBFUy5saW5lYXI6XG4gICAgICBjYXNlIFNDQUxFX1RZUEVTLnNxcnQ6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZ2V0TGluZWFyRG9tYWluKGZpbHRlcmVkSW5kZXhGb3JEb21haW4sIGluZGV4VmFsdWVBY2Nlc3Nvcik7XG4gICAgfVxuICB9XG5cbiAgaXNMYXllckhvdmVyZWQob2JqZWN0SW5mbykge1xuICAgIHJldHVybiAoXG4gICAgICBvYmplY3RJbmZvICYmXG4gICAgICBvYmplY3RJbmZvLmxheWVyICYmXG4gICAgICBvYmplY3RJbmZvLnBpY2tlZCAmJlxuICAgICAgb2JqZWN0SW5mby5sYXllci5wcm9wcy5pZCA9PT0gdGhpcy5pZFxuICAgICk7XG4gIH1cblxuICBnZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSwgZml4ZWRSYWRpdXMpIHtcbiAgICBjb25zdCByYWRpdXNDaGFubmVsID0gT2JqZWN0LnZhbHVlcyh0aGlzLnZpc3VhbENoYW5uZWxzKS5maW5kKFxuICAgICAgdmMgPT4gdmMucHJvcGVydHkgPT09ICdyYWRpdXMnXG4gICAgKTtcblxuICAgIGlmICghcmFkaXVzQ2hhbm5lbCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuXG4gICAgY29uc3QgZmllbGQgPSByYWRpdXNDaGFubmVsLmZpZWxkO1xuICAgIGNvbnN0IGZpeGVkID1cbiAgICAgIGZpeGVkUmFkaXVzID09PSB1bmRlZmluZWRcbiAgICAgICAgPyB0aGlzLmNvbmZpZy52aXNDb25maWcuZml4ZWRSYWRpdXNcbiAgICAgICAgOiBmaXhlZFJhZGl1cztcbiAgICBjb25zdCB7cmFkaXVzfSA9IHRoaXMuY29uZmlnLnZpc0NvbmZpZztcblxuICAgIHJldHVybiBmaXhlZFxuICAgICAgPyAxXG4gICAgICA6ICh0aGlzLmNvbmZpZ1tmaWVsZF0gPyAxIDogcmFkaXVzKSAqIHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gIH1cblxuICBzaG91bGRDYWxjdWxhdGVMYXllckRhdGEocHJvcHMpIHtcbiAgICByZXR1cm4gcHJvcHMuc29tZShwID0+ICF0aGlzLm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcy5pbmNsdWRlcyhwKSk7XG4gIH1cbn1cbiJdfQ==