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

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _deck = require("deck.gl");

var _luma = require("luma.gl");

var _h3Utils = require("../../layers/h3-hexagon-layer/h3-utils");

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
function addInstanceCoverage(vs) {
  var addDecl = (0, _shaderUtils.editShader)(vs, 'hexagon cell vs add instance', 'attribute vec3 instancePickingColors;', "attribute vec3 instancePickingColors;\n     attribute float instanceCoverage;");
  return (0, _shaderUtils.editShader)(addDecl, 'hexagon cell vs add instance', 'float dotRadius = project_scale(radius) * mix(coverage, 0.0, noRender);', 'float dotRadius = project_scale(radius) * mix(coverage * instanceCoverage, 0.0, noRender);');
} // TODO: export all dekc.gl layers from kepler.gl


var H3HexagonCellLayer =
/*#__PURE__*/
function (_HexagonCellLayer) {
  (0, _inherits2["default"])(H3HexagonCellLayer, _HexagonCellLayer);

  function H3HexagonCellLayer() {
    (0, _classCallCheck2["default"])(this, H3HexagonCellLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(H3HexagonCellLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(H3HexagonCellLayer, [{
    key: "getShaders",
    value: function getShaders() {
      var shaders = (0, _get2["default"])((0, _getPrototypeOf2["default"])(H3HexagonCellLayer.prototype), "getShaders", this).call(this);
      return (0, _objectSpread2["default"])({}, shaders, {
        vs: addInstanceCoverage(shaders.vs)
      });
    }
  }, {
    key: "getCylinderGeometry",
    value: function getCylinderGeometry(radius) {
      var distortion = this.getDistortion();
      var cylinderGeometry = new _luma.CylinderGeometry({
        radius: radius,
        topRadius: radius,
        bottomRadius: radius,
        topCap: true,
        bottomCap: true,
        height: 1,
        verticalAxis: 'z',
        nradial: 6,
        nvertical: 1
      });

      if (distortion) {
        var pos = cylinderGeometry.attributes.positions.value;
        var adjusted = (0, _h3Utils.distortCylinderPositions)(pos, distortion);
        cylinderGeometry.attributes.positions.value = adjusted;
      }

      return cylinderGeometry;
    }
  }, {
    key: "getDistortion",
    value: function getDistortion() {
      var _this = this;

      var _this$props = this.props,
          hexagonVertices = _this$props.hexagonVertices,
          hexagonCenter = _this$props.hexagonCenter;

      if (Array.isArray(hexagonVertices) && hexagonVertices.length >= 6 && Array.isArray(hexagonCenter)) {
        var screenVertices = hexagonVertices.map(function (d) {
          return _this.projectFlat(d);
        });
        var screenCentroid = this.projectFlat(hexagonCenter);
        return (0, _h3Utils.getH3VerticeTransform)(screenVertices, screenCentroid);
      }

      return null;
    }
  }, {
    key: "updateRadiusAngle",
    value: function updateRadiusAngle() {
      var _this$props2 = this.props,
          angle = _this$props2.angle,
          radius = _this$props2.radius;
      var hexagonVertices = this.props.hexagonVertices;

      if (Array.isArray(hexagonVertices) && hexagonVertices.length >= 6) {
        var viewport = this.context.viewport; // calculate angle and vertices from hexagonVertices if provided

        var vertices = this.props.hexagonVertices;
        var vertex0 = vertices[0];
        var vertex3 = vertices[3]; // project to space coordinates

        var _viewport$getDistance = viewport.getDistanceScales(),
            pixelsPerMeter = _viewport$getDistance.pixelsPerMeter;

        var spaceCoord0 = this.projectFlat(vertex0);
        var spaceCoord3 = this.projectFlat(vertex3);
        angle = (0, _h3Utils.getAngle)(spaceCoord0, spaceCoord3);
        radius = (0, _h3Utils.getRadius)(spaceCoord0, spaceCoord3) / pixelsPerMeter[0];
      }

      this.setState({
        angle: angle,
        radius: radius
      });
    }
  }, {
    key: "initializeState",
    value: function initializeState() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(H3HexagonCellLayer.prototype), "initializeState", this).call(this);
      this.getAttributeManager().addInstanced({
        instanceCoverage: {
          size: 1,
          accessor: 'getCoverage'
        }
      });
    }
  }]);
  return H3HexagonCellLayer;
}(_deck.HexagonCellLayer);

exports["default"] = H3HexagonCellLayer;
H3HexagonCellLayer.layerName = 'H3HexagonCellLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL2gzLWhleGFnb24tY2VsbC1sYXllci9oMy1oZXhhZ29uLWNlbGwtbGF5ZXIuanMiXSwibmFtZXMiOlsiYWRkSW5zdGFuY2VDb3ZlcmFnZSIsInZzIiwiYWRkRGVjbCIsIkgzSGV4YWdvbkNlbGxMYXllciIsInNoYWRlcnMiLCJyYWRpdXMiLCJkaXN0b3J0aW9uIiwiZ2V0RGlzdG9ydGlvbiIsImN5bGluZGVyR2VvbWV0cnkiLCJDeWxpbmRlckdlb21ldHJ5IiwidG9wUmFkaXVzIiwiYm90dG9tUmFkaXVzIiwidG9wQ2FwIiwiYm90dG9tQ2FwIiwiaGVpZ2h0IiwidmVydGljYWxBeGlzIiwibnJhZGlhbCIsIm52ZXJ0aWNhbCIsInBvcyIsImF0dHJpYnV0ZXMiLCJwb3NpdGlvbnMiLCJ2YWx1ZSIsImFkanVzdGVkIiwicHJvcHMiLCJoZXhhZ29uVmVydGljZXMiLCJoZXhhZ29uQ2VudGVyIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwic2NyZWVuVmVydGljZXMiLCJtYXAiLCJkIiwicHJvamVjdEZsYXQiLCJzY3JlZW5DZW50cm9pZCIsImFuZ2xlIiwidmlld3BvcnQiLCJjb250ZXh0IiwidmVydGljZXMiLCJ2ZXJ0ZXgwIiwidmVydGV4MyIsImdldERpc3RhbmNlU2NhbGVzIiwicGl4ZWxzUGVyTWV0ZXIiLCJzcGFjZUNvb3JkMCIsInNwYWNlQ29vcmQzIiwic2V0U3RhdGUiLCJnZXRBdHRyaWJ1dGVNYW5hZ2VyIiwiYWRkSW5zdGFuY2VkIiwiaW5zdGFuY2VDb3ZlcmFnZSIsInNpemUiLCJhY2Nlc3NvciIsIkhleGFnb25DZWxsTGF5ZXIiLCJsYXllck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQXZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBUmlFLG9DQVN4Q0YsUUFBUSxDQUFDSyxpQkFBVCxFQVR3QztBQUFBLFlBUzFEQyxjQVQwRCx5QkFTMURBLGNBVDBEOztBQVVqRSxZQUFNQyxXQUFXLEdBQUcsS0FBS1YsV0FBTCxDQUFpQk0sT0FBakIsQ0FBcEI7QUFDQSxZQUFNSyxXQUFXLEdBQUcsS0FBS1gsV0FBTCxDQUFpQk8sT0FBakIsQ0FBcEI7QUFFQUwsUUFBQUEsS0FBSyxHQUFHLHVCQUFTUSxXQUFULEVBQXNCQyxXQUF0QixDQUFSO0FBQ0F0QyxRQUFBQSxNQUFNLEdBQUcsd0JBQVVxQyxXQUFWLEVBQXVCQyxXQUF2QixJQUFxQ0YsY0FBYyxDQUFDLENBQUQsQ0FBNUQ7QUFDRDs7QUFFRCxXQUFLRyxRQUFMLENBQWM7QUFBQ1YsUUFBQUEsS0FBSyxFQUFMQSxLQUFEO0FBQVE3QixRQUFBQSxNQUFNLEVBQU5BO0FBQVIsT0FBZDtBQUNEOzs7c0NBRWlCO0FBQ2hCO0FBRUEsV0FBS3dDLG1CQUFMLEdBQTJCQyxZQUEzQixDQUF3QztBQUN0Q0MsUUFBQUEsZ0JBQWdCLEVBQUU7QUFBQ0MsVUFBQUEsSUFBSSxFQUFFLENBQVA7QUFBVUMsVUFBQUEsUUFBUSxFQUFFO0FBQXBCO0FBRG9CLE9BQXhDO0FBR0Q7OztFQS9FNkNDLHNCOzs7QUFrRmhEL0Msa0JBQWtCLENBQUNnRCxTQUFuQixHQUErQixvQkFBL0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0hleGFnb25DZWxsTGF5ZXJ9IGZyb20gJ2RlY2suZ2wnO1xuaW1wb3J0IHtDeWxpbmRlckdlb21ldHJ5fSBmcm9tICdsdW1hLmdsJztcbmltcG9ydCB7Z2V0QW5nbGUsIGdldFJhZGl1cywgZ2V0SDNWZXJ0aWNlVHJhbnNmb3JtLCBkaXN0b3J0Q3lsaW5kZXJQb3NpdGlvbnN9IGZyb20gJ2xheWVycy9oMy1oZXhhZ29uLWxheWVyL2gzLXV0aWxzJztcbmltcG9ydCB7ZWRpdFNoYWRlcn0gZnJvbSAnZGVja2dsLWxheWVycy9sYXllci11dGlscy9zaGFkZXItdXRpbHMnO1xuXG5mdW5jdGlvbiBhZGRJbnN0YW5jZUNvdmVyYWdlKHZzKSB7XG4gIGNvbnN0IGFkZERlY2wgPSBlZGl0U2hhZGVyKFxuICAgIHZzLFxuICAgICdoZXhhZ29uIGNlbGwgdnMgYWRkIGluc3RhbmNlJyxcbiAgICAnYXR0cmlidXRlIHZlYzMgaW5zdGFuY2VQaWNraW5nQ29sb3JzOycsXG4gICAgYGF0dHJpYnV0ZSB2ZWMzIGluc3RhbmNlUGlja2luZ0NvbG9ycztcbiAgICAgYXR0cmlidXRlIGZsb2F0IGluc3RhbmNlQ292ZXJhZ2U7YFxuICApO1xuXG4gIHJldHVybiBlZGl0U2hhZGVyKFxuICAgIGFkZERlY2wsXG4gICAgJ2hleGFnb24gY2VsbCB2cyBhZGQgaW5zdGFuY2UnLFxuICAgICdmbG9hdCBkb3RSYWRpdXMgPSBwcm9qZWN0X3NjYWxlKHJhZGl1cykgKiBtaXgoY292ZXJhZ2UsIDAuMCwgbm9SZW5kZXIpOycsXG4gICAgJ2Zsb2F0IGRvdFJhZGl1cyA9IHByb2plY3Rfc2NhbGUocmFkaXVzKSAqIG1peChjb3ZlcmFnZSAqIGluc3RhbmNlQ292ZXJhZ2UsIDAuMCwgbm9SZW5kZXIpOydcbiAgKTtcbn1cblxuLy8gVE9ETzogZXhwb3J0IGFsbCBkZWtjLmdsIGxheWVycyBmcm9tIGtlcGxlci5nbFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSDNIZXhhZ29uQ2VsbExheWVyIGV4dGVuZHMgSGV4YWdvbkNlbGxMYXllciB7XG5cbiAgZ2V0U2hhZGVycygpIHtcbiAgICBjb25zdCBzaGFkZXJzID0gc3VwZXIuZ2V0U2hhZGVycygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNoYWRlcnMsXG4gICAgICB2czogYWRkSW5zdGFuY2VDb3ZlcmFnZShzaGFkZXJzLnZzKVxuICAgIH07XG4gIH1cblxuICBnZXRDeWxpbmRlckdlb21ldHJ5KHJhZGl1cykge1xuICAgIGNvbnN0IGRpc3RvcnRpb24gPSB0aGlzLmdldERpc3RvcnRpb24oKTtcblxuICAgIGNvbnN0IGN5bGluZGVyR2VvbWV0cnkgPSBuZXcgQ3lsaW5kZXJHZW9tZXRyeSh7XG4gICAgICByYWRpdXMsXG4gICAgICB0b3BSYWRpdXM6IHJhZGl1cyxcbiAgICAgIGJvdHRvbVJhZGl1czogcmFkaXVzLFxuICAgICAgdG9wQ2FwOiB0cnVlLFxuICAgICAgYm90dG9tQ2FwOiB0cnVlLFxuICAgICAgaGVpZ2h0OiAxLFxuICAgICAgdmVydGljYWxBeGlzOiAneicsXG4gICAgICBucmFkaWFsOiA2LFxuICAgICAgbnZlcnRpY2FsOiAxXG4gICAgfSk7XG5cbiAgICBpZiAoZGlzdG9ydGlvbikge1xuICAgICAgY29uc3QgcG9zID0gY3lsaW5kZXJHZW9tZXRyeS5hdHRyaWJ1dGVzLnBvc2l0aW9ucy52YWx1ZTtcbiAgICAgIGNvbnN0IGFkanVzdGVkID0gZGlzdG9ydEN5bGluZGVyUG9zaXRpb25zKHBvcywgZGlzdG9ydGlvbik7XG4gICAgICBjeWxpbmRlckdlb21ldHJ5LmF0dHJpYnV0ZXMucG9zaXRpb25zLnZhbHVlID0gYWRqdXN0ZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN5bGluZGVyR2VvbWV0cnk7XG4gIH1cblxuICBnZXREaXN0b3J0aW9uKCkge1xuICAgIGNvbnN0IHtoZXhhZ29uVmVydGljZXMsIGhleGFnb25DZW50ZXJ9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChBcnJheS5pc0FycmF5KGhleGFnb25WZXJ0aWNlcykgJiZcbiAgICAgIGhleGFnb25WZXJ0aWNlcy5sZW5ndGggPj0gNiAmJlxuICAgICAgQXJyYXkuaXNBcnJheShoZXhhZ29uQ2VudGVyKSkge1xuICAgICAgICBjb25zdCBzY3JlZW5WZXJ0aWNlcyA9IGhleGFnb25WZXJ0aWNlcy5tYXAoZCA9PiB0aGlzLnByb2plY3RGbGF0KGQpKTtcbiAgICAgICAgY29uc3Qgc2NyZWVuQ2VudHJvaWQgPSB0aGlzLnByb2plY3RGbGF0KGhleGFnb25DZW50ZXIpO1xuICAgICAgICByZXR1cm4gZ2V0SDNWZXJ0aWNlVHJhbnNmb3JtKHNjcmVlblZlcnRpY2VzLCBzY3JlZW5DZW50cm9pZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICB1cGRhdGVSYWRpdXNBbmdsZSgpIHtcbiAgICBsZXQge2FuZ2xlLCByYWRpdXN9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7aGV4YWdvblZlcnRpY2VzfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheShoZXhhZ29uVmVydGljZXMpICYmIGhleGFnb25WZXJ0aWNlcy5sZW5ndGggPj0gNikge1xuICAgICAgY29uc3Qge3ZpZXdwb3J0fSA9IHRoaXMuY29udGV4dDtcbiAgICAgIC8vIGNhbGN1bGF0ZSBhbmdsZSBhbmQgdmVydGljZXMgZnJvbSBoZXhhZ29uVmVydGljZXMgaWYgcHJvdmlkZWRcbiAgICAgIGNvbnN0IHZlcnRpY2VzID0gdGhpcy5wcm9wcy5oZXhhZ29uVmVydGljZXM7XG5cbiAgICAgIGNvbnN0IHZlcnRleDAgPSB2ZXJ0aWNlc1swXTtcbiAgICAgIGNvbnN0IHZlcnRleDMgPSB2ZXJ0aWNlc1szXTtcblxuICAgICAgLy8gcHJvamVjdCB0byBzcGFjZSBjb29yZGluYXRlc1xuICAgICAgY29uc3Qge3BpeGVsc1Blck1ldGVyfSA9IHZpZXdwb3J0LmdldERpc3RhbmNlU2NhbGVzKCk7XG4gICAgICBjb25zdCBzcGFjZUNvb3JkMCA9IHRoaXMucHJvamVjdEZsYXQodmVydGV4MCk7XG4gICAgICBjb25zdCBzcGFjZUNvb3JkMyA9IHRoaXMucHJvamVjdEZsYXQodmVydGV4Myk7XG5cbiAgICAgIGFuZ2xlID0gZ2V0QW5nbGUoc3BhY2VDb29yZDAsIHNwYWNlQ29vcmQzKTtcbiAgICAgIHJhZGl1cyA9IGdldFJhZGl1cyhzcGFjZUNvb3JkMCwgc3BhY2VDb29yZDMpIC9waXhlbHNQZXJNZXRlclswXTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHthbmdsZSwgcmFkaXVzfSk7XG4gIH1cblxuICBpbml0aWFsaXplU3RhdGUoKSB7XG4gICAgc3VwZXIuaW5pdGlhbGl6ZVN0YXRlKCk7XG5cbiAgICB0aGlzLmdldEF0dHJpYnV0ZU1hbmFnZXIoKS5hZGRJbnN0YW5jZWQoe1xuICAgICAgaW5zdGFuY2VDb3ZlcmFnZToge3NpemU6IDEsIGFjY2Vzc29yOiAnZ2V0Q292ZXJhZ2UnfVxuICAgIH0pO1xuICB9XG59XG5cbkgzSGV4YWdvbkNlbGxMYXllci5sYXllck5hbWUgPSAnSDNIZXhhZ29uQ2VsbExheWVyJztcbiJdfQ==