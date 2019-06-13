"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewDataEntry = createNewDataEntry;
exports.removeSuffixAndDelimiters = removeSuffixAndDelimiters;
exports.findPointFieldPairs = findPointFieldPairs;
exports.datasetColorMaker = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _colorUtils = require("./color-utils");

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _defaultSettings = require("../constants/default-settings");

var _utils = require("./utils");

var _dataProcessor = require("../processors/data-processor");

var _marked =
/*#__PURE__*/
_regenerator["default"].mark(generateColor);

// apply a color for each dataset
// to use as label colors
var datasetColors = ['#8F2FBF', '#005CFF', '#C06C84', '#F8B195', '#547A82', '#3EACA8', '#A2D4AB'].map(_colorUtils.hexToRgb);
/**
 * Random color generator
 */

function generateColor() {
  var index;
  return _regenerator["default"].wrap(function generateColor$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!(index < datasetColors.length + 1)) {
            _context.next = 7;
            break;
          }

          if (index === datasetColors.length) {
            index = 0;
          }

          _context.next = 5;
          return datasetColors[index++];

        case 5:
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var datasetColorMaker = generateColor();
exports.datasetColorMaker = datasetColorMaker;

function getNewDatasetColor(datasets) {
  var presetColors = datasetColors.map(String);
  var usedColors = (0, _lodash["default"])(Object.values(datasets).map(function (d) {
    return String(d.color);
  })).filter(function (c) {
    return presetColors.includes(c);
  });

  if (usedColors.length === presetColors.length) {
    // if we already depleted the pool of color
    return datasetColorMaker.next().value;
  }

  var color = datasetColorMaker.next().value;

  while (usedColors.includes(String(color))) {
    color = datasetColorMaker.next().value;
  }

  return color;
}

function createNewDataEntry(_ref) {
  var _ref$info = _ref.info,
      info = _ref$info === void 0 ? {} : _ref$info,
      data = _ref.data;
  var datasets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var validatedData = (0, _dataProcessor.validateInputData)(data);

  if (!validatedData) {
    return {};
  }

  var allData = validatedData.rows;
  var datasetInfo = (0, _objectSpread2["default"])({
    id: (0, _utils.generateHashId)(4),
    label: 'new dataset'
  }, info);
  var dataId = datasetInfo.id; // add tableFieldIndex and id to fields
  // TODO: don't need id and name and tableFieldIndex anymore
  // Add value accessor instead

  var fields = validatedData.fields.map(function (f, i) {
    return (0, _objectSpread2["default"])({}, f, {
      id: f.name,
      tableFieldIndex: i + 1
    });
  });
  return (0, _defineProperty2["default"])({}, dataId, (0, _objectSpread2["default"])({}, datasetInfo, {
    color: datasetInfo.color || getNewDatasetColor(datasets),
    id: dataId,
    allData: allData,
    // TODO: no need to make a copy anymore, only save fieldedIndex
    data: allData.slice(),
    filteredIndex: allData.map(function (_, i) {
      return i;
    }),
    filteredIndexForDomain: allData.map(function (_, i) {
      return i;
    }),
    fieldPairs: findPointFieldPairs(fields),
    fields: fields
  }));
}

function removeSuffixAndDelimiters(layerName, suffix) {
  return layerName.replace(new RegExp(suffix, 'ig'), '').replace(/[_,.]+/g, ' ').trim();
}
/**
 * Find point fields pairs from fields
 *
 * @param {Array} fields
 * @returns {Array} found point fields
 */


function findPointFieldPairs(fields) {
  var allNames = fields.map(function (f) {
    return f.name.toLowerCase();
  }); // get list of all fields with matching suffixes

  return allNames.reduce(function (carry, fieldName, idx) {
    // This search for pairs will early exit if found.
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _defaultSettings.TRIP_POINT_FIELDS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var suffixPair = _step.value;

        // match first suffix```
        if (fieldName.endsWith(suffixPair[0])) {
          var _ret = function () {
            // match second suffix
            var otherPattern = new RegExp("".concat(suffixPair[0], "$"));
            var partner = fieldName.replace(otherPattern, suffixPair[1]);
            var partnerIdx = allNames.findIndex(function (d) {
              return d === partner;
            });

            if (partnerIdx > -1) {
              var defaultName = removeSuffixAndDelimiters(fieldName, suffixPair[0]);
              carry.push({
                defaultName: defaultName,
                pair: {
                  lat: {
                    fieldIdx: idx,
                    value: fields[idx].name
                  },
                  lng: {
                    fieldIdx: partnerIdx,
                    value: fields[partnerIdx].name
                  }
                },
                suffix: suffixPair
              });
              return {
                v: carry
              };
            }
          }();

          if ((0, _typeof2["default"])(_ret) === "object") return _ret.v;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return carry;
  }, []);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kYXRhc2V0LXV0aWxzLmpzIl0sIm5hbWVzIjpbImdlbmVyYXRlQ29sb3IiLCJkYXRhc2V0Q29sb3JzIiwibWFwIiwiaGV4VG9SZ2IiLCJpbmRleCIsImxlbmd0aCIsImRhdGFzZXRDb2xvck1ha2VyIiwiZ2V0TmV3RGF0YXNldENvbG9yIiwiZGF0YXNldHMiLCJwcmVzZXRDb2xvcnMiLCJTdHJpbmciLCJ1c2VkQ29sb3JzIiwiT2JqZWN0IiwidmFsdWVzIiwiZCIsImNvbG9yIiwiZmlsdGVyIiwiYyIsImluY2x1ZGVzIiwibmV4dCIsInZhbHVlIiwiY3JlYXRlTmV3RGF0YUVudHJ5IiwiaW5mbyIsImRhdGEiLCJ2YWxpZGF0ZWREYXRhIiwiYWxsRGF0YSIsInJvd3MiLCJkYXRhc2V0SW5mbyIsImlkIiwibGFiZWwiLCJkYXRhSWQiLCJmaWVsZHMiLCJmIiwiaSIsIm5hbWUiLCJ0YWJsZUZpZWxkSW5kZXgiLCJzbGljZSIsImZpbHRlcmVkSW5kZXgiLCJfIiwiZmlsdGVyZWRJbmRleEZvckRvbWFpbiIsImZpZWxkUGFpcnMiLCJmaW5kUG9pbnRGaWVsZFBhaXJzIiwicmVtb3ZlU3VmZml4QW5kRGVsaW1pdGVycyIsImxheWVyTmFtZSIsInN1ZmZpeCIsInJlcGxhY2UiLCJSZWdFeHAiLCJ0cmltIiwiYWxsTmFtZXMiLCJ0b0xvd2VyQ2FzZSIsInJlZHVjZSIsImNhcnJ5IiwiZmllbGROYW1lIiwiaWR4IiwiVFJJUF9QT0lOVF9GSUVMRFMiLCJzdWZmaXhQYWlyIiwiZW5kc1dpdGgiLCJvdGhlclBhdHRlcm4iLCJwYXJ0bmVyIiwicGFydG5lcklkeCIsImZpbmRJbmRleCIsImRlZmF1bHROYW1lIiwicHVzaCIsInBhaXIiLCJsYXQiLCJmaWVsZElkeCIsImxuZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7NkJBZ0JVQSxhOztBQWZWO0FBQ0E7QUFDQSxJ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QUFBUDtBQUNEO0FBM0JvQzs7QUFBQTtBQTRCdEM7QUFDRjtBQWpDK0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQ2hELFdBQU9BLEtBQVA7QUFDRCxHQW5DTSxFQW1DSixFQW5DSSxDQUFQO0FBb0NEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHtoZXhUb1JnYn0gZnJvbSAnLi9jb2xvci11dGlscyc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5pbXBvcnQge1RSSVBfUE9JTlRfRklFTERTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5pbXBvcnQge2dlbmVyYXRlSGFzaElkfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7dmFsaWRhdGVJbnB1dERhdGF9IGZyb20gJ3Byb2Nlc3NvcnMvZGF0YS1wcm9jZXNzb3InO1xuLy8gYXBwbHkgYSBjb2xvciBmb3IgZWFjaCBkYXRhc2V0XG4vLyB0byB1c2UgYXMgbGFiZWwgY29sb3JzXG5jb25zdCBkYXRhc2V0Q29sb3JzID0gW1xuICAnIzhGMkZCRicsXG4gICcjMDA1Q0ZGJyxcbiAgJyNDMDZDODQnLFxuICAnI0Y4QjE5NScsXG4gICcjNTQ3QTgyJyxcbiAgJyMzRUFDQTgnLFxuICAnI0EyRDRBQidcbl0ubWFwKGhleFRvUmdiKTtcblxuLyoqXG4gKiBSYW5kb20gY29sb3IgZ2VuZXJhdG9yXG4gKi9cbmZ1bmN0aW9uKiBnZW5lcmF0ZUNvbG9yKCkge1xuICBsZXQgaW5kZXggPSAwO1xuICB3aGlsZSAoaW5kZXggPCBkYXRhc2V0Q29sb3JzLmxlbmd0aCArIDEpIHtcbiAgICBpZiAoaW5kZXggPT09IGRhdGFzZXRDb2xvcnMubGVuZ3RoKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfVxuICAgIHlpZWxkIGRhdGFzZXRDb2xvcnNbaW5kZXgrK107XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRhdGFzZXRDb2xvck1ha2VyID0gZ2VuZXJhdGVDb2xvcigpO1xuXG5mdW5jdGlvbiBnZXROZXdEYXRhc2V0Q29sb3IoZGF0YXNldHMpIHtcbiAgY29uc3QgcHJlc2V0Q29sb3JzID0gZGF0YXNldENvbG9ycy5tYXAoU3RyaW5nKTtcbiAgY29uc3QgdXNlZENvbG9ycyA9IHVuaXEoXG4gICAgT2JqZWN0LnZhbHVlcyhkYXRhc2V0cykubWFwKGQgPT4gU3RyaW5nKGQuY29sb3IpKVxuICApLmZpbHRlcihjID0+IHByZXNldENvbG9ycy5pbmNsdWRlcyhjKSk7XG5cbiAgaWYgKHVzZWRDb2xvcnMubGVuZ3RoID09PSBwcmVzZXRDb2xvcnMubGVuZ3RoKSB7XG4gICAgLy8gaWYgd2UgYWxyZWFkeSBkZXBsZXRlZCB0aGUgcG9vbCBvZiBjb2xvclxuICAgIHJldHVybiBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIH1cblxuICBsZXQgY29sb3IgPSBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIHdoaWxlICh1c2VkQ29sb3JzLmluY2x1ZGVzKFN0cmluZyhjb2xvcikpKSB7XG4gICAgY29sb3IgPSBkYXRhc2V0Q29sb3JNYWtlci5uZXh0KCkudmFsdWU7XG4gIH1cblxuICByZXR1cm4gY29sb3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZXdEYXRhRW50cnkoe2luZm8gPSB7fSwgZGF0YX0sIGRhdGFzZXRzID0ge30pIHtcbiAgY29uc3QgdmFsaWRhdGVkRGF0YSA9IHZhbGlkYXRlSW5wdXREYXRhKGRhdGEpO1xuICBpZiAoIXZhbGlkYXRlZERhdGEpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBjb25zdCBhbGxEYXRhID0gdmFsaWRhdGVkRGF0YS5yb3dzO1xuICBjb25zdCBkYXRhc2V0SW5mbyA9IHtcbiAgICBpZDogZ2VuZXJhdGVIYXNoSWQoNCksXG4gICAgbGFiZWw6ICduZXcgZGF0YXNldCcsXG4gICAgLi4uaW5mb1xuICB9O1xuICBjb25zdCBkYXRhSWQgPSBkYXRhc2V0SW5mby5pZDtcblxuICAvLyBhZGQgdGFibGVGaWVsZEluZGV4IGFuZCBpZCB0byBmaWVsZHNcbiAgLy8gVE9ETzogZG9uJ3QgbmVlZCBpZCBhbmQgbmFtZSBhbmQgdGFibGVGaWVsZEluZGV4IGFueW1vcmVcbiAgLy8gQWRkIHZhbHVlIGFjY2Vzc29yIGluc3RlYWRcbiAgY29uc3QgZmllbGRzID0gdmFsaWRhdGVkRGF0YS5maWVsZHMubWFwKChmLCBpKSA9PiAoe1xuICAgIC4uLmYsXG4gICAgaWQ6IGYubmFtZSxcbiAgICB0YWJsZUZpZWxkSW5kZXg6IGkgKyAxXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIFtkYXRhSWRdOiB7XG4gICAgICAuLi5kYXRhc2V0SW5mbyxcbiAgICAgIGNvbG9yOiBkYXRhc2V0SW5mby5jb2xvciB8fCBnZXROZXdEYXRhc2V0Q29sb3IoZGF0YXNldHMpLFxuICAgICAgaWQ6IGRhdGFJZCxcbiAgICAgIGFsbERhdGEsXG4gICAgICAvLyBUT0RPOiBubyBuZWVkIHRvIG1ha2UgYSBjb3B5IGFueW1vcmUsIG9ubHkgc2F2ZSBmaWVsZGVkSW5kZXhcbiAgICAgIGRhdGE6IGFsbERhdGEuc2xpY2UoKSxcbiAgICAgIGZpbHRlcmVkSW5kZXg6IGFsbERhdGEubWFwKChfLCBpKSA9PiBpKSxcbiAgICAgIGZpbHRlcmVkSW5kZXhGb3JEb21haW46IGFsbERhdGEubWFwKChfLCBpKSA9PiBpKSxcbiAgICAgIGZpZWxkUGFpcnM6IGZpbmRQb2ludEZpZWxkUGFpcnMoZmllbGRzKSxcbiAgICAgIGZpZWxkc1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVN1ZmZpeEFuZERlbGltaXRlcnMobGF5ZXJOYW1lLCBzdWZmaXgpIHtcbiAgcmV0dXJuIGxheWVyTmFtZVxuICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoc3VmZml4LCAnaWcnKSwgJycpXG4gICAgLnJlcGxhY2UoL1tfLC5dKy9nLCAnICcpXG4gICAgLnRyaW0oKTtcbn1cblxuLyoqXG4gKiBGaW5kIHBvaW50IGZpZWxkcyBwYWlycyBmcm9tIGZpZWxkc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGZpZWxkc1xuICogQHJldHVybnMge0FycmF5fSBmb3VuZCBwb2ludCBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQb2ludEZpZWxkUGFpcnMoZmllbGRzKSB7XG4gIGNvbnN0IGFsbE5hbWVzID0gZmllbGRzLm1hcChmID0+IGYubmFtZS50b0xvd2VyQ2FzZSgpKTtcblxuICAvLyBnZXQgbGlzdCBvZiBhbGwgZmllbGRzIHdpdGggbWF0Y2hpbmcgc3VmZml4ZXNcbiAgcmV0dXJuIGFsbE5hbWVzLnJlZHVjZSgoY2FycnksIGZpZWxkTmFtZSwgaWR4KSA9PiB7XG4gICAgLy8gVGhpcyBzZWFyY2ggZm9yIHBhaXJzIHdpbGwgZWFybHkgZXhpdCBpZiBmb3VuZC5cbiAgICBmb3IgKGNvbnN0IHN1ZmZpeFBhaXIgb2YgVFJJUF9QT0lOVF9GSUVMRFMpIHtcbiAgICAgIC8vIG1hdGNoIGZpcnN0IHN1ZmZpeGBgYFxuICAgICAgaWYgKGZpZWxkTmFtZS5lbmRzV2l0aChzdWZmaXhQYWlyWzBdKSkge1xuICAgICAgICAvLyBtYXRjaCBzZWNvbmQgc3VmZml4XG4gICAgICAgIGNvbnN0IG90aGVyUGF0dGVybiA9IG5ldyBSZWdFeHAoYCR7c3VmZml4UGFpclswXX1cXCRgKTtcbiAgICAgICAgY29uc3QgcGFydG5lciA9IGZpZWxkTmFtZS5yZXBsYWNlKG90aGVyUGF0dGVybiwgc3VmZml4UGFpclsxXSk7XG5cbiAgICAgICAgY29uc3QgcGFydG5lcklkeCA9IGFsbE5hbWVzLmZpbmRJbmRleChkID0+IGQgPT09IHBhcnRuZXIpO1xuICAgICAgICBpZiAocGFydG5lcklkeCA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdE5hbWUgPSByZW1vdmVTdWZmaXhBbmREZWxpbWl0ZXJzKFxuICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgc3VmZml4UGFpclswXVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjYXJyeS5wdXNoKHtcbiAgICAgICAgICAgIGRlZmF1bHROYW1lLFxuICAgICAgICAgICAgcGFpcjoge1xuICAgICAgICAgICAgICBsYXQ6IHtcbiAgICAgICAgICAgICAgICBmaWVsZElkeDogaWR4LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZHNbaWR4XS5uYW1lXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxuZzoge1xuICAgICAgICAgICAgICAgIGZpZWxkSWR4OiBwYXJ0bmVySWR4LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBmaWVsZHNbcGFydG5lcklkeF0ubmFtZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VmZml4OiBzdWZmaXhQYWlyXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGNhcnJ5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjYXJyeTtcbiAgfSwgW10pO1xufVxuIl19