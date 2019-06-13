"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injector = injector;
exports.withState = withState;
exports.errorMsg = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _window = require("global/window");

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
var MissingComp = function MissingComp() {
  return _react["default"].createElement("div", null);
};

var errorMsg = {
  noDep: function noDep(fac, parent) {
    return "".concat(fac.name, " is required as a dependency of ").concat(parent.name, ", ") + "but is not provided to injectComponents. It will not be rendered";
  },
  notFunc: '`factory and its replacement should be a function`'
};
exports.errorMsg = errorMsg;

function injector() {
  var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var cache = new Map(); // map<factory, factory -> ?>

  var get = function get(fac, parent) {
    var factory = map.get(fac); // factory is not injected

    if (!factory) {
      _window.console.error(errorMsg.noDep(fac, parent));

      return MissingComp;
    }

    var instances = cache.get(factory) || factory.apply(void 0, (0, _toConsumableArray2["default"])(factory.deps ? factory.deps.map(function (dep) {
      return get(dep, factory);
    }) : []));
    cache.set(fac, instances);
    return instances;
  }; // if you have two functions that happen to have the exactly same text
  // it will be override: 2018-02-05


  return {
    provide: function provide(factory, replacement) {
      if (typeof factory !== 'function') {
        _window.console.error('Error injecting factory: ', factory);

        _window.console.error(errorMsg.notFunc);

        return injector(map);
      } else if (typeof replacement !== 'function') {
        _window.console.error('Error injecting replacement for: ', factory);

        _window.console.error(errorMsg.notFunc);

        return injector(map);
      }

      return injector(new Map(map).set(factory, replacement));
    },
    get: get
  };
}

var identity = function identity(state) {
  return state;
}; // Helper to add reducer state to custom component


function withState(lenses) {
  var mapStateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;
  var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return function (Component) {
    var WrappedComponent = function WrappedComponent(_ref, _ref2) {
      var state = _ref.state,
          props = (0, _objectWithoutProperties2["default"])(_ref, ["state"]);
      var selector = _ref2.selector,
          id = _ref2.id;
      return _react["default"].createElement(Component, lenses.reduce(function (totalState, lens) {
        return (0, _objectSpread3["default"])({}, totalState, lens(selector(state)));
      }, props));
    };

    WrappedComponent.contextTypes = {
      selector: _propTypes["default"].func,
      id: _propTypes["default"].string
    };
    return (0, _reactRedux.connect)(function (state) {
      return (0, _objectSpread3["default"])({}, mapStateToProps(state), {
        state: state
      });
    }, function (dispatch) {
      return Object.keys(actions).reduce(function (accu, key) {
        return (0, _objectSpread3["default"])({}, accu, (0, _defineProperty2["default"])({}, key, (0, _redux.bindActionCreators)(actions[key], dispatch)));
      }, {});
    })(WrappedComponent);
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2luamVjdG9yLmpzIl0sIm5hbWVzIjpbIk1pc3NpbmdDb21wIiwiZXJyb3JNc2ciLCJub0RlcCIsImZhYyIsInBhcmVudCIsIm5hbWUiLCJub3RGdW5jIiwiaW5qZWN0b3IiLCJtYXAiLCJNYXAiLCJjYWNoZSIsImdldCIsImZhY3RvcnkiLCJDb25zb2xlIiwiZXJyb3IiLCJpbnN0YW5jZXMiLCJkZXBzIiwiZGVwIiwic2V0IiwicHJvdmlkZSIsInJlcGxhY2VtZW50IiwiaWRlbnRpdHkiLCJzdGF0ZSIsIndpdGhTdGF0ZSIsImxlbnNlcyIsIm1hcFN0YXRlVG9Qcm9wcyIsImFjdGlvbnMiLCJDb21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwicHJvcHMiLCJzZWxlY3RvciIsImlkIiwicmVkdWNlIiwidG90YWxTdGF0ZSIsImxlbnMiLCJjb250ZXh0VHlwZXMiLCJQcm9wVHlwZXMiLCJmdW5jIiwic3RyaW5nIiwiZGlzcGF0Y2giLCJPYmplY3QiLCJrZXlzIiwiYWNjdSIsImtleSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQSxJQUFNQSxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLFNBQU0sNENBQU47QUFBQSxDQUFwQjs7QUFDTyxJQUFNQyxRQUFRLEdBQUc7QUFDdEJDLEVBQUFBLEtBQUssRUFBRSxlQUFDQyxHQUFELEVBQU1DLE1BQU47QUFBQSxXQUNMLFVBQUdELEdBQUcsQ0FBQ0UsSUFBUCw2Q0FBOENELE1BQU0sQ0FBQ0MsSUFBckQsNEVBREs7QUFBQSxHQURlO0FBSXRCQyxFQUFBQSxPQUFPLEVBQUU7QUFKYSxDQUFqQjs7O0FBT0EsU0FBU0MsUUFBVCxH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RUFBRUssc0JBQVVFO0FBRmdCLEtBQWhDO0FBSUEsV0FBTyx5QkFDTCxVQUFBaEIsS0FBSztBQUFBLGdEQUFTRyxlQUFlLENBQUNILEtBQUQsQ0FBeEI7QUFBaUNBLFFBQUFBLEtBQUssRUFBTEE7QUFBakM7QUFBQSxLQURBLEVBRUwsVUFBQWlCLFFBQVE7QUFBQSxhQUFJQyxNQUFNLENBQUNDLElBQVAsQ0FBWWYsT0FBWixFQUFxQk0sTUFBckIsQ0FBNEIsVUFBQ1UsSUFBRCxFQUFPQyxHQUFQO0FBQUEsa0RBQ25DRCxJQURtQyx1Q0FFckNDLEdBRnFDLEVBRS9CLCtCQUFtQmpCLE9BQU8sQ0FBQ2lCLEdBQUQsQ0FBMUIsRUFBaUNKLFFBQWpDLENBRitCO0FBQUEsT0FBNUIsRUFHUixFQUhRLENBQUo7QUFBQSxLQUZILEVBTUxYLGdCQU5LLENBQVA7QUFPRCxHQXZCRDtBQXdCRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2Nvbm5lY3R9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7YmluZEFjdGlvbkNyZWF0b3JzfSBmcm9tICdyZWR1eCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuXG5jb25zdCBNaXNzaW5nQ29tcCA9ICgpID0+IDxkaXYgLz47XG5leHBvcnQgY29uc3QgZXJyb3JNc2cgPSB7XG4gIG5vRGVwOiAoZmFjLCBwYXJlbnQpID0+XG4gICAgYCR7ZmFjLm5hbWV9IGlzIHJlcXVpcmVkIGFzIGEgZGVwZW5kZW5jeSBvZiAke3BhcmVudC5uYW1lfSwgYCArXG4gICAgYGJ1dCBpcyBub3QgcHJvdmlkZWQgdG8gaW5qZWN0Q29tcG9uZW50cy4gSXQgd2lsbCBub3QgYmUgcmVuZGVyZWRgLFxuICBub3RGdW5jOiAnYGZhY3RvcnkgYW5kIGl0cyByZXBsYWNlbWVudCBzaG91bGQgYmUgYSBmdW5jdGlvbmAnXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5qZWN0b3IobWFwID0gbmV3IE1hcCgpKSB7XG4gIGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpOyAvLyBtYXA8ZmFjdG9yeSwgZmFjdG9yeSAtPiA/PlxuICBjb25zdCBnZXQgPSAoZmFjLCBwYXJlbnQpID0+IHtcbiAgICBjb25zdCBmYWN0b3J5ID0gbWFwLmdldChmYWMpO1xuXG4gICAgLy8gZmFjdG9yeSBpcyBub3QgaW5qZWN0ZWRcbiAgICBpZiAoIWZhY3RvcnkpIHtcbiAgICAgIENvbnNvbGUuZXJyb3IoZXJyb3JNc2cubm9EZXAoZmFjLCBwYXJlbnQpKTtcbiAgICAgIHJldHVybiBNaXNzaW5nQ29tcDtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZXMgPVxuICAgICAgY2FjaGUuZ2V0KGZhY3RvcnkpIHx8XG4gICAgICBmYWN0b3J5KFxuICAgICAgICAuLi4oZmFjdG9yeS5kZXBzID8gZmFjdG9yeS5kZXBzLm1hcChkZXAgPT4gZ2V0KGRlcCwgZmFjdG9yeSkpIDogW10pXG4gICAgICApO1xuXG4gICAgY2FjaGUuc2V0KGZhYywgaW5zdGFuY2VzKTtcbiAgICByZXR1cm4gaW5zdGFuY2VzO1xuICB9O1xuXG4gIC8vIGlmIHlvdSBoYXZlIHR3byBmdW5jdGlvbnMgdGhhdCBoYXBwZW4gdG8gaGF2ZSB0aGUgZXhhY3RseSBzYW1lIHRleHRcbiAgLy8gaXQgd2lsbCBiZSBvdmVycmlkZTogMjAxOC0wMi0wNVxuICByZXR1cm4ge1xuICAgIHByb3ZpZGU6IChmYWN0b3J5LCByZXBsYWNlbWVudCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBmYWN0b3J5ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIENvbnNvbGUuZXJyb3IoJ0Vycm9yIGluamVjdGluZyBmYWN0b3J5OiAnLCBmYWN0b3J5KTtcbiAgICAgICAgQ29uc29sZS5lcnJvcihlcnJvck1zZy5ub3RGdW5jKTtcbiAgICAgICAgcmV0dXJuIGluamVjdG9yKG1hcCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXBsYWNlbWVudCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBDb25zb2xlLmVycm9yKCdFcnJvciBpbmplY3RpbmcgcmVwbGFjZW1lbnQgZm9yOiAnLCBmYWN0b3J5KTtcbiAgICAgICAgQ29uc29sZS5lcnJvcihlcnJvck1zZy5ub3RGdW5jKTtcbiAgICAgICAgcmV0dXJuIGluamVjdG9yKG1hcCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbmplY3RvcigobmV3IE1hcChtYXApKS5zZXQoZmFjdG9yeSwgcmVwbGFjZW1lbnQpKTtcbiAgICB9LFxuICAgIGdldFxuICB9O1xufVxuXG5jb25zdCBpZGVudGl0eSA9IHN0YXRlID0+IChzdGF0ZSk7XG4vLyBIZWxwZXIgdG8gYWRkIHJlZHVjZXIgc3RhdGUgdG8gY3VzdG9tIGNvbXBvbmVudFxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhTdGF0ZShsZW5zZXMsIG1hcFN0YXRlVG9Qcm9wcyA9IGlkZW50aXR5LCBhY3Rpb25zID0ge30pIHtcbiAgcmV0dXJuIChDb21wb25lbnQpID0+IHtcbiAgICBjb25zdCBXcmFwcGVkQ29tcG9uZW50ID0gKHtzdGF0ZSwgLi4ucHJvcHN9LCB7c2VsZWN0b3IsIGlkfSkgPT4gKFxuICAgICAgPENvbXBvbmVudFxuICAgICAgICB7Li4ubGVuc2VzLnJlZHVjZShcbiAgICAgICAgICAodG90YWxTdGF0ZSwgbGVucykgPT4gKHtcbiAgICAgICAgICAgIC4uLnRvdGFsU3RhdGUsXG4gICAgICAgICAgICAuLi5sZW5zKHNlbGVjdG9yKHN0YXRlKSlcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBwcm9wc1xuICAgICAgICApfVxuICAgICAgLz5cbiAgICApO1xuICAgIFdyYXBwZWRDb21wb25lbnQuY29udGV4dFR5cGVzID0ge1xuICAgICAgc2VsZWN0b3I6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmdcbiAgICB9O1xuICAgIHJldHVybiBjb25uZWN0KFxuICAgICAgc3RhdGUgPT4gKHsuLi5tYXBTdGF0ZVRvUHJvcHMoc3RhdGUpLCBzdGF0ZX0pLFxuICAgICAgZGlzcGF0Y2ggPT4gT2JqZWN0LmtleXMoYWN0aW9ucykucmVkdWNlKChhY2N1LCBrZXkpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIFtrZXldOiBiaW5kQWN0aW9uQ3JlYXRvcnMoYWN0aW9uc1trZXldLCBkaXNwYXRjaClcbiAgICAgIH0pLCB7fSlcbiAgICApKFdyYXBwZWRDb21wb25lbnQpO1xuICB9XG59XG4iXX0=