"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSplitMapUpdater = exports.receiveMapConfigUpdater = exports.togglePerspectiveUpdater = exports.fitBoundsUpdater = exports.updateMapUpdater = exports.INITIAL_MAP_STATE = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _geoViewport = _interopRequireDefault(require("@mapbox/geo-viewport"));

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
 * Updaters for `mapState` reducer. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 * @public
 * @example
 *
 * import keplerGlReducer, {mapStateUpdaters} from 'kepler.gl/reducers';
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
 *             mapState: mapStateUpdaters.fitBoundsUpdater(
 *               mapState, {payload: [127.34, 31.09, 127.56, 31.59]]}
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
var mapStateUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * Default initial `mapState`
 * @memberof mapStateUpdaters
 * @constant
 * @property {number} pitch Default: `0`
 * @property {number} bearing Default: `0`
 * @property {number} latitude Default: `37.75043`
 * @property {number} longitude Default: `-122.34679`
 * @property {number} zoom Default: `9`
 * @property {boolean} dragRotate Default: `false`
 * @property {number} width Default: `800`
 * @property {number} height Default: `800`
 * @property {boolean} isSplit Default: `false`
 * @public
 */

var INITIAL_MAP_STATE = {
  pitch: 0,
  bearing: 0,
  latitude: 37.75043,
  longitude: -122.34679,
  zoom: 9,
  dragRotate: false,
  width: 800,
  height: 800,
  isSplit: false
};
/* Updaters */

/**
 * Update map viewport
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload - viewport
 * @returns {Object} nextState
 * @public
 */

exports.INITIAL_MAP_STATE = INITIAL_MAP_STATE;

var updateMapUpdater = function updateMapUpdater(state, action) {
  return (0, _objectSpread2["default"])({}, state, action.payload || {});
};
/**
 * Fit map viewport to bounds
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {number[]} action.payload - bounds as `[lngMin, latMin, lngMax, latMax]`
 * @returns {Object} nextState
 * @public
 */


exports.updateMapUpdater = updateMapUpdater;

var fitBoundsUpdater = function fitBoundsUpdater(state, action) {
  var bounds = action.payload;

  var _geoViewport$viewport = _geoViewport["default"].viewport(bounds, [state.width, state.height]),
      center = _geoViewport$viewport.center,
      zoom = _geoViewport$viewport.zoom;

  return (0, _objectSpread2["default"])({}, state, {
    latitude: center[1],
    longitude: center[0],
    zoom: zoom
  });
};
/**
 * Toggle between 3d and 2d map.
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @returns {Object} nextState
 * @public
 */


exports.fitBoundsUpdater = fitBoundsUpdater;

var togglePerspectiveUpdater = function togglePerspectiveUpdater(state) {
  return (0, _objectSpread2["default"])({}, state, {
    pitch: state.dragRotate ? 0 : 50,
    bearing: state.dragRotate ? 0 : 24
  }, {
    dragRotate: !state.dragRotate
  });
}; // consider case where you have a split map and user wants to reset

/**
 * Update `mapState` to propagate a new config
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Object} action.payload - saved map config
 * @returns {Object} nextState
 * @public
 */


exports.togglePerspectiveUpdater = togglePerspectiveUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, action) {
  var _ref = action.payload.mapState || {},
      _ref$isSplit = _ref.isSplit,
      isSplit = _ref$isSplit === void 0 ? false : _ref$isSplit;

  return (0, _objectSpread2["default"])({}, state, action.payload.mapState || {}, {
    isSplit: isSplit
  }, getMapDimForSplitMap(isSplit, state));
};
/**
 * Toggle between one or split maps
 * @memberof mapStateUpdaters
 * @param {Object} state
 * @returns {Object} nextState
 * @public
 */


exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state) {
  return (0, _objectSpread2["default"])({}, state, {
    isSplit: !state.isSplit
  }, getMapDimForSplitMap(!state.isSplit, state));
}; // Helpers


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

function getMapDimForSplitMap(isSplit, state) {
  // cases:
  // 1. state split: true - isSplit: true
  // do nothing
  // 2. state split: false - isSplit: false
  // do nothing
  if (state.isSplit === isSplit) {
    return {};
  }

  var width = state.isSplit && !isSplit ? // 3. state split: true - isSplit: false
  // double width
  state.width * 2 // 4. state split: false - isSplit: true
  // split width
  : state.width / 2;
  return {
    width: width
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tYXAtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsibWFwU3RhdGVVcGRhdGVycyIsIklOSVRJQUxfTUFQX1NUQVRFIiwicGl0Y2giLCJiZWFyaW5nIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ6b29tIiwiZHJhZ1JvdGF0ZSIsIndpZHRoIiwiaGVpZ2h0IiwiaXNTcGxpdCIsInVwZGF0ZU1hcFVwZGF0ZXIiLCJzdGF0ZSIsImFjdGlvbiIsInBheWxvYWQiLCJmaXRCb3VuZHNVcGRhdGVyIiwiYm91bmRzIiwiZ2VvVmlld3BvcnQiLCJ2aWV3cG9ydCIsImNlbnRlciIsInRvZ2dsZVBlcnNwZWN0aXZlVXBkYXRlciIsInJlY2VpdmVNYXBDb25maWdVcGRhdGVyIiwibWFwU3RhdGUiLCJnZXRNYXBEaW1Gb3JTcGxpdE1hcCIsInRvZ2dsZVNwbGl0TWFwVXBkYXRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7O0FBcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ0E7QUFDQSxJQUFNQSxnQkFBZ0IsR0FBRyxJQUF6QjtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBZU8sSUFBTUMsaUJBQWlCLEdBQUc7QUFDL0JDLEVBQUFBLEtBQUssRUFBRSxDQUR3QjtBQUUvQkMsRUFBQUEsT0FBTyxFQUFFLENBRnNCO0FBRy9CQyxFQUFBQSxRQUFRLEVBQUUsUUFIcUI7QUFJL0JDLEVBQUFBLFNBQVMsRUFBRSxDQUFDLFNBSm1CO0FBSy9CQyxFQUFBQSxJQUFJLEVBQUUsQ0FMeUI7QUFNL0JDLEVBQUFBLFVBQVUsRUFBRSxLQU5tQjtBQU8vQkMsRUFBQUEsS0FBSyxFQUFFLEdBUHdCO0FBUS9CQyxFQUFBQSxNQUFNLEVBQUUsR0FSdUI7QUFTL0JDLEVBQUFBLE9BQU8sRUFBRTtBQVRzQixDQUExQjtBQVlQOztBQUNBOzs7Ozs7Ozs7Ozs7QUFTTyxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLENBQUNDLEtBQUQsRUFBUUMsTUFBUjtBQUFBLDRDQUMzQkQsS0FEMkIsRUFFMUJDLE1BQU0sQ0FBQ0MsT0FBUCxJQUFrQixFQUZRO0FBQUEsQ0FBekI7QUFLUDs7Ozs7Ozs7Ozs7OztBQVNPLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0gsS0FBRCxFQUFRQyxNQUFSLEVBQW1CO0FBQ2pELE1BQU1HLE1BQU0sR0FBR0gsTUFBTSxDQUFDQyxPQUF0Qjs7QUFEaUQsOEJBRTFCRyx3QkFBWUMsUUFBWixDQUFxQkYsTUFBckIsRUFBNkIsQ0FDbERKLEtBQUssQ0FBQ0osS0FENEMsRUFFbERJLEtBQUssQ0FBQ0gsTUFGNEMsQ0FBN0IsQ0FGMEI7QUFBQSxNQUUxQ1UsTUFGMEMseUJBRTFDQSxNQUYwQztBQUFBLE1BRWxDYixJQUZrQyx5QkFFbENBLElBRmtDOztBQU9qRCw0Q0FDS00sS0FETDtBQUVFUixJQUFBQSxRQUFRLEVBQUVlLE1BQU0sQ0FBQyxDQUFELENBRmxCO0FBR0VkLElBQUFBLFNBQVMsRUFBRWMsTUFBTSxDQUFDLENBQUQsQ0FIbkI7QUFJRWIsSUFBQUEsSUFBSSxFQUFKQTtBQUpGO0FBTUQsQ0FiTTtBQWVQOzs7Ozs7Ozs7OztBQU9PLElBQU1jLHdCQUF3QixHQUFHLFNBQTNCQSx3QkFBMkIsQ0FBQ1IsS0FBRDtBQUFBLDRDQUNuQ0EsS0FEbUMsRUFFbkM7QUFDRFYsSUFBQUEsS0FBSyxFQUFFVSxLQUFLLENBQUNMLFVBQU4sR0FBbUIsQ0FBbkIsR0FBdUIsRUFEN0I7QUFFREosSUFBQUEsT0FBTyxFQUFFUyxLQUFLLENBQUNMLFVBQU4sR0FBbUIsQ0FBbkIsR0FBdUI7QUFGL0IsR0FGbUM7QUFNdENBLElBQUFBLFVBQVUsRUFBRSxDQUFDSyxLQUFLLENBQUNMO0FBTm1CO0FBQUEsQ0FBakMsQyxDQVNQOztBQUNBOzs7Ozs7Ozs7Ozs7O0FBU08sSUFBTWMsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFDVCxLQUFELEVBQVFDLE1BQVIsRUFBbUI7QUFBQSxhQUM5QkEsTUFBTSxDQUFDQyxPQUFQLENBQWVRLFFBQWYsSUFBMkIsRUFERztBQUFBLDBCQUNqRFosT0FEaUQ7QUFBQSxNQUNqREEsT0FEaUQsNkJBQ3ZDLEtBRHVDOztBQUd4RCw0Q0FDS0UsS0FETCxFQUVNQyxNQUFNLENBQUNDLE9BQVAsQ0FBZVEsUUFBZixJQUEyQixFQUZqQztBQUdFWixJQUFBQSxPQUFPLEVBQVBBO0FBSEYsS0FJS2Esb0JBQW9CLENBQUNiLE9BQUQsRUFBVUUsS0FBVixDQUp6QjtBQU1ELENBVE07QUFXUDs7Ozs7Ozs7Ozs7QUFPTyxJQUFNWSxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCLENBQUNaLEtBQUQ7QUFBQSw0Q0FDaENBLEtBRGdDO0FBRW5DRixJQUFBQSxPQUFPLEVBQUUsQ0FBQ0UsS0FBSyxDQUFDRjtBQUZtQixLQUdoQ2Esb0JBQW9CLENBQUMsQ0FBQ1gsS0FBSyxDQUFDRixPQUFSLEVBQWlCRSxLQUFqQixDQUhZO0FBQUEsQ0FBOUIsQyxDQU1QOzs7OztBQUNBLFNBQVNXLG9CQUFULENBQThCYixPQUE5QixFQUF1Q0UsS0FBdkMsRUFBOEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUlBLEtBQUssQ0FBQ0YsT0FBTixLQUFrQkEsT0FBdEIsRUFBK0I7QUFDN0IsV0FBTyxFQUFQO0FBQ0Q7O0FBRUQsTUFBTUYsS0FBSyxHQUFHSSxLQUFLLENBQUNGLE9BQU4sSUFBaUIsQ0FBQ0EsT0FBbEIsR0FDWjtBQUNBO0FBQ0FFLEVBQUFBLEtBQUssQ0FBQ0osS0FBTixHQUFjLENBSEYsQ0FJWjtBQUNBO0FBTFksSUFNVkksS0FBSyxDQUFDSixLQUFOLEdBQWMsQ0FObEI7QUFRQSxTQUFPO0FBQ0xBLElBQUFBLEtBQUssRUFBTEE7QUFESyxHQUFQO0FBR0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgZ2VvVmlld3BvcnQgZnJvbSAnQG1hcGJveC9nZW8tdmlld3BvcnQnO1xuXG4vKipcbiAqIFVwZGF0ZXJzIGZvciBgbWFwU3RhdGVgIHJlZHVjZXIuIENhbiBiZSB1c2VkIGluIHlvdXIgcm9vdCByZWR1Y2VyIHRvIGRpcmVjdGx5IG1vZGlmeSBrZXBsZXIuZ2wncyBzdGF0ZS5cbiAqIFJlYWQgbW9yZSBhYm91dCBbVXNpbmcgdXBkYXRlcnNdKC4uL2FkdmFuY2VkLXVzYWdlL3VzaW5nLXVwZGF0ZXJzLm1kKVxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqXG4gKiBpbXBvcnQga2VwbGVyR2xSZWR1Y2VyLCB7bWFwU3RhdGVVcGRhdGVyc30gZnJvbSAna2VwbGVyLmdsL3JlZHVjZXJzJztcbiAqIC8vIFJvb3QgUmVkdWNlclxuICogY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICogIGtlcGxlckdsOiBrZXBsZXJHbFJlZHVjZXIsXG4gKiAgYXBwOiBhcHBSZWR1Y2VyXG4gKiB9KTtcbiAqXG4gKiBjb25zdCBjb21wb3NlZFJlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICogIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAqICAgIC8vIGNsaWNrIGJ1dHRvbiB0byBjbG9zZSBzaWRlIHBhbmVsXG4gKiAgICBjYXNlICdDTElDS19CVVRUT04nOlxuICogICAgICByZXR1cm4ge1xuICogICAgICAgIC4uLnN0YXRlLFxuICogICAgICAgIGtlcGxlckdsOiB7XG4gKiAgICAgICAgICAuLi5zdGF0ZS5rZXBsZXJHbCxcbiAqICAgICAgICAgIGZvbzoge1xuICogICAgICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wuZm9vLFxuICogICAgICAgICAgICAgbWFwU3RhdGU6IG1hcFN0YXRlVXBkYXRlcnMuZml0Qm91bmRzVXBkYXRlcihcbiAqICAgICAgICAgICAgICAgbWFwU3RhdGUsIHtwYXlsb2FkOiBbMTI3LjM0LCAzMS4wOSwgMTI3LjU2LCAzMS41OV1dfVxuICogICAgICAgICAgICAgKVxuICogICAgICAgICAgfVxuICogICAgICAgIH1cbiAqICAgICAgfTtcbiAqICB9XG4gKiAgcmV0dXJuIHJlZHVjZXJzKHN0YXRlLCBhY3Rpb24pO1xuICogfTtcbiAqXG4gKiBleHBvcnQgZGVmYXVsdCBjb21wb3NlZFJlZHVjZXI7XG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5jb25zdCBtYXBTdGF0ZVVwZGF0ZXJzID0gbnVsbDtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cblxuLyoqXG4gKiBEZWZhdWx0IGluaXRpYWwgYG1hcFN0YXRlYFxuICogQG1lbWJlcm9mIG1hcFN0YXRlVXBkYXRlcnNcbiAqIEBjb25zdGFudFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHBpdGNoIERlZmF1bHQ6IGAwYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGJlYXJpbmcgRGVmYXVsdDogYDBgXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGF0aXR1ZGUgRGVmYXVsdDogYDM3Ljc1MDQzYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxvbmdpdHVkZSBEZWZhdWx0OiBgLTEyMi4zNDY3OWBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB6b29tIERlZmF1bHQ6IGA5YFxuICogQHByb3BlcnR5IHtib29sZWFufSBkcmFnUm90YXRlIERlZmF1bHQ6IGBmYWxzZWBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCBEZWZhdWx0OiBgODAwYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodCBEZWZhdWx0OiBgODAwYFxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1NwbGl0IERlZmF1bHQ6IGBmYWxzZWBcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfTUFQX1NUQVRFID0ge1xuICBwaXRjaDogMCxcbiAgYmVhcmluZzogMCxcbiAgbGF0aXR1ZGU6IDM3Ljc1MDQzLFxuICBsb25naXR1ZGU6IC0xMjIuMzQ2NzksXG4gIHpvb206IDksXG4gIGRyYWdSb3RhdGU6IGZhbHNlLFxuICB3aWR0aDogODAwLFxuICBoZWlnaHQ6IDgwMCxcbiAgaXNTcGxpdDogZmFsc2Vcbn07XG5cbi8qIFVwZGF0ZXJzICovXG4vKipcbiAqIFVwZGF0ZSBtYXAgdmlld3BvcnRcbiAqIEBtZW1iZXJvZiBtYXBTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZCAtIHZpZXdwb3J0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZU1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIC4uLihhY3Rpb24ucGF5bG9hZCB8fCB7fSlcbn0pO1xuXG4vKipcbiAqIEZpdCBtYXAgdmlld3BvcnQgdG8gYm91bmRzXG4gKiBAbWVtYmVyb2YgbWFwU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcGFyYW0ge251bWJlcltdfSBhY3Rpb24ucGF5bG9hZCAtIGJvdW5kcyBhcyBgW2xuZ01pbiwgbGF0TWluLCBsbmdNYXgsIGxhdE1heF1gXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGZpdEJvdW5kc1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCBib3VuZHMgPSBhY3Rpb24ucGF5bG9hZDtcbiAgY29uc3Qge2NlbnRlciwgem9vbX0gPSBnZW9WaWV3cG9ydC52aWV3cG9ydChib3VuZHMsIFtcbiAgICBzdGF0ZS53aWR0aCxcbiAgICBzdGF0ZS5oZWlnaHRcbiAgXSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXRpdHVkZTogY2VudGVyWzFdLFxuICAgIGxvbmdpdHVkZTogY2VudGVyWzBdLFxuICAgIHpvb21cbiAgfTtcbn07XG5cbi8qKlxuICogVG9nZ2xlIGJldHdlZW4gM2QgYW5kIDJkIG1hcC5cbiAqIEBtZW1iZXJvZiBtYXBTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlUGVyc3BlY3RpdmVVcGRhdGVyID0gKHN0YXRlKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgLi4ue1xuICAgIHBpdGNoOiBzdGF0ZS5kcmFnUm90YXRlID8gMCA6IDUwLFxuICAgIGJlYXJpbmc6IHN0YXRlLmRyYWdSb3RhdGUgPyAwIDogMjRcbiAgfSxcbiAgZHJhZ1JvdGF0ZTogIXN0YXRlLmRyYWdSb3RhdGVcbn0pO1xuXG4vLyBjb25zaWRlciBjYXNlIHdoZXJlIHlvdSBoYXZlIGEgc3BsaXQgbWFwIGFuZCB1c2VyIHdhbnRzIHRvIHJlc2V0XG4vKipcbiAqIFVwZGF0ZSBgbWFwU3RhdGVgIHRvIHByb3BhZ2F0ZSBhIG5ldyBjb25maWdcbiAqIEBtZW1iZXJvZiBtYXBTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucGF5bG9hZCAtIHNhdmVkIG1hcCBjb25maWdcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcmVjZWl2ZU1hcENvbmZpZ1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7aXNTcGxpdCA9IGZhbHNlfSA9IGFjdGlvbi5wYXlsb2FkLm1hcFN0YXRlIHx8IHt9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgLi4uKGFjdGlvbi5wYXlsb2FkLm1hcFN0YXRlIHx8IHt9KSxcbiAgICBpc1NwbGl0LFxuICAgIC4uLmdldE1hcERpbUZvclNwbGl0TWFwKGlzU3BsaXQsIHN0YXRlKVxuICB9O1xufTtcblxuLyoqXG4gKiBUb2dnbGUgYmV0d2VlbiBvbmUgb3Igc3BsaXQgbWFwc1xuICogQG1lbWJlcm9mIG1hcFN0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVTcGxpdE1hcFVwZGF0ZXIgPSAoc3RhdGUpID0+ICh7XG4gIC4uLnN0YXRlLFxuICBpc1NwbGl0OiAhc3RhdGUuaXNTcGxpdCxcbiAgLi4uZ2V0TWFwRGltRm9yU3BsaXRNYXAoIXN0YXRlLmlzU3BsaXQsIHN0YXRlKVxufSk7XG5cbi8vIEhlbHBlcnNcbmZ1bmN0aW9uIGdldE1hcERpbUZvclNwbGl0TWFwKGlzU3BsaXQsIHN0YXRlKSB7XG4gIC8vIGNhc2VzOlxuICAvLyAxLiBzdGF0ZSBzcGxpdDogdHJ1ZSAtIGlzU3BsaXQ6IHRydWVcbiAgLy8gZG8gbm90aGluZ1xuICAvLyAyLiBzdGF0ZSBzcGxpdDogZmFsc2UgLSBpc1NwbGl0OiBmYWxzZVxuICAvLyBkbyBub3RoaW5nXG4gIGlmIChzdGF0ZS5pc1NwbGl0ID09PSBpc1NwbGl0KSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG5cbiAgY29uc3Qgd2lkdGggPSBzdGF0ZS5pc1NwbGl0ICYmICFpc1NwbGl0ID9cbiAgICAvLyAzLiBzdGF0ZSBzcGxpdDogdHJ1ZSAtIGlzU3BsaXQ6IGZhbHNlXG4gICAgLy8gZG91YmxlIHdpZHRoXG4gICAgc3RhdGUud2lkdGggKiAyXG4gICAgLy8gNC4gc3RhdGUgc3BsaXQ6IGZhbHNlIC0gaXNTcGxpdDogdHJ1ZVxuICAgIC8vIHNwbGl0IHdpZHRoXG4gICAgOiBzdGF0ZS53aWR0aCAvIDI7XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aFxuICB9O1xufVxuIl19