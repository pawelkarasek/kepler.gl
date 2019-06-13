"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keplerGlInit = exports.receiveMapConfig = exports.resetMapConfig = exports.addDataToMap = void 0;

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

var _reduxActions = require("redux-actions");

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
 * Add data to kepler.gl reducer, prepare map with preset configuration if config is passed.
 * Kepler.gl provides a handy set of utils to parse data from different format to the `data` object required in dataset. You rarely need to manually format the data obejct.
 *
 * Use `KeplerGlSchema.getConfigToSave` to generate a json blob of the currents instance config.
 * The config object value will always have higher precedence than the options properties.
 *
 * Kepler.gl uses `dataId` in the config to match with loaded dataset. If you pass a config object, you need
 * to match the `info.id` of your dataset to the `dataId` in each `layer`, `filter` and `interactionConfig.tooltips.fieldsToShow`
 *
 * @memberof main
 * @param {Object} data
 * @param {Array<Object>|Object} data.datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {Object} data.datasets.info -info of a dataset
 * @param {string} data.datasets.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @param {string} data.datasets.info.label - A display name of this dataset
 * @param {Object} data.datasets.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @param {Array<Object>} data.datasets.data.fields - ***required** Array of fields,
 * @param {string} data.datasets.data.fields.name - ***required** Name of the field,
 * @param {Array<Array>} data.datasets.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`
 *
 * @param {Object} data.options
 * @param {boolean} data.options.centerMap `default: true` if `centerMap` is set to `true` kepler.gl will
 * place the map view within the data points boundaries
 * @param {boolean} data.options.readOnly `default: false` if `readOnly` is set to `true`
 * the left setting panel will be hidden
 * @param {Object} data.config this object will contain the full kepler.gl instance configuration {mapState, mapStyle, visState}
 * @public
 * @example
 *
 * // app.js
 * import {addDataToMap} from 'kepler.gl/actions';
 *
 * const sampleTripData = {
 *  fields: [
 *    {name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
 *    {name: 'pickup_longitude', format: '', type: 'real'},
 *    {name: 'pickup_latitude', format: '', type: 'real'}
 *  ],
 *  rows: [
 *    ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
 *    ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
 *    ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576],
 *  ]
 * };
 *
 * const sampleConfig = {
 *   visState: {
 *     filters: [
 *       {
 *         id: 'me',
 *         dataId: 'test_trip_data',
 *         name: 'tpep_pickup_datetime',
 *         type: 'timeRange',
 *         enlarged: true
 *       }
 *     ]
 *   }
 * }
 *
 * this.props.dispatch(
 *   addDataToMap({
 *     datasets: {
 *       info: {
 *         label: 'Sample Taxi Trips in New York City',
 *         id: 'test_trip_data'
 *       },
 *       data: sampleTripData
 *     },
 *     option: {
 *       centerMap: true,
 *       readOnly: false
 *     },
 *     config: sampleConfig
 *   })
 * );
 */
var addDataToMap = (0, _reduxActions.createAction)(_actionTypes["default"].ADD_DATA_TO_MAP, function (data) {
  return data;
});
/**
 * Reset all sub-reducers to its initial state. This can be used to clear out all configuration in the reducer.
 * @memberof main
 * @public
 */

exports.addDataToMap = addDataToMap;
var resetMapConfig = (0, _reduxActions.createAction)(_actionTypes["default"].RESET_MAP_CONFIG);
/**
 * Pass config to kepler.gl instance, prepare the state with preset configs.
 * Calling `KeplerGlSchema.parseSavedConfig` to convert saved config before passing it in is required.
 *
 * You can call `receiveMapConfig` before passing in any data. The reducer will store layer and filter config, waiting for
 * data to come in. When data arrives, you can call `addDataToMap` without passing any config, and the reducer will try to match
 * preloaded configs. This behavior is designed to allow asynchronous data loading.
 *
 * It is also useful when you want to prepare the kepler.gl instance with some preset layer and filter settings.
 * **Note** Sequence is important, `receiveMapConfig` needs to be called __before__ data is loaded. Currently kepler.gl doesn't allow calling `receiveMapConfig` after data is loaded.
 * It will reset current configuration first then apply config to it.
 * @memberof main
 * @param {Object} config - ***required** The Config Object
 * @public
 * @example
 * import {receiveMapConfig} from 'kepler.gl/actions';
 * import KeplerGlSchema from 'kepler.gl/schemas';
 *
 * const parsedConfig = KeplerGlSchema.parseSavedConfig(config);
 * this.props.dispatch(receiveMapConfig(parsedConfig));
 */

exports.resetMapConfig = resetMapConfig;
var receiveMapConfig = (0, _reduxActions.createAction)(_actionTypes["default"].RECEIVE_MAP_CONFIG, function (config) {
  return config;
});
/**
 * Initialize kepler.gl reducer. It is used to pass in `mapboxApiAccessToken` to `mapStyle` reducer.
 * @memberof main
 * @param {Object} payload
 * @param {string} payload.mapboxApiAccessToken - mapboxApiAccessToken to be saved to mapStyle reducer
 * @public
 */

exports.receiveMapConfig = receiveMapConfig;
var keplerGlInit = (0, _reduxActions.createAction)(_actionTypes["default"].INIT, function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      mapboxApiAccessToken = _ref.mapboxApiAccessToken;

  return {
    mapboxApiAccessToken: mapboxApiAccessToken
  };
});
/**
 * This declaration is needed to group actions in docs
 */

/**
 * Main kepler.gl actions, these actions handles loading data and config into kepler.gl reducer. These actions
 * is listened by all subreducers,
 * @public
 */

/* eslint-disable no-unused-vars */

exports.keplerGlInit = keplerGlInit;
var main = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2FjdGlvbnMuanMiXSwibmFtZXMiOlsiYWRkRGF0YVRvTWFwIiwiQWN0aW9uVHlwZXMiLCJBRERfREFUQV9UT19NQVAiLCJkYXRhIiwicmVzZXRNYXBDb25maWciLCJSRVNFVF9NQVBfQ09ORklHIiwicmVjZWl2ZU1hcENvbmZpZyIsIlJFQ0VJVkVfTUFQX0NPTkZJRyIsImNvbmZpZyIsImtlcGxlckdsSW5pdCIsIklOSVQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm1haW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThFSyxJQUFNQSxZQUFZLEdBQUcsZ0NBQzFCQyx3QkFBWUMsZUFEYyxFQUUxQixVQUFBQyxJQUFJO0FBQUEsU0FBSUEsSUFBSjtBQUFBLENBRnNCLENBQXJCO0FBS1A7Ozs7Ozs7QUFLTyxJQUFNQyxjQUFjLEdBQUcsZ0NBQzVCSCx3QkFBWUksZ0JBRGdCLENBQXZCO0FBSVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJPLElBQU1DLGdCQUFnQixHQUFHLGdDQUM5Qkwsd0JBQVlNLGtCQURrQixFQUU5QixVQUFBQyxNQUFNO0FBQUEsU0FBSUEsTUFBSjtBQUFBLENBRndCLENBQXpCO0FBS1A7Ozs7Ozs7OztBQU9PLElBQU1DLFlBQVksR0FBSSxnQ0FDM0JSLHdCQUFZUyxJQURlLEVBRTNCO0FBQUEsaUZBQTBCLEVBQTFCO0FBQUEsTUFBRUMsb0JBQUYsUUFBRUEsb0JBQUY7O0FBQUEsU0FBa0M7QUFBQ0EsSUFBQUEsb0JBQW9CLEVBQXBCQTtBQUFELEdBQWxDO0FBQUEsQ0FGMkIsQ0FBdEI7QUFLUDs7OztBQUdBOzs7Ozs7QUFLQTs7O0FBQ0EsSUFBTUMsSUFBSSxHQUFHLElBQWI7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBBY3Rpb25UeXBlcyBmcm9tICdjb25zdGFudHMvYWN0aW9uLXR5cGVzJztcbmltcG9ydCB7Y3JlYXRlQWN0aW9ufSBmcm9tICdyZWR1eC1hY3Rpb25zJztcblxuICAvKipcbiAgICogQWRkIGRhdGEgdG8ga2VwbGVyLmdsIHJlZHVjZXIsIHByZXBhcmUgbWFwIHdpdGggcHJlc2V0IGNvbmZpZ3VyYXRpb24gaWYgY29uZmlnIGlzIHBhc3NlZC5cbiAgICogS2VwbGVyLmdsIHByb3ZpZGVzIGEgaGFuZHkgc2V0IG9mIHV0aWxzIHRvIHBhcnNlIGRhdGEgZnJvbSBkaWZmZXJlbnQgZm9ybWF0IHRvIHRoZSBgZGF0YWAgb2JqZWN0IHJlcXVpcmVkIGluIGRhdGFzZXQuIFlvdSByYXJlbHkgbmVlZCB0byBtYW51YWxseSBmb3JtYXQgdGhlIGRhdGEgb2JlamN0LlxuICAgKlxuICAgKiBVc2UgYEtlcGxlckdsU2NoZW1hLmdldENvbmZpZ1RvU2F2ZWAgdG8gZ2VuZXJhdGUgYSBqc29uIGJsb2Igb2YgdGhlIGN1cnJlbnRzIGluc3RhbmNlIGNvbmZpZy5cbiAgICogVGhlIGNvbmZpZyBvYmplY3QgdmFsdWUgd2lsbCBhbHdheXMgaGF2ZSBoaWdoZXIgcHJlY2VkZW5jZSB0aGFuIHRoZSBvcHRpb25zIHByb3BlcnRpZXMuXG4gICAqXG4gICAqIEtlcGxlci5nbCB1c2VzIGBkYXRhSWRgIGluIHRoZSBjb25maWcgdG8gbWF0Y2ggd2l0aCBsb2FkZWQgZGF0YXNldC4gSWYgeW91IHBhc3MgYSBjb25maWcgb2JqZWN0LCB5b3UgbmVlZFxuICAgKiB0byBtYXRjaCB0aGUgYGluZm8uaWRgIG9mIHlvdXIgZGF0YXNldCB0byB0aGUgYGRhdGFJZGAgaW4gZWFjaCBgbGF5ZXJgLCBgZmlsdGVyYCBhbmQgYGludGVyYWN0aW9uQ29uZmlnLnRvb2x0aXBzLmZpZWxkc1RvU2hvd2BcbiAgICpcbiAgICogQG1lbWJlcm9mIG1haW5cbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fE9iamVjdH0gZGF0YS5kYXRhc2V0cyAtICoqKnJlcXVpcmVkKiogZGF0YXNldHMgY2FuIGJlIGEgZGF0YXNldCBvciBhbiBhcnJheSBvZiBkYXRhc2V0c1xuICAgKiBFYWNoIGRhdGFzZXQgb2JqZWN0IG5lZWRzIHRvIGhhdmUgYGluZm9gIGFuZCBgZGF0YWAgcHJvcGVydHkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLmRhdGFzZXRzLmluZm8gLWluZm8gb2YgYSBkYXRhc2V0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLmRhdGFzZXRzLmluZm8uaWQgLSBpZCBvZiB0aGlzIGRhdGFzZXQuIElmIGNvbmZpZyBpcyBkZWZpbmVkLCBgaWRgIHNob3VsZCBtYXRjaGVzIHRoZSBgZGF0YUlkYCBpbiBjb25maWcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLmRhdGFzZXRzLmluZm8ubGFiZWwgLSBBIGRpc3BsYXkgbmFtZSBvZiB0aGlzIGRhdGFzZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEuZGF0YXNldHMuZGF0YSAtICoqKnJlcXVpcmVkKiogVGhlIGRhdGEgb2JqZWN0LCBpbiBhIHRhYnVsYXIgZm9ybWF0IHdpdGggMiBwcm9wZXJ0aWVzIGBmaWVsZHNgIGFuZCBgcm93c2BcbiAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBkYXRhLmRhdGFzZXRzLmRhdGEuZmllbGRzIC0gKioqcmVxdWlyZWQqKiBBcnJheSBvZiBmaWVsZHMsXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhLmRhdGFzZXRzLmRhdGEuZmllbGRzLm5hbWUgLSAqKipyZXF1aXJlZCoqIE5hbWUgb2YgdGhlIGZpZWxkLFxuICAgKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gZGF0YS5kYXRhc2V0cy5kYXRhLnJvd3MgLSAqKipyZXF1aXJlZCoqIEFycmF5IG9mIHJvd3MsIGluIGEgdGFidWxhciBmb3JtYXQgd2l0aCBgZmllbGRzYCBhbmQgYHJvd3NgXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhLm9wdGlvbnNcbiAgICogQHBhcmFtIHtib29sZWFufSBkYXRhLm9wdGlvbnMuY2VudGVyTWFwIGBkZWZhdWx0OiB0cnVlYCBpZiBgY2VudGVyTWFwYCBpcyBzZXQgdG8gYHRydWVgIGtlcGxlci5nbCB3aWxsXG4gICAqIHBsYWNlIHRoZSBtYXAgdmlldyB3aXRoaW4gdGhlIGRhdGEgcG9pbnRzIGJvdW5kYXJpZXNcbiAgICogQHBhcmFtIHtib29sZWFufSBkYXRhLm9wdGlvbnMucmVhZE9ubHkgYGRlZmF1bHQ6IGZhbHNlYCBpZiBgcmVhZE9ubHlgIGlzIHNldCB0byBgdHJ1ZWBcbiAgICogdGhlIGxlZnQgc2V0dGluZyBwYW5lbCB3aWxsIGJlIGhpZGRlblxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YS5jb25maWcgdGhpcyBvYmplY3Qgd2lsbCBjb250YWluIHRoZSBmdWxsIGtlcGxlci5nbCBpbnN0YW5jZSBjb25maWd1cmF0aW9uIHttYXBTdGF0ZSwgbWFwU3R5bGUsIHZpc1N0YXRlfVxuICAgKiBAcHVibGljXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIC8vIGFwcC5qc1xuICAgKiBpbXBvcnQge2FkZERhdGFUb01hcH0gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICAgKlxuICAgKiBjb25zdCBzYW1wbGVUcmlwRGF0YSA9IHtcbiAgICogIGZpZWxkczogW1xuICAgKiAgICB7bmFtZTogJ3RwZXBfcGlja3VwX2RhdGV0aW1lJywgZm9ybWF0OiAnWVlZWS1NLUQgSDptOnMnLCB0eXBlOiAndGltZXN0YW1wJ30sXG4gICAqICAgIHtuYW1lOiAncGlja3VwX2xvbmdpdHVkZScsIGZvcm1hdDogJycsIHR5cGU6ICdyZWFsJ30sXG4gICAqICAgIHtuYW1lOiAncGlja3VwX2xhdGl0dWRlJywgZm9ybWF0OiAnJywgdHlwZTogJ3JlYWwnfVxuICAgKiAgXSxcbiAgICogIHJvd3M6IFtcbiAgICogICAgWycyMDE1LTAxLTE1IDE5OjA1OjM5ICswMDowMCcsIC03My45OTM4OTY0OCwgNDAuNzUwMTEwNjNdLFxuICAgKiAgICBbJzIwMTUtMDEtMTUgMTk6MDU6MzkgKzAwOjAwJywgLTczLjk3NjQyNTE3LCA0MC43Mzk4MTA5NF0sXG4gICAqICAgIFsnMjAxNS0wMS0xNSAxOTowNTo0MCArMDA6MDAnLCAtNzMuOTY4NzA0MjIsIDQwLjc1NDI0NTc2XSxcbiAgICogIF1cbiAgICogfTtcbiAgICpcbiAgICogY29uc3Qgc2FtcGxlQ29uZmlnID0ge1xuICAgKiAgIHZpc1N0YXRlOiB7XG4gICAqICAgICBmaWx0ZXJzOiBbXG4gICAqICAgICAgIHtcbiAgICogICAgICAgICBpZDogJ21lJyxcbiAgICogICAgICAgICBkYXRhSWQ6ICd0ZXN0X3RyaXBfZGF0YScsXG4gICAqICAgICAgICAgbmFtZTogJ3RwZXBfcGlja3VwX2RhdGV0aW1lJyxcbiAgICogICAgICAgICB0eXBlOiAndGltZVJhbmdlJyxcbiAgICogICAgICAgICBlbmxhcmdlZDogdHJ1ZVxuICAgKiAgICAgICB9XG4gICAqICAgICBdXG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHRoaXMucHJvcHMuZGlzcGF0Y2goXG4gICAqICAgYWRkRGF0YVRvTWFwKHtcbiAgICogICAgIGRhdGFzZXRzOiB7XG4gICAqICAgICAgIGluZm86IHtcbiAgICogICAgICAgICBsYWJlbDogJ1NhbXBsZSBUYXhpIFRyaXBzIGluIE5ldyBZb3JrIENpdHknLFxuICAgKiAgICAgICAgIGlkOiAndGVzdF90cmlwX2RhdGEnXG4gICAqICAgICAgIH0sXG4gICAqICAgICAgIGRhdGE6IHNhbXBsZVRyaXBEYXRhXG4gICAqICAgICB9LFxuICAgKiAgICAgb3B0aW9uOiB7XG4gICAqICAgICAgIGNlbnRlck1hcDogdHJ1ZSxcbiAgICogICAgICAgcmVhZE9ubHk6IGZhbHNlXG4gICAqICAgICB9LFxuICAgKiAgICAgY29uZmlnOiBzYW1wbGVDb25maWdcbiAgICogICB9KVxuICAgKiApO1xuICAgKi9cbmV4cG9ydCBjb25zdCBhZGREYXRhVG9NYXAgPSBjcmVhdGVBY3Rpb24oXG4gIEFjdGlvblR5cGVzLkFERF9EQVRBX1RPX01BUCxcbiAgZGF0YSA9PiBkYXRhXG4pO1xuXG4vKipcbiAqIFJlc2V0IGFsbCBzdWItcmVkdWNlcnMgdG8gaXRzIGluaXRpYWwgc3RhdGUuIFRoaXMgY2FuIGJlIHVzZWQgdG8gY2xlYXIgb3V0IGFsbCBjb25maWd1cmF0aW9uIGluIHRoZSByZWR1Y2VyLlxuICogQG1lbWJlcm9mIG1haW5cbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc2V0TWFwQ29uZmlnID0gY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5SRVNFVF9NQVBfQ09ORklHXG4pO1xuXG4vKipcbiAqIFBhc3MgY29uZmlnIHRvIGtlcGxlci5nbCBpbnN0YW5jZSwgcHJlcGFyZSB0aGUgc3RhdGUgd2l0aCBwcmVzZXQgY29uZmlncy5cbiAqIENhbGxpbmcgYEtlcGxlckdsU2NoZW1hLnBhcnNlU2F2ZWRDb25maWdgIHRvIGNvbnZlcnQgc2F2ZWQgY29uZmlnIGJlZm9yZSBwYXNzaW5nIGl0IGluIGlzIHJlcXVpcmVkLlxuICpcbiAqIFlvdSBjYW4gY2FsbCBgcmVjZWl2ZU1hcENvbmZpZ2AgYmVmb3JlIHBhc3NpbmcgaW4gYW55IGRhdGEuIFRoZSByZWR1Y2VyIHdpbGwgc3RvcmUgbGF5ZXIgYW5kIGZpbHRlciBjb25maWcsIHdhaXRpbmcgZm9yXG4gKiBkYXRhIHRvIGNvbWUgaW4uIFdoZW4gZGF0YSBhcnJpdmVzLCB5b3UgY2FuIGNhbGwgYGFkZERhdGFUb01hcGAgd2l0aG91dCBwYXNzaW5nIGFueSBjb25maWcsIGFuZCB0aGUgcmVkdWNlciB3aWxsIHRyeSB0byBtYXRjaFxuICogcHJlbG9hZGVkIGNvbmZpZ3MuIFRoaXMgYmVoYXZpb3IgaXMgZGVzaWduZWQgdG8gYWxsb3cgYXN5bmNocm9ub3VzIGRhdGEgbG9hZGluZy5cbiAqXG4gKiBJdCBpcyBhbHNvIHVzZWZ1bCB3aGVuIHlvdSB3YW50IHRvIHByZXBhcmUgdGhlIGtlcGxlci5nbCBpbnN0YW5jZSB3aXRoIHNvbWUgcHJlc2V0IGxheWVyIGFuZCBmaWx0ZXIgc2V0dGluZ3MuXG4gKiAqKk5vdGUqKiBTZXF1ZW5jZSBpcyBpbXBvcnRhbnQsIGByZWNlaXZlTWFwQ29uZmlnYCBuZWVkcyB0byBiZSBjYWxsZWQgX19iZWZvcmVfXyBkYXRhIGlzIGxvYWRlZC4gQ3VycmVudGx5IGtlcGxlci5nbCBkb2Vzbid0IGFsbG93IGNhbGxpbmcgYHJlY2VpdmVNYXBDb25maWdgIGFmdGVyIGRhdGEgaXMgbG9hZGVkLlxuICogSXQgd2lsbCByZXNldCBjdXJyZW50IGNvbmZpZ3VyYXRpb24gZmlyc3QgdGhlbiBhcHBseSBjb25maWcgdG8gaXQuXG4gKiBAbWVtYmVyb2YgbWFpblxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyAtICoqKnJlcXVpcmVkKiogVGhlIENvbmZpZyBPYmplY3RcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge3JlY2VpdmVNYXBDb25maWd9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCBLZXBsZXJHbFNjaGVtYSBmcm9tICdrZXBsZXIuZ2wvc2NoZW1hcyc7XG4gKlxuICogY29uc3QgcGFyc2VkQ29uZmlnID0gS2VwbGVyR2xTY2hlbWEucGFyc2VTYXZlZENvbmZpZyhjb25maWcpO1xuICogdGhpcy5wcm9wcy5kaXNwYXRjaChyZWNlaXZlTWFwQ29uZmlnKHBhcnNlZENvbmZpZykpO1xuICovXG5leHBvcnQgY29uc3QgcmVjZWl2ZU1hcENvbmZpZyA9IGNyZWF0ZUFjdGlvbihcbiAgQWN0aW9uVHlwZXMuUkVDRUlWRV9NQVBfQ09ORklHLFxuICBjb25maWcgPT4gY29uZmlnXG4pO1xuXG4vKipcbiAqIEluaXRpYWxpemUga2VwbGVyLmdsIHJlZHVjZXIuIEl0IGlzIHVzZWQgdG8gcGFzcyBpbiBgbWFwYm94QXBpQWNjZXNzVG9rZW5gIHRvIGBtYXBTdHlsZWAgcmVkdWNlci5cbiAqIEBtZW1iZXJvZiBtYWluXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICogQHBhcmFtIHtzdHJpbmd9IHBheWxvYWQubWFwYm94QXBpQWNjZXNzVG9rZW4gLSBtYXBib3hBcGlBY2Nlc3NUb2tlbiB0byBiZSBzYXZlZCB0byBtYXBTdHlsZSByZWR1Y2VyXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBrZXBsZXJHbEluaXQgPSAgY3JlYXRlQWN0aW9uKFxuICBBY3Rpb25UeXBlcy5JTklULFxuICAoe21hcGJveEFwaUFjY2Vzc1Rva2VufSA9IHt9KSA9PiAoe21hcGJveEFwaUFjY2Vzc1Rva2VufSlcbik7XG5cbi8qKlxuICogVGhpcyBkZWNsYXJhdGlvbiBpcyBuZWVkZWQgdG8gZ3JvdXAgYWN0aW9ucyBpbiBkb2NzXG4gKi9cbi8qKlxuICogTWFpbiBrZXBsZXIuZ2wgYWN0aW9ucywgdGhlc2UgYWN0aW9ucyBoYW5kbGVzIGxvYWRpbmcgZGF0YSBhbmQgY29uZmlnIGludG8ga2VwbGVyLmdsIHJlZHVjZXIuIFRoZXNlIGFjdGlvbnNcbiAqIGlzIGxpc3RlbmVkIGJ5IGFsbCBzdWJyZWR1Y2VycyxcbiAqIEBwdWJsaWNcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmNvbnN0IG1haW4gPSBudWxsO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuIl19