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

var _constants = _interopRequireDefault(require("luma.gl/constants"));

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
var defaultProps = (0, _objectSpread2["default"])({}, _deck.LineLayer.defaultProps, {
  // show arc if source is in brush
  brushSource: true,
  // show arc if target is in brush
  brushTarget: true,
  enableBrushing: true,
  getStrokeWidth: function getStrokeWidth(d) {
    return d.strokeWidth;
  },
  getTargetColor: function getTargetColor(x) {
    return x.color || [0, 0, 0, 255];
  },
  strokeScale: 1,
  // brush radius in meters
  brushRadius: 100000,
  mousePosition: [0, 0]
});

function addBrushingVsShader(vs) {
  var targetColorVs = (0, _shaderUtils.editShader)(vs, 'line target color vs', 'attribute vec4 instanceColors;', 'attribute vec4 instanceColors; attribute vec4 instanceTargetColors;');
  var brushingVs = (0, _shaderUtils.editShader)(targetColorVs, 'line brushing vs', 'vec2 offset = getExtrusionOffset(target.xy - source.xy, positions.y);', 'vec2 offset = brushing_getExtrusionOffset(target.xy - source.xy, positions.y, project_uViewportSize, vec4(instanceSourcePositions.xy, instanceTargetPositions.xy), instanceWidths);');
  return (0, _shaderUtils.editShader)(brushingVs, 'line color vs', 'vColor = vec4(instanceColors.rgb, instanceColors.a * opacity) / 255.;', "vec4 color = mix(instanceColors, instanceTargetColors, positions.x) / 255.;" + "vColor = vec4(color.rgb, color.a * opacity);");
}

var LineBrushingLayer =
/*#__PURE__*/
function (_LineLayer) {
  (0, _inherits2["default"])(LineBrushingLayer, _LineLayer);

  function LineBrushingLayer() {
    (0, _classCallCheck2["default"])(this, LineBrushingLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(LineBrushingLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(LineBrushingLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = (0, _get2["default"])((0, _getPrototypeOf2["default"])(LineBrushingLayer.prototype), "getShaders", this).call(this); // const addons = getExtrusion + isPicked + isPtInRange;

      return {
        // ...shaders,
        vs: addBrushingVsShader(shaders.vs),
        fs: shaders.fs,
        // vs: this.props.fp64 ? addons + vs64 : addons + vs,
        modules: shaders.modules.concat(['brushing'])
      };
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(LineBrushingLayer.prototype), "initializeState", this).call(this);
      var attributeManager = this.state.attributeManager;
      attributeManager.addInstanced({
        instanceTargetColors: {
          size: 4,
          type: _constants["default"].UNSIGNED_BYTE,
          accessor: 'getTargetColor',
          update: this.calculateInstanceTargetColors
        }
      });
    }
  }, {
    key: "draw",
    value: function draw(_ref) {
      var uniforms = _ref.uniforms;
      var _this$props = this.props,
          brushSource = _this$props.brushSource,
          brushTarget = _this$props.brushTarget,
          brushRadius = _this$props.brushRadius,
          enableBrushing = _this$props.enableBrushing,
          mousePosition = _this$props.mousePosition,
          strokeScale = _this$props.strokeScale;
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(LineBrushingLayer.prototype), "draw", this).call(this, {
        uniforms: (0, _objectSpread2["default"])({}, uniforms, {
          brushing_uBrushSource: brushSource ? 1 : 0,
          brushing_uBrushTarget: brushTarget ? 1 : 0,
          brushing_uBrushRadius: brushRadius,
          brushing_uEnableBrushing: enableBrushing ? 1 : 0,
          brushing_uStrokeScale: strokeScale,
          brushing_uMousePosition: mousePosition ? new Float32Array(this.unproject(mousePosition)) : defaultProps.mousePosition
        })
      });
    }
  }, {
    key: "calculateInstanceTargetColors",
    value: function calculateInstanceTargetColors(attribute) {
      var _this$props2 = this.props,
          data = _this$props2.data,
          getTargetColor = _this$props2.getTargetColor;
      var value = attribute.value,
          size = attribute.size;
      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var object = _step.value;
          var color = getTargetColor(object);
          value[i + 0] = color[0];
          value[i + 1] = color[1];
          value[i + 2] = color[2];
          value[i + 3] = isNaN(color[3]) ? 255 : color[3];
          i += size;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);
  return LineBrushingLayer;
}(_deck.LineLayer);

exports["default"] = LineBrushingLayer;
LineBrushingLayer.layerName = 'LineBrushingLayer';
LineBrushingLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2xpbmUtbGF5ZXIvbGluZS1sYXllci5qcyJdLCJuYW1lcyI6WyJkZWZhdWx0UHJvcHMiLCJMaW5lTGF5ZXIiLCJicnVzaFNvdXJjZSIsImJydXNoVGFyZ2V0IiwiZW5hYmxlQnJ1c2hpbmciLCJnZXRTdHJva2VXaWR0aCIsImQiLCJzdHJva2VXaWR0aCIsImdldFRhcmdldENvbG9yIiwieCIsImNvbG9yIiwic3Ryb2tlU2NhbGUiLCJicnVzaFJhZGl1cyIsIm1vdXNlUG9zaXRpb24iLCJhZGRCcnVzaGluZ1ZzU2hhZGVyIiwidnMiLCJ0YXJnZXRDb2xvclZzIiwiYnJ1c2hpbmdWcyIsIkxpbmVCcnVzaGluZ0xheWVyIiwic2hhZGVycyIsImZzIiwibW9kdWxlcyIsImNvbmNhdCIsImF0dHJpYnV0ZU1hbmFnZXIiLCJzdGF0ZSIsImFkZEluc3RhbmNlZCIsImluc3RhbmNlVGFyZ2V0Q29sb3JzIiwic2l6ZSIsInR5cGUiLCJHTCIsIlVOU0lHTkVEX0JZVEUiLCJhY2Nlc3NvciIsInVwZGF0ZSIsImNhbGN1bGF0ZUluc3RhbmNlVGFyZ2V0Q29sb3JzIiwidW5pZm9ybXMiLCJwcm9wcyIsImJydXNoaW5nX3VCcnVzaFNvdXJjZSIsImJydXNoaW5nX3VCcnVzaFRhcmdldCIsImJydXNoaW5nX3VCcnVzaFJhZGl1cyIsImJydXNoaW5nX3VFbmFibGVCcnVzaGluZyIsImJydXNoaW5nX3VTdHJva2VTY2FsZSIsImJydXNoaW5nX3VNb3VzZVBvc2l0aW9uIiwiRmxvYXQzMkFycmF5IiwidW5wcm9qZWN0IiwiYXR0cmlidXRlIiwiZGF0YSIsInZhbHVlIiwiaSIsIm9iamVjdCIsImlzTmFOIiwibGF5ZXJOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUF0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQSxJQUFNQSxZQUFZLHNDQUNiQyxnQkFBVUQsWUFERztBQUVoQjtBQUNBRSxFQUFBQSxXQUFXLEVBQUUsSUFIRztBQUloQjtBQUNBQyxFQUFBQSxXQUFXLEVBQUUsSUFMRztBQU1oQkMsRUFBQUEsY0FBYyxFQUFFLElBTkE7QUFPaEJDLEVBQUFBLGNBQWMsRUFBRSx3QkFBQUMsQ0FBQztBQUFBLFdBQUlBLENBQUMsQ0FBQ0MsV0FBTjtBQUFBLEdBUEQ7QUFRaEJDLEVBQUFBLGNBQWMsRUFBRSx3QkFBQUMsQ0FBQztBQUFBLFdBQUlBLENBQUMsQ0FBQ0MsS0FBRixJQUFXLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsR0FBVixDQUFmO0FBQUEsR0FSRDtBQVNoQkMsRUFBQUEsV0FBVyxFQUFFLENBVEc7QUFXaEI7QUFDQUMsRUFBQUEsV0FBVyxFQUFFLE1BWkc7QUFhaEJDLEVBQUFBLGFBQWEsRUFBRSxDQUFDLENBQUQsRUFBSSxDQUFKO0FBYkMsRUFBbEI7O0FBZ0JBLFNBQVNDLG1CQUFULENBQTZCQyxFQUE3QixFQUFpQztBQUMvQixNQUFNQyxhQUFhLEdBQUcsNkJBQ3BCRCxFQURvQixFQUVwQixzQkFGb0IsRUFHcEIsZ0NBSG9CLEVBSXBCLHFFQUpvQixDQUF0QjtBQU9BLE1BQU1FLFVBQVUsR0FBRyw2QkFDakJELGFBRGlCLEVBRWpCLGtCQUZpQixFQUdqQix1RUFIaUIsRUFJakIscUxBSmlCLENBQW5CO0FBT0EsU0FBTyw2QkFDTEMsVUFESyxFQUVMLGVBRkssRUFHTCx1RUFISyxFQUlMLDhIQUpLLENBQVA7QUFPRDs7SUFFb0JDLGlCOzs7Ozs7Ozs7Ozs7aUNBQ047QUFDWCxVQUFNQyxPQUFPLHNIQUFiLENBRFcsQ0FFWDs7QUFFQSxhQUFPO0FBQ0w7QUFDQUosUUFBQUEsRUFBRSxFQUFFRCxtQkFBbUIsQ0FBQ0ssT0FBTyxDQUFDSixFQUFULENBRmxCO0FBR0xLLFFBQUFBLEVBQUUsRUFBRUQsT0FBTyxDQUFDQyxFQUhQO0FBSUw7QUFDQUMsUUFBQUEsT0FBTyxFQUFFRixPQUFPLENBQUNFLE9BQVIsQ0FBZ0JDLE1BQWhCLENBQXVCLENBQUMsVUFBRCxDQUF2QjtBQUxKLE9BQVA7QUFPRDs7O3NDQUVpQjtBQUNoQjtBQURnQixVQUVUQyxnQkFGUyxHQUVXLEtBQUtDLEtBRmhCLENBRVRELGdCQUZTO0FBR2hCQSxNQUFBQSxnQkFBZ0IsQ0FBQ0UsWUFBakIsQ0FBOEI7QUFDNUJDLFFBQUFBLG9CQUFvQixFQUFFO0FBQ3BCQyxVQUFBQSxJQUFJLEVBQUUsQ0FEYztBQUVwQkMsVUFBQUEsSUFBSSxFQUFFQyxzQkFBR0MsYUFGVztBQUdwQkMsVUFBQUEsUUFBUSxFQUFFLGdCQUhVO0FBSXBCQyxVQUFBQSxNQUFNLEVBQUUsS0FBS0M7QUFKTztBQURNLE9BQTlCO0FBUUQ7OzsrQkFFZ0I7QUFBQSxVQUFYQyxRQUFXLFFBQVhBLFFBQVc7QUFBQSx3QkFRWCxLQUFLQyxLQVJNO0FBQUEsVUFFYmpDLFdBRmEsZUFFYkEsV0FGYTtBQUFBLFVBR2JDLFdBSGEsZUFHYkEsV0FIYTtBQUFBLFVBSWJTLFdBSmEsZUFJYkEsV0FKYTtBQUFBLFVBS2JSLGNBTGEsZUFLYkEsY0FMYTtBQUFBLFVBTWJTLGFBTmEsZUFNYkEsYUFOYTtBQUFBLFVBT2JGLFdBUGEsZUFPYkEsV0FQYTtBQVVmLG9IQUFXO0FBQ1R1QixRQUFBQSxRQUFRLHFDQUNIQSxRQURHO0FBRU5FLFVBQUFBLHFCQUFxQixFQUFFbEMsV0FBVyxHQUFHLENBQUgsR0FBTyxDQUZuQztBQUdObUMsVUFBQUEscUJBQXFCLEVBQUVsQyxXQUFXLEdBQUcsQ0FBSCxHQUFPLENBSG5DO0FBSU5tQyxVQUFBQSxxQkFBcUIsRUFBRTFCLFdBSmpCO0FBS04yQixVQUFBQSx3QkFBd0IsRUFBRW5DLGNBQWMsR0FBRyxDQUFILEdBQU8sQ0FMekM7QUFNTm9DLFVBQUFBLHFCQUFxQixFQUFFN0IsV0FOakI7QUFPTjhCLFVBQUFBLHVCQUF1QixFQUFFNUIsYUFBYSxHQUNsQyxJQUFJNkIsWUFBSixDQUFpQixLQUFLQyxTQUFMLENBQWU5QixhQUFmLENBQWpCLENBRGtDLEdBRWxDYixZQUFZLENBQUNhO0FBVFg7QUFEQyxPQUFYO0FBYUQ7OztrREFFNkIrQixTLEVBQVc7QUFBQSx5QkFDUixLQUFLVCxLQURHO0FBQUEsVUFDaENVLElBRGdDLGdCQUNoQ0EsSUFEZ0M7QUFBQSxVQUMxQnJDLGNBRDBCLGdCQUMxQkEsY0FEMEI7QUFBQSxVQUVoQ3NDLEtBRmdDLEdBRWpCRixTQUZpQixDQUVoQ0UsS0FGZ0M7QUFBQSxVQUV6Qm5CLElBRnlCLEdBRWpCaUIsU0FGaUIsQ0FFekJqQixJQUZ5QjtBQUd2QyxVQUFJb0IsQ0FBQyxHQUFHLENBQVI7QUFIdUM7QUFBQTtBQUFBOztBQUFBO0FBSXZDLDZCQUFxQkYsSUFBckIsOEhBQTJCO0FBQUEsY0FBaEJHLE1BQWdCO0FBQ3pCLGNBQU10QyxLQUFLLEdBQUdGLGNBQWMsQ0FBQ3dDLE1BQUQsQ0FBNUI7QUFDQUYsVUFBQUEsS0FBSyxDQUFDQyxDQUFDLEdBQUcsQ0FBTCxDQUFMLEdBQWVyQyxLQUFLLENBQUMsQ0FBRCxDQUFwQjtBQUNBb0MsVUFBQUEsS0FBSyxDQUFDQyxDQUFDLEdBQUcsQ0FBTCxDQUFMLEdBQWVyQyxLQUFLLENBQUMsQ0FBRCxDQUFwQjtBQUNBb0MsVUFBQUEsS0FBSyxDQUFDQyxDQUFDLEdBQUcsQ0FBTCxDQUFMLEdBQWVyQyxLQUFLLENBQUMsQ0FBRCxDQUFwQjtBQUNBb0MsVUFBQUEsS0FBSyxDQUFDQyxDQUFDLEdBQUcsQ0FBTCxDQUFMLEdBQWVFLEtBQUssQ0FBQ3ZDLEtBQUssQ0FBQyxDQUFELENBQU4sQ0FBTCxHQUFrQixHQUFsQixHQUF3QkEsS0FBSyxDQUFDLENBQUQsQ0FBNUM7QUFDQXFDLFVBQUFBLENBQUMsSUFBSXBCLElBQUw7QUFDRDtBQVhzQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWXhDOzs7RUFoRTRDMUIsZTs7O0FBbUUvQ2lCLGlCQUFpQixDQUFDZ0MsU0FBbEIsR0FBOEIsbUJBQTlCO0FBQ0FoQyxpQkFBaUIsQ0FBQ2xCLFlBQWxCLEdBQWlDQSxZQUFqQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7TGluZUxheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCBHTCBmcm9tICdsdW1hLmdsL2NvbnN0YW50cyc7XG5pbXBvcnQge2VkaXRTaGFkZXJ9IGZyb20gJ2RlY2tnbC1sYXllcnMvbGF5ZXItdXRpbHMvc2hhZGVyLXV0aWxzJztcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICAuLi5MaW5lTGF5ZXIuZGVmYXVsdFByb3BzLFxuICAvLyBzaG93IGFyYyBpZiBzb3VyY2UgaXMgaW4gYnJ1c2hcbiAgYnJ1c2hTb3VyY2U6IHRydWUsXG4gIC8vIHNob3cgYXJjIGlmIHRhcmdldCBpcyBpbiBicnVzaFxuICBicnVzaFRhcmdldDogdHJ1ZSxcbiAgZW5hYmxlQnJ1c2hpbmc6IHRydWUsXG4gIGdldFN0cm9rZVdpZHRoOiBkID0+IGQuc3Ryb2tlV2lkdGgsXG4gIGdldFRhcmdldENvbG9yOiB4ID0+IHguY29sb3IgfHwgWzAsIDAsIDAsIDI1NV0sXG4gIHN0cm9rZVNjYWxlOiAxLFxuXG4gIC8vIGJydXNoIHJhZGl1cyBpbiBtZXRlcnNcbiAgYnJ1c2hSYWRpdXM6IDEwMDAwMCxcbiAgbW91c2VQb3NpdGlvbjogWzAsIDBdXG59O1xuXG5mdW5jdGlvbiBhZGRCcnVzaGluZ1ZzU2hhZGVyKHZzKSB7XG4gIGNvbnN0IHRhcmdldENvbG9yVnMgPSBlZGl0U2hhZGVyKFxuICAgIHZzLFxuICAgICdsaW5lIHRhcmdldCBjb2xvciB2cycsXG4gICAgJ2F0dHJpYnV0ZSB2ZWM0IGluc3RhbmNlQ29sb3JzOycsXG4gICAgJ2F0dHJpYnV0ZSB2ZWM0IGluc3RhbmNlQ29sb3JzOyBhdHRyaWJ1dGUgdmVjNCBpbnN0YW5jZVRhcmdldENvbG9yczsnXG4gICk7XG5cbiAgY29uc3QgYnJ1c2hpbmdWcyA9IGVkaXRTaGFkZXIoXG4gICAgdGFyZ2V0Q29sb3JWcyxcbiAgICAnbGluZSBicnVzaGluZyB2cycsXG4gICAgJ3ZlYzIgb2Zmc2V0ID0gZ2V0RXh0cnVzaW9uT2Zmc2V0KHRhcmdldC54eSAtIHNvdXJjZS54eSwgcG9zaXRpb25zLnkpOycsXG4gICAgJ3ZlYzIgb2Zmc2V0ID0gYnJ1c2hpbmdfZ2V0RXh0cnVzaW9uT2Zmc2V0KHRhcmdldC54eSAtIHNvdXJjZS54eSwgcG9zaXRpb25zLnksIHByb2plY3RfdVZpZXdwb3J0U2l6ZSwgdmVjNChpbnN0YW5jZVNvdXJjZVBvc2l0aW9ucy54eSwgaW5zdGFuY2VUYXJnZXRQb3NpdGlvbnMueHkpLCBpbnN0YW5jZVdpZHRocyk7J1xuICApO1xuXG4gIHJldHVybiBlZGl0U2hhZGVyKFxuICAgIGJydXNoaW5nVnMsXG4gICAgJ2xpbmUgY29sb3IgdnMnLFxuICAgICd2Q29sb3IgPSB2ZWM0KGluc3RhbmNlQ29sb3JzLnJnYiwgaW5zdGFuY2VDb2xvcnMuYSAqIG9wYWNpdHkpIC8gMjU1LjsnLFxuICAgIGB2ZWM0IGNvbG9yID0gbWl4KGluc3RhbmNlQ29sb3JzLCBpbnN0YW5jZVRhcmdldENvbG9ycywgcG9zaXRpb25zLngpIC8gMjU1LjtgICtcbiAgICBgdkNvbG9yID0gdmVjNChjb2xvci5yZ2IsIGNvbG9yLmEgKiBvcGFjaXR5KTtgXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluZUJydXNoaW5nTGF5ZXIgZXh0ZW5kcyBMaW5lTGF5ZXIge1xuICBnZXRTaGFkZXJzKCkge1xuICAgIGNvbnN0IHNoYWRlcnMgPSBzdXBlci5nZXRTaGFkZXJzKCk7XG4gICAgLy8gY29uc3QgYWRkb25zID0gZ2V0RXh0cnVzaW9uICsgaXNQaWNrZWQgKyBpc1B0SW5SYW5nZTtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyAuLi5zaGFkZXJzLFxuICAgICAgdnM6IGFkZEJydXNoaW5nVnNTaGFkZXIoc2hhZGVycy52cyksXG4gICAgICBmczogc2hhZGVycy5mcyxcbiAgICAgIC8vIHZzOiB0aGlzLnByb3BzLmZwNjQgPyBhZGRvbnMgKyB2czY0IDogYWRkb25zICsgdnMsXG4gICAgICBtb2R1bGVzOiBzaGFkZXJzLm1vZHVsZXMuY29uY2F0KFsnYnJ1c2hpbmcnXSlcbiAgICB9O1xuICB9XG5cbiAgaW5pdGlhbGl6ZVN0YXRlKCkge1xuICAgIHN1cGVyLmluaXRpYWxpemVTdGF0ZSgpO1xuICAgIGNvbnN0IHthdHRyaWJ1dGVNYW5hZ2VyfSA9IHRoaXMuc3RhdGU7XG4gICAgYXR0cmlidXRlTWFuYWdlci5hZGRJbnN0YW5jZWQoe1xuICAgICAgaW5zdGFuY2VUYXJnZXRDb2xvcnM6IHtcbiAgICAgICAgc2l6ZTogNCxcbiAgICAgICAgdHlwZTogR0wuVU5TSUdORURfQllURSxcbiAgICAgICAgYWNjZXNzb3I6ICdnZXRUYXJnZXRDb2xvcicsXG4gICAgICAgIHVwZGF0ZTogdGhpcy5jYWxjdWxhdGVJbnN0YW5jZVRhcmdldENvbG9yc1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZHJhdyh7dW5pZm9ybXN9KSB7XG4gICAgY29uc3Qge1xuICAgICAgYnJ1c2hTb3VyY2UsXG4gICAgICBicnVzaFRhcmdldCxcbiAgICAgIGJydXNoUmFkaXVzLFxuICAgICAgZW5hYmxlQnJ1c2hpbmcsXG4gICAgICBtb3VzZVBvc2l0aW9uLFxuICAgICAgc3Ryb2tlU2NhbGVcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIHN1cGVyLmRyYXcoe1xuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgLi4udW5pZm9ybXMsXG4gICAgICAgIGJydXNoaW5nX3VCcnVzaFNvdXJjZTogYnJ1c2hTb3VyY2UgPyAxIDogMCxcbiAgICAgICAgYnJ1c2hpbmdfdUJydXNoVGFyZ2V0OiBicnVzaFRhcmdldCA/IDEgOiAwLFxuICAgICAgICBicnVzaGluZ191QnJ1c2hSYWRpdXM6IGJydXNoUmFkaXVzLFxuICAgICAgICBicnVzaGluZ191RW5hYmxlQnJ1c2hpbmc6IGVuYWJsZUJydXNoaW5nID8gMSA6IDAsXG4gICAgICAgIGJydXNoaW5nX3VTdHJva2VTY2FsZTogc3Ryb2tlU2NhbGUsXG4gICAgICAgIGJydXNoaW5nX3VNb3VzZVBvc2l0aW9uOiBtb3VzZVBvc2l0aW9uXG4gICAgICAgICAgPyBuZXcgRmxvYXQzMkFycmF5KHRoaXMudW5wcm9qZWN0KG1vdXNlUG9zaXRpb24pKVxuICAgICAgICAgIDogZGVmYXVsdFByb3BzLm1vdXNlUG9zaXRpb25cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGNhbGN1bGF0ZUluc3RhbmNlVGFyZ2V0Q29sb3JzKGF0dHJpYnV0ZSkge1xuICAgIGNvbnN0IHtkYXRhLCBnZXRUYXJnZXRDb2xvcn0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHt2YWx1ZSwgc2l6ZX0gPSBhdHRyaWJ1dGU7XG4gICAgbGV0IGkgPSAwO1xuICAgIGZvciAoY29uc3Qgb2JqZWN0IG9mIGRhdGEpIHtcbiAgICAgIGNvbnN0IGNvbG9yID0gZ2V0VGFyZ2V0Q29sb3Iob2JqZWN0KTtcbiAgICAgIHZhbHVlW2kgKyAwXSA9IGNvbG9yWzBdO1xuICAgICAgdmFsdWVbaSArIDFdID0gY29sb3JbMV07XG4gICAgICB2YWx1ZVtpICsgMl0gPSBjb2xvclsyXTtcbiAgICAgIHZhbHVlW2kgKyAzXSA9IGlzTmFOKGNvbG9yWzNdKSA/IDI1NSA6IGNvbG9yWzNdO1xuICAgICAgaSArPSBzaXplO1xuICAgIH1cbiAgfVxufVxuXG5MaW5lQnJ1c2hpbmdMYXllci5sYXllck5hbWUgPSAnTGluZUJydXNoaW5nTGF5ZXInO1xuTGluZUJydXNoaW5nTGF5ZXIuZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzO1xuIl19