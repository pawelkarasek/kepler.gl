"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.gridVisConfigs = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _deck = require("deck.gl");

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

var _enhancedGridLayer = _interopRequireDefault(require("../../deckgl-layers/grid-layer/enhanced-grid-layer"));

var _gridUtils = require("./grid-utils");

var _gridLayerIcon = _interopRequireDefault(require("./grid-layer-icon"));

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
var gridVisConfigs = {
  opacity: 'opacity',
  worldUnitSize: 'worldUnitSize',
  colorRange: 'colorRange',
  coverage: 'coverage',
  sizeRange: 'elevationRange',
  percentile: 'percentile',
  elevationPercentile: 'elevationPercentile',
  elevationScale: 'elevationScale',
  colorAggregation: 'aggregation',
  sizeAggregation: 'sizeAggregation',
  enable3d: 'enable3d'
};
exports.gridVisConfigs = gridVisConfigs;

var GridLayer =
/*#__PURE__*/
function (_AggregationLayer) {
  (0, _inherits2["default"])(GridLayer, _AggregationLayer);

  function GridLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, GridLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(GridLayer).call(this, props));

    _this.registerVisConfig(gridVisConfigs);

    _this.visConfigSettings.worldUnitSize.label = 'Grid Size (km)';
    return _this;
  }

  (0, _createClass2["default"])(GridLayer, [{
    key: "formatLayerData",
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var formattedData = (0, _get2["default"])((0, _getPrototypeOf2["default"])(GridLayer.prototype), "formatLayerData", this).call(this, _, allData, filteredIndex, oldLayerData, opt);
      var getPosition = formattedData.getPosition,
          data = formattedData.data; // TODO: fix this in deck.gl layer

      var cleaned = data.filter(function (d) {
        var pos = getPosition(d);
        return pos.every(Number.isFinite);
      }); // All data processing is done in deck.gl layer

      return (0, _objectSpread2["default"])({}, formattedData, {
        data: cleaned
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interaction = _ref.interaction,
          layerCallbacks = _ref.layerCallbacks,
          layerInteraction = _ref.layerInteraction;
      var zoomFactor = this.getZoomFactor(mapState);
      var eleZoomFactor = this.getElevationZoomFactor(mapState);
      var visConfig = this.config.visConfig;
      var cellSize = visConfig.worldUnitSize * 1000;
      return [new _enhancedGridLayer["default"]((0, _objectSpread2["default"])({}, data, layerInteraction, {
        id: this.id,
        idx: idx,
        cellSize: cellSize,
        coverage: visConfig.coverage,
        // highlight
        autoHighlight: visConfig.enable3d,
        highlightColor: _defaultSettings.HIGHLIGH_COLOR_3D,
        // color
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        opacity: visConfig.opacity,
        upperPercentile: visConfig.percentile[1],
        lowerPercentile: visConfig.percentile[0],
        // elevation
        extruded: visConfig.enable3d,
        elevationScale: visConfig.elevationScale * eleZoomFactor,
        elevationLowerPercentile: visConfig.elevationPercentile[0],
        elevationUpperPercentile: visConfig.elevationPercentile[1],
        // parameters
        parameters: {
          depthTest: Boolean(visConfig.enable3d || mapState.dragRotate)
        },
        // render
        pickable: true,
        lightSettings: this.meta && this.meta.lightSettings,
        // callbacks
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) && !visConfig.enable3d ? [new _deck.GeoJsonLayer((0, _objectSpread2["default"])({}, layerInteraction, {
        id: "".concat(this.id, "-hovered"),
        data: [(0, _gridUtils.pointToPolygonGeo)({
          object: objectHovered.object,
          cellSize: cellSize,
          coverage: visConfig.coverage,
          mapState: mapState
        })],
        getLineColor: this.config.highlightColor,
        lineWidthScale: 8 * zoomFactor
      }))] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'grid';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _gridLayerIcon["default"];
    }
  }]);
  return GridLayer;
}(_aggregationLayer["default"]);

exports["default"] = GridLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ3JpZC1sYXllci9ncmlkLWxheWVyLmpzIl0sIm5hbWVzIjpbImdyaWRWaXNDb25maWdzIiwib3BhY2l0eSIsIndvcmxkVW5pdFNpemUiLCJjb2xvclJhbmdlIiwiY292ZXJhZ2UiLCJzaXplUmFuZ2UiLCJwZXJjZW50aWxlIiwiZWxldmF0aW9uUGVyY2VudGlsZSIsImVsZXZhdGlvblNjYWxlIiwiY29sb3JBZ2dyZWdhdGlvbiIsInNpemVBZ2dyZWdhdGlvbiIsImVuYWJsZTNkIiwiR3JpZExheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsInZpc0NvbmZpZ1NldHRpbmdzIiwibGFiZWwiLCJfIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJvbGRMYXllckRhdGEiLCJvcHQiLCJmb3JtYXR0ZWREYXRhIiwiZ2V0UG9zaXRpb24iLCJkYXRhIiwiY2xlYW5lZCIsImZpbHRlciIsImQiLCJwb3MiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwiaWR4Iiwib2JqZWN0SG92ZXJlZCIsIm1hcFN0YXRlIiwiaW50ZXJhY3Rpb24iLCJsYXllckNhbGxiYWNrcyIsImxheWVySW50ZXJhY3Rpb24iLCJ6b29tRmFjdG9yIiwiZ2V0Wm9vbUZhY3RvciIsImVsZVpvb21GYWN0b3IiLCJnZXRFbGV2YXRpb25ab29tRmFjdG9yIiwidmlzQ29uZmlnIiwiY29uZmlnIiwiY2VsbFNpemUiLCJFbmhhbmNlZEdyaWRMYXllciIsImlkIiwiYXV0b0hpZ2hsaWdodCIsImhpZ2hsaWdodENvbG9yIiwiSElHSExJR0hfQ09MT1JfM0QiLCJnZXRDb2xvclJhbmdlIiwiY29sb3JTY2FsZSIsInVwcGVyUGVyY2VudGlsZSIsImxvd2VyUGVyY2VudGlsZSIsImV4dHJ1ZGVkIiwiZWxldmF0aW9uTG93ZXJQZXJjZW50aWxlIiwiZWxldmF0aW9uVXBwZXJQZXJjZW50aWxlIiwicGFyYW1ldGVycyIsImRlcHRoVGVzdCIsIkJvb2xlYW4iLCJkcmFnUm90YXRlIiwicGlja2FibGUiLCJsaWdodFNldHRpbmdzIiwibWV0YSIsIm9uU2V0Q29sb3JEb21haW4iLCJvblNldExheWVyRG9tYWluIiwiaXNMYXllckhvdmVyZWQiLCJHZW9Kc29uTGF5ZXIiLCJvYmplY3QiLCJnZXRMaW5lQ29sb3IiLCJsaW5lV2lkdGhTY2FsZSIsIkdyaWRMYXllckljb24iLCJBZ2dyZWdhdGlvbkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQXpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNPLElBQU1BLGNBQWMsR0FBRztBQUM1QkMsRUFBQUEsT0FBTyxFQUFFLFNBRG1CO0FBRTVCQyxFQUFBQSxhQUFhLEVBQUUsZUFGYTtBQUc1QkMsRUFBQUEsVUFBVSxFQUFFLFlBSGdCO0FBSTVCQyxFQUFBQSxRQUFRLEVBQUUsVUFKa0I7QUFLNUJDLEVBQUFBLFNBQVMsRUFBRSxnQkFMaUI7QUFNNUJDLEVBQUFBLFVBQVUsRUFBRSxZQU5nQjtBQU81QkMsRUFBQUEsbUJBQW1CLEVBQUUscUJBUE87QUFRNUJDLEVBQUFBLGNBQWMsRUFBRSxnQkFSWTtBQVM1QkMsRUFBQUEsZ0JBQWdCLEVBQUUsYUFUVTtBQVU1QkMsRUFBQUEsZUFBZSxFQUFFLGlCQVZXO0FBVzVCQyxFQUFBQSxRQUFRLEVBQUU7QUFYa0IsQ0FBdkI7OztJQWNjQyxTOzs7OztBQUNuQixxQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2pCLHFIQUFNQSxLQUFOOztBQUVBLFVBQUtDLGlCQUFMLENBQXVCZCxjQUF2Qjs7QUFDQSxVQUFLZSxpQkFBTCxDQUF1QmIsYUFBdkIsQ0FBcUNjLEtBQXJDLEdBQTZDLGdCQUE3QztBQUppQjtBQUtsQjs7OztvQ0FVZUMsQyxFQUFHQyxP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QyxRQUFBQSxhQUFhLEVBQUUsS0FBS0MsSUFBTCxJQUFhLEtBQUtBLElBQUwsQ0FBVUQsYUE1QnhDO0FBOEJFO0FBQ0FFLFFBQUFBLGdCQUFnQixFQUFFNUIsY0FBYyxDQUFDNkI7QUEvQm5DLFNBREYsNkNBb0NNLEtBQUtDLGNBQUwsQ0FBb0JqQyxhQUFwQixLQUFzQyxDQUFDUyxTQUFTLENBQUMvQixRQUFqRCxHQUNBLENBQ0UsSUFBSXdELGtCQUFKLG9DQUNLOUIsZ0JBREw7QUFFRVMsUUFBQUEsRUFBRSxZQUFLLEtBQUtBLEVBQVYsYUFGSjtBQUdFdEIsUUFBQUEsSUFBSSxFQUFFLENBQ0osa0NBQWtCO0FBQ2hCNEMsVUFBQUEsTUFBTSxFQUFFbkMsYUFBYSxDQUFDbUMsTUFETjtBQUVoQnhCLFVBQUFBLFFBQVEsRUFBUkEsUUFGZ0I7QUFHaEJ4QyxVQUFBQSxRQUFRLEVBQUVzQyxTQUFTLENBQUN0QyxRQUhKO0FBSWhCOEIsVUFBQUEsUUFBUSxFQUFSQTtBQUpnQixTQUFsQixDQURJLENBSFI7QUFXRW1DLFFBQUFBLFlBQVksRUFBRSxLQUFLMUIsTUFBTCxDQUFZSyxjQVg1QjtBQVlFc0IsUUFBQUEsY0FBYyxFQUFFLElBQUloQztBQVp0QixTQURGLENBREEsR0FpQkEsRUFyRE47QUF1REQ7Ozt3QkFyR1U7QUFDVCxhQUFPLE1BQVA7QUFDRDs7O3dCQUVlO0FBQ2QsYUFBT2lDLHlCQUFQO0FBQ0Q7OztFQWRvQ0MsNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0dlb0pzb25MYXllcn0gZnJvbSAnZGVjay5nbCc7XG5pbXBvcnQgQWdncmVnYXRpb25MYXllciBmcm9tICcuLi9hZ2dyZWdhdGlvbi1sYXllcic7XG5pbXBvcnQgRW5oYW5jZWRHcmlkTGF5ZXIgZnJvbSAnZGVja2dsLWxheWVycy9ncmlkLWxheWVyL2VuaGFuY2VkLWdyaWQtbGF5ZXInO1xuaW1wb3J0IHtwb2ludFRvUG9seWdvbkdlb30gZnJvbSAnLi9ncmlkLXV0aWxzJztcbmltcG9ydCBHcmlkTGF5ZXJJY29uIGZyb20gJy4vZ3JpZC1sYXllci1pY29uJztcbmltcG9ydCB7SElHSExJR0hfQ09MT1JfM0R9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuZXhwb3J0IGNvbnN0IGdyaWRWaXNDb25maWdzID0ge1xuICBvcGFjaXR5OiAnb3BhY2l0eScsXG4gIHdvcmxkVW5pdFNpemU6ICd3b3JsZFVuaXRTaXplJyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICBjb3ZlcmFnZTogJ2NvdmVyYWdlJyxcbiAgc2l6ZVJhbmdlOiAnZWxldmF0aW9uUmFuZ2UnLFxuICBwZXJjZW50aWxlOiAncGVyY2VudGlsZScsXG4gIGVsZXZhdGlvblBlcmNlbnRpbGU6ICdlbGV2YXRpb25QZXJjZW50aWxlJyxcbiAgZWxldmF0aW9uU2NhbGU6ICdlbGV2YXRpb25TY2FsZScsXG4gIGNvbG9yQWdncmVnYXRpb246ICdhZ2dyZWdhdGlvbicsXG4gIHNpemVBZ2dyZWdhdGlvbjogJ3NpemVBZ2dyZWdhdGlvbicsXG4gIGVuYWJsZTNkOiAnZW5hYmxlM2QnXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmlkTGF5ZXIgZXh0ZW5kcyBBZ2dyZWdhdGlvbkxheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyVmlzQ29uZmlnKGdyaWRWaXNDb25maWdzKTtcbiAgICB0aGlzLnZpc0NvbmZpZ1NldHRpbmdzLndvcmxkVW5pdFNpemUubGFiZWwgPSAnR3JpZCBTaXplIChrbSknO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdncmlkJztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEdyaWRMYXllckljb247XG4gIH1cblxuICBmb3JtYXRMYXllckRhdGEoXywgYWxsRGF0YSwgZmlsdGVyZWRJbmRleCwgb2xkTGF5ZXJEYXRhLCBvcHQgPSB7fSkge1xuICAgIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBzdXBlci5mb3JtYXRMYXllckRhdGEoXG4gICAgICBfLFxuICAgICAgYWxsRGF0YSxcbiAgICAgIGZpbHRlcmVkSW5kZXgsXG4gICAgICBvbGRMYXllckRhdGEsXG4gICAgICBvcHRcbiAgICApO1xuXG4gICAgY29uc3Qge2dldFBvc2l0aW9uLCBkYXRhfSA9IGZvcm1hdHRlZERhdGE7XG5cbiAgICAvLyBUT0RPOiBmaXggdGhpcyBpbiBkZWNrLmdsIGxheWVyXG4gICAgY29uc3QgY2xlYW5lZCA9IGRhdGEuZmlsdGVyKGQgPT4ge1xuICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oZCk7XG4gICAgICByZXR1cm4gcG9zLmV2ZXJ5KE51bWJlci5pc0Zpbml0ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBBbGwgZGF0YSBwcm9jZXNzaW5nIGlzIGRvbmUgaW4gZGVjay5nbCBsYXllclxuICAgIHJldHVybiB7XG4gICAgICAuLi5mb3JtYXR0ZWREYXRhLFxuICAgICAgZGF0YTogY2xlYW5lZFxuICAgIH07XG4gIH1cblxuICByZW5kZXJMYXllcih7XG4gICAgZGF0YSxcbiAgICBpZHgsXG4gICAgb2JqZWN0SG92ZXJlZCxcbiAgICBtYXBTdGF0ZSxcbiAgICBpbnRlcmFjdGlvbixcbiAgICBsYXllckNhbGxiYWNrcyxcbiAgICBsYXllckludGVyYWN0aW9uXG4gIH0pIHtcbiAgICBjb25zdCB6b29tRmFjdG9yID0gdGhpcy5nZXRab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCBlbGVab29tRmFjdG9yID0gdGhpcy5nZXRFbGV2YXRpb25ab29tRmFjdG9yKG1hcFN0YXRlKTtcbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuICAgIGNvbnN0IGNlbGxTaXplID0gdmlzQ29uZmlnLndvcmxkVW5pdFNpemUgKiAxMDAwO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBFbmhhbmNlZEdyaWRMYXllcih7XG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIGNlbGxTaXplLFxuICAgICAgICBjb3ZlcmFnZTogdmlzQ29uZmlnLmNvdmVyYWdlLFxuICAgICAgICAvLyBoaWdobGlnaHRcbiAgICAgICAgYXV0b0hpZ2hsaWdodDogdmlzQ29uZmlnLmVuYWJsZTNkLFxuICAgICAgICBoaWdobGlnaHRDb2xvcjogSElHSExJR0hfQ09MT1JfM0QsXG5cbiAgICAgICAgLy8gY29sb3JcbiAgICAgICAgY29sb3JSYW5nZTogdGhpcy5nZXRDb2xvclJhbmdlKHZpc0NvbmZpZy5jb2xvclJhbmdlKSxcbiAgICAgICAgY29sb3JTY2FsZTogdGhpcy5jb25maWcuY29sb3JTY2FsZSxcbiAgICAgICAgb3BhY2l0eTogdmlzQ29uZmlnLm9wYWNpdHksXG4gICAgICAgIHVwcGVyUGVyY2VudGlsZTogdmlzQ29uZmlnLnBlcmNlbnRpbGVbMV0sXG4gICAgICAgIGxvd2VyUGVyY2VudGlsZTogdmlzQ29uZmlnLnBlcmNlbnRpbGVbMF0sXG5cbiAgICAgICAgLy8gZWxldmF0aW9uXG4gICAgICAgIGV4dHJ1ZGVkOiB2aXNDb25maWcuZW5hYmxlM2QsXG4gICAgICAgIGVsZXZhdGlvblNjYWxlOiB2aXNDb25maWcuZWxldmF0aW9uU2NhbGUgKiBlbGVab29tRmFjdG9yLFxuICAgICAgICBlbGV2YXRpb25Mb3dlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25QZXJjZW50aWxlWzBdLFxuICAgICAgICBlbGV2YXRpb25VcHBlclBlcmNlbnRpbGU6IHZpc0NvbmZpZy5lbGV2YXRpb25QZXJjZW50aWxlWzFdLFxuICAgICAgICAvLyBwYXJhbWV0ZXJzXG4gICAgICAgIHBhcmFtZXRlcnM6IHtkZXB0aFRlc3Q6IEJvb2xlYW4odmlzQ29uZmlnLmVuYWJsZTNkIHx8IG1hcFN0YXRlLmRyYWdSb3RhdGUpfSxcblxuICAgICAgICAvLyByZW5kZXJcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG4gICAgICAgIGxpZ2h0U2V0dGluZ3M6IHRoaXMubWV0YSAmJiB0aGlzLm1ldGEubGlnaHRTZXR0aW5ncyxcblxuICAgICAgICAvLyBjYWxsYmFja3NcbiAgICAgICAgb25TZXRDb2xvckRvbWFpbjogbGF5ZXJDYWxsYmFja3Mub25TZXRMYXllckRvbWFpblxuICAgICAgfSksXG5cbiAgICAgIC8vIHJlbmRlciBhbiBvdXRsaW5lIG9mIGVhY2ggY2VsbCBpZiBub3QgZXh0cnVkZWRcbiAgICAgIC4uLih0aGlzLmlzTGF5ZXJIb3ZlcmVkKG9iamVjdEhvdmVyZWQpICYmICF2aXNDb25maWcuZW5hYmxlM2RcbiAgICAgICAgPyBbXG4gICAgICAgICAgICBuZXcgR2VvSnNvbkxheWVyKHtcbiAgICAgICAgICAgICAgLi4ubGF5ZXJJbnRlcmFjdGlvbixcbiAgICAgICAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWhvdmVyZWRgLFxuICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgICAgcG9pbnRUb1BvbHlnb25HZW8oe1xuICAgICAgICAgICAgICAgICAgb2JqZWN0OiBvYmplY3RIb3ZlcmVkLm9iamVjdCxcbiAgICAgICAgICAgICAgICAgIGNlbGxTaXplLFxuICAgICAgICAgICAgICAgICAgY292ZXJhZ2U6IHZpc0NvbmZpZy5jb3ZlcmFnZSxcbiAgICAgICAgICAgICAgICAgIG1hcFN0YXRlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgZ2V0TGluZUNvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgICAgICAgbGluZVdpZHRoU2NhbGU6IDggKiB6b29tRmFjdG9yXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF1cbiAgICAgICAgOiBbXSlcbiAgICBdO1xuICB9XG59XG4iXX0=