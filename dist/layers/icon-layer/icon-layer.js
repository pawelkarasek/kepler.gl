"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.pointVisConfigs = exports.iconRequiredColumns = exports.iconResolver = exports.iconAccessor = exports.iconPosResolver = exports.iconPosAccessor = exports.SVG_ICON_URL = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _baseLayer = _interopRequireDefault(require("../base-layer"));

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _window = _interopRequireDefault(require("global/window"));

var _colorUtils = require("../../utils/color-utils");

var _svgIconLayer = _interopRequireDefault(require("../../deckgl-layers/svg-icon-layer/svg-icon-layer"));

var _iconLayerIcon = _interopRequireDefault(require("./icon-layer-icon"));

var _defaultSettings = require("../../constants/default-settings");

var _iconInfoModal = _interopRequireDefault(require("./icon-info-modal"));

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
var SVG_ICON_URL = "".concat(_defaultSettings.CLOUDFRONT, "/icons/svg-icons.json");
exports.SVG_ICON_URL = SVG_ICON_URL;

var iconPosAccessor = function iconPosAccessor(_ref) {
  var lat = _ref.lat,
      lng = _ref.lng;
  return function (d) {
    return [d.data[lng.fieldIdx], d.data[lat.fieldIdx]];
  };
};

exports.iconPosAccessor = iconPosAccessor;

var iconPosResolver = function iconPosResolver(_ref2) {
  var lat = _ref2.lat,
      lng = _ref2.lng;
  return "".concat(lat.fieldIdx, "-").concat(lng.fieldIdx);
};

exports.iconPosResolver = iconPosResolver;

var iconAccessor = function iconAccessor(_ref3) {
  var icon = _ref3.icon;
  return function (d) {
    return d.data[icon.fieldIdx];
  };
};

exports.iconAccessor = iconAccessor;

var iconResolver = function iconResolver(_ref4) {
  var icon = _ref4.icon;
  return icon.fieldIdx;
};

exports.iconResolver = iconResolver;
var iconRequiredColumns = ['lat', 'lng', 'icon'];
exports.iconRequiredColumns = iconRequiredColumns;
var pointVisConfigs = {
  radius: 'radius',
  fixedRadius: 'fixedRadius',
  opacity: 'opacity',
  colorRange: 'colorRange',
  radiusRange: 'radiusRange'
};
exports.pointVisConfigs = pointVisConfigs;

var IconLayer =
/*#__PURE__*/
function (_Layer) {
  (0, _inherits2["default"])(IconLayer, _Layer);

  function IconLayer(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, IconLayer);
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(IconLayer).call(this, props));

    _this.registerVisConfig(pointVisConfigs);

    _this.getPosition = (0, _lodash["default"])(iconPosAccessor, iconPosResolver);
    _this.getIcon = (0, _lodash["default"])(iconAccessor, iconResolver); // prepare layer info modal

    _this._layerInfoModal = (0, _iconInfoModal["default"])();

    _this.getSvgIcons();

    return _this;
  }

  (0, _createClass2["default"])(IconLayer, [{
    key: "getSvgIcons",
    value: function () {
      var _getSvgIcons = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var fetchConfig, response, _ref5, svgIcons;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                fetchConfig = {
                  method: 'GET',
                  mode: 'cors',
                  cache: 'no-cache'
                };

                if (!_window["default"].fetch) {
                  _context.next = 11;
                  break;
                }

                _context.next = 4;
                return _window["default"].fetch(SVG_ICON_URL, fetchConfig);

              case 4:
                response = _context.sent;
                _context.next = 7;
                return response.json();

              case 7:
                _ref5 = _context.sent;
                svgIcons = _ref5.svgIcons;
                this.iconGeometry = svgIcons.reduce(function (accu, curr) {
                  return (0, _objectSpread3["default"])({}, accu, (0, _defineProperty2["default"])({}, curr.id, curr.mesh.cells.reduce(function (prev, cell) {
                    cell.forEach(function (p) {
                      Array.prototype.push.apply(prev, curr.mesh.positions[p]);
                    });
                    return prev;
                  }, [])));
                }, {});
                this._layerInfoModal = (0, _iconInfoModal["default"])(svgIcons);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSvgIcons() {
        return _getSvgIcons.apply(this, arguments);
      }

      return getSvgIcons;
    }()
  }, {
    key: "formatLayerData",
    // TODO: fix complexity

    /* eslint-disable complexity */
    value: function formatLayerData(_, allData, filteredIndex, oldLayerData) {
      var _this2 = this;

      var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var _this$config = this.config,
          colorScale = _this$config.colorScale,
          colorDomain = _this$config.colorDomain,
          colorField = _this$config.colorField,
          color = _this$config.color,
          columns = _this$config.columns,
          sizeField = _this$config.sizeField,
          sizeScale = _this$config.sizeScale,
          sizeDomain = _this$config.sizeDomain,
          _this$config$visConfi = _this$config.visConfig,
          radiusRange = _this$config$visConfi.radiusRange,
          colorRange = _this$config$visConfi.colorRange; // point color

      var cScale = colorField && this.getVisChannelScale(colorScale, colorDomain, colorRange.colors.map(_colorUtils.hexToRgb)); // point radius

      var rScale = sizeField && this.getVisChannelScale(sizeScale, sizeDomain, radiusRange);
      var getPosition = this.getPosition(columns);
      var getIcon = this.getIcon(columns);

      if (!oldLayerData || oldLayerData.getPosition !== getPosition) {
        this.updateLayerMeta(allData, getPosition);
      }

      var data;

      if (oldLayerData && oldLayerData.data && opt.sameData && oldLayerData.getPosition === getPosition && oldLayerData.getIcon === getIcon) {
        data = oldLayerData.data;
      } else {
        data = filteredIndex.reduce(function (accu, index) {
          var pos = getPosition({
            data: allData[index]
          });
          var icon = getIcon({
            data: allData[index]
          }); // if doesn't have point lat or lng, do not add the point
          // deck.gl can't handle position = null

          if (!pos.every(Number.isFinite) || typeof icon !== 'string') {
            return accu;
          }

          accu.push({
            index: index,
            icon: icon,
            data: allData[index]
          });
          return accu;
        }, []);
      }

      var getRadius = rScale ? function (d) {
        return _this2.getEncodedChannelValue(rScale, d.data, sizeField);
      } : 1;
      var getColor = cScale ? function (d) {
        return _this2.getEncodedChannelValue(cScale, d.data, colorField);
      } : color;
      return {
        data: data,
        getPosition: getPosition,
        getIcon: getIcon,
        getColor: getColor,
        getRadius: getRadius
      };
    }
    /* eslint-enable complexity */

  }, {
    key: "updateLayerMeta",
    value: function updateLayerMeta(allData, getPosition) {
      var bounds = this.getPointsBounds(allData, function (d) {
        return getPosition({
          data: d
        });
      });
      this.updateMeta({
        bounds: bounds
      });
    }
  }, {
    key: "renderLayer",
    value: function renderLayer(_ref6) {
      var _this3 = this;

      var data = _ref6.data,
          idx = _ref6.idx,
          objectHovered = _ref6.objectHovered,
          mapState = _ref6.mapState,
          interactionConfig = _ref6.interactionConfig,
          layerInteraction = _ref6.layerInteraction;
      var layerProps = (0, _objectSpread3["default"])({
        radiusMinPixels: 1,
        radiusScale: this.getRadiusScaleByZoom(mapState)
      }, this.config.visConfig.fixedRadius ? {} : {
        radiusMaxPixels: 500
      });
      return [new _svgIconLayer["default"]((0, _objectSpread3["default"])({}, layerProps, data, layerInteraction, {
        id: this.id,
        idx: idx,
        opacity: this.config.visConfig.opacity,
        getIconGeometry: function getIconGeometry(id) {
          return _this3.iconGeometry[id];
        },
        // picking
        autoHighlight: true,
        highlightColor: this.config.highlightColor,
        pickable: true,
        // parameters
        parameters: {
          depthTest: mapState.dragRotate
        },
        // update triggers
        updateTriggers: {
          getRadius: {
            sizeField: this.config.colorField,
            radiusRange: this.config.visConfig.radiusRange,
            sizeScale: this.config.sizeScale
          },
          getColor: {
            color: this.config.color,
            colorField: this.config.colorField,
            colorRange: this.config.visConfig.colorRange,
            colorScale: this.config.colorScale
          }
        }
      }))].concat((0, _toConsumableArray2["default"])(this.isLayerHovered(objectHovered) ? [new _svgIconLayer["default"]((0, _objectSpread3["default"])({}, layerProps, {
        id: "".concat(this.id, "-hovered"),
        data: [objectHovered.object],
        getPosition: data.getPosition,
        getRadius: data.getRadius,
        getColor: this.config.highlightColor,
        getIconGeometry: function getIconGeometry(id) {
          return _this3.iconGeometry[id];
        },
        pickable: false
      }))] : []));
    }
  }, {
    key: "type",
    get: function get() {
      return 'icon';
    }
  }, {
    key: "requiredLayerColumns",
    get: function get() {
      return iconRequiredColumns;
    }
  }, {
    key: "columnPairs",
    get: function get() {
      return this.defaultPointColumnPairs;
    }
  }, {
    key: "layerIcon",
    get: function get() {
      return _iconLayerIcon["default"];
    }
  }, {
    key: "visualChannels",
    get: function get() {
      return (0, _objectSpread3["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(IconLayer.prototype), "visualChannels", this), {
        size: (0, _objectSpread3["default"])({}, (0, _get2["default"])((0, _getPrototypeOf2["default"])(IconLayer.prototype), "visualChannels", this).size, {
          range: 'radiusRange',
          property: 'radius',
          channelScaleType: 'radius'
        })
      });
    }
  }, {
    key: "layerInfoModal",
    get: function get() {
      return {
        id: 'iconInfo',
        template: this._layerInfoModal,
        modalProps: {
          title: 'How to draw icons'
        }
      };
    }
  }], [{
    key: "findDefaultLayerProps",
    value: function findDefaultLayerProps(_ref7) {
      var fieldPairs = _ref7.fieldPairs,
          fields = _ref7.fields;

      if (!fieldPairs.length) {
        return [];
      }

      var iconFields = fields.filter(function (_ref8) {
        var name = _ref8.name;
        return name.replace(/[_,.]+/g, ' ').trim().split(' ').some(function (seg) {
          return _defaultSettings.ICON_FIELDS.icon.some(function (t) {
            return t.includes(seg);
          });
        });
      });

      if (!iconFields.length) {
        return [];
      } // create icon layers for first point pair


      var ptPair = fieldPairs[0];
      var props = iconFields.map(function (iconField) {
        return {
          label: iconField.name.replace(/[_,.]+/g, ' ').trim(),
          columns: {
            lat: ptPair.pair.lat,
            lng: ptPair.pair.lng,
            icon: {
              value: iconField.name,
              fieldIdx: iconField.tableFieldIndex - 1
            }
          },
          isVisible: true
        };
      });
      return props;
    }
  }]);
  return IconLayer;
}(_baseLayer["default"]);

exports["default"] = IconLayer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvaWNvbi1sYXllci9pY29uLWxheWVyLmpzIl0sIm5hbWVzIjpbIlNWR19JQ09OX1VSTCIsIkNMT1VERlJPTlQiLCJpY29uUG9zQWNjZXNzb3IiLCJsYXQiLCJsbmciLCJkIiwiZGF0YSIsImZpZWxkSWR4IiwiaWNvblBvc1Jlc29sdmVyIiwiaWNvbkFjY2Vzc29yIiwiaWNvbiIsImljb25SZXNvbHZlciIsImljb25SZXF1aXJlZENvbHVtbnMiLCJwb2ludFZpc0NvbmZpZ3MiLCJyYWRpdXMiLCJmaXhlZFJhZGl1cyIsIm9wYWNpdHkiLCJjb2xvclJhbmdlIiwicmFkaXVzUmFuZ2UiLCJJY29uTGF5ZXIiLCJwcm9wcyIsInJlZ2lzdGVyVmlzQ29uZmlnIiwiZ2V0UG9zaXRpb24iLCJnZXRJY29uIiwiX2xheWVySW5mb01vZGFsIiwiZ2V0U3ZnSWNvbnMiLCJmZXRjaENvbmZpZyIsIm1ldGhvZCIsIm1vZGUiLCJjYWNoZSIsIndpbmRvdyIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwic3ZnSWNvbnMiLCJpY29uR2VvbWV0cnkiLCJyZWR1Y2UiLCJhY2N1IiwiY3VyciIsImlkIiwibWVzaCIsImNlbGxzIiwicHJldiIsImNlbGwiLCJmb3JFYWNoIiwicCIsIkFycmF5IiwicHJvdG90eXBlIiwicHVzaCIsImFwcGx5IiwicG9zaXRpb25zIiwiXyIsImFsbERhdGEiLCJmaWx0ZXJlZEluZGV4Iiwib2xkTGF5ZXJEYXRhIiwib3B0IiwiY29uZmlnIiwiY29sb3JTY2FsZSIsImNvbG9yRG9tYWluIiwiY29sb3JGaWVsZCIsImNvbG9yIiwiY29sdW1ucyIsInNpemVGaWVsZCIsInNpemVTY2FsZSIsInNpemVEb21haW4iLCJ2aXNDb25maWciLCJjU2NhbGUiLCJnZXRWaXNDaGFubmVsU2NhbGUiLCJjb2xvcnMiLCJtYXAiLCJoZXhUb1JnYiIsInJTY2FsZSIsInVwZGF0ZUxheWVyTWV0YSIsInNhbWVEYXRhIiwiaW5kZXgiLCJwb3MiLCJldmVyeSIsIk51bWJlciIsImlzRmluaXRlIiwiZ2V0UmFkaXVzIiwiZ2V0RW5jb2RlZENoYW5uZWxWYWx1ZSIsImdldENvbG9yIiwiYm91bmRzIiwiZ2V0UG9pbnRzQm91bmRzIiwidXBkYXRlTWV0YSIsImlkeCIsIm9iamVjdEhvdmVyZWQiLCJtYXBTdGF0ZSIsImludGVyYWN0aW9uQ29uZmlnIiwibGF5ZXJJbnRlcmFjdGlvbiIsImxheWVyUHJvcHMiLCJyYWRpdXNNaW5QaXhlbHMiLCJyYWRpdXNTY2FsZSIsImdldFJhZGl1c1NjYWxlQnlab29tIiwicmFkaXVzTWF4UGl4ZWxzIiwiU3ZnSWNvbkxheWVyIiwiZ2V0SWNvbkdlb21ldHJ5IiwiYXV0b0hpZ2hsaWdodCIsImhpZ2hsaWdodENvbG9yIiwicGlja2FibGUiLCJwYXJhbWV0ZXJzIiwiZGVwdGhUZXN0IiwiZHJhZ1JvdGF0ZSIsInVwZGF0ZVRyaWdnZXJzIiwiaXNMYXllckhvdmVyZWQiLCJvYmplY3QiLCJkZWZhdWx0UG9pbnRDb2x1bW5QYWlycyIsIkljb25MYXllckljb24iLCJzaXplIiwicmFuZ2UiLCJwcm9wZXJ0eSIsImNoYW5uZWxTY2FsZVR5cGUiLCJ0ZW1wbGF0ZSIsIm1vZGFsUHJvcHMiLCJ0aXRsZSIsImZpZWxkUGFpcnMiLCJmaWVsZHMiLCJsZW5ndGgiLCJpY29uRmllbGRzIiwiZmlsdGVyIiwibmFtZSIsInJlcGxhY2UiLCJ0cmltIiwic3BsaXQiLCJzb21lIiwic2VnIiwiSUNPTl9GSUVMRFMiLCJ0IiwiaW5jbHVkZXMiLCJwdFBhaXIiLCJpY29uRmllbGQiLCJsYWJlbCIsInBhaXIiLCJ2YWx1ZSIsInRhYmxlRmllbGRJbmRleCIsImlzVmlzaWJsZSIsIkxheWVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlPLElBQU1BLFlBQVksYUFBTUMsMkJBQU4sMEJBQWxCOzs7QUFFQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCO0FBQUEsTUFBRUMsR0FBRixRQUFFQSxHQUFGO0FBQUEsTUFBT0MsR0FBUCxRQUFPQSxHQUFQO0FBQUEsU0FBZ0IsVUFBQUMsQ0FBQztBQUFBLFdBQUksQ0FDbERBLENBQUMsQ0FBQ0MsSUFBRixDQUFPRixHQUFHLENBQUNHLFFBQVgsQ0FEa0QsRUFFbERGLENBQUMsQ0FBQ0MsSUFBRixDQUFPSCxHQUFHLENBQUNJLFFBQVgsQ0FGa0QsQ0FBSjtBQUFBLEdBQWpCO0FBQUEsQ0FBeEI7Ozs7QUFLQSxJQUFNQyxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCO0FBQUEsTUFBRUwsR0FBRixTQUFFQSxHQUFGO0FBQUEsTUFBT0MsR0FBUCxTQUFPQSxHQUFQO0FBQUEsbUJBQzFCRCxHQUFHLENBQUNJLFFBRHNCLGNBQ1ZILEdBQUcsQ0FBQ0csUUFETTtBQUFBLENBQXhCOzs7O0FBR0EsSUFBTUUsWUFBWSxHQUFHLFNBQWZBLFlBQWU7QUFBQSxNQUFFQyxJQUFGLFNBQUVBLElBQUY7QUFBQSxTQUFZLFVBQUFMLENBQUM7QUFBQSxXQUFJQSxDQUFDLENBQUNDLElBQUYsQ0FBT0ksSUFBSSxDQUFDSCxRQUFaLENBQUo7QUFBQSxHQUFiO0FBQUEsQ0FBckI7Ozs7QUFDQSxJQUFNSSxZQUFZLEdBQUcsU0FBZkEsWUFBZTtBQUFBLE1BQUVELElBQUYsU0FBRUEsSUFBRjtBQUFBLFNBQVlBLElBQUksQ0FBQ0gsUUFBakI7QUFBQSxDQUFyQjs7O0FBRUEsSUFBTUssbUJBQW1CLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLE1BQWYsQ0FBNUI7O0FBRUEsSUFBTUMsZUFBZSxHQUFHO0FBQzdCQyxFQUFBQSxNQUFNLEVBQUUsUUFEcUI7QUFFN0JDLEVBQUFBLFdBQVcsRUFBRSxhQUZnQjtBQUc3QkMsRUFBQUEsT0FBTyxFQUFFLFNBSG9CO0FBSTdCQyxFQUFBQSxVQUFVLEVBQUUsWUFKaUI7QUFLN0JDLEVBQUFBLFdBQVcsRUFBRTtBQUxnQixDQUF4Qjs7O0lBUWNDLFM7Ozs7O0FBQ25CLHFCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7QUFDakIscUhBQU1BLEtBQU47O0FBRUEsVUFBS0MsaUJBQUwsQ0FBdUJSLGVBQXZCOztBQUNBLFVBQUtTLFdBQUwsR0FBbUIsd0JBQVFwQixlQUFSLEVBQXlCTSxlQUF6QixDQUFuQjtBQUNBLFVBQUtlLE9BQUwsR0FBZSx3QkFBUWQsWUFBUixFQUFzQkUsWUFBdEIsQ0FBZixDQUxpQixDQU9qQjs7QUFDQSxVQUFLYSxlQUFMLEdBQXVCLGdDQUF2Qjs7QUFDQSxVQUFLQyxXQUFMOztBQVRpQjtBQVVsQjs7Ozs7Ozs7Ozs7Ozs7QUF5Q09DLGdCQUFBQSxXLEdBQWM7QUFDbEJDLGtCQUFBQSxNQUFNLEVBQUUsS0FEVTtBQUVsQkMsa0JBQUFBLElBQUksRUFBRSxNQUZZO0FBR2xCQyxrQkFBQUEsS0FBSyxFQUFFO0FBSFcsaUI7O3FCQU1oQkMsbUJBQU9DLEs7Ozs7Ozt1QkFDY0QsbUJBQU9DLEtBQVAsQ0FBYS9CLFlBQWIsRUFBMkIwQixXQUEzQixDOzs7QUFBakJNLGdCQUFBQSxROzt1QkFDbUJBLFFBQVEsQ0FBQ0MsSUFBVCxFOzs7O0FBQWxCQyxnQkFBQUEsUSxTQUFBQSxRO0FBRVAscUJBQUtDLFlBQUwsR0FBb0JELFFBQVEsQ0FBQ0UsTUFBVCxDQUNsQixVQUFDQyxJQUFELEVBQU9DLElBQVA7QUFBQSw0REFDS0QsSUFETCx1Q0FFR0MsSUFBSSxDQUFDQyxFQUZSLEVBRWFELElBQUksQ0FBQ0UsSUFBTCxDQUFVQyxLQUFWLENBQWdCTCxNQUFoQixDQUF1QixVQUFDTSxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDaERBLG9CQUFBQSxJQUFJLENBQUNDLE9BQUwsQ0FBYSxVQUFBQyxDQUFDLEVBQUk7QUFDaEJDLHNCQUFBQSxLQUFLLENBQUNDLFNBQU4sQ0FBZ0JDLElBQWhCLENBQXFCQyxLQUFyQixDQUEyQlAsSUFBM0IsRUFBaUNKLElBQUksQ0FBQ0UsSUFBTCxDQUFVVSxTQUFWLENBQW9CTCxDQUFwQixDQUFqQztBQUNELHFCQUZEO0FBR0EsMkJBQU9ILElBQVA7QUFDRCxtQkFMVSxFQUtSLEVBTFEsQ0FGYjtBQUFBLGlCQURrQixFQVVsQixFQVZrQixDQUFwQjtBQVlBLHFCQUFLbEIsZUFBTCxHQUF1QiwrQkFBcUJVLFFBQXJCLENBQXZCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q0o7O0FBQ0E7b0NBQ2dCaUIsQyxFQUFHQyxPLEVBQVNDLGEsRUFBZUMsWSxFQUF3QjtBQUFBOztBQUFBLFVBQVZDLEdBQVUsdUVBQUosRUFBSTtBQUFBLHlCQVc3RCxLQUFLQyxNQVh3RDtBQUFBLFVBRS9EQyxVQUYrRCxnQkFFL0RBLFVBRitEO0FBQUEsVUFHL0RDLFdBSCtELGdCQUcvREEsV0FIK0Q7QUFBQSxVQUkvREMsVUFKK0QsZ0JBSS9EQSxVQUorRDtBQUFBLFVBSy9EQyxLQUwrRCxnQkFLL0RBLEtBTCtEO0FBQUEsVUFNL0RDLE9BTitELGdCQU0vREEsT0FOK0Q7QUFBQSxVQU8vREMsU0FQK0QsZ0JBTy9EQSxTQVArRDtBQUFBLFVBUS9EQyxTQVIrRCxnQkFRL0RBLFNBUitEO0FBQUEsVUFTL0RDLFVBVCtELGdCQVMvREEsVUFUK0Q7QUFBQSwrQ0FVL0RDLFNBVitEO0FBQUEsVUFVbkQvQyxXQVZtRCx5QkFVbkRBLFdBVm1EO0FBQUEsVUFVdENELFVBVnNDLHlCQVV0Q0EsVUFWc0MsRUFhakU7O0FBQ0EsVUFBTWlELE1BQU0sR0FDVlAsVUFBVSxJQUNWLEtBQUtRLGtCQUFMLENBQ0VWLFVBREYsRUFFRUMsV0FGRixFQUdFekMsVUFBVSxDQUFDbUQsTUFBWCxDQUFrQkMsR0FBbEIsQ0FBc0JDLG9CQUF0QixDQUhGLENBRkYsQ0FkaUUsQ0FzQmpFOztBQUNBLFVBQU1DLE1BQU0sR0FDVlQsU0FBUyxJQUFJLEtBQUtLLGtCQUFMLENBQXdCSixTQUF4QixFQUFtQ0MsVUFBbkMsRUFBK0M5QyxXQUEvQyxDQURmO0FBR0EsVUFBTUksV0FBVyxHQUFHLEtBQUtBLFdBQUwsQ0FBaUJ1QyxPQUFqQixDQUFwQjtBQUNBLFVBQU10QyxPQUFPLEdBQUcsS0FBS0EsT0FBTCxDQUFhc0MsT0FBYixDQUFoQjs7QUFFQSxVQUFJLENBQUNQLFlBQUQsSUFBaUJBLFlBQVksQ0FBQ2hDLFdBQWIsS0FBNkJBLFdBQWxELEVBQStEO0FBQzdELGFBQUtrRCxlQUFMLENBQXFCcEIsT0FBckIsRUFBOEI5QixXQUE5QjtBQUNEOztBQUVELFVBQUloQixJQUFKOztBQUNBLFVBQ0VnRCxZQUFZLElBQ1pBLFlBQVksQ0FBQ2hELElBRGIsSUFFQWlELEdBQUcsQ0FBQ2tCLFFBRkosSUFHQW5CLFlBQVksQ0FBQ2hDLFdBQWIsS0FBNkJBLFdBSDdCLElBSUFnQyxZQUFZLENBQUMvQixPQUFiLEtBQXlCQSxPQUwzQixFQU1FO0FBQ0FqQixRQUFBQSxJQUFJLEdBQUdnRCxZQUFZLENBQUNoRCxJQUFwQjtBQUNELE9BUkQsTUFRTztBQUNMQSxRQUFBQSxJQUFJLEdBQUcrQyxhQUFhLENBQUNqQixNQUFkLENBQXFCLFVBQUNDLElBQUQsRUFBT3FDLEtBQVAsRUFBaUI7QUFDM0MsY0FBTUMsR0FBRyxHQUFHckQsV0FBVyxDQUFDO0FBQUNoQixZQUFBQSxJQUFJLEVBQUU4QyxPQUFPLENBQUNzQixLQUFEO0FBQWQsV0FBRCxDQUF2QjtBQUNBLGNBQU1oRSxJQUFJLEdBQUdhLE9BQU8sQ0FBQztBQUFDakIsWUFBQUEsSUFBSSxFQUFFOEMsT0FBTyxDQUFDc0IsS0FBRDtBQUFkLFdBQUQsQ0FBcEIsQ0FGMkMsQ0FJM0M7QUFDQTs7QUFDQSxjQUFJLENBQUNDLEdBQUcsQ0FBQ0MsS0FBSixDQUFVQyxNQUFNLENBQUNDLFFBQWpCLENBQUQsSUFBK0IsT0FBT3BFLElBQVAsS0FBZ0IsUUFBbkQsRUFBNkQ7QUFDM0QsbUJBQU8yQixJQUFQO0FBQ0Q7O0FBRURBLFVBQUFBLElBQUksQ0FBQ1csSUFBTCxDQUFVO0FBQ1IwQixZQUFBQSxLQUFLLEVBQUxBLEtBRFE7QUFFUmhFLFlBQUFBLElBQUksRUFBSkEsSUFGUTtBQUdSSixZQUFBQSxJQUFJLEVBQUU4QyxPQUFPLENBQUNzQixLQUFEO0FBSEwsV0FBVjtBQU1BLGlCQUFPckMsSUFBUDtBQUNELFNBakJNLEVBaUJKLEVBakJJLENBQVA7QUFrQkQ7O0FBRUQsVUFBTTBDLFNBQVMsR0FBR1IsTUFBTSxHQUNwQixVQUFBbEUsQ0FBQztBQUFBLGVBQUksTUFBSSxDQUFDMkUsc0JBQUwsQ0FBNEJULE1BQTVCLEVBQW9DbEUsQ0FBQyxDQUFDQyxJQUF0QyxFQUE0Q3dELFNBQTVDLENBQUo7QUFBQSxPQURtQixHQUVwQixDQUZKO0FBSUEsVUFBTW1CLFFBQVEsR0FBR2YsTUFBTSxHQUNuQixVQUFBN0QsQ0FBQztBQUFBLGVBQUksTUFBSSxDQUFDMkUsc0JBQUwsQ0FBNEJkLE1BQTVCLEVBQW9DN0QsQ0FBQyxDQUFDQyxJQUF0QyxFQUE0Q3FELFVBQTVDLENBQUo7QUFBQSxPQURrQixHQUVuQkMsS0FGSjtBQUlBLGFBQU87QUFDTHRELFFBQUFBLElBQUksRUFBSkEsSUFESztBQUVMZ0IsUUFBQUEsV0FBVyxFQUFYQSxXQUZLO0FBR0xDLFFBQUFBLE9BQU8sRUFBUEEsT0FISztBQUlMMEQsUUFBQUEsUUFBUSxFQUFSQSxRQUpLO0FBS0xGLFFBQUFBLFNBQVMsRUFBVEE7QUFMSyxPQUFQO0FBT0Q7QUFDRDs7OztvQ0FFZ0IzQixPLEVBQVM5QixXLEVBQWE7QUFDcEMsVUFBTTRELE1BQU0sR0FBRyxLQUFLQyxlQUFMLENBQXFCL0IsT0FBckIsRUFBOEIsVUFBQS9DLENBQUM7QUFBQSxlQUFJaUIsV0FBVyxDQUFDO0FBQUNoQixVQUFBQSxJQUFJLEVBQUVEO0FBQVAsU0FBRCxDQUFmO0FBQUEsT0FBL0IsQ0FBZjtBQUNBLFdBQUsrRSxVQUFMLENBQWdCO0FBQUNGLFFBQUFBLE1BQU0sRUFBTkE7QUFBRCxPQUFoQjtBQUNEOzs7dUNBU0U7QUFBQTs7QUFBQSxVQU5ENUUsSUFNQyxTQU5EQSxJQU1DO0FBQUEsVUFMRCtFLEdBS0MsU0FMREEsR0FLQztBQUFBLFVBSkRDLGFBSUMsU0FKREEsYUFJQztBQUFBLFVBSERDLFFBR0MsU0FIREEsUUFHQztBQUFBLFVBRkRDLGlCQUVDLFNBRkRBLGlCQUVDO0FBQUEsVUFEREMsZ0JBQ0MsU0FEREEsZ0JBQ0M7QUFDRCxVQUFNQyxVQUFVO0FBQ2RDLFFBQUFBLGVBQWUsRUFBRSxDQURIO0FBRWRDLFFBQUFBLFdBQVcsRUFBRSxLQUFLQyxvQkFBTCxDQUEwQk4sUUFBMUI7QUFGQyxTQUdWLEtBQUsvQixNQUFMLENBQVlTLFNBQVosQ0FBc0JsRCxXQUF0QixHQUFvQyxFQUFwQyxHQUF5QztBQUFDK0UsUUFBQUEsZUFBZSxFQUFFO0FBQWxCLE9BSC9CLENBQWhCO0FBTUEsY0FDRSxJQUFJQyx3QkFBSixvQ0FDS0wsVUFETCxFQUVLcEYsSUFGTCxFQUdLbUYsZ0JBSEw7QUFJRWxELFFBQUFBLEVBQUUsRUFBRSxLQUFLQSxFQUpYO0FBS0U4QyxRQUFBQSxHQUFHLEVBQUhBLEdBTEY7QUFNRXJFLFFBQUFBLE9BQU8sRUFBRSxLQUFLd0MsTUFBTCxDQUFZUyxTQUFaLENBQXNCakQsT0FOakM7QUFPRWdGLFFBQUFBLGVBQWUsRUFBRSx5QkFBQXpELEVBQUU7QUFBQSxpQkFBSSxNQUFJLENBQUNKLFlBQUwsQ0FBa0JJLEVBQWxCLENBQUo7QUFBQSxTQVByQjtBQVNFO0FBQ0EwRCxRQUFBQSxhQUFhLEVBQUUsSUFWakI7QUFXRUMsUUFBQUEsY0FBYyxFQUFFLEtBQUsxQyxNQUFMLENBQVkwQyxjQVg5QjtBQVlFQyxRQUFBQSxRQUFRLEVBQUUsSUFaWjtBQWNFO0FBQ0FDLFFBQUFBLFVBQVUsRUFBRTtBQUFDQyxVQUFBQSxTQUFTLEVBQUVkLFFBQVEsQ0FBQ2U7QUFBckIsU0FmZDtBQWlCRTtBQUNBQyxRQUFBQSxjQUFjLEVBQUU7QUFDZHhCLFVBQUFBLFNBQVMsRUFBRTtBQUNUakIsWUFBQUEsU0FBUyxFQUFFLEtBQUtOLE1BQUwsQ0FBWUcsVUFEZDtBQUVUekMsWUFBQUEsV0FBVyxFQUFFLEtBQUtzQyxNQUFMLENBQVlTLFNBQVosQ0FBc0IvQyxXQUYxQjtBQUdUNkMsWUFBQUEsU0FBUyxFQUFFLEtBQUtQLE1BQUwsQ0FBWU87QUFIZCxXQURHO0FBTWRrQixVQUFBQSxRQUFRLEVBQUU7QUFDUnJCLFlBQUFBLEtBQUssRUFBRSxLQUFLSixNQUFMLENBQVlJLEtBRFg7QUFFUkQsWUFBQUEsVUFBVSxFQUFFLEtBQUtILE1BQUwsQ0FBWUcsVUFGaEI7QUFHUjFDLFlBQUFBLFVBQVUsRUFBRSxLQUFLdUMsTUFBTCxDQUFZUyxTQUFaLENBQXNCaEQsVUFIMUI7QUFJUndDLFlBQUFBLFVBQVUsRUFBRSxLQUFLRCxNQUFMLENBQVlDO0FBSmhCO0FBTkk7QUFsQmxCLFNBREYsNkNBaUNNLEtBQUsrQyxjQUFMLENBQW9CbEIsYUFBcEIsSUFDRixDQUNFLElBQUlTLHdCQUFKLG9DQUNLTCxVQURMO0FBRUVuRCxRQUFBQSxFQUFFLFlBQUssS0FBS0EsRUFBVixhQUZKO0FBR0VqQyxRQUFBQSxJQUFJLEVBQUUsQ0FBQ2dGLGFBQWEsQ0FBQ21CLE1BQWYsQ0FIUjtBQUlFbkYsUUFBQUEsV0FBVyxFQUFFaEIsSUFBSSxDQUFDZ0IsV0FKcEI7QUFLRXlELFFBQUFBLFNBQVMsRUFBRXpFLElBQUksQ0FBQ3lFLFNBTGxCO0FBTUVFLFFBQUFBLFFBQVEsRUFBRSxLQUFLekIsTUFBTCxDQUFZMEMsY0FOeEI7QUFPRUYsUUFBQUEsZUFBZSxFQUFFLHlCQUFBekQsRUFBRTtBQUFBLGlCQUFJLE1BQUksQ0FBQ0osWUFBTCxDQUFrQkksRUFBbEIsQ0FBSjtBQUFBLFNBUHJCO0FBUUU0RCxRQUFBQSxRQUFRLEVBQUU7QUFSWixTQURGLENBREUsR0FhRixFQTlDSjtBQWdERDs7O3dCQTNQVTtBQUNULGFBQU8sTUFBUDtBQUNEOzs7d0JBRTBCO0FBQ3pCLGFBQU92RixtQkFBUDtBQUNEOzs7d0JBRWlCO0FBQ2hCLGFBQU8sS0FBSzhGLHVCQUFaO0FBQ0Q7Ozt3QkFFZTtBQUNkLGFBQU9DLHlCQUFQO0FBQ0Q7Ozt3QkFFb0I7QUFDbkI7QUFFRUMsUUFBQUEsSUFBSSxxQ0FDQyxxR0FBcUJBLElBRHRCO0FBRUZDLFVBQUFBLEtBQUssRUFBRSxhQUZMO0FBR0ZDLFVBQUFBLFFBQVEsRUFBRSxRQUhSO0FBSUZDLFVBQUFBLGdCQUFnQixFQUFFO0FBSmhCO0FBRk47QUFTRDs7O3dCQUVvQjtBQUNuQixhQUFPO0FBQ0x4RSxRQUFBQSxFQUFFLEVBQUUsVUFEQztBQUVMeUUsUUFBQUEsUUFBUSxFQUFFLEtBQUt4RixlQUZWO0FBR0x5RixRQUFBQSxVQUFVLEVBQUU7QUFDVkMsVUFBQUEsS0FBSyxFQUFFO0FBREc7QUFIUCxPQUFQO0FBT0Q7OztpREE2QmtEO0FBQUEsVUFBckJDLFVBQXFCLFNBQXJCQSxVQUFxQjtBQUFBLFVBQVRDLE1BQVMsU0FBVEEsTUFBUzs7QUFDakQsVUFBSSxDQUFDRCxVQUFVLENBQUNFLE1BQWhCLEVBQXdCO0FBQ3RCLGVBQU8sRUFBUDtBQUNEOztBQUVELFVBQU1DLFVBQVUsR0FBR0YsTUFBTSxDQUFDRyxNQUFQLENBQWM7QUFBQSxZQUFFQyxJQUFGLFNBQUVBLElBQUY7QUFBQSxlQUMvQkEsSUFBSSxDQUNEQyxPQURILENBQ1csU0FEWCxFQUNzQixHQUR0QixFQUVHQyxJQUZILEdBR0dDLEtBSEgsQ0FHUyxHQUhULEVBSUdDLElBSkgsQ0FJUSxVQUFBQyxHQUFHO0FBQUEsaUJBQUlDLDZCQUFZcEgsSUFBWixDQUFpQmtILElBQWpCLENBQXNCLFVBQUFHLENBQUM7QUFBQSxtQkFBSUEsQ0FBQyxDQUFDQyxRQUFGLENBQVdILEdBQVgsQ0FBSjtBQUFBLFdBQXZCLENBQUo7QUFBQSxTQUpYLENBRCtCO0FBQUEsT0FBZCxDQUFuQjs7QUFRQSxVQUFJLENBQUNQLFVBQVUsQ0FBQ0QsTUFBaEIsRUFBd0I7QUFDdEIsZUFBTyxFQUFQO0FBQ0QsT0FmZ0QsQ0FpQmpEOzs7QUFDQSxVQUFNWSxNQUFNLEdBQUdkLFVBQVUsQ0FBQyxDQUFELENBQXpCO0FBRUEsVUFBTS9GLEtBQUssR0FBR2tHLFVBQVUsQ0FBQ2pELEdBQVgsQ0FBZSxVQUFBNkQsU0FBUztBQUFBLGVBQUs7QUFDekNDLFVBQUFBLEtBQUssRUFBRUQsU0FBUyxDQUFDVixJQUFWLENBQWVDLE9BQWYsQ0FBdUIsU0FBdkIsRUFBa0MsR0FBbEMsRUFBdUNDLElBQXZDLEVBRGtDO0FBRXpDN0QsVUFBQUEsT0FBTyxFQUFFO0FBQ1AxRCxZQUFBQSxHQUFHLEVBQUU4SCxNQUFNLENBQUNHLElBQVAsQ0FBWWpJLEdBRFY7QUFFUEMsWUFBQUEsR0FBRyxFQUFFNkgsTUFBTSxDQUFDRyxJQUFQLENBQVloSSxHQUZWO0FBR1BNLFlBQUFBLElBQUksRUFBRTtBQUNKMkgsY0FBQUEsS0FBSyxFQUFFSCxTQUFTLENBQUNWLElBRGI7QUFFSmpILGNBQUFBLFFBQVEsRUFBRTJILFNBQVMsQ0FBQ0ksZUFBVixHQUE0QjtBQUZsQztBQUhDLFdBRmdDO0FBVXpDQyxVQUFBQSxTQUFTLEVBQUU7QUFWOEIsU0FBTDtBQUFBLE9BQXhCLENBQWQ7QUFhQSxhQUFPbkgsS0FBUDtBQUNEOzs7RUFoSG9Db0gscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgTGF5ZXIgZnJvbSAnLi4vYmFzZS1sYXllcic7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5pbXBvcnQgU3ZnSWNvbkxheWVyIGZyb20gJ2RlY2tnbC1sYXllcnMvc3ZnLWljb24tbGF5ZXIvc3ZnLWljb24tbGF5ZXInO1xuaW1wb3J0IEljb25MYXllckljb24gZnJvbSAnLi9pY29uLWxheWVyLWljb24nO1xuaW1wb3J0IHtJQ09OX0ZJRUxEUywgQ0xPVURGUk9OVH0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IEljb25JbmZvTW9kYWxGYWN0b3J5IGZyb20gJy4vaWNvbi1pbmZvLW1vZGFsJztcblxuZXhwb3J0IGNvbnN0IFNWR19JQ09OX1VSTCA9IGAke0NMT1VERlJPTlR9L2ljb25zL3N2Zy1pY29ucy5qc29uYDtcblxuZXhwb3J0IGNvbnN0IGljb25Qb3NBY2Nlc3NvciA9ICh7bGF0LCBsbmd9KSA9PiBkID0+IFtcbiAgZC5kYXRhW2xuZy5maWVsZElkeF0sXG4gIGQuZGF0YVtsYXQuZmllbGRJZHhdXG5dO1xuXG5leHBvcnQgY29uc3QgaWNvblBvc1Jlc29sdmVyID0gKHtsYXQsIGxuZ30pID0+XG4gIGAke2xhdC5maWVsZElkeH0tJHtsbmcuZmllbGRJZHh9YDtcblxuZXhwb3J0IGNvbnN0IGljb25BY2Nlc3NvciA9ICh7aWNvbn0pID0+IGQgPT4gZC5kYXRhW2ljb24uZmllbGRJZHhdO1xuZXhwb3J0IGNvbnN0IGljb25SZXNvbHZlciA9ICh7aWNvbn0pID0+IGljb24uZmllbGRJZHg7XG5cbmV4cG9ydCBjb25zdCBpY29uUmVxdWlyZWRDb2x1bW5zID0gWydsYXQnLCAnbG5nJywgJ2ljb24nXTtcblxuZXhwb3J0IGNvbnN0IHBvaW50VmlzQ29uZmlncyA9IHtcbiAgcmFkaXVzOiAncmFkaXVzJyxcbiAgZml4ZWRSYWRpdXM6ICdmaXhlZFJhZGl1cycsXG4gIG9wYWNpdHk6ICdvcGFjaXR5JyxcbiAgY29sb3JSYW5nZTogJ2NvbG9yUmFuZ2UnLFxuICByYWRpdXNSYW5nZTogJ3JhZGl1c1JhbmdlJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWNvbkxheWVyIGV4dGVuZHMgTGF5ZXIge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMucmVnaXN0ZXJWaXNDb25maWcocG9pbnRWaXNDb25maWdzKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uID0gbWVtb2l6ZShpY29uUG9zQWNjZXNzb3IsIGljb25Qb3NSZXNvbHZlcik7XG4gICAgdGhpcy5nZXRJY29uID0gbWVtb2l6ZShpY29uQWNjZXNzb3IsIGljb25SZXNvbHZlcik7XG5cbiAgICAvLyBwcmVwYXJlIGxheWVyIGluZm8gbW9kYWxcbiAgICB0aGlzLl9sYXllckluZm9Nb2RhbCA9IEljb25JbmZvTW9kYWxGYWN0b3J5KCk7XG4gICAgdGhpcy5nZXRTdmdJY29ucygpO1xuICB9XG5cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuICdpY29uJztcbiAgfVxuXG4gIGdldCByZXF1aXJlZExheWVyQ29sdW1ucygpIHtcbiAgICByZXR1cm4gaWNvblJlcXVpcmVkQ29sdW1ucztcbiAgfVxuXG4gIGdldCBjb2x1bW5QYWlycygpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0UG9pbnRDb2x1bW5QYWlycztcbiAgfVxuXG4gIGdldCBsYXllckljb24oKSB7XG4gICAgcmV0dXJuIEljb25MYXllckljb247XG4gIH1cblxuICBnZXQgdmlzdWFsQ2hhbm5lbHMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN1cGVyLnZpc3VhbENoYW5uZWxzLFxuICAgICAgc2l6ZToge1xuICAgICAgICAuLi5zdXBlci52aXN1YWxDaGFubmVscy5zaXplLFxuICAgICAgICByYW5nZTogJ3JhZGl1c1JhbmdlJyxcbiAgICAgICAgcHJvcGVydHk6ICdyYWRpdXMnLFxuICAgICAgICBjaGFubmVsU2NhbGVUeXBlOiAncmFkaXVzJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBnZXQgbGF5ZXJJbmZvTW9kYWwoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnaWNvbkluZm8nLFxuICAgICAgdGVtcGxhdGU6IHRoaXMuX2xheWVySW5mb01vZGFsLFxuICAgICAgbW9kYWxQcm9wczoge1xuICAgICAgICB0aXRsZTogJ0hvdyB0byBkcmF3IGljb25zJ1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBhc3luYyBnZXRTdmdJY29ucygpIHtcbiAgICBjb25zdCBmZXRjaENvbmZpZyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBjYWNoZTogJ25vLWNhY2hlJ1xuICAgIH07XG5cbiAgICBpZiAod2luZG93LmZldGNoKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHdpbmRvdy5mZXRjaChTVkdfSUNPTl9VUkwsIGZldGNoQ29uZmlnKTtcbiAgICAgIGNvbnN0IHtzdmdJY29uc30gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgIHRoaXMuaWNvbkdlb21ldHJ5ID0gc3ZnSWNvbnMucmVkdWNlKFxuICAgICAgICAoYWNjdSwgY3VycikgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIFtjdXJyLmlkXTogY3Vyci5tZXNoLmNlbGxzLnJlZHVjZSgocHJldiwgY2VsbCkgPT4ge1xuICAgICAgICAgICAgY2VsbC5mb3JFYWNoKHAgPT4ge1xuICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShwcmV2LCBjdXJyLm1lc2gucG9zaXRpb25zW3BdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgfSwgW10pXG4gICAgICAgIH0pLFxuICAgICAgICB7fVxuICAgICAgKTtcbiAgICAgIHRoaXMuX2xheWVySW5mb01vZGFsID0gSWNvbkluZm9Nb2RhbEZhY3Rvcnkoc3ZnSWNvbnMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmaW5kRGVmYXVsdExheWVyUHJvcHMoe2ZpZWxkUGFpcnMsIGZpZWxkc30pIHtcbiAgICBpZiAoIWZpZWxkUGFpcnMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgaWNvbkZpZWxkcyA9IGZpZWxkcy5maWx0ZXIoKHtuYW1lfSkgPT5cbiAgICAgIG5hbWVcbiAgICAgICAgLnJlcGxhY2UoL1tfLC5dKy9nLCAnICcpXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnNwbGl0KCcgJylcbiAgICAgICAgLnNvbWUoc2VnID0+IElDT05fRklFTERTLmljb24uc29tZSh0ID0+IHQuaW5jbHVkZXMoc2VnKSkpXG4gICAgKTtcblxuICAgIGlmICghaWNvbkZpZWxkcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgaWNvbiBsYXllcnMgZm9yIGZpcnN0IHBvaW50IHBhaXJcbiAgICBjb25zdCBwdFBhaXIgPSBmaWVsZFBhaXJzWzBdO1xuXG4gICAgY29uc3QgcHJvcHMgPSBpY29uRmllbGRzLm1hcChpY29uRmllbGQgPT4gKHtcbiAgICAgIGxhYmVsOiBpY29uRmllbGQubmFtZS5yZXBsYWNlKC9bXywuXSsvZywgJyAnKS50cmltKCksXG4gICAgICBjb2x1bW5zOiB7XG4gICAgICAgIGxhdDogcHRQYWlyLnBhaXIubGF0LFxuICAgICAgICBsbmc6IHB0UGFpci5wYWlyLmxuZyxcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgIHZhbHVlOiBpY29uRmllbGQubmFtZSxcbiAgICAgICAgICBmaWVsZElkeDogaWNvbkZpZWxkLnRhYmxlRmllbGRJbmRleCAtIDFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGlzVmlzaWJsZTogdHJ1ZVxuICAgIH0pKTtcblxuICAgIHJldHVybiBwcm9wcztcbiAgfVxuXG4gIC8vIFRPRE86IGZpeCBjb21wbGV4aXR5XG4gIC8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbiAgZm9ybWF0TGF5ZXJEYXRhKF8sIGFsbERhdGEsIGZpbHRlcmVkSW5kZXgsIG9sZExheWVyRGF0YSwgb3B0ID0ge30pIHtcbiAgICBjb25zdCB7XG4gICAgICBjb2xvclNjYWxlLFxuICAgICAgY29sb3JEb21haW4sXG4gICAgICBjb2xvckZpZWxkLFxuICAgICAgY29sb3IsXG4gICAgICBjb2x1bW5zLFxuICAgICAgc2l6ZUZpZWxkLFxuICAgICAgc2l6ZVNjYWxlLFxuICAgICAgc2l6ZURvbWFpbixcbiAgICAgIHZpc0NvbmZpZzoge3JhZGl1c1JhbmdlLCBjb2xvclJhbmdlfVxuICAgIH0gPSB0aGlzLmNvbmZpZztcblxuICAgIC8vIHBvaW50IGNvbG9yXG4gICAgY29uc3QgY1NjYWxlID1cbiAgICAgIGNvbG9yRmllbGQgJiZcbiAgICAgIHRoaXMuZ2V0VmlzQ2hhbm5lbFNjYWxlKFxuICAgICAgICBjb2xvclNjYWxlLFxuICAgICAgICBjb2xvckRvbWFpbixcbiAgICAgICAgY29sb3JSYW5nZS5jb2xvcnMubWFwKGhleFRvUmdiKVxuICAgICAgKTtcblxuICAgIC8vIHBvaW50IHJhZGl1c1xuICAgIGNvbnN0IHJTY2FsZSA9XG4gICAgICBzaXplRmllbGQgJiYgdGhpcy5nZXRWaXNDaGFubmVsU2NhbGUoc2l6ZVNjYWxlLCBzaXplRG9tYWluLCByYWRpdXNSYW5nZSk7XG5cbiAgICBjb25zdCBnZXRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oY29sdW1ucyk7XG4gICAgY29uc3QgZ2V0SWNvbiA9IHRoaXMuZ2V0SWNvbihjb2x1bW5zKTtcblxuICAgIGlmICghb2xkTGF5ZXJEYXRhIHx8IG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiAhPT0gZ2V0UG9zaXRpb24pIHtcbiAgICAgIHRoaXMudXBkYXRlTGF5ZXJNZXRhKGFsbERhdGEsIGdldFBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YTtcbiAgICBpZiAoXG4gICAgICBvbGRMYXllckRhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5kYXRhICYmXG4gICAgICBvcHQuc2FtZURhdGEgJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRQb3NpdGlvbiA9PT0gZ2V0UG9zaXRpb24gJiZcbiAgICAgIG9sZExheWVyRGF0YS5nZXRJY29uID09PSBnZXRJY29uXG4gICAgKSB7XG4gICAgICBkYXRhID0gb2xkTGF5ZXJEYXRhLmRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSBmaWx0ZXJlZEluZGV4LnJlZHVjZSgoYWNjdSwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gZ2V0UG9zaXRpb24oe2RhdGE6IGFsbERhdGFbaW5kZXhdfSk7XG4gICAgICAgIGNvbnN0IGljb24gPSBnZXRJY29uKHtkYXRhOiBhbGxEYXRhW2luZGV4XX0pO1xuXG4gICAgICAgIC8vIGlmIGRvZXNuJ3QgaGF2ZSBwb2ludCBsYXQgb3IgbG5nLCBkbyBub3QgYWRkIHRoZSBwb2ludFxuICAgICAgICAvLyBkZWNrLmdsIGNhbid0IGhhbmRsZSBwb3NpdGlvbiA9IG51bGxcbiAgICAgICAgaWYgKCFwb3MuZXZlcnkoTnVtYmVyLmlzRmluaXRlKSB8fCB0eXBlb2YgaWNvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgaWNvbixcbiAgICAgICAgICBkYXRhOiBhbGxEYXRhW2luZGV4XVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYWNjdTtcbiAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRSYWRpdXMgPSByU2NhbGVcbiAgICAgID8gZCA9PiB0aGlzLmdldEVuY29kZWRDaGFubmVsVmFsdWUoclNjYWxlLCBkLmRhdGEsIHNpemVGaWVsZClcbiAgICAgIDogMTtcblxuICAgIGNvbnN0IGdldENvbG9yID0gY1NjYWxlXG4gICAgICA/IGQgPT4gdGhpcy5nZXRFbmNvZGVkQ2hhbm5lbFZhbHVlKGNTY2FsZSwgZC5kYXRhLCBjb2xvckZpZWxkKVxuICAgICAgOiBjb2xvcjtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXRhLFxuICAgICAgZ2V0UG9zaXRpb24sXG4gICAgICBnZXRJY29uLFxuICAgICAgZ2V0Q29sb3IsXG4gICAgICBnZXRSYWRpdXNcbiAgICB9O1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuXG4gIHVwZGF0ZUxheWVyTWV0YShhbGxEYXRhLCBnZXRQb3NpdGlvbikge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0UG9pbnRzQm91bmRzKGFsbERhdGEsIGQgPT4gZ2V0UG9zaXRpb24oe2RhdGE6IGR9KSk7XG4gICAgdGhpcy51cGRhdGVNZXRhKHtib3VuZHN9KTtcbiAgfVxuXG4gIHJlbmRlckxheWVyKHtcbiAgICBkYXRhLFxuICAgIGlkeCxcbiAgICBvYmplY3RIb3ZlcmVkLFxuICAgIG1hcFN0YXRlLFxuICAgIGludGVyYWN0aW9uQ29uZmlnLFxuICAgIGxheWVySW50ZXJhY3Rpb25cbiAgfSkge1xuICAgIGNvbnN0IGxheWVyUHJvcHMgPSB7XG4gICAgICByYWRpdXNNaW5QaXhlbHM6IDEsXG4gICAgICByYWRpdXNTY2FsZTogdGhpcy5nZXRSYWRpdXNTY2FsZUJ5Wm9vbShtYXBTdGF0ZSksXG4gICAgICAuLi4odGhpcy5jb25maWcudmlzQ29uZmlnLmZpeGVkUmFkaXVzID8ge30gOiB7cmFkaXVzTWF4UGl4ZWxzOiA1MDB9KVxuICAgIH07XG5cbiAgICByZXR1cm4gW1xuICAgICAgbmV3IFN2Z0ljb25MYXllcih7XG4gICAgICAgIC4uLmxheWVyUHJvcHMsXG4gICAgICAgIC4uLmRhdGEsXG4gICAgICAgIC4uLmxheWVySW50ZXJhY3Rpb24sXG4gICAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgICBpZHgsXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuY29uZmlnLnZpc0NvbmZpZy5vcGFjaXR5LFxuICAgICAgICBnZXRJY29uR2VvbWV0cnk6IGlkID0+IHRoaXMuaWNvbkdlb21ldHJ5W2lkXSxcblxuICAgICAgICAvLyBwaWNraW5nXG4gICAgICAgIGF1dG9IaWdobGlnaHQ6IHRydWUsXG4gICAgICAgIGhpZ2hsaWdodENvbG9yOiB0aGlzLmNvbmZpZy5oaWdobGlnaHRDb2xvcixcbiAgICAgICAgcGlja2FibGU6IHRydWUsXG5cbiAgICAgICAgLy8gcGFyYW1ldGVyc1xuICAgICAgICBwYXJhbWV0ZXJzOiB7ZGVwdGhUZXN0OiBtYXBTdGF0ZS5kcmFnUm90YXRlfSxcblxuICAgICAgICAvLyB1cGRhdGUgdHJpZ2dlcnNcbiAgICAgICAgdXBkYXRlVHJpZ2dlcnM6IHtcbiAgICAgICAgICBnZXRSYWRpdXM6IHtcbiAgICAgICAgICAgIHNpemVGaWVsZDogdGhpcy5jb25maWcuY29sb3JGaWVsZCxcbiAgICAgICAgICAgIHJhZGl1c1JhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcucmFkaXVzUmFuZ2UsXG4gICAgICAgICAgICBzaXplU2NhbGU6IHRoaXMuY29uZmlnLnNpemVTY2FsZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0Q29sb3I6IHtcbiAgICAgICAgICAgIGNvbG9yOiB0aGlzLmNvbmZpZy5jb2xvcixcbiAgICAgICAgICAgIGNvbG9yRmllbGQ6IHRoaXMuY29uZmlnLmNvbG9yRmllbGQsXG4gICAgICAgICAgICBjb2xvclJhbmdlOiB0aGlzLmNvbmZpZy52aXNDb25maWcuY29sb3JSYW5nZSxcbiAgICAgICAgICAgIGNvbG9yU2NhbGU6IHRoaXMuY29uZmlnLmNvbG9yU2NhbGVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgLi4uKHRoaXMuaXNMYXllckhvdmVyZWQob2JqZWN0SG92ZXJlZClcbiAgICAgID8gW1xuICAgICAgICAgIG5ldyBTdmdJY29uTGF5ZXIoe1xuICAgICAgICAgICAgLi4ubGF5ZXJQcm9wcyxcbiAgICAgICAgICAgIGlkOiBgJHt0aGlzLmlkfS1ob3ZlcmVkYCxcbiAgICAgICAgICAgIGRhdGE6IFtvYmplY3RIb3ZlcmVkLm9iamVjdF0sXG4gICAgICAgICAgICBnZXRQb3NpdGlvbjogZGF0YS5nZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGdldFJhZGl1czogZGF0YS5nZXRSYWRpdXMsXG4gICAgICAgICAgICBnZXRDb2xvcjogdGhpcy5jb25maWcuaGlnaGxpZ2h0Q29sb3IsXG4gICAgICAgICAgICBnZXRJY29uR2VvbWV0cnk6IGlkID0+IHRoaXMuaWNvbkdlb21ldHJ5W2lkXSxcbiAgICAgICAgICAgIHBpY2thYmxlOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIDogW10pXG4gICAgXTtcbiAgfVxufVxuIl19