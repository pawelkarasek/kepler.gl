"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.featureResolver = exports.featureAccessor = exports.geoJsonRequiredColumns = exports.geojsonVisConfigs = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _lodash2 = _interopRequireDefault(require("lodash.uniq"));

var _baseLayer = _interopRequireWildcard(require("../base-layer"));

var _deck = require("deck.gl");

var _colorUtils = require("../../utils/color-utils");

var _geojsonUtils = require("./geojson-utils");

var _geojsonLayerIcon = _interopRequireDefault(require("./geojson-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
var geojsonVisConfigs = {
  opacity: 'opacity',
  thickness: {
    type: 'number',
    defaultValue: 0.5,
    label: 'Stroke Width',
    isRanged: false,
    range: [0, 100],
    step: 0.1,
    group: 'stroke',
    property: 'thickness'
  },
  strokeColor: 'strokeColor',
  colorRange: 'colorRange',
  strokeColorRange: 'strokeColorRange',
  radius: 'radius',
  sizeRange: 'strokeWidthRange',
  radiusRange: 'radiusRange',
  heightRange: 'elevationRange',
  elevationScale: 'elevationScale',
  stroked: 'stroked',
  filled: 'filled',
  enable3d: 'enable3d',
  wireframe: 'wireframe'
};
exports.geojsonVisConfigs = geojsonVisConfigs;
var geoJsonRequiredColumns = ['geojson'];
exports.geoJsonRequiredColumns = geoJsonRequiredColumns;

var featureAccessor = function featureAccessor(_ref) {
  var geojson = _ref.geojson;
  return function (d) {
    return d[geojson.fieldIdx];
  };
};

exports.featureAccessor = featureAccessor;

var featureResolver = function featureResolver(_ref2) {
  var geojson = _ref2.geojson;
  return geojson.fieldIdx;
};

exports.featureResolver = featureResolver;

var GeoJsonLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2["default"])(GeoJsonLayer, _Layer);

  function GeoJsonLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, GeoJsonLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GeoJsonLayer).call(this, props));
    _this.dataToFeature = {};

    _this.registerVisConfig(geojsonVisConfigs);

    _this.getFeature = (0, _lodash["default"])(featureAccessor, featureResolver);
    return _this;
  }

  (0, _createClass2["default"])(GeoJsonLayer, [{
    key: "getPositionAccessor",
    value: function getPositionAccessor() {
      return this.getFeature(this.config.columns);
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(GeoJsonLayer.prototype), "getDefaultLayerConfig", this).call(this, props), {
        // add height visual channel
        heightField: null,
        heightDomain: [0, 1],
        heightScale: 'linear',
        // add radius visual channel
        radiusField: null,
        radiusDomain: [0, 1],
        radiusScale: 'linear',
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
      });
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object, allData) {
      // index of allData is saved to feature.properties
      return allData[object.properties.index];
    } // TODO: fix complexity

    /* eslint-disable complexity */

  }, {
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _this$config = this.config,
          colorScale = _this$config.colorScale,
          colorField = _this$config.colorField,
          colorDomain = _this$config.colorDomain,
          strokeColorField = _this$config.strokeColorField,
          strokeColorScale = _this$config.strokeColorScale,
          strokeColorDomain = _this$config.strokeColorDomain,
          color = _this$config.color,
          sizeScale = _this$config.sizeScale,
          sizeDomain = _this$config.sizeDomain,
          sizeField = _this$config.sizeField,
          heightField = _this$config.heightField,
          heightDomain = _this$config.heightDomain,
          heightScale = _this$config.heightScale,
          radiusField = _this$config.radiusField,
          radiusDomain = _this$config.radiusDomain,
          radiusScale = _this$config.radiusScale,
          visConfig = _this$config.visConfig;
      var enable3d = visConfig.enable3d,
          stroked = visConfig.stroked,
          colorRange = visConfig.colorRange,
          heightRange = visConfig.heightRange,
          sizeRange = visConfig.sizeRange,
          radiusRange = visConfig.radiusRange,
          strokeColorRange = visConfig.strokeColorRange,
          strokeColor = visConfig.strokeColor;
      var getFeature = this.getPositionAccessor(this.config.column); // geojson feature are object, if doesn't exists
      // create it and save to layer

      if (!oldLayerData || oldLayerData.getFeature !== getFeature) {
        this.updateLayerMeta(allData, getFeature);
      }

      var geojsonData;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getFeature === getFeature) {
        // no need to create a new array of data
        // use updateTriggers to selectively re-calculate attributes
        geojsonData = oldLayerData.data;
      } else {
        // filteredIndex is a reference of index in allData which can map to feature
        geojsonData = filteredIndex.map(function (i) {
          return _this2.dataToFeature[i];
        }).filter(function (d) {
          return d;
        });
      } // fill color


      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb)); // stroke color

      var scScale = strokeColorField && this.getVisChannelScale(strokeColorScale, strokeColorDomain, strokeColorRange.colors.map(_colorUtils.hexToRgb)); // calculate stroke scale - if stroked = true

      var sScale = sizeField && stroked && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange); // calculate elevation scale - if extruded = true

      var eScale = heightField && enable3d && this.getVisChannelScale(heightScale, heightDomain, heightRange); // point radius

      var rScale = radiusField && this.getVisChannelScale(radiusScale, radiusDomain, radiusRange);
      return {
        data: geojsonData,
        getFeature: getFeature,
        getFillColor: function getFillColor(d) {
          return cScale ? _this2.getEncodedChannelValue(cScale, allData[d.properties.index], colorField) : d.properties.fillColor || color;
        },
        getLineColor: function getLineColor(d) {
          return scScale ? _this2.getEncodedChannelValue(scScale, allData[d.properties.index], strokeColorField) : d.properties.lineColor || strokeColor || color;
        },
        getLineWidth: function getLineWidth(d) {
          return sScale ? _this2.getEncodedChannelValue(sScale, allData[d.properties.index], sizeField, 0) : d.properties.lineWidth || 1;
        },
        getElevation: function getElevation(d) {
          return eScale ? _this2.getEncodedChannelValue(eScale, allData[d.properties.index], heightField, 0) : d.properties.elevation || 500;
        },
        getRadius: function getRadius(d) {
          return rScale ? _this2.getEncodedChannelValue(rScale, allData[d.properties.index], radiusField, 0) : d.properties.radius || 1;
        }
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData) {
      var getFeature = this.getPositionAccessor();
      this.dataToFeature = (0, _geojsonUtils.getGeojsonDataMaps)(allData, getFeature); // calculate layer meta

      var allFeatures = Object.values(this.dataToFeature); // get bounds from features

      var bounds = (0, _geojsonUtils.getGeojsonBounds)(allFeatures); // get lightSettings from points

      var lightSettings = this.getLightSettingsFromBounds(bounds); // if any of the feature has properties.radius set to be true

      var fixedRadius = Boolean(allFeatures.find(function (d) {
        return d && d.properties && d.properties.radius;
      })); // keep a record of what type of geometry the collection has

      var featureTypes = allFeatures.reduce(function (accu, f) {
        var geoType = (0, _geojsonUtils.featureToDeckGlGeoType)(f && f.geometry && f.geometry.type);

        if (geoType) {
          accu[geoType] = true;
        }

        return accu;
      }, {});
      this.updateMeta({
        bounds: bounds,
        lightSettings: lightSettings,
        fixedRadius: fixedRadius,
        featureTypes: featureTypes
      });
    }
  }, {
    key: "setInitialLayerConfig",
    value: function setInitialLayerConfig(allData) {
      this.updateLayerMeta(allData);
      var featureTypes = this.meta.featureTypes; // default settings is stroke: true, filled: false

      if (featureTypes && featureTypes.polygon) {
        // set both fill and stroke to true
        return this.updateLayerVisConfig({
          filled: true,
          stroked: true,
          strokeColor: _baseLayer.colorMaker.next().value
        });
      } else if (featureTypes && featureTypes.point) {
        // set fill to true if detect point
        return this.updateLayerVisConfig({
          filled: true,
          stroked: false
        });
      }

      return this;
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var _this$meta = this.meta,
          lightSettings = _this$meta.lightSettings,
          fixedRadius = _this$meta.fixedRadius;
      var radiusScale = this.getRadiusScaleByZoom(mapState, fixedRadius);
      var zoomFactor = this.getZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var layerProps = {
        // multiplier applied just so it being consistent with previously saved maps
        lineWidthScale: visConfig.thickness * zoomFactor * 8,
        lineWidthMinPixels: 1,
        elevationScale: visConfig.elevationScale,
        pointRadiusScale: radiusScale,
        lineMiterLimit: 4
      };
      var updateTriggers = {
        getElevation: {
          heightField: this.config.heightField,
          heightScale: this.config.heightScale,
          heightRange: visConfig.heightRange
        },
        getFillColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineColor: {
          color: visConfig.strokeColor,
          colorField: this.config.strokeColorField,
          colorRange: visConfig.strokeColorRange,
          colorScale: this.config.strokeColorScale
        },
        getLineWidth: {
          sizeField: this.config.sizeField,
          sizeRange: visConfig.sizeRange
        },
        getRadius: {
          radiusField: this.config.radiusField,
          radiusRange: visConfig.radiusRange
        }
      };
      return [new _deck.GeoJsonLayer((0, _objectSpread2["default"])({}, layerProps, {
        id: this.id,
        idx: idx,
        data: data.data,
        getFillColor: data.getFillColor,
        getLineColor: data.getLineColor,
        getLineWidth: data.getLineWidth,
        getRadius: data.getRadius,
        getElevation: data.getElevation,
        // highlight
        pickable: true,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        autoHighlight: visConfig.enable3d,
        // parameters
        parameters: {
          depthTest: Boolean(visConfig.enable3d || mapState.dragRotate)
        },
        opacity: visConfig.opacity,
        stroked: visConfig.stroked,
        filled: visConfig.filled,
        extruded: visConfig.enable3d,
        wireframe: visConfig.wireframe,
        lineMiterLimit: 2,
        rounded: true,
        lightSettings: lightSettings,
        updateTriggers: updateTriggers
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer((0, _objectSpread2["default"])({}, layerProps, {
        id: "".concat(this.id, "-hovered"),
        data: [objectHovered.object],
        getLineWidth: data.getLineWidth,
        getRadius: data.getRadius,
        getElevation: data.getElevation,
        getLineColor: this.config.highlightColor,
        getFillColor: this.config.highlightColor,
        updateTriggers: updateTriggers,
        stroked: true,
        pickable: false,
        filled: false
      }))] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'geojson';
    }
  }, {
    key: "name",
    get: function get() {
      return 'Polygon';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _geojsonLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return geoJsonRequiredColumns;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(GeoJsonLayer.prototype), "visualChannels", this), {
        strokeColor: {
          property: 'strokeColor',
          field: 'strokeColorField',
          scale: 'strokeColorScale',
          domain: 'strokeColorDomain',
          range: 'strokeColorRange',
          key: 'strokeColor',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          condition: function condition(config) {
            return config.visConfig.stroked;
          }
        },
        size: (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(GeoJsonLayer.prototype), "visualChannels", this).size, {
          property: 'stroke',
          condition: function condition(config) {
            return config.visConfig.stroked;
          }
        }),
        height: {
          property: 'height',
          field: 'heightField',
          scale: 'heightScale',
          domain: 'heightDomain',
          range: 'heightRange',
          key: 'height',
          channelScaleType: 'size',
          condition: function condition(config) {
            return config.visConfig.enable3d;
          }
        },
        radius: {
          property: 'radius',
          field: 'radiusField',
          scale: 'radiusScale',
          domain: 'radiusDomain',
          range: 'radiusRange',
          key: 'radius',
          channelScaleType: 'radius'
        }
      });
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var _this3 = this;

      var label = _ref4.label,
          fields = _ref4.fields;
      var geojsonColumns = fields.filter(function (f) {
        return f.type === 'geojson';
      }).map(function (f) {
        return f.name;
      });
      var defaultColumns = {
        geojson: (0, _lodash2["default"])([].concat((0, _toConsumableArray2["default"])(_defaultSettings.GEOJSON_FIELDS.geojson), (0, _toConsumableArray2["default"])(geojsonColumns)))
      };
      var foundColumns = this.findDefaultColumnField(defaultColumns, fields);

      if (!foundColumns || !foundColumns.length) {
        return [];
      }

      return foundColumns.map(function (columns) {
        return {
          label: typeof label === 'string' && label.replace(/\.[^/.]+$/, '') || _this3.type,
          columns: columns,
          isVisible: true
        };
      });
    }
  }]);
  return GeoJsonLayer;
}(_baseLayer["default"]);

exports["default"] = GeoJsonLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLWxheWVyLmpzIl0sIm5hbWVzIjpbImdlb2pzb25WaXNDb25maWdzIiwib3BhY2l0eSIsInRoaWNrbmVzcyIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJsYWJlbCIsImlzUmFuZ2VkIiwicmFuZ2UiLCJzdGVwIiwiZ3JvdXAiLCJwcm9wZXJ0eSIsInN0cm9rZUNvbG9yIiwiY29sb3JSYW5nZSIsInN0cm9rZUNvbG9yUmFuZ2UiLCJyYWRpdXMiLCJzaXplUmFuZ2UiLCJyYWRpdXNSYW5nZSIsImhlaWdodFJhbmdlIiwiZWxldmF0aW9uU2NhbGUiLCJzdHJva2VkIiwiZmlsbGVkIiwiZW5hYmxlM2QiLCJ3aXJlZnJhbWUiLCJnZW9Kc29uUmVxdWlyZWRDb2x1bW5zIiwiZmVhdHVyZUFjY2Vzc29yIiwiZ2VvanNvbiIsImQiLCJmaWVsZElkeCIsImZlYXR1cmVSZXNvbHZlciIsIkdlb0pzb25MYXllciIsInByb3BzIiwiZGF0YVRvRmVhdHVyZSIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0RmVhdHVyZSIsImNvbmZpZyIsImNvbHVtbnMiLCJoZWlnaHRGaWVsZCIsImhlaWdodERvbWFpbiIsImhlaWdodFNjYWxlIiwicmFkaXVzRmllbGQiLCJyYWRpdXNEb21haW4iLCJyYWRpdXNTY2FsZSIsInN0cm9rZUNvbG9yRmllbGQiLCJzdHJva2VDb2xvckRvbWFpbiIsInN0cm9rZUNvbG9yU2NhbGUiLCJvYmplY3QiLCJhbGxEYXRhIiwicHJvcGVydGllcyIsImluZGV4IiwiXyIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJjb2xvclNjYWxlIiwiY29sb3JGaWVsZCIsImNvbG9yRG9tYWluIiwiY29sb3IiLCJzaXplU2NhbGUiLCJzaXplRG9tYWluIiwic2l6ZUZpZWxkIiwidmlzQ29uZmlnIiwiZ2V0UG9zaXRpb25BY2Nlc3NvciIsImNvbHVtbiIsInVwZGF0ZUxheWVyTWV0YSIsImdlb2pzb25EYXRhIiwiZGF0YSIsInNhbWVEYXRhIiwibWFwIiwiaSIsImZpbHRlciIsImNTY2FsZSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImNvbG9ycyIsImhleFRvUmdiIiwic2NTY2FsZSIsInNTY2FsZSIsImVTY2FsZSIsInJTY2FsZSIsImdldEZpbGxDb2xvciIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJmaWxsQ29sb3IiLCJnZXRMaW5lQ29sb3IiLCJsaW5lQ29sb3IiLCJnZXRMaW5lV2lkdGgiLCJsaW5lV2lkdGgiLCJnZXRFbGV2YXRpb24iLCJlbGV2YXRpb24iLCJnZXRSYWRpdXMiLCJhbGxGZWF0dXJlcyIsIk9iamVjdCIsInZhbHVlcyIsImJvdW5kcyIsImxpZ2h0U2V0dGluZ3MiLCJnZXRMaWdodFNldHRpbmdzRnJvbUJvdW5kcyIsImZpeGVkUmFkaXVzIiwiQm9vbGVhbiIsImZpbmQiLCJmZWF0dXJlVHlwZXMiLCJyZWR1Y2UiLCJhY2N1IiwiZiIsImdlb1R5cGUiLCJnZW9tZXRyeSIsInVwZGF0ZU1ldGEiLCJtZXRhIiwicG9seWdvbiIsInVwZGF0ZUxheWVyVmlzQ29uZmlnIiwiY29sb3JNYWtlciIsIm5leHQiLCJ2YWx1ZSIsInBvaW50IiwiaWR4Iiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJnZXRSYWRpdXNTY2FsZUJ5Wm9vbSIsInpvb21GYWN0b3IiLCJnZXRab29tRmFjdG9yIiwibGF5ZXJQcm9wcyIsImxpbmVXaWR0aFNjYWxlIiwibGluZVdpZHRoTWluUGl4ZWxzIiwicG9pbnRSYWRpdXNTY2FsZSIsImxpbmVNaXRlckxpbWl0IiwidXBkYXRlVHJpZ2dlcnMiLCJEZWNrR0xHZW9Kc29uTGF5ZXIiLCJpZCIsInBpY2thYmxlIiwiaGlnaGxpZ2h0Q29sb3IiLCJISUdITElHSF9DT0xPUl8zRCIsImF1dG9IaWdobGlnaHQiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsImV4dHJ1ZGVkIiwicm91bmRlZCIsImlzTGF5ZXJIb3ZlcmVkIiwiR2VvanNvbkxheWVySWNvbiIsImZpZWxkIiwic2NhbGUiLCJkb21haW4iLCJrZXkiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJjb25kaXRpb24iLCJzaXplIiwiaGVpZ2h0IiwiZmllbGRzIiwiZ2VvanNvbkNvbHVtbnMiLCJuYW1lIiwiZGVmYXVsdENvbHVtbnMiLCJHRU9KU09OX0ZJRUxEUyIsImZvdW5kQ29sdW1ucyIsImZpbmREZWZhdWx0Q29sdW1uRmllbGQiLCJsZW5ndGgiLCJyZXBsYWNlIiwiaXNWaXNpYmxlIiwiTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFLQTs7QUFDQTs7QUFqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFpQk8sSUFBTUEsaUJBQWlCLEdBQUc7QUFDL0JDLEVBQUFBLE9BQU8sRUFBRSxTQURzQjtBQUUvQkMsRUFBQUEsU0FBUyxFQUFFO0FBQ1RDLElBQUFBLElBQUksRUFBRSxRQURHO0FBRVRDLElBQUFBLFlBQVksRUFBRSxHQUZMO0FBR1RDLElBQUFBLEtBQUssRUFBRSxjQUhFO0FBSVRDLElBQUFBLFFBQVEsRUFBRSxLQUpEO0FBS1RDLElBQUFBLEtBQUssRUFBRSxDQUFDLENBQUQsRUFBSSxHQUFKLENBTEU7QUFNVEMsSUFBQUEsSUFBSSxFQUFFLEdBTkc7QUFPVEMsSUFBQUEsS0FBSyxFQUFFLFFBUEU7QUFRVEMsSUFBQUEsUUFBUSxFQUFFO0FBUkQsR0FGb0I7QUFZL0JDLEVBQUFBLFdBQVcsRUFBRSxhQVprQjtBQWEvQkMsRUFBQUEsVUFBVSxFQUFFLFlBYm1CO0FBYy9CQyxFQUFBQSxnQkFBZ0IsRUFBRSxrQkFkYTtBQWUvQkMsRUFBQUEsTUFBTSxFQUFF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LFlBQUQsSUFBaUIsQ0FBQ0EsWUFBWSxDQUFDRSxNQUFuQyxFQUEyQztBQUN6QyxlQUFPLEVBQVA7QUFDRDs7QUFFRCxhQUFPRixZQUFZLENBQUNwRixHQUFiLENBQWlCLFVBQUFoQyxPQUFPO0FBQUEsZUFBSztBQUNsQzlCLFVBQUFBLEtBQUssRUFBRSxPQUFPQSxLQUFQLEtBQWlCLFFBQWpCLElBQTZCQSxLQUFLLENBQUNxSixPQUFOLENBQWMsV0FBZCxFQUEyQixFQUEzQixDQUE3QixJQUErRCxNQUFJLENBQUN2SixJQUR6QztBQUVsQ2dDLFVBQUFBLE9BQU8sRUFBUEEsT0FGa0M7QUFHbEN3SCxVQUFBQSxTQUFTLEVBQUU7QUFIdUIsU0FBTDtBQUFBLE9BQXhCLENBQVA7QUFLRDs7O0VBeEZ1Q0MscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5cbmltcG9ydCBMYXllciwge2NvbG9yTWFrZXJ9IGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXIgYXMgRGVja0dMR2VvSnNvbkxheWVyfSBmcm9tICdkZWNrLmdsJztcblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHtcbiAgZ2V0R2VvanNvbkRhdGFNYXBzLFxuICBnZXRHZW9qc29uQm91bmRzLFxuICBmZWF0dXJlVG9EZWNrR2xHZW9UeXBlXG59IGZyb20gJy4vZ2VvanNvbi11dGlscyc7XG5pbXBvcnQgR2VvanNvbkxheWVySWNvbiBmcm9tICcuL2dlb2pzb24tbGF5ZXItaWNvbic7XG5pbXBvcnQge0dFT0pTT05fRklFTERTLCBISUdITElHSF9DT0xPUl8zRCwgQ0hBTk5FTF9TQ0FMRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuZXhwb3J0IGNvbnN0IGdlb2pzb25WaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHRoaWNrbmVzczoge1xuICAgIHR5cGU6ICdudW1iZXInLFxuICAgIGRlZmF1bHRWYWx1ZTogMC41LFxuICAgIGxhYmVsOiAnU3Ryb2tlIFdpZHRoJyxcbiAgICBpc1JhbmdlZDogZmFsc2UsXG4gICAgcmFuZ2U6IFswLCAxMDBdLFxuICAgIHN0ZXA6IDAuMSxcbiAgICBncm91cDogJ3N0cm9rZScsXG4gICAgcHJvcGVydHk6ICd0aGlja25lc3MnXG4gIH0sXG4gIHN0cm9rZUNvbG9yOiAnc3Ryb2tlQ29sb3InLFxuICBjb2xvclJhbmdlOiAnY29sb3JSYW5nZScsXG4gIHN0cm9rZUNvbG9yUmFuZ2U6ICdzdHJva2VDb2xvclJhbmdlJyxcbiAgcmFkaXVzOiAncmFkaXVzJyxcblxuICBzaXplUmFuZ2U6ICdzdHJva2VXaWR0aFJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdyYWRpdXNSYW5nZScsXG4gIGhlaWdodFJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJyxcbiAgc3Ryb2tlZDogJ3N0cm9rZWQnLFxuICBmaWxsZWQ6ICdmaWxsZWQnLFxuICBlbmFibGUzZDogJ2VuYWJsZTNkJyxcbiAgd2lyZWZyYW1lOiAnd2lyZWZyYW1lJ1xufTtcblxuZXhwb3J0IGNvbnN0IGdlb0pzb25SZXF1aXJlZENvbHVtbnMgPSBbJ2dlb2pzb24nXTtcbmV4cG9ydCBjb25zdCBmZWF0dXJlQWNjZXNzb3IgPSAoe2dlb2pzb259KSA9PiBkID0+IGRbZ2VvanNvbi5maWVsZElkeF07XG5leHBvcnQgY29uc3QgZmVhdHVyZVJlc29sdmVyID0gKHtnZW9qc29ufSkgPT4gZ2VvanNvbi5maWVsZElkeDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VvSnNvbkxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IHt9O1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoZ2VvanNvblZpc0NvbmZpZ3MpO1xuICAgIHRoaXMuZ2V0RmVhdHVyZSA9IG1lbW9pemUoZmVhdHVyZUFjY2Vzc29yLCBmZWF0dXJlUmVzb2x2ZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdnZW9qc29uJztcbiAgfVxuXG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiAnUG9seWdvbic7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBHZW9qc29uTGF5ZXJJY29uO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBnZW9Kc29uUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscyxcbiAgICAgIHN0cm9rZUNvbG9yOiB7XG4gICAgICAgIHByb3BlcnR5OiAnc3Ryb2tlQ29sb3InLFxuICAgICAgICBmaWVsZDogJ3N0cm9rZUNvbG9yRmllbGQnLFxuICAgICAgICBzY2FsZTogJ3N0cm9rZUNvbG9yU2NhbGUnLFxuICAgICAgICBkb21haW46ICdzdHJva2VDb2xvckRvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnc3Ryb2tlQ29sb3JSYW5nZScsXG4gICAgICAgIGtleTogJ3N0cm9rZUNvbG9yJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3IsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuc3Ryb2tlZFxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdzdHJva2UnLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLnN0cm9rZWRcbiAgICAgIH0sXG4gICAgICBoZWlnaHQ6IHtcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICBmaWVsZDogJ2hlaWdodEZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdoZWlnaHRTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ2hlaWdodERvbWFpbicsXG4gICAgICAgIHJhbmdlOiAnaGVpZ2h0UmFuZ2UnLFxuICAgICAgICBrZXk6ICdoZWlnaHQnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiAnc2l6ZScsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuZW5hYmxlM2RcbiAgICAgIH0sXG4gICAgICByYWRpdXM6IHtcbiAgICAgICAgcHJvcGVydHk6ICdyYWRpdXMnLFxuICAgICAgICBmaWVsZDogJ3JhZGl1c0ZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdyYWRpdXNTY2FsZScsXG4gICAgICAgIGRvbWFpbjogJ3JhZGl1c0RvbWFpbicsXG4gICAgICAgIHJhbmdlOiAncmFkaXVzUmFuZ2UnLFxuICAgICAgICBrZXk6ICdyYWRpdXMnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiAncmFkaXVzJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXRQb3NpdGlvbkFjY2Vzc29yKCkge1xuICAgIHJldHVybiB0aGlzLmdldEZlYXR1cmUodGhpcy5jb25maWcuY29sdW1ucyk7XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtsYWJlbCwgZmllbGRzfSkge1xuICAgIGNvbnN0IGdlb2pzb25Db2x1bW5zID0gZmllbGRzXG4gICAgICAuZmlsdGVyKGYgPT4gZi50eXBlID09PSAnZ2VvanNvbicpXG4gICAgICAubWFwKGYgPT4gZi5uYW1lKTtcblxuICAgIGNvbnN0IGRlZmF1bHRDb2x1bW5zID0ge1xuICAgICAgZ2VvanNvbjogdW5pcShbLi4uR0VPSlNPTl9GSUVMRFMuZ2VvanNvbiwgLi4uZ2VvanNvbkNvbHVtbnNdKVxuICAgIH07XG5cbiAgICBjb25zdCBmb3VuZENvbHVtbnMgPSB0aGlzLmZpbmREZWZhdWx0Q29sdW1uRmllbGQoZGVmYXVsdENvbHVtbnMsIGZpZWxkcyk7XG4gICAgaWYgKCFmb3VuZENvbHVtbnMgfHwgIWZvdW5kQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmRDb2x1bW5zLm1hcChjb2x1bW5zID0+ICh7XG4gICAgICBsYWJlbDogdHlwZW9mIGxhYmVsID09PSAnc3RyaW5nJyAmJiBsYWJlbC5yZXBsYWNlKC9cXC5bXi8uXSskLywgJycpIHx8IHRoaXMudHlwZSxcbiAgICAgIGNvbHVtbnMsXG4gICAgICBpc1Zpc2libGU6IHRydWVcbiAgICB9KSk7XG4gIH1cblxuICBnZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMgPSB7fSkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci5nZXREZWZhdWx0TGF5ZXJDb25maWcocHJvcHMpLFxuXG4gICAgICAvLyBhZGQgaGVpZ2h0IHZpc3VhbCBjaGFubmVsXG4gICAgICBoZWlnaHRGaWVsZDogbnVsbCxcbiAgICAgIGhlaWdodERvbWFpbjogWzAsIDFdLFxuICAgICAgaGVpZ2h0U2NhbGU6ICdsaW5lYXInLFxuXG4gICAgICAvLyBhZGQgcmFkaXVzIHZpc3VhbCBjaGFubmVsXG4gICAgICByYWRpdXNGaWVsZDogbnVsbCxcbiAgICAgIHJhZGl1c0RvbWFpbjogWzAsIDFdLFxuICAgICAgcmFkaXVzU2NhbGU6ICdsaW5lYXInLFxuXG4gICAgICAvLyBhZGQgc3Ryb2tlIGNvbG9yIHZpc3VhbCBjaGFubmVsXG4gICAgICBzdHJva2VDb2xvckZpZWxkOiBudWxsLFxuICAgICAgc3Ryb2tlQ29sb3JEb21haW46IFswLCAxXSxcbiAgICAgIHN0cm9rZUNvbG9yU2NhbGU6ICdxdWFudGlsZSdcbiAgICB9O1xuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCwgYWxsRGF0YSkge1xuICAgIC8vIGluZGV4IG9mIGFsbERhdGEgaXMgc2F2ZWQgdG8gZmVhdHVyZS5wcm9wZXJ0aWVzXG4gICAgcmV0dXJuIGFsbERhdGFbb2JqZWN0LnByb3BlcnRpZXMuaW5kZXhdO1xuICB9XG5cbiAgLy8gVE9ETzogZml4IGNvbXBsZXhpdHlcbiAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbG9yU2NhbGUsXG4gICAgICBjb2xvckZpZWxkLFxuICAgICAgY29sb3JEb21haW4sXG4gICAgICBzdHJva2VDb2xvckZpZWxkLFxuICAgICAgc3Ryb2tlQ29sb3JTY2FsZSxcbiAgICAgIHN0cm9rZUNvbG9yRG9tYWluLFxuICAgICAgY29sb3IsXG4gICAgICBzaXplU2NhbGUsXG4gICAgICBzaXplRG9tYWluLFxuICAgICAgc2l6ZUZpZWxkLFxuICAgICAgaGVpZ2h0RmllbGQsXG4gICAgICBoZWlnaHREb21haW4sXG4gICAgICBoZWlnaHRTY2FsZSxcbiAgICAgIHJhZGl1c0ZpZWxkLFxuICAgICAgcmFkaXVzRG9tYWluLFxuICAgICAgcmFkaXVzU2NhbGUsXG4gICAgICB2aXNDb25maWdcbiAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICBjb25zdCB7XG4gICAgICBlbmFibGUzZCxcbiAgICAgIHN0cm9rZWQsXG4gICAgICBjb2xvclJhbmdlLFxuICAgICAgaGVpZ2h0UmFuZ2UsXG4gICAgICBzaXplUmFuZ2UsXG4gICAgICByYWRpdXNSYW5nZSxcbiAgICAgIHN0cm9rZUNvbG9yUmFuZ2UsXG4gICAgICBzdHJva2VDb2xvclxuICAgIH0gPSB2aXNDb25maWc7XG5cbiAgICBjb25zdCBnZXRGZWF0dXJlID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKHRoaXMuY29uZmlnLmNvbHVtbik7XG5cbiAgICAvLyBnZW9qc29uIGZlYXR1cmUgYXJlIG9iamVjdCwgaWYgZG9lc24ndCBleGlzdHNcbiAgICAvLyBjcmVhdGUgaXQgYW5kIHNhdmUgdG8gbGF5ZXJcbiAgICBpZiAoIW9sZExheWVyRGF0YSB8fCBvbGRMYXllckRhdGEuZ2V0RmVhdHVyZSAhPT0gZ2V0RmVhdHVyZSkge1xuICAgICAgdGhpcy51cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0RmVhdHVyZSk7XG4gICAgfVxuXG4gICAgbGV0IGdlb2pzb25EYXRhO1xuXG4gICAgaWYgKFxuICAgICAgb2xkTGF5ZXJEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZGF0YSAmJlxuICAgICAgb3B0LnNhbWVEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZ2V0RmVhdHVyZSA9PT0gZ2V0RmVhdHVyZVxuICAgICkge1xuICAgICAgLy8gbm8gbmVlZCB0byBjcmVhdGUgYSBuZXcgYXJyYXkgb2YgZGF0YVxuICAgICAgLy8gdXNlIHVwZGF0ZVRyaWdnZXJzIHRvIHNlbGVjdGl2ZWx5IHJlLWNhbGN1bGF0ZSBhdHRyaWJ1dGVzXG4gICAgICBnZW9qc29uRGF0YSA9IG9sZExheWVyRGF0YS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmaWx0ZXJlZEluZGV4IGlzIGEgcmVmZXJlbmNlIG9mIGluZGV4IGluIGFsbERhdGEgd2hpY2ggY2FuIG1hcCB0byBmZWF0dXJlXG4gICAgICBnZW9qc29uRGF0YSA9IGZpbHRlcmVkSW5kZXhcbiAgICAgICAgLm1hcChpID0+IHRoaXMuZGF0YVRvRmVhdHVyZVtpXSlcbiAgICAgICAgLmZpbHRlcihkID0+IGQpO1xuICAgIH1cblxuICAgIC8vIGZpbGwgY29sb3JcbiAgICBjb25zdCBjU2NhbGUgPVxuICAgICAgY29sb3JGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoXG4gICAgICAgIGNvbG9yU2NhbGUsXG4gICAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgICBjb2xvclJhbmdlLmNvbG9ycy5tYXAoaGV4VG9SZ2IpXG4gICAgICApO1xuXG4gICAgLy8gc3Ryb2tlIGNvbG9yXG4gICAgY29uc3Qgc2NTY2FsZSA9XG4gICAgICBzdHJva2VDb2xvckZpZWxkICYmXG4gICAgICB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShcbiAgICAgICAgc3Ryb2tlQ29sb3JTY2FsZSxcbiAgICAgICAgc3Ryb2tlQ29sb3JEb21haW4sXG4gICAgICAgIHN0cm9rZUNvbG9yUmFuZ2UuY29sb3JzLm1hcChoZXhUb1JnYilcbiAgICAgICk7XG4gICAgLy8gY2FsY3VsYXRlIHN0cm9rZSBzY2FsZSAtIGlmIHN0cm9rZWQgPSB0cnVlXG4gICAgY29uc3Qgc1NjYWxlID1cbiAgICAgIHNpemVGaWVsZCAmJlxuICAgICAgc3Ryb2tlZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoc2l6ZVNjYWxlLCBzaXplRG9tYWluLCBzaXplUmFuZ2UpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGVsZXZhdGlvbiBzY2FsZSAtIGlmIGV4dHJ1ZGVkID0gdHJ1ZVxuICAgIGNvbnN0IGVTY2FsZSA9XG4gICAgICBoZWlnaHRGaWVsZCAmJlxuICAgICAgZW5hYmxlM2QgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKGhlaWdodFNjYWxlLCBoZWlnaHREb21haW4sIGhlaWdodFJhbmdlKTtcblxuICAgIC8vIHBvaW50IHJhZGl1c1xuICAgIGNvbnN0IHJTY2FsZSA9XG4gICAgICByYWRpdXNGaWVsZCAmJlxuICAgICAgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUocmFkaXVzU2NhbGUsIHJhZGl1c0RvbWFpbiwgcmFkaXVzUmFuZ2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGE6IGdlb2pzb25EYXRhLFxuICAgICAgZ2V0RmVhdHVyZSxcbiAgICAgIGdldEZpbGxDb2xvcjogZCA9PlxuICAgICAgICBjU2NhbGVcbiAgICAgICAgICA/IHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICAgICAgICAgICAgY1NjYWxlLFxuICAgICAgICAgICAgICBhbGxEYXRhW2QucHJvcGVydGllcy5pbmRleF0sXG4gICAgICAgICAgICAgIGNvbG9yRmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5maWxsQ29sb3IgfHwgY29sb3IsXG4gICAgICBnZXRMaW5lQ29sb3I6IGQgPT5cbiAgICAgICAgc2NTY2FsZVxuICAgICAgICAgID8gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKFxuICAgICAgICAgICAgICBzY1NjYWxlLFxuICAgICAgICAgICAgICBhbGxEYXRhW2QucHJvcGVydGllcy5pbmRleF0sXG4gICAgICAgICAgICAgIHN0cm9rZUNvbG9yRmllbGRcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5saW5lQ29sb3IgfHwgc3Ryb2tlQ29sb3IgfHwgY29sb3IsXG4gICAgICBnZXRMaW5lV2lkdGg6IGQgPT5cbiAgICAgICAgc1NjYWxlXG4gICAgICAgICAgPyB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoXG4gICAgICAgICAgICAgIHNTY2FsZSxcbiAgICAgICAgICAgICAgYWxsRGF0YVtkLnByb3BlcnRpZXMuaW5kZXhdLFxuICAgICAgICAgICAgICBzaXplRmllbGQsXG4gICAgICAgICAgICAgIDBcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IGQucHJvcGVydGllcy5saW5lV2lkdGggfHwgMSxcbiAgICAgIGdldEVsZXZhdGlvbjogZCA9PlxuICAgICAgICBlU2NhbGVcbiAgICAgICAgICA/IHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICAgICAgICAgICAgZVNjYWxlLFxuICAgICAgICAgICAgICBhbGxEYXRhW2QucHJvcGVydGllcy5pbmRleF0sXG4gICAgICAgICAgICAgIGhlaWdodEZpZWxkLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBkLnByb3BlcnRpZXMuZWxldmF0aW9uIHx8IDUwMCxcbiAgICAgIGdldFJhZGl1czogZCA9PlxuICAgICAgICByU2NhbGVcbiAgICAgICAgICA/IHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShcbiAgICAgICAgICAgICAgclNjYWxlLFxuICAgICAgICAgICAgICBhbGxEYXRhW2QucHJvcGVydGllcy5pbmRleF0sXG4gICAgICAgICAgICAgIHJhZGl1c0ZpZWxkLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBkLnByb3BlcnRpZXMucmFkaXVzIHx8IDFcbiAgICB9O1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuXG4gIHVwZGF0ZUxheWVyTWV0YShhbGxEYXRhKSB7XG4gICAgY29uc3QgZ2V0RmVhdHVyZSA9IHRoaXMuZ2V0UG9zaXRpb25BY2Nlc3NvcigpO1xuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IGdldEdlb2pzb25EYXRhTWFwcyhhbGxEYXRhLCBnZXRGZWF0dXJlKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBsYXllciBtZXRhXG4gICAgY29uc3QgYWxsRmVhdHVyZXMgPSBPYmplY3QudmFsdWVzKHRoaXMuZGF0YVRvRmVhdHVyZSk7XG5cbiAgICAvLyBnZXQgYm91bmRzIGZyb20gZmVhdHVyZXNcbiAgICBjb25zdCBib3VuZHMgPSBnZXRHZW9qc29uQm91bmRzKGFsbEZlYXR1cmVzKTtcblxuICAgIC8vIGdldCBsaWdodFNldHRpbmdzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgbGlnaHRTZXR0aW5ncyA9IHRoaXMuZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKTtcblxuICAgIC8vIGlmIGFueSBvZiB0aGUgZmVhdHVyZSBoYXMgcHJvcGVydGllcy5yYWRpdXMgc2V0IHRvIGJlIHRydWVcbiAgICBjb25zdCBmaXhlZFJhZGl1cyA9IEJvb2xlYW4oXG4gICAgICBhbGxGZWF0dXJlcy5maW5kKGQgPT4gZCAmJiBkLnByb3BlcnRpZXMgJiYgZC5wcm9wZXJ0aWVzLnJhZGl1cylcbiAgICApO1xuXG4gICAgLy8ga2VlcCBhIHJlY29yZCBvZiB3aGF0IHR5cGUgb2YgZ2VvbWV0cnkgdGhlIGNvbGxlY3Rpb24gaGFzXG4gICAgY29uc3QgZmVhdHVyZVR5cGVzID0gYWxsRmVhdHVyZXMucmVkdWNlKChhY2N1LCBmKSA9PiB7XG4gICAgICBjb25zdCBnZW9UeXBlID0gZmVhdHVyZVRvRGVja0dsR2VvVHlwZShcbiAgICAgICAgZiAmJiBmLmdlb21ldHJ5ICYmIGYuZ2VvbWV0cnkudHlwZVxuICAgICAgKTtcblxuICAgICAgaWYgKGdlb1R5cGUpIHtcbiAgICAgICAgYWNjdVtnZW9UeXBlXSA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjdTtcbiAgICB9LCB7fSk7XG5cbiAgICB0aGlzLnVwZGF0ZU1ldGEoe2JvdW5kcywgbGlnaHRTZXR0aW5ncywgZml4ZWRSYWRpdXMsIGZlYXR1cmVUeXBlc30pO1xuICB9XG5cbiAgc2V0SW5pdGlhbExheWVyQ29uZmlnKGFsbERhdGEpIHtcbiAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShhbGxEYXRhKTtcbiAgICBjb25zdCB7ZmVhdHVyZVR5cGVzfSA9IHRoaXMubWV0YTtcbiAgICAvLyBkZWZhdWx0IHNldHRpbmdzIGlzIHN0cm9rZTogdHJ1ZSwgZmlsbGVkOiBmYWxzZVxuICAgIGlmIChmZWF0dXJlVHlwZXMgJiYgZmVhdHVyZVR5cGVzLnBvbHlnb24pIHtcbiAgICAgIC8vIHNldCBib3RoIGZpbGwgYW5kIHN0cm9rZSB0byB0cnVlXG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVMYXllclZpc0NvbmZpZyh7XG4gICAgICAgIGZpbGxlZDogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlZDogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlQ29sb3I6IGNvbG9yTWFrZXIubmV4dCgpLnZhbHVlXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGZlYXR1cmVUeXBlcyAmJiBmZWF0dXJlVHlwZXMucG9pbnQpIHtcbiAgICAgIC8vIHNldCBmaWxsIHRvIHRydWUgaWYgZGV0ZWN0IHBvaW50XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVMYXllclZpc0NvbmZpZyh7ZmlsbGVkOiB0cnVlLCBzdHJva2VkOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIoe1xuICAgIGRhdGEsXG4gICAgaWR4LFxuICAgIG9iamVjdEhvdmVyZWQsXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfSkge1xuICAgIGNvbnN0IHtsaWdodFNldHRpbmdzLCBmaXhlZFJhZGl1c30gPSB0aGlzLm1ldGE7XG4gICAgY29uc3QgcmFkaXVzU2NhbGUgPSB0aGlzLmdldFJhZGl1c1NjYWxlQnlab29tKG1hcFN0YXRlLCBmaXhlZFJhZGl1cyk7XG4gICAgY29uc3Qgem9vbUZhY3RvciA9IHRoaXMuZ2V0Wm9vbUZhY3RvcihtYXBTdGF0ZSk7XG4gICAgY29uc3Qge3Zpc0NvbmZpZ30gPSB0aGlzLmNvbmZpZztcblxuICAgIGNvbnN0IGxheWVyUHJvcHMgPSB7XG4gICAgICAvLyBtdWx0aXBsaWVyIGFwcGxpZWQganVzdCBzbyBpdCBiZWluZyBjb25zaXN0ZW50IHdpdGggcHJldmlvdXNseSBzYXZlZCBtYXBzXG4gICAgICBsaW5lV2lkdGhTY2FsZTogdmlzQ29uZmlnLnRoaWNrbmVzcyAqIHpvb21GYWN0b3IgKiA4LFxuICAgICAgbGluZVdpZHRoTWluUGl4ZWxzOiAxLFxuICAgICAgZWxldmF0aW9uU2NhbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25TY2FsZSxcbiAgICAgIHBvaW50UmFkaXVzU2NhbGU6IHJhZGl1c1NjYWxlLFxuICAgICAgbGluZU1pdGVyTGltaXQ6IDRcbiAgICB9O1xuXG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRFbGV2YXRpb246IHtcbiAgICAgICAgaGVpZ2h0RmllbGQ6IHRoaXMuY29uZmlnLmhlaWdodEZpZWxkLFxuICAgICAgICBoZWlnaHRTY2FsZTogdGhpcy5jb25maWcuaGVpZ2h0U2NhbGUsXG4gICAgICAgIGhlaWdodFJhbmdlOiB2aXNDb25maWcuaGVpZ2h0UmFuZ2VcbiAgICAgIH0sXG4gICAgICBnZXRGaWxsQ29sb3I6IHtcbiAgICAgICAgY29sb3I6IHRoaXMuY29uZmlnLmNvbG9yLFxuICAgICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgICBjb2xvclJhbmdlOiB2aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZVxuICAgICAgfSxcbiAgICAgIGdldExpbmVDb2xvcjoge1xuICAgICAgICBjb2xvcjogdmlzQ29uZmlnLnN0cm9rZUNvbG9yLFxuICAgICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5zdHJva2VDb2xvckZpZWxkLFxuICAgICAgICBjb2xvclJhbmdlOiB2aXNDb25maWcuc3Ryb2tlQ29sb3JSYW5nZSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuc3Ryb2tlQ29sb3JTY2FsZVxuICAgICAgfSxcbiAgICAgIGdldExpbmVXaWR0aDoge1xuICAgICAgICBzaXplRmllbGQ6IHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgc2l6ZVJhbmdlOiB2aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0UmFkaXVzOiB7XG4gICAgICAgIHJhZGl1c0ZpZWxkOiB0aGlzLmNvbmZpZy5yYWRpdXNGaWVsZCxcbiAgICAgICAgcmFkaXVzUmFuZ2U6IHZpc0NvbmZpZy5yYWRpdXNSYW5nZVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tHTEdlb0pzb25MYXllcih7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgZ2V0RmlsbENvbG9yOiBkYXRhLmdldEZpbGxDb2xvcixcbiAgICAgICAgZ2V0TGluZUNvbG9yOiBkYXRhLmdldExpbmVDb2xvcixcbiAgICAgICAgZ2V0TGluZVdpZHRoOiBkYXRhLmdldExpbmVXaWR0aCxcbiAgICAgICAgZ2V0UmFkaXVzOiBkYXRhLmdldFJhZGl1cyxcbiAgICAgICAgZ2V0RWxldmF0aW9uOiBkYXRhLmdldEVsZXZhdGlvbixcbiAgICAgICAgLy8gaGlnaGxpZ2h0XG4gICAgICAgIHBpY2thYmxlOiB0cnVlLFxuICAgICAgICBoaWdobGlnaHRDb2xvcjogSElHSExJR0hfQ09MT1JfM0QsXG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHZpc0NvbmZpZy5lbmFibGUzZCxcbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBCb29sZWFuKHZpc0NvbmZpZy5lbmFibGUzZCB8fCBtYXBTdGF0ZS5kcmFnUm90YXRlKX0sXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBzdHJva2VkOiB2aXNDb25maWcuc3Ryb2tlZCxcbiAgICAgICAgZmlsbGVkOiB2aXNDb25maWcuZmlsbGVkLFxuICAgICAgICBleHRydWRlZDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICB3aXJlZnJhbWU6IHZpc0NvbmZpZy53aXJlZnJhbWUsXG4gICAgICAgIGxpbmVNaXRlckxpbWl0OiAyLFxuICAgICAgICByb3VuZGVkOiB0cnVlLFxuICAgICAgICBsaWdodFNldHRpbmdzLFxuICAgICAgICB1cGRhdGVUcmlnZ2Vyc1xuICAgICAgfSksXG4gICAgICAuLi4odGhpcy5pc0xheWVySG92ZXJlZChvYmplY3RIb3ZlcmVkKSAmJiAhdmlzQ29uZmlnLmVuYWJsZTNkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IERlY2tHTEdlb0pzb25MYXllcih7XG4gICAgICAgICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgICAgICAgICAgZGF0YTogW29iamVjdEhvdmVyZWQub2JqZWN0XSxcbiAgICAgICAgICAgICAgZ2V0TGluZVdpZHRoOiBkYXRhLmdldExpbmVXaWR0aCxcbiAgICAgICAgICAgICAgZ2V0UmFkaXVzOiBkYXRhLmdldFJhZGl1cyxcbiAgICAgICAgICAgICAgZ2V0RWxldmF0aW9uOiBkYXRhLmdldEVsZXZhdGlvbixcbiAgICAgICAgICAgICAgZ2V0TGluZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgZ2V0RmlsbENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgdXBkYXRlVHJpZ2dlcnMsXG4gICAgICAgICAgICAgIHN0cm9rZWQ6IHRydWUsXG4gICAgICAgICAgICAgIHBpY2thYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZmlsbGVkOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19