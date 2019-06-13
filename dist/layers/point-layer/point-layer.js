"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pointVisConfigs = exports.pointOptionalColumns = exports.pointRequiredColumns = exports.pointLabelResolver = exports.pointLabelAccessor = exports.pointPosResolver = exports.pointPosAccessor = void 0;

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

var _deck = require("deck.gl");

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _scatterplotBrushingLayer = _interopRequireDefault(require("../../deckgl-layers/scatterplot-brushing-layer/scatterplot-brushing-layer"));

var _colorUtils = require("../../utils/color-utils");

var _pointLayerIcon = _interopRequireDefault(require("./point-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _viewportMercatorProject = require("viewport-mercator-project");

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
      lng = _ref.lng,
      altitude = _ref.altitude;
  return function (d) {
    return [// lng
    d.data[lng.fieldIdx], // lat
    d.data[lat.fieldIdx], // altitude
    altitude && altitude.fieldIdx > -1 ? d.data[altitude.fieldIdx] : 0];
  };
};

exports.pointPosAccessor = pointPosAccessor;

var pointPosResolver = function pointPosResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng,
      altitude = _ref2.altitude;
  return "".concat(lat.fieldIdx, "-").concat(lng.fieldIdx, "-").concat(altitude ? altitude.fieldIdx : 'z');
};

exports.pointPosResolver = pointPosResolver;

var pointLabelAccessor = function pointLabelAccessor(textLabel) {
  return function (d) {
    return String(d.data[textLabel.field.tableFieldIndex - 1]);
  };
};

exports.pointLabelAccessor = pointLabelAccessor;

var pointLabelResolver = function pointLabelResolver(textLabel) {
  return textLabel.field && textLabel.field.tableFieldIndex;
};

exports.pointLabelResolver = pointLabelResolver;
var pointRequiredColumns = ['lat', 'lng'];
exports.pointRequiredColumns = pointRequiredColumns;
var pointOptionalColumns = ['altitude'];
exports.pointOptionalColumns = pointOptionalColumns;
var pointVisConfigs = {
  radius: 'radius',
  fixedRadius: 'fixedRadius',
  opacity: 'opacity',
  outline: 'outline',
  thickness: 'thickness',
  strokeColor: 'strokeColor',
  colorRange: 'colorRange',
  strokeColorRange: 'strokeColorRange',
  radiusRange: 'radiusRange',
  filled: {
    type: 'boolean',
    label: 'Fill Color',
    defaultValue: true,
    property: 'filled'
  }
};
exports.pointVisConfigs = pointVisConfigs;

var PointLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2["default"])(PointLayer, _Layer);

  function PointLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, PointLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PointLayer).call(this, props));

    _this.registerVisConfig(pointVisConfigs);

    _this.getPosition = (0, _lodash["default"])(pointPosAccessor, pointPosResolver);
    _this.getText = [(0, _lodash["default"])(pointLabelAccessor, pointLabelResolver)];
    return _this;
  }

  (0, _createClass2["default"])(PointLayer, [{
    key: "getPositionAccessor",
    value: function getPositionAccessor() {
      return this.getPosition(this.config.columns);
    }
  }, {
    key: "getDefaultLayerConfig",
    value: function getDefaultLayerConfig() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "getDefaultLayerConfig", this).call(this, props), {
        // add stroke color visual channel
        strokeColorField: null,
        strokeColorDomain: [0, 1],
        strokeColorScale: 'quantile'
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
          strokeColorField = _this$config.strokeColorField,
          strokeColorScale = _this$config.strokeColorScale,
          strokeColorDomain = _this$config.strokeColorDomain,
          color = _this$config.color,
          sizeField = _this$config.sizeField,
          sizeScale = _this$config.sizeScale,
          sizeDomain = _this$config.sizeDomain,
          textLabel = _this$config.textLabel,
          _this$config$visConfi = _this$config.visConfig,
          radiusRange = _this$config$visConfi.radiusRange,
          fixedRadius = _this$config$visConfi.fixedRadius,
          colorRange = _this$config$visConfi.colorRange,
          strokeColorRange = _this$config$visConfi.strokeColorRange,
          strokeColor = _this$config$visConfi.strokeColor; // fill color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb)); // stroke color

      var scScale = strokeColorField && this.getVisChannelScale(strokeColorScale, strokeColorDomain, strokeColorRange.colors.map(_colorUtils.hexToRgb)); // point radius

      var rScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, radiusRange, fixedRadius);
      var getPosition = this.getPositionAccessor();

      if (!oldLayerData || oldLayerData.getPosition !== getPosition) {
        this.updateLayerMeta(allData, getPosition);
      }

      var data;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getPosition === getPosition) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.reduce(function (accu, index) {
          var pos = getPosition({
            data: allData[index]
          }); // if doesn't have point lat or lng, do not add the point
          // deck.gl can't handle position = null

          if (!pos.every(Number.isFinite)) {
            return accu;
          }

          accu.push({
            data: allData[index]
          });
          return accu;
        }, []);
      } // get all distinct characters in the text labels


      var getRadius = rScale ? function (d) {
        return _this2.getEncodedChannelValue(rScale, d.data, sizeField);
      } : 1;
      var getFillColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : color;
      var getLineColor = scScale ? function (d) {
        return _this2.getEncodedChannelValue(scScale, d.data, strokeColorField);
      } : strokeColor || color; // TODO: this should be cleaned up in the gpu-data-filter branch

      var textLabels = textLabel.map(function (tl, i) {
        if (!tl.field) {
          // if no field selected,
          return {
            getText: null,
            characterSet: []
          };
        }

        if (!_this2.getText[i]) {
          _this2.getText[i] = (0, _lodash["default"])(pointLabelAccessor, pointLabelResolver);
        }

        var getText = _this2.getText[i](tl);

        var characterSet;

        if (oldLayerData && Array.isArray(oldLayerData.textLabels) && oldLayerData.textLabels[i] && opt.sameData && oldLayerData.textLabels[i].getText === getText) {
          characterSet = oldLayerData.textLabels[i].characterSet;
        } else {
          var allLabels = tl.field ? data.map(getText) : [];
          characterSet = (0, _lodash2["default"])(allLabels.join(''));
        }

        return {
          characterSet: characterSet,
          getText: getText
        };
      });
      return {
        data: data,
        getPosition: getPosition,
        getFillColor: getFillColor,
        getLineColor: getLineColor,
        getRadius: getRadius,
        textLabels: textLabels
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData) {
      var getPosition = this.getPositionAccessor();
      var bounds = this.getPointsBounds(allData, function (d) {
        return getPosition({
          data: d
        });
      });
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "getTextOffset",
    value: function getTextOffset(config, radiusScale, getRadius, mapState) {
      var distanceScale = (0, _viewportMercatorProject.getDistanceScales)(mapState);
      var xMult = config.anchor === 'middle' ? 0 : config.anchor === 'start' ? 1 : -1;
      var yMult = config.alignment === 'center' ? 0 : config.alignment === 'bottom' ? 1 : -1;
      var sizeOffset = config.alignment === 'center' ? 0 : config.alignment === 'bottom' ? config.size : config.size;
      var pixelRadius = radiusScale * distanceScale.pixelsPerMeter[0];
      var padding = 20;
      return typeof getRadius === 'function' ? function (d) {
        return [xMult * (getRadius(d) * pixelRadius + padding), yMult * (getRadius(d) * pixelRadius + padding + sizeOffset)];
      } : [xMult * (getRadius * pixelRadius + padding), yMult * (getRadius * pixelRadius + padding + sizeOffset)];
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref3) {
      var _this3 = this;

      var data = _ref3.data,
          idx = _ref3.idx,
          layerInteraction = _ref3.layerInteraction,
          objectHovered = _ref3.objectHovered,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var enableBrushing = interactionConfig.brush.enabled;
      var radiusScale = this.getRadiusScaleByZoom(mapState);
      var layerProps = (0, _objectSpread2["default"])({
        // TODO: support setting stroke and fill simultaneously
        stroked: this.config.visConfig.outline,
        filled: this.config.visConfig.filled,
        radiusMinPixels: 1,
        lineWidthMinPixels: this.config.visConfig.thickness,
        radiusScale: radiusScale
      }, this.config.visConfig.fixedRadius ? {} : {
        radiusMaxPixels: 500
      });
      var interaction = {
        autoHighlight: !enableBrushing,
        enableBrushing: enableBrushing,
        brushRadius: interactionConfig.brush.config.size * 1000,
        highlightColor: this.config.highlightColor
      };
      var textLabel = this.config.textLabel;
      var updateTriggers = {
        getPosition: {
          columns: this.config.columns
        },
        getRadius: {
          sizeField: this.config.sizeField,
          radiusRange: this.config.visConfig.radiusRange,
          fixedRadius: this.config.visConfig.fixedRadius,
          sizeScale: this.config.sizeScale
        },
        getFillColor: {
          color: this.config.color,
          colorField: this.config.colorField,
          colorRange: this.config.visConfig.colorRange,
          colorScale: this.config.colorScale
        },
        getLineColor: {
          color: this.config.visConfig.strokeColor,
          colorField: this.config.strokeColorField,
          colorRange: this.config.visConfig.strokeColorRange,
          colorScale: this.config.strokeColorScale
        }
      };
      return [new _scatterplotBrushingLayer["default"]((0, _objectSpread2["default"])({}, layerProps, layerInteraction, data, interaction, {
        idx: idx,
        id: this.id,
        opacity: this.config.visConfig.opacity,
        pickable: true,
        parameters: {
          // circles will be flat on the map when the altitude column is not used
          depthTest: this.config.columns.altitude.fieldIdx > -1
        },
        updateTriggers: updateTriggers
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) ? [new _scatterplotBrushingLayer["default"]((0, _objectSpread2["default"])({}, layerProps, {
        id: "".concat(this.id, "-hovered"),
        data: [objectHovered.object],
        getLineColor: this.config.highlightColor,
        getFillColor: this.config.highlightColor,
        getRadius: data.getRadius,
        getPosition: data.getPosition,
        pickable: false
      }))] : []), (0, _toConsumableArray2["default"])(data.textLabels.reduce(function (accu, d, i) {
        if (d.getText) {
          accu.push(new _deck.TextLayer((0, _objectSpread2["default"])({}, layerInteraction, {
            id: "".concat(_this3.id, "-label-").concat(textLabel[i].field.name),
            data: data.data,
            getPosition: data.getPosition,
            getText: d.getText,
            characterSet: d.characterSet,
            getPixelOffset: _this3.getTextOffset(textLabel[i], radiusScale, data.getRadius, mapState),
            getSize: 1,
            sizeScale: textLabel[i].size,
            getTextAnchor: textLabel[i].anchor,
            getAlignmentBaseline: textLabel[i].alignment,
            getColor: textLabel[i].color,
            parameters: {
              // text will always show on top of all layers
              depthTest: false
            },
            updateTriggers: {
              getPosition: _this3.config.columns,
              getText: textLabel[i].field.name,
              getPixelOffset: (0, _objectSpread2["default"])({}, updateTriggers.getRadius, {
                mapState: mapState,
                anchor: textLabel[i].anchor,
                alignment: textLabel[i].alignment
              }),
              getTextAnchor: textLabel[i].anchor,
              getAlignmentBaseline: textLabel[i].alignment,
              getColor: textLabel[i].color
            }
          })));
        }

        return accu;
      }, [])));
    }
  }, {
    key: "type",
    get: function get() {
      return 'point';
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _pointLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return pointRequiredColumns;
    }
  }, {
    key: "optionalColumns",
    get: function get() {
      return pointOptionalColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "noneLayerDataAffectingProps",
    get: function get() {
      return [].concat((0, _toConsumableArray2["default"])((0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "noneLayerDataAffectingProps", this)), ['radius']);
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return {
        color: (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "visualChannels", this).color, {
          condition: function condition(config) {
            return config.visConfig.filled;
          }
        }),
        strokeColor: {
          property: 'strokeColor',
          field: 'strokeColorField',
          scale: 'strokeColorScale',
          domain: 'strokeColorDomain',
          range: 'strokeColorRange',
          key: 'strokeColor',
          channelScaleType: _defaultSettings.CHANNEL_SCALES.color,
          condition: function condition(config) {
            return config.visConfig.outline;
          }
        },
        size: (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(PointLayer.prototype), "visualChannels", this).size, {
          range: 'radiusRange',
          property: 'radius',
          channelScaleType: 'radius'
        })
      };
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var _ref4$fieldPairs = _ref4.fieldPairs,
          fieldPairs = _ref4$fieldPairs === void 0 ? [] : _ref4$fieldPairs;
      var props = []; // Make layer for each pair

      fieldPairs.forEach(function (pair) {
        // find fields for tableFieldIndex
        var latField = pair.pair.lat;
        var lngField = pair.pair.lng;
        var layerName = pair.defaultName;
        var prop = {
          label: layerName.length ? layerName : 'Point'
        }; // default layer color for begintrip and dropoff point

        if (latField.value in _defaultSettings.DEFAULT_LAYER_COLOR) {
          prop.color = (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR[latField.value]);
        } // set the first layer to be visible


        if (props.length === 0) {
          prop.isVisible = true;
        }

        prop.columns = {
          lat: latField,
          lng: lngField,
          altitude: {
            value: null,
            fieldIdx: -1,
            optional: true
          }
        };
        props.push(prop);
      });
      return props;
    }
  }]);
  return PointLayer;
}(_baseLayer["default"]);

exports["default"] = PointLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvcG9pbnQtbGF5ZXIvcG9pbnQtbGF5ZXIuanMiXSwibmFtZXMiOlsicG9pbnRQb3NBY2Nlc3NvciIsImxhdCIsImxuZyIsImFsdGl0dWRlIiwiZCIsImRhdGEiLCJmaWVsZElkeCIsInBvaW50UG9zUmVzb2x2ZXIiLCJwb2ludExhYmVsQWNjZXNzb3IiLCJ0ZXh0TGFiZWwiLCJTdHJpbmciLCJmaWVsZCIsInRhYmxlRmllbGRJbmRleCIsInBvaW50TGFiZWxSZXNvbHZlciIsInBvaW50UmVxdWlyZWRDb2x1bW5zIiwicG9pbnRPcHRpb25hbENvbHVtbnMiLCJwb2ludFZpc0NvbmZpZ3MiLCJyYWRpdXMiLCJmaXhlZFJhZGl1cyIsIm9wYWNpdHkiLCJvdXRsaW5lIiwidGhpY2tuZXNzIiwic3Ryb2tlQ29sb3IiLCJjb2xvclJhbmdlIiwic3Ryb2tlQ29sb3JSYW5nZSIsInJhZGl1c1JhbmdlIiwiZmlsbGVkIiwidHlwZSIsImxhYmVsIiwiZGVmYXVsdFZhbHVlIiwicHJvcGVydHkiLCJQb2ludExheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsImdldFBvc2l0aW9uIiwiZ2V0VGV4dCIsImNvbmZpZyIsImNvbHVtbnMiLCJzdHJva2VDb2xvckZpZWxkIiwic3Ryb2tlQ29sb3JEb21haW4iLCJzdHJva2VDb2xvclNjYWxlIiwiXyIsImFsbERhdGEiLCJmaWx0ZXJlZEluZGV4Iiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiY29sb3JTY2FsZSIsImNvbG9yRG9tYWluIiwiY29sb3JGaWVsZCIsImNvbG9yIiwic2l6ZUZpZWxkIiwic2l6ZVNjYWxlIiwic2l6ZURvbWFpbiIsInZpc0NvbmZpZyIsImNTY2FsZSIsImdldFZpc0NoYW5uZWxTY2FsZSIsImNvbG9ycyIsIm1hcCIsImhleFRvUmdiIiwic2NTY2FsZSIsInJTY2FsZSIsImdldFBvc2l0aW9uQWNjZXNzb3IiLCJ1cGRhdGVMYXllck1ldGEiLCJzYW1lRGF0YSIsInJlZHVjZSIsImFjY3UiLCJpbmRleCIsInBvcyIsImV2ZXJ5IiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJwdXNoIiwiZ2V0UmFkaXVzIiwiZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZSIsImdldEZpbGxDb2xvciIsImdldExpbmVDb2xvciIsInRleHRMYWJlbHMiLCJ0bCIsImkiLCJjaGFyYWN0ZXJTZXQiLCJBcnJheSIsImlzQXJyYXkiLCJhbGxMYWJlbHMiLCJqb2luIiwiYm91bmRzIiwiZ2V0UG9pbnRzQm91bmRzIiwidXBkYXRlTWV0YSIsInJhZGl1c1NjYWxlIiwibWFwU3RhdGUiLCJkaXN0YW5jZVNjYWxlIiwieE11bHQiLCJhbmNob3IiLCJ5TXVsdCIsImFsaWdubWVudCIsInNpemVPZmZzZXQiLCJzaXplIiwicGl4ZWxSYWRpdXMiLCJwaXhlbHNQZXJNZXRlciIsInBhZGRpbmciLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsImludGVyYWN0aW9uQ29uZmlnIiwiZW5hYmxlQnJ1c2hpbmciLCJicnVzaCIsImVuYWJsZWQiLCJnZXRSYWRpdXNTY2FsZUJ5Wm9vbSIsImxheWVyUHJvcHMiLCJzdHJva2VkIiwicmFkaXVzTWluUGl4ZWxzIiwibGluZVdpZHRoTWluUGl4ZWxzIiwicmFkaXVzTWF4UGl4ZWxzIiwiaW50ZXJhY3Rpb24iLCJhdXRvSGlnaGxpZ2h0IiwiYnJ1c2hSYWRpdXMiLCJoaWdobGlnaHRDb2xvciIsInVwZGF0ZVRyaWdnZXJzIiwiU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyIiwiaWQiLCJwaWNrYWJsZSIsInBhcmFtZXRlcnMiLCJkZXB0aFRlc3QiLCJpc0xheWVySG92ZXJlZCIsIm9iamVjdCIsIlRleHRMYXllciIsIm5hbWUiLCJnZXRQaXhlbE9mZnNldCIsImdldFRleHRPZmZzZXQiLCJnZXRTaXplIiwiZ2V0VGV4dEFuY2hvciIsImdldEFsaWdubWVudEJhc2VsaW5lIiwiZ2V0Q29sb3IiLCJQb2ludExheWVySWNvbiIsImRlZmF1bHRQb2ludENvbHVtblBhaXJzIiwiY29uZGl0aW9uIiwic2NhbGUiLCJkb21haW4iLCJyYW5nZSIsImtleSIsImNoYW5uZWxTY2FsZVR5cGUiLCJDSEFOTkVMX1NDQUxFUyIsImZpZWxkUGFpcnMiLCJmb3JFYWNoIiwicGFpciIsImxhdEZpZWxkIiwibG5nRmllbGQiLCJsYXllck5hbWUiLCJkZWZhdWx0TmFtZSIsInByb3AiLCJsZW5ndGgiLCJ2YWx1ZSIsIkRFRkFVTFRfTEFZRVJfQ09MT1IiLCJpc1Zpc2libGUiLCJvcHRpb25hbCIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWFPLElBQU1BLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7QUFBQSxNQUFFQyxHQUFGLFFBQUVBLEdBQUY7QUFBQSxNQUFPQyxHQUFQLFFBQU9BLEdBQVA7QUFBQSxNQUFZQyxRQUFaLFFBQVlBLFFBQVo7QUFBQSxTQUEwQixVQUFBQyxDQUFDO0FBQUEsV0FBSSxDQUM3RDtBQUNBQSxJQUFBQSxDQUFDLENBQUNDLElBQUYsQ0FBT0gsR0FBRyxDQUFDSSxRQUFYLENBRjZELEVBRzdEO0FBQ0FGLElBQUFBLENBQUMsQ0FBQ0MsSUFBRixDQUFPSixHQUFHLENBQUNLLFFBQVgsQ0FKNkQsRUFLN0Q7QUFDQUgsSUFBQUEsUUFBUSxJQUFJQSxRQUFRLENBQUNHLFFBQVQsR0FBb0IsQ0FBQyxDQUFqQyxHQUFxQ0YsQ0FBQyxDQUFDQyxJQUFGLENBQU9GLFFBQVEsQ0FBQ0csUUFBaEIsQ0FBckMsR0FBaUUsQ0FOSixDQUFKO0FBQUEsR0FBM0I7QUFBQSxDQUF6Qjs7OztBQVNBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUI7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LE9BQUwsR0FBZTtBQUNicEMsVUFBQUEsR0FBRyxFQUFFK0ksUUFEUTtBQUViOUksVUFBQUEsR0FBRyxFQUFFK0ksUUFGUTtBQUdiOUksVUFBQUEsUUFBUSxFQUFFO0FBQUNtSixZQUFBQSxLQUFLLEVBQUUsSUFBUjtBQUFjaEosWUFBQUEsUUFBUSxFQUFFLENBQUMsQ0FBekI7QUFBNEJtSixZQUFBQSxRQUFRLEVBQUU7QUFBdEM7QUFIRyxTQUFmO0FBTUF6SCxRQUFBQSxLQUFLLENBQUN1QyxJQUFOLENBQVc2RSxJQUFYO0FBQ0QsT0EzQkQ7QUE2QkEsYUFBT3BILEtBQVA7QUFDRDs7O0VBbkdxQzBILHFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG1lbW9pemUgZnJvbSAnbG9kYXNoLm1lbW9pemUnO1xuaW1wb3J0IHVuaXEgZnJvbSAnbG9kYXNoLnVuaXEnO1xuaW1wb3J0IHtUZXh0TGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuXG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQgU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvc2NhdHRlcnBsb3QtYnJ1c2hpbmctbGF5ZXIvc2NhdHRlcnBsb3QtYnJ1c2hpbmctbGF5ZXInO1xuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAndXRpbHMvY29sb3ItdXRpbHMnO1xuaW1wb3J0IFBvaW50TGF5ZXJJY29uIGZyb20gJy4vcG9pbnQtbGF5ZXItaWNvbic7XG5pbXBvcnQge0RFRkFVTFRfTEFZRVJfQ09MT1IsIENIQU5ORUxfU0NBTEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2dldERpc3RhbmNlU2NhbGVzfSBmcm9tICd2aWV3cG9ydC1tZXJjYXRvci1wcm9qZWN0JztcblxuZXhwb3J0IGNvbnN0IHBvaW50UG9zQWNjZXNzb3IgPSAoe2xhdCwgbG5nLCBhbHRpdHVkZX0pID0+IGQgPT4gW1xuICAvLyBsbmdcbiAgZC5kYXRhW2xuZy5maWVsZElkeF0sXG4gIC8vIGxhdFxuICBkLmRhdGFbbGF0LmZpZWxkSWR4XSxcbiAgLy8gYWx0aXR1ZGVcbiAgYWx0aXR1ZGUgJiYgYWx0aXR1ZGUuZmllbGRJZHggPiAtMSA/IGQuZGF0YVthbHRpdHVkZS5maWVsZElkeF0gOiAwXG5dO1xuXG5leHBvcnQgY29uc3QgcG9pbnRQb3NSZXNvbHZlciA9ICh7bGF0LCBsbmcsIGFsdGl0dWRlfSkgPT5cbiAgYCR7bGF0LmZpZWxkSWR4fS0ke2xuZy5maWVsZElkeH0tJHthbHRpdHVkZSA/IGFsdGl0dWRlLmZpZWxkSWR4IDogJ3onfWA7XG5cbmV4cG9ydCBjb25zdCBwb2ludExhYmVsQWNjZXNzb3IgPSB0ZXh0TGFiZWwgPT4gZCA9PlxuICBTdHJpbmcoZC5kYXRhW3RleHRMYWJlbC5maWVsZC50YWJsZUZpZWxkSW5kZXggLSAxXSk7XG5leHBvcnQgY29uc3QgcG9pbnRMYWJlbFJlc29sdmVyID0gdGV4dExhYmVsID0+XG4gIHRleHRMYWJlbC5maWVsZCAmJiB0ZXh0TGFiZWwuZmllbGQudGFibGVGaWVsZEluZGV4O1xuXG5leHBvcnQgY29uc3QgcG9pbnRSZXF1aXJlZENvbHVtbnMgPSBbJ2xhdCcsICdsbmcnXTtcbmV4cG9ydCBjb25zdCBwb2ludE9wdGlvbmFsQ29sdW1ucyA9IFsnYWx0aXR1ZGUnXTtcblxuZXhwb3J0IGNvbnN0IHBvaW50VmlzQ29uZmlncyA9IHtcbiAgcmFkaXVzOiAncmFkaXVzJyxcbiAgZml4ZWRSYWRpdXM6ICdmaXhlZFJhZGl1cycsXG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgb3V0bGluZTogJ291dGxpbmUnLFxuICB0aGlja25lc3M6ICd0aGlja25lc3MnLFxuICBzdHJva2VDb2xvcjogJ3N0cm9rZUNvbG9yJyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBzdHJva2VDb2xvclJhbmdlOiAnc3Ryb2tlQ29sb3JSYW5nZScsXG4gIHJhZGl1c1JhbmdlOiAncmFkaXVzUmFuZ2UnLFxuICBmaWxsZWQ6IHtcbiAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgbGFiZWw6ICdGaWxsIENvbG9yJyxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgcHJvcGVydHk6ICdmaWxsZWQnXG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvaW50TGF5ZXIgZXh0ZW5kcyBMYXllciB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhwb2ludFZpc0NvbmZpZ3MpO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24gPSBtZW1vaXplKHBvaW50UG9zQWNjZXNzb3IsIHBvaW50UG9zUmVzb2x2ZXIpO1xuICAgIHRoaXMuZ2V0VGV4dCA9IFttZW1vaXplKHBvaW50TGFiZWxBY2Nlc3NvciwgcG9pbnRMYWJlbFJlc29sdmVyKV07XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ3BvaW50JztcbiAgfVxuXG4gIGdldCBpc0FnZ3JlZ2F0ZWQoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gUG9pbnRMYXllckljb247XG4gIH1cbiAgZ2V0IHJlcXVpcmVkTGF5ZXJDb2x1bW5zKCkge1xuICAgIHJldHVybiBwb2ludFJlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBvcHRpb25hbENvbHVtbnMoKSB7XG4gICAgcmV0dXJuIHBvaW50T3B0aW9uYWxDb2x1bW5zO1xuICB9XG5cbiAgZ2V0IGNvbHVtblBhaXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRlZmF1bHRQb2ludENvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IG5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcygpIHtcbiAgICByZXR1cm4gWy4uLnN1cGVyLm5vbmVMYXllckRhdGFBZmZlY3RpbmdQcm9wcywgJ3JhZGl1cyddO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5jb2xvcixcbiAgICAgICAgY29uZGl0aW9uOiBjb25maWcgPT4gY29uZmlnLnZpc0NvbmZpZy5maWxsZWRcbiAgICAgIH0sXG4gICAgICBzdHJva2VDb2xvcjoge1xuICAgICAgICBwcm9wZXJ0eTogJ3N0cm9rZUNvbG9yJyxcbiAgICAgICAgZmllbGQ6ICdzdHJva2VDb2xvckZpZWxkJyxcbiAgICAgICAgc2NhbGU6ICdzdHJva2VDb2xvclNjYWxlJyxcbiAgICAgICAgZG9tYWluOiAnc3Ryb2tlQ29sb3JEb21haW4nLFxuICAgICAgICByYW5nZTogJ3N0cm9rZUNvbG9yUmFuZ2UnLFxuICAgICAgICBrZXk6ICdzdHJva2VDb2xvcicsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6IENIQU5ORUxfU0NBTEVTLmNvbG9yLFxuICAgICAgICBjb25kaXRpb246IGNvbmZpZyA9PiBjb25maWcudmlzQ29uZmlnLm91dGxpbmVcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLnNpemUsXG4gICAgICAgIHJhbmdlOiAncmFkaXVzUmFuZ2UnLFxuICAgICAgICBwcm9wZXJ0eTogJ3JhZGl1cycsXG4gICAgICAgIGNoYW5uZWxTY2FsZVR5cGU6ICdyYWRpdXMnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGdldFBvc2l0aW9uQWNjZXNzb3IoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UG9zaXRpb24odGhpcy5jb25maWcuY29sdW1ucyk7XG4gIH1cblxuICBzdGF0aWMgZmluZERlZmF1bHRMYXllclByb3BzKHtmaWVsZFBhaXJzID0gW119KSB7XG4gICAgY29uc3QgcHJvcHMgPSBbXTtcblxuICAgIC8vIE1ha2UgbGF5ZXIgZm9yIGVhY2ggcGFpclxuICAgIGZpZWxkUGFpcnMuZm9yRWFjaChwYWlyID0+IHtcbiAgICAgIC8vIGZpbmQgZmllbGRzIGZvciB0YWJsZUZpZWxkSW5kZXhcbiAgICAgIGNvbnN0IGxhdEZpZWxkID0gcGFpci5wYWlyLmxhdDtcbiAgICAgIGNvbnN0IGxuZ0ZpZWxkID0gcGFpci5wYWlyLmxuZztcbiAgICAgIGNvbnN0IGxheWVyTmFtZSA9IHBhaXIuZGVmYXVsdE5hbWU7XG5cbiAgICAgIGNvbnN0IHByb3AgPSB7XG4gICAgICAgIGxhYmVsOiBsYXllck5hbWUubGVuZ3RoID8gbGF5ZXJOYW1lIDogJ1BvaW50J1xuICAgICAgfTtcblxuICAgICAgLy8gZGVmYXVsdCBsYXllciBjb2xvciBmb3IgYmVnaW50cmlwIGFuZCBkcm9wb2ZmIHBvaW50XG4gICAgICBpZiAobGF0RmllbGQudmFsdWUgaW4gREVGQVVMVF9MQVlFUl9DT0xPUikge1xuICAgICAgICBwcm9wLmNvbG9yID0gaGV4VG9SZ2IoREVGQVVMVF9MQVlFUl9DT0xPUltsYXRGaWVsZC52YWx1ZV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgdGhlIGZpcnN0IGxheWVyIHRvIGJlIHZpc2libGVcbiAgICAgIGlmIChwcm9wcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcHJvcC5pc1Zpc2libGUgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBwcm9wLmNvbHVtbnMgPSB7XG4gICAgICAgIGxhdDogbGF0RmllbGQsXG4gICAgICAgIGxuZzogbG5nRmllbGQsXG4gICAgICAgIGFsdGl0dWRlOiB7dmFsdWU6IG51bGwsIGZpZWxkSWR4OiAtMSwgb3B0aW9uYWw6IHRydWV9XG4gICAgICB9O1xuXG4gICAgICBwcm9wcy5wdXNoKHByb3ApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb3BzO1xuICB9XG5cbiAgZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzID0ge30pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3VwZXIuZ2V0RGVmYXVsdExheWVyQ29uZmlnKHByb3BzKSxcblxuICAgICAgLy8gYWRkIHN0cm9rZSBjb2xvciB2aXN1YWwgY2hhbm5lbFxuICAgICAgc3Ryb2tlQ29sb3JGaWVsZDogbnVsbCxcbiAgICAgIHN0cm9rZUNvbG9yRG9tYWluOiBbMCwgMV0sXG4gICAgICBzdHJva2VDb2xvclNjYWxlOiAncXVhbnRpbGUnXG4gICAgfTtcbiAgfVxuXG4gIC8vIFRPRE86IGZpeCBjb21wbGV4aXR5XG4gIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgZm9ybWF0TGF5ZXJEYXRhKF8sIGFsbERhdGEsIGZpbHRlcmVkSW5kZXgsIG9sZExheWVyRGF0YSwgb3B0ID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBjb2xvclNjYWxlLFxuICAgICAgY29sb3JEb21haW4sXG4gICAgICBjb2xvckZpZWxkLFxuICAgICAgc3Ryb2tlQ29sb3JGaWVsZCxcbiAgICAgIHN0cm9rZUNvbG9yU2NhbGUsXG4gICAgICBzdHJva2VDb2xvckRvbWFpbixcbiAgICAgIGNvbG9yLFxuICAgICAgc2l6ZUZpZWxkLFxuICAgICAgc2l6ZVNjYWxlLFxuICAgICAgc2l6ZURvbWFpbixcbiAgICAgIHRleHRMYWJlbCxcbiAgICAgIHZpc0NvbmZpZzoge1xuICAgICAgICByYWRpdXNSYW5nZSxcbiAgICAgICAgZml4ZWRSYWRpdXMsXG4gICAgICAgIGNvbG9yUmFuZ2UsXG4gICAgICAgIHN0cm9rZUNvbG9yUmFuZ2UsXG4gICAgICAgIHN0cm9rZUNvbG9yXG4gICAgICB9XG4gICAgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgLy8gZmlsbCBjb2xvclxuICAgIGNvbnN0IGNTY2FsZSA9XG4gICAgICBjb2xvckZpZWxkICYmXG4gICAgICB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShcbiAgICAgICAgY29sb3JTY2FsZSxcbiAgICAgICAgY29sb3JEb21haW4sXG4gICAgICAgIGNvbG9yUmFuZ2UuY29sb3JzLm1hcChoZXhUb1JnYilcbiAgICAgICk7XG5cbiAgICAvLyBzdHJva2UgY29sb3JcbiAgICBjb25zdCBzY1NjYWxlID1cbiAgICAgIHN0cm9rZUNvbG9yRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKFxuICAgICAgICBzdHJva2VDb2xvclNjYWxlLFxuICAgICAgICBzdHJva2VDb2xvckRvbWFpbixcbiAgICAgICAgc3Ryb2tlQ29sb3JSYW5nZS5jb2xvcnMubWFwKGhleFRvUmdiKVxuICAgICAgKTtcblxuICAgIC8vIHBvaW50IHJhZGl1c1xuICAgIGNvbnN0IHJTY2FsZSA9XG4gICAgICBzaXplRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKHNpemVTY2FsZSwgc2l6ZURvbWFpbiwgcmFkaXVzUmFuZ2UsIGZpeGVkUmFkaXVzKTtcblxuICAgIGNvbnN0IGdldFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbkFjY2Vzc29yKCk7XG5cbiAgICBpZiAoIW9sZExheWVyRGF0YSB8fCBvbGRMYXllckRhdGEuZ2V0UG9zaXRpb24gIT09IGdldFBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKFxuICAgICAgb2xkTGF5ZXJEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZGF0YSAmJlxuICAgICAgb3B0LnNhbWVEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZ2V0UG9zaXRpb24gPT09IGdldFBvc2l0aW9uXG4gICAgKSB7XG4gICAgICBkYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBmaWx0ZXJlZEluZGV4LnJlZHVjZSgoYWNjdSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oe2RhdGE6IGFsbERhdGFbaW5kZXhdfSk7XG5cbiAgICAgICAgLy8gaWYgZG9lc24ndCBoYXZlIHBvaW50IGxhdCBvciBsbmcsIGRvIG5vdCBhZGQgdGhlIHBvaW50XG4gICAgICAgIC8vIGRlY2suZ2wgY2FuJ3QgaGFuZGxlIHBvc2l0aW9uID0gbnVsbFxuICAgICAgICBpZiAoIXBvcy5ldmVyeShOdW1iZXIuaXNGaW5pdGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGFjY3U7XG4gICAgICAgIH1cblxuICAgICAgICBhY2N1LnB1c2goe1xuICAgICAgICAgIGRhdGE6IGFsbERhdGFbaW5kZXhdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIC8vIGdldCBhbGwgZGlzdGluY3QgY2hhcmFjdGVycyBpbiB0aGUgdGV4dCBsYWJlbHNcbiAgICBjb25zdCBnZXRSYWRpdXMgPSByU2NhbGVcbiAgICAgID8gZCA9PiB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoclNjYWxlLCBkLmRhdGEsIHNpemVGaWVsZClcbiAgICAgIDogMTtcblxuICAgIGNvbnN0IGdldEZpbGxDb2xvciA9IGNTY2FsZVxuICAgICAgPyBkID0+IHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShjU2NhbGUsIGQuZGF0YSwgY29sb3JGaWVsZClcbiAgICAgIDogY29sb3I7XG5cbiAgICBjb25zdCBnZXRMaW5lQ29sb3IgPSBzY1NjYWxlXG4gICAgICA/IGQgPT4gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKHNjU2NhbGUsIGQuZGF0YSwgc3Ryb2tlQ29sb3JGaWVsZClcbiAgICAgIDogc3Ryb2tlQ29sb3IgfHwgY29sb3I7XG5cbiAgICAvLyBUT0RPOiB0aGlzIHNob3VsZCBiZSBjbGVhbmVkIHVwIGluIHRoZSBncHUtZGF0YS1maWx0ZXIgYnJhbmNoXG4gICAgY29uc3QgdGV4dExhYmVscyA9IHRleHRMYWJlbC5tYXAoKHRsLCBpKSA9PiB7XG4gICAgICBpZiAoIXRsLmZpZWxkKSB7XG4gICAgICAgIC8vIGlmIG5vIGZpZWxkIHNlbGVjdGVkLFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGdldFRleHQ6IG51bGwsXG4gICAgICAgICAgY2hhcmFjdGVyU2V0OiBbXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmdldFRleHRbaV0pIHtcbiAgICAgICAgdGhpcy5nZXRUZXh0W2ldID0gbWVtb2l6ZShwb2ludExhYmVsQWNjZXNzb3IsIHBvaW50TGFiZWxSZXNvbHZlcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdldFRleHQgPSB0aGlzLmdldFRleHRbaV0odGwpO1xuICAgICAgbGV0IGNoYXJhY3RlclNldDtcblxuICAgICAgaWYgKFxuICAgICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgICAgQXJyYXkuaXNBcnJheShvbGRMYXllckRhdGEudGV4dExhYmVscykgJiZcbiAgICAgICAgb2xkTGF5ZXJEYXRhLnRleHRMYWJlbHNbaV0gJiZcbiAgICAgICAgb3B0LnNhbWVEYXRhICYmXG4gICAgICAgIG9sZExheWVyRGF0YS50ZXh0TGFiZWxzW2ldLmdldFRleHQgPT09IGdldFRleHRcbiAgICAgICkge1xuICAgICAgICBjaGFyYWN0ZXJTZXQgPSBvbGRMYXllckRhdGEudGV4dExhYmVsc1tpXS5jaGFyYWN0ZXJTZXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBhbGxMYWJlbHMgPSB0bC5maWVsZCA/IGRhdGEubWFwKGdldFRleHQpIDogW107XG4gICAgICAgIGNoYXJhY3RlclNldCA9IHVuaXEoYWxsTGFiZWxzLmpvaW4oJycpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhcmFjdGVyU2V0LFxuICAgICAgICBnZXRUZXh0XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGEsXG4gICAgICBnZXRQb3NpdGlvbixcbiAgICAgIGdldEZpbGxDb2xvcixcbiAgICAgIGdldExpbmVDb2xvcixcbiAgICAgIGdldFJhZGl1cyxcbiAgICAgIHRleHRMYWJlbHNcbiAgICB9O1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuXG4gIHVwZGF0ZUxheWVyTWV0YShhbGxEYXRhKSB7XG4gICAgY29uc3QgZ2V0UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uQWNjZXNzb3IoKTtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldFBvaW50c0JvdW5kcyhhbGxEYXRhLCBkID0+IGdldFBvc2l0aW9uKHtkYXRhOiBkfSkpO1xuICAgIHRoaXMudXBkYXRlTWV0YSh7Ym91bmRzfSk7XG4gIH1cblxuICBnZXRUZXh0T2Zmc2V0KGNvbmZpZywgcmFkaXVzU2NhbGUsIGdldFJhZGl1cywgbWFwU3RhdGUpIHtcbiAgICBjb25zdCBkaXN0YW5jZVNjYWxlID0gZ2V0RGlzdGFuY2VTY2FsZXMobWFwU3RhdGUpO1xuICAgIGNvbnN0IHhNdWx0ID1cbiAgICAgIGNvbmZpZy5hbmNob3IgPT09ICdtaWRkbGUnID8gMCA6IGNvbmZpZy5hbmNob3IgPT09ICdzdGFydCcgPyAxIDogLTE7XG4gICAgY29uc3QgeU11bHQgPVxuICAgICAgY29uZmlnLmFsaWdubWVudCA9PT0gJ2NlbnRlcidcbiAgICAgICAgPyAwXG4gICAgICAgIDogY29uZmlnLmFsaWdubWVudCA9PT0gJ2JvdHRvbSdcbiAgICAgICAgPyAxXG4gICAgICAgIDogLTE7XG5cbiAgICBjb25zdCBzaXplT2Zmc2V0ID1cbiAgICAgIGNvbmZpZy5hbGlnbm1lbnQgPT09ICdjZW50ZXInXG4gICAgICAgID8gMFxuICAgICAgICA6IGNvbmZpZy5hbGlnbm1lbnQgPT09ICdib3R0b20nXG4gICAgICAgID8gY29uZmlnLnNpemVcbiAgICAgICAgOiBjb25maWcuc2l6ZTtcblxuICAgIGNvbnN0IHBpeGVsUmFkaXVzID0gcmFkaXVzU2NhbGUgKiBkaXN0YW5jZVNjYWxlLnBpeGVsc1Blck1ldGVyWzBdO1xuICAgIGNvbnN0IHBhZGRpbmcgPSAyMDtcblxuICAgIHJldHVybiB0eXBlb2YgZ2V0UmFkaXVzID09PSAnZnVuY3Rpb24nXG4gICAgICA/IGQgPT4gW1xuICAgICAgICAgIHhNdWx0ICogKGdldFJhZGl1cyhkKSAqIHBpeGVsUmFkaXVzICsgcGFkZGluZyksXG4gICAgICAgICAgeU11bHQgKiAoZ2V0UmFkaXVzKGQpICogcGl4ZWxSYWRpdXMgKyBwYWRkaW5nICsgc2l6ZU9mZnNldClcbiAgICAgICAgXVxuICAgICAgOiBbXG4gICAgICAgICAgeE11bHQgKiAoZ2V0UmFkaXVzICogcGl4ZWxSYWRpdXMgKyBwYWRkaW5nKSxcbiAgICAgICAgICB5TXVsdCAqIChnZXRSYWRpdXMgKiBwaXhlbFJhZGl1cyArIHBhZGRpbmcgKyBzaXplT2Zmc2V0KVxuICAgICAgICBdO1xuICB9XG5cbiAgcmVuZGVyTGF5ZXIoe1xuICAgIGRhdGEsXG4gICAgaWR4LFxuICAgIGxheWVySW50ZXJhY3Rpb24sXG4gICAgb2JqZWN0SG92ZXJlZCxcbiAgICBtYXBTdGF0ZSxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZ1xuICB9KSB7XG4gICAgY29uc3QgZW5hYmxlQnJ1c2hpbmcgPSBpbnRlcmFjdGlvbkNvbmZpZy5icnVzaC5lbmFibGVkO1xuICAgIGNvbnN0IHJhZGl1c1NjYWxlID0gdGhpcy5nZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSk7XG5cbiAgICBjb25zdCBsYXllclByb3BzID0ge1xuICAgICAgLy8gVE9ETzogc3VwcG9ydCBzZXR0aW5nIHN0cm9rZSBhbmQgZmlsbCBzaW11bHRhbmVvdXNseVxuICAgICAgc3Ryb2tlZDogdGhpcy5jb25maWcudmlzQ29uZmlnLm91dGxpbmUsXG4gICAgICBmaWxsZWQ6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5maWxsZWQsXG4gICAgICByYWRpdXNNaW5QaXhlbHM6IDEsXG4gICAgICBsaW5lV2lkdGhNaW5QaXhlbHM6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG4gICAgICByYWRpdXNTY2FsZSxcbiAgICAgIC4uLih0aGlzLmNvbmZpZy52aXNDb25maWcuZml4ZWRSYWRpdXMgPyB7fSA6IHtyYWRpdXNNYXhQaXhlbHM6IDUwMH0pXG4gICAgfTtcblxuICAgIGNvbnN0IGludGVyYWN0aW9uID0ge1xuICAgICAgYXV0b0hpZ2hsaWdodDogIWVuYWJsZUJydXNoaW5nLFxuICAgICAgZW5hYmxlQnJ1c2hpbmcsXG4gICAgICBicnVzaFJhZGl1czogaW50ZXJhY3Rpb25Db25maWcuYnJ1c2guY29uZmlnLnNpemUgKiAxMDAwLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yXG4gICAgfTtcblxuICAgIGNvbnN0IHt0ZXh0TGFiZWx9ID0gdGhpcy5jb25maWc7XG4gICAgY29uc3QgdXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBnZXRQb3NpdGlvbjoge1xuICAgICAgICBjb2x1bW5zOiB0aGlzLmNvbmZpZy5jb2x1bW5zXG4gICAgICB9LFxuICAgICAgZ2V0UmFkaXVzOiB7XG4gICAgICAgIHNpemVGaWVsZDogdGhpcy5jb25maWcuc2l6ZUZpZWxkLFxuICAgICAgICByYWRpdXNSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLnJhZGl1c1JhbmdlLFxuICAgICAgICBmaXhlZFJhZGl1czogdGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzLFxuICAgICAgICBzaXplU2NhbGU6IHRoaXMuY29uZmlnLnNpemVTY2FsZVxuICAgICAgfSxcbiAgICAgIGdldEZpbGxDb2xvcjoge1xuICAgICAgICBjb2xvcjogdGhpcy5jb25maWcuY29sb3IsXG4gICAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICAgIGNvbG9yUmFuZ2U6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5jb2xvclJhbmdlLFxuICAgICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5jb2xvclNjYWxlXG4gICAgICB9LFxuICAgICAgZ2V0TGluZUNvbG9yOiB7XG4gICAgICAgIGNvbG9yOiB0aGlzLmNvbmZpZy52aXNDb25maWcuc3Ryb2tlQ29sb3IsXG4gICAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLnN0cm9rZUNvbG9yRmllbGQsXG4gICAgICAgIGNvbG9yUmFuZ2U6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5zdHJva2VDb2xvclJhbmdlLFxuICAgICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5zdHJva2VDb2xvclNjYWxlXG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBbXG4gICAgICBuZXcgU2NhdHRlcnBsb3RCcnVzaGluZ0xheWVyKHtcbiAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgLi4ubGF5ZXJJbnRlcmFjdGlvbixcbiAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgLi4uaW50ZXJhY3Rpb24sXG4gICAgICAgIGlkeCxcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgIC8vIGNpcmNsZXMgd2lsbCBiZSBmbGF0IG9uIHRoZSBtYXAgd2hlbiB0aGUgYWx0aXR1ZGUgY29sdW1uIGlzIG5vdCB1c2VkXG4gICAgICAgICAgZGVwdGhUZXN0OiB0aGlzLmNvbmZpZy5jb2x1bW5zLmFsdGl0dWRlLmZpZWxkSWR4ID4gLTFcbiAgICAgICAgfSxcbiAgICAgICAgdXBkYXRlVHJpZ2dlcnNcbiAgICAgIH0pLFxuICAgICAgLy8gaG92ZXIgbGF5ZXJcbiAgICAgIC4uLih0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEhvdmVyZWQpXG4gICAgICAgID8gW1xuICAgICAgICAgICAgbmV3IFNjYXR0ZXJwbG90QnJ1c2hpbmdMYXllcih7XG4gICAgICAgICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgICAgICAgICAgZGF0YTogW29iamVjdEhvdmVyZWQub2JqZWN0XSxcbiAgICAgICAgICAgICAgZ2V0TGluZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgZ2V0RmlsbENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgZ2V0UmFkaXVzOiBkYXRhLmdldFJhZGl1cyxcbiAgICAgICAgICAgICAgZ2V0UG9zaXRpb246IGRhdGEuZ2V0UG9zaXRpb24sXG4gICAgICAgICAgICAgIHBpY2thYmxlOiBmYWxzZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdXG4gICAgICAgIDogW10pLFxuICAgICAgLy8gdGV4dCBsYWJlbCBsYXllclxuICAgICAgLi4uZGF0YS50ZXh0TGFiZWxzLnJlZHVjZSgoYWNjdSwgZCwgaSkgPT4ge1xuICAgICAgICBpZiAoZC5nZXRUZXh0KSB7XG4gICAgICAgICAgYWNjdS5wdXNoKFxuICAgICAgICAgICAgbmV3IFRleHRMYXllcih7XG4gICAgICAgICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1sYWJlbC0ke3RleHRMYWJlbFtpXS5maWVsZC5uYW1lfWAsXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGEuZGF0YSxcbiAgICAgICAgICAgICAgZ2V0UG9zaXRpb246IGRhdGEuZ2V0UG9zaXRpb24sXG4gICAgICAgICAgICAgIGdldFRleHQ6IGQuZ2V0VGV4dCxcbiAgICAgICAgICAgICAgY2hhcmFjdGVyU2V0OiBkLmNoYXJhY3RlclNldCxcbiAgICAgICAgICAgICAgZ2V0UGl4ZWxPZmZzZXQ6IHRoaXMuZ2V0VGV4dE9mZnNldChcbiAgICAgICAgICAgICAgICB0ZXh0TGFiZWxbaV0sXG4gICAgICAgICAgICAgICAgcmFkaXVzU2NhbGUsXG4gICAgICAgICAgICAgICAgZGF0YS5nZXRSYWRpdXMsXG4gICAgICAgICAgICAgICAgbWFwU3RhdGVcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgZ2V0U2l6ZTogMSxcbiAgICAgICAgICAgICAgc2l6ZVNjYWxlOiB0ZXh0TGFiZWxbaV0uc2l6ZSxcbiAgICAgICAgICAgICAgZ2V0VGV4dEFuY2hvcjogdGV4dExhYmVsW2ldLmFuY2hvcixcbiAgICAgICAgICAgICAgZ2V0QWxpZ25tZW50QmFzZWxpbmU6IHRleHRMYWJlbFtpXS5hbGlnbm1lbnQsXG4gICAgICAgICAgICAgIGdldENvbG9yOiB0ZXh0TGFiZWxbaV0uY29sb3IsXG4gICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0IHdpbGwgYWx3YXlzIHNob3cgb24gdG9wIG9mIGFsbCBsYXllcnNcbiAgICAgICAgICAgICAgICBkZXB0aFRlc3Q6IGZhbHNlXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHVwZGF0ZVRyaWdnZXJzOiB7XG4gICAgICAgICAgICAgICAgZ2V0UG9zaXRpb246IHRoaXMuY29uZmlnLmNvbHVtbnMsXG4gICAgICAgICAgICAgICAgZ2V0VGV4dDogdGV4dExhYmVsW2ldLmZpZWxkLm5hbWUsXG4gICAgICAgICAgICAgICAgZ2V0UGl4ZWxPZmZzZXQ6IHtcbiAgICAgICAgICAgICAgICAgIC4uLnVwZGF0ZVRyaWdnZXJzLmdldFJhZGl1cyxcbiAgICAgICAgICAgICAgICAgIG1hcFN0YXRlLFxuICAgICAgICAgICAgICAgICAgYW5jaG9yOiB0ZXh0TGFiZWxbaV0uYW5jaG9yLFxuICAgICAgICAgICAgICAgICAgYWxpZ25tZW50OiB0ZXh0TGFiZWxbaV0uYWxpZ25tZW50XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBnZXRUZXh0QW5jaG9yOiB0ZXh0TGFiZWxbaV0uYW5jaG9yLFxuICAgICAgICAgICAgICAgIGdldEFsaWdubWVudEJhc2VsaW5lOiB0ZXh0TGFiZWxbaV0uYWxpZ25tZW50LFxuICAgICAgICAgICAgICAgIGdldENvbG9yOiB0ZXh0TGFiZWxbaV0uY29sb3JcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgfSwgW10pXG4gICAgXTtcbiAgfVxufVxuIl19