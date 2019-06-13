"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeFilters = mergeFilters;
exports.mergeLayers = mergeLayers;
exports.mergeInteractions = mergeInteractions;
exports.mergeInteractionTooltipConfig = mergeInteractionTooltipConfig;
exports.mergeLayerBlending = mergeLayerBlending;
exports.validateSavedLayerColumns = validateSavedLayerColumns;
exports.validateSavedTextLabel = validateSavedTextLabel;
exports.validateSavedVisualChannels = validateSavedVisualChannels;
exports.validateLayerWithData = validateLayerWithData;
exports.validateFilterWithData = validateFilterWithData;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _lodash2 = _interopRequireDefault(require("lodash.pick"));

var _filterUtils = require("../utils/filter-utils");

var _defaultSettings = require("../constants/default-settings");

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
 * Merge loaded filters with current state, if no fields or data are loaded
 * save it for later
 *
 * @param {Object} state
 * @param {Array<Object>} filtersToMerge
 * @return {Object} updatedState
 */
function mergeFilters(state, filtersToMerge) {
  var merged = [];
  var unmerged = [];
  var datasets = state.datasets;

  if (!Array.isArray(filtersToMerge) || !filtersToMerge.length) {
    return state;
  } // merge filters


  filtersToMerge.forEach(function (filter) {
    // match filter.dataId with current datesets id
    // uploaded data need to have the same dataId with the filter
    if (datasets[filter.dataId]) {
      // datasets is already loaded
      var validateFilter = validateFilterWithData(datasets[filter.dataId], filter);

      if (validateFilter) {
        merged.push(validateFilter);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(filter);
    }
  }); // filter data

  var updatedFilters = [].concat((0, _toConsumableArray2["default"])(state.filters || []), merged);
  var datasetToFilter = (0, _lodash["default"])(merged.map(function (d) {
    return d.dataId;
  }));
  var updatedDataset = datasetToFilter.reduce(function (accu, dataId) {
    return (0, _objectSpread4["default"])({}, accu, (0, _defineProperty2["default"])({}, dataId, (0, _objectSpread4["default"])({}, datasets[dataId], (0, _filterUtils.filterData)(datasets[dataId].allData, dataId, updatedFilters))));
  }, datasets);
  return (0, _objectSpread4["default"])({}, state, {
    filters: updatedFilters,
    datasets: updatedDataset,
    filterToBeMerged: unmerged
  });
}
/**
 * Merge layers from de-serialized state, if no fields or data are loaded
 * save it for later
 *
 * @param {Object} state
 * @param {Array<Object>} layersToMerge
 * @return {Object} state
 */


function mergeLayers(state, layersToMerge) {
  var mergedLayer = [];
  var unmerged = [];
  var datasets = state.datasets;

  if (!Array.isArray(layersToMerge) || !layersToMerge.length) {
    return state;
  }

  layersToMerge.forEach(function (layer) {
    if (datasets[layer.config.dataId]) {
      // datasets are already loaded
      var validateLayer = validateLayerWithData(datasets[layer.config.dataId], layer, state.layerClasses);

      if (validateLayer) {
        mergedLayer.push(validateLayer);
      }
    } else {
      // datasets not yet loaded
      unmerged.push(layer);
    }
  });
  var layers = [].concat((0, _toConsumableArray2["default"])(state.layers), mergedLayer);
  var newLayerOrder = mergedLayer.map(function (_, i) {
    return state.layers.length + i;
  }); // put new layers in front of current layers

  var layerOrder = [].concat((0, _toConsumableArray2["default"])(newLayerOrder), (0, _toConsumableArray2["default"])(state.layerOrder));
  return (0, _objectSpread4["default"])({}, state, {
    layers: layers,
    layerOrder: layerOrder,
    layerToBeMerged: unmerged
  });
}
/**
 * Merge interactions with saved config
 *
 * @param {Object} state
 * @param {Object} interactionToBeMerged
 * @return {Object} mergedState
 */


function mergeInteractions(state, interactionToBeMerged) {
  var merged = {};
  var unmerged = {};

  if (interactionToBeMerged) {
    Object.keys(interactionToBeMerged).forEach(function (key) {
      if (!state.interactionConfig[key]) {
        return;
      }

      var _ref = interactionToBeMerged[key] || {},
          enabled = _ref.enabled,
          configSaved = (0, _objectWithoutProperties2["default"])(_ref, ["enabled"]);

      var configToMerge = configSaved;

      if (key === 'tooltip') {
        var _mergeInteractionTool = mergeInteractionTooltipConfig(state, configSaved),
            mergedTooltip = _mergeInteractionTool.mergedTooltip,
            unmergedTooltip = _mergeInteractionTool.unmergedTooltip; // merge new dataset tooltips with original dataset tooltips


        configToMerge = {
          fieldsToShow: (0, _objectSpread4["default"])({}, state.interactionConfig[key].config.fieldsToShow, mergedTooltip)
        };

        if (Object.keys(unmergedTooltip).length) {
          unmerged.tooltip = {
            fieldsToShow: unmergedTooltip,
            enabled: enabled
          };
        }
      }

      merged[key] = (0, _objectSpread4["default"])({}, state.interactionConfig[key], {
        enabled: enabled,
        config: (0, _lodash2["default"])((0, _objectSpread4["default"])({}, state.interactionConfig[key].config, configToMerge), Object.keys(state.interactionConfig[key].config))
      });
    });
  }

  return (0, _objectSpread4["default"])({}, state, {
    interactionConfig: (0, _objectSpread4["default"])({}, state.interactionConfig, merged),
    interactionToBeMerged: unmerged
  });
}
/**
 * Merge interactionConfig.tooltip with saved config,
 * validate fieldsToShow
 *
 * @param {string} state
 * @param {Object} tooltipConfig
 * @return {Object} - {mergedTooltip: {}, unmergedTooltip: {}}
 */


function mergeInteractionTooltipConfig(state) {
  var tooltipConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var unmergedTooltip = {};
  var mergedTooltip = {};

  if (!tooltipConfig.fieldsToShow || !Object.keys(tooltipConfig.fieldsToShow).length) {
    return {
      mergedTooltip: mergedTooltip,
      unmergedTooltip: unmergedTooltip
    };
  }

  for (var dataId in tooltipConfig.fieldsToShow) {
    if (!state.datasets[dataId]) {
      // is not yet loaded
      unmergedTooltip[dataId] = tooltipConfig.fieldsToShow[dataId];
    } else {
      (function () {
        // if dataset is loaded
        var allFields = state.datasets[dataId].fields.map(function (d) {
          return d.name;
        });
        var foundFieldsToShow = tooltipConfig.fieldsToShow[dataId].filter(function (name) {
          return allFields.includes(name);
        });
        mergedTooltip[dataId] = foundFieldsToShow;
      })();
    }
  }

  return {
    mergedTooltip: mergedTooltip,
    unmergedTooltip: unmergedTooltip
  };
}
/**
 * Merge layerBlending with saved
 *
 * @param {object} state
 * @param {string} layerBlending
 * @return {object} merged state
 */


function mergeLayerBlending(state, layerBlending) {
  if (layerBlending && _defaultSettings.LAYER_BLENDINGS[layerBlending]) {
    return (0, _objectSpread4["default"])({}, state, {
      layerBlending: layerBlending
    });
  }

  return state;
}
/**
 * Validate saved layer columns with new data,
 * update fieldIdx based on new fields
 *
 * @param {Array<Object>} fields
 * @param {Object} savedCols
 * @param {Object} emptyCols
 * @return {null | Object} - validated columns or null
 */


function validateSavedLayerColumns(fields, savedCols, emptyCols) {
  var colFound = {}; // find actual column fieldIdx, in case it has changed

  var allColFound = Object.keys(emptyCols).every(function (key) {
    var saved = savedCols[key];
    colFound[key] = (0, _objectSpread4["default"])({}, emptyCols[key]);
    var fieldIdx = fields.findIndex(function (_ref2) {
      var name = _ref2.name;
      return name === saved;
    });

    if (fieldIdx > -1) {
      // update found columns
      colFound[key].fieldIdx = fieldIdx;
      colFound[key].value = saved;
      return true;
    } // if col is optional, allow null value


    return emptyCols[key].optional || false;
  });
  return allColFound && colFound;
}
/**
 * Validate saved text label config with new data
 * refer to vis-state-schema.js TextLabelSchemaV1
 *
 * @param {Array<Object>} fields
 * @param {Object} savedTextLabel
 * @return {Object} - validated textlabel
 */


function validateSavedTextLabel(fields, _ref3, savedTextLabel) {
  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 1),
      layerTextLabel = _ref4[0];

  var savedTextLabels = Array.isArray(savedTextLabel) ? savedTextLabel : [savedTextLabel]; // validate field

  return savedTextLabels.map(function (textLabel) {
    var field = textLabel.field ? fields.find(function (fd) {
      return Object.keys(textLabel.field).every(function (key) {
        return textLabel.field[key] === fd[key];
      });
    }) : null;
    return Object.keys(layerTextLabel).reduce(function (accu, key) {
      return (0, _objectSpread4["default"])({}, accu, (0, _defineProperty2["default"])({}, key, key === 'field' ? field : textLabel[key] || layerTextLabel[key]));
    }, {});
  });
}
/**
 * Validate saved visual channels config with new data,
 * refer to vis-state-schema.js VisualChannelSchemaV1
 *
 * @param {Array<Object>} fields
 * @param {Object} visualChannels
 * @param {Object} savedLayer
 * @return {Object} - validated visual channel in config or {}
 */


function validateSavedVisualChannels(fields, visualChannels, savedLayer) {
  return Object.values(visualChannels).reduce(function (found, _ref5) {
    var field = _ref5.field,
        scale = _ref5.scale;
    var foundField;

    if (savedLayer.config[field]) {
      foundField = fields.find(function (fd) {
        return Object.keys(savedLayer.config[field]).every(function (key) {
          return savedLayer.config[field][key] === fd[key];
        });
      });
    }

    return (0, _objectSpread4["default"])({}, found, foundField ? (0, _defineProperty2["default"])({}, field, foundField) : {}, savedLayer.config[scale] ? (0, _defineProperty2["default"])({}, scale, savedLayer.config[scale]) : {});
  }, {});
}
/**
 * Validate saved layer config with new data,
 * update fieldIdx based on new fields
 *
 * @param {Array<Object>} fields
 * @param {string} dataId
 * @param {Object} savedLayer
 * @param {Object} layerClasses
 * @return {null | Object} - validated layer or null
 */


function validateLayerWithData(_ref8, savedLayer, layerClasses) {
  var fields = _ref8.fields,
      dataId = _ref8.id;
  var type = savedLayer.type; // layer doesnt have a valid type

  if (!layerClasses.hasOwnProperty(type) || !savedLayer.config || !savedLayer.config.columns) {
    return null;
  }

  var newLayer = new layerClasses[type]({
    id: savedLayer.id,
    dataId: dataId,
    label: savedLayer.config.label,
    color: savedLayer.config.color,
    isVisible: savedLayer.config.isVisible
  }); // find column fieldIdx

  var columns = validateSavedLayerColumns(fields, savedLayer.config.columns, newLayer.getLayerColumns());

  if (!columns) {
    return null;
  } // visual channel field is saved to be {name, type}
  // find visual channel field by matching both name and type
  // refer to vis-state-schema.js VisualChannelSchemaV1


  var foundVisualChannelConfigs = validateSavedVisualChannels(fields, newLayer.visualChannels, savedLayer);
  var textLabel = savedLayer.config.textLabel && newLayer.config.textLabel ? validateSavedTextLabel(fields, newLayer.config.textLabel, savedLayer.config.textLabel) : newLayer.config.textLabel; // copy visConfig over to emptyLayer to make sure it has all the props

  var visConfig = newLayer.copyLayerConfig(newLayer.config.visConfig, savedLayer.config.visConfig || {}, {
    notToDeepMerge: ['colorRange', 'strokeColorRange']
  });
  newLayer.updateLayerConfig((0, _objectSpread4["default"])({
    columns: columns,
    visConfig: visConfig,
    textLabel: textLabel
  }, foundVisualChannelConfigs));
  return newLayer;
}
/**
 * Validate saved filter config with new data,
 * calculate domain and fieldIdx based new fields and data
 *
 * @param {Array<Object>} dataset.fields
 * @param {Array<Object>} dataset.allData
 * @param {Object} filter - filter to be validate
 * @return {Object | null} - validated filter
 */


function validateFilterWithData(_ref9, filter) {
  var fields = _ref9.fields,
      allData = _ref9.allData;
  // match filter.name to field.name
  var fieldIdx = fields.findIndex(function (_ref10) {
    var name = _ref10.name;
    return name === filter.name;
  });

  if (fieldIdx < 0) {
    // if can't find field with same name, discharge filter
    return null;
  }

  var field = fields[fieldIdx];
  var value = filter.value; // return filter type, default value, fieldType and fieldDomain from field

  var filterPropsFromField = (0, _filterUtils.getFilterProps)(allData, field);
  var matchedFilter = (0, _objectSpread4["default"])({}, (0, _filterUtils.getDefaultFilter)(filter.dataId), filter, filterPropsFromField, {
    freeze: true,
    fieldIdx: fieldIdx
  });
  var _matchedFilter = matchedFilter,
      yAxis = _matchedFilter.yAxis;

  if (yAxis) {
    var matcheAxis = fields.find(function (_ref11) {
      var name = _ref11.name,
          type = _ref11.type;
      return name === yAxis.name && type === yAxis.type;
    });
    matchedFilter = matcheAxis ? (0, _objectSpread4["default"])({}, matchedFilter, {
      yAxis: matcheAxis
    }, (0, _filterUtils.getFilterPlot)((0, _objectSpread4["default"])({}, matchedFilter, {
      yAxis: matcheAxis
    }), allData)) : matchedFilter;
  }

  matchedFilter.value = (0, _filterUtils.adjustValueToFilterDomain)(value, matchedFilter);

  if (matchedFilter.value === null) {
    // cannt adjust saved value to filter
    return null;
  }

  return matchedFilter;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtbWVyZ2VyLmpzIl0sIm5hbWVzIjpbIm1lcmdlRmlsdGVycyIsInN0YXRlIiwiZmlsdGVyc1RvTWVyZ2UiLCJtZXJnZWQiLCJ1bm1lcmdlZCIsImRhdGFzZXRzIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwiZm9yRWFjaCIsImZpbHRlciIsImRhdGFJZCIsInZhbGlkYXRlRmlsdGVyIiwidmFsaWRhdGVGaWx0ZXJXaXRoRGF0YSIsInB1c2giLCJ1cGRhdGVkRmlsdGVycyIsImZpbHRlcnMiLCJkYXRhc2V0VG9GaWx0ZXIiLCJtYXAiLCJkIiwidXBkYXRlZERhdGFzZXQiLCJyZWR1Y2UiLCJhY2N1IiwiYWxsRGF0YSIsImZpbHRlclRvQmVNZXJnZWQiLCJtZXJnZUxheWVycyIsImxheWVyc1RvTWVyZ2UiLCJtZXJnZWRMYXllciIsImxheWVyIiwiY29uZmlnIiwidmFsaWRhdGVMYXllciIsInZhbGlkYXRlTGF5ZXJXaXRoRGF0YSIsImxheWVyQ2xhc3NlcyIsImxheWVycyIsIm5ld0xheWVyT3JkZXIiLCJfIiwiaSIsImxheWVyT3JkZXIiLCJsYXllclRvQmVNZXJnZWQiLCJtZXJnZUludGVyYWN0aW9ucyIsImludGVyYWN0aW9uVG9CZU1lcmdlZCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJpbnRlcmFjdGlvbkNvbmZpZyIsImVuYWJsZWQiLCJjb25maWdTYXZlZCIsImNvbmZpZ1RvTWVyZ2UiLCJtZXJnZUludGVyYWN0aW9uVG9vbHRpcENvbmZpZyIsIm1lcmdlZFRvb2x0aXAiLCJ1bm1lcmdlZFRvb2x0aXAiLCJmaWVsZHNUb1Nob3ciLCJ0b29sdGlwIiwidG9vbHRpcENvbmZpZyIsImFsbEZpZWxkcyIsImZpZWxkcyIsIm5hbWUiLCJmb3VuZEZpZWxkc1RvU2hvdyIsImluY2x1ZGVzIiwibWVyZ2VMYXllckJsZW5kaW5nIiwibGF5ZXJCbGVuZGluZyIsIkxBWUVSX0JMRU5ESU5HUyIsInZhbGlkYXRlU2F2ZWRMYXllckNvbHVtbnMiLCJzYXZlZENvbHMiLCJlbXB0eUNvbHMiLCJjb2xGb3VuZCIsImFsbENvbEZvdW5kIiwiZXZlcnkiLCJzYXZlZCIsImZpZWxkSWR4IiwiZmluZEluZGV4IiwidmFsdWUiLCJvcHRpb25hbCIsInZhbGlkYXRlU2F2ZWRUZXh0TGFiZWwiLCJzYXZlZFRleHRMYWJlbCIsImxheWVyVGV4dExhYmVsIiwic2F2ZWRUZXh0TGFiZWxzIiwidGV4dExhYmVsIiwiZmllbGQiLCJmaW5kIiwiZmQiLCJ2YWxpZGF0ZVNhdmVkVmlzdWFsQ2hhbm5lbHMiLCJ2aXN1YWxDaGFubmVscyIsInNhdmVkTGF5ZXIiLCJ2YWx1ZXMiLCJmb3VuZCIsInNjYWxlIiwiZm91bmRGaWVsZCIsImlkIiwidHlwZSIsImhhc093blByb3BlcnR5IiwiY29sdW1ucyIsIm5ld0xheWVyIiwibGFiZWwiLCJjb2xvciIsImlzVmlzaWJsZSIsImdldExheWVyQ29sdW1ucyIsImZvdW5kVmlzdWFsQ2hhbm5lbENvbmZpZ3MiLCJ2aXNDb25maWciLCJjb3B5TGF5ZXJDb25maWciLCJub3RUb0RlZXBNZXJnZSIsInVwZGF0ZUxheWVyQ29uZmlnIiwiZmlsdGVyUHJvcHNGcm9tRmllbGQiLCJtYXRjaGVkRmlsdGVyIiwiZnJlZXplIiwieUF4aXMiLCJtYXRjaGVBeGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQVFBOztBQS9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFlQTs7Ozs7Ozs7QUFRTyxTQUFTQSxZQUFULENBQXNCQyxLQUF0QixFQUE2QkMsY0FBN0IsRUFBNkM7QUFDbEQsTUFBTUMsTUFBTSxHQUFHLEVBQWY7QUFDQSxNQUFNQyxRQUFRLEdBQUcsRUFBakI7QUFGa0QsTUFHM0NDLFFBSDJDLEdBRy9CSixL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S0F2QnlEOztBQXdCaEUsTUFBSUEsS0FBSixFQUFXO0FBQ1QsUUFBTUMsVUFBVSxHQUFHbkQsTUFBTSxDQUFDd0IsSUFBUCxDQUNqQjtBQUFBLFVBQUV2QixJQUFGLFVBQUVBLElBQUY7QUFBQSxVQUFRaUMsSUFBUixVQUFRQSxJQUFSO0FBQUEsYUFBa0JqQyxJQUFJLEtBQUtpRCxLQUFLLENBQUNqRCxJQUFmLElBQXVCaUMsSUFBSSxLQUFLZ0IsS0FBSyxDQUFDaEIsSUFBeEQ7QUFBQSxLQURpQixDQUFuQjtBQUlBYyxJQUFBQSxhQUFhLEdBQUdHLFVBQVUsc0NBRWpCSCxhQUZpQjtBQUdwQkUsTUFBQUEsS0FBSyxFQUFFQztBQUhhLE9BSWpCLG1FQUFrQkgsYUFBbEI7QUFBaUNFLE1BQUFBLEtBQUssRUFBRUM7QUFBeEMsUUFBcURuRixPQUFyRCxDQUppQixJQU10QmdGLGFBTko7QUFPRDs7QUFFREEsRUFBQUEsYUFBYSxDQUFDaEMsS0FBZCxHQUFzQiw0Q0FBMEJBLEtBQTFCLEVBQWlDZ0MsYUFBakMsQ0FBdEI7O0FBRUEsTUFBSUEsYUFBYSxDQUFDaEMsS0FBZCxLQUF3QixJQUE1QixFQUFrQztBQUNoQztBQUNBLFdBQU8sSUFBUDtBQUNEOztBQUVELFNBQU9nQyxhQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5pbXBvcnQgcGljayBmcm9tICdsb2Rhc2gucGljayc7XG5cbmltcG9ydCB7XG4gIGdldERlZmF1bHRGaWx0ZXIsXG4gIGdldEZpbHRlclByb3BzLFxuICBnZXRGaWx0ZXJQbG90LFxuICBmaWx0ZXJEYXRhLFxuICBhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluXG59IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5cbmltcG9ydCB7TEFZRVJfQkxFTkRJTkdTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbi8qKlxuICogTWVyZ2UgbG9hZGVkIGZpbHRlcnMgd2l0aCBjdXJyZW50IHN0YXRlLCBpZiBubyBmaWVsZHMgb3IgZGF0YSBhcmUgbG9hZGVkXG4gKiBzYXZlIGl0IGZvciBsYXRlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBmaWx0ZXJzVG9NZXJnZVxuICogQHJldHVybiB7T2JqZWN0fSB1cGRhdGVkU3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlRmlsdGVycyhzdGF0ZSwgZmlsdGVyc1RvTWVyZ2UpIHtcbiAgY29uc3QgbWVyZ2VkID0gW107XG4gIGNvbnN0IHVubWVyZ2VkID0gW107XG4gIGNvbnN0IHtkYXRhc2V0c30gPSBzdGF0ZTtcblxuICBpZiAoIUFycmF5LmlzQXJyYXkoZmlsdGVyc1RvTWVyZ2UpIHx8ICFmaWx0ZXJzVG9NZXJnZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICAvLyBtZXJnZSBmaWx0ZXJzXG4gIGZpbHRlcnNUb01lcmdlLmZvckVhY2goZmlsdGVyID0+IHtcbiAgICAvLyBtYXRjaCBmaWx0ZXIuZGF0YUlkIHdpdGggY3VycmVudCBkYXRlc2V0cyBpZFxuICAgIC8vIHVwbG9hZGVkIGRhdGEgbmVlZCB0byBoYXZlIHRoZSBzYW1lIGRhdGFJZCB3aXRoIHRoZSBmaWx0ZXJcbiAgICBpZiAoZGF0YXNldHNbZmlsdGVyLmRhdGFJZF0pIHtcbiAgICAgIC8vIGRhdGFzZXRzIGlzIGFscmVhZHkgbG9hZGVkXG4gICAgICBjb25zdCB2YWxpZGF0ZUZpbHRlciA9IHZhbGlkYXRlRmlsdGVyV2l0aERhdGEoXG4gICAgICAgIGRhdGFzZXRzW2ZpbHRlci5kYXRhSWRdLFxuICAgICAgICBmaWx0ZXJcbiAgICAgICk7XG5cbiAgICAgIGlmICh2YWxpZGF0ZUZpbHRlcikge1xuICAgICAgICBtZXJnZWQucHVzaCh2YWxpZGF0ZUZpbHRlcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRhdGFzZXRzIG5vdCB5ZXQgbG9hZGVkXG4gICAgICB1bm1lcmdlZC5wdXNoKGZpbHRlcik7XG4gICAgfVxuICB9KTtcblxuICAvLyBmaWx0ZXIgZGF0YVxuICBjb25zdCB1cGRhdGVkRmlsdGVycyA9IFsuLi4oc3RhdGUuZmlsdGVycyB8fCBbXSksIC4uLm1lcmdlZF07XG4gIGNvbnN0IGRhdGFzZXRUb0ZpbHRlciA9IHVuaXEobWVyZ2VkLm1hcChkID0+IGQuZGF0YUlkKSk7XG5cbiAgY29uc3QgdXBkYXRlZERhdGFzZXQgPSBkYXRhc2V0VG9GaWx0ZXIucmVkdWNlKFxuICAgIChhY2N1LCBkYXRhSWQpID0+ICh7XG4gICAgICAuLi5hY2N1LFxuICAgICAgW2RhdGFJZF06IHtcbiAgICAgICAgLi4uZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgLi4uZmlsdGVyRGF0YShkYXRhc2V0c1tkYXRhSWRdLmFsbERhdGEsIGRhdGFJZCwgdXBkYXRlZEZpbHRlcnMpXG4gICAgICB9XG4gICAgfSksXG4gICAgZGF0YXNldHNcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGZpbHRlcnM6IHVwZGF0ZWRGaWx0ZXJzLFxuICAgIGRhdGFzZXRzOiB1cGRhdGVkRGF0YXNldCxcbiAgICBmaWx0ZXJUb0JlTWVyZ2VkOiB1bm1lcmdlZFxuICB9O1xufVxuXG4vKipcbiAqIE1lcmdlIGxheWVycyBmcm9tIGRlLXNlcmlhbGl6ZWQgc3RhdGUsIGlmIG5vIGZpZWxkcyBvciBkYXRhIGFyZSBsb2FkZWRcbiAqIHNhdmUgaXQgZm9yIGxhdGVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGxheWVyc1RvTWVyZ2VcbiAqIEByZXR1cm4ge09iamVjdH0gc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTGF5ZXJzKHN0YXRlLCBsYXllcnNUb01lcmdlKSB7XG4gIGNvbnN0IG1lcmdlZExheWVyID0gW107XG4gIGNvbnN0IHVubWVyZ2VkID0gW107XG5cbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShsYXllcnNUb01lcmdlKSB8fCAhbGF5ZXJzVG9NZXJnZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBsYXllcnNUb01lcmdlLmZvckVhY2gobGF5ZXIgPT4ge1xuICAgIGlmIChkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXSkge1xuICAgICAgLy8gZGF0YXNldHMgYXJlIGFscmVhZHkgbG9hZGVkXG4gICAgICBjb25zdCB2YWxpZGF0ZUxheWVyID0gdmFsaWRhdGVMYXllcldpdGhEYXRhKFxuICAgICAgICBkYXRhc2V0c1tsYXllci5jb25maWcuZGF0YUlkXSxcbiAgICAgICAgbGF5ZXIsXG4gICAgICAgIHN0YXRlLmxheWVyQ2xhc3Nlc1xuICAgICAgKTtcblxuICAgICAgaWYgKHZhbGlkYXRlTGF5ZXIpIHtcbiAgICAgICAgbWVyZ2VkTGF5ZXIucHVzaCh2YWxpZGF0ZUxheWVyKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZGF0YXNldHMgbm90IHlldCBsb2FkZWRcbiAgICAgIHVubWVyZ2VkLnB1c2gobGF5ZXIpO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgbGF5ZXJzID0gWy4uLnN0YXRlLmxheWVycywgLi4ubWVyZ2VkTGF5ZXJdO1xuICBjb25zdCBuZXdMYXllck9yZGVyID0gbWVyZ2VkTGF5ZXIubWFwKChfLCBpKSA9PiBzdGF0ZS5sYXllcnMubGVuZ3RoICsgaSk7XG5cbiAgLy8gcHV0IG5ldyBsYXllcnMgaW4gZnJvbnQgb2YgY3VycmVudCBsYXllcnNcbiAgY29uc3QgbGF5ZXJPcmRlciA9IFsuLi5uZXdMYXllck9yZGVyLCAuLi5zdGF0ZS5sYXllck9yZGVyXTtcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIGxheWVycyxcbiAgICBsYXllck9yZGVyLFxuICAgIGxheWVyVG9CZU1lcmdlZDogdW5tZXJnZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBpbnRlcmFjdGlvbnMgd2l0aCBzYXZlZCBjb25maWdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnRlcmFjdGlvblRvQmVNZXJnZWRcbiAqIEByZXR1cm4ge09iamVjdH0gbWVyZ2VkU3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlSW50ZXJhY3Rpb25zKHN0YXRlLCBpbnRlcmFjdGlvblRvQmVNZXJnZWQpIHtcbiAgY29uc3QgbWVyZ2VkID0ge307XG4gIGNvbnN0IHVubWVyZ2VkID0ge307XG5cbiAgaWYgKGludGVyYWN0aW9uVG9CZU1lcmdlZCkge1xuICAgIE9iamVjdC5rZXlzKGludGVyYWN0aW9uVG9CZU1lcmdlZCkuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCFzdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qge2VuYWJsZWQsIC4uLmNvbmZpZ1NhdmVkfSA9IGludGVyYWN0aW9uVG9CZU1lcmdlZFtrZXldIHx8IHt9O1xuICAgICAgbGV0IGNvbmZpZ1RvTWVyZ2UgPSBjb25maWdTYXZlZDtcblxuICAgICAgaWYgKGtleSA9PT0gJ3Rvb2x0aXAnKSB7XG4gICAgICAgIGNvbnN0IHttZXJnZWRUb29sdGlwLCB1bm1lcmdlZFRvb2x0aXB9ID0gbWVyZ2VJbnRlcmFjdGlvblRvb2x0aXBDb25maWcoXG4gICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgY29uZmlnU2F2ZWRcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBtZXJnZSBuZXcgZGF0YXNldCB0b29sdGlwcyB3aXRoIG9yaWdpbmFsIGRhdGFzZXQgdG9vbHRpcHNcbiAgICAgICAgY29uZmlnVG9NZXJnZSA9IHtcbiAgICAgICAgICBmaWVsZHNUb1Nob3c6IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0uY29uZmlnLmZpZWxkc1RvU2hvdyxcbiAgICAgICAgICAgIC4uLm1lcmdlZFRvb2x0aXBcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHVubWVyZ2VkVG9vbHRpcCkubGVuZ3RoKSB7XG4gICAgICAgICAgdW5tZXJnZWQudG9vbHRpcCA9IHtmaWVsZHNUb1Nob3c6IHVubWVyZ2VkVG9vbHRpcCwgZW5hYmxlZH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbWVyZ2VkW2tleV0gPSB7XG4gICAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0sXG4gICAgICAgIGVuYWJsZWQsXG4gICAgICAgIGNvbmZpZzogcGljayhcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZ1trZXldLmNvbmZpZyxcbiAgICAgICAgICAgIC4uLmNvbmZpZ1RvTWVyZ2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIE9iamVjdC5rZXlzKHN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2tleV0uY29uZmlnKVxuICAgICAgICApXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZzoge1xuICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAuLi5tZXJnZWRcbiAgICB9LFxuICAgIGludGVyYWN0aW9uVG9CZU1lcmdlZDogdW5tZXJnZWRcbiAgfTtcbn1cblxuLyoqXG4gKiBNZXJnZSBpbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwIHdpdGggc2F2ZWQgY29uZmlnLFxuICogdmFsaWRhdGUgZmllbGRzVG9TaG93XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdG9vbHRpcENvbmZpZ1xuICogQHJldHVybiB7T2JqZWN0fSAtIHttZXJnZWRUb29sdGlwOiB7fSwgdW5tZXJnZWRUb29sdGlwOiB7fX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlSW50ZXJhY3Rpb25Ub29sdGlwQ29uZmlnKHN0YXRlLCB0b29sdGlwQ29uZmlnID0ge30pIHtcbiAgY29uc3QgdW5tZXJnZWRUb29sdGlwID0ge307XG4gIGNvbnN0IG1lcmdlZFRvb2x0aXAgPSB7fTtcblxuICBpZiAoXG4gICAgIXRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93IHx8XG4gICAgIU9iamVjdC5rZXlzKHRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93KS5sZW5ndGhcbiAgKSB7XG4gICAgcmV0dXJuIHttZXJnZWRUb29sdGlwLCB1bm1lcmdlZFRvb2x0aXB9O1xuICB9XG5cbiAgZm9yIChjb25zdCBkYXRhSWQgaW4gdG9vbHRpcENvbmZpZy5maWVsZHNUb1Nob3cpIHtcbiAgICBpZiAoIXN0YXRlLmRhdGFzZXRzW2RhdGFJZF0pIHtcbiAgICAgIC8vIGlzIG5vdCB5ZXQgbG9hZGVkXG4gICAgICB1bm1lcmdlZFRvb2x0aXBbZGF0YUlkXSA9IHRvb2x0aXBDb25maWcuZmllbGRzVG9TaG93W2RhdGFJZF07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGRhdGFzZXQgaXMgbG9hZGVkXG4gICAgICBjb25zdCBhbGxGaWVsZHMgPSBzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdLmZpZWxkcy5tYXAoZCA9PiBkLm5hbWUpO1xuICAgICAgY29uc3QgZm91bmRGaWVsZHNUb1Nob3cgPSB0b29sdGlwQ29uZmlnLmZpZWxkc1RvU2hvd1tkYXRhSWRdLmZpbHRlcihcbiAgICAgICAgbmFtZSA9PiBhbGxGaWVsZHMuaW5jbHVkZXMobmFtZSlcbiAgICAgICk7XG5cbiAgICAgIG1lcmdlZFRvb2x0aXBbZGF0YUlkXSA9IGZvdW5kRmllbGRzVG9TaG93O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7bWVyZ2VkVG9vbHRpcCwgdW5tZXJnZWRUb29sdGlwfTtcbn1cbi8qKlxuICogTWVyZ2UgbGF5ZXJCbGVuZGluZyB3aXRoIHNhdmVkXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGF5ZXJCbGVuZGluZ1xuICogQHJldHVybiB7b2JqZWN0fSBtZXJnZWQgc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlTGF5ZXJCbGVuZGluZyhzdGF0ZSwgbGF5ZXJCbGVuZGluZykge1xuICBpZiAobGF5ZXJCbGVuZGluZyAmJiBMQVlFUl9CTEVORElOR1NbbGF5ZXJCbGVuZGluZ10pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBsYXllckJsZW5kaW5nXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCBsYXllciBjb2x1bW5zIHdpdGggbmV3IGRhdGEsXG4gKiB1cGRhdGUgZmllbGRJZHggYmFzZWQgb24gbmV3IGZpZWxkc1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmllbGRzXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRDb2xzXG4gKiBAcGFyYW0ge09iamVjdH0gZW1wdHlDb2xzXG4gKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSAtIHZhbGlkYXRlZCBjb2x1bW5zIG9yIG51bGxcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVTYXZlZExheWVyQ29sdW1ucyhmaWVsZHMsIHNhdmVkQ29scywgZW1wdHlDb2xzKSB7XG4gIGNvbnN0IGNvbEZvdW5kID0ge307XG4gIC8vIGZpbmQgYWN0dWFsIGNvbHVtbiBmaWVsZElkeCwgaW4gY2FzZSBpdCBoYXMgY2hhbmdlZFxuICBjb25zdCBhbGxDb2xGb3VuZCA9IE9iamVjdC5rZXlzKGVtcHR5Q29scykuZXZlcnkoa2V5ID0+IHtcbiAgICBjb25zdCBzYXZlZCA9IHNhdmVkQ29sc1trZXldO1xuICAgIGNvbEZvdW5kW2tleV0gPSB7Li4uZW1wdHlDb2xzW2tleV19O1xuXG4gICAgY29uc3QgZmllbGRJZHggPSBmaWVsZHMuZmluZEluZGV4KCh7bmFtZX0pID0+IG5hbWUgPT09IHNhdmVkKTtcblxuICAgIGlmIChmaWVsZElkeCA+IC0xKSB7XG4gICAgICAvLyB1cGRhdGUgZm91bmQgY29sdW1uc1xuICAgICAgY29sRm91bmRba2V5XS5maWVsZElkeCA9IGZpZWxkSWR4O1xuICAgICAgY29sRm91bmRba2V5XS52YWx1ZSA9IHNhdmVkO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gaWYgY29sIGlzIG9wdGlvbmFsLCBhbGxvdyBudWxsIHZhbHVlXG4gICAgcmV0dXJuIGVtcHR5Q29sc1trZXldLm9wdGlvbmFsIHx8IGZhbHNlO1xuICB9KTtcblxuICByZXR1cm4gYWxsQ29sRm91bmQgJiYgY29sRm91bmQ7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgdGV4dCBsYWJlbCBjb25maWcgd2l0aCBuZXcgZGF0YVxuICogcmVmZXIgdG8gdmlzLXN0YXRlLXNjaGVtYS5qcyBUZXh0TGFiZWxTY2hlbWFWMVxuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmllbGRzXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRUZXh0TGFiZWxcbiAqIEByZXR1cm4ge09iamVjdH0gLSB2YWxpZGF0ZWQgdGV4dGxhYmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVNhdmVkVGV4dExhYmVsKGZpZWxkcywgW2xheWVyVGV4dExhYmVsXSwgc2F2ZWRUZXh0TGFiZWwpIHtcbiAgY29uc3Qgc2F2ZWRUZXh0TGFiZWxzID0gQXJyYXkuaXNBcnJheShzYXZlZFRleHRMYWJlbCkgP1xuICAgIHNhdmVkVGV4dExhYmVsIDogW3NhdmVkVGV4dExhYmVsXTtcblxuICAvLyB2YWxpZGF0ZSBmaWVsZFxuICByZXR1cm4gc2F2ZWRUZXh0TGFiZWxzLm1hcCh0ZXh0TGFiZWwgPT4ge1xuICAgIGNvbnN0IGZpZWxkID0gdGV4dExhYmVsLmZpZWxkID8gZmllbGRzLmZpbmQoZmQgPT5cbiAgICAgIE9iamVjdC5rZXlzKHRleHRMYWJlbC5maWVsZCkuZXZlcnkoXG4gICAgICAgIGtleSA9PiB0ZXh0TGFiZWwuZmllbGRba2V5XSA9PT0gZmRba2V5XVxuICAgICAgKVxuICAgICkgOiBudWxsO1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGxheWVyVGV4dExhYmVsKS5yZWR1Y2UoKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgIC4uLmFjY3UsXG4gICAgICBba2V5XToga2V5ID09PSAnZmllbGQnID8gZmllbGQgOiAodGV4dExhYmVsW2tleV0gfHwgbGF5ZXJUZXh0TGFiZWxba2V5XSlcbiAgICB9KSwge30pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBWYWxpZGF0ZSBzYXZlZCB2aXN1YWwgY2hhbm5lbHMgY29uZmlnIHdpdGggbmV3IGRhdGEsXG4gKiByZWZlciB0byB2aXMtc3RhdGUtc2NoZW1hLmpzIFZpc3VhbENoYW5uZWxTY2hlbWFWMVxuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmllbGRzXG4gKiBAcGFyYW0ge09iamVjdH0gdmlzdWFsQ2hhbm5lbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzYXZlZExheWVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gdmFsaWRhdGVkIHZpc3VhbCBjaGFubmVsIGluIGNvbmZpZyBvciB7fVxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVTYXZlZFZpc3VhbENoYW5uZWxzKFxuICBmaWVsZHMsXG4gIHZpc3VhbENoYW5uZWxzLFxuICBzYXZlZExheWVyXG4pIHtcbiAgcmV0dXJuIE9iamVjdC52YWx1ZXModmlzdWFsQ2hhbm5lbHMpLnJlZHVjZSgoZm91bmQsIHtmaWVsZCwgc2NhbGV9KSA9PiB7XG4gICAgbGV0IGZvdW5kRmllbGQ7XG4gICAgaWYgKHNhdmVkTGF5ZXIuY29uZmlnW2ZpZWxkXSkge1xuICAgICAgZm91bmRGaWVsZCA9IGZpZWxkcy5maW5kKGZkID0+XG4gICAgICAgIE9iamVjdC5rZXlzKHNhdmVkTGF5ZXIuY29uZmlnW2ZpZWxkXSkuZXZlcnkoXG4gICAgICAgICAga2V5ID0+IHNhdmVkTGF5ZXIuY29uZmlnW2ZpZWxkXVtrZXldID09PSBmZFtrZXldXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmZvdW5kLFxuICAgICAgLi4uKGZvdW5kRmllbGQgPyB7W2ZpZWxkXTogZm91bmRGaWVsZH0gOiB7fSksXG4gICAgICAuLi4oc2F2ZWRMYXllci5jb25maWdbc2NhbGVdID8ge1tzY2FsZV06IHNhdmVkTGF5ZXIuY29uZmlnW3NjYWxlXX0gOiB7fSlcbiAgICB9O1xuICB9LCB7fSk7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgbGF5ZXIgY29uZmlnIHdpdGggbmV3IGRhdGEsXG4gKiB1cGRhdGUgZmllbGRJZHggYmFzZWQgb24gbmV3IGZpZWxkc1xuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZmllbGRzXG4gKiBAcGFyYW0ge3N0cmluZ30gZGF0YUlkXG4gKiBAcGFyYW0ge09iamVjdH0gc2F2ZWRMYXllclxuICogQHBhcmFtIHtPYmplY3R9IGxheWVyQ2xhc3Nlc1xuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gLSB2YWxpZGF0ZWQgbGF5ZXIgb3IgbnVsbFxuICovXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVMYXllcldpdGhEYXRhKHtmaWVsZHMsIGlkOiBkYXRhSWR9LCBzYXZlZExheWVyLCBsYXllckNsYXNzZXMpIHtcbiAgY29uc3Qge3R5cGV9ID0gc2F2ZWRMYXllcjtcbiAgLy8gbGF5ZXIgZG9lc250IGhhdmUgYSB2YWxpZCB0eXBlXG4gIGlmIChcbiAgICAhbGF5ZXJDbGFzc2VzLmhhc093blByb3BlcnR5KHR5cGUpIHx8XG4gICAgIXNhdmVkTGF5ZXIuY29uZmlnIHx8XG4gICAgIXNhdmVkTGF5ZXIuY29uZmlnLmNvbHVtbnNcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBuZXdMYXllciA9IG5ldyBsYXllckNsYXNzZXNbdHlwZV0oe1xuICAgIGlkOiBzYXZlZExheWVyLmlkLFxuICAgIGRhdGFJZCxcbiAgICBsYWJlbDogc2F2ZWRMYXllci5jb25maWcubGFiZWwsXG4gICAgY29sb3I6IHNhdmVkTGF5ZXIuY29uZmlnLmNvbG9yLFxuICAgIGlzVmlzaWJsZTogc2F2ZWRMYXllci5jb25maWcuaXNWaXNpYmxlXG4gIH0pO1xuXG4gIC8vIGZpbmQgY29sdW1uIGZpZWxkSWR4XG4gIGNvbnN0IGNvbHVtbnMgPSB2YWxpZGF0ZVNhdmVkTGF5ZXJDb2x1bW5zKFxuICAgIGZpZWxkcyxcbiAgICBzYXZlZExheWVyLmNvbmZpZy5jb2x1bW5zLFxuICAgIG5ld0xheWVyLmdldExheWVyQ29sdW1ucygpXG4gICk7XG5cbiAgaWYgKCFjb2x1bW5zKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB2aXN1YWwgY2hhbm5lbCBmaWVsZCBpcyBzYXZlZCB0byBiZSB7bmFtZSwgdHlwZX1cbiAgLy8gZmluZCB2aXN1YWwgY2hhbm5lbCBmaWVsZCBieSBtYXRjaGluZyBib3RoIG5hbWUgYW5kIHR5cGVcbiAgLy8gcmVmZXIgdG8gdmlzLXN0YXRlLXNjaGVtYS5qcyBWaXN1YWxDaGFubmVsU2NoZW1hVjFcbiAgY29uc3QgZm91bmRWaXN1YWxDaGFubmVsQ29uZmlncyA9IHZhbGlkYXRlU2F2ZWRWaXN1YWxDaGFubmVscyhcbiAgICBmaWVsZHMsXG4gICAgbmV3TGF5ZXIudmlzdWFsQ2hhbm5lbHMsXG4gICAgc2F2ZWRMYXllclxuICApO1xuXG4gIGNvbnN0IHRleHRMYWJlbCA9IHNhdmVkTGF5ZXIuY29uZmlnLnRleHRMYWJlbCAmJiBuZXdMYXllci5jb25maWcudGV4dExhYmVsID8gdmFsaWRhdGVTYXZlZFRleHRMYWJlbChcbiAgICBmaWVsZHMsXG4gICAgbmV3TGF5ZXIuY29uZmlnLnRleHRMYWJlbCxcbiAgICBzYXZlZExheWVyLmNvbmZpZy50ZXh0TGFiZWxcbiAgKSA6IG5ld0xheWVyLmNvbmZpZy50ZXh0TGFiZWw7XG5cbiAgLy8gY29weSB2aXNDb25maWcgb3ZlciB0byBlbXB0eUxheWVyIHRvIG1ha2Ugc3VyZSBpdCBoYXMgYWxsIHRoZSBwcm9wc1xuICBjb25zdCB2aXNDb25maWcgPSBuZXdMYXllci5jb3B5TGF5ZXJDb25maWcoXG4gICAgbmV3TGF5ZXIuY29uZmlnLnZpc0NvbmZpZyxcbiAgICBzYXZlZExheWVyLmNvbmZpZy52aXNDb25maWcgfHwge30sXG4gICAge25vdFRvRGVlcE1lcmdlOiBbJ2NvbG9yUmFuZ2UnLCAnc3Ryb2tlQ29sb3JSYW5nZSddfVxuICApO1xuXG4gIG5ld0xheWVyLnVwZGF0ZUxheWVyQ29uZmlnKHtcbiAgICBjb2x1bW5zLFxuICAgIHZpc0NvbmZpZyxcbiAgICB0ZXh0TGFiZWwsXG4gICAgLi4uZm91bmRWaXN1YWxDaGFubmVsQ29uZmlnc1xuICB9KTtcblxuICByZXR1cm4gbmV3TGF5ZXI7XG59XG5cbi8qKlxuICogVmFsaWRhdGUgc2F2ZWQgZmlsdGVyIGNvbmZpZyB3aXRoIG5ldyBkYXRhLFxuICogY2FsY3VsYXRlIGRvbWFpbiBhbmQgZmllbGRJZHggYmFzZWQgbmV3IGZpZWxkcyBhbmQgZGF0YVxuICpcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZGF0YXNldC5maWVsZHNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gZGF0YXNldC5hbGxEYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gZmlsdGVyIC0gZmlsdGVyIHRvIGJlIHZhbGlkYXRlXG4gKiBAcmV0dXJuIHtPYmplY3QgfCBudWxsfSAtIHZhbGlkYXRlZCBmaWx0ZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRmlsdGVyV2l0aERhdGEoe2ZpZWxkcywgYWxsRGF0YX0sIGZpbHRlcikge1xuICAvLyBtYXRjaCBmaWx0ZXIubmFtZSB0byBmaWVsZC5uYW1lXG4gIGNvbnN0IGZpZWxkSWR4ID0gZmllbGRzLmZpbmRJbmRleCgoe25hbWV9KSA9PiBuYW1lID09PSBmaWx0ZXIubmFtZSk7XG5cbiAgaWYgKGZpZWxkSWR4IDwgMCkge1xuICAgIC8vIGlmIGNhbid0IGZpbmQgZmllbGQgd2l0aCBzYW1lIG5hbWUsIGRpc2NoYXJnZSBmaWx0ZXJcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGZpZWxkID0gZmllbGRzW2ZpZWxkSWR4XTtcbiAgY29uc3QgdmFsdWUgPSBmaWx0ZXIudmFsdWU7XG5cbiAgLy8gcmV0dXJuIGZpbHRlciB0eXBlLCBkZWZhdWx0IHZhbHVlLCBmaWVsZFR5cGUgYW5kIGZpZWxkRG9tYWluIGZyb20gZmllbGRcbiAgY29uc3QgZmlsdGVyUHJvcHNGcm9tRmllbGQgPSBnZXRGaWx0ZXJQcm9wcyhhbGxEYXRhLCBmaWVsZCk7XG5cbiAgbGV0IG1hdGNoZWRGaWx0ZXIgPSB7XG4gICAgLi4uZ2V0RGVmYXVsdEZpbHRlcihmaWx0ZXIuZGF0YUlkKSxcbiAgICAuLi5maWx0ZXIsXG4gICAgLi4uZmlsdGVyUHJvcHNGcm9tRmllbGQsXG4gICAgZnJlZXplOiB0cnVlLFxuICAgIGZpZWxkSWR4XG4gIH07XG5cbiAgY29uc3Qge3lBeGlzfSA9IG1hdGNoZWRGaWx0ZXI7XG4gIGlmICh5QXhpcykge1xuICAgIGNvbnN0IG1hdGNoZUF4aXMgPSBmaWVsZHMuZmluZChcbiAgICAgICh7bmFtZSwgdHlwZX0pID0+IG5hbWUgPT09IHlBeGlzLm5hbWUgJiYgdHlwZSA9PT0geUF4aXMudHlwZVxuICAgICk7XG5cbiAgICBtYXRjaGVkRmlsdGVyID0gbWF0Y2hlQXhpc1xuICAgICAgPyB7XG4gICAgICAgICAgLi4ubWF0Y2hlZEZpbHRlcixcbiAgICAgICAgICB5QXhpczogbWF0Y2hlQXhpcyxcbiAgICAgICAgICAuLi5nZXRGaWx0ZXJQbG90KHsuLi5tYXRjaGVkRmlsdGVyLCB5QXhpczogbWF0Y2hlQXhpc30sIGFsbERhdGEpXG4gICAgICAgIH1cbiAgICAgIDogbWF0Y2hlZEZpbHRlcjtcbiAgfVxuXG4gIG1hdGNoZWRGaWx0ZXIudmFsdWUgPSBhZGp1c3RWYWx1ZVRvRmlsdGVyRG9tYWluKHZhbHVlLCBtYXRjaGVkRmlsdGVyKTtcblxuICBpZiAobWF0Y2hlZEZpbHRlci52YWx1ZSA9PT0gbnVsbCkge1xuICAgIC8vIGNhbm50IGFkanVzdCBzYXZlZCB2YWx1ZSB0byBmaWx0ZXJcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBtYXRjaGVkRmlsdGVyO1xufVxuIl19