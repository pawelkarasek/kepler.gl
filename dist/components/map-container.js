"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MapContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactMapGl = _interopRequireDefault(require("react-map-gl"));

var _deck = _interopRequireDefault(require("deck.gl"));

var _mapPopover = _interopRequireDefault(require("./map/map-popover"));

var _mapControl = _interopRequireDefault(require("./map/map-control"));

var _styledComponents = require("./common/styled-components");

var _mapboxUtils = require("../layers/mapbox-utils");

var _glUtils = require("../utils/gl-utils");

var _mapboxUtils2 = require("../utils/map-style-utils/mapbox-utils");

var _dBuildingLayer = _interopRequireDefault(require("../deckgl-layers/3d-building-layer/3d-building-layer"));

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
// libraries
// components
// utils
// default-settings
var MAP_STYLE = {
  container: {
    display: 'inline-block',
    position: 'relative'
  },
  top: {
    position: 'absolute',
    top: '0px',
    pointerEvents: 'none'
  }
};
var MAPBOXGL_STYLE_UPDATE = 'style.load';
var MAPBOXGL_RENDER = 'render';
var TRANSITION_DURATION = 0;
MapContainerFactory.deps = [_mapPopover["default"], _mapControl["default"]];

function MapContainerFactory(MapPopover, MapControl) {
  var MapContainer =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(MapContainer, _Component);

    function MapContainer(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, MapContainer);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(MapContainer).call(this, props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCloseMapPopover", function () {
        _this.props.visStateActions.onLayerClick(null);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onLayerSetDomain", function (idx, colorDomain) {
        _this.props.visStateActions.layerConfigChange(_this.props.layers[idx], {
          colorDomain: colorDomain
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onWebGLInitialized", function (gl) {
        (0, _glUtils.onWebGLInitialized)(gl); // allow Uint32 indices in building layer
        // gl.getExtension('OES_element_index_uint');
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMouseMove", function (evt) {
        var brush = _this.props.interactionConfig.brush;

        if (evt.nativeEvent && brush.enabled) {
          _this.setState({
            mousePosition: [evt.nativeEvent.offsetX, evt.nativeEvent.offsetY]
          });
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleMapToggleLayer", function (layerId) {
        var _this$props = _this.props,
            _this$props$index = _this$props.index,
            mapIndex = _this$props$index === void 0 ? 0 : _this$props$index,
            visStateActions = _this$props.visStateActions;
        visStateActions.toggleLayerForMap(mapIndex, layerId);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMapboxStyleUpdate", function () {
        // force refresh mapboxgl layers
        (0, _mapboxUtils.updateMapboxLayers)(_this._map, _this._renderMapboxLayers(), _this.previousLayers, _this.props.mapLayers, {
          force: true
        });

        if (typeof _this.props.onMapStyleLoaded === 'function') {
          _this.props.onMapStyleLoaded(_this._map);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_setMapboxMap", function (mapbox) {
        if (!_this._map && mapbox) {
          _this._map = mapbox.getMap(); // i noticed in certain context we don't access the actual map element

          if (!_this._map) {
            return;
          } // bind mapboxgl event listener


          _this._map.on(MAPBOXGL_STYLE_UPDATE, _this._onMapboxStyleUpdate);

          _this._map.on(MAPBOXGL_RENDER, function () {
            if (typeof _this.props.onMapRender === 'function') {
              _this.props.onMapRender(_this._map);
            }
          });
        }

        if (_this.props.getMapboxRef) {
          // The parent component can gain access to our MapboxGlMap by
          // providing this callback. Note that 'mapbox' will be null when the
          // ref is unset (e.g. when a split map is closed).
          _this.props.getMapboxRef(mapbox, _this.props.index);
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBeforeRender", function (_ref) {
        var gl = _ref.gl;
        (0, _glUtils.setLayerBlending)(gl, _this.props.layerBlending);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderLayer", function (overlays, idx) {
        var _this$props2 = _this.props,
            layers = _this$props2.layers,
            layerData = _this$props2.layerData,
            hoverInfo = _this$props2.hoverInfo,
            clicked = _this$props2.clicked,
            mapLayers = _this$props2.mapLayers,
            mapState = _this$props2.mapState,
            interactionConfig = _this$props2.interactionConfig;
        var mousePosition = _this.state.mousePosition;
        var layer = layers[idx];
        var data = layerData[idx];
        var layerInteraction = {
          mousePosition: mousePosition,
          wrapLongitude: true
        };
        var objectHovered = clicked || hoverInfo;
        var layerCallbacks = {
          onSetLayerDomain: function onSetLayerDomain(val) {
            return _this._onLayerSetDomain(idx, val);
          }
        };

        if (!_this._shouldRenderLayer(layer, data, mapLayers)) {
          return overlays;
        }

        var layerOverlay = []; // Layer is Layer class

        if (typeof layer.renderLayer === 'function') {
          layerOverlay = layer.renderLayer({
            data: data,
            idx: idx,
            layerInteraction: layerInteraction,
            objectHovered: objectHovered,
            mapState: mapState,
            interactionConfig: interactionConfig,
            layerCallbacks: layerCallbacks
          });
        }

        if (layerOverlay.length) {
          overlays = overlays.concat(layerOverlay);
        }

        return overlays;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onViewportChange", function (viewState) {
        if (typeof _this.props.onViewStateChange === 'function') {
          _this.props.onViewStateChange(viewState);
        }

        _this.props.mapStateActions.updateMap(viewState);
      });
      _this.state = {
        mousePosition: [0, 0]
      };
      _this.previousLayers = {// [layers.id]: mapboxLayerConfig
      };
      return _this;
    }

    (0, _createClass2["default"])(MapContainer, [{
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // unbind mapboxgl event listener
        if (this._map) {
          this._map.off(MAPBOXGL_STYLE_UPDATE);

          this._map.off(MAPBOXGL_RENDER);
        }
      }
      /* component private functions */

    }, {
      key: "_renderObjectLayerPopover",

      /* component render functions */

      /* eslint-disable complexity */
      value: function _renderObjectLayerPopover() {
        // TODO: move this into reducer so it can be tested
        var _this$props3 = this.props,
            mapState = _this$props3.mapState,
            hoverInfo = _this$props3.hoverInfo,
            clicked = _this$props3.clicked,
            datasets = _this$props3.datasets,
            interactionConfig = _this$props3.interactionConfig,
            layers = _this$props3.layers,
            mapLayers = _this$props3.mapLayers; // if clicked something, ignore hover behavior

        var objectInfo = clicked || hoverInfo;

        if (!interactionConfig.tooltip.enabled || !objectInfo || !objectInfo.picked) {
          // nothing hovered
          return null;
        }

        var lngLat = objectInfo.lngLat,
            object = objectInfo.object,
            overlay = objectInfo.layer; // deckgl layer to kepler-gl layer

        var layer = layers[overlay.props.idx];

        if (!layer || !layer.config.isVisible || !object || !layer.getHoverData || mapLayers && !mapLayers[layer.id].isVisible) {
          // layer is not visible
          return null;
        }

        var dataId = layer.config.dataId;
        var _datasets$dataId = datasets[dataId],
            allData = _datasets$dataId.allData,
            fields = _datasets$dataId.fields;
        var data = layer.getHoverData(object, allData); // project lnglat to screen so that tooltip follows the object on zoom

        var viewport = overlay.context.viewport;

        var _ref2 = this._getHoverXY(viewport, lngLat) || objectInfo,
            x = _ref2.x,
            y = _ref2.y;

        var popoverProps = {
          data: data,
          fields: fields,
          fieldsToShow: interactionConfig.tooltip.config.fieldsToShow[dataId],
          layer: layer,
          isVisible: true,
          x: x,
          y: y,
          freezed: Boolean(clicked),
          onClose: this._onCloseMapPopover,
          mapState: mapState
        };
        return _react["default"].createElement("div", null, _react["default"].createElement(MapPopover, popoverProps));
      }
      /* eslint-enable complexity */

    }, {
      key: "_getHoverXY",
      value: function _getHoverXY(viewport, lngLat) {
        var screenCoord = !viewport || !lngLat ? null : viewport.project(lngLat);
        return screenCoord && {
          x: screenCoord[0],
          y: screenCoord[1]
        };
      }
    }, {
      key: "_shouldRenderLayer",
      value: function _shouldRenderLayer(layer, data, mapLayers) {
        var isAvailableAndVisible = !(mapLayers && mapLayers[layer.id]) || mapLayers[layer.id].isVisible;
        return layer.shouldRenderLayer(data) && isAvailableAndVisible;
      }
    }, {
      key: "_renderOverlay",
      value: function _renderOverlay() {
        var _this$props4 = this.props,
            mapState = _this$props4.mapState,
            mapStyle = _this$props4.mapStyle,
            layerData = _this$props4.layerData,
            layerOrder = _this$props4.layerOrder,
            visStateActions = _this$props4.visStateActions,
            mapboxApiAccessToken = _this$props4.mapboxApiAccessToken;
        var deckGlLayers = []; // wait until data is ready before render data layers

        if (layerData && layerData.length) {
          // last layer render first
          deckGlLayers = layerOrder.slice().reverse().reduce(this._renderLayer, []);
        }

        if (mapStyle.visibleLayerGroups['3d building']) {
          deckGlLayers.push(new _dBuildingLayer["default"]({
            id: '_keplergl_3d-building',
            mapboxApiAccessToken: mapboxApiAccessToken,
            threeDBuildingColor: mapStyle.threeDBuildingColor
          }));
        }

        return _react["default"].createElement(_deck["default"], {
          viewState: mapState,
          id: "default-deckgl-overlay",
          layers: deckGlLayers,
          onWebGLInitialized: this._onWebGLInitialized,
          onBeforeRender: this._onBeforeRender,
          onLayerHover: visStateActions.onLayerHover,
          onLayerClick: visStateActions.onLayerClick
        });
      }
    }, {
      key: "_renderMapboxLayers",
      value: function _renderMapboxLayers() {
        var _this$props5 = this.props,
            layers = _this$props5.layers,
            layerData = _this$props5.layerData,
            layerOrder = _this$props5.layerOrder;
        return (0, _mapboxUtils.generateMapboxLayers)(layers, layerData, layerOrder);
      }
    }, {
      key: "_renderMapboxOverlays",
      value: function _renderMapboxOverlays() {
        if (this._map && this._map.isStyleLoaded()) {
          var mapboxLayers = this._renderMapboxLayers();

          (0, _mapboxUtils.updateMapboxLayers)(this._map, mapboxLayers, this.previousLayers, this.props.mapLayers);
          this.previousLayers = mapboxLayers.reduce(function (_final, layer) {
            return (0, _objectSpread3["default"])({}, _final, (0, _defineProperty2["default"])({}, layer.id, layer.config));
          }, {});
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props6 = this.props,
            mapState = _this$props6.mapState,
            mapStyle = _this$props6.mapStyle,
            mapStateActions = _this$props6.mapStateActions,
            mapLayers = _this$props6.mapLayers,
            layers = _this$props6.layers,
            MapComponent = _this$props6.MapComponent,
            datasets = _this$props6.datasets,
            mapboxApiAccessToken = _this$props6.mapboxApiAccessToken,
            mapControls = _this$props6.mapControls,
            toggleMapControl = _this$props6.toggleMapControl;
        var onMapClick = mapStateActions.onMapClick;

        if (!mapStyle.bottomMapStyle) {
          // style not yet loaded
          return _react["default"].createElement("div", null);
        }

        var mapProps = (0, _objectSpread3["default"])({}, mapState, {
          preserveDrawingBuffer: true,
          mapboxApiAccessToken: mapboxApiAccessToken,
          onViewportChange: this._onViewportChange,
          transformRequest: _mapboxUtils2.transformRequest
        });
        return _react["default"].createElement(_styledComponents.StyledMapContainer, {
          style: MAP_STYLE.container,
          onMouseMove: this._onMouseMove
        }, _react["default"].createElement(MapControl, {
          datasets: datasets,
          dragRotate: mapState.dragRotate,
          isSplit: mapState.isSplit,
          isExport: this.props.isExport,
          layers: layers,
          mapIndex: this.props.index,
          mapLayers: mapLayers,
          mapControls: mapControls,
          scale: mapState.scale || 1,
          top: 0,
          onTogglePerspective: mapStateActions.togglePerspective,
          onToggleSplitMap: mapStateActions.toggleSplitMap,
          onMapToggleLayer: this._handleMapToggleLayer,
          onToggleMapControl: toggleMapControl
        }), _react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "bottom",
          ref: this._setMapboxMap,
          mapStyle: mapStyle.bottomMapStyle,
          onClick: onMapClick,
          getCursor: this.props.hoverInfo ? function () {
            return 'pointer';
          } : undefined,
          transitionDuration: TRANSITION_DURATION
        }), this._renderOverlay(), this._renderMapboxOverlays()), mapStyle.topMapStyle && _react["default"].createElement("div", {
          style: MAP_STYLE.top
        }, _react["default"].createElement(MapComponent, (0, _extends2["default"])({}, mapProps, {
          key: "top",
          mapStyle: mapStyle.topMapStyle
        }))), this._renderObjectLayerPopover());
      }
    }]);
    return MapContainer;
  }(_react.Component);

  (0, _defineProperty2["default"])(MapContainer, "propTypes", {
    // required
    datasets: _propTypes["default"].object,
    interactionConfig: _propTypes["default"].object.isRequired,
    layerBlending: _propTypes["default"].string.isRequired,
    layerOrder: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layerData: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    mapState: _propTypes["default"].object.isRequired,
    mapStyle: _propTypes["default"].object.isRequired,
    mapControls: _propTypes["default"].object.isRequired,
    mapboxApiAccessToken: _propTypes["default"].string.isRequired,
    toggleMapControl: _propTypes["default"].func.isRequired,
    visStateActions: _propTypes["default"].object.isRequired,
    mapStateActions: _propTypes["default"].object.isRequired,
    // optional
    isExport: _propTypes["default"].bool,
    clicked: _propTypes["default"].object,
    hoverInfo: _propTypes["default"].object,
    mapLayers: _propTypes["default"].object,
    onMapToggleLayer: _propTypes["default"].func,
    onMapStyleLoaded: _propTypes["default"].func,
    onMapRender: _propTypes["default"].func,
    getMapboxRef: _propTypes["default"].func
  });
  (0, _defineProperty2["default"])(MapContainer, "defaultProps", {
    MapComponent: _reactMapGl["default"]
  });
  return MapContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL21hcC1jb250YWluZXIuanMiXSwibmFtZXMiOlsiTUFQX1NUWUxFIiwiY29udGFpbmVyIiwiZGlzcGxheSIsInBvc2l0aW9uIiwidG9wIiwicG9pbnRlckV2ZW50cyIsIk1BUEJPWEdMX1NUWUxFX1VQREFURSIsIk1BUEJPWEdMX1JFTkRFUiIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJNYXBDb250YWluZXJGYWN0b3J5IiwiZGVwcyIsIk1hcFBvcG92ZXJGYWN0b3J5IiwiTWFwQ29udHJvbEZhY3RvcnkiLCJNYXBQb3BvdmVyIiwiTWFwQ29udHJvbCIsIk1hcENvbnRhaW5lciIsInByb3BzIiwidmlzU3RhdGVBY3Rpb25zIiwib25MYXllckNsaWNrIiwiaWR4IiwiY29sb3JEb21haW4iLCJsYXllckNvbmZpZ0NoYW5nZSIsImxheWVycyIsImdsIiwiZXZ0IiwiYnJ1c2giLCJpbnRlcmFjdGlvbkNvbmZpZyIsIm5hdGl2ZUV2ZW50IiwiZW5hYmxlZCIsInNldFN0YXRlIiwibW91c2VQb3NpdGlvbiIsIm9mZnNldFgiLCJvZmZzZXRZIiwibGF5ZXJJZCIsImluZGV4IiwibWFwSW5kZXgiLCJ0b2dnbGVMYXllckZvck1hcCIsIl9tYXAiLCJfcmVuZGVyTWFwYm94TGF5ZXJzIiwicHJldmlvdXNMYXllcnMiLCJtYXBMYXllcnMiLCJmb3JjZSIsIm9uTWFwU3R5bGVMb2FkZWQiLCJtYXBib3giLCJnZXRNYXAiLCJvbiIsIl9vbk1hcGJveFN0eWxlVXBkYXRlIiwib25NYXBSZW5kZXIiLCJnZXRNYXBib3hSZWYiLCJsYXllckJsZW5kaW5nIiwib3ZlcmxheXMiLCJsYXllckRhdGEiLCJob3ZlckluZm8iLCJjbGlja2VkIiwibWFwU3RhdGUiLCJzdGF0ZSIsImxheWVyIiwiZGF0YSIsImxheWVySW50ZXJhY3Rpb24iLCJ3cmFwTG9uZ2l0dWRlIiwib2JqZWN0SG92ZXJlZCIsImxheWVyQ2FsbGJhY2tzIiwib25TZXRMYXllckRvbWFpbiIsInZhbCIsIl9vbkxheWVyU2V0RG9tYWluIiwiX3Nob3VsZFJlbmRlckxheWVyIiwibGF5ZXJPdmVybGF5IiwicmVuZGVyTGF5ZXIiLCJsZW5ndGgiLCJjb25jYXQiLCJ2aWV3U3RhdGUiLCJvblZpZXdTdGF0ZUNoYW5nZSIsIm1hcFN0YXRlQWN0aW9ucyIsInVwZGF0ZU1hcCIsIm9mZiIsImRhdGFzZXRzIiwib2JqZWN0SW5mbyIsInRvb2x0aXAiLCJwaWNrZWQiLCJsbmdMYXQiLCJvYmplY3QiLCJvdmVybGF5IiwiY29uZmlnIiwiaXNWaXNpYmxlIiwiZ2V0SG92ZXJEYXRhIiwiaWQiLCJkYXRhSWQiLCJhbGxEYXRhIiwiZmllbGRzIiwidmlld3BvcnQiLCJjb250ZXh0IiwiX2dldEhvdmVyWFkiLCJ4IiwieSIsInBvcG92ZXJQcm9wcyIsImZpZWxkc1RvU2hvdyIsImZyZWV6ZWQiLCJCb29sZWFuIiwib25DbG9zZSIsIl9vbkNsb3NlTWFwUG9wb3ZlciIsInNjcmVlbkNvb3JkIiwicHJvamVjdCIsImlzQXZhaWxhYmxlQW5kVmlzaWJsZSIsInNob3VsZFJlbmRlckxheWVyIiwibWFwU3R5bGUiLCJsYXllck9yZGVyIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJkZWNrR2xMYXllcnMiLCJzbGljZSIsInJldmVyc2UiLCJyZWR1Y2UiLCJfcmVuZGVyTGF5ZXIiLCJ2aXNpYmxlTGF5ZXJHcm91cHMiLCJwdXNoIiwiVGhyZWVEQnVpbGRpbmdMYXllciIsInRocmVlREJ1aWxkaW5nQ29sb3IiLCJfb25XZWJHTEluaXRpYWxpemVkIiwiX29uQmVmb3JlUmVuZGVyIiwib25MYXllckhvdmVyIiwiaXNTdHlsZUxvYWRlZCIsIm1hcGJveExheWVycyIsImZpbmFsIiwiTWFwQ29tcG9uZW50IiwibWFwQ29udHJvbHMiLCJ0b2dnbGVNYXBDb250cm9sIiwib25NYXBDbGljayIsImJvdHRvbU1hcFN0eWxlIiwibWFwUHJvcHMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJvblZpZXdwb3J0Q2hhbmdlIiwiX29uVmlld3BvcnRDaGFuZ2UiLCJ0cmFuc2Zvcm1SZXF1ZXN0IiwiX29uTW91c2VNb3ZlIiwiZHJhZ1JvdGF0ZSIsImlzU3BsaXQiLCJpc0V4cG9ydCIsInNjYWxlIiwidG9nZ2xlUGVyc3BlY3RpdmUiLCJ0b2dnbGVTcGxpdE1hcCIsIl9oYW5kbGVNYXBUb2dnbGVMYXllciIsIl9zZXRNYXBib3hNYXAiLCJ1bmRlZmluZWQiLCJfcmVuZGVyT3ZlcmxheSIsIl9yZW5kZXJNYXBib3hPdmVybGF5cyIsInRvcE1hcFN0eWxlIiwiX3JlbmRlck9iamVjdExheWVyUG9wb3ZlciIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJhcnJheU9mIiwiYW55IiwiZnVuYyIsImJvb2wiLCJvbk1hcFRvZ2dsZUxheWVyIiwiTWFwYm94R0xNYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQUNBOztBQUNBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOztBQUdBOztBQXJDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBTUE7QUFLQTtBQUtBO0FBR0EsSUFBTUEsU0FBUyxHQUFHO0FBQ2hCQyxFQUFBQSxTQUFTLEVBQUU7QUFDVEMsSUFBQUEsT0FBTyxFQUFFLGNBREE7QUFFVEMsSUFBQUEsUUFBUSxFQUFFO0FBRkQsR0FESztBQUtoQkMsRUFBQUEsR0FBRyxFQUFFO0FBQ0hELElBQUFBLFFBQVEsRUFBRSxVQURQO0FBQ21CQyxJQUFBQSxHQUFHLEVBQUUsS0FEeEI7QUFDK0JDLElBQUFBLGFBQWEsRUFBRTtBQUQ5QztBQUxXLENBQWxCO0FBVUEsSUFBTUMscUJBQXFCLEdBQUcsWUFBOUI7QUFDQSxJQUFNQyxlQUFlLEdBQUcsUUFBeEI7QUFDQSxJQUFNQyxtQkFBbUIs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QVEsRUFBRTZGLHNCQUFVbkUsTUFBVixDQUFpQm9FLFVBUlY7QUFTakI1QyxJQUFBQSxRQUFRLEVBQUUyQyxzQkFBVW5FLE1BQVYsQ0FBaUJvRSxVQVRWO0FBVWpCekIsSUFBQUEsV0FBVyxFQUFFd0Isc0JBQVVuRSxNQUFWLENBQWlCb0UsVUFWYjtBQVdqQjFDLElBQUFBLG9CQUFvQixFQUFFeUMsc0JBQVVFLE1BQVYsQ0FBaUJELFVBWHRCO0FBWWpCeEIsSUFBQUEsZ0JBQWdCLEVBQUV1QixzQkFBVUssSUFBVixDQUFlSixVQVpoQjtBQWFqQm5JLElBQUFBLGVBQWUsRUFBRWtJLHNCQUFVbkUsTUFBVixDQUFpQm9FLFVBYmpCO0FBY2pCNUUsSUFBQUEsZUFBZSxFQUFFMkUsc0JBQVVuRSxNQUFWLENBQWlCb0UsVUFkakI7QUFnQmpCO0FBQ0FiLElBQUFBLFFBQVEsRUFBRVksc0JBQVVNLElBakJIO0FBa0JqQnBHLElBQUFBLE9BQU8sRUFBRThGLHNCQUFVbkUsTUFsQkY7QUFtQmpCNUIsSUFBQUEsU0FBUyxFQUFFK0Ysc0JBQVVuRSxNQW5CSjtBQW9CakJ4QyxJQUFBQSxTQUFTLEVBQUUyRyxzQkFBVW5FLE1BcEJKO0FBcUJqQjBFLElBQUFBLGdCQUFnQixFQUFFUCxzQkFBVUssSUFyQlg7QUFzQmpCOUcsSUFBQUEsZ0JBQWdCLEVBQUV5RyxzQkFBVUssSUF0Qlg7QUF1QmpCekcsSUFBQUEsV0FBVyxFQUFFb0csc0JBQVVLLElBdkJOO0FBd0JqQnhHLElBQUFBLFlBQVksRUFBRW1HLHNCQUFVSztBQXhCUCxHQUY2QztBQUFBLG1DQUM1RHpJLFlBRDRELGtCQTZCMUM7QUFDcEIyRyxJQUFBQSxZQUFZLEVBQUVpQztBQURNLEdBN0IwQztBQXFabEUsU0FBTzVJLFlBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIGxpYnJhcmllc1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IE1hcGJveEdMTWFwIGZyb20gJ3JlYWN0LW1hcC1nbCc7XG5pbXBvcnQgRGVja0dMIGZyb20gJ2RlY2suZ2wnO1xuXG4vLyBjb21wb25lbnRzXG5pbXBvcnQgTWFwUG9wb3ZlckZhY3RvcnkgZnJvbSAnY29tcG9uZW50cy9tYXAvbWFwLXBvcG92ZXInO1xuaW1wb3J0IE1hcENvbnRyb2xGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvbWFwL21hcC1jb250cm9sJztcbmltcG9ydCB7U3R5bGVkTWFwQ29udGFpbmVyfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbi8vIHV0aWxzXG5pbXBvcnQge2dlbmVyYXRlTWFwYm94TGF5ZXJzLCB1cGRhdGVNYXBib3hMYXllcnN9IGZyb20gJy4uL2xheWVycy9tYXBib3gtdXRpbHMnO1xuaW1wb3J0IHtvbldlYkdMSW5pdGlhbGl6ZWQsIHNldExheWVyQmxlbmRpbmd9IGZyb20gJ3V0aWxzL2dsLXV0aWxzJztcbmltcG9ydCB7dHJhbnNmb3JtUmVxdWVzdH0gZnJvbSAndXRpbHMvbWFwLXN0eWxlLXV0aWxzL21hcGJveC11dGlscyc7XG5cbi8vIGRlZmF1bHQtc2V0dGluZ3NcbmltcG9ydCBUaHJlZURCdWlsZGluZ0xheWVyIGZyb20gJy4uL2RlY2tnbC1sYXllcnMvM2QtYnVpbGRpbmctbGF5ZXIvM2QtYnVpbGRpbmctbGF5ZXInO1xuXG5jb25zdCBNQVBfU1RZTEUgPSB7XG4gIGNvbnRhaW5lcjoge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gIH0sXG4gIHRvcDoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6ICcwcHgnLCBwb2ludGVyRXZlbnRzOiAnbm9uZSdcbiAgfVxufTtcblxuY29uc3QgTUFQQk9YR0xfU1RZTEVfVVBEQVRFID0gJ3N0eWxlLmxvYWQnO1xuY29uc3QgTUFQQk9YR0xfUkVOREVSID0gJ3JlbmRlcic7XG5jb25zdCBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMDtcblxuTWFwQ29udGFpbmVyRmFjdG9yeS5kZXBzID0gW1xuICBNYXBQb3BvdmVyRmFjdG9yeSwgTWFwQ29udHJvbEZhY3Rvcnlcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE1hcENvbnRhaW5lckZhY3RvcnkoTWFwUG9wb3ZlciwgTWFwQ29udHJvbCkge1xuICBjbGFzcyBNYXBDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAvLyByZXF1aXJlZFxuICAgICAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBpbnRlcmFjdGlvbkNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJCbGVuZGluZzogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJPcmRlcjogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyRGF0YTogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIG1hcFN0YXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdHlsZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgbWFwQ29udHJvbHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICB0b2dnbGVNYXBDb250cm9sOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdmlzU3RhdGVBY3Rpb25zOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBtYXBTdGF0ZUFjdGlvbnM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblxuICAgICAgLy8gb3B0aW9uYWxcbiAgICAgIGlzRXhwb3J0OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIGNsaWNrZWQ6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBob3ZlckluZm86IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBtYXBMYXllcnM6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgICBvbk1hcFRvZ2dsZUxheWVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIG9uTWFwU3R5bGVMb2FkZWQ6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgb25NYXBSZW5kZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgZ2V0TWFwYm94UmVmOiBQcm9wVHlwZXMuZnVuY1xuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgTWFwQ29tcG9uZW50OiBNYXBib3hHTE1hcFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgbW91c2VQb3NpdGlvbjogWzAsIDBdXG4gICAgICB9O1xuICAgICAgdGhpcy5wcmV2aW91c0xheWVycyA9IHtcbiAgICAgICAgLy8gW2xheWVycy5pZF06IG1hcGJveExheWVyQ29uZmlnXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgLy8gdW5iaW5kIG1hcGJveGdsIGV2ZW50IGxpc3RlbmVyXG4gICAgICBpZiAodGhpcy5fbWFwKSB7XG4gICAgICAgIHRoaXMuX21hcC5vZmYoTUFQQk9YR0xfU1RZTEVfVVBEQVRFKTtcbiAgICAgICAgdGhpcy5fbWFwLm9mZihNQVBCT1hHTF9SRU5ERVIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIGNvbXBvbmVudCBwcml2YXRlIGZ1bmN0aW9ucyAqL1xuICAgIF9vbkNsb3NlTWFwUG9wb3ZlciA9ICgpID0+IHtcbiAgICAgIHRoaXMucHJvcHMudmlzU3RhdGVBY3Rpb25zLm9uTGF5ZXJDbGljayhudWxsKTtcbiAgICB9O1xuXG4gICAgX29uTGF5ZXJTZXREb21haW4gPSAoaWR4LCBjb2xvckRvbWFpbikgPT4ge1xuICAgICAgdGhpcy5wcm9wcy52aXNTdGF0ZUFjdGlvbnMubGF5ZXJDb25maWdDaGFuZ2UodGhpcy5wcm9wcy5sYXllcnNbaWR4XSwge1xuICAgICAgICBjb2xvckRvbWFpblxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9vbldlYkdMSW5pdGlhbGl6ZWQgPSBnbCA9PiB7XG4gICAgICBvbldlYkdMSW5pdGlhbGl6ZWQoZ2wpO1xuICAgICAgLy8gYWxsb3cgVWludDMyIGluZGljZXMgaW4gYnVpbGRpbmcgbGF5ZXJcbiAgICAgIC8vIGdsLmdldEV4dGVuc2lvbignT0VTX2VsZW1lbnRfaW5kZXhfdWludCcpO1xuICAgIH07XG5cbiAgICBfb25Nb3VzZU1vdmUgPSBldnQgPT4ge1xuICAgICAgY29uc3Qge2ludGVyYWN0aW9uQ29uZmlnOiB7YnJ1c2h9fSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGlmIChldnQubmF0aXZlRXZlbnQgJiYgYnJ1c2guZW5hYmxlZCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBtb3VzZVBvc2l0aW9uOiBbZXZ0Lm5hdGl2ZUV2ZW50Lm9mZnNldFgsIGV2dC5uYXRpdmVFdmVudC5vZmZzZXRZXVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX2hhbmRsZU1hcFRvZ2dsZUxheWVyID0gbGF5ZXJJZCA9PiB7XG4gICAgICBjb25zdCB7aW5kZXg6IG1hcEluZGV4ID0gMCwgdmlzU3RhdGVBY3Rpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgICB2aXNTdGF0ZUFjdGlvbnMudG9nZ2xlTGF5ZXJGb3JNYXAobWFwSW5kZXgsIGxheWVySWQpO1xuICAgIH07XG5cbiAgICBfb25NYXBib3hTdHlsZVVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIC8vIGZvcmNlIHJlZnJlc2ggbWFwYm94Z2wgbGF5ZXJzXG5cbiAgICAgIHVwZGF0ZU1hcGJveExheWVycyhcbiAgICAgICAgdGhpcy5fbWFwLFxuICAgICAgICB0aGlzLl9yZW5kZXJNYXBib3hMYXllcnMoKSxcbiAgICAgICAgdGhpcy5wcmV2aW91c0xheWVycyxcbiAgICAgICAgdGhpcy5wcm9wcy5tYXBMYXllcnMsXG4gICAgICAgIHtmb3JjZTogdHJ1ZX1cbiAgICAgICk7XG5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbk1hcFN0eWxlTG9hZGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25NYXBTdHlsZUxvYWRlZCh0aGlzLl9tYXApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBfc2V0TWFwYm94TWFwID0gbWFwYm94ID0+IHtcbiAgICAgIGlmICghdGhpcy5fbWFwICYmIG1hcGJveCkge1xuXG4gICAgICAgIHRoaXMuX21hcCA9IG1hcGJveC5nZXRNYXAoKTtcbiAgICAgICAgLy8gaSBub3RpY2VkIGluIGNlcnRhaW4gY29udGV4dCB3ZSBkb24ndCBhY2Nlc3MgdGhlIGFjdHVhbCBtYXAgZWxlbWVudFxuICAgICAgICBpZiAoIXRoaXMuX21hcCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBiaW5kIG1hcGJveGdsIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMuX21hcC5vbihNQVBCT1hHTF9TVFlMRV9VUERBVEUsIHRoaXMuX29uTWFwYm94U3R5bGVVcGRhdGUpO1xuXG4gICAgICAgIHRoaXMuX21hcC5vbihNQVBCT1hHTF9SRU5ERVIsICgpID0+IHtcblxuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbk1hcFJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbk1hcFJlbmRlcih0aGlzLl9tYXApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnByb3BzLmdldE1hcGJveFJlZikge1xuICAgICAgICAvLyBUaGUgcGFyZW50IGNvbXBvbmVudCBjYW4gZ2FpbiBhY2Nlc3MgdG8gb3VyIE1hcGJveEdsTWFwIGJ5XG4gICAgICAgIC8vIHByb3ZpZGluZyB0aGlzIGNhbGxiYWNrLiBOb3RlIHRoYXQgJ21hcGJveCcgd2lsbCBiZSBudWxsIHdoZW4gdGhlXG4gICAgICAgIC8vIHJlZiBpcyB1bnNldCAoZS5nLiB3aGVuIGEgc3BsaXQgbWFwIGlzIGNsb3NlZCkuXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0TWFwYm94UmVmKG1hcGJveCwgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIF9vbkJlZm9yZVJlbmRlciA9ICh7Z2x9KSA9PiB7XG4gICAgICBzZXRMYXllckJsZW5kaW5nKGdsLCB0aGlzLnByb3BzLmxheWVyQmxlbmRpbmcpO1xuICAgIH07XG5cbiAgICAvKiBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9ucyAqL1xuICAgIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgICBfcmVuZGVyT2JqZWN0TGF5ZXJQb3BvdmVyKCkge1xuICAgICAgLy8gVE9ETzogbW92ZSB0aGlzIGludG8gcmVkdWNlciBzbyBpdCBjYW4gYmUgdGVzdGVkXG4gICAgICBjb25zdCB7XG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBob3ZlckluZm8sXG4gICAgICAgIGNsaWNrZWQsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBtYXBMYXllcnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAvLyBpZiBjbGlja2VkIHNvbWV0aGluZywgaWdub3JlIGhvdmVyIGJlaGF2aW9yXG4gICAgICBjb25zdCBvYmplY3RJbmZvID0gY2xpY2tlZCB8fCBob3ZlckluZm87XG4gICAgICBpZiAoXG4gICAgICAgICFpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmVuYWJsZWQgfHxcbiAgICAgICAgIW9iamVjdEluZm8gfHxcbiAgICAgICAgIW9iamVjdEluZm8ucGlja2VkXG4gICAgICApIHtcbiAgICAgICAgLy8gbm90aGluZyBob3ZlcmVkXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7bG5nTGF0LCBvYmplY3QsIGxheWVyOiBvdmVybGF5fSA9IG9iamVjdEluZm87XG5cbiAgICAgIC8vIGRlY2tnbCBsYXllciB0byBrZXBsZXItZ2wgbGF5ZXJcbiAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW292ZXJsYXkucHJvcHMuaWR4XTtcblxuICAgICAgaWYgKFxuICAgICAgICAhbGF5ZXIgfHxcbiAgICAgICAgIWxheWVyLmNvbmZpZy5pc1Zpc2libGUgfHxcbiAgICAgICAgIW9iamVjdCB8fFxuICAgICAgICAhbGF5ZXIuZ2V0SG92ZXJEYXRhIHx8XG4gICAgICAgIChtYXBMYXllcnMgJiYgIW1hcExheWVyc1tsYXllci5pZF0uaXNWaXNpYmxlKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGxheWVyIGlzIG5vdCB2aXNpYmxlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7Y29uZmlnOiB7ZGF0YUlkfX0gPSBsYXllcjtcbiAgICAgIGNvbnN0IHthbGxEYXRhLCBmaWVsZHN9ID0gZGF0YXNldHNbZGF0YUlkXTtcbiAgICAgIGNvbnN0IGRhdGEgPSBsYXllci5nZXRIb3ZlckRhdGEob2JqZWN0LCBhbGxEYXRhKTtcblxuICAgICAgLy8gcHJvamVjdCBsbmdsYXQgdG8gc2NyZWVuIHNvIHRoYXQgdG9vbHRpcCBmb2xsb3dzIHRoZSBvYmplY3Qgb24gem9vbVxuICAgICAgY29uc3Qge3ZpZXdwb3J0fSA9IG92ZXJsYXkuY29udGV4dDtcbiAgICAgIGNvbnN0IHt4LCB5fSA9IHRoaXMuX2dldEhvdmVyWFkodmlld3BvcnQsIGxuZ0xhdCkgfHwgb2JqZWN0SW5mbztcblxuICAgICAgY29uc3QgcG9wb3ZlclByb3BzID0ge1xuICAgICAgICBkYXRhLFxuICAgICAgICBmaWVsZHMsXG4gICAgICAgIGZpZWxkc1RvU2hvdzogaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF0sXG4gICAgICAgIGxheWVyLFxuICAgICAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIGZyZWV6ZWQ6IEJvb2xlYW4oY2xpY2tlZCksXG4gICAgICAgIG9uQ2xvc2U6IHRoaXMuX29uQ2xvc2VNYXBQb3BvdmVyLFxuICAgICAgICBtYXBTdGF0ZVxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8TWFwUG9wb3ZlciB7Li4ucG9wb3ZlclByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbiAgICBfZ2V0SG92ZXJYWSh2aWV3cG9ydCwgbG5nTGF0KSB7XG4gICAgICBjb25zdCBzY3JlZW5Db29yZCA9ICF2aWV3cG9ydCB8fCAhbG5nTGF0ID8gbnVsbCA6IHZpZXdwb3J0LnByb2plY3QobG5nTGF0KTtcblxuICAgICAgcmV0dXJuIHNjcmVlbkNvb3JkICYmIHt4OiBzY3JlZW5Db29yZFswXSwgeTogc2NyZWVuQ29vcmRbMV19O1xuICAgIH1cblxuICAgIF9zaG91bGRSZW5kZXJMYXllcihsYXllciwgZGF0YSwgbWFwTGF5ZXJzKSB7XG4gICAgICBjb25zdCBpc0F2YWlsYWJsZUFuZFZpc2libGUgPVxuICAgICAgICAhKG1hcExheWVycyAmJiBtYXBMYXllcnNbbGF5ZXIuaWRdKSB8fCBtYXBMYXllcnNbbGF5ZXIuaWRdLmlzVmlzaWJsZTtcbiAgICAgIHJldHVybiBsYXllci5zaG91bGRSZW5kZXJMYXllcihkYXRhKSAmJiBpc0F2YWlsYWJsZUFuZFZpc2libGU7XG4gICAgfVxuXG4gICAgX3JlbmRlckxheWVyID0gKG92ZXJsYXlzLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGF5ZXJzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZCxcbiAgICAgICAgbWFwTGF5ZXJzLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWdcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge21vdXNlUG9zaXRpb259ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IGxheWVyID0gbGF5ZXJzW2lkeF07XG4gICAgICBjb25zdCBkYXRhID0gbGF5ZXJEYXRhW2lkeF07XG5cbiAgICAgIGNvbnN0IGxheWVySW50ZXJhY3Rpb24gPSB7XG4gICAgICAgIG1vdXNlUG9zaXRpb24sXG4gICAgICAgIHdyYXBMb25naXR1ZGU6IHRydWVcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG9iamVjdEhvdmVyZWQgPSBjbGlja2VkIHx8IGhvdmVySW5mbztcbiAgICAgIGNvbnN0IGxheWVyQ2FsbGJhY2tzID0ge1xuICAgICAgICBvblNldExheWVyRG9tYWluOiB2YWwgPT4gdGhpcy5fb25MYXllclNldERvbWFpbihpZHgsIHZhbClcbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5fc2hvdWxkUmVuZGVyTGF5ZXIobGF5ZXIsIGRhdGEsIG1hcExheWVycykpIHtcbiAgICAgICAgcmV0dXJuIG92ZXJsYXlzO1xuICAgICAgfVxuXG4gICAgICBsZXQgbGF5ZXJPdmVybGF5ID0gW107XG5cbiAgICAgIC8vIExheWVyIGlzIExheWVyIGNsYXNzXG4gICAgICBpZiAodHlwZW9mIGxheWVyLnJlbmRlckxheWVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGxheWVyT3ZlcmxheSA9IGxheWVyLnJlbmRlckxheWVyKHtcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIGlkeCxcbiAgICAgICAgICBsYXllckludGVyYWN0aW9uLFxuICAgICAgICAgIG9iamVjdEhvdmVyZWQsXG4gICAgICAgICAgbWFwU3RhdGUsXG4gICAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgICAgbGF5ZXJDYWxsYmFja3NcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsYXllck92ZXJsYXkubGVuZ3RoKSB7XG4gICAgICAgIG92ZXJsYXlzID0gb3ZlcmxheXMuY29uY2F0KGxheWVyT3ZlcmxheSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3ZlcmxheXM7XG4gICAgfTtcblxuICAgIF9yZW5kZXJPdmVybGF5KCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIGxheWVyRGF0YSxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlblxuICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgIGxldCBkZWNrR2xMYXllcnMgPSBbXTtcblxuICAgICAgLy8gd2FpdCB1bnRpbCBkYXRhIGlzIHJlYWR5IGJlZm9yZSByZW5kZXIgZGF0YSBsYXllcnNcbiAgICAgIGlmIChsYXllckRhdGEgJiYgbGF5ZXJEYXRhLmxlbmd0aCkge1xuICAgICAgICAvLyBsYXN0IGxheWVyIHJlbmRlciBmaXJzdFxuICAgICAgICBkZWNrR2xMYXllcnMgPSBsYXllck9yZGVyXG4gICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgLnJlZHVjZSh0aGlzLl9yZW5kZXJMYXllciwgW10pO1xuICAgICAgfVxuXG4gICAgICBpZiAobWFwU3R5bGUudmlzaWJsZUxheWVyR3JvdXBzWyczZCBidWlsZGluZyddKSB7XG4gICAgICAgIGRlY2tHbExheWVycy5wdXNoKG5ldyBUaHJlZURCdWlsZGluZ0xheWVyKHtcbiAgICAgICAgICBpZDogJ19rZXBsZXJnbF8zZC1idWlsZGluZycsXG4gICAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgICAgdGhyZWVEQnVpbGRpbmdDb2xvcjogbWFwU3R5bGUudGhyZWVEQnVpbGRpbmdDb2xvclxuICAgICAgICB9KSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxEZWNrR0xcbiAgICAgICAgICB2aWV3U3RhdGU9e21hcFN0YXRlfVxuICAgICAgICAgIGlkPVwiZGVmYXVsdC1kZWNrZ2wtb3ZlcmxheVwiXG4gICAgICAgICAgbGF5ZXJzPXtkZWNrR2xMYXllcnN9XG4gICAgICAgICAgb25XZWJHTEluaXRpYWxpemVkPXt0aGlzLl9vbldlYkdMSW5pdGlhbGl6ZWR9XG4gICAgICAgICAgb25CZWZvcmVSZW5kZXI9e3RoaXMuX29uQmVmb3JlUmVuZGVyfVxuICAgICAgICAgIG9uTGF5ZXJIb3Zlcj17dmlzU3RhdGVBY3Rpb25zLm9uTGF5ZXJIb3Zlcn1cbiAgICAgICAgICBvbkxheWVyQ2xpY2s9e3Zpc1N0YXRlQWN0aW9ucy5vbkxheWVyQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIF9yZW5kZXJNYXBib3hMYXllcnMoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBsYXllck9yZGVyXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgcmV0dXJuIGdlbmVyYXRlTWFwYm94TGF5ZXJzKGxheWVycywgbGF5ZXJEYXRhLCBsYXllck9yZGVyKTtcbiAgICB9XG5cbiAgICBfcmVuZGVyTWFwYm94T3ZlcmxheXMoKSB7XG4gICAgICBpZiAodGhpcy5fbWFwICYmIHRoaXMuX21hcC5pc1N0eWxlTG9hZGVkKCkpIHtcblxuICAgICAgICBjb25zdCBtYXBib3hMYXllcnMgPSB0aGlzLl9yZW5kZXJNYXBib3hMYXllcnMoKTtcblxuICAgICAgICB1cGRhdGVNYXBib3hMYXllcnMoXG4gICAgICAgICAgdGhpcy5fbWFwLFxuICAgICAgICAgIG1hcGJveExheWVycyxcbiAgICAgICAgICB0aGlzLnByZXZpb3VzTGF5ZXJzLFxuICAgICAgICAgIHRoaXMucHJvcHMubWFwTGF5ZXJzXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5wcmV2aW91c0xheWVycyA9IG1hcGJveExheWVycy5yZWR1Y2UoKGZpbmFsLCBsYXllcikgPT4gKHtcbiAgICAgICAgICAuLi5maW5hbCxcbiAgICAgICAgICBbbGF5ZXIuaWRdOiBsYXllci5jb25maWdcbiAgICAgICAgfSksIHt9KVxuICAgICAgfVxuICAgIH1cblxuICAgIF9vblZpZXdwb3J0Q2hhbmdlID0gKHZpZXdTdGF0ZSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BzLm9uVmlld1N0YXRlQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25WaWV3U3RhdGVDaGFuZ2Uodmlld1N0YXRlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJvcHMubWFwU3RhdGVBY3Rpb25zLnVwZGF0ZU1hcCh2aWV3U3RhdGUpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFwU3RhdGUsIG1hcFN0eWxlLCBtYXBTdGF0ZUFjdGlvbnMsIG1hcExheWVycywgbGF5ZXJzLCBNYXBDb21wb25lbnQsXG4gICAgICAgIGRhdGFzZXRzLCBtYXBib3hBcGlBY2Nlc3NUb2tlbiwgbWFwQ29udHJvbHMsIHRvZ2dsZU1hcENvbnRyb2xcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3Qge29uTWFwQ2xpY2t9ID0gbWFwU3RhdGVBY3Rpb25zO1xuXG4gICAgICBpZiAoIW1hcFN0eWxlLmJvdHRvbU1hcFN0eWxlKSB7XG4gICAgICAgIC8vIHN0eWxlIG5vdCB5ZXQgbG9hZGVkXG4gICAgICAgIHJldHVybiA8ZGl2Lz47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcFByb3BzID0ge1xuICAgICAgICAuLi5tYXBTdGF0ZSxcbiAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlLFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgb25WaWV3cG9ydENoYW5nZTogdGhpcy5fb25WaWV3cG9ydENoYW5nZSxcbiAgICAgICAgdHJhbnNmb3JtUmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFN0eWxlZE1hcENvbnRhaW5lciBzdHlsZT17TUFQX1NUWUxFLmNvbnRhaW5lcn0gb25Nb3VzZU1vdmU9e3RoaXMuX29uTW91c2VNb3ZlfT5cbiAgICAgICAgICA8TWFwQ29udHJvbFxuICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgZHJhZ1JvdGF0ZT17bWFwU3RhdGUuZHJhZ1JvdGF0ZX1cbiAgICAgICAgICAgIGlzU3BsaXQ9e21hcFN0YXRlLmlzU3BsaXR9XG4gICAgICAgICAgICBpc0V4cG9ydD17dGhpcy5wcm9wcy5pc0V4cG9ydH1cbiAgICAgICAgICAgIGxheWVycz17bGF5ZXJzfVxuICAgICAgICAgICAgbWFwSW5kZXg9e3RoaXMucHJvcHMuaW5kZXh9XG4gICAgICAgICAgICBtYXBMYXllcnM9e21hcExheWVyc31cbiAgICAgICAgICAgIG1hcENvbnRyb2xzPXttYXBDb250cm9sc31cbiAgICAgICAgICAgIHNjYWxlPXttYXBTdGF0ZS5zY2FsZSB8fCAxfVxuICAgICAgICAgICAgdG9wPXswfVxuICAgICAgICAgICAgb25Ub2dnbGVQZXJzcGVjdGl2ZT17bWFwU3RhdGVBY3Rpb25zLnRvZ2dsZVBlcnNwZWN0aXZlfVxuICAgICAgICAgICAgb25Ub2dnbGVTcGxpdE1hcD17bWFwU3RhdGVBY3Rpb25zLnRvZ2dsZVNwbGl0TWFwfVxuICAgICAgICAgICAgb25NYXBUb2dnbGVMYXllcj17dGhpcy5faGFuZGxlTWFwVG9nZ2xlTGF5ZXJ9XG4gICAgICAgICAgICBvblRvZ2dsZU1hcENvbnRyb2w9e3RvZ2dsZU1hcENvbnRyb2x9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8TWFwQ29tcG9uZW50XG4gICAgICAgICAgICB7Li4ubWFwUHJvcHN9XG4gICAgICAgICAgICBrZXk9XCJib3R0b21cIlxuICAgICAgICAgICAgcmVmPXt0aGlzLl9zZXRNYXBib3hNYXB9XG4gICAgICAgICAgICBtYXBTdHlsZT17bWFwU3R5bGUuYm90dG9tTWFwU3R5bGV9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbk1hcENsaWNrfVxuICAgICAgICAgICAgZ2V0Q3Vyc29yPXt0aGlzLnByb3BzLmhvdmVySW5mbyA/ICgpID0+ICdwb2ludGVyJyA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbj17VFJBTlNJVElPTl9EVVJBVElPTn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGhpcy5fcmVuZGVyT3ZlcmxheSgpfVxuICAgICAgICAgICAge3RoaXMuX3JlbmRlck1hcGJveE92ZXJsYXlzKCl9XG4gICAgICAgICAgPC9NYXBDb21wb25lbnQ+XG4gICAgICAgICAge21hcFN0eWxlLnRvcE1hcFN0eWxlICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e01BUF9TVFlMRS50b3B9PlxuICAgICAgICAgICAgICA8TWFwQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgey4uLm1hcFByb3BzfVxuICAgICAgICAgICAgICAgIGtleT1cInRvcFwiXG4gICAgICAgICAgICAgICAgbWFwU3R5bGU9e21hcFN0eWxlLnRvcE1hcFN0eWxlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7dGhpcy5fcmVuZGVyT2JqZWN0TGF5ZXJQb3BvdmVyKCl9XG4gICAgICAgIDwvU3R5bGVkTWFwQ29udGFpbmVyPlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTWFwQ29udGFpbmVyO1xufVxuIl19