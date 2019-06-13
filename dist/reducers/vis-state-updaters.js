"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.layerConfigChangeUpdater = layerConfigChangeUpdater;
exports.layerTextLabelChangeUpdater = layerTextLabelChangeUpdater;
exports.layerTypeChangeUpdater = layerTypeChangeUpdater;
exports.layerVisualChannelChangeUpdater = layerVisualChannelChangeUpdater;
exports.layerVisConfigChangeUpdater = layerVisConfigChangeUpdater;
exports.interactionConfigChangeUpdater = interactionConfigChangeUpdater;
exports.setFilterUpdater = setFilterUpdater;
exports.addDefaultLayers = addDefaultLayers;
exports.addDefaultTooltips = addDefaultTooltips;
exports.updateAllLayerDomainData = updateAllLayerDomainData;
exports.loadFilesErrUpdater = exports.loadFilesUpdater = exports.updateVisDataUpdater = exports.toggleLayerForMapUpdater = exports.setVisibleLayersForMapUpdater = exports.toggleSplitMapUpdater = exports.mapClickUpdater = exports.layerClickUpdater = exports.layerHoverUpdater = exports.receiveMapConfigUpdater = exports.resetMapConfigVisStateUpdater = exports.showDatasetTableUpdater = exports.updateLayerBlendingUpdater = exports.removeDatasetUpdater = exports.reorderLayerUpdater = exports.removeLayerUpdater = exports.addLayerUpdater = exports.removeFilterUpdater = exports.enlargeFilterUpdater = exports.updateAnimationSpeedUpdater = exports.toggleFilterAnimationUpdater = exports.addFilterUpdater = exports.setFilterPlotUpdater = exports.INITIAL_VIS_STATE = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread14 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _window = require("global/window");

var _tasks = _interopRequireWildcard(require("react-palm/tasks"));

var _tasks2 = require("../tasks/tasks");

var _visStateActions = require("../actions/vis-state-actions");

var _actions = require("../actions");

var _interactionUtils = require("../utils/interaction-utils");

var _filterUtils = require("../utils/filter-utils");

var _datasetUtils = require("../utils/dataset-utils");

var _layerUtils = require("../utils/layer-utils/layer-utils");

var _visStateMerger = require("./vis-state-merger");

var _layers = require("../layers");

var _fileUtils = require("../utils/file-utils");

var _layerFactory = require("../layers/layer-factory");

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return (0, _typeof2["default"])(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if ((0, _typeof2["default"])(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if ((0, _typeof2["default"])(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

// react-palm
// disable capture exception for react-palm call to withTask
(0, _tasks.disableStackCapturing)();
/**
 * Updaters for `visState` reducer. Can be used in your root reducer to directly modify kepler.gl's state.
 * Read more about [Using updaters](../advanced-usage/using-updaters.md)
 *
 * @public
 * @example
 *
 * import keplerGlReducer, {visStateUpdaters} from 'kepler.gl/reducers';
 * // Root Reducer
 * const reducers = combineReducers({
 *  keplerGl: keplerGlReducer,
 *  app: appReducer
 * });
 *
 * const composedReducer = (state, action) => {
 *  switch (action.type) {
 *    case 'CLICK_BUTTON':
 *      return {
 *        ...state,
 *        keplerGl: {
 *          ...state.keplerGl,
 *          foo: {
 *             ...state.keplerGl.foo,
 *             visState: visStateUpdaters.enlargeFilterUpdater(
 *               state.keplerGl.foo.visState,
 *               {idx: 0}
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

var visStateUpdaters = null;
/* eslint-enable no-unused-vars */

/**
 * Default initial `visState`
 * @memberof visStateUpdaters
 * @constant
 * @type {Object}
 * @property {Array} layers
 * @property {Array} layerData
 * @property {Array} layerToBeMerged
 * @property {Array} layerOrder
 * @property {Array} filters
 * @property {Array} filterToBeMerged
 * @property {Array} datasets
 * @property {string} editingDataset
 * @property {Object} interactionConfig
 * @property {Object} interactionToBeMerged
 * @property {string} layerBlending
 * @property {Object} hoverInfo
 * @property {Object} clicked
 * @property {boolean} fileLoading
 * @property {*} fileLoadingErr
 * @property {Array} splitMaps - a list of objects of layer availabilities and visibilities for each map
 * @public
 */

var INITIAL_VIS_STATE = {
  // layers
  layers: [],
  layerData: [],
  layerToBeMerged: [],
  layerOrder: [],
  // filters
  filters: [],
  filterToBeMerged: [],
  // a collection of multiple dataset
  datasets: {},
  editingDataset: undefined,
  interactionConfig: (0, _interactionUtils.getDefaultInteraction)(),
  interactionToBeMerged: undefined,
  layerBlending: 'normal',
  hoverInfo: undefined,
  clicked: undefined,
  // TODO: not used anywhere, delete it
  fileLoading: false,
  fileLoadingErr: null,
  // this is used when user split maps
  splitMaps: [// this will contain a list of objects to
    // describe the state of layer availability and visibility for each map
    // [
    //   {
    //     layers: {
    //       layer_id: {
    //         isAvailable: true|false # this is driven by the left hand panel
    //         isVisible: true|false
    //       }
    //     }
    //   }
    // ]
  ],
  // defaults layer classes
  layerClasses: _layers.LayerClasses
};
exports.INITIAL_VIS_STATE = INITIAL_VIS_STATE;

function updateStateWithLayerAndData(state, _ref) {
  var layerData = _ref.layerData,
      layer = _ref.layer,
      idx = _ref.idx;
  return (0, _objectSpread14["default"])({}, state, {
    layers: state.layers.map(function (lyr, i) {
      return i === idx ? layer : lyr;
    }),
    layerData: layerData ? state.layerData.map(function (d, i) {
      return i === idx ? layerData : d;
    }) : state.layerData
  });
}
/**
 * Update layer base config: dataId, label, column, isVisible
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.oldLayer layer to be updated
 * @param {Object} action.newConfig new config
 * @returns {Object} nextState
 */


function layerConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newConfig);
  var newLayer = oldLayer.updateLayerConfig(action.newConfig);

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
      sameData: true
    }),
        layerData = _calculateLayerData.layerData,
        layer = _calculateLayerData.layer;

    return updateStateWithLayerAndData(state, {
      layerData: layerData,
      layer: layer,
      idx: idx
    });
  }

  var newState = (0, _objectSpread14["default"])({}, state, {
    splitMaps: 'isVisible' in action.newConfig ? toggleLayerFromSplitMaps(state, newLayer) : state.splitMaps
  });
  return updateStateWithLayerAndData(newState, {
    layer: newLayer,
    idx: idx
  });
}

function addOrRemoveTextLabels(newFields, textLabel) {
  var newTextLabel = textLabel.slice();
  var currentFields = textLabel.map(function (tl) {
    return tl.field && tl.field.name;
  }).filter(function (d) {
    return d;
  });
  var addFields = newFields.filter(function (f) {
    return !currentFields.includes(f.name);
  });
  var deleteFields = currentFields.filter(function (f) {
    return !newFields.find(function (fd) {
      return fd.name === f;
    });
  }); // delete

  newTextLabel = newTextLabel.filter(function (tl) {
    return tl.field && !deleteFields.includes(tl.field.name);
  });
  newTextLabel = !newTextLabel.length ? [_layerFactory.DEFAULT_TEXT_LABEL] : newTextLabel; // add

  newTextLabel = [].concat((0, _toConsumableArray2["default"])(newTextLabel.filter(function (tl) {
    return tl.field;
  })), (0, _toConsumableArray2["default"])(addFields.map(function (af) {
    return (0, _objectSpread14["default"])({}, _layerFactory.DEFAULT_TEXT_LABEL, {
      field: af
    });
  })));
  return newTextLabel;
}

function updateTextLabelPropAndValue(idx, prop, value, textLabel) {
  var newTextLabel = textLabel.slice();

  if (prop && (value || textLabel.length === 1)) {
    newTextLabel = textLabel.map(function (tl, i) {
      return i === idx ? (0, _objectSpread14["default"])({}, tl, (0, _defineProperty2["default"])({}, prop, value)) : tl;
    });
  } else if (prop === 'field' && value === null && textLabel.length > 1) {
    // remove label when field value is set to null
    newTextLabel.splice(idx, 1);
  }

  return newTextLabel;
}

function layerTextLabelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      idx = action.idx,
      prop = action.prop,
      value = action.value;
  var textLabel = oldLayer.config.textLabel;
  var newTextLabel = textLabel.slice();

  if (idx === 'all' && prop === 'fields') {
    newTextLabel = addOrRemoveTextLabels(value, textLabel);
  } // if idx is set to length, add empty text label


  if (!textLabel[idx] && idx === textLabel.length) {
    newTextLabel = [].concat((0, _toConsumableArray2["default"])(textLabel), [_layerFactory.DEFAULT_TEXT_LABEL]);
  } // update text label prop and value


  newTextLabel = updateTextLabelPropAndValue(idx, prop, value, newTextLabel);
  return layerConfigChangeUpdater(state, {
    oldLayer: oldLayer,
    newConfig: {
      textLabel: newTextLabel
    }
  });
}
/**
 * Update layer type. Previews layer config will be copied if applicable.
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.oldLayer layer to be updated
 * @param {string} action.newType new type
 * @returns {Object} nextState
 * @public
 */


function layerTypeChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newType = action.newType;
  var oldId = oldLayer.id;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldId;
  });

  if (!state.layerClasses[newType]) {
    _window.console.error("".concat(newType, " is not a valid layer type"));

    return state;
  } // get a mint layer, with new id and type
  // because deck.gl uses id to match between new and old layer.
  // If type has changed but id is the same, it will break


  var newLayer = new state.layerClasses[newType]();
  newLayer.assignConfigToLayer(oldLayer.config, oldLayer.visConfigSettings);

  if (newLayer.config.dataId) {
    var dataset = state.datasets[newLayer.config.dataId];
    newLayer.updateLayerDomain(dataset);
  }

  var _calculateLayerData2 = (0, _layerUtils.calculateLayerData)(newLayer, state),
      layerData = _calculateLayerData2.layerData,
      layer = _calculateLayerData2.layer;

  var newState = state; // update splitMap layer id

  if (state.splitMaps) {
    newState = (0, _objectSpread14["default"])({}, state, {
      splitMaps: state.splitMaps.map(function (settings) {
        var _settings$layers = settings.layers,
            oldLayerMap = _settings$layers[oldId],
            otherLayers = (0, _objectWithoutProperties2["default"])(_settings$layers, [oldId].map(_toPropertyKey));
        return (0, _objectSpread14["default"])({}, settings, {
          layers: (0, _objectSpread14["default"])({}, otherLayers, (0, _defineProperty2["default"])({}, layer.id, oldLayerMap))
        });
      })
    });
  }

  return updateStateWithLayerAndData(newState, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer visual channel
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.oldLayer layer to be updated
 * @param {Object} action.newConfig new visual channel config
 * @param {string} action.channel channel to be updated
 * @returns {Object} nextState
 * @public
 */


function layerVisualChannelChangeUpdater(state, action) {
  var oldLayer = action.oldLayer,
      newConfig = action.newConfig,
      channel = action.channel;
  var dataset = state.datasets[oldLayer.config.dataId];
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var newLayer = oldLayer.updateLayerConfig(newConfig);
  newLayer.updateLayerVisualChannel(dataset, channel);
  var oldLayerData = state.layerData[idx];

  var _calculateLayerData3 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
    sameData: true
  }),
      layerData = _calculateLayerData3.layerData,
      layer = _calculateLayerData3.layer;

  return updateStateWithLayerAndData(state, {
    layerData: layerData,
    layer: layer,
    idx: idx
  });
}
/**
 * Update layer `visConfig`
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.oldLayer layer to be updated
 * @param {Object} action.newVisConfig new visConfig as a key value map: e.g. `{opacity: 0.8}`
 * @returns {Object} nextState
 * @public
 */


function layerVisConfigChangeUpdater(state, action) {
  var oldLayer = action.oldLayer;
  var idx = state.layers.findIndex(function (l) {
    return l.id === oldLayer.id;
  });
  var props = Object.keys(action.newVisConfig);
  var newVisConfig = (0, _objectSpread14["default"])({}, oldLayer.config.visConfig, action.newVisConfig);
  var newLayer = oldLayer.updateLayerConfig({
    visConfig: newVisConfig
  });

  if (newLayer.shouldCalculateLayerData(props)) {
    var oldLayerData = state.layerData[idx];

    var _calculateLayerData4 = (0, _layerUtils.calculateLayerData)(newLayer, state, oldLayerData, {
      sameData: true
    }),
        layerData = _calculateLayerData4.layerData,
        layer = _calculateLayerData4.layer;

    return updateStateWithLayerAndData(state, {
      layerData: layerData,
      layer: layer,
      idx: idx
    });
  }

  return updateStateWithLayerAndData(state, {
    layer: newLayer,
    idx: idx
  });
}
/* eslint-enable max-statements */

/**
 * Update `interactionConfig`
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.config new config as key value map: `{tooltip: {enabled: true}}`
 * @returns {Object} nextState
 * @public
 */


function interactionConfigChangeUpdater(state, action) {
  var config = action.config;
  var interactionConfig = (0, _objectSpread14["default"])({}, state.interactionConfig, (0, _defineProperty2["default"])({}, config.id, config));

  if (config.enabled && !state.interactionConfig[config.id].enabled) {
    // only enable one interaction at a time
    Object.keys(interactionConfig).forEach(function (k) {
      if (k !== config.id) {
        interactionConfig[k] = (0, _objectSpread14["default"])({}, interactionConfig[k], {
          enabled: false
        });
      }
    });
  }

  return (0, _objectSpread14["default"])({}, state, {
    interactionConfig: interactionConfig
  });
}
/**
 * Update filter property
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} action.idx `idx` of filter to be updated
 * @param {string} action.prop `prop` of filter, e,g, `dataId`, `name`, `value`
 * @param {*} action.value new value
 * @returns {Object} nextState
 * @public
 */


function setFilterUpdater(state, action) {
  var idx = action.idx,
      prop = action.prop,
      value = action.value;
  var newState = state;
  var newFilter = (0, _objectSpread14["default"])({}, state.filters[idx], (0, _defineProperty2["default"])({}, prop, value));
  var _newFilter = newFilter,
      dataId = _newFilter.dataId;

  if (!dataId) {
    return state;
  }

  var _state$datasets$dataI = state.datasets[dataId],
      fields = _state$datasets$dataI.fields,
      allData = _state$datasets$dataI.allData;

  switch (prop) {
    case 'dataId':
      // if trying to update filter dataId. create an empty new filter
      newFilter = (0, _filterUtils.getDefaultFilter)(dataId);
      break;

    case 'name':
      // find the field
      var fieldIdx = fields.findIndex(function (f) {
        return f.name === value;
      });
      var field = fields[fieldIdx];

      if (!field.filterProp) {
        // get filter domain from field
        // save filterProps: {domain, steps, value} to field, avoid recalculate
        field = (0, _objectSpread14["default"])({}, field, {
          filterProp: (0, _filterUtils.getFilterProps)(allData, field)
        });
      }

      newFilter = (0, _objectSpread14["default"])({}, newFilter, field.filterProp, {
        name: field.name,
        // can't edit dataId once name is selected
        freeze: true,
        fieldIdx: fieldIdx
      });
      var enlargedFilterIdx = state.filters.findIndex(function (f) {
        return f.enlarged;
      });

      if (enlargedFilterIdx > -1 && enlargedFilterIdx !== idx) {
        // there should be only one enlarged filter
        newFilter.enlarged = false;
      }

      newState = (0, _objectSpread14["default"])({}, state, {
        datasets: (0, _objectSpread14["default"])({}, state.datasets, (0, _defineProperty2["default"])({}, dataId, (0, _objectSpread14["default"])({}, state.datasets[dataId], {
          fields: fields.map(function (d, i) {
            return i === fieldIdx ? field : d;
          })
        })))
      });
      break;

    case 'value':
    default:
      break;
  } // save new filters to newState


  newState = (0, _objectSpread14["default"])({}, newState, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  }); // filter data

  newState = (0, _objectSpread14["default"])({}, newState, {
    datasets: (0, _objectSpread14["default"])({}, newState.datasets, (0, _defineProperty2["default"])({}, dataId, (0, _objectSpread14["default"])({}, newState.datasets[dataId], (0, _filterUtils.filterData)(allData, dataId, newState.filters))))
  });
  newState = updateAllLayerDomainData(newState, dataId, newFilter);
  return newState;
}
/**
 * Set the property of a filter plot
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} action.idx
 * @param {Object} action.newProp key value mapping of new prop `{yAxis: 'histogram'}`
 * @returns {Object} nextState
 * @public
 */


var setFilterPlotUpdater = function setFilterPlotUpdater(state, _ref2) {
  var idx = _ref2.idx,
      newProp = _ref2.newProp;
  var newFilter = (0, _objectSpread14["default"])({}, state.filters[idx], newProp);
  var prop = Object.keys(newProp)[0];

  if (prop === 'yAxis') {
    var plotType = (0, _filterUtils.getDefaultFilterPlotType)(newFilter);

    if (plotType) {
      newFilter = (0, _objectSpread14["default"])({}, newFilter, (0, _filterUtils.getFilterPlot)((0, _objectSpread14["default"])({}, newFilter, {
        plotType: plotType
      }), state.datasets[newFilter.dataId].allData), {
        plotType: plotType
      });
    }
  }

  return (0, _objectSpread14["default"])({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === idx ? newFilter : f;
    })
  });
};
/**
 * Add a new filter
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {string} action.dataId dataset `id` this new filter is associated with
 * @returns {Object} nextState
 * @public
 */


exports.setFilterPlotUpdater = setFilterPlotUpdater;

var addFilterUpdater = function addFilterUpdater(state, action) {
  return !action.dataId ? state : (0, _objectSpread14["default"])({}, state, {
    filters: [].concat((0, _toConsumableArray2["default"])(state.filters), [(0, _filterUtils.getDefaultFilter)(action.dataId)])
  });
};
/**
 * Start and end filter animation
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} action.idx idx of filter
 * @returns {Object} nextState
 * @public
 */


exports.addFilterUpdater = addFilterUpdater;

var toggleFilterAnimationUpdater = function toggleFilterAnimationUpdater(state, action) {
  return (0, _objectSpread14["default"])({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _objectSpread14["default"])({}, f, {
        isAnimating: !f.isAnimating
      }) : f;
    })
  });
};
/**
 * Change filter animation speed
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} action.idx  `idx` of filter
 * @param {Number} action.speed `speed` to change it to. `speed` is a multiplier
 * @returns {Object} nextState
 * @public
 */


exports.toggleFilterAnimationUpdater = toggleFilterAnimationUpdater;

var updateAnimationSpeedUpdater = function updateAnimationSpeedUpdater(state, action) {
  return (0, _objectSpread14["default"])({}, state, {
    filters: state.filters.map(function (f, i) {
      return i === action.idx ? (0, _objectSpread14["default"])({}, f, {
        speed: action.speed
      }) : f;
    })
  });
};
/**
 * Show larger time filter at bottom for time playback (apply to time filter only)
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} action.idx index of filter to enlarge
 * @returns {Object} nextState
 * @public
 */


exports.updateAnimationSpeedUpdater = updateAnimationSpeedUpdater;

var enlargeFilterUpdater = function enlargeFilterUpdater(state, action) {
  var isEnlarged = state.filters[action.idx].enlarged;
  return (0, _objectSpread14["default"])({}, state, {
    filters: state.filters.map(function (f, i) {
      f.enlarged = !isEnlarged && i === action.idx;
      return f;
    })
  });
};
/**
 * Remove a filter
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} action.idx index of filter to b e removed
 * @returns {Object} nextState
 * @public
 */


exports.enlargeFilterUpdater = enlargeFilterUpdater;

var removeFilterUpdater = function removeFilterUpdater(state, action) {
  var idx = action.idx;
  var dataId = state.filters[idx].dataId;
  var newFilters = [].concat((0, _toConsumableArray2["default"])(state.filters.slice(0, idx)), (0, _toConsumableArray2["default"])(state.filters.slice(idx + 1, state.filters.length)));
  var newState = (0, _objectSpread14["default"])({}, state, {
    datasets: (0, _objectSpread14["default"])({}, state.datasets, (0, _defineProperty2["default"])({}, dataId, (0, _objectSpread14["default"])({}, state.datasets[dataId], (0, _filterUtils.filterData)(state.datasets[dataId].allData, dataId, newFilters)))),
    filters: newFilters
  });
  return updateAllLayerDomainData(newState, dataId);
};
/**
 * Add a new layer
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.props - new layer props
 * @returns {Object} nextState
 * @public
 */


exports.removeFilterUpdater = removeFilterUpdater;

var addLayerUpdater = function addLayerUpdater(state, action) {
  var defaultDataset = Object.keys(state.datasets)[0];
  var newLayer = new _layers.Layer((0, _objectSpread14["default"])({
    isVisible: true,
    isConfigActive: true,
    dataId: defaultDataset
  }, action.props));
  return (0, _objectSpread14["default"])({}, state, {
    layers: [].concat((0, _toConsumableArray2["default"])(state.layers), [newLayer]),
    layerData: [].concat((0, _toConsumableArray2["default"])(state.layerData), [{}]),
    layerOrder: [].concat((0, _toConsumableArray2["default"])(state.layerOrder), [state.layerOrder.length]),
    splitMaps: addNewLayersToSplitMap(state.splitMaps, newLayer)
  });
};
/**
 * remove layer
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} action.idx index of layer to b e removed
 * @returns {Object} nextState
 * @public
 */


exports.addLayerUpdater = addLayerUpdater;

var removeLayerUpdater = function removeLayerUpdater(state, _ref3) {
  var idx = _ref3.idx;
  var layers = state.layers,
      layerData = state.layerData,
      clicked = state.clicked,
      hoverInfo = state.hoverInfo;
  var layerToRemove = state.layers[idx];
  var newMaps = removeLayerFromSplitMaps(state, layerToRemove);
  return (0, _objectSpread14["default"])({}, state, {
    layers: [].concat((0, _toConsumableArray2["default"])(layers.slice(0, idx)), (0, _toConsumableArray2["default"])(layers.slice(idx + 1, layers.length))),
    layerData: [].concat((0, _toConsumableArray2["default"])(layerData.slice(0, idx)), (0, _toConsumableArray2["default"])(layerData.slice(idx + 1, layerData.length))),
    layerOrder: state.layerOrder.filter(function (i) {
      return i !== idx;
    }).map(function (pid) {
      return pid > idx ? pid - 1 : pid;
    }),
    clicked: layerToRemove.isLayerHovered(clicked) ? undefined : clicked,
    hoverInfo: layerToRemove.isLayerHovered(hoverInfo) ? undefined : hoverInfo,
    splitMaps: newMaps
  });
};
/**
 * Reorder layer
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Array<Number>} action.order an array of layer indexes
 * @returns {Object} nextState
 * @public
 */


exports.removeLayerUpdater = removeLayerUpdater;

var reorderLayerUpdater = function reorderLayerUpdater(state, _ref4) {
  var order = _ref4.order;
  return (0, _objectSpread14["default"])({}, state, {
    layerOrder: order
  });
};
/**
 * Remove a dataset and all layers, filters, tooltip configs that based on it
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {string} action.key dataset id
 * @returns {Object} nextState
 * @public
 */


exports.reorderLayerUpdater = reorderLayerUpdater;

var removeDatasetUpdater = function removeDatasetUpdater(state, action) {
  // extract dataset key
  var datasetKey = action.key;
  var datasets = state.datasets; // check if dataset is present

  if (!datasets[datasetKey]) {
    return state;
  }
  /* eslint-disable no-unused-vars */


  var layers = state.layers,
      _state$datasets = state.datasets,
      dataset = _state$datasets[datasetKey],
      newDatasets = (0, _objectWithoutProperties2["default"])(_state$datasets, [datasetKey].map(_toPropertyKey));
  /* eslint-enable no-unused-vars */

  var indexes = layers.reduce(function (listOfIndexes, layer, index) {
    if (layer.config.dataId === datasetKey) {
      listOfIndexes.push(index);
    }

    return listOfIndexes;
  }, []); // remove layers and datasets

  var _indexes$reduce = indexes.reduce(function (_ref5, idx) {
    var currentState = _ref5.newState,
        indexCounter = _ref5.indexCounter;
    var currentIndex = idx - indexCounter;
    currentState = removeLayerUpdater(currentState, {
      idx: currentIndex
    });
    indexCounter++;
    return {
      newState: currentState,
      indexCounter: indexCounter
    };
  }, {
    newState: (0, _objectSpread14["default"])({}, state, {
      datasets: newDatasets
    }),
    indexCounter: 0
  }),
      newState = _indexes$reduce.newState; // remove filters


  var filters = state.filters.filter(function (filter) {
    return filter.dataId !== datasetKey;
  }); // update interactionConfig

  var interactionConfig = state.interactionConfig;
  var _interactionConfig = interactionConfig,
      tooltip = _interactionConfig.tooltip;

  if (tooltip) {
    var config = tooltip.config;
    /* eslint-disable no-unused-vars */

    var _config$fieldsToShow = config.fieldsToShow,
        fields = _config$fieldsToShow[datasetKey],
        fieldsToShow = (0, _objectWithoutProperties2["default"])(_config$fieldsToShow, [datasetKey].map(_toPropertyKey));
    /* eslint-enable no-unused-vars */

    interactionConfig = (0, _objectSpread14["default"])({}, interactionConfig, {
      tooltip: (0, _objectSpread14["default"])({}, tooltip, {
        config: (0, _objectSpread14["default"])({}, config, {
          fieldsToShow: fieldsToShow
        })
      })
    });
  }

  return (0, _objectSpread14["default"])({}, newState, {
    filters: filters,
    interactionConfig: interactionConfig
  });
};
/**
 * update layer blending mode
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {string} action.mode one of `additive`, `normal` and `subtractive`
 * @returns {Object} nextState
 * @public
 */


exports.removeDatasetUpdater = removeDatasetUpdater;

var updateLayerBlendingUpdater = function updateLayerBlendingUpdater(state, action) {
  return (0, _objectSpread14["default"])({}, state, {
    layerBlending: action.mode
  });
};
/**
 * Display dataset table in a modal
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {string} action.dataId dataset id to show in table
 * @returns {Object} nextState
 * @public
 */


exports.updateLayerBlendingUpdater = updateLayerBlendingUpdater;

var showDatasetTableUpdater = function showDatasetTableUpdater(state, action) {
  return (0, _objectSpread14["default"])({}, state, {
    editingDataset: action.dataId
  });
};
/**
 * reset visState to initial State
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @returns {Object} nextState
 * @public
 */


exports.showDatasetTableUpdater = showDatasetTableUpdater;

var resetMapConfigVisStateUpdater = function resetMapConfigVisStateUpdater(state) {
  return (0, _objectSpread14["default"])({}, INITIAL_VIS_STATE, state.initialState, {
    initialState: state.initialState
  });
};
/**
 * Propagate `visState` reducer with a new configuration. Current config will be override.
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.payload map config to be propagated
 * @returns {Object} nextState
 * @public
 */


exports.resetMapConfigVisStateUpdater = resetMapConfigVisStateUpdater;

var receiveMapConfigUpdater = function receiveMapConfigUpdater(state, action) {
  if (!action.payload.visState) {
    return state;
  }

  var _action$payload$visSt = action.payload.visState,
      filters = _action$payload$visSt.filters,
      layers = _action$payload$visSt.layers,
      interactionConfig = _action$payload$visSt.interactionConfig,
      layerBlending = _action$payload$visSt.layerBlending,
      splitMaps = _action$payload$visSt.splitMaps; // always reset config when receive a new config

  var resetState = resetMapConfigVisStateUpdater(state);
  var mergedState = (0, _objectSpread14["default"])({}, resetState, {
    splitMaps: splitMaps || [] // maps doesn't require any logic

  });
  mergedState = (0, _visStateMerger.mergeFilters)(mergedState, filters);
  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layers);
  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionConfig);
  mergedState = (0, _visStateMerger.mergeLayerBlending)(mergedState, layerBlending);
  return mergedState;
};
/**
 * Trigger layer hover event with hovered object
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.info Object hovered, returned by deck.gl
 * @returns {Object} nextState
 * @public
 */


exports.receiveMapConfigUpdater = receiveMapConfigUpdater;

var layerHoverUpdater = function layerHoverUpdater(state, action) {
  return (0, _objectSpread14["default"])({}, state, {
    hoverInfo: action.info
  });
};
/**
 * Trigger layer click event with clicked object
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Object} action.info Object clicked, returned by deck.gl
 * @returns {Object} nextState
 * @public
 */


exports.layerHoverUpdater = layerHoverUpdater;

var layerClickUpdater = function layerClickUpdater(state, action) {
  return (0, _objectSpread14["default"])({}, state, {
    clicked: action.info && action.info.picked ? action.info : null
  });
};
/**
 * Trigger map click event, unselect clicked object
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @returns {Object} nextState
 * @public
 */


exports.layerClickUpdater = layerClickUpdater;

var mapClickUpdater = function mapClickUpdater(state) {
  return (0, _objectSpread14["default"])({}, state, {
    clicked: null
  });
};
/**
 * Toggle visibility of a layer for a split map
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number|undefined} action.payload index of the split map
 * @returns {Object} nextState
 * @public
 */


exports.mapClickUpdater = mapClickUpdater;

var toggleSplitMapUpdater = function toggleSplitMapUpdater(state, action) {
  return state.splitMaps && state.splitMaps.length === 0 ? (0, _objectSpread14["default"])({}, state, {
    // maybe we should use an array to store state for a single map as well
    // if current maps length is equal to 0 it means that we are about to split the view
    splitMaps: computeSplitMapLayers(state.layers)
  }) : closeSpecificMapAtIndex(state, action);
};
/**
 * Set layers to be visible in split map
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Number} mapIndex index of the split map
 * @param {Array<string>} layerIds array of layer ids
 * @returns {Object} nextState
 * @public
 */


exports.toggleSplitMapUpdater = toggleSplitMapUpdater;

var setVisibleLayersForMapUpdater = function setVisibleLayersForMapUpdater(state, action) {
  var mapIndex = action.mapIndex,
      layerIds = action.layerIds;

  if (!layerIds) {
    return state;
  }

  var _state$splitMaps = state.splitMaps,
      splitMaps = _state$splitMaps === void 0 ? [] : _state$splitMaps;

  if (splitMaps.length === 0) {
    // we should never get into this state
    // because this action should only be triggered
    // when map view is split
    // but something may have happened
    return state;
  } // need to check if maps is populated otherwise will create


  var _splitMaps$mapIndex = splitMaps[mapIndex],
      map = _splitMaps$mapIndex === void 0 ? {} : _splitMaps$mapIndex;
  var layers = map.layers || []; // we set visibility to true for all layers included in our input list

  var newLayers = (Object.keys(layers) || []).reduce(function (currentLayers, idx) {
    return (0, _objectSpread14["default"])({}, currentLayers, (0, _defineProperty2["default"])({}, idx, (0, _objectSpread14["default"])({}, layers[idx], {
      isVisible: layerIds.includes(idx)
    })));
  }, {});
  var newMaps = (0, _toConsumableArray2["default"])(splitMaps);
  newMaps[mapIndex] = (0, _objectSpread14["default"])({}, splitMaps[mapIndex], {
    layers: newLayers
  });
  return (0, _objectSpread14["default"])({}, state, {
    splitMaps: newMaps
  });
};
/**
 * Toggle visibility of a layer in a split map
 * @memberof visStateUpdaters
 * @param {Object} state
 * @param {Object} action
 * @param {Number} action.mapIndex index of the split map
 * @param {string} action.layerId id of the layer
 * @returns {Object} nextState
 * @public
 */


exports.setVisibleLayersForMapUpdater = setVisibleLayersForMapUpdater;

var toggleLayerForMapUpdater = function toggleLayerForMapUpdater(state, action) {
  if (!state.splitMaps[action.mapIndex]) {
    return state;
  }

  var mapSettings = state.splitMaps[action.mapIndex];
  var layers = mapSettings.layers;

  if (!layers || !layers[action.layerId]) {
    return state;
  }

  var layer = layers[action.layerId];
  var newLayer = (0, _objectSpread14["default"])({}, layer, {
    isVisible: !layer.isVisible
  });
  var newLayers = (0, _objectSpread14["default"])({}, layers, (0, _defineProperty2["default"])({}, action.layerId, newLayer));
  var newSplitMaps = (0, _toConsumableArray2["default"])(state.splitMaps);
  newSplitMaps[action.mapIndex] = (0, _objectSpread14["default"])({}, mapSettings, {
    layers: newLayers
  });
  return (0, _objectSpread14["default"])({}, state, {
    splitMaps: newSplitMaps
  });
};
/**
 * Add new dataset to `visState`, with option to load a map config along with the datasets
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Array<Object>|Object} action.datasets - ***required** datasets can be a dataset or an array of datasets
 * Each dataset object needs to have `info` and `data` property.
 * @param {Object} action.datasets.info -info of a dataset
 * @param {string} action.datasets.info.id - id of this dataset. If config is defined, `id` should matches the `dataId` in config.
 * @param {string} action.datasets.info.label - A display name of this dataset
 * @param {Object} action.datasets.data - ***required** The data object, in a tabular format with 2 properties `fields` and `rows`
 * @param {Array<Object>} action.datasets.data.fields - ***required** Array of fields,
 * @param {string} action.datasets.data.fields.name - ***required** Name of the field,
 * @param {Array<Array>} action.datasets.data.rows - ***required** Array of rows, in a tabular format with `fields` and `rows`
 * @param {Object} action.options option object `{centerMap: true}`
 * @param {Object} action.config map config
 * @returns {Object} nextState
 * @public
 */

/* eslint-disable max-statements */


exports.toggleLayerForMapUpdater = toggleLayerForMapUpdater;

var updateVisDataUpdater = function updateVisDataUpdater(state, action) {
  // datasets can be a single data entries or an array of multiple data entries
  var datasets = Array.isArray(action.datasets) ? action.datasets : [action.datasets];

  if (action.config) {
    // apply config if passed from action
    state = receiveMapConfigUpdater(state, {
      payload: {
        visState: action.config
      }
    });
  }

  var newDateEntries = datasets.reduce(function (accu, _ref6) {
    var _ref6$info = _ref6.info,
        info = _ref6$info === void 0 ? {} : _ref6$info,
        data = _ref6.data;
    return (0, _objectSpread14["default"])({}, accu, (0, _datasetUtils.createNewDataEntry)({
      info: info,
      data: data
    }, state.datasets) || {});
  }, {});

  if (!Object.keys(newDateEntries).length) {
    return state;
  }

  var stateWithNewData = (0, _objectSpread14["default"])({}, state, {
    datasets: (0, _objectSpread14["default"])({}, state.datasets, newDateEntries)
  }); // previously saved config before data loaded

  var _stateWithNewData$fil = stateWithNewData.filterToBeMerged,
      filterToBeMerged = _stateWithNewData$fil === void 0 ? [] : _stateWithNewData$fil,
      _stateWithNewData$lay = stateWithNewData.layerToBeMerged,
      layerToBeMerged = _stateWithNewData$lay === void 0 ? [] : _stateWithNewData$lay,
      _stateWithNewData$int = stateWithNewData.interactionToBeMerged,
      interactionToBeMerged = _stateWithNewData$int === void 0 ? {} : _stateWithNewData$int; // merge state with saved filters

  var mergedState = (0, _visStateMerger.mergeFilters)(stateWithNewData, filterToBeMerged); // merge state with saved layers

  mergedState = (0, _visStateMerger.mergeLayers)(mergedState, layerToBeMerged);

  if (mergedState.layers.length === state.layers.length) {
    // no layer merged, find defaults
    mergedState = addDefaultLayers(mergedState, newDateEntries);
  }

  if (mergedState.splitMaps.length) {
    var newLayers = mergedState.layers.filter(function (l) {
      return l.config.dataId in newDateEntries;
    }); // if map is split, add new layers to splitMaps

    mergedState = (0, _objectSpread14["default"])({}, mergedState, {
      splitMaps: addNewLayersToSplitMap(mergedState.splitMaps, newLayers)
    });
  } // merge state with saved interactions


  mergedState = (0, _visStateMerger.mergeInteractions)(mergedState, interactionToBeMerged); // if no tooltips merged add default tooltips

  Object.keys(newDateEntries).forEach(function (dataId) {
    var tooltipFields = mergedState.interactionConfig.tooltip.config.fieldsToShow[dataId];

    if (!Array.isArray(tooltipFields) || !tooltipFields.length) {
      mergedState = addDefaultTooltips(mergedState, newDateEntries[dataId]);
    }
  });
  return updateAllLayerDomainData(mergedState, Object.keys(newDateEntries));
};
/* eslint-enable max-statements */


exports.updateVisDataUpdater = updateVisDataUpdater;

function generateLayerMetaForSplitViews(layer) {
  return {
    isAvailable: layer.config.isVisible,
    isVisible: layer.config.isVisible
  };
}
/**
 * This method will compute the default maps custom list
 * based on the current layers status
 * @param {Array<Object>} layers
 * @returns {Array<Object>} split map settings
 */


function computeSplitMapLayers(layers) {
  var mapLayers = layers.reduce(function (newLayers, currentLayer) {
    return (0, _objectSpread14["default"])({}, newLayers, (0, _defineProperty2["default"])({}, currentLayer.id, generateLayerMetaForSplitViews(currentLayer)));
  }, {});
  return [{
    layers: mapLayers
  }, {
    layers: mapLayers
  }];
}
/**
 * Remove an existing layer from split map settings
 * @param {Object} state `visState`
 * @param {Object} layer
 * @returns {Object} Maps of custom layer objects
 */


function removeLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;
    /* eslint-disable no-unused-vars */

    var _layer$id = layer.id,
        _ = layers[_layer$id],
        newLayers = (0, _objectWithoutProperties2["default"])(layers, [_layer$id].map(_toPropertyKey));
    /* eslint-enable no-unused-vars */

    return (0, _objectSpread14["default"])({}, settings, {
      layers: newLayers
    });
  });
}
/**
 * Add new layers to both existing maps
 * @param {Object} splitMaps
 * @param {Object|Array<Object>} layers
 * @returns {Array<Object>} new splitMaps
 */


function addNewLayersToSplitMap(splitMaps, layers) {
  var newLayers = Array.isArray(layers) ? layers : [layers];

  if (!splitMaps || !splitMaps.length || !newLayers.length) {
    return splitMaps;
  } // add new layer to both maps,
  //  don't override, if layer.id is already in splitMaps.settings.layers


  return splitMaps.map(function (settings) {
    return (0, _objectSpread14["default"])({}, settings, {
      layers: (0, _objectSpread14["default"])({}, settings.layers, newLayers.reduce(function (accu, newLayer) {
        return newLayer.config.isVisible ? (0, _objectSpread14["default"])({}, accu, (0, _defineProperty2["default"])({}, newLayer.id, settings.layers[newLayer.id] ? settings.layers[newLayer.id] : generateLayerMetaForSplitViews(newLayer))) : accu;
      }, {}))
    });
  });
}
/**
 * Hide an existing layers from custom map layer objects
 * @param {Object} state
 * @param {Object} layer
 * @returns {Object} Maps of custom layer objects
 */


function toggleLayerFromSplitMaps(state, layer) {
  return state.splitMaps.map(function (settings) {
    var layers = settings.layers;
    var newLayers = (0, _objectSpread14["default"])({}, layers, (0, _defineProperty2["default"])({}, layer.id, generateLayerMetaForSplitViews(layer)));
    return (0, _objectSpread14["default"])({}, settings, {
      layers: newLayers
    });
  });
}
/**
 * When a user clicks on the specific map closing icon
 * the application will close the selected map
 * and will merge the remaining one with the global state
 * TODO: i think in the future this action should be called merge map layers with global settings
 * @param {Object} state `visState`
 * @param {Object} action action
 * @returns {Object} nextState
 */


function closeSpecificMapAtIndex(state, action) {
  // retrieve layers meta data from the remaining map that we need to keep
  var indexToRetrieve = 1 - action.payload;
  var metaSettings = state.splitMaps[indexToRetrieve];

  if (!metaSettings || !metaSettings.layers) {
    // if we can't find the meta settings we simply clean up splitMaps and
    // keep global state as it is
    // but why does this ever happen?
    return (0, _objectSpread14["default"])({}, state, {
      splitMaps: []
    });
  }

  var layers = state.layers; // update layer visibility

  var newLayers = layers.map(function (layer) {
    return layer.updateLayerConfig({
      isVisible: metaSettings.layers[layer.id] ? metaSettings.layers[layer.id].isVisible : layer.config.isVisible
    });
  }); // delete map

  return (0, _objectSpread14["default"])({}, state, {
    layers: newLayers,
    splitMaps: []
  });
}
/**
 * Trigger file loading dispatch `addDataToMap` if succeed, or `loadFilesErr` if failed
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {Array<Object>} action.files array of fileblob
 * @returns {Object} nextState
 * @public
 */


var loadFilesUpdater = function loadFilesUpdater(state, action) {
  var files = action.files;
  var filesToLoad = files.map(function (fileBlob) {
    return (0, _fileUtils.processFileToLoad)(fileBlob);
  }); // reader -> parser -> augment -> receiveVisData

  var loadFileTasks = [_tasks["default"].all(filesToLoad.map(_tasks2.LOAD_FILE_TASK)).bimap(function (results) {
    var data = results.reduce(function (f, c) {
      return {
        // using concat here because the current datasets could be an array or a single item
        datasets: f.datasets.concat(c.datasets),
        // we need to deep merge this thing unless we find a better solution
        // this case will only happen if we allow to load multiple keplergl json files
        config: (0, _objectSpread14["default"])({}, f.config, c.config || {})
      };
    }, {
      datasets: [],
      config: {},
      options: {
        centerMap: true
      }
    });
    return (0, _actions.addDataToMap)(data);
  }, function (error) {
    return (0, _visStateActions.loadFilesErr)(error);
  })];
  return (0, _tasks.withTask)((0, _objectSpread14["default"])({}, state, {
    fileLoading: true
  }), loadFileTasks);
};
/**
 * Trigger loading file error
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Object} action action
 * @param {*} action.error
 * @returns {Object} nextState
 * @public
 */


exports.loadFilesUpdater = loadFilesUpdater;

var loadFilesErrUpdater = function loadFilesErrUpdater(state, _ref7) {
  var error = _ref7.error;
  return (0, _objectSpread14["default"])({}, state, {
    fileLoading: false,
    fileLoadingErr: error
  });
};
/**
 * Helper function to update All layer domain and layer data of state
 * @memberof visStateUpdaters
 * @param {Object} state `visState`
 * @param {Array<string>} datasets
 * @returns {Object} nextState
 */


exports.loadFilesErrUpdater = loadFilesErrUpdater;

function addDefaultLayers(state, datasets) {
  var defaultLayers = Object.values(datasets).reduce(function (accu, dataset) {
    return [].concat((0, _toConsumableArray2["default"])(accu), (0, _toConsumableArray2["default"])((0, _layerUtils.findDefaultLayer)(dataset, state.layerClasses) || []));
  }, []);
  return (0, _objectSpread14["default"])({}, state, {
    layers: [].concat((0, _toConsumableArray2["default"])(state.layers), (0, _toConsumableArray2["default"])(defaultLayers)),
    layerOrder: [].concat((0, _toConsumableArray2["default"])(defaultLayers.map(function (_, i) {
      return state.layers.length + i;
    })), (0, _toConsumableArray2["default"])(state.layerOrder))
  });
}
/**
 * helper function to find default tooltips
 * @param {Object} state
 * @param {Object} dataset
 * @returns {Object} nextState
 */


function addDefaultTooltips(state, dataset) {
  var tooltipFields = (0, _interactionUtils.findFieldsToShow)(dataset);
  return (0, _objectSpread14["default"])({}, state, {
    interactionConfig: (0, _objectSpread14["default"])({}, state.interactionConfig, {
      tooltip: (0, _objectSpread14["default"])({}, state.interactionConfig.tooltip, {
        config: {
          // find default fields to show in tooltip
          fieldsToShow: (0, _objectSpread14["default"])({}, state.interactionConfig.tooltip.config.fieldsToShow, tooltipFields)
        }
      })
    })
  });
}
/**
 * Helper function to update layer domains for an array of datsets
 * @param {Object} state
 * @param {Array|Array<string>} dataId dataset id or array of dataset ids
 * @param {Object} newFilter if is called by setFilter, the filter that has changed
 * @returns {Object} nextState
 */


function updateAllLayerDomainData(state, dataId, newFilter) {
  var dataIds = typeof dataId === 'string' ? [dataId] : dataId;
  var newLayers = [];
  var newLayerDatas = [];
  state.layers.forEach(function (oldLayer, i) {
    if (oldLayer.config.dataId && dataIds.includes(oldLayer.config.dataId)) {
      // No need to recalculate layer domain if filter has fixed domain
      var newLayer = newFilter && newFilter.fixedDomain ? oldLayer : oldLayer.updateLayerDomain(state.datasets[oldLayer.config.dataId], newFilter);

      var _calculateLayerData5 = (0, _layerUtils.calculateLayerData)(newLayer, state, state.layerData[i]),
          layerData = _calculateLayerData5.layerData,
          layer = _calculateLayerData5.layer;

      newLayers.push(layer);
      newLayerDatas.push(layerData);
    } else {
      newLayers.push(oldLayer);
      newLayerDatas.push(state.layerData[i]);
    }
  });
  return (0, _objectSpread14["default"])({}, state, {
    layers: newLayers,
    layerData: newLayerDatas
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy92aXMtc3RhdGUtdXBkYXRlcnMuanMiXSwibmFtZXMiOlsidmlzU3RhdGVVcGRhdGVycyIsIklOSVRJQUxfVklTX1NUQVRFIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibGF5ZXJUb0JlTWVyZ2VkIiwibGF5ZXJPcmRlciIsImZpbHRlcnMiLCJmaWx0ZXJUb0JlTWVyZ2VkIiwiZGF0YXNldHMiLCJlZGl0aW5nRGF0YXNldCIsInVuZGVmaW5lZCIsImludGVyYWN0aW9uQ29uZmlnIiwiaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkIiwibGF5ZXJCbGVuZGluZyIsImhvdmVySW5mbyIsImNsaWNrZWQiLCJmaWxlTG9hZGluZyIsImZpbGVMb2FkaW5nRXJyIiwic3BsaXRNYXBzIiwibGF5ZXJDbGFzc2VzIiwiTGF5ZXJDbGFzc2VzIiwidXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhIiwic3RhdGUiLCJsYXllciIsImlkeCIsIm1hcCIsImx5ciIsImkiLCJkIiwibGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyIiwiYWN0aW9uIiwib2xkTGF5ZXIiLCJmaW5kSW5kZXgiLCJsIiwiaWQiLCJwcm9wcyIsIk9iamVjdCIsImtleXMiLCJuZXdDb25maWciLCJuZXdMYXllciIsInVwZGF0ZUxheWVyQ29uZmlnIiwic2hvdWxkQ2FsY3VsYXRlTGF5ZXJEYXRhIiwib2xkTGF5ZXJEYXRhIiwic2FtZURhdGEiLCJuZXdTdGF0ZSIsInRvZ2dsZUxheWVyRnJvbVNwbGl0TWFwcyIsImFkZE9yUmVtb3ZlVGV4dExhYmVscyIsIm5ld0ZpZWxkcyIsInRleHRMYWJlbCIsIm5ld1RleHRMYWJlbCIsInNsaWNlIiwiY3VycmVudEZpZWxkcyIsInRsIiwiZmllbGQiLCJuYW1lIiwiZmlsdGVyIiwiYWRkRmllbGRzIiwiZiIsImluY2x1ZGVzIiwiZGVsZXRlRmllbGRzIiwiZmluZCIsImZkIiwibGVuZ3RoIiwiREVGQVVMVF9URVhUX0xBQkVMIiwiYWYiLCJ1cGRhdGVUZXh0TGFiZWxQcm9wQW5kVmFsdWUiLCJwcm9wIiwidmFsdWUiLCJzcGxpY2UiLCJsYXllclRleHRMYWJlbENoYW5nZVVwZGF0ZXIiLCJjb25maWciLCJsYXllclR5cGVDaGFuZ2VVcGRhdGVyIiwibmV3VHlwZSIsIm9sZElkIiwiQ29uc29sZSIsImVycm9yIiwiYXNzaWduQ29uZmlnVG9MYXllciIsInZpc0NvbmZpZ1NldHRpbmdzIiwiZGF0YUlkIiwiZGF0YXNldCIsInVwZGF0ZUxheWVyRG9tYWluIiwic2V0dGluZ3MiLCJvbGRMYXllck1hcCIsIm90aGVyTGF5ZXJzIiwibGF5ZXJWaXN1YWxDaGFubmVsQ2hhbmdlVXBkYXRlciIsImNoYW5uZWwiLCJ1cGRhdGVMYXllclZpc3VhbENoYW5uZWwiLCJsYXllclZpc0NvbmZpZ0NoYW5nZVVwZGF0ZXIiLCJuZXdWaXNDb25maWciLCJ2aXNDb25maWciLCJpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVVwZGF0ZXIiLCJlbmFibGVkIiwiZm9yRWFjaCIsImsiLCJzZXRGaWx0ZXJVcGRhdGVyIiwibmV3RmlsdGVyIiwiZmllbGRzIiwiYWxsRGF0YSIsImZpZWxkSWR4IiwiZmlsdGVyUHJvcCIsImZyZWV6ZSIsImVubGFyZ2VkRmlsdGVySWR4IiwiZW5sYXJnZWQiLCJ1cGRhdGVBbGxMYXllckRvbWFpbkRhdGEiLCJzZXRGaWx0ZXJQbG90VXBkYXRlciIsIm5ld1Byb3AiLCJwbG90VHlwZSIsImFkZEZpbHRlclVwZGF0ZXIiLCJ0b2dnbGVGaWx0ZXJBbmltYXRpb25VcGRhdGVyIiwiaXNBbmltYXRpbmciLCJ1cGRhdGVBbmltYXRpb25TcGVlZFVwZGF0ZXIiLCJzcGVlZCIsImVubGFyZ2VGaWx0ZXJVcGRhdGVyIiwiaXNFbmxhcmdlZCIsInJlbW92ZUZpbHRlclVwZGF0ZXIiLCJuZXdGaWx0ZXJzIiwiYWRkTGF5ZXJVcGRhdGVyIiwiZGVmYXVsdERhdGFzZXQiLCJMYXllciIsImlzVmlzaWJsZSIsImlzQ29uZmlnQWN0aXZlIiwiYWRkTmV3TGF5ZXJzVG9TcGxpdE1hcCIsInJlbW92ZUxheWVyVXBkYXRlciIsImxheWVyVG9SZW1vdmUiLCJuZXdNYXBzIiwicmVtb3ZlTGF5ZXJGcm9tU3BsaXRNYXBzIiwicGlkIiwiaXNMYXllckhvdmVyZWQiLCJyZW9yZGVyTGF5ZXJVcGRhdGVyIiwib3JkZXIiLCJyZW1vdmVEYXRhc2V0VXBkYXRlciIsImRhdGFzZXRLZXkiLCJrZXkiLCJuZXdEYXRhc2V0cyIsImluZGV4ZXMiLCJyZWR1Y2UiLCJsaXN0T2ZJbmRleGVzIiwiaW5kZXgiLCJwdXNoIiwiY3VycmVudFN0YXRlIiwiaW5kZXhDb3VudGVyIiwiY3VycmVudEluZGV4IiwidG9vbHRpcCIsImZpZWxkc1RvU2hvdyIsInVwZGF0ZUxheWVyQmxlbmRpbmdVcGRhdGVyIiwibW9kZSIsInNob3dEYXRhc2V0VGFibGVVcGRhdGVyIiwicmVzZXRNYXBDb25maWdWaXNTdGF0ZVVwZGF0ZXIiLCJpbml0aWFsU3RhdGUiLCJyZWNlaXZlTWFwQ29uZmlnVXBkYXRlciIsInBheWxvYWQiLCJ2aXNTdGF0ZSIsInJlc2V0U3RhdGUiLCJtZXJnZWRTdGF0ZSIsImxheWVySG92ZXJVcGRhdGVyIiwiaW5mbyIsImxheWVyQ2xpY2tVcGRhdGVyIiwicGlja2VkIiwibWFwQ2xpY2tVcGRhdGVyIiwidG9nZ2xlU3BsaXRNYXBVcGRhdGVyIiwiY29tcHV0ZVNwbGl0TWFwTGF5ZXJzIiwiY2xvc2VTcGVjaWZpY01hcEF0SW5kZXgiLCJzZXRWaXNpYmxlTGF5ZXJzRm9yTWFwVXBkYXRlciIsIm1hcEluZGV4IiwibGF5ZXJJZHMiLCJuZXdMYXllcnMiLCJjdXJyZW50TGF5ZXJzIiwidG9nZ2xlTGF5ZXJGb3JNYXBVcGRhdGVyIiwibWFwU2V0dGluZ3MiLCJsYXllcklkIiwibmV3U3BsaXRNYXBzIiwidXBkYXRlVmlzRGF0YVVwZGF0ZXIiLCJBcnJheSIsImlzQXJyYXkiLCJuZXdEYXRlRW50cmllcyIsImFjY3UiLCJkYXRhIiwic3RhdGVXaXRoTmV3RGF0YSIsImFkZERlZmF1bHRMYXllcnMiLCJ0b29sdGlwRmllbGRzIiwiYWRkRGVmYXVsdFRvb2x0aXBzIiwiZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzIiwiaXNBdmFpbGFibGUiLCJtYXBMYXllcnMiLCJjdXJyZW50TGF5ZXIiLCJfIiwiaW5kZXhUb1JldHJpZXZlIiwibWV0YVNldHRpbmdzIiwibG9hZEZpbGVzVXBkYXRlciIsImZpbGVzIiwiZmlsZXNUb0xvYWQiLCJmaWxlQmxvYiIsImxvYWRGaWxlVGFza3MiLCJUYXNrIiwiYWxsIiwiTE9BRF9GSUxFX1RBU0siLCJiaW1hcCIsInJlc3VsdHMiLCJjIiwiY29uY2F0Iiwib3B0aW9ucyIsImNlbnRlck1hcCIsImxvYWRGaWxlc0VyclVwZGF0ZXIiLCJkZWZhdWx0TGF5ZXJzIiwidmFsdWVzIiwiZGF0YUlkcyIsIm5ld0xheWVyRGF0YXMiLCJmaXhlZERvbWFpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFHQTs7QUFHQTs7QUFDQTs7QUFHQTs7QUFJQTs7QUFPQTs7QUFFQTs7QUFLQTs7QUFPQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQ0E7O0FBQ0EsSUFBTUEsZ0JBQWdCLEdBQUcsSUFBekI7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJPLElBQU1DLGlCQUFpQixHQUFHO0FBQy9CO0FBQ0FDLEVBQUFBLE1BQU0sRUFBRSxFQUZ1QjtBQUcvQkMsRUFBQUEsU0FBUyxFQUFFLEVBSG9CO0FBSS9CQyxFQUFBQSxlQUFlLEVBQUUsRUFKYztBQUsvQkMsRUFBQUEsVUFBVSxFQUFFLEVBTG1CO0FBTy9CO0FBQ0FDLEVBQUFBLE9BQU8sRUFBRSxFQVJzQjtBQVMvQkMsRUFBQUEsZ0JBQWdCLEVBQUUsRUFUYTtBQVcvQjtBQUNBQyxFQUFBQSxRQUFRLEVBQUUsRUFacUI7QUFhL0JDLEVBQUFBLGNBQWMs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QUFlM0csUUFBZjtBQUNBK0ssTUFBQUEsYUFBYSxDQUFDcEUsSUFBZCxDQUFtQnBILEtBQUssQ0FBQ25CLFNBQU4sQ0FBZ0J3QixDQUFoQixDQUFuQjtBQUNEO0FBQ0YsR0F2QkQ7QUF5QkEsNkNBQ0tMLEtBREw7QUFFRXBCLElBQUFBLE1BQU0sRUFBRW1LLFNBRlY7QUFHRWxLLElBQUFBLFNBQVMsRUFBRTJNO0FBSGI7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCBUYXNrLCB7ZGlzYWJsZVN0YWNrQ2FwdHVyaW5nLCB3aXRoVGFza30gZnJvbSAncmVhY3QtcGFsbS90YXNrcyc7XG5cbi8vIFRhc2tzXG5pbXBvcnQge0xPQURfRklMRV9UQVNLfSBmcm9tICd0YXNrcy90YXNrcyc7XG5cbi8vIEFjdGlvbnNcbmltcG9ydCB7bG9hZEZpbGVzRXJyfSBmcm9tICdhY3Rpb25zL3Zpcy1zdGF0ZS1hY3Rpb25zJztcbmltcG9ydCB7YWRkRGF0YVRvTWFwfSBmcm9tICdhY3Rpb25zJztcblxuLy8gVXRpbHNcbmltcG9ydCB7XG4gIGdldERlZmF1bHRJbnRlcmFjdGlvbixcbiAgZmluZEZpZWxkc1RvU2hvd1xufSBmcm9tICd1dGlscy9pbnRlcmFjdGlvbi11dGlscyc7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0RmlsdGVyLFxuICBnZXRGaWx0ZXJQcm9wcyxcbiAgZ2V0RmlsdGVyUGxvdCxcbiAgZ2V0RGVmYXVsdEZpbHRlclBsb3RUeXBlLFxuICBmaWx0ZXJEYXRhXG59IGZyb20gJ3V0aWxzL2ZpbHRlci11dGlscyc7XG5pbXBvcnQge2NyZWF0ZU5ld0RhdGFFbnRyeX0gZnJvbSAndXRpbHMvZGF0YXNldC11dGlscyc7XG5cbmltcG9ydCB7XG4gIGZpbmREZWZhdWx0TGF5ZXIsXG4gIGNhbGN1bGF0ZUxheWVyRGF0YVxufSBmcm9tICd1dGlscy9sYXllci11dGlscy9sYXllci11dGlscyc7XG5cbmltcG9ydCB7XG4gIG1lcmdlRmlsdGVycyxcbiAgbWVyZ2VMYXllcnMsXG4gIG1lcmdlSW50ZXJhY3Rpb25zLFxuICBtZXJnZUxheWVyQmxlbmRpbmdcbn0gZnJvbSAnLi92aXMtc3RhdGUtbWVyZ2VyJztcblxuaW1wb3J0IHtMYXllciwgTGF5ZXJDbGFzc2VzfSBmcm9tICdsYXllcnMnO1xuaW1wb3J0IHtwcm9jZXNzRmlsZVRvTG9hZH0gZnJvbSAnL3V0aWxzL2ZpbGUtdXRpbHMnO1xuaW1wb3J0IHtERUZBVUxUX1RFWFRfTEFCRUx9IGZyb20gJ2xheWVycy9sYXllci1mYWN0b3J5JztcblxuLy8gcmVhY3QtcGFsbVxuLy8gZGlzYWJsZSBjYXB0dXJlIGV4Y2VwdGlvbiBmb3IgcmVhY3QtcGFsbSBjYWxsIHRvIHdpdGhUYXNrXG5kaXNhYmxlU3RhY2tDYXB0dXJpbmcoKTtcblxuLyoqXG4gKiBVcGRhdGVycyBmb3IgYHZpc1N0YXRlYCByZWR1Y2VyLiBDYW4gYmUgdXNlZCBpbiB5b3VyIHJvb3QgcmVkdWNlciB0byBkaXJlY3RseSBtb2RpZnkga2VwbGVyLmdsJ3Mgc3RhdGUuXG4gKiBSZWFkIG1vcmUgYWJvdXQgW1VzaW5nIHVwZGF0ZXJzXSguLi9hZHZhbmNlZC11c2FnZS91c2luZy11cGRhdGVycy5tZClcbiAqXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCBrZXBsZXJHbFJlZHVjZXIsIHt2aXNTdGF0ZVVwZGF0ZXJzfSBmcm9tICdrZXBsZXIuZ2wvcmVkdWNlcnMnO1xuICogLy8gUm9vdCBSZWR1Y2VyXG4gKiBjb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gKiAga2VwbGVyR2w6IGtlcGxlckdsUmVkdWNlcixcbiAqICBhcHA6IGFwcFJlZHVjZXJcbiAqIH0pO1xuICpcbiAqIGNvbnN0IGNvbXBvc2VkUmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gKiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICogICAgY2FzZSAnQ0xJQ0tfQlVUVE9OJzpcbiAqICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAuLi5zdGF0ZSxcbiAqICAgICAgICBrZXBsZXJHbDoge1xuICogICAgICAgICAgLi4uc3RhdGUua2VwbGVyR2wsXG4gKiAgICAgICAgICBmb286IHtcbiAqICAgICAgICAgICAgIC4uLnN0YXRlLmtlcGxlckdsLmZvbyxcbiAqICAgICAgICAgICAgIHZpc1N0YXRlOiB2aXNTdGF0ZVVwZGF0ZXJzLmVubGFyZ2VGaWx0ZXJVcGRhdGVyKFxuICogICAgICAgICAgICAgICBzdGF0ZS5rZXBsZXJHbC5mb28udmlzU3RhdGUsXG4gKiAgICAgICAgICAgICAgIHtpZHg6IDB9XG4gKiAgICAgICAgICAgICApXG4gKiAgICAgICAgICB9XG4gKiAgICAgICAgfVxuICogICAgICB9O1xuICogIH1cbiAqICByZXR1cm4gcmVkdWNlcnMoc3RhdGUsIGFjdGlvbik7XG4gKiB9O1xuICpcbiAqIGV4cG9ydCBkZWZhdWx0IGNvbXBvc2VkUmVkdWNlcjtcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbmNvbnN0IHZpc1N0YXRlVXBkYXRlcnMgPSBudWxsO1xuLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4vKipcbiAqIERlZmF1bHQgaW5pdGlhbCBgdmlzU3RhdGVgXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByb3BlcnR5IHtBcnJheX0gbGF5ZXJzXG4gKiBAcHJvcGVydHkge0FycmF5fSBsYXllckRhdGFcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IGxheWVyVG9CZU1lcmdlZFxuICogQHByb3BlcnR5IHtBcnJheX0gbGF5ZXJPcmRlclxuICogQHByb3BlcnR5IHtBcnJheX0gZmlsdGVyc1xuICogQHByb3BlcnR5IHtBcnJheX0gZmlsdGVyVG9CZU1lcmdlZFxuICogQHByb3BlcnR5IHtBcnJheX0gZGF0YXNldHNcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBlZGl0aW5nRGF0YXNldFxuICogQHByb3BlcnR5IHtPYmplY3R9IGludGVyYWN0aW9uQ29uZmlnXG4gKiBAcHJvcGVydHkge09iamVjdH0gaW50ZXJhY3Rpb25Ub0JlTWVyZ2VkXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbGF5ZXJCbGVuZGluZ1xuICogQHByb3BlcnR5IHtPYmplY3R9IGhvdmVySW5mb1xuICogQHByb3BlcnR5IHtPYmplY3R9IGNsaWNrZWRcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZmlsZUxvYWRpbmdcbiAqIEBwcm9wZXJ0eSB7Kn0gZmlsZUxvYWRpbmdFcnJcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IHNwbGl0TWFwcyAtIGEgbGlzdCBvZiBvYmplY3RzIG9mIGxheWVyIGF2YWlsYWJpbGl0aWVzIGFuZCB2aXNpYmlsaXRpZXMgZm9yIGVhY2ggbWFwXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBJTklUSUFMX1ZJU19TVEFURSA9IHtcbiAgLy8gbGF5ZXJzXG4gIGxheWVyczogW10sXG4gIGxheWVyRGF0YTogW10sXG4gIGxheWVyVG9CZU1lcmdlZDogW10sXG4gIGxheWVyT3JkZXI6IFtdLFxuXG4gIC8vIGZpbHRlcnNcbiAgZmlsdGVyczogW10sXG4gIGZpbHRlclRvQmVNZXJnZWQ6IFtdLFxuXG4gIC8vIGEgY29sbGVjdGlvbiBvZiBtdWx0aXBsZSBkYXRhc2V0XG4gIGRhdGFzZXRzOiB7fSxcbiAgZWRpdGluZ0RhdGFzZXQ6IHVuZGVmaW5lZCxcblxuICBpbnRlcmFjdGlvbkNvbmZpZzogZ2V0RGVmYXVsdEludGVyYWN0aW9uKCksXG4gIGludGVyYWN0aW9uVG9CZU1lcmdlZDogdW5kZWZpbmVkLFxuXG4gIGxheWVyQmxlbmRpbmc6ICdub3JtYWwnLFxuICBob3ZlckluZm86IHVuZGVmaW5lZCxcbiAgY2xpY2tlZDogdW5kZWZpbmVkLFxuXG4gIC8vIFRPRE86IG5vdCB1c2VkIGFueXdoZXJlLCBkZWxldGUgaXRcbiAgZmlsZUxvYWRpbmc6IGZhbHNlLFxuICBmaWxlTG9hZGluZ0VycjogbnVsbCxcblxuICAvLyB0aGlzIGlzIHVzZWQgd2hlbiB1c2VyIHNwbGl0IG1hcHNcbiAgc3BsaXRNYXBzOiBbXG4gICAgLy8gdGhpcyB3aWxsIGNvbnRhaW4gYSBsaXN0IG9mIG9iamVjdHMgdG9cbiAgICAvLyBkZXNjcmliZSB0aGUgc3RhdGUgb2YgbGF5ZXIgYXZhaWxhYmlsaXR5IGFuZCB2aXNpYmlsaXR5IGZvciBlYWNoIG1hcFxuICAgIC8vIFtcbiAgICAvLyAgIHtcbiAgICAvLyAgICAgbGF5ZXJzOiB7XG4gICAgLy8gICAgICAgbGF5ZXJfaWQ6IHtcbiAgICAvLyAgICAgICAgIGlzQXZhaWxhYmxlOiB0cnVlfGZhbHNlICMgdGhpcyBpcyBkcml2ZW4gYnkgdGhlIGxlZnQgaGFuZCBwYW5lbFxuICAgIC8vICAgICAgICAgaXNWaXNpYmxlOiB0cnVlfGZhbHNlXG4gICAgLy8gICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gXVxuICBdLFxuXG4gIC8vIGRlZmF1bHRzIGxheWVyIGNsYXNzZXNcbiAgbGF5ZXJDbGFzc2VzOiBMYXllckNsYXNzZXNcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShzdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IHN0YXRlLmxheWVycy5tYXAoKGx5ciwgaSkgPT4gKGkgPT09IGlkeCA/IGxheWVyIDogbHlyKSksXG4gICAgbGF5ZXJEYXRhOiBsYXllckRhdGFcbiAgICAgID8gc3RhdGUubGF5ZXJEYXRhLm1hcCgoZCwgaSkgPT4gKGkgPT09IGlkeCA/IGxheWVyRGF0YSA6IGQpKVxuICAgICAgOiBzdGF0ZS5sYXllckRhdGFcbiAgfTtcbn1cblxuIC8qKlxuICAqIFVwZGF0ZSBsYXllciBiYXNlIGNvbmZpZzogZGF0YUlkLCBsYWJlbCwgY29sdW1uLCBpc1Zpc2libGVcbiAgKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdmlzU3RhdGVgXG4gICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLm9sZExheWVyIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLm5ld0NvbmZpZyBuZXcgY29uZmlnXG4gICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJDb25maWdDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyfSA9IGFjdGlvbjtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZExheWVyLmlkKTtcbiAgY29uc3QgcHJvcHMgPSBPYmplY3Qua2V5cyhhY3Rpb24ubmV3Q29uZmlnKTtcbiAgY29uc3QgbmV3TGF5ZXIgPSBvbGRMYXllci51cGRhdGVMYXllckNvbmZpZyhhY3Rpb24ubmV3Q29uZmlnKTtcbiAgaWYgKG5ld0xheWVyLnNob3VsZENhbGN1bGF0ZUxheWVyRGF0YShwcm9wcykpIHtcbiAgICBjb25zdCBvbGRMYXllckRhdGEgPSBzdGF0ZS5sYXllckRhdGFbaWR4XTtcbiAgICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEoXG4gICAgICBuZXdMYXllcixcbiAgICAgIHN0YXRlLFxuICAgICAgb2xkTGF5ZXJEYXRhLFxuICAgICAge3NhbWVEYXRhOiB0cnVlfVxuICAgICk7XG4gICAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShzdGF0ZSwge2xheWVyRGF0YSwgbGF5ZXIsIGlkeH0pO1xuICB9XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgc3BsaXRNYXBzOlxuICAgICAgJ2lzVmlzaWJsZScgaW4gYWN0aW9uLm5ld0NvbmZpZ1xuICAgICAgICA/IHRvZ2dsZUxheWVyRnJvbVNwbGl0TWFwcyhzdGF0ZSwgbmV3TGF5ZXIpXG4gICAgICAgIDogc3RhdGUuc3BsaXRNYXBzXG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZVN0YXRlV2l0aExheWVyQW5kRGF0YShuZXdTdGF0ZSwge2xheWVyOiBuZXdMYXllciwgaWR4fSk7XG59XG5cbmZ1bmN0aW9uIGFkZE9yUmVtb3ZlVGV4dExhYmVscyhuZXdGaWVsZHMsIHRleHRMYWJlbCkge1xuICBsZXQgbmV3VGV4dExhYmVsID0gdGV4dExhYmVsLnNsaWNlKCk7XG5cbiAgY29uc3QgY3VycmVudEZpZWxkcyA9IHRleHRMYWJlbC5tYXAodGwgPT4gdGwuZmllbGQgJiYgdGwuZmllbGQubmFtZSkuZmlsdGVyKGQgPT4gZCk7XG5cbiAgY29uc3QgYWRkRmllbGRzID0gbmV3RmllbGRzLmZpbHRlcihmID0+ICFjdXJyZW50RmllbGRzLmluY2x1ZGVzKGYubmFtZSkpO1xuICBjb25zdCBkZWxldGVGaWVsZHMgPSBjdXJyZW50RmllbGRzXG4gICAgLmZpbHRlcihmID0+ICFuZXdGaWVsZHMuZmluZChmZCA9PiBmZC5uYW1lID09PSBmKSk7XG5cbiAgLy8gZGVsZXRlXG4gIG5ld1RleHRMYWJlbCA9IG5ld1RleHRMYWJlbC5maWx0ZXIodGwgPT4gdGwuZmllbGQgJiYgIWRlbGV0ZUZpZWxkcy5pbmNsdWRlcyh0bC5maWVsZC5uYW1lKSk7XG4gIG5ld1RleHRMYWJlbCA9ICFuZXdUZXh0TGFiZWwubGVuZ3RoID8gW0RFRkFVTFRfVEVYVF9MQUJFTF0gOiBuZXdUZXh0TGFiZWw7XG5cbiAgLy8gYWRkXG4gIG5ld1RleHRMYWJlbCA9IFtcbiAgICAuLi4obmV3VGV4dExhYmVsLmZpbHRlcih0bCA9PiB0bC5maWVsZCkpLFxuICAgIC4uLmFkZEZpZWxkcy5tYXAoYWYgPT4gKHtcbiAgICAgIC4uLkRFRkFVTFRfVEVYVF9MQUJFTCxcbiAgICAgIGZpZWxkOiBhZlxuICAgIH0pKVxuICBdO1xuXG4gIHJldHVybiBuZXdUZXh0TGFiZWw7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRleHRMYWJlbFByb3BBbmRWYWx1ZShpZHgsIHByb3AsIHZhbHVlLCB0ZXh0TGFiZWwpIHtcbiAgbGV0IG5ld1RleHRMYWJlbCA9IHRleHRMYWJlbC5zbGljZSgpO1xuXG4gIGlmIChwcm9wICYmICh2YWx1ZSB8fCB0ZXh0TGFiZWwubGVuZ3RoID09PSAxKSkge1xuICAgIG5ld1RleHRMYWJlbCA9IHRleHRMYWJlbC5tYXAoKHRsLCBpKSA9PlxuICAgICAgaSA9PT0gaWR4ID8gey4uLnRsLCBbcHJvcF06IHZhbHVlfSA6IHRsKTtcbiAgfSBlbHNlIGlmIChwcm9wID09PSAnZmllbGQnICYmIHZhbHVlID09PSBudWxsICYmIHRleHRMYWJlbC5sZW5ndGggPiAxKSB7XG5cbiAgICAvLyByZW1vdmUgbGFiZWwgd2hlbiBmaWVsZCB2YWx1ZSBpcyBzZXQgdG8gbnVsbFxuICAgIG5ld1RleHRMYWJlbC5zcGxpY2UoaWR4LCAxKTtcbiAgfVxuXG4gIHJldHVybiBuZXdUZXh0TGFiZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXllclRleHRMYWJlbENoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXIsIGlkeCwgcHJvcCwgdmFsdWV9ID0gYWN0aW9uO1xuICBjb25zdCB7dGV4dExhYmVsfSA9IG9sZExheWVyLmNvbmZpZztcblxuICBsZXQgbmV3VGV4dExhYmVsID0gdGV4dExhYmVsLnNsaWNlKCk7XG5cbiAgaWYgKGlkeCA9PT0gJ2FsbCcgJiYgcHJvcCA9PT0gJ2ZpZWxkcycpIHtcbiAgICBuZXdUZXh0TGFiZWwgPSBhZGRPclJlbW92ZVRleHRMYWJlbHModmFsdWUsIHRleHRMYWJlbCk7XG4gIH1cblxuICAvLyBpZiBpZHggaXMgc2V0IHRvIGxlbmd0aCwgYWRkIGVtcHR5IHRleHQgbGFiZWxcbiAgaWYgKCF0ZXh0TGFiZWxbaWR4XSAmJiBpZHggPT09IHRleHRMYWJlbC5sZW5ndGgpIHtcbiAgICBuZXdUZXh0TGFiZWwgPSBbXG4gICAgICAuLi50ZXh0TGFiZWwsXG4gICAgICBERUZBVUxUX1RFWFRfTEFCRUxcbiAgICBdO1xuICB9XG5cbiAgLy8gdXBkYXRlIHRleHQgbGFiZWwgcHJvcCBhbmQgdmFsdWVcbiAgbmV3VGV4dExhYmVsID0gdXBkYXRlVGV4dExhYmVsUHJvcEFuZFZhbHVlKGlkeCwgcHJvcCwgdmFsdWUsIG5ld1RleHRMYWJlbCk7XG5cbiAgcmV0dXJuIGxheWVyQ29uZmlnQ2hhbmdlVXBkYXRlcihzdGF0ZSwge29sZExheWVyLCBuZXdDb25maWc6IHt0ZXh0TGFiZWw6IG5ld1RleHRMYWJlbH19KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgdHlwZS4gUHJldmlld3MgbGF5ZXIgY29uZmlnIHdpbGwgYmUgY29waWVkIGlmIGFwcGxpY2FibGUuXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLm9sZExheWVyIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24ubmV3VHlwZSBuZXcgdHlwZVxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllclR5cGVDaGFuZ2VVcGRhdGVyKHN0YXRlLCBhY3Rpb24pIHtcbiAgY29uc3Qge29sZExheWVyLCBuZXdUeXBlfSA9IGFjdGlvbjtcbiAgY29uc3Qgb2xkSWQgPSBvbGRMYXllci5pZDtcbiAgY29uc3QgaWR4ID0gc3RhdGUubGF5ZXJzLmZpbmRJbmRleChsID0+IGwuaWQgPT09IG9sZElkKTtcblxuICBpZiAoIXN0YXRlLmxheWVyQ2xhc3Nlc1tuZXdUeXBlXSkge1xuICAgIENvbnNvbGUuZXJyb3IoYCR7bmV3VHlwZX0gaXMgbm90IGEgdmFsaWQgbGF5ZXIgdHlwZWApO1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8vIGdldCBhIG1pbnQgbGF5ZXIsIHdpdGggbmV3IGlkIGFuZCB0eXBlXG4gIC8vIGJlY2F1c2UgZGVjay5nbCB1c2VzIGlkIHRvIG1hdGNoIGJldHdlZW4gbmV3IGFuZCBvbGQgbGF5ZXIuXG4gIC8vIElmIHR5cGUgaGFzIGNoYW5nZWQgYnV0IGlkIGlzIHRoZSBzYW1lLCBpdCB3aWxsIGJyZWFrXG4gIGNvbnN0IG5ld0xheWVyID0gbmV3IHN0YXRlLmxheWVyQ2xhc3Nlc1tuZXdUeXBlXSgpO1xuXG4gIG5ld0xheWVyLmFzc2lnbkNvbmZpZ1RvTGF5ZXIob2xkTGF5ZXIuY29uZmlnLCBvbGRMYXllci52aXNDb25maWdTZXR0aW5ncyk7XG5cbiAgaWYgKG5ld0xheWVyLmNvbmZpZy5kYXRhSWQpIHtcbiAgICBjb25zdCBkYXRhc2V0ID0gc3RhdGUuZGF0YXNldHNbbmV3TGF5ZXIuY29uZmlnLmRhdGFJZF07XG4gICAgbmV3TGF5ZXIudXBkYXRlTGF5ZXJEb21haW4oZGF0YXNldCk7XG4gIH1cblxuICBjb25zdCB7bGF5ZXJEYXRhLCBsYXllcn0gPSBjYWxjdWxhdGVMYXllckRhdGEobmV3TGF5ZXIsIHN0YXRlKTtcblxuICBsZXQgbmV3U3RhdGUgPSBzdGF0ZTtcblxuICAvLyB1cGRhdGUgc3BsaXRNYXAgbGF5ZXIgaWRcbiAgaWYgKHN0YXRlLnNwbGl0TWFwcykge1xuICAgIG5ld1N0YXRlID0ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzcGxpdE1hcHM6IHN0YXRlLnNwbGl0TWFwcy5tYXAoc2V0dGluZ3MgPT4ge1xuICAgICAgICBjb25zdCB7W29sZElkXTogb2xkTGF5ZXJNYXAsIC4uLm90aGVyTGF5ZXJzfSA9IHNldHRpbmdzLmxheWVycztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zZXR0aW5ncyxcbiAgICAgICAgICBsYXllcnM6IHtcbiAgICAgICAgICAgIC4uLm90aGVyTGF5ZXJzLFxuICAgICAgICAgICAgW2xheWVyLmlkXTogb2xkTGF5ZXJNYXBcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gdXBkYXRlU3RhdGVXaXRoTGF5ZXJBbmREYXRhKG5ld1N0YXRlLCB7bGF5ZXJEYXRhLCBsYXllciwgaWR4fSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGxheWVyIHZpc3VhbCBjaGFubmVsXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLm9sZExheWVyIGxheWVyIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ubmV3Q29uZmlnIG5ldyB2aXN1YWwgY2hhbm5lbCBjb25maWdcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uY2hhbm5lbCBjaGFubmVsIHRvIGJlIHVwZGF0ZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gbGF5ZXJWaXN1YWxDaGFubmVsQ2hhbmdlVXBkYXRlcihzdGF0ZSwgYWN0aW9uKSB7XG4gIGNvbnN0IHtvbGRMYXllciwgbmV3Q29uZmlnLCBjaGFubmVsfSA9IGFjdGlvbjtcbiAgY29uc3QgZGF0YXNldCA9IHN0YXRlLmRhdGFzZXRzW29sZExheWVyLmNvbmZpZy5kYXRhSWRdO1xuXG4gIGNvbnN0IGlkeCA9IHN0YXRlLmxheWVycy5maW5kSW5kZXgobCA9PiBsLmlkID09PSBvbGRMYXllci5pZCk7XG4gIGNvbnN0IG5ld0xheWVyID0gb2xkTGF5ZXIudXBkYXRlTGF5ZXJDb25maWcobmV3Q29uZmlnKTtcblxuICBuZXdMYXllci51cGRhdGVMYXllclZpc3VhbENoYW5uZWwoZGF0YXNldCwgY2hhbm5lbCk7XG5cbiAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShuZXdMYXllciwgc3RhdGUsIG9sZExheWVyRGF0YSwge1xuICAgIHNhbWVEYXRhOiB0cnVlXG4gIH0pO1xuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbGF5ZXIgYHZpc0NvbmZpZ2BcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ub2xkTGF5ZXIgbGF5ZXIgdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5uZXdWaXNDb25maWcgbmV3IHZpc0NvbmZpZyBhcyBhIGtleSB2YWx1ZSBtYXA6IGUuZy4gYHtvcGFjaXR5OiAwLjh9YFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXllclZpc0NvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7b2xkTGF5ZXJ9ID0gYWN0aW9uO1xuICBjb25zdCBpZHggPSBzdGF0ZS5sYXllcnMuZmluZEluZGV4KGwgPT4gbC5pZCA9PT0gb2xkTGF5ZXIuaWQpO1xuICBjb25zdCBwcm9wcyA9IE9iamVjdC5rZXlzKGFjdGlvbi5uZXdWaXNDb25maWcpO1xuXG4gIGNvbnN0IG5ld1Zpc0NvbmZpZyA9IHtcbiAgICAuLi5vbGRMYXllci5jb25maWcudmlzQ29uZmlnLFxuICAgIC4uLmFjdGlvbi5uZXdWaXNDb25maWdcbiAgfTtcblxuICBjb25zdCBuZXdMYXllciA9IG9sZExheWVyLnVwZGF0ZUxheWVyQ29uZmlnKHt2aXNDb25maWc6IG5ld1Zpc0NvbmZpZ30pO1xuXG4gIGlmIChuZXdMYXllci5zaG91bGRDYWxjdWxhdGVMYXllckRhdGEocHJvcHMpKSB7XG4gICAgY29uc3Qgb2xkTGF5ZXJEYXRhID0gc3RhdGUubGF5ZXJEYXRhW2lkeF07XG4gICAgY29uc3Qge2xheWVyRGF0YSwgbGF5ZXJ9ID0gY2FsY3VsYXRlTGF5ZXJEYXRhKFxuICAgICAgbmV3TGF5ZXIsXG4gICAgICBzdGF0ZSxcbiAgICAgIG9sZExheWVyRGF0YSxcbiAgICAgIHtzYW1lRGF0YTogdHJ1ZX1cbiAgICApO1xuICAgIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllckRhdGEsIGxheWVyLCBpZHh9KTtcbiAgfVxuXG4gIHJldHVybiB1cGRhdGVTdGF0ZVdpdGhMYXllckFuZERhdGEoc3RhdGUsIHtsYXllcjogbmV3TGF5ZXIsIGlkeH0pO1xufVxuXG4vKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzICovXG5cbi8qKlxuICogVXBkYXRlIGBpbnRlcmFjdGlvbkNvbmZpZ2BcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uY29uZmlnIG5ldyBjb25maWcgYXMga2V5IHZhbHVlIG1hcDogYHt0b29sdGlwOiB7ZW5hYmxlZDogdHJ1ZX19YFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcmFjdGlvbkNvbmZpZ0NoYW5nZVVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7Y29uZmlnfSA9IGFjdGlvbjtcblxuICBjb25zdCBpbnRlcmFjdGlvbkNvbmZpZyA9IHtcbiAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAuLi57W2NvbmZpZy5pZF06IGNvbmZpZ31cbiAgfTtcblxuICBpZiAoY29uZmlnLmVuYWJsZWQgJiYgIXN0YXRlLmludGVyYWN0aW9uQ29uZmlnW2NvbmZpZy5pZF0uZW5hYmxlZCkge1xuICAgIC8vIG9ubHkgZW5hYmxlIG9uZSBpbnRlcmFjdGlvbiBhdCBhIHRpbWVcbiAgICBPYmplY3Qua2V5cyhpbnRlcmFjdGlvbkNvbmZpZykuZm9yRWFjaChrID0+IHtcbiAgICAgIGlmIChrICE9PSBjb25maWcuaWQpIHtcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWdba10gPSB7Li4uaW50ZXJhY3Rpb25Db25maWdba10sIGVuYWJsZWQ6IGZhbHNlfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWdcbiAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgZmlsdGVyIHByb3BlcnR5XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYWN0aW9uLmlkeCBgaWR4YCBvZiBmaWx0ZXIgdG8gYmUgdXBkYXRlZFxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5wcm9wIGBwcm9wYCBvZiBmaWx0ZXIsIGUsZywgYGRhdGFJZGAsIGBuYW1lYCwgYHZhbHVlYFxuICogQHBhcmFtIHsqfSBhY3Rpb24udmFsdWUgbmV3IHZhbHVlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldEZpbHRlclVwZGF0ZXIoc3RhdGUsIGFjdGlvbikge1xuICBjb25zdCB7aWR4LCBwcm9wLCB2YWx1ZX0gPSBhY3Rpb247XG4gIGxldCBuZXdTdGF0ZSA9IHN0YXRlO1xuICBsZXQgbmV3RmlsdGVyID0ge1xuICAgIC4uLnN0YXRlLmZpbHRlcnNbaWR4XSxcbiAgICBbcHJvcF06IHZhbHVlXG4gIH07XG5cbiAgY29uc3Qge2RhdGFJZH0gPSBuZXdGaWx0ZXI7XG4gIGlmICghZGF0YUlkKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG4gIGNvbnN0IHtmaWVsZHMsIGFsbERhdGF9ID0gc3RhdGUuZGF0YXNldHNbZGF0YUlkXTtcblxuICBzd2l0Y2ggKHByb3ApIHtcbiAgICBjYXNlICdkYXRhSWQnOlxuICAgICAgLy8gaWYgdHJ5aW5nIHRvIHVwZGF0ZSBmaWx0ZXIgZGF0YUlkLiBjcmVhdGUgYW4gZW1wdHkgbmV3IGZpbHRlclxuICAgICAgbmV3RmlsdGVyID0gZ2V0RGVmYXVsdEZpbHRlcihkYXRhSWQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICduYW1lJzpcbiAgICAgIC8vIGZpbmQgdGhlIGZpZWxkXG4gICAgICBjb25zdCBmaWVsZElkeCA9IGZpZWxkcy5maW5kSW5kZXgoZiA9PiBmLm5hbWUgPT09IHZhbHVlKTtcbiAgICAgIGxldCBmaWVsZCA9IGZpZWxkc1tmaWVsZElkeF07XG5cbiAgICAgIGlmICghZmllbGQuZmlsdGVyUHJvcCkge1xuICAgICAgICAvLyBnZXQgZmlsdGVyIGRvbWFpbiBmcm9tIGZpZWxkXG4gICAgICAgIC8vIHNhdmUgZmlsdGVyUHJvcHM6IHtkb21haW4sIHN0ZXBzLCB2YWx1ZX0gdG8gZmllbGQsIGF2b2lkIHJlY2FsY3VsYXRlXG4gICAgICAgIGZpZWxkID0ge1xuICAgICAgICAgIC4uLmZpZWxkLFxuICAgICAgICAgIGZpbHRlclByb3A6IGdldEZpbHRlclByb3BzKGFsbERhdGEsIGZpZWxkKVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBuZXdGaWx0ZXIgPSB7XG4gICAgICAgIC4uLm5ld0ZpbHRlcixcbiAgICAgICAgLi4uZmllbGQuZmlsdGVyUHJvcCxcbiAgICAgICAgbmFtZTogZmllbGQubmFtZSxcbiAgICAgICAgLy8gY2FuJ3QgZWRpdCBkYXRhSWQgb25jZSBuYW1lIGlzIHNlbGVjdGVkXG4gICAgICAgIGZyZWV6ZTogdHJ1ZSxcbiAgICAgICAgZmllbGRJZHhcbiAgICAgIH07XG4gICAgICBjb25zdCBlbmxhcmdlZEZpbHRlcklkeCA9IHN0YXRlLmZpbHRlcnMuZmluZEluZGV4KGYgPT4gZi5lbmxhcmdlZCk7XG4gICAgICBpZiAoZW5sYXJnZWRGaWx0ZXJJZHggPiAtMSAmJiBlbmxhcmdlZEZpbHRlcklkeCAhPT0gaWR4KSB7XG4gICAgICAgIC8vIHRoZXJlIHNob3VsZCBiZSBvbmx5IG9uZSBlbmxhcmdlZCBmaWx0ZXJcbiAgICAgICAgbmV3RmlsdGVyLmVubGFyZ2VkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIG5ld1N0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZGF0YXNldHM6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5kYXRhc2V0cyxcbiAgICAgICAgICBbZGF0YUlkXToge1xuICAgICAgICAgICAgLi4uc3RhdGUuZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgICAgIGZpZWxkczogZmllbGRzLm1hcCgoZCwgaSkgPT4gKGkgPT09IGZpZWxkSWR4ID8gZmllbGQgOiBkKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICBjYXNlICd2YWx1ZSc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gc2F2ZSBuZXcgZmlsdGVycyB0byBuZXdTdGF0ZVxuICBuZXdTdGF0ZSA9IHtcbiAgICAuLi5uZXdTdGF0ZSxcbiAgICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcCgoZiwgaSkgPT4gKGkgPT09IGlkeCA/IG5ld0ZpbHRlciA6IGYpKVxuICB9O1xuXG4gIC8vIGZpbHRlciBkYXRhXG4gIG5ld1N0YXRlID0ge1xuICAgIC4uLm5ld1N0YXRlLFxuICAgIGRhdGFzZXRzOiB7XG4gICAgICAuLi5uZXdTdGF0ZS5kYXRhc2V0cyxcbiAgICAgIFtkYXRhSWRdOiB7XG4gICAgICAgIC4uLm5ld1N0YXRlLmRhdGFzZXRzW2RhdGFJZF0sXG4gICAgICAgIC4uLmZpbHRlckRhdGEoYWxsRGF0YSwgZGF0YUlkLCBuZXdTdGF0ZS5maWx0ZXJzKVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBuZXdTdGF0ZSA9IHVwZGF0ZUFsbExheWVyRG9tYWluRGF0YShuZXdTdGF0ZSwgZGF0YUlkLCBuZXdGaWx0ZXIpO1xuXG4gIHJldHVybiBuZXdTdGF0ZTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHByb3BlcnR5IG9mIGEgZmlsdGVyIHBsb3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpb24uaWR4XG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLm5ld1Byb3Aga2V5IHZhbHVlIG1hcHBpbmcgb2YgbmV3IHByb3AgYHt5QXhpczogJ2hpc3RvZ3JhbSd9YFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRGaWx0ZXJQbG90VXBkYXRlciA9IChzdGF0ZSwge2lkeCwgbmV3UHJvcH0pID0+IHtcbiAgbGV0IG5ld0ZpbHRlciA9IHsuLi5zdGF0ZS5maWx0ZXJzW2lkeF0sIC4uLm5ld1Byb3B9O1xuICBjb25zdCBwcm9wID0gT2JqZWN0LmtleXMobmV3UHJvcClbMF07XG4gIGlmIChwcm9wID09PSAneUF4aXMnKSB7XG4gICAgY29uc3QgcGxvdFR5cGUgPSBnZXREZWZhdWx0RmlsdGVyUGxvdFR5cGUobmV3RmlsdGVyKTtcblxuICAgIGlmIChwbG90VHlwZSkge1xuICAgICAgbmV3RmlsdGVyID0ge1xuICAgICAgICAuLi5uZXdGaWx0ZXIsXG4gICAgICAgIC4uLmdldEZpbHRlclBsb3QoXG4gICAgICAgICAgey4uLm5ld0ZpbHRlciwgcGxvdFR5cGV9LFxuICAgICAgICAgIHN0YXRlLmRhdGFzZXRzW25ld0ZpbHRlci5kYXRhSWRdLmFsbERhdGFcbiAgICAgICAgKSxcbiAgICAgICAgcGxvdFR5cGVcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcCgoZiwgaSkgPT4gKGkgPT09IGlkeCA/IG5ld0ZpbHRlciA6IGYpKVxuICB9O1xufTtcblxuLyoqXG4gKiBBZGQgYSBuZXcgZmlsdGVyXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLmRhdGFJZCBkYXRhc2V0IGBpZGAgdGhpcyBuZXcgZmlsdGVyIGlzIGFzc29jaWF0ZWQgd2l0aFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+XG4gICFhY3Rpb24uZGF0YUlkXG4gICAgPyBzdGF0ZVxuICAgIDoge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmlsdGVyczogWy4uLnN0YXRlLmZpbHRlcnMsIGdldERlZmF1bHRGaWx0ZXIoYWN0aW9uLmRhdGFJZCldXG4gICAgICB9O1xuXG4vKipcbiAqIFN0YXJ0IGFuZCBlbmQgZmlsdGVyIGFuaW1hdGlvblxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdmlzU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIGFjdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGFjdGlvbi5pZHggaWR4IG9mIGZpbHRlclxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVGaWx0ZXJBbmltYXRpb25VcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcChcbiAgICAoZiwgaSkgPT4gKGkgPT09IGFjdGlvbi5pZHggPyB7Li4uZiwgaXNBbmltYXRpbmc6ICFmLmlzQW5pbWF0aW5nfSA6IGYpXG4gIClcbn0pO1xuXG4vKipcbiAqIENoYW5nZSBmaWx0ZXIgYW5pbWF0aW9uIHNwZWVkXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gYWN0aW9uLmlkeCAgYGlkeGAgb2YgZmlsdGVyXG4gKiBAcGFyYW0ge051bWJlcn0gYWN0aW9uLnNwZWVkIGBzcGVlZGAgdG8gY2hhbmdlIGl0IHRvLiBgc3BlZWRgIGlzIGEgbXVsdGlwbGllclxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVBbmltYXRpb25TcGVlZFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGZpbHRlcnM6IHN0YXRlLmZpbHRlcnMubWFwKFxuICAgIChmLCBpKSA9PiAoaSA9PT0gYWN0aW9uLmlkeCA/IHsuLi5mLCBzcGVlZDogYWN0aW9uLnNwZWVkfSA6IGYpXG4gIClcbn0pO1xuXG4vKipcbiAqIFNob3cgbGFyZ2VyIHRpbWUgZmlsdGVyIGF0IGJvdHRvbSBmb3IgdGltZSBwbGF5YmFjayAoYXBwbHkgdG8gdGltZSBmaWx0ZXIgb25seSlcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpb24uaWR4IGluZGV4IG9mIGZpbHRlciB0byBlbmxhcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IGVubGFyZ2VGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgaXNFbmxhcmdlZCA9IHN0YXRlLmZpbHRlcnNbYWN0aW9uLmlkeF0uZW5sYXJnZWQ7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBmaWx0ZXJzOiBzdGF0ZS5maWx0ZXJzLm1hcCgoZiwgaSkgPT4ge1xuICAgICAgZi5lbmxhcmdlZCA9ICFpc0VubGFyZ2VkICYmIGkgPT09IGFjdGlvbi5pZHg7XG4gICAgICByZXR1cm4gZjtcbiAgICB9KVxuICB9O1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSBmaWx0ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpb24uaWR4IGluZGV4IG9mIGZpbHRlciB0byBiIGUgcmVtb3ZlZFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVGaWx0ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge2lkeH0gPSBhY3Rpb247XG4gIGNvbnN0IHtkYXRhSWR9ID0gc3RhdGUuZmlsdGVyc1tpZHhdO1xuXG4gIGNvbnN0IG5ld0ZpbHRlcnMgPSBbXG4gICAgLi4uc3RhdGUuZmlsdGVycy5zbGljZSgwLCBpZHgpLFxuICAgIC4uLnN0YXRlLmZpbHRlcnMuc2xpY2UoaWR4ICsgMSwgc3RhdGUuZmlsdGVycy5sZW5ndGgpXG4gIF07XG5cbiAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgLi4uc3RhdGUsXG4gICAgZGF0YXNldHM6IHtcbiAgICAgIC4uLnN0YXRlLmRhdGFzZXRzLFxuICAgICAgW2RhdGFJZF06IHtcbiAgICAgICAgLi4uc3RhdGUuZGF0YXNldHNbZGF0YUlkXSxcbiAgICAgICAgLi4uZmlsdGVyRGF0YShzdGF0ZS5kYXRhc2V0c1tkYXRhSWRdLmFsbERhdGEsIGRhdGFJZCwgbmV3RmlsdGVycylcbiAgICAgIH1cbiAgICB9LFxuICAgIGZpbHRlcnM6IG5ld0ZpbHRlcnNcbiAgfTtcblxuICByZXR1cm4gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG5ld1N0YXRlLCBkYXRhSWQpO1xufTtcblxuLyoqXG4gKiBBZGQgYSBuZXcgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ucHJvcHMgLSBuZXcgbGF5ZXIgcHJvcHNcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgYWRkTGF5ZXJVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3QgZGVmYXVsdERhdGFzZXQgPSBPYmplY3Qua2V5cyhzdGF0ZS5kYXRhc2V0cylbMF07XG4gIGNvbnN0IG5ld0xheWVyID0gbmV3IExheWVyKHtcbiAgICBpc1Zpc2libGU6IHRydWUsXG4gICAgaXNDb25maWdBY3RpdmU6IHRydWUsXG4gICAgZGF0YUlkOiBkZWZhdWx0RGF0YXNldCxcbiAgICAuLi5hY3Rpb24ucHJvcHNcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IFsuLi5zdGF0ZS5sYXllcnMsIG5ld0xheWVyXSxcbiAgICBsYXllckRhdGE6IFsuLi5zdGF0ZS5sYXllckRhdGEsIHt9XSxcbiAgICBsYXllck9yZGVyOiBbLi4uc3RhdGUubGF5ZXJPcmRlciwgc3RhdGUubGF5ZXJPcmRlci5sZW5ndGhdLFxuICAgIHNwbGl0TWFwczogYWRkTmV3TGF5ZXJzVG9TcGxpdE1hcChzdGF0ZS5zcGxpdE1hcHMsIG5ld0xheWVyKVxuICB9O1xufTtcblxuLyoqXG4gKiByZW1vdmUgbGF5ZXJcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpb24uaWR4IGluZGV4IG9mIGxheWVyIHRvIGIgZSByZW1vdmVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUxheWVyVXBkYXRlciA9IChzdGF0ZSwge2lkeH0pID0+IHtcbiAgY29uc3Qge2xheWVycywgbGF5ZXJEYXRhLCBjbGlja2VkLCBob3ZlckluZm99ID0gc3RhdGU7XG4gIGNvbnN0IGxheWVyVG9SZW1vdmUgPSBzdGF0ZS5sYXllcnNbaWR4XTtcbiAgY29uc3QgbmV3TWFwcyA9IHJlbW92ZUxheWVyRnJvbVNwbGl0TWFwcyhzdGF0ZSwgbGF5ZXJUb1JlbW92ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IFsuLi5sYXllcnMuc2xpY2UoMCwgaWR4KSwgLi4ubGF5ZXJzLnNsaWNlKGlkeCArIDEsIGxheWVycy5sZW5ndGgpXSxcbiAgICBsYXllckRhdGE6IFtcbiAgICAgIC4uLmxheWVyRGF0YS5zbGljZSgwLCBpZHgpLFxuICAgICAgLi4ubGF5ZXJEYXRhLnNsaWNlKGlkeCArIDEsIGxheWVyRGF0YS5sZW5ndGgpXG4gICAgXSxcbiAgICBsYXllck9yZGVyOiBzdGF0ZS5sYXllck9yZGVyXG4gICAgICAuZmlsdGVyKGkgPT4gaSAhPT0gaWR4KVxuICAgICAgLm1hcChwaWQgPT4gKHBpZCA+IGlkeCA/IHBpZCAtIDEgOiBwaWQpKSxcbiAgICBjbGlja2VkOiBsYXllclRvUmVtb3ZlLmlzTGF5ZXJIb3ZlcmVkKGNsaWNrZWQpID8gdW5kZWZpbmVkIDogY2xpY2tlZCxcbiAgICBob3ZlckluZm86IGxheWVyVG9SZW1vdmUuaXNMYXllckhvdmVyZWQoaG92ZXJJbmZvKSA/IHVuZGVmaW5lZCA6IGhvdmVySW5mbyxcbiAgICBzcGxpdE1hcHM6IG5ld01hcHNcbiAgfTtcbn07XG5cbi8qKlxuICogUmVvcmRlciBsYXllclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdmlzU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIGFjdGlvblxuICogQHBhcmFtIHtBcnJheTxOdW1iZXI+fSBhY3Rpb24ub3JkZXIgYW4gYXJyYXkgb2YgbGF5ZXIgaW5kZXhlc1xuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCByZW9yZGVyTGF5ZXJVcGRhdGVyID0gKHN0YXRlLCB7b3JkZXJ9KSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgbGF5ZXJPcmRlcjogb3JkZXJcbn0pO1xuXG4vKipcbiAqIFJlbW92ZSBhIGRhdGFzZXQgYW5kIGFsbCBsYXllcnMsIGZpbHRlcnMsIHRvb2x0aXAgY29uZmlncyB0aGF0IGJhc2VkIG9uIGl0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLmtleSBkYXRhc2V0IGlkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZURhdGFzZXRVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgLy8gZXh0cmFjdCBkYXRhc2V0IGtleVxuICBjb25zdCB7a2V5OiBkYXRhc2V0S2V5fSA9IGFjdGlvbjtcbiAgY29uc3Qge2RhdGFzZXRzfSA9IHN0YXRlO1xuXG4gIC8vIGNoZWNrIGlmIGRhdGFzZXQgaXMgcHJlc2VudFxuICBpZiAoIWRhdGFzZXRzW2RhdGFzZXRLZXldKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgY29uc3Qge1xuICAgIGxheWVycyxcbiAgICBkYXRhc2V0czoge1tkYXRhc2V0S2V5XTogZGF0YXNldCwgLi4ubmV3RGF0YXNldHN9XG4gIH0gPSBzdGF0ZTtcbiAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuXG4gIGNvbnN0IGluZGV4ZXMgPSBsYXllcnMucmVkdWNlKChsaXN0T2ZJbmRleGVzLCBsYXllciwgaW5kZXgpID0+IHtcbiAgICBpZiAobGF5ZXIuY29uZmlnLmRhdGFJZCA9PT0gZGF0YXNldEtleSkge1xuICAgICAgbGlzdE9mSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIGxpc3RPZkluZGV4ZXM7XG4gIH0sIFtdKTtcblxuICAvLyByZW1vdmUgbGF5ZXJzIGFuZCBkYXRhc2V0c1xuICBjb25zdCB7bmV3U3RhdGV9ID0gaW5kZXhlcy5yZWR1Y2UoXG4gICAgKHtuZXdTdGF0ZTogY3VycmVudFN0YXRlLCBpbmRleENvdW50ZXJ9LCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGlkeCAtIGluZGV4Q291bnRlcjtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IHJlbW92ZUxheWVyVXBkYXRlcihjdXJyZW50U3RhdGUsIHtpZHg6IGN1cnJlbnRJbmRleH0pO1xuICAgICAgaW5kZXhDb3VudGVyKys7XG4gICAgICByZXR1cm4ge25ld1N0YXRlOiBjdXJyZW50U3RhdGUsIGluZGV4Q291bnRlcn07XG4gICAgfSxcbiAgICB7bmV3U3RhdGU6IHsuLi5zdGF0ZSwgZGF0YXNldHM6IG5ld0RhdGFzZXRzfSwgaW5kZXhDb3VudGVyOiAwfVxuICApO1xuXG4gIC8vIHJlbW92ZSBmaWx0ZXJzXG4gIGNvbnN0IGZpbHRlcnMgPSBzdGF0ZS5maWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4gZmlsdGVyLmRhdGFJZCAhPT0gZGF0YXNldEtleSk7XG5cbiAgLy8gdXBkYXRlIGludGVyYWN0aW9uQ29uZmlnXG4gIGxldCB7aW50ZXJhY3Rpb25Db25maWd9ID0gc3RhdGU7XG4gIGNvbnN0IHt0b29sdGlwfSA9IGludGVyYWN0aW9uQ29uZmlnO1xuICBpZiAodG9vbHRpcCkge1xuICAgIGNvbnN0IHtjb25maWd9ID0gdG9vbHRpcDtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtbZGF0YXNldEtleV06IGZpZWxkcywgLi4uZmllbGRzVG9TaG93fSA9IGNvbmZpZy5maWVsZHNUb1Nob3c7XG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGludGVyYWN0aW9uQ29uZmlnID0ge1xuICAgICAgLi4uaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICB0b29sdGlwOiB7Li4udG9vbHRpcCwgY29uZmlnOiB7Li4uY29uZmlnLCBmaWVsZHNUb1Nob3d9fVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gey4uLm5ld1N0YXRlLCBmaWx0ZXJzLCBpbnRlcmFjdGlvbkNvbmZpZ307XG59O1xuXG4vKipcbiAqIHVwZGF0ZSBsYXllciBibGVuZGluZyBtb2RlXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uLm1vZGUgb25lIG9mIGBhZGRpdGl2ZWAsIGBub3JtYWxgIGFuZCBgc3VidHJhY3RpdmVgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUxheWVyQmxlbmRpbmdVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gIC4uLnN0YXRlLFxuICBsYXllckJsZW5kaW5nOiBhY3Rpb24ubW9kZVxufSk7XG5cbi8qKlxuICogRGlzcGxheSBkYXRhc2V0IHRhYmxlIGluIGEgbW9kYWxcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uZGF0YUlkIGRhdGFzZXQgaWQgdG8gc2hvdyBpbiB0YWJsZVxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93RGF0YXNldFRhYmxlVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgZWRpdGluZ0RhdGFzZXQ6IGFjdGlvbi5kYXRhSWRcbiAgfTtcbn07XG5cbi8qKlxuICogcmVzZXQgdmlzU3RhdGUgdG8gaW5pdGlhbCBTdGF0ZVxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdmlzU3RhdGVgXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlc2V0TWFwQ29uZmlnVmlzU3RhdGVVcGRhdGVyID0gKHN0YXRlKSA9PiAoe1xuICAuLi5JTklUSUFMX1ZJU19TVEFURSxcbiAgLi4uc3RhdGUuaW5pdGlhbFN0YXRlLFxuICBpbml0aWFsU3RhdGU6IHN0YXRlLmluaXRpYWxTdGF0ZVxufSk7XG5cbi8qKlxuICogUHJvcGFnYXRlIGB2aXNTdGF0ZWAgcmVkdWNlciB3aXRoIGEgbmV3IGNvbmZpZ3VyYXRpb24uIEN1cnJlbnQgY29uZmlnIHdpbGwgYmUgb3ZlcnJpZGUuXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLnBheWxvYWQgbWFwIGNvbmZpZyB0byBiZSBwcm9wYWdhdGVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlY2VpdmVNYXBDb25maWdVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgaWYgKCFhY3Rpb24ucGF5bG9hZC52aXNTdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBmaWx0ZXJzLFxuICAgIGxheWVycyxcbiAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICBsYXllckJsZW5kaW5nLFxuICAgIHNwbGl0TWFwc1xuICB9ID0gYWN0aW9uLnBheWxvYWQudmlzU3RhdGU7XG5cbiAgLy8gYWx3YXlzIHJlc2V0IGNvbmZpZyB3aGVuIHJlY2VpdmUgYSBuZXcgY29uZmlnXG4gIGNvbnN0IHJlc2V0U3RhdGUgPSByZXNldE1hcENvbmZpZ1Zpc1N0YXRlVXBkYXRlcihzdGF0ZSk7XG4gIGxldCBtZXJnZWRTdGF0ZSA9IHtcbiAgICAuLi5yZXNldFN0YXRlLFxuICAgIHNwbGl0TWFwczogc3BsaXRNYXBzIHx8IFtdIC8vIG1hcHMgZG9lc24ndCByZXF1aXJlIGFueSBsb2dpY1xuICB9O1xuXG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VGaWx0ZXJzKG1lcmdlZFN0YXRlLCBmaWx0ZXJzKTtcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUxheWVycyhtZXJnZWRTdGF0ZSwgbGF5ZXJzKTtcbiAgbWVyZ2VkU3RhdGUgPSBtZXJnZUludGVyYWN0aW9ucyhtZXJnZWRTdGF0ZSwgaW50ZXJhY3Rpb25Db25maWcpO1xuICBtZXJnZWRTdGF0ZSA9IG1lcmdlTGF5ZXJCbGVuZGluZyhtZXJnZWRTdGF0ZSwgbGF5ZXJCbGVuZGluZyk7XG5cbiAgcmV0dXJuIG1lcmdlZFN0YXRlO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGxheWVyIGhvdmVyIGV2ZW50IHdpdGggaG92ZXJlZCBvYmplY3RcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uaW5mbyBPYmplY3QgaG92ZXJlZCwgcmV0dXJuZWQgYnkgZGVjay5nbFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsYXllckhvdmVyVXBkYXRlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgaG92ZXJJbmZvOiBhY3Rpb24uaW5mb1xufSk7XG5cbi8qKlxuICogVHJpZ2dlciBsYXllciBjbGljayBldmVudCB3aXRoIGNsaWNrZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uLmluZm8gT2JqZWN0IGNsaWNrZWQsIHJldHVybmVkIGJ5IGRlY2suZ2xcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbGF5ZXJDbGlja1VwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGNsaWNrZWQ6IGFjdGlvbi5pbmZvICYmIGFjdGlvbi5pbmZvLnBpY2tlZCA/IGFjdGlvbi5pbmZvIDogbnVsbFxufSk7XG5cbi8qKlxuICogVHJpZ2dlciBtYXAgY2xpY2sgZXZlbnQsIHVuc2VsZWN0IGNsaWNrZWQgb2JqZWN0XG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbWFwQ2xpY2tVcGRhdGVyID0gKHN0YXRlKSA9PiAoe1xuICAuLi5zdGF0ZSxcbiAgY2xpY2tlZDogbnVsbFxufSk7XG5cbi8qKlxuICogVG9nZ2xlIHZpc2liaWxpdHkgb2YgYSBsYXllciBmb3IgYSBzcGxpdCBtYXBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfHVuZGVmaW5lZH0gYWN0aW9uLnBheWxvYWQgaW5kZXggb2YgdGhlIHNwbGl0IG1hcFxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVTcGxpdE1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT5cbiAgc3RhdGUuc3BsaXRNYXBzICYmIHN0YXRlLnNwbGl0TWFwcy5sZW5ndGggPT09IDBcbiAgICA/IHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIC8vIG1heWJlIHdlIHNob3VsZCB1c2UgYW4gYXJyYXkgdG8gc3RvcmUgc3RhdGUgZm9yIGEgc2luZ2xlIG1hcCBhcyB3ZWxsXG4gICAgICAgIC8vIGlmIGN1cnJlbnQgbWFwcyBsZW5ndGggaXMgZXF1YWwgdG8gMCBpdCBtZWFucyB0aGF0IHdlIGFyZSBhYm91dCB0byBzcGxpdCB0aGUgdmlld1xuICAgICAgICBzcGxpdE1hcHM6IGNvbXB1dGVTcGxpdE1hcExheWVycyhzdGF0ZS5sYXllcnMpXG4gICAgICB9XG4gICAgOiBjbG9zZVNwZWNpZmljTWFwQXRJbmRleChzdGF0ZSwgYWN0aW9uKTtcblxuLyoqXG4gKiBTZXQgbGF5ZXJzIHRvIGJlIHZpc2libGUgaW4gc3BsaXQgbWFwXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gbWFwSW5kZXggaW5kZXggb2YgdGhlIHNwbGl0IG1hcFxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBsYXllcklkcyBhcnJheSBvZiBsYXllciBpZHNcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3Qgc2V0VmlzaWJsZUxheWVyc0Zvck1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBjb25zdCB7bWFwSW5kZXgsIGxheWVySWRzfSA9IGFjdGlvbjtcbiAgaWYgKCFsYXllcklkcykge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIGNvbnN0IHtzcGxpdE1hcHMgPSBbXX0gPSBzdGF0ZTtcblxuICBpZiAoc3BsaXRNYXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIC8vIHdlIHNob3VsZCBuZXZlciBnZXQgaW50byB0aGlzIHN0YXRlXG4gICAgLy8gYmVjYXVzZSB0aGlzIGFjdGlvbiBzaG91bGQgb25seSBiZSB0cmlnZ2VyZWRcbiAgICAvLyB3aGVuIG1hcCB2aWV3IGlzIHNwbGl0XG4gICAgLy8gYnV0IHNvbWV0aGluZyBtYXkgaGF2ZSBoYXBwZW5lZFxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIC8vIG5lZWQgdG8gY2hlY2sgaWYgbWFwcyBpcyBwb3B1bGF0ZWQgb3RoZXJ3aXNlIHdpbGwgY3JlYXRlXG4gIGNvbnN0IHtbbWFwSW5kZXhdOiBtYXAgPSB7fX0gPSBzcGxpdE1hcHM7XG5cbiAgY29uc3QgbGF5ZXJzID0gbWFwLmxheWVycyB8fCBbXTtcblxuICAvLyB3ZSBzZXQgdmlzaWJpbGl0eSB0byB0cnVlIGZvciBhbGwgbGF5ZXJzIGluY2x1ZGVkIGluIG91ciBpbnB1dCBsaXN0XG4gIGNvbnN0IG5ld0xheWVycyA9IChPYmplY3Qua2V5cyhsYXllcnMpIHx8IFtdKS5yZWR1Y2UoKGN1cnJlbnRMYXllcnMsIGlkeCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5jdXJyZW50TGF5ZXJzLFxuICAgICAgW2lkeF06IHtcbiAgICAgICAgLi4ubGF5ZXJzW2lkeF0sXG4gICAgICAgIGlzVmlzaWJsZTogbGF5ZXJJZHMuaW5jbHVkZXMoaWR4KVxuICAgICAgfVxuICAgIH07XG4gIH0sIHt9KTtcblxuICBjb25zdCBuZXdNYXBzID0gWy4uLnNwbGl0TWFwc107XG5cbiAgbmV3TWFwc1ttYXBJbmRleF0gPSB7XG4gICAgLi4uc3BsaXRNYXBzW21hcEluZGV4XSxcbiAgICBsYXllcnM6IG5ld0xheWVyc1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgc3BsaXRNYXBzOiBuZXdNYXBzXG4gIH07XG59O1xuXG4vKipcbiAqIFRvZ2dsZSB2aXNpYmlsaXR5IG9mIGEgbGF5ZXIgaW4gYSBzcGxpdCBtYXBcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBhY3Rpb24ubWFwSW5kZXggaW5kZXggb2YgdGhlIHNwbGl0IG1hcFxuICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbi5sYXllcklkIGlkIG9mIHRoZSBsYXllclxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVMYXllckZvck1hcFVwZGF0ZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xuICBpZiAoIXN0YXRlLnNwbGl0TWFwc1thY3Rpb24ubWFwSW5kZXhdKSB7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgY29uc3QgbWFwU2V0dGluZ3MgPSBzdGF0ZS5zcGxpdE1hcHNbYWN0aW9uLm1hcEluZGV4XTtcbiAgY29uc3Qge2xheWVyc30gPSBtYXBTZXR0aW5ncztcbiAgaWYgKCFsYXllcnMgfHwgIWxheWVyc1thY3Rpb24ubGF5ZXJJZF0pIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBsYXllciA9IGxheWVyc1thY3Rpb24ubGF5ZXJJZF07XG5cbiAgY29uc3QgbmV3TGF5ZXIgPSB7XG4gICAgLi4ubGF5ZXIsXG4gICAgaXNWaXNpYmxlOiAhbGF5ZXIuaXNWaXNpYmxlXG4gIH07XG5cbiAgY29uc3QgbmV3TGF5ZXJzID0ge1xuICAgIC4uLmxheWVycyxcbiAgICBbYWN0aW9uLmxheWVySWRdOiBuZXdMYXllclxuICB9O1xuXG4gIGNvbnN0IG5ld1NwbGl0TWFwcyA9IFsuLi5zdGF0ZS5zcGxpdE1hcHNdO1xuICBuZXdTcGxpdE1hcHNbYWN0aW9uLm1hcEluZGV4XSA9IHtcbiAgICAuLi5tYXBTZXR0aW5ncyxcbiAgICBsYXllcnM6IG5ld0xheWVyc1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgc3BsaXRNYXBzOiBuZXdTcGxpdE1hcHNcbiAgfTtcbn07XG5cbi8qKlxuICogQWRkIG5ldyBkYXRhc2V0IHRvIGB2aXNTdGF0ZWAsIHdpdGggb3B0aW9uIHRvIGxvYWQgYSBtYXAgY29uZmlnIGFsb25nIHdpdGggdGhlIGRhdGFzZXRzXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD58T2JqZWN0fSBhY3Rpb24uZGF0YXNldHMgLSAqKipyZXF1aXJlZCoqIGRhdGFzZXRzIGNhbiBiZSBhIGRhdGFzZXQgb3IgYW4gYXJyYXkgb2YgZGF0YXNldHNcbiAqIEVhY2ggZGF0YXNldCBvYmplY3QgbmVlZHMgdG8gaGF2ZSBgaW5mb2AgYW5kIGBkYXRhYCBwcm9wZXJ0eS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uZGF0YXNldHMuaW5mbyAtaW5mbyBvZiBhIGRhdGFzZXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uZGF0YXNldHMuaW5mby5pZCAtIGlkIG9mIHRoaXMgZGF0YXNldC4gSWYgY29uZmlnIGlzIGRlZmluZWQsIGBpZGAgc2hvdWxkIG1hdGNoZXMgdGhlIGBkYXRhSWRgIGluIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uZGF0YXNldHMuaW5mby5sYWJlbCAtIEEgZGlzcGxheSBuYW1lIG9mIHRoaXMgZGF0YXNldFxuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbi5kYXRhc2V0cy5kYXRhIC0gKioqcmVxdWlyZWQqKiBUaGUgZGF0YSBvYmplY3QsIGluIGEgdGFidWxhciBmb3JtYXQgd2l0aCAyIHByb3BlcnRpZXMgYGZpZWxkc2AgYW5kIGByb3dzYFxuICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBhY3Rpb24uZGF0YXNldHMuZGF0YS5maWVsZHMgLSAqKipyZXF1aXJlZCoqIEFycmF5IG9mIGZpZWxkcyxcbiAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24uZGF0YXNldHMuZGF0YS5maWVsZHMubmFtZSAtICoqKnJlcXVpcmVkKiogTmFtZSBvZiB0aGUgZmllbGQsXG4gKiBAcGFyYW0ge0FycmF5PEFycmF5Pn0gYWN0aW9uLmRhdGFzZXRzLmRhdGEucm93cyAtICoqKnJlcXVpcmVkKiogQXJyYXkgb2Ygcm93cywgaW4gYSB0YWJ1bGFyIGZvcm1hdCB3aXRoIGBmaWVsZHNgIGFuZCBgcm93c2BcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24ub3B0aW9ucyBvcHRpb24gb2JqZWN0IGB7Y2VudGVyTWFwOiB0cnVlfWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24uY29uZmlnIG1hcCBjb25maWdcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cyAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZVZpc0RhdGFVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgLy8gZGF0YXNldHMgY2FuIGJlIGEgc2luZ2xlIGRhdGEgZW50cmllcyBvciBhbiBhcnJheSBvZiBtdWx0aXBsZSBkYXRhIGVudHJpZXNcbiAgY29uc3QgZGF0YXNldHMgPSBBcnJheS5pc0FycmF5KGFjdGlvbi5kYXRhc2V0cylcbiAgICA/IGFjdGlvbi5kYXRhc2V0c1xuICAgIDogW2FjdGlvbi5kYXRhc2V0c107XG5cbiAgaWYgKGFjdGlvbi5jb25maWcpIHtcbiAgICAvLyBhcHBseSBjb25maWcgaWYgcGFzc2VkIGZyb20gYWN0aW9uXG4gICAgc3RhdGUgPSByZWNlaXZlTWFwQ29uZmlnVXBkYXRlcihzdGF0ZSwge1xuICAgICAgcGF5bG9hZDoge3Zpc1N0YXRlOiBhY3Rpb24uY29uZmlnfVxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbmV3RGF0ZUVudHJpZXMgPSBkYXRhc2V0cy5yZWR1Y2UoXG4gICAgKGFjY3UsIHtpbmZvID0ge30sIGRhdGF9KSA9PiAoe1xuICAgICAgLi4uYWNjdSxcbiAgICAgIC4uLihjcmVhdGVOZXdEYXRhRW50cnkoe2luZm8sIGRhdGF9LCBzdGF0ZS5kYXRhc2V0cykgfHwge30pXG4gICAgfSksXG4gICAge31cbiAgKTtcblxuICBpZiAoIU9iamVjdC5rZXlzKG5ld0RhdGVFbnRyaWVzKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cblxuICBjb25zdCBzdGF0ZVdpdGhOZXdEYXRhID0ge1xuICAgIC4uLnN0YXRlLFxuICAgIGRhdGFzZXRzOiB7XG4gICAgICAuLi5zdGF0ZS5kYXRhc2V0cyxcbiAgICAgIC4uLm5ld0RhdGVFbnRyaWVzXG4gICAgfVxuICB9O1xuXG4gIC8vIHByZXZpb3VzbHkgc2F2ZWQgY29uZmlnIGJlZm9yZSBkYXRhIGxvYWRlZFxuICBjb25zdCB7XG4gICAgZmlsdGVyVG9CZU1lcmdlZCA9IFtdLFxuICAgIGxheWVyVG9CZU1lcmdlZCA9IFtdLFxuICAgIGludGVyYWN0aW9uVG9CZU1lcmdlZCA9IHt9XG4gIH0gPSBzdGF0ZVdpdGhOZXdEYXRhO1xuXG4gIC8vIG1lcmdlIHN0YXRlIHdpdGggc2F2ZWQgZmlsdGVyc1xuICBsZXQgbWVyZ2VkU3RhdGUgPSBtZXJnZUZpbHRlcnMoc3RhdGVXaXRoTmV3RGF0YSwgZmlsdGVyVG9CZU1lcmdlZCk7XG4gIC8vIG1lcmdlIHN0YXRlIHdpdGggc2F2ZWQgbGF5ZXJzXG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VMYXllcnMobWVyZ2VkU3RhdGUsIGxheWVyVG9CZU1lcmdlZCk7XG5cbiAgaWYgKG1lcmdlZFN0YXRlLmxheWVycy5sZW5ndGggPT09IHN0YXRlLmxheWVycy5sZW5ndGgpIHtcbiAgICAvLyBubyBsYXllciBtZXJnZWQsIGZpbmQgZGVmYXVsdHNcbiAgICBtZXJnZWRTdGF0ZSA9IGFkZERlZmF1bHRMYXllcnMobWVyZ2VkU3RhdGUsIG5ld0RhdGVFbnRyaWVzKTtcbiAgfVxuXG4gIGlmIChtZXJnZWRTdGF0ZS5zcGxpdE1hcHMubGVuZ3RoKSB7XG4gICAgY29uc3QgbmV3TGF5ZXJzID0gbWVyZ2VkU3RhdGUubGF5ZXJzLmZpbHRlcihcbiAgICAgIGwgPT4gbC5jb25maWcuZGF0YUlkIGluIG5ld0RhdGVFbnRyaWVzXG4gICAgKTtcbiAgICAvLyBpZiBtYXAgaXMgc3BsaXQsIGFkZCBuZXcgbGF5ZXJzIHRvIHNwbGl0TWFwc1xuICAgIG1lcmdlZFN0YXRlID0ge1xuICAgICAgLi4ubWVyZ2VkU3RhdGUsXG4gICAgICBzcGxpdE1hcHM6IGFkZE5ld0xheWVyc1RvU3BsaXRNYXAobWVyZ2VkU3RhdGUuc3BsaXRNYXBzLCBuZXdMYXllcnMpXG4gICAgfTtcbiAgfVxuXG4gIC8vIG1lcmdlIHN0YXRlIHdpdGggc2F2ZWQgaW50ZXJhY3Rpb25zXG4gIG1lcmdlZFN0YXRlID0gbWVyZ2VJbnRlcmFjdGlvbnMobWVyZ2VkU3RhdGUsIGludGVyYWN0aW9uVG9CZU1lcmdlZCk7XG5cbiAgLy8gaWYgbm8gdG9vbHRpcHMgbWVyZ2VkIGFkZCBkZWZhdWx0IHRvb2x0aXBzXG4gIE9iamVjdC5rZXlzKG5ld0RhdGVFbnRyaWVzKS5mb3JFYWNoKGRhdGFJZCA9PiB7XG4gICAgY29uc3QgdG9vbHRpcEZpZWxkcyA9XG4gICAgICBtZXJnZWRTdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLmNvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodG9vbHRpcEZpZWxkcykgfHwgIXRvb2x0aXBGaWVsZHMubGVuZ3RoKSB7XG4gICAgICBtZXJnZWRTdGF0ZSA9IGFkZERlZmF1bHRUb29sdGlwcyhtZXJnZWRTdGF0ZSwgbmV3RGF0ZUVudHJpZXNbZGF0YUlkXSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKG1lcmdlZFN0YXRlLCBPYmplY3Qua2V5cyhuZXdEYXRlRW50cmllcykpO1xufTtcbi8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMgKi9cblxuZnVuY3Rpb24gZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzKGxheWVyKSB7XG4gIHJldHVybiB7XG4gICAgaXNBdmFpbGFibGU6IGxheWVyLmNvbmZpZy5pc1Zpc2libGUsXG4gICAgaXNWaXNpYmxlOiBsYXllci5jb25maWcuaXNWaXNpYmxlXG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2Qgd2lsbCBjb21wdXRlIHRoZSBkZWZhdWx0IG1hcHMgY3VzdG9tIGxpc3RcbiAqIGJhc2VkIG9uIHRoZSBjdXJyZW50IGxheWVycyBzdGF0dXNcbiAqIEBwYXJhbSB7QXJyYXk8T2JqZWN0Pn0gbGF5ZXJzXG4gKiBAcmV0dXJucyB7QXJyYXk8T2JqZWN0Pn0gc3BsaXQgbWFwIHNldHRpbmdzXG4gKi9cbmZ1bmN0aW9uIGNvbXB1dGVTcGxpdE1hcExheWVycyhsYXllcnMpIHtcbiAgY29uc3QgbWFwTGF5ZXJzID0gbGF5ZXJzLnJlZHVjZShcbiAgICAobmV3TGF5ZXJzLCBjdXJyZW50TGF5ZXIpID0+ICh7XG4gICAgICAuLi5uZXdMYXllcnMsXG4gICAgICBbY3VycmVudExheWVyLmlkXTogZ2VuZXJhdGVMYXllck1ldGFGb3JTcGxpdFZpZXdzKGN1cnJlbnRMYXllcilcbiAgICB9KSxcbiAgICB7fVxuICApO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIGxheWVyczogbWFwTGF5ZXJzXG4gICAgfSxcbiAgICB7XG4gICAgICBsYXllcnM6IG1hcExheWVyc1xuICAgIH1cbiAgXTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYW4gZXhpc3RpbmcgbGF5ZXIgZnJvbSBzcGxpdCBtYXAgc2V0dGluZ3NcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdmlzU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gbGF5ZXJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE1hcHMgb2YgY3VzdG9tIGxheWVyIG9iamVjdHNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlTGF5ZXJGcm9tU3BsaXRNYXBzKHN0YXRlLCBsYXllcikge1xuICByZXR1cm4gc3RhdGUuc3BsaXRNYXBzLm1hcChzZXR0aW5ncyA9PiB7XG4gICAgY29uc3Qge2xheWVyc30gPSBzZXR0aW5ncztcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuICAgIGNvbnN0IHtbbGF5ZXIuaWRdOiBfLCAuLi5uZXdMYXllcnN9ID0gbGF5ZXJzO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc2V0dGluZ3MsXG4gICAgICBsYXllcnM6IG5ld0xheWVyc1xuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIEFkZCBuZXcgbGF5ZXJzIHRvIGJvdGggZXhpc3RpbmcgbWFwc1xuICogQHBhcmFtIHtPYmplY3R9IHNwbGl0TWFwc1xuICogQHBhcmFtIHtPYmplY3R8QXJyYXk8T2JqZWN0Pn0gbGF5ZXJzXG4gKiBAcmV0dXJucyB7QXJyYXk8T2JqZWN0Pn0gbmV3IHNwbGl0TWFwc1xuICovXG5mdW5jdGlvbiBhZGROZXdMYXllcnNUb1NwbGl0TWFwKHNwbGl0TWFwcywgbGF5ZXJzKSB7XG4gIGNvbnN0IG5ld0xheWVycyA9IEFycmF5LmlzQXJyYXkobGF5ZXJzKSA/IGxheWVycyA6IFtsYXllcnNdO1xuXG4gIGlmICghc3BsaXRNYXBzIHx8ICFzcGxpdE1hcHMubGVuZ3RoIHx8ICFuZXdMYXllcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHNwbGl0TWFwcztcbiAgfVxuXG4gIC8vIGFkZCBuZXcgbGF5ZXIgdG8gYm90aCBtYXBzLFxuICAvLyAgZG9uJ3Qgb3ZlcnJpZGUsIGlmIGxheWVyLmlkIGlzIGFscmVhZHkgaW4gc3BsaXRNYXBzLnNldHRpbmdzLmxheWVyc1xuICByZXR1cm4gc3BsaXRNYXBzLm1hcChzZXR0aW5ncyA9PiAoe1xuICAgIC4uLnNldHRpbmdzLFxuICAgIGxheWVyczoge1xuICAgICAgLi4uc2V0dGluZ3MubGF5ZXJzLFxuICAgICAgLi4ubmV3TGF5ZXJzLnJlZHVjZShcbiAgICAgICAgKGFjY3UsIG5ld0xheWVyKSA9PlxuICAgICAgICAgIG5ld0xheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIC4uLmFjY3UsXG4gICAgICAgICAgICAgICAgW25ld0xheWVyLmlkXTogc2V0dGluZ3MubGF5ZXJzW25ld0xheWVyLmlkXVxuICAgICAgICAgICAgICAgICAgPyBzZXR0aW5ncy5sYXllcnNbbmV3TGF5ZXIuaWRdXG4gICAgICAgICAgICAgICAgICA6IGdlbmVyYXRlTGF5ZXJNZXRhRm9yU3BsaXRWaWV3cyhuZXdMYXllcilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBhY2N1LFxuICAgICAgICB7fVxuICAgICAgKVxuICAgIH1cbiAgfSkpO1xufVxuXG4vKipcbiAqIEhpZGUgYW4gZXhpc3RpbmcgbGF5ZXJzIGZyb20gY3VzdG9tIG1hcCBsYXllciBvYmplY3RzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBsYXllclxuICogQHJldHVybnMge09iamVjdH0gTWFwcyBvZiBjdXN0b20gbGF5ZXIgb2JqZWN0c1xuICovXG5mdW5jdGlvbiB0b2dnbGVMYXllckZyb21TcGxpdE1hcHMoc3RhdGUsIGxheWVyKSB7XG4gIHJldHVybiBzdGF0ZS5zcGxpdE1hcHMubWFwKHNldHRpbmdzID0+IHtcbiAgICBjb25zdCB7bGF5ZXJzfSA9IHNldHRpbmdzO1xuICAgIGNvbnN0IG5ld0xheWVycyA9IHtcbiAgICAgIC4uLmxheWVycyxcbiAgICAgIFtsYXllci5pZF06IGdlbmVyYXRlTGF5ZXJNZXRhRm9yU3BsaXRWaWV3cyhsYXllcilcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnNldHRpbmdzLFxuICAgICAgbGF5ZXJzOiBuZXdMYXllcnNcbiAgICB9O1xuICB9KTtcbn1cblxuLyoqXG4gKiBXaGVuIGEgdXNlciBjbGlja3Mgb24gdGhlIHNwZWNpZmljIG1hcCBjbG9zaW5nIGljb25cbiAqIHRoZSBhcHBsaWNhdGlvbiB3aWxsIGNsb3NlIHRoZSBzZWxlY3RlZCBtYXBcbiAqIGFuZCB3aWxsIG1lcmdlIHRoZSByZW1haW5pbmcgb25lIHdpdGggdGhlIGdsb2JhbCBzdGF0ZVxuICogVE9ETzogaSB0aGluayBpbiB0aGUgZnV0dXJlIHRoaXMgYWN0aW9uIHNob3VsZCBiZSBjYWxsZWQgbWVyZ2UgbWFwIGxheWVycyB3aXRoIGdsb2JhbCBzZXR0aW5nc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqL1xuZnVuY3Rpb24gY2xvc2VTcGVjaWZpY01hcEF0SW5kZXgoc3RhdGUsIGFjdGlvbikge1xuICAvLyByZXRyaWV2ZSBsYXllcnMgbWV0YSBkYXRhIGZyb20gdGhlIHJlbWFpbmluZyBtYXAgdGhhdCB3ZSBuZWVkIHRvIGtlZXBcbiAgY29uc3QgaW5kZXhUb1JldHJpZXZlID0gMSAtIGFjdGlvbi5wYXlsb2FkO1xuXG4gIGNvbnN0IG1ldGFTZXR0aW5ncyA9IHN0YXRlLnNwbGl0TWFwc1tpbmRleFRvUmV0cmlldmVdO1xuICBpZiAoIW1ldGFTZXR0aW5ncyB8fCAhbWV0YVNldHRpbmdzLmxheWVycykge1xuICAgIC8vIGlmIHdlIGNhbid0IGZpbmQgdGhlIG1ldGEgc2V0dGluZ3Mgd2Ugc2ltcGx5IGNsZWFuIHVwIHNwbGl0TWFwcyBhbmRcbiAgICAvLyBrZWVwIGdsb2JhbCBzdGF0ZSBhcyBpdCBpc1xuICAgIC8vIGJ1dCB3aHkgZG9lcyB0aGlzIGV2ZXIgaGFwcGVuP1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHNwbGl0TWFwczogW11cbiAgICB9O1xuICB9XG5cbiAgY29uc3Qge2xheWVyc30gPSBzdGF0ZTtcblxuICAvLyB1cGRhdGUgbGF5ZXIgdmlzaWJpbGl0eVxuICBjb25zdCBuZXdMYXllcnMgPSBsYXllcnMubWFwKGxheWVyID0+XG4gICAgbGF5ZXIudXBkYXRlTGF5ZXJDb25maWcoe1xuICAgICAgaXNWaXNpYmxlOiBtZXRhU2V0dGluZ3MubGF5ZXJzW2xheWVyLmlkXVxuICAgICAgICA/IG1ldGFTZXR0aW5ncy5sYXllcnNbbGF5ZXIuaWRdLmlzVmlzaWJsZVxuICAgICAgICA6IGxheWVyLmNvbmZpZy5pc1Zpc2libGVcbiAgICB9KVxuICApO1xuXG4gIC8vIGRlbGV0ZSBtYXBcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBsYXllcnM6IG5ld0xheWVycyxcbiAgICBzcGxpdE1hcHM6IFtdXG4gIH07XG59XG5cbi8qKlxuICogVHJpZ2dlciBmaWxlIGxvYWRpbmcgZGlzcGF0Y2ggYGFkZERhdGFUb01hcGAgaWYgc3VjY2VlZCwgb3IgYGxvYWRGaWxlc0VycmAgaWYgZmFpbGVkXG4gKiBAbWVtYmVyb2YgdmlzU3RhdGVVcGRhdGVyc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIGB2aXNTdGF0ZWBcbiAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gYWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGFjdGlvbi5maWxlcyBhcnJheSBvZiBmaWxlYmxvYlxuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBsb2FkRmlsZXNVcGRhdGVyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgY29uc3Qge2ZpbGVzfSA9IGFjdGlvbjtcblxuICBjb25zdCBmaWxlc1RvTG9hZCA9IGZpbGVzLm1hcChmaWxlQmxvYiA9PiBwcm9jZXNzRmlsZVRvTG9hZChmaWxlQmxvYikpO1xuXG4gIC8vIHJlYWRlciAtPiBwYXJzZXIgLT4gYXVnbWVudCAtPiByZWNlaXZlVmlzRGF0YVxuICBjb25zdCBsb2FkRmlsZVRhc2tzID0gW1xuICAgIFRhc2suYWxsKGZpbGVzVG9Mb2FkLm1hcChMT0FEX0ZJTEVfVEFTSykpLmJpbWFwKFxuICAgICAgcmVzdWx0cyA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHRzLnJlZHVjZSgoZiwgYykgPT4gKHtcbiAgICAgICAgICAvLyB1c2luZyBjb25jYXQgaGVyZSBiZWNhdXNlIHRoZSBjdXJyZW50IGRhdGFzZXRzIGNvdWxkIGJlIGFuIGFycmF5IG9yIGEgc2luZ2xlIGl0ZW1cbiAgICAgICAgICBkYXRhc2V0czogZi5kYXRhc2V0cy5jb25jYXQoYy5kYXRhc2V0cyksXG4gICAgICAgICAgLy8gd2UgbmVlZCB0byBkZWVwIG1lcmdlIHRoaXMgdGhpbmcgdW5sZXNzIHdlIGZpbmQgYSBiZXR0ZXIgc29sdXRpb25cbiAgICAgICAgICAvLyB0aGlzIGNhc2Ugd2lsbCBvbmx5IGhhcHBlbiBpZiB3ZSBhbGxvdyB0byBsb2FkIG11bHRpcGxlIGtlcGxlcmdsIGpzb24gZmlsZXNcbiAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgIC4uLmYuY29uZmlnLFxuICAgICAgICAgICAgLi4uKGMuY29uZmlnIHx8IHt9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSksIHtkYXRhc2V0czogW10sIGNvbmZpZzoge30sIG9wdGlvbnM6IHtjZW50ZXJNYXA6IHRydWV9fSk7XG4gICAgICAgIHJldHVybiBhZGREYXRhVG9NYXAoZGF0YSk7XG4gICAgICB9LFxuICAgICAgZXJyb3IgPT4gbG9hZEZpbGVzRXJyKGVycm9yKVxuICAgIClcbiAgXTtcblxuICByZXR1cm4gd2l0aFRhc2soXG4gICAge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBmaWxlTG9hZGluZzogdHJ1ZVxuICAgIH0sXG4gICAgbG9hZEZpbGVUYXNrc1xuICApO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGxvYWRpbmcgZmlsZSBlcnJvclxuICogQG1lbWJlcm9mIHZpc1N0YXRlVXBkYXRlcnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBgdmlzU3RhdGVgXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIGFjdGlvblxuICogQHBhcmFtIHsqfSBhY3Rpb24uZXJyb3JcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgbG9hZEZpbGVzRXJyVXBkYXRlciA9IChzdGF0ZSwge2Vycm9yfSkgPT4gKHtcbiAgLi4uc3RhdGUsXG4gIGZpbGVMb2FkaW5nOiBmYWxzZSxcbiAgZmlsZUxvYWRpbmdFcnI6IGVycm9yXG59KTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gdXBkYXRlIEFsbCBsYXllciBkb21haW4gYW5kIGxheWVyIGRhdGEgb2Ygc3RhdGVcbiAqIEBtZW1iZXJvZiB2aXNTdGF0ZVVwZGF0ZXJzXG4gKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgYHZpc1N0YXRlYFxuICogQHBhcmFtIHtBcnJheTxzdHJpbmc+fSBkYXRhc2V0c1xuICogQHJldHVybnMge09iamVjdH0gbmV4dFN0YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGREZWZhdWx0TGF5ZXJzKHN0YXRlLCBkYXRhc2V0cykge1xuICBjb25zdCBkZWZhdWx0TGF5ZXJzID0gT2JqZWN0LnZhbHVlcyhkYXRhc2V0cykucmVkdWNlKFxuICAgIChhY2N1LCBkYXRhc2V0KSA9PiBbXG4gICAgICAuLi5hY2N1LFxuICAgICAgLi4uKGZpbmREZWZhdWx0TGF5ZXIoZGF0YXNldCwgc3RhdGUubGF5ZXJDbGFzc2VzKSB8fCBbXSlcbiAgICBdLFxuICAgIFtdXG4gICk7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBbLi4uc3RhdGUubGF5ZXJzLCAuLi5kZWZhdWx0TGF5ZXJzXSxcbiAgICBsYXllck9yZGVyOiBbXG4gICAgICAvLyBwdXQgbmV3IGxheWVycyBvbiB0b3Agb2Ygb2xkIG9uZXNcbiAgICAgIC4uLmRlZmF1bHRMYXllcnMubWFwKChfLCBpKSA9PiBzdGF0ZS5sYXllcnMubGVuZ3RoICsgaSksXG4gICAgICAuLi5zdGF0ZS5sYXllck9yZGVyXG4gICAgXVxuICB9O1xufVxuXG4vKipcbiAqIGhlbHBlciBmdW5jdGlvbiB0byBmaW5kIGRlZmF1bHQgdG9vbHRpcHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFzZXRcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdFRvb2x0aXBzKHN0YXRlLCBkYXRhc2V0KSB7XG4gIGNvbnN0IHRvb2x0aXBGaWVsZHMgPSBmaW5kRmllbGRzVG9TaG93KGRhdGFzZXQpO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgaW50ZXJhY3Rpb25Db25maWc6IHtcbiAgICAgIC4uLnN0YXRlLmludGVyYWN0aW9uQ29uZmlnLFxuICAgICAgdG9vbHRpcDoge1xuICAgICAgICAuLi5zdGF0ZS5pbnRlcmFjdGlvbkNvbmZpZy50b29sdGlwLFxuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAvLyBmaW5kIGRlZmF1bHQgZmllbGRzIHRvIHNob3cgaW4gdG9vbHRpcFxuICAgICAgICAgIGZpZWxkc1RvU2hvdzoge1xuICAgICAgICAgICAgLi4uc3RhdGUuaW50ZXJhY3Rpb25Db25maWcudG9vbHRpcC5jb25maWcuZmllbGRzVG9TaG93LFxuICAgICAgICAgICAgLi4udG9vbHRpcEZpZWxkc1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gdXBkYXRlIGxheWVyIGRvbWFpbnMgZm9yIGFuIGFycmF5IG9mIGRhdHNldHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtBcnJheXxBcnJheTxzdHJpbmc+fSBkYXRhSWQgZGF0YXNldCBpZCBvciBhcnJheSBvZiBkYXRhc2V0IGlkc1xuICogQHBhcmFtIHtPYmplY3R9IG5ld0ZpbHRlciBpZiBpcyBjYWxsZWQgYnkgc2V0RmlsdGVyLCB0aGUgZmlsdGVyIHRoYXQgaGFzIGNoYW5nZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IG5leHRTdGF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQWxsTGF5ZXJEb21haW5EYXRhKHN0YXRlLCBkYXRhSWQsIG5ld0ZpbHRlcikge1xuICBjb25zdCBkYXRhSWRzID0gdHlwZW9mIGRhdGFJZCA9PT0gJ3N0cmluZycgPyBbZGF0YUlkXSA6IGRhdGFJZDtcbiAgY29uc3QgbmV3TGF5ZXJzID0gW107XG4gIGNvbnN0IG5ld0xheWVyRGF0YXMgPSBbXTtcblxuICBzdGF0ZS5sYXllcnMuZm9yRWFjaCgob2xkTGF5ZXIsIGkpID0+IHtcbiAgICBpZiAob2xkTGF5ZXIuY29uZmlnLmRhdGFJZCAmJiBkYXRhSWRzLmluY2x1ZGVzKG9sZExheWVyLmNvbmZpZy5kYXRhSWQpKSB7XG4gICAgICAvLyBObyBuZWVkIHRvIHJlY2FsY3VsYXRlIGxheWVyIGRvbWFpbiBpZiBmaWx0ZXIgaGFzIGZpeGVkIGRvbWFpblxuICAgICAgY29uc3QgbmV3TGF5ZXIgPVxuICAgICAgICBuZXdGaWx0ZXIgJiYgbmV3RmlsdGVyLmZpeGVkRG9tYWluXG4gICAgICAgICAgPyBvbGRMYXllclxuICAgICAgICAgIDogb2xkTGF5ZXIudXBkYXRlTGF5ZXJEb21haW4oXG4gICAgICAgICAgICAgIHN0YXRlLmRhdGFzZXRzW29sZExheWVyLmNvbmZpZy5kYXRhSWRdLFxuICAgICAgICAgICAgICBuZXdGaWx0ZXJcbiAgICAgICAgICAgICk7XG5cbiAgICAgIGNvbnN0IHtsYXllckRhdGEsIGxheWVyfSA9IGNhbGN1bGF0ZUxheWVyRGF0YShcbiAgICAgICAgbmV3TGF5ZXIsXG4gICAgICAgIHN0YXRlLFxuICAgICAgICBzdGF0ZS5sYXllckRhdGFbaV1cbiAgICAgICk7XG5cbiAgICAgIG5ld0xheWVycy5wdXNoKGxheWVyKTtcbiAgICAgIG5ld0xheWVyRGF0YXMucHVzaChsYXllckRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdMYXllcnMucHVzaChvbGRMYXllcik7XG4gICAgICBuZXdMYXllckRhdGFzLnB1c2goc3RhdGUubGF5ZXJEYXRhW2ldKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUsXG4gICAgbGF5ZXJzOiBuZXdMYXllcnMsXG4gICAgbGF5ZXJEYXRhOiBuZXdMYXllckRhdGFzXG4gIH07XG59XG4iXX0=