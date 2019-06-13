"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _deck = require("deck.gl");

var _shaderUtils = require("../layer-utils/shader-utils");

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
var defaultProps = (0, _objectSpread2["default"])({}, _deck.ArcLayer.defaultProps, {
  // show arc if source is in brush
  brushSource: true,
  // show arc if target is in brush
  brushTarget: true,
  enableBrushing: true,
  getStrokeWidth: function getStrokeWidth(d) {
    return d.strokeWidth;
  },
  strokeScale: 1,
  // brush radius in meters
  brushRadius: 100000,
  mousePosition: [0, 0]
});

function addBrushingVsShader(vs) {
  return (0, _shaderUtils.editShader)(vs, 'arc brushing vs', 'vec2 offset = getExtrusionOffset((next.xy - curr.xy) * indexDir, positions.y);', 'vec2 offset = brushing_getExtrusionOffset((next.xy - curr.xy) * indexDir, positions.y, project_uViewportSize, instancePositions, instanceWidths);');
}

function addBrushingVs64Shader(vs) {
  return (0, _shaderUtils.editShader)(vs, 'arc brushing vs64', 'vec2 offset = getExtrusionOffset(next_pos_clipspace.xy - curr_pos_clipspace.xy, positions.y);', 'vec2 offset = brushing_getExtrusionOffset(next_pos_clipspace.xy - curr_pos_clipspace.xy, positions.y, project_uViewportSize, instancePositions, instanceWidths);');
}

var ArcBrushingLayer =
/*#__PURE__*/
function (_ArcLayer) {
  (0, _inherits2["default"])(ArcBrushingLayer, _ArcLayer);

  function ArcBrushingLayer() {
    (0, _classCallCheck2["default"])(this, ArcBrushingLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ArcBrushingLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(ArcBrushingLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ArcBrushingLayer.prototype), "getShaders", this).call(this);
      return {
        vs: this.is64bitEnabled() ? addBrushingVs64Shader(shaders.vs) : addBrushingVsShader(shaders.vs),
        fs: shaders.fs,
        modules: shaders.modules.concat(['brushing'])
      };
    }
  }, {
    key: "draw",
    value: function draw(opts) {
      var uniforms = opts.uniforms;
      var _this$props = this.props,
          brushSource = _this$props.brushSource,
          brushTarget = _this$props.brushTarget,
          brushRadius = _this$props.brushRadius,
          enableBrushing = _this$props.enableBrushing,
          mousePosition = _this$props.mousePosition,
          strokeScale = _this$props.strokeScale;
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(ArcBrushingLayer.prototype), "draw", this).call(this, (0, _objectSpread2["default"])({}, opts, {
        uniforms: (0, _objectSpread2["default"])({}, uniforms, {
          brushing_uBrushSource: brushSource ? 1 : 0,
          brushing_uBrushTarget: brushTarget ? 1 : 0,
          brushing_uBrushRadius: brushRadius,
          brushing_uEnableBrushing: enableBrushing ? 1 : 0,
          brushing_uStrokeScale: strokeScale,
          brushing_uMousePosition: mousePosition ? new Float32Array(this.unproject(mousePosition)) : defaultProps.mousePosition
        })
      }));
    }
  }]);
  return ArcBrushingLayer;
}(_deck.ArcLayer);

exports["default"] = ArcBrushingLayer;
ArcBrushingLayer.layerName = 'ArcBrushingLayer';
ArcBrushingLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2FyYy1icnVzaGluZy1sYXllci9hcmMtYnJ1c2hpbmctbGF5ZXIuanMiXSwibmFtZXMiOlsiZGVmYXVsdFByb3BzIiwiQXJjTGF5ZXIiLCJicnVzaFNvdXJjZSIsImJydXNoVGFyZ2V0IiwiZW5hYmxlQnJ1c2hpbmciLCJnZXRTdHJva2VXaWR0aCIsImQiLCJzdHJva2VXaWR0aCIsInN0cm9rZVNjYWxlIiwiYnJ1c2hSYWRpdXMiLCJtb3VzZVBvc2l0aW9uIiwiYWRkQnJ1c2hpbmdWc1NoYWRlciIsInZzIiwiYWRkQnJ1c2hpbmdWczY0U2hhZGVyIiwiQXJjQnJ1c2hpbmdMYXllciIsInNoYWRlcnMiLCJpczY0Yml0RW5hYmxlZCIsImZzIiwibW9kdWxlcyIsImNvbmNhdCIsIm9wdHMiLCJ1bmlmb3JtcyIsInByb3BzIiwiYnJ1c2hpbmdfdUJydXNoU291cmNlIiwiYnJ1c2hpbmdfdUJydXNoVGFyZ2V0IiwiYnJ1c2hpbmdfdUJydXNoUmFkaXVzIiwiYnJ1c2hpbmdfdUVuYWJsZUJydXNoaW5nIiwiYnJ1c2hpbmdfdVN0cm9rZVNjYWxlIiwiYnJ1c2hpbmdfdU1vdXNlUG9zaXRpb24iLCJGbG9hdDMyQXJyYXkiLCJ1bnByb2plY3QiLCJsYXllck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQXJCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBLElBQU1BLFlBQVksc0NBQ2JDLGVBQVNELFlBREk7QUFFaEI7QUFDQUUsRUFBQUEsV0FBVyxFQUFFLElBSEc7QUFJaEI7QUFDQUMsRUFBQUEsV0FBVyxFQUFFLElBTEc7QUFNaEJDLEVBQUFBLGNBQWMsRUFBRSxJQU5BO0FBT2hCQyxFQUFBQSxjQUFjLEVBQUUsd0JBQUFDLENBQUM7QUFBQSxXQUFJQSxDQUFDLENBQUNDLFdBQU47QUFBQSxHQVBEO0FBUWhCQyxFQUFBQSxXQUFXLEVBQUUsQ0FSRztBQVNoQjtBQUNBQyxFQUFBQSxXQUFXLEVBQUUsTUFWRztBQVdoQkMsRUFBQUEsYUFBYSxFQUFFLENBQUMsQ0FBRCxFQUFJLENBQUo7QUFYQyxFQUFsQjs7QUFjQSxTQUFTQyxtQkFBVCxDQUE2QkMsRUFBN0IsRUFBaUM7QUFDL0IsU0FBTyw2QkFDTEEsRUFESyxFQUVMLGlCQUZLLEVBR0wsZ0ZBSEssRUFJTCxtSkFKSyxDQUFQO0FBTUQ7O0FBRUQsU0FBU0MscUJBQVQsQ0FBK0JELEVBQS9CLEVBQW1DO0FBQ2pDLFNBQU8sNkJBQ0xBLEVBREssRUFFTCxtQkFGSyxFQUdMLCtGQUhLLEVBSUwsa0tBSkssQ0FBUDtBQU1EOztJQUVvQkUsZ0I7Ozs7Ozs7Ozs7OztpQ0FDTjtBQUNYLFVBQU1DLE9BQU8scUhBQWI7QUFDQSxhQUFPO0FBQ0xILFFBQUFBLEVBQUUsRUFBRSxLQUFLSSxjQUFMLEtBQ0FILHFCQUFxQixDQUFDRSxPQUFPLENBQUNILEVBQVQsQ0FEckIsR0FFQUQsbUJBQW1CLENBQUNJLE9BQU8sQ0FBQ0gsRUFBVCxDQUhsQjtBQUlMSyxRQUFBQSxFQUFFLEVBQUVGLE9BQU8sQ0FBQ0UsRUFKUDtBQUtMQyxRQUFBQSxPQUFPLEVBQUVILE9BQU8sQ0FBQ0csT0FBUixDQUFnQkMsTUFBaEIsQ0FBdUIsQ0FBQyxVQUFELENBQXZCO0FBTEosT0FBUDtBQU9EOzs7eUJBRUlDLEksRUFBTTtBQUFBLFVBQ0ZDLFFBREUsR0FDVUQsSUFEVixDQUNGQyxRQURFO0FBQUEsd0JBVUwsS0FBS0MsS0FWQTtBQUFBLFVBSVBwQixXQUpPLGVBSVBBLFdBSk87QUFBQSxVQUtQQyxXQUxPLGVBS1BBLFdBTE87QUFBQSxVQU1QTSxXQU5PLGVBTVBBLFdBTk87QUFBQSxVQU9QTCxjQVBPLGVBT1BBLGNBUE87QUFBQSxVQVFQTSxhQVJPLGVBUVBBLGFBUk87QUFBQSxVQVNQRixXQVRPLGVBU1BBLFdBVE87QUFZVCxzSkFDS1ksSUFETDtBQUVFQyxRQUFBQSxRQUFRLHFDQUNIQSxRQURHO0FBRU5FLFVBQUFBLHFCQUFxQixFQUFFckIsV0FBVyxHQUFHLENBQUgsR0FBTyxDQUZuQztBQUdOc0IsVUFBQUEscUJBQXFCLEVBQUVyQixXQUFXLEdBQUcsQ0FBSCxHQUFPLENBSG5DO0FBSU5zQixVQUFBQSxxQkFBcUIsRUFBRWhCLFdBSmpCO0FBS05pQixVQUFBQSx3QkFBd0IsRUFBRXRCLGNBQWMsR0FBRyxDQUFILEdBQU8sQ0FMekM7QUFNTnVCLFVBQUFBLHFCQUFxQixFQUFFbkIsV0FOakI7QUFPTm9CLFVBQUFBLHVCQUF1QixFQUFFbEIsYUFBYSxHQUNsQyxJQUFJbUIsWUFBSixDQUFpQixLQUFLQyxTQUFMLENBQWVwQixhQUFmLENBQWpCLENBRGtDLEdBRWxDVixZQUFZLENBQUNVO0FBVFg7QUFGVjtBQWNEOzs7RUF0QzJDVCxjOzs7QUF5QzlDYSxnQkFBZ0IsQ0FBQ2lCLFNBQWpCLEdBQTZCLGtCQUE3QjtBQUNBakIsZ0JBQWdCLENBQUNkLFlBQWpCLEdBQWdDQSxZQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7QXJjTGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IHtlZGl0U2hhZGVyfSBmcm9tICdkZWNrZ2wtbGF5ZXJzL2xheWVyLXV0aWxzL3NoYWRlci11dGlscyc7XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgLi4uQXJjTGF5ZXIuZGVmYXVsdFByb3BzLFxuICAvLyBzaG93IGFyYyBpZiBzb3VyY2UgaXMgaW4gYnJ1c2hcbiAgYnJ1c2hTb3VyY2U6IHRydWUsXG4gIC8vIHNob3cgYXJjIGlmIHRhcmdldCBpcyBpbiBicnVzaFxuICBicnVzaFRhcmdldDogdHJ1ZSxcbiAgZW5hYmxlQnJ1c2hpbmc6IHRydWUsXG4gIGdldFN0cm9rZVdpZHRoOiBkID0+IGQuc3Ryb2tlV2lkdGgsXG4gIHN0cm9rZVNjYWxlOiAxLFxuICAvLyBicnVzaCByYWRpdXMgaW4gbWV0ZXJzXG4gIGJydXNoUmFkaXVzOiAxMDAwMDAsXG4gIG1vdXNlUG9zaXRpb246IFswLCAwXVxufTtcblxuZnVuY3Rpb24gYWRkQnJ1c2hpbmdWc1NoYWRlcih2cykge1xuICByZXR1cm4gZWRpdFNoYWRlcihcbiAgICB2cyxcbiAgICAnYXJjIGJydXNoaW5nIHZzJyxcbiAgICAndmVjMiBvZmZzZXQgPSBnZXRFeHRydXNpb25PZmZzZXQoKG5leHQueHkgLSBjdXJyLnh5KSAqIGluZGV4RGlyLCBwb3NpdGlvbnMueSk7JyxcbiAgICAndmVjMiBvZmZzZXQgPSBicnVzaGluZ19nZXRFeHRydXNpb25PZmZzZXQoKG5leHQueHkgLSBjdXJyLnh5KSAqIGluZGV4RGlyLCBwb3NpdGlvbnMueSwgcHJvamVjdF91Vmlld3BvcnRTaXplLCBpbnN0YW5jZVBvc2l0aW9ucywgaW5zdGFuY2VXaWR0aHMpOydcbiAgKTtcbn1cblxuZnVuY3Rpb24gYWRkQnJ1c2hpbmdWczY0U2hhZGVyKHZzKSB7XG4gIHJldHVybiBlZGl0U2hhZGVyKFxuICAgIHZzLFxuICAgICdhcmMgYnJ1c2hpbmcgdnM2NCcsXG4gICAgJ3ZlYzIgb2Zmc2V0ID0gZ2V0RXh0cnVzaW9uT2Zmc2V0KG5leHRfcG9zX2NsaXBzcGFjZS54eSAtIGN1cnJfcG9zX2NsaXBzcGFjZS54eSwgcG9zaXRpb25zLnkpOycsXG4gICAgJ3ZlYzIgb2Zmc2V0ID0gYnJ1c2hpbmdfZ2V0RXh0cnVzaW9uT2Zmc2V0KG5leHRfcG9zX2NsaXBzcGFjZS54eSAtIGN1cnJfcG9zX2NsaXBzcGFjZS54eSwgcG9zaXRpb25zLnksIHByb2plY3RfdVZpZXdwb3J0U2l6ZSwgaW5zdGFuY2VQb3NpdGlvbnMsIGluc3RhbmNlV2lkdGhzKTsnXG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyY0JydXNoaW5nTGF5ZXIgZXh0ZW5kcyBBcmNMYXllciB7XG4gIGdldFNoYWRlcnMoKSB7XG4gICAgY29uc3Qgc2hhZGVycyA9IHN1cGVyLmdldFNoYWRlcnMoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdnM6IHRoaXMuaXM2NGJpdEVuYWJsZWQoKVxuICAgICAgICA/IGFkZEJydXNoaW5nVnM2NFNoYWRlcihzaGFkZXJzLnZzKVxuICAgICAgICA6IGFkZEJydXNoaW5nVnNTaGFkZXIoc2hhZGVycy52cyksXG4gICAgICBmczogc2hhZGVycy5mcyxcbiAgICAgIG1vZHVsZXM6IHNoYWRlcnMubW9kdWxlcy5jb25jYXQoWydicnVzaGluZyddKVxuICAgIH07XG4gIH1cblxuICBkcmF3KG9wdHMpIHtcbiAgICBjb25zdCB7dW5pZm9ybXN9ID0gb3B0cztcblxuICAgIGNvbnN0IHtcbiAgICAgIGJydXNoU291cmNlLFxuICAgICAgYnJ1c2hUYXJnZXQsXG4gICAgICBicnVzaFJhZGl1cyxcbiAgICAgIGVuYWJsZUJydXNoaW5nLFxuICAgICAgbW91c2VQb3NpdGlvbixcbiAgICAgIHN0cm9rZVNjYWxlXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBzdXBlci5kcmF3KHtcbiAgICAgIC4uLm9wdHMsXG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICAuLi51bmlmb3JtcyxcbiAgICAgICAgYnJ1c2hpbmdfdUJydXNoU291cmNlOiBicnVzaFNvdXJjZSA/IDEgOiAwLFxuICAgICAgICBicnVzaGluZ191QnJ1c2hUYXJnZXQ6IGJydXNoVGFyZ2V0ID8gMSA6IDAsXG4gICAgICAgIGJydXNoaW5nX3VCcnVzaFJhZGl1czogYnJ1c2hSYWRpdXMsXG4gICAgICAgIGJydXNoaW5nX3VFbmFibGVCcnVzaGluZzogZW5hYmxlQnJ1c2hpbmcgPyAxIDogMCxcbiAgICAgICAgYnJ1c2hpbmdfdVN0cm9rZVNjYWxlOiBzdHJva2VTY2FsZSxcbiAgICAgICAgYnJ1c2hpbmdfdU1vdXNlUG9zaXRpb246IG1vdXNlUG9zaXRpb25cbiAgICAgICAgICA/IG5ldyBGbG9hdDMyQXJyYXkodGhpcy51bnByb2plY3QobW91c2VQb3NpdGlvbikpXG4gICAgICAgICAgOiBkZWZhdWx0UHJvcHMubW91c2VQb3NpdGlvblxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbkFyY0JydXNoaW5nTGF5ZXIubGF5ZXJOYW1lID0gJ0FyY0JydXNoaW5nTGF5ZXInO1xuQXJjQnJ1c2hpbmdMYXllci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4iXX0=