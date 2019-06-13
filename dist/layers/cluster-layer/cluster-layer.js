"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.clusterVisConfigs = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _aggregationLayer = _interopRequireDefault(require("../aggregation-layer"));

var _deck = require("deck.gl");

var _clusterLayer = _interopRequireDefault(require("../../deckgl-layers/cluster-layer/cluster-layer"));

var _defaultSettings = require("../../constants/default-settings");

var _clusterLayerIcon = _interopRequireDefault(require("./cluster-layer-icon"));

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
var clusterVisConfigs = {
  opacity: 'opacity',
  clusterRadius: 'clusterRadius',
  colorRange: 'colorRange',
  radiusRange: 'clusterRadiusRange',
  colorAggregation: 'aggregation'
};
exports.clusterVisConfigs = clusterVisConfigs;

var ClusterLayer =
/*#__PURE__*/
function (_AggregationLayer) {
  (0, _inherits2["default"])(ClusterLayer, _AggregationLayer);

  function ClusterLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ClusterLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ClusterLayer).call(this, props));

    _this.registerVisConfig(clusterVisConfigs);

    return _this;
  }

  (0, _createClass2["default"])(ClusterLayer, [{
    key: "renderLayer",
    value: function renderLayer(_ref) {
      var data = _ref.data,
          idx = _ref.idx,
          objectHovered = _ref.objectHovered,
          mapState = _ref.mapState,
          interaction = _ref.interaction,
          layerCallbacks = _ref.layerCallbacks;
      var visConfig = this.config.visConfig;
      return [new _clusterLayer["default"]((0, _objectSpread2["default"])({}, data, {
        id: this.id,
        idx: idx,
        radiusScale: 1,
        radiusRange: visConfig.radiusRange,
        clusterRadius: visConfig.clusterRadius,
        colorRange: this.getColorRange(visConfig.colorRange),
        colorScale: this.config.colorScale,
        pickable: true,
        autoHighlight: true,
        highlightColor: this.config.highlightColor,
        opacity: visConfig.opacity,
        lightSettings: this.meta.lightSettings,
        zoom: mapState.zoom,
        // parameters
        parameters: {
          depthTest: mapState.dragRotate
        },
        // call back from layer after calculate clusters
        onSetColorDomain: layerCallbacks.onSetLayerDomain
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) ? [new _deck.ScatterplotLayer({
        id: "".concat(this.id, "-hovered"),
        data: [objectHovered.object],
        getFillColor: this.config.highlightColor,
        getRadius: function getRadius(d) {
          return d.radius;
        },
        radiusScale: 1,
        pickable: false
      })] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'cluster';
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _clusterLayerIcon["default"];
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
        }
      };
    }
  }]);
  return ClusterLayer;
}(_aggregationLayer["default"]);

exports["default"] = ClusterLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvY2x1c3Rlci1sYXllci9jbHVzdGVyLWxheWVyLmpzIl0sIm5hbWVzIjpbImNsdXN0ZXJWaXNDb25maWdzIiwib3BhY2l0eSIsImNsdXN0ZXJSYWRpdXMiLCJjb2xvclJhbmdlIiwicmFkaXVzUmFuZ2UiLCJjb2xvckFnZ3JlZ2F0aW9uIiwiQ2x1c3RlckxheWVyIiwicHJvcHMiLCJyZWdpc3RlclZpc0NvbmZpZyIsImRhdGEiLCJpZHgiLCJvYmplY3RIb3ZlcmVkIiwibWFwU3RhdGUiLCJpbnRlcmFjdGlvbiIsImxheWVyQ2FsbGJhY2tzIiwidmlzQ29uZmlnIiwiY29uZmlnIiwiRGVja0dMQ2x1c3RlckxheWVyIiwiaWQiLCJyYWRpdXNTY2FsZSIsImdldENvbG9yUmFuZ2UiLCJjb2xvclNjYWxlIiwicGlja2FibGUiLCJhdXRvSGlnaGxpZ2h0IiwiaGlnaGxpZ2h0Q29sb3IiLCJsaWdodFNldHRpbmdzIiwibWV0YSIsInpvb20iLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsIm9uU2V0Q29sb3JEb21haW4iLCJvblNldExheWVyRG9tYWluIiwiaXNMYXllckhvdmVyZWQiLCJTY2F0dGVycGxvdExheWVyIiwib2JqZWN0IiwiZ2V0RmlsbENvbG9yIiwiZ2V0UmFkaXVzIiwiZCIsInJhZGl1cyIsIkNsdXN0ZXJMYXllckljb24iLCJjb2xvciIsImFnZ3JlZ2F0aW9uIiwiY2hhbm5lbFNjYWxlVHlwZSIsIkNIQU5ORUxfU0NBTEVTIiwiY29sb3JBZ2dyIiwiZGVmYXVsdE1lYXN1cmUiLCJkb21haW4iLCJmaWVsZCIsImtleSIsInByb3BlcnR5IiwicmFuZ2UiLCJzY2FsZSIsIkFnZ3JlZ2F0aW9uTGF5ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQXpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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TUFBTSxFQUFFLGFBSkg7QUFLTEMsVUFBQUEsS0FBSyxFQUFFLFlBTEY7QUFNTEMsVUFBQUEsR0FBRyxFQUFFLE9BTkE7QUFPTEMsVUFBQUEsUUFBUSxFQUFFLE9BUEw7QUFRTEMsVUFBQUEsS0FBSyxFQUFFLFlBUkY7QUFTTEMsVUFBQUEsS0FBSyxFQUFFO0FBVEY7QUFERixPQUFQO0FBYUQ7OztFQTVCdUNDLDRCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IEFnZ3JlZ2F0aW9uTGF5ZXIgZnJvbSAnLi4vYWdncmVnYXRpb24tbGF5ZXInO1xuaW1wb3J0IHtTY2F0dGVycGxvdExheWVyfSBmcm9tICdkZWNrLmdsJztcblxuaW1wb3J0IERlY2tHTENsdXN0ZXJMYXllciBmcm9tICdkZWNrZ2wtbGF5ZXJzL2NsdXN0ZXItbGF5ZXIvY2x1c3Rlci1sYXllcic7XG5pbXBvcnQge0NIQU5ORUxfU0NBTEVTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQgQ2x1c3RlckxheWVySWNvbiBmcm9tICcuL2NsdXN0ZXItbGF5ZXItaWNvbic7XG5cbmV4cG9ydCBjb25zdCBjbHVzdGVyVmlzQ29uZmlncyA9IHtcbiAgb3BhY2l0eTogJ29wYWNpdHknLFxuICBjbHVzdGVyUmFkaXVzOiAnY2x1c3RlclJhZGl1cycsXG4gIGNvbG9yUmFuZ2U6ICdjb2xvclJhbmdlJyxcbiAgcmFkaXVzUmFuZ2U6ICdjbHVzdGVyUmFkaXVzUmFuZ2UnLFxuICBjb2xvckFnZ3JlZ2F0aW9uOiAnYWdncmVnYXRpb24nXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbHVzdGVyTGF5ZXIgZXh0ZW5kcyBBZ2dyZWdhdGlvbkxheWVyIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5yZWdpc3RlclZpc0NvbmZpZyhjbHVzdGVyVmlzQ29uZmlncyk7XG4gIH1cblxuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gJ2NsdXN0ZXInO1xuICB9XG5cbiAgZ2V0IGxheWVySWNvbigpIHtcbiAgICByZXR1cm4gQ2x1c3RlckxheWVySWNvbjtcbiAgfVxuXG4gIGdldCB2aXN1YWxDaGFubmVscygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgYWdncmVnYXRpb246ICdjb2xvckFnZ3JlZ2F0aW9uJyxcbiAgICAgICAgY2hhbm5lbFNjYWxlVHlwZTogQ0hBTk5FTF9TQ0FMRVMuY29sb3JBZ2dyLFxuICAgICAgICBkZWZhdWx0TWVhc3VyZTogJ1BvaW50IENvdW50JyxcbiAgICAgICAgZG9tYWluOiAnY29sb3JEb21haW4nLFxuICAgICAgICBmaWVsZDogJ2NvbG9yRmllbGQnLFxuICAgICAgICBrZXk6ICdjb2xvcicsXG4gICAgICAgIHByb3BlcnR5OiAnY29sb3InLFxuICAgICAgICByYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICAgICAgICBzY2FsZTogJ2NvbG9yU2NhbGUnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uLFxuICAgIGxheWVyQ2FsbGJhY2tzXG4gIH0pIHtcbiAgICBjb25zdCB7dmlzQ29uZmlnfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIG5ldyBEZWNrR0xDbHVzdGVyTGF5ZXIoe1xuICAgICAgICAuLi5kYXRhLFxuICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgaWR4LFxuICAgICAgICByYWRpdXNTY2FsZTogMSxcbiAgICAgICAgcmFkaXVzUmFuZ2U6IHZpc0NvbmZpZy5yYWRpdXNSYW5nZSxcbiAgICAgICAgY2x1c3RlclJhZGl1czogdmlzQ29uZmlnLmNsdXN0ZXJSYWRpdXMsXG4gICAgICAgIGNvbG9yUmFuZ2U6IHRoaXMuZ2V0Q29sb3JSYW5nZSh2aXNDb25maWcuY29sb3JSYW5nZSksXG4gICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGUsXG4gICAgICAgIHBpY2thYmxlOiB0cnVlLFxuICAgICAgICBhdXRvSGlnaGxpZ2h0OiB0cnVlLFxuICAgICAgICBoaWdobGlnaHRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgIG9wYWNpdHk6IHZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBsaWdodFNldHRpbmdzOiB0aGlzLm1ldGEubGlnaHRTZXR0aW5ncyxcbiAgICAgICAgem9vbTogbWFwU3RhdGUuem9vbSxcblxuICAgICAgICAvLyBwYXJhbWV0ZXJzXG4gICAgICAgIHBhcmFtZXRlcnM6IHtkZXB0aFRlc3Q6IG1hcFN0YXRlLmRyYWdSb3RhdGV9LFxuXG4gICAgICAgIC8vIGNhbGwgYmFjayBmcm9tIGxheWVyIGFmdGVyIGNhbGN1bGF0ZSBjbHVzdGVyc1xuICAgICAgICBvblNldENvbG9yRG9tYWluOiBsYXllckNhbGxiYWNrcy5vblNldExheWVyRG9tYWluXG4gICAgICB9KSxcbiAgICAgIC8vIGhvdmVyIGxheWVyXG4gICAgICAuLi4odGhpcy5pc0xheWVySG92ZXJlZChvYmplY3RIb3ZlcmVkKVxuICAgICAgPyBbXG4gICAgICAgICAgbmV3IFNjYXR0ZXJwbG90TGF5ZXIoe1xuICAgICAgICAgICAgaWQ6IGAke3RoaXMuaWR9LWhvdmVyZWRgLFxuICAgICAgICAgICAgZGF0YTogW29iamVjdEhvdmVyZWQub2JqZWN0XSxcbiAgICAgICAgICAgIGdldEZpbGxDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICBnZXRSYWRpdXM6IGQgPT4gZC5yYWRpdXMsXG4gICAgICAgICAgICByYWRpdXNTY2FsZTogMSxcbiAgICAgICAgICAgIHBpY2thYmxlOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19