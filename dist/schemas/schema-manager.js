"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _window = require("global/window");

var _visStateSchema = _interopRequireDefault(require("./vis-state-schema"));

var _datasetSchema = _interopRequireDefault(require("./dataset-schema"));

var _mapStyleSchema = _interopRequireDefault(require("./map-style-schema"));

var _mapStateSchema = _interopRequireDefault(require("./map-state-schema"));

var _versions = require("./versions");

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
var REDUCER_SCHEMAS = {
  visState: _visStateSchema["default"],
  mapState: _mapStateSchema["default"],
  mapStyle: _mapStyleSchema["default"]
};

var KeplerGLSchema =
/*#__PURE__*/
function () {
  function KeplerGLSchema() {
    (0, _classCallCheck2["default"])(this, KeplerGLSchema);
    this._validVersions = _versions.VERSIONS;
    this._version = _versions.CURRENT_VERSION;
    this._reducerSchemas = REDUCER_SCHEMAS;
    this._datasetSchema = _datasetSchema["default"];
    this._datasetLastSaved = null;
    this._savedDataset = null;
  }
  /**
   * stateToSave = {
   *   datasets: [
   *     {
   *       version: 'v0',
   *       data: {id, label, color, allData, fields}
   *     },
   *     {
   *       version: 'v0',
   *       data: {id, label, color, allData, fields}
   *     }
   *   ],
   *   config: {
   *     version: 'v0',
   *     config: {}
   *   },
   *   info: {
   *     app: 'kepler.gl',
   *     create_at: 'Mon May 28 2018 21:04:46 GMT-0700 (PDT)'
   *   }
   * }
   *
   * Get config and data of current map to save
   * @param {Object} state
   * @returns {{datasets: Object[], config: Object, info: Object}} app state to save
   */


  (0, _createClass2["default"])(KeplerGLSchema, [{
    key: "save",
    value: function save(state) {
      return {
        datasets: this.getDatasetToSave(state),
        config: this.getConfigToSave(state),
        info: {
          app: 'kepler.gl',
          created_at: new Date().toString()
        }
      };
    }
  }, {
    key: "load",
    value: function load(savedDatasets, savedConfig) {
      return {
        datasets: this.parseSavedData(savedDatasets),
        config: savedConfig ? this.parseSavedConfig(savedConfig) : undefined
      };
    }
    /**
     * Get data to save
     * @param {Object} state - app state
     * @returns {{version: String, data: Object}} - dataset to save
     */

  }, {
    key: "getDatasetToSave",
    value: function getDatasetToSave(state) {
      var _this = this;

      var dataChangedSinceLastSave = this.hasDataChanged(state);

      if (!dataChangedSinceLastSave) {
        return this._savedDataset;
      }

      var visState = state.visState;
      var datasets = Object.values(visState.datasets).map(function (ds) {
        return {
          version: _this._version,
          data: _this._datasetSchema[_this._version].save(ds)
        };
      }); // keep a copy of formatted datasets to save

      this._datasetLastSaved = visState.datasets;
      this._savedDataset = datasets;
      return datasets;
    }
    /**
     * Get App config to save
     * @param {Object} state - app state
     * @returns {{version: String, config: Object}} - config to save
     */

  }, {
    key: "getConfigToSave",
    value: function getConfigToSave(state) {
      var _this2 = this;

      var config = Object.keys(this._reducerSchemas).reduce(function (accu, key) {
        return (0, _objectSpread2["default"])({}, accu, _this2._reducerSchemas[key][_this2._version].save(state[key]));
      }, {});
      return {
        version: this._version,
        config: config
      };
    }
    /**
     * Parse saved data
     * @param {Array} datasets
     * @returns {Object | null} - data to save
     */

  }, {
    key: "parseSavedData",
    value: function parseSavedData(datasets) {
      var _this3 = this;

      return datasets.reduce(function (accu, ds) {
        var validVersion = _this3.validateVersion(ds.version);

        if (!validVersion) {
          return accu;
        }

        accu.push(_this3._datasetSchema[validVersion].load(ds.data));
        return accu;
      }, []);
    }
    /**
     * Parse saved App config
     * @param {String} opt.version - config version
     * @param {Object} opt.config - saved config
     * @param {Object} state - current App State
     * @returns {Object | null} - parsed config
     */

  }, {
    key: "parseSavedConfig",
    value: function parseSavedConfig(_ref) {
      var _this4 = this;

      var version = _ref.version,
          config = _ref.config;
      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var validVersion = this.validateVersion(version);

      if (!validVersion) {
        return null;
      }

      return Object.keys(config).reduce(function (accu, key) {
        return (0, _objectSpread2["default"])({}, accu, key in _this4._reducerSchemas ? _this4._reducerSchemas[key][validVersion].load(config[key]) : {});
      }, {});
    }
    /**
     * Validate version
     * @param {String} version
     * @returns {String | null} validVersion
     */

  }, {
    key: "validateVersion",
    value: function validateVersion(version) {
      if (!version) {
        _window.console.error('There is no version number associated with this saved map');

        return null;
      }

      if (!this._validVersions[version]) {
        _window.console.error("".concat(version, " is not a valid version"));

        return null;
      }

      return version;
    }
    /**
     * Check if data has changed since last save
     * @param {Object} state
     * @returns {boolean} - whether data has changed or not
     */

  }, {
    key: "hasDataChanged",
    value: function hasDataChanged(state) {
      return this._datasetLastSaved !== state.visState.datasets;
    }
  }]);
  return KeplerGLSchema;
}();

var KeplerGLSchemaManager = new KeplerGLSchema();
var _default = KeplerGLSchemaManager;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3NjaGVtYS1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIlJFRFVDRVJfU0NIRU1BUyIsInZpc1N0YXRlIiwidmlzU3RhdGVTY2hlbWEiLCJtYXBTdGF0ZSIsIm1hcFN0YXRlU2NoZW1hIiwibWFwU3R5bGUiLCJtYXBTdHlsZVNjaGVtYSIsIktlcGxlckdMU2NoZW1hIiwiX3ZhbGlkVmVyc2lvbnMiLCJWRVJTSU9OUyIsIl92ZXJzaW9uIiwiQ1VSUkVOVF9WRVJTSU9OIiwiX3JlZHVjZXJTY2hlbWFzIiwiX2RhdGFzZXRTY2hlbWEiLCJkYXRhc2V0U2NoZW1hIiwiX2RhdGFzZXRMYXN0U2F2ZWQiLCJfc2F2ZWREYXRhc2V0Iiwic3RhdGUiLCJkYXRhc2V0cyIsImdldERhdGFzZXRUb1NhdmUiLCJjb25maWciLCJnZXRDb25maWdUb1NhdmUiLCJpbmZvIiwiYXBwIiwiY3JlYXRlZF9hdCIsIkRhdGUiLCJ0b1N0cmluZyIsInNhdmVkRGF0YXNldHMiLCJzYXZlZENvbmZpZyIsInBhcnNlU2F2ZWREYXRhIiwicGFyc2VTYXZlZENvbmZpZyIsInVuZGVmaW5lZCIsImRhdGFDaGFuZ2VkU2luY2VMYXN0U2F2ZSIsImhhc0RhdGFDaGFuZ2VkIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwiZHMiLCJ2ZXJzaW9uIiwiZGF0YSIsInNhdmUiLCJrZXlzIiwicmVkdWNlIiwiYWNjdSIsImtleSIsInZhbGlkVmVyc2lvbiIsInZhbGlkYXRlVmVyc2lvbiIsInB1c2giLCJsb2FkIiwiQ29uc29sZSIsImVycm9yIiwiS2VwbGVyR0xTY2hlbWFNYW5hZ2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QztBQUNqQ1csd0JBQVFDLEtBQVIsV0FBaUJaLE9BQWpCOztBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUVELGFBQU9BLE9BQVA7QUFDRDtBQUVEOzs7Ozs7OzttQ0FLZXJCLEssRUFBTztBQUNwQixhQUFPLEtBQUtGLGlCQUFMLEtBQTJCRSxLQUFLLENBQUNoQixRQUFOLENBQWVpQixRQUFqRDtBQUNEOzs7OztBQUdILElBQU1pQyxxQkFBcUIsR0FBRyxJQUFJNUMsY0FBSixFQUE5QjtlQUVlNEMscUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbmltcG9ydCB2aXNTdGF0ZVNjaGVtYSBmcm9tICcuL3Zpcy1zdGF0ZS1zY2hlbWEnO1xuaW1wb3J0IGRhdGFzZXRTY2hlbWEgZnJvbSAnLi9kYXRhc2V0LXNjaGVtYSc7XG5pbXBvcnQgbWFwU3R5bGVTY2hlbWEgZnJvbSAnLi9tYXAtc3R5bGUtc2NoZW1hJztcbmltcG9ydCBtYXBTdGF0ZVNjaGVtYSBmcm9tICcuL21hcC1zdGF0ZS1zY2hlbWEnO1xuXG5pbXBvcnQge0NVUlJFTlRfVkVSU0lPTiwgVkVSU0lPTlN9IGZyb20gJy4vdmVyc2lvbnMnO1xuXG5jb25zdCBSRURVQ0VSX1NDSEVNQVMgPSB7XG4gIHZpc1N0YXRlOiB2aXNTdGF0ZVNjaGVtYSxcbiAgbWFwU3RhdGU6IG1hcFN0YXRlU2NoZW1hLFxuICBtYXBTdHlsZTogbWFwU3R5bGVTY2hlbWFcbn07XG5cbmNsYXNzIEtlcGxlckdMU2NoZW1hIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5fdmFsaWRWZXJzaW9ucyA9IFZFUlNJT05TO1xuICAgIHRoaXMuX3ZlcnNpb24gPSBDVVJSRU5UX1ZFUlNJT047XG4gICAgdGhpcy5fcmVkdWNlclNjaGVtYXMgPSBSRURVQ0VSX1NDSEVNQVM7XG4gICAgdGhpcy5fZGF0YXNldFNjaGVtYSA9IGRhdGFzZXRTY2hlbWE7XG5cbiAgICB0aGlzLl9kYXRhc2V0TGFzdFNhdmVkID0gbnVsbDtcbiAgICB0aGlzLl9zYXZlZERhdGFzZXQgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIHN0YXRlVG9TYXZlID0ge1xuICAgKiAgIGRhdGFzZXRzOiBbXG4gICAqICAgICB7XG4gICAqICAgICAgIHZlcnNpb246ICd2MCcsXG4gICAqICAgICAgIGRhdGE6IHtpZCwgbGFiZWwsIGNvbG9yLCBhbGxEYXRhLCBmaWVsZHN9XG4gICAqICAgICB9LFxuICAgKiAgICAge1xuICAgKiAgICAgICB2ZXJzaW9uOiAndjAnLFxuICAgKiAgICAgICBkYXRhOiB7aWQsIGxhYmVsLCBjb2xvciwgYWxsRGF0YSwgZmllbGRzfVxuICAgKiAgICAgfVxuICAgKiAgIF0sXG4gICAqICAgY29uZmlnOiB7XG4gICAqICAgICB2ZXJzaW9uOiAndjAnLFxuICAgKiAgICAgY29uZmlnOiB7fVxuICAgKiAgIH0sXG4gICAqICAgaW5mbzoge1xuICAgKiAgICAgYXBwOiAna2VwbGVyLmdsJyxcbiAgICogICAgIGNyZWF0ZV9hdDogJ01vbiBNYXkgMjggMjAxOCAyMTowNDo0NiBHTVQtMDcwMCAoUERUKSdcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogR2V0IGNvbmZpZyBhbmQgZGF0YSBvZiBjdXJyZW50IG1hcCB0byBzYXZlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICAgKiBAcmV0dXJucyB7e2RhdGFzZXRzOiBPYmplY3RbXSwgY29uZmlnOiBPYmplY3QsIGluZm86IE9iamVjdH19IGFwcCBzdGF0ZSB0byBzYXZlXG4gICAqL1xuICBzYXZlKHN0YXRlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFzZXRzOiB0aGlzLmdldERhdGFzZXRUb1NhdmUoc3RhdGUpLFxuICAgICAgY29uZmlnOiB0aGlzLmdldENvbmZpZ1RvU2F2ZShzdGF0ZSksXG4gICAgICBpbmZvOiB7XG4gICAgICAgIGFwcDogJ2tlcGxlci5nbCcsXG4gICAgICAgIGNyZWF0ZWRfYXQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBsb2FkKHNhdmVkRGF0YXNldHMsIHNhdmVkQ29uZmlnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRhdGFzZXRzOiB0aGlzLnBhcnNlU2F2ZWREYXRhKHNhdmVkRGF0YXNldHMpLFxuICAgICAgY29uZmlnOiBzYXZlZENvbmZpZyA/IHRoaXMucGFyc2VTYXZlZENvbmZpZyhzYXZlZENvbmZpZykgOiB1bmRlZmluZWRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRhIHRvIHNhdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYXBwIHN0YXRlXG4gICAqIEByZXR1cm5zIHt7dmVyc2lvbjogU3RyaW5nLCBkYXRhOiBPYmplY3R9fSAtIGRhdGFzZXQgdG8gc2F2ZVxuICAgKi9cbiAgZ2V0RGF0YXNldFRvU2F2ZShzdGF0ZSkge1xuICAgIGNvbnN0IGRhdGFDaGFuZ2VkU2luY2VMYXN0U2F2ZSA9IHRoaXMuaGFzRGF0YUNoYW5nZWQoc3RhdGUpO1xuICAgIGlmICghZGF0YUNoYW5nZWRTaW5jZUxhc3RTYXZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2F2ZWREYXRhc2V0O1xuICAgIH1cblxuICAgIGNvbnN0IHt2aXNTdGF0ZX0gPSBzdGF0ZTtcblxuICAgIGNvbnN0IGRhdGFzZXRzID0gT2JqZWN0LnZhbHVlcyh2aXNTdGF0ZS5kYXRhc2V0cykubWFwKGRzID0+ICh7XG4gICAgICB2ZXJzaW9uOiB0aGlzLl92ZXJzaW9uLFxuICAgICAgZGF0YTogdGhpcy5fZGF0YXNldFNjaGVtYVt0aGlzLl92ZXJzaW9uXS5zYXZlKGRzKVxuICAgIH0pKTtcblxuICAgIC8vIGtlZXAgYSBjb3B5IG9mIGZvcm1hdHRlZCBkYXRhc2V0cyB0byBzYXZlXG4gICAgdGhpcy5fZGF0YXNldExhc3RTYXZlZCA9IHZpc1N0YXRlLmRhdGFzZXRzO1xuICAgIHRoaXMuX3NhdmVkRGF0YXNldCA9IGRhdGFzZXRzO1xuXG4gICAgcmV0dXJuIGRhdGFzZXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBBcHAgY29uZmlnIHRvIHNhdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIC0gYXBwIHN0YXRlXG4gICAqIEByZXR1cm5zIHt7dmVyc2lvbjogU3RyaW5nLCBjb25maWc6IE9iamVjdH19IC0gY29uZmlnIHRvIHNhdmVcbiAgICovXG4gIGdldENvbmZpZ1RvU2F2ZShzdGF0ZSkge1xuICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5rZXlzKHRoaXMuX3JlZHVjZXJTY2hlbWFzKS5yZWR1Y2UoXG4gICAgICAoYWNjdSwga2V5KSA9PiAoe1xuICAgICAgICAuLi5hY2N1LFxuICAgICAgICAuLi50aGlzLl9yZWR1Y2VyU2NoZW1hc1trZXldW3RoaXMuX3ZlcnNpb25dLnNhdmUoc3RhdGVba2V5XSlcbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZlcnNpb246IHRoaXMuX3ZlcnNpb24sXG4gICAgICBjb25maWdcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHNhdmVkIGRhdGFcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YXNldHNcbiAgICogQHJldHVybnMge09iamVjdCB8IG51bGx9IC0gZGF0YSB0byBzYXZlXG4gICAqL1xuICBwYXJzZVNhdmVkRGF0YShkYXRhc2V0cykge1xuICAgIHJldHVybiBkYXRhc2V0cy5yZWR1Y2UoKGFjY3UsIGRzKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZFZlcnNpb24gPSB0aGlzLnZhbGlkYXRlVmVyc2lvbihkcy52ZXJzaW9uKTtcbiAgICAgIGlmICghdmFsaWRWZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgfVxuICAgICAgYWNjdS5wdXNoKHRoaXMuX2RhdGFzZXRTY2hlbWFbdmFsaWRWZXJzaW9uXS5sb2FkKGRzLmRhdGEpKTtcbiAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSBzYXZlZCBBcHAgY29uZmlnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHQudmVyc2lvbiAtIGNvbmZpZyB2ZXJzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHQuY29uZmlnIC0gc2F2ZWQgY29uZmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSAtIGN1cnJlbnQgQXBwIFN0YXRlXG4gICAqIEByZXR1cm5zIHtPYmplY3QgfCBudWxsfSAtIHBhcnNlZCBjb25maWdcbiAgICovXG4gIHBhcnNlU2F2ZWRDb25maWcoe3ZlcnNpb24sIGNvbmZpZ30sIHN0YXRlID0ge30pIHtcbiAgICBjb25zdCB2YWxpZFZlcnNpb24gPSB0aGlzLnZhbGlkYXRlVmVyc2lvbih2ZXJzaW9uKTtcbiAgICBpZiAoIXZhbGlkVmVyc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGNvbmZpZykucmVkdWNlKFxuICAgICAgKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgICAgICAuLi5hY2N1LFxuICAgICAgICAgIC4uLihrZXkgaW4gdGhpcy5fcmVkdWNlclNjaGVtYXNcbiAgICAgICAgICAgID8gdGhpcy5fcmVkdWNlclNjaGVtYXNba2V5XVt2YWxpZFZlcnNpb25dLmxvYWQoXG4gICAgICAgICAgICAgICAgY29uZmlnW2tleV1cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiB7fSlcbiAgICAgICAgfSksXG4gICAgICB7fVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVmFsaWRhdGUgdmVyc2lvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmVyc2lvblxuICAgKiBAcmV0dXJucyB7U3RyaW5nIHwgbnVsbH0gdmFsaWRWZXJzaW9uXG4gICAqL1xuICB2YWxpZGF0ZVZlcnNpb24odmVyc2lvbikge1xuICAgIGlmICghdmVyc2lvbikge1xuICAgICAgQ29uc29sZS5lcnJvcihcbiAgICAgICAgJ1RoZXJlIGlzIG5vIHZlcnNpb24gbnVtYmVyIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNhdmVkIG1hcCdcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3ZhbGlkVmVyc2lvbnNbdmVyc2lvbl0pIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoYCR7dmVyc2lvbn0gaXMgbm90IGEgdmFsaWQgdmVyc2lvbmApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZlcnNpb247XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgZGF0YSBoYXMgY2hhbmdlZCBzaW5jZSBsYXN0IHNhdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gICAqIEByZXR1cm5zIHtib29sZWFufSAtIHdoZXRoZXIgZGF0YSBoYXMgY2hhbmdlZCBvciBub3RcbiAgICovXG4gIGhhc0RhdGFDaGFuZ2VkKHN0YXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFzZXRMYXN0U2F2ZWQgIT09IHN0YXRlLnZpc1N0YXRlLmRhdGFzZXRzO1xuICB9XG59XG5cbmNvbnN0IEtlcGxlckdMU2NoZW1hTWFuYWdlciA9IG5ldyBLZXBsZXJHTFNjaGVtYSgpO1xuXG5leHBvcnQgZGVmYXVsdCBLZXBsZXJHTFNjaGVtYU1hbmFnZXI7XG4iXX0=