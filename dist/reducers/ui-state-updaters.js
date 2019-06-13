"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNotificationUpdater = exports.addNotificationUpdater = exports.setExportMapFormat = exports.setUserMapboxAccessTokenUpdater = exports.setExportDataUpdater = exports.setExportFilteredUpdater = exports.setExportDataTypeUpdater = exports.setExportSelectedDatasetUpdater = exports.cleanupExportImage = exports.setExportImageError = exports.setExportImageDataUri = exports.startExportingImage = exports.setResolutionUpdater = exports.setRatioUpdater = exports.toggleLegendUpdater = exports.openDeleteModalUpdater = exports.toggleMapControlUpdater = exports.hideExportDropdownUpdater = exports.showExportDropdownUpdater = exports.toggleModalUpdater = exports.toggleSidePanelUpdater = exports.INITIAL_UI_STATE = exports.DEFAULT_EXPORT_MAP = exports.DEFAULT_EXPORT_JSON = exports.DEFAULT_EXPORT_HTML = exports.DEFAULT_NOTIFICATIONS = exports.DEFAULT_EXPORT_DATA = exports.DEFAULT_EXPORT_IMAGE = exports.DEFAULT_MAP_CONTROLS = exports.DEFAULT_MODAL = exports.DEFAULT_ACTIVE_SIDE_PANEL = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _defaultSettings = require("../constants/default-settings");

var _notificationsUtils = require("../utils/notifications-utils");

var _DEFAULT_EXPORT_MAP;

var DEFAULT_ACTIVE_SIDE_PANEL = 'layer';
exports.DEFAULT_ACTIVE_SIDE_PANEL = DEFAULT_ACTIVE_SIDE_PANEL;
var DEFAULT_MODAL = _defaultSettings.ADD_DATA_ID;
/**
 * Updaters for `uiState` reducer. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 *
 * @public
 * @example
 *
 * import keplerGlReducer, {uiStateUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    // click button to close side panel
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             uiState: uiStateUpdaters.toggleSidePanelUpdater(
 *               uiState, {payload: null}
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

exports.DEFAULT_MODAL = DEFAULT_MODAL;
var uiStateUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * A list of map control visibility and whether is it active.
 * @memberof uiStateUpdaters
 * @constant
 * @type {Object}
 * @property {Object} visibleLayers Default: `{show: true, active: false}`
 * @property {Object} mapLegend Default: `{show: true, active: false}`
 * @property {Object} toggle3d Default: `{show: true}`
 * @property {Object} splitMap Default: `{show: true}`
 * @public
 */

var DEFAULT_MAP_CONTROLS = {
  visibleLayers: {
    show: true,
    active: false
  },
  mapLegend: {
    show: true,
    active: false
  },
  toggle3d: {
    show: true
  },
  splitMap: {
    show: true
  }
};
/**
 * Default image export config
 * @memberof uiStateUpdaters
 * @constant
 * @type {Object}
 * @property {string} ratio Default: `'SCREEN'`,
 * @property {string} resolution Default: `'ONE_X'`,
 * @property {boolean} legend Default: `false`,
 * @property {string} imageDataUri Default: `''`,
 * @property {boolean} exporting Default: `false`
 * @public
 */

exports.DEFAULT_MAP_CONTROLS = DEFAULT_MAP_CONTROLS;
var DEFAULT_EXPORT_IMAGE = {
  // user options
  ratio: _defaultSettings.RATIOS.SCREEN,
  resolution: _defaultSettings.RESOLUTIONS.ONE_X,
  legend: false,
  // exporting state
  imageDataUri: '',
  exporting: false,
  error: false
};
/**
 * Default initial `exportData` settings
 * @memberof uiStateUpdaters
 * @constant
 * @type {Object}
 * @property {string} selectedDataset Default: `''`,
 * @property {string} dataType Default: `'csv'`,
 * @property {boolean} filtered Default: `true`,
 * @property {boolean} config deprecated
 * @property {boolean} data used in modal config export. Default: `false`
 * @public
 */

exports.DEFAULT_EXPORT_IMAGE = DEFAULT_EXPORT_IMAGE;
var DEFAULT_EXPORT_DATA = {
  selectedDataset: '',
  dataType: _defaultSettings.EXPORT_DATA_TYPE.CSV,
  filtered: true
};
/**
 * @constant
 * @type {Array}
 */

exports.DEFAULT_EXPORT_DATA = DEFAULT_EXPORT_DATA;
var DEFAULT_NOTIFICATIONS = [];
/**
 * @constant
 * @type {Object}
 * @property {string} exportMapboxAccessToken - Default: null, this is used when we provide a default mapbox token for users to take advantage of
 * @property {string} userMapboxToken - Default: '', mapbox token provided by user through input field
 * @public
 */

exports.DEFAULT_NOTIFICATIONS = DEFAULT_NOTIFICATIONS;
var DEFAULT_EXPORT_HTML = {
  exportMapboxAccessToken: null,
  userMapboxToken: ''
};
exports.DEFAULT_EXPORT_HTML = DEFAULT_EXPORT_HTML;
var DEFAULT_EXPORT_JSON = {
  hasData: true
};
exports.DEFAULT_EXPORT_JSON = DEFAULT_EXPORT_JSON;
var DEFAULT_EXPORT_MAP = (_DEFAULT_EXPORT_MAP = {}, (0, _defineProperty2["default"])(_DEFAULT_EXPORT_MAP, _defaultSettings.EXPORT_MAP_FORMAT.HTML, DEFAULT_EXPORT_HTML), (0, _defineProperty2["default"])(_DEFAULT_EXPORT_MAP, _defaultSettings.EXPORT_MAP_FORMAT.JSON, DEFAULT_EXPORT_JSON), (0, _defineProperty2["default"])(_DEFAULT_EXPORT_MAP, "format", _defaultSettings.EXPORT_MAP_FORMAT.HTML), _DEFAULT_EXPORT_MAP);
/**
 * Default initial `uiState`
 * @memberof uiStateUpdaters
 * @constant
 * @type {Object}
 * @property {boolean} readOnly Default: `false`
 * @property {string} activeSidePanel Default: `'layer'`
 * @property {string|null} currentModal Default: `'addData'`
 * @property {string|null} datasetKeyToRemove Default: `null`
 * @property {string|null} visibleDropdown Default: `null`
 * @property {Object} exportImage Default: [`DEFAULT_EXPORT_IMAGE`](#default_export_image)
 * @property {Object} exportData Default: [`DEFAULT_EXPORT_DATA`](#default_export_data)
 * @property {Object} mapControls Default: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @public
 */

exports.DEFAULT_EXPORT_MAP = DEFAULT_EXPORT_MAP;
var INITIAL_UI_STATE = {
  readOnly: false,
  activeSidePanel: DEFAULT_ACTIVE_SIDE_PANEL,
  currentModal: DEFAULT_MODAL,
  datasetKeyToRemove: null,
  visibleDropdown: null,
  // export image modal ui
  exportImage: DEFAULT_EXPORT_IMAGE,
  // export data modal ui
  exportData: DEFAULT_EXPORT_DATA,
  // html export
  exportMap: DEFAULT_EXPORT_MAP,
  // map control panels
  mapControls: DEFAULT_MAP_CONTROLS,
  // ui notifications
  notifications: DEFAULT_NOTIFICATIONS
};
/* Updaters */

/**
 * Toggle active side panel
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string|null} action.payload id of side panel to be shown, one of `layer`, `filter`, `interaction`, `map`. close side panel if `null`
 * @returns {Object} nextState
 * @public
 */

exports.INITIAL_UI_STATE = INITIAL_UI_STATE;

var toggleSidePanelUpdater = function toggleSidePanelUpdater(state, _ref) {
  var id = _ref.payload;

  if (id === state.activeSidePanel) {
    return state;
  }

  return (0, _objectSpread5["default"])({}, state, {
    activeSidePanel: id
  });
};
/**
 * Show and hide modal dialog
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string|null} action.payload id of modal to be shown, null to hide modals. One of:
 *
 *  - [`DATA_TABLE_ID`](../constants/default-settings.md#data_table_id)
 *  - [`DELETE_DATA_ID`](../constants/default-settings.md#delete_data_id)
 *  - [`ADD_DATA_ID`](../constants/default-settings.md#add_data_id)
 *  - [`EXPORT_IMAGE_ID`](../constants/default-settings.md#export_image_id)
 *  - [`EXPORT_DATA_ID`](../constants/default-settings.md#export_data_id)
 *  - [`ADD_MAP_STYLE_ID`](../constants/default-settings.md#add_map_style_id)
 * @returns {Object} nextState
 * @public
 */


exports.toggleSidePanelUpdater = toggleSidePanelUpdater;

var toggleModalUpdater = function toggleModalUpdater(state, _ref2) {
  var id = _ref2.payload;
  return (0, _objectSpread5["default"])({}, state, {
    currentModal: id
  });
};
/**
 * Hide and show side panel header dropdown, activated by clicking the share link on top of the side panel
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string} action.payload id of the dropdown
 * @returns {Object} nextState
 * @public
 */


exports.toggleModalUpdater = toggleModalUpdater;

var showExportDropdownUpdater = function showExportDropdownUpdater(state, _ref3) {
  var id = _ref3.payload;
  return (0, _objectSpread5["default"])({}, state, {
    visibleDropdown: id
  });
};
/**
 * Hide side panel header dropdown, activated by clicking the share link on top of the side panel
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @returns {Object} nextState
 * @public
 */


exports.showExportDropdownUpdater = showExportDropdownUpdater;

var hideExportDropdownUpdater = function hideExportDropdownUpdater(state) {
  return (0, _objectSpread5["default"])({}, state, {
    visibleDropdown: null
  });
};
/**
 * Toggle active map control panel
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action action
 * @param {string} action.payload map control panel id, one of the keys of: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @returns {Object} nextState
 * @public
 */


exports.hideExportDropdownUpdater = hideExportDropdownUpdater;

var toggleMapControlUpdater = function toggleMapControlUpdater(state, _ref4) {
  var panelId = _ref4.payload;
  return (0, _objectSpread5["default"])({}, state, {
    mapControls: (0, _objectSpread5["default"])({}, state.mapControls, (0, _defineProperty2["default"])({}, panelId, (0, _objectSpread5["default"])({}, state.mapControls[panelId], {
      active: !state.mapControls[panelId].active
    })))
  });
};
/**
 * Toggle active map control panel
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string} action.payload dataset id
 * @returns {Object} nextState
 * @public
 */


exports.toggleMapControlUpdater = toggleMapControlUpdater;

var openDeleteModalUpdater = function openDeleteModalUpdater(state, _ref5) {
  var datasetKeyToRemove = _ref5.payload;
  return (0, _objectSpread5["default"])({}, state, {
    currentModal: _defaultSettings.DELETE_DATA_ID,
    datasetKeyToRemove: datasetKeyToRemove
  });
};
/**
 * Set `exportImage.legend` to `true` or `false`
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @returns {Object} nextState
 * @public
 */


exports.openDeleteModalUpdater = openDeleteModalUpdater;

var toggleLegendUpdater = function toggleLegendUpdater(state) {
  return (0, _objectSpread5["default"])({}, state, {
    exportImage: (0, _objectSpread5["default"])({}, state.exportImage, {
      legend: !state.exportImage.legend
    })
  });
};
/**
 * Set `exportImage.ratio`
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string} action.payload one of `'SCREEN'`, `'FOUR_BY_THREE'` and `'SIXTEEN_BY_NINE'`
 * @returns {Object} nextState
 * @public
 */


exports.toggleLegendUpdater = toggleLegendUpdater;

var setRatioUpdater = function setRatioUpdater(state, _ref6) {
  var payload = _ref6.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportImage: (0, _objectSpread5["default"])({}, state.exportImage, {
      ratio: payload.ratio
    })
  });
};
/**
 * Set `exportImage.resolution`
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string} action.payload one of `'ONE_X'`, `'TWO_X'`
 * @returns {Object} nextState
 * @public
 */


exports.setRatioUpdater = setRatioUpdater;

var setResolutionUpdater = function setResolutionUpdater(state, _ref7) {
  var payload = _ref7.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportImage: (0, _objectSpread5["default"])({}, state.exportImage, {
      resolution: payload.resolution
    })
  });
};
/**
 * Set `exportImage.exporting` to `true`
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @returns {Object} nextState
 * @public
 */


exports.setResolutionUpdater = setResolutionUpdater;

var startExportingImage = function startExportingImage(state) {
  return (0, _objectSpread5["default"])({}, state, {
    exportImage: (0, _objectSpread5["default"])({}, state.exportImage, {
      exporting: true,
      imageDataUri: ''
    })
  });
};
/**
 * Set `exportImage.setExportImageDataUri` to a image dataUri
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string} action.payload export image data uri
 * @returns {Object} nextState
 * @public
 */


exports.startExportingImage = startExportingImage;

var setExportImageDataUri = function setExportImageDataUri(state, _ref8) {
  var dataUri = _ref8.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportImage: (0, _objectSpread5["default"])({}, state.exportImage, {
      exporting: false,
      imageDataUri: dataUri
    })
  });
};

exports.setExportImageDataUri = setExportImageDataUri;

var setExportImageError = function setExportImageError(state, _ref9) {
  var error = _ref9.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportImage: (0, _objectSpread5["default"])({}, state.exportImage, {
      exporting: false,
      error: error
    })
  });
};
/**
 * Delete cached export image
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @returns {Object} nextState
 * @public
 */


exports.setExportImageError = setExportImageError;

var cleanupExportImage = function cleanupExportImage(state) {
  return (0, _objectSpread5["default"])({}, state, {
    exportImage: (0, _objectSpread5["default"])({}, state.exportImage, {
      exporting: false,
      imageDataUri: '',
      error: false
    })
  });
};
/**
 * Set selected dataset for export
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string} action.payload dataset id
 * @returns {Object} nextState
 * @public
 */


exports.cleanupExportImage = cleanupExportImage;

var setExportSelectedDatasetUpdater = function setExportSelectedDatasetUpdater(state, _ref10) {
  var dataset = _ref10.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportData: (0, _objectSpread5["default"])({}, state.exportData, {
      selectedDataset: dataset
    })
  });
};
/**
 * Set data format for exporting data
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {string} action.payload one of `'text/csv'`
 * @returns {Object} nextState
 * @public
 */


exports.setExportSelectedDatasetUpdater = setExportSelectedDatasetUpdater;

var setExportDataTypeUpdater = function setExportDataTypeUpdater(state, _ref11) {
  var dataType = _ref11.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportData: (0, _objectSpread5["default"])({}, state.exportData, {
      dataType: dataType
    })
  });
};
/**
 * Whether to export filtered data, `true` or `false`
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {boolean} action.payload
 * @returns {Object} nextState
 * @public
 */


exports.setExportDataTypeUpdater = setExportDataTypeUpdater;

var setExportFilteredUpdater = function setExportFilteredUpdater(state, _ref12) {
  var filtered = _ref12.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportData: (0, _objectSpread5["default"])({}, state.exportData, {
      filtered: filtered
    })
  });
};
/**
 * Whether to including data in map config, toggle between `true` or `false`
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @returns {Object} nextState
 * @public
 */


exports.setExportFilteredUpdater = setExportFilteredUpdater;

var setExportDataUpdater = function setExportDataUpdater(state) {
  return (0, _objectSpread5["default"])({}, state, {
    exportMap: (0, _objectSpread5["default"])({}, state.exportMap, (0, _defineProperty2["default"])({}, _defaultSettings.EXPORT_MAP_FORMAT.JSON, (0, _objectSpread5["default"])({}, state.exportMap[_defaultSettings.EXPORT_MAP_FORMAT.JSON], {
      hasData: !state.exportMap[_defaultSettings.EXPORT_MAP_FORMAT.JSON].hasData
    })))
  });
};
/**
 * whether to export a mapbox access to HTML single page
 * @param {Object} state - `uiState`
 * @param {Object} action
 * @param {string} action.payload
 * @returns {Object} nextState
 * @public
 */


exports.setExportDataUpdater = setExportDataUpdater;

var setUserMapboxAccessTokenUpdater = function setUserMapboxAccessTokenUpdater(state, _ref13) {
  var userMapboxToken = _ref13.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportMap: (0, _objectSpread5["default"])({}, state.exportMap, (0, _defineProperty2["default"])({}, _defaultSettings.EXPORT_MAP_FORMAT.HTML, (0, _objectSpread5["default"])({}, state.exportMap[_defaultSettings.EXPORT_MAP_FORMAT.HTML], {
      userMapboxToken: userMapboxToken
    })))
  });
};

exports.setUserMapboxAccessTokenUpdater = setUserMapboxAccessTokenUpdater;

var setExportMapFormat = function setExportMapFormat(state, _ref14) {
  var format = _ref14.payload;
  return (0, _objectSpread5["default"])({}, state, {
    exportMap: (0, _objectSpread5["default"])({}, state.exportMap, {
      format: format
    })
  });
};
/**
* Add a notification to be displayed
* @memberof uiStateUpdaters
* @param {Object} state `uiState`
* @param {Object} action
* @param {Object} action.payload
* @returns {Object} nextState
* @public
*/


exports.setExportMapFormat = setExportMapFormat;

var addNotificationUpdater = function addNotificationUpdater(state, _ref15) {
  var payload = _ref15.payload;
  return (0, _objectSpread5["default"])({}, state, {
    notifications: [].concat((0, _toConsumableArray2["default"])(state.notifications || []), [(0, _notificationsUtils.createNotification)(payload)])
  });
};
/**
 * Remove a notification
 * @memberof uiStateUpdaters
 * @param {Object} state `uiState`
 * @param {Object} action
 * @param {String} action.payload id of the notification to be removed
 * @returns {Object} nextState
 */


exports.addNotificationUpdater = addNotificationUpdater;

var removeNotificationUpdater = function removeNotificationUpdater(state, _ref16) {
  var id = _ref16.payload;
  return (0, _objectSpread5["default"])({}, state, {
    notifications: state.notifications.filter(function (n) {
      return n.id !== id;
    })
  });
};

exports.removeNotificationUpdater = removeNotificationUpdater;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy91aS1zdGF0ZS11cGRhdGVycy5qcyJdLCJuYW1lcyI6WyJERUZBVUxUX0FDVElWRV9TSURFX1BBTkVMIiwiREVGQVVMVF9NT0RBTCIsIkFERF9EQVRBX0lEIiwidWlTdGF0ZVVwZGF0ZXJzIiwiREVGQVVMVF9NQVBfQ09OVFJPTFMiLCJ2aXNpYmxlTGF5ZXJzIiwic2hvdyIsImFjdGl2ZSIsIm1hcExlZ2VuZCIsInRvZ2dsZTNkIiwic3BsaXRNYXAiLCJERUZBVUxUX0VYUE9SVF9JTUFHRSIsInJhdGlvIiwiUkFUSU9TIiwiU0NSRUVOIiwicmVzb2x1dGlvbiIsIlJFU09MVVRJT05TIiwiT05FX1giLCJsZWdlbmQiLCJpbWFnZURhdGFVcmkiLCJleHBvcnRpbmciLCJlcnJvciIsIkRFRkFVTFRfRVhQT1JUX0RBVEEiLCJzZWxlY3RlZERhdGFzZXQiLCJkYXRhVHlwZSIsIkVYUE9SVF9EQVRBX1RZUEUiLCJDU1YiLCJmaWx0ZXJlZCIsIkRFRkFVTFRfTk9USUZJQ0FUSU9OUyIsIkRFRkFVTFRfRVhQT1JUX0hUTUwiLCJleHBvcnRNYXBib3hBY2Nlc3NUb2tlbiIsInVzZXJNYXBib3hUb2tlbiIsIkRFRkFVTFRfRVhQT1JUX0pTT04iLCJoYXNEYXRhIiwiREVGQVVMVF9FWFBPUlRfTUFQIiwiRVhQT1JUX01BUF9GT1JNQVQiLCJIVE1MIiwiSlNPTiIsIklOSVRJQUxfVUlfU1RBVEUiLCJyZWFkT25seSIsImFjdGl2ZVNpZGVQYW5lbCIsImN1cnJlbnRNb2RhbCIsImRhdGFzZXRLZXlUb1JlbW92ZSIsInZpc2libGVEcm9wZG93biIsImV4cG9ydEltYWdlIiwiZXhwb3J0RGF0YSIsImV4cG9ydE1hcCIsIm1hcENvbnRyb2xzIiwibm90aWZpY2F0aW9ucyIsInRvZ2dsZVNpZGVQYW5lbFVwZGF0ZXIiLCJzdGF0ZSIsImlkIiwicGF5bG9hZCIsInRvZ2dsZU1vZGFsVXBkYXRlciIsInNob3dFeHBvcnREcm9wZG93blVwZGF0ZXIiLCJoaWRlRXhwb3J0RHJvcGRvd25VcGRhdGVyIiwidG9nZ2xlTWFwQ29udHJvbFVwZGF0ZXIiLCJwYW5lbElkIiwib3BlbkRlbGV0ZU1vZGFsVXBkYXRlciIsIkRFTEVURV9EQVRBX0lEIiwidG9nZ2xlTGVnZW5kVXBkYXRlciIsInNldFJhdGlvVXBkYXRlciIsInNldFJlc29sdXRpb25VcGRhdGVyIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsImRhdGFVcmkiLCJzZXRFeHBvcnRJbWFnZUVycm9yIiwiY2xlYW51cEV4cG9ydEltYWdlIiwic2V0RXhwb3J0U2VsZWN0ZWREYXRhc2V0VXBkYXRlciIsImRhdGFzZXQiLCJzZXRFeHBvcnREYXRhVHlwZVVwZGF0ZXIiLCJzZXRFeHBvcnRGaWx0ZXJlZFVwZGF0ZXIiLCJzZXRFeHBvcnREYXRhVXBkYXRlciIsInNldFVzZXJNYXBib3hBY2Nlc3NUb2tlblVwZGF0ZXIiLCJzZXRFeHBvcnRNYXBGb3JtYXQiLCJmb3JtYXQiLCJhZGROb3RpZmljYXRpb25VcGRhdGVyIiwicmVtb3ZlTm90aWZpY2F0aW9uVXBkYXRlciIsImZpbHRlciIsIm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFRQTs7OztBQUVPLElBQU1BLHlCQUF5QixHQUFHLE9BQWxDOztBQUNBLElBQU1DLGFBQWEsR0FBR0MsNEJBQXRCO0FBRVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ0E7OztBQUNDLElBQU1DLGVBQWUsR0FBRyxJQUF4QjtBQUNEOztBQUVBOzs7Ozs7Ozs7Ozs7QUFXTyxJQUFNQyxvQkFBb0IsR0FBRztBQUNsQ0MsRUFBQUEsYUFBYSxFQUFFO0FBQ2JDLElBQUFBLElBQUksRUFBRSxJQURPO0FBRWJDLElBQUFBLE1BQU0sRUFBRTtBQUZLLEdBRG1CO0FBS2xDQyxFQUFBQSxTQUFTLEVBQUU7QUFDVEYsSUFBQUEsSUFBSSxFQUFFLElBREc7QUFFVEMsSUFBQUEsTUFBTSxFQUFFO0FB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QUFtQkksT0FBbkIsQ0FGVztBQUZ1QjtBQUFBLENBQS9CO0FBUVA7Ozs7Ozs7Ozs7OztBQVFPLElBQU15Qix5QkFBeUIsR0FBRyxTQUE1QkEseUJBQTRCLENBQUMzQixLQUFEO0FBQUEsTUFBa0JDLEVBQWxCLFVBQVNDLE9BQVQ7QUFBQSw0Q0FDcENGLEtBRG9DO0FBRXZDRixJQUFBQSxhQUFhLEVBQUVFLEtBQUssQ0FBQ0YsYUFBTixDQUFvQjhCLE1BQXBCLENBQTJCLFVBQUFDLENBQUM7QUFBQSxhQUFJQSxDQUFDLENBQUM1QixFQUFGLEtBQVNBLEVBQWI7QUFBQSxLQUE1QjtBQUZ3QjtBQUFBLENBQWxDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtcbiAgREVMRVRFX0RBVEFfSUQsXG4gIEFERF9EQVRBX0lELFxuICBFWFBPUlRfREFUQV9UWVBFLFxuICBSQVRJT1MsXG4gIFJFU09MVVRJT05TLFxuICBFWFBPUlRfTUFQX0ZPUk1BVFxufSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2NyZWF0ZU5vdGlmaWNhdGlvbn0gZnJvbSAndXRpbHMvbm90aWZpY2F0aW9ucy11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0FDVElWRV9TSURFX1BBTkVMID0gJ2xheWVyJztcbmV4cG9ydCBjb25zdCBERUZBVUxUX01PREFMID0gQUREX0RBVEFfSUQ7XG5cbi8qKlxuICogVXBkYXRlcnMgZm9yIGB1aVN0YXRlYCByZWR1Y2VyLiBDYW4gYmUgdXNlZCBpbiB5b3VyIHJvb3QgcmVkdWNlciB0byBkaXJlY3RseSBtb2RpZnkga2VwbGVyLmdsJ3Mgc3RhdGUuXG4gKiBSZWFkIG1vcmUgYWJvdXQgW1VzaW5nIHVwZGF0ZXJzXSguLi9hZHZhbmNlZC11c2FnZS91c2luZy11cGRhdGVycy5tZClcbiAqXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCBrZXBsZXJHbFJlZHVjZXIsIHt1aVN0YXRlVXBkYXRlcnN9IGZyb20gJ2tlcGxlci5nbC9yZWR1Y2Vycyc7XG4gKiAvLyBSb290IFJlZHVjZXJcbiAqIGNvbnN0IHJlZHVjZXJzID0gY29tYmluZVJlZHVjZXJzKHtcbiAqICBrZXBsZXJHbDoga2VwbGVyR2xSZWR1Y2VyLFxuICogIGFwcDogYXBwUmVkdWNlclxuICogfSk7XG4gKlxuICogY29uc3QgY29tcG9zZWRSZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAqICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gKiAgICAvLyBjbGljayBidXR0b24gdG8gY2xvc2Ugc2lkZSBwYW5lbFxuICogICAgY2FzZSAnQ0xJQ0tfQlVUVE9OJzpcbiAqICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgICBrZXBsZXJHbDoge1xuICogICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wsXG4gKiAgICAgICAgICBmb286IHtcbiAqICAgICAgICAgICAgIC4uLnN0YXRlLmtlcGxlckdsLmZvbyxcbiAqICAgICAgICAgICAgIHVpU3RhdGU6IHVpU3RhdGVVcGRhdGVycy50b2dnbGVTaWRlUGFuZWxVcGRhdGVyKFxuICogICAgICAgICAgICAgICB1aVN0YXRlLCB7cGF5bG9hZDogbnVsbH1cbiAqICAgICAgICAgICAgIClcbiAqICAgICAgICAgIH1cbiAqICAgICAgICB9XG4gKiAgICAgIH07XG4gKiAgfVxuICogIHJldHVybiByZWR1Y2VycyhzdGF0ZSwgYWN0aW9uKTtcbiAqIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29tcG9zZWRSZWR1Y2VyO1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuIGNvbnN0IHVpU3RhdGVVcGRhdGVycyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQSBsaXN0IG9mIG1hcCBjb250cm9sIHZpc2liaWxpdHkgYW5kIHdoZXRoZXIgaXMgaXQgYWN0aXZlLlxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtPYmplY3R9IHZpc2libGVMYXllcnMgRGVmYXVsdDogYHtzaG93OiB0cnVlLCBhY3RpdmU6IGZhbHNlfWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBtYXBMZWdlbmQgRGVmYXVsdDogYHtzaG93OiB0cnVlLCBhY3RpdmU6IGZhbHNlfWBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB0b2dnbGUzZCBEZWZhdWx0OiBge3Nob3c6IHRydWV9YFxuICogQHByb3BlcnR5IHtPYmplY3R9IHNwbGl0TWFwIERlZmF1bHQ6IGB7c2hvdzogdHJ1ZX1gXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX01BUF9DT05UUk9MUyA9IHtcbiAgdmlzaWJsZUxheWVyczoge1xuICAgIHNob3c6IHRydWUsXG4gICAgYWN0aXZlOiBmYWxzZVxuICB9LFxuICBtYXBMZWdlbmQ6IHtcbiAgICBzaG93OiB0cnVlLFxuICAgIGFjdGl2ZTogZmFsc2VcbiAgfSxcbiAgdG9nZ2xlM2Q6IHtcbiAgICBzaG93OiB0cnVlXG4gIH0sXG4gIHNwbGl0TWFwOiB7XG4gICAgc2hvdzogdHJ1ZVxuICB9XG59O1xuXG4vKipcbiAqIERlZmF1bHQgaW1hZ2UgZXhwb3J0IGNvbmZpZ1xuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHJhdGlvIERlZmF1bHQ6IGAnU0NSRUVOJ2AsXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcmVzb2x1dGlvbiBEZWZhdWx0OiBgJ09ORV9YJ2AsXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGxlZ2VuZCBEZWZhdWx0OiBgZmFsc2VgLFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGltYWdlRGF0YVVyaSBEZWZhdWx0OiBgJydgLFxuICogQHByb3BlcnR5IHtib29sZWFufSBleHBvcnRpbmcgRGVmYXVsdDogYGZhbHNlYFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBPUlRfSU1BR0UgPSB7XG4gIC8vIHVzZXIgb3B0aW9uc1xuICByYXRpbzogUkFUSU9TLlNDUkVFTixcbiAgcmVzb2x1dGlvbjogUkVTT0xVVElPTlMuT05FX1gsXG4gIGxlZ2VuZDogZmFsc2UsXG4gIC8vIGV4cG9ydGluZyBzdGF0ZVxuICBpbWFnZURhdGFVcmk6ICcnLFxuICBleHBvcnRpbmc6IGZhbHNlLFxuICBlcnJvcjogZmFsc2Vcbn07XG5cbi8qKlxuICogRGVmYXVsdCBpbml0aWFsIGBleHBvcnREYXRhYCBzZXR0aW5nc1xuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlbGVjdGVkRGF0YXNldCBEZWZhdWx0OiBgJydgLFxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRhdGFUeXBlIERlZmF1bHQ6IGAnY3N2J2AsXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGZpbHRlcmVkIERlZmF1bHQ6IGB0cnVlYCxcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gY29uZmlnIGRlcHJlY2F0ZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZGF0YSB1c2VkIGluIG1vZGFsIGNvbmZpZyBleHBvcnQuIERlZmF1bHQ6IGBmYWxzZWBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVhQT1JUX0RBVEEgPSB7XG4gIHNlbGVjdGVkRGF0YXNldDogJycsXG4gIGRhdGFUeXBlOiBFWFBPUlRfREFUQV9UWVBFLkNTVixcbiAgZmlsdGVyZWQ6IHRydWVcbn07XG5cbi8qKlxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7QXJyYXl9XG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX05PVElGSUNBVElPTlMgPSBbXTtcblxuLyoqXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXhwb3J0TWFwYm94QWNjZXNzVG9rZW4gLSBEZWZhdWx0OiBudWxsLCB0aGlzIGlzIHVzZWQgd2hlbiB3ZSBwcm92aWRlIGEgZGVmYXVsdCBtYXBib3ggdG9rZW4gZm9yIHVzZXJzIHRvIHRha2UgYWR2YW50YWdlIG9mXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXNlck1hcGJveFRva2VuIC0gRGVmYXVsdDogJycsIG1hcGJveCB0b2tlbiBwcm92aWRlZCBieSB1c2VyIHRocm91Z2ggaW5wdXQgZmllbGRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVhQT1JUX0hUTUwgPSB7XG4gIGV4cG9ydE1hcGJveEFjY2Vzc1Rva2VuOiBudWxsLFxuICB1c2VyTWFwYm94VG9rZW46ICcnXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBPUlRfSlNPTiA9IHtcbiAgaGFzRGF0YTogdHJ1ZVxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRVhQT1JUX01BUCA9IHtcbiAgW0VYUE9SVF9NQVBfRk9STUFULkhUTUxdOiBERUZBVUxUX0VYUE9SVF9IVE1MLFxuICBbRVhQT1JUX01BUF9GT1JNQVQuSlNPTl06IERFRkFVTFRfRVhQT1JUX0pTT04sXG4gIGZvcm1hdDogRVhQT1JUX01BUF9GT1JNQVQuSFRNTFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IGluaXRpYWwgYHVpU3RhdGVgXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlYWRPbmx5IERlZmF1bHQ6IGBmYWxzZWBcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhY3RpdmVTaWRlUGFuZWwgRGVmYXVsdDogYCdsYXllcidgXG4gKiBAcHJvcGVydHkge3N0cmluZ3xudWxsfSBjdXJyZW50TW9kYWwgRGVmYXVsdDogYCdhZGREYXRhJ2BcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IGRhdGFzZXRLZXlUb1JlbW92ZSBEZWZhdWx0OiBgbnVsbGBcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfG51bGx9IHZpc2libGVEcm9wZG93biBEZWZhdWx0OiBgbnVsbGBcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBleHBvcnRJbWFnZSBEZWZhdWx0OiBbYERFRkFVTFRfRVhQT1JUX0lNQUdFYF0oI2RlZmF1bHRfZXhwb3J0X2ltYWdlKVxuICogQHByb3BlcnR5IHtPYmplY3R9IGV4cG9ydERhdGEgRGVmYXVsdDogW2BERUZBVUxUX0VYUE9SVF9EQVRBYF0oI2RlZmF1bHRfZXhwb3J0X2RhdGEpXG4gKiBAcHJvcGVydHkge09iamVjdH0gbWFwQ29udHJvbHMgRGVmYXVsdDogW2BERUZBVUxUX01BUF9DT05UUk9MU2BdKCNkZWZhdWx0X21hcF9jb250cm9scylcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfVUlfU1RBVEUgPSB7XG4gIHJlYWRPbmx5OiBmYWxzZSxcbiAgYWN0aXZlU2lkZVBhbmVsOiBERUZBVUxUX0FDVElWRV9TSURFX1BBTkVMLFxuICBjdXJyZW50TW9kYWw6IERFRkFVTFRfTU9EQUwsXG4gIGRhdGFzZXRLZXlUb1JlbW92ZTogbnVsbCxcbiAgdmlzaWJsZURyb3Bkb3duOiBudWxsLFxuICAvLyBleHBvcnQgaW1hZ2UgbW9kYWwgdWlcbiAgZXhwb3J0SW1hZ2U6IERFRkFVTFRfRVhQT1JUX0lNQUdFLFxuICAvLyBleHBvcnQgZGF0YSBtb2RhbCB1aVxuICBleHBvcnREYXRhOiBERUZBVUxUX0VYUE9SVF9EQVRBLFxuICAvLyBodG1sIGV4cG9ydFxuICBleHBvcnRNYXA6IERFRkFVTFRfRVhQT1JUX01BUCxcbiAgLy8gbWFwIGNvbnRyb2wgcGFuZWxzXG4gIG1hcENvbnRyb2xzOiBERUZBVUxUX01BUF9DT05UUk9MUyxcbiAgLy8gdWkgbm90aWZpY2F0aW9uc1xuICBub3RpZmljYXRpb25zOiBERUZBVUxUX05PVElGSUNBVElPTlNcbn07XG5cbi8qIFVwZGF0ZXJzICovXG4vKipcbiAqIFRvZ2dsZSBhY3RpdmUgc2lkZSBwYW5lbFxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB1aVN0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gYWN0aW9uLnBheWxvYWQgaWQgb2Ygc2lkZSBwYW5lbCB0byBiZSBzaG93biwgb25lIG9mIGBsYXllcmAsIGBmaWx0ZXJgLCBgaW50ZXJhY3Rpb25gLCBgbWFwYC4gY2xvc2Ugc2lkZSBwYW5lbCBpZiBgbnVsbGBcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlU2lkZVBhbmVsVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWQ6IGlkfSkgPT4ge1xuICBpZiAoaWQgPT09IHN0YXRlLmFjdGl2ZVNpZGVQYW5lbCkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgYWN0aXZlU2lkZVBhbmVsOiBpZFxuICB9O1xufTtcblxuLyoqXG4gKiBTaG93IGFuZCBoaWRlIG1vZGFsIGRpYWxvZ1xuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB1aVN0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gYWN0aW9uLnBheWxvYWQgaWQgb2YgbW9kYWwgdG8gYmUgc2hvd24sIG51bGwgdG8gaGlkZSBtb2RhbHMuIE9uZSBvZjpcbiAqXG4gKiAgLSBbYERBVEFfVEFCTEVfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNkYXRhX3RhYmxlX2lkKVxuICogIC0gW2BERUxFVEVfREFUQV9JRGBdKC4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzLm1kI2RlbGV0ZV9kYXRhX2lkKVxuICogIC0gW2BBRERfREFUQV9JRGBdKC4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzLm1kI2FkZF9kYXRhX2lkKVxuICogIC0gW2BFWFBPUlRfSU1BR0VfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNleHBvcnRfaW1hZ2VfaWQpXG4gKiAgLSBbYEVYUE9SVF9EQVRBX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjZXhwb3J0X2RhdGFfaWQpXG4gKiAgLSBbYEFERF9NQVBfU1RZTEVfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNhZGRfbWFwX3N0eWxlX2lkKVxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVNb2RhbFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBjdXJyZW50TW9kYWw6IGlkXG59KTtcblxuLyoqXG4gKiBIaWRlIGFuZCBzaG93IHNpZGUgcGFuZWwgaGVhZGVyIGRyb3Bkb3duLCBhY3RpdmF0ZWQgYnkgY2xpY2tpbmcgdGhlIHNoYXJlIGxpbmsgb24gdG9wIG9mIHRoZSBzaWRlIHBhbmVsXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgaWQgb2YgdGhlIGRyb3Bkb3duXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNob3dFeHBvcnREcm9wZG93blVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBpZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICB2aXNpYmxlRHJvcGRvd246IGlkXG59KTtcblxuLyoqXG4gKiBIaWRlIHNpZGUgcGFuZWwgaGVhZGVyIGRyb3Bkb3duLCBhY3RpdmF0ZWQgYnkgY2xpY2tpbmcgdGhlIHNoYXJlIGxpbmsgb24gdG9wIG9mIHRoZSBzaWRlIHBhbmVsXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGVFeHBvcnREcm9wZG93blVwZGF0ZXIgPSAoc3RhdGUpID0+ICh7XG4gIC4uLnN0YXRlLFxuICB2aXNpYmxlRHJvcGRvd246IG51bGxcbn0pO1xuXG4vKipcbiAqIFRvZ2dsZSBhY3RpdmUgbWFwIGNvbnRyb2wgcGFuZWxcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgbWFwIGNvbnRyb2wgcGFuZWwgaWQsIG9uZSBvZiB0aGUga2V5cyBvZjogW2BERUZBVUxUX01BUF9DT05UUk9MU2BdKCNkZWZhdWx0X21hcF9jb250cm9scylcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlTWFwQ29udHJvbFVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkOiBwYW5lbElkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIG1hcENvbnRyb2xzOiB7XG4gICAgLi4uc3RhdGUubWFwQ29udHJvbHMsXG4gICAgW3BhbmVsSWRdOiB7XG4gICAgICAuLi5zdGF0ZS5tYXBDb250cm9sc1twYW5lbElkXSxcbiAgICAgIGFjdGl2ZTogIXN0YXRlLm1hcENvbnRyb2xzW3BhbmVsSWRdLmFjdGl2ZVxuICAgIH1cbiAgfVxufSk7XG5cbi8qKlxuICogVG9nZ2xlIGFjdGl2ZSBtYXAgY29udHJvbCBwYW5lbFxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB1aVN0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5wYXlsb2FkIGRhdGFzZXQgaWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgb3BlbkRlbGV0ZU1vZGFsVXBkYXRlciA9IChcbiAgc3RhdGUsXG4gIHtwYXlsb2FkOiBkYXRhc2V0S2V5VG9SZW1vdmV9XG4pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBjdXJyZW50TW9kYWw6IERFTEVURV9EQVRBX0lELFxuICBkYXRhc2V0S2V5VG9SZW1vdmVcbn0pO1xuXG4vKipcbiAqIFNldCBgZXhwb3J0SW1hZ2UubGVnZW5kYCB0byBgdHJ1ZWAgb3IgYGZhbHNlYFxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB1aVN0YXRlYFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVMZWdlbmRVcGRhdGVyID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgbGVnZW5kOiAhc3RhdGUuZXhwb3J0SW1hZ2UubGVnZW5kXG4gIH1cbn0pO1xuXG4vKipcbiAqIFNldCBgZXhwb3J0SW1hZ2UucmF0aW9gXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgb25lIG9mIGAnU0NSRUVOJ2AsIGAnRk9VUl9CWV9USFJFRSdgIGFuZCBgJ1NJWFRFRU5fQllfTklORSdgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJhdGlvVXBkYXRlciA9IChzdGF0ZSwge3BheWxvYWR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0SW1hZ2U6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRJbWFnZSxcbiAgICByYXRpbzogcGF5bG9hZC5yYXRpb1xuICB9XG59KTtcblxuLyoqXG4gKiBTZXQgYGV4cG9ydEltYWdlLnJlc29sdXRpb25gXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgb25lIG9mIGAnT05FX1gnYCwgYCdUV09fWCdgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlc29sdXRpb25VcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRJbWFnZToge1xuICAgIC4uLnN0YXRlLmV4cG9ydEltYWdlLFxuICAgIHJlc29sdXRpb246IHBheWxvYWQucmVzb2x1dGlvblxuICB9XG59KTtcblxuLyoqXG4gKiBTZXQgYGV4cG9ydEltYWdlLmV4cG9ydGluZ2AgdG8gYHRydWVgXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHN0YXJ0RXhwb3J0aW5nSW1hZ2UgPSBzdGF0ZSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0SW1hZ2U6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRJbWFnZSxcbiAgICBleHBvcnRpbmc6IHRydWUsXG4gICAgaW1hZ2VEYXRhVXJpOiAnJ1xuICB9XG59KTtcblxuLyoqXG4gKiBTZXQgYGV4cG9ydEltYWdlLnNldEV4cG9ydEltYWdlRGF0YVVyaWAgdG8gYSBpbWFnZSBkYXRhVXJpXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgZXhwb3J0IGltYWdlIGRhdGEgdXJpXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldEV4cG9ydEltYWdlRGF0YVVyaSA9IChzdGF0ZSwge3BheWxvYWQ6IGRhdGFVcml9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0SW1hZ2U6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRJbWFnZSxcbiAgICBleHBvcnRpbmc6IGZhbHNlLFxuICAgIGltYWdlRGF0YVVyaTogZGF0YVVyaVxuICB9XG59KTtcblxuZXhwb3J0IGNvbnN0IHNldEV4cG9ydEltYWdlRXJyb3IgPSAoc3RhdGUsIHtwYXlsb2FkOiBlcnJvcn0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRJbWFnZToge1xuICAgIC4uLnN0YXRlLmV4cG9ydEltYWdlLFxuICAgIGV4cG9ydGluZzogZmFsc2UsXG4gICAgZXJyb3JcbiAgfVxufSk7XG5cbi8qKlxuICogRGVsZXRlIGNhY2hlZCBleHBvcnQgaW1hZ2VcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgY2xlYW51cEV4cG9ydEltYWdlID0gc3RhdGUgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydEltYWdlOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0SW1hZ2UsXG4gICAgZXhwb3J0aW5nOiBmYWxzZSxcbiAgICBpbWFnZURhdGFVcmk6ICcnLFxuICAgIGVycm9yOiBmYWxzZVxuICB9XG59KTtcblxuLyoqXG4gKiBTZXQgc2VsZWN0ZWQgZGF0YXNldCBmb3IgZXhwb3J0XG4gKiBAbWVtYmVyb2YgdWlTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQgZGF0YXNldCBpZFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRTZWxlY3RlZERhdGFzZXRVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogZGF0YXNldH0pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnREYXRhOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0RGF0YSxcbiAgICBzZWxlY3RlZERhdGFzZXQ6IGRhdGFzZXRcbiAgfVxufSk7XG5cbi8qKlxuICogU2V0IGRhdGEgZm9ybWF0IGZvciBleHBvcnRpbmcgZGF0YVxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB1aVN0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5wYXlsb2FkIG9uZSBvZiBgJ3RleHQvY3N2J2BcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0RXhwb3J0RGF0YVR5cGVVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogZGF0YVR5cGV9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0RGF0YToge1xuICAgIC4uLnN0YXRlLmV4cG9ydERhdGEsXG4gICAgZGF0YVR5cGVcbiAgfVxufSk7XG5cbi8qKlxuICogV2hldGhlciB0byBleHBvcnQgZmlsdGVyZWQgZGF0YSwgYHRydWVgIG9yIGBmYWxzZWBcbiAqIEBtZW1iZXJvZiB1aVN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYWN0aW9uLnBheWxvYWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0RXhwb3J0RmlsdGVyZWRVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogZmlsdGVyZWR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0RGF0YToge1xuICAgIC4uLnN0YXRlLmV4cG9ydERhdGEsXG4gICAgZmlsdGVyZWRcbiAgfVxufSk7XG5cbi8qKlxuICogV2hldGhlciB0byBpbmNsdWRpbmcgZGF0YSBpbiBtYXAgY29uZmlnLCB0b2dnbGUgYmV0d2VlbiBgdHJ1ZWAgb3IgYGZhbHNlYFxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB1aVN0YXRlYFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnREYXRhVXBkYXRlciA9IHN0YXRlID0+ICh7XG4gIC4uLnN0YXRlLFxuICBleHBvcnRNYXA6IHtcbiAgICAuLi5zdGF0ZS5leHBvcnRNYXAsXG4gICAgW0VYUE9SVF9NQVBfRk9STUFULkpTT05dOiB7XG4gICAgICAuLi5zdGF0ZS5leHBvcnRNYXBbRVhQT1JUX01BUF9GT1JNQVQuSlNPTl0sXG4gICAgICBoYXNEYXRhOiAhc3RhdGUuZXhwb3J0TWFwW0VYUE9SVF9NQVBfRk9STUFULkpTT05dLmhhc0RhdGFcbiAgICB9XG4gIH1cbn0pO1xuXG4vKipcbiAqIHdoZXRoZXIgdG8gZXhwb3J0IGEgbWFwYm94IGFjY2VzcyB0byBIVE1MIHNpbmdsZSBwYWdlXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgLSBgdWlTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRVc2VyTWFwYm94QWNjZXNzVG9rZW5VcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogdXNlck1hcGJveFRva2VufSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGV4cG9ydE1hcDoge1xuICAgIC4uLnN0YXRlLmV4cG9ydE1hcCxcbiAgICBbRVhQT1JUX01BUF9GT1JNQVQuSFRNTF06IHtcbiAgICAgIC4uLnN0YXRlLmV4cG9ydE1hcFtFWFBPUlRfTUFQX0ZPUk1BVC5IVE1MXSxcbiAgICAgIHVzZXJNYXBib3hUb2tlblxuICAgIH1cbiAgfVxufSk7XG5cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRNYXBGb3JtYXQgPSAoc3RhdGUsIHtwYXlsb2FkOiBmb3JtYXR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgZXhwb3J0TWFwOiB7XG4gICAgLi4uc3RhdGUuZXhwb3J0TWFwLFxuICAgIGZvcm1hdFxuICB9XG59KTtcblxuLyoqXG4qIEFkZCBhIG5vdGlmaWNhdGlvbiB0byBiZSBkaXNwbGF5ZWRcbiogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHVpU3RhdGVgXG4qIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkXG4qIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuKiBAcHVibGljXG4qL1xuZXhwb3J0IGNvbnN0IGFkZE5vdGlmaWNhdGlvblVwZGF0ZXIgPSAoc3RhdGUsIHtwYXlsb2FkfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIG5vdGlmaWNhdGlvbnM6IFtcbiAgICAuLi4oc3RhdGUubm90aWZpY2F0aW9ucyB8fCBbXSksXG4gICAgY3JlYXRlTm90aWZpY2F0aW9uKHBheWxvYWQpXG4gIF1cbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBhIG5vdGlmaWNhdGlvblxuICogQG1lbWJlcm9mIHVpU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB1aVN0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbi5wYXlsb2FkIGlkIG9mIHRoZSBub3RpZmljYXRpb24gdG8gYmUgcmVtb3ZlZFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVOb3RpZmljYXRpb25VcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZDogaWR9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgbm90aWZpY2F0aW9uczogc3RhdGUubm90aWZpY2F0aW9ucy5maWx0ZXIobiA9PiBuLmlkICE9PSBpZClcbn0pO1xuIl19