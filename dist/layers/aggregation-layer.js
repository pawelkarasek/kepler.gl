"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.aggregateRequiredColumns = exports.getValueAggr = exports.pointPosResolver = exports.pointPosAccessor = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _baseLayer = _interopRequireDefault(require("./base-layer"));

var _colorUtils = require("../utils/color-utils");

var _aggregateUtils = require("../utils/aggregate-utils");

var _defaultSettings = require("../constants/default-settings");

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
var pointPosAccessor = function pointPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng;
  return function (d) {
    return [d[lng.fieldIdx], d[lat.fieldIdx]];
  };
};

exports.pointPosAccessor = pointPosAccessor;

var pointPosResolver = function pointPosResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng;
  return "".concat(lat.fieldIdx, "-").concat(lng.fieldIdx);
};

exports.pointPosResolver = pointPosResolver;

var getValueAggr = function getValueAggr(field, aggregation) {
  return function (points) {
    return (0, _aggregateUtils.aggregate)(points.map(function (p) {
      return p[field.tableFieldIndex - 1];
    }), aggregation);
  };
};

exports.getValueAggr = getValueAggr;

var aggrResolver = function aggrResolver(field, aggregation) {
  return "".concat(field.name, "-").concat(aggregation);
};

var getLayerColorRange = function getLayerColorRange(colorRange) {
  return colorRange.colors.map(_colorUtils.hexToRgb);
};

var aggregateRequiredColumns = ['lat', 'lng'];
exports.aggregateRequiredColumns = aggregateRequiredColumns;

var AggregationLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2["default"])(AggregationLayer, _Layer);

  function AggregationLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, AggregationLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(AggregationLayer).call(this, props));
    _this.getPosition = (0, _lodash["default"])(pointPosAccessor, pointPosResolver);
    _this.getColorValue = (0, _lodash["default"])(getValueAggr, aggrResolver);
    _this.getColorRange = (0, _lodash["default"])(getLayerColorRange);
    _this.getElevationValue = (0, _lodash["default"])(getValueAggr, aggrResolver);
    return _this;
  }

  (0, _createClass2["default"])(AggregationLayer, [{
    key: "getVisualChannelDescription",

    /**
     * Get the description of a visualChannel config
     * @param key
     * @returns {{label: string, measure: (string|string)}}
     */
    value: function getVisualChannelDescription(key) {
      // e.g. label: Color, measure: Average of ETA
      var _this$visualChannels$ = this.visualChannels[key],
          range = _this$visualChannels$.range,
          field = _this$visualChannels$.field,
          defaultMeasure = _this$visualChannels$.defaultMeasure,
          aggregation = _this$visualChannels$.aggregation;
      return {
        label: this.visConfigSettings[range].label,
        measure: this.config[field] ? "".concat(this.config.visConfig[aggregation], " of ").concat(this.config[field].name) : defaultMeasure
      };
    }
  }, {
    key: "getHoverData",
    value: function getHoverData(object) {
      // return aggregated object
      return object;
    }
    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: "updateLayerVisualChannel",
    value: function updateLayerVisualChannel(_ref3, channel) {
      var data = _ref3.data,
          allData = _ref3.allData;
      this.validateVisualChannel(channel);
    }
    /**
     * Validate aggregation type on top of basic layer visual channel validation
     * @param channel
     */

  }, {
    key: "validateVisualChannel",
    value: function validateVisualChannel(channel) {
      // field type decides aggregation type decides scale type
      this.validateFieldType(channel);
      this.validateAggregationType(channel);
      this.validateScale(channel);
    }
    /**
     * Validate aggregation type based on selected field
     */

  }, {
    key: "validateAggregationType",
    value: function validateAggregationType(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          aggregation = visualChannel.aggregation;
      var aggregationOptions = this.getAggregationOptions(channel);

      if (!aggregation) {
        return;
      }

      if (!aggregationOptions.length) {
        // if field cannot be aggregated, set field to null
        this.updateLayerConfig((0, _defineProperty2["default"])({}, field, null));
      } else if (!aggregationOptions.includes(this.config.visConfig[aggregation])) {
        // current aggregation type is not supported by this field
        // set aggregation to the first supported option
        this.updateLayerVisConfig((0, _defineProperty2["default"])({}, aggregation, aggregationOptions[0]));
      }
    }
  }, {
    key: "getAggregationOptions",
    value: function getAggregationOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          channelScaleType = visualChannel.channelScaleType;
      return Object.keys(this.config[field] ? _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType] : _defaultSettings.DEFAULT_AGGREGATION[channelScaleType]);
    }
    /**
     * Get scale options based on current field and aggregation type
     * @param {string} channel
     * @returns {string[]}
     */

  }, {
    key: "getScaleOptions",
    value: function getScaleOptions(channel) {
      var visualChannel = this.visualChannels[channel];
      var field = visualChannel.field,
          aggregation = visualChannel.aggregation,
          channelScaleType = visualChannel.channelScaleType;
      var aggregationType = this.config.visConfig[aggregation];
      return this.config[field] ? // scale options based on aggregation
      _defaultSettings.FIELD_OPTS[this.config[field].type].scale[channelScaleType][aggregationType] : // default scale options for point count
      _defaultSettings.DEFAULT_AGGREGATION[channelScaleType][aggregationType];
    }
    /**
     * Aggregation layer handles visual channel aggregation inside deck.gl layer
     */

  }, {
    key: "updateLayerDomain",
    value: function updateLayerDomain(dataset, newFilter) {
      return this;
    }
  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData, getPosition) {
      // get bounds from points
      var bounds = this.getPointsBounds(allData, getPosition); // get lightSettings from points

      var lightSettings = this.getLightSettingsFromBounds(bounds);
      this.updateMeta({
        bounds: bounds,
        lightSettings: lightSettings
      });
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var getPosition = this.getPosition(this.config.columns);

      if (!oldLayerData || oldLayerData.getPosition !== getPosition) {
        this.updateLayerMeta(allData, getPosition);
      }

      var getColorValue = this.config.colorField ? this.getColorValue(this.config.colorField, this.config.visConfig.colorAggregation) : undefined;
      var getElevationValue = this.config.sizeField ? this.getElevationValue(this.config.sizeField, this.config.visConfig.sizeAggregation) : undefined;
      var data;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getPosition === getPosition) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.map(function (i) {
          return allData[i];
        });
      }

      return (0, _objectSpread2["default"])({
        data: data,
        getPosition: getPosition
      }, getColorValue ? {
        getColorValue: getColorValue
      } : {}, getElevationValue ? {
        getElevationValue: getElevationValue
      } : {});
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return true;
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return aggregateRequiredColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return [].concat((0, _toConsumableArray2["default"])((0, _get2["default"])((0, _getPrototypeOf2["default"])(AggregationLayer.prototype), "noneLayerDataAffectingProps", this)), ['enable3d', 'colorRange', 'colorScale', 'colorDomain', 'sizeRange', 'sizeScale', 'sizeDomain', 'percentile', 'coverage', 'elevationPercentile', 'elevationScale']);
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: {
          aggregation: 'colorAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.colorAggr,
          defaultMeasure: 'Point Count',
          domain: 'colorDomain',
          field: 'colorField',
          key: 'color',
          property: 'color',
          range: 'colorRange',
          scale: 'colorScale'
        },
        size: {
          aggregation: 'sizeAggregation',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.sizeAggr,
          condition: function condition(config) {
            return config.visConfig.enable3d;
          },
          defaultMeasure: 'Point Count',
          domain: 'sizeDomain',
          field: 'sizeField',
          key: 'size',
          property: 'height',
          range: 'sizeRange',
          scale: 'sizeScale'
        }
      };
    }
  }]);
  return AggregationLayer;
}(_baseLayer["default"]);

exports["default"] = AggregationLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvYWdncmVnYXRpb24tbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImQiLCJmaWVsZElkeCIsInBvaW50UG9zUmVzb2x2ZXIiLCJnZXRWYWx1ZUFnZ3IiLCJmaWVsZCIsImFnZ3JlZ2F0aW9uIiwicG9pbnRzIiwibWFwIiwicCIsInRhYmxlRmllbGRJbmRleCIsImFnZ3JSZXNvbHZlciIsIm5hbWUiLCJnZXRMYXllckNvbG9yUmFuZ2UiLCJjb2xvclJhbmdlIiwiY29sb3JzIiwiaGV4VG9SZ2IiLCJhZ2dyZWdhdGVSZXF1aXJlZENvbHVtbnMiLCJBZ2dyZWdhdGlvbkxheWVyIiwicHJvcHMiLCJnZXRQb3NpdGlvbiIsImdldENvbG9yVmFsdWUiLCJnZXRDb2xvclJhbmdlIiwiZ2V0RWxldmF0aW9uVmFsdWUiLCJrZXkiLCJ2aXN1YWxDaGFubmVscyIsInJhbmdlIiwiZGVmYXVsdE1lYXN1cmUiLCJsYWJlbCIsInZpc0NvbmZpZ1NldHRpbmdzIiwibWVhc3VyZSIsImNvbmZpZyIsInZpc0NvbmZpZyIsIm9iamVjdCIsImNoYW5uZWwiLCJkYXRhIiwiYWxsRGF0YSIsInZhbGlkYXRlVmlzdWFsQ2hhbm5lbCIsInZhbGlkYXRlRmllbGRUeXBlIiwidmFsaWRhdGVBZ2dyZWdhdGlvblR5cGUiLCJ2YWxpZGF0ZVNjYWxlIiwidmlzdWFsQ2hhbm5lbCIsImFnZ3JlZ2F0aW9uT3B0aW9ucyIsImdldEFnZ3JlZ2F0aW9uT3B0aW9ucyIsImxlbmd0aCIsInVwZGF0ZUxheWVyQ29uZmlnIiwiaW5jbHVkZXMiLCJ1cGRhdGVMYXllclZpc0NvbmZpZyIsImNoYW5uZWxTY2FsZVR5cGUiLCJPYmplY3QiLCJrZXlzIiwiRklFTERfT1BUUyIsInR5cGUiLCJzY2FsZSIsIkRFRkFVTFRfQUdHUkVHQVRJT04iLCJhZ2dyZWdhdGlvblR5cGUiLCJkYXRhc2V0IiwibmV3RmlsdGVyIiwiYm91bmRzIiwiZ2V0UG9pbnRzQm91bmRzIiwibGlnaHRTZXR0aW5ncyIsImdldExpZ2h0U2V0dGluZ3NGcm9tQm91bmRzIiwidXBkYXRlTWV0YSIsIl8iLCJmaWx0ZXJlZEluZGV4Iiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiY29sdW1ucyIsInVwZGF0ZUxheWVyTWV0YSIsImNvbG9yRmllbGQiLCJjb2xvckFnZ3JlZ2F0aW9uIiwidW5kZWZpbmVkIiwic2l6ZUZpZWxkIiwic2l6ZUFnZ3JlZ2F0aW9uIiwic2FtZURhdGEiLCJpIiwiZGVmYXVsdFBvaW50Q29sdW1uUGFpcnMiLCJjb2xvciIsIkNIQU5ORUxfU0NBTEVTIiwiY29sb3JBZ2dyIiwiZG9tYWluIiwicHJvcGVydHkiLCJzaXplIiwic2l6ZUFnZ3IiLCJjb25kaXRpb24iLCJlbmFibGUzZCIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUU8sSUFBTUEsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQjtBQUFBLE1BQUVDLEdBQUYsUUFBRUEsR0FBRjtBQUFBLE1BQU9DLEdBQVAsUUFBT0EsR0FBUDtBQUFBLFNBQWdCLFVBQUFDLENBQUM7QUFBQSxXQUFJLENBQ25EQSxDQUFDLENBQUNELEdBQUcsQ0FBQ0UsUUFBTCxDQURrRCxFQUVuREQsQ0FBQyxDQUFDRixHQUFHLENBQUNHLFFBQUwsQ0FGa0QsQ0FBSjtBQUFBLEdBQWpCO0FBQUEsQ0FBekI7Ozs7QUFLQSxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CO0FBQUEsTUFBRUosR0FBRixTQUFFQSxHQUFGO0FBQUEsTUFBT0MsR0FBUCxTQUFPQSxHQUFQO0FBQUEsbUJBQzNCRCxHQUFHLENBQUNHLFFBRHVCLGNBQ1hGLEdBQUcsQ0FBQ0Us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O0FBQ0xDLFFBQUFBLEtBQUssRUFBRTtBQUNMdkUsVUFBQUEsV0FBVyxFQUFFLGtCQURSO0FBRUwwQyxVQUFBQSxnQkFBZ0IsRUFBRThCLGdDQUFlQyxTQUY1QjtBQUdMcEQsVUFBQUEsY0FBYyxFQUFFLGFBSFg7QUFJTHFELFVBQUFBLE1BQU0sRUFBRSxhQUpIO0FBS0wzRSxVQUFBQSxLQUFLLEVBQUUsWUFMRjtBQU1MbUIsVUFBQUEsR0FBRyxFQUFFLE9BTkE7QUFPTHlELFVBQUFBLFFBQVEsRUFBRSxPQVBMO0FBUUx2RCxVQUFBQSxLQUFLLEVBQUUsWUFSRjtBQVNMMkIsVUFBQUEsS0FBSyxFQUFFO0FBVEYsU0FERjtBQVlMNkIsUUFBQUEsSUFBSSxFQUFFO0FBQ0o1RSxVQUFBQSxXQUFXLEVBQUUsaUJBRFQ7QUFFSjBDLFVBQUFBLGdCQUFnQixFQUFFOEIsZ0NBQWVLLFFBRjdCO0FBR0pDLFVBQUFBLFNBQVMsRUFBRSxtQkFBQXJELE1BQU07QUFBQSxtQkFBSUEsTUFBTSxDQUFDQyxTQUFQLENBQWlCcUQsUUFBckI7QUFBQSxXQUhiO0FBSUoxRCxVQUFBQSxjQUFjLEVBQUUsYUFKWjtBQUtKcUQsVUFBQUEsTUFBTSxFQUFFLFlBTEo7QUFNSjNFLFVBQUFBLEtBQUssRUFBRSxXQU5IO0FBT0ptQixVQUFBQSxHQUFHLEVBQUUsTUFQRDtBQVFKeUQsVUFBQUEsUUFBUSxFQUFFLFFBUk47QUFTSnZELFVBQUFBLEtBQUssRUFBRSxXQVRIO0FBVUoyQixVQUFBQSxLQUFLLEVBQUU7QUFWSDtBQVpELE9BQVA7QUF5QkQ7OztFQWpFMkNpQyxxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcbmltcG9ydCBMYXllciBmcm9tICcuL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IHthZ2dyZWdhdGV9IGZyb20gJ3V0aWxzL2FnZ3JlZ2F0ZS11dGlscyc7XG5pbXBvcnQge0NIQU5ORUxfU0NBTEVTLCBGSUVMRF9PUFRTLCBERUZBVUxUX0FHR1JFR0FUSU9OfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCBwb2ludFBvc0FjY2Vzc29yID0gKHtsYXQsIGxuZ30pID0+IGQgPT4gW1xuICBkW2xuZy5maWVsZElkeF0sXG4gIGRbbGF0LmZpZWxkSWR4XVxuXTtcblxuZXhwb3J0IGNvbnN0IHBvaW50UG9zUmVzb2x2ZXIgPSAoe2xhdCwgbG5nfSkgPT5cbiAgYCR7bGF0LmZpZWxkSWR4fS0ke2xuZy5maWVsZElkeH1gO1xuXG5leHBvcnQgY29uc3QgZ2V0VmFsdWVBZ2dyID0gKGZpZWxkLCBhZ2dyZWdhdGlvbikgPT4gcG9pbnRzID0+XG4gIGFnZ3JlZ2F0ZShwb2ludHMubWFwKHAgPT4gcFtmaWVsZC50YWJsZUZpZWxkSW5kZXggLSAxXSksIGFnZ3JlZ2F0aW9uKTtcblxuY29uc3QgYWdnclJlc29sdmVyID0gKGZpZWxkLCBhZ2dyZWdhdGlvbikgPT4gYCR7ZmllbGQubmFtZX0tJHthZ2dyZWdhdGlvbn1gO1xuXG5jb25zdCBnZXRMYXllckNvbG9yUmFuZ2UgPSBjb2xvclJhbmdlID0+IGNvbG9yUmFuZ2UuY29sb3JzLm1hcChoZXhUb1JnYik7XG5cbmV4cG9ydCBjb25zdCBhZ2dyZWdhdGVSZXF1aXJlZENvbHVtbnMgPSBbJ2xhdCcsICdsbmcnXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWdncmVnYXRpb25MYXllciBleHRlbmRzIExheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLmdldFBvc2l0aW9uID0gbWVtb2l6ZShwb2ludFBvc0FjY2Vzc29yLCBwb2ludFBvc1Jlc29sdmVyKTtcbiAgICB0aGlzLmdldENvbG9yVmFsdWUgPSBtZW1vaXplKGdldFZhbHVlQWdnciwgYWdnclJlc29sdmVyKTtcbiAgICB0aGlzLmdldENvbG9yUmFuZ2UgPSBtZW1vaXplKGdldExheWVyQ29sb3JSYW5nZSk7XG4gICAgdGhpcy5nZXRFbGV2YXRpb25WYWx1ZSA9IG1lbW9pemUoZ2V0VmFsdWVBZ2dyLCBhZ2dyUmVzb2x2ZXIpO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gYWdncmVnYXRlUmVxdWlyZWRDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRQb2ludENvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gW1xuICAgICAgLi4uc3VwZXIubm9uZUxheWVyRGF0YUFmZmVjdGluZ1Byb3BzLFxuICAgICAgJ2VuYWJsZTNkJyxcbiAgICAgICdjb2xvclJhbmdlJyxcbiAgICAgICdjb2xvclNjYWxlJyxcbiAgICAgICdjb2xvckRvbWFpbicsXG4gICAgICAnc2l6ZVJhbmdlJyxcbiAgICAgICdzaXplU2NhbGUnLFxuICAgICAgJ3NpemVEb21haW4nLFxuICAgICAgJ3BlcmNlbnRpbGUnLFxuICAgICAgJ2NvdmVyYWdlJyxcbiAgICAgICdlbGV2YXRpb25QZXJjZW50aWxlJyxcbiAgICAgICdlbGV2YXRpb25TY2FsZSdcbiAgICBdO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICBhZ2dyZWdhdGlvbjogJ2NvbG9yQWdncmVnYXRpb24nLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5jb2xvckFnZ3IsXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAnUG9pbnQgQ291bnQnLFxuICAgICAgICBkb21haW46ICdjb2xvckRvbWFpbicsXG4gICAgICAgIGZpZWxkOiAnY29sb3JGaWVsZCcsXG4gICAgICAgIGtleTogJ2NvbG9yJyxcbiAgICAgICAgcHJvcGVydHk6ICdjb2xvcicsXG4gICAgICAgIHJhbmdlOiAnY29sb3JSYW5nZScsXG4gICAgICAgIHNjYWxlOiAnY29sb3JTY2FsZSdcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiAnc2l6ZUFnZ3JlZ2F0aW9uJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuc2l6ZUFnZ3IsXG4gICAgICAgIGNvbmRpdGlvbjogY29uZmlnID0+IGNvbmZpZy52aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAnUG9pbnQgQ291bnQnLFxuICAgICAgICBkb21haW46ICdzaXplRG9tYWluJyxcbiAgICAgICAgZmllbGQ6ICdzaXplRmllbGQnLFxuICAgICAgICBrZXk6ICdzaXplJyxcbiAgICAgICAgcHJvcGVydHk6ICdoZWlnaHQnLFxuICAgICAgICByYW5nZTogJ3NpemVSYW5nZScsXG4gICAgICAgIHNjYWxlOiAnc2l6ZVNjYWxlJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBkZXNjcmlwdGlvbiBvZiBhIHZpc3VhbENoYW5uZWwgY29uZmlnXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHJldHVybnMge3tsYWJlbDogc3RyaW5nLCBtZWFzdXJlOiAoc3RyaW5nfHN0cmluZyl9fVxuICAgKi9cbiAgZ2V0VmlzdWFsQ2hhbm5lbERlc2NyaXB0aW9uKGtleSkge1xuICAgIC8vIGUuZy4gbGFiZWw6IENvbG9yLCBtZWFzdXJlOiBBdmVyYWdlIG9mIEVUQVxuICAgIGNvbnN0IHtyYW5nZSwgZmllbGQsIGRlZmF1bHRNZWFzdXJlLCBhZ2dyZWdhdGlvbn0gPSB0aGlzLnZpc3VhbENoYW5uZWxzW2tleV07XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhYmVsOiB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzW3JhbmdlXS5sYWJlbCxcbiAgICAgIG1lYXN1cmU6IHRoaXMuY29uZmlnW2ZpZWxkXVxuICAgICAgICA/IGAke3RoaXMuY29uZmlnLnZpc0NvbmZpZ1thZ2dyZWdhdGlvbl19IG9mICR7dGhpcy5jb25maWdbZmllbGRdLm5hbWV9YFxuICAgICAgICA6IGRlZmF1bHRNZWFzdXJlXG4gICAgfVxuICB9XG5cbiAgZ2V0SG92ZXJEYXRhKG9iamVjdCkge1xuICAgIC8vIHJldHVybiBhZ2dyZWdhdGVkIG9iamVjdFxuICAgIHJldHVybiBvYmplY3Q7XG4gIH1cblxuICAvKipcbiAgICogQWdncmVnYXRpb24gbGF5ZXIgaGFuZGxlcyB2aXN1YWwgY2hhbm5lbCBhZ2dyZWdhdGlvbiBpbnNpZGUgZGVjay5nbCBsYXllclxuICAgKi9cbiAgdXBkYXRlTGF5ZXJWaXN1YWxDaGFubmVsKHtkYXRhLCBhbGxEYXRhfSwgY2hhbm5lbCkge1xuICAgIHRoaXMudmFsaWRhdGVWaXN1YWxDaGFubmVsKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGFnZ3JlZ2F0aW9uIHR5cGUgb24gdG9wIG9mIGJhc2ljIGxheWVyIHZpc3VhbCBjaGFubmVsIHZhbGlkYXRpb25cbiAgICogQHBhcmFtIGNoYW5uZWxcbiAgICovXG4gIHZhbGlkYXRlVmlzdWFsQ2hhbm5lbChjaGFubmVsKSB7XG5cbiAgICAvLyBmaWVsZCB0eXBlIGRlY2lkZXMgYWdncmVnYXRpb24gdHlwZSBkZWNpZGVzIHNjYWxlIHR5cGVcbiAgICB0aGlzLnZhbGlkYXRlRmllbGRUeXBlKGNoYW5uZWwpO1xuICAgIHRoaXMudmFsaWRhdGVBZ2dyZWdhdGlvblR5cGUoY2hhbm5lbCk7XG4gICAgdGhpcy52YWxpZGF0ZVNjYWxlKGNoYW5uZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlIGFnZ3JlZ2F0aW9uIHR5cGUgYmFzZWQgb24gc2VsZWN0ZWQgZmllbGRcbiAgICovXG4gIHZhbGlkYXRlQWdncmVnYXRpb25UeXBlKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9ufSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3QgYWdncmVnYXRpb25PcHRpb25zID0gdGhpcy5nZXRBZ2dyZWdhdGlvbk9wdGlvbnMoY2hhbm5lbCk7XG5cbiAgICBpZiAoIWFnZ3JlZ2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFhZ2dyZWdhdGlvbk9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAvLyBpZiBmaWVsZCBjYW5ub3QgYmUgYWdncmVnYXRlZCwgc2V0IGZpZWxkIHRvIG51bGxcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJDb25maWcoe1tmaWVsZF06IG51bGx9KTtcblxuICAgIH0gZWxzZSBpZiAoIWFnZ3JlZ2F0aW9uT3B0aW9ucy5pbmNsdWRlcyh0aGlzLmNvbmZpZy52aXNDb25maWdbYWdncmVnYXRpb25dKSkge1xuICAgICAgLy8gY3VycmVudCBhZ2dyZWdhdGlvbiB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBmaWVsZFxuICAgICAgLy8gc2V0IGFnZ3JlZ2F0aW9uIHRvIHRoZSBmaXJzdCBzdXBwb3J0ZWQgb3B0aW9uXG4gICAgICB0aGlzLnVwZGF0ZUxheWVyVmlzQ29uZmlnKHtbYWdncmVnYXRpb25dOiBhZ2dyZWdhdGlvbk9wdGlvbnNbMF19KTtcbiAgICB9XG4gIH1cblxuICBnZXRBZ2dyZWdhdGlvbk9wdGlvbnMoY2hhbm5lbCkge1xuICAgIGNvbnN0IHZpc3VhbENoYW5uZWwgPSB0aGlzLnZpc3VhbENoYW5uZWxzW2NoYW5uZWxdO1xuICAgIGNvbnN0IHtmaWVsZCwgY2hhbm5lbFNjYWxlVHlwZX0gPSB2aXN1YWxDaGFubmVsO1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKFxuICAgICAgdGhpcy5jb25maWdbZmllbGRdID8gRklFTERfT1BUU1t0aGlzLmNvbmZpZ1tmaWVsZF0udHlwZV0uc2NhbGVbY2hhbm5lbFNjYWxlVHlwZV0gOlxuICAgICAgICBERUZBVUxUX0FHR1JFR0FUSU9OW2NoYW5uZWxTY2FsZVR5cGVdKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBzY2FsZSBvcHRpb25zIGJhc2VkIG9uIGN1cnJlbnQgZmllbGQgYW5kIGFnZ3JlZ2F0aW9uIHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNoYW5uZWxcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgZ2V0U2NhbGVPcHRpb25zKGNoYW5uZWwpIHtcbiAgICBjb25zdCB2aXN1YWxDaGFubmVsID0gdGhpcy52aXN1YWxDaGFubmVsc1tjaGFubmVsXTtcbiAgICBjb25zdCB7ZmllbGQsIGFnZ3JlZ2F0aW9uLCBjaGFubmVsU2NhbGVUeXBlfSA9IHZpc3VhbENoYW5uZWw7XG4gICAgY29uc3QgYWdncmVnYXRpb25UeXBlID0gdGhpcy5jb25maWcudmlzQ29uZmlnW2FnZ3JlZ2F0aW9uXTtcbiAgICByZXR1cm4gdGhpcy5jb25maWdbZmllbGRdID9cbiAgICAgIC8vIHNjYWxlIG9wdGlvbnMgYmFzZWQgb24gYWdncmVnYXRpb25cbiAgICAgIEZJRUxEX09QVFNbdGhpcy5jb25maWdbZmllbGRdLnR5cGVdLnNjYWxlW2NoYW5uZWxTY2FsZVR5cGVdW2FnZ3JlZ2F0aW9uVHlwZV0gOlxuICAgICAgLy8gZGVmYXVsdCBzY2FsZSBvcHRpb25zIGZvciBwb2ludCBjb3VudFxuICAgICAgREVGQVVMVF9BR0dSRUdBVElPTltjaGFubmVsU2NhbGVUeXBlXVthZ2dyZWdhdGlvblR5cGVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEFnZ3JlZ2F0aW9uIGxheWVyIGhhbmRsZXMgdmlzdWFsIGNoYW5uZWwgYWdncmVnYXRpb24gaW5zaWRlIGRlY2suZ2wgbGF5ZXJcbiAgICovXG4gIHVwZGF0ZUxheWVyRG9tYWluKGRhdGFzZXQsIG5ld0ZpbHRlcikge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gZ2V0IGJvdW5kcyBmcm9tIHBvaW50c1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGFsbERhdGEsIGdldFBvc2l0aW9uKTtcblxuICAgIC8vIGdldCBsaWdodFNldHRpbmdzIGZyb20gcG9pbnRzXG4gICAgY29uc3QgbGlnaHRTZXR0aW5ncyA9IHRoaXMuZ2V0TGlnaHRTZXR0aW5nc0Zyb21Cb3VuZHMoYm91bmRzKTtcblxuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzLCBsaWdodFNldHRpbmdzfSk7XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbih0aGlzLmNvbmZpZy5jb2x1bW5zKTtcblxuICAgIGlmICghb2xkTGF5ZXJEYXRhIHx8IG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiAhPT0gZ2V0UG9zaXRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRDb2xvclZhbHVlID0gdGhpcy5jb25maWcuY29sb3JGaWVsZFxuICAgICAgPyB0aGlzLmdldENvbG9yVmFsdWUoXG4gICAgICAgICAgdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgICAgICB0aGlzLmNvbmZpZy52aXNDb25maWcuY29sb3JBZ2dyZWdhdGlvblxuICAgICAgICApXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGdldEVsZXZhdGlvblZhbHVlID0gdGhpcy5jb25maWcuc2l6ZUZpZWxkXG4gICAgICA/IHRoaXMuZ2V0RWxldmF0aW9uVmFsdWUoXG4gICAgICAgICAgdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICAgIHRoaXMuY29uZmlnLnZpc0NvbmZpZy5zaXplQWdncmVnYXRpb25cbiAgICAgICAgKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5kYXRhICYmXG4gICAgICBvcHQuc2FtZURhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiA9PT0gZ2V0UG9zaXRpb25cbiAgICApIHtcbiAgICAgIGRhdGEgPSBvbGRMYXllckRhdGEuZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGZpbHRlcmVkSW5kZXgubWFwKGkgPT4gYWxsRGF0YVtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIC4uLihnZXRDb2xvclZhbHVlID8ge2dldENvbG9yVmFsdWV9IDoge30pLFxuICAgICAgLi4uKGdldEVsZXZhdGlvblZhbHVlID8ge2dldEVsZXZhdGlvblZhbHVlfSA6IHt9KVxuICAgIH07XG4gIH1cbn1cbiJdfQ==