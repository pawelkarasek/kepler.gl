"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("../common/styled-components");

var _mapLayerSelector = _interopRequireDefault(require("../common/map-layer-selector"));

var _logo = _interopRequireDefault(require("../common/logo"));

var _mapLegend = _interopRequireDefault(require("./map-legend"));

var _icons = require("../common/icons");

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  justify-content: space-between;\n  background-color: ", ";\n  height: 32px;\n  padding: 6px 12px;\n  font-size: 11px;\n  color: ", ";\n\n  button {\n    width: 18px;\n    height: 18px;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", " max-height: 500px;\n  min-height: 100px;\n  overflow: auto;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  flex-grow: 1;\n  z-index: 1;\n  p {\n    margin-bottom: 0;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: 18px;\n  border: 0;\n  box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.16);\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  height: 36px;\n  justify-content: center;\n  margin: 0;\n  outline: none;\n  padding: 0;\n  transition: ", ";\n  width: 36px;\n\n  :focus {\n    outline: none;\n  }\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n    color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 4px 0;\n  display: flex;\n  justify-content: flex-end;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  right: 0;\n  width: ", "px;\n  padding: ", "px;\n  z-index: 1;\n  top: ", "px;\n  position: absolute;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledMapControl = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.mapControl.width;
}, function (props) {
  return props.theme.mapControl.padding;
}, function (props) {
  return props.top;
});

var StyledMapControlAction = _styledComponents["default"].div(_templateObject2());

var StyledMapControlButton = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.active ? props.theme.secondaryBtnActBgd : props.theme.secondaryBtnBgd;
}, function (props) {
  return props.active ? props.theme.secondaryBtnActColor : props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.theme.secondaryBtnActBgd;
}, function (props) {
  return props.theme.secondaryBtnActColor;
});

var StyledMapControlPanel = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.theme.mapPanelBackgroundColor;
});

var StyledMapControlPanelContent = _styledComponents["default"].div(_templateObject5(), function (props) {
  return props.theme.dropdownScrollBar;
});

var StyledMapControlPanelHeader = _styledComponents["default"].div(_templateObject6(), function (props) {
  return props.theme.mapPanelHeaderBackgroundColor;
}, function (props) {
  return props.theme.titleTextColor;
});
/**
 * Generates all layers available for the current map
 * TODO: this may be moved into map-container or map-control or even at the reducer level
 * @param layers
 * @param mapLayers
 * @returns {[id, label, isVisible]}
 */


var layerSelector = function layerSelector(layers, mapLayers) {
  var availableItems = Object.keys(layers).reduce(function (availableLayers, currentLayerId) {
    // is available ? if yes add to available list
    var currentLayer = layers[currentLayerId]; // if maplayers exists we need to make sure currentlayer
    // is contained in mapLayers in order to add onto availableLayers
    // otherwise we add all layers

    var layerConfig = mapLayers ? mapLayers[currentLayer.id] : currentLayer.config;
    var mustBeAdded = mapLayers && mapLayers[currentLayer.id] ? mapLayers[currentLayer.id].isAvailable : layerConfig.isVisible;
    return mustBeAdded ? [].concat((0, _toConsumableArray2["default"])(availableLayers), [{
      id: currentLayer.id,
      name: currentLayer.config.label,
      isVisible: mapLayers && mapLayers[currentLayer.id] ? mapLayers[currentLayer.id].isVisible : layerConfig.isVisible,
      layer: currentLayer
    }]) : availableLayers;
  }, []);
  return availableItems;
};

var ActionPanel = function ActionPanel(_ref) {
  var children = _ref.children;
  return _react["default"].createElement(StyledMapControlAction, null, children);
};

var MapLegendTooltip = function MapLegendTooltip(_ref2) {
  var id = _ref2.id,
      message = _ref2.message;
  return _react["default"].createElement(_styledComponents2.Tooltip, {
    id: id,
    place: "left",
    effect: "solid"
  }, _react["default"].createElement("span", null, message));
};

var LayerSelectorPanel = function LayerSelectorPanel(_ref3) {
  var items = _ref3.items,
      onMapToggleLayer = _ref3.onMapToggleLayer,
      isActive = _ref3.isActive,
      toggleMenuPanel = _ref3.toggleMenuPanel;
  return !isActive ? _react["default"].createElement(StyledMapControlButton, {
    key: 1,
    onClick: function onClick(e) {
      e.preventDefault();
      toggleMenuPanel();
    },
    className: "map-control-button toggle-layer",
    "data-tip": true,
    "data-for": "toggle-layer"
  }, _react["default"].createElement(_icons.Layers, {
    height: "22px"
  }), _react["default"].createElement(MapLegendTooltip, {
    id: "toggle-layer",
    message: isActive ? 'Hide layer panel' : 'Show layer panel'
  })) : _react["default"].createElement(MapControlPanel, {
    header: "Visible layers",
    onClick: toggleMenuPanel
  }, _react["default"].createElement(_mapLayerSelector["default"], {
    layers: items,
    onMapToggleLayer: onMapToggleLayer
  }));
};

var MapControlPanel = function MapControlPanel(_ref4) {
  var children = _ref4.children,
      header = _ref4.header,
      onClick = _ref4.onClick,
      _ref4$scale = _ref4.scale,
      scale = _ref4$scale === void 0 ? 1 : _ref4$scale,
      isExport = _ref4.isExport;
  return _react["default"].createElement(StyledMapControlPanel, {
    style: {
      transform: "scale(".concat(scale, ") translate(calc(-").concat(25 * (scale - 1), "% - ").concat(10 * scale, "px), calc(").concat(25 * (scale - 1), "% + ").concat(10 * scale, "px))")
    }
  }, _react["default"].createElement(StyledMapControlPanelHeader, {
    style: {
      position: 'relative'
    }
  }, isExport ? _react["default"].createElement(_logo["default"], {
    version: false,
    appName: "kepler.gl"
  }) : _react["default"].createElement("span", {
    style: {
      verticalAlign: 'middle'
    }
  }, header), isExport ? null : _react["default"].createElement(_styledComponents2.IconRoundSmall, null, _react["default"].createElement(_icons.Close, {
    height: "16px",
    onClick: onClick
  }))), _react["default"].createElement(StyledMapControlPanelContent, null, children));
};

var MapLegendPanel = function MapLegendPanel(_ref5) {
  var items = _ref5.items,
      isActive = _ref5.isActive,
      scale = _ref5.scale,
      toggleMenuPanel = _ref5.toggleMenuPanel,
      isExport = _ref5.isExport;
  return !isActive ? _react["default"].createElement(StyledMapControlButton, {
    key: 2,
    "data-tip": true,
    "data-for": "show-legend",
    className: "map-control-button show-legend",
    onClick: function onClick(e) {
      e.preventDefault();
      toggleMenuPanel();
    }
  }, _react["default"].createElement(_icons.Legend, {
    height: "22px"
  }), _react["default"].createElement(MapLegendTooltip, {
    id: "show-legend",
    message: 'show legend'
  })) : _react["default"].createElement(MapControlPanel, {
    scale: scale,
    header: 'Layer Legend',
    onClick: toggleMenuPanel,
    isExport: isExport
  }, _react["default"].createElement(_mapLegend["default"], {
    layers: items.filter(function (item) {
      return item.isVisible;
    }).map(function (item) {
      return item.layer;
    })
  }));
};

var MapControlFactory = function MapControlFactory() {
  var MapControl =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(MapControl, _Component);

    function MapControl() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, MapControl);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MapControl)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerSelector", function (state) {
        return state.layers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapLayersSelector", function (state) {
        return state.mapLayers;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "initialDataSelector", (0, _reselect.createSelector)(_this.layerSelector, _this.mapLayersSelector, layerSelector));
      return _this;
    }

    (0, _createClass2["default"])(MapControl, [{
      key: "render",
      value: function render() {
        var items = this.initialDataSelector(this.props);

        if (!items) {
          return null;
        }

        var _this$props = this.props,
            dragRotate = _this$props.dragRotate,
            isSplit = _this$props.isSplit,
            isExport = _this$props.isExport,
            mapIndex = _this$props.mapIndex,
            mapControls = _this$props.mapControls,
            onTogglePerspective = _this$props.onTogglePerspective,
            onToggleSplitMap = _this$props.onToggleSplitMap,
            onMapToggleLayer = _this$props.onMapToggleLayer,
            onToggleMapControl = _this$props.onToggleMapControl,
            scale = _this$props.scale;
        var _mapControls$visibleL = mapControls.visibleLayers,
            visibleLayers = _mapControls$visibleL === void 0 ? {} : _mapControls$visibleL,
            _mapControls$mapLegen = mapControls.mapLegend,
            mapLegend = _mapControls$mapLegen === void 0 ? {} : _mapControls$mapLegen,
            _mapControls$toggle3d = mapControls.toggle3d,
            toggle3d = _mapControls$toggle3d === void 0 ? {} : _mapControls$toggle3d,
            _mapControls$splitMap = mapControls.splitMap,
            splitMap = _mapControls$splitMap === void 0 ? {} : _mapControls$splitMap;
        return _react["default"].createElement(StyledMapControl, {
          className: "map-control"
        }, splitMap.show ? _react["default"].createElement(ActionPanel, {
          key: 0
        }, _react["default"].createElement(StyledMapControlButton, {
          active: isSplit,
          onClick: function onClick(e) {
            e.preventDefault();
            onToggleSplitMap(isSplit ? mapIndex : undefined);
          },
          key: "split-".concat(isSplit),
          className: "map-control-button split-map",
          "data-tip": true,
          "data-for": "action-toggle"
        }, isSplit ? _react["default"].createElement(_icons.Delete, {
          height: "18px"
        }) : _react["default"].createElement(_icons.Split, {
          height: "18px"
        }), _react["default"].createElement(MapLegendTooltip, {
          id: "action-toggle",
          message: isSplit ? 'Close current panel' : 'Switch to dual map view'
        }))) : null, isSplit && visibleLayers.show ? _react["default"].createElement(ActionPanel, {
          key: 1
        }, _react["default"].createElement(LayerSelectorPanel, {
          items: items,
          onMapToggleLayer: onMapToggleLayer,
          isActive: visibleLayers.active,
          toggleMenuPanel: function toggleMenuPanel() {
            return onToggleMapControl('visibleLayers');
          }
        })) : null, toggle3d.show ? _react["default"].createElement(ActionPanel, {
          key: 2
        }, _react["default"].createElement(StyledMapControlButton, {
          onClick: function onClick(e) {
            e.preventDefault();
            onTogglePerspective();
          },
          active: dragRotate,
          "data-tip": true,
          "data-for": "action-3d"
        }, _react["default"].createElement(_icons.Cube3d, {
          height: "22px"
        }), _react["default"].createElement(MapLegendTooltip, {
          id: "action-3d",
          message: dragRotate ? 'Disable 3D Map' : '3D Map'
        }))) : null, mapLegend.show ? _react["default"].createElement(ActionPanel, {
          key: 3
        }, _react["default"].createElement(MapLegendPanel, {
          items: items,
          scale: scale,
          isExport: isExport,
          onMapToggleLayer: onMapToggleLayer,
          isActive: mapLegend.active,
          toggleMenuPanel: function toggleMenuPanel() {
            return onToggleMapControl('mapLegend');
          }
        })) : null);
      }
    }]);
    return MapControl;
  }(_react.Component);

  (0, _defineProperty2["default"])(MapControl, "propTypes", {
    datasets: _propTypes["default"].object.isRequired,
    dragRotate: _propTypes["default"].bool.isRequired,
    isSplit: _propTypes["default"].bool.isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].object),
    mapIndex: _propTypes["default"].number.isRequired,
    mapControls: _propTypes["default"].object.isRequired,
    onTogglePerspective: _propTypes["default"].func.isRequired,
    onToggleSplitMap: _propTypes["default"].func.isRequired,
    onToggleMapControl: _propTypes["default"].func.isRequired,
    onMapToggleLayer: _propTypes["default"].func.isRequired,
    top: _propTypes["default"].number.isRequired,
    // optional
    scale: _propTypes["default"].number,
    mapLayers: _propTypes["default"].object
  });
  (0, _defineProperty2["default"])(MapControl, "defaultProps", {
    isSplit: false,
    top: 0
  });
  return MapControl;
};

var _default = MapControlFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL21hcC9tYXAtY29udHJvbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRNYXBDb250cm9sIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsIm1hcENvbnRyb2wiLCJ3aWR0aCIsInBhZGRpbmciLCJ0b3AiLCJTdHlsZWRNYXBDb250cm9sQWN0aW9uIiwiU3R5bGVkTWFwQ29udHJvbEJ1dHRvbiIsImFjdGl2ZSIsInNlY29uZGFyeUJ0bkFjdEJnZCIsInNlY29uZGFyeUJ0bkJnZCIsInNlY29uZGFyeUJ0bkFjdENvbG9yIiwic2Vjb25kYXJ5QnRuQ29sb3IiLCJ0cmFuc2l0aW9uIiwiU3R5bGVkTWFwQ29udHJvbFBhbmVsIiwibWFwUGFuZWxCYWNrZ3JvdW5kQ29sb3IiLCJTdHlsZWRNYXBDb250cm9sUGFuZWxDb250ZW50IiwiZHJvcGRvd25TY3JvbGxCYXIiLCJTdHlsZWRNYXBDb250cm9sUGFuZWxIZWFkZXIiLCJtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvciIsInRpdGxlVGV4dENvbG9yIiwibGF5ZXJTZWxlY3RvciIsImxheWVycyIsIm1hcExheWVycyIsImF2YWlsYWJsZUl0ZW1zIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImF2YWlsYWJsZUxheWVycyIsImN1cnJlbnRMYXllcklkIiwiY3VycmVudExheWVyIiwibGF5ZXJDb25maWciLCJpZCIsImNvbmZpZyIsIm11c3RCZUFkZGVkIiwiaXNBdmFpbGFibGUiLCJpc1Zpc2libGUiLCJuYW1lIiwibGFiZWwiLCJsYXllciIsIkFjdGlvblBhbmVsIiwiY2hpbGRyZW4iLCJNYXBMZWdlbmRUb29sdGlwIiwibWVzc2FnZSIsIkxheWVyU2VsZWN0b3JQYW5lbCIsIml0ZW1zIiwib25NYXBUb2dnbGVMYXllciIsImlzQWN0aXZlIiwidG9nZ2xlTWVudVBhbmVsIiwiZSIsInByZXZlbnREZWZhdWx0IiwiTWFwQ29udHJvbFBhbmVsIiwiaGVhZGVyIiwib25DbGljayIsInNjYWxlIiwiaXNFeHBvcnQiLCJ0cmFuc2Zvcm0iLCJwb3NpdGlvbiIsInZlcnRpY2FsQWxpZ24iLCJNYXBMZWdlbmRQYW5lbCIsImZpbHRlciIsIml0ZW0iLCJtYXAiLCJNYXBDb250cm9sRmFjdG9yeSIsIk1hcENvbnRyb2wiLCJzdGF0ZSIsIm1hcExheWVyc1NlbGVjdG9yIiwiaW5pdGlhbERhdGFTZWxlY3RvciIsImRyYWdSb3RhdGUiLCJpc1NwbGl0IiwibWFwSW5kZXgiLCJtYXBDb250cm9scyIsIm9uVG9nZ2xlUGVyc3BlY3RpdmUiLCJvblRvZ2dsZVNwbGl0TWFwIiwib25Ub2dnbGVNYXBDb250cm9sIiwidmlzaWJsZUxheWVycyIsIm1hcExlZ2VuZCIsInRvZ2dsZTNkIiwic3BsaXRNYXAiLCJzaG93IiwidW5kZWZpbmVkIiwiQ29tcG9uZW50IiwiZGF0YXNldHMiLCJQcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiYm9vbCIsImFycmF5T2YiLCJudW1iZXIiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTQSxJQUFNQSxnQkFBZ0IsR0FBR0MsNkJBQU9DLEdBQVYsb0JBRVgsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUssQ0FBQ0MsS0FBTixDQUFZQyxVQUFaLENBQXVCQyxLQUEzQjtBQUFBLENBRk0sRUFHVCxVQUFBSCxLQUFLO0FBQUEsU0FBSUEsS0FBSyxDQUFDQyxLQUFOLENBQVlDLFVBQVosQ0FBdUJFLE9BQTNCO0FBQUEsQ0FISSxFQUtiLFVBQUFKLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNLLEdBQVY7QUFBQSxDQUxRLENBQXRCOztBQVNBLElBQU1DLHNCQUFzQixHQUFHUiw2QkFBT0MsR0FB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RWUsc0JBQVVHLElBQVYsQ0FBZUQsVUFGVjtBQUdqQmhCLElBQUFBLE9BQU8sRUFBRWMsc0JBQVVHLElBQVYsQ0FBZUQsVUFIUDtBQUlqQi9ELElBQUFBLE1BQU0sRUFBRTZELHNCQUFVSSxPQUFWLENBQWtCSixzQkFBVUMsTUFBNUIsQ0FKUztBQUtqQmQsSUFBQUEsUUFBUSxFQUFFYSxzQkFBVUssTUFBVixDQUFpQkgsVUFMVjtBQU1qQmQsSUFBQUEsV0FBVyxFQUFFWSxzQkFBVUMsTUFBVixDQUFpQkMsVUFOYjtBQU9qQmIsSUFBQUEsbUJBQW1CLEVBQUVXLHNCQUFVTSxJQUFWLENBQWVKLFVBUG5CO0FBUWpCWixJQUFBQSxnQkFBZ0IsRUFBRVUsc0JBQVVNLElBQVYsQ0FBZUosVUFSaEI7QUFTakJYLElBQUFBLGtCQUFrQixFQUFFUyxzQkFBVU0sSUFBVixDQUFlSixVQVRsQjtBQVVqQnZDLElBQUFBLGdCQUFnQixFQUFFcUMsc0JBQVVNLElBQVYsQ0FBZUosVUFWaEI7QUFXakJoRixJQUFBQSxHQUFHLEVBQUU4RSxzQkFBVUssTUFBVixDQUFpQkgsVUFYTDtBQWFqQjtBQUNBL0IsSUFBQUEsS0FBSyxFQUFFNkIsc0JBQVVLLE1BZEE7QUFlakJqRSxJQUFBQSxTQUFTLEVBQUU0RCxzQkFBVUM7QUFmSixHQUZTO0FBQUEsbUNBQ3hCcEIsVUFEd0Isa0JBb0JOO0FBQ3BCSyxJQUFBQSxPQUFPLEVBQUUsS0FEVztBQUVwQmhFLElBQUFBLEdBQUcsRUFBRTtBQUZlLEdBcEJNO0FBNEk5QixTQUFPMkQsVUFBUDtBQUNELENBN0lEOztlQStJZUQsaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcblxuaW1wb3J0IHtUb29sdGlwLCBJY29uUm91bmRTbWFsbH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IE1hcExheWVyU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vbWFwLWxheWVyLXNlbGVjdG9yJztcbmltcG9ydCBLZXBsZXJHbExvZ28gZnJvbSAnY29tcG9uZW50cy9jb21tb24vbG9nbyc7XG5pbXBvcnQgTWFwTGVnZW5kIGZyb20gJy4vbWFwLWxlZ2VuZCc7XG5pbXBvcnQge1xuICBDbG9zZSxcbiAgU3BsaXQsXG4gIExlZ2VuZCxcbiAgQ3ViZTNkLFxuICBEZWxldGUsXG4gIExheWVyc1xufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5cbmNvbnN0IFN0eWxlZE1hcENvbnRyb2wgPSBzdHlsZWQuZGl2YFxuICByaWdodDogMDtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubWFwQ29udHJvbC53aWR0aH1weDtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBDb250cm9sLnBhZGRpbmd9cHg7XG4gIHotaW5kZXg6IDE7XG4gIHRvcDogJHtwcm9wcyA9PiBwcm9wcy50b3B9cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbmA7XG5cbmNvbnN0IFN0eWxlZE1hcENvbnRyb2xBY3Rpb24gPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nOiA0cHggMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbmA7XG5cbmNvbnN0IFN0eWxlZE1hcENvbnRyb2xCdXR0b24gPSBzdHlsZWQuZGl2YFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkFjdEJnZFxuICAgICAgOiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5CZ2R9O1xuICBib3JkZXItcmFkaXVzOiAxOHB4O1xuICBib3JkZXI6IDA7XG4gIGJveC1zaGFkb3c6IDAgNnB4IDEycHggMCByZ2JhKDAsIDAsIDAsIDAuMTYpO1xuICBjb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5BY3RDb2xvclxuICAgICAgOiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5Db2xvcn07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAzNnB4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuICB3aWR0aDogMzZweDtcblxuICA6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkFjdEJnZH07XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0Q29sb3J9O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRNYXBDb250cm9sUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1hcFBhbmVsQmFja2dyb3VuZENvbG9yfTtcbiAgZmxleC1ncm93OiAxO1xuICB6LWluZGV4OiAxO1xuICBwIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRNYXBDb250cm9sUGFuZWxDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93blNjcm9sbEJhcn0gbWF4LWhlaWdodDogNTAwcHg7XG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICBvdmVyZmxvdzogYXV0bztcbmA7XG5cbmNvbnN0IFN0eWxlZE1hcENvbnRyb2xQYW5lbEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvcn07XG4gIGhlaWdodDogMzJweDtcbiAgcGFkZGluZzogNnB4IDEycHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGl0bGVUZXh0Q29sb3J9O1xuXG4gIGJ1dHRvbiB7XG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICB9XG5gO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbGwgbGF5ZXJzIGF2YWlsYWJsZSBmb3IgdGhlIGN1cnJlbnQgbWFwXG4gKiBUT0RPOiB0aGlzIG1heSBiZSBtb3ZlZCBpbnRvIG1hcC1jb250YWluZXIgb3IgbWFwLWNvbnRyb2wgb3IgZXZlbiBhdCB0aGUgcmVkdWNlciBsZXZlbFxuICogQHBhcmFtIGxheWVyc1xuICogQHBhcmFtIG1hcExheWVyc1xuICogQHJldHVybnMge1tpZCwgbGFiZWwsIGlzVmlzaWJsZV19XG4gKi9cbmNvbnN0IGxheWVyU2VsZWN0b3IgPSAobGF5ZXJzLCBtYXBMYXllcnMpID0+IHtcbiAgY29uc3QgYXZhaWxhYmxlSXRlbXMgPSBPYmplY3Qua2V5cyhsYXllcnMpLnJlZHVjZShcbiAgICAoYXZhaWxhYmxlTGF5ZXJzLCBjdXJyZW50TGF5ZXJJZCkgPT4ge1xuICAgICAgLy8gaXMgYXZhaWxhYmxlID8gaWYgeWVzIGFkZCB0byBhdmFpbGFibGUgbGlzdFxuICAgICAgY29uc3QgY3VycmVudExheWVyID0gbGF5ZXJzW2N1cnJlbnRMYXllcklkXTtcbiAgICAgIC8vIGlmIG1hcGxheWVycyBleGlzdHMgd2UgbmVlZCB0byBtYWtlIHN1cmUgY3VycmVudGxheWVyXG4gICAgICAvLyBpcyBjb250YWluZWQgaW4gbWFwTGF5ZXJzIGluIG9yZGVyIHRvIGFkZCBvbnRvIGF2YWlsYWJsZUxheWVyc1xuICAgICAgLy8gb3RoZXJ3aXNlIHdlIGFkZCBhbGwgbGF5ZXJzXG5cbiAgICAgIGNvbnN0IGxheWVyQ29uZmlnID0gbWFwTGF5ZXJzXG4gICAgICAgID8gbWFwTGF5ZXJzW2N1cnJlbnRMYXllci5pZF1cbiAgICAgICAgOiBjdXJyZW50TGF5ZXIuY29uZmlnO1xuXG4gICAgICBjb25zdCBtdXN0QmVBZGRlZCA9XG4gICAgICAgIG1hcExheWVycyAmJiBtYXBMYXllcnNbY3VycmVudExheWVyLmlkXVxuICAgICAgICAgID8gbWFwTGF5ZXJzW2N1cnJlbnRMYXllci5pZF0uaXNBdmFpbGFibGVcbiAgICAgICAgICA6IGxheWVyQ29uZmlnLmlzVmlzaWJsZTtcblxuICAgICAgcmV0dXJuIG11c3RCZUFkZGVkXG4gICAgICAgID8gW1xuICAgICAgICAgICAgLi4uYXZhaWxhYmxlTGF5ZXJzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogY3VycmVudExheWVyLmlkLFxuICAgICAgICAgICAgICBuYW1lOiBjdXJyZW50TGF5ZXIuY29uZmlnLmxhYmVsLFxuICAgICAgICAgICAgICBpc1Zpc2libGU6XG4gICAgICAgICAgICAgICAgbWFwTGF5ZXJzICYmIG1hcExheWVyc1tjdXJyZW50TGF5ZXIuaWRdXG4gICAgICAgICAgICAgICAgICA/IG1hcExheWVyc1tjdXJyZW50TGF5ZXIuaWRdLmlzVmlzaWJsZVxuICAgICAgICAgICAgICAgICAgOiBsYXllckNvbmZpZy5pc1Zpc2libGUsXG4gICAgICAgICAgICAgIGxheWVyOiBjdXJyZW50TGF5ZXJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIDogYXZhaWxhYmxlTGF5ZXJzO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICByZXR1cm4gYXZhaWxhYmxlSXRlbXM7XG59O1xuXG5jb25zdCBBY3Rpb25QYW5lbCA9ICh7Y2hpbGRyZW59KSA9PiAoXG4gIDxTdHlsZWRNYXBDb250cm9sQWN0aW9uPntjaGlsZHJlbn08L1N0eWxlZE1hcENvbnRyb2xBY3Rpb24+XG4pO1xuXG5jb25zdCBNYXBMZWdlbmRUb29sdGlwID0gKHtpZCwgbWVzc2FnZX0pID0+IChcbiAgPFRvb2x0aXAgaWQ9e2lkfSBwbGFjZT1cImxlZnRcIiBlZmZlY3Q9XCJzb2xpZFwiPlxuICAgIDxzcGFuPnttZXNzYWdlfTwvc3Bhbj5cbiAgPC9Ub29sdGlwPlxuKTtcblxuY29uc3QgTGF5ZXJTZWxlY3RvclBhbmVsID0gKHtcbiAgaXRlbXMsXG4gIG9uTWFwVG9nZ2xlTGF5ZXIsXG4gIGlzQWN0aXZlLFxuICB0b2dnbGVNZW51UGFuZWxcbn0pID0+XG4gICFpc0FjdGl2ZSA/IChcbiAgICA8U3R5bGVkTWFwQ29udHJvbEJ1dHRvblxuICAgICAga2V5PXsxfVxuICAgICAgb25DbGljaz17ZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdG9nZ2xlTWVudVBhbmVsKCk7XG4gICAgICB9fVxuICAgICAgY2xhc3NOYW1lPVwibWFwLWNvbnRyb2wtYnV0dG9uIHRvZ2dsZS1sYXllclwiXG4gICAgICBkYXRhLXRpcFxuICAgICAgZGF0YS1mb3I9XCJ0b2dnbGUtbGF5ZXJcIlxuICAgID5cbiAgICAgIDxMYXllcnMgaGVpZ2h0PVwiMjJweFwiIC8+XG4gICAgICA8TWFwTGVnZW5kVG9vbHRpcFxuICAgICAgICBpZD1cInRvZ2dsZS1sYXllclwiXG4gICAgICAgIG1lc3NhZ2U9e2lzQWN0aXZlID8gJ0hpZGUgbGF5ZXIgcGFuZWwnIDogJ1Nob3cgbGF5ZXIgcGFuZWwnfVxuICAgICAgLz5cbiAgICA8L1N0eWxlZE1hcENvbnRyb2xCdXR0b24+XG4gICkgOiAoXG4gICAgPE1hcENvbnRyb2xQYW5lbCBoZWFkZXI9XCJWaXNpYmxlIGxheWVyc1wiIG9uQ2xpY2s9e3RvZ2dsZU1lbnVQYW5lbH0+XG4gICAgICA8TWFwTGF5ZXJTZWxlY3RvciBsYXllcnM9e2l0ZW1zfSBvbk1hcFRvZ2dsZUxheWVyPXtvbk1hcFRvZ2dsZUxheWVyfSAvPlxuICAgIDwvTWFwQ29udHJvbFBhbmVsPlxuICApO1xuXG5jb25zdCBNYXBDb250cm9sUGFuZWwgPSAoe2NoaWxkcmVuLCBoZWFkZXIsIG9uQ2xpY2ssIHNjYWxlID0gMSwgaXNFeHBvcnR9KSA9PiAoXG4gIDxTdHlsZWRNYXBDb250cm9sUGFuZWxcbiAgICBzdHlsZT17e1xuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHtzY2FsZX0pIHRyYW5zbGF0ZShjYWxjKC0kezI1ICogKHNjYWxlIC0gMSl9JSAtICR7MTAgKlxuICAgICAgICBzY2FsZX1weCksIGNhbGMoJHsyNSAqIChzY2FsZSAtIDEpfSUgKyAkezEwICogc2NhbGV9cHgpKWBcbiAgICB9fVxuICA+XG4gICAgPFN0eWxlZE1hcENvbnRyb2xQYW5lbEhlYWRlciBzdHlsZT17e3Bvc2l0aW9uOiAncmVsYXRpdmUnfX0+XG4gICAgICB7aXNFeHBvcnQgPyAoXG4gICAgICAgIDxLZXBsZXJHbExvZ28gdmVyc2lvbj17ZmFsc2V9IGFwcE5hbWU9XCJrZXBsZXIuZ2xcIiAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPHNwYW4gc3R5bGU9e3t2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJ319PntoZWFkZXJ9PC9zcGFuPlxuICAgICAgKX1cbiAgICAgIHtpc0V4cG9ydCA/IG51bGwgOiAoXG4gICAgICAgIDxJY29uUm91bmRTbWFsbD5cbiAgICAgICAgICA8Q2xvc2UgaGVpZ2h0PVwiMTZweFwiIG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG4gICAgICAgIDwvSWNvblJvdW5kU21hbGw+XG4gICAgICApfVxuICAgIDwvU3R5bGVkTWFwQ29udHJvbFBhbmVsSGVhZGVyPlxuICAgIDxTdHlsZWRNYXBDb250cm9sUGFuZWxDb250ZW50PntjaGlsZHJlbn08L1N0eWxlZE1hcENvbnRyb2xQYW5lbENvbnRlbnQ+XG4gIDwvU3R5bGVkTWFwQ29udHJvbFBhbmVsPlxuKTtcblxuY29uc3QgTWFwTGVnZW5kUGFuZWwgPSAoe2l0ZW1zLCBpc0FjdGl2ZSwgc2NhbGUsIHRvZ2dsZU1lbnVQYW5lbCwgaXNFeHBvcnR9KSA9PlxuICAhaXNBY3RpdmUgPyAoXG4gICAgPFN0eWxlZE1hcENvbnRyb2xCdXR0b25cbiAgICAgIGtleT17Mn1cbiAgICAgIGRhdGEtdGlwXG4gICAgICBkYXRhLWZvcj1cInNob3ctbGVnZW5kXCJcbiAgICAgIGNsYXNzTmFtZT1cIm1hcC1jb250cm9sLWJ1dHRvbiBzaG93LWxlZ2VuZFwiXG4gICAgICBvbkNsaWNrPXtlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0b2dnbGVNZW51UGFuZWwoKTtcbiAgICAgIH19XG4gICAgPlxuICAgICAgPExlZ2VuZCBoZWlnaHQ9XCIyMnB4XCIgLz5cbiAgICAgIDxNYXBMZWdlbmRUb29sdGlwIGlkPVwic2hvdy1sZWdlbmRcIiBtZXNzYWdlPXsnc2hvdyBsZWdlbmQnfSAvPlxuICAgIDwvU3R5bGVkTWFwQ29udHJvbEJ1dHRvbj5cbiAgKSA6IChcbiAgICA8TWFwQ29udHJvbFBhbmVsXG4gICAgICBzY2FsZT17c2NhbGV9XG4gICAgICBoZWFkZXI9eydMYXllciBMZWdlbmQnfVxuICAgICAgb25DbGljaz17dG9nZ2xlTWVudVBhbmVsfVxuICAgICAgaXNFeHBvcnQ9e2lzRXhwb3J0fVxuICAgID5cbiAgICAgIDxNYXBMZWdlbmRcbiAgICAgICAgbGF5ZXJzPXtpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmlzVmlzaWJsZSkubWFwKGl0ZW0gPT4gaXRlbS5sYXllcil9XG4gICAgICAvPlxuICAgIDwvTWFwQ29udHJvbFBhbmVsPlxuICApO1xuXG5jb25zdCBNYXBDb250cm9sRmFjdG9yeSA9ICgpID0+IHtcbiAgY2xhc3MgTWFwQ29udHJvbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBkcmFnUm90YXRlOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgaXNTcGxpdDogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9iamVjdCksXG4gICAgICBtYXBJbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgbWFwQ29udHJvbHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIG9uVG9nZ2xlUGVyc3BlY3RpdmU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBvblRvZ2dsZVNwbGl0TWFwOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgb25Ub2dnbGVNYXBDb250cm9sOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgb25NYXBUb2dnbGVMYXllcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHRvcDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuXG4gICAgICAvLyBvcHRpb25hbFxuICAgICAgc2NhbGU6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICBtYXBMYXllcnM6IFByb3BUeXBlcy5vYmplY3RcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGlzU3BsaXQ6IGZhbHNlLFxuICAgICAgdG9wOiAwXG4gICAgfTtcblxuICAgIGxheWVyU2VsZWN0b3IgPSBzdGF0ZSA9PiBzdGF0ZS5sYXllcnM7XG4gICAgbWFwTGF5ZXJzU2VsZWN0b3IgPSBzdGF0ZSA9PiBzdGF0ZS5tYXBMYXllcnM7XG5cbiAgICBpbml0aWFsRGF0YVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyU2VsZWN0b3IsXG4gICAgICB0aGlzLm1hcExheWVyc1NlbGVjdG9yLFxuICAgICAgbGF5ZXJTZWxlY3RvclxuICAgICk7XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCBpdGVtcyA9IHRoaXMuaW5pdGlhbERhdGFTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgICAgaWYgKCFpdGVtcykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3Qge1xuICAgICAgICBkcmFnUm90YXRlLFxuICAgICAgICBpc1NwbGl0LFxuICAgICAgICBpc0V4cG9ydCxcbiAgICAgICAgbWFwSW5kZXgsXG4gICAgICAgIG1hcENvbnRyb2xzLFxuICAgICAgICBvblRvZ2dsZVBlcnNwZWN0aXZlLFxuICAgICAgICBvblRvZ2dsZVNwbGl0TWFwLFxuICAgICAgICBvbk1hcFRvZ2dsZUxheWVyLFxuICAgICAgICBvblRvZ2dsZU1hcENvbnRyb2wsXG4gICAgICAgIHNjYWxlXG4gICAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgICAgY29uc3Qge1xuICAgICAgICB2aXNpYmxlTGF5ZXJzID0ge30sXG4gICAgICAgIG1hcExlZ2VuZCA9IHt9LFxuICAgICAgICB0b2dnbGUzZCA9IHt9LFxuICAgICAgICBzcGxpdE1hcCA9IHt9XG4gICAgICB9ID0gbWFwQ29udHJvbHM7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRNYXBDb250cm9sIGNsYXNzTmFtZT1cIm1hcC1jb250cm9sXCI+XG4gICAgICAgICAgey8qIFNwbGl0IE1hcCAqL31cbiAgICAgICAgICB7c3BsaXRNYXAuc2hvdyA/IChcbiAgICAgICAgICAgIDxBY3Rpb25QYW5lbCBrZXk9ezB9PlxuICAgICAgICAgICAgICA8U3R5bGVkTWFwQ29udHJvbEJ1dHRvblxuICAgICAgICAgICAgICAgIGFjdGl2ZT17aXNTcGxpdH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU3BsaXRNYXAoaXNTcGxpdCA/IG1hcEluZGV4IDogdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGtleT17YHNwbGl0LSR7aXNTcGxpdH1gfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1hcC1jb250cm9sLWJ1dHRvbiBzcGxpdC1tYXBcIlxuICAgICAgICAgICAgICAgIGRhdGEtdGlwXG4gICAgICAgICAgICAgICAgZGF0YS1mb3I9XCJhY3Rpb24tdG9nZ2xlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpc1NwbGl0ID8gPERlbGV0ZSBoZWlnaHQ9XCIxOHB4XCIgLz4gOiA8U3BsaXQgaGVpZ2h0PVwiMThweFwiIC8+fVxuICAgICAgICAgICAgICAgIDxNYXBMZWdlbmRUb29sdGlwXG4gICAgICAgICAgICAgICAgICBpZD1cImFjdGlvbi10b2dnbGVcIlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZT17XG4gICAgICAgICAgICAgICAgICAgIGlzU3BsaXQgPyAnQ2xvc2UgY3VycmVudCBwYW5lbCcgOiAnU3dpdGNoIHRvIGR1YWwgbWFwIHZpZXcnXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9TdHlsZWRNYXBDb250cm9sQnV0dG9uPlxuICAgICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHsvKiBNYXAgTGF5ZXJzICovfVxuICAgICAgICAgIHtpc1NwbGl0ICYmIHZpc2libGVMYXllcnMuc2hvdyA/IChcbiAgICAgICAgICAgIDxBY3Rpb25QYW5lbCBrZXk9ezF9PlxuICAgICAgICAgICAgICA8TGF5ZXJTZWxlY3RvclBhbmVsXG4gICAgICAgICAgICAgICAgaXRlbXM9e2l0ZW1zfVxuICAgICAgICAgICAgICAgIG9uTWFwVG9nZ2xlTGF5ZXI9e29uTWFwVG9nZ2xlTGF5ZXJ9XG4gICAgICAgICAgICAgICAgaXNBY3RpdmU9e3Zpc2libGVMYXllcnMuYWN0aXZlfVxuICAgICAgICAgICAgICAgIHRvZ2dsZU1lbnVQYW5lbD17KCkgPT4gb25Ub2dnbGVNYXBDb250cm9sKCd2aXNpYmxlTGF5ZXJzJyl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgey8qIDNEIE1hcCAqL31cbiAgICAgICAgICB7dG9nZ2xlM2Quc2hvdyA/IChcbiAgICAgICAgICAgIDxBY3Rpb25QYW5lbCBrZXk9ezJ9PlxuICAgICAgICAgICAgICA8U3R5bGVkTWFwQ29udHJvbEJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT4ge1xuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgb25Ub2dnbGVQZXJzcGVjdGl2ZSgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYWN0aXZlPXtkcmFnUm90YXRlfVxuICAgICAgICAgICAgICAgIGRhdGEtdGlwXG4gICAgICAgICAgICAgICAgZGF0YS1mb3I9XCJhY3Rpb24tM2RcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEN1YmUzZCBoZWlnaHQ9XCIyMnB4XCIgLz5cbiAgICAgICAgICAgICAgICB7LyogTm8gaWNvbiBzaW5jZSB3ZSBhcmUgaW5qZWN0aW5nIHRocm91Z2ggY3NzIC50aHJlZUQtbWFwIGNsYXNzKi99XG4gICAgICAgICAgICAgICAgPE1hcExlZ2VuZFRvb2x0aXBcbiAgICAgICAgICAgICAgICAgIGlkPVwiYWN0aW9uLTNkXCJcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e2RyYWdSb3RhdGUgPyAnRGlzYWJsZSAzRCBNYXAnIDogJzNEIE1hcCd9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9TdHlsZWRNYXBDb250cm9sQnV0dG9uPlxuICAgICAgICAgICAgPC9BY3Rpb25QYW5lbD5cbiAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgIHsvKiBNYXAgTGVnZW5kICovfVxuICAgICAgICAgIHttYXBMZWdlbmQuc2hvdyA/IChcbiAgICAgICAgICAgIDxBY3Rpb25QYW5lbCBrZXk9ezN9PlxuICAgICAgICAgICAgICA8TWFwTGVnZW5kUGFuZWxcbiAgICAgICAgICAgICAgICBpdGVtcz17aXRlbXN9XG4gICAgICAgICAgICAgICAgc2NhbGU9e3NjYWxlfVxuICAgICAgICAgICAgICAgIGlzRXhwb3J0PXtpc0V4cG9ydH1cbiAgICAgICAgICAgICAgICBvbk1hcFRvZ2dsZUxheWVyPXtvbk1hcFRvZ2dsZUxheWVyfVxuICAgICAgICAgICAgICAgIGlzQWN0aXZlPXttYXBMZWdlbmQuYWN0aXZlfVxuICAgICAgICAgICAgICAgIHRvZ2dsZU1lbnVQYW5lbD17KCkgPT4gb25Ub2dnbGVNYXBDb250cm9sKCdtYXBMZWdlbmQnKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvU3R5bGVkTWFwQ29udHJvbD5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1hcENvbnRyb2w7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBNYXBDb250cm9sRmFjdG9yeTtcbiJdfQ==