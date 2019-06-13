"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setExportMapFormat = exports.setUserMapboxAccessToken = exports.setExportData = exports.setExportFiltered = exports.setExportDataType = exports.setExportSelectedDataset = exports.cleanupExportImage = exports.setExportImageError = exports.setExportImageDataUri = exports.startExportingImage = exports.toggleLegend = exports.setResolution = exports.setRatio = exports.removeNotification = exports.addNotification = exports.openDeleteModal = exports.toggleMapControl = exports.hideExportDropdown = exports.showExportDropdown = exports.toggleModal = exports.toggleSidePanel = void 0;

var _reduxActions = require("redux-actions");

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

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

/**
 * Toggle active side panel
 * @memberof uiStateActions
 * @param {string} id  id of side panel to be shown, one of `layer`, `filter`, `interaction`, `map`
 * @public
 */
var toggleSidePanel = (0, _reduxActions.createAction)(_actionTypes["default"].TOGGLE_SIDE_PANEL, function (id) {
  return id;
});
/**
 * Show and hide modal dialog
 * @memberof uiStateActions
 * @param {string|null} id - id of modal to be shown, null to hide modals. One of:
 *
 *  - [`DATA_TABLE_ID`](../constants/default-settings.md#data_table_id)
 *  - [`DELETE_DATA_ID`](../constants/default-settings.md#delete_data_id)
 *  - [`ADD_DATA_ID`](../constants/default-settings.md#add_data_id)
 *  - [`EXPORT_IMAGE_ID`](../constants/default-settings.md#export_image_id)
 *  - [`EXPORT_DATA_ID`](../constants/default-settings.md#export_data_id)
 *  - [`ADD_MAP_STYLE_ID`](../constants/default-settings.md#add_map_style_id)
 * @public
 */

exports.toggleSidePanel = toggleSidePanel;
var toggleModal = (0, _reduxActions.createAction)(_actionTypes["default"].TOGGLE_MODAL, function (id) {
  return id;
});
/**
 * Hide and show side panel header dropdown, activated by clicking the share link on top of the side panel
 * @memberof uiStateActions
 * @param {string} id - id of the dropdown
 * @public
 */

exports.toggleModal = toggleModal;
var showExportDropdown = (0, _reduxActions.createAction)(_actionTypes["default"].SHOW_EXPORT_DROPDOWN, function (id) {
  return id;
});
/**
 * Hide side panel header dropdown, activated by clicking the share link on top of the side panel
 * @memberof uiStateActions
 * @public
 */

exports.showExportDropdown = showExportDropdown;
var hideExportDropdown = (0, _reduxActions.createAction)(_actionTypes["default"].HIDE_EXPORT_DROPDOWN);
/**
 * Toggle active map control panel
 * @memberof uiStateActions
 * @param {string} panelId - map control panel id, one of the keys of: [`DEFAULT_MAP_CONTROLS`](#default_map_controls)
 * @public
 */

exports.hideExportDropdown = hideExportDropdown;
var toggleMapControl = (0, _reduxActions.createAction)(_actionTypes["default"].TOGGLE_MAP_CONTROL, function (panelId) {
  return panelId;
});
/**
 * Toggle active map control panel
 * @memberof uiStateActions
 * @param {string} datasetId - `id` of the dataset to be deleted
 * @public
 */

exports.toggleMapControl = toggleMapControl;
var openDeleteModal = (0, _reduxActions.createAction)(_actionTypes["default"].OPEN_DELETE_MODAL, function (datasetId) {
  return datasetId;
});
/**
 * Add a notification to be displayed
 * @memberof uiStateActions
 * @param {Object} notification - The `notification` object to be added
 * @public
 */

exports.openDeleteModal = openDeleteModal;
var addNotification = (0, _reduxActions.createAction)(_actionTypes["default"].ADD_NOTIFICATION, function (notification) {
  return notification;
});
/**
 * Remove a notification
 * @memberof uiStateActions
 * @param {string} id - `id` of the notification to be removed
 * @public
 */

exports.addNotification = addNotification;
var removeNotification = (0, _reduxActions.createAction)(_actionTypes["default"].REMOVE_NOTIFICATION, function (id) {
  return id;
});
/**
 * Set `exportImage.ratio`
 * @memberof uiStateActions
 * @param {string} ratio - one of `'SCREEN'`, `'FOUR_BY_THREE'` and `'SIXTEEN_BY_NINE'`
 * @public
 */

exports.removeNotification = removeNotification;
var setRatio = (0, _reduxActions.createAction)(_actionTypes["default"].SET_RATIO, function (ratio) {
  return ratio;
});
/**
 * Set `exportImage.resolution`
 * @memberof uiStateActions
 * @param {string} resolution - one of `'ONE_X'`, `'TWO_X'`
 * @public
 */

exports.setRatio = setRatio;
var setResolution = (0, _reduxActions.createAction)(_actionTypes["default"].SET_RESOLUTION, function (resolution) {
  return resolution;
});
/**
 * Set `exportImage.legend` to true or false
 * @memberof uiStateActions
 * @public
 */

exports.setResolution = setResolution;
var toggleLegend = (0, _reduxActions.createAction)(_actionTypes["default"].TOGGLE_LEGEND);
/**
 * Set `exportImage.exporting` to true
 * @memberof uiStateActions
 * @public
 */

exports.toggleLegend = toggleLegend;
var startExportingImage = (0, _reduxActions.createAction)(_actionTypes["default"].START_EXPORTING_IMAGE);
/**
 * Set `exportImage.setExportImageDataUri` to a dataUri
 * @memberof uiStateActions
 * @param {string} dataUri - export image data uri
 * @public
 */

exports.startExportingImage = startExportingImage;
var setExportImageDataUri = (0, _reduxActions.createAction)(_actionTypes["default"].SET_EXPORT_IMAGE_DATA_URI, function (dataUri) {
  return dataUri;
});
exports.setExportImageDataUri = setExportImageDataUri;
var setExportImageError = (0, _reduxActions.createAction)(_actionTypes["default"].SET_EXPORT_IMAGE_ERROR, function (error) {
  return error;
});
/**
 * Delete cached export image
 * @memberof uiStateActions
 * @public
 */

exports.setExportImageError = setExportImageError;
var cleanupExportImage = (0, _reduxActions.createAction)(_actionTypes["default"].CLEANUP_EXPORT_IMAGE);
/**
 * Set selected dataset for export
 * @memberof uiStateActions
 * @param {string} datasetId - dataset id
 * @public
 */

exports.cleanupExportImage = cleanupExportImage;
var setExportSelectedDataset = (0, _reduxActions.createAction)(_actionTypes["default"].SET_EXPORT_SELECTED_DATASET, function (datasetId) {
  return datasetId;
});
/**
 * Set data format for exporting data
 * @memberof uiStateActions
 * @param {string} dataType - one of `'text/csv'`
 * @public
 */

exports.setExportSelectedDataset = setExportSelectedDataset;
var setExportDataType = (0, _reduxActions.createAction)(_actionTypes["default"].SET_EXPORT_DATA_TYPE, function (dataType) {
  return dataType;
});
/**
 * Whether to export filtered data, `true` or `false`
 * @memberof uiStateActions
 * @param {boolean} payload - set `true` to ony export filtered data
 * @public
 */

exports.setExportDataType = setExportDataType;
var setExportFiltered = (0, _reduxActions.createAction)(_actionTypes["default"].SET_EXPORT_FILTERED, function (payload) {
  return payload;
});
/**
 * Whether to including data in map config, toggle between `true` or `false`
 * @memberof uiStateActions
 * @public
 */

exports.setExportFiltered = setExportFiltered;
var setExportData = (0, _reduxActions.createAction)(_actionTypes["default"].SET_EXPORT_DATA);
/**
 * Whether we export a mapbox access token used to create a single map html file
 * @memberof uiStateActions
 * @param {string} payload - mapbox access token
 * @public
 */

exports.setExportData = setExportData;
var setUserMapboxAccessToken = (0, _reduxActions.createAction)(_actionTypes["default"].SET_USER_MAPBOX_ACCESS_TOKEN, function (payload) {
  return payload;
});
/**
 * Set the expor tmap format (html, json)
 * @memberOf uiStateActions
 * @param {string} payload - map format
 * @public
 */

exports.setUserMapboxAccessToken = setUserMapboxAccessToken;
var setExportMapFormat = (0, _reduxActions.createAction)(_actionTypes["default"].SET_EXPORT_MAP_FORMAT, function (payload) {
  return payload;
});
/**
 * This declaration is needed to group actions in docs
 */

/**
 * Actions handled mostly by  `uiState` reducer.
 * They manage UI changes in tha app, such as open and close side panel,
 * switch between tabs in the side panel, open and close modal dialog for exporting data / images etc.
 * It also manges which settings are selected during image and map export
 *
 * @public
 */

/* eslint-disable no-unused-vars */

exports.setExportMapFormat = setExportMapFormat;
var uiStateActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3VpLXN0YXRlLWFjdGlvbnMuanMiXSwibmFtZXMiOlsidG9nZ2xlU2lkZVBhbmVsIiwiQWN0aW9uVHlwZXMiLCJUT0dHTEVfU0lERV9QQU5FTCIsImlkIiwidG9nZ2xlTW9kYWwiLCJUT0dHTEVfTU9EQUwiLCJzaG93RXhwb3J0RHJvcGRvd24iLCJTSE9XX0VYUE9SVF9EUk9QRE9XTiIsImhpZGVFeHBvcnREcm9wZG93biIsIkhJREVfRVhQT1JUX0RST1BET1dOIiwidG9nZ2xlTWFwQ29udHJvbCIsIlRPR0dMRV9NQVBfQ09OVFJPTCIsInBhbmVsSWQiLCJvcGVuRGVsZXRlTW9kYWwiLCJPUEVOX0RFTEVURV9NT0RBTCIsImRhdGFzZXRJZCIsImFkZE5vdGlmaWNhdGlvbiIsIkFERF9OT1RJRklDQVRJT04iLCJub3RpZmljYXRpb24iLCJyZW1vdmVOb3RpZmljYXRpb24iLCJSRU1PVkVfTk9USUZJQ0FUSU9OIiwic2V0UmF0aW8iLCJTRVRfUkFUSU8iLCJyYXRpbyIsInNldFJlc29sdXRpb24iLCJTRVRfUkVTT0xVVElPTiIsInJlc29sdXRpb24iLCJ0b2dnbGVMZWdlbmQiLCJUT0dHTEVfTEVHRU5EIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsIlNUQVJUX0VYUE9SVElOR19JTUFHRSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsIlNFVF9FWFBPUlRfSU1BR0VfREFUQV9VUkkiLCJkYXRhVXJpIiwic2V0RXhwb3J0SW1hZ2VFcnJvciIsIlNFVF9FWFBPUlRfSU1BR0VfRVJST1IiLCJlcnJvciIsImNsZWFudXBFeHBvcnRJbWFnZSIsIkNMRUFOVVBfRVhQT1JUX0lNQUdFIiwic2V0RXhwb3J0U2VsZWN0ZWREYXRhc2V0IiwiU0VUX0VYUE9SVF9TRUxFQ1RFRF9EQVRBU0VUIiwic2V0RXhwb3J0RGF0YVR5cGUiLCJTRVRfRVhQT1JUX0RBVEFfVFlQRSIsImRhdGFUeXBlIiwic2V0RXhwb3J0RmlsdGVyZWQiLCJTRVRfRVhQT1JUX0ZJTFRFUkVEIiwicGF5bG9hZCIsInNldEV4cG9ydERhdGEiLCJTRVRfRVhQT1JUX0RBVEEiLCJzZXRVc2VyTWFwYm94QWNjZXNzVG9rZW4iLCJTRVRfVVNFUl9NQVBCT1hfQUNDRVNTX1RPS0VOIiwic2V0RXhwb3J0TWFwRm9ybWF0IiwiU0VUX0VYUE9SVF9NQVBfRk9STUFUIiwidWlTdGF0ZUFjdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7Ozs7OztBQU1PLElBQU1BLGVBQWUsR0FBRyxnQ0FDN0JDLHdCQUFZQyxpQkFEaUIsRUFFN0IsVUFBQUMsRUFBRTtBQUFBLFNBQUlBLEVBQUo7QUFBQSxDQUYyQixDQUF4QjtBQUtQOzs7Ozs7Ozs7Ozs7Ozs7QUFhTyxJQUFNQyxXQUFXLEdBQUcsZ0NBQ3pCSCx3QkFBWUksWUFEYSxFQUV6QixVQUFBRixFQUFFO0FBQUEsU0FBSUEsRUFBSjtBQUFBLENBRnVCLENBQXBCO0FBS1A7Ozs7Ozs7O0FBTU8sSUFBTUcsa0JBQWtCLEdBQUcsZ0NBQ2hDTCx3QkFBWU0sb0JBRG9CLEVBRWhDLFVBQUFKLEVBQUU7QUFBQSxTQUFJQSxFQUFKO0FBQUEsQ0FGOEIsQ0FBM0I7QUFLUDs7Ozs7OztBQUtPLElBQU1LLGtCQUFrQixHQUFHLGdDQUNoQ1Asd0JBQVlRLG9CQURvQixDQUEzQjtBQUlQOzs7Ozs7OztBQU1PLElBQU1DLGdCQUFnQixHQUFHLGdDQUM5QlQsd0JBQVlVLGtCQURrQixFQUU5QixVQUFBQyxPQUFPO0FBQUEsU0FBSUEsT0FBSjtBQUFBLENBRnVCLENBQXpCO0FBS1A7Ozs7Ozs7O0FBTU8sSUFBTUMsZUFBZSxHQUFHLGdDQUM3Qlosd0JBQVlhLGlCQURpQixFQUU3QixVQUFBQyxTQUFTO0FBQUEsU0FBSUEsU0FBSjtBQUFBLENBRm9CLENBQXhCO0FBS1A7Ozs7Ozs7O0FBTU8sSUFBTUMsZUFBZSxHQUFHLGdDQUM3QmYsd0JBQVlnQixnQkFEaUIsRUFFN0IsVUFBQUMsWUFBWTtBQUFBLFNBQUlBLFlBQUo7QUFBQSxDQUZpQixDQUF4QjtBQUtQOzs7Ozs7OztBQU1PLElBQU1DLGtCQUFrQixHQUFHLGdDQUNoQ2xCLHdCQUFZbUIsbUJBRG9CLEVBRWhDLFVBQUFqQixFQUFFO0FBQUEsU0FBSUEsRUFBSjtBQUFBLENBRjhCLENBQTNCO0FBS1A7Ozs7Ozs7O0FBTU8sSUFBTWtCLFFBQVEsR0FBRyxnQ0FDdEJwQix3QkFBWXFCLFNBRFUsRUFFdEIsVUFBQUMsS0FBSztBQUFBLFNBQUlBLEtBQUo7QUFBQSxDQUZpQixDQUFqQjtBQUtQOzs7Ozs7OztBQU1PLElBQU1DLGFBQWEsR0FBRyxnQ0FDM0J2Qix3QkFBWXdCLGNBRGUsRUFFM0IsVUFBQUMsVUFBVTtBQUFBLFNBQUlBLFVBQUo7QUFBQSxDQUZpQixDQUF0QjtBQUtQOzs7Ozs7O0FBS08sSUFBTUMsWUFBWSxHQUFHLGdDQUMxQjFCLHdCQUFZMkIsYUFEYyxDQUFyQjtBQUlQOzs7Ozs7O0FBS08sSUFBTUMsbUJBQW1CLEdBQUcsZ0NBQ2pDNUIsd0JBQVk2QixxQkFEcUIsQ0FBNUI7QUFJUDs7Ozs7Ozs7QUFNTyxJQUFNQyxxQkFBcUIsR0FBRyxnQ0FDbkM5Qix3QkFBWStCLHlCQUR1QixFQUVuQyxVQUFBQyxPQUFPO0FBQUEsU0FBSUEsT0FBSjtBQUFBLENBRjRCLENBQTlCOztBQUtBLElBQU1DLG1CQUFtQixHQUFHLGdDQUNqQ2pDLHdCQUFZa0Msc0JBRHFCLEVBRWpDLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFKO0FBQUEsQ0FGNEIsQ0FBNUI7QUFLUDs7Ozs7OztBQUtPLElBQU1DLGtCQUFrQixHQUFHLGdDQUNoQ3BDLHdCQUFZcUMsb0JBRG9CLENBQTNCO0FBSVA7Ozs7Ozs7O0FBTU8sSUFBTUMsd0JBQXdCLEdBQUcsZ0NBQ3RDdEMsd0JBQVl1QywyQkFEMEIsRUFFdEMsVUFBQXpCLFNBQVM7QUFBQSxTQUFJQSxTQUFKO0FBQUEsQ0FGNkIsQ0FBakM7QUFLUDs7Ozs7Ozs7QUFNTyxJQUFNMEIsaUJBQWlCLEdBQUcsZ0NBQy9CeEMsd0JBQVl5QyxvQkFEbUIsRUFFL0IsVUFBQUMsUUFBUTtBQUFBLFNBQUlBLFFBQUo7QUFBQSxDQUZ1QixDQUExQjtBQUtQOzs7Ozs7OztBQU1PLElBQU1DLGlCQUFpQixHQUFHLGdDQUMvQjNDLHdCQUFZNEMsbUJBRG1CLEVBRS9CLFVBQUFDLE9BQU87QUFBQSxTQUFJQSxPQUFKO0FBQUEsQ0FGd0IsQ0FBMUI7QUFLUDs7Ozs7OztBQUtPLElBQU1DLGFBQWEsR0FBRyxnQ0FDM0I5Qyx3QkFBWStDLGVBRGUsQ0FBdEI7QUFJUDs7Ozs7Ozs7QUFNTyxJQUFNQyx3QkFBd0IsR0FBRyxnQ0FDdENoRCx3QkFBWWlELDRCQUQwQixFQUV0QyxVQUFBSixPQUFPO0FBQUEsU0FBSUEsT0FBSjtBQUFBLENBRitCLENBQWpDO0FBS1A7Ozs7Ozs7O0FBTU8sSUFBTUssa0JBQWtCLEdBQUcsZ0NBQ2hDbEQsd0JBQVltRCxxQkFEb0IsRUFFaEMsVUFBQU4sT0FBTztBQUFBLFNBQUlBLE9BQUo7QUFBQSxDQUZ5QixDQUEzQjtBQUtQOzs7O0FBR0E7Ozs7Ozs7OztBQVFBOzs7QUFDQSxJQUFNTyxjQUFjLEdBQUcsSUFBdkI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y3JlYXRlQWN0aW9ufSBmcm9tICdyZWR1eC1hY3Rpb25zJztcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcblxuLyoqXG4gKiBUb2dnbGUgYWN0aXZlIHNpZGUgcGFuZWxcbiAqIEBtZW1iZXJvZiB1aVN0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IGlkICBpZCBvZiBzaWRlIHBhbmVsIHRvIGJlIHNob3duLCBvbmUgb2YgYGxheWVyYCwgYGZpbHRlcmAsIGBpbnRlcmFjdGlvbmAsIGBtYXBgXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVTaWRlUGFuZWwgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlRPR0dMRV9TSURFX1BBTkVMLFxuICBpZCA9PiBpZFxuKTtcblxuLyoqXG4gKiBTaG93IGFuZCBoaWRlIG1vZGFsIGRpYWxvZ1xuICogQG1lbWJlcm9mIHVpU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ3xudWxsfSBpZCAtIGlkIG9mIG1vZGFsIHRvIGJlIHNob3duLCBudWxsIHRvIGhpZGUgbW9kYWxzLiBPbmUgb2Y6XG4gKlxuICogIC0gW2BEQVRBX1RBQkxFX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjZGF0YV90YWJsZV9pZClcbiAqICAtIFtgREVMRVRFX0RBVEFfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNkZWxldGVfZGF0YV9pZClcbiAqICAtIFtgQUREX0RBVEFfSURgXSguLi9jb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncy5tZCNhZGRfZGF0YV9pZClcbiAqICAtIFtgRVhQT1JUX0lNQUdFX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjZXhwb3J0X2ltYWdlX2lkKVxuICogIC0gW2BFWFBPUlRfREFUQV9JRGBdKC4uL2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzLm1kI2V4cG9ydF9kYXRhX2lkKVxuICogIC0gW2BBRERfTUFQX1NUWUxFX0lEYF0oLi4vY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MubWQjYWRkX21hcF9zdHlsZV9pZClcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZU1vZGFsID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5UT0dHTEVfTU9EQUwsXG4gIGlkID0+IGlkXG4pO1xuXG4vKipcbiAqIEhpZGUgYW5kIHNob3cgc2lkZSBwYW5lbCBoZWFkZXIgZHJvcGRvd24sIGFjdGl2YXRlZCBieSBjbGlja2luZyB0aGUgc2hhcmUgbGluayBvbiB0b3Agb2YgdGhlIHNpZGUgcGFuZWxcbiAqIEBtZW1iZXJvZiB1aVN0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IGlkIC0gaWQgb2YgdGhlIGRyb3Bkb3duXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93RXhwb3J0RHJvcGRvd24gPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlNIT1dfRVhQT1JUX0RST1BET1dOLFxuICBpZCA9PiBpZFxuKTtcblxuLyoqXG4gKiBIaWRlIHNpZGUgcGFuZWwgaGVhZGVyIGRyb3Bkb3duLCBhY3RpdmF0ZWQgYnkgY2xpY2tpbmcgdGhlIHNoYXJlIGxpbmsgb24gdG9wIG9mIHRoZSBzaWRlIHBhbmVsXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZUFjdGlvbnNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGVFeHBvcnREcm9wZG93biA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuSElERV9FWFBPUlRfRFJPUERPV05cbik7XG5cbi8qKlxuICogVG9nZ2xlIGFjdGl2ZSBtYXAgY29udHJvbCBwYW5lbFxuICogQG1lbWJlcm9mIHVpU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFuZWxJZCAtIG1hcCBjb250cm9sIHBhbmVsIGlkLCBvbmUgb2YgdGhlIGtleXMgb2Y6IFtgREVGQVVMVF9NQVBfQ09OVFJPTFNgXSgjZGVmYXVsdF9tYXBfY29udHJvbHMpXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVNYXBDb250cm9sID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5UT0dHTEVfTUFQX0NPTlRST0wsXG4gIHBhbmVsSWQgPT4gcGFuZWxJZFxuKTtcblxuLyoqXG4gKiBUb2dnbGUgYWN0aXZlIG1hcCBjb250cm9sIHBhbmVsXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhc2V0SWQgLSBgaWRgIG9mIHRoZSBkYXRhc2V0IHRvIGJlIGRlbGV0ZWRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IG9wZW5EZWxldGVNb2RhbCA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuT1BFTl9ERUxFVEVfTU9EQUwsXG4gIGRhdGFzZXRJZCA9PiBkYXRhc2V0SWRcbik7XG5cbi8qKlxuICogQWRkIGEgbm90aWZpY2F0aW9uIHRvIGJlIGRpc3BsYXllZFxuICogQG1lbWJlcm9mIHVpU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gbm90aWZpY2F0aW9uIC0gVGhlIGBub3RpZmljYXRpb25gIG9iamVjdCB0byBiZSBhZGRlZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgYWRkTm90aWZpY2F0aW9uID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5BRERfTk9USUZJQ0FUSU9OLFxuICBub3RpZmljYXRpb24gPT4gbm90aWZpY2F0aW9uXG4pO1xuXG4vKipcbiAqIFJlbW92ZSBhIG5vdGlmaWNhdGlvblxuICogQG1lbWJlcm9mIHVpU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBgaWRgIG9mIHRoZSBub3RpZmljYXRpb24gdG8gYmUgcmVtb3ZlZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlTm90aWZpY2F0aW9uID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5SRU1PVkVfTk9USUZJQ0FUSU9OLFxuICBpZCA9PiBpZFxuKTtcblxuLyoqXG4gKiBTZXQgYGV4cG9ydEltYWdlLnJhdGlvYFxuICogQG1lbWJlcm9mIHVpU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gcmF0aW8gLSBvbmUgb2YgYCdTQ1JFRU4nYCwgYCdGT1VSX0JZX1RIUkVFJ2AgYW5kIGAnU0lYVEVFTl9CWV9OSU5FJ2BcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJhdGlvID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5TRVRfUkFUSU8sXG4gIHJhdGlvID0+IHJhdGlvXG4pO1xuXG4vKipcbiAqIFNldCBgZXhwb3J0SW1hZ2UucmVzb2x1dGlvbmBcbiAqIEBtZW1iZXJvZiB1aVN0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IHJlc29sdXRpb24gLSBvbmUgb2YgYCdPTkVfWCdgLCBgJ1RXT19YJ2BcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHNldFJlc29sdXRpb24gPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlNFVF9SRVNPTFVUSU9OLFxuICByZXNvbHV0aW9uID0+IHJlc29sdXRpb25cbik7XG5cbi8qKlxuICogU2V0IGBleHBvcnRJbWFnZS5sZWdlbmRgIHRvIHRydWUgb3IgZmFsc2VcbiAqIEBtZW1iZXJvZiB1aVN0YXRlQWN0aW9uc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlTGVnZW5kID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5UT0dHTEVfTEVHRU5EXG4pO1xuXG4vKipcbiAqIFNldCBgZXhwb3J0SW1hZ2UuZXhwb3J0aW5nYCB0byB0cnVlXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZUFjdGlvbnNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHN0YXJ0RXhwb3J0aW5nSW1hZ2UgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlNUQVJUX0VYUE9SVElOR19JTUFHRVxuKTtcblxuLyoqXG4gKiBTZXQgYGV4cG9ydEltYWdlLnNldEV4cG9ydEltYWdlRGF0YVVyaWAgdG8gYSBkYXRhVXJpXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhVXJpIC0gZXhwb3J0IGltYWdlIGRhdGEgdXJpXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRJbWFnZURhdGFVcmkgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlNFVF9FWFBPUlRfSU1BR0VfREFUQV9VUkksXG4gIGRhdGFVcmkgPT4gZGF0YVVyaVxuKTtcblxuZXhwb3J0IGNvbnN0IHNldEV4cG9ydEltYWdlRXJyb3IgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlNFVF9FWFBPUlRfSU1BR0VfRVJST1IsXG4gIGVycm9yID0+IGVycm9yXG4pO1xuXG4vKipcbiAqIERlbGV0ZSBjYWNoZWQgZXhwb3J0IGltYWdlXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZUFjdGlvbnNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGNsZWFudXBFeHBvcnRJbWFnZSA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuQ0xFQU5VUF9FWFBPUlRfSU1BR0Vcbik7XG5cbi8qKlxuICogU2V0IHNlbGVjdGVkIGRhdGFzZXQgZm9yIGV4cG9ydFxuICogQG1lbWJlcm9mIHVpU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YXNldElkIC0gZGF0YXNldCBpZFxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0RXhwb3J0U2VsZWN0ZWREYXRhc2V0ID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5TRVRfRVhQT1JUX1NFTEVDVEVEX0RBVEFTRVQsXG4gIGRhdGFzZXRJZCA9PiBkYXRhc2V0SWRcbik7XG5cbi8qKlxuICogU2V0IGRhdGEgZm9ybWF0IGZvciBleHBvcnRpbmcgZGF0YVxuICogQG1lbWJlcm9mIHVpU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YVR5cGUgLSBvbmUgb2YgYCd0ZXh0L2NzdidgXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnREYXRhVHlwZSA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuU0VUX0VYUE9SVF9EQVRBX1RZUEUsXG4gIGRhdGFUeXBlID0+IGRhdGFUeXBlXG4pO1xuXG4vKipcbiAqIFdoZXRoZXIgdG8gZXhwb3J0IGZpbHRlcmVkIGRhdGEsIGB0cnVlYCBvciBgZmFsc2VgXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGF5bG9hZCAtIHNldCBgdHJ1ZWAgdG8gb255IGV4cG9ydCBmaWx0ZXJlZCBkYXRhXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRGaWx0ZXJlZCA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuU0VUX0VYUE9SVF9GSUxURVJFRCxcbiAgcGF5bG9hZCA9PiBwYXlsb2FkXG4pO1xuXG4vKipcbiAqIFdoZXRoZXIgdG8gaW5jbHVkaW5nIGRhdGEgaW4gbWFwIGNvbmZpZywgdG9nZ2xlIGJldHdlZW4gYHRydWVgIG9yIGBmYWxzZWBcbiAqIEBtZW1iZXJvZiB1aVN0YXRlQWN0aW9uc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0RXhwb3J0RGF0YSA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuU0VUX0VYUE9SVF9EQVRBXG4pO1xuXG4vKipcbiAqIFdoZXRoZXIgd2UgZXhwb3J0IGEgbWFwYm94IGFjY2VzcyB0b2tlbiB1c2VkIHRvIGNyZWF0ZSBhIHNpbmdsZSBtYXAgaHRtbCBmaWxlXG4gKiBAbWVtYmVyb2YgdWlTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXlsb2FkIC0gbWFwYm94IGFjY2VzcyB0b2tlblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0VXNlck1hcGJveEFjY2Vzc1Rva2VuID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5TRVRfVVNFUl9NQVBCT1hfQUNDRVNTX1RPS0VOLFxuICBwYXlsb2FkID0+IHBheWxvYWRcbik7XG5cbi8qKlxuICogU2V0IHRoZSBleHBvciB0bWFwIGZvcm1hdCAoaHRtbCwganNvbilcbiAqIEBtZW1iZXJPZiB1aVN0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQgLSBtYXAgZm9ybWF0XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRFeHBvcnRNYXBGb3JtYXQgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLlNFVF9FWFBPUlRfTUFQX0ZPUk1BVCxcbiAgcGF5bG9hZCA9PiBwYXlsb2FkXG4pO1xuXG4vKipcbiAqIFRoaXMgZGVjbGFyYXRpb24gaXMgbmVlZGVkIHRvIGdyb3VwIGFjdGlvbnMgaW4gZG9jc1xuICovXG4vKipcbiAqIEFjdGlvbnMgaGFuZGxlZCBtb3N0bHkgYnkgIGB1aVN0YXRlYCByZWR1Y2VyLlxuICogVGhleSBtYW5hZ2UgVUkgY2hhbmdlcyBpbiB0aGEgYXBwLCBzdWNoIGFzIG9wZW4gYW5kIGNsb3NlIHNpZGUgcGFuZWwsXG4gKiBzd2l0Y2ggYmV0d2VlbiB0YWJzIGluIHRoZSBzaWRlIHBhbmVsLCBvcGVuIGFuZCBjbG9zZSBtb2RhbCBkaWFsb2cgZm9yIGV4cG9ydGluZyBkYXRhIC8gaW1hZ2VzIGV0Yy5cbiAqIEl0IGFsc28gbWFuZ2VzIHdoaWNoIHNldHRpbmdzIGFyZSBzZWxlY3RlZCBkdXJpbmcgaW1hZ2UgYW5kIG1hcCBleHBvcnRcbiAqXG4gKiBAcHVibGljXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCB1aVN0YXRlQWN0aW9ucyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4iXX0=