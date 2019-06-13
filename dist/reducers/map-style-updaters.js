"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMapStyles = getMapStyles;
exports.getInitialInputStyle = getInitialInputStyle;
exports.addCustomMapStyleUpdater = exports.inputMapStyleUpdater = exports.loadCustomMapStyleUpdater = exports.resetMapConfigMapStyleUpdater = exports.receiveMapConfigUpdater = exports.requestMapStylesUpdater = exports.loadMapStyleErrUpdater = exports.loadMapStylesUpdater = exports.mapStyleChangeUpdater = exports.mapConfigChangeUpdater = exports.initMapStyleUpdater = exports.INITIAL_MAP_STYLE = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread7 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _tasks = _interopRequireWildcard(require("react-palm/tasks"));

var _lodash = _interopRequireDefault(require("lodash.clonedeep"));

var _mapboxGlStyleEditor = require("../utils/map-style-utils/mapbox-gl-style-editor");

var _defaultSettings = require("../constants/default-settings");

var _utils = require("../utils/utils");

var _tasks2 = require("../tasks/tasks");

var _mapStyleActions = require("../actions/map-style-actions");

var _d3Color = require("d3-color");

var _colorUtils = require("../utils/color-utils");

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
// Utils
var DEFAULT_BLDG_COLOR = '#D1CEC7';

var getDefaultState = function getDefaultState() {
  var visibleLayerGroups = {};
  var styleType = 'dark';
  var topLayerGroups = {};
  return {
    styleType: styleType,
    visibleLayerGroups: visibleLayerGroups,
    topLayerGroups: topLayerGroups,
    mapStyles: _defaultSettings.DEFAULT_MAP_STYLES.reduce(function (accu, curr) {
      return (0, _objectSpread7["default"])({}, accu, (0, _defineProperty2["default"])({}, curr.id, curr));
    }, {}),
    // save mapbox access token
    mapboxApiAccessToken: null,
    inputStyle: getInitialInputStyle(),
    threeDBuildingColor: (0, _colorUtils.hexToRgb)(DEFAULT_BLDG_COLOR)
  };
};
/**
 * Updaters for `mapStyle`. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 * @public
 * @example
 *
 * import keplerGlReducer, {mapStyleUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    // click button to hide label from background map
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             mapStyle: mapStyleUpdaters.mapConfigChangeUpdater(
 *               mapStyle,
 *               {payload: {visibleLayerGroups: {label: false, road: true, background: true}}}
 *             )
 *          }
 *        }
 *      };
 *  }
 *  return reducers(state, action);
 * };
 *
 * export default composedReducer;
 */

/* eslint-disable no-unused-vars */


var mapStyleUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * Default initial `mapStyle`
 * @memberof mapStyleUpdaters
 * @constant
 * @property {string} styleType - Default: `'dark'`
 * @property {Object} visibleLayerGroups - Default: `{}`
 * @property {Object} topLayerGroups - Default: `{}`
 * @property {Object} mapStyles - mapping from style key to style objct
 * @property {string} mapboxApiAccessToken - Default: `null`
 * @property {Object} inputStyle - Default: `{}`
 * @property {Array} threeDBuildingColor - Default: `[r, g, b]`
 * @public
 */

var INITIAL_MAP_STYLE = getDefaultState();
/**
 * Create two map styles from preset map style, one for top map one for bottom
 *
 * @param {string} styleType - current map style
 * @param {Object} visibleLayerGroups - visible layers of bottom map
 * @param {Object} topLayerGroups - visible layers of top map
 * @param {Object} mapStyles - a dictionary of all map styles
 * @returns {Object} bottomMapStyle | topMapStyle | isRaster
 */

exports.INITIAL_MAP_STYLE = INITIAL_MAP_STYLE;

function getMapStyles(_ref) {
  var styleType = _ref.styleType,
      visibleLayerGroups = _ref.visibleLayerGroups,
      topLayerGroups = _ref.topLayerGroups,
      mapStyles = _ref.mapStyles;
  var mapStyle = mapStyles[styleType]; // style might not be loaded yet

  if (!mapStyle || !mapStyle.style) {
    return {};
  }

  var editable = Object.keys(visibleLayerGroups).length;
  var bottomMapStyle = !editable ? mapStyle.style : (0, _mapboxGlStyleEditor.editBottomMapStyle)({
    id: styleType,
    mapStyle: mapStyle,
    visibleLayerGroups: visibleLayerGroups
  });
  var hasTopLayer = editable && Object.values(topLayerGroups).some(function (v) {
    return v;
  }); // mute top layer if not visible in bottom layer

  var topLayers = hasTopLayer && Object.keys(topLayerGroups).reduce(function (accu, key) {
    return (0, _objectSpread7["default"])({}, accu, (0, _defineProperty2["default"])({}, key, topLayerGroups[key] && visibleLayerGroups[key]));
  }, {});
  var topMapStyle = hasTopLayer ? (0, _mapboxGlStyleEditor.editTopMapStyle)({
    id: styleType,
    mapStyle: mapStyle,
    visibleLayerGroups: topLayers
  }) : null;
  var threeDBuildingColor = get3DBuildingColor(mapStyle);
  return {
    bottomMapStyle: bottomMapStyle,
    topMapStyle: topMapStyle,
    editable: editable,
    threeDBuildingColor: threeDBuildingColor
  };
}

function get3DBuildingColor(style) {
  // set building color to be the same as the background color.
  var backgroundLayer = (style.style.layers || []).find(function (_ref2) {
    var id = _ref2.id;
    return id === 'background';
  });
  var buildingColor = backgroundLayer && backgroundLayer.paint && backgroundLayer.paint['background-color'] ? backgroundLayer.paint['background-color'] : DEFAULT_BLDG_COLOR; // brighten or darken building based on style

  var operation = style.id.match(/(?=(dark|night))/) ? 'brighter' : 'darker';
  var alpha = 0.2;
  var rgbObj = (0, _d3Color.rgb)(buildingColor)[operation]([alpha]);
  return [rgbObj.r, rgbObj.g, rgbObj.b];
}

function getLayerGroupsFromStyle(style) {
  return Array.isArray(style.layers) ? _defaultSettings.DEFAULT_LAYER_GROUPS.filter(function (lg) {
    return style.layers.filter(lg.filter).length;
  }) : [];
} // Updaters

/**
 * Propagate `mapStyle` reducer with `mapboxApiAccessToken`
 * @memberof mapStyleUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload
 * @param {string} action.payload.mapboxApiAccessToken
 * @returns {Object} nextState
 * @public
 */


var initMapStyleUpdater = function initMapStyleUpdater(state, action) {
  return (0, _objectSpread7["default"])({}, state, {
    // save mapbox access token to map style state
    mapboxApiAccessToken: (action.payload || {}).mapboxApiAccessToken
  });
};
/**
 * Update `visibleLayerGroups`to change layer group visibility
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload new config `{visibleLayerGroups: {label: false, road: true, background: true}}`
 * @returns {Object} nextState
 * @public
 */


exports.initMapStyleUpdater = initMapStyleUpdater;

var mapConfigChangeUpdater = function mapConfigChangeUpdater(state, action) {
  return (0, _objectSpread7["default"])({}, state, action.payload, getMapStyles((0, _objectSpread7["default"])({}, state, action.payload)));
};
/**
 * Change to another map style. The selected style should already been loaded into `mapStyle.mapStyles`
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {string} action.payload
 * @returns {Object} nextState
 * @public
 */


exports.mapConfigChangeUpdater = mapConfigChangeUpdater;

var mapStyleChangeUpdater = function mapStyleChangeUpdater(state, _ref3) {
  var styleType = _ref3.payload;

  if (!state.mapStyles[styleType]) {
    // we might not have received the style yet
    return state;
  }

  var defaultLGVisibility = (0, _mapboxGlStyleEditor.getDefaultLayerGroupVisibility)(state.mapStyles[styleType]);
  var visibleLayerGroups = (0, _mapboxGlStyleEditor.mergeLayerGroupVisibility)(defaultLGVisibility, state.visibleLayerGroups);
  return (0, _objectSpread7["default"])({}, state, {
    styleType: styleType,
    visibleLayerGroups: visibleLayerGroups
  }, getMapStyles((0, _objectSpread7["default"])({}, state, {
    visibleLayerGroups: visibleLayerGroups,
    styleType: styleType
  })));
};
/**
 * Callback when load map style success
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload a `{[id]: style}` mapping
 * @return {Object} nextState
 * @public
 */


exports.mapStyleChangeUpdater = mapStyleChangeUpdater;

var loadMapStylesUpdater = function loadMapStylesUpdater(state, action) {
  var newStyles = action.payload || {};
  var addLayerGroups = Object.keys(newStyles).reduce(function (accu, id) {
    return (0, _objectSpread7["default"])({}, accu, (0, _defineProperty2["default"])({}, id, (0, _objectSpread7["default"])({}, newStyles[id], {
      layerGroups: newStyles[id].layerGroups || getLayerGroupsFromStyle(newStyles[id].style)
    })));
  }, {}); // add new styles to state

  var newState = (0, _objectSpread7["default"])({}, state, {
    mapStyles: (0, _objectSpread7["default"])({}, state.mapStyles, addLayerGroups)
  });
  return newStyles[state.styleType] ? mapStyleChangeUpdater(newState, {
    payload: state.styleType
  }) : newState;
};
/**
 * Callback when load map style error
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {*} action.payload error
 * @returns {Object} nextState
 * @public
 */
// do nothing for now, if didn't load, skip it


exports.loadMapStylesUpdater = loadMapStylesUpdater;

var loadMapStyleErrUpdater = function loadMapStyleErrUpdater(state) {
  return state;
};

exports.loadMapStyleErrUpdater = loadMapStyleErrUpdater;

var requestMapStylesUpdater = function requestMapStylesUpdater(state, _ref4) {
  var mapStyles = _ref4.payload;
  var loadMapStyleTasks = getLoadMapStyleTasks(mapStyles, state.mapboxApiAccessToken);
  return (0, _tasks.withTask)(state, loadMapStyleTasks);
};
/**
 * Load map style object when pass in saved map config
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload saved map config `{mapStyle, visState, mapState}`
 * @returns {Object} nextState or `react-pam` tasks to load map style object
 */


exports.requestMapStylesUpdater = requestMapStylesUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, _ref5) {
  var mapStyle = _ref5.payload.mapStyle;

  if (!mapStyle) {
    return state;
  } // if saved custom mapStyles load the style object


  var loadMapStyleTasks = mapStyle.mapStyles ? getLoadMapStyleTasks(mapStyle.mapStyles, state.mapboxApiAccessToken) : null; // merge default mapStyles

  var merged = mapStyle.mapStyles ? (0, _objectSpread7["default"])({}, mapStyle, {
    mapStyles: (0, _objectSpread7["default"])({}, mapStyle.mapStyles, state.mapStyles)
  }) : mapStyle;
  var newState = mapConfigChangeUpdater(state, {
    payload: merged
  });
  return loadMapStyleTasks ? (0, _tasks.withTask)(newState, loadMapStyleTasks) : newState;
};

exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

function getLoadMapStyleTasks(mapStyles, mapboxApiAccessToken) {
  return [_tasks["default"].all(Object.values(mapStyles).map(function (_ref6) {
    var id = _ref6.id,
        url = _ref6.url,
        accessToken = _ref6.accessToken;
    return {
      id: id,
      url: (0, _mapboxGlStyleEditor.isValidStyleUrl)(url) ? (0, _mapboxGlStyleEditor.getStyleDownloadUrl)(url, accessToken || mapboxApiAccessToken) : url
    };
  }).map(_tasks2.LOAD_MAP_STYLE_TASK)).bimap( // success
  function (results) {
    return (0, _mapStyleActions.loadMapStyles)(results.reduce(function (accu, _ref7) {
      var id = _ref7.id,
          style = _ref7.style;
      return (0, _objectSpread7["default"])({}, accu, (0, _defineProperty2["default"])({}, id, (0, _objectSpread7["default"])({}, mapStyles[id], {
        style: style
      })));
    }, {}));
  }, // error
  _mapStyleActions.loadMapStyleErr)];
}
/**
 * Reset map style config to initial state
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @returns {Object} nextState
 * @public
 */


var resetMapConfigMapStyleUpdater = function resetMapConfigMapStyleUpdater(state) {
  var emptyConfig = (0, _objectSpread7["default"])({}, INITIAL_MAP_STYLE, {
    mapboxApiAccessToken: state.mapboxApiAccessToken
  }, state.initialState, {
    mapStyles: state.mapStyles,
    initialState: state.initialState
  });
  return mapStyleChangeUpdater(emptyConfig, {
    payload: emptyConfig.styleType
  });
};
/**
 * Callback when a custom map style object is received
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action
 * @param {Object} action.payload
 * @param {string} action.payload.icon
 * @param {Object} action.payload.style
 * @param {*} action.payload.error
 * @returns {Object} nextState
 * @public
 */


exports.resetMapConfigMapStyleUpdater = resetMapConfigMapStyleUpdater;

var loadCustomMapStyleUpdater = function loadCustomMapStyleUpdater(state, _ref8) {
  var _ref8$payload = _ref8.payload,
      icon = _ref8$payload.icon,
      style = _ref8$payload.style,
      error = _ref8$payload.error;
  return (0, _objectSpread7["default"])({}, state, {
    inputStyle: (0, _objectSpread7["default"])({}, state.inputStyle, style ? {
      id: style.id || (0, _utils.generateHashId)(),
      // make a copy of the style object
      style: (0, _lodash["default"])(style),
      label: style.name,
      // gathering layer group info from style json
      layerGroups: getLayerGroupsFromStyle(style)
    } : {}, icon ? {
      icon: icon
    } : {}, error !== undefined ? {
      error: error
    } : {})
  });
};
/**
 * Input a custom map style object
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @param {Object} action action object
 * @param {Object} action.payload inputStyle
 * @param {string} action.payload.url style url e.g. `'mapbox://styles/heshan/xxxxxyyyyzzz'`
 * @param {string} action.payload.id style url e.g. `'custom_style_1'`
 * @param {Object} action.payload.style actual mapbox style json
 * @param {string} action.payload.name style name
 * @param {Object} action.payload.layerGroups layer groups that can be used to set map layer visibility
 * @param {Object} action.payload.icon icon image data url
 * @returns {Object} nextState
 * @public
 */


exports.loadCustomMapStyleUpdater = loadCustomMapStyleUpdater;

var inputMapStyleUpdater = function inputMapStyleUpdater(state, _ref9) {
  var inputStyle = _ref9.payload;
  return (0, _objectSpread7["default"])({}, state, {
    inputStyle: (0, _objectSpread7["default"])({}, inputStyle, {
      isValid: (0, _mapboxGlStyleEditor.isValidStyleUrl)(inputStyle.url)
    })
  });
};
/**
 * Add map style from user input to reducer and set it to current style
 * This action is called when user click confirm after putting in a valid style url in the custom map style dialog.
 * It should not be called from outside kepler.gl without a valid `inputStyle` in the `mapStyle` reducer.
 * @memberof mapStyleUpdaters
 * @param {Object} state `mapStyle`
 * @returns {Object} nextState
 */


exports.inputMapStyleUpdater = inputMapStyleUpdater;

var addCustomMapStyleUpdater = function addCustomMapStyleUpdater(state) {
  var styleId = state.inputStyle.id;
  var newState = (0, _objectSpread7["default"])({}, state, {
    mapStyles: (0, _objectSpread7["default"])({}, state.mapStyles, (0, _defineProperty2["default"])({}, styleId, state.inputStyle)),
    // set to default
    inputStyle: getInitialInputStyle()
  }); // set new style

  return mapStyleChangeUpdater(newState, {
    payload: styleId
  });
};

exports.addCustomMapStyleUpdater = addCustomMapStyleUpdater;

function getInitialInputStyle() {
  return {
    accessToken: null,
    error: false,
    isValid: false,
    label: null,
    style: null,
    url: null,
    custom: true
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3R5bGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsiREVGQVVMVF9CTERHX0NPTE9SIiwiZ2V0RGVmYXVsdFN0YXRlIiwidmlzaWJsZUxheWVyR3JvdXBzIiwic3R5bGVUeXBlIiwidG9wTGF5ZXJHcm91cHMiLCJtYXBTdHlsZXMiLCJERUZBVUxUX01BUF9TVFlMRVMiLCJyZWR1Y2UiLCJhY2N1IiwiY3VyciIsImlkIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJpbnB1dFN0eWxlIiwiZ2V0SW5pdGlhbElucHV0U3R5bGUiLCJ0aHJlZURCdWlsZGluZ0NvbG9yIiwibWFwU3R5bGVVcGRhdGVycyIsIklOSVRJQUxfTUFQX1NUWUxFIiwiZ2V0TWFwU3R5bGVzIiwibWFwU3R5bGUiLCJzdHlsZSIsImVkaXRhYmxlIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImJvdHRvbU1hcFN0eWxlIiwiaGFzVG9wTGF5ZXIiLCJ2YWx1ZXMiLCJzb21lIiwidiIsInRvcExheWVycyIsImtleSIsInRvcE1hcFN0eWxlIiwiZ2V0M0RCdWlsZGluZ0NvbG9yIiwiYmFja2dyb3VuZExheWVyIiwibGF5ZXJzIiwiZmluZCIsImJ1aWxkaW5nQ29sb3IiLCJwYWludCIsIm9wZXJhdGlvbiIsIm1hdGNoIiwiYWxwaGEiLCJyZ2JPYmoiLCJyIiwiZyIsImIiLCJnZXRMYXllckdyb3Vwc0Zyb21TdHlsZSIsIkFycmF5IiwiaXNBcnJheSIsIkRFRkFVTFRfTEFZRVJfR1JPVVBTIiwiZmlsdGVyIiwibGciLCJpbml0TWFwU3R5bGVVcGRhdGVyIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwibWFwQ29uZmlnQ2hhbmdlVXBkYXRlciIsIm1hcFN0eWxlQ2hhbmdlVXBkYXRlciIsImRlZmF1bHRMR1Zpc2liaWxpdHkiLCJsb2FkTWFwU3R5bGVzVXBkYXRlciIsIm5ld1N0eWxlcyIsImFkZExheWVyR3JvdXBzIiwibGF5ZXJHcm91cHMiLCJuZXdTdGF0ZSIsImxvYWRNYXBTdHlsZUVyclVwZGF0ZXIiLCJyZXF1ZXN0TWFwU3R5bGVzVXBkYXRlciIsImxvYWRNYXBTdHlsZVRhc2tzIiwiZ2V0TG9hZE1hcFN0eWxlVGFza3MiLCJyZWNlaXZlTWFwQ29uZmlnVXBkYXRlciIsIm1lcmdlZCIsIlRhc2siLCJhbGwiLCJtYXAiLCJ1cmwiLCJhY2Nlc3NUb2tlbiIsIkxPQURfTUFQX1NUWUxFX1RBU0siLCJiaW1hcCIsInJlc3VsdHMiLCJsb2FkTWFwU3R5bGVFcnIiLCJyZXNldE1hcENvbmZpZ01hcFN0eWxlVXBkYXRlciIsImVtcHR5Q29uZmlnIiwiaW5pdGlhbFN0YXRlIiwibG9hZEN1c3RvbU1hcFN0eWxlVXBkYXRlciIsImljb24iLCJlcnJvciIsImxhYmVsIiwibmFtZSIsInVuZGVmaW5lZCIsImlucHV0TWFwU3R5bGVVcGRhdGVyIiwiaXNWYWxpZCIsImFkZEN1c3RvbU1hcFN0eWxlVXBkYXRlciIsInN0eWxlSWQiLCJjdXN0b20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUdBOztBQVFBOztBQUlBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQXhDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBbUJBLElBQU1BLGtCQUFrQixHQUFHLFNBQTNCOztBQUVBLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsR0FBTTtBQUM1QixNQUFNQyxrQkFBa0IsR0FBRyxFQUEzQjtBQUNBLE1BQU1DLFNBQVMsR0FBRyxNQUFsQjtBQUNBLE1BQU1DLGNBQWMsR0FBRyxFQUF2QjtBQUVBLFNBQU87QUFDTEQsSUFBQUEsU0FBUyxFQUFUQSxTQURLO0FBRUxELElBQUFBLGtCQUFrQixFQUFsQkEsa0JBRks7QUFHTEUsSUFBQUEsY0FBYyxFQUFkQSxjQUhLO0FBSUxDLElBQUFBLFNBQVMsRUFB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Qzs7QUFDQSxTQUFPMkMscUJBQXFCLENBQUNNLFFBQUQsRUFBVztBQUFDUixJQUFBQSxPQUFPLEVBQUVvQztBQUFWLEdBQVgsQ0FBNUI7QUFDRCxDQWJNOzs7O0FBZUEsU0FBUzdFLG9CQUFULEdBQWdDO0FBQ3JDLFNBQU87QUFDTDRELElBQUFBLFdBQVcsRUFBRSxJQURSO0FBRUxVLElBQUFBLEtBQUssRUFBRSxLQUZGO0FBR0xLLElBQUFBLE9BQU8sRUFBRSxLQUhKO0FBSUxKLElBQUFBLEtBQUssRUFBRSxJQUpGO0FBS0xqRSxJQUFBQSxLQUFLLEVBQUUsSUFMRjtBQU1McUQsSUFBQUEsR0FBRyxFQUFFLElBTkE7QUFPTG1CLElBQUFBLE1BQU0sRUFBRTtBQVBILEdBQVA7QUFTRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBUYXNrLCB7d2l0aFRhc2t9IGZyb20gJ3JlYWN0LXBhbG0vdGFza3MnO1xuaW1wb3J0IGNsb25lRGVlcCBmcm9tICdsb2Rhc2guY2xvbmVkZWVwJztcblxuLy8gVXRpbHNcbmltcG9ydCB7XG4gIGdldERlZmF1bHRMYXllckdyb3VwVmlzaWJpbGl0eSxcbiAgaXNWYWxpZFN0eWxlVXJsLFxuICBnZXRTdHlsZURvd25sb2FkVXJsLFxuICBtZXJnZUxheWVyR3JvdXBWaXNpYmlsaXR5LFxuICBlZGl0VG9wTWFwU3R5bGUsXG4gIGVkaXRCb3R0b21NYXBTdHlsZVxufSBmcm9tICd1dGlscy9tYXAtc3R5bGUtdXRpbHMvbWFwYm94LWdsLXN0eWxlLWVkaXRvcic7XG5pbXBvcnQge1xuICBERUZBVUxUX01BUF9TVFlMRVMsXG4gIERFRkFVTFRfTEFZRVJfR1JPVVBTXG59IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcbmltcG9ydCB7Z2VuZXJhdGVIYXNoSWR9IGZyb20gJ3V0aWxzL3V0aWxzJztcbmltcG9ydCB7TE9BRF9NQVBfU1RZTEVfVEFTS30gZnJvbSAndGFza3MvdGFza3MnO1xuaW1wb3J0IHtsb2FkTWFwU3R5bGVzLCBsb2FkTWFwU3R5bGVFcnJ9IGZyb20gJ2FjdGlvbnMvbWFwLXN0eWxlLWFjdGlvbnMnO1xuaW1wb3J0IHtyZ2J9IGZyb20gJ2QzLWNvbG9yJztcbmltcG9ydCB7aGV4VG9SZ2J9IGZyb20gJ3V0aWxzL2NvbG9yLXV0aWxzJztcblxuY29uc3QgREVGQVVMVF9CTERHX0NPTE9SID0gJyNEMUNFQzcnO1xuXG5jb25zdCBnZXREZWZhdWx0U3RhdGUgPSAoKSA9PiB7XG4gIGNvbnN0IHZpc2libGVMYXllckdyb3VwcyA9IHt9O1xuICBjb25zdCBzdHlsZVR5cGUgPSAnZGFyayc7XG4gIGNvbnN0IHRvcExheWVyR3JvdXBzID0ge307XG5cbiAgcmV0dXJuIHtcbiAgICBzdHlsZVR5cGUsXG4gICAgdmlzaWJsZUxheWVyR3JvdXBzLFxuICAgIHRvcExheWVyR3JvdXBzLFxuICAgIG1hcFN0eWxlczogREVGQVVMVF9NQVBfU1RZTEVTLnJlZHVjZShcbiAgICAgIChhY2N1LCBjdXJyKSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICBbY3Vyci5pZF06IGN1cnJcbiAgICAgIH0pLFxuICAgICAge31cbiAgICApLFxuICAgIC8vIHNhdmUgbWFwYm94IGFjY2VzcyB0b2tlblxuICAgIG1hcGJveEFwaUFjY2Vzc1Rva2VuOiBudWxsLFxuICAgIGlucHV0U3R5bGU6IGdldEluaXRpYWxJbnB1dFN0eWxlKCksXG4gICAgdGhyZWVEQnVpbGRpbmdDb2xvcjogaGV4VG9SZ2IoREVGQVVMVF9CTERHX0NPTE9SKVxuICB9O1xufTtcblxuLyoqXG4gKiBVcGRhdGVycyBmb3IgYG1hcFN0eWxlYC4gQ2FuIGJlIHVzZWQgaW4geW91ciByb290IHJlZHVjZXIgdG8gZGlyZWN0bHkgbW9kaWZ5IGtlcGxlci5nbCdzIHN0YXRlLlxuICogUmVhZCBtb3JlIGFib3V0IFtVc2luZyB1cGRhdGVyc10oLi4vYWR2YW5jZWQtdXNhZ2UvdXNpbmctdXBkYXRlcnMubWQpXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCBrZXBsZXJHbFJlZHVjZXIsIHttYXBTdHlsZVVwZGF0ZXJzfSBmcm9tICdrZXBsZXIuZ2wvcmVkdWNlcnMnO1xuICogLy8gUm9vdCBSZWR1Y2VyXG4gKiBjb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gKiAga2VwbGVyR2w6IGtlcGxlckdsUmVkdWNlcixcbiAqICBhcHA6IGFwcFJlZHVjZXJcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGNvbXBvc2VkUmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gKiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICogICAgLy8gY2xpY2sgYnV0dG9uIHRvIGhpZGUgbGFiZWwgZnJvbSBiYWNrZ3JvdW5kIG1hcFxuICogICAgY2FzZSAnQ0xJQ0tfQlVUVE9OJzpcbiAqICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgICBrZXBsZXJHbDoge1xuICogICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wsXG4gKiAgICAgICAgICBmb286IHtcbiAqICAgICAgICAgICAgIC4uLnN0YXRlLmtlcGxlckdsLmZvbyxcbiAqICAgICAgICAgICAgIG1hcFN0eWxlOiBtYXBTdHlsZVVwZGF0ZXJzLm1hcENvbmZpZ0NoYW5nZVVwZGF0ZXIoXG4gKiAgICAgICAgICAgICAgIG1hcFN0eWxlLFxuICogICAgICAgICAgICAgICB7cGF5bG9hZDoge3Zpc2libGVMYXllckdyb3Vwczoge2xhYmVsOiBmYWxzZSwgcm9hZDogdHJ1ZSwgYmFja2dyb3VuZDogdHJ1ZX19fVxuICogICAgICAgICAgICAgKVxuICogICAgICAgICAgfVxuICogICAgICAgIH1cbiAqICAgICAgfTtcbiAqICB9XG4gKiAgcmV0dXJuIHJlZHVjZXJzKHN0YXRlLCBhY3Rpb24pO1xuICogfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBjb21wb3NlZFJlZHVjZXI7XG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCBtYXBTdHlsZVVwZGF0ZXJzID0gbnVsbDtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGBtYXBTdHlsZWBcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzdHlsZVR5cGUgLSBEZWZhdWx0OiBgJ2RhcmsnYFxuICogQHByb3BlcnR5IHtPYmplY3R9IHZpc2libGVMYXllckdyb3VwcyAtIERlZmF1bHQ6IGB7fWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB0b3BMYXllckdyb3VwcyAtIERlZmF1bHQ6IGB7fWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtYXBTdHlsZXMgLSBtYXBwaW5nIGZyb20gc3R5bGUga2V5IHRvIHN0eWxlIG9iamN0XG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFwYm94QXBpQWNjZXNzVG9rZW4gLSBEZWZhdWx0OiBgbnVsbGBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBpbnB1dFN0eWxlIC0gRGVmYXVsdDogYHt9YFxuICogQHByb3BlcnR5IHtBcnJheX0gdGhyZWVEQnVpbGRpbmdDb2xvciAtIERlZmF1bHQ6IGBbciwgZywgYl1gXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX01BUF9TVFlMRSA9IGdldERlZmF1bHRTdGF0ZSgpO1xuXG4vKipcbiAqIENyZWF0ZSB0d28gbWFwIHN0eWxlcyBmcm9tIHByZXNldCBtYXAgc3R5bGUsIG9uZSBmb3IgdG9wIG1hcCBvbmUgZm9yIGJvdHRvbVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHlsZVR5cGUgLSBjdXJyZW50IG1hcCBzdHlsZVxuICogQHBhcmFtIHtPYmplY3R9IHZpc2libGVMYXllckdyb3VwcyAtIHZpc2libGUgbGF5ZXJzIG9mIGJvdHRvbSBtYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSB0b3BMYXllckdyb3VwcyAtIHZpc2libGUgbGF5ZXJzIG9mIHRvcCBtYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXBTdHlsZXMgLSBhIGRpY3Rpb25hcnkgb2YgYWxsIG1hcCBzdHlsZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9IGJvdHRvbU1hcFN0eWxlIHwgdG9wTWFwU3R5bGUgfCBpc1Jhc3RlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWFwU3R5bGVzKHtcbiAgc3R5bGVUeXBlLFxuICB2aXNpYmxlTGF5ZXJHcm91cHMsXG4gIHRvcExheWVyR3JvdXBzLFxuICBtYXBTdHlsZXNcbn0pIHtcbiAgY29uc3QgbWFwU3R5bGUgPSBtYXBTdHlsZXNbc3R5bGVUeXBlXTtcblxuICAvLyBzdHlsZSBtaWdodCBub3QgYmUgbG9hZGVkIHlldFxuICBpZiAoIW1hcFN0eWxlIHx8ICFtYXBTdHlsZS5zdHlsZSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGNvbnN0IGVkaXRhYmxlID0gT2JqZWN0LmtleXModmlzaWJsZUxheWVyR3JvdXBzKS5sZW5ndGg7XG5cbiAgY29uc3QgYm90dG9tTWFwU3R5bGUgPSAhZWRpdGFibGVcbiAgICA/IG1hcFN0eWxlLnN0eWxlXG4gICAgOiBlZGl0Qm90dG9tTWFwU3R5bGUoe1xuICAgICAgICBpZDogc3R5bGVUeXBlLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgdmlzaWJsZUxheWVyR3JvdXBzXG4gICAgICB9KTtcblxuICBjb25zdCBoYXNUb3BMYXllciA9IGVkaXRhYmxlICYmIE9iamVjdC52YWx1ZXModG9wTGF5ZXJHcm91cHMpLnNvbWUodiA9PiB2KTtcblxuICAvLyBtdXRlIHRvcCBsYXllciBpZiBub3QgdmlzaWJsZSBpbiBib3R0b20gbGF5ZXJcbiAgY29uc3QgdG9wTGF5ZXJzID1cbiAgICBoYXNUb3BMYXllciAmJlxuICAgIE9iamVjdC5rZXlzKHRvcExheWVyR3JvdXBzKS5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICBba2V5XTogdG9wTGF5ZXJHcm91cHNba2V5XSAmJiB2aXNpYmxlTGF5ZXJHcm91cHNba2V5XVxuICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG5cbiAgY29uc3QgdG9wTWFwU3R5bGUgPSBoYXNUb3BMYXllclxuICAgID8gZWRpdFRvcE1hcFN0eWxlKHtcbiAgICAgICAgaWQ6IHN0eWxlVHlwZSxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIHZpc2libGVMYXllckdyb3VwczogdG9wTGF5ZXJzXG4gICAgICB9KVxuICAgIDogbnVsbDtcbiAgY29uc3QgdGhyZWVEQnVpbGRpbmdDb2xvciA9IGdldDNEQnVpbGRpbmdDb2xvcihtYXBTdHlsZSk7XG4gIHJldHVybiB7Ym90dG9tTWFwU3R5bGUsIHRvcE1hcFN0eWxlLCBlZGl0YWJsZSwgdGhyZWVEQnVpbGRpbmdDb2xvcn07XG59XG5cbmZ1bmN0aW9uIGdldDNEQnVpbGRpbmdDb2xvcihzdHlsZSkge1xuICAvLyBzZXQgYnVpbGRpbmcgY29sb3IgdG8gYmUgdGhlIHNhbWUgYXMgdGhlIGJhY2tncm91bmQgY29sb3IuXG4gIGNvbnN0IGJhY2tncm91bmRMYXllciA9IChzdHlsZS5zdHlsZS5sYXllcnMgfHwgW10pLmZpbmQoXG4gICAgKHtpZH0pID0+IGlkID09PSAnYmFja2dyb3VuZCdcbiAgKTtcbiAgY29uc3QgYnVpbGRpbmdDb2xvciA9XG4gICAgYmFja2dyb3VuZExheWVyICYmXG4gICAgYmFja2dyb3VuZExheWVyLnBhaW50ICYmXG4gICAgYmFja2dyb3VuZExheWVyLnBhaW50WydiYWNrZ3JvdW5kLWNvbG9yJ11cbiAgICAgID8gYmFja2dyb3VuZExheWVyLnBhaW50WydiYWNrZ3JvdW5kLWNvbG9yJ11cbiAgICAgIDogREVGQVVMVF9CTERHX0NPTE9SO1xuICAvLyBicmlnaHRlbiBvciBkYXJrZW4gYnVpbGRpbmcgYmFzZWQgb24gc3R5bGVcbiAgY29uc3Qgb3BlcmF0aW9uID0gc3R5bGUuaWQubWF0Y2goLyg/PShkYXJrfG5pZ2h0KSkvKSA/ICdicmlnaHRlcicgOiAnZGFya2VyJztcbiAgY29uc3QgYWxwaGEgPSAwLjI7XG4gIGNvbnN0IHJnYk9iaiA9IHJnYihidWlsZGluZ0NvbG9yKVtvcGVyYXRpb25dKFthbHBoYV0pO1xuICByZXR1cm4gW3JnYk9iai5yLCByZ2JPYmouZywgcmdiT2JqLmJdO1xufVxuXG5mdW5jdGlvbiBnZXRMYXllckdyb3Vwc0Zyb21TdHlsZShzdHlsZSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShzdHlsZS5sYXllcnMpID8gREVGQVVMVF9MQVlFUl9HUk9VUFMuZmlsdGVyKFxuICAgIGxnID0+IHN0eWxlLmxheWVycy5maWx0ZXIobGcuZmlsdGVyKS5sZW5ndGhcbiAgKSA6IFtdO1xufVxuXG4vLyBVcGRhdGVyc1xuLyoqXG4gKiBQcm9wYWdhdGUgYG1hcFN0eWxlYCByZWR1Y2VyIHdpdGggYG1hcGJveEFwaUFjY2Vzc1Rva2VuYFxuICogQG1lbWJlcm9mIG1hcFN0eWxlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQubWFwYm94QXBpQWNjZXNzVG9rZW5cbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgaW5pdE1hcFN0eWxlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgLy8gc2F2ZSBtYXBib3ggYWNjZXNzIHRva2VuIHRvIG1hcCBzdHlsZSBzdGF0ZVxuICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogKGFjdGlvbi5wYXlsb2FkIHx8IHt9KS5tYXBib3hBcGlBY2Nlc3NUb2tlblxufSk7XG5cbi8qKlxuICogVXBkYXRlIGB2aXNpYmxlTGF5ZXJHcm91cHNgdG8gY2hhbmdlIGxheWVyIGdyb3VwIHZpc2liaWxpdHlcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkIG5ldyBjb25maWcgYHt2aXNpYmxlTGF5ZXJHcm91cHM6IHtsYWJlbDogZmFsc2UsIHJvYWQ6IHRydWUsIGJhY2tncm91bmQ6IHRydWV9fWBcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbWFwQ29uZmlnQ2hhbmdlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgLi4uYWN0aW9uLnBheWxvYWQsXG4gIC4uLmdldE1hcFN0eWxlcyh7XG4gICAgLi4uc3RhdGUsXG4gICAgLi4uYWN0aW9uLnBheWxvYWRcbiAgfSlcbn0pO1xuXG4vKipcbiAqIENoYW5nZSB0byBhbm90aGVyIG1hcCBzdHlsZS4gVGhlIHNlbGVjdGVkIHN0eWxlIHNob3VsZCBhbHJlYWR5IGJlZW4gbG9hZGVkIGludG8gYG1hcFN0eWxlLm1hcFN0eWxlc2BcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5wYXlsb2FkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IG1hcFN0eWxlQ2hhbmdlVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IHN0eWxlVHlwZX0pID0+IHtcbiAgaWYgKCFzdGF0ZS5tYXBTdHlsZXNbc3R5bGVUeXBlXSkge1xuICAgIC8vIHdlIG1pZ2h0IG5vdCBoYXZlIHJlY2VpdmVkIHRoZSBzdHlsZSB5ZXRcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgY29uc3QgZGVmYXVsdExHVmlzaWJpbGl0eSA9IGdldERlZmF1bHRMYXllckdyb3VwVmlzaWJpbGl0eShcbiAgICBzdGF0ZS5tYXBTdHlsZXNbc3R5bGVUeXBlXVxuICApO1xuXG4gIGNvbnN0IHZpc2libGVMYXllckdyb3VwcyA9IG1lcmdlTGF5ZXJHcm91cFZpc2liaWxpdHkoXG4gICAgZGVmYXVsdExHVmlzaWJpbGl0eSxcbiAgICBzdGF0ZS52aXNpYmxlTGF5ZXJHcm91cHNcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIHN0eWxlVHlwZSxcbiAgICB2aXNpYmxlTGF5ZXJHcm91cHMsXG4gICAgLi4uZ2V0TWFwU3R5bGVzKHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgdmlzaWJsZUxheWVyR3JvdXBzLFxuICAgICAgc3R5bGVUeXBlXG4gICAgfSlcbiAgfTtcbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgd2hlbiBsb2FkIG1hcCBzdHlsZSBzdWNjZXNzXG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGBtYXBTdHlsZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZCBhIGB7W2lkXTogc3R5bGV9YCBtYXBwaW5nXG4gKiBAcmV0dXJuIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbG9hZE1hcFN0eWxlc1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBuZXdTdHlsZXMgPSBhY3Rpb24ucGF5bG9hZCB8fCB7fTtcbiAgY29uc3QgYWRkTGF5ZXJHcm91cHMgPSBPYmplY3Qua2V5cyhuZXdTdHlsZXMpLnJlZHVjZSgoYWNjdSwgaWQpID0+ICh7XG4gICAgLi4uYWNjdSxcbiAgICBbaWRdOiB7XG4gICAgICAuLi5uZXdTdHlsZXNbaWRdLFxuICAgICAgbGF5ZXJHcm91cHM6XG4gICAgICAgIG5ld1N0eWxlc1tpZF0ubGF5ZXJHcm91cHMgfHwgZ2V0TGF5ZXJHcm91cHNGcm9tU3R5bGUobmV3U3R5bGVzW2lkXS5zdHlsZSlcbiAgICB9XG4gIH0pLCB7fSk7XG5cbiAgLy8gYWRkIG5ldyBzdHlsZXMgdG8gc3RhdGVcbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgbWFwU3R5bGVzOiB7XG4gICAgICAuLi5zdGF0ZS5tYXBTdHlsZXMsXG4gICAgICAuLi5hZGRMYXllckdyb3Vwc1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbmV3U3R5bGVzW3N0YXRlLnN0eWxlVHlwZV1cbiAgICA/IG1hcFN0eWxlQ2hhbmdlVXBkYXRlcihuZXdTdGF0ZSwge3BheWxvYWQ6IHN0YXRlLnN0eWxlVHlwZX0pXG4gICAgOiBuZXdTdGF0ZTtcbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgd2hlbiBsb2FkIG1hcCBzdHlsZSBlcnJvclxuICogQG1lbWJlcm9mIG1hcFN0eWxlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgbWFwU3R5bGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0geyp9IGFjdGlvbi5wYXlsb2FkIGVycm9yXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuLy8gZG8gbm90aGluZyBmb3Igbm93LCBpZiBkaWRuJ3QgbG9hZCwgc2tpcCBpdFxuZXhwb3J0IGNvbnN0IGxvYWRNYXBTdHlsZUVyclVwZGF0ZXIgPSAoc3RhdGUpID0+IHN0YXRlO1xuXG5leHBvcnQgY29uc3QgcmVxdWVzdE1hcFN0eWxlc1VwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBtYXBTdHlsZXN9KSA9PiB7XG4gIGNvbnN0IGxvYWRNYXBTdHlsZVRhc2tzID0gZ2V0TG9hZE1hcFN0eWxlVGFza3MobWFwU3R5bGVzLCBzdGF0ZS5tYXBib3hBcGlBY2Nlc3NUb2tlbik7XG4gIHJldHVybiB3aXRoVGFzayhzdGF0ZSwgbG9hZE1hcFN0eWxlVGFza3MpO1xufTtcblxuLyoqXG4gKiBMb2FkIG1hcCBzdHlsZSBvYmplY3Qgd2hlbiBwYXNzIGluIHNhdmVkIG1hcCBjb25maWdcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkIHNhdmVkIG1hcCBjb25maWcgYHttYXBTdHlsZSwgdmlzU3RhdGUsIG1hcFN0YXRlfWBcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZSBvciBgcmVhY3QtcGFtYCB0YXNrcyB0byBsb2FkIG1hcCBzdHlsZSBvYmplY3RcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDoge21hcFN0eWxlfX0pID0+IHtcbiAgaWYgKCFtYXBTdHlsZSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8vIGlmIHNhdmVkIGN1c3RvbSBtYXBTdHlsZXMgbG9hZCB0aGUgc3R5bGUgb2JqZWN0XG4gIGNvbnN0IGxvYWRNYXBTdHlsZVRhc2tzID0gbWFwU3R5bGUubWFwU3R5bGVzXG4gICAgPyBnZXRMb2FkTWFwU3R5bGVUYXNrcyhtYXBTdHlsZS5tYXBTdHlsZXMsIHN0YXRlLm1hcGJveEFwaUFjY2Vzc1Rva2VuKVxuICAgIDogbnVsbDtcblxuICAvLyBtZXJnZSBkZWZhdWx0IG1hcFN0eWxlc1xuICBjb25zdCBtZXJnZWQgPSBtYXBTdHlsZS5tYXBTdHlsZXMgPyB7XG4gICAgLi4ubWFwU3R5bGUsXG4gICAgbWFwU3R5bGVzOiB7XG4gICAgICAuLi5tYXBTdHlsZS5tYXBTdHlsZXMsXG4gICAgICAuLi5zdGF0ZS5tYXBTdHlsZXNcbiAgICB9XG4gIH0gOiBtYXBTdHlsZTtcblxuICBjb25zdCBuZXdTdGF0ZSA9IG1hcENvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIHtwYXlsb2FkOiBtZXJnZWR9KTtcblxuICByZXR1cm4gbG9hZE1hcFN0eWxlVGFza3MgPyB3aXRoVGFzayhuZXdTdGF0ZSwgbG9hZE1hcFN0eWxlVGFza3MpIDogbmV3U3RhdGU7XG59O1xuXG5mdW5jdGlvbiBnZXRMb2FkTWFwU3R5bGVUYXNrcyhtYXBTdHlsZXMsIG1hcGJveEFwaUFjY2Vzc1Rva2VuKSB7XG4gIHJldHVybiBbXG4gICAgVGFzay5hbGwoXG4gICAgICBPYmplY3QudmFsdWVzKG1hcFN0eWxlcylcbiAgICAgICAgLm1hcCgoe2lkLCB1cmwsIGFjY2Vzc1Rva2VufSkgPT4gKHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICB1cmw6IGlzVmFsaWRTdHlsZVVybCh1cmwpID8gZ2V0U3R5bGVEb3dubG9hZFVybCh1cmwsIGFjY2Vzc1Rva2VuIHx8IG1hcGJveEFwaUFjY2Vzc1Rva2VuKSA6IHVybFxuICAgICAgICB9KSlcbiAgICAgICAgLm1hcChMT0FEX01BUF9TVFlMRV9UQVNLKVxuICAgICkuYmltYXAoXG4gICAgICAvLyBzdWNjZXNzXG4gICAgICByZXN1bHRzID0+XG4gICAgICAgIGxvYWRNYXBTdHlsZXMoXG4gICAgICAgICAgcmVzdWx0cy5yZWR1Y2UoXG4gICAgICAgICAgICAoYWNjdSwge2lkLCBzdHlsZX0pID0+ICh7XG4gICAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICAgIFtpZF06IHtcbiAgICAgICAgICAgICAgICAuLi5tYXBTdHlsZXNbaWRdLFxuICAgICAgICAgICAgICAgIHN0eWxlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAge31cbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAvLyBlcnJvclxuICAgICAgbG9hZE1hcFN0eWxlRXJyXG4gICAgKVxuICBdO1xufVxuLyoqXG4gKiBSZXNldCBtYXAgc3R5bGUgY29uZmlnIHRvIGluaXRpYWwgc3RhdGVcbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZXNldE1hcENvbmZpZ01hcFN0eWxlVXBkYXRlciA9IHN0YXRlID0+IHtcbiAgY29uc3QgZW1wdHlDb25maWcgPSB7XG4gICAgLi4uSU5JVElBTF9NQVBfU1RZTEUsXG4gICAgbWFwYm94QXBpQWNjZXNzVG9rZW46IHN0YXRlLm1hcGJveEFwaUFjY2Vzc1Rva2VuLFxuICAgIC4uLnN0YXRlLmluaXRpYWxTdGF0ZSxcbiAgICBtYXBTdHlsZXM6IHN0YXRlLm1hcFN0eWxlcyxcbiAgICBpbml0aWFsU3RhdGU6IHN0YXRlLmluaXRpYWxTdGF0ZVxuICB9O1xuXG4gIHJldHVybiBtYXBTdHlsZUNoYW5nZVVwZGF0ZXIoZW1wdHlDb25maWcsIHtwYXlsb2FkOiBlbXB0eUNvbmZpZy5zdHlsZVR5cGV9KTtcbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgd2hlbiBhIGN1c3RvbSBtYXAgc3R5bGUgb2JqZWN0IGlzIHJlY2VpdmVkXG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGBtYXBTdHlsZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZFxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5wYXlsb2FkLmljb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZC5zdHlsZVxuICogQHBhcmFtIHsqfSBhY3Rpb24ucGF5bG9hZC5lcnJvclxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkQ3VzdG9tTWFwU3R5bGVVcGRhdGVyID0gKFxuICBzdGF0ZSxcbiAge3BheWxvYWQ6IHtpY29uLCBzdHlsZSwgZXJyb3J9fVxuKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgaW5wdXRTdHlsZToge1xuICAgIC4uLnN0YXRlLmlucHV0U3R5bGUsXG4gICAgLy8gc3R5bGUganNvbiBhbmQgaWNvbiB3aWxsIGxvYWQgYXN5bmNocm9ub3VzbHlcbiAgICAuLi4oc3R5bGVcbiAgICAgID8ge1xuICAgICAgICAgIGlkOiBzdHlsZS5pZCB8fCBnZW5lcmF0ZUhhc2hJZCgpLFxuICAgICAgICAgIC8vIG1ha2UgYSBjb3B5IG9mIHRoZSBzdHlsZSBvYmplY3RcbiAgICAgICAgICBzdHlsZTogY2xvbmVEZWVwKHN0eWxlKSxcbiAgICAgICAgICBsYWJlbDogc3R5bGUubmFtZSxcbiAgICAgICAgICAvLyBnYXRoZXJpbmcgbGF5ZXIgZ3JvdXAgaW5mbyBmcm9tIHN0eWxlIGpzb25cbiAgICAgICAgICBsYXllckdyb3VwczogZ2V0TGF5ZXJHcm91cHNGcm9tU3R5bGUoc3R5bGUpXG4gICAgICAgIH1cbiAgICAgIDoge30pLFxuICAgIC4uLihpY29uID8ge2ljb259IDoge30pLFxuICAgIC4uLihlcnJvciAhPT0gdW5kZWZpbmVkID8ge2Vycm9yfSA6IHt9KVxuICB9XG59KTtcblxuLyoqXG4gKiBJbnB1dCBhIGN1c3RvbSBtYXAgc3R5bGUgb2JqZWN0XG4gKiBAbWVtYmVyb2YgbWFwU3R5bGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGBtYXBTdHlsZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkIGlucHV0U3R5bGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZC51cmwgc3R5bGUgdXJsIGUuZy4gYCdtYXBib3g6Ly9zdHlsZXMvaGVzaGFuL3h4eHh4eXl5eXp6eidgXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQuaWQgc3R5bGUgdXJsIGUuZy4gYCdjdXN0b21fc3R5bGVfMSdgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQuc3R5bGUgYWN0dWFsIG1hcGJveCBzdHlsZSBqc29uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQubmFtZSBzdHlsZSBuYW1lXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQubGF5ZXJHcm91cHMgbGF5ZXIgZ3JvdXBzIHRoYXQgY2FuIGJlIHVzZWQgdG8gc2V0IG1hcCBsYXllciB2aXNpYmlsaXR5XG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQuaWNvbiBpY29uIGltYWdlIGRhdGEgdXJsXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGlucHV0TWFwU3R5bGVVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogaW5wdXRTdHlsZX0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBpbnB1dFN0eWxlOiB7XG4gICAgLi4uaW5wdXRTdHlsZSxcbiAgICBpc1ZhbGlkOiBpc1ZhbGlkU3R5bGVVcmwoaW5wdXRTdHlsZS51cmwpXG4gIH1cbn0pO1xuXG4vKipcbiAqIEFkZCBtYXAgc3R5bGUgZnJvbSB1c2VyIGlucHV0IHRvIHJlZHVjZXIgYW5kIHNldCBpdCB0byBjdXJyZW50IHN0eWxlXG4gKiBUaGlzIGFjdGlvbiBpcyBjYWxsZWQgd2hlbiB1c2VyIGNsaWNrIGNvbmZpcm0gYWZ0ZXIgcHV0dGluZyBpbiBhIHZhbGlkIHN0eWxlIHVybCBpbiB0aGUgY3VzdG9tIG1hcCBzdHlsZSBkaWFsb2cuXG4gKiBJdCBzaG91bGQgbm90IGJlIGNhbGxlZCBmcm9tIG91dHNpZGUga2VwbGVyLmdsIHdpdGhvdXQgYSB2YWxpZCBgaW5wdXRTdHlsZWAgaW4gdGhlIGBtYXBTdHlsZWAgcmVkdWNlci5cbiAqIEBtZW1iZXJvZiBtYXBTdHlsZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYG1hcFN0eWxlYFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDdXN0b21NYXBTdHlsZVVwZGF0ZXIgPSBzdGF0ZSA9PiB7XG4gIGNvbnN0IHN0eWxlSWQgPSBzdGF0ZS5pbnB1dFN0eWxlLmlkO1xuICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAuLi5zdGF0ZSxcbiAgICBtYXBTdHlsZXM6IHtcbiAgICAgIC4uLnN0YXRlLm1hcFN0eWxlcyxcbiAgICAgIFtzdHlsZUlkXTogc3RhdGUuaW5wdXRTdHlsZVxuICAgIH0sXG4gICAgLy8gc2V0IHRvIGRlZmF1bHRcbiAgICBpbnB1dFN0eWxlOiBnZXRJbml0aWFsSW5wdXRTdHlsZSgpXG4gIH07XG4gIC8vIHNldCBuZXcgc3R5bGVcbiAgcmV0dXJuIG1hcFN0eWxlQ2hhbmdlVXBkYXRlcihuZXdTdGF0ZSwge3BheWxvYWQ6IHN0eWxlSWR9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbml0aWFsSW5wdXRTdHlsZSgpIHtcbiAgcmV0dXJuIHtcbiAgICBhY2Nlc3NUb2tlbjogbnVsbCxcbiAgICBlcnJvcjogZmFsc2UsXG4gICAgaXNWYWxpZDogZmFsc2UsXG4gICAgbGFiZWw6IG51bGwsXG4gICAgc3R5bGU6IG51bGwsXG4gICAgdXJsOiBudWxsLFxuICAgIGN1c3RvbTogdHJ1ZVxuICB9O1xufVxuIl19