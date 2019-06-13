"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateMapboxLayers = generateMapboxLayers;
exports.updateMapboxLayers = updateMapboxLayers;
exports.geojsonFromPoints = geojsonFromPoints;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _baseLayer = require("./base-layer");

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
 * This function will convert layers to mapbox layers
 * @param layers the layers to be converted
 * @param layerData extra layer information
 * @param layerOrder the order by which we should convert layers
 * @returns {*}
 */
function generateMapboxLayers() {
  var layers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var layerData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var layerOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (layerData.length > 0) {
    return layerOrder.slice().reverse().reduce(function (overlays, idx) {
      var layer = layers[idx];
      return layer.overlayType !== _baseLayer.OVERLAY_TYPE.mapboxgl ? overlays : [].concat((0, _toConsumableArray2["default"])(overlays), [{
        id: layer.id,
        data: layerData[idx].data,
        config: layerData[idx].config,
        datasetId: layer.config.dataId
      }]);
    }, []);
  }

  return [];
}
/**
 * Update mapbox layers on the given map
 * @param map
 * @param newLayers Array of new mapbox layers to be displayed
 * @param oldLayers Map of the old layers to be compare with the current ones to detect deleted layers
 *                  {layerId: datasetId}
 * @param mapLayers carries information about split map view
 */


function updateMapboxLayers(map) {
  var newLayers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var oldLayers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var mapLayers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    force: true
  };

  // delete non existing layers
  if (oldLayers) {
    var oldLayersKeys = Object.keys(oldLayers);

    if (newLayers.length === 0 && oldLayersKeys.length > 0) {
      oldLayersKeys.forEach(function (layerId) {
        return map.removeLayer(layerId);
      });
    } else {
      // remove layers
      var currentLayersIds = newLayers.reduce(function (_final, layer) {
        return (0, _objectSpread5["default"])({}, _final, (0, _defineProperty2["default"])({}, layer.id, true));
      }, {});
      var layersToDelete = oldLayersKeys.reduce(function (_final2, layerId) {
        // if layer doesn't exists anymore
        if (!currentLayersIds[layerId]) {
          return (0, _objectSpread5["default"])({}, _final2, (0, _defineProperty2["default"])({}, layerId, oldLayers[layerId]));
        }

        return _final2;
      }, []);
      Object.keys(layersToDelete).forEach(function (layerId) {
        return map.removeLayer(layerId);
      });
    }
  } // insert or update new layer
  // TODO: fix complexity

  /* eslint-disable complexity */


  newLayers.forEach(function (overlay) {
    var layerId = overlay.id,
        config = overlay.config,
        data = overlay.data,
        datasetId = overlay.datasetId;

    if (!data && !config) {
      return;
    }

    var isAvailableAndVisible = !(mapLayers && mapLayers[layerId]) || mapLayers[layerId].isVisible; // checking if source already exists

    if (data && isAvailableAndVisible) {
      var source = map.getSource(datasetId);

      if (!source) {
        map.addSource(datasetId, {
          type: 'geojson',
          data: data
        });
      } else {
        source.setData(data);
      }
    }

    var oldConfig = oldLayers[layerId];
    var mapboxLayer = map.getLayer(layerId); // compare with previous configs

    if (!oldConfig || oldConfig !== config || !mapboxLayer || opt.force) {
      // check if layer already is set
      // remove it if exists
      if (mapboxLayer) {
        map.removeLayer(layerId);
      } // add if visible and available


      if (isAvailableAndVisible) {
        map.addLayer(config);
      }
    }
  });
  /* eslint-enable complexity */
  // TODO: think about removing sources
}

;
/**
 *
 * @param points
 * @param columns {
 * lat: {fieldIdx},
 * lng: {fieldIdx},
 * alt: {fieldIdx}
 * }
 * @param properties [{label: {fieldIdx}]
 * @returns {{type: string, properties: {}, features: {type: string, properties: {}, geometry: {type: string, coordinates: *[]}}[]}}
 */

function geojsonFromPoints() {
  var allData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var filteredIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var columns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var properties = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return {
    type: 'FeatureCollection',
    features: filteredIndex.map(function (index) {
      return allData[index];
    }).map(function (point) {
      return {
        type: 'Feature',
        properties: properties.reduce(function (_final3, property) {
          return (0, _objectSpread5["default"])({}, _final3, (0, _defineProperty2["default"])({}, property.name, point[property.tableFieldIndex - 1]));
        }, {}),
        geometry: {
          type: 'Point',
          coordinates: [columns.lng ? point[columns.lng.fieldIdx] : null, // lng
          columns.lat ? point[columns.lat.fieldIdx] : null, // lat
          columns.altitude ? point[columns.altitude.fieldIdx] : 0 // altitude
          ]
        }
      };
    })
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sYXllcnMvbWFwYm94LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlTWFwYm94TGF5ZXJzIiwibGF5ZXJzIiwibGF5ZXJEYXRhIiwibGF5ZXJPcmRlciIsImxlbmd0aCIsInNsaWNlIiwicmV2ZXJzZSIsInJlZHVjZSIsIm92ZXJsYXlzIiwiaWR4IiwibGF5ZXIiLCJvdmVybGF5VHlwZSIsIk9WRVJMQVlfVFlQRSIsIm1hcGJveGdsIiwiaWQiLCJkYXRhIiwiY29uZmlnIiwiZGF0YXNldElkIiwiZGF0YUlkIiwidXBkYXRlTWFwYm94TGF5ZXJzIiwibWFwIiwibmV3TGF5ZXJzIiwib2xkTGF5ZXJzIiwibWFwTGF5ZXJzIiwib3B0IiwiZm9yY2UiLCJvbGRMYXllcnNLZXlzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJsYXllcklkIiwicmVtb3ZlTGF5ZXIiLCJjdXJyZW50TGF5ZXJzSWRzIiwiZmluYWwiLCJsYXllcnNUb0RlbGV0ZSIsIm92ZXJsYXkiLCJpc0F2YWlsYWJsZUFuZFZpc2libGUiLCJpc1Zpc2libGUiLCJzb3VyY2UiLCJnZXRTb3VyY2UiLCJhZGRTb3VyY2UiLCJ0eXBlIiwic2V0RGF0YSIsIm9sZENvbmZpZyIsIm1hcGJveExheWVyIiwiZ2V0TGF5ZXIiLCJhZGRMYXllciIsImdlb2pzb25Gcm9tUG9pbnRzIiwiYWxsRGF0YSIsImZpbHRlcmVkSW5kZXgiLCJjb2x1bW5zIiwicHJvcGVydGllcyIsImZlYXR1cmVzIiwiaW5kZXgiLCJwb2ludCIsInByb3BlcnR5IiwibmFtZSIsInRhYmxlRmllbGRJbmRleCIsImdlb21ldHJ5IiwiY29vcmRpbmF0ZXMiLCJsbmciLCJmaWVsZElkeCIsImxhdCIsImFsdGl0dWRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDSixPQUFPLENBQUNZLEdBQVIsQ0FBWUQsUUFBYixDQUFuQixHQUE0QyxJQUZqQyxFQUV1QztBQUNsRFgsVUFBQUEsT0FBTyxDQUFDYSxRQUFSLEdBQW1CVCxLQUFLLENBQUNKLE9BQU8sQ0FBQ2EsUUFBUixDQUFpQkYsUUFBbEIsQ0FBeEIsR0FBc0QsQ0FIM0MsQ0FHNkM7QUFIN0M7QUFGTDtBQU51RCxPQUFMO0FBQUEsS0FBcEQ7QUFGTCxHQUFQO0FBa0JEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtPVkVSTEFZX1RZUEV9IGZyb20gJy4vYmFzZS1sYXllcic7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgbGF5ZXJzIHRvIG1hcGJveCBsYXllcnNcbiAqIEBwYXJhbSBsYXllcnMgdGhlIGxheWVycyB0byBiZSBjb252ZXJ0ZWRcbiAqIEBwYXJhbSBsYXllckRhdGEgZXh0cmEgbGF5ZXIgaW5mb3JtYXRpb25cbiAqIEBwYXJhbSBsYXllck9yZGVyIHRoZSBvcmRlciBieSB3aGljaCB3ZSBzaG91bGQgY29udmVydCBsYXllcnNcbiAqIEByZXR1cm5zIHsqfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNYXBib3hMYXllcnMobGF5ZXJzID0gW10sIGxheWVyRGF0YSA9IFtdLCBsYXllck9yZGVyID0gW10pIHtcbiAgaWYgKGxheWVyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGxheWVyT3JkZXIuc2xpY2UoKVxuICAgICAgLnJldmVyc2UoKVxuICAgICAgLnJlZHVjZSgob3ZlcmxheXMsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBsYXllciA9IGxheWVyc1tpZHhdO1xuXG4gICAgICAgIHJldHVybiBsYXllci5vdmVybGF5VHlwZSAhPT0gT1ZFUkxBWV9UWVBFLm1hcGJveGdsID9cbiAgICAgICAgICBvdmVybGF5c1xuICAgICAgICAgIDogW1xuICAgICAgICAgICAgLi4ub3ZlcmxheXMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBsYXllci5pZCxcbiAgICAgICAgICAgICAgZGF0YTogbGF5ZXJEYXRhW2lkeF0uZGF0YSxcbiAgICAgICAgICAgICAgY29uZmlnOiBsYXllckRhdGFbaWR4XS5jb25maWcsXG4gICAgICAgICAgICAgIGRhdGFzZXRJZDogbGF5ZXIuY29uZmlnLmRhdGFJZFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgIH0sIFtdKTtcbiAgfVxuXG4gIHJldHVybiBbXTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgbWFwYm94IGxheWVycyBvbiB0aGUgZ2l2ZW4gbWFwXG4gKiBAcGFyYW0gbWFwXG4gKiBAcGFyYW0gbmV3TGF5ZXJzIEFycmF5IG9mIG5ldyBtYXBib3ggbGF5ZXJzIHRvIGJlIGRpc3BsYXllZFxuICogQHBhcmFtIG9sZExheWVycyBNYXAgb2YgdGhlIG9sZCBsYXllcnMgdG8gYmUgY29tcGFyZSB3aXRoIHRoZSBjdXJyZW50IG9uZXMgdG8gZGV0ZWN0IGRlbGV0ZWQgbGF5ZXJzXG4gKiAgICAgICAgICAgICAgICAgIHtsYXllcklkOiBkYXRhc2V0SWR9XG4gKiBAcGFyYW0gbWFwTGF5ZXJzIGNhcnJpZXMgaW5mb3JtYXRpb24gYWJvdXQgc3BsaXQgbWFwIHZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZU1hcGJveExheWVycyhtYXAsIG5ld0xheWVycyA9IFtdLCBvbGRMYXllcnMgPSBudWxsLCBtYXBMYXllcnMgPSBudWxsLCBvcHQgPSB7Zm9yY2U6IHRydWV9KSB7XG4gIC8vIGRlbGV0ZSBub24gZXhpc3RpbmcgbGF5ZXJzXG5cbiAgaWYgKG9sZExheWVycykge1xuICAgIGNvbnN0IG9sZExheWVyc0tleXMgPSBPYmplY3Qua2V5cyhvbGRMYXllcnMpO1xuICAgIGlmIChuZXdMYXllcnMubGVuZ3RoID09PSAwICYmIG9sZExheWVyc0tleXMubGVuZ3RoID4gMCkge1xuICAgICAgb2xkTGF5ZXJzS2V5cy5mb3JFYWNoKGxheWVySWQgPT4gbWFwLnJlbW92ZUxheWVyKGxheWVySWQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVtb3ZlIGxheWVyc1xuICAgICAgY29uc3QgY3VycmVudExheWVyc0lkcyA9IG5ld0xheWVycy5yZWR1Y2UoKGZpbmFsLCBsYXllcikgPT4gKHtcbiAgICAgICAgLi4uZmluYWwsXG4gICAgICAgIFtsYXllci5pZF06IHRydWVcbiAgICAgIH0pLCB7fSk7XG5cbiAgICAgIGNvbnN0IGxheWVyc1RvRGVsZXRlID0gb2xkTGF5ZXJzS2V5cy5yZWR1Y2UoKGZpbmFsLCBsYXllcklkKSA9PiB7XG4gICAgICAgIC8vIGlmIGxheWVyIGRvZXNuJ3QgZXhpc3RzIGFueW1vcmVcbiAgICAgICAgaWYgKCFjdXJyZW50TGF5ZXJzSWRzW2xheWVySWRdKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmZpbmFsLFxuICAgICAgICAgICAgW2xheWVySWRdOiBvbGRMYXllcnNbbGF5ZXJJZF1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaW5hbDtcbiAgICAgIH0sIFtdKTtcbiAgICAgIE9iamVjdC5rZXlzKGxheWVyc1RvRGVsZXRlKS5mb3JFYWNoKGxheWVySWQgPT4gbWFwLnJlbW92ZUxheWVyKGxheWVySWQpKTtcbiAgICB9XG4gIH1cblxuICAvLyBpbnNlcnQgb3IgdXBkYXRlIG5ldyBsYXllclxuICAvLyBUT0RPOiBmaXggY29tcGxleGl0eVxuICAvKiBlc2xpbnQtZGlzYWJsZSBjb21wbGV4aXR5ICovXG4gIG5ld0xheWVycy5mb3JFYWNoKG92ZXJsYXkgPT4ge1xuICAgIGNvbnN0IHtpZDogbGF5ZXJJZCwgY29uZmlnLCBkYXRhLCBkYXRhc2V0SWR9ID0gb3ZlcmxheTtcbiAgICBpZiAoIWRhdGEgJiYgIWNvbmZpZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc0F2YWlsYWJsZUFuZFZpc2libGUgPVxuICAgICAgIShtYXBMYXllcnMgJiYgbWFwTGF5ZXJzW2xheWVySWRdKSB8fCBtYXBMYXllcnNbbGF5ZXJJZF0uaXNWaXNpYmxlO1xuICAgIC8vIGNoZWNraW5nIGlmIHNvdXJjZSBhbHJlYWR5IGV4aXN0c1xuXG4gICAgaWYgKGRhdGEgJiYgaXNBdmFpbGFibGVBbmRWaXNpYmxlKSB7XG4gICAgICBjb25zdCBzb3VyY2UgPSBtYXAuZ2V0U291cmNlKGRhdGFzZXRJZCk7XG4gICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICBtYXAuYWRkU291cmNlKGRhdGFzZXRJZCwge1xuICAgICAgICAgIHR5cGU6ICdnZW9qc29uJyxcbiAgICAgICAgICBkYXRhXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNvdXJjZS5zZXREYXRhKGRhdGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9sZENvbmZpZyA9IG9sZExheWVyc1tsYXllcklkXTtcbiAgICBjb25zdCBtYXBib3hMYXllciA9IG1hcC5nZXRMYXllcihsYXllcklkKTtcbiAgICAvLyBjb21wYXJlIHdpdGggcHJldmlvdXMgY29uZmlnc1xuXG4gICAgaWYgKCFvbGRDb25maWcgfHwgb2xkQ29uZmlnICE9PSBjb25maWcgfHwgIW1hcGJveExheWVyIHx8IG9wdC5mb3JjZSkge1xuICAgICAgLy8gY2hlY2sgaWYgbGF5ZXIgYWxyZWFkeSBpcyBzZXRcbiAgICAgIC8vIHJlbW92ZSBpdCBpZiBleGlzdHNcbiAgICAgIGlmIChtYXBib3hMYXllcikge1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIobGF5ZXJJZCk7XG4gICAgICB9XG4gICAgICAvLyBhZGQgaWYgdmlzaWJsZSBhbmQgYXZhaWxhYmxlXG4gICAgICBpZiAoaXNBdmFpbGFibGVBbmRWaXNpYmxlKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcihjb25maWcpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIC8qIGVzbGludC1lbmFibGUgY29tcGxleGl0eSAqL1xuICAvLyBUT0RPOiB0aGluayBhYm91dCByZW1vdmluZyBzb3VyY2VzXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gcG9pbnRzXG4gKiBAcGFyYW0gY29sdW1ucyB7XG4gKiBsYXQ6IHtmaWVsZElkeH0sXG4gKiBsbmc6IHtmaWVsZElkeH0sXG4gKiBhbHQ6IHtmaWVsZElkeH1cbiAqIH1cbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIFt7bGFiZWw6IHtmaWVsZElkeH1dXG4gKiBAcmV0dXJucyB7e3R5cGU6IHN0cmluZywgcHJvcGVydGllczoge30sIGZlYXR1cmVzOiB7dHlwZTogc3RyaW5nLCBwcm9wZXJ0aWVzOiB7fSwgZ2VvbWV0cnk6IHt0eXBlOiBzdHJpbmcsIGNvb3JkaW5hdGVzOiAqW119fVtdfX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlb2pzb25Gcm9tUG9pbnRzKGFsbERhdGEgPSBbXSwgZmlsdGVyZWRJbmRleCA9IFtdLCBjb2x1bW5zID0ge30sIHByb3BlcnRpZXMgPSBbXSkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgZmVhdHVyZXM6IGZpbHRlcmVkSW5kZXgubWFwKGluZGV4ID0+IGFsbERhdGFbaW5kZXhdKS5tYXAocG9pbnQgPT4gKHtcbiAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXMucmVkdWNlKChmaW5hbCwgcHJvcGVydHkpID0+ICh7XG4gICAgICAgIC4uLmZpbmFsLFxuICAgICAgICBbcHJvcGVydHkubmFtZV06IHBvaW50W3Byb3BlcnR5LnRhYmxlRmllbGRJbmRleCAtIDFdXG4gICAgICB9KSwge30pLFxuICAgICAgZ2VvbWV0cnk6IHtcbiAgICAgICAgdHlwZTogJ1BvaW50JyxcbiAgICAgICAgY29vcmRpbmF0ZXM6IFtcbiAgICAgICAgICBjb2x1bW5zLmxuZyA/IHBvaW50W2NvbHVtbnMubG5nLmZpZWxkSWR4XSA6IG51bGwsIC8vIGxuZ1xuICAgICAgICAgIGNvbHVtbnMubGF0ID8gcG9pbnRbY29sdW1ucy5sYXQuZmllbGRJZHhdIDogbnVsbCwgLy8gbGF0XG4gICAgICAgICAgY29sdW1ucy5hbHRpdHVkZSA/IHBvaW50W2NvbHVtbnMuYWx0aXR1ZGUuZmllbGRJZHhdIDogMCAvLyBhbHRpdHVkZVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSkpXG4gIH07XG59XG4iXX0=