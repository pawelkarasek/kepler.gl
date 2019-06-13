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

var _scatterplotIconLayer = _interopRequireDefault(require("./scatterplot-icon-layer"));

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
// default icon geometry is a square
var DEFAULT_ICON_GEOMETRY = [1, 1, 0, 1, -1, 0, -1, -1, 0, -1, -1, 0, -1, 1, 0, 1, 1, 0];
var defaultProps = {
  getIconGeometry: function getIconGeometry(iconId) {
    return DEFAULT_ICON_GEOMETRY;
  },
  getIcon: function getIcon(d) {
    return d.icon;
  }
};

var SvgIconLayer =
/*#__PURE__*/
function (_CompositeLayer) {
  (0, _inherits2["default"])(SvgIconLayer, _CompositeLayer);

  function SvgIconLayer() {
    (0, _classCallCheck2["default"])(this, SvgIconLayer);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SvgIconLayer).apply(this, arguments));
  }

  (0, _createClass2["default"])(SvgIconLayer, [{
    key: "initializeState",
    // Must be defined
    value: function initializeState() {
      this.state = {
        data: {}
      };
    }
  }, {
    key: "updateState",
    value: function updateState(_ref) {
      var changeFlags = _ref.changeFlags;

      if (changeFlags.dataChanged) {
        this._extractSublayers();
      }
    }
  }, {
    key: "_extractSublayers",
    value: function _extractSublayers() {
      var _this$props = this.props,
          data = _this$props.data,
          getIconGeometry = _this$props.getIconGeometry,
          getIcon = _this$props.getIcon;
      var iconLayers = data.reduce(function (accu, d) {
        var iconId = getIcon(d);

        if (iconId in accu) {
          accu[iconId].data.push(d);
        } else {
          var geometry = getIconGeometry(iconId) || DEFAULT_ICON_GEOMETRY;
          accu[iconId] = {
            id: iconId,
            geometry: geometry,
            data: [d]
          };
        }

        return accu;
      }, {});
      this.setState({
        data: Object.values(iconLayers)
      });
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      var _this = this;

      var layerId = this.props.id;
      var layers = this.state.data && this.state.data.length && this.state.data.map(function (_ref2) {
        var id = _ref2.id,
            data = _ref2.data,
            geometry = _ref2.geometry;
        return new _scatterplotIconLayer["default"]((0, _objectSpread2["default"])({}, _this.props, {
          id: "".concat(layerId, "-").concat(id),
          data: data,
          iconGeometry: geometry
        }));
      });
      return layers && layers.length > 0 ? layers : null;
    }
  }]);
  return SvgIconLayer;
}(_deck.CompositeLayer);

exports["default"] = SvgIconLayer;
SvgIconLayer.layerName = 'SvgIconLayer';
SvgIconLayer.defaultProps = defaultProps;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWNrZ2wtbGF5ZXJzL3N2Zy1pY29uLWxheWVyL3N2Zy1pY29uLWxheWVyLmpzIl0sIm5hbWVzIjpbIkRFRkFVTFRfSUNPTl9HRU9NRVRSWSIsImRlZmF1bHRQcm9wcyIsImdldEljb25HZW9tZXRyeSIsImljb25JZCIsImdldEljb24iLCJkIiwiaWNvbiIsIlN2Z0ljb25MYXllciIsInN0YXRlIiwiZGF0YSIsImNoYW5nZUZsYWdzIiwiZGF0YUNoYW5nZWQiLCJfZXh0cmFjdFN1YmxheWVycyIsInByb3BzIiwiaWNvbkxheWVycyIsInJlZHVjZSIsImFjY3UiLCJwdXNoIiwiZ2VvbWV0cnkiLCJpZCIsInNldFN0YXRlIiwiT2JqZWN0IiwidmFsdWVzIiwibGF5ZXJJZCIsImxheWVycyIsImxlbmd0aCIsIm1hcCIsIlNjYXR0ZXJwbG90SWNvbkxheWVyIiwiaWNvbkdlb21ldHJ5IiwiQ29tcG9zaXRlTGF5ZXIiLCJsYXllck5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBLElBQU1BLHFCQUFxQixHQUFHLENBQzVCLENBRDRCLEVBRTVCLENBRjRCLEVBRzVCLENBSDRCLEVBSTVCLENBSjRCLEVBSzVCLENBQUMsQ0FMMkIsRUFNNUIsQ0FONEIsRUFPNUIsQ0FBQyxDQVAyQixFQVE1QixDQUFDLENBUjJCLEVBUzVCLENBVDRCLEVBVTVCLENBQUMsQ0FWMkIsRUFXNUIsQ0FBQyxDQVgyQixFQVk1QixDQVo0QixFQWE1QixDQUFDLENBYjJCLEVBYzVCLENBZDRCLEVBZTVCLENBZjRCLEVBZ0I1QixDQWhCNEIsRUFpQjVCLENBakI0QixFQWtCNUIsQ0FsQjRCLENBQTlCO0FBb0JBLElBQU1DLFlBQVksR0FBRztBQUNuQkMsRUFBQUEsZUFBZSxFQUFFLHlCQUFBQyxNQUFNO0FBQUEsV0FBSUgscUJBQUo7QUFBQSxHQURKO0FBRW5CSSxFQUFBQSxPQUFPLEVBQUUsaUJBQUFDLENBQUM7QUFBQSxXQUFJQSxDQUFDLENBQUNDLElBQU47QUFBQTtBQUZTLENBQXJCOztJQUtxQkMsWTs7Ozs7Ozs7Ozs7O0FBQ25CO3NDQUNrQjtBQUNoQixXQUFLQyxLQUFMLEdBQWE7QUFDWEMsUUFBQUEsSUFBSSxFQUFFO0FBREssT0FBYjtBQUdEOzs7c0NBRTBCO0FBQUEsVUFBZEMsV0FBYyxRQUFkQSxXQUFjOztBQUN6QixVQUFJQSxXQUFXLENBQUNDLFdBQWhCLEVBQTZCO0FBQzNCLGFBQUtDLGlCQUFMO0FBQ0Q7QUFDRjs7O3dDQUVtQjtBQUFBLHdCQUN1QixLQUFLQyxLQUQ1QjtBQUFBLFVBQ1hKLElBRFcsZUFDWEEsSUFEVztBQUFBLFVBQ0xQLGVBREssZUFDTEEsZUFESztBQUFBLFVBQ1lFLE9BRFosZUFDWUEsT0FEWjtBQUdsQixVQUFNVSxVQUFVLEdBQUdMLElBQUksQ0FBQ00sTUFBTCxDQUFZLFVBQUNDLElBQUQsRUFBT1gsQ0FBUCxFQUFhO0FBQzFDLFlBQU1GLE1BQU0sR0FBR0MsT0FBTyxDQUFDQyxDQUFELENBQXRCOztBQUVBLFlBQUlGLE1BQU0sSUFBSWEsSUFBZCxFQUFvQjtBQUNsQkEsVUFBQUEsSUFBSSxDQUFDYixNQUFELENBQUosQ0FBYU0sSUFBYixDQUFrQlEsSUFBbEIsQ0FBdUJaLENBQXZCO0FBQ0QsU0FGRCxNQUVPO0FBQ0wsY0FBTWEsUUFBUSxHQUFHaEIsZUFBZSxDQUFDQyxNQUFELENBQWYsSUFBMkJILHFCQUE1QztBQUNBZ0IsVUFBQUEsSUFBSSxDQUFDYixNQUFELENBQUosR0FBZTtBQUNiZ0IsWUFBQUEsRUFBRSxFQUFFaEIsTUFEUztBQUViZSxZQUFBQSxRQUFRLEVBQVJBLFFBRmE7QUFHYlQsWUFBQUEsSUFBSSxFQUFFLENBQUNKLENBQUQ7QUFITyxXQUFmO0FBS0Q7O0FBRUQsZUFBT1csSUFBUDtBQUNELE9BZmtCLEVBZWhCLEVBZmdCLENBQW5CO0FBaUJBLFdBQUtJLFFBQUwsQ0FBYztBQUNaWCxRQUFBQSxJQUFJLEVBQUVZLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjUixVQUFkO0FBRE0sT0FBZDtBQUdEOzs7bUNBRWM7QUFBQTs7QUFDYixVQUFNUyxPQUFPLEdBQUcsS0FBS1YsS0FBTCxDQUFXTSxFQUEzQjtBQUVBLFVBQU1LLE1BQU0sR0FDVixLQUFLaEIsS0FBTCxDQUFXQyxJQUFYLElBQ0EsS0FBS0QsS0FBTCxDQUFXQyxJQUFYLENBQWdCZ0IsTUFEaEIsSUFFQSxLQUFLakIsS0FBTCxDQUFXQyxJQUFYLENBQWdCaUIsR0FBaEIsQ0FDRTtBQUFBLFlBQUVQLEVBQUYsU0FBRUEsRUFBRjtBQUFBLFlBQU1WLElBQU4sU0FBTUEsSUFBTjtBQUFBLFlBQVlTLFFBQVosU0FBWUEsUUFBWjtBQUFBLGVBQ0UsSUFBSVMsZ0NBQUosb0NBQ0ssS0FBSSxDQUFDZCxLQURWO0FBRUVNLFVBQUFBLEVBQUUsWUFBS0ksT0FBTCxjQUFnQkosRUFBaEIsQ0FGSjtBQUdFVixVQUFBQSxJQUFJLEVBQUpBLElBSEY7QUFJRW1CLFVBQUFBLFlBQVksRUFBRVY7QUFKaEIsV0FERjtBQUFBLE9BREYsQ0FIRjtBQWFBLGFBQU9NLE1BQU0sSUFBSUEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCLENBQTFCLEdBQThCRCxNQUE5QixHQUF1QyxJQUE5QztBQUNEOzs7RUF4RHVDSyxvQjs7O0FBMkQxQ3RCLFlBQVksQ0FBQ3VCLFNBQWIsR0FBeUIsY0FBekI7QUFDQXZCLFlBQVksQ0FBQ04sWUFBYixHQUE0QkEsWUFBNUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge0NvbXBvc2l0ZUxheWVyfSBmcm9tICdkZWNrLmdsJztcbmltcG9ydCBTY2F0dGVycGxvdEljb25MYXllciBmcm9tICcuL3NjYXR0ZXJwbG90LWljb24tbGF5ZXInO1xuXG4vLyBkZWZhdWx0IGljb24gZ2VvbWV0cnkgaXMgYSBzcXVhcmVcbmNvbnN0IERFRkFVTFRfSUNPTl9HRU9NRVRSWSA9IFtcbiAgMSxcbiAgMSxcbiAgMCxcbiAgMSxcbiAgLTEsXG4gIDAsXG4gIC0xLFxuICAtMSxcbiAgMCxcbiAgLTEsXG4gIC0xLFxuICAwLFxuICAtMSxcbiAgMSxcbiAgMCxcbiAgMSxcbiAgMSxcbiAgMFxuXTtcbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgZ2V0SWNvbkdlb21ldHJ5OiBpY29uSWQgPT4gREVGQVVMVF9JQ09OX0dFT01FVFJZLFxuICBnZXRJY29uOiBkID0+IGQuaWNvblxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ZnSWNvbkxheWVyIGV4dGVuZHMgQ29tcG9zaXRlTGF5ZXIge1xuICAvLyBNdXN0IGJlIGRlZmluZWRcbiAgaW5pdGlhbGl6ZVN0YXRlKCkge1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBkYXRhOiB7fVxuICAgIH07XG4gIH1cblxuICB1cGRhdGVTdGF0ZSh7Y2hhbmdlRmxhZ3N9KSB7XG4gICAgaWYgKGNoYW5nZUZsYWdzLmRhdGFDaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9leHRyYWN0U3VibGF5ZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgX2V4dHJhY3RTdWJsYXllcnMoKSB7XG4gICAgY29uc3Qge2RhdGEsIGdldEljb25HZW9tZXRyeSwgZ2V0SWNvbn0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgaWNvbkxheWVycyA9IGRhdGEucmVkdWNlKChhY2N1LCBkKSA9PiB7XG4gICAgICBjb25zdCBpY29uSWQgPSBnZXRJY29uKGQpO1xuXG4gICAgICBpZiAoaWNvbklkIGluIGFjY3UpIHtcbiAgICAgICAgYWNjdVtpY29uSWRdLmRhdGEucHVzaChkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gZ2V0SWNvbkdlb21ldHJ5KGljb25JZCkgfHwgREVGQVVMVF9JQ09OX0dFT01FVFJZO1xuICAgICAgICBhY2N1W2ljb25JZF0gPSB7XG4gICAgICAgICAgaWQ6IGljb25JZCxcbiAgICAgICAgICBnZW9tZXRyeSxcbiAgICAgICAgICBkYXRhOiBbZF1cbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSwge30pO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkYXRhOiBPYmplY3QudmFsdWVzKGljb25MYXllcnMpXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJMYXllcnMoKSB7XG4gICAgY29uc3QgbGF5ZXJJZCA9IHRoaXMucHJvcHMuaWQ7XG5cbiAgICBjb25zdCBsYXllcnMgPVxuICAgICAgdGhpcy5zdGF0ZS5kYXRhICYmXG4gICAgICB0aGlzLnN0YXRlLmRhdGEubGVuZ3RoICYmXG4gICAgICB0aGlzLnN0YXRlLmRhdGEubWFwKFxuICAgICAgICAoe2lkLCBkYXRhLCBnZW9tZXRyeX0pID0+XG4gICAgICAgICAgbmV3IFNjYXR0ZXJwbG90SWNvbkxheWVyKHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMsXG4gICAgICAgICAgICBpZDogYCR7bGF5ZXJJZH0tJHtpZH1gLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGljb25HZW9tZXRyeTogZ2VvbWV0cnlcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIHJldHVybiBsYXllcnMgJiYgbGF5ZXJzLmxlbmd0aCA+IDAgPyBsYXllcnMgOiBudWxsO1xuICB9XG59XG5cblN2Z0ljb25MYXllci5sYXllck5hbWUgPSAnU3ZnSWNvbkxheWVyJztcblN2Z0ljb25MYXllci5kZWZhdWx0UHJvcHMgPSBkZWZhdWx0UHJvcHM7XG4iXX0=