"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _arcLayer = _interopRequireDefault(require("../arc-layer/arc-layer"));

var _lineLayer = _interopRequireDefault(require("../../deckgl-layers/line-layer/line-layer"));

var _lineLayerIcon = _interopRequireDefault(require("./line-layer-icon"));

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
var LineLayer =
/*#__PURE__*/
function (_ArcLayer) {
  (0, _inherits2["default"])(LineLayer, _ArcLayer);

  function LineLayer() {
    (0, _classCallCheck2["default"])(this, LineLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LineLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(LineLayer, [{
    key: "renderLayer",
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          layerInteraction = _ref.layerInteraction,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interactionConfig = _ref.interactionConfig;
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
      return [// base layer
      new _lineLayer["default"]((0, _objectSpread2["default"])({}, layerInteraction, data, interaction, {
        getColor: data.getSourceColor,
        id: this.id,
        idx: idx,
        opacity: this.config.visConfig.opacity,
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
          getColor: colorUpdateTriggers,
          getTargetColor: colorUpdateTriggers
        }
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) ? [new _lineLayer["default"]({
        id: "".concat(this.id, "-hovered"),
        data: [objectHovered.object],
        strokeScale: this.config.visConfig.thickness,
        getColor: this.config.highlightColor,
        getTargetColor: this.config.highlightColor,
        getStrokeWidth: data.getStrokeWidth,
        pickable: false
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'line';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _lineLayerIcon["default"];
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref2) {
      var fieldPairs = _ref2.fieldPairs;

      if (fieldPairs.length < 2) {
        return [];
      }

      var props = {}; // connect the first two point layer with arc

      props.columns = {
        lat0: fieldPairs[0].pair.lat,
        lng0: fieldPairs[0].pair.lng,
        lat1: fieldPairs[1].pair.lat,
        lng1: fieldPairs[1].pair.lng
      };
      props.label = "".concat(fieldPairs[0].defaultName, " -> ").concat(fieldPairs[1].defaultName, " line");
      return props;
    }
  }]);
  return LineLayer;
}(_arcLayer["default"]);

exports["default"] = LineLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvbGluZS1sYXllci9saW5lLWxheWVyLmpzIl0sIm5hbWVzIjpbIkxpbmVMYXllciIsImRhdGEiLCJpZHgiLCJsYXllckludGVyYWN0aW9uIiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb25Db25maWciLCJicnVzaCIsImNvbG9yVXBkYXRlVHJpZ2dlcnMiLCJjb2xvciIsImNvbmZpZyIsImNvbG9yRmllbGQiLCJjb2xvclJhbmdlIiwidmlzQ29uZmlnIiwiY29sb3JTY2FsZSIsInRhcmdldENvbG9yIiwiaW50ZXJhY3Rpb24iLCJwaWNrYWJsZSIsImF1dG9IaWdobGlnaHQiLCJlbmFibGVkIiwiaGlnaGxpZ2h0Q29sb3IiLCJicnVzaFJhZGl1cyIsInNpemUiLCJicnVzaFNvdXJjZSIsImJydXNoVGFyZ2V0IiwiZW5hYmxlQnJ1c2hpbmciLCJEZWNrR0xMaW5lTGF5ZXIiLCJnZXRDb2xvciIsImdldFNvdXJjZUNvbG9yIiwiaWQiLCJvcGFjaXR5Iiwic3Ryb2tlU2NhbGUiLCJ0aGlja25lc3MiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsInVwZGF0ZVRyaWdnZXJzIiwiZ2V0U3Ryb2tlV2lkdGgiLCJzaXplRmllbGQiLCJzaXplUmFuZ2UiLCJnZXRUYXJnZXRDb2xvciIsImlzTGF5ZXJIb3ZlcmVkIiwib2JqZWN0IiwiTGluZUxheWVySWNvbiIsImZpZWxkUGFpcnMiLCJsZW5ndGgiLCJwcm9wcyIsImNvbHVtbnMiLCJsYXQwIiwicGFpciIsImxhdCIsImxuZzAiLCJsbmciLCJsYXQxIiwibG5nMSIsImxhYmVsIiwiZGVmYXVsdE5hbWUiLCJBcmNMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFBQSxRQUFRLEVBQUU7QUFQUSxPQUFwQixDQURGLENBREUsR0FZRixFQW5DSjtBQXFDRDs7O3dCQWhHVTtBQUNULGFBQU8sTUFBUDtBQUNEOzs7d0JBRWU7QUFDZCxhQUFPMEIseUJBQVA7QUFDRDs7O2lEQUUwQztBQUFBLFVBQWJDLFVBQWEsU0FBYkEsVUFBYTs7QUFDekMsVUFBSUEsVUFBVSxDQUFDQyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCLGVBQU8sRUFBUDtBQUNEOztBQUNELFVBQU1DLEtBQUssR0FBRyxFQUFkLENBSnlDLENBTXpDOztBQUNBQSxNQUFBQSxLQUFLLENBQUNDLE9BQU4sR0FBZ0I7QUFDZEMsUUFBQUEsSUFBSSxFQUFFSixVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNLLElBQWQsQ0FBbUJDLEdBRFg7QUFFZEMsUUFBQUEsSUFBSSxFQUFFUCxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNLLElBQWQsQ0FBbUJHLEdBRlg7QUFHZEMsUUFBQUEsSUFBSSxFQUFFVCxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNLLElBQWQsQ0FBbUJDLEdBSFg7QUFJZEksUUFBQUEsSUFBSSxFQUFFVixVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNLLElBQWQsQ0FBbUJHO0FBSlgsT0FBaEI7QUFNQU4sTUFBQUEsS0FBSyxDQUFDUyxLQUFOLGFBQWlCWCxVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNZLFdBQS9CLGlCQUNFWixVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNZLFdBRGhCO0FBSUEsYUFBT1YsS0FBUDtBQUNEOzs7RUEzQm9DVyxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBBcmNMYXllciBmcm9tICcuLi9hcmMtbGF5ZXIvYXJjLWxheWVyJztcbmltcG9ydCBEZWNrR0xMaW5lTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9saW5lLWxheWVyL2xpbmUtbGF5ZXInO1xuaW1wb3J0IExpbmVMYXllckljb24gZnJvbSAnLi9saW5lLWxheWVyLWljb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5lTGF5ZXIgZXh0ZW5kcyBBcmNMYXllciB7XG4gIGdldCB0eXBlKCkge1xuICAgIHJldHVybiAnbGluZSc7XG4gIH1cblxuICBnZXQgbGF5ZXJJY29uKCkge1xuICAgIHJldHVybiBMaW5lTGF5ZXJJY29uO1xuICB9XG5cbiAgc3RhdGljIGZpbmREZWZhdWx0TGF5ZXJQcm9wcyh7ZmllbGRQYWlyc30pIHtcbiAgICBpZiAoZmllbGRQYWlycy5sZW5ndGggPCAyKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGNvbnN0IHByb3BzID0ge307XG5cbiAgICAvLyBjb25uZWN0IHRoZSBmaXJzdCB0d28gcG9pbnQgbGF5ZXIgd2l0aCBhcmNcbiAgICBwcm9wcy5jb2x1bW5zID0ge1xuICAgICAgbGF0MDogZmllbGRQYWlyc1swXS5wYWlyLmxhdCxcbiAgICAgIGxuZzA6IGZpZWxkUGFpcnNbMF0ucGFpci5sbmcsXG4gICAgICBsYXQxOiBmaWVsZFBhaXJzWzFdLnBhaXIubGF0LFxuICAgICAgbG5nMTogZmllbGRQYWlyc1sxXS5wYWlyLmxuZ1xuICAgIH07XG4gICAgcHJvcHMubGFiZWwgPSBgJHtmaWVsZFBhaXJzWzBdLmRlZmF1bHROYW1lfSAtPiAke1xuICAgICAgZmllbGRQYWlyc1sxXS5kZWZhdWx0TmFtZVxuICAgICAgfSBsaW5lYDtcblxuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBsYXllckludGVyYWN0aW9uLFxuICAgIG9iamVjdEhvdmVyZWQsXG4gICAgbWFwU3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfSkge1xuICAgIGNvbnN0IHticnVzaH0gPSBpbnRlcmFjdGlvbkNvbmZpZztcblxuICAgIGNvbnN0IGNvbG9yVXBkYXRlVHJpZ2dlcnMgPSB7XG4gICAgICBjb2xvcjogdGhpcy5jb25maWcuY29sb3IsXG4gICAgICBjb2xvckZpZWxkOiB0aGlzLmNvbmZpZy5jb2xvckZpZWxkLFxuICAgICAgY29sb3JSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLmNvbG9yUmFuZ2UsXG4gICAgICBjb2xvclNjYWxlOiB0aGlzLmNvbmZpZy5jb2xvclNjYWxlLFxuICAgICAgdGFyZ2V0Q29sb3I6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy50YXJnZXRDb2xvclxuICAgIH07XG5cbiAgICBjb25zdCBpbnRlcmFjdGlvbiA9IHtcbiAgICAgIC8vIGF1dG8gaGlnaGxpZ2h0aW5nXG4gICAgICBwaWNrYWJsZTogdHJ1ZSxcbiAgICAgIGF1dG9IaWdobGlnaHQ6ICFicnVzaC5lbmFibGVkLFxuICAgICAgaGlnaGxpZ2h0Q29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuXG4gICAgICAvLyBicnVzaGluZ1xuICAgICAgYnJ1c2hSYWRpdXM6IGJydXNoLmNvbmZpZy5zaXplICogMTAwMCxcbiAgICAgIGJydXNoU291cmNlOiB0cnVlLFxuICAgICAgYnJ1c2hUYXJnZXQ6IHRydWUsXG4gICAgICBlbmFibGVCcnVzaGluZzogYnJ1c2guZW5hYmxlZFxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgLy8gYmFzZSBsYXllclxuICAgICAgbmV3IERlY2tHTExpbmVMYXllcih7XG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIC4uLmludGVyYWN0aW9uLFxuICAgICAgICBnZXRDb2xvcjogZGF0YS5nZXRTb3VyY2VDb2xvcixcbiAgICAgICAgaWQ6IHRoaXMuaWQsXG4gICAgICAgIGlkeCxcbiAgICAgICAgb3BhY2l0eTogdGhpcy5jb25maWcudmlzQ29uZmlnLm9wYWNpdHksXG4gICAgICAgIHN0cm9rZVNjYWxlOiB0aGlzLmNvbmZpZy52aXNDb25maWcudGhpY2tuZXNzLFxuICAgICAgICAvLyBwYXJhbWV0ZXJzXG4gICAgICAgIHBhcmFtZXRlcnM6IHtkZXB0aFRlc3Q6IG1hcFN0YXRlLmRyYWdSb3RhdGV9LFxuICAgICAgICB1cGRhdGVUcmlnZ2Vyczoge1xuICAgICAgICAgIGdldFN0cm9rZVdpZHRoOiB7XG4gICAgICAgICAgICBzaXplRmllbGQ6IHRoaXMuY29uZmlnLnNpemVGaWVsZCxcbiAgICAgICAgICAgIHNpemVSYW5nZTogdGhpcy5jb25maWcudmlzQ29uZmlnLnNpemVSYW5nZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Q29sb3I6IGNvbG9yVXBkYXRlVHJpZ2dlcnMsXG4gICAgICAgICAgZ2V0VGFyZ2V0Q29sb3I6IGNvbG9yVXBkYXRlVHJpZ2dlcnNcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICAvLyBob3ZlciBsYXllclxuICAgICAgLi4uKHRoaXMuaXNMYXllckhvdmVyZWQob2JqZWN0SG92ZXJlZClcbiAgICAgID8gW1xuICAgICAgICAgIG5ldyBEZWNrR0xMaW5lTGF5ZXIoe1xuICAgICAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWhvdmVyZWRgLFxuICAgICAgICAgICAgZGF0YTogW29iamVjdEhvdmVyZWQub2JqZWN0XSxcbiAgICAgICAgICAgIHN0cm9rZVNjYWxlOiB0aGlzLmNvbmZpZy52aXNDb25maWcudGhpY2tuZXNzLFxuICAgICAgICAgICAgZ2V0Q29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgZ2V0VGFyZ2V0Q29sb3I6IHRoaXMuY29uZmlnLmhpZ2hsaWdodENvbG9yLFxuICAgICAgICAgICAgZ2V0U3Ryb2tlV2lkdGg6IGRhdGEuZ2V0U3Ryb2tlV2lkdGgsXG4gICAgICAgICAgICBwaWNrYWJsZTogZmFsc2VcbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICA6IFtdKVxuICAgIF07XG4gIH1cbn1cbiJdfQ==