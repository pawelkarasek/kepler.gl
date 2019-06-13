"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefaultFilter = getDefaultFilter;
exports.getFilterProps = getFilterProps;
exports.getFieldDomain = getFieldDomain;
exports.filterData = filterData;
exports.isDataMatchFilter = isDataMatchFilter;
exports.adjustValueToFilterDomain = adjustValueToFilterDomain;
exports.getNumericFieldDomain = getNumericFieldDomain;
exports.getTimestampFieldDomain = getTimestampFieldDomain;
exports.histogramConstruct = histogramConstruct;
exports.formatNumberByStep = formatNumberByStep;
exports.isInRange = isInRange;
exports.getTimeWidgetTitleFormatter = getTimeWidgetTitleFormatter;
exports.getTimeWidgetHintFormatter = getTimeWidgetHintFormatter;
exports.isValidFilterValue = isValidFilterValue;
exports.getFilterPlot = getFilterPlot;
exports.getDefaultFilterPlotType = getDefaultFilterPlotType;
exports.TIME_ANIMATION_SPEED = exports.BASE_SPEED = exports.FILTER_COMPONENTS = exports.PLOT_TYPES = exports.FILTER_TYPES = exports.enlargedHistogramBins = exports.histogramBins = exports.TimestampStepMap = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _moment = _interopRequireDefault(require("moment"));

var _d3Array = require("d3-array");

var _keymirror = _interopRequireDefault(require("keymirror"));

var _defaultSettings = require("../constants/default-settings");

var _dataUtils = require("./data-utils");

var ScaleUtils = _interopRequireWildcard(require("./data-scale-utils"));

var _utils = require("./utils");

var _FILTER_TYPES$timeRan, _FILTER_TYPES$range, _SupportedPlotType, _FILTER_COMPONENTS;

var TimestampStepMap = [{
  max: 1,
  step: 0.05
}, {
  max: 10,
  step: 0.1
}, {
  max: 100,
  step: 1
}, {
  max: 500,
  step: 5
}, {
  max: 1000,
  step: 10
}, {
  max: 5000,
  step: 50
}, {
  max: Number.POSITIVE_INFINITY,
  step: 1000
}];
exports.TimestampStepMap = TimestampStepMap;
var histogramBins = 30;
exports.histogramBins = histogramBins;
var enlargedHistogramBins = 100;
exports.enlargedHistogramBins = enlargedHistogramBins;
var durationSecond = 1000;
var durationMinute = durationSecond * 60;
var durationHour = durationMinute * 60;
var durationDay = durationHour * 24;
var durationWeek = durationDay * 7;
var durationYear = durationDay * 365;
var FILTER_TYPES = (0, _keymirror["default"])({
  range: null,
  select: null,
  timeRange: null,
  multiSelect: null
});
exports.FILTER_TYPES = FILTER_TYPES;
var PLOT_TYPES = (0, _keymirror["default"])({
  histogram: null,
  lineChart: null
});
exports.PLOT_TYPES = PLOT_TYPES;
var SupportedPlotType = (_SupportedPlotType = {}, (0, _defineProperty2["default"])(_SupportedPlotType, FILTER_TYPES.timeRange, (_FILTER_TYPES$timeRan = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$timeRan, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$timeRan)), (0, _defineProperty2["default"])(_SupportedPlotType, FILTER_TYPES.range, (_FILTER_TYPES$range = {
  "default": 'histogram'
}, (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.integer, 'lineChart'), (0, _defineProperty2["default"])(_FILTER_TYPES$range, _defaultSettings.ALL_FIELD_TYPES.real, 'lineChart'), _FILTER_TYPES$range)), _SupportedPlotType);
var FILTER_COMPONENTS = (_FILTER_COMPONENTS = {}, (0, _defineProperty2["default"])(_FILTER_COMPONENTS, FILTER_TYPES.select, 'SingleSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, FILTER_TYPES.multiSelect, 'MultiSelectFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, FILTER_TYPES.timeRange, 'TimeRangeFilter'), (0, _defineProperty2["default"])(_FILTER_COMPONENTS, FILTER_TYPES.range, 'RangeFilter'), _FILTER_COMPONENTS);
exports.FILTER_COMPONENTS = FILTER_COMPONENTS;
var BASE_SPEED = 600;
exports.BASE_SPEED = BASE_SPEED;
var TIME_ANIMATION_SPEED = [{
  label: '0.5x',
  value: 0.5
}, {
  label: '1x',
  value: 1
}, {
  label: '2x',
  value: 2
}, {
  label: '4x',
  value: 4
}];
exports.TIME_ANIMATION_SPEED = TIME_ANIMATION_SPEED;

function getDefaultFilter(dataId) {
  return {
    // link to dataset Id
    dataId: dataId,
    // should allow to edit dataId
    freeze: false,
    id: (0, _utils.generateHashId)(4),
    // time range filter specific
    fixedDomain: false,
    enlarged: false,
    isAnimating: false,
    speed: 1,
    // field specific
    name: null,
    type: null,
    fieldIdx: null,
    domain: null,
    value: null,
    // plot
    plotType: PLOT_TYPES.histogram,
    yAxis: null,
    interval: null
  };
}
/**
 * Get default filter prop based on field type
 *
 * @param {Object[]} data
 * @param {object} field
 * @returns {object} default filter
 */


function getFilterProps(data, field) {
  var filterProp = (0, _objectSpread2["default"])({}, getFieldDomain(data, field), {
    fieldType: field.type
  });

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      return (0, _objectSpread2["default"])({}, filterProp, {
        value: filterProp.domain,
        type: FILTER_TYPES.range,
        typeOptions: [FILTER_TYPES.range]
      });

    case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
      return (0, _objectSpread2["default"])({}, filterProp, {
        type: FILTER_TYPES.select,
        value: true
      });

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      return (0, _objectSpread2["default"])({}, filterProp, {
        type: FILTER_TYPES.multiSelect,
        value: []
      });

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return (0, _objectSpread2["default"])({}, filterProp, {
        type: FILTER_TYPES.timeRange,
        enlarged: true,
        fixedDomain: true,
        value: filterProp.domain
      });

    default:
      return {};
  }
}
/**
 * Calculate field domain based on field type and data
 *
 * @param {Object[]} data
 * @param {object} field
 * @returns {object} with domain as key
 */


function getFieldDomain(data, field) {
  var fieldIdx = field.tableFieldIndex - 1;
  var isTime = field.type === _defaultSettings.ALL_FIELD_TYPES.timestamp;

  var valueAccessor = _dataUtils.maybeToDate.bind(null, isTime, fieldIdx, field.format);

  var domain;

  switch (field.type) {
    case _defaultSettings.ALL_FIELD_TYPES.real:
    case _defaultSettings.ALL_FIELD_TYPES.integer:
      // calculate domain and step
      return getNumericFieldDomain(data, valueAccessor);

    case _defaultSettings.ALL_FIELD_TYPES["boolean"]:
      return {
        domain: [true, false]
      };

    case _defaultSettings.ALL_FIELD_TYPES.string:
    case _defaultSettings.ALL_FIELD_TYPES.date:
      domain = ScaleUtils.getOrdinalDomain(data, valueAccessor);
      return {
        domain: domain
      };

    case _defaultSettings.ALL_FIELD_TYPES.timestamp:
      return getTimestampFieldDomain(data, valueAccessor);

    default:
      return {
        domain: ScaleUtils.getOrdinalDomain(data, valueAccessor)
      };
  }
}
/**
 * Filter data based on an array of filters
 *
 * @param {Object[]} data
 * @param {string} dataId
 * @param {Object[]} filters
 * @returns {Object[]} data
 * @returns {Number[]} filteredIndex
 */


function filterData(data, dataId, filters) {
  if (!data || !dataId) {
    // why would there not be any data? are we over doing this?
    return {
      data: [],
      filteredIndex: []
    };
  }

  if (!filters.length) {
    return {
      data: data,
      filteredIndex: data.map(function (d, i) {
        return i;
      })
    };
  }

  var appliedFilters = filters.filter(function (d) {
    return d.dataId === dataId && d.fieldIdx > -1 && d.value !== null;
  });

  var _appliedFilters$reduc = appliedFilters.reduce(function (accu, f) {
    if (f.dataId === dataId && f.fieldIdx > -1 && f.value !== null) {
      (f.fixedDomain ? accu[1] : accu[0]).push(f);
    }

    return accu;
  }, [[], []]),
      _appliedFilters$reduc2 = (0, _slicedToArray2["default"])(_appliedFilters$reduc, 2),
      dynamicDomainFilters = _appliedFilters$reduc2[0],
      fixedDomainFilters = _appliedFilters$reduc2[1]; // console.log(dynamicDomainFilters)
  // console.log(fixedDomainFilters)
  // we save a reference of allData index here to access dataToFeature
  // in geojson and hexgonId layer
  // console.time('filterData');


  var _data$reduce = data.reduce(function (accu, d, i) {
    // generate 2 sets of
    // filter data used to calculate layer Domain
    var matchForDomain = dynamicDomainFilters.every(function (filter) {
      return isDataMatchFilter(d, filter, i);
    });

    if (matchForDomain) {
      accu.filteredIndexForDomain.push(i); // filter data for render

      var matchForRender = fixedDomainFilters.every(function (filter) {
        return isDataMatchFilter(d, filter, i);
      });

      if (matchForRender) {
        accu.filtered.push(d);
        accu.filteredIndex.push(i);
      }
    }

    return accu;
  }, {
    filtered: [],
    filteredIndex: [],
    filteredIndexForDomain: []
  }),
      filtered = _data$reduce.filtered,
      filteredIndex = _data$reduce.filteredIndex,
      filteredIndexForDomain = _data$reduce.filteredIndexForDomain; // console.log('data==', data.length)
  // console.log('filtered==', filtered.length)
  // console.log('filteredIndex==', filteredIndex.length)
  // console.log('filteredIndexForDomain==', filteredIndexForDomain.length)
  //
  // console.timeEnd('filterData');


  return {
    data: filtered,
    filteredIndex: filteredIndex,
    filteredIndexForDomain: filteredIndexForDomain
  };
}
/**
 * Check if value is in range of filter
 *
 * @param {Object[]} data
 * @param {Object} filter
 * @param {number} i
 * @returns {Boolean} - whether value falls in the range of the filter
 */


function isDataMatchFilter(data, filter, i) {
  var val = data[filter.fieldIdx];

  if (!filter.type) {
    return true;
  }

  switch (filter.type) {
    case FILTER_TYPES.range:
      return isInRange(val, filter.value);

    case FILTER_TYPES.timeRange:
      var timeVal = filter.mappedValue ? filter.mappedValue[i] : _moment["default"].utc(val).valueOf();
      return isInRange(timeVal, filter.value);

    case FILTER_TYPES.multiSelect:
      return filter.value.includes(val);

    case FILTER_TYPES.select:
      return filter.value === val;

    default:
      return true;
  }
}
/**
 * Call by parsing filters from URL
 * Check if value of filter within filter domain, if not adjust it to match
 * filter domain
 *
 * @param {string[] | string | number | number[]} value
 * @param {Array} filter.domain
 * @param {String} filter.type
 * @returns {*} - adjusted value to match filter or null to remove filter
 */

/* eslint-disable complexity */


function adjustValueToFilterDomain(value, _ref) {
  var domain = _ref.domain,
      type = _ref.type;

  if (!domain || !type) {
    return false;
  }

  switch (type) {
    case FILTER_TYPES.range:
    case FILTER_TYPES.timeRange:
      if (!Array.isArray(value) || value.length !== 2) {
        return domain.map(function (d) {
          return d;
        });
      }

      return value.map(function (d, i) {
        return (0, _dataUtils.notNullorUndefined)(d) && isInRange(d, domain) ? d : domain[i];
      });

    case FILTER_TYPES.multiSelect:
      if (!Array.isArray(value)) {
        return [];
      }

      var filteredValue = value.filter(function (d) {
        return domain.includes(d);
      });
      return filteredValue.length ? filteredValue : [];

    case FILTER_TYPES.select:
      return domain.includes(value) ? value : true;

    default:
      return null;
  }
}
/* eslint-enable complexity */

/**
 * Calculate numeric domain and suitable step
 *
 * @param {Object[]} data
 * @param {function} valueAccessor
 * @returns {object} domain and step
 */


function getNumericFieldDomain(data, valueAccessor) {
  var domain = [0, 1];
  var step = 0.1;
  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];

  if (Array.isArray(data) && data.length > 1) {
    domain = ScaleUtils.getLinearDomain(mappedValue);
    var diff = domain[1] - domain[0]; // in case equal domain, [96, 96], which will break quantize scale

    if (!diff) {
      domain[1] = domain[0] + 1;
    }

    step = getNumericStepSize(diff) || step;
    domain[0] = formatNumberByStep(domain[0], step, 'floor');
    domain[1] = formatNumberByStep(domain[1], step, 'ceil');
  }

  var _getHistogram = getHistogram(domain, mappedValue),
      histogram = _getHistogram.histogram,
      enlargedHistogram = _getHistogram.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}

function getNumericStepSize(diff) {
  if (diff > 100) {
    return 1;
  } else if (diff < 20 && diff > 3) {
    return 0.01;
  } else if (diff <= 3) {
    return 0.001;
  }
}
/**
 * Calculate timestamp domain and suitable step
 *
 * @param {Object[]} data
 * @param {function} valueAccessor
 * @returns {object} domain and step
 */


function getTimestampFieldDomain(data, valueAccessor) {
  // to avoid converting string format time to epoch
  // every time we compare we store a value mapped to int in filter domain
  var mappedValue = Array.isArray(data) ? data.map(valueAccessor) : [];
  var domain = ScaleUtils.getLinearDomain(mappedValue);
  var step = 0.01;
  var diff = domain[1] - domain[0];
  var entry = TimestampStepMap.find(function (f) {
    return f.max >= diff;
  });

  if (entry) {
    step = entry.step;
  }

  var _getHistogram2 = getHistogram(domain, mappedValue),
      histogram = _getHistogram2.histogram,
      enlargedHistogram = _getHistogram2.enlargedHistogram;

  return {
    domain: domain,
    step: step,
    mappedValue: mappedValue,
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}

function histogramConstruct(domain, mappedValue, bins) {
  return (0, _d3Array.histogram)().thresholds((0, _d3Array.ticks)(domain[0], domain[1], bins)).domain(domain)(mappedValue).map(function (bin) {
    return {
      count: bin.length,
      x0: bin.x0,
      x1: bin.x1
    };
  });
}
/**
 * Calculate histogram from domain and array of values
 *
 * @param {number[]} domain
 * @param {Object[]} mappedValue
 * @returns {Array[]} histogram
 */


function getHistogram(domain, mappedValue) {
  var histogram = histogramConstruct(domain, mappedValue, histogramBins);
  var enlargedHistogram = histogramConstruct(domain, mappedValue, enlargedHistogramBins);
  return {
    histogram: histogram,
    enlargedHistogram: enlargedHistogram
  };
}
/**
 * round number based on step
 *
 * @param {number} val
 * @param {number} step
 * @param {string} bound
 * @returns {number} rounded number
 */


function formatNumberByStep(val, step, bound) {
  if (bound === 'floor') {
    return Math.floor(val * (1 / step)) / (1 / step);
  }

  return Math.ceil(val * (1 / step)) / (1 / step);
}

function isInRange(val, domain) {
  if (!Array.isArray(domain)) {
    return false;
  }

  return val >= domain[0] && val <= domain[1];
}

function getTimeWidgetTitleFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationDay ? 'MM/DD hha' : 'MM/DD hh:mma';
}

function getTimeWidgetHintFormatter(domain) {
  if (!Array.isArray(domain)) {
    return null;
  }

  var diff = domain[1] - domain[0];
  return diff > durationYear ? 'MM/DD/YY' : diff > durationWeek ? 'MM/DD' : diff > durationDay ? 'MM/DD hha' : diff > durationHour ? 'hh:mma' : 'hh:mm:ssa';
}
/**
 * Sanity check on filters to prepare for save
 * @param {String} type - filter type
 * @param {*} value - filter value
 * @returns {boolean} whether filter is value
 */


function isValidFilterValue(_ref2) {
  var type = _ref2.type,
      value = _ref2.value;

  if (!type) {
    return false;
  }

  switch (type) {
    case FILTER_TYPES.select:
      return value === true || value === false;

    case FILTER_TYPES.range:
    case FILTER_TYPES.timeRange:
      return Array.isArray(value) && value.every(function (v) {
        return v !== null && !isNaN(v);
      });

    case FILTER_TYPES.multiSelect:
      return Array.isArray(value) && Boolean(value.length);

    case FILTER_TYPES.input:
      return Boolean(value.length);

    default:
      return true;
  }
}

function getFilterPlot(filter, allData) {
  if (filter.plotType === PLOT_TYPES.histogram || !filter.yAxis) {
    // histogram should be calculated when create filter
    return {};
  }

  var mappedValue = filter.mappedValue;
  var yAxis = filter.yAxis; // return lineChart

  var series = allData.map(function (d, i) {
    return {
      x: mappedValue[i],
      y: d[yAxis.tableFieldIndex - 1]
    };
  }).filter(function (_ref3) {
    var x = _ref3.x,
        y = _ref3.y;
    return Number.isFinite(x) && Number.isFinite(y);
  }).sort(function (a, b) {
    return (0, _d3Array.ascending)(a.x, b.x);
  });
  var yDomain = (0, _d3Array.extent)(series, function (d) {
    return d.y;
  });
  var xDomain = [series[0].x, series[series.length - 1].x];
  return {
    lineChart: {
      series: series,
      yDomain: yDomain,
      xDomain: xDomain
    },
    yAxis: yAxis
  };
}

function getDefaultFilterPlotType(filter) {
  var filterPlotTypes = SupportedPlotType[filter.type];

  if (!filterPlotTypes) {
    return null;
  }

  if (!filter.yAxis) {
    return filterPlotTypes["default"];
  }

  return filterPlotTypes[filter.yAxis.type] || null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWx0ZXItdXRpbHMuanMiXSwibmFtZXMiOlsiVGltZXN0YW1wU3RlcE1hcCIsIm1heCIsInN0ZXAiLCJOdW1iZXIiLCJQT1NJVElWRV9JTkZJTklUWSIsImhpc3RvZ3JhbUJpbnMiLCJlbmxhcmdlZEhpc3RvZ3JhbUJpbnMiLCJkdXJhdGlvblNlY29uZCIsImR1cmF0aW9uTWludXRlIiwiZHVyYXRpb25Ib3VyIiwiZHVyYXRpb25EYXkiLCJkdXJhdGlvbldlZWsiLCJkdXJhdGlvblllYXIiLCJGSUxURVJfVFlQRVMiLCJyYW5nZSIsInNlbGVjdCIsInRpbWVSYW5nZSIsIm11bHRpU2VsZWN0IiwiUExPVF9UWVBFUyIsImhpc3RvZ3JhbSIsImxpbmVDaGFydCIsIlN1cHBvcnRlZFBsb3RUeXBlIiwiQUxMX0ZJRUxEX1RZUEVTIiwiaW50ZWdlciIsInJlYWwiLCJGSUxURVJfQ09NUE9ORU5UUyIsIkJBU0VfU1BFRUQiLCJUSU1FX0FOSU1BVElPTl9TUEVFRCIsImxhYmVsIiwidmFsdWUiLCJnZXREZWZhdWx0RmlsdGVyIiwiZGF0YUlkIiwiZnJlZXplIiwiaWQiLCJmaXhlZERvbWFpbiIsImVubGFyZ2VkIiwiaXNBbmltYXRpbmciLCJzcGVlZCIsIm5hbWUiLCJ0eXBlIiwiZmllbGRJZHgiLCJkb21haW4iLCJwbG90VHlwZSIsInlBeGlzIiwiaW50ZXJ2YWwiLCJnZXRGaWx0ZXJQcm9wcyIsImRhdGEiLCJmaWVsZCIsImZpbHRlclByb3AiLCJnZXRGaWVsZERvbWFpbiIsImZpZWxkVHlwZSIsInR5cGVPcHRpb25zIiwic3RyaW5nIiwiZGF0ZSIsInRpbWVzdGFtcCIsInRhYmxlRmllbGRJbmRleCIsImlzVGltZSIsInZhbHVlQWNjZXNzb3IiLCJtYXliZVRvRGF0ZSIsImJpbmQiLCJmb3JtYXQiLCJnZXROdW1lcmljRmllbGREb21haW4iLCJTY2FsZVV0aWxzIiwiZ2V0T3JkaW5hbERvbWFpbiIsImdldFRpbWVzdGFtcEZpZWxkRG9tYWluIiwiZmlsdGVyRGF0YSIsImZpbHRlcnMiLCJmaWx0ZXJlZEluZGV4IiwibGVuZ3RoIiwibWFwIiwiZCIsImkiLCJhcHBsaWVkRmlsdGVycyIsImZpbHRlciIsInJlZHVjZSIsImFjY3UiLCJmIiwicHVzaCIsImR5bmFtaWNEb21haW5GaWx0ZXJzIiwiZml4ZWREb21haW5GaWx0ZXJzIiwibWF0Y2hGb3JEb21haW4iLCJldmVyeSIsImlzRGF0YU1hdGNoRmlsdGVyIiwiZmlsdGVyZWRJbmRleEZvckRvbWFpbiIsIm1hdGNoRm9yUmVuZGVyIiwiZmlsdGVyZWQiLCJ2YWwiLCJpc0luUmFuZ2UiLCJ0aW1lVmFsIiwibWFwcGVkVmFsdWUiLCJtb21lbnQiLCJ1dGMiLCJ2YWx1ZU9mIiwiaW5jbHVkZXMiLCJhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyZWRWYWx1ZSIsImdldExpbmVhckRvbWFpbiIsImRpZmYiLCJnZXROdW1lcmljU3RlcFNpemUiLCJmb3JtYXROdW1iZXJCeVN0ZXAiLCJnZXRIaXN0b2dyYW0iLCJlbmxhcmdlZEhpc3RvZ3JhbSIsImVudHJ5IiwiZmluZCIsImhpc3RvZ3JhbUNvbnN0cnVjdCIsImJpbnMiLCJ0aHJlc2hvbGRzIiwiYmluIiwiY291bnQiLCJ4MCIsIngxIiwiYm91bmQiLCJNYXRoIiwiZmxvb3IiLCJjZWlsIiwiZ2V0VGltZVdpZGdldFRpdGxlRm9ybWF0dGVyIiwiZ2V0VGltZVdpZGdldEhpbnRGb3JtYXR0ZXIiLCJpc1ZhbGlkRmlsdGVyVmFsdWUiLCJ2IiwiaXNOYU4iLCJCb29sZWFuIiwiaW5wdXQiLCJnZXRGaWx0ZXJQbG90IiwiYWxsRGF0YSIsInNlcmllcyIsIngiLCJ5IiwiaXNGaW5pdGUiLCJzb3J0IiwiYSIsImIiLCJ5RG9tYWluIiwieERvbWFpbiIsImdldERlZmF1bHRGaWx0ZXJQbG90VHlwZSIsImZpbHRlclBsb3RUeXBlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFDMEcsTUFBQUEsTUFBTSxFQUFOQSxNQUFEO0FBQVNPLE1BQUFBLE9BQU8sRUFBUEEsT0FBVDtBQUFrQkMsTUFBQUEsT0FBTyxFQUFQQTtBQUFsQixLQUFaO0FBQXdDM0YsSUFBQUEsS0FBSyxFQUFMQTtBQUF4QyxHQUFQO0FBQ0Q7O0FBRU0sU0FBUzRGLHdCQUFULENBQWtDOUQsTUFBbEMsRUFBMEM7QUFDL0MsTUFBTStELGVBQWUsR0FBR25ILGlCQUFpQixDQUFDb0QsTUFBTSxDQUFDbEMsSUFBUixDQUF6Qzs7QUFDQSxNQUFJLENBQUNpRyxlQUFMLEVBQXNCO0FBQ3BCLFdBQU8sSUFBUDtBQUNEOztBQUVELE1BQUksQ0FBQy9ELE1BQU0sQ0FBQzlCLEtBQVosRUFBbUI7QUFDakIsV0FBTzZGLGVBQWUsV0FBdEI7QUFDRDs7QUFFRCxTQUFPQSxlQUFlLENBQUMvRCxNQUFNLENBQUM5QixLQUFQLENBQWFKLElBQWQsQ0FBZixJQUFzQyxJQUE3QztBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHthc2NlbmRpbmcsIGV4dGVudCwgaGlzdG9ncmFtIGFzIGQzSGlzdG9ncmFtLCB0aWNrc30gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IGtleU1pcnJvciBmcm9tICdrZXltaXJyb3InO1xuXG5pbXBvcnQge0FMTF9GSUVMRF9UWVBFU30gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHttYXliZVRvRGF0ZSwgbm90TnVsbG9yVW5kZWZpbmVkfSBmcm9tICcuL2RhdGEtdXRpbHMnO1xuaW1wb3J0ICogYXMgU2NhbGVVdGlscyBmcm9tICcuL2RhdGEtc2NhbGUtdXRpbHMnO1xuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBUaW1lc3RhbXBTdGVwTWFwID0gW1xuICB7bWF4OiAxLCBzdGVwOiAwLjA1fSxcbiAge21heDogMTAsIHN0ZXA6IDAuMX0sXG4gIHttYXg6IDEwMCwgc3RlcDogMX0sXG4gIHttYXg6IDUwMCwgc3RlcDogNX0sXG4gIHttYXg6IDEwMDAsIHN0ZXA6IDEwfSxcbiAge21heDogNTAwMCwgc3RlcDogNTB9LFxuICB7bWF4OiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksIHN0ZXA6IDEwMDB9XG5dO1xuXG5leHBvcnQgY29uc3QgaGlzdG9ncmFtQmlucyA9IDMwO1xuZXhwb3J0IGNvbnN0IGVubGFyZ2VkSGlzdG9ncmFtQmlucyA9IDEwMDtcblxuY29uc3QgZHVyYXRpb25TZWNvbmQgPSAxMDAwO1xuY29uc3QgZHVyYXRpb25NaW51dGUgPSBkdXJhdGlvblNlY29uZCAqIDYwO1xuY29uc3QgZHVyYXRpb25Ib3VyID0gZHVyYXRpb25NaW51dGUgKiA2MDtcbmNvbnN0IGR1cmF0aW9uRGF5ID0gZHVyYXRpb25Ib3VyICogMjQ7XG5jb25zdCBkdXJhdGlvbldlZWsgPSBkdXJhdGlvbkRheSAqIDc7XG5jb25zdCBkdXJhdGlvblllYXIgPSBkdXJhdGlvbkRheSAqIDM2NTtcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9UWVBFUyA9IGtleU1pcnJvcih7XG4gIHJhbmdlOiBudWxsLFxuICBzZWxlY3Q6IG51bGwsXG4gIHRpbWVSYW5nZTogbnVsbCxcbiAgbXVsdGlTZWxlY3Q6IG51bGxcbn0pO1xuXG5leHBvcnQgY29uc3QgUExPVF9UWVBFUyA9IGtleU1pcnJvcih7XG4gIGhpc3RvZ3JhbTogbnVsbCxcbiAgbGluZUNoYXJ0OiBudWxsXG59KTtcblxuY29uc3QgU3VwcG9ydGVkUGxvdFR5cGUgPSB7XG4gIFtGSUxURVJfVFlQRVMudGltZVJhbmdlXToge1xuICAgIGRlZmF1bHQ6ICdoaXN0b2dyYW0nLFxuICAgIFtBTExfRklFTERfVFlQRVMuaW50ZWdlcl06ICdsaW5lQ2hhcnQnLFxuICAgIFtBTExfRklFTERfVFlQRVMucmVhbF06ICdsaW5lQ2hhcnQnXG4gIH0sXG4gIFtGSUxURVJfVFlQRVMucmFuZ2VdOiB7XG4gICAgZGVmYXVsdDogJ2hpc3RvZ3JhbScsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5pbnRlZ2VyXTogJ2xpbmVDaGFydCcsXG4gICAgW0FMTF9GSUVMRF9UWVBFUy5yZWFsXTogJ2xpbmVDaGFydCdcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IEZJTFRFUl9DT01QT05FTlRTID0ge1xuICBbRklMVEVSX1RZUEVTLnNlbGVjdF06ICdTaW5nbGVTZWxlY3RGaWx0ZXInLFxuICBbRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0XTogJ011bHRpU2VsZWN0RmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy50aW1lUmFuZ2VdOiAnVGltZVJhbmdlRmlsdGVyJyxcbiAgW0ZJTFRFUl9UWVBFUy5yYW5nZV06ICdSYW5nZUZpbHRlcidcbn07XG5cbmV4cG9ydCBjb25zdCBCQVNFX1NQRUVEID0gNjAwO1xuZXhwb3J0IGNvbnN0IFRJTUVfQU5JTUFUSU9OX1NQRUVEID0gW1xuICB7XG4gICAgbGFiZWw6ICcwLjV4JyxcbiAgICB2YWx1ZTogMC41XG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJzF4JyxcbiAgICB2YWx1ZTogMVxuICB9LFxuICB7XG4gICAgbGFiZWw6ICcyeCcsXG4gICAgdmFsdWU6IDJcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnNHgnLFxuICAgIHZhbHVlOiA0XG4gIH1cbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0RmlsdGVyKGRhdGFJZCkge1xuICByZXR1cm4ge1xuICAgIC8vIGxpbmsgdG8gZGF0YXNldCBJZFxuICAgIGRhdGFJZCxcbiAgICAvLyBzaG91bGQgYWxsb3cgdG8gZWRpdCBkYXRhSWRcbiAgICBmcmVlemU6IGZhbHNlLFxuICAgIGlkOiBnZW5lcmF0ZUhhc2hJZCg0KSxcblxuICAgIC8vIHRpbWUgcmFuZ2UgZmlsdGVyIHNwZWNpZmljXG4gICAgZml4ZWREb21haW46IGZhbHNlLFxuICAgIGVubGFyZ2VkOiBmYWxzZSxcbiAgICBpc0FuaW1hdGluZzogZmFsc2UsXG4gICAgc3BlZWQ6IDEsXG5cbiAgICAvLyBmaWVsZCBzcGVjaWZpY1xuICAgIG5hbWU6IG51bGwsXG4gICAgdHlwZTogbnVsbCxcbiAgICBmaWVsZElkeDogbnVsbCxcbiAgICBkb21haW46IG51bGwsXG4gICAgdmFsdWU6IG51bGwsXG5cbiAgICAvLyBwbG90XG4gICAgcGxvdFR5cGU6IFBMT1RfVFlQRVMuaGlzdG9ncmFtLFxuICAgIHlBeGlzOiBudWxsLFxuICAgIGludGVydmFsOiBudWxsXG4gIH07XG59XG5cbi8qKlxuICogR2V0IGRlZmF1bHQgZmlsdGVyIHByb3AgYmFzZWQgb24gZmllbGQgdHlwZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWVsZFxuICogQHJldHVybnMge29iamVjdH0gZGVmYXVsdCBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlclByb3BzKGRhdGEsIGZpZWxkKSB7XG4gIGNvbnN0IGZpbHRlclByb3AgPSB7XG4gICAgLi4uZ2V0RmllbGREb21haW4oZGF0YSwgZmllbGQpLFxuICAgIGZpZWxkVHlwZTogZmllbGQudHlwZVxuICB9O1xuXG4gIHN3aXRjaCAoZmllbGQudHlwZSkge1xuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnJlYWw6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuaW50ZWdlcjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3AsXG4gICAgICAgIHZhbHVlOiBmaWx0ZXJQcm9wLmRvbWFpbixcbiAgICAgICAgdHlwZTogRklMVEVSX1RZUEVTLnJhbmdlLFxuICAgICAgICB0eXBlT3B0aW9uczogW0ZJTFRFUl9UWVBFUy5yYW5nZV1cbiAgICAgIH07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5ib29sZWFuOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcCxcbiAgICAgICAgdHlwZTogRklMVEVSX1RZUEVTLnNlbGVjdCxcbiAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgIH07XG5cbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5zdHJpbmc6XG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuZGF0ZTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmZpbHRlclByb3AsXG4gICAgICAgIHR5cGU6IEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdCxcbiAgICAgICAgdmFsdWU6IFtdXG4gICAgICB9O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uZmlsdGVyUHJvcCxcbiAgICAgICAgdHlwZTogRklMVEVSX1RZUEVTLnRpbWVSYW5nZSxcbiAgICAgICAgZW5sYXJnZWQ6IHRydWUsXG4gICAgICAgIGZpeGVkRG9tYWluOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmlsdGVyUHJvcC5kb21haW5cbiAgICAgIH07XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHt9O1xuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlIGZpZWxkIGRvbWFpbiBiYXNlZCBvbiBmaWVsZCB0eXBlIGFuZCBkYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YVxuICogQHBhcmFtIHtvYmplY3R9IGZpZWxkXG4gKiBAcmV0dXJucyB7b2JqZWN0fSB3aXRoIGRvbWFpbiBhcyBrZXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpZWxkRG9tYWluKGRhdGEsIGZpZWxkKSB7XG4gIGNvbnN0IGZpZWxkSWR4ID0gZmllbGQudGFibGVGaWVsZEluZGV4IC0gMTtcbiAgY29uc3QgaXNUaW1lID0gZmllbGQudHlwZSA9PT0gQUxMX0ZJRUxEX1RZUEVTLnRpbWVzdGFtcDtcbiAgY29uc3QgdmFsdWVBY2Nlc3NvciA9IG1heWJlVG9EYXRlLmJpbmQobnVsbCwgaXNUaW1lLCBmaWVsZElkeCwgZmllbGQuZm9ybWF0KTtcbiAgbGV0IGRvbWFpbjtcblxuICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5yZWFsOlxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLmludGVnZXI6XG4gICAgICAvLyBjYWxjdWxhdGUgZG9tYWluIGFuZCBzdGVwXG4gICAgICByZXR1cm4gZ2V0TnVtZXJpY0ZpZWxkRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpO1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMuYm9vbGVhbjpcbiAgICAgIHJldHVybiB7ZG9tYWluOiBbdHJ1ZSwgZmFsc2VdfTtcblxuICAgIGNhc2UgQUxMX0ZJRUxEX1RZUEVTLnN0cmluZzpcbiAgICBjYXNlIEFMTF9GSUVMRF9UWVBFUy5kYXRlOlxuICAgICAgZG9tYWluID0gU2NhbGVVdGlscy5nZXRPcmRpbmFsRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpO1xuICAgICAgcmV0dXJuIHtkb21haW59O1xuXG4gICAgY2FzZSBBTExfRklFTERfVFlQRVMudGltZXN0YW1wOlxuICAgICAgcmV0dXJuIGdldFRpbWVzdGFtcEZpZWxkRG9tYWluKGRhdGEsIHZhbHVlQWNjZXNzb3IpO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB7ZG9tYWluOiBTY2FsZVV0aWxzLmdldE9yZGluYWxEb21haW4oZGF0YSwgdmFsdWVBY2Nlc3Nvcil9O1xuICB9XG59XG5cbi8qKlxuICogRmlsdGVyIGRhdGEgYmFzZWQgb24gYW4gYXJyYXkgb2YgZmlsdGVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFcbiAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhSWRcbiAqIEBwYXJhbSB7T2JqZWN0W119IGZpbHRlcnNcbiAqIEByZXR1cm5zIHtPYmplY3RbXX0gZGF0YVxuICogQHJldHVybnMge051bWJlcltdfSBmaWx0ZXJlZEluZGV4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJEYXRhKGRhdGEsIGRhdGFJZCwgZmlsdGVycykge1xuICBpZiAoIWRhdGEgfHwgIWRhdGFJZCkge1xuICAgIC8vIHdoeSB3b3VsZCB0aGVyZSBub3QgYmUgYW55IGRhdGE/IGFyZSB3ZSBvdmVyIGRvaW5nIHRoaXM/XG4gICAgcmV0dXJuIHtkYXRhOiBbXSwgZmlsdGVyZWRJbmRleDogW119O1xuICB9XG5cbiAgaWYgKCFmaWx0ZXJzLmxlbmd0aCkge1xuICAgIHJldHVybiB7ZGF0YSwgZmlsdGVyZWRJbmRleDogZGF0YS5tYXAoKGQsIGkpID0+IGkpfTtcbiAgfVxuXG4gIGNvbnN0IGFwcGxpZWRGaWx0ZXJzID0gZmlsdGVycy5maWx0ZXIoXG4gICAgZCA9PiBkLmRhdGFJZCA9PT0gZGF0YUlkICYmIGQuZmllbGRJZHggPiAtMSAmJiBkLnZhbHVlICE9PSBudWxsXG4gICk7XG5cbiAgY29uc3QgW2R5bmFtaWNEb21haW5GaWx0ZXJzLCBmaXhlZERvbWFpbkZpbHRlcnNdID0gYXBwbGllZEZpbHRlcnMucmVkdWNlKFxuICAgIChhY2N1LCBmKSA9PiB7XG4gICAgICBpZiAoZi5kYXRhSWQgPT09IGRhdGFJZCAmJiBmLmZpZWxkSWR4ID4gLTEgJiYgZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAoZi5maXhlZERvbWFpbiA/IGFjY3VbMV0gOiBhY2N1WzBdKS5wdXNoKGYpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjY3U7XG4gICAgfSxcbiAgICBbW10sIFtdXVxuICApO1xuICAvLyBjb25zb2xlLmxvZyhkeW5hbWljRG9tYWluRmlsdGVycylcbiAgLy8gY29uc29sZS5sb2coZml4ZWREb21haW5GaWx0ZXJzKVxuICAvLyB3ZSBzYXZlIGEgcmVmZXJlbmNlIG9mIGFsbERhdGEgaW5kZXggaGVyZSB0byBhY2Nlc3MgZGF0YVRvRmVhdHVyZVxuICAvLyBpbiBnZW9qc29uIGFuZCBoZXhnb25JZCBsYXllclxuICAvLyBjb25zb2xlLnRpbWUoJ2ZpbHRlckRhdGEnKTtcblxuICBjb25zdCB7ZmlsdGVyZWQsIGZpbHRlcmVkSW5kZXgsIGZpbHRlcmVkSW5kZXhGb3JEb21haW59ID0gZGF0YS5yZWR1Y2UoXG4gICAgKGFjY3UsIGQsIGkpID0+IHtcbiAgICAgIC8vIGdlbmVyYXRlIDIgc2V0cyBvZlxuICAgICAgLy8gZmlsdGVyIGRhdGEgdXNlZCB0byBjYWxjdWxhdGUgbGF5ZXIgRG9tYWluXG4gICAgICBjb25zdCBtYXRjaEZvckRvbWFpbiA9IGR5bmFtaWNEb21haW5GaWx0ZXJzLmV2ZXJ5KGZpbHRlciA9PlxuICAgICAgICBpc0RhdGFNYXRjaEZpbHRlcihkLCBmaWx0ZXIsIGkpXG4gICAgICApO1xuXG4gICAgICBpZiAobWF0Y2hGb3JEb21haW4pIHtcbiAgICAgICAgYWNjdS5maWx0ZXJlZEluZGV4Rm9yRG9tYWluLnB1c2goaSk7XG5cbiAgICAgICAgLy8gZmlsdGVyIGRhdGEgZm9yIHJlbmRlclxuICAgICAgICBjb25zdCBtYXRjaEZvclJlbmRlciA9IGZpeGVkRG9tYWluRmlsdGVycy5ldmVyeShmaWx0ZXIgPT5cbiAgICAgICAgICBpc0RhdGFNYXRjaEZpbHRlcihkLCBmaWx0ZXIsIGkpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKG1hdGNoRm9yUmVuZGVyKSB7XG4gICAgICAgICAgYWNjdS5maWx0ZXJlZC5wdXNoKGQpO1xuICAgICAgICAgIGFjY3UuZmlsdGVyZWRJbmRleC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2N1O1xuICAgIH0sXG4gICAge2ZpbHRlcmVkOiBbXSwgZmlsdGVyZWRJbmRleDogW10sIGZpbHRlcmVkSW5kZXhGb3JEb21haW46IFtdfVxuICApO1xuXG4gIC8vIGNvbnNvbGUubG9nKCdkYXRhPT0nLCBkYXRhLmxlbmd0aClcbiAgLy8gY29uc29sZS5sb2coJ2ZpbHRlcmVkPT0nLCBmaWx0ZXJlZC5sZW5ndGgpXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZEluZGV4PT0nLCBmaWx0ZXJlZEluZGV4Lmxlbmd0aClcbiAgLy8gY29uc29sZS5sb2coJ2ZpbHRlcmVkSW5kZXhGb3JEb21haW49PScsIGZpbHRlcmVkSW5kZXhGb3JEb21haW4ubGVuZ3RoKVxuICAvL1xuICAvLyBjb25zb2xlLnRpbWVFbmQoJ2ZpbHRlckRhdGEnKTtcblxuICByZXR1cm4ge2RhdGE6IGZpbHRlcmVkLCBmaWx0ZXJlZEluZGV4LCBmaWx0ZXJlZEluZGV4Rm9yRG9tYWlufTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB2YWx1ZSBpcyBpbiByYW5nZSBvZiBmaWx0ZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdFtdfSBkYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gZmlsdGVyXG4gKiBAcGFyYW0ge251bWJlcn0gaVxuICogQHJldHVybnMge0Jvb2xlYW59IC0gd2hldGhlciB2YWx1ZSBmYWxscyBpbiB0aGUgcmFuZ2Ugb2YgdGhlIGZpbHRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhTWF0Y2hGaWx0ZXIoZGF0YSwgZmlsdGVyLCBpKSB7XG4gIGNvbnN0IHZhbCA9IGRhdGFbZmlsdGVyLmZpZWxkSWR4XTtcbiAgaWYgKCFmaWx0ZXIudHlwZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgc3dpdGNoIChmaWx0ZXIudHlwZSkge1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLnJhbmdlOlxuICAgICAgcmV0dXJuIGlzSW5SYW5nZSh2YWwsIGZpbHRlci52YWx1ZSk7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy50aW1lUmFuZ2U6XG4gICAgICBjb25zdCB0aW1lVmFsID0gZmlsdGVyLm1hcHBlZFZhbHVlXG4gICAgICAgID8gZmlsdGVyLm1hcHBlZFZhbHVlW2ldXG4gICAgICAgIDogbW9tZW50LnV0Yyh2YWwpLnZhbHVlT2YoKTtcbiAgICAgIHJldHVybiBpc0luUmFuZ2UodGltZVZhbCwgZmlsdGVyLnZhbHVlKTtcblxuICAgIGNhc2UgRklMVEVSX1RZUEVTLm11bHRpU2VsZWN0OlxuICAgICAgcmV0dXJuIGZpbHRlci52YWx1ZS5pbmNsdWRlcyh2YWwpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMuc2VsZWN0OlxuICAgICAgcmV0dXJuIGZpbHRlci52YWx1ZSA9PT0gdmFsO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogQ2FsbCBieSBwYXJzaW5nIGZpbHRlcnMgZnJvbSBVUkxcbiAqIENoZWNrIGlmIHZhbHVlIG9mIGZpbHRlciB3aXRoaW4gZmlsdGVyIGRvbWFpbiwgaWYgbm90IGFkanVzdCBpdCB0byBtYXRjaFxuICogZmlsdGVyIGRvbWFpblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nW10gfCBzdHJpbmcgfCBudW1iZXIgfCBudW1iZXJbXX0gdmFsdWVcbiAqIEBwYXJhbSB7QXJyYXl9IGZpbHRlci5kb21haW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXIudHlwZVxuICogQHJldHVybnMgeyp9IC0gYWRqdXN0ZWQgdmFsdWUgdG8gbWF0Y2ggZmlsdGVyIG9yIG51bGwgdG8gcmVtb3ZlIGZpbHRlclxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluKHZhbHVlLCB7ZG9tYWluLCB0eXBlfSkge1xuICBpZiAoIWRvbWFpbiB8fCAhdHlwZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgRklMVEVSX1RZUEVTLnJhbmdlOlxuICAgIGNhc2UgRklMVEVSX1RZUEVTLnRpbWVSYW5nZTpcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgIHJldHVybiBkb21haW4ubWFwKGQgPT4gZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWx1ZS5tYXAoXG4gICAgICAgIChkLCBpKSA9PlxuICAgICAgICAgIG5vdE51bGxvclVuZGVmaW5lZChkKSAmJiBpc0luUmFuZ2UoZCwgZG9tYWluKSA/IGQgOiBkb21haW5baV1cbiAgICAgICk7XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5tdWx0aVNlbGVjdDpcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgICAgY29uc3QgZmlsdGVyZWRWYWx1ZSA9IHZhbHVlLmZpbHRlcihkID0+IGRvbWFpbi5pbmNsdWRlcyhkKSk7XG4gICAgICByZXR1cm4gZmlsdGVyZWRWYWx1ZS5sZW5ndGggPyBmaWx0ZXJlZFZhbHVlIDogW107XG5cbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5zZWxlY3Q6XG4gICAgICByZXR1cm4gZG9tYWluLmluY2x1ZGVzKHZhbHVlKSA/IHZhbHVlIDogdHJ1ZTtcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuLyogZXNsaW50LWVuYWJsZSBjb21wbGV4aXR5ICovXG5cbi8qKlxuICogQ2FsY3VsYXRlIG51bWVyaWMgZG9tYWluIGFuZCBzdWl0YWJsZSBzdGVwXG4gKlxuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YVxuICogQHBhcmFtIHtmdW5jdGlvbn0gdmFsdWVBY2Nlc3NvclxuICogQHJldHVybnMge29iamVjdH0gZG9tYWluIGFuZCBzdGVwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROdW1lcmljRmllbGREb21haW4oZGF0YSwgdmFsdWVBY2Nlc3Nvcikge1xuICBsZXQgZG9tYWluID0gWzAsIDFdO1xuICBsZXQgc3RlcCA9IDAuMTtcblxuICBjb25zdCBtYXBwZWRWYWx1ZSA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhLm1hcCh2YWx1ZUFjY2Vzc29yKSA6IFtdO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID4gMSkge1xuICAgIGRvbWFpbiA9IFNjYWxlVXRpbHMuZ2V0TGluZWFyRG9tYWluKG1hcHBlZFZhbHVlKTtcbiAgICBjb25zdCBkaWZmID0gZG9tYWluWzFdIC0gZG9tYWluWzBdO1xuXG4gICAgLy8gaW4gY2FzZSBlcXVhbCBkb21haW4sIFs5NiwgOTZdLCB3aGljaCB3aWxsIGJyZWFrIHF1YW50aXplIHNjYWxlXG4gICAgaWYgKCFkaWZmKSB7XG4gICAgICBkb21haW5bMV0gPSBkb21haW5bMF0gKyAxO1xuICAgIH1cblxuICAgIHN0ZXAgPSBnZXROdW1lcmljU3RlcFNpemUoZGlmZikgfHwgc3RlcDtcbiAgICBkb21haW5bMF0gPSBmb3JtYXROdW1iZXJCeVN0ZXAoZG9tYWluWzBdLCBzdGVwLCAnZmxvb3InKTtcbiAgICBkb21haW5bMV0gPSBmb3JtYXROdW1iZXJCeVN0ZXAoZG9tYWluWzFdLCBzdGVwLCAnY2VpbCcpO1xuICB9XG5cbiAgY29uc3Qge2hpc3RvZ3JhbSwgZW5sYXJnZWRIaXN0b2dyYW19ID0gZ2V0SGlzdG9ncmFtKGRvbWFpbiwgbWFwcGVkVmFsdWUpO1xuXG4gIHJldHVybiB7ZG9tYWluLCBzdGVwLCBoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfTtcbn1cblxuZnVuY3Rpb24gZ2V0TnVtZXJpY1N0ZXBTaXplKGRpZmYpIHtcbiAgaWYgKGRpZmYgPiAxMDApIHtcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmIChkaWZmIDwgMjAgJiYgZGlmZiA+IDMpIHtcbiAgICByZXR1cm4gMC4wMTtcbiAgfSBlbHNlIGlmIChkaWZmIDw9IDMpIHtcbiAgICByZXR1cm4gMC4wMDE7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGUgdGltZXN0YW1wIGRvbWFpbiBhbmQgc3VpdGFibGUgc3RlcFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0W119IGRhdGFcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHZhbHVlQWNjZXNzb3JcbiAqIEByZXR1cm5zIHtvYmplY3R9IGRvbWFpbiBhbmQgc3RlcFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZXN0YW1wRmllbGREb21haW4oZGF0YSwgdmFsdWVBY2Nlc3Nvcikge1xuICAvLyB0byBhdm9pZCBjb252ZXJ0aW5nIHN0cmluZyBmb3JtYXQgdGltZSB0byBlcG9jaFxuICAvLyBldmVyeSB0aW1lIHdlIGNvbXBhcmUgd2Ugc3RvcmUgYSB2YWx1ZSBtYXBwZWQgdG8gaW50IGluIGZpbHRlciBkb21haW5cblxuICBjb25zdCBtYXBwZWRWYWx1ZSA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhLm1hcCh2YWx1ZUFjY2Vzc29yKSA6IFtdO1xuICBjb25zdCBkb21haW4gPSBTY2FsZVV0aWxzLmdldExpbmVhckRvbWFpbihtYXBwZWRWYWx1ZSk7XG4gIGxldCBzdGVwID0gMC4wMTtcblxuICBjb25zdCBkaWZmID0gZG9tYWluWzFdIC0gZG9tYWluWzBdO1xuICBjb25zdCBlbnRyeSA9IFRpbWVzdGFtcFN0ZXBNYXAuZmluZChmID0+IGYubWF4ID49IGRpZmYpO1xuICBpZiAoZW50cnkpIHtcbiAgICBzdGVwID0gZW50cnkuc3RlcDtcbiAgfVxuXG4gIGNvbnN0IHtoaXN0b2dyYW0sIGVubGFyZ2VkSGlzdG9ncmFtfSA9IGdldEhpc3RvZ3JhbShkb21haW4sIG1hcHBlZFZhbHVlKTtcblxuICByZXR1cm4ge2RvbWFpbiwgc3RlcCwgbWFwcGVkVmFsdWUsIGhpc3RvZ3JhbSwgZW5sYXJnZWRIaXN0b2dyYW19O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlzdG9ncmFtQ29uc3RydWN0KGRvbWFpbiwgbWFwcGVkVmFsdWUsIGJpbnMpIHtcbiAgcmV0dXJuIGQzSGlzdG9ncmFtKClcbiAgICAudGhyZXNob2xkcyh0aWNrcyhkb21haW5bMF0sIGRvbWFpblsxXSwgYmlucykpXG4gICAgLmRvbWFpbihkb21haW4pKG1hcHBlZFZhbHVlKVxuICAgIC5tYXAoYmluID0+ICh7XG4gICAgICBjb3VudDogYmluLmxlbmd0aCxcbiAgICAgIHgwOiBiaW4ueDAsXG4gICAgICB4MTogYmluLngxXG4gICAgfSkpO1xufVxuLyoqXG4gKiBDYWxjdWxhdGUgaGlzdG9ncmFtIGZyb20gZG9tYWluIGFuZCBhcnJheSBvZiB2YWx1ZXNcbiAqXG4gKiBAcGFyYW0ge251bWJlcltdfSBkb21haW5cbiAqIEBwYXJhbSB7T2JqZWN0W119IG1hcHBlZFZhbHVlXG4gKiBAcmV0dXJucyB7QXJyYXlbXX0gaGlzdG9ncmFtXG4gKi9cbmZ1bmN0aW9uIGdldEhpc3RvZ3JhbShkb21haW4sIG1hcHBlZFZhbHVlKSB7XG4gIGNvbnN0IGhpc3RvZ3JhbSA9IGhpc3RvZ3JhbUNvbnN0cnVjdChkb21haW4sIG1hcHBlZFZhbHVlLCBoaXN0b2dyYW1CaW5zKTtcbiAgY29uc3QgZW5sYXJnZWRIaXN0b2dyYW0gPSBoaXN0b2dyYW1Db25zdHJ1Y3QoXG4gICAgZG9tYWluLFxuICAgIG1hcHBlZFZhbHVlLFxuICAgIGVubGFyZ2VkSGlzdG9ncmFtQmluc1xuICApO1xuXG4gIHJldHVybiB7aGlzdG9ncmFtLCBlbmxhcmdlZEhpc3RvZ3JhbX07XG59XG5cbi8qKlxuICogcm91bmQgbnVtYmVyIGJhc2VkIG9uIHN0ZXBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcFxuICogQHBhcmFtIHtzdHJpbmd9IGJvdW5kXG4gKiBAcmV0dXJucyB7bnVtYmVyfSByb3VuZGVkIG51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TnVtYmVyQnlTdGVwKHZhbCwgc3RlcCwgYm91bmQpIHtcbiAgaWYgKGJvdW5kID09PSAnZmxvb3InKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodmFsICogKDEgLyBzdGVwKSkgLyAoMSAvIHN0ZXApO1xuICB9XG5cbiAgcmV0dXJuIE1hdGguY2VpbCh2YWwgKiAoMSAvIHN0ZXApKSAvICgxIC8gc3RlcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0luUmFuZ2UodmFsLCBkb21haW4pIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGRvbWFpbikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdmFsID49IGRvbWFpblswXSAmJiB2YWwgPD0gZG9tYWluWzFdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGltZVdpZGdldFRpdGxlRm9ybWF0dGVyKGRvbWFpbikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgcmV0dXJuIGRpZmYgPiBkdXJhdGlvblllYXJcbiAgICA/ICdNTS9ERC9ZWSdcbiAgICA6IGRpZmYgPiBkdXJhdGlvbkRheVxuICAgICAgPyAnTU0vREQgaGhhJ1xuICAgICAgOiAnTU0vREQgaGg6bW1hJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVXaWRnZXRIaW50Rm9ybWF0dGVyKGRvbWFpbikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZG9tYWluKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgZGlmZiA9IGRvbWFpblsxXSAtIGRvbWFpblswXTtcbiAgcmV0dXJuIGRpZmYgPiBkdXJhdGlvblllYXJcbiAgICA/ICdNTS9ERC9ZWSdcbiAgICA6IGRpZmYgPiBkdXJhdGlvbldlZWtcbiAgICAgID8gJ01NL0REJ1xuICAgICAgOiBkaWZmID4gZHVyYXRpb25EYXlcbiAgICAgICAgPyAnTU0vREQgaGhhJ1xuICAgICAgICA6IGRpZmYgPiBkdXJhdGlvbkhvdXJcbiAgICAgICAgICA/ICdoaDptbWEnXG4gICAgICAgICAgOiAnaGg6bW06c3NhJztcbn1cblxuLyoqXG4gKiBTYW5pdHkgY2hlY2sgb24gZmlsdGVycyB0byBwcmVwYXJlIGZvciBzYXZlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIGZpbHRlciB0eXBlXG4gKiBAcGFyYW0geyp9IHZhbHVlIC0gZmlsdGVyIHZhbHVlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gd2hldGhlciBmaWx0ZXIgaXMgdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRGaWx0ZXJWYWx1ZSh7dHlwZSwgdmFsdWV9KSB7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIEZJTFRFUl9UWVBFUy5zZWxlY3Q6XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHRydWUgfHwgdmFsdWUgPT09IGZhbHNlO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMucmFuZ2U6XG4gICAgY2FzZSBGSUxURVJfVFlQRVMudGltZVJhbmdlOlxuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmV2ZXJ5KHYgPT4gdiAhPT0gbnVsbCAmJiAhaXNOYU4odikpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMubXVsdGlTZWxlY3Q6XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgQm9vbGVhbih2YWx1ZS5sZW5ndGgpO1xuXG4gICAgY2FzZSBGSUxURVJfVFlQRVMuaW5wdXQ6XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZS5sZW5ndGgpO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJQbG90KGZpbHRlciwgYWxsRGF0YSkge1xuICBpZiAoZmlsdGVyLnBsb3RUeXBlID09PSBQTE9UX1RZUEVTLmhpc3RvZ3JhbSB8fCAhZmlsdGVyLnlBeGlzKSB7XG4gICAgLy8gaGlzdG9ncmFtIHNob3VsZCBiZSBjYWxjdWxhdGVkIHdoZW4gY3JlYXRlIGZpbHRlclxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGNvbnN0IHttYXBwZWRWYWx1ZX0gPSBmaWx0ZXI7XG4gIGNvbnN0IHt5QXhpc30gPSBmaWx0ZXI7XG5cbiAgLy8gcmV0dXJuIGxpbmVDaGFydFxuICBjb25zdCBzZXJpZXMgPSBhbGxEYXRhXG4gICAgLm1hcCgoZCwgaSkgPT4gKHtcbiAgICAgIHg6IG1hcHBlZFZhbHVlW2ldLFxuICAgICAgeTogZFt5QXhpcy50YWJsZUZpZWxkSW5kZXggLSAxXVxuICAgIH0pKVxuICAgIC5maWx0ZXIoKHt4LCB5fSkgPT4gTnVtYmVyLmlzRmluaXRlKHgpICYmIE51bWJlci5pc0Zpbml0ZSh5KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYXNjZW5kaW5nKGEueCwgYi54KSk7XG5cbiAgY29uc3QgeURvbWFpbiA9IGV4dGVudChzZXJpZXMsIGQgPT4gZC55KTtcbiAgY29uc3QgeERvbWFpbiA9IFtzZXJpZXNbMF0ueCwgc2VyaWVzW3Nlcmllcy5sZW5ndGggLSAxXS54XTtcblxuICByZXR1cm4ge2xpbmVDaGFydDoge3NlcmllcywgeURvbWFpbiwgeERvbWFpbn0sIHlBeGlzfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRGaWx0ZXJQbG90VHlwZShmaWx0ZXIpIHtcbiAgY29uc3QgZmlsdGVyUGxvdFR5cGVzID0gU3VwcG9ydGVkUGxvdFR5cGVbZmlsdGVyLnR5cGVdO1xuICBpZiAoIWZpbHRlclBsb3RUeXBlcykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKCFmaWx0ZXIueUF4aXMpIHtcbiAgICByZXR1cm4gZmlsdGVyUGxvdFR5cGVzLmRlZmF1bHQ7XG4gIH1cblxuICByZXR1cm4gZmlsdGVyUGxvdFR5cGVzW2ZpbHRlci55QXhpcy50eXBlXSB8fCBudWxsO1xufVxuIl19