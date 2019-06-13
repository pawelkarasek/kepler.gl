"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = require("../common/styled-components");

var _mapStyleSelector = _interopRequireDefault(require("./map-style-panel/map-style-selector"));

var _mapLayerSelector = _interopRequireDefault(require("./map-style-panel/map-layer-selector"));

var _icons = require("../common/icons");

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
MapManagerFactory.deps = [_mapStyleSelector["default"], _mapLayerSelector["default"]];

function MapManagerFactory(MapStyleSelector, LayerGroupSelector) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(MapManager, _Component);

    function MapManager() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, MapManager);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MapManager)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        isSelecting: false
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateConfig", function (newProp) {
        var newConfig = (0, _objectSpread2["default"])({}, _this.props.mapStyle, newProp);

        _this.props.onConfigChange(newConfig);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_toggleSelecting", function () {
        _this.setState({
          isSelecting: !_this.state.isSelecting
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_selectStyle", function (val) {
        _this.props.onStyleChange(val);

        _this._toggleSelecting();
      });
      return _this;
    }

    (0, _createClass2["default"])(MapManager, [{
      key: "render",
      value: function render() {
        var mapStyle = this.props.mapStyle;

        var editableLayers = _defaultSettings.DEFAULT_LAYER_GROUPS.map(function (lg) {
          return lg.slug;
        });

        return _react["default"].createElement("div", {
          className: "map-style-panel"
        }, _react["default"].createElement("div", null, _react["default"].createElement(MapStyleSelector, {
          mapStyle: mapStyle,
          isSelecting: this.state.isSelecting,
          onChange: this._selectStyle,
          toggleActive: this._toggleSelecting
        }), editableLayers.length ? _react["default"].createElement(LayerGroupSelector, {
          layers: mapStyle.visibleLayerGroups,
          editableLayers: editableLayers,
          topLayers: mapStyle.topLayerGroups,
          onChange: this._updateConfig
        }) : null, _react["default"].createElement(_styledComponents.Button, {
          onClick: this.props.showAddMapStyleModal,
          secondary: true
        }, _react["default"].createElement(_icons.Add, {
          height: "12px"
        }), "Add Map Style")));
      }
    }]);
    return MapManager;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    mapStyle: _propTypes["default"].object.isRequired,
    onConfigChange: _propTypes["default"].func.isRequired,
    onStyleChange: _propTypes["default"].func.isRequired,
    showAddMapStyleModal: _propTypes["default"].func.isRequired
  }), _temp;
}

var _default = MapManagerFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbWFwLW1hbmFnZXIuanMiXSwibmFtZXMiOlsiTWFwTWFuYWdlckZhY3RvcnkiLCJkZXBzIiwiTWFwU3R5bGVTZWxlY3RvckZhY3RvcnkiLCJMYXllckdyb3VwU2VsZWN0b3JGYWN0b3J5IiwiTWFwU3R5bGVTZWxlY3RvciIsIkxheWVyR3JvdXBTZWxlY3RvciIsImlzU2VsZWN0aW5nIiwibmV3UHJvcCIsIm5ld0NvbmZpZyIsInByb3BzIiwibWFwU3R5bGUiLCJvbkNvbmZpZ0NoYW5nZSIsInNldFN0YXRlIiwic3RhdGUiLCJ2YWwiLCJvblN0eWxlQ2hhbmdlIiwiX3RvZ2dsZVNlbGVjdGluZyIsImVkaXRhYmxlTGF5ZXJzIiwiREVGQVVMVF9MQVlFUl9HUk9VUFMiLCJtYXAiLCJsZyIsInNsdWciLCJfc2VsZWN0U3R5bGUiLCJsZW5ndGgiLCJ2aXNpYmxlTGF5ZXJHcm91cHMiLCJ0b3BMYXllckdyb3VwcyIsIl91cGRhdGVDb25maWciLCJzaG93QWRkTWFwU3R5bGVNb2RhbCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWUFBLGlCQUFpQixDQUFDQyxJQUFsQixHQUF5QixDQUN2QkMsNEJBRHVCLEVBRXZCQyw0QkFGdUIsQ0FBekI7O0FBS0EsU0FBU0gsaUJBQVQsQ0FBMkJJLGdCQUEzQixFQUE2Q0Msa0JBQTdDLEVBQWlFO0FBQUE7O0FBQy9EO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0dBUVU7QUFDTkMsUUFBQUEsV0FBVyxFQUFFO0FBRFAsT0FSVjtBQUFBLHdHQVlrQixVQUFBQyxPQUFPLEVBQUk7QUFDekIsWUFBTUMsU0FBUyxzQ0FBTyxNQUFLQyxLQUFMLENBQVdDLFFBQWxCLEVBQStCSCxPQUEvQixDQUFmOztBQUNBLGNBQUtFLEtBQUwsQ0FBV0UsY0FBWCxDQUEwQkgsU0FBMUI7QUFDRCxPQWZIO0FBQUEsMkdBaUJxQixZQUFNO0FBQ3ZCLGNBQUtJLFFBQUwsQ0FBYztBQUFDTixVQUFBQSxXQUFXLEVBQUUsQ0FBQyxNQUFLTyxLQUFMLENBQVdQO0FBQTFCLFNBQWQ7QUFDRCxPQW5CSDtBQUFBLHVHQXFCaUIsVUFBQVEsR0FBRyxFQUFJO0FBQ3BCLGNBQUtMLEtBQUwsQ0FBV00sYUFBWCxDQUF5QkQsR0FBekI7O0FBQ0EsY0FBS0UsZ0JBQUw7QUFDRCxPQXhCSDtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLCtCQTBCVztBQUFBLFlBQ0FOLFFBREEsR0FDWSxLQUFLRCxLQURqQixDQUNBQyxRQURBOztBQUVQLFlBQU1PLGNBQWMsR0FBR0Msc0NBQXFCQyxHQUFyQixDQUF5QixVQUFBQyxFQUFFO0FBQUEsaUJBQ2hEQSxFQUFFLENBQUNDLElBRDZDO0FBQUEsU0FBM0IsQ0FBdkI7O0FBSUEsZUFDRTtBQUFLLFVBQUEsU0FBUyxFQUFDO0FBQWYsV0FDRSw2Q0FDRSxnQ0FBQyxnQkFBRDtBQUNFLFVBQUEsUUFBUSxFQUFFWCxRQURaO0FBRUUsVUFBQSxXQUFXLEVBQUUsS0FBS0csS0FBTCxDQUFXUCxXQUYxQjtBQUdFLFVBQUEsUUFBUSxFQUFFLEtBQUtnQixZQUhqQjtBQUlFLFVBQUEsWUFBWSxFQUFFLEtBQUtOO0FBSnJCLFVBREYsRUFPR0MsY0FBYyxDQUFDTSxNQUFmLEdBQ0MsZ0NBQUMsa0JBQUQ7QUFDRSxVQUFBLE1BQU0sRUFBRWIsUUFBUSxDQUFDYyxrQkFEbkI7QUFFRSxVQUFBLGNBQWMsRUFBRVAsY0FGbEI7QUFHRSxVQUFBLFNBQVMsRUFBRVAsUUFBUSxDQUFDZSxjQUh0QjtBQUlFLFVBQUEsUUFBUSxFQUFFLEtBQUtDO0FBSmpCLFVBREQsR0FPRyxJQWROLEVBZUUsZ0NBQUMsd0JBQUQ7QUFDRSxVQUFBLE9BQU8sRUFBRSxLQUFLakIsS0FBTCxDQUFXa0Isb0JBRHRCO0FBRUUsVUFBQSxTQUFTO0FBRlgsV0FHRSxnQ0FBQyxVQUFEO0FBQUssVUFBQSxNQUFNLEVBQUM7QUFBWixVQUhGLGtCQWZGLENBREYsQ0FERjtBQXlCRDtBQXpESDtBQUFBO0FBQUEsSUFBZ0NDLGdCQUFoQyx5REFDcUI7QUFDakJsQixJQUFBQSxRQUFRLEVBQUVtQixzQkFBVUMsTUFBVixDQUFpQkMsVUFEVjtBQUVqQnBCLElBQUFBLGNBQWMsRUFBRWtCLHNCQUFVRyxJQUFWLENBQWVELFVBRmQ7QUFHakJoQixJQUFBQSxhQUFhLEVBQUVjLHNCQUFVRyxJQUFWLENBQWVELFVBSGI7QUFJakJKLElBQUFBLG9CQUFvQixFQUFFRSxzQkFBVUcsSUFBVixDQUFlRDtBQUpwQixHQURyQjtBQTJERDs7ZUFFYy9CLGlCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IE1hcFN0eWxlU2VsZWN0b3JGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9tYXAtc3R5bGUtcGFuZWwvbWFwLXN0eWxlLXNlbGVjdG9yJztcbmltcG9ydCBMYXllckdyb3VwU2VsZWN0b3JGYWN0b3J5IGZyb20gJ2NvbXBvbmVudHMvc2lkZS1wYW5lbC9tYXAtc3R5bGUtcGFuZWwvbWFwLWxheWVyLXNlbGVjdG9yJztcblxuaW1wb3J0IHtBZGR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCB7IERFRkFVTFRfTEFZRVJfR1JPVVBTIH0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuXG5NYXBNYW5hZ2VyRmFjdG9yeS5kZXBzID0gW1xuICBNYXBTdHlsZVNlbGVjdG9yRmFjdG9yeSxcbiAgTGF5ZXJHcm91cFNlbGVjdG9yRmFjdG9yeVxuXTtcblxuZnVuY3Rpb24gTWFwTWFuYWdlckZhY3RvcnkoTWFwU3R5bGVTZWxlY3RvciwgTGF5ZXJHcm91cFNlbGVjdG9yKSB7XG4gIHJldHVybiBjbGFzcyBNYXBNYW5hZ2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgbWFwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG9uQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgb25TdHlsZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHNob3dBZGRNYXBTdHlsZU1vZGFsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkXG4gICAgfTtcblxuICAgIHN0YXRlID0ge1xuICAgICAgaXNTZWxlY3Rpbmc6IGZhbHNlXG4gICAgfTtcblxuICAgIF91cGRhdGVDb25maWcgPSBuZXdQcm9wID0+IHtcbiAgICAgIGNvbnN0IG5ld0NvbmZpZyA9IHsuLi50aGlzLnByb3BzLm1hcFN0eWxlLCAuLi5uZXdQcm9wfTtcbiAgICAgIHRoaXMucHJvcHMub25Db25maWdDaGFuZ2UobmV3Q29uZmlnKTtcbiAgICB9O1xuXG4gICAgX3RvZ2dsZVNlbGVjdGluZyA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe2lzU2VsZWN0aW5nOiAhdGhpcy5zdGF0ZS5pc1NlbGVjdGluZ30pO1xuICAgIH07XG5cbiAgICBfc2VsZWN0U3R5bGUgPSB2YWwgPT4ge1xuICAgICAgdGhpcy5wcm9wcy5vblN0eWxlQ2hhbmdlKHZhbCk7XG4gICAgICB0aGlzLl90b2dnbGVTZWxlY3RpbmcoKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge21hcFN0eWxlfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCBlZGl0YWJsZUxheWVycyA9IERFRkFVTFRfTEFZRVJfR1JPVVBTLm1hcChsZyA9PlxuICAgICAgICBsZy5zbHVnXG4gICAgICk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWFwLXN0eWxlLXBhbmVsXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxNYXBTdHlsZVNlbGVjdG9yXG4gICAgICAgICAgICAgIG1hcFN0eWxlPXttYXBTdHlsZX1cbiAgICAgICAgICAgICAgaXNTZWxlY3Rpbmc9e3RoaXMuc3RhdGUuaXNTZWxlY3Rpbmd9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9zZWxlY3RTdHlsZX1cbiAgICAgICAgICAgICAgdG9nZ2xlQWN0aXZlPXt0aGlzLl90b2dnbGVTZWxlY3Rpbmd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge2VkaXRhYmxlTGF5ZXJzLmxlbmd0aCA/IChcbiAgICAgICAgICAgICAgPExheWVyR3JvdXBTZWxlY3RvclxuICAgICAgICAgICAgICAgIGxheWVycz17bWFwU3R5bGUudmlzaWJsZUxheWVyR3JvdXBzfVxuICAgICAgICAgICAgICAgIGVkaXRhYmxlTGF5ZXJzPXtlZGl0YWJsZUxheWVyc31cbiAgICAgICAgICAgICAgICB0b3BMYXllcnM9e21hcFN0eWxlLnRvcExheWVyR3JvdXBzfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl91cGRhdGVDb25maWd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5wcm9wcy5zaG93QWRkTWFwU3R5bGVNb2RhbH1cbiAgICAgICAgICAgICAgc2Vjb25kYXJ5PlxuICAgICAgICAgICAgICA8QWRkIGhlaWdodD1cIjEycHhcIiAvPkFkZCBNYXAgU3R5bGVcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcE1hbmFnZXJGYWN0b3J5O1xuIl19