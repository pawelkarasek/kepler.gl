"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGeojsonDataMaps = getGeojsonDataMaps;
exports.parseGeometryFromString = parseGeometryFromString;
exports.getGeojsonBounds = getGeojsonBounds;
exports.featureToDeckGlGeoType = featureToDeckGlGeoType;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _geojsonExtent = _interopRequireDefault(require("@mapbox/geojson-extent"));

var _wellknown = _interopRequireDefault(require("wellknown"));

var _geojsonNormalize = _interopRequireDefault(require("@mapbox/geojson-normalize"));

var _dataUtils = require("../../utils/data-utils");

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
 * Parse raw data to geojson feature
 * @param allData
 * @param getFeature
 * @returns {{}}
 */
function getGeojsonDataMaps(allData, getFeature) {
  var acceptableTypes = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection'];
  var dataToFeature = {};
  allData.forEach(function (d, index) {
    dataToFeature[index] = null;
    var rawFeature = getFeature(d);
    var feature = null; // parse feature from field

    if (Array.isArray(rawFeature)) {
      // Support geojson as an array of points
      feature = {
        type: 'Feature',
        geometry: {
          // why do we need to flip it...
          coordinates: rawFeature.map(function (pts) {
            return [pts[1], pts[0]];
          }),
          type: 'LineString'
        }
      };
    } else if (typeof rawFeature === 'string') {
      feature = parseGeometryFromString(rawFeature);
    } else if ((0, _typeof2["default"])(rawFeature) === 'object') {
      // Support geojson feature as object
      // probably need to normalize it as well
      var normalized = (0, _geojsonNormalize["default"])(rawFeature);

      if (!normalized || !Array.isArray(normalized.features)) {
        // fail to normalize geojson
        return null;
      }

      feature = normalized.features[0];
    }

    if (feature && feature.geometry && acceptableTypes.includes(feature.geometry.type)) {
      // store index of the data in feature properties
      feature.properties = (0, _objectSpread2["default"])({}, feature.properties || {}, {
        index: index
      });
      dataToFeature[index] = feature;
    }
  });
  return dataToFeature;
}
/**
 * Parse geojson from string
 * @param {String} geoString
 * @returns {null | Object} geojson object or null if failed
 */


function parseGeometryFromString(geoString) {
  var parsedGeo; // try parse as geojson string
  // {"type":"Polygon","coordinates":[[[-74.158491,40.83594]]]}

  try {
    parsedGeo = JSON.parse(geoString);
  } catch (e) {} // keep trying to parse
  // try parse as wkt


  if (!parsedGeo) {
    try {
      parsedGeo = (0, _wellknown["default"])(geoString);
    } catch (e) {
      return null;
    }
  }

  if (!parsedGeo) {
    return null;
  }

  var normalized = (0, _geojsonNormalize["default"])(parsedGeo);

  if (!normalized || !Array.isArray(normalized.features)) {
    // fail to normalize geojson
    return null;
  }

  return normalized.features[0];
}

function getGeojsonBounds() {
  var features = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // calculate feature bounds is computation heavy
  // here we only pick couple
  var samples = features.length > 500 ? (0, _dataUtils.getSampleData)(features, 500) : features;
  var nonEmpty = samples.filter(function (d) {
    return d && d.geometry && d.geometry.coordinates && d.geometry.coordinates.length;
  });

  try {
    return (0, _geojsonExtent["default"])({
      type: 'FeatureCollection',
      features: nonEmpty
    });
  } catch (e) {
    return null;
  }
}

function featureToDeckGlGeoType(type) {
  switch (type) {
    case 'Point':
    case 'MultiPoint':
      return 'point';

    case 'LineString':
    case 'MultiLineString':
      return 'line';

    case 'Polygon':
    case 'MultiPolygon':
      return 'polygon';

    default:
      return null;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sYXllcnMvZ2VvanNvbi1sYXllci9nZW9qc29uLXV0aWxzLmpzIl0sIm5hbWVzIjpbImdldEdlb2pzb25EYXRhTWFwcyIsImFsbERhdGEiLCJnZXRGZWF0dXJlIiwiYWNjZXB0YWJsZVR5cGVzIiwiZGF0YVRvRmVhdHVyZSIsImZvckVhY2giLCJkIiwiaW5kZXgiLCJyYXdGZWF0dXJlIiwiZmVhdHVyZSIsIkFycmF5IiwiaXNBcnJheSIsInR5cGUiLCJnZW9tZXRyeSIsImNvb3JkaW5hdGVzIiwibWFwIiwicHRzIiwicGFyc2VHZW9tZXRyeUZyb21TdHJpbmciLCJub3JtYWxpemVkIiwiZmVhdHVyZXMiLCJpbmNsdWRlcyIsInByb3BlcnRpZXMiLCJnZW9TdHJpbmciLCJwYXJzZWRHZW8iLCJKU09OIiwicGFyc2UiLCJlIiwiZ2V0R2VvanNvbkJvdW5kcyIsInNhbXBsZXMiLCJsZW5ndGgiLCJub25FbXB0eSIsImZpbHRlciIsImZlYXR1cmVUb0RlY2tHbEdlb1R5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVFBOzs7Ozs7QUFNTyxTQUFTQSxrQkFBVCxDQUE0QkMsT0FBNUIsRUFBcUNDLFVBQXJDLEVBQWlEO0FBQ3RELE1BQU1DLGVBQWUsR0FBRyxDQUN0QixPQURzQixFQUV0QixZQUZzQixFQUd0QixZQUhzQixFQUl0QixpQkFKc0IsRUFLdEIsU0FMc0IsRUFNdEIsY0FOc0IsRUFPdEIsb0JBUHNCLENBQXhCO0FBVUEsTUFBTUMsYUFBYSxHQUFHLEVBQXRCO0FBRUFILEVBQUFBLE9BQU8sQ0FBQ0ksT0FBUixDQUFnQixVQUFDQyxDQUFELEVBQUlDLEtBQUosRUFBYztBQUM1QkgsSUFBQUEsYUFB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Q0FBeEIsR0FBdURBLFFBRHpEO0FBR0EsTUFBTVcsUUFBUSxHQUFHRixPQUFPLENBQUNHLE1BQVIsQ0FDZixVQUFBekIsQ0FBQztBQUFBLFdBQ0NBLENBQUMsSUFBSUEsQ0FBQyxDQUFDTyxRQUFQLElBQW1CUCxDQUFDLENBQUNPLFFBQUYsQ0FBV0MsV0FBOUIsSUFBNkNSLENBQUMsQ0FBQ08sUUFBRixDQUFXQyxXQUFYLENBQXVCZSxNQURyRTtBQUFBLEdBRGMsQ0FBakI7O0FBS0EsTUFBSTtBQUNGLFdBQU8sK0JBQWM7QUFDbkJqQixNQUFBQSxJQUFJLEVBQUUsbUJBRGE7QUFFbkJPLE1BQUFBLFFBQVEsRUFBRVc7QUFGUyxLQUFkLENBQVA7QUFJRCxHQUxELENBS0UsT0FBT0osQ0FBUCxFQUFVO0FBQ1YsV0FBTyxJQUFQO0FBQ0Q7QUFDRjs7QUFFTSxTQUFTTSxzQkFBVCxDQUFnQ3BCLElBQWhDLEVBQXNDO0FBQzNDLFVBQVFBLElBQVI7QUFDRSxTQUFLLE9BQUw7QUFDQSxTQUFLLFlBQUw7QUFDRSxhQUFPLE9BQVA7O0FBRUYsU0FBSyxZQUFMO0FBQ0EsU0FBSyxpQkFBTDtBQUNFLGFBQU8sTUFBUDs7QUFFRixTQUFLLFNBQUw7QUFDQSxTQUFLLGNBQUw7QUFDRSxhQUFPLFNBQVA7O0FBRUY7QUFDRSxhQUFPLElBQVA7QUFkSjtBQWdCRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBnZW9qc29uRXh0ZW50IGZyb20gJ0BtYXBib3gvZ2VvanNvbi1leHRlbnQnO1xuaW1wb3J0IHdrdFBhcnNlciBmcm9tICd3ZWxsa25vd24nO1xuaW1wb3J0IG5vcm1hbGl6ZSBmcm9tICdAbWFwYm94L2dlb2pzb24tbm9ybWFsaXplJztcblxuaW1wb3J0IHtnZXRTYW1wbGVEYXRhfSBmcm9tICd1dGlscy9kYXRhLXV0aWxzJztcblxuLyoqXG4gKiBQYXJzZSByYXcgZGF0YSB0byBnZW9qc29uIGZlYXR1cmVcbiAqIEBwYXJhbSBhbGxEYXRhXG4gKiBAcGFyYW0gZ2V0RmVhdHVyZVxuICogQHJldHVybnMge3t9fVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R2VvanNvbkRhdGFNYXBzKGFsbERhdGEsIGdldEZlYXR1cmUpIHtcbiAgY29uc3QgYWNjZXB0YWJsZVR5cGVzID0gW1xuICAgICdQb2ludCcsXG4gICAgJ011bHRpUG9pbnQnLFxuICAgICdMaW5lU3RyaW5nJyxcbiAgICAnTXVsdGlMaW5lU3RyaW5nJyxcbiAgICAnUG9seWdvbicsXG4gICAgJ011bHRpUG9seWdvbicsXG4gICAgJ0dlb21ldHJ5Q29sbGVjdGlvbidcbiAgXTtcblxuICBjb25zdCBkYXRhVG9GZWF0dXJlID0ge307XG5cbiAgYWxsRGF0YS5mb3JFYWNoKChkLCBpbmRleCkgPT4ge1xuICAgIGRhdGFUb0ZlYXR1cmVbaW5kZXhdID0gbnVsbDtcbiAgICBjb25zdCByYXdGZWF0dXJlID0gZ2V0RmVhdHVyZShkKTtcblxuICAgIGxldCBmZWF0dXJlID0gbnVsbDtcblxuICAgIC8vIHBhcnNlIGZlYXR1cmUgZnJvbSBmaWVsZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHJhd0ZlYXR1cmUpKSB7XG4gICAgICAvLyBTdXBwb3J0IGdlb2pzb24gYXMgYW4gYXJyYXkgb2YgcG9pbnRzXG4gICAgICBmZWF0dXJlID0ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICAgIGdlb21ldHJ5OiB7XG4gICAgICAgICAgLy8gd2h5IGRvIHdlIG5lZWQgdG8gZmxpcCBpdC4uLlxuICAgICAgICAgIGNvb3JkaW5hdGVzOiByYXdGZWF0dXJlLm1hcChwdHMgPT4gW3B0c1sxXSwgcHRzWzBdXSksXG4gICAgICAgICAgdHlwZTogJ0xpbmVTdHJpbmcnXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmF3RmVhdHVyZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZlYXR1cmUgPSBwYXJzZUdlb21ldHJ5RnJvbVN0cmluZyhyYXdGZWF0dXJlKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByYXdGZWF0dXJlID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gU3VwcG9ydCBnZW9qc29uIGZlYXR1cmUgYXMgb2JqZWN0XG4gICAgICAvLyBwcm9iYWJseSBuZWVkIHRvIG5vcm1hbGl6ZSBpdCBhcyB3ZWxsXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplKHJhd0ZlYXR1cmUpO1xuICAgICAgaWYgKCFub3JtYWxpemVkIHx8ICFBcnJheS5pc0FycmF5KG5vcm1hbGl6ZWQuZmVhdHVyZXMpKSB7XG4gICAgICAgIC8vIGZhaWwgdG8gbm9ybWFsaXplIGdlb2pzb25cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGZlYXR1cmUgPSBub3JtYWxpemVkLmZlYXR1cmVzWzBdO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGZlYXR1cmUgJiZcbiAgICAgIGZlYXR1cmUuZ2VvbWV0cnkgJiZcbiAgICAgIGFjY2VwdGFibGVUeXBlcy5pbmNsdWRlcyhmZWF0dXJlLmdlb21ldHJ5LnR5cGUpXG4gICAgKSB7XG4gICAgICAvLyBzdG9yZSBpbmRleCBvZiB0aGUgZGF0YSBpbiBmZWF0dXJlIHByb3BlcnRpZXNcbiAgICAgIGZlYXR1cmUucHJvcGVydGllcyA9IHtcbiAgICAgICAgLi4uKGZlYXR1cmUucHJvcGVydGllcyB8fCB7fSksXG4gICAgICAgIGluZGV4XG4gICAgICB9O1xuXG4gICAgICBkYXRhVG9GZWF0dXJlW2luZGV4XSA9IGZlYXR1cmU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGF0YVRvRmVhdHVyZTtcbn1cblxuLyoqXG4gKiBQYXJzZSBnZW9qc29uIGZyb20gc3RyaW5nXG4gKiBAcGFyYW0ge1N0cmluZ30gZ2VvU3RyaW5nXG4gKiBAcmV0dXJucyB7bnVsbCB8IE9iamVjdH0gZ2VvanNvbiBvYmplY3Qgb3IgbnVsbCBpZiBmYWlsZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR2VvbWV0cnlGcm9tU3RyaW5nKGdlb1N0cmluZykge1xuICBsZXQgcGFyc2VkR2VvO1xuXG4gIC8vIHRyeSBwYXJzZSBhcyBnZW9qc29uIHN0cmluZ1xuICAvLyB7XCJ0eXBlXCI6XCJQb2x5Z29uXCIsXCJjb29yZGluYXRlc1wiOltbWy03NC4xNTg0OTEsNDAuODM1OTRdXV19XG4gIHRyeSB7XG4gICAgcGFyc2VkR2VvID0gSlNPTi5wYXJzZShnZW9TdHJpbmcpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8ga2VlcCB0cnlpbmcgdG8gcGFyc2VcbiAgfVxuXG4gIC8vIHRyeSBwYXJzZSBhcyB3a3RcbiAgaWYgKCFwYXJzZWRHZW8pIHtcbiAgICB0cnkge1xuICAgICAgcGFyc2VkR2VvID0gd2t0UGFyc2VyKGdlb1N0cmluZyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFwYXJzZWRHZW8pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemUocGFyc2VkR2VvKTtcblxuICBpZiAoIW5vcm1hbGl6ZWQgfHwgIUFycmF5LmlzQXJyYXkobm9ybWFsaXplZC5mZWF0dXJlcykpIHtcbiAgICAvLyBmYWlsIHRvIG5vcm1hbGl6ZSBnZW9qc29uXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplZC5mZWF0dXJlc1swXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEdlb2pzb25Cb3VuZHMoZmVhdHVyZXMgPSBbXSkge1xuICAvLyBjYWxjdWxhdGUgZmVhdHVyZSBib3VuZHMgaXMgY29tcHV0YXRpb24gaGVhdnlcbiAgLy8gaGVyZSB3ZSBvbmx5IHBpY2sgY291cGxlXG4gIGNvbnN0IHNhbXBsZXMgPVxuICAgIGZlYXR1cmVzLmxlbmd0aCA+IDUwMCA/IGdldFNhbXBsZURhdGEoZmVhdHVyZXMsIDUwMCkgOiBmZWF0dXJlcztcblxuICBjb25zdCBub25FbXB0eSA9IHNhbXBsZXMuZmlsdGVyKFxuICAgIGQgPT5cbiAgICAgIGQgJiYgZC5nZW9tZXRyeSAmJiBkLmdlb21ldHJ5LmNvb3JkaW5hdGVzICYmIGQuZ2VvbWV0cnkuY29vcmRpbmF0ZXMubGVuZ3RoXG4gICk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gZ2VvanNvbkV4dGVudCh7XG4gICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgZmVhdHVyZXM6IG5vbkVtcHR5XG4gICAgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmVhdHVyZVRvRGVja0dsR2VvVHlwZSh0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ1BvaW50JzpcbiAgICBjYXNlICdNdWx0aVBvaW50JzpcbiAgICAgIHJldHVybiAncG9pbnQnO1xuXG4gICAgY2FzZSAnTGluZVN0cmluZyc6XG4gICAgY2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcbiAgICAgIHJldHVybiAnbGluZSc7XG5cbiAgICBjYXNlICdQb2x5Z29uJzpcbiAgICBjYXNlICdNdWx0aVBvbHlnb24nOlxuICAgICAgcmV0dXJuICdwb2x5Z29uJztcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19