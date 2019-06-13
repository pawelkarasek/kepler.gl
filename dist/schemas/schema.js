"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _window = require("global/window");

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
var Schema =
/*#__PURE__*/
function () {
  function Schema() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        version = _ref.version,
        key = _ref.key,
        properties = _ref.properties;

    (0, _classCallCheck2["default"])(this, Schema);
    this.version = version;
    this.properties = properties;
    this.key = key;
  }

  (0, _createClass2["default"])(Schema, [{
    key: "loadPropertiesOrApplySchema",
    value: function loadPropertiesOrApplySchema(node) {
      var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var accumulator = arguments.length > 2 ? arguments[2] : undefined;
      return this._getPropertyValueFromSchema('load', node, parents, accumulator);
    }
  }, {
    key: "savePropertiesOrApplySchema",
    value: function savePropertiesOrApplySchema(node) {
      var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var accumulator = arguments.length > 2 ? arguments[2] : undefined;
      return this._getPropertyValueFromSchema('save', node, parents, accumulator);
    }
  }, {
    key: "_getPropertyValueFromSchema",
    value: function _getPropertyValueFromSchema(operation, node) {
      var _this = this;

      var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var accumulator = arguments.length > 3 ? arguments[3] : undefined;
      var internal = "_".concat(operation);
      return (0, _defineProperty2["default"])({}, this.key, this.properties ? Object.keys(this.properties).reduce(function (accu, key) {
        return (0, _objectSpread2["default"])({}, accu, key in node ? _this.properties[key] ? // if it's another schema
        _this.properties[key][operation] ? // call save or load
        _this.properties[key][internal](node[key], [].concat((0, _toConsumableArray2["default"])(parents), [node]), accu) : {} : (0, _defineProperty2["default"])({}, key, node[key]) : {});
      }, {}) : node);
    }
  }, {
    key: "_isCurrentVersion",
    value: function _isCurrentVersion() {
      return this.version === _versions.CURRENT_VERSION;
    }
  }, {
    key: "outdatedVersionError",
    value: function outdatedVersionError() {
      if (!this._isCurrentVersion()) {
        _window.console.error("".concat(this.key, " ").concat(this.version, " is outdated. save should not be called anymore"));
      }
    }
  }, {
    key: "_save",
    value: function _save() {
      // make sure nothing is saved to an outdated version
      this.outdatedVersionError();
      return this.save.apply(this, arguments);
    }
  }, {
    key: "save",
    value: function save(node) {
      var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var accumulator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.savePropertiesOrApplySchema(node, parents, accumulator);
    }
  }, {
    key: "_load",
    value: function _load() {
      return this.load.apply(this, arguments);
    }
  }, {
    key: "load",
    value: function load(node) {
      var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var accumulator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.loadPropertiesOrApplySchema(node, parents, accumulator);
    }
  }]);
  return Schema;
}();

exports["default"] = Schema;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL3NjaGVtYS5qcyJdLCJuYW1lcyI6WyJTY2hlbWEiLCJ2ZXJzaW9uIiwia2V5IiwicHJvcGVydGllcyIsIm5vZGUiLCJwYXJlbnRzIiwiYWNjdW11bGF0b3IiLCJfZ2V0UHJvcGVydHlWYWx1ZUZyb21TY2hlbWEiLCJvcGVyYXRpb24iLCJpbnRlcm5hbCIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2N1IiwiQ1VSUkVOVF9WRVJTSU9OIiwiX2lzQ3VycmVudFZlcnNpb24iLCJDb25zb2xlIiwiZXJyb3IiLCJvdXRkYXRlZFZlcnNpb25FcnJvciIsInNhdmUiLCJzYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEiLCJsb2FkIiwibG9hZFByb3BlcnRpZXNPckFwcGx5U2NoZW1hIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUVBOztBQXRCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQU1xQkEsTTs7O0FBQ25CLG9CQUE2QztBQUFBLG1GQUFKLEVBQUk7QUFBQSxRQUFoQ0MsT0FBZ0MsUUFBaENBLE9BQWdDO0FBQUEsUUFBdkJDLEdBQXVCLFFBQXZCQSxHQUF1QjtBQUFBLFFBQWxCQyxVQUFrQixRQUFsQkEsVUFBa0I7O0FBQUE7QUFDM0MsU0FBS0YsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0UsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDRDs7OztnREFFMkJFLEksRUFBaUM7QUFBQSxVQUEzQkMsT0FBMkIsdUVBQWpCLEVBQWlCO0FBQUEsVUFBYkMsV0FBYTtBQUMzRCxhQUFPLEtBQUtDLDJCQUFMLENBQWlDLE1BQWpDLEVBQXlDSCxJQUF6QyxFQUErQ0MsT0FBL0MsRUFBd0RDLFdBQXhELENBQVA7QUFDRDs7O2dEQUUyQkYsSSxFQUFpQztBQUFBLFVBQTNCQyxPQUEyQix1RUFBakIsRUFBaUI7QUFBQSxVQUFiQyxXQUFhO0FBQzNELGFBQU8sS0FBS0MsMkJBQUwsQ0FBaUMsTUFBakMsRUFBeUNILElBQXpDLEVBQStDQyxPQUEvQyxFQUF3REMsV0FBeEQsQ0FBUDtBQUNEOzs7Z0RBRTJCRSxTLEVBQVdKLEksRUFBaUM7QUFBQTs7QUFBQSxVQUEzQkMsT0FBMkIsdUVBQWpCLEVBQWlCO0FBQUEsVUFBYkMsV0FBYTtBQUN0RSxVQUFNRyxRQUFRLGNBQU9ELFNBQVAsQ0FBZDtBQUNBLGtEQUNHLEtBQUtOLEdBRFIsRUFDYyxLQUFLQyxVQUFMLEdBQ1JPLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZLEtBQUtSLFVBQWpCLEVBQTZCUyxNQUE3QixDQUFvQyxVQUFDQyxJQUFELEVBQU9YLEdBQVAsRUFBZTtBQUNqRCxrREFDS1csSUFETCxFQUVNWCxHQUFHLElBQUlFLElBQVAsR0FDQSxLQUFJLENBQUNELFVBQUwsQ0FBZ0JELEdBQWhCLElBQ0U7QUFDQSxRQUFBLEtBQUksQ0FBQ0MsVUFBTCxDQUFnQkQsR0FBaEIsRUFBcUJNLFNBQXJCLElBQ0U7QUFDQSxRQUFBLEtBQUksQ0FBQ0wsVUFBTCxDQUFnQkQsR0FBaEIsRUFBcUJPLFFBQXJCLEVBQStCTCxJQUFJLENBQUNGLEdBQUQsQ0FBbkMsZ0RBQThDRyxPQUE5QyxJQUF1REQsSUFBdkQsSUFBOERTLElBQTlELENBRkYsR0FHRSxFQUxKLHdDQU1JWCxHQU5KLEVBTVVFLElBQUksQ0FBQ0YsR0FBRCxDQU5kLENBREEsR0FRQSxFQVZOO0FBWUQsT0FiRCxFQWFHLEVBYkgsQ0FEUSxHQWVSRSxJQWhCTjtBQWtCRDs7O3dDQUVtQjtBQUNsQixhQUFPLEtBQUtILE9BQUwsS0FBaUJhLHlCQUF4QjtBQUNEOzs7MkNBRXNCO0FBQ3JCLFVBQUksQ0FBQyxLQUFLQyxpQkFBTCxFQUFMLEVBQStCO0FBQzdCQyx3QkFBUUMsS0FBUixXQUNLLEtBQUtmLEdBRFYsY0FFSSxLQUFLRCxPQUZUO0FBS0Q7QUFDRjs7OzRCQUVjO0FBQ2I7QUFDQSxXQUFLaUIsb0JBQUw7QUFDQSxhQUFPLEtBQUtDLElBQUwsdUJBQVA7QUFDRDs7O3lCQUVJZixJLEVBQXNDO0FBQUEsVUFBaENDLE9BQWdDLHVFQUF0QixFQUFzQjtBQUFBLFVBQWxCQyxXQUFrQix1RUFBSixFQUFJO0FBQ3pDLGFBQU8sS0FBS2MsMkJBQUwsQ0FBaUNoQixJQUFqQyxFQUF1Q0MsT0FBdkMsRUFBZ0RDLFdBQWhELENBQVA7QUFDRDs7OzRCQUVjO0FBQ2IsYUFBTyxLQUFLZSxJQUFMLHVCQUFQO0FBQ0Q7Ozt5QkFFSWpCLEksRUFBc0M7QUFBQSxVQUFoQ0MsT0FBZ0MsdUVBQXRCLEVBQXNCO0FBQUEsVUFBbEJDLFdBQWtCLHVFQUFKLEVBQUk7QUFDekMsYUFBTyxLQUFLZ0IsMkJBQUwsQ0FBaUNsQixJQUFqQyxFQUF1Q0MsT0FBdkMsRUFBZ0RDLFdBQWhELENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7Y29uc29sZSBhcyBDb25zb2xlfSBmcm9tICdnbG9iYWwvd2luZG93JztcblxuaW1wb3J0IHtDVVJSRU5UX1ZFUlNJT059IGZyb20gJy4vdmVyc2lvbnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2hlbWEge1xuICBjb25zdHJ1Y3Rvcih7dmVyc2lvbiwga2V5LCBwcm9wZXJ0aWVzfSA9IHt9KSB7XG4gICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgIHRoaXMua2V5ID0ga2V5O1xuICB9XG5cbiAgbG9hZFByb3BlcnRpZXNPckFwcGx5U2NoZW1hKG5vZGUsIHBhcmVudHMgPSBbXSwgYWNjdW11bGF0b3IpIHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlWYWx1ZUZyb21TY2hlbWEoJ2xvYWQnLCBub2RlLCBwYXJlbnRzLCBhY2N1bXVsYXRvcik7XG4gIH1cblxuICBzYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEobm9kZSwgcGFyZW50cyA9IFtdLCBhY2N1bXVsYXRvcikge1xuICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eVZhbHVlRnJvbVNjaGVtYSgnc2F2ZScsIG5vZGUsIHBhcmVudHMsIGFjY3VtdWxhdG9yKTtcbiAgfVxuXG4gIF9nZXRQcm9wZXJ0eVZhbHVlRnJvbVNjaGVtYShvcGVyYXRpb24sIG5vZGUsIHBhcmVudHMgPSBbXSwgYWNjdW11bGF0b3IpIHtcbiAgICBjb25zdCBpbnRlcm5hbCA9IGBfJHtvcGVyYXRpb259YDtcbiAgICByZXR1cm4ge1xuICAgICAgW3RoaXMua2V5XTogdGhpcy5wcm9wZXJ0aWVzXG4gICAgICAgID8gT2JqZWN0LmtleXModGhpcy5wcm9wZXJ0aWVzKS5yZWR1Y2UoKGFjY3UsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgICAgICAgLi4uKGtleSBpbiBub2RlXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BlcnRpZXNba2V5XVxuICAgICAgICAgICAgICAgICAgPyAvLyBpZiBpdCdzIGFub3RoZXIgc2NoZW1hXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1trZXldW29wZXJhdGlvbl1cbiAgICAgICAgICAgICAgICAgICAgPyAvLyBjYWxsIHNhdmUgb3IgbG9hZFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGVydGllc1trZXldW2ludGVybmFsXShub2RlW2tleV0sIFsuLi5wYXJlbnRzLCBub2RlXSwgYWNjdSlcbiAgICAgICAgICAgICAgICAgICAgOiB7fVxuICAgICAgICAgICAgICAgICAgOiB7W2tleV06IG5vZGVba2V5XX1cbiAgICAgICAgICAgICAgICA6IHt9KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LCB7fSlcbiAgICAgICAgOiBub2RlXG4gICAgfTtcbiAgfVxuXG4gIF9pc0N1cnJlbnRWZXJzaW9uKCkge1xuICAgIHJldHVybiB0aGlzLnZlcnNpb24gPT09IENVUlJFTlRfVkVSU0lPTjtcbiAgfVxuXG4gIG91dGRhdGVkVmVyc2lvbkVycm9yKCkge1xuICAgIGlmICghdGhpcy5faXNDdXJyZW50VmVyc2lvbigpKSB7XG4gICAgICBDb25zb2xlLmVycm9yKFxuICAgICAgICBgJHt0aGlzLmtleX0gJHtcbiAgICAgICAgICB0aGlzLnZlcnNpb25cbiAgICAgICAgfSBpcyBvdXRkYXRlZC4gc2F2ZSBzaG91bGQgbm90IGJlIGNhbGxlZCBhbnltb3JlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBfc2F2ZSguLi5hcmdzKSB7XG4gICAgLy8gbWFrZSBzdXJlIG5vdGhpbmcgaXMgc2F2ZWQgdG8gYW4gb3V0ZGF0ZWQgdmVyc2lvblxuICAgIHRoaXMub3V0ZGF0ZWRWZXJzaW9uRXJyb3IoKTtcbiAgICByZXR1cm4gdGhpcy5zYXZlKC4uLmFyZ3MpO1xuICB9XG5cbiAgc2F2ZShub2RlLCBwYXJlbnRzID0gW10sIGFjY3VtdWxhdG9yID0ge30pIHtcbiAgICByZXR1cm4gdGhpcy5zYXZlUHJvcGVydGllc09yQXBwbHlTY2hlbWEobm9kZSwgcGFyZW50cywgYWNjdW11bGF0b3IpO1xuICB9XG5cbiAgX2xvYWQoLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLmxvYWQoLi4uYXJncyk7XG4gIH1cblxuICBsb2FkKG5vZGUsIHBhcmVudHMgPSBbXSwgYWNjdW11bGF0b3IgPSB7fSkge1xuICAgIHJldHVybiB0aGlzLmxvYWRQcm9wZXJ0aWVzT3JBcHBseVNjaGVtYShub2RlLCBwYXJlbnRzLCBhY2N1bXVsYXRvcik7XG4gIH1cbn1cbiJdfQ==