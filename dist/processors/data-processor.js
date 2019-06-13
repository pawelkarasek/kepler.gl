"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processCsvData = processCsvData;
exports.parseCsvByFields = parseCsvByFields;
exports.getSampleForTypeAnalyze = getSampleForTypeAnalyze;
exports.parseCsvRowsByFieldType = parseCsvRowsByFieldType;
exports.getFieldsFromData = getFieldsFromData;
exports.renameDuplicateFields = renameDuplicateFields;
exports.analyzerTypeToFieldType = analyzerTypeToFieldType;
exports.processRowObject = processRowObject;
exports.processGeojson = processGeojson;
exports.formatCsv = formatCsv;
exports.validateInputData = validateInputData;
exports.processKeplerglJSON = processKeplerglJSON;
exports.Processors = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _d3Dsv = require("d3-dsv");

var _d3Array = require("d3-array");

var _window = require("global/window");

var _assert = _interopRequireDefault(require("assert"));

var _typeAnalyzer = require("type-analyzer");

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _defaultSettings = require("../constants/default-settings");

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
// if any of these value occurs in csv, parse it to null;
var CSV_NULLS = ['', 'null', 'NULL', 'Null', 'NaN'];
/**
 * Process csv data, output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and pass to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * @param {string} rawData raw csv string
 * @returns {Object} data object `{fields: [], rows: []}`
 * @public
 * @example
 * import {processCsvData} from 'kepler.gl/processors';
 *
 * const testData = `gps_data.utc_timestamp,gps_data.lat,gps_data.lng,gps_data.types,epoch,has_result,id,time,begintrip_ts_utc,begintrip_ts_local,date
 * 2016-09-17 00:09:55,29.9900937,31.2590542,driver_analytics,1472688000000,False,1,2016-09-23T00:00:00.000Z,2016-10-01 09:41:39+00:00,2016-10-01 09:41:39+00:00,2016-09-23
 * 2016-09-17 00:10:56,29.9927699,31.2461142,driver_analytics,1472688000000,False,2,2016-09-23T00:00:00.000Z,2016-10-01 09:46:37+00:00,2016-10-01 16:46:37+00:00,2016-09-23
 * 2016-09-17 00:11:56,29.9907261,31.2312742,driver_analytics,1472688000000,False,3,2016-09-23T00:00:00.000Z,,,2016-09-23
 * 2016-09-17 00:12:58,29.9870074,31.2175827,driver_analytics,1472688000000,False,4,2016-09-23T00:00:00.000Z,,,2016-09-23`
 *
 * const dataset = {
 *  info: {id: 'test_data', label: 'My Csv'},
 *  data: processCsvData(testData)
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: [dataset],
 *  options: {centerMap: true, readOnly: true}
 * }));
 */

function processCsvData(rawData) {
  // here we assume the csv file that people uploaded will have first row
  // as name of the column
  // TODO: add a alert at upload csv to remind define first row
  var _csvParseRows = (0, _d3Dsv.csvParseRows)(rawData),
      _csvParseRows2 = (0, _toArray2["default"])(_csvParseRows),
      headerRow = _csvParseRows2[0],
      rows = _csvParseRows2.slice(1);

  if (!rows.length || !headerRow) {
    // looks like an empty file
    // resolve null, and catch them later in one place
    return null;
  }

  cleanUpFalsyCsvValue(rows); // No need to run type detection on every data point
  // here we get a list of none null values to run analyze on

  var sample = getSampleForTypeAnalyze({
    fields: headerRow,
    allData: rows
  });
  var fields = getFieldsFromData(sample, headerRow);
  var parsedRows = parseCsvByFields(rows, fields);
  return {
    fields: fields,
    rows: parsedRows
  };
}
/**
 * Parse rows of csv by analyzed field types. So that `'1'` -> `1`, `'True'` -> `true`
 * @param {Array<Array>} rows
 * @param {Array<Object} fields
 */


function parseCsvByFields(rows, fields) {
  // Edit rows in place
  fields.forEach(parseCsvRowsByFieldType.bind(null, rows));
  return rows;
}
/**
 * Getting sample data for analyzing field type.
 *
 * @param {Array<string>} fields an array of field names
 * @param {Array<Array>} allData
 * @param {Array} sampleCount
 * @returns {Array} formatted fields
 */


function getSampleForTypeAnalyze(_ref) {
  var fields = _ref.fields,
      allData = _ref.allData,
      _ref$sampleCount = _ref.sampleCount,
      sampleCount = _ref$sampleCount === void 0 ? 50 : _ref$sampleCount;
  var total = Math.min(sampleCount, allData.length); // const fieldOrder = fields.map(f => f.name);

  var sample = (0, _d3Array.range)(0, total, 1).map(function (d) {
    return {};
  }); // collect sample data for each field

  fields.forEach(function (field, fieldIdx) {
    // data counter
    var i = 0; // sample counter

    var j = 0;

    while (j < total) {
      if (i >= allData.length) {
        // if depleted data pool
        sample[j][field] = null;
        j++;
      } else if ((0, _dataUtils.notNullorUndefined)(allData[i][fieldIdx])) {
        sample[j][field] = allData[i][fieldIdx];
        j++;
        i++;
      } else {
        i++;
      }
    }
  });
  return sample;
}
/**
 * Convert falsy value in csv including `'', 'null', 'NULL', 'Null', 'NaN'` to `null`,
 * so that type-analyzer won't detect it as string
 *
 * @param {Array<Array>} rows
 */


function cleanUpFalsyCsvValue(rows) {
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      // analyzer will set any fields to 'string' if there are empty values
      // which will be parsed as '' by d3.csv
      // here we parse empty data as null
      // TODO: create warning when deltect `CSV_NULLS` in the data
      if (!rows[i][j] || CSV_NULLS.includes(rows[i][j])) {
        rows[i][j] = null;
      }
    }
  }
}
/**
 * Process uploaded csv file to parse value by field type
 *
 * @param {Array<Array>} rows
 * @param {Object} field
 * @param {Number} i
 * @returns {void}
 */


function parseCsvRowsByFieldType(rows, field, i) {
  var unixFormat = ['x', 'X'];
  rows.forEach(function (row) {
    if (row[i] !== null) {
      switch (field.type) {
        case _defaultSettings.ALL_FIELD_TYPES.real:
          row[i] = parseFloat(row[i]);
          break;
        // TODO: timestamp can be either '1495827326' or '2016-03-10 11:20'
        // if it's '1495827326' we pass it to int

        case _defaultSettings.ALL_FIELD_TYPES.timestamp:
          row[i] = unixFormat.includes(field.format) ? Number(row[i]) : row[i];
          break;

        case _defaultSettings.ALL_FIELD_TYPES.integer:
          row[i] = parseInt(row[i], 10);
          break;

        case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
          // 0 and 1 only field can also be boolean
          row[i] = row[i] === 'true' || row[i] === 'True' || row[i] === '1';
          break;

        default:
          break;
      }
    }
  });
}
/**
 * Analyze field types from data in `string` format, e.g. uploaded csv.
 * Assign `type`, `tableFieldIndex` and `format` (timestamp only) to each field
 *
 * @param {Array<Object>} data array of row object
 * @param {Array} fieldOrder array of field names as string
 * @returns {Array<Object>} formatted fields
 * @public
 * @example
 *
 * import {getFieldsFromData} from 'kepler.gl/processors';
 * const data = [{
 *   time: '2016-09-17 00:09:55',
 *   value: '4',
 *   surge: '1.2',
 *   isTrip: 'true',
 *   zeroOnes: '0'
 * }, {
 *   time: '2016-09-17 00:30:08',
 *   value: '3',
 *   surge: null,
 *   isTrip: 'false',
 *   zeroOnes: '1'
 * }, {
 *   time: null,
 *   value: '2',
 *   surge: '1.3',
 *   isTrip: null,
 *   zeroOnes: '1'
 * }];
 *
 * const fieldOrder = ['time', 'value', 'surge', 'isTrip', 'zeroOnes'];
 * const fields = getFieldsFromData(data, fieldOrder);
 * // fields = [
 * // {name: 'time', format: 'YYYY-M-D H:m:s', tableFieldIndex: 1, type: 'timestamp'},
 * // {name: 'value', format: '', tableFieldIndex: 4, type: 'integer'},
 * // {name: 'surge', format: '', tableFieldIndex: 5, type: 'real'},
 * // {name: 'isTrip', format: '', tableFieldIndex: 6, type: 'boolean'},
 * // {name: 'zeroOnes', format: '', tableFieldIndex: 7, type: 'integer'}];
 *
 */


function getFieldsFromData(data, fieldOrder) {
  // add a check for epoch timestamp
  var metadata = _typeAnalyzer.Analyzer.computeColMeta(data, [{
    regex: /.*geojson|all_points/g,
    dataType: 'GEOMETRY'
  }]);

  var _renameDuplicateField = renameDuplicateFields(fieldOrder),
      fieldByIndex = _renameDuplicateField.fieldByIndex;

  return fieldOrder.reduce(function (orderedArray, field, index) {
    var name = fieldByIndex[index];
    var fieldMeta = metadata.find(function (m) {
      return m.key === field;
    });

    var _ref2 = fieldMeta || {},
        type = _ref2.type,
        format = _ref2.format;

    orderedArray[index] = {
      name: name,
      format: format,
      tableFieldIndex: index + 1,
      type: analyzerTypeToFieldType(type)
    };
    return orderedArray;
  }, []);
}
/**
 * pass in an array of field names, rename duplicated one
 * and return a map from old field index to new name
 *
 * @param {Array} fieldOrder
 * @returns {Object} new field name by index
 */


function renameDuplicateFields(fieldOrder) {
  return fieldOrder.reduce(function (accu, field, i) {
    var allNames = accu.allNames;
    var fieldName = field; // add a counter to duplicated names

    if (allNames.includes(field)) {
      var counter = 0;

      while (allNames.includes("".concat(field, "-").concat(counter))) {
        counter++;
      }

      fieldName = "".concat(field, "-").concat(counter);
    }

    accu.fieldByIndex[i] = fieldName;
    accu.allNames.push(fieldName);
    return accu;
  }, {
    allNames: [],
    fieldByIndex: {}
  });
}
/**
 * Convert type-analyzer output to kepler.gl field types
 *
 * @param {string} aType
 * @returns {string} corresponding type in `ALL_FIELD_TYPES`
 */

/* eslint-disable complexity */


function analyzerTypeToFieldType(aType) {
  var DATE = _typeAnalyzer.DATA_TYPES.DATE,
      TIME = _typeAnalyzer.DATA_TYPES.TIME,
      DATETIME = _typeAnalyzer.DATA_TYPES.DATETIME,
      NUMBER = _typeAnalyzer.DATA_TYPES.NUMBER,
      INT = _typeAnalyzer.DATA_TYPES.INT,
      FLOAT = _typeAnalyzer.DATA_TYPES.FLOAT,
      BOOLEAN = _typeAnalyzer.DATA_TYPES.BOOLEAN,
      STRING = _typeAnalyzer.DATA_TYPES.STRING,
      CITY = _typeAnalyzer.DATA_TYPES.CITY,
      GEOMETRY = _typeAnalyzer.DATA_TYPES.GEOMETRY,
      GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.GEOMETRY_FROM_STRING,
      ZIPCODE = _typeAnalyzer.DATA_TYPES.ZIPCODE,
      PAIR_GEOMETRY_FROM_STRING = _typeAnalyzer.DATA_TYPES.PAIR_GEOMETRY_FROM_STRING; // TODO: un recognized types
  // CURRENCY PERCENT NONE

  switch (aType) {
    case DATE:
      return _defaultSettings.ALL_FIELD_TYPES.date;

    case TIME:
    case DATETIME:
      return _defaultSettings.ALL_FIELD_TYPES.timestamp;

    case NUMBER:
    case FLOAT:
      return _defaultSettings.ALL_FIELD_TYPES.real;

    case INT:
      return _defaultSettings.ALL_FIELD_TYPES.integer;

    case BOOLEAN:
      return _defaultSettings.ALL_FIELD_TYPES["boolean"];

    case GEOMETRY:
    case GEOMETRY_FROM_STRING:
    case PAIR_GEOMETRY_FROM_STRING:
      return _defaultSettings.ALL_FIELD_TYPES.geojson;

    case STRING:
    case CITY:
    case ZIPCODE:
      return _defaultSettings.ALL_FIELD_TYPES.string;

    default:
      _window.console.warn("Unsupported analyzer type: ".concat(aType));

      return _defaultSettings.ALL_FIELD_TYPES.string;
  }
}
/* eslint-enable complexity */

/**
 * Process data where each row is an object, output can be passed to [`addDataToMap`](../actions/actions.md#adddatatomap)
 * @param {Object} rawData an array of object
 * @returns {Object} dataset containing `fields` and `rows`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processRowObject} from 'kepler.gl/processors';
 *
 * const data = [
 *  {lat: 31.27, lng: 127.56, value: 3},
 *  {lat: 31.22, lng: 126.26, value: 1}
 * ];
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {label: 'My Data', id: 'my_data'},
 *    data: processRowObject(data)
 *  }
 * }));
 */


function processRowObject(rawData) {
  if (!rawData.length) {
    return null;
  }

  var keys = Object.keys(rawData[0]);
  var rows = rawData.map(function (d) {
    return keys.map(function (key) {
      return d[key];
    });
  });
  var fields = getFieldsFromData(rawData, keys);
  return {
    fields: fields,
    rows: rows
  };
}
/**
 * Process GeoJSON [`FeatureCollection`](http://wiki.geojson.org/GeoJSON_draft_version_6#FeatureCollection),
 * output a data object with `{fields: [], rows: []}`.
 * The data object can be wrapped in a `dataset` and pass to [`addDataToMap`](../actions/actions.md#adddatatomap)
 *
 * @param {Object} rawData raw geojson feature collection
 * @returns {Object} dataset containing `fields` and `rows`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processGeojson} from 'kepler.gl/processors';
 *
 * const geojson = {
 * 	"type" : "FeatureCollection",
 * 	"features" : [{
 * 		"type" : "Feature",
 * 		"properties" : {
 * 			"capacity" : "10",
 * 			"type" : "U-Rack"
 * 		},
 * 		"geometry" : {
 * 			"type" : "Point",
 * 			"coordinates" : [ -71.073283, 42.417500 ]
 * 		}
 * 	}]
 * };
 *
 * dispatch(addDataToMap({
 *  datasets: {
 *    info: {
 *      label: 'Sample Taxi Trips in New York City',
 *      id: 'test_trip_data'
 *    },
 *    data: processGeojson(geojson)
 *  }
 * }));
 */


function processGeojson(rawData) {
  var normalizedGeojson = (0, _geojsonNormalize["default"])(rawData);

  if (!normalizedGeojson || !Array.isArray(normalizedGeojson.features)) {
    // fail to normalize geojson
    return null;
  } // getting all feature fields


  var allData = normalizedGeojson.features.reduce(function (accu, f, i) {
    if (f.geometry) {
      accu.push((0, _objectSpread2["default"])({
        // add feature to _geojson field
        _geojson: f
      }, f.properties || {}));
    }

    return accu;
  }, []); // get all the field

  var fields = allData.reduce(function (prev, curr) {
    Object.keys(curr).forEach(function (key) {
      if (!prev.includes(key)) {
        prev.push(key);
      }
    });
    return prev;
  }, []); // make sure each feature has exact same fields

  allData.forEach(function (d) {
    fields.forEach(function (f) {
      if (!(f in d)) {
        d[f] = null;
      }
    });
  });
  return processRowObject(allData);
}
/**
 * On export data to csv
 * @param {Array<Array>} data `dataset.allData` or filtered data `dataset.data`
 * @param {Array<Object>} fields `dataset.fields`
 * @returns {string} csv string
 */


function formatCsv(data, fields) {
  var columns = fields.map(function (f) {
    return f.name;
  });
  var formattedData = [columns]; // parse geojson object as string

  data.forEach(function (row) {
    formattedData.push(row.map(function (d, i) {
      return d && _defaultSettings.GEOJSON_FIELDS.geojson.includes(fields[i].name) ? JSON.stringify(d) : d;
    }));
  });
  return (0, _d3Dsv.csvFormatRows)(formattedData);
}
/**
 * Validate input data, adding missing field types, rename duplicate columns
 * @param data
 * @returns {{allData: Array, fields: Array}}
 */


function validateInputData(data) {
  // TODO: add test

  /*
   * expected input data format
   * {
   *   fields: [],
   *   rows: []
   * }
   */
  var proceed = true;

  if (!data) {
    (0, _assert["default"])('receiveVisData: data cannot be null');
    proceed = false;
  } else if (!Array.isArray(data.fields)) {
    (0, _assert["default"])('receiveVisData: expect data.fields to be an array');
    proceed = false;
  } else if (!Array.isArray(data.rows)) {
    (0, _assert["default"])('receiveVisData: expect data.rows to be an array');
    proceed = false;
  }

  if (!proceed) {
    return null;
  }

  var fields = data.fields,
      rows = data.rows; // check if all fields has name, format and type

  var allValid = fields.every(function (f, i) {
    if ((0, _typeof2["default"])(f) !== 'object') {
      (0, _assert["default"])("fields needs to be an array of object, but find ".concat((0, _typeof2["default"])(f)));
      return false;
    }

    if (!f.name) {
      (0, _assert["default"])("field.name is required but missing in field ".concat(JSON.stringify(f))); // assign a name

      f.name = "column_".concat(i);
    }

    if (!_defaultSettings.ALL_FIELD_TYPES[f.type]) {
      (0, _assert["default"])("unknown field type ".concat(f.type));
      return false;
    }

    return f.type !== _defaultSettings.ALL_FIELD_TYPES.timestamp || typeof f.format === 'string';
  });

  if (allValid) {
    return {
      rows: rows,
      fields: fields
    };
  } // if any field has missing type, recalculate it for everyone
  // because we simply lost faith in humanity


  var sampleData = getSampleForTypeAnalyze({
    fields: fields.map(function (f) {
      return f.name;
    }),
    allData: rows
  });
  var fieldOrder = fields.map(function (f) {
    return f.name;
  });
  var meta = getFieldsFromData(sampleData, fieldOrder);
  var updatedFields = fields.map(function (f, i) {
    return (0, _objectSpread2["default"])({}, f, {
      type: meta[i].type,
      format: meta[i].format
    });
  });
  return {
    fields: updatedFields,
    rows: rows
  };
}
/**
 * Process saved kepler.gl json to be pass to [`addDataToMap`](../actions/actions.md#adddatatomap).
 * The json object should contain `datasets` and `config`.
 * @param {Object} rawData
 * @param {Array} rawData.datasets
 * @param {Object} rawData.config
 * @returns {Object} datasets and config `{datasets: {}, config: {}}`
 * @public
 * @example
 * import {addDataToMap} from 'kepler.gl/actions';
 * import {processKeplerglJSON} from 'kepler.gl/processors';
 *
 * dispatch(addDataToMap(processKeplerglJSON(keplerGlJson)));
 */


function processKeplerglJSON(rawData) {
  return rawData ? _schemas["default"].load(rawData.datasets, rawData.config) : null;
}

var Processors = {
  processGeojson: processGeojson,
  processCsvData: processCsvData,
  processRowObject: processRowObject,
  processKeplerglJSON: processKeplerglJSON,
  analyzerTypeToFieldType: analyzerTypeToFieldType,
  getFieldsFromData: getFieldsFromData,
  parseCsvRowsByFieldType: parseCsvRowsByFieldType
};
exports.Processors = Processors;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzb3JzL2RhdGEtcHJvY2Vzc29yLmpzIl0sIm5hbWVzIjpbIkNTVl9OVUxMUyIsInByb2Nlc3NDc3ZEYXRhIiwicmF3RGF0YSIsImhlYWRlclJvdyIsInJvd3MiLCJsZW5ndGgiLCJjbGVhblVwRmFsc3lDc3ZWYWx1ZSIsInNhbXBsZSIsImdldFNhbXBsZUZvclR5cGVBbmFseXplIiwiZmllbGRzIiwiYWxsRGF0YSIsImdldEZpZWxkc0Zyb21EYXRhIiwicGFyc2VkUm93cyIsInBhcnNlQ3N2QnlGaWVsZHMiLCJmb3JFYWNoIiwicGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUiLCJiaW5kIiwic2FtcGxlQ291bnQiLCJ0b3RhbCIsIk1hdGgiLCJtaW4iLCJtYXAiLCJkIiwiZmllbGQiLCJmaWVsZElkeCIsImkiLCJqIiwiaW5jbHVkZXMiLCJ1bml4Rm9ybWF0Iiwicm93IiwidHlwZSIsIkFMTF9GSUVMRF9UWVBFUyIsInJlYWwiLCJwYXJzZUZsb2F0IiwidGltZXN0YW1wIiwiZm9ybWF0IiwiTnVtYmVyIiwiaW50ZWdlciIsInBhcnNlSW50IiwiZGF0YSIsImZpZWxkT3JkZXIiLCJtZXRhZGF0YSIsIkFuYWx5emVyIiwiY29tcHV0ZUNvbE1ldGEiLCJyZWdleCIsImRhdGFUeXBlIiwicmVuYW1lRHVwbGljYXRlRmllbGRzIiwiZmllbGRCeUluZGV4IiwicmVkdWNlIiwib3JkZXJlZEFycmF5IiwiaW5kZXgiLCJuYW1lIiwiZmllbGRNZXRhIiwiZmluZCIsIm0iLCJrZXkiLCJ0YWJsZUZpZWxkSW5kZXgiLCJhbmFseXplclR5cGVUb0ZpZWxkVHlwZSIsImFjY3UiLCJhbGxOYW1lcyIsImZpZWxkTmFtZSIsImNvdW50ZXIiLCJwdXNoIiwiYVR5cGUiLCJEQVRFIiwiQW5hbHl6ZXJEQVRBX1RZUEVTIiwiVElNRSIsIkRBVEVUSU1FIiwiTlVNQkVSIiwiSU5UIiwiRkxPQVQiLCJCT09MRUFOIiwiU1RSSU5HIiwiQ0lUWSIsIkdFT01FVFJZIiwiR0VPTUVUUllfRlJPTV9TVFJJTkciLCJaSVBDT0RFIiwiUEFJUl9HRU9NRVRSWV9GUk9NX1NUUklORyIsImRhdGUiLCJnZW9qc29uIiwic3RyaW5nIiwiZ2xvYmFsQ29uc29sZSIsIndhcm4iLCJwcm9jZXNzUm93T2JqZWN0Iiwia2V5cyIsIk9iamVjdCIsInByb2Nlc3NHZW9qc29uIiwibm9ybWFsaXplZEdlb2pzb24iLCJBcnJheSIsImlzQXJyYXkiLCJmZWF0dXJlcyIsImYiLCJnZW9tZXRyeSIsIl9nZW9qc29uIiwicHJvcGVydGllcyIsInByZXYiLCJjdXJyIiwiZm9ybWF0Q3N2IiwiY29sdW1ucyIsImZvcm1hdHRlZERhdGEiLCJHRU9KU09OX0ZJRUxEUyIsIkpTT04iLCJzdHJpbmdpZnkiLCJ2YWxpZGF0ZUlucHV0RGF0YSIsInByb2NlZWQiLCJhbGxWYWxpZCIsImV2ZXJ5Iiwic2FtcGxlRGF0YSIsIm1ldGEiLCJ1cGRhdGVkRmllbGRzIiwicHJvY2Vzc0tlcGxlcmdsSlNPTiIsIktlcGxlckdsU2NoZW1hIiwibG9hZCIsImRhdGFzZXRzIiwiY29uZmlnIiwiUHJvY2Vzc29ycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlBO0FBQ0EsSUFBTUEsU0FBUyxHQUFHLENBQUMsRUFBRCxFQUFLLE1BQUwsRUFBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLEtBQTdCLENBQWxCO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJPLFNBQVNDLGNBQVQsQ0FBd0JDLE9BQXhCLEVBQWlDO0FBQ3RDO0FBQ0E7QUFDQTtBQUhzQyxzQkFJVCx5QkFBYUEsT0FBYixDQUpTO0FBQUE7QUFB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QjtBQUV4QnJGLEVBQUFBLGNBQWMsRUFBZEEsY0FGd0I7QUFHeEJrRixFQUFBQSxnQkFBZ0IsRUFBaEJBLGdCQUh3QjtBQUl4QjJCLEVBQUFBLG1CQUFtQixFQUFuQkEsbUJBSndCO0FBS3hCckQsRUFBQUEsdUJBQXVCLEVBQXZCQSx1QkFMd0I7QUFNeEI5QyxFQUFBQSxpQkFBaUIsRUFBakJBLGlCQU53QjtBQU94QkksRUFBQUEsdUJBQXVCLEVBQXZCQTtBQVB3QixDQUFuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y3N2UGFyc2VSb3dzLCBjc3ZGb3JtYXRSb3dzfSBmcm9tICdkMy1kc3YnO1xuaW1wb3J0IHtyYW5nZX0gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IHtjb25zb2xlIGFzIGdsb2JhbENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHtBbmFseXplciwgREFUQV9UWVBFUyBhcyBBbmFseXplckRBVEFfVFlQRVN9IGZyb20gJ3R5cGUtYW5hbHl6ZXInO1xuaW1wb3J0IG5vcm1hbGl6ZSBmcm9tICdAbWFwYm94L2dlb2pzb24tbm9ybWFsaXplJztcbmltcG9ydCB7QUxMX0ZJRUxEX1RZUEVTLCBHRU9KU09OX0ZJRUxEU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtub3ROdWxsb3JVbmRlZmluZWR9IGZyb20gJ3V0aWxzL2RhdGEtdXRpbHMnO1xuaW1wb3J0IEtlcGxlckdsU2NoZW1hIGZyb20gJ3NjaGVtYXMnO1xuXG4vLyBpZiBhbnkgb2YgdGhlc2UgdmFsdWUgb2NjdXJzIGluIGNzdiwgcGFyc2UgaXQgdG8gbnVsbDtcbmNvbnN0IENTVl9OVUxMUyA9IFsnJywgJ251bGwnLCAnTlVMTCcsICdOdWxsJywgJ05hTiddO1xuXG4vKipcbiAqIFByb2Nlc3MgY3N2IGRhdGEsIG91dHB1dCBhIGRhdGEgb2JqZWN0IHdpdGggYHtmaWVsZHM6IFtdLCByb3dzOiBbXX1gLlxuICogVGhlIGRhdGEgb2JqZWN0IGNhbiBiZSB3cmFwcGVkIGluIGEgYGRhdGFzZXRgIGFuZCBwYXNzIHRvIFtgYWRkRGF0YVRvTWFwYF0oLi4vYWN0aW9ucy9hY3Rpb25zLm1kI2FkZGRhdGF0b21hcClcbiAqIEBwYXJhbSB7c3RyaW5nfSByYXdEYXRhIHJhdyBjc3Ygc3RyaW5nXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkYXRhIG9iamVjdCBge2ZpZWxkczogW10sIHJvd3M6IFtdfWBcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQge3Byb2Nlc3NDc3ZEYXRhfSBmcm9tICdrZXBsZXIuZ2wvcHJvY2Vzc29ycyc7XG4gKlxuICogY29uc3QgdGVzdERhdGEgPSBgZ3BzX2RhdGEudXRjX3RpbWVzdGFtcCxncHNfZGF0YS5sYXQsZ3BzX2RhdGEubG5nLGdwc19kYXRhLnR5cGVzLGVwb2NoLGhhc19yZXN1bHQsaWQsdGltZSxiZWdpbnRyaXBfdHNfdXRjLGJlZ2ludHJpcF90c19sb2NhbCxkYXRlXG4gKiAyMDE2LTA5LTE3IDAwOjA5OjU1LDI5Ljk5MDA5MzcsMzEuMjU5MDU0Mixkcml2ZXJfYW5hbHl0aWNzLDE0NzI2ODgwMDAwMDAsRmFsc2UsMSwyMDE2LTA5LTIzVDAwOjAwOjAwLjAwMFosMjAxNi0xMC0wMSAwOTo0MTozOSswMDowMCwyMDE2LTEwLTAxIDA5OjQxOjM5KzAwOjAwLDIwMTYtMDktMjNcbiAqIDIwMTYtMDktMTcgMDA6MTA6NTYsMjkuOTkyNzY5OSwzMS4yNDYxMTQyLGRyaXZlcl9hbmFseXRpY3MsMTQ3MjY4ODAwMDAwMCxGYWxzZSwyLDIwMTYtMDktMjNUMDA6MDA6MDAuMDAwWiwyMDE2LTEwLTAxIDA5OjQ2OjM3KzAwOjAwLDIwMTYtMTAtMDEgMTY6NDY6MzcrMDA6MDAsMjAxNi0wOS0yM1xuICogMjAxNi0wOS0xNyAwMDoxMTo1NiwyOS45OTA3MjYxLDMxLjIzMTI3NDIsZHJpdmVyX2FuYWx5dGljcywxNDcyNjg4MDAwMDAwLEZhbHNlLDMsMjAxNi0wOS0yM1QwMDowMDowMC4wMDBaLCwsMjAxNi0wOS0yM1xuICogMjAxNi0wOS0xNyAwMDoxMjo1OCwyOS45ODcwMDc0LDMxLjIxNzU4MjcsZHJpdmVyX2FuYWx5dGljcywxNDcyNjg4MDAwMDAwLEZhbHNlLDQsMjAxNi0wOS0yM1QwMDowMDowMC4wMDBaLCwsMjAxNi0wOS0yM2BcbiAqXG4gKiBjb25zdCBkYXRhc2V0ID0ge1xuICogIGluZm86IHtpZDogJ3Rlc3RfZGF0YScsIGxhYmVsOiAnTXkgQ3N2J30sXG4gKiAgZGF0YTogcHJvY2Vzc0NzdkRhdGEodGVzdERhdGEpXG4gKiB9O1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcCh7XG4gKiAgZGF0YXNldHM6IFtkYXRhc2V0XSxcbiAqICBvcHRpb25zOiB7Y2VudGVyTWFwOiB0cnVlLCByZWFkT25seTogdHJ1ZX1cbiAqIH0pKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NDc3ZEYXRhKHJhd0RhdGEpIHtcbiAgLy8gaGVyZSB3ZSBhc3N1bWUgdGhlIGNzdiBmaWxlIHRoYXQgcGVvcGxlIHVwbG9hZGVkIHdpbGwgaGF2ZSBmaXJzdCByb3dcbiAgLy8gYXMgbmFtZSBvZiB0aGUgY29sdW1uXG4gIC8vIFRPRE86IGFkZCBhIGFsZXJ0IGF0IHVwbG9hZCBjc3YgdG8gcmVtaW5kIGRlZmluZSBmaXJzdCByb3dcbiAgY29uc3QgW2hlYWRlclJvdywgLi4ucm93c10gPSBjc3ZQYXJzZVJvd3MocmF3RGF0YSk7XG5cbiAgaWYgKCFyb3dzLmxlbmd0aCB8fCAhaGVhZGVyUm93KSB7XG4gICAgLy8gbG9va3MgbGlrZSBhbiBlbXB0eSBmaWxlXG4gICAgLy8gcmVzb2x2ZSBudWxsLCBhbmQgY2F0Y2ggdGhlbSBsYXRlciBpbiBvbmUgcGxhY2VcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpO1xuICAvLyBObyBuZWVkIHRvIHJ1biB0eXBlIGRldGVjdGlvbiBvbiBldmVyeSBkYXRhIHBvaW50XG4gIC8vIGhlcmUgd2UgZ2V0IGEgbGlzdCBvZiBub25lIG51bGwgdmFsdWVzIHRvIHJ1biBhbmFseXplIG9uXG4gIGNvbnN0IHNhbXBsZSA9IGdldFNhbXBsZUZvclR5cGVBbmFseXplKHtmaWVsZHM6IGhlYWRlclJvdywgYWxsRGF0YTogcm93c30pO1xuXG4gIGNvbnN0IGZpZWxkcyA9IGdldEZpZWxkc0Zyb21EYXRhKHNhbXBsZSwgaGVhZGVyUm93KTtcblxuICBjb25zdCBwYXJzZWRSb3dzID0gcGFyc2VDc3ZCeUZpZWxkcyhyb3dzLCBmaWVsZHMpO1xuXG4gIHJldHVybiB7ZmllbGRzLCByb3dzOiBwYXJzZWRSb3dzfTtcbn1cblxuLyoqXG4gKiBQYXJzZSByb3dzIG9mIGNzdiBieSBhbmFseXplZCBmaWVsZCB0eXBlcy4gU28gdGhhdCBgJzEnYCAtPiBgMWAsIGAnVHJ1ZSdgIC0+IGB0cnVlYFxuICogQHBhcmFtIHtBcnJheTxBcnJheT59IHJvd3NcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0fSBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3N2QnlGaWVsZHMocm93cywgZmllbGRzKSB7XG4gIC8vIEVkaXQgcm93cyBpbiBwbGFjZVxuICBmaWVsZHMuZm9yRWFjaChwYXJzZUNzdlJvd3NCeUZpZWxkVHlwZS5iaW5kKG51bGwsIHJvd3MpKTtcblxuICByZXR1cm4gcm93cztcbn1cbi8qKlxuICogR2V0dGluZyBzYW1wbGUgZGF0YSBmb3IgYW5hbHl6aW5nIGZpZWxkIHR5cGUuXG4gKlxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBmaWVsZHMgYW4gYXJyYXkgb2YgZmllbGQgbmFtZXNcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSBhbGxEYXRhXG4gKiBAcGFyYW0ge0FycmF5fSBzYW1wbGVDb3VudFxuICogQHJldHVybnMge0FycmF5fSBmb3JtYXR0ZWQgZmllbGRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7ZmllbGRzLCBhbGxEYXRhLCBzYW1wbGVDb3VudCA9IDUwfSkge1xuICBjb25zdCB0b3RhbCA9IE1hdGgubWluKHNhbXBsZUNvdW50LCBhbGxEYXRhLmxlbmd0aCk7XG4gIC8vIGNvbnN0IGZpZWxkT3JkZXIgPSBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKTtcbiAgY29uc3Qgc2FtcGxlID0gcmFuZ2UoMCwgdG90YWwsIDEpLm1hcChkID0+ICh7fSkpO1xuXG4gIC8vIGNvbGxlY3Qgc2FtcGxlIGRhdGEgZm9yIGVhY2ggZmllbGRcbiAgZmllbGRzLmZvckVhY2goKGZpZWxkLCBmaWVsZElkeCkgPT4ge1xuICAgIC8vIGRhdGEgY291bnRlclxuICAgIGxldCBpID0gMDtcbiAgICAvLyBzYW1wbGUgY291bnRlclxuICAgIGxldCBqID0gMDtcblxuICAgIHdoaWxlIChqIDwgdG90YWwpIHtcbiAgICAgIGlmIChpID49IGFsbERhdGEubGVuZ3RoKSB7XG4gICAgICAgIC8vIGlmIGRlcGxldGVkIGRhdGEgcG9vbFxuICAgICAgICBzYW1wbGVbal1bZmllbGRdID0gbnVsbDtcbiAgICAgICAgaisrO1xuICAgICAgfSBlbHNlIGlmIChub3ROdWxsb3JVbmRlZmluZWQoYWxsRGF0YVtpXVtmaWVsZElkeF0pKSB7XG4gICAgICAgIHNhbXBsZVtqXVtmaWVsZF0gPSBhbGxEYXRhW2ldW2ZpZWxkSWR4XTtcbiAgICAgICAgaisrO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpKys7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gc2FtcGxlO1xufVxuXG4vKipcbiAqIENvbnZlcnQgZmFsc3kgdmFsdWUgaW4gY3N2IGluY2x1ZGluZyBgJycsICdudWxsJywgJ05VTEwnLCAnTnVsbCcsICdOYU4nYCB0byBgbnVsbGAsXG4gKiBzbyB0aGF0IHR5cGUtYW5hbHl6ZXIgd29uJ3QgZGV0ZWN0IGl0IGFzIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8QXJyYXk+fSByb3dzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBGYWxzeUNzdlZhbHVlKHJvd3MpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCByb3dzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAvLyBhbmFseXplciB3aWxsIHNldCBhbnkgZmllbGRzIHRvICdzdHJpbmcnIGlmIHRoZXJlIGFyZSBlbXB0eSB2YWx1ZXNcbiAgICAgIC8vIHdoaWNoIHdpbGwgYmUgcGFyc2VkIGFzICcnIGJ5IGQzLmNzdlxuICAgICAgLy8gaGVyZSB3ZSBwYXJzZSBlbXB0eSBkYXRhIGFzIG51bGxcbiAgICAgIC8vIFRPRE86IGNyZWF0ZSB3YXJuaW5nIHdoZW4gZGVsdGVjdCBgQ1NWX05VTExTYCBpbiB0aGUgZGF0YVxuICAgICAgaWYgKCFyb3dzW2ldW2pdIHx8IENTVl9OVUxMUy5pbmNsdWRlcyhyb3dzW2ldW2pdKSkge1xuICAgICAgICByb3dzW2ldW2pdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogUHJvY2VzcyB1cGxvYWRlZCBjc3YgZmlsZSB0byBwYXJzZSB2YWx1ZSBieSBmaWVsZCB0eXBlXG4gKlxuICogQHBhcmFtIHtBcnJheTxBcnJheT59IHJvd3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtOdW1iZXJ9IGlcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGUocm93cywgZmllbGQsIGkpIHtcbiAgY29uc3QgdW5peEZvcm1hdCA9IFsneCcsICdYJ107XG5cbiAgcm93cy5mb3JFYWNoKHJvdyA9PiB7XG4gICAgaWYgKHJvd1tpXSAhPT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XG4gICAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgICAgICAgcm93W2ldID0gcGFyc2VGbG9hdChyb3dbaV0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIC8vIFRPRE86IHRpbWVzdGFtcCBjYW4gYmUgZWl0aGVyICcxNDk1ODI3MzI2JyBvciAnMjAxNi0wMy0xMCAxMToyMCdcbiAgICAgICAgLy8gaWYgaXQncyAnMTQ5NTgyNzMyNicgd2UgcGFzcyBpdCB0byBpbnRcbiAgICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgICAgIHJvd1tpXSA9IHVuaXhGb3JtYXQuaW5jbHVkZXMoZmllbGQuZm9ybWF0KSA/IE51bWJlcihyb3dbaV0pIDogcm93W2ldO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI6XG4gICAgICAgICAgcm93W2ldID0gcGFyc2VJbnQocm93W2ldLCAxMCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgICAgICAvLyAwIGFuZCAxIG9ubHkgZmllbGQgY2FuIGFsc28gYmUgYm9vbGVhblxuICAgICAgICAgIHJvd1tpXSA9IHJvd1tpXSA9PT0gJ3RydWUnIHx8IHJvd1tpXSA9PT0gJ1RydWUnIHx8IHJvd1tpXSA9PT0gJzEnO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBBbmFseXplIGZpZWxkIHR5cGVzIGZyb20gZGF0YSBpbiBgc3RyaW5nYCBmb3JtYXQsIGUuZy4gdXBsb2FkZWQgY3N2LlxuICogQXNzaWduIGB0eXBlYCwgYHRhYmxlRmllbGRJbmRleGAgYW5kIGBmb3JtYXRgICh0aW1lc3RhbXAgb25seSkgdG8gZWFjaCBmaWVsZFxuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZGF0YSBhcnJheSBvZiByb3cgb2JqZWN0XG4gKiBAcGFyYW0ge0FycmF5fSBmaWVsZE9yZGVyIGFycmF5IG9mIGZpZWxkIG5hbWVzIGFzIHN0cmluZ1xuICogQHJldHVybnMge0FycmF5PE9iamVjdD59IGZvcm1hdHRlZCBmaWVsZHNcbiAqIEBwdWJsaWNcbiAqIEBleGFtcGxlXG4gKlxuICogaW1wb3J0IHtnZXRGaWVsZHNGcm9tRGF0YX0gZnJvbSAna2VwbGVyLmdsL3Byb2Nlc3NvcnMnO1xuICogY29uc3QgZGF0YSA9IFt7XG4gKiAgIHRpbWU6ICcyMDE2LTA5LTE3IDAwOjA5OjU1JyxcbiAqICAgdmFsdWU6ICc0JyxcbiAqICAgc3VyZ2U6ICcxLjInLFxuICogICBpc1RyaXA6ICd0cnVlJyxcbiAqICAgemVyb09uZXM6ICcwJ1xuICogfSwge1xuICogICB0aW1lOiAnMjAxNi0wOS0xNyAwMDozMDowOCcsXG4gKiAgIHZhbHVlOiAnMycsXG4gKiAgIHN1cmdlOiBudWxsLFxuICogICBpc1RyaXA6ICdmYWxzZScsXG4gKiAgIHplcm9PbmVzOiAnMSdcbiAqIH0sIHtcbiAqICAgdGltZTogbnVsbCxcbiAqICAgdmFsdWU6ICcyJyxcbiAqICAgc3VyZ2U6ICcxLjMnLFxuICogICBpc1RyaXA6IG51bGwsXG4gKiAgIHplcm9PbmVzOiAnMSdcbiAqIH1dO1xuICpcbiAqIGNvbnN0IGZpZWxkT3JkZXIgPSBbJ3RpbWUnLCAndmFsdWUnLCAnc3VyZ2UnLCAnaXNUcmlwJywgJ3plcm9PbmVzJ107XG4gKiBjb25zdCBmaWVsZHMgPSBnZXRGaWVsZHNGcm9tRGF0YShkYXRhLCBmaWVsZE9yZGVyKTtcbiAqIC8vIGZpZWxkcyA9IFtcbiAqIC8vIHtuYW1lOiAndGltZScsIGZvcm1hdDogJ1lZWVktTS1EIEg6bTpzJywgdGFibGVGaWVsZEluZGV4OiAxLCB0eXBlOiAndGltZXN0YW1wJ30sXG4gKiAvLyB7bmFtZTogJ3ZhbHVlJywgZm9ybWF0OiAnJywgdGFibGVGaWVsZEluZGV4OiA0LCB0eXBlOiAnaW50ZWdlcid9LFxuICogLy8ge25hbWU6ICdzdXJnZScsIGZvcm1hdDogJycsIHRhYmxlRmllbGRJbmRleDogNSwgdHlwZTogJ3JlYWwnfSxcbiAqIC8vIHtuYW1lOiAnaXNUcmlwJywgZm9ybWF0OiAnJywgdGFibGVGaWVsZEluZGV4OiA2LCB0eXBlOiAnYm9vbGVhbid9LFxuICogLy8ge25hbWU6ICd6ZXJvT25lcycsIGZvcm1hdDogJycsIHRhYmxlRmllbGRJbmRleDogNywgdHlwZTogJ2ludGVnZXInfV07XG4gKlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmllbGRzRnJvbURhdGEoZGF0YSwgZmllbGRPcmRlcikge1xuICAvLyBhZGQgYSBjaGVjayBmb3IgZXBvY2ggdGltZXN0YW1wXG4gIGNvbnN0IG1ldGFkYXRhID0gQW5hbHl6ZXIuY29tcHV0ZUNvbE1ldGEoZGF0YSwgW1xuICAgIHtyZWdleDogLy4qZ2VvanNvbnxhbGxfcG9pbnRzL2csIGRhdGFUeXBlOiAnR0VPTUVUUlknfVxuICBdKTtcblxuICBjb25zdCB7ZmllbGRCeUluZGV4fSA9IHJlbmFtZUR1cGxpY2F0ZUZpZWxkcyhmaWVsZE9yZGVyKTtcblxuICByZXR1cm4gZmllbGRPcmRlci5yZWR1Y2UoKG9yZGVyZWRBcnJheSwgZmllbGQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGZpZWxkQnlJbmRleFtpbmRleF07XG4gICAgY29uc3QgZmllbGRNZXRhID0gbWV0YWRhdGEuZmluZChtID0+IG0ua2V5ID09PSBmaWVsZCk7XG4gICAgY29uc3Qge3R5cGUsIGZvcm1hdH0gPSBmaWVsZE1ldGEgfHwge307XG5cbiAgICBvcmRlcmVkQXJyYXlbaW5kZXhdID0ge1xuICAgICAgbmFtZSxcbiAgICAgIGZvcm1hdCxcbiAgICAgIHRhYmxlRmllbGRJbmRleDogaW5kZXggKyAxLFxuICAgICAgdHlwZTogYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUodHlwZSlcbiAgICB9O1xuXG4gICAgcmV0dXJuIG9yZGVyZWRBcnJheTtcbiAgfSwgW10pO1xufVxuXG4vKipcbiAqIHBhc3MgaW4gYW4gYXJyYXkgb2YgZmllbGQgbmFtZXMsIHJlbmFtZSBkdXBsaWNhdGVkIG9uZVxuICogYW5kIHJldHVybiBhIG1hcCBmcm9tIG9sZCBmaWVsZCBpbmRleCB0byBuZXcgbmFtZVxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGZpZWxkT3JkZXJcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5ldyBmaWVsZCBuYW1lIGJ5IGluZGV4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZW5hbWVEdXBsaWNhdGVGaWVsZHMoZmllbGRPcmRlcikge1xuICByZXR1cm4gZmllbGRPcmRlci5yZWR1Y2UoXG4gICAgKGFjY3UsIGZpZWxkLCBpKSA9PiB7XG4gICAgICBjb25zdCB7YWxsTmFtZXN9ID0gYWNjdTtcbiAgICAgIGxldCBmaWVsZE5hbWUgPSBmaWVsZDtcblxuICAgICAgLy8gYWRkIGEgY291bnRlciB0byBkdXBsaWNhdGVkIG5hbWVzXG4gICAgICBpZiAoYWxsTmFtZXMuaW5jbHVkZXMoZmllbGQpKSB7XG4gICAgICAgIGxldCBjb3VudGVyID0gMDtcbiAgICAgICAgd2hpbGUgKGFsbE5hbWVzLmluY2x1ZGVzKGAke2ZpZWxkfS0ke2NvdW50ZXJ9YCkpIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgIH1cbiAgICAgICAgZmllbGROYW1lID0gYCR7ZmllbGR9LSR7Y291bnRlcn1gO1xuICAgICAgfVxuXG4gICAgICBhY2N1LmZpZWxkQnlJbmRleFtpXSA9IGZpZWxkTmFtZTtcbiAgICAgIGFjY3UuYWxsTmFtZXMucHVzaChmaWVsZE5hbWUpO1xuXG4gICAgICByZXR1cm4gYWNjdTtcbiAgICB9LFxuICAgIHthbGxOYW1lczogW10sIGZpZWxkQnlJbmRleDoge319XG4gICk7XG59XG5cbi8qKlxuICogQ29udmVydCB0eXBlLWFuYWx5emVyIG91dHB1dCB0byBrZXBsZXIuZ2wgZmllbGQgdHlwZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYVR5cGVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNvcnJlc3BvbmRpbmcgdHlwZSBpbiBgQUxMX0ZJRUxEX1RZUEVTYFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG5leHBvcnQgZnVuY3Rpb24gYW5hbHl6ZXJUeXBlVG9GaWVsZFR5cGUoYVR5cGUpIHtcbiAgY29uc3Qge1xuICAgIERBVEUsXG4gICAgVElNRSxcbiAgICBEQVRFVElNRSxcbiAgICBOVU1CRVIsXG4gICAgSU5ULFxuICAgIEZMT0FULFxuICAgIEJPT0xFQU4sXG4gICAgU1RSSU5HLFxuICAgIENJVFksXG4gICAgR0VPTUVUUlksXG4gICAgR0VPTUVUUllfRlJPTV9TVFJJTkcsXG4gICAgWklQQ09ERSxcbiAgICBQQUlSX0dFT01FVFJZX0ZST01fU1RSSU5HXG4gIH0gPSBBbmFseXplckRBVEFfVFlQRVM7XG5cbiAgLy8gVE9ETzogdW4gcmVjb2duaXplZCB0eXBlc1xuICAvLyBDVVJSRU5DWSBQRVJDRU5UIE5PTkVcbiAgc3dpdGNoIChhVHlwZSkge1xuICAgIGNhc2UgREFURTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuZGF0ZTtcbiAgICBjYXNlIFRJTUU6XG4gICAgY2FzZSBEQVRFVElNRTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMudGltZXN0YW1wO1xuICAgIGNhc2UgTlVNQkVSOlxuICAgIGNhc2UgRkxPQVQ6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnJlYWw7XG4gICAgY2FzZSBJTlQ6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI7XG4gICAgY2FzZSBCT09MRUFOOlxuICAgICAgcmV0dXJuIEFMTF9GSUVMRF9UWVBFUy5ib29sZWFuO1xuICAgIGNhc2UgR0VPTUVUUlk6XG4gICAgY2FzZSBHRU9NRVRSWV9GUk9NX1NUUklORzpcbiAgICBjYXNlIFBBSVJfR0VPTUVUUllfRlJPTV9TVFJJTkc6XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLmdlb2pzb247XG4gICAgY2FzZSBTVFJJTkc6XG4gICAgY2FzZSBDSVRZOlxuICAgIGNhc2UgWklQQ09ERTpcbiAgICAgIHJldHVybiBBTExfRklFTERfVFlQRVMuc3RyaW5nO1xuICAgIGRlZmF1bHQ6XG4gICAgICBnbG9iYWxDb25zb2xlLndhcm4oYFVuc3VwcG9ydGVkIGFuYWx5emVyIHR5cGU6ICR7YVR5cGV9YCk7XG4gICAgICByZXR1cm4gQUxMX0ZJRUxEX1RZUEVTLnN0cmluZztcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbi8qKlxuICogUHJvY2VzcyBkYXRhIHdoZXJlIGVhY2ggcm93IGlzIGFuIG9iamVjdCwgb3V0cHV0IGNhbiBiZSBwYXNzZWQgdG8gW2BhZGREYXRhVG9NYXBgXSguLi9hY3Rpb25zL2FjdGlvbnMubWQjYWRkZGF0YXRvbWFwKVxuICogQHBhcmFtIHtPYmplY3R9IHJhd0RhdGEgYW4gYXJyYXkgb2Ygb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBkYXRhc2V0IGNvbnRhaW5pbmcgYGZpZWxkc2AgYW5kIGByb3dzYFxuICogQHB1YmxpY1xuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdrZXBsZXIuZ2wvYWN0aW9ucyc7XG4gKiBpbXBvcnQge3Byb2Nlc3NSb3dPYmplY3R9IGZyb20gJ2tlcGxlci5nbC9wcm9jZXNzb3JzJztcbiAqXG4gKiBjb25zdCBkYXRhID0gW1xuICogIHtsYXQ6IDMxLjI3LCBsbmc6IDEyNy41NiwgdmFsdWU6IDN9LFxuICogIHtsYXQ6IDMxLjIyLCBsbmc6IDEyNi4yNiwgdmFsdWU6IDF9XG4gKiBdO1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcCh7XG4gKiAgZGF0YXNldHM6IHtcbiAqICAgIGluZm86IHtsYWJlbDogJ015IERhdGEnLCBpZDogJ215X2RhdGEnfSxcbiAqICAgIGRhdGE6IHByb2Nlc3NSb3dPYmplY3QoZGF0YSlcbiAqICB9XG4gKiB9KSk7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9jZXNzUm93T2JqZWN0KHJhd0RhdGEpIHtcbiAgaWYgKCFyYXdEYXRhLmxlbmd0aCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJhd0RhdGFbMF0pO1xuICBjb25zdCByb3dzID0gcmF3RGF0YS5tYXAoZCA9PiBrZXlzLm1hcChrZXkgPT4gZFtrZXldKSk7XG4gIGNvbnN0IGZpZWxkcyA9IGdldEZpZWxkc0Zyb21EYXRhKHJhd0RhdGEsIGtleXMpO1xuXG4gIHJldHVybiB7XG4gICAgZmllbGRzLFxuICAgIHJvd3NcbiAgfTtcbn1cblxuLyoqXG4gKiBQcm9jZXNzIEdlb0pTT04gW2BGZWF0dXJlQ29sbGVjdGlvbmBdKGh0dHA6Ly93aWtpLmdlb2pzb24ub3JnL0dlb0pTT05fZHJhZnRfdmVyc2lvbl82I0ZlYXR1cmVDb2xsZWN0aW9uKSxcbiAqIG91dHB1dCBhIGRhdGEgb2JqZWN0IHdpdGggYHtmaWVsZHM6IFtdLCByb3dzOiBbXX1gLlxuICogVGhlIGRhdGEgb2JqZWN0IGNhbiBiZSB3cmFwcGVkIGluIGEgYGRhdGFzZXRgIGFuZCBwYXNzIHRvIFtgYWRkRGF0YVRvTWFwYF0oLi4vYWN0aW9ucy9hY3Rpb25zLm1kI2FkZGRhdGF0b21hcClcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmF3RGF0YSByYXcgZ2VvanNvbiBmZWF0dXJlIGNvbGxlY3Rpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9IGRhdGFzZXQgY29udGFpbmluZyBgZmllbGRzYCBhbmQgYHJvd3NgXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHthZGREYXRhVG9NYXB9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCB7cHJvY2Vzc0dlb2pzb259IGZyb20gJ2tlcGxlci5nbC9wcm9jZXNzb3JzJztcbiAqXG4gKiBjb25zdCBnZW9qc29uID0ge1xuICogXHRcInR5cGVcIiA6IFwiRmVhdHVyZUNvbGxlY3Rpb25cIixcbiAqIFx0XCJmZWF0dXJlc1wiIDogW3tcbiAqIFx0XHRcInR5cGVcIiA6IFwiRmVhdHVyZVwiLFxuICogXHRcdFwicHJvcGVydGllc1wiIDoge1xuICogXHRcdFx0XCJjYXBhY2l0eVwiIDogXCIxMFwiLFxuICogXHRcdFx0XCJ0eXBlXCIgOiBcIlUtUmFja1wiXG4gKiBcdFx0fSxcbiAqIFx0XHRcImdlb21ldHJ5XCIgOiB7XG4gKiBcdFx0XHRcInR5cGVcIiA6IFwiUG9pbnRcIixcbiAqIFx0XHRcdFwiY29vcmRpbmF0ZXNcIiA6IFsgLTcxLjA3MzI4MywgNDIuNDE3NTAwIF1cbiAqIFx0XHR9XG4gKiBcdH1dXG4gKiB9O1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcCh7XG4gKiAgZGF0YXNldHM6IHtcbiAqICAgIGluZm86IHtcbiAqICAgICAgbGFiZWw6ICdTYW1wbGUgVGF4aSBUcmlwcyBpbiBOZXcgWW9yayBDaXR5JyxcbiAqICAgICAgaWQ6ICd0ZXN0X3RyaXBfZGF0YSdcbiAqICAgIH0sXG4gKiAgICBkYXRhOiBwcm9jZXNzR2VvanNvbihnZW9qc29uKVxuICogIH1cbiAqIH0pKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NHZW9qc29uKHJhd0RhdGEpIHtcbiAgY29uc3Qgbm9ybWFsaXplZEdlb2pzb24gPSBub3JtYWxpemUocmF3RGF0YSk7XG5cbiAgaWYgKCFub3JtYWxpemVkR2VvanNvbiB8fCAhQXJyYXkuaXNBcnJheShub3JtYWxpemVkR2VvanNvbi5mZWF0dXJlcykpIHtcbiAgICAvLyBmYWlsIHRvIG5vcm1hbGl6ZSBnZW9qc29uXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBnZXR0aW5nIGFsbCBmZWF0dXJlIGZpZWxkc1xuICBjb25zdCBhbGxEYXRhID0gbm9ybWFsaXplZEdlb2pzb24uZmVhdHVyZXMucmVkdWNlKChhY2N1LCBmLCBpKSA9PiB7XG4gICAgaWYgKGYuZ2VvbWV0cnkpIHtcbiAgICAgIGFjY3UucHVzaCh7XG4gICAgICAgIC8vIGFkZCBmZWF0dXJlIHRvIF9nZW9qc29uIGZpZWxkXG4gICAgICAgIF9nZW9qc29uOiBmLFxuICAgICAgICAuLi4oZi5wcm9wZXJ0aWVzIHx8IHt9KVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBhY2N1O1xuICB9LCBbXSk7XG5cbiAgLy8gZ2V0IGFsbCB0aGUgZmllbGRcbiAgY29uc3QgZmllbGRzID0gYWxsRGF0YS5yZWR1Y2UoKHByZXYsIGN1cnIpID0+IHtcbiAgICBPYmplY3Qua2V5cyhjdXJyKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXByZXYuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBwcmV2LnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcHJldjtcbiAgfSwgW10pO1xuXG4gIC8vIG1ha2Ugc3VyZSBlYWNoIGZlYXR1cmUgaGFzIGV4YWN0IHNhbWUgZmllbGRzXG4gIGFsbERhdGEuZm9yRWFjaChkID0+IHtcbiAgICBmaWVsZHMuZm9yRWFjaChmID0+IHtcbiAgICAgIGlmICghKGYgaW4gZCkpIHtcbiAgICAgICAgZFtmXSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiBwcm9jZXNzUm93T2JqZWN0KGFsbERhdGEpO1xufVxuXG4vKipcbiAqIE9uIGV4cG9ydCBkYXRhIHRvIGNzdlxuICogQHBhcmFtIHtBcnJheTxBcnJheT59IGRhdGEgYGRhdGFzZXQuYWxsRGF0YWAgb3IgZmlsdGVyZWQgZGF0YSBgZGF0YXNldC5kYXRhYFxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmaWVsZHMgYGRhdGFzZXQuZmllbGRzYFxuICogQHJldHVybnMge3N0cmluZ30gY3N2IHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q3N2KGRhdGEsIGZpZWxkcykge1xuICBjb25zdCBjb2x1bW5zID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG4gIGNvbnN0IGZvcm1hdHRlZERhdGEgPSBbY29sdW1uc107XG5cbiAgLy8gcGFyc2UgZ2VvanNvbiBvYmplY3QgYXMgc3RyaW5nXG4gIGRhdGEuZm9yRWFjaChyb3cgPT4ge1xuICAgIGZvcm1hdHRlZERhdGEucHVzaChcbiAgICAgIHJvdy5tYXAoXG4gICAgICAgIChkLCBpKSA9PiBkICYmIEdFT0pTT05fRklFTERTLmdlb2pzb24uaW5jbHVkZXMoZmllbGRzW2ldLm5hbWUpID9cbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShkKSA6IGRcbiAgICAgIClcbiAgICApXG4gIH0pO1xuXG4gIHJldHVybiBjc3ZGb3JtYXRSb3dzKGZvcm1hdHRlZERhdGEpO1xufVxuXG4vKipcbiAqIFZhbGlkYXRlIGlucHV0IGRhdGEsIGFkZGluZyBtaXNzaW5nIGZpZWxkIHR5cGVzLCByZW5hbWUgZHVwbGljYXRlIGNvbHVtbnNcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcmV0dXJucyB7e2FsbERhdGE6IEFycmF5LCBmaWVsZHM6IEFycmF5fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSW5wdXREYXRhKGRhdGEpIHtcbiAgLy8gVE9ETzogYWRkIHRlc3RcbiAgLypcbiAgICogZXhwZWN0ZWQgaW5wdXQgZGF0YSBmb3JtYXRcbiAgICoge1xuICAgKiAgIGZpZWxkczogW10sXG4gICAqICAgcm93czogW11cbiAgICogfVxuICAgKi9cbiAgbGV0IHByb2NlZWQgPSB0cnVlO1xuICBpZiAoIWRhdGEpIHtcbiAgICBhc3NlcnQoJ3JlY2VpdmVWaXNEYXRhOiBkYXRhIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgcHJvY2VlZCA9IGZhbHNlO1xuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEuZmllbGRzKSkge1xuICAgIGFzc2VydCgncmVjZWl2ZVZpc0RhdGE6IGV4cGVjdCBkYXRhLmZpZWxkcyB0byBiZSBhbiBhcnJheScpO1xuICAgIHByb2NlZWQgPSBmYWxzZTtcbiAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShkYXRhLnJvd3MpKSB7XG4gICAgYXNzZXJ0KCdyZWNlaXZlVmlzRGF0YTogZXhwZWN0IGRhdGEucm93cyB0byBiZSBhbiBhcnJheScpO1xuICAgIHByb2NlZWQgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghcHJvY2VlZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qge2ZpZWxkcywgcm93c30gPSBkYXRhO1xuXG4gIC8vIGNoZWNrIGlmIGFsbCBmaWVsZHMgaGFzIG5hbWUsIGZvcm1hdCBhbmQgdHlwZVxuICBjb25zdCBhbGxWYWxpZCA9IGZpZWxkcy5ldmVyeSgoZiwgaSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZiAhPT0gJ29iamVjdCcpIHtcbiAgICAgIGFzc2VydChgZmllbGRzIG5lZWRzIHRvIGJlIGFuIGFycmF5IG9mIG9iamVjdCwgYnV0IGZpbmQgJHt0eXBlb2YgZn1gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWYubmFtZSkge1xuICAgICAgYXNzZXJ0KFxuICAgICAgICBgZmllbGQubmFtZSBpcyByZXF1aXJlZCBidXQgbWlzc2luZyBpbiBmaWVsZCAke0pTT04uc3RyaW5naWZ5KGYpfWBcbiAgICAgICk7XG4gICAgICAvLyBhc3NpZ24gYSBuYW1lXG4gICAgICBmLm5hbWUgPSBgY29sdW1uXyR7aX1gO1xuICAgIH1cblxuICAgIGlmICghQUxMX0ZJRUxEX1RZUEVTW2YudHlwZV0pIHtcbiAgICAgIGFzc2VydChgdW5rbm93biBmaWVsZCB0eXBlICR7Zi50eXBlfWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBmLnR5cGUgIT09IEFMTF9GSUVMRF9UWVBFUy50aW1lc3RhbXAgfHwgdHlwZW9mIGYuZm9ybWF0ID09PSAnc3RyaW5nJztcbiAgfSk7XG5cbiAgaWYgKGFsbFZhbGlkKSB7XG4gICAgcmV0dXJuIHtyb3dzLCBmaWVsZHN9O1xuICB9XG5cbiAgLy8gaWYgYW55IGZpZWxkIGhhcyBtaXNzaW5nIHR5cGUsIHJlY2FsY3VsYXRlIGl0IGZvciBldmVyeW9uZVxuICAvLyBiZWNhdXNlIHdlIHNpbXBseSBsb3N0IGZhaXRoIGluIGh1bWFuaXR5XG4gIGNvbnN0IHNhbXBsZURhdGEgPSBnZXRTYW1wbGVGb3JUeXBlQW5hbHl6ZSh7ZmllbGRzOiBmaWVsZHMubWFwKGYgPT4gZi5uYW1lKSwgYWxsRGF0YTogcm93c30pO1xuICBjb25zdCBmaWVsZE9yZGVyID0gZmllbGRzLm1hcChmID0+IGYubmFtZSk7XG4gIGNvbnN0IG1ldGEgPSBnZXRGaWVsZHNGcm9tRGF0YShzYW1wbGVEYXRhLCBmaWVsZE9yZGVyKTtcbiAgY29uc3QgdXBkYXRlZEZpZWxkcyA9IGZpZWxkcy5tYXAoKGYsIGkpID0+ICh7XG4gICAgLi4uZixcbiAgICB0eXBlOiBtZXRhW2ldLnR5cGUsXG4gICAgZm9ybWF0OiBtZXRhW2ldLmZvcm1hdFxuICB9KSk7XG5cbiAgcmV0dXJuIHtmaWVsZHM6IHVwZGF0ZWRGaWVsZHMsIHJvd3N9O1xufVxuXG4vKipcbiAqIFByb2Nlc3Mgc2F2ZWQga2VwbGVyLmdsIGpzb24gdG8gYmUgcGFzcyB0byBbYGFkZERhdGFUb01hcGBdKC4uL2FjdGlvbnMvYWN0aW9ucy5tZCNhZGRkYXRhdG9tYXApLlxuICogVGhlIGpzb24gb2JqZWN0IHNob3VsZCBjb250YWluIGBkYXRhc2V0c2AgYW5kIGBjb25maWdgLlxuICogQHBhcmFtIHtPYmplY3R9IHJhd0RhdGFcbiAqIEBwYXJhbSB7QXJyYXl9IHJhd0RhdGEuZGF0YXNldHNcbiAqIEBwYXJhbSB7T2JqZWN0fSByYXdEYXRhLmNvbmZpZ1xuICogQHJldHVybnMge09iamVjdH0gZGF0YXNldHMgYW5kIGNvbmZpZyBge2RhdGFzZXRzOiB7fSwgY29uZmlnOiB7fX1gXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHthZGREYXRhVG9NYXB9IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCB7cHJvY2Vzc0tlcGxlcmdsSlNPTn0gZnJvbSAna2VwbGVyLmdsL3Byb2Nlc3NvcnMnO1xuICpcbiAqIGRpc3BhdGNoKGFkZERhdGFUb01hcChwcm9jZXNzS2VwbGVyZ2xKU09OKGtlcGxlckdsSnNvbikpKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NLZXBsZXJnbEpTT04ocmF3RGF0YSkge1xuICByZXR1cm4gcmF3RGF0YVxuICAgID8gS2VwbGVyR2xTY2hlbWEubG9hZChyYXdEYXRhLmRhdGFzZXRzLCByYXdEYXRhLmNvbmZpZylcbiAgICA6IG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBQcm9jZXNzb3JzID0ge1xuICBwcm9jZXNzR2VvanNvbixcbiAgcHJvY2Vzc0NzdkRhdGEsXG4gIHByb2Nlc3NSb3dPYmplY3QsXG4gIHByb2Nlc3NLZXBsZXJnbEpTT04sXG4gIGFuYWx5emVyVHlwZVRvRmllbGRUeXBlLFxuICBnZXRGaWVsZHNGcm9tRGF0YSxcbiAgcGFyc2VDc3ZSb3dzQnlGaWVsZFR5cGVcbn1cbiJdfQ==