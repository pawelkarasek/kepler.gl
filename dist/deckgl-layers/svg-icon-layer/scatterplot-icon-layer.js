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

var _deck = require("deck.gl");

var _luma = require("luma.gl");

var _constants = _interopRequireDefault(require("luma.gl/constants"));

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
var ScatterplotIconLayer =
/*#__PURE__*/
function (_ScatterplotLayer) {
  (0, _inherits2["default"])(ScatterplotIconLayer, _ScatterplotLayer);

  function ScatterplotIconLayer() {
    (0, _classCallCheck2["default"])(this, ScatterplotIconLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ScatterplotIconLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(ScatterplotIconLayer, [{
    key: "_getModel",
    value: function _getModel(gl) {
      // use default scatterplot shaders
      var shaders = this.getShaders();
      var defaultPos = [-1, -1, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0];
      var iconGeometry = this.props.iconGeometry;
      var geometry = iconGeometry ? new _luma.Geometry({
        drawMode: _constants["default"].TRIANGLES,
        attributes: {
          positions: new Float32Array(iconGeometry)
        }
      }) : new _luma.Geometry({
        drawMode: _constants["default"].TRIANGLE_FAN,
        attributes: {
          positions: new Float32Array(defaultPos)
        }
      });
      return new _luma.Model(gl, (0, _objectSpread2["default"])({}, shaders, {
        id: this.props.id,
        geometry: geometry,
        isInstanced: true,
        shaderCache: this.context.shaderCache
      }));
    }
  }]);
  return ScatterplotIconLayer;
}(_deck.ScatterplotLayer);

exports["default"] = ScatterplotIconLayer;
ScatterplotIconLayer.layerName = 'ScatterplotIconLayer';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL3N2Zy1pY29uLWxheWVyL3NjYXR0ZXJwbG90LWljb24tbGF5ZXIuanMiXSwibmFtZXMiOlsiU2NhdHRlcnBsb3RJY29uTGF5ZXIiLCJnbCIsInNoYWRlcnMiLCJnZXRTaGFkZXJzIiwiZGVmYXVsdFBvcyIsImljb25HZW9tZXRyeSIsInByb3BzIiwiZ2VvbWV0cnkiLCJHZW9tZXRyeSIsImRyYXdNb2RlIiwiR0wiLCJUUklBTkdMRVMiLCJhdHRyaWJ1dGVzIiwicG9zaXRpb25zIiwiRmxvYXQzMkFycmF5IiwiVFJJQU5HTEVfRkFOIiwiTW9kZWwiLCJpZCIsImlzSW5zdGFuY2VkIiwic2hhZGVyQ2FjaGUiLCJjb250ZXh0IiwiU2NhdHRlcnBsb3RMYXllciIsImxheWVyTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQXRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQU1xQkEsb0I7Ozs7Ozs7Ozs7Ozs4QkFDVEMsRSxFQUFJO0FBQ1o7QUFDQSxVQUFNQyxPQUFPLEdBQUcsS0FBS0MsVUFBTCxFQUFoQjtBQUNBLFVBQU1DLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBRixFQUFLLENBQUMsQ0FBTixFQUFTLENBQVQsRUFBWSxDQUFDLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsQ0FBNUIsRUFBK0IsQ0FBL0IsRUFBa0MsQ0FBQyxDQUFuQyxFQUFzQyxDQUF0QyxDQUFuQjtBQUhZLFVBSUxDLFlBSkssR0FJVyxLQUFLQyxLQUpoQixDQUlMRCxZQUpLO0FBTVosVUFBTUUsUUFBUSxHQUFHRixZQUFZLEdBQ3pCLElBQUlHLGNBQUosQ0FBYTtBQUNYQyxRQUFBQSxRQUFRLEVBQUVDLHNCQUFHQyxTQURGO0FBRVhDLFFBQUFBLFVBQVUsRUFBRTtBQUNWQyxVQUFBQSxTQUFTLEVBQUUsSUFBSUMsWUFBSixDQUFpQlQsWUFBakI7QUFERDtBQUZELE9BQWIsQ0FEeUIsR0FPekIsSUFBSUcsY0FBSixDQUFhO0FBQ1hDLFFBQUFBLFFBQVEsRUFBRUMsc0JBQUdLLFlBREY7QUFFWEgsUUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLFVBQUFBLFNBQVMsRUFBRSxJQUFJQyxZQUFKLENBQWlCVixVQUFqQjtBQUREO0FBRkQsT0FBYixDQVBKO0FBY0EsYUFBTyxJQUFJWSxXQUFKLENBQVVmLEVBQVYscUNBQ0ZDLE9BREU7QUFFTGUsUUFBQUEsRUFBRSxFQUFFLEtBQUtYLEtBQUwsQ0FBV1csRUFGVjtBQUdMVixRQUFBQSxRQUFRLEVBQVJBLFFBSEs7QUFJTFcsUUFBQUEsV0FBVyxFQUFFLElBSlI7QUFLTEMsUUFBQUEsV0FBVyxFQUFFLEtBQUtDLE9BQUwsQ0FBYUQ7QUFMckIsU0FBUDtBQU9EOzs7RUE1QitDRSxzQjs7O0FBK0JsRHJCLG9CQUFvQixDQUFDc0IsU0FBckIsR0FBaUMsc0JBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtTY2F0dGVycGxvdExheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCB7R2VvbWV0cnksIE1vZGVsfSBmcm9tICdsdW1hLmdsJztcbmltcG9ydCBHTCBmcm9tICdsdW1hLmdsL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjYXR0ZXJwbG90SWNvbkxheWVyIGV4dGVuZHMgU2NhdHRlcnBsb3RMYXllciB7XG4gIF9nZXRNb2RlbChnbCkge1xuICAgIC8vIHVzZSBkZWZhdWx0IHNjYXR0ZXJwbG90IHNoYWRlcnNcbiAgICBjb25zdCBzaGFkZXJzID0gdGhpcy5nZXRTaGFkZXJzKCk7XG4gICAgY29uc3QgZGVmYXVsdFBvcyA9IFstMSwgLTEsIDAsIC0xLCAxLCAwLCAxLCAxLCAwLCAxLCAtMSwgMF07XG4gICAgY29uc3Qge2ljb25HZW9tZXRyeX0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgZ2VvbWV0cnkgPSBpY29uR2VvbWV0cnlcbiAgICAgID8gbmV3IEdlb21ldHJ5KHtcbiAgICAgICAgICBkcmF3TW9kZTogR0wuVFJJQU5HTEVTLFxuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uczogbmV3IEZsb2F0MzJBcnJheShpY29uR2VvbWV0cnkpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgOiBuZXcgR2VvbWV0cnkoe1xuICAgICAgICAgIGRyYXdNb2RlOiBHTC5UUklBTkdMRV9GQU4sXG4gICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgcG9zaXRpb25zOiBuZXcgRmxvYXQzMkFycmF5KGRlZmF1bHRQb3MpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHJldHVybiBuZXcgTW9kZWwoZ2wsIHtcbiAgICAgIC4uLnNoYWRlcnMsXG4gICAgICBpZDogdGhpcy5wcm9wcy5pZCxcbiAgICAgIGdlb21ldHJ5LFxuICAgICAgaXNJbnN0YW5jZWQ6IHRydWUsXG4gICAgICBzaGFkZXJDYWNoZTogdGhpcy5jb250ZXh0LnNoYWRlckNhY2hlXG4gICAgfSk7XG4gIH1cbn1cblxuU2NhdHRlcnBsb3RJY29uTGF5ZXIubGF5ZXJOYW1lID0gJ1NjYXR0ZXJwbG90SWNvbkxheWVyJztcbiJdfQ==