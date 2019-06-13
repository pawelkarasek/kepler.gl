"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _core = require("@deck.gl/core");

var _experimentalLayers = require("@deck.gl/experimental-layers");

var _dBuildingUtils = require("./3d-building-utils");

var _layers = require("@deck.gl/layers");

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
var ThreeDBuildingLayer =
/*#__PURE__*/
function (_CompositeLayer) {
  (0, _inherits2["default"])(ThreeDBuildingLayer, _CompositeLayer);

  function ThreeDBuildingLayer() {
    (0, _classCallCheck2["default"])(this, ThreeDBuildingLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ThreeDBuildingLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(ThreeDBuildingLayer, [{
    key: "renderSubLayers",
    // this layer add its subLayers to the redux store, and push sample data
    value: function renderSubLayers(props) {
      return new _layers._SolidPolygonLayer((0, _objectSpread2["default"])({}, props, {
        parameter: {
          blendFunc: ['SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA', 'ONE', 'ONE_MINUS_SRC_ALPHA'],
          blendEquation: ['FUNC_ADD', 'FUNC_ADD']
        },
        extruded: true,
        opacity: 1,
        filled: true,
        getElevation: function getElevation(feature) {
          return feature.properties.height || 0;
        },
        getPolygon: function getPolygon(feature) {
          return feature.coordinates;
        },
        getFillColor: this.props.threeDBuildingColor,
        lightSetting: {
          ambientRatio: 0.2
        }
      }));
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      var _this = this;

      return [new _experimentalLayers.TileLayer({
        getTileData: function getTileData(args) {
          return (0, _dBuildingUtils.getTileData)(_this.props.mapboxApiAccessToken, args);
        },
        minZoom: 13,
        renderSubLayers: this.renderSubLayers.bind(this)
      })];
    }
  }]);
  return ThreeDBuildingLayer;
}(_core.CompositeLayer);

exports["default"] = ThreeDBuildingLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzLzNkLWJ1aWxkaW5nLWxheWVyLzNkLWJ1aWxkaW5nLWxheWVyLmpzIl0sIm5hbWVzIjpbIlRocmVlREJ1aWxkaW5nTGF5ZXIiLCJwcm9wcyIsIlNvbGlkUG9seWdvbkxheWVyIiwicGFyYW1ldGVyIiwiYmxlbmRGdW5jIiwiYmxlbmRFcXVhdGlvbiIsImV4dHJ1ZGVkIiwib3BhY2l0eSIsImZpbGxlZCIsImdldEVsZXZhdGlvbiIsImZlYXR1cmUiLCJwcm9wZXJ0aWVzIiwiaGVpZ2h0IiwiZ2V0UG9seWdvbiIsImNvb3JkaW5hdGVzIiwiZ2V0RmlsbENvbG9yIiwidGhyZWVEQnVpbGRpbmdDb2xvciIsImxpZ2h0U2V0dGluZyIsImFtYmllbnRSYXRpbyIsIkRlY2tHTFRpbGVMYXllciIsImdldFRpbGVEYXRhIiwiYXJncyIsIm1hcGJveEFwaUFjY2Vzc1Rva2VuIiwibWluWm9vbSIsInJlbmRlclN1YkxheWVycyIsImJpbmQiLCJDb21wb3NpdGVMYXllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQU9xQkEsbUI7Ozs7Ozs7Ozs7OztBQUNuQjtvQ0FFZ0JDLEssRUFBTztBQUNyQixhQUFPLElBQUlDLDBCQUFKLG9DQUNGRCxLQURFO0FBRUxFLFFBQUFBLFNBQVMsRUFBRTtBQUNUQyxVQUFBQSxTQUFTLEVBQUUsQ0FDVCxXQURTLEVBRVQscUJBRlMsRUFHVCxLQUhTLEVBSVQscUJBSlMsQ0FERjtBQU9UQyxVQUFBQSxhQUFhLEVBQUUsQ0FBQyxVQUFELEVBQWEsVUFBYjtBQVBOLFNBRk47QUFXTEMsUUFBQUEsUUFBUSxFQUFFLElBWEw7QUFZTEMsUUFBQUEsT0FBTyxFQUFFLENBWko7QUFhTEMsUUFBQUEsTUFBTSxFQUFFLElBYkg7QUFjTEMsUUFBQUEsWUFBWSxFQUFFLHNCQUFDQyxPQUFEO0FBQUEsaUJBQWFBLE9BQU8sQ0FBQ0MsVUFBUixDQUFtQkMsTUFBbkIsSUFBNkIsQ0FBMUM7QUFBQSxTQWRUO0FBZUxDLFFBQUFBLFVBQVUsRUFBRSxvQkFBQ0gsT0FBRDtBQUFBLGlCQUFhQSxPQUFPLENBQUNJLFdBQXJCO0FBQUEsU0FmUDtBQWdCTEMsUUFBQUEsWUFBWSxFQUFFLEtBQUtkLEtBQUwsQ0FBV2UsbUJBaEJwQjtBQWlCTEMsUUFBQUEsWUFBWSxFQUFFO0FBQ1pDLFVBQUFBLFlBQVksRUFBRTtBQURGO0FBakJULFNBQVA7QUFxQkQ7OzttQ0FFYztBQUFBOztBQUViLGFBQU8sQ0FDTCxJQUFJQyw2QkFBSixDQUFvQjtBQUNsQkMsUUFBQUEsV0FBVyxFQUFFLHFCQUFDQyxJQUFEO0FBQUEsaUJBQVUsaUNBQVksS0FBSSxDQUFDcEIsS0FBTCxDQUFXcUIsb0JBQXZCLEVBQTZDRCxJQUE3QyxDQUFWO0FBQUEsU0FESztBQUVsQkUsUUFBQUEsT0FBTyxFQUFFLEVBRlM7QUFHbEJDLFFBQUFBLGVBQWUsRUFBRSxLQUFLQSxlQUFMLENBQXFCQyxJQUFyQixDQUEwQixJQUExQjtBQUhDLE9BQXBCLENBREssQ0FBUDtBQU9EOzs7RUFwQzhDQyxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Q29tcG9zaXRlTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2NvcmUnO1xuaW1wb3J0IHtUaWxlTGF5ZXIgYXMgRGVja0dMVGlsZUxheWVyfSBmcm9tICdAZGVjay5nbC9leHBlcmltZW50YWwtbGF5ZXJzJztcbmltcG9ydCB7Z2V0VGlsZURhdGF9IGZyb20gJy4vM2QtYnVpbGRpbmctdXRpbHMnO1xuaW1wb3J0IHtfU29saWRQb2x5Z29uTGF5ZXIgYXMgU29saWRQb2x5Z29uTGF5ZXJ9IGZyb20gJ0BkZWNrLmdsL2xheWVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlREJ1aWxkaW5nTGF5ZXIgZXh0ZW5kcyBDb21wb3NpdGVMYXllciB7XG4gIC8vIHRoaXMgbGF5ZXIgYWRkIGl0cyBzdWJMYXllcnMgdG8gdGhlIHJlZHV4IHN0b3JlLCBhbmQgcHVzaCBzYW1wbGUgZGF0YVxuXG4gIHJlbmRlclN1YkxheWVycyhwcm9wcykge1xuICAgIHJldHVybiBuZXcgU29saWRQb2x5Z29uTGF5ZXIoe1xuICAgICAgLi4ucHJvcHMsXG4gICAgICBwYXJhbWV0ZXI6IHtcbiAgICAgICAgYmxlbmRGdW5jOiBbXG4gICAgICAgICAgJ1NSQ19BTFBIQScsXG4gICAgICAgICAgJ09ORV9NSU5VU19TUkNfQUxQSEEnLFxuICAgICAgICAgICdPTkUnLFxuICAgICAgICAgICdPTkVfTUlOVVNfU1JDX0FMUEhBJ1xuICAgICAgICBdLFxuICAgICAgICBibGVuZEVxdWF0aW9uOiBbJ0ZVTkNfQUREJywgJ0ZVTkNfQUREJ11cbiAgICAgIH0sXG4gICAgICBleHRydWRlZDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBmaWxsZWQ6IHRydWUsXG4gICAgICBnZXRFbGV2YXRpb246IChmZWF0dXJlKSA9PiBmZWF0dXJlLnByb3BlcnRpZXMuaGVpZ2h0IHx8IDAsXG4gICAgICBnZXRQb2x5Z29uOiAoZmVhdHVyZSkgPT4gZmVhdHVyZS5jb29yZGluYXRlcyxcbiAgICAgIGdldEZpbGxDb2xvcjogdGhpcy5wcm9wcy50aHJlZURCdWlsZGluZ0NvbG9yLFxuICAgICAgbGlnaHRTZXR0aW5nOiB7XG4gICAgICAgIGFtYmllbnRSYXRpbzogMC4yXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJMYXllcnMoKSB7XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IERlY2tHTFRpbGVMYXllcih7XG4gICAgICAgIGdldFRpbGVEYXRhOiAoYXJncykgPT4gZ2V0VGlsZURhdGEodGhpcy5wcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbiwgYXJncyksXG4gICAgICAgIG1pblpvb206IDEzLFxuICAgICAgICByZW5kZXJTdWJMYXllcnM6IHRoaXMucmVuZGVyU3ViTGF5ZXJzLmJpbmQodGhpcylcbiAgICAgIH0pXG4gICAgXTtcbiAgfVxufVxuIl19