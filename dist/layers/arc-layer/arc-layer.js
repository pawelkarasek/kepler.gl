"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.arctVisConfigs = exports.arcRequiredColumns = exports.arcPosResolver = exports.arcPosAccessor = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _arcBrushingLayer = _interopRequireDefault(require("../../deckgl-layers/arc-brushing-layer/arc-brushing-layer"));

var _colorUtils = require("../../utils/color-utils");

var _arcLayerIcon = _interopRequireDefault(require("./arc-layer-icon"));

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
var arcPosAccessor = function arcPosAccessor(_ref) {
  var lat0 = _ref.lat0,
      lng0 = _ref.lng0,
      lat1 = _ref.lat1,
      lng1 = _ref.lng1;
  return function (d) {
    return [d.data[lng0.fieldIdx], d.data[lat0.fieldIdx], 0, d.data[lng1.fieldIdx], d.data[lat1.fieldIdx], 0];
  };
};

exports.arcPosAccessor = arcPosAccessor;

var arcPosResolver = function arcPosResolver(_ref2) {
  var lat0 = _ref2.lat0,
      lng0 = _ref2.lng0,
      lat1 = _ref2.lat1,
      lng1 = _ref2.lng1;
  return "".concat(lat0.fieldIdx, "-").concat(lng0.fieldIdx, "-").concat(lat1.fieldIdx, "-").concat(lat1.fieldIdx, "}");
};

exports.arcPosResolver = arcPosResolver;
var arcRequiredColumns = ['lat0', 'lng0', 'lat1', 'lng1'];
exports.arcRequiredColumns = arcRequiredColumns;
var arctVisConfigs = {
  opacity: 'opacity',
  thickness: 'thickness',
  colorRange: 'colorRange',
  sizeRange: 'strokeWidthRange',
  targetColor: 'targetColor'
};
exports.arctVisConfigs = arctVisConfigs;

var ArcLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2["default"])(ArcLayer, _Layer);

  function ArcLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ArcLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ArcLayer).call(this, props));

    _this.registerVisConfig(arctVisConfigs);

    _this.getPosition = (0, _lodash["default"])(arcPosAccessor, arcPosResolver);
    return _this;
  }

  (0, _createClass2["default"])(ArcLayer, [{
    key: "formatLayerData",
    // TODO: fix complexity

    /* eslint-disable complexity */
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
          _this$config$visConfi = _this$config.visConfig,
          sizeRange = _this$config$visConfi.sizeRange,
          colorRange = _this$config$visConfi.colorRange,
          targetColor = _this$config$visConfi.targetColor; // arc color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb)); // arc thickness

      var sScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, sizeRange);
      var getPosition = this.getPosition(columns);

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
          }); // if doesn't have point lat or lng, do not add the arc
          // deck.gl can't handle position == null

          if (!pos.every(Number.isFinite)) {
            return accu;
          }

          accu.push({
            index: index,
            sourcePosition: [pos[0], pos[1], pos[2]],
            targetPosition: [pos[3], pos[4], pos[5]],
            data: allData[index]
          });
          return accu;
        }, []);
      }

      var getStrokeWidth = sScale ? function (d) {
        return _this2.getEncodedChannelValue(sScale, d.data, sizeField, 0);
      } : 1;
      var getColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : color;
      var getTargetColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : targetColor || color;
      return {
        data: data,
        getColor: getColor,
        getSourceColor: getColor,
        getTargetColor: getTargetColor,
        getStrokeWidth: getStrokeWidth
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData, getPosition) {
      // get bounds from arcs
      var sBounds = this.getPointsBounds(allData, function (d) {
        var pos = getPosition({
          data: d
        });
        return [pos[0], pos[1]];
      });
      var tBounds = this.getPointsBounds(allData, function (d) {
        var pos = getPosition({
          data: d
        });
        return [pos[3], pos[4]];
      });
      var bounds = tBounds && sBounds ? [Math.min(sBounds[0], tBounds[0]), Math.min(sBounds[1], tBounds[1]), Math.max(sBounds[2], tBounds[2]), Math.max(sBounds[3], tBounds[3])] : sBounds || tBounds;
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref3) {
      var data = _ref3.data,
          idx = _ref3.idx,
          objectHovered = _ref3.objectHovered,
          layerInteraction = _ref3.layerInteraction,
          mapState = _ref3.mapState,
          interactionConfig = _ref3.interactionConfig;
      var brush = interactionConfig.brush;
      var colorUpdateTriggers = {
        color: this.config.color,
        colorField: this.config.colorField,
        colorRange: this.config.visConfig.colorRange,
        colorScale: this.config.colorScale,
        targetColor: this.config.visConfig.targetColor
      };
      var interaction = {
        // auto highlighting
        pickable: true,
        autoHighlight: !brush.enabled,
        highlightColor: this.config.highlightColor,
        // brushing
        brushRadius: brush.config.size * 1000,
        brushSource: true,
        brushTarget: true,
        enableBrushing: brush.enabled
      };
      return [new _arcBrushingLayer["default"]((0, _objectSpread2["default"])({}, data, interaction, layerInteraction, {
        id: this.id,
        idx: idx,
        opacity: this.config.visConfig.opacity,
        pickedColor: this.config.highlightColor,
        strokeScale: this.config.visConfig.thickness,
        // parameters
        parameters: {
          depthTest: mapState.dragRotate
        },
        updateTriggers: {
          getStrokeWidth: {
            sizeField: this.config.sizeField,
            sizeRange: this.config.visConfig.sizeRange
          },
          getSourceColor: colorUpdateTriggers,
          getTargetColor: colorUpdateTriggers
        }
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) ? [new _arcBrushingLayer["default"]({
        id: "".concat(this.id, "-hovered"),
        data: [objectHovered.object],
        strokeScale: this.config.visConfig.thickness,
        getSourceColor: this.config.highlightColor,
        getTargetColor: this.config.highlightColor,
        getStrokeWidth: data.getStrokeWidth,
        pickable: false
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'arc';
    }
  }, {
    key: "isAggregated",
    get: function get() {
      return false;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _arcLayerIcon["default"];
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return arcRequiredColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultLinkColumnPairs;
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(ArcLayer.prototype), "visualChannels", this), {
        size: (0, _objectSpread2["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(ArcLayer.prototype), "visualChannels", this).size, {
          property: 'stroke'
        })
      });
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref4) {
      var _ref4$fieldPairs = _ref4.fieldPairs,
          fieldPairs = _ref4$fieldPairs === void 0 ? [] : _ref4$fieldPairs;

      if (fieldPairs.length < 2) {
        return [];
      }

      var props = {
        color: (0, _colorUtils.hexToRgb)(_defaultSettings.DEFAULT_LAYER_COLOR.tripArc)
      }; // connect the first two point layer with arc

      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng
      };
      props.label = "".concat(fieldPairs[0].defaultName, " -> ").concat(fieldPairs[1].defaultName, " arc");
      return props;
    }
  }]);
  return ArcLayer;
}(_baseLayer["default"]);

exports["default"] = ArcLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvYXJjLWxheWVyL2FyYy1sYXllci5qcyJdLCJuYW1lcyI6WyJhcmNQb3NBY2Nlc3NvciIsImxhdDAiLCJsbmcwIiwibGF0MSIsImxuZzEiLCJkIiwiZGF0YSIsImZpZWxkSWR4IiwiYXJjUG9zUmVzb2x2ZXIiLCJhcmNSZXF1aXJlZENvbHVtbnMiLCJhcmN0VmlzQ29uZmlncyIsIm9wYWNpdHkiLCJ0aGlja25lc3MiLCJjb2xvclJhbmdlIiwic2l6ZVJhbmdlIiwidGFyZ2V0Q29sb3IiLCJBcmNMYXllciIsInByb3BzIiwicmVnaXN0ZXJWaXNDb25maWciLCJnZXRQb3NpdGlvbiIsIl8iLCJhbGxEYXRhIiwiZmlsdGVyZWRJbmRleCIsIm9sZExheWVyRGF0YSIsIm9wdCIsImNvbmZpZyIsImNvbG9yU2NhbGUiLCJjb2xvckRvbWFpbiIsImNvbG9yRmllbGQiLCJjb2xvciIsImNvbHVtbnMiLCJzaXplRmllbGQiLCJzaXplU2NhbGUiLCJzaXplRG9tYWluIiwidmlzQ29uZmlnIiwiY1NjYWxlIiwiZ2V0VmlzQ2hhbm5lbFNjYWxlIiwiY29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJzU2NhbGUiLCJ1cGRhdGVMYXllck1ldGEiLCJzYW1lRGF0YSIsInJlZHVjZSIsImFjY3UiLCJpbmRleCIsInBvcyIsImV2ZXJ5IiwiTnVtYmVyIiwiaXNGaW5pdGUiLCJwdXNoIiwic291cmNlUG9zaXRpb24iLCJ0YXJnZXRQb3NpdGlvbiIsImdldFN0cm9rZVdpZHRoIiwiZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZSIsImdldENvbG9yIiwiZ2V0VGFyZ2V0Q29sb3IiLCJnZXRTb3VyY2VDb2xvciIsInNCb3VuZHMiLCJnZXRQb2ludHNCb3VuZHMiLCJ0Qm91bmRzIiwiYm91bmRzIiwiTWF0aCIsIm1pbiIsIm1heCIsInVwZGF0ZU1ldGEiLCJpZHgiLCJvYmplY3RIb3ZlcmVkIiwibGF5ZXJJbnRlcmFjdGlvbiIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJicnVzaCIsImNvbG9yVXBkYXRlVHJpZ2dlcnMiLCJpbnRlcmFjdGlvbiIsInBpY2thYmxlIiwiYXV0b0hpZ2hsaWdodCIsImVuYWJsZWQiLCJoaWdobGlnaHRDb2xvciIsImJydXNoUmFkaXVzIiwic2l6ZSIsImJydXNoU291cmNlIiwiYnJ1c2hUYXJnZXQiLCJlbmFibGVCcnVzaGluZyIsIkFyY0JydXNoaW5nTGF5ZXIiLCJpZCIsInBpY2tlZENvbG9yIiwic3Ryb2tlU2NhbGUiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsInVwZGF0ZVRyaWdnZXJzIiwiaXNMYXllckhvdmVyZWQiLCJvYmplY3QiLCJBcmNMYXllckljb24iLCJkZWZhdWx0TGlua0NvbHVtblBhaXJzIiwicHJvcGVydHkiLCJmaWVsZFBhaXJzIiwibGVuZ3RoIiwiREVGQVVMVF9MQVlFUl9DT0xPUiIsInRyaXBBcmMiLCJwYWlyIiwibGF0IiwibG5nIiwibGFiZWwiLCJkZWZhdWx0TmFtZSIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVPLElBQU1BLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUI7QUFBQSxNQUFFQyxJQUFGLFFBQUVBLElBQUY7QUFBQSxNQUFRQyxJQUFSLFFBQVFBLElBQVI7QUFBQSxNQUFjQyxJQUFkLFFBQWNBLElBQWQ7QUFBQSxNQUFvQkMsSUFBcEIsUUFBb0JBLElBQXBCO0FBQUEsU0FBOEIsVUFBQUMsQ0FBQztBQUFBLFdBQUksQ0FDL0RBLENBQUMsQ0FBQ0MsSUFBRixDQUFPSixJQUFJLENBQUNLLFFBQVosQ0FEK0QsRUFFL0RGLENBQUMsQ0FBQ0MsSUFBRixDQUFPTCxJQUFJLENB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VUFBVSxDQUFDQyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGVBQU8sRUFBUDtBQUNEOztBQUNELFVBQU1oRixLQUFLLEdBQUc7QUFDWlksUUFBQUEsS0FBSyxFQUFFLDBCQUFTcUUscUNBQW9CQyxPQUE3QjtBQURLLE9BQWQsQ0FKOEMsQ0FROUM7O0FBQ0FsRixNQUFBQSxLQUFLLENBQUNhLE9BQU4sR0FBZ0I7QUFDZDdCLFFBQUFBLElBQUksRUFBRStGLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0ksSUFBZCxDQUFtQkMsR0FEWDtBQUVkbkcsUUFBQUEsSUFBSSxFQUFFOEYsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjSSxJQUFkLENBQW1CRSxHQUZYO0FBR2RuRyxRQUFBQSxJQUFJLEVBQUU2RixVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNJLElBQWQsQ0FBbUJDLEdBSFg7QUFJZGpHLFFBQUFBLElBQUksRUFBRTRGLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0ksSUFBZCxDQUFtQkU7QUFKWCxPQUFoQjtBQU1BckYsTUFBQUEsS0FBSyxDQUFDc0YsS0FBTixhQUFpQlAsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjUSxXQUEvQixpQkFDRVIsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjUSxXQURoQjtBQUlBLGFBQU92RixLQUFQO0FBQ0Q7OztFQXpEbUN3RixxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBtZW1vaXplIGZyb20gJ2xvZGFzaC5tZW1vaXplJztcblxuaW1wb3J0IExheWVyIGZyb20gJy4uL2Jhc2UtbGF5ZXInO1xuaW1wb3J0IEFyY0JydXNoaW5nTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9hcmMtYnJ1c2hpbmctbGF5ZXIvYXJjLWJydXNoaW5nLWxheWVyJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcbmltcG9ydCBBcmNMYXllckljb24gZnJvbSAnLi9hcmMtbGF5ZXItaWNvbic7XG5pbXBvcnQge0RFRkFVTFRfTEFZRVJfQ09MT1J9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuZXhwb3J0IGNvbnN0IGFyY1Bvc0FjY2Vzc29yID0gKHtsYXQwLCBsbmcwLCBsYXQxLCBsbmcxfSkgPT4gZCA9PiBbXG4gIGQuZGF0YVtsbmcwLmZpZWxkSWR4XSxcbiAgZC5kYXRhW2xhdDAuZmllbGRJZHhdLFxuICAwLFxuICBkLmRhdGFbbG5nMS5maWVsZElkeF0sXG4gIGQuZGF0YVtsYXQxLmZpZWxkSWR4XSxcbiAgMFxuXTtcblxuZXhwb3J0IGNvbnN0IGFyY1Bvc1Jlc29sdmVyID0gKHtsYXQwLCBsbmcwLCBsYXQxLCBsbmcxfSkgPT5cbiAgYCR7bGF0MC5maWVsZElkeH0tJHtsbmcwLmZpZWxkSWR4fS0ke2xhdDEuZmllbGRJZHh9LSR7bGF0MS5maWVsZElkeH19YDtcblxuZXhwb3J0IGNvbnN0IGFyY1JlcXVpcmVkQ29sdW1ucyA9IFsnbGF0MCcsICdsbmcwJywgJ2xhdDEnLCAnbG5nMSddO1xuXG5leHBvcnQgY29uc3QgYXJjdFZpc0NvbmZpZ3MgPSB7XG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgdGhpY2tuZXNzOiAndGhpY2tuZXNzJyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBzaXplUmFuZ2U6ICdzdHJva2VXaWR0aFJhbmdlJyxcbiAgdGFyZ2V0Q29sb3I6ICd0YXJnZXRDb2xvcidcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyY0xheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGFyY3RWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uID0gbWVtb2l6ZShhcmNQb3NBY2Nlc3NvciwgYXJjUG9zUmVzb2x2ZXIpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdhcmMnO1xuICB9XG5cbiAgZ2V0IGlzQWdncmVnYXRlZCgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBBcmNMYXllckljb247XG4gIH1cblxuICBnZXQgcmVxdWlyZWRMYXllckNvbHVtbnMoKSB7XG4gICAgcmV0dXJuIGFyY1JlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0TGlua0NvbHVtblBhaXJzO1xuICB9XG5cbiAgZ2V0IHZpc3VhbENoYW5uZWxzKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscyxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgLi4uc3VwZXIudmlzdWFsQ2hhbm5lbHMuc2l6ZSxcbiAgICAgICAgcHJvcGVydHk6ICdzdHJva2UnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkUGFpcnMgPSBbXX0pIHtcbiAgICBpZiAoZmllbGRQYWlycy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHByb3BzID0ge1xuICAgICAgY29sb3I6IGhleFRvUmdiKERFRkFVTFRfTEFZRVJfQ09MT1IudHJpcEFyYylcbiAgICB9O1xuXG4gICAgLy8gY29ubmVjdCB0aGUgZmlyc3QgdHdvIHBvaW50IGxheWVyIHdpdGggYXJjXG4gICAgcHJvcHMuY29sdW1ucyA9IHtcbiAgICAgIGxhdDA6IGZpZWxkUGFpcnNbMF0ucGFpci5sYXQsXG4gICAgICBsbmcwOiBmaWVsZFBhaXJzWzBdLnBhaXIubG5nLFxuICAgICAgbGF0MTogZmllbGRQYWlyc1sxXS5wYWlyLmxhdCxcbiAgICAgIGxuZzE6IGZpZWxkUGFpcnNbMV0ucGFpci5sbmdcbiAgICB9O1xuICAgIHByb3BzLmxhYmVsID0gYCR7ZmllbGRQYWlyc1swXS5kZWZhdWx0TmFtZX0gLT4gJHtcbiAgICAgIGZpZWxkUGFpcnNbMV0uZGVmYXVsdE5hbWVcbiAgICB9IGFyY2A7XG5cbiAgICByZXR1cm4gcHJvcHM7XG4gIH1cblxuICAvLyBUT0RPOiBmaXggY29tcGxleGl0eVxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIGZvcm1hdExheWVyRGF0YShfLCBhbGxEYXRhLCBmaWx0ZXJlZEluZGV4LCBvbGRMYXllckRhdGEsIG9wdCA9IHt9KSB7XG4gICAgY29uc3Qge1xuICAgICAgY29sb3JTY2FsZSxcbiAgICAgIGNvbG9yRG9tYWluLFxuICAgICAgY29sb3JGaWVsZCxcbiAgICAgIGNvbG9yLFxuICAgICAgY29sdW1ucyxcbiAgICAgIHNpemVGaWVsZCxcbiAgICAgIHNpemVTY2FsZSxcbiAgICAgIHNpemVEb21haW4sXG4gICAgICB2aXNDb25maWc6IHtzaXplUmFuZ2UsIGNvbG9yUmFuZ2UsIHRhcmdldENvbG9yfVxuICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgIC8vIGFyYyBjb2xvclxuICAgIGNvbnN0IGNTY2FsZSA9XG4gICAgICBjb2xvckZpZWxkICYmXG4gICAgICB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShcbiAgICAgICAgY29sb3JTY2FsZSxcbiAgICAgICAgY29sb3JEb21haW4sXG4gICAgICAgIGNvbG9yUmFuZ2UuY29sb3JzLm1hcChoZXhUb1JnYilcbiAgICAgICk7XG5cbiAgICAvLyBhcmMgdGhpY2tuZXNzXG4gICAgY29uc3Qgc1NjYWxlID1cbiAgICAgIHNpemVGaWVsZCAmJiB0aGlzLmdldFZpc0NoYW5uZWxTY2FsZShzaXplU2NhbGUsIHNpemVEb21haW4sIHNpemVSYW5nZSk7XG5cbiAgICBjb25zdCBnZXRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oY29sdW1ucyk7XG5cbiAgICBpZiAoIW9sZExheWVyRGF0YSB8fCBvbGRMYXllckRhdGEuZ2V0UG9zaXRpb24gIT09IGdldFBvc2l0aW9uKSB7XG4gICAgICB0aGlzLnVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRQb3NpdGlvbik7XG4gICAgfVxuXG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKFxuICAgICAgb2xkTGF5ZXJEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZGF0YSAmJlxuICAgICAgb3B0LnNhbWVEYXRhICYmXG4gICAgICBvbGRMYXllckRhdGEuZ2V0UG9zaXRpb24gPT09IGdldFBvc2l0aW9uXG4gICAgKSB7XG4gICAgICBkYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBmaWx0ZXJlZEluZGV4LnJlZHVjZSgoYWNjdSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oe2RhdGE6IGFsbERhdGFbaW5kZXhdfSk7XG5cbiAgICAgICAgLy8gaWYgZG9lc24ndCBoYXZlIHBvaW50IGxhdCBvciBsbmcsIGRvIG5vdCBhZGQgdGhlIGFyY1xuICAgICAgICAvLyBkZWNrLmdsIGNhbid0IGhhbmRsZSBwb3NpdGlvbiA9PSBudWxsXG4gICAgICAgIGlmICghcG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSkpIHtcbiAgICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgc291cmNlUG9zaXRpb246IFtwb3NbMF0sIHBvc1sxXSwgcG9zWzJdXSxcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogW3Bvc1szXSwgcG9zWzRdLCBwb3NbNV1dLFxuICAgICAgICAgIGRhdGE6IGFsbERhdGFbaW5kZXhdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgfSwgW10pO1xuICAgIH1cblxuICAgIGNvbnN0IGdldFN0cm9rZVdpZHRoID0gc1NjYWxlID8gZCA9PlxuICAgICAgIHRoaXMuZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZShzU2NhbGUsIGQuZGF0YSwgc2l6ZUZpZWxkLCAwKSA6IDE7XG5cbiAgICBjb25zdCBnZXRDb2xvciA9IGNTY2FsZSA/IGQgPT5cbiAgICAgICB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoY1NjYWxlLCBkLmRhdGEsIGNvbG9yRmllbGQpIDogY29sb3I7XG5cbiAgICBjb25zdCBnZXRUYXJnZXRDb2xvciA9IGNTY2FsZSA/IGQgPT5cbiAgICAgICB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoY1NjYWxlLCBkLmRhdGEsIGNvbG9yRmllbGQpXG4gICAgICAgIDogdGFyZ2V0Q29sb3IgfHwgY29sb3I7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGdldENvbG9yLFxuICAgICAgZ2V0U291cmNlQ29sb3I6IGdldENvbG9yLFxuICAgICAgZ2V0VGFyZ2V0Q29sb3IsXG4gICAgICBnZXRTdHJva2VXaWR0aFxuICAgIH07XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgdXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKSB7XG4gICAgLy8gZ2V0IGJvdW5kcyBmcm9tIGFyY3NcbiAgICBjb25zdCBzQm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoYWxsRGF0YSwgZCA9PiB7XG4gICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbih7ZGF0YTogZH0pO1xuICAgICAgcmV0dXJuIFtwb3NbMF0sIHBvc1sxXV07XG4gICAgfSk7XG5cbiAgICBjb25zdCB0Qm91bmRzID0gdGhpcy5nZXRQb2ludHNCb3VuZHMoYWxsRGF0YSwgZCA9PiB7XG4gICAgICBjb25zdCBwb3MgPSBnZXRQb3NpdGlvbih7ZGF0YTogZH0pO1xuICAgICAgcmV0dXJuIFtwb3NbM10sIHBvc1s0XV07XG4gICAgfSk7XG5cbiAgICBjb25zdCBib3VuZHMgPVxuICAgICAgdEJvdW5kcyAmJiBzQm91bmRzXG4gICAgICAgID8gW1xuICAgICAgICAgICAgTWF0aC5taW4oc0JvdW5kc1swXSwgdEJvdW5kc1swXSksXG4gICAgICAgICAgICBNYXRoLm1pbihzQm91bmRzWzFdLCB0Qm91bmRzWzFdKSxcbiAgICAgICAgICAgIE1hdGgubWF4KHNCb3VuZHNbMl0sIHRCb3VuZHNbMl0pLFxuICAgICAgICAgICAgTWF0aC5tYXgoc0JvdW5kc1szXSwgdEJvdW5kc1szXSlcbiAgICAgICAgICBdXG4gICAgICAgIDogc0JvdW5kcyB8fCB0Qm91bmRzO1xuXG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIGxheWVySW50ZXJhY3Rpb24sXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfSkge1xuICAgIGNvbnN0IHticnVzaH0gPSBpbnRlcmFjdGlvbkNvbmZpZztcblxuICAgIGNvbnN0IGNvbG9yVXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBjb2xvcjogdGhpcy5jb25maWcuY29sb3IsXG4gICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgY29sb3JSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5jb2xvclNjYWxlLFxuICAgICAgdGFyZ2V0Q29sb3I6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50YXJnZXRDb2xvclxuICAgIH07XG5cbiAgICBjb25zdCBpbnRlcmFjdGlvbiA9IHtcbiAgICAgIC8vIGF1dG8gaGlnaGxpZ2h0aW5nXG4gICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgIGF1dG9IaWdobGlnaHQ6ICFicnVzaC5lbmFibGVkLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuXG4gICAgICAvLyBicnVzaGluZ1xuICAgICAgYnJ1c2hSYWRpdXM6IGJydXNoLmNvbmZpZy5zaXplICogMTAwMCxcbiAgICAgIGJydXNoU291cmNlOiB0cnVlLFxuICAgICAgYnJ1c2hUYXJnZXQ6IHRydWUsXG4gICAgICBlbmFibGVCcnVzaGluZzogYnJ1c2guZW5hYmxlZFxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IEFyY0JydXNoaW5nTGF5ZXIoe1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICAuLi5pbnRlcmFjdGlvbixcbiAgICAgICAgLi4ubGF5ZXJJbnRlcmFjdGlvbixcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIGlkeCxcbiAgICAgICAgb3BhY2l0eTogdGhpcy5jb25maWcudmlzQ29uZmlnLm9wYWNpdHksXG4gICAgICAgIHBpY2tlZENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgc3Ryb2tlU2NhbGU6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50aGlja25lc3MsXG5cbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBtYXBTdGF0ZS5kcmFnUm90YXRlfSxcblxuICAgICAgICB1cGRhdGVUcmlnZ2Vyczoge1xuICAgICAgICAgIGdldFN0cm9rZVdpZHRoOiB7XG4gICAgICAgICAgICBzaXplRmllbGQ6IHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgICAgIHNpemVSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLnNpemVSYW5nZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0U291cmNlQ29sb3I6IGNvbG9yVXBkYXRlVHJpZ2dlcnMsXG4gICAgICAgICAgZ2V0VGFyZ2V0Q29sb3I6IGNvbG9yVXBkYXRlVHJpZ2dlcnNcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICAvLyBob3ZlciBsYXllclxuICAgICAgLi4uKHRoaXMuaXNMYXllckhvdmVyZWQob2JqZWN0SG92ZXJlZClcbiAgICAgID8gW1xuICAgICAgICAgIG5ldyBBcmNCcnVzaGluZ0xheWVyKHtcbiAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgICAgICAgIGRhdGE6IFtvYmplY3RIb3ZlcmVkLm9iamVjdF0sXG4gICAgICAgICAgICBzdHJva2VTY2FsZTogdGhpcy5jb25maWcudmlzQ29uZmlnLnRoaWNrbmVzcyxcbiAgICAgICAgICAgIGdldFNvdXJjZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgIGdldFRhcmdldENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgIGdldFN0cm9rZVdpZHRoOiBkYXRhLmdldFN0cm9rZVdpZHRoLFxuICAgICAgICAgICAgcGlja2FibGU6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=