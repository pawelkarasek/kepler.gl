"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDataToMapComposed = exports.addDataToMapUpdater = exports.updateVisDataComposed = exports.updateVisDataUpdater = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _mapStateUpdaters = require("./map-state-updaters");

var _uiStateUpdaters = require("./ui-state-updaters");

var _visStateUpdaters = require("./vis-state-updaters");

var _mapStyleUpdaters = require("./map-style-updaters");

var _dataUtils = require("../utils/data-utils");

var _schemas = _interopRequireDefault(require("../schemas"));

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
// compose action to apply result multiple reducers, with the output of one

/**
 * Some actions will affect the entire kepler.lg instance state.
 * The updaters for these actions is exported as `combinedUpdaters`. These updater take the entire instance state
 * as the first argument. Read more about [Using updaters](../advanced-usage/using-updaters.md)
 * @public
 * @example
 *
 * import keplerGlReducer, {combinedUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    // add data to map after receiving data from remote sources
 *    case 'LOAD_REMOTE_RESOURCE_SUCCESS':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          // pass in kepler.gl instance state to combinedUpdaters
 *          map:  combinedUpdaters.addDataToMapUpdater(
 *           state.keplerGl.map,
 *           {
 *             payload: {
 *               datasets: action.datasets,
 *               options: {readOnly: true},
 *               config: action.config
 *              }
 *            }
 *          )
 *        }
 *      };
 *  }
 *  return reducers(state, action);
 * };
 *
 * export default composedReducer;
 */

/* eslint-disable no-unused-vars */
var combinedUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * Apply data and config to visState reducer
 * @memberof combinedUpdaters
 * @param {Object} state kepler.gl instance state, containing all subreducer state
 * @param {Object} action
 * @param {Array<Object>|Object} action.datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {Object} action.datasets.info -info of a dataset
 * @param {string} action.datasets.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @param {string} action.datasets.info.label - A display name of this dataset
 * @param {Object} action.datasets.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @param {Array<Object>} action.datasets.data.fields - ***required** Array of fields,
 * @param {string} action.datasets.data.fields.name - ***required** Name of the field,
 * @param {Array<Array>} action.datasets.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`
 * @param {Object} action.options
 * @param {Boolean} action.options.centerMap
 * @param {Boolean} action.options.readOnly
 * @param {Object} action.config
 * @returns {Object} nextState
 * @public
 */

var updateVisDataUpdater = function updateVisDataUpdater(state, action) {
  // keep a copy of oldLayers
  var oldLayers = state.visState.layers;
  var visState = (0, _visStateUpdaters.updateVisDataUpdater)(state.visState, action);
  var defaultOptions = {
    centerMap: true
  };
  var options = (0, _objectSpread2["default"])({}, defaultOptions, action.options);
  var bounds;

  if (options.centerMap) {
    // find map bounds for new layers
    var newLayers = visState.layers.filter(function (nl) {
      return !oldLayers.find(function (ol) {
        return ol === nl;
      });
    });
    bounds = (0, _dataUtils.findMapBounds)(newLayers);
  }

  return (0, _objectSpread2["default"])({}, state, {
    visState: visState,
    mapState: bounds ? (0, _mapStateUpdaters.fitBoundsUpdater)(state.mapState, {
      payload: bounds
    }) : state.mapState,
    uiState: (0, _objectSpread2["default"])({}, (0, _uiStateUpdaters.toggleModalUpdater)(state.uiState, {
      payload: null
    }), options.hasOwnProperty('readOnly') ? {
      readOnly: options.readOnly
    } : {})
  });
};

exports.updateVisDataUpdater = updateVisDataUpdater;
var updateVisDataComposed = updateVisDataUpdater;
/**
 * Combine data and full configuration update in a single action
 *
 * @memberof combinedUpdaters
 * @param {Object} state kepler.gl instance state, containing all subreducer state
 * @param {Object} action
 * @param {Object} action.payload `{datasets, options, config}`
 * @param {Array<Object>|Object} action.payload.datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {Object} action.payload.datasets.info -info of a dataset
 * @param {string} action.payload.datasets.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @param {string} action.payload.datasets.info.label - A display name of this dataset
 * @param {Object} action.payload.datasets.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @param {Array<Object>} action.payload.datasets.data.fields - ***required** Array of fields,
 * @param {string} action.payload.datasets.data.fields.name - ***required** Name of the field,
 * @param {Array<Array>} action.payload.datasets.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`
 * @param {Object} action.payload.options option object `{centerMap: true}`
 * @param {Object} action.payload.config map config
 * @returns {Object} nextState
 * @public
 */

exports.updateVisDataComposed = updateVisDataComposed;

var addDataToMapUpdater = function addDataToMapUpdater(state, _ref) {
  var payload = _ref.payload;
  var datasets = payload.datasets,
      options = payload.options,
      config = payload.config;
  var parsedConfig = config;

  if (config && config.config && config.version) {
    // if passed in saved config
    parsedConfig = _schemas["default"].parseSavedConfig(config);
  } // Update visState store


  var mergedState = updateVisDataComposed(state, {
    datasets: datasets,
    options: options,
    config: parsedConfig && parsedConfig.visState
  }); // Update mapState store

  mergedState = (0, _objectSpread2["default"])({}, mergedState, {
    mapState: (0, _mapStateUpdaters.receiveMapConfigUpdater)(mergedState.mapState, {
      payload: {
        mapState: parsedConfig && parsedConfig.mapState
      }
    })
  }); // Update mapStyle store

  mergedState = (0, _objectSpread2["default"])({}, mergedState, {
    mapStyle: (0, _mapStyleUpdaters.receiveMapConfigUpdater)(mergedState.mapStyle, {
      payload: {
        mapStyle: parsedConfig && parsedConfig.mapStyle
      }
    })
  });
  return mergedState;
};

exports.addDataToMapUpdater = addDataToMapUpdater;
var addDataToMapComposed = addDataToMapUpdater;
exports.addDataToMapComposed = addDataToMapComposed;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9jb21iaW5lZC11cGRhdGVycy5qcyJdLCJuYW1lcyI6WyJjb21iaW5lZFVwZGF0ZXJzIiwidXBkYXRlVmlzRGF0YVVwZGF0ZXIiLCJzdGF0ZSIsImFjdGlvbiIsIm9sZExheWVycyIsInZpc1N0YXRlIiwibGF5ZXJzIiwiZGVmYXVsdE9wdGlvbnMiLCJjZW50ZXJNYXAiLCJvcHRpb25zIiwiYm91bmRzIiwibmV3TGF5ZXJzIiwiZmlsdGVyIiwibmwiLCJmaW5kIiwib2wiLCJtYXBTdGF0ZSIsInBheWxvYWQiLCJ1aVN0YXRlIiwiaGFzT3duUHJvcGVydHkiLCJyZWFkT25seSIsInVwZGF0ZVZpc0RhdGFDb21wb3NlZCIsImFkZERhdGFUb01hcFVwZGF0ZXIiLCJkYXRhc2V0cyIsImNvbmZpZyIsInBhcnNlZENvbmZpZyIsInZlcnNpb24iLCJLZXBsZXJHbFNjaGVtYSIsInBhcnNlU2F2ZWRDb25maWciLCJtZXJnZWRTdGF0ZSIsIm1hcFN0eWxlIiwiYWRkRGF0YVRvTWFwQ29tcG9zZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQTFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5Q0E7QUFDQSxJQUFNQSxnQkFBZ0IsR0FBRyxJQUF6QjtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJPLElBQU1DLG9CQUFvQixHQUFHLFNBQXZCQSxvQkFBdUIsQ0FBQ0MsS0FBRCxFQUFRQyxNQUFSLEVBQW1CO0FBQ3JEO0FBQ0EsTUFBTUMsU0FBUyxHQUFHRixLQUFLLENBQUNHLFFBQU4sQ0FBZUMsTUFBakM7QUFFQSxNQUFNRCxRQUFRLEdBQUcsNENBQTZCSCxLQUFLLENBQUNHLFFBQW5DLEVBQTZDRixNQUE3QyxDQUFqQjtBQUVBLE1BQU1JLGNBQWMsR0FBRztBQUNyQkMsSUFBQUEsU0FBUyxFQUFFO0FBRFUsR0FBdkI7QUFJQSxNQUFNQyxPQUFPLHNDQUNSRixjQURRLEVBRVJKLE1BQU0sQ0FBQ00sT0FGQyxDQUFiO0FBS0EsTUFBSUMsTUFBSjs7QUFDQSxNQUFJRCxPQUFPLENBQUNELFNBQVosRUFBdUI7QUFDckI7QUFDQSxRQUFNRyxTQUFTLEdBQUdOLFFBQVEsQ0FBQ0MsTUFBVCxDQUFnQk0sTUFBaEIsQ0FBdUIsVUFBQUMsRUFBRTtBQUFBLGFBQUksQ0FBQ1QsU0FBUyxDQUFDVSxJQUFWLENBQWUsVUFBQUMsRUFBRTtBQUFBLGVBQUlBLEVBQUUsS0FBS0YsRUFBWDtBQUFBLE9BQWpCLENBQUw7QUFBQSxLQUF6QixDQUFsQjtBQUNBSCxJQUFBQSxNQUFNLEdBQUcsOEJBQWNDLFNBQWQsQ0FBVDtBQUNEOztBQUVELDRDQUNLVCxLQURMO0FBRUVHLElBQUFBLFFBQVEsRUFBUkEsUUFGRjtBQUdFVyxJQUFBQSxRQUFRLEVBQUVOLE1BQU0sR0FDWix3Q0FBaUJSLEtBQUssQ0FBQ2MsUUFBdkIsRUFBaUM7QUFDL0JDLE1BQUFBLE9BQU8sRUFBRVA7QUFEc0IsS0FBakMsQ0FEWSxHQUlaUixLQUFLLENBQUNjLFFBUFo7QUFRRUUsSUFBQUEsT0FBTyxxQ0FDRix5Q0FBbUJoQixLQUFLLENBQUNnQixPQUF6QixFQUFrQztBQUFDRCxNQUFBQSxPQUFPLEVBQUU7QUFBVixLQUFsQyxDQURFLEVBRURSLE9BQU8sQ0FBQ1UsY0FBUixDQUF1QixVQUF2QixJQUFxQztBQUFDQyxNQUFBQSxRQUFRLEVBQUVYLE9BQU8sQ0FBQ1c7QUFBbkIsS0FBckMsR0FBb0UsRUFGbkU7QUFSVDtBQWFELENBbkNNOzs7QUFxQ0EsSUFBTUMscUJBQXFCLEdBQUdwQixvQkFBOUI7QUFFUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJPLElBQU1xQixtQkFBbUIsR0FBRyxTQUF0QkEsbUJBQXNCLENBQUNwQixLQUFELFFBQXNCO0FBQUEsTUFBYmUsT0FBYSxRQUFiQSxPQUFhO0FBQUEsTUFFaERNLFFBRmdELEdBRW5CTixPQUZtQixDQUVoRE0sUUFGZ0Q7QUFBQSxNQUV0Q2QsT0FGc0MsR0FFbkJRLE9BRm1CLENBRXRDUixPQUZzQztBQUFBLE1BRTdCZSxNQUY2QixHQUVuQlAsT0FGbUIsQ0FFN0JPLE1BRjZCO0FBR3ZELE1BQUlDLFlBQVksR0FBR0QsTUFBbkI7O0FBRUEsTUFBSUEsTUFBTSxJQUFJQSxNQUFNLENBQUNBLE1BQWpCLElBQTJCQSxNQUFNLENBQUNFLE9BQXRDLEVBQStDO0FBQzdDO0FBQ0FELElBQUFBLFlBQVksR0FBR0Usb0JBQWVDLGdCQUFmLENBQWdDSixNQUFoQyxDQUFmO0FBQ0QsR0FSc0QsQ0FTdkQ7OztBQUNBLE1BQUlLLFdBQVcsR0FBR1IscUJBQXFCLENBQUNuQixLQUFELEVBQVE7QUFBQ3FCLElBQUFBLFFBQVEsRUFBUkEsUUFBRDtBQUFXZCxJQUFBQSxPQUFPLEVBQVBBLE9BQVg7QUFBb0JlLElBQUFBLE1BQU0sRUFBRUMsWUFBWSxJQUFJQSxZQUFZLENBQUNwQjtBQUF6RCxHQUFSLENBQXZDLENBVnVELENBWXZEOztBQUNBd0IsRUFBQUEsV0FBVyxzQ0FDTkEsV0FETTtBQUVUYixJQUFBQSxRQUFRLEVBQUUsK0NBQXNCYSxXQUFXLENBQUNiLFFBQWxDLEVBQTRDO0FBQUNDLE1BQUFBLE9BQU8sRUFBRTtBQUFDRCxRQUFBQSxRQUFRLEVBQUVTLFlBQVksSUFBSUEsWUFBWSxDQUFDVDtBQUF4QztBQUFWLEtBQTVDO0FBRkQsSUFBWCxDQWJ1RCxDQWtCdkQ7O0FBQ0FhLEVBQUFBLFdBQVcsc0NBQ05BLFdBRE07QUFFVEMsSUFBQUEsUUFBUSxFQUFFLCtDQUFzQkQsV0FBVyxDQUFDQyxRQUFsQyxFQUE0QztBQUFDYixNQUFBQSxPQUFPLEVBQUU7QUFBQ2EsUUFBQUEsUUFBUSxFQUFFTCxZQUFZLElBQUlBLFlBQVksQ0FBQ0s7QUFBeEM7QUFBVixLQUE1QztBQUZELElBQVg7QUFLQSxTQUFPRCxXQUFQO0FBQ0QsQ0F6Qk07OztBQTJCQSxJQUFNRSxvQkFBb0IsR0FBR1QsbUJBQTdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtmaXRCb3VuZHNVcGRhdGVyfSBmcm9tICcuL21hcC1zdGF0ZS11cGRhdGVycyc7XG5pbXBvcnQge3RvZ2dsZU1vZGFsVXBkYXRlcn0gZnJvbSAnLi91aS1zdGF0ZS11cGRhdGVycyc7XG5pbXBvcnQge3VwZGF0ZVZpc0RhdGFVcGRhdGVyIGFzIHZpc1N0YXRlVXBkYXRlVmlzRGF0YVVwZGF0ZXJ9IGZyb20gJy4vdmlzLXN0YXRlLXVwZGF0ZXJzJztcbmltcG9ydCB7cmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIgYXMgc3RhdGVNYXBDb25maWdVcGRhdGVyfSBmcm9tICcuL21hcC1zdGF0ZS11cGRhdGVycyc7XG5pbXBvcnQge3JlY2VpdmVNYXBDb25maWdVcGRhdGVyIGFzIHN0eWxlTWFwQ29uZmlnVXBkYXRlcn0gZnJvbSAnLi9tYXAtc3R5bGUtdXBkYXRlcnMnO1xuaW1wb3J0IHtmaW5kTWFwQm91bmRzfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcbmltcG9ydCBLZXBsZXJHbFNjaGVtYSBmcm9tICdzY2hlbWFzJztcblxuLy8gY29tcG9zZSBhY3Rpb24gdG8gYXBwbHkgcmVzdWx0IG11bHRpcGxlIHJlZHVjZXJzLCB3aXRoIHRoZSBvdXRwdXQgb2Ygb25lXG5cbi8qKlxuICogU29tZSBhY3Rpb25zIHdpbGwgYWZmZWN0IHRoZSBlbnRpcmUga2VwbGVyLmxnIGluc3RhbmNlIHN0YXRlLlxuICogVGhlIHVwZGF0ZXJzIGZvciB0aGVzZSBhY3Rpb25zIGlzIGV4cG9ydGVkIGFzIGBjb21iaW5lZFVwZGF0ZXJzYC4gVGhlc2UgdXBkYXRlciB0YWtlIHRoZSBlbnRpcmUgaW5zdGFuY2Ugc3RhdGVcbiAqIGFzIHRoZSBmaXJzdCBhcmd1bWVudC4gUmVhZCBtb3JlIGFib3V0IFtVc2luZyB1cGRhdGVyc10oLi4vYWR2YW5jZWQtdXNhZ2UvdXNpbmctdXBkYXRlcnMubWQpXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCBrZXBsZXJHbFJlZHVjZXIsIHtjb21iaW5lZFVwZGF0ZXJzfSBmcm9tICdrZXBsZXIuZ2wvcmVkdWNlcnMnO1xuICogLy8gUm9vdCBSZWR1Y2VyXG4gKiBjb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gKiAga2VwbGVyR2w6IGtlcGxlckdsUmVkdWNlcixcbiAqICBhcHA6IGFwcFJlZHVjZXJcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGNvbXBvc2VkUmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gKiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICogICAgLy8gYWRkIGRhdGEgdG8gbWFwIGFmdGVyIHJlY2VpdmluZyBkYXRhIGZyb20gcmVtb3RlIHNvdXJjZXNcbiAqICAgIGNhc2UgJ0xPQURfUkVNT1RFX1JFU09VUkNFX1NVQ0NFU1MnOlxuICogICAgICByZXR1cm4ge1xuICogICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgIGtlcGxlckdsOiB7XG4gKiAgICAgICAgICAuLi5zdGF0ZS5rZXBsZXJHbCxcbiAqICAgICAgICAgIC8vIHBhc3MgaW4ga2VwbGVyLmdsIGluc3RhbmNlIHN0YXRlIHRvIGNvbWJpbmVkVXBkYXRlcnNcbiAqICAgICAgICAgIG1hcDogIGNvbWJpbmVkVXBkYXRlcnMuYWRkRGF0YVRvTWFwVXBkYXRlcihcbiAqICAgICAgICAgICBzdGF0ZS5rZXBsZXJHbC5tYXAsXG4gKiAgICAgICAgICAge1xuICogICAgICAgICAgICAgcGF5bG9hZDoge1xuICogICAgICAgICAgICAgICBkYXRhc2V0czogYWN0aW9uLmRhdGFzZXRzLFxuICogICAgICAgICAgICAgICBvcHRpb25zOiB7cmVhZE9ubHk6IHRydWV9LFxuICogICAgICAgICAgICAgICBjb25maWc6IGFjdGlvbi5jb25maWdcbiAqICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICAgIH1cbiAqICAgICAgICAgIClcbiAqICAgICAgICB9XG4gKiAgICAgIH07XG4gKiAgfVxuICogIHJldHVybiByZWR1Y2VycyhzdGF0ZSwgYWN0aW9uKTtcbiAqIH07XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29tcG9zZWRSZWR1Y2VyO1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgY29tYmluZWRVcGRhdGVycyA9IG51bGw7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG5cbi8qKlxuICogQXBwbHkgZGF0YSBhbmQgY29uZmlnIHRvIHZpc1N0YXRlIHJlZHVjZXJcbiAqIEBtZW1iZXJvZiBjb21iaW5lZFVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUga2VwbGVyLmdsIGluc3RhbmNlIHN0YXRlLCBjb250YWluaW5nIGFsbCBzdWJyZWR1Y2VyIHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD58T2JqZWN0fSBhY3Rpb24uZGF0YXNldHMgLSAqKipyZXF1aXJlZCoqIGRhdGFzZXRzIGNhbiBiZSBhIGRhdGFzZXQgb3IgYW4gYXJyYXkgb2YgZGF0YXNldHNcbiAqIEVhY2ggZGF0YXNldCBvYmplY3QgbmVlZHMgdG8gaGF2ZSBgaW5mb2AgYW5kIGBkYXRhYCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uZGF0YXNldHMuaW5mbyAtaW5mbyBvZiBhIGRhdGFzZXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uZGF0YXNldHMuaW5mby5pZCAtIGlkIG9mIHRoaXMgZGF0YXNldC4gSWYgY29uZmlnIGlzIGRlZmluZWQsIGBpZGAgc2hvdWxkIG1hdGNoZXMgdGhlIGBkYXRhSWRgIGluIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uZGF0YXNldHMuaW5mby5sYWJlbCAtIEEgZGlzcGxheSBuYW1lIG9mIHRoaXMgZGF0YXNldFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5kYXRhc2V0cy5kYXRhIC0gKioqcmVxdWlyZWQqKiBUaGUgZGF0YSBvYmplY3QsIGluIGEgdGFidWxhciBmb3JtYXQgd2l0aCAyIHByb3BlcnRpZXMgYGZpZWxkc2AgYW5kIGByb3dzYFxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBhY3Rpb24uZGF0YXNldHMuZGF0YS5maWVsZHMgLSAqKipyZXF1aXJlZCoqIEFycmF5IG9mIGZpZWxkcyxcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uZGF0YXNldHMuZGF0YS5maWVsZHMubmFtZSAtICoqKnJlcXVpcmVkKiogTmFtZSBvZiB0aGUgZmllbGQsXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYWN0aW9uLmRhdGFzZXRzLmRhdGEucm93cyAtICoqKnJlcXVpcmVkKiogQXJyYXkgb2Ygcm93cywgaW4gYSB0YWJ1bGFyIGZvcm1hdCB3aXRoIGBmaWVsZHNgIGFuZCBgcm93c2BcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ub3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBhY3Rpb24ub3B0aW9ucy5jZW50ZXJNYXBcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gYWN0aW9uLm9wdGlvbnMucmVhZE9ubHlcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uY29uZmlnXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZVZpc0RhdGFVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgLy8ga2VlcCBhIGNvcHkgb2Ygb2xkTGF5ZXJzXG4gIGNvbnN0IG9sZExheWVycyA9IHN0YXRlLnZpc1N0YXRlLmxheWVycztcblxuICBjb25zdCB2aXNTdGF0ZSA9IHZpc1N0YXRlVXBkYXRlVmlzRGF0YVVwZGF0ZXIoc3RhdGUudmlzU3RhdGUsIGFjdGlvbik7XG5cbiAgY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgY2VudGVyTWFwOiB0cnVlXG4gIH07XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAuLi5kZWZhdWx0T3B0aW9ucyxcbiAgICAuLi5hY3Rpb24ub3B0aW9uc1xuICB9O1xuXG4gIGxldCBib3VuZHM7XG4gIGlmIChvcHRpb25zLmNlbnRlck1hcCkge1xuICAgIC8vIGZpbmQgbWFwIGJvdW5kcyBmb3IgbmV3IGxheWVyc1xuICAgIGNvbnN0IG5ld0xheWVycyA9IHZpc1N0YXRlLmxheWVycy5maWx0ZXIobmwgPT4gIW9sZExheWVycy5maW5kKG9sID0+IG9sID09PSBubCkpO1xuICAgIGJvdW5kcyA9IGZpbmRNYXBCb3VuZHMobmV3TGF5ZXJzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgdmlzU3RhdGUsXG4gICAgbWFwU3RhdGU6IGJvdW5kc1xuICAgICAgPyBmaXRCb3VuZHNVcGRhdGVyKHN0YXRlLm1hcFN0YXRlLCB7XG4gICAgICAgICAgcGF5bG9hZDogYm91bmRzXG4gICAgICAgIH0pXG4gICAgICA6IHN0YXRlLm1hcFN0YXRlLFxuICAgIHVpU3RhdGU6IHtcbiAgICAgIC4uLnRvZ2dsZU1vZGFsVXBkYXRlcihzdGF0ZS51aVN0YXRlLCB7cGF5bG9hZDogbnVsbH0pLFxuICAgICAgLi4uKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ3JlYWRPbmx5JykgPyB7cmVhZE9ubHk6IG9wdGlvbnMucmVhZE9ubHl9IDoge30pXG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVZpc0RhdGFDb21wb3NlZCA9IHVwZGF0ZVZpc0RhdGFVcGRhdGVyO1xuXG4vKipcbiAqIENvbWJpbmUgZGF0YSBhbmQgZnVsbCBjb25maWd1cmF0aW9uIHVwZGF0ZSBpbiBhIHNpbmdsZSBhY3Rpb25cbiAqXG4gKiBAbWVtYmVyb2YgY29tYmluZWRVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGtlcGxlci5nbCBpbnN0YW5jZSBzdGF0ZSwgY29udGFpbmluZyBhbGwgc3VicmVkdWNlciBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvblxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkIGB7ZGF0YXNldHMsIG9wdGlvbnMsIGNvbmZpZ31gXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD58T2JqZWN0fSBhY3Rpb24ucGF5bG9hZC5kYXRhc2V0cyAtICoqKnJlcXVpcmVkKiogZGF0YXNldHMgY2FuIGJlIGEgZGF0YXNldCBvciBhbiBhcnJheSBvZiBkYXRhc2V0c1xuICogRWFjaCBkYXRhc2V0IG9iamVjdCBuZWVkcyB0byBoYXZlIGBpbmZvYCBhbmQgYGRhdGFgIHByb3BlcnR5LlxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5wYXlsb2FkLmRhdGFzZXRzLmluZm8gLWluZm8gb2YgYSBkYXRhc2V0XG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLnBheWxvYWQuZGF0YXNldHMuaW5mby5pZCAtIGlkIG9mIHRoaXMgZGF0YXNldC4gSWYgY29uZmlnIGlzIGRlZmluZWQsIGBpZGAgc2hvdWxkIG1hdGNoZXMgdGhlIGBkYXRhSWRgIGluIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZC5kYXRhc2V0cy5pbmZvLmxhYmVsIC0gQSBkaXNwbGF5IG5hbWUgb2YgdGhpcyBkYXRhc2V0XG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQuZGF0YXNldHMuZGF0YSAtICoqKnJlcXVpcmVkKiogVGhlIGRhdGEgb2JqZWN0LCBpbiBhIHRhYnVsYXIgZm9ybWF0IHdpdGggMiBwcm9wZXJ0aWVzIGBmaWVsZHNgIGFuZCBgcm93c2BcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gYWN0aW9uLnBheWxvYWQuZGF0YXNldHMuZGF0YS5maWVsZHMgLSAqKipyZXF1aXJlZCoqIEFycmF5IG9mIGZpZWxkcyxcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ucGF5bG9hZC5kYXRhc2V0cy5kYXRhLmZpZWxkcy5uYW1lIC0gKioqcmVxdWlyZWQqKiBOYW1lIG9mIHRoZSBmaWVsZCxcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhY3Rpb24ucGF5bG9hZC5kYXRhc2V0cy5kYXRhLnJvd3MgLSAqKipyZXF1aXJlZCoqIEFycmF5IG9mIHJvd3MsIGluIGEgdGFidWxhciBmb3JtYXQgd2l0aCBgZmllbGRzYCBhbmQgYHJvd3NgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQub3B0aW9ucyBvcHRpb24gb2JqZWN0IGB7Y2VudGVyTWFwOiB0cnVlfWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZC5jb25maWcgbWFwIGNvbmZpZ1xuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBhZGREYXRhVG9NYXBVcGRhdGVyID0gKHN0YXRlLCB7cGF5bG9hZH0pID0+IHtcblxuICBjb25zdCB7ZGF0YXNldHMsIG9wdGlvbnMsIGNvbmZpZ30gPSBwYXlsb2FkO1xuICBsZXQgcGFyc2VkQ29uZmlnID0gY29uZmlnO1xuXG4gIGlmIChjb25maWcgJiYgY29uZmlnLmNvbmZpZyAmJiBjb25maWcudmVyc2lvbikge1xuICAgIC8vIGlmIHBhc3NlZCBpbiBzYXZlZCBjb25maWdcbiAgICBwYXJzZWRDb25maWcgPSBLZXBsZXJHbFNjaGVtYS5wYXJzZVNhdmVkQ29uZmlnKGNvbmZpZylcbiAgfVxuICAvLyBVcGRhdGUgdmlzU3RhdGUgc3RvcmVcbiAgbGV0IG1lcmdlZFN0YXRlID0gdXBkYXRlVmlzRGF0YUNvbXBvc2VkKHN0YXRlLCB7ZGF0YXNldHMsIG9wdGlvbnMsIGNvbmZpZzogcGFyc2VkQ29uZmlnICYmIHBhcnNlZENvbmZpZy52aXNTdGF0ZX0pO1xuXG4gIC8vIFVwZGF0ZSBtYXBTdGF0ZSBzdG9yZVxuICBtZXJnZWRTdGF0ZSA9IHtcbiAgICAuLi5tZXJnZWRTdGF0ZSxcbiAgICBtYXBTdGF0ZTogc3RhdGVNYXBDb25maWdVcGRhdGVyKG1lcmdlZFN0YXRlLm1hcFN0YXRlLCB7cGF5bG9hZDoge21hcFN0YXRlOiBwYXJzZWRDb25maWcgJiYgcGFyc2VkQ29uZmlnLm1hcFN0YXRlfX0pXG4gIH07XG5cbiAgLy8gVXBkYXRlIG1hcFN0eWxlIHN0b3JlXG4gIG1lcmdlZFN0YXRlID0ge1xuICAgIC4uLm1lcmdlZFN0YXRlLFxuICAgIG1hcFN0eWxlOiBzdHlsZU1hcENvbmZpZ1VwZGF0ZXIobWVyZ2VkU3RhdGUubWFwU3R5bGUsIHtwYXlsb2FkOiB7bWFwU3R5bGU6IHBhcnNlZENvbmZpZyAmJiBwYXJzZWRDb25maWcubWFwU3R5bGV9fSlcbiAgfTtcblxuICByZXR1cm4gbWVyZ2VkU3RhdGVcbn07XG5cbmV4cG9ydCBjb25zdCBhZGREYXRhVG9NYXBDb21wb3NlZCA9IGFkZERhdGFUb01hcFVwZGF0ZXI7XG4iXX0=