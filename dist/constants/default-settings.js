"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAP_CONFIG_DESCRIPTION = exports.DISCLAIMER = exports.TOKEN_MISUSE_WARNING = exports.DEFAULT_NOTIFICATION_TOPICS = exports.DEFAULT_NOTIFICATION_TYPES = exports.DEFAULT_NOTIFICATION_MESSAGE = exports.DEFAULT_UUID_COUNT = exports.EXPORT_MAP_FORMAT_OPTIONS = exports.EXPORT_MAP_FORMAT = exports.EXPORT_DATA_TYPE_OPTIONS = exports.EXPORT_DATA_TYPE = exports.DEFAULT_EXPORT_IMAGE_NAME = exports.RESOLUTION_OPTIONS = exports.RATIO_OPTIONS = exports.RATIOS = exports.RESOLUTIONS = exports.MAX_DEFAULT_TOOLTIPS = exports.LAYER_BLENDINGS = exports.NO_VALUE_COLOR = exports.DEFAULT_LIGHT_SETTINGS = exports.DEFAULT_TOOLTIP_FIELDS = exports.DEFAULT_LAYER_COLOR = exports.LAYER_TYPES = exports.CHANNEL_SCALE_SUPPORTED_FIELDS = exports.FIELD_OPTS = exports.DEFAULT_AGGREGATION = exports.notSupportAggrOpts = exports.notSupportedScaleOpts = exports.ordinalFieldAggrScaleFunctions = exports.ordinalFieldScaleFunctions = exports.linearFieldAggrScaleFunctions = exports.linearFieldScaleFunctions = exports.AGGREGATION_TYPES = exports.CHANNEL_SCALES = exports.FIELD_DISPLAY_FORMAT = exports.defaultFormat = exports.FILED_TYPE_DISPLAY = exports.FIELD_COLORS = exports.HIGHLIGH_COLOR_3D = exports.ALL_FIELD_TYPES = exports.SCALE_FUNC = exports.SCALE_TYPES = exports.TRIP_ARC_FIELDS = exports.TRIP_POINT_FIELDS = exports.ICON_FIELDS = exports.GEOJSON_FIELDS = exports.DEFAULT_MAP_STYLES = exports.DEFAULT_LAYER_GROUPS = exports.PANELS = exports.THEME = exports.DIMENSIONS = exports.KEPLER_GL_WEBSITE = exports.KEPLER_GL_VERSION = exports.KEPLER_GL_NAME = exports.EXPORT_MAP_ID = exports.ADD_MAP_STYLE_ID = exports.EXPORT_DATA_ID = exports.EXPORT_IMAGE_ID = exports.ADD_DATA_ID = exports.DELETE_DATA_ID = exports.DATA_TABLE_ID = exports.ICON_PREFIX = exports.CLOUDFRONT = exports.ACTION_PREFIX = void 0;

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _keymirror = _interopRequireDefault(require("keymirror"));

var _icons = require("../components/common/icons");

var _FILED_TYPE_DISPLAY, _FIELD_DISPLAY_FORMAT, _linearFieldScaleFunc, _CHANNEL_SCALES$color, _CHANNEL_SCALES$sizeA, _linearFieldAggrScale, _ordinalFieldScaleFun, _CHANNEL_SCALES$color2, _ordinalFieldAggrScal, _notSupportedScaleOpt, _notSupportAggrOpts, _DEFAULT_AGGREGATION;

var ACTION_PREFIX = '@@kepler.gl/';
exports.ACTION_PREFIX = ACTION_PREFIX;
var CLOUDFRONT = 'https://d1a3f4spazzrp4.cloudfront.net/kepler.gl';
exports.CLOUDFRONT = CLOUDFRONT;
var ICON_PREFIX = "".concat(CLOUDFRONT, "/geodude"); // Modal Ids

/**
 * Modal id: data table
 * @constant
 * @type {string}
 * @public
 */

exports.ICON_PREFIX = ICON_PREFIX;
var DATA_TABLE_ID = 'dataTable';
/**
 * Modal id: delete dataset confirm dialog
 * @constant
 * @type {string}
 * @public
 */

exports.DATA_TABLE_ID = DATA_TABLE_ID;
var DELETE_DATA_ID = 'deleteData';
/**
 * Modal id: add data modal
 * @constant
 * @type {string}
 * @public
 */

exports.DELETE_DATA_ID = DELETE_DATA_ID;
var ADD_DATA_ID = 'addData';
/**
 * Modal id: export image modal
 * @constant
 * @type {string}
 * @public
 */

exports.ADD_DATA_ID = ADD_DATA_ID;
var EXPORT_IMAGE_ID = 'exportImage';
/**
 * Modal id: export data modal
 * @constant
 * @type {string}
 * @public
 */

exports.EXPORT_IMAGE_ID = EXPORT_IMAGE_ID;
var EXPORT_DATA_ID = 'exportData';
/**
 * Modal id: add custom map style modal
 * @constant
 * @type {string}
 * @public
 */

exports.EXPORT_DATA_ID = EXPORT_DATA_ID;
var ADD_MAP_STYLE_ID = 'addMapStyle';
/**
 * Modal id: export map modal
 * @constant
 * @type {string}
 * @public
 */

exports.ADD_MAP_STYLE_ID = ADD_MAP_STYLE_ID;
var EXPORT_MAP_ID = 'exportMap';
exports.EXPORT_MAP_ID = EXPORT_MAP_ID;
var KEPLER_GL_NAME = 'kepler.gl'; // __PACKAGE_VERSION__ is automatically injected by Babel/Webpack during the building process
// Since we are injecting this during the build process with babel
// while developing VERSION is not defined, we capture the exception and return
// an empty string which will allow us to retrieve the latest umd version

exports.KEPLER_GL_NAME = KEPLER_GL_NAME;
var KEPLER_GL_VERSION = "1.0.0";
exports.KEPLER_GL_VERSION = KEPLER_GL_VERSION;
var KEPLER_GL_WEBSITE = 'http://kepler.gl/';
exports.KEPLER_GL_WEBSITE = KEPLER_GL_WEBSITE;
var DIMENSIONS = {
  sidePanel: {
    width: 300,
    margin: {
      top: 20,
      left: 20,
      bottom: 30,
      right: 20
    },
    headerHeight: 96
  },
  mapControl: {
    width: 204,
    padding: 12
  }
};
/**
 * Theme name that can be passed to `KeplerGl` `prop.theme`.
 * Available themes are `Theme.light` and `Theme.dark`. Default theme is `Theme.dark`
 * @constant
 * @type {string}
 * @public
 * @example
 * ```js
 * const Map = () => <KeplerGl theme={THEME.light} id="map"/>
 * ```
 */

exports.DIMENSIONS = DIMENSIONS;
var THEME = (0, _keymirror["default"])({
  light: null,
  dark: null
});
exports.THEME = THEME;
var PANELS = [{
  id: 'layer',
  label: 'Layers',
  iconComponent: _icons.Layers
}, {
  id: 'filter',
  label: 'Filters',
  iconComponent: _icons.FilterFunnel
}, {
  id: 'interaction',
  label: 'Interactions',
  iconComponent: _icons.CursorClick
}, {
  id: 'map',
  label: 'Base map',
  iconComponent: _icons.Settings
}]; // MAP STYLES

exports.PANELS = PANELS;
var DEFAULT_LAYER_GROUPS = [{
  slug: 'label',
  filter: function filter(_ref) {
    var id = _ref.id;
    return id.match(/(?=(label|place-|poi-))/);
  },
  defaultVisibility: true
}, {
  slug: 'road',
  filter: function filter(_ref2) {
    var id = _ref2.id;
    return id.match(/(?=(road|railway|tunnel|street|bridge))(?!.*label)/);
  },
  defaultVisibility: true
}, {
  slug: 'border',
  filter: function filter(_ref3) {
    var id = _ref3.id;
    return id.match(/border|boundaries/);
  },
  defaultVisibility: false
}, {
  slug: 'building',
  filter: function filter(_ref4) {
    var id = _ref4.id;
    return id.match(/building/);
  },
  defaultVisibility: true
}, {
  slug: 'water',
  filter: function filter(_ref5) {
    var id = _ref5.id;
    return id.match(/(?=(water|stream|ferry))/);
  },
  defaultVisibility: true
}, {
  slug: 'land',
  filter: function filter(_ref6) {
    var id = _ref6.id;
    return id.match(/(?=(parks|landcover|industrial|sand|hillshade))/);
  },
  defaultVisibility: true
}, {
  slug: '3d building',
  filter: function filter() {
    return false;
  },
  defaultVisibility: false
}];
exports.DEFAULT_LAYER_GROUPS = DEFAULT_LAYER_GROUPS;
var DEFAULT_MAP_STYLES = [{
  id: 'dark',
  label: 'Dark',
  url: 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09',
  icon: "".concat(ICON_PREFIX, "/UBER_DARK_V2.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}, {
  id: 'light',
  label: 'Light',
  url: 'mapbox://styles/uberdata/cjoqb9j339k1f2sl9t5ic5bn4',
  icon: "".concat(ICON_PREFIX, "/UBER_LIGHT_V2.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}, {
  id: 'muted',
  label: 'Muted Light',
  url: 'mapbox://styles/uberdata/cjfyl03kp1tul2smf5v2tbdd4',
  icon: "".concat(ICON_PREFIX, "/UBER_MUTED_LIGHT.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}, {
  id: 'muted_night',
  label: 'Muted Night',
  url: 'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs',
  icon: "".concat(ICON_PREFIX, "/UBER_MUTED_NIGHT.png"),
  layerGroups: DEFAULT_LAYER_GROUPS
}];
exports.DEFAULT_MAP_STYLES = DEFAULT_MAP_STYLES;
var GEOJSON_FIELDS = {
  geojson: ['_geojson', 'all_points', 'geojson']
};
exports.GEOJSON_FIELDS = GEOJSON_FIELDS;
var ICON_FIELDS = {
  icon: ['icon']
};
exports.ICON_FIELDS = ICON_FIELDS;
var TRIP_POINT_FIELDS = [['lat', 'lng'], ['lat', 'lon'], ['latitude', 'longitude']];
exports.TRIP_POINT_FIELDS = TRIP_POINT_FIELDS;
var TRIP_ARC_FIELDS = {
  lat0: 'begintrip',
  lng0: 'begintrip',
  lat1: 'dropoff',
  lng1: 'dropoff'
};
exports.TRIP_ARC_FIELDS = TRIP_ARC_FIELDS;
var SCALE_TYPES = (0, _keymirror["default"])({
  ordinal: null,
  quantile: null,
  quantize: null,
  linear: null,
  // for radius
  sqrt: null,
  // ordinal domain to linear range
  point: null
});
exports.SCALE_TYPES = SCALE_TYPES;
var SCALE_FUNC = {
  linear: require('d3-scale').scaleLinear,
  quantize: require('d3-scale').scaleQuantize,
  quantile: require('d3-scale').scaleQuantile,
  ordinal: require('d3-scale').scaleOrdinal,
  sqrt: require('d3-scale').scaleSqrt,
  point: require('d3-scale').scalePoint
};
exports.SCALE_FUNC = SCALE_FUNC;
var ALL_FIELD_TYPES = (0, _keymirror["default"])({
  "boolean": null,
  date: null,
  geojson: null,
  integer: null,
  real: null,
  string: null,
  timestamp: null,
  point: null
});
exports.ALL_FIELD_TYPES = ALL_FIELD_TYPES;
var ORANGE = '248, 194, 28';
var PINK = '231, 189, 194';
var PURPLE = '160, 106, 206';
var BLUE = '140, 210, 205';
var BLUE2 = '106, 160, 206';
var BLUE3 = '0, 172, 237';
var GREEN = '106, 160, 56';
var RED = '237, 88, 106';
var HIGHLIGH_COLOR_3D = [255, 255, 255, 60];
exports.HIGHLIGH_COLOR_3D = HIGHLIGH_COLOR_3D;
var FIELD_COLORS = {
  "default": RED
};
exports.FIELD_COLORS = FIELD_COLORS;
var FILED_TYPE_DISPLAY = (_FILED_TYPE_DISPLAY = {}, (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES["boolean"], {
  label: 'bool',
  color: PINK
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.date, {
  label: 'date',
  color: PURPLE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.geojson, {
  label: 'geo',
  color: BLUE2
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.integer, {
  label: 'int',
  color: ORANGE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.real, {
  label: 'float',
  color: ORANGE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.string, {
  label: 'string',
  color: BLUE
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.timestamp, {
  label: 'time',
  color: GREEN
}), (0, _defineProperty2["default"])(_FILED_TYPE_DISPLAY, ALL_FIELD_TYPES.point, {
  label: 'point',
  color: BLUE3
}), _FILED_TYPE_DISPLAY);
exports.FILED_TYPE_DISPLAY = FILED_TYPE_DISPLAY;

var defaultFormat = function defaultFormat(d) {
  return d;
};

exports.defaultFormat = defaultFormat;
var FIELD_DISPLAY_FORMAT = (_FIELD_DISPLAY_FORMAT = {}, (0, _defineProperty2["default"])(_FIELD_DISPLAY_FORMAT, ALL_FIELD_TYPES.string, defaultFormat), (0, _defineProperty2["default"])(_FIELD_DISPLAY_FORMAT, ALL_FIELD_TYPES.timestamp, defaultFormat), (0, _defineProperty2["default"])(_FIELD_DISPLAY_FORMAT, ALL_FIELD_TYPES.integer, defaultFormat), (0, _defineProperty2["default"])(_FIELD_DISPLAY_FORMAT, ALL_FIELD_TYPES["boolean"], function (d) {
  return String(d);
}), (0, _defineProperty2["default"])(_FIELD_DISPLAY_FORMAT, ALL_FIELD_TYPES.date, defaultFormat), (0, _defineProperty2["default"])(_FIELD_DISPLAY_FORMAT, ALL_FIELD_TYPES.geojson, defaultFormat), _FIELD_DISPLAY_FORMAT);
exports.FIELD_DISPLAY_FORMAT = FIELD_DISPLAY_FORMAT;
var CHANNEL_SCALES = (0, _keymirror["default"])({
  color: null,
  radius: null,
  size: null,
  colorAggr: null,
  sizeAggr: null
});
exports.CHANNEL_SCALES = CHANNEL_SCALES;
var AGGREGATION_TYPES = {
  // default
  count: 'count',
  // linear
  average: 'average',
  maximum: 'maximum',
  minimum: 'minimum',
  median: 'median',
  sum: 'sum',
  // ordinal
  mode: 'mode',
  countUnique: 'count unique'
};
exports.AGGREGATION_TYPES = AGGREGATION_TYPES;
var linearFieldScaleFunctions = (_linearFieldScaleFunc = {}, (0, _defineProperty2["default"])(_linearFieldScaleFunc, CHANNEL_SCALES.color, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_linearFieldScaleFunc, CHANNEL_SCALES.radius, [SCALE_TYPES.sqrt]), (0, _defineProperty2["default"])(_linearFieldScaleFunc, CHANNEL_SCALES.size, [SCALE_TYPES.linear]), _linearFieldScaleFunc);
exports.linearFieldScaleFunctions = linearFieldScaleFunctions;
var linearFieldAggrScaleFunctions = (_linearFieldAggrScale = {}, (0, _defineProperty2["default"])(_linearFieldAggrScale, CHANNEL_SCALES.colorAggr, (_CHANNEL_SCALES$color = {}, (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.average, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.maximum, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.minimum, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.median, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color, AGGREGATION_TYPES.sum, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), _CHANNEL_SCALES$color)), (0, _defineProperty2["default"])(_linearFieldAggrScale, CHANNEL_SCALES.sizeAggr, (_CHANNEL_SCALES$sizeA = {}, (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.average, [SCALE_TYPES.linear]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.maximum, [SCALE_TYPES.linear]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.minimum, [SCALE_TYPES.linear]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.median, [SCALE_TYPES.linear]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$sizeA, AGGREGATION_TYPES.sum, [SCALE_TYPES.linear]), _CHANNEL_SCALES$sizeA)), _linearFieldAggrScale);
exports.linearFieldAggrScaleFunctions = linearFieldAggrScaleFunctions;
var ordinalFieldScaleFunctions = (_ordinalFieldScaleFun = {}, (0, _defineProperty2["default"])(_ordinalFieldScaleFun, CHANNEL_SCALES.color, [SCALE_TYPES.ordinal]), (0, _defineProperty2["default"])(_ordinalFieldScaleFun, CHANNEL_SCALES.radius, [SCALE_TYPES.point]), (0, _defineProperty2["default"])(_ordinalFieldScaleFun, CHANNEL_SCALES.size, [SCALE_TYPES.point]), _ordinalFieldScaleFun);
exports.ordinalFieldScaleFunctions = ordinalFieldScaleFunctions;
var ordinalFieldAggrScaleFunctions = (_ordinalFieldAggrScal = {}, (0, _defineProperty2["default"])(_ordinalFieldAggrScal, CHANNEL_SCALES.colorAggr, (_CHANNEL_SCALES$color2 = {}, (0, _defineProperty2["default"])(_CHANNEL_SCALES$color2, AGGREGATION_TYPES.mode, [SCALE_TYPES.ordinal]), (0, _defineProperty2["default"])(_CHANNEL_SCALES$color2, AGGREGATION_TYPES.countUnique, [SCALE_TYPES.quantize, SCALE_TYPES.quantile]), _CHANNEL_SCALES$color2)), (0, _defineProperty2["default"])(_ordinalFieldAggrScal, CHANNEL_SCALES.sizeAggr, {}), _ordinalFieldAggrScal);
exports.ordinalFieldAggrScaleFunctions = ordinalFieldAggrScaleFunctions;
var notSupportedScaleOpts = (_notSupportedScaleOpt = {}, (0, _defineProperty2["default"])(_notSupportedScaleOpt, CHANNEL_SCALES.color, []), (0, _defineProperty2["default"])(_notSupportedScaleOpt, CHANNEL_SCALES.radius, []), (0, _defineProperty2["default"])(_notSupportedScaleOpt, CHANNEL_SCALES.size, []), _notSupportedScaleOpt);
exports.notSupportedScaleOpts = notSupportedScaleOpts;
var notSupportAggrOpts = (_notSupportAggrOpts = {}, (0, _defineProperty2["default"])(_notSupportAggrOpts, CHANNEL_SCALES.colorAggr, {}), (0, _defineProperty2["default"])(_notSupportAggrOpts, CHANNEL_SCALES.sizeAggr, {}), _notSupportAggrOpts);
/**
 * Default aggregation are based on ocunt
 */

exports.notSupportAggrOpts = notSupportAggrOpts;
var DEFAULT_AGGREGATION = (_DEFAULT_AGGREGATION = {}, (0, _defineProperty2["default"])(_DEFAULT_AGGREGATION, CHANNEL_SCALES.colorAggr, (0, _defineProperty2["default"])({}, AGGREGATION_TYPES.count, [SCALE_TYPES.quantize, SCALE_TYPES.quantile])), (0, _defineProperty2["default"])(_DEFAULT_AGGREGATION, CHANNEL_SCALES.sizeAggr, (0, _defineProperty2["default"])({}, AGGREGATION_TYPES.count, [SCALE_TYPES.linear])), _DEFAULT_AGGREGATION);
/**
 * Define what type of scale operation is allowed on each type of fields
 */

exports.DEFAULT_AGGREGATION = DEFAULT_AGGREGATION;
var FIELD_OPTS = {
  string: {
    type: 'categorical',
    scale: (0, _objectSpread3["default"])({}, ordinalFieldScaleFunctions, ordinalFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      }
    }
  },
  real: {
    type: 'numerical',
    scale: (0, _objectSpread3["default"])({}, linearFieldScaleFunctions, linearFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      }
    }
  },
  timestamp: {
    type: 'time',
    scale: (0, _objectSpread3["default"])({}, linearFieldScaleFunctions, notSupportAggrOpts),
    format: {
      legend: function legend(d) {
        return d;
      }
    }
  },
  integer: {
    type: 'numerical',
    scale: (0, _objectSpread3["default"])({}, linearFieldScaleFunctions, linearFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      }
    }
  },
  "boolean": {
    type: 'boolean',
    scale: (0, _objectSpread3["default"])({}, ordinalFieldScaleFunctions, ordinalFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      }
    }
  },
  date: {
    scale: (0, _objectSpread3["default"])({}, ordinalFieldScaleFunctions, ordinalFieldAggrScaleFunctions),
    format: {
      legend: function legend(d) {
        return d;
      }
    }
  },
  geojson: {
    type: 'geometry',
    scale: (0, _objectSpread3["default"])({}, notSupportedScaleOpts, notSupportAggrOpts),
    format: {
      legend: function legend(d) {
        return '...';
      }
    }
  }
};
exports.FIELD_OPTS = FIELD_OPTS;
var CHANNEL_SCALE_SUPPORTED_FIELDS = Object.keys(CHANNEL_SCALES).reduce(function (accu, key) {
  return (0, _objectSpread3["default"])({}, accu, (0, _defineProperty2["default"])({}, key, Object.keys(FIELD_OPTS).filter(function (ft) {
    return Object.keys(FIELD_OPTS[ft].scale[key]).length;
  })));
}, {}); // TODO: shan delete use of LAYER_TYPES

exports.CHANNEL_SCALE_SUPPORTED_FIELDS = CHANNEL_SCALE_SUPPORTED_FIELDS;
var LAYER_TYPES = (0, _keymirror["default"])({
  point: null,
  arc: null,
  cluster: null,
  line: null,
  grid: null,
  geojson: null,
  icon: null,
  heatmap: null,
  hexagon: null
});
exports.LAYER_TYPES = LAYER_TYPES;
var DEFAULT_LAYER_COLOR = {
  tripArc: '#9226C6',
  begintrip_lat: '#1E96BE',
  dropoff_lat: '#FF991F',
  request_lat: '#52A353'
}; // let user pass in default tooltip fields

exports.DEFAULT_LAYER_COLOR = DEFAULT_LAYER_COLOR;
var DEFAULT_TOOLTIP_FIELDS = [];
exports.DEFAULT_TOOLTIP_FIELDS = DEFAULT_TOOLTIP_FIELDS;
var DEFAULT_LIGHT_SETTINGS = {
  lightsPosition: [-122.45, 37.66, 8000, -122.0, 38.0, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.3,
  lightsStrength: [0.9, 0.0, 0.8, 0.0],
  numberOfLights: 2
};
exports.DEFAULT_LIGHT_SETTINGS = DEFAULT_LIGHT_SETTINGS;
var NO_VALUE_COLOR = [147, 147, 147];
exports.NO_VALUE_COLOR = NO_VALUE_COLOR;
var LAYER_BLENDINGS = {
  additive: {
    blendFunc: ['SRC_ALPHA', 'DST_ALPHA'],
    blendEquation: 'FUNC_ADD'
  },
  normal: {
    // reference to
    // https://limnu.com/webgl-blending-youre-probably-wrong/
    blendFunc: ['SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA', 'ONE', 'ONE_MINUS_SRC_ALPHA'],
    blendEquation: ['FUNC_ADD', 'FUNC_ADD']
  },
  subtractive: {
    blendFunc: ['ONE', 'ONE_MINUS_DST_COLOR', 'SRC_ALPHA', 'DST_ALPHA'],
    blendEquation: ['FUNC_SUBTRACT', 'FUNC_ADD']
  }
};
exports.LAYER_BLENDINGS = LAYER_BLENDINGS;
var MAX_DEFAULT_TOOLTIPS = 5;
exports.MAX_DEFAULT_TOOLTIPS = MAX_DEFAULT_TOOLTIPS;
var RESOLUTIONS = (0, _keymirror["default"])({
  ONE_X: null,
  TWO_X: null
});
exports.RESOLUTIONS = RESOLUTIONS;
var RATIOS = (0, _keymirror["default"])({
  SCREEN: null,
  FOUR_BY_THREE: null,
  SIXTEEN_BY_NINE: null
});
exports.RATIOS = RATIOS;
var RATIO_OPTIONS = [{
  id: RATIOS.SCREEN,
  label: 'Original Screen',
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: screenH
    };
  }
}, {
  id: RATIOS.FOUR_BY_THREE,
  label: '4:3',
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: Math.round(screenW * 0.75)
    };
  }
}, {
  id: RATIOS.SIXTEEN_BY_NINE,
  label: '16:9',
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: Math.round(screenW * 0.5625)
    };
  }
}];
exports.RATIO_OPTIONS = RATIO_OPTIONS;
var RESOLUTION_OPTIONS = [{
  id: RESOLUTIONS.ONE_X,
  label: '1x',
  available: true,
  scale: 1,
  zoomOffset: Math.log2(1),
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW,
      height: screenH
    };
  }
}, {
  id: RESOLUTIONS.TWO_X,
  label: '2x',
  available: true,
  scale: 2,
  zoomOffset: Math.log2(2),
  getSize: function getSize(screenW, screenH) {
    return {
      width: screenW * 2,
      height: screenH * 2
    };
  }
}];
exports.RESOLUTION_OPTIONS = RESOLUTION_OPTIONS;
var DEFAULT_EXPORT_IMAGE_NAME = 'kepler-gl.png';
exports.DEFAULT_EXPORT_IMAGE_NAME = DEFAULT_EXPORT_IMAGE_NAME;
var EXPORT_DATA_TYPE = (0, _keymirror["default"])({
  CSV: null // SHAPEFILE: null,
  // JSON: null,
  // GEOJSON: null,
  // TOPOJSON: null

});
exports.EXPORT_DATA_TYPE = EXPORT_DATA_TYPE;
var EXPORT_DATA_TYPE_OPTIONS = [{
  id: EXPORT_DATA_TYPE.CSV,
  label: EXPORT_DATA_TYPE.CSV.toLowerCase(),
  available: true // {
  //   id: EXPORT_DATA_TYPE.SHAPEFILE,
  //   label: 'shapefile',
  //   available: false
  // },
  // {
  //   id: EXPORT_DATA_TYPE.JSON,
  //   label: 'json',
  //   available: false
  // },
  // {
  //   id: EXPORT_DATA_TYPE.GEOJSON,
  //   label: 'geojson',
  //   available: false
  // },
  // {
  //   id: EXPORT_DATA_TYPE.TOPOJSON,
  //   label: 'topojson',
  //   available: false
  // }

}]; // Export map types

exports.EXPORT_DATA_TYPE_OPTIONS = EXPORT_DATA_TYPE_OPTIONS;
var EXPORT_MAP_FORMAT = (0, _keymirror["default"])({
  HTML: null,
  JSON: null
}); // Export map options

exports.EXPORT_MAP_FORMAT = EXPORT_MAP_FORMAT;
var EXPORT_MAP_FORMAT_OPTIONS = Object.entries(EXPORT_MAP_FORMAT).map(function (entry) {
  return {
    id: entry[0],
    label: entry[1].toLowerCase(),
    available: true
  };
});
exports.EXPORT_MAP_FORMAT_OPTIONS = EXPORT_MAP_FORMAT_OPTIONS;
var DEFAULT_UUID_COUNT = 6;
exports.DEFAULT_UUID_COUNT = DEFAULT_UUID_COUNT;
var DEFAULT_NOTIFICATION_MESSAGE = 'MESSAGE_NOT_PROVIDED';
exports.DEFAULT_NOTIFICATION_MESSAGE = DEFAULT_NOTIFICATION_MESSAGE;
var DEFAULT_NOTIFICATION_TYPES = (0, _keymirror["default"])({
  info: null,
  error: null,
  warning: null,
  success: null
});
exports.DEFAULT_NOTIFICATION_TYPES = DEFAULT_NOTIFICATION_TYPES;
var DEFAULT_NOTIFICATION_TOPICS = (0, _keymirror["default"])({
  global: null,
  file: null
});
exports.DEFAULT_NOTIFICATION_TOPICS = DEFAULT_NOTIFICATION_TOPICS;
var TOKEN_MISUSE_WARNING = '* If you do not provide your own token, the map may fail to display at any time when we replace ours to avoid misuse. ';
exports.TOKEN_MISUSE_WARNING = TOKEN_MISUSE_WARNING;
var DISCLAIMER = 'You can change the Mapbox token later using the following instructions: ';
exports.DISCLAIMER = DISCLAIMER;
var MAP_CONFIG_DESCRIPTION = 'Map config will be included in the Json file. If you are using kepler.gl in your own app. You can copy this config and pass it to ';
exports.MAP_CONFIG_DESCRIPTION = MAP_CONFIG_DESCRIPTION;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5qcyJdLCJuYW1lcyI6WyJBQ1RJT05fUFJFRklYIiwiQ0xPVURGUk9OVCIsIklDT05fUFJFRklYIiwiREFUQV9UQUJMRV9JRCIsIkRFTEVURV9EQVRBX0lEIiwiQUREX0RBVEFfSUQiLCJFWFBPUlRfSU1BR0VfSUQiLCJFWFBPUlRfREFUQV9JRCIsIkFERF9NQVBfU1RZTEVfSUQiLCJFWFBPUlRfTUFQX0lEIiwiS0VQTEVSX0dMX05BTUUiLCJLRVBMRVJfR0xfVkVSU0lPTiIsIktFUExFUl9HTF9XRUJTSVRFIiwiRElNRU5TSU9OUyIsInNpZGVQYW5lbCIsIndpZHRoIiwibWFyZ2luIiwidG9wIiwibGVmdCIsImJvdHRvbSIsInJpZ2h0IiwiaGVhZGVySGVpZ2h0IiwibWFwQ29udHJvbCIsInBhZGRpbmciLCJUSEVNRSIsImxpZ2h0IiwiZGFyayIsIlBBTkVMUyIsImlkIiwibGFiZWwiLCJpY29uQ29tcG9uZW50IiwiTGF5ZXJzIiwiRmlsdGVyRnVubmVsIiwiQ3Vyc29yQ2xpY2siLCJTZXR0aW5ncyIsIkRFRkFVTFRfTEFZRVJfR1JPVVBTIiwic2x1ZyIsImZpbHRlciIsIm1hdGNoIiwiZGVmYXVsdFZpc2liaWxpdHkiLCJERUZBVUxUX01BUF9TVFlMRVMiLCJ1cmwiLCJpY29uIiwibGF5ZXJHcm91cHMiLCJHRU9KU09OX0ZJRUxEUyIsImdlb2pzb24iLCJJQ09OX0ZJRUxEUyIsIlRSSVBfUE9JTlRfRklFTERTIiwiVFJJUF9BUkNfRklFTERTIiwibGF0MCIsImxuZzAiLCJsYXQxIiwibG5nMSIsIlNDQUxFX1RZUEVTIiwib3JkaW5hbCIsInF1YW50aWxlIiwicXVhbnRpemUiLCJsaW5lYXIiLCJzcXJ0IiwicG9pbnQiLCJTQ0FMRV9GVU5DIiwicmVxdWlyZSIsInNjYWxlTGluZWFyIiwic2NhbGVRdWFudGl6ZSIsInNjYWxlUXVhbnRpbGUiLCJzY2FsZU9yZGluYWwiLCJzY2FsZVNxcnQiLCJzY2FsZVBvaW50IiwiQUxMX0ZJRUxEX1RZUEVTIiwiZGF0ZSIsImludGVnZXIiLCJyZWFsIiwic3RyaW5nIiwidGltZXN0YW1wIiwiT1JBTkdFIiwiUElOSyIsIlBVUlBMRSIsIkJMVUUiLCJCTFVFMiIsIkJMVUUzIiwiR1JFRU4iLCJSRUQiLCJISUdITElHSF9DT0xPUl8zRCIsIkZJRUxEX0NPTE9SUyIsIkZJTEVEX1RZUEVfRElTUExBWSIsImNvbG9yIiwiZGVmYXVsdEZvcm1hdCIsImQiLCJGSUVMRF9ESVNQTEFZX0ZPUk1BVCIsIlN0cmluZyIsIkNIQU5ORUxfU0NBTEVTIiwicmFkaXVzIiwic2l6ZSIsImNvbG9yQWdnciIsInNpemVBZ2dyIiwiQUdHUkVHQVRJT05fVFlQRVMiLCJjb3VudCIsImF2ZXJhZ2UiLCJtYXhpbXVtIiwibWluaW11bSIsIm1lZGlhbiIsInN1bSIsIm1vZGUiLCJjb3VudFVuaXF1ZSIsImxpbmVhckZpZWxkU2NhbGVGdW5jdGlvbnMiLCJsaW5lYXJGaWVsZEFnZ3JTY2FsZUZ1bmN0aW9ucyIsIm9yZGluYWxGaWVsZFNjYWxlRnVuY3Rpb25zIiwib3JkaW5hbEZpZWxkQWdnclNjYWxlRnVuY3Rpb25zIiwibm90U3VwcG9ydGVkU2NhbGVPcHRzIiwibm90U3VwcG9ydEFnZ3JPcHRzIiwiREVGQVVMVF9BR0dSRUdBVElPTiIsIkZJRUxEX09QVFMiLCJ0eXBlIiwic2NhbGUiLCJmb3JtYXQiLCJsZWdlbmQiLCJDSEFOTkVMX1NDQUxFX1NVUFBPUlRFRF9GSUVMRFMiLCJPYmplY3QiLCJrZXlzIiwicmVkdWNlIiwiYWNjdSIsImtleSIsImZ0IiwibGVuZ3RoIiwiTEFZRVJfVFlQRVMiLCJhcmMiLCJjbHVzdGVyIiwibGluZSIsImdyaWQiLCJoZWF0bWFwIiwiaGV4YWdvbiIsIkRFRkFVTFRfTEFZRVJfQ09MT1IiLCJ0cmlwQXJjIiwiYmVnaW50cmlwX2xhdCIsImRyb3BvZmZfbGF0IiwicmVxdWVzdF9sYXQiLCJERUZBVUxUX1RPT0xUSVBfRklFTERTIiwiREVGQVVMVF9MSUdIVF9TRVRUSU5HUyIsImxpZ2h0c1Bvc2l0aW9uIiwiYW1iaWVudFJhdGlvIiwiZGlmZnVzZVJhdGlvIiwic3BlY3VsYXJSYXRpbyIsImxpZ2h0c1N0cmVuZ3RoIiwibnVtYmVyT2ZMaWdodHMiLCJOT19WQUxVRV9DT0xPUiIsIkxBWUVSX0JMRU5ESU5HUyIsImFkZGl0aXZlIiwiYmxlbmRGdW5jIiwiYmxlbmRFcXVhdGlvbiIsIm5vcm1hbCIsInN1YnRyYWN0aXZlIiwiTUFYX0RFRkFVTFRfVE9PTFRJUFMiLCJSRVNPTFVUSU9OUyIsIk9ORV9YIiwiVFdPX1giLCJSQVRJT1MiLCJTQ1JFRU4iLCJGT1VSX0JZX1RIUkVFIiwiU0lYVEVFTl9CWV9OSU5FIiwiUkFUSU9fT1BUSU9OUyIsImdldFNpemUiLCJzY3JlZW5XIiwic2NyZWVuSCIsImhlaWdodCIsIk1hdGgiLCJyb3VuZCIsIlJFU09MVVRJT05fT1BUSU9OUyIsImF2YWlsYWJsZSIsInpvb21PZmZzZXQiLCJsb2cyIiwiREVGQVVMVF9FWFBPUlRfSU1BR0VfTkFNRSIsIkVYUE9SVF9EQVRBX1RZUEUiLCJDU1YiLCJFWFBPUlRfREFUQV9UWVBFX09QVElPTlMiLCJ0b0xvd2VyQ2FzZSIsIkVYUE9SVF9NQVBfRk9STUFUIiwiSFRNTCIsIkpTT04iLCJFWFBPUlRfTUFQX0ZPUk1BVF9PUFRJT05TIiwiZW50cmllcyIsIm1hcCIsImVudHJ5IiwiREVGQVVMVF9VVUlEX0NPVU5UIiwiREVGQVVMVF9OT1RJRklDQVRJT05fTUVTU0FHRSIsIkRFRkFVTFRfTk9USUZJQ0FUSU9OX1RZUEVTIiwiaW5mbyIsImVycm9yIiwid2FybmluZyIsInN1Y2Nlc3MiLCJERUZBVUxUX05PVElGSUNBVElPTl9UT1BJQ1MiLCJnbG9iYWwiLCJmaWxlIiwiVE9LRU5fTUlTVVNFX1dBUk5JTkciLCJESVNDTEFJTUVSIiwiTUFQX0NPTkZJR19ERVNDUklQVElPTiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUF5REE7Ozs7QUF2RE8sSUFBTUEsYUFBYSxH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RUFBRSxJQURtQztBQUV6Q0MsRUFBQUEsSUFBSSxFQUFFO0FBRm1DLENBQVYsQ0FBMUIsQyxDQUtQOzs7QUFDTyxJQUFNQyx5QkFBeUIsR0FBRzdELE1BQU0sQ0FBQzhELE9BQVAsQ0FBZUosaUJBQWYsRUFDdENLLEdBRHNDLENBQ2xDLFVBQUFDLEtBQUs7QUFBQSxTQUFLO0FBQ2J6SixJQUFBQSxFQUFFLEVBQUV5SixLQUFLLENBQUMsQ0FBRCxDQURJO0FBRWJ4SixJQUFBQSxLQUFLLEVBQUV3SixLQUFLLENBQUMsQ0FBRCxDQUFMLENBQVNQLFdBQVQsRUFGTTtBQUdiUCxJQUFBQSxTQUFTLEVBQUU7QUFIRSxHQUFMO0FBQUEsQ0FENkIsQ0FBbEM7O0FBT0EsSUFBTWUsa0JBQWtCLEdBQUcsQ0FBM0I7O0FBRUEsSUFBTUMsNEJBQTRCLEdBQUcsc0JBQXJDOztBQUVBLElBQU1DLDBCQUEwQixHQUFHLDJCQUFVO0FBQ2xEQyxFQUFBQSxJQUFJLEVBQUUsSUFENEM7QUFFbERDLEVBQUFBLEtBQUssRUFBRSxJQUYyQztBQUdsREMsRUFBQUEsT0FBTyxFQUFFLElBSHlDO0FBSWxEQyxFQUFBQSxPQUFPLEVBQUU7QUFKeUMsQ0FBVixDQUFuQzs7QUFPQSxJQUFNQywyQkFBMkIsR0FBRywyQkFBVTtBQUNuREMsRUFBQUEsTUFBTSxFQUFFLElBRDJDO0FBRW5EQyxFQUFBQSxJQUFJLEVBQUU7QUFGNkMsQ0FBVixDQUFwQzs7QUFLQSxJQUFNQyxvQkFBb0IsR0FBRyx3SEFBN0I7O0FBQ0EsSUFBTUMsVUFBVSxHQUFHLDBFQUFuQjs7QUFDQSxJQUFNQyxzQkFBc0IsR0FBRyxvSUFBL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQga2V5TWlycm9yIGZyb20gJ2tleW1pcnJvcic7XG5cbmV4cG9ydCBjb25zdCBBQ1RJT05fUFJFRklYID0gJ0BAa2VwbGVyLmdsLyc7XG5leHBvcnQgY29uc3QgQ0xPVURGUk9OVCA9ICdodHRwczovL2QxYTNmNHNwYXp6cnA0LmNsb3VkZnJvbnQubmV0L2tlcGxlci5nbCc7XG5leHBvcnQgY29uc3QgSUNPTl9QUkVGSVggPSBgJHtDTE9VREZST05UfS9nZW9kdWRlYDtcblxuLy8gTW9kYWwgSWRzXG4vKipcbiAqIE1vZGFsIGlkOiBkYXRhIHRhYmxlXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBEQVRBX1RBQkxFX0lEID0gJ2RhdGFUYWJsZSc7XG4vKipcbiAqIE1vZGFsIGlkOiBkZWxldGUgZGF0YXNldCBjb25maXJtIGRpYWxvZ1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgREVMRVRFX0RBVEFfSUQgPSAnZGVsZXRlRGF0YSc7XG4vKipcbiAqIE1vZGFsIGlkOiBhZGQgZGF0YSBtb2RhbFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgQUREX0RBVEFfSUQgPSAnYWRkRGF0YSc7XG4vKipcbiAqIE1vZGFsIGlkOiBleHBvcnQgaW1hZ2UgbW9kYWxcbiAqIEBjb25zdGFudFxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IEVYUE9SVF9JTUFHRV9JRCA9ICdleHBvcnRJbWFnZSc7XG4vKipcbiAqIE1vZGFsIGlkOiBleHBvcnQgZGF0YSBtb2RhbFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgRVhQT1JUX0RBVEFfSUQgPSAnZXhwb3J0RGF0YSc7XG4vKipcbiAqIE1vZGFsIGlkOiBhZGQgY3VzdG9tIG1hcCBzdHlsZSBtb2RhbFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgQUREX01BUF9TVFlMRV9JRCA9ICdhZGRNYXBTdHlsZSc7XG4vKipcbiAqIE1vZGFsIGlkOiBleHBvcnQgbWFwIG1vZGFsXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBFWFBPUlRfTUFQX0lEID0gJ2V4cG9ydE1hcCc7XG5cbmltcG9ydCB7XG4gIExheWVycyxcbiAgRmlsdGVyRnVubmVsLFxuICBTZXR0aW5ncyxcbiAgQ3Vyc29yQ2xpY2tcbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5leHBvcnQgY29uc3QgS0VQTEVSX0dMX05BTUUgPSAna2VwbGVyLmdsJztcblxuLy8gX19QQUNLQUdFX1ZFUlNJT05fXyBpcyBhdXRvbWF0aWNhbGx5IGluamVjdGVkIGJ5IEJhYmVsL1dlYnBhY2sgZHVyaW5nIHRoZSBidWlsZGluZyBwcm9jZXNzXG4vLyBTaW5jZSB3ZSBhcmUgaW5qZWN0aW5nIHRoaXMgZHVyaW5nIHRoZSBidWlsZCBwcm9jZXNzIHdpdGggYmFiZWxcbi8vIHdoaWxlIGRldmVsb3BpbmcgVkVSU0lPTiBpcyBub3QgZGVmaW5lZCwgd2UgY2FwdHVyZSB0aGUgZXhjZXB0aW9uIGFuZCByZXR1cm5cbi8vIGFuIGVtcHR5IHN0cmluZyB3aGljaCB3aWxsIGFsbG93IHVzIHRvIHJldHJpZXZlIHRoZSBsYXRlc3QgdW1kIHZlcnNpb25cbmV4cG9ydCBjb25zdCBLRVBMRVJfR0xfVkVSU0lPTiA9IFwiX19QQUNLQUdFX1ZFUlNJT05fX1wiO1xuZXhwb3J0IGNvbnN0IEtFUExFUl9HTF9XRUJTSVRFID0gJ2h0dHA6Ly9rZXBsZXIuZ2wvJztcblxuZXhwb3J0IGNvbnN0IERJTUVOU0lPTlMgPSB7XG4gIHNpZGVQYW5lbDoge1xuICAgIHdpZHRoOiAzMDAsXG4gICAgbWFyZ2luOiB7dG9wOiAyMCwgbGVmdDogMjAsIGJvdHRvbTogMzAsIHJpZ2h0OiAyMH0sXG4gICAgaGVhZGVySGVpZ2h0OiA5NlxuICB9LFxuICBtYXBDb250cm9sOiB7XG4gICAgd2lkdGg6IDIwNCxcbiAgICBwYWRkaW5nOiAxMlxuICB9XG59O1xuXG4vKipcbiAqIFRoZW1lIG5hbWUgdGhhdCBjYW4gYmUgcGFzc2VkIHRvIGBLZXBsZXJHbGAgYHByb3AudGhlbWVgLlxuICogQXZhaWxhYmxlIHRoZW1lcyBhcmUgYFRoZW1lLmxpZ2h0YCBhbmQgYFRoZW1lLmRhcmtgLiBEZWZhdWx0IHRoZW1lIGlzIGBUaGVtZS5kYXJrYFxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7c3RyaW5nfVxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGBgYGpzXG4gKiBjb25zdCBNYXAgPSAoKSA9PiA8S2VwbGVyR2wgdGhlbWU9e1RIRU1FLmxpZ2h0fSBpZD1cIm1hcFwiLz5cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgVEhFTUUgPSBrZXlNaXJyb3Ioe1xuICBsaWdodDogbnVsbCxcbiAgZGFyazogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBQQU5FTFMgPSBbXG4gIHtcbiAgICBpZDogJ2xheWVyJyxcbiAgICBsYWJlbDogJ0xheWVycycsXG4gICAgaWNvbkNvbXBvbmVudDogTGF5ZXJzXG4gIH0sXG4gIHtcbiAgICBpZDogJ2ZpbHRlcicsXG4gICAgbGFiZWw6ICdGaWx0ZXJzJyxcbiAgICBpY29uQ29tcG9uZW50OiBGaWx0ZXJGdW5uZWxcbiAgfSxcbiAge1xuICAgIGlkOiAnaW50ZXJhY3Rpb24nLFxuICAgIGxhYmVsOiAnSW50ZXJhY3Rpb25zJyxcbiAgICBpY29uQ29tcG9uZW50OiBDdXJzb3JDbGlja1xuICB9LFxuICB7XG4gICAgaWQ6ICdtYXAnLFxuICAgIGxhYmVsOiAnQmFzZSBtYXAnLFxuICAgIGljb25Db21wb25lbnQ6IFNldHRpbmdzXG4gIH1cbl07XG5cbi8vIE1BUCBTVFlMRVNcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTEFZRVJfR1JPVVBTID0gW1xuICB7XG4gICAgc2x1ZzogJ2xhYmVsJyxcbiAgICBmaWx0ZXI6ICh7aWR9KSA9PiBpZC5tYXRjaCgvKD89KGxhYmVsfHBsYWNlLXxwb2ktKSkvKSxcbiAgICBkZWZhdWx0VmlzaWJpbGl0eTogdHJ1ZVxuICB9LFxuICB7XG4gICAgc2x1ZzogJ3JvYWQnLFxuICAgIGZpbHRlcjogKHtpZH0pID0+IGlkLm1hdGNoKC8oPz0ocm9hZHxyYWlsd2F5fHR1bm5lbHxzdHJlZXR8YnJpZGdlKSkoPyEuKmxhYmVsKS8pLFxuICAgIGRlZmF1bHRWaXNpYmlsaXR5OiB0cnVlXG4gIH0sXG4gIHtcbiAgICBzbHVnOiAnYm9yZGVyJyxcbiAgICBmaWx0ZXI6ICh7aWR9KSA9PiBpZC5tYXRjaCgvYm9yZGVyfGJvdW5kYXJpZXMvKSxcbiAgICBkZWZhdWx0VmlzaWJpbGl0eTogZmFsc2VcbiAgfSxcbiAge1xuICAgIHNsdWc6ICdidWlsZGluZycsXG4gICAgZmlsdGVyOiAoe2lkfSkgPT4gaWQubWF0Y2goL2J1aWxkaW5nLyksXG4gICAgZGVmYXVsdFZpc2liaWxpdHk6IHRydWVcbiAgfSxcbiAge1xuICAgIHNsdWc6ICd3YXRlcicsXG4gICAgZmlsdGVyOiAoe2lkfSkgPT4gaWQubWF0Y2goLyg/PSh3YXRlcnxzdHJlYW18ZmVycnkpKS8pLFxuICAgIGRlZmF1bHRWaXNpYmlsaXR5OiB0cnVlXG4gIH0sXG4gIHtcbiAgICBzbHVnOiAnbGFuZCcsXG4gICAgZmlsdGVyOiAoe2lkfSkgPT4gaWQubWF0Y2goLyg/PShwYXJrc3xsYW5kY292ZXJ8aW5kdXN0cmlhbHxzYW5kfGhpbGxzaGFkZSkpLyksXG4gICAgZGVmYXVsdFZpc2liaWxpdHk6IHRydWVcbiAgfSxcbiAge1xuICAgIHNsdWc6ICczZCBidWlsZGluZycsXG4gICAgZmlsdGVyOiAoKSA9PiBmYWxzZSxcbiAgICBkZWZhdWx0VmlzaWJpbGl0eTogZmFsc2VcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFQX1NUWUxFUyA9IFtcbiAge1xuICAgIGlkOiAnZGFyaycsXG4gICAgbGFiZWw6ICdEYXJrJyxcbiAgICB1cmw6ICdtYXBib3g6Ly9zdHlsZXMvdWJlcmRhdGEvY2pvcWJiZjZsOWszMDJzbDk2dHl2a2EwOScsXG4gICAgaWNvbjogYCR7SUNPTl9QUkVGSVh9L1VCRVJfREFSS19WMi5wbmdgLFxuICAgIGxheWVyR3JvdXBzOiBERUZBVUxUX0xBWUVSX0dST1VQU1xuICB9LFxuICB7XG4gICAgaWQ6ICdsaWdodCcsXG4gICAgbGFiZWw6ICdMaWdodCcsXG4gICAgdXJsOiAnbWFwYm94Oi8vc3R5bGVzL3ViZXJkYXRhL2Nqb3FiOWozMzlrMWYyc2w5dDVpYzVibjQnLFxuICAgIGljb246IGAke0lDT05fUFJFRklYfS9VQkVSX0xJR0hUX1YyLnBuZ2AsXG4gICAgbGF5ZXJHcm91cHM6IERFRkFVTFRfTEFZRVJfR1JPVVBTXG4gIH0sXG4gIHtcbiAgICBpZDogJ211dGVkJyxcbiAgICBsYWJlbDogJ011dGVkIExpZ2h0JyxcbiAgICB1cmw6ICdtYXBib3g6Ly9zdHlsZXMvdWJlcmRhdGEvY2pmeWwwM2twMXR1bDJzbWY1djJ0YmRkNCcsXG4gICAgaWNvbjogYCR7SUNPTl9QUkVGSVh9L1VCRVJfTVVURURfTElHSFQucG5nYCxcbiAgICBsYXllckdyb3VwczogREVGQVVMVF9MQVlFUl9HUk9VUFNcbiAgfSxcbiAge1xuICAgIGlkOiAnbXV0ZWRfbmlnaHQnLFxuICAgIGxhYmVsOiAnTXV0ZWQgTmlnaHQnLFxuICAgIHVybDogJ21hcGJveDovL3N0eWxlcy91YmVyZGF0YS9jamZ4aGxpa21hajFiMnNveXpldm55d2dzJyxcbiAgICBpY29uOiBgJHtJQ09OX1BSRUZJWH0vVUJFUl9NVVRFRF9OSUdIVC5wbmdgLFxuICAgIGxheWVyR3JvdXBzOiBERUZBVUxUX0xBWUVSX0dST1VQU1xuICB9XG5dO1xuXG5leHBvcnQgY29uc3QgR0VPSlNPTl9GSUVMRFMgPSB7XG4gIGdlb2pzb246IFsnX2dlb2pzb24nLCAnYWxsX3BvaW50cycsICdnZW9qc29uJ11cbn07XG5cbmV4cG9ydCBjb25zdCBJQ09OX0ZJRUxEUyA9IHtcbiAgaWNvbjogWydpY29uJ11cbn07XG5cbmV4cG9ydCBjb25zdCBUUklQX1BPSU5UX0ZJRUxEUyA9IFtcbiAgWydsYXQnLCAnbG5nJ10sXG4gIFsnbGF0JywgJ2xvbiddLFxuICBbJ2xhdGl0dWRlJywgJ2xvbmdpdHVkZSddXG5dO1xuXG5leHBvcnQgY29uc3QgVFJJUF9BUkNfRklFTERTID0ge1xuICBsYXQwOiAnYmVnaW50cmlwJyxcbiAgbG5nMDogJ2JlZ2ludHJpcCcsXG4gIGxhdDE6ICdkcm9wb2ZmJyxcbiAgbG5nMTogJ2Ryb3BvZmYnXG59O1xuXG5leHBvcnQgY29uc3QgU0NBTEVfVFlQRVMgPSBrZXlNaXJyb3Ioe1xuICBvcmRpbmFsOiBudWxsLFxuICBxdWFudGlsZTogbnVsbCxcbiAgcXVhbnRpemU6IG51bGwsXG4gIGxpbmVhcjogbnVsbCxcblxuICAvLyBmb3IgcmFkaXVzXG4gIHNxcnQ6IG51bGwsXG4gIC8vIG9yZGluYWwgZG9tYWluIHRvIGxpbmVhciByYW5nZVxuICBwb2ludDogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBTQ0FMRV9GVU5DID0ge1xuICBsaW5lYXI6IHJlcXVpcmUoJ2QzLXNjYWxlJykuc2NhbGVMaW5lYXIsXG4gIHF1YW50aXplOiByZXF1aXJlKCdkMy1zY2FsZScpLnNjYWxlUXVhbnRpemUsXG4gIHF1YW50aWxlOiByZXF1aXJlKCdkMy1zY2FsZScpLnNjYWxlUXVhbnRpbGUsXG4gIG9yZGluYWw6IHJlcXVpcmUoJ2QzLXNjYWxlJykuc2NhbGVPcmRpbmFsLFxuICBzcXJ0OiByZXF1aXJlKCdkMy1zY2FsZScpLnNjYWxlU3FydCxcbiAgcG9pbnQ6IHJlcXVpcmUoJ2QzLXNjYWxlJykuc2NhbGVQb2ludFxufTtcblxuZXhwb3J0IGNvbnN0IEFMTF9GSUVMRF9UWVBFUyA9IGtleU1pcnJvcih7XG4gIGJvb2xlYW46IG51bGwsXG4gIGRhdGU6IG51bGwsXG4gIGdlb2pzb246IG51bGwsXG4gIGludGVnZXI6IG51bGwsXG4gIHJlYWw6IG51bGwsXG4gIHN0cmluZzogbnVsbCxcbiAgdGltZXN0YW1wOiBudWxsLFxuICBwb2ludDogbnVsbFxufSk7XG5cbmNvbnN0IE9SQU5HRSA9ICcyNDgsIDE5NCwgMjgnO1xuY29uc3QgUElOSyA9ICcyMzEsIDE4OSwgMTk0JztcbmNvbnN0IFBVUlBMRSA9ICcxNjAsIDEwNiwgMjA2JztcbmNvbnN0IEJMVUUgPSAnMTQwLCAyMTAsIDIwNSc7XG5jb25zdCBCTFVFMiA9ICcxMDYsIDE2MCwgMjA2JztcbmNvbnN0IEJMVUUzID0gJzAsIDE3MiwgMjM3JztcbmNvbnN0IEdSRUVOID0gJzEwNiwgMTYwLCA1Nic7XG5jb25zdCBSRUQgPSAnMjM3LCA4OCwgMTA2JztcblxuZXhwb3J0IGNvbnN0IEhJR0hMSUdIX0NPTE9SXzNEID0gWzI1NSwgMjU1LCAyNTUsIDYwXTtcblxuZXhwb3J0IGNvbnN0IEZJRUxEX0NPTE9SUyA9IHtcbiAgZGVmYXVsdDogUkVEXG59O1xuXG5leHBvcnQgY29uc3QgRklMRURfVFlQRV9ESVNQTEFZID0ge1xuICBbQUxMX0ZJRUxEX1RZUEVTLmJvb2xlYW5dOiB7XG4gICAgbGFiZWw6ICdib29sJyxcbiAgICBjb2xvcjogUElOS1xuICB9LFxuICBbQUxMX0ZJRUxEX1RZUEVTLmRhdGVdOiB7XG4gICAgbGFiZWw6ICdkYXRlJyxcbiAgICBjb2xvcjogUFVSUExFXG4gIH0sXG4gIFtBTExfRklFTERfVFlQRVMuZ2VvanNvbl06IHtcbiAgICBsYWJlbDogJ2dlbycsXG4gICAgY29sb3I6IEJMVUUyXG4gIH0sXG4gIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06IHtcbiAgICBsYWJlbDogJ2ludCcsXG4gICAgY29sb3I6IE9SQU5HRVxuICB9LFxuICBbQUxMX0ZJRUxEX1RZUEVTLnJlYWxdOiB7XG4gICAgbGFiZWw6ICdmbG9hdCcsXG4gICAgY29sb3I6IE9SQU5HRVxuICB9LFxuICBbQUxMX0ZJRUxEX1RZUEVTLnN0cmluZ106IHtcbiAgICBsYWJlbDogJ3N0cmluZycsXG4gICAgY29sb3I6IEJMVUVcbiAgfSxcbiAgW0FMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXBdOiB7XG4gICAgbGFiZWw6ICd0aW1lJyxcbiAgICBjb2xvcjogR1JFRU5cbiAgfSxcbiAgLy8gZmllbGQgcGFpcnNcbiAgW0FMTF9GSUVMRF9UWVBFUy5wb2ludF06IHtcbiAgICBsYWJlbDogJ3BvaW50JyxcbiAgICBjb2xvcjogQkxVRTNcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRGb3JtYXQgPSBkID0+IGQ7XG5cbmV4cG9ydCBjb25zdCBGSUVMRF9ESVNQTEFZX0ZPUk1BVCA9IHtcbiAgW0FMTF9GSUVMRF9UWVBFUy5zdHJpbmddOiBkZWZhdWx0Rm9ybWF0LFxuICBbQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcF06IGRlZmF1bHRGb3JtYXQsXG4gIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06IGRlZmF1bHRGb3JtYXQsXG4gIFtBTExfRklFTERfVFlQRVMuYm9vbGVhbl06IGQgPT4gU3RyaW5nKGQpLFxuICBbQUxMX0ZJRUxEX1RZUEVTLmRhdGVdOiBkZWZhdWx0Rm9ybWF0LFxuICBbQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb25dOiBkZWZhdWx0Rm9ybWF0XG59O1xuXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9TQ0FMRVMgPSBrZXlNaXJyb3Ioe1xuICBjb2xvcjogbnVsbCxcbiAgcmFkaXVzOiBudWxsLFxuICBzaXplOiBudWxsLFxuICBjb2xvckFnZ3I6IG51bGwsXG4gIHNpemVBZ2dyOiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IEFHR1JFR0FUSU9OX1RZUEVTID0ge1xuICAvLyBkZWZhdWx0XG4gIGNvdW50OiAnY291bnQnLFxuICAvLyBsaW5lYXJcbiAgYXZlcmFnZTogJ2F2ZXJhZ2UnLFxuICBtYXhpbXVtOiAnbWF4aW11bScsXG4gIG1pbmltdW06ICdtaW5pbXVtJyxcbiAgbWVkaWFuOiAnbWVkaWFuJyxcbiAgc3VtOiAnc3VtJyxcbiAgLy8gb3JkaW5hbFxuICBtb2RlOiAnbW9kZScsXG4gIGNvdW50VW5pcXVlOiAnY291bnQgdW5pcXVlJ1xufTtcblxuZXhwb3J0IGNvbnN0IGxpbmVhckZpZWxkU2NhbGVGdW5jdGlvbnMgPSB7XG4gIFtDSEFOTkVMX1NDQUxFUy5jb2xvcl06IFtTQ0FMRV9UWVBFUy5xdWFudGl6ZSwgU0NBTEVfVFlQRVMucXVhbnRpbGVdLFxuICBbQ0hBTk5FTF9TQ0FMRVMucmFkaXVzXTogW1NDQUxFX1RZUEVTLnNxcnRdLFxuICBbQ0hBTk5FTF9TQ0FMRVMuc2l6ZV06IFtTQ0FMRV9UWVBFUy5saW5lYXJdXG59O1xuXG5leHBvcnQgY29uc3QgbGluZWFyRmllbGRBZ2dyU2NhbGVGdW5jdGlvbnMgPSB7XG4gIFtDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3JdOiB7XG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLmF2ZXJhZ2VdOiBbU0NBTEVfVFlQRVMucXVhbnRpemUsIFNDQUxFX1RZUEVTLnF1YW50aWxlXSxcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMubWF4aW11bV06IFtTQ0FMRV9UWVBFUy5xdWFudGl6ZSwgU0NBTEVfVFlQRVMucXVhbnRpbGVdLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5taW5pbXVtXTogW1NDQUxFX1RZUEVTLnF1YW50aXplLCBTQ0FMRV9UWVBFUy5xdWFudGlsZV0sXG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLm1lZGlhbl06IFtTQ0FMRV9UWVBFUy5xdWFudGl6ZSwgU0NBTEVfVFlQRVMucXVhbnRpbGVdLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5zdW1dOiBbU0NBTEVfVFlQRVMucXVhbnRpemUsIFNDQUxFX1RZUEVTLnF1YW50aWxlXVxuICB9LFxuXG4gIFtDSEFOTkVMX1NDQUxFUy5zaXplQWdncl06IHtcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMuYXZlcmFnZV06IFtTQ0FMRV9UWVBFUy5saW5lYXJdLFxuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5tYXhpbXVtXTogW1NDQUxFX1RZUEVTLmxpbmVhcl0sXG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLm1pbmltdW1dOiBbU0NBTEVfVFlQRVMubGluZWFyXSxcbiAgICBbQUdHUkVHQVRJT05fVFlQRVMubWVkaWFuXTogW1NDQUxFX1RZUEVTLmxpbmVhcl0sXG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLnN1bV06IFtTQ0FMRV9UWVBFUy5saW5lYXJdXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBvcmRpbmFsRmllbGRTY2FsZUZ1bmN0aW9ucyA9IHtcbiAgW0NIQU5ORUxfU0NBTEVTLmNvbG9yXTogW1NDQUxFX1RZUEVTLm9yZGluYWxdLFxuICBbQ0hBTk5FTF9TQ0FMRVMucmFkaXVzXTogW1NDQUxFX1RZUEVTLnBvaW50XSxcbiAgW0NIQU5ORUxfU0NBTEVTLnNpemVdOiBbU0NBTEVfVFlQRVMucG9pbnRdXG59O1xuXG5leHBvcnQgY29uc3Qgb3JkaW5hbEZpZWxkQWdnclNjYWxlRnVuY3Rpb25zID0ge1xuICAvLyBbQ0hBTk5FTF9TQ0FMRVMuY29sb3JBZ2dyXTogW1NDQUxFX1RZUEVTLm9yZGluYWwsIFNDQUxFX1RZUEVTLmxpbmVhcl0sXG4gIFtDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3JdOiB7XG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLm1vZGVdOiBbU0NBTEVfVFlQRVMub3JkaW5hbF0sXG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLmNvdW50VW5pcXVlXTogW1NDQUxFX1RZUEVTLnF1YW50aXplLCBTQ0FMRV9UWVBFUy5xdWFudGlsZV1cbiAgfSxcblxuICAvLyBDdXJyZW50bHkgZG9lc24ndCBzdXBwb3J0IHlldFxuICBbQ0hBTk5FTF9TQ0FMRVMuc2l6ZUFnZ3JdOiB7fVxufTtcblxuZXhwb3J0IGNvbnN0IG5vdFN1cHBvcnRlZFNjYWxlT3B0cyA9IHtcbiAgW0NIQU5ORUxfU0NBTEVTLmNvbG9yXTogW10sXG4gIFtDSEFOTkVMX1NDQUxFUy5yYWRpdXNdOiBbXSxcbiAgW0NIQU5ORUxfU0NBTEVTLnNpemVdOiBbXVxufTtcblxuZXhwb3J0IGNvbnN0ICBub3RTdXBwb3J0QWdnck9wdHMgPSB7XG4gIFtDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3JdOiB7fSxcbiAgW0NIQU5ORUxfU0NBTEVTLnNpemVBZ2dyXToge31cbn07XG5cbi8qKlxuICogRGVmYXVsdCBhZ2dyZWdhdGlvbiBhcmUgYmFzZWQgb24gb2N1bnRcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQUdHUkVHQVRJT04gPSB7XG4gIFtDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3JdOiB7XG4gICAgW0FHR1JFR0FUSU9OX1RZUEVTLmNvdW50XTogW1NDQUxFX1RZUEVTLnF1YW50aXplLCBTQ0FMRV9UWVBFUy5xdWFudGlsZV1cbiAgfSxcbiAgW0NIQU5ORUxfU0NBTEVTLnNpemVBZ2dyXToge1xuICAgIFtBR0dSRUdBVElPTl9UWVBFUy5jb3VudF06IFtTQ0FMRV9UWVBFUy5saW5lYXJdXG4gIH1cbn07XG5cbi8qKlxuICogRGVmaW5lIHdoYXQgdHlwZSBvZiBzY2FsZSBvcGVyYXRpb24gaXMgYWxsb3dlZCBvbiBlYWNoIHR5cGUgb2YgZmllbGRzXG4gKi9cbmV4cG9ydCBjb25zdCBGSUVMRF9PUFRTID0ge1xuICBzdHJpbmc6IHtcbiAgICB0eXBlOiAnY2F0ZWdvcmljYWwnLFxuICAgIHNjYWxlOiB7XG4gICAgICAuLi5vcmRpbmFsRmllbGRTY2FsZUZ1bmN0aW9ucyxcbiAgICAgIC4uLm9yZGluYWxGaWVsZEFnZ3JTY2FsZUZ1bmN0aW9uc1xuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBsZWdlbmQ6IGQgPT4gZFxuICAgIH1cbiAgfSxcbiAgcmVhbDoge1xuICAgIHR5cGU6ICdudW1lcmljYWwnLFxuICAgIHNjYWxlOiB7XG4gICAgICAuLi5saW5lYXJGaWVsZFNjYWxlRnVuY3Rpb25zLFxuICAgICAgLi4ubGluZWFyRmllbGRBZ2dyU2NhbGVGdW5jdGlvbnNcbiAgICB9LFxuICAgIGZvcm1hdDoge1xuICAgICAgbGVnZW5kOiBkID0+IGRcbiAgICB9XG4gIH0sXG4gIHRpbWVzdGFtcDoge1xuICAgIHR5cGU6ICd0aW1lJyxcbiAgICBzY2FsZToge1xuICAgICAgLi4ubGluZWFyRmllbGRTY2FsZUZ1bmN0aW9ucyxcbiAgICAgIC4uLm5vdFN1cHBvcnRBZ2dyT3B0c1xuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBsZWdlbmQ6IGQgPT4gZFxuICAgIH1cbiAgfSxcbiAgaW50ZWdlcjoge1xuICAgIHR5cGU6ICdudW1lcmljYWwnLFxuICAgIHNjYWxlOiB7XG4gICAgICAuLi5saW5lYXJGaWVsZFNjYWxlRnVuY3Rpb25zLFxuICAgICAgLi4ubGluZWFyRmllbGRBZ2dyU2NhbGVGdW5jdGlvbnNcbiAgICB9LFxuICAgIGZvcm1hdDoge1xuICAgICAgbGVnZW5kOiBkID0+IGRcbiAgICB9XG4gIH0sXG4gIGJvb2xlYW46IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgc2NhbGU6IHtcbiAgICAgIC4uLm9yZGluYWxGaWVsZFNjYWxlRnVuY3Rpb25zLFxuICAgICAgLi4ub3JkaW5hbEZpZWxkQWdnclNjYWxlRnVuY3Rpb25zXG4gICAgfSxcbiAgICBmb3JtYXQ6IHtcbiAgICAgIGxlZ2VuZDogZCA9PiBkXG4gICAgfVxuICB9LFxuICBkYXRlOiB7XG4gICAgc2NhbGU6IHtcbiAgICAgIC4uLm9yZGluYWxGaWVsZFNjYWxlRnVuY3Rpb25zLFxuICAgICAgLi4ub3JkaW5hbEZpZWxkQWdnclNjYWxlRnVuY3Rpb25zXG4gICAgfSxcbiAgICBmb3JtYXQ6IHtcbiAgICAgIGxlZ2VuZDogZCA9PiBkXG4gICAgfVxuICB9LFxuICBnZW9qc29uOiB7XG4gICAgdHlwZTogJ2dlb21ldHJ5JyxcbiAgICBzY2FsZToge1xuICAgICAgLi4ubm90U3VwcG9ydGVkU2NhbGVPcHRzLFxuICAgICAgLi4ubm90U3VwcG9ydEFnZ3JPcHRzXG4gICAgfSxcbiAgICBmb3JtYXQ6IHtcbiAgICAgIGxlZ2VuZDogZCA9PiAnLi4uJ1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IENIQU5ORUxfU0NBTEVfU1VQUE9SVEVEX0ZJRUxEUyA9IE9iamVjdC5rZXlzKFxuICBDSEFOTkVMX1NDQUxFU1xuKS5yZWR1Y2UoXG4gIChhY2N1LCBrZXkpID0+ICh7XG4gICAgLi4uYWNjdSxcbiAgICBba2V5XTogT2JqZWN0LmtleXMoRklFTERfT1BUUykuZmlsdGVyKFxuICAgICAgZnQgPT4gT2JqZWN0LmtleXMoRklFTERfT1BUU1tmdF0uc2NhbGVba2V5XSkubGVuZ3RoXG4gICAgKVxuICB9KSxcbiAge31cbik7XG5cbi8vIFRPRE86IHNoYW4gZGVsZXRlIHVzZSBvZiBMQVlFUl9UWVBFU1xuZXhwb3J0IGNvbnN0IExBWUVSX1RZUEVTID0ga2V5TWlycm9yKHtcbiAgcG9pbnQ6IG51bGwsXG4gIGFyYzogbnVsbCxcbiAgY2x1c3RlcjogbnVsbCxcbiAgbGluZTogbnVsbCxcbiAgZ3JpZDogbnVsbCxcbiAgZ2VvanNvbjogbnVsbCxcbiAgaWNvbjogbnVsbCxcbiAgaGVhdG1hcDogbnVsbCxcbiAgaGV4YWdvbjogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xBWUVSX0NPTE9SID0ge1xuICB0cmlwQXJjOiAnIzkyMjZDNicsXG4gIGJlZ2ludHJpcF9sYXQ6ICcjMUU5NkJFJyxcbiAgZHJvcG9mZl9sYXQ6ICcjRkY5OTFGJyxcbiAgcmVxdWVzdF9sYXQ6ICcjNTJBMzUzJ1xufTtcblxuLy8gbGV0IHVzZXIgcGFzcyBpbiBkZWZhdWx0IHRvb2x0aXAgZmllbGRzXG5leHBvcnQgY29uc3QgREVGQVVMVF9UT09MVElQX0ZJRUxEUyA9IFtdO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9MSUdIVF9TRVRUSU5HUyA9IHtcbiAgbGlnaHRzUG9zaXRpb246IFstMTIyLjQ1LCAzNy42NiwgODAwMCwgLTEyMi4wLCAzOC4wLCA4MDAwXSxcbiAgYW1iaWVudFJhdGlvOiAwLjQsXG4gIGRpZmZ1c2VSYXRpbzogMC42LFxuICBzcGVjdWxhclJhdGlvOiAwLjMsXG4gIGxpZ2h0c1N0cmVuZ3RoOiBbMC45LCAwLjAsIDAuOCwgMC4wXSxcbiAgbnVtYmVyT2ZMaWdodHM6IDJcbn07XG5cbmV4cG9ydCBjb25zdCBOT19WQUxVRV9DT0xPUiA9IFsxNDcsIDE0NywgMTQ3XTtcblxuZXhwb3J0IGNvbnN0IExBWUVSX0JMRU5ESU5HUyA9IHtcbiAgYWRkaXRpdmU6IHtcbiAgICBibGVuZEZ1bmM6IFsnU1JDX0FMUEhBJywgJ0RTVF9BTFBIQSddLFxuICAgIGJsZW5kRXF1YXRpb246ICdGVU5DX0FERCdcbiAgfSxcbiAgbm9ybWFsOiB7XG4gICAgLy8gcmVmZXJlbmNlIHRvXG4gICAgLy8gaHR0cHM6Ly9saW1udS5jb20vd2ViZ2wtYmxlbmRpbmcteW91cmUtcHJvYmFibHktd3JvbmcvXG4gICAgYmxlbmRGdW5jOiBbXG4gICAgICAnU1JDX0FMUEhBJyxcbiAgICAgICdPTkVfTUlOVVNfU1JDX0FMUEhBJyxcbiAgICAgICdPTkUnLFxuICAgICAgJ09ORV9NSU5VU19TUkNfQUxQSEEnXG4gICAgXSxcbiAgICBibGVuZEVxdWF0aW9uOiBbJ0ZVTkNfQUREJywgJ0ZVTkNfQUREJ11cbiAgfSxcbiAgc3VidHJhY3RpdmU6IHtcbiAgICBibGVuZEZ1bmM6IFsnT05FJywgJ09ORV9NSU5VU19EU1RfQ09MT1InLCAnU1JDX0FMUEhBJywgJ0RTVF9BTFBIQSddLFxuICAgIGJsZW5kRXF1YXRpb246IFsnRlVOQ19TVUJUUkFDVCcsICdGVU5DX0FERCddXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBNQVhfREVGQVVMVF9UT09MVElQUyA9IDU7XG5cbmV4cG9ydCBjb25zdCBSRVNPTFVUSU9OUyA9IGtleU1pcnJvcih7XG4gIE9ORV9YOiBudWxsLFxuICBUV09fWDogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBSQVRJT1MgPSBrZXlNaXJyb3Ioe1xuICBTQ1JFRU46IG51bGwsXG4gIEZPVVJfQllfVEhSRUU6IG51bGwsXG4gIFNJWFRFRU5fQllfTklORTogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBSQVRJT19PUFRJT05TID0gW3tcbiAgaWQ6IFJBVElPUy5TQ1JFRU4sXG4gIGxhYmVsOiAnT3JpZ2luYWwgU2NyZWVuJyxcbiAgZ2V0U2l6ZTogKHNjcmVlblcsIHNjcmVlbkgpID0+ICh7d2lkdGg6IHNjcmVlblcsIGhlaWdodDogc2NyZWVuSH0pXG59LCB7XG4gIGlkOiBSQVRJT1MuRk9VUl9CWV9USFJFRSxcbiAgbGFiZWw6ICc0OjMnLFxuICBnZXRTaXplOiAoc2NyZWVuVywgc2NyZWVuSCkgPT4gKHt3aWR0aDogc2NyZWVuVywgaGVpZ2h0OiBNYXRoLnJvdW5kKHNjcmVlblcgKiAwLjc1KX0pXG59LCB7XG4gIGlkOiBSQVRJT1MuU0lYVEVFTl9CWV9OSU5FLFxuICBsYWJlbDogJzE2OjknLFxuICBnZXRTaXplOiAoc2NyZWVuVywgc2NyZWVuSCkgPT4gKHt3aWR0aDogc2NyZWVuVywgaGVpZ2h0OiBNYXRoLnJvdW5kKHNjcmVlblcgKiAwLjU2MjUpfSlcbn1dO1xuXG5leHBvcnQgY29uc3QgUkVTT0xVVElPTl9PUFRJT05TID0gW3tcbiAgaWQ6IFJFU09MVVRJT05TLk9ORV9YLFxuICBsYWJlbDogJzF4JyxcbiAgYXZhaWxhYmxlOiB0cnVlLFxuICBzY2FsZTogMSxcbiAgem9vbU9mZnNldDogTWF0aC5sb2cyKDEpLFxuICBnZXRTaXplOiAoc2NyZWVuVywgc2NyZWVuSCkgPT4gKHtcbiAgICB3aWR0aDogc2NyZWVuVyxcbiAgICBoZWlnaHQ6IHNjcmVlbkhcbiAgfSlcbn0sIHtcbiAgaWQ6IFJFU09MVVRJT05TLlRXT19YLFxuICBsYWJlbDogJzJ4JyxcbiAgYXZhaWxhYmxlOiB0cnVlLFxuICBzY2FsZTogMixcbiAgem9vbU9mZnNldDogTWF0aC5sb2cyKDIpLFxuICBnZXRTaXplOiAoc2NyZWVuVywgc2NyZWVuSCkgPT4gKHtcbiAgICB3aWR0aDogc2NyZWVuVyAqIDIsXG4gICAgaGVpZ2h0OiBzY3JlZW5IICogMlxuICB9KVxufV07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VYUE9SVF9JTUFHRV9OQU1FID0gJ2tlcGxlci1nbC5wbmcnO1xuXG5leHBvcnQgY29uc3QgRVhQT1JUX0RBVEFfVFlQRSA9IGtleU1pcnJvcih7XG4gIENTVjogbnVsbFxuICAvLyBTSEFQRUZJTEU6IG51bGwsXG4gIC8vIEpTT046IG51bGwsXG4gIC8vIEdFT0pTT046IG51bGwsXG4gIC8vIFRPUE9KU09OOiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IEVYUE9SVF9EQVRBX1RZUEVfT1BUSU9OUyA9IFtcbiAge1xuICAgIGlkOiBFWFBPUlRfREFUQV9UWVBFLkNTVixcbiAgICBsYWJlbDogRVhQT1JUX0RBVEFfVFlQRS5DU1YudG9Mb3dlckNhc2UoKSxcbiAgICBhdmFpbGFibGU6IHRydWVcbiAgfVxuICAvLyB7XG4gIC8vICAgaWQ6IEVYUE9SVF9EQVRBX1RZUEUuU0hBUEVGSUxFLFxuICAvLyAgIGxhYmVsOiAnc2hhcGVmaWxlJyxcbiAgLy8gICBhdmFpbGFibGU6IGZhbHNlXG4gIC8vIH0sXG4gIC8vIHtcbiAgLy8gICBpZDogRVhQT1JUX0RBVEFfVFlQRS5KU09OLFxuICAvLyAgIGxhYmVsOiAnanNvbicsXG4gIC8vICAgYXZhaWxhYmxlOiBmYWxzZVxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgaWQ6IEVYUE9SVF9EQVRBX1RZUEUuR0VPSlNPTixcbiAgLy8gICBsYWJlbDogJ2dlb2pzb24nLFxuICAvLyAgIGF2YWlsYWJsZTogZmFsc2VcbiAgLy8gfSxcbiAgLy8ge1xuICAvLyAgIGlkOiBFWFBPUlRfREFUQV9UWVBFLlRPUE9KU09OLFxuICAvLyAgIGxhYmVsOiAndG9wb2pzb24nLFxuICAvLyAgIGF2YWlsYWJsZTogZmFsc2VcbiAgLy8gfVxuXTtcblxuLy8gRXhwb3J0IG1hcCB0eXBlc1xuZXhwb3J0IGNvbnN0IEVYUE9SVF9NQVBfRk9STUFUID0ga2V5TWlycm9yKHtcbiAgSFRNTDogbnVsbCxcbiAgSlNPTjogbnVsbFxufSk7XG5cbi8vIEV4cG9ydCBtYXAgb3B0aW9uc1xuZXhwb3J0IGNvbnN0IEVYUE9SVF9NQVBfRk9STUFUX09QVElPTlMgPSBPYmplY3QuZW50cmllcyhFWFBPUlRfTUFQX0ZPUk1BVClcbiAgLm1hcChlbnRyeSA9PiAoe1xuICAgIGlkOiBlbnRyeVswXSxcbiAgICBsYWJlbDogZW50cnlbMV0udG9Mb3dlckNhc2UoKSxcbiAgICBhdmFpbGFibGU6IHRydWVcbiAgfSkpO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9VVUlEX0NPVU5UID0gNjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTk9USUZJQ0FUSU9OX01FU1NBR0UgPSAnTUVTU0FHRV9OT1RfUFJPVklERUQnO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9OT1RJRklDQVRJT05fVFlQRVMgPSBrZXlNaXJyb3Ioe1xuICBpbmZvOiBudWxsLFxuICBlcnJvcjogbnVsbCxcbiAgd2FybmluZzogbnVsbCxcbiAgc3VjY2VzczogbnVsbFxufSk7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX05PVElGSUNBVElPTl9UT1BJQ1MgPSBrZXlNaXJyb3Ioe1xuICBnbG9iYWw6IG51bGwsXG4gIGZpbGU6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgVE9LRU5fTUlTVVNFX1dBUk5JTkcgPSAnKiBJZiB5b3UgZG8gbm90IHByb3ZpZGUgeW91ciBvd24gdG9rZW4sIHRoZSBtYXAgbWF5IGZhaWwgdG8gZGlzcGxheSBhdCBhbnkgdGltZSB3aGVuIHdlIHJlcGxhY2Ugb3VycyB0byBhdm9pZCBtaXN1c2UuICc7XG5leHBvcnQgY29uc3QgRElTQ0xBSU1FUiA9ICdZb3UgY2FuIGNoYW5nZSB0aGUgTWFwYm94IHRva2VuIGxhdGVyIHVzaW5nIHRoZSBmb2xsb3dpbmcgaW5zdHJ1Y3Rpb25zOiAnO1xuZXhwb3J0IGNvbnN0IE1BUF9DT05GSUdfREVTQ1JJUFRJT04gPSAnTWFwIGNvbmZpZyB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSBKc29uIGZpbGUuIElmIHlvdSBhcmUgdXNpbmcga2VwbGVyLmdsIGluIHlvdXIgb3duIGFwcC4gWW91IGNhbiBjb3B5IHRoaXMgY29uZmlnIGFuZCBwYXNzIGl0IHRvICc7XG4iXX0=