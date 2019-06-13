"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.heatmapVisConfigs = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _reselect = require("reselect");

var _defaultSettings = require("../../constants/default-settings");

var _colorUtils = require("../../utils/color-utils");

var _mapboxUtils = require("../mapbox-utils");

var _mapboxglLayer = _interopRequireDefault(require("../mapboxgl-layer"));

var _heatmapLayerIcon = _interopRequireDefault(require("./heatmap-layer-icon"));

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
var MAX_ZOOM_LEVEL = 18;
var heatmapVisConfigs = {
  opacity: 'opacity',
  colorRange: 'colorRange',
  radius: 'heatmapRadius'
};
/**
 *
 * @param {Object} colorRange
 * @return {Array} [
 *  0, "rgba(33,102,172,0)",
 *  0.2, "rgb(103,169,207)",
 *  0.4, "rgb(209,229,240)",
 *  0.6, "rgb(253,219,199)",
 *  0.8, "rgb(239,138,98)",
 *  1, "rgb(178,24,43)"
 * ]
 */

exports.heatmapVisConfigs = heatmapVisConfigs;

var heatmapDensity = function heatmapDensity(colorRange) {
  var scaleFunction = _defaultSettings.SCALE_FUNC.quantize;
  var colors = ['#000000'].concat((0, _toConsumableArray2["default"])(colorRange.colors));
  var scale = scaleFunction().domain([0, 1]).range(colors);
  var colorDensity = scale.range().reduce(function (bands, level) {
    var invert = scale.invertExtent(level);
    return [].concat((0, _toConsumableArray2["default"])(bands), [invert[0], // first value in the range
    "rgb(".concat((0, _colorUtils.hexToRgb)(level).join(','), ")") // color
    ]);
  }, []);
  colorDensity[1] = 'rgba(0,0,0,0)';
  return colorDensity;
};

var shouldRebuild = function shouldRebuild(sameData, sameConfig) {
  return !(sameData && sameConfig);
};

var HeatmapLayer =
/*#__PURE__*/
function (_MapboxGLLayer) {
  (0, _inherits2["default"])(HeatmapLayer, _MapboxGLLayer);

  function HeatmapLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, HeatmapLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(HeatmapLayer).call(this, props));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isSameData", function (_ref, config) {
      var allData = _ref.allData,
          filteredIndex = _ref.filteredIndex,
          oldLayerData = _ref.oldLayerData,
          _ref$opt = _ref.opt,
          opt = _ref$opt === void 0 ? {} : _ref$opt;
      return Boolean(oldLayerData && oldLayerData.columns === config.columns && opt.sameData);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isSameConfig", function (_ref2) {
      var oldLayerData = _ref2.oldLayerData,
          config = _ref2.config;
      // columns must use the same filedIdx
      // this is a fast way to compare columns object
      var columns = config.columns,
          weightField = config.weightField;

      if (!oldLayerData) {
        return false;
      }

      var sameColumns = columns === oldLayerData.columns;
      var sameWeightField = weightField === oldLayerData.weightField;
      return sameColumns && sameWeightField;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "datasetSelector", function (config) {
      return config.dataId;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "isVisibleSelector", function (config) {
      return config.isVisible;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "visConfigSelector", function (config) {
      return config.visConfig;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "weightFieldSelector", function (config) {
      return config.weightField ? config.weightField.name : null;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "weightDomainSelector", function (config) {
      return config.weightDomain;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "computeHeatmapConfiguration", (0, _reselect.createSelector)(_this.datasetSelector, _this.isVisibleSelector, _this.visConfigSelector, _this.weightFieldSelector, _this.weightDomainSelector, function (datasetId, isVisible, visConfig, weightField, weightDomain) {
      var layer = {
        type: 'heatmap',
        id: _this.id,
        source: datasetId,
        layout: {
          visibility: isVisible ? 'visible' : 'none'
        },
        maxzoom: MAX_ZOOM_LEVEL,
        paint: {
          'heatmap-weight': weightField ? ['interpolate', ['linear'], ['get', weightField], weightDomain[0], 0, weightDomain[1], 1] : 1,
          'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, MAX_ZOOM_LEVEL, 3],
          'heatmap-color': ['interpolate', ['linear'], ['heatmap-density']].concat((0, _toConsumableArray2["default"])(heatmapDensity(visConfig.colorRange))),
          'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, visConfig.radius // radius
          ],
          'heatmap-opacity': visConfig.opacity
        }
      };
      return layer;
    }));

    _this.registerVisConfig(heatmapVisConfigs);

    return _this;
  }

  (0, _createClass2["default"])(HeatmapLayer, [{
    key: "getVisualChannelDescription",
    value: function getVisualChannelDescription(channel) {
      return channel === 'color' ? {
        label: 'color',
        measure: 'Density'
      } : {
        label: 'weight',
        measure: this.config.weightField ? this.config.weightField.name : 'Density'
      };
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // mapbox heatmap layer color is always based on density
      // no need to set colorField, colorDomain and colorScale

      /* eslint-disable no-unused-vars */
      var _get$call$weightField = (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(HeatmapLayer.prototype), "getDefaultLayerConfig", this).call(this, props), {
        weightField: null,
        weightDomain: [0, 1],
        weightScale: 'linear'
      }),
          colorField = _get$call$weightField.colorField,
          colorDomain = _get$call$weightField.colorDomain,
          colorScale = _get$call$weightField.colorScale,
          layerConfig = (0, _objectWithoutProperties2["default"])(_get$call$weightField, ["colorField", "colorDomain", "colorScale"]);
      /* eslint-enable no-unused-vars */


      return layerConfig;
    }
  }, {
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var options = {
        allData: allData,
        filteredIndex: filteredIndex,
        oldLayerData: oldLayerData,
        opt: opt,
        config: this.config
      };
      var weightField = this.config.weightField;
      var isSameData = this.isSameData(options, this.config);
      var isSameConfig = this.isSameConfig(options);
      var data = !shouldRebuild(isSameData, isSameConfig) ? null : (0, _mapboxUtils.geojsonFromPoints)(allData, filteredIndex, this.config.columns, weightField ? [weightField] : []);
      var newConfig = this.computeHeatmapConfiguration(this.config);
      newConfig.id = this.id;
      return {
        columns: this.config.columns,
        config: newConfig,
        data: data,
        weightField: weightField
      };
    }
  }, {
    key: "type",
    get: function get() {
      return 'heatmap';
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        weight: {
          property: 'weight',
          field: 'weightField',
          scale: 'weightScale',
          domain: 'weightDomain',
          key: 'weight',
          // supportedFieldTypes can be determined by channelScaleType
          // or specified here
          defaultMeasure: 'density',
          supportedFieldTypes: [_defaultSettings.ALL_FIELD_TYPES.real, _defaultSettings.ALL_FIELD_TYPES.integer],
          channelScaleType: _defaultSettings.CHANNEL_SCALES.size
        }
      };
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _heatmapLayerIcon["default"];
    }
  }]);
  return HeatmapLayer;
}(_mapboxglLayer["default"]);

var _default = HeatmapLayer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaGVhdG1hcC1sYXllci9oZWF0bWFwLWxheWVyLmpzIl0sIm5hbWVzIjpbIk1BWF9aT09NX0xFVkVMIiwiaGVhdG1hcFZpc0NvbmZpZ3MiLCJvcGFjaXR5IiwiY29sb3JSYW5nZSIsInJhZGl1cyIsImhlYXRtYXBEZW5zaXR5Iiwic2NhbGVGdW5jdGlvbiIsIlNDQUxFX0ZVTkMiLCJxdWFudGl6ZSIsImNvbG9ycyIsInNjYWxlIiwiZG9tYWluIiwicmFuZ2UiLCJjb2xvckRlbnNpdHkiLCJyZWR1Y2UiLCJiYW5kcyIsImxldmVsIiwiaW52ZXJ0IiwiaW52ZXJ0RXh0ZW50Iiwiam9pbiIsInNob3VsZFJlYnVpbGQiLCJzYW1lRGF0YSIsInNhbWVDb25maWciLCJIZWF0bWFwTGF5ZXIiLCJwcm9wcyIsImNvbmZpZyIsImFsbERhdGEiLCJmaWx0ZXJlZEluZGV4Iiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiQm9vbGVhbiIsImNvbHVtbnMiLCJ3ZWlnaHRGaWVsZCIsInNhbWVDb2x1bW5zIiwic2FtZVdlaWdodEZpZWxkIiwiZGF0YUlkIiwiaXNWaXNpYmxlIiwidmlzQ29uZmlnIiwibmFtZSIsIndlaWdodERvbWFpbiIsImRhdGFzZXRTZWxlY3RvciIsImlzVmlzaWJsZVNlbGVjdG9yIiwidmlzQ29uZmlnU2VsZWN0b3IiLCJ3ZWlnaHRGaWVsZFNlbGVjdG9yIiwid2VpZ2h0RG9tYWluU2VsZWN0b3IiLCJkYXRhc2V0SWQiLCJsYXllciIsInR5cGUiLCJpZCIsInNvdXJjZSIsImxheW91dCIsInZpc2liaWxpdHkiLCJtYXh6b29tIiwicGFpbnQiLCJyZWdpc3RlclZpc0NvbmZpZyIsImNoYW5uZWwiLCJsYWJlbCIsIm1lYXN1cmUiLCJ3ZWlnaHRTY2FsZSIsImNvbG9yRmllbGQiLCJjb2xvckRvbWFpbiIsImNvbG9yU2NhbGUiLCJsYXllckNvbmZpZyIsIl8iLCJvcHRpb25zIiwiaXNTYW1lRGF0YSIsImlzU2FtZUNvbmZpZyIsImRhdGEiLCJuZXdDb25maWciLCJjb21wdXRlSGVhdG1hcENvbmZpZ3VyYXRpb24iLCJ3ZWlnaHQiLCJwcm9wZXJ0eSIsImZpZWxkIiwia2V5IiwiZGVmYXVsdE1lYXN1cmUiLCJzdXBwb3J0ZWRGaWVsZFR5cGVzIiwiQUxMX0ZJRUxEX1RZUEVTIiwicmVhbCIsImludGVnZXIiLCJjaGFubmVsU2NhbGVUeXBlIiwiQ0hBTk5FTF9TQ0FMRVMiLCJzaXplIiwiSGVhdG1hcExheWVySWNvbiIsIk1hcGJveEdMTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0EsSUFBTUEsY0FBYyxHQUFHLEVBQXZCO0FBRU8sSUFBTUMsaUJBQWlCLEdBQUc7QUFDL0JDLEVBQUFBLE9BQU8sRUFBRSxTQURzQjtBQUUvQkMsRUFBQUEsVUFBVSxFQUFFLFlBRm1CO0FBRy9CQyxFQUFBQSxNQUFNLEVBQUU7QUFIdUIsQ0FBMUI7QUFNUDs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsSUFBTUMsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUFDRixVQUFELEVBQWdCO0FBQ3JDLE1BQU1HLGFBQWEsR0FBR0MsNEJBQVdDLFFBQWpDO0FBRUEsTUFBTUMsTUFBTSxJQUFJLFNBQUosNkNBQWtCTixVQUFVLENBQUNNLE1BQTdCLEVBQVo7QUFFQSxNQUFNQyxLQUFLLEdBQUdKLGFBQWEsR0FDeEJLLE1BRFcsQ0FDSixDQUFDLENBQUQsRUFBSSxDQUFKLENBREksRUFFWEMsS0FGVyxDQUVMSCxNQUZLLENBQWQ7QUFJQSxNQUFNSSxZQUFZLEdBQUdILEtBQUssQ0FBQ0UsS0FBTixHQUFjRSxNQUFkLENBQXFCLFVBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFrQjtBQUMx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R0FDWCxJQURXLEdBRVgsb0NBQ0V4QyxPQURGLEVBRUVDLGFBRkYsRUFHRSxLQUFLRixNQUFMLENBQVlNLE9BSGQsRUFJRUMsV0FBVyxHQUFHLENBQUNBLFdBQUQsQ0FBSCxHQUFtQixFQUpoQyxDQUZGO0FBU0EsVUFBTW9DLFNBQVMsR0FBRyxLQUFLQywyQkFBTCxDQUFpQyxLQUFLNUMsTUFBdEMsQ0FBbEI7QUFDQTJDLE1BQUFBLFNBQVMsQ0FBQ3BCLEVBQVYsR0FBZSxLQUFLQSxFQUFwQjtBQUVBLGFBQU87QUFDTGpCLFFBQUFBLE9BQU8sRUFBRSxLQUFLTixNQUFMLENBQVlNLE9BRGhCO0FBRUxOLFFBQUFBLE1BQU0sRUFBRTJDLFNBRkg7QUFHTEQsUUFBQUEsSUFBSSxFQUFKQSxJQUhLO0FBSUxuQyxRQUFBQSxXQUFXLEVBQVhBO0FBSkssT0FBUDtBQU1EOzs7d0JBcktVO0FBQ1QsYUFBTyxTQUFQO0FBQ0Q7Ozt3QkFFb0I7QUFDbkIsYUFBTztBQUNMc0MsUUFBQUEsTUFBTSxFQUFFO0FBQ05DLFVBQUFBLFFBQVEsRUFBRSxRQURKO0FBRU5DLFVBQUFBLEtBQUssRUFBRSxhQUZEO0FBR045RCxVQUFBQSxLQUFLLEVBQUUsYUFIRDtBQUlOQyxVQUFBQSxNQUFNLEVBQUUsY0FKRjtBQUtOOEQsVUFBQUEsR0FBRyxFQUFFLFFBTEM7QUFNTjtBQUNBO0FBQ0FDLFVBQUFBLGNBQWMsRUFBRSxTQVJWO0FBU05DLFVBQUFBLG1CQUFtQixFQUFFLENBQUNDLGlDQUFnQkMsSUFBakIsRUFBdUJELGlDQUFnQkUsT0FBdkMsQ0FUZjtBQVVOQyxVQUFBQSxnQkFBZ0IsRUFBRUMsZ0NBQWVDO0FBVjNCO0FBREgsT0FBUDtBQWNEOzs7d0JBRWU7QUFDZCxhQUFPQyw0QkFBUDtBQUNEOzs7RUE3QndCQyx5Qjs7ZUE4S1o1RCxZIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHtDSEFOTkVMX1NDQUxFUywgU0NBTEVfRlVOQywgQUxMX0ZJRUxEX1RZUEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQge2dlb2pzb25Gcm9tUG9pbnRzfSBmcm9tICcuLi9tYXBib3gtdXRpbHMnO1xuaW1wb3J0IE1hcGJveEdMTGF5ZXIgZnJvbSAnLi4vbWFwYm94Z2wtbGF5ZXInO1xuaW1wb3J0IEhlYXRtYXBMYXllckljb24gZnJvbSAnLi9oZWF0bWFwLWxheWVyLWljb24nO1xuXG5jb25zdCBNQVhfWk9PTV9MRVZFTCA9IDE4O1xuXG5leHBvcnQgY29uc3QgaGVhdG1hcFZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICByYWRpdXM6ICdoZWF0bWFwUmFkaXVzJ1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbG9yUmFuZ2VcbiAqIEByZXR1cm4ge0FycmF5fSBbXG4gKiAgMCwgXCJyZ2JhKDMzLDEwMiwxNzIsMClcIixcbiAqICAwLjIsIFwicmdiKDEwMywxNjksMjA3KVwiLFxuICogIDAuNCwgXCJyZ2IoMjA5LDIyOSwyNDApXCIsXG4gKiAgMC42LCBcInJnYigyNTMsMjE5LDE5OSlcIixcbiAqICAwLjgsIFwicmdiKDIzOSwxMzgsOTgpXCIsXG4gKiAgMSwgXCJyZ2IoMTc4LDI0LDQzKVwiXG4gKiBdXG4gKi9cbmNvbnN0IGhlYXRtYXBEZW5zaXR5ID0gKGNvbG9yUmFuZ2UpID0+IHtcbiAgY29uc3Qgc2NhbGVGdW5jdGlvbiA9IFNDQUxFX0ZVTkMucXVhbnRpemU7XG5cbiAgY29uc3QgY29sb3JzID0gWycjMDAwMDAwJywgLi4uY29sb3JSYW5nZS5jb2xvcnNdO1xuXG4gIGNvbnN0IHNjYWxlID0gc2NhbGVGdW5jdGlvbigpXG4gICAgLmRvbWFpbihbMCwgMV0pXG4gICAgLnJhbmdlKGNvbG9ycyk7XG5cbiAgY29uc3QgY29sb3JEZW5zaXR5ID0gc2NhbGUucmFuZ2UoKS5yZWR1Y2UoKGJhbmRzLCBsZXZlbCkgPT4ge1xuICAgIGNvbnN0IGludmVydCA9IHNjYWxlLmludmVydEV4dGVudChsZXZlbCk7XG4gICAgcmV0dXJuIFtcbiAgICAgIC4uLmJhbmRzLFxuICAgICAgaW52ZXJ0WzBdLCAvLyBmaXJzdCB2YWx1ZSBpbiB0aGUgcmFuZ2VcbiAgICAgIGByZ2IoJHtoZXhUb1JnYihsZXZlbCkuam9pbignLCcpfSlgIC8vIGNvbG9yXG4gICAgXVxuICB9LCBbXSk7XG4gIGNvbG9yRGVuc2l0eVsxXSA9ICdyZ2JhKDAsMCwwLDApJztcbiAgcmV0dXJuIGNvbG9yRGVuc2l0eTtcbn07XG5cbmNvbnN0IHNob3VsZFJlYnVpbGQgPSAoc2FtZURhdGEsIHNhbWVDb25maWcpID0+ICEoc2FtZURhdGEgJiYgc2FtZUNvbmZpZyk7XG5cbmNsYXNzIEhlYXRtYXBMYXllciBleHRlbmRzIE1hcGJveEdMTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGhlYXRtYXBWaXNDb25maWdzKTtcbiAgfVxuXG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnaGVhdG1hcCc7XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdlaWdodDoge1xuICAgICAgICBwcm9wZXJ0eTogJ3dlaWdodCcsXG4gICAgICAgIGZpZWxkOiAnd2VpZ2h0RmllbGQnLFxuICAgICAgICBzY2FsZTogJ3dlaWdodFNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnd2VpZ2h0RG9tYWluJyxcbiAgICAgICAga2V5OiAnd2VpZ2h0JyxcbiAgICAgICAgLy8gc3VwcG9ydGVkRmllbGRUeXBlcyBjYW4gYmUgZGV0ZXJtaW5lZCBieSBjaGFubmVsU2NhbGVUeXBlXG4gICAgICAgIC8vIG9yIHNwZWNpZmllZCBoZXJlXG4gICAgICAgIGRlZmF1bHRNZWFzdXJlOiAnZGVuc2l0eScsXG4gICAgICAgIHN1cHBvcnRlZEZpZWxkVHlwZXM6IFtBTExfRklFTERfVFlQRVMucmVhbCwgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXJdLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiBDSEFOTkVMX1NDQUxFUy5zaXplXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEhlYXRtYXBMYXllckljb247XG4gIH1cblxuICBnZXRWaXN1YWxDaGFubmVsRGVzY3JpcHRpb24oY2hhbm5lbCkge1xuICAgIHJldHVybiBjaGFubmVsID09PSAnY29sb3InID8ge1xuICAgICAgbGFiZWw6ICdjb2xvcicsXG4gICAgICBtZWFzdXJlOiAnRGVuc2l0eSdcbiAgICB9IDoge1xuICAgICAgbGFiZWw6ICd3ZWlnaHQnLFxuICAgICAgbWVhc3VyZTogdGhpcy5jb25maWcud2VpZ2h0RmllbGQgPyB0aGlzLmNvbmZpZy53ZWlnaHRGaWVsZC5uYW1lIDogJ0RlbnNpdHknXG4gICAgfVxuICB9XG5cbiAgZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzID0ge30pIHtcblxuICAgIC8vIG1hcGJveCBoZWF0bWFwIGxheWVyIGNvbG9yIGlzIGFsd2F5cyBiYXNlZCBvbiBkZW5zaXR5XG4gICAgLy8gbm8gbmVlZCB0byBzZXQgY29sb3JGaWVsZCwgY29sb3JEb21haW4gYW5kIGNvbG9yU2NhbGVcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtjb2xvckZpZWxkLCBjb2xvckRvbWFpbiwgY29sb3JTY2FsZSwgLi4ubGF5ZXJDb25maWd9ID0ge1xuICAgICAgLi4uc3VwZXIuZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzKSxcblxuICAgICAgd2VpZ2h0RmllbGQ6IG51bGwsXG4gICAgICB3ZWlnaHREb21haW46IFswLCAxXSxcbiAgICAgIHdlaWdodFNjYWxlOiAnbGluZWFyJ1xuICAgIH07XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gICAgcmV0dXJuIGxheWVyQ29uZmlnO1xuICB9XG5cbiAgaXNTYW1lRGF0YSA9ICh7YWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fX0sIGNvbmZpZykgPT4ge1xuICAgIHJldHVybiBCb29sZWFuKG9sZExheWVyRGF0YSAmJiBvbGRMYXllckRhdGEuY29sdW1ucyA9PT0gY29uZmlnLmNvbHVtbnMgJiZcbiAgICAgIG9wdC5zYW1lRGF0YVxuICAgICk7XG4gIH07XG5cbiAgaXNTYW1lQ29uZmlnID0gKHtvbGRMYXllckRhdGEsIGNvbmZpZ30pID0+IHtcbiAgICAvLyBjb2x1bW5zIG11c3QgdXNlIHRoZSBzYW1lIGZpbGVkSWR4XG4gICAgLy8gdGhpcyBpcyBhIGZhc3Qgd2F5IHRvIGNvbXBhcmUgY29sdW1ucyBvYmplY3RcbiAgICBjb25zdCB7XG4gICAgICBjb2x1bW5zLFxuICAgICAgd2VpZ2h0RmllbGRcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgaWYgKCFvbGRMYXllckRhdGEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBzYW1lQ29sdW1ucyA9IGNvbHVtbnMgPT09IG9sZExheWVyRGF0YS5jb2x1bW5zO1xuICAgIGNvbnN0IHNhbWVXZWlnaHRGaWVsZCA9IHdlaWdodEZpZWxkID09PSBvbGRMYXllckRhdGEud2VpZ2h0RmllbGQ7XG4gICAgcmV0dXJuIHNhbWVDb2x1bW5zICYmIHNhbWVXZWlnaHRGaWVsZDtcbiAgfTtcblxuICBkYXRhc2V0U2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLmRhdGFJZDtcbiAgaXNWaXNpYmxlU2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLmlzVmlzaWJsZTtcbiAgdmlzQ29uZmlnU2VsZWN0b3IgPSBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZztcbiAgd2VpZ2h0RmllbGRTZWxlY3RvciA9IGNvbmZpZyA9PiBjb25maWcud2VpZ2h0RmllbGQgPyBjb25maWcud2VpZ2h0RmllbGQubmFtZSA6IG51bGw7XG4gIHdlaWdodERvbWFpblNlbGVjdG9yID0gY29uZmlnID0+IGNvbmZpZy53ZWlnaHREb21haW47XG5cbiAgY29tcHV0ZUhlYXRtYXBDb25maWd1cmF0aW9uID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgdGhpcy5kYXRhc2V0U2VsZWN0b3IsXG4gICAgdGhpcy5pc1Zpc2libGVTZWxlY3RvcixcbiAgICB0aGlzLnZpc0NvbmZpZ1NlbGVjdG9yLFxuICAgIHRoaXMud2VpZ2h0RmllbGRTZWxlY3RvcixcbiAgICB0aGlzLndlaWdodERvbWFpblNlbGVjdG9yLFxuXG4gICAgKGRhdGFzZXRJZCwgaXNWaXNpYmxlLCB2aXNDb25maWcsIHdlaWdodEZpZWxkLCB3ZWlnaHREb21haW4pID0+IHtcblxuICAgICAgY29uc3QgbGF5ZXIgPSB7XG4gICAgICAgIHR5cGU6ICdoZWF0bWFwJyxcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIHNvdXJjZTogZGF0YXNldElkLFxuICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICB2aXNpYmlsaXR5OiBpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgbWF4em9vbTogTUFYX1pPT01fTEVWRUwsXG4gICAgICAgIHBhaW50OiB7XG4gICAgICAgICAgJ2hlYXRtYXAtd2VpZ2h0Jzogd2VpZ2h0RmllbGQgPyBbXG4gICAgICAgICAgICAnaW50ZXJwb2xhdGUnLFxuICAgICAgICAgICAgWydsaW5lYXInXSxcbiAgICAgICAgICAgIFsnZ2V0Jywgd2VpZ2h0RmllbGRdLFxuICAgICAgICAgICAgd2VpZ2h0RG9tYWluWzBdLCAwLFxuICAgICAgICAgICAgd2VpZ2h0RG9tYWluWzFdLCAxXG4gICAgICAgICAgXSA6IDEsXG4gICAgICAgICAgJ2hlYXRtYXAtaW50ZW5zaXR5JzogW1xuICAgICAgICAgICAgJ2ludGVycG9sYXRlJyxcbiAgICAgICAgICAgIFsnbGluZWFyJ10sXG4gICAgICAgICAgICBbJ3pvb20nXSxcbiAgICAgICAgICAgIDAsIDEsXG4gICAgICAgICAgICBNQVhfWk9PTV9MRVZFTCwgM1xuICAgICAgICAgIF0sXG4gICAgICAgICAgJ2hlYXRtYXAtY29sb3InOiBbXG4gICAgICAgICAgICAnaW50ZXJwb2xhdGUnLFxuICAgICAgICAgICAgWydsaW5lYXInXSxcbiAgICAgICAgICAgIFsnaGVhdG1hcC1kZW5zaXR5J10sXG4gICAgICAgICAgICAuLi5oZWF0bWFwRGVuc2l0eSh2aXNDb25maWcuY29sb3JSYW5nZSlcbiAgICAgICAgICBdLFxuICAgICAgICAgICdoZWF0bWFwLXJhZGl1cyc6IFtcbiAgICAgICAgICAgICdpbnRlcnBvbGF0ZScsXG4gICAgICAgICAgICBbJ2xpbmVhciddLFxuICAgICAgICAgICAgWyd6b29tJ10sXG4gICAgICAgICAgICAwLCAyLFxuICAgICAgICAgICAgTUFYX1pPT01fTEVWRUwsIHZpc0NvbmZpZy5yYWRpdXMgLy8gcmFkaXVzXG4gICAgICAgICAgXSxcbiAgICAgICAgICAnaGVhdG1hcC1vcGFjaXR5JzogdmlzQ29uZmlnLm9wYWNpdHlcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIGxheWVyO1xuICAgIH1cbiAgKTtcblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBhbGxEYXRhLFxuICAgICAgZmlsdGVyZWRJbmRleCxcbiAgICAgIG9sZExheWVyRGF0YSxcbiAgICAgIG9wdCxcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWdcbiAgICB9O1xuXG4gICAgY29uc3Qge3dlaWdodEZpZWxkfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGlzU2FtZURhdGEgPSB0aGlzLmlzU2FtZURhdGEob3B0aW9ucywgdGhpcy5jb25maWcpO1xuICAgIGNvbnN0IGlzU2FtZUNvbmZpZyA9IHRoaXMuaXNTYW1lQ29uZmlnKG9wdGlvbnMpO1xuXG4gICAgY29uc3QgZGF0YSA9ICFzaG91bGRSZWJ1aWxkKGlzU2FtZURhdGEsIGlzU2FtZUNvbmZpZykgP1xuICAgICAgbnVsbCA6XG4gICAgICBnZW9qc29uRnJvbVBvaW50cyhcbiAgICAgICAgYWxsRGF0YSxcbiAgICAgICAgZmlsdGVyZWRJbmRleCxcbiAgICAgICAgdGhpcy5jb25maWcuY29sdW1ucyxcbiAgICAgICAgd2VpZ2h0RmllbGQgPyBbd2VpZ2h0RmllbGRdIDogW11cbiAgICAgICk7XG5cbiAgICBjb25zdCBuZXdDb25maWcgPSB0aGlzLmNvbXB1dGVIZWF0bWFwQ29uZmlndXJhdGlvbih0aGlzLmNvbmZpZyk7XG4gICAgbmV3Q29uZmlnLmlkID0gdGhpcy5pZDtcblxuICAgIHJldHVybiB7XG4gICAgICBjb2x1bW5zOiB0aGlzLmNvbmZpZy5jb2x1bW5zLFxuICAgICAgY29uZmlnOiBuZXdDb25maWcsXG4gICAgICBkYXRhLFxuICAgICAgd2VpZ2h0RmllbGRcbiAgICB9O1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhlYXRtYXBMYXllcjtcbiJdfQ==