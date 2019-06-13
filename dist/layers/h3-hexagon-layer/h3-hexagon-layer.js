"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.HexagonIdVisConfigs = exports.hexIdResolver = exports.hexIdAccessor = exports.hexIdRequiredColumns = exports.HEXAGON_ID_FIELDS = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _deck = require("deck.gl");

var _h3HexagonCellLayer = _interopRequireDefault(require("../../deckgl-layers/h3-hexagon-cell-layer/h3-hexagon-cell-layer"));

var _h3Utils = require("./h3-utils");

var _h3HexagonLayerIcon = _interopRequireDefault(require("./h3-hexagon-layer-icon"));

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
var HEXAGON_ID_FIELDS = {
  hex_id: ['hex_id', 'hexagon_id', 'h3_id']
};
exports.HEXAGON_ID_FIELDS = HEXAGON_ID_FIELDS;
var hexIdRequiredColumns = ['hex_id'];
exports.hexIdRequiredColumns = hexIdRequiredColumns;

var hexIdAccessor = function hexIdAccessor(_ref) {
  var hex_id = _ref.hex_id;
  return function (d) {
    return d[hex_id.fieldIdx];
  };
};

exports.hexIdAccessor = hexIdAccessor;

var hexIdResolver = function hexIdResolver(_ref2) {
  var hex_id = _ref2.hex_id;
  return hex_id.fieldIdx;
};

exports.hexIdResolver = hexIdResolver;
var HexagonIdVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  coverageRange: 'coverageRange',
  elevationScale: 'elevationScale'
};
exports.HexagonIdVisConfigs = HexagonIdVisConfigs;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  return [r, g, b];
}

var HexagonIdLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2["default"])(HexagonIdLayer, _Layer);

  function HexagonIdLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, HexagonIdLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HexagonIdLayer).call(this, props));

    _this.registerVisConfig(HexagonIdVisConfigs);

    _this.getHexId = (0, _lodash["default"])(hexIdAccessor, hexIdResolver);
    return _this;
  }

  (0, _createClass2["default"])(HexagonIdLayer, [{
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(HexagonIdLayer.prototype), "getDefaultLayerConfig", this).call(this, props), {
        // add height visual channel
        coverageField: null,
        coverageDomain: [0, 1],
        coverageScale: 'linear'
      });
    } // TODO: fix complexity

    /* eslint-disable complexity */

  }, {
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _this$config = this.config,
          colorScale = _this$config.colorScale,
          colorDomain = _this$config.colorDomain,
          colorField = _this$config.colorField,
          color = _this$config.color,
          columns = _this$config.columns,
          sizeField = _this$config.sizeField,
          sizeScale = _this$config.sizeScale,
          sizeDomain = _this$config.sizeDomain,
          coverageField = _this$config.coverageField,
          coverageScale = _this$config.coverageScale,
          coverageDomain = _this$config.coverageDomain,
          _this$config$visConfi = _this$config.visConfig,
          sizeRange = _this$config$visConfi.sizeRange,
          colorRange = _this$config$visConfi.colorRange,
          coverageRange = _this$config$visConfi.coverageRange; // color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(function (c) {
        return hexToRgb(c);
      })); // height

      var sScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange); // coverage

      var coScale = coverageField && this.getVisChannelScale(coverageScale, coverageDomain, coverageRange);
      var getHexId = this.getHexId(columns);

      if (!oldLayerData || oldLayerData.getHexId !== getHexId) {
        this.updateLayerMeta(allData, getHexId);
      }

      var data;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getHexId === getHexId) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.reduce(function (accu, index, i) {
          var id = getHexId(allData[index]);
          var centroid = _this2.dataToFeature.centroids[index];

          if (centroid) {
            accu.push({
              // keep a reference to the original data index
              index: i,
              data: allData[index],
              id: id,
              centroid: centroid
            });
          }

          return accu;
        }, []);
      }

      var getElevation = sScale ? function (d) {
        return _this2.getEncodedChannelValue(sScale, d.data, sizeField, 0);
      } : 0;
      var getColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : color;
      var getCoverage = coScale ? function (d) {
        return _this2.getEncodedChannelValue(coScale, d.data, coverageField, 0);
      } : 1; // const layerData = {

      return {
        data: data,
        getElevation: getElevation,
        getColor: getColor,
        getHexId: getHexId,
        getCoverage: getCoverage,
        hexagonVertices: this.dataToFeature.hexagonVertices,
        hexagonCenter: this.dataToFeature.hexagonCenter
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData, getHexId) {
      var hexagonVertices;
      var hexagonCenter;
      var centroids = {};
      allData.forEach(function (d, index) {
        var id = getHexId(d);

        if (typeof id !== 'string' || !id.length) {
          return;
        } // find hexagonVertices
        // only need 1 instance of hexagonVertices


        if (!hexagonVertices) {
          hexagonVertices = id && (0, _h3Utils.getVertices)({
            id: id
          });
          hexagonCenter = id && (0, _h3Utils.getCentroid)({
            id: id
          });
        } // save a reference of centroids to dataToFeature
        // so we don't have to re calculate it again


        centroids[index] = (0, _h3Utils.getCentroid)({
          id: id
        });
      });
      var bounds = this.getPointsBounds(Object.values(centroids), function (d) {
        return d;
      });
      var lightSettings = this.getLightSettingsFromBounds(bounds);
      this.dataToFeature = {
        hexagonVertices: hexagonVertices,
        hexagonCenter: hexagonCenter,
        centroids: centroids
      };
      this.updateMeta({
        bounds: bounds,
        lightSettings: lightSettings
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          layerInteraction = _ref3.layerInteraction,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var config = this.config,
          meta = this.meta;
      var visConfig = config.visConfig;
      var updateTriggers = {
        getColor: {
          color: config.color,
          colorField: config.colorField,
          colorRange: config.visConfig.colorRange,
          colorScale: config.colorScale
        },
        getElevation: {
          sizeField: config.sizeField,
          sizeRange: config.visConfig.sizeRange
        },
        getCoverage: {
          coverageField: config.coverageField,
          coverageRange: config.visConfig.coverageRange
        }
      };
      return [new _h3HexagonCellLayer["default"]((0, _objectSpread2["default"])({}, layerInteraction, data, {
        id: this.id,
        idx: idx,
        pickable: true,
        // coverage
        coverage: config.coverageField ? 1 : visConfig.coverage,
        // parameters
        parameters: {
          depthTest: Boolean(config.sizeField || mapState.dragRotate)
        },
        // highlight
        autoHighlight: Boolean(config.sizeField),
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // elevation
        extruded: Boolean(config.sizeField),
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        // color
        opacity: visConfig.opacity,
        // render
        lightSettings: meta.lightSettings,
        updateTriggers: updateTriggers
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) && !config.sizeField ? [new _deck.GeoJsonLayer({
        id: "".concat(this.id, "-hovered"),
        data: [(0, _h3Utils.idToPolygonGeo)(objectHovered)],
        getLineColor: config.highlightColor,
        lineWidthScale: 8 * zoomFactor
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'hexagonId';
    }
  }, {
    key: "name",
    get: function get() {
      return 'H3';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return hexIdRequiredColumns;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      // use hexagon layer icon for now
      return _h3HexagonLayerIcon["default"];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(HexagonIdLayer.prototype), "visualChannels", this), {
        size: (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(HexagonIdLayer.prototype), "visualChannels", this).size, {
          property: 'height'
        }),
        coverage: {
          property: 'coverage',
          field: 'coverageField',
          scale: 'coverageScale',
          domain: 'coverageDomain',
          range: 'coverageRange',
          key: 'coverage',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.radius
        }
      });
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var fields = _ref4.fields;
      var foundColumns = this.findDefaultColumnField(HEXAGON_ID_FIELDS, fields);

      if (!foundColumns || !foundColumns.length) {
        return null;
      }

      return foundColumns.map(function (columns) {
        return {
          isVisible: true,
          label: 'H3 Hexagon',
          columns: columns
        };
      });
    }
  }]);
  return HexagonIdLayer;
}(_baseLayer["default"]);

exports["default"] = HexagonIdLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaDMtaGV4YWdvbi1sYXllci9oMy1oZXhhZ29uLWxheWVyLmpzIl0sIm5hbWVzIjpbIkhFWEFHT05fSURfRklFTERTIiwiaGV4X2lkIiwiaGV4SWRSZXF1aXJlZENvbHVtbnMiLCJoZXhJZEFjY2Vzc29yIiwiZCIsImZpZWxkSWR4IiwiaGV4SWRSZXNvbHZlciIsIkhleGFnb25JZFZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsImNvdmVyYWdlIiwic2l6ZVJhbmdlIiwiY292ZXJhZ2VSYW5nZSIsImVsZXZhdGlvblNjYWxlIiwiaGV4VG9SZ2IiLCJoZXgiLCJyZXN1bHQiLCJleGVjIiwiciIsInBhcnNlSW50IiwiZyIsImIiLCJIZXhhZ29uSWRMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRIZXhJZCIsImNvdmVyYWdlRmllbGQiLCJjb3ZlcmFnZURvbWFpbiIsImNvdmVyYWdlU2NhbGUiLCJfIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJjb25maWciLCJjb2xvclNjYWxlIiwiY29sb3JEb21haW4iLCJjb2xvckZpZWxkIiwiY29sb3IiLCJjb2x1bW5zIiwic2l6ZUZpZWxkIiwic2l6ZVNjYWxlIiwic2l6ZURvbWFpbiIsInZpc0NvbmZpZyIsImNTY2FsZSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImNvbG9ycyIsIm1hcCIsImMiLCJzU2NhbGUiLCJjb1NjYWxlIiwidXBkYXRlTGF5ZXJNZXRhIiwiZGF0YSIsInNhbWVEYXRhIiwicmVkdWNlIiwiYWNjdSIsImluZGV4IiwiaSIsImlkIiwiY2VudHJvaWQiLCJkYXRhVG9GZWF0dXJlIiwiY2VudHJvaWRzIiwicHVzaCIsImdldEVsZXZhdGlvbiIsImdldEVuY29kZWRDaGFubmVsVmFsdWUiLCJnZXRDb2xvciIsImdldENvdmVyYWdlIiwiaGV4YWdvblZlcnRpY2VzIiwiaGV4YWdvbkNlbnRlciIsImZvckVhY2giLCJsZW5ndGgiLCJib3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJsaWdodFNldHRpbmdzIiwiZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMiLCJ1cGRhdGVNZXRhIiwiaWR4IiwibGF5ZXJJbnRlcmFjdGlvbiIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsImludGVyYWN0aW9uQ29uZmlnIiwiem9vbUZhY3RvciIsImdldFpvb21GYWN0b3IiLCJlbGVab29tRmFjdG9yIiwiZ2V0RWxldmF0aW9uWm9vbUZhY3RvciIsIm1ldGEiLCJ1cGRhdGVUcmlnZ2VycyIsIkgzSGV4YWdvbkNlbGxMYXllciIsInBpY2thYmxlIiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsIkJvb2xlYW4iLCJkcmFnUm90YXRlIiwiYXV0b0hpZ2hsaWdodCIsImhpZ2hsaWdodENvbG9yIiwiSElHSExJR0hfQ09MT1JfM0QiLCJleHRydWRlZCIsImlzTGF5ZXJIb3ZlcmVkIiwiR2VvSnNvbkxheWVyIiwiZ2V0TGluZUNvbG9yIiwibGluZVdpZHRoU2NhbGUiLCJIM0hleGFnb25MYXllckljb24iLCJzaXplIiwicHJvcGVydHkiLCJmaWVsZCIsInNjYWxlIiwiZG9tYWluIiwicmFuZ2UiLCJrZXkiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJyYWRpdXMiLCJmaWVsZHMiLCJmb3VuZENvbHVtbnMiLCJmaW5kRGVmYXVsdENvbHVtbkZpZWxkIiwiaXNWaXNpYmxlIiwibGFiZWwiLCJMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUEzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFXTyxJQUFNQSxpQkFBaUIsR0FBRztB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Q0EsVUFBSSxDQUFDQyxZQUFELElBQWlCLENBQUNBLFlBQVksQ0FBQzdDLE1BQW5DLEVBQTJDO0FBQ3pDLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU82QyxZQUFZLENBQUNwRSxHQUFiLENBQWlCLFVBQUFSLE9BQU87QUFBQSxlQUFLO0FBQ2xDOEUsVUFBQUEsU0FBUyxFQUFFLElBRHVCO0FBRWxDQyxVQUFBQSxLQUFLLEVBQUUsWUFGMkI7QUFHbEMvRSxVQUFBQSxPQUFPLEVBQVBBO0FBSGtDLFNBQUw7QUFBQSxPQUF4QixDQUFQO0FBS0Q7OztFQXREeUNnRixxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtHZW9Kc29uTGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IEgzSGV4YWdvbkNlbGxMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2gzLWhleGFnb24tY2VsbC1sYXllci9oMy1oZXhhZ29uLWNlbGwtbGF5ZXInO1xuaW1wb3J0IHtnZXRWZXJ0aWNlcywgZ2V0Q2VudHJvaWQsIGlkVG9Qb2x5Z29uR2VvfSBmcm9tICcuL2gzLXV0aWxzJztcbmltcG9ydCBIM0hleGFnb25MYXllckljb24gZnJvbSAnLi9oMy1oZXhhZ29uLWxheWVyLWljb24nO1xuaW1wb3J0IHtDSEFOTkVMX1NDQUxFUywgSElHSExJR0hfQ09MT1JfM0R9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuZXhwb3J0IGNvbnN0IEhFWEFHT05fSURfRklFTERTID0ge1xuICBoZXhfaWQ6IFsnaGV4X2lkJywgJ2hleGFnb25faWQnLCAnaDNfaWQnXVxufTtcblxuZXhwb3J0IGNvbnN0IGhleElkUmVxdWlyZWRDb2x1bW5zID0gWydoZXhfaWQnXTtcbmV4cG9ydCBjb25zdCBoZXhJZEFjY2Vzc29yID0gKHtoZXhfaWR9KSA9PiBkID0+IGRbaGV4X2lkLmZpZWxkSWR4XTtcbmV4cG9ydCBjb25zdCBoZXhJZFJlc29sdmVyID0gKHtoZXhfaWR9KSA9PiBoZXhfaWQuZmllbGRJZHg7XG5cbmV4cG9ydCBjb25zdCBIZXhhZ29uSWRWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgY292ZXJhZ2U6ICdjb3ZlcmFnZScsXG4gIHNpemVSYW5nZTogJ2VsZXZhdGlvblJhbmdlJyxcbiAgY292ZXJhZ2VSYW5nZTogJ2NvdmVyYWdlUmFuZ2UnLFxuICBlbGV2YXRpb25TY2FsZTogJ2VsZXZhdGlvblNjYWxlJ1xufTtcblxuZnVuY3Rpb24gaGV4VG9SZ2IoaGV4KSB7XG4gIGNvbnN0IHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuXG4gIGNvbnN0IHIgPSBwYXJzZUludChyZXN1bHRbMV0sIDE2KTtcbiAgY29uc3QgZyA9IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpO1xuICBjb25zdCBiID0gcGFyc2VJbnQocmVzdWx0WzNdLCAxNik7XG5cbiAgcmV0dXJuIFtyLCBnLCBiXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGV4YWdvbklkTGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcoSGV4YWdvbklkVmlzQ29uZmlncyk7XG4gICAgdGhpcy5nZXRIZXhJZCA9IG1lbW9pemUoaGV4SWRBY2Nlc3NvciwgaGV4SWRSZXNvbHZlcik7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2hleGFnb25JZCc7XG4gIH1cblxuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gJ0gzJztcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gaGV4SWRSZXF1aXJlZENvbHVtbnM7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIC8vIHVzZSBoZXhhZ29uIGxheWVyIGljb24gZm9yIG5vd1xuICAgIHJldHVybiBIM0hleGFnb25MYXllckljb247XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICBwcm9wZXJ0eTogJ2hlaWdodCdcbiAgICAgIH0sXG4gICAgICBjb3ZlcmFnZToge1xuICAgICAgICBwcm9wZXJ0eTogJ2NvdmVyYWdlJyxcbiAgICAgICAgZmllbGQ6ICdjb3ZlcmFnZUZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdjb3ZlcmFnZVNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnY292ZXJhZ2VEb21haW4nLFxuICAgICAgICByYW5nZTogJ2NvdmVyYWdlUmFuZ2UnLFxuICAgICAgICBrZXk6ICdjb3ZlcmFnZScsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLnJhZGl1c1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtmaWVsZHN9KSB7XG4gICAgY29uc3QgZm91bmRDb2x1bW5zID0gdGhpcy5maW5kRGVmYXVsdENvbHVtbkZpZWxkKEhFWEFHT05fSURfRklFTERTLCBmaWVsZHMpO1xuICAgIGlmICghZm91bmRDb2x1bW5zIHx8ICFmb3VuZENvbHVtbnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmRDb2x1bW5zLm1hcChjb2x1bW5zID0+ICh7XG4gICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICBsYWJlbDogJ0gzIEhleGFnb24nLFxuICAgICAgY29sdW1uc1xuICAgIH0pKTtcbiAgfVxuXG4gIGdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyA9IHt9KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRMYXllckNvbmZpZyhwcm9wcyksXG5cbiAgICAgIC8vIGFkZCBoZWlnaHQgdmlzdWFsIGNoYW5uZWxcbiAgICAgIGNvdmVyYWdlRmllbGQ6IG51bGwsXG4gICAgICBjb3ZlcmFnZURvbWFpbjogWzAsIDFdLFxuICAgICAgY292ZXJhZ2VTY2FsZTogJ2xpbmVhcidcbiAgICB9O1xuICB9XG5cbiAgLy8gVE9ETzogZml4IGNvbXBsZXhpdHlcbiAgLyogZXNsaW50LWRpc2FibGUgY29tcGxleGl0eSAqL1xuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbG9yU2NhbGUsXG4gICAgICBjb2xvckRvbWFpbixcbiAgICAgIGNvbG9yRmllbGQsXG4gICAgICBjb2xvcixcbiAgICAgIGNvbHVtbnMsXG4gICAgICBzaXplRmllbGQsXG4gICAgICBzaXplU2NhbGUsXG4gICAgICBzaXplRG9tYWluLFxuICAgICAgY292ZXJhZ2VGaWVsZCxcbiAgICAgIGNvdmVyYWdlU2NhbGUsXG4gICAgICBjb3ZlcmFnZURvbWFpbixcbiAgICAgIHZpc0NvbmZpZzoge3NpemVSYW5nZSwgY29sb3JSYW5nZSwgY292ZXJhZ2VSYW5nZX1cbiAgICB9ID0gdGhpcy5jb25maWc7XG5cbiAgICAvLyBjb2xvclxuICAgIGNvbnN0IGNTY2FsZSA9XG4gICAgICBjb2xvckZpZWxkICYmXG4gICAgICB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShcbiAgICAgICAgY29sb3JTY2FsZSxcbiAgICAgICAgY29sb3JEb21haW4sXG4gICAgICAgIGNvbG9yUmFuZ2UuY29sb3JzLm1hcChjID0+IGhleFRvUmdiKGMpKVxuICAgICAgKTtcblxuICAgIC8vIGhlaWdodFxuICAgIGNvbnN0IHNTY2FsZSA9XG4gICAgICBzaXplRmllbGQgJiYgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoc2l6ZVNjYWxlLCBzaXplRG9tYWluLCBzaXplUmFuZ2UpO1xuXG4gICAgLy8gY292ZXJhZ2VcbiAgICBjb25zdCBjb1NjYWxlID1cbiAgICAgIGNvdmVyYWdlRmllbGQgJiYgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoY292ZXJhZ2VTY2FsZSwgY292ZXJhZ2VEb21haW4sIGNvdmVyYWdlUmFuZ2UpO1xuXG4gICAgY29uc3QgZ2V0SGV4SWQgPSB0aGlzLmdldEhleElkKGNvbHVtbnMpO1xuXG4gICAgaWYgKCFvbGRMYXllckRhdGEgfHwgb2xkTGF5ZXJEYXRhLmdldEhleElkICE9PSBnZXRIZXhJZCkge1xuICAgICAgdGhpcy51cGRhdGVMYXllck1ldGEoYWxsRGF0YSwgZ2V0SGV4SWQpO1xuICAgIH1cblxuICAgIGxldCBkYXRhO1xuICAgIGlmIChcbiAgICAgIG9sZExheWVyRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmRhdGEgJiZcbiAgICAgIG9wdC5zYW1lRGF0YSAmJlxuICAgICAgb2xkTGF5ZXJEYXRhLmdldEhleElkID09PSBnZXRIZXhJZFxuICAgICkge1xuICAgICAgZGF0YSA9IG9sZExheWVyRGF0YS5kYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gZmlsdGVyZWRJbmRleC5yZWR1Y2UoKGFjY3UsIGluZGV4LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gZ2V0SGV4SWQoYWxsRGF0YVtpbmRleF0pO1xuICAgICAgICBjb25zdCBjZW50cm9pZCA9IHRoaXMuZGF0YVRvRmVhdHVyZS5jZW50cm9pZHNbaW5kZXhdO1xuXG4gICAgICAgIGlmIChjZW50cm9pZCkge1xuICAgICAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgICAgICAvLyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBkYXRhIGluZGV4XG4gICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgIGRhdGE6IGFsbERhdGFbaW5kZXhdLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBjZW50cm9pZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0RWxldmF0aW9uID0gc1NjYWxlID8gZCA9PlxuICAgICAgdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKHNTY2FsZSwgZC5kYXRhLCBzaXplRmllbGQsIDApIDogMDtcblxuICAgIGNvbnN0IGdldENvbG9yID0gY1NjYWxlID8gZCA9PlxuICAgICAgdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNTY2FsZSwgZC5kYXRhLCBjb2xvckZpZWxkKSA6IGNvbG9yO1xuXG4gICAgY29uc3QgZ2V0Q292ZXJhZ2UgPSBjb1NjYWxlID8gZCA9PlxuICAgICAgdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNvU2NhbGUsIGQuZGF0YSwgY292ZXJhZ2VGaWVsZCwgMCkgOiAxO1xuXG4gICAgLy8gY29uc3QgbGF5ZXJEYXRhID0ge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhLFxuICAgICAgZ2V0RWxldmF0aW9uLFxuICAgICAgZ2V0Q29sb3IsXG4gICAgICBnZXRIZXhJZCxcbiAgICAgIGdldENvdmVyYWdlLFxuICAgICAgaGV4YWdvblZlcnRpY2VzOiB0aGlzLmRhdGFUb0ZlYXR1cmUuaGV4YWdvblZlcnRpY2VzLFxuICAgICAgaGV4YWdvbkNlbnRlcjogdGhpcy5kYXRhVG9GZWF0dXJlLmhleGFnb25DZW50ZXJcbiAgICB9O1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuXG4gIHVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRIZXhJZCkge1xuICAgIGxldCBoZXhhZ29uVmVydGljZXM7XG4gICAgbGV0IGhleGFnb25DZW50ZXI7XG4gICAgY29uc3QgY2VudHJvaWRzID0ge307XG5cbiAgICBhbGxEYXRhLmZvckVhY2goKGQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBpZCA9IGdldEhleElkKGQpO1xuICAgICAgaWYgKHR5cGVvZiBpZCAhPT0gJ3N0cmluZycgfHwgIWlkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBmaW5kIGhleGFnb25WZXJ0aWNlc1xuICAgICAgLy8gb25seSBuZWVkIDEgaW5zdGFuY2Ugb2YgaGV4YWdvblZlcnRpY2VzXG4gICAgICBpZiAoIWhleGFnb25WZXJ0aWNlcykge1xuICAgICAgICBoZXhhZ29uVmVydGljZXMgPSBpZCAmJiBnZXRWZXJ0aWNlcyh7aWR9KTtcbiAgICAgICAgaGV4YWdvbkNlbnRlciA9IGlkICYmIGdldENlbnRyb2lkKHtpZH0pXG4gICAgICB9XG5cbiAgICAgIC8vIHNhdmUgYSByZWZlcmVuY2Ugb2YgY2VudHJvaWRzIHRvIGRhdGFUb0ZlYXR1cmVcbiAgICAgIC8vIHNvIHdlIGRvbid0IGhhdmUgdG8gcmUgY2FsY3VsYXRlIGl0IGFnYWluXG4gICAgICBjZW50cm9pZHNbaW5kZXhdID0gZ2V0Q2VudHJvaWQoe2lkfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhPYmplY3QudmFsdWVzKGNlbnRyb2lkcyksIGQgPT4gZCk7XG4gICAgY29uc3QgbGlnaHRTZXR0aW5ncyA9IHRoaXMuZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKTtcblxuICAgIHRoaXMuZGF0YVRvRmVhdHVyZSA9IHtoZXhhZ29uVmVydGljZXMsIGhleGFnb25DZW50ZXIsIGNlbnRyb2lkc307XG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHMsIGxpZ2h0U2V0dGluZ3N9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBsYXllckludGVyYWN0aW9uLFxuICAgIG9iamVjdEhvdmVyZWQsXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfSkge1xuICAgIGNvbnN0IHpvb21GYWN0b3IgPSB0aGlzLmdldFpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IGVsZVpvb21GYWN0b3IgPSB0aGlzLmdldEVsZXZhdGlvblpvb21GYWN0b3IobWFwU3RhdGUpO1xuICAgIGNvbnN0IHtjb25maWcsIG1ldGF9ID0gdGhpcztcbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IGNvbmZpZztcblxuICAgIGNvbnN0IHVwZGF0ZVRyaWdnZXJzID0ge1xuICAgICAgZ2V0Q29sb3I6IHtcbiAgICAgICAgY29sb3I6IGNvbmZpZy5jb2xvcixcbiAgICAgICAgY29sb3JGaWVsZDogY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICAgIGNvbG9yUmFuZ2U6IGNvbmZpZy52aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgICAgY29sb3JTY2FsZTogY29uZmlnLmNvbG9yU2NhbGVcbiAgICAgIH0sXG4gICAgICBnZXRFbGV2YXRpb246IHtcbiAgICAgICAgc2l6ZUZpZWxkOiBjb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICBzaXplUmFuZ2U6IGNvbmZpZy52aXNDb25maWcuc2l6ZVJhbmdlXG4gICAgICB9LFxuICAgICAgZ2V0Q292ZXJhZ2U6IHtcbiAgICAgICAgY292ZXJhZ2VGaWVsZDogY29uZmlnLmNvdmVyYWdlRmllbGQsXG4gICAgICAgIGNvdmVyYWdlUmFuZ2U6IGNvbmZpZy52aXNDb25maWcuY292ZXJhZ2VSYW5nZVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEgzSGV4YWdvbkNlbGxMYXllcih7XG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIHBpY2thYmxlOiB0cnVlLFxuXG4gICAgICAgIC8vIGNvdmVyYWdlXG4gICAgICAgIGNvdmVyYWdlOiBjb25maWcuY292ZXJhZ2VGaWVsZCA/IDEgOiB2aXNDb25maWcuY292ZXJhZ2UsXG5cbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBCb29sZWFuKGNvbmZpZy5zaXplRmllbGQgfHwgbWFwU3RhdGUuZHJhZ1JvdGF0ZSl9LFxuXG4gICAgICAgIC8vIGhpZ2hsaWdodFxuICAgICAgICBhdXRvSGlnaGxpZ2h0OiBCb29sZWFuKGNvbmZpZy5zaXplRmllbGQpLFxuICAgICAgICBoaWdobGlnaHRDb2xvcjogSElHSExJR0hfQ09MT1JfM0QsXG5cbiAgICAgICAgLy8gZWxldmF0aW9uXG4gICAgICAgIGV4dHJ1ZGVkOiBCb29sZWFuKGNvbmZpZy5zaXplRmllbGQpLFxuICAgICAgICBlbGV2YXRpb25TY2FsZTogdmlzQ29uZmlnLmVsZXZhdGlvblNjYWxlICogZWxlWm9vbUZhY3RvcixcblxuICAgICAgICAvLyBjb2xvclxuICAgICAgICBvcGFjaXR5OiB2aXNDb25maWcub3BhY2l0eSxcblxuICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgbGlnaHRTZXR0aW5nczogbWV0YS5saWdodFNldHRpbmdzLFxuICAgICAgICB1cGRhdGVUcmlnZ2Vyc1xuICAgICAgfSksXG4gICAgICAuLi4odGhpcy5pc0xheWVySG92ZXJlZChvYmplY3RIb3ZlcmVkKSAmJiAhY29uZmlnLnNpemVGaWVsZFxuICAgICAgICA/IFtcbiAgICAgICAgICAgIG5ldyBHZW9Kc29uTGF5ZXIoe1xuICAgICAgICAgICAgICBpZDogYCR7dGhpcy5pZH0taG92ZXJlZGAsXG4gICAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgICBpZFRvUG9seWdvbkdlbyhvYmplY3RIb3ZlcmVkKVxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBnZXRMaW5lQ29sb3I6IGNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgbGluZVdpZHRoU2NhbGU6IDggKiB6b29tRmFjdG9yXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=