"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layerConfigChange = layerConfigChange;
exports.layerTextLabelChange = layerTextLabelChange;
exports.layerTypeChange = layerTypeChange;
exports.layerVisualChannelConfigChange = layerVisualChannelConfigChange;
exports.layerVisConfigChange = layerVisConfigChange;
exports.updateLayerBlending = updateLayerBlending;
exports.interactionConfigChange = interactionConfigChange;
exports.setFilter = setFilter;
exports.addFilter = addFilter;
exports.addLayer = addLayer;
exports.reorderLayer = reorderLayer;
exports.removeFilter = removeFilter;
exports.removeLayer = removeLayer;
exports.removeDataset = removeDataset;
exports.showDatasetTable = showDatasetTable;
exports.updateVisData = updateVisData;
exports.toggleAnimation = toggleAnimation;
exports.updateAnimationSpeed = updateAnimationSpeed;
exports.enlargeFilter = enlargeFilter;
exports.onLayerHover = onLayerHover;
exports.onLayerClick = onLayerClick;
exports.onMapClick = onMapClick;
exports.toggleLayerForMap = toggleLayerForMap;
exports.setVisibleLayersForMap = setVisibleLayersForMap;
exports.setFilterPlot = setFilterPlot;
exports.loadFiles = loadFiles;
exports.loadFilesErr = loadFilesErr;

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
// vis-state-reducer

/**
 * Update layer base config: dataId, label, column, isVisible
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Object} newConfig - new config
 * @returns {{type: ActionTypes.LAYER_CONFIG_CHANGE, oldLayer: oldLayer, newConfig: newConfig}}
 * @public
 */
function layerConfigChange(oldLayer, newConfig) {
  return {
    type: _actionTypes["default"].LAYER_CONFIG_CHANGE,
    oldLayer: oldLayer,
    newConfig: newConfig
  };
}
/**
 * Update layer text label
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Number} idx -`idx` of text label to be updated
 * @param {string} prop - `prop` of text label, e,g, `anchor`, `alignment`, `color`, `size`, `field`
 * @param {*} value - new value
 * @returns {{type: ActionTypes.LAYER_TEXT_LABEL_CHANGE, oldLayer: oldLayer, idx: idx, prop: prop, value:}}
 * @public
 */


function layerTextLabelChange(oldLayer, idx, prop, value) {
  return {
    type: _actionTypes["default"].LAYER_TEXT_LABEL_CHANGE,
    oldLayer: oldLayer,
    idx: idx,
    prop: prop,
    value: value
  };
}
/**
 * Update layer type. Previews layer config will be copied if applicable.
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {string} newType - new type
 * @returns {{type: ActionTypes.LAYER_TYPE_CHANGE, oldLayer: oldLayer, newType: newType}}
 * @public
 */


function layerTypeChange(oldLayer, newType) {
  return {
    type: _actionTypes["default"].LAYER_TYPE_CHANGE,
    oldLayer: oldLayer,
    newType: newType
  };
}
/**
 * Update layer visual channel
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Object} newConfig - new visual channel config
 * @param {string} channel - channel to be updated
 * @returns {{type: ActionTypes.LAYER_VISUAL_CHANNEL_CHANGE, oldLayer: oldLayer, newConfig: newConfig, channel: channel}}
 * @public
 */


function layerVisualChannelConfigChange(oldLayer, newConfig, channel) {
  return {
    type: _actionTypes["default"].LAYER_VISUAL_CHANNEL_CHANGE,
    oldLayer: oldLayer,
    newConfig: newConfig,
    channel: channel
  };
}
/**
 * Update layer `visConfig`
 * @memberof visStateActions
 * @param {Object} oldLayer - layer to be updated
 * @param {Object} newVisConfig - new visConfig as a key value map: e.g. `{opacity: 0.8}`
 * @returns {{type: ActionTypes.LAYER_VIS_CONFIG_CHANGE, oldLayer: oldLayer, newVisConfig: newVisConfig}}
 * @public
 */


function layerVisConfigChange(oldLayer, newVisConfig) {
  return {
    type: _actionTypes["default"].LAYER_VIS_CONFIG_CHANGE,
    oldLayer: oldLayer,
    newVisConfig: newVisConfig
  };
}
/**
 * Update layer blending mode
 * @memberof visStateActions
 * @param {string} mode one of `additive`, `normal` and `subtractive`
 * @returns {{type: ActionTypes.UPDATE_LAYER_BLENDING, mode: mode}}
 * @public
 */


function updateLayerBlending(mode) {
  return {
    type: _actionTypes["default"].UPDATE_LAYER_BLENDING,
    mode: mode
  };
}
/**
 * Update `interactionConfig`
 * @memberof visStateActions
 * @param {Object} config - new config as key value map: `{tooltip: {enabled: true}}`
 * @returns {{type: ActionTypes.INTERACTION_CONFIG_CHANGE, config: config}}
 * @public
 */


function interactionConfigChange(config) {
  return {
    type: _actionTypes["default"].INTERACTION_CONFIG_CHANGE,
    config: config
  };
}
/**
 * Update filter property
 * @memberof visStateActions
 * @param {Number} idx -`idx` of filter to be updated
 * @param {string} prop - `prop` of filter, e,g, `dataId`, `name`, `value`
 * @param {*} value - new value
 * @returns {{type: ActionTypes.SET_FILTER, idx: idx, prop: prop, value: value}}
 * @public
 */


function setFilter(idx, prop, value) {
  return {
    type: _actionTypes["default"].SET_FILTER,
    idx: idx,
    prop: prop,
    value: value
  };
}
/**
 * Add a new filter
 * @memberof visStateActions
 * @param {string} dataId - dataset `id` this new filter is associated with
 * @returns {{type: ActionTypes.ADD_FILTER, dataId: dataId}}
 * @public
 */


function addFilter(dataId) {
  return {
    type: _actionTypes["default"].ADD_FILTER,
    dataId: dataId
  };
}
/**
 * Add a new layer
 * @memberof visStateActions
 * @param {Object} props - new layer props
 * @returns {{type: ActionTypes.ADD_LAYER, props: props}}
 * @public
 */


function addLayer(props) {
  return {
    type: _actionTypes["default"].ADD_LAYER,
    props: props
  };
}
/**
 * Reorder layer, order is an array of layer indexes, index 0 will be the one at the bottom
 * @memberof visStateActions
 * @param {Array<Number>} order an array of layer indexes
 * @returns {{type: ActionTypes.REORDER_LAYER, order: order}}
 * @public
 * @example
 *
 * // bring `layers[1]` below `layers[0]`, the sequence layers will be rendered is `1`, `0`, `2`, `3`.
 * // `1` will be at the bottom, `3` will be at the top.
 * this.props.dispatch(reorderLayer([1, 0, 2, 3]));
 */


function reorderLayer(order) {
  return {
    type: _actionTypes["default"].REORDER_LAYER,
    order: order
  };
}
/**
 * Remove a filter from `visState.filters`, once a filter is removed, data will be re-filtered and layer will be updated
 * @memberof visStateActions
 * @param {Number} idx idx of filter to be removed
 * @returns {{type: ActionTypes.REMOVE_FILTER, idx: idx}}
 * @public
 */


function removeFilter(idx) {
  return {
    type: _actionTypes["default"].REMOVE_FILTER,
    idx: idx
  };
}
/**
 * Remove a layer
 * @memberof visStateActions
 * @param {Number} idx idx of layer to be removed
 * @returns {{type: ActionTypes.REMOVE_LAYER, idx: idx}}
 * @public
 */


function removeLayer(idx) {
  return {
    type: _actionTypes["default"].REMOVE_LAYER,
    idx: idx
  };
}
/**
 * Remove a dataset and all layers, filters, tooltip configs that based on it
 * @memberof visStateActions
 * @param {string} key dataset id
 * @returns {{type: ActionTypes.REMOVE_DATASET, key: key}}
 * @public
 */


function removeDataset(key) {
  return {
    type: _actionTypes["default"].REMOVE_DATASET,
    key: key
  };
}
/**
 * Display dataset table in a modal
 * @memberof visStateActions
 * @param {string} dataId dataset id to show in table
 * @returns {{type: ActionTypes.SHOW_DATASET_TABLE, dataId: dataId}}
 * @public
 */


function showDatasetTable(dataId) {
  return {
    type: _actionTypes["default"].SHOW_DATASET_TABLE,
    dataId: dataId
  };
}
/**
 * Add new dataset to `visState`, with option to load a map config along with the datasets
 * @memberof visStateActions
 * @param {Array<Object>|Object} datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {Object} datasets.info -info of a dataset
 * @param {string} datasets.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @param {string} datasets.info.label - A display name of this dataset
 * @param {Object} datasets.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @param {Array<Object>} datasets.data.fields - ***required** Array of fields,
 * @param {string} datasets.data.fields.name - ***required** Name of the field,
 * @param {Array<Array>} datasets.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`

 * @param {Object} options
 * @param {boolean} options.centerMap `default: true` if `centerMap` is set to `true` kepler.gl will
 * place the map view within the data points boundaries
 * @param {boolean} options.readOnly `default: false` if `readOnly` is set to `true`
 * the left setting panel will be hidden
 * @param {Object} config this object will contain the full kepler.gl instance configuration {mapState, mapStyle, visState}
 * @returns {{type: ActionTypes.UPDATE_VIS_DATA, datasets: datasets, options: options, config: config}}
 * @public
 */


function updateVisData(datasets, options, config) {
  return {
    type: _actionTypes["default"].UPDATE_VIS_DATA,
    datasets: datasets,
    options: options,
    config: config
  };
}
/**
 * Start and end filter animation
 * @memberof visStateActions
 * @param {Number} idx - idx of filter
 * @returns {{type: ActionTypes.TOGGLE_FILTER_ANIMATION, idx: idx}}
 * @public
 */


function toggleAnimation(idx) {
  return {
    type: _actionTypes["default"].TOGGLE_FILTER_ANIMATION,
    idx: idx
  };
}
/**
 * Change filter animation speed
 * @memberof visStateActions
 * @param {Number} idx -  `idx` of filter
 * @param {Number} speed - `speed` to change it to. `speed` is a multiplier
 * @returns {{type: ActionTypes.UPDATE_FILTER_ANIMATION_SPEED, idx: idx, speed: speed}}
 * @public
 */


function updateAnimationSpeed(idx, speed) {
  return {
    type: _actionTypes["default"].UPDATE_FILTER_ANIMATION_SPEED,
    idx: idx,
    speed: speed
  };
}
/**
 * Show larger time filter at bottom for time playback (apply to time filter only)
 * @memberof visStateActions
 * @param {Number} idx - index of filter to enlarge
 * @returns {{type: ActionTypes.ENLARGE_FILTER, idx: idx}}
 * @public
 */


function enlargeFilter(idx) {
  return {
    type: _actionTypes["default"].ENLARGE_FILTER,
    idx: idx
  };
}
/**
 * Trigger layer hover event with hovered object
 * @memberof visStateActions
 * @param {Object} info - Object hovered, returned by deck.gl
 * @returns {{type: ActionTypes.LAYER_HOVER, info: info}}
 * @public
 */


function onLayerHover(info) {
  return {
    type: _actionTypes["default"].LAYER_HOVER,
    info: info
  };
}
/**
 * Trigger layer click event with clicked object
 * @memberof visStateActions
 * @param {Object} info - Object clicked, returned by deck.gl
 * @returns {{type: ActionTypes.LAYER_CLICK, info: info}}
 * @public
 */


function onLayerClick(info) {
  return {
    type: _actionTypes["default"].LAYER_CLICK,
    info: info
  };
}
/**
 * Trigger map click event, unselect clicked object
 * @memberof visStateActions
 * @returns {{type: ActionTypes.MAP_CLICK}}
 * @public
 */


function onMapClick() {
  return {
    type: _actionTypes["default"].MAP_CLICK
  };
}
/**
 * Toggle visibility of a layer in a split map
 * @memberof visStateActions
 * @param {Number} mapIndex - index of the split map
 * @param {string} layerId - id of the layer
 * @returns {{type: ActionTypes.TOGGLE_LAYER_FOR_MAP, mapIndex: *, layerId: *}}
 * @public
 */


function toggleLayerForMap(mapIndex, layerId) {
  return {
    type: _actionTypes["default"].TOGGLE_LAYER_FOR_MAP,
    mapIndex: mapIndex,
    layerId: layerId
  };
}
/**
 * Set layers to be visible in split map
 * @memberof visStateActions
 * @param {Number} mapIndex - index of the split map
 * @param {Array<string>} layerIds - array of layer ids
 * @returns {{type: ActionTypes.SET_VISIBLE_LAYERS_FOR_MAP, layerIndex: *, mapIndex: *}}
 * @public
 */


function setVisibleLayersForMap(mapIndex, layerIds) {
  return {
    type: _actionTypes["default"].SET_VISIBLE_LAYERS_FOR_MAP,
    mapIndex: mapIndex,
    layerIds: layerIds
  };
}
/**
 * Set the property of a filter plot
 * @memberof visStateActions
 * @param {Number} idx
 * @param {Object} newProp key value mapping of new prop `{yAxis: 'histogram'}`
 * @returns {{type: ActionTypes.SET_FILTER_PLOT, idx: *, newProp: *}}
 * @public
 */


function setFilterPlot(idx, newProp) {
  return {
    type: _actionTypes["default"].SET_FILTER_PLOT,
    idx: idx,
    newProp: newProp
  };
}
/**
 * Trigger file loading dispatch `addDataToMap` if succeed, or `loadFilesErr` if failed
 * @memberof visStateActions
 * @param {Array<Object>} files array of fileblob
 * @returns {{type: ActionTypes.LOAD_FILES, files: *}}
 * @public
 */


function loadFiles(files) {
  return {
    type: _actionTypes["default"].LOAD_FILES,
    files: files
  };
}
/**
 * Trigger loading file error
 * @memberof visStateActions
 * @param {*} error
 * @returns {{type: ActionTypes.LOAD_FILES_ERR, error: *}}
 * @public
 */


function loadFilesErr(error) {
  return {
    type: _actionTypes["default"].LOAD_FILES_ERR,
    error: error
  };
}
/**
 * This declaration is needed to group actions in docs
 */

/**
 * Actions handled mostly by `visState` reducer.
 * They manage how data is processed, filtered and displayed on the map by operates on layers,
 * filters and interaction settings.
 *
 * @public
 */

/* eslint-disable no-unused-vars */


var visStateActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zLmpzIl0sIm5hbWVzIjpbImxheWVyQ29uZmlnQ2hhbmdlIiwib2xkTGF5ZXIiLCJuZXdDb25maWciLCJ0eXBlIiwiQWN0aW9uVHlwZXMiLCJMQVlFUl9DT05GSUdfQ0hBTkdFIiwibGF5ZXJUZXh0TGFiZWxDaGFuZ2UiLCJpZHgiLCJwcm9wIiwidmFsdWUiLCJMQVlFUl9URVhUX0xBQkVMX0NIQU5HRSIsImxheWVyVHlwZUNoYW5nZSIsIm5ld1R5cGUiLCJMQVlFUl9UWVBFX0NIQU5HRSIsImxheWVyVmlzdWFsQ2hhbm5lbENvbmZpZ0NoYW5nZSIsImNoYW5uZWwiLCJMQVlFUl9WSVNVQUxfQ0hBTk5FTF9DSEFOR0UiLCJsYXllclZpc0NvbmZpZ0NoYW5nZSIsIm5ld1Zpc0NvbmZpZyIsIkxBWUVSX1ZJU19DT05GSUdfQ0hBTkdFIiwidXBkYXRlTGF5ZXJCbGVuZGluZyIsIm1vZGUiLCJVUERBVEVfTEFZRVJfQkxFTkRJTkciLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZSIsImNvbmZpZyIsIklOVEVSQUNUSU9OX0NPTkZJR19DSEFOR0UiLCJzZXRGaWx0ZXIiLCJTRVRfRklMVEVSIiwiYWRkRmlsdGVyIiwiZGF0YUlkIiwiQUREX0ZJTFRFUiIsImFkZExheWVyIiwicHJvcHMiLCJBRERfTEFZRVIiLCJyZW9yZGVyTGF5ZXIiLCJvcmRlciIsIlJFT1JERVJfTEFZRVIiLCJyZW1vdmVGaWx0ZXIiLCJSRU1PVkVfRklMVEVSIiwicmVtb3ZlTGF5ZXIiLCJSRU1PVkVfTEFZRVIiLCJyZW1vdmVEYXRhc2V0Iiwia2V5IiwiUkVNT1ZFX0RBVEFTRVQiLCJzaG93RGF0YXNldFRhYmxlIiwiU0hPV19EQVRBU0VUX1RBQkxFIiwidXBkYXRlVmlzRGF0YSIsImRhdGFzZXRzIiwib3B0aW9ucyIsIlVQREFURV9WSVNfREFUQSIsInRvZ2dsZUFuaW1hdGlvbiIsIlRPR0dMRV9GSUxURVJfQU5JTUFUSU9OIiwidXBkYXRlQW5pbWF0aW9uU3BlZWQiLCJzcGVlZCIsIlVQREFURV9GSUxURVJfQU5JTUFUSU9OX1NQRUVEIiwiZW5sYXJnZUZpbHRlciIsIkVOTEFSR0VfRklMVEVSIiwib25MYXllckhvdmVyIiwiaW5mbyIsIkxBWUVSX0hPVkVSIiwib25MYXllckNsaWNrIiwiTEFZRVJfQ0xJQ0siLCJvbk1hcENsaWNrIiwiTUFQX0NMSUNLIiwidG9nZ2xlTGF5ZXJGb3JNYXAiLCJtYXBJbmRleCIsImxheWVySWQiLCJUT0dHTEVfTEFZRVJfRk9SX01BUCIsInNldFZpc2libGVMYXllcnNGb3JNYXAiLCJsYXllcklkcyIsIlNFVF9WSVNJQkxFX0xBWUVSU19GT1JfTUFQIiwic2V0RmlsdGVyUGxvdCIsIm5ld1Byb3AiLCJTRVRfRklMVEVSX1BMT1QiLCJsb2FkRmlsZXMiLCJmaWxlcyIsIkxPQURfRklMRVMiLCJsb2FkRmlsZXNFcnIiLCJlcnJvciIsIkxPQURfRklMRVNfRVJSIiwidmlzU3RhdGVBY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFHQTs7Ozs7Ozs7QUFRTyxTQUFTQSxpQkFBVCxDQUEyQkMsUUFBM0IsRUFBcUNDLFNBQXJDLEVBQWdEO0FBQ3JELFNBQU87QUFDTEMsSUFBQUEsSUFBSSxFQUFFQyx3QkFBWUMsbUJBRGI7QUFFTEosSUFBQUEsUUFBUSxFQUFSQSxRQUZLO0FBR0xDLElBQUFBLFNBQVMsRUFBVEE7QUFISyxHQUFQO0FBS0Q7QUFFRDs7Ozs7Ozs7Ozs7O0FBVU8sU0FBU0ksb0JBQVQsQ0FBOEJMLFFBQTlCLEVBQXdDTSxHQUF4QyxFQUE2Q0MsSUFBN0MsRUFBbURDLEtBQW5ELEVBQTBEO0FBQy9ELFNBQU87QUFDTE4sSUFBQUEsSUFBSSxF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R0FBdkIsRUFBNEJpRSxPQUE1QixFQUFxQztBQUMxQyxTQUFPO0FBQ0xyRSxJQUFBQSxJQUFJLEVBQUVDLHdCQUFZcUUsZUFEYjtBQUVMbEUsSUFBQUEsR0FBRyxFQUFIQSxHQUZLO0FBR0xpRSxJQUFBQSxPQUFPLEVBQVBBO0FBSEssR0FBUDtBQUtEO0FBRUQ7Ozs7Ozs7OztBQU9PLFNBQVNFLFNBQVQsQ0FBbUJDLEtBQW5CLEVBQTBCO0FBQy9CLFNBQU87QUFDTHhFLElBQUFBLElBQUksRUFBRUMsd0JBQVl3RSxVQURiO0FBRUxELElBQUFBLEtBQUssRUFBTEE7QUFGSyxHQUFQO0FBSUQ7QUFFRDs7Ozs7Ozs7O0FBT08sU0FBU0UsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDbEMsU0FBTztBQUNMM0UsSUFBQUEsSUFBSSxFQUFFQyx3QkFBWTJFLGNBRGI7QUFFTEQsSUFBQUEsS0FBSyxFQUFMQTtBQUZLLEdBQVA7QUFJRDtBQUVEOzs7O0FBR0E7Ozs7Ozs7O0FBT0E7OztBQUNBLElBQU1FLGVBQWUsR0FBRyxJQUF4QjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuLy8gdmlzLXN0YXRlLXJlZHVjZXJcbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYmFzZSBjb25maWc6IGRhdGFJZCwgbGFiZWwsIGNvbHVtbiwgaXNWaXNpYmxlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkTGF5ZXIgLSBsYXllciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0ge09iamVjdH0gbmV3Q29uZmlnIC0gbmV3IGNvbmZpZ1xuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9DT05GSUdfQ0hBTkdFLCBvbGRMYXllcjogb2xkTGF5ZXIsIG5ld0NvbmZpZzogbmV3Q29uZmlnfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyQ29uZmlnQ2hhbmdlKG9sZExheWVyLCBuZXdDb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9DT05GSUdfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIG5ld0NvbmZpZ1xuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBsYXllciB0ZXh0IGxhYmVsXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb2xkTGF5ZXIgLSBsYXllciB0byBiZSB1cGRhdGVkXG4gKiBAcGFyYW0ge051bWJlcn0gaWR4IC1gaWR4YCBvZiB0ZXh0IGxhYmVsIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gYHByb3BgIG9mIHRleHQgbGFiZWwsIGUsZywgYGFuY2hvcmAsIGBhbGlnbm1lbnRgLCBgY29sb3JgLCBgc2l6ZWAsIGBmaWVsZGBcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgLSBuZXcgdmFsdWVcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfVEVYVF9MQUJFTF9DSEFOR0UsIG9sZExheWVyOiBvbGRMYXllciwgaWR4OiBpZHgsIHByb3A6IHByb3AsIHZhbHVlOn19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllclRleHRMYWJlbENoYW5nZShvbGRMYXllciwgaWR4LCBwcm9wLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1RFWFRfTEFCRUxfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIGlkeCxcbiAgICBwcm9wLFxuICAgIHZhbHVlXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIHR5cGUuIFByZXZpZXdzIGxheWVyIGNvbmZpZyB3aWxsIGJlIGNvcGllZCBpZiBhcHBsaWNhYmxlLlxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9sZExheWVyIC0gbGF5ZXIgdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIHtzdHJpbmd9IG5ld1R5cGUgLSBuZXcgdHlwZVxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9UWVBFX0NIQU5HRSwgb2xkTGF5ZXI6IG9sZExheWVyLCBuZXdUeXBlOiBuZXdUeXBlfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVHlwZUNoYW5nZShvbGRMYXllciwgbmV3VHlwZSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1RZUEVfQ0hBTkdFLFxuICAgIG9sZExheWVyLFxuICAgIG5ld1R5cGVcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgdmlzdWFsIGNoYW5uZWxcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvbGRMYXllciAtIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXdDb25maWcgLSBuZXcgdmlzdWFsIGNoYW5uZWwgY29uZmlnXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hhbm5lbCAtIGNoYW5uZWwgdG8gYmUgdXBkYXRlZFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9WSVNVQUxfQ0hBTk5FTF9DSEFOR0UsIG9sZExheWVyOiBvbGRMYXllciwgbmV3Q29uZmlnOiBuZXdDb25maWcsIGNoYW5uZWw6IGNoYW5uZWx9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlKG9sZExheWVyLCBuZXdDb25maWcsIGNoYW5uZWwpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9WSVNVQUxfQ0hBTk5FTF9DSEFOR0UsXG4gICAgb2xkTGF5ZXIsXG4gICAgbmV3Q29uZmlnLFxuICAgIGNoYW5uZWxcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYHZpc0NvbmZpZ2BcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvbGRMYXllciAtIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXdWaXNDb25maWcgLSBuZXcgdmlzQ29uZmlnIGFzIGEga2V5IHZhbHVlIG1hcDogZS5nLiBge29wYWNpdHk6IDAuOH1gXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkxBWUVSX1ZJU19DT05GSUdfQ0hBTkdFLCBvbGRMYXllcjogb2xkTGF5ZXIsIG5ld1Zpc0NvbmZpZzogbmV3VmlzQ29uZmlnfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxheWVyVmlzQ29uZmlnQ2hhbmdlKG9sZExheWVyLCBuZXdWaXNDb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9WSVNfQ09ORklHX0NIQU5HRSxcbiAgICBvbGRMYXllcixcbiAgICBuZXdWaXNDb25maWdcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYmxlbmRpbmcgbW9kZVxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IG1vZGUgb25lIG9mIGBhZGRpdGl2ZWAsIGBub3JtYWxgIGFuZCBgc3VidHJhY3RpdmVgXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlVQREFURV9MQVlFUl9CTEVORElORywgbW9kZTogbW9kZX19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMYXllckJsZW5kaW5nKG1vZGUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfTEFZRVJfQkxFTkRJTkcsXG4gICAgbW9kZVxuICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBgaW50ZXJhY3Rpb25Db25maWdgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIC0gbmV3IGNvbmZpZyBhcyBrZXkgdmFsdWUgbWFwOiBge3Rvb2x0aXA6IHtlbmFibGVkOiB0cnVlfX1gXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLklOVEVSQUNUSU9OX0NPTkZJR19DSEFOR0UsIGNvbmZpZzogY29uZmlnfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVyYWN0aW9uQ29uZmlnQ2hhbmdlKGNvbmZpZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLklOVEVSQUNUSU9OX0NPTkZJR19DSEFOR0UsXG4gICAgY29uZmlnXG4gIH07XG59XG5cbi8qKlxuICogVXBkYXRlIGZpbHRlciBwcm9wZXJ0eVxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCAtYGlkeGAgb2YgZmlsdGVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gYHByb3BgIG9mIGZpbHRlciwgZSxnLCBgZGF0YUlkYCwgYG5hbWVgLCBgdmFsdWVgXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gbmV3IHZhbHVlXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlNFVF9GSUxURVIsIGlkeDogaWR4LCBwcm9wOiBwcm9wLCB2YWx1ZTogdmFsdWV9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0RmlsdGVyKGlkeCwgcHJvcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfRklMVEVSLFxuICAgIGlkeCxcbiAgICBwcm9wLFxuICAgIHZhbHVlXG4gIH07XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGZpbHRlclxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFJZCAtIGRhdGFzZXQgYGlkYCB0aGlzIG5ldyBmaWx0ZXIgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkFERF9GSUxURVIsIGRhdGFJZDogZGF0YUlkfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZEZpbHRlcihkYXRhSWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5BRERfRklMVEVSLFxuICAgIGRhdGFJZFxuICB9O1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBsYXllclxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIC0gbmV3IGxheWVyIHByb3BzXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkFERF9MQVlFUiwgcHJvcHM6IHByb3BzfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZExheWVyKHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuQUREX0xBWUVSLFxuICAgIHByb3BzXG4gIH07XG59XG5cbi8qKlxuICogUmVvcmRlciBsYXllciwgb3JkZXIgaXMgYW4gYXJyYXkgb2YgbGF5ZXIgaW5kZXhlcywgaW5kZXggMCB3aWxsIGJlIHRoZSBvbmUgYXQgdGhlIGJvdHRvbVxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBvcmRlciBhbiBhcnJheSBvZiBsYXllciBpbmRleGVzXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlJFT1JERVJfTEFZRVIsIG9yZGVyOiBvcmRlcn19XG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIGJyaW5nIGBsYXllcnNbMV1gIGJlbG93IGBsYXllcnNbMF1gLCB0aGUgc2VxdWVuY2UgbGF5ZXJzIHdpbGwgYmUgcmVuZGVyZWQgaXMgYDFgLCBgMGAsIGAyYCwgYDNgLlxuICogLy8gYDFgIHdpbGwgYmUgYXQgdGhlIGJvdHRvbSwgYDNgIHdpbGwgYmUgYXQgdGhlIHRvcC5cbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2gocmVvcmRlckxheWVyKFsxLCAwLCAyLCAzXSkpO1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVvcmRlckxheWVyKG9yZGVyKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuUkVPUkRFUl9MQVlFUixcbiAgICBvcmRlclxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZSBhIGZpbHRlciBmcm9tIGB2aXNTdGF0ZS5maWx0ZXJzYCwgb25jZSBhIGZpbHRlciBpcyByZW1vdmVkLCBkYXRhIHdpbGwgYmUgcmUtZmlsdGVyZWQgYW5kIGxheWVyIHdpbGwgYmUgdXBkYXRlZFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBpZHggb2YgZmlsdGVyIHRvIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuUkVNT1ZFX0ZJTFRFUiwgaWR4OiBpZHh9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRmlsdGVyKGlkeCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlJFTU9WRV9GSUxURVIsXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggaWR4IG9mIGxheWVyIHRvIGJlIHJlbW92ZWRcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuUkVNT1ZFX0xBWUVSLCBpZHg6IGlkeH19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVMYXllcihpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5SRU1PVkVfTEFZRVIsXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlIGEgZGF0YXNldCBhbmQgYWxsIGxheWVycywgZmlsdGVycywgdG9vbHRpcCBjb25maWdzIHRoYXQgYmFzZWQgb24gaXRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgZGF0YXNldCBpZFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5SRU1PVkVfREFUQVNFVCwga2V5OiBrZXl9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRGF0YXNldChrZXkpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5SRU1PVkVfREFUQVNFVCxcbiAgICBrZXlcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwbGF5IGRhdGFzZXQgdGFibGUgaW4gYSBtb2RhbFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFJZCBkYXRhc2V0IGlkIHRvIHNob3cgaW4gdGFibGVcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuU0hPV19EQVRBU0VUX1RBQkxFLCBkYXRhSWQ6IGRhdGFJZH19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RGF0YXNldFRhYmxlKGRhdGFJZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNIT1dfREFUQVNFVF9UQUJMRSxcbiAgICBkYXRhSWRcbiAgfTtcbn1cblxuLyoqXG4gKiBBZGQgbmV3IGRhdGFzZXQgdG8gYHZpc1N0YXRlYCwgd2l0aCBvcHRpb24gdG8gbG9hZCBhIG1hcCBjb25maWcgYWxvbmcgd2l0aCB0aGUgZGF0YXNldHNcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0PnxPYmplY3R9IGRhdGFzZXRzIC0gKioqcmVxdWlyZWQqKiBkYXRhc2V0cyBjYW4gYmUgYSBkYXRhc2V0IG9yIGFuIGFycmF5IG9mIGRhdGFzZXRzXG4gKiBFYWNoIGRhdGFzZXQgb2JqZWN0IG5lZWRzIHRvIGhhdmUgYGluZm9gIGFuZCBgZGF0YWAgcHJvcGVydHkuXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YXNldHMuaW5mbyAtaW5mbyBvZiBhIGRhdGFzZXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhc2V0cy5pbmZvLmlkIC0gaWQgb2YgdGhpcyBkYXRhc2V0LiBJZiBjb25maWcgaXMgZGVmaW5lZCwgYGlkYCBzaG91bGQgbWF0Y2hlcyB0aGUgYGRhdGFJZGAgaW4gY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRzLmluZm8ubGFiZWwgLSBBIGRpc3BsYXkgbmFtZSBvZiB0aGlzIGRhdGFzZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhc2V0cy5kYXRhIC0gKioqcmVxdWlyZWQqKiBUaGUgZGF0YSBvYmplY3QsIGluIGEgdGFidWxhciBmb3JtYXQgd2l0aCAyIHByb3BlcnRpZXMgYGZpZWxkc2AgYW5kIGByb3dzYFxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBkYXRhc2V0cy5kYXRhLmZpZWxkcyAtICoqKnJlcXVpcmVkKiogQXJyYXkgb2YgZmllbGRzLFxuICogQHBhcmFtIHtzdHJpbmd9IGRhdGFzZXRzLmRhdGEuZmllbGRzLm5hbWUgLSAqKipyZXF1aXJlZCoqIE5hbWUgb2YgdGhlIGZpZWxkLFxuICogQHBhcmFtIHtBcnJheTxBcnJheT59IGRhdGFzZXRzLmRhdGEucm93cyAtICoqKnJlcXVpcmVkKiogQXJyYXkgb2Ygcm93cywgaW4gYSB0YWJ1bGFyIGZvcm1hdCB3aXRoIGBmaWVsZHNgIGFuZCBgcm93c2BcblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5jZW50ZXJNYXAgYGRlZmF1bHQ6IHRydWVgIGlmIGBjZW50ZXJNYXBgIGlzIHNldCB0byBgdHJ1ZWAga2VwbGVyLmdsIHdpbGxcbiAqIHBsYWNlIHRoZSBtYXAgdmlldyB3aXRoaW4gdGhlIGRhdGEgcG9pbnRzIGJvdW5kYXJpZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5yZWFkT25seSBgZGVmYXVsdDogZmFsc2VgIGlmIGByZWFkT25seWAgaXMgc2V0IHRvIGB0cnVlYFxuICogdGhlIGxlZnQgc2V0dGluZyBwYW5lbCB3aWxsIGJlIGhpZGRlblxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyB0aGlzIG9iamVjdCB3aWxsIGNvbnRhaW4gdGhlIGZ1bGwga2VwbGVyLmdsIGluc3RhbmNlIGNvbmZpZ3VyYXRpb24ge21hcFN0YXRlLCBtYXBTdHlsZSwgdmlzU3RhdGV9XG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlVQREFURV9WSVNfREFUQSwgZGF0YXNldHM6IGRhdGFzZXRzLCBvcHRpb25zOiBvcHRpb25zLCBjb25maWc6IGNvbmZpZ319XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVWaXNEYXRhKGRhdGFzZXRzLCBvcHRpb25zLCBjb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5VUERBVEVfVklTX0RBVEEsXG4gICAgZGF0YXNldHMsXG4gICAgb3B0aW9ucyxcbiAgICBjb25maWdcbiAgfTtcbn1cblxuLyoqXG4gKiBTdGFydCBhbmQgZW5kIGZpbHRlciBhbmltYXRpb25cbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggLSBpZHggb2YgZmlsdGVyXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLlRPR0dMRV9GSUxURVJfQU5JTUFUSU9OLCBpZHg6IGlkeH19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVBbmltYXRpb24oaWR4KSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuVE9HR0xFX0ZJTFRFUl9BTklNQVRJT04sXG4gICAgaWR4XG4gIH07XG59XG5cbi8qKlxuICogQ2hhbmdlIGZpbHRlciBhbmltYXRpb24gc3BlZWRcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggLSAgYGlkeGAgb2YgZmlsdGVyXG4gKiBAcGFyYW0ge051bWJlcn0gc3BlZWQgLSBgc3BlZWRgIHRvIGNoYW5nZSBpdCB0by4gYHNwZWVkYCBpcyBhIG11bHRpcGxpZXJcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuVVBEQVRFX0ZJTFRFUl9BTklNQVRJT05fU1BFRUQsIGlkeDogaWR4LCBzcGVlZDogc3BlZWR9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQW5pbWF0aW9uU3BlZWQoaWR4LCBzcGVlZCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlVQREFURV9GSUxURVJfQU5JTUFUSU9OX1NQRUVELFxuICAgIGlkeCxcbiAgICBzcGVlZFxuICB9O1xufVxuXG4vKipcbiAqIFNob3cgbGFyZ2VyIHRpbWUgZmlsdGVyIGF0IGJvdHRvbSBmb3IgdGltZSBwbGF5YmFjayAoYXBwbHkgdG8gdGltZSBmaWx0ZXIgb25seSlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZHggLSBpbmRleCBvZiBmaWx0ZXIgdG8gZW5sYXJnZVxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5FTkxBUkdFX0ZJTFRFUiwgaWR4OiBpZHh9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZW5sYXJnZUZpbHRlcihpZHgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5FTkxBUkdFX0ZJTFRFUixcbiAgICBpZHhcbiAgfTtcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIGxheWVyIGhvdmVyIGV2ZW50IHdpdGggaG92ZXJlZCBvYmplY3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbmZvIC0gT2JqZWN0IGhvdmVyZWQsIHJldHVybmVkIGJ5IGRlY2suZ2xcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfSE9WRVIsIGluZm86IGluZm99fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gb25MYXllckhvdmVyKGluZm8pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MQVlFUl9IT1ZFUixcbiAgICBpbmZvXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBsYXllciBjbGljayBldmVudCB3aXRoIGNsaWNrZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gaW5mbyAtIE9iamVjdCBjbGlja2VkLCByZXR1cm5lZCBieSBkZWNrLmdsXG4gKiBAcmV0dXJucyB7e3R5cGU6IEFjdGlvblR5cGVzLkxBWUVSX0NMSUNLLCBpbmZvOiBpbmZvfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG9uTGF5ZXJDbGljayhpbmZvKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQWN0aW9uVHlwZXMuTEFZRVJfQ0xJQ0ssXG4gICAgaW5mb1xuICB9O1xufVxuXG4vKipcbiAqIFRyaWdnZXIgbWFwIGNsaWNrIGV2ZW50LCB1bnNlbGVjdCBjbGlja2VkIG9iamVjdFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5NQVBfQ0xJQ0t9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gb25NYXBDbGljaygpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5NQVBfQ0xJQ0tcbiAgfTtcbn1cblxuLyoqXG4gKiBUb2dnbGUgdmlzaWJpbGl0eSBvZiBhIGxheWVyIGluIGEgc3BsaXQgbWFwXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVBY3Rpb25zXG4gKiBAcGFyYW0ge051bWJlcn0gbWFwSW5kZXggLSBpbmRleCBvZiB0aGUgc3BsaXQgbWFwXG4gKiBAcGFyYW0ge3N0cmluZ30gbGF5ZXJJZCAtIGlkIG9mIHRoZSBsYXllclxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfTEFZRVJfRk9SX01BUCwgbWFwSW5kZXg6ICosIGxheWVySWQ6ICp9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlTGF5ZXJGb3JNYXAobWFwSW5kZXgsIGxheWVySWQpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5UT0dHTEVfTEFZRVJfRk9SX01BUCxcbiAgICBtYXBJbmRleCxcbiAgICBsYXllcklkXG4gIH07XG59XG5cbi8qKlxuICogU2V0IGxheWVycyB0byBiZSB2aXNpYmxlIGluIHNwbGl0IG1hcFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IG1hcEluZGV4IC0gaW5kZXggb2YgdGhlIHNwbGl0IG1hcFxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBsYXllcklkcyAtIGFycmF5IG9mIGxheWVyIGlkc1xuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5TRVRfVklTSUJMRV9MQVlFUlNfRk9SX01BUCwgbGF5ZXJJbmRleDogKiwgbWFwSW5kZXg6ICp9fVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0VmlzaWJsZUxheWVyc0Zvck1hcChtYXBJbmRleCwgbGF5ZXJJZHMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5TRVRfVklTSUJMRV9MQVlFUlNfRk9SX01BUCxcbiAgICBtYXBJbmRleCxcbiAgICBsYXllcklkc1xuICB9O1xufVxuXG4vKipcbiAqIFNldCB0aGUgcHJvcGVydHkgb2YgYSBmaWx0ZXIgcGxvdFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtOdW1iZXJ9IGlkeFxuICogQHBhcmFtIHtPYmplY3R9IG5ld1Byb3Aga2V5IHZhbHVlIG1hcHBpbmcgb2YgbmV3IHByb3AgYHt5QXhpczogJ2hpc3RvZ3JhbSd9YFxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5TRVRfRklMVEVSX1BMT1QsIGlkeDogKiwgbmV3UHJvcDogKn19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXRGaWx0ZXJQbG90KGlkeCwgbmV3UHJvcCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLlNFVF9GSUxURVJfUExPVCxcbiAgICBpZHgsXG4gICAgbmV3UHJvcFxuICB9O1xufVxuXG4vKipcbiAqIFRyaWdnZXIgZmlsZSBsb2FkaW5nIGRpc3BhdGNoIGBhZGREYXRhVG9NYXBgIGlmIHN1Y2NlZWQsIG9yIGBsb2FkRmlsZXNFcnJgIGlmIGZhaWxlZFxuICogQG1lbWJlcm9mIHZpc1N0YXRlQWN0aW9uc1xuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmaWxlcyBhcnJheSBvZiBmaWxlYmxvYlxuICogQHJldHVybnMge3t0eXBlOiBBY3Rpb25UeXBlcy5MT0FEX0ZJTEVTLCBmaWxlczogKn19XG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkRmlsZXMoZmlsZXMpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBBY3Rpb25UeXBlcy5MT0FEX0ZJTEVTLFxuICAgIGZpbGVzXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBsb2FkaW5nIGZpbGUgZXJyb3JcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZUFjdGlvbnNcbiAqIEBwYXJhbSB7Kn0gZXJyb3JcbiAqIEByZXR1cm5zIHt7dHlwZTogQWN0aW9uVHlwZXMuTE9BRF9GSUxFU19FUlIsIGVycm9yOiAqfX1cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxvYWRGaWxlc0VycihlcnJvcikge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IEFjdGlvblR5cGVzLkxPQURfRklMRVNfRVJSLFxuICAgIGVycm9yXG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBkZWNsYXJhdGlvbiBpcyBuZWVkZWQgdG8gZ3JvdXAgYWN0aW9ucyBpbiBkb2NzXG4gKi9cbi8qKlxuICogQWN0aW9ucyBoYW5kbGVkIG1vc3RseSBieSBgdmlzU3RhdGVgIHJlZHVjZXIuXG4gKiBUaGV5IG1hbmFnZSBob3cgZGF0YSBpcyBwcm9jZXNzZWQsIGZpbHRlcmVkIGFuZCBkaXNwbGF5ZWQgb24gdGhlIG1hcCBieSBvcGVyYXRlcyBvbiBsYXllcnMsXG4gKiBmaWx0ZXJzIGFuZCBpbnRlcmFjdGlvbiBzZXR0aW5ncy5cbiAqXG4gKiBAcHVibGljXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCB2aXNTdGF0ZUFjdGlvbnMgPSBudWxsO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuIl19