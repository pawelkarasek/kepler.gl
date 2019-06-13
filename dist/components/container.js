"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerFactory = ContainerFactory;
exports.injectComponents = injectComponents;
exports["default"] = exports.appInjector = exports.errorMsg = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _lodash = _interopRequireDefault(require("lodash.memoize"));

var _window = require("global/window");

var _injector = require("./injector");

var _keplerGl = _interopRequireDefault(require("./kepler-gl"));

var _actionWrapper = require("../actions/action-wrapper");

var _identityActions = require("../actions/identity-actions");

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
var errorMsg = {
  noState: "kepler.gl state doesnt exist. " + "You might forget to mount keplerGlReducer in your root reducer." + "If it is not mounted as state.keplerGl by default, you need to provide getState as a prop",
  wrongType: function wrongType(type) {
    return "injectComponents takes an array of factories replacement pairs as input, " + "".concat(type, " is provided");
  },
  wrongPairType: "injectComponents takes an array of factories replacement pairs as input, " + "each pair be a array as [originalFactory, replacement]"
};
exports.errorMsg = errorMsg;
ContainerFactory.deps = [_keplerGl["default"]];

function ContainerFactory(KeplerGl) {
  /** @lends KeplerGl */

  /**
    * Main Kepler.gl Component
    * @param {Object} props
    *
    * @param {string} props.id - _required_
    *
    * - Default: `map`
    * The id of this KeplerGl instance. `id` is required if you have multiple
    * KeplerGl instances in your app. It defines the prop name of the KeplerGl state that is
    * stored in the KeplerGl reducer. For example, the state of the KeplerGl component with id `foo` is
    * stored in `state.keplerGl.foo`.
    *
    * In case you create multiple kepler.gl instances using the same id, the kepler.gl state defined by the entry will be
    * overridden by the latest instance and reset to a blank state.
    * @param {string} props.mapboxApiAccessToken - _required_
     * You can create a free account at [www.mapbox.com](www.mapbox.com) and create a token at
    * [www.mapbox.com/account/access-tokens](www.mapbox.com/account/access-tokens)
    *
    *
    * @param {Number} props.width - _required_ Width of the KeplerGl UI.
    * @public
   */
  var Container =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(Container, _Component);

    // default id and address if not provided
    function Container(props, ctx) {
      var _this;

      (0, _classCallCheck2["default"])(this, Container);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Container).call(this, props, ctx));
      _this.getSelector = (0, _lodash["default"])(function (id, getState) {
        return function (state) {
          if (!getState(state)) {
            // log error
            _window.console.error(errorMsg.noState);

            return null;
          }

          return getState(state)[id];
        };
      });
      _this.getDispatch = (0, _lodash["default"])(function (id, dispatch) {
        return (0, _actionWrapper.forwardTo)(id, dispatch);
      });
      return _this;
    }

    (0, _createClass2["default"])(Container, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this$props = this.props,
            id = _this$props.id,
            mint = _this$props.mint,
            mapboxApiAccessToken = _this$props.mapboxApiAccessToken; // add a new entry to reducer

        this.props.dispatch((0, _identityActions.registerEntry)({
          id: id,
          mint: mint,
          mapboxApiAccessToken: mapboxApiAccessToken
        }));
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        // check if id has changed, if true, copy state over
        if (nextProps.id && nextProps.id !== this.props.id) {
          this.props.dispatch((0, _identityActions.renameEntry)(this.props.id, nextProps.id));
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.props.mint !== false) {
          // delete entry in reducer
          this.props.dispatch((0, _identityActions.deleteEntry)(this.props.id));
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            id = _this$props2.id,
            getState = _this$props2.getState,
            dispatch = _this$props2.dispatch,
            state = _this$props2.state;
        var selector = this.getSelector(id, getState);

        if (!selector || !selector(state)) {
          // instance state hasn't been mounted yet
          return _react["default"].createElement("div", null);
        }

        return _react["default"].createElement(KeplerGl, (0, _extends2["default"])({}, this.props, {
          id: id,
          selector: selector,
          dispatch: this.getDispatch(id, dispatch)
        }));
      }
    }]);
    return Container;
  }(_react.Component);

  (0, _defineProperty2["default"])(Container, "defaultProps", {
    id: 'map',
    getState: function getState(state) {
      return state.keplerGl;
    },
    mint: true
  });

  var mapStateToProps = function mapStateToProps(state, props) {
    return (0, _objectSpread2["default"])({
      state: state
    }, props);
  };

  var dispatchToProps = function dispatchToProps(dispatch) {
    return {
      dispatch: dispatch
    };
  };

  return (0, _reactRedux.connect)(mapStateToProps, dispatchToProps)(Container);
} // entryPoint


function flattenDeps(allDeps, factory) {
  var addToDeps = allDeps.concat([factory]);
  return Array.isArray(factory.deps) && factory.deps.length ? factory.deps.reduce(function (accu, dep) {
    return flattenDeps(accu, dep);
  }, addToDeps) : addToDeps;
}

var allDependencies = flattenDeps([], ContainerFactory); // provide all dependencies to appInjector

var appInjector = allDependencies.reduce(function (inj, factory) {
  return inj.provide(factory, factory);
}, (0, _injector.injector)()); // Helper to inject custom components and return kepler.gl container

exports.appInjector = appInjector;

function injectComponents(recipes) {
  if (!Array.isArray(recipes)) {
    _window.console.error(errorMsg.wrongType((0, _typeof2["default"])(recipes)));

    return appInjector.get(ContainerFactory);
  }

  return recipes.reduce(function (inj, recipe) {
    var _inj;

    if (!Array.isArray(recipes)) {
      _window.console.error(errorMsg.wrongPairType);

      return inj;
    } // collect dependencies of custom factories, if there is any.
    // Add them to the injector


    var customDependencies = flattenDeps([], recipe[1]);
    inj = customDependencies.reduce(function (ij, factory) {
      return ij.provide(factory, factory);
    }, inj);
    return (_inj = inj).provide.apply(_inj, (0, _toConsumableArray2["default"])(recipe));
  }, appInjector).get(ContainerFactory);
}

var InjectedContainer = appInjector.get(ContainerFactory);
var _default = InjectedContainer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NvbnRhaW5lci5qcyJdLCJuYW1lcyI6WyJlcnJvck1zZyIsIm5vU3RhdGUiLCJ3cm9uZ1R5cGUiLCJ0eXBlIiwid3JvbmdQYWlyVHlwZSIsIkNvbnRhaW5lckZhY3RvcnkiLCJkZXBzIiwiS2VwbGVyR2xGYWN0b3J5IiwiS2VwbGVyR2wiLCJDb250YWluZXIiLCJwcm9wcyIsImN0eCIsImdldFNlbGVjdG9yIiwiaWQiLCJnZXRTdGF0ZSIsInN0YXRlIiwiQ29uc29sZSIsImVycm9yIiwiZ2V0RGlzcGF0Y2giLCJkaXNwYXRjaCIsIm1pbnQiLCJtYXBib3hBcGlBY2Nlc3NUb2tlbiIsIm5leHRQcm9wcyIsInNlbGVjdG9yIiwiQ29tcG9uZW50Iiwia2VwbGVyR2wiLCJtYXBTdGF0ZVRvUHJvcHMiLCJkaXNwYXRjaFRvUHJvcHMiLCJmbGF0dGVuRGVwcyIsImFsbERlcHMiLCJmYWN0b3J5IiwiYWRkVG9EZXBzIiwiY29uY2F0IiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicmVkdWNlIiwiYWNjdSIsImRlcCIsImFsbERlcGVuZGVuY2llcyIsImFwcEluamVjdG9yIiwiaW5qIiwicHJvdmlkZSIsImluamVjdENvbXBvbmVudHMiLCJyZWNpcGVzIiwiZ2V0IiwicmVjaXBlIiwiY3VzdG9tRGVwZW5kZW5jaWVzIiwiaWoiLCJJbmplY3RlZENvbnRhaW5lciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOztBQTVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWdCTyxJQUFNQSxRQUFRLEdBQUc7QUFDdEJDLEVBQUFBLE9BQU8sRUFDTCxrTUFGb0I7QUFNdEJDLEVBQUFBLFNBQVMsRUFBRSxtQkFBQUMsSUFBSTtBQUFBLFdBQUksd0ZBQ2RBLElBRGMsaUJBQUo7QUFBQSxHQU5PO0FBU3RCQyxFQUFBQSxhQUFhLEVBQUU7QUFUTyxDQUFqQjs7QUFhUEMsZ0JBQWdCLENBQUNDLElBQWpCLEdBQXdCLENBQUNDLG9CQUFELENBQXhCOztBQUVPLFNBQVNGLGdCQUFULENBQTBCRyxRQUExQixFQUFvQztBQUN6Qzs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUZ5QyxNQXlCbkNDLFNBekJtQztBQUFBO0FBQUE7QUFBQTs7QUEwQnZDO0FBT0EsdUJBQVlDLEtBQVosRUFBbUJDLEdBQW5CLEVBQXdCO0FBQUE7O0FBQUE7QUFDdEIsdUhBQU1ELEtBQU4sRUFBYUMsR0FBYjtBQUVBLFlBQUtDLFdBQUwsR0FBbUIsd0JBQVEsVUFBQ0MsRUFBRCxFQUFLQyxRQUFMO0FBQUEsZUFBa0IsVUFBQUMsS0FBSyxFQUFJO0FBQ3BELGNBQUksQ0FBQ0QsUUFBUSxDQUFDQyxLQUFELENBQWIsRUFBc0I7QUFDcEI7QUFDQUMsNEJBQVFDLEtBQVIsQ0FBY2pCLFFBQVEsQ0FBQ0MsT0FBdkI7O0FBRUEsbUJBQU8sSUFBUDtBQUNEOztBQUNELGlCQUFPYSxRQUFRLENBQUNDLEtBQUQsQ0FBUixDQUFnQkYsRUFBaEIsQ0FBUDtBQUNELFNBUjBCO0FBQUEsT0FBUixDQUFuQjtBQVNBLFlBQUtLLFdBQUwsR0FBbUIsd0JBQVEsVUFBQ0wsRUFBRCxFQUFLTSxRQUFMO0FBQUEsZUFBa0IsOEJBQVVOLEVBQVYsRUFBY00sUUFBZCxDQUFsQjtBQUFBLE9BQVIsQ0FBbkI7QUFac0I7QUFhdkI7O0FBOUNzQztBQUFBO0FBQUEsMkNBZ0RsQjtBQUFBLDBCQUNzQixLQUFLVCxLQUQzQjtBQUFBLFlBQ1pHLEVBRFksZUFDWkEsRUFEWTtBQUFBLFlBQ1JPLElBRFEsZUFDUkEsSUFEUTtBQUFBLFlBQ0ZDLG9CQURFLGVBQ0ZBLG9CQURFLEVBRW5COztBQUNBLGFBQUtYLEtBQUwsQ0FBV1MsUUFBWCxDQUFvQixvQ0FBYztBQUFDTixVQUFBQSxFQUFFLEVBQUZBLEVBQUQ7QUFBS08sVUFBQUEsSUFBSSxFQUFKQSxJQUFMO0FBQVdDLFVBQUFBLG9CQUFvQixFQUFwQkE7QUFBWCxTQUFkLENBQXBCO0FBQ0Q7QUFwRHNDO0FBQUE7QUFBQSxnREFzRGJDLFNBdERhLEVBc0RGO0FBQ25DO0FBQ0EsWUFBSUEsU0FBUyxDQUFDVCxFQUFWLElBQWdCUyxTQUFTLENBQUNULEVBQVYsS0FBaUIsS0FBS0gsS0FBTCxDQUFXRyxFQUFoRCxFQUFvRDtBQUNsRCxlQUFLSCxLQUFMLENBQVdTLFFBQVgsQ0FBb0Isa0NBQVksS0FBS1QsS0FBTCxDQUFXRyxFQUF2QixFQUEyQlMsU0FBUyxDQUFDVCxFQUFyQyxDQUFwQjtBQUNEO0FBQ0Y7QUEzRHNDO0FBQUE7QUFBQSw2Q0E2RGhCO0FBQ3JCLFlBQUksS0FBS0gsS0FBTCxDQUFXVSxJQUFYLEtBQW9CLEtBQXhCLEVBQStCO0FBQzdCO0FBQ0EsZUFBS1YsS0FBTCxDQUFXUyxRQUFYLENBQW9CLGtDQUFZLEtBQUtULEtBQUwsQ0FBV0csRUFBdkIsQ0FBcEI7QUFDRDtBQUNGO0FBbEVzQztBQUFBO0FBQUEsK0JBb0U5QjtBQUFBLDJCQUNpQyxLQUFLSCxLQUR0QztBQUFBLFlBQ0FHLEVBREEsZ0JBQ0FBLEVBREE7QUFBQSxZQUNJQyxRQURKLGdCQUNJQSxRQURKO0FBQUEsWUFDY0ssUUFEZCxnQkFDY0EsUUFEZDtBQUFBLFlBQ3dCSixLQUR4QixnQkFDd0JBLEtBRHhCO0FBRVAsWUFBTVEsUUFBUSxHQUFHLEtBQUtYLFdBQUwsQ0FBaUJDLEVBQWpCLEVBQXFCQyxRQUFyQixDQUFqQjs7QUFFQSxZQUFJLENBQUNTLFFBQUQsSUFBYSxDQUFDQSxRQUFRLENBQUNSLEtBQUQsQ0FBMUIsRUFBbUM7QUFDakM7QUFDQSxpQkFBTyw0Q0FBUDtBQUNEOztBQUVELGVBQ0UsZ0NBQUMsUUFBRCxnQ0FDTSxLQUFLTCxLQURYO0FBRUUsVUFBQSxFQUFFLEVBQUVHLEVBRk47QUFHRSxVQUFBLFFBQVEsRUFBRVUsUUFIWjtBQUlFLFVBQUEsUUFBUSxFQUFFLEtBQUtMLFdBQUwsQ0FBaUJMLEVBQWpCLEVBQXFCTSxRQUFyQjtBQUpaLFdBREY7QUFRRDtBQXJGc0M7QUFBQTtBQUFBLElBeUJqQkssZ0JBekJpQjs7QUFBQSxtQ0F5Qm5DZixTQXpCbUMsa0JBMkJqQjtBQUNwQkksSUFBQUEsRUFBRSxFQUFFLEtBRGdCO0FBRXBCQyxJQUFBQSxRQUFRLEVBQUUsa0JBQUFDLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNVLFFBQVY7QUFBQSxLQUZLO0FBR3BCTCxJQUFBQSxJQUFJLEVBQUU7QUFIYyxHQTNCaUI7O0FBd0Z6QyxNQUFNTSxlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUNYLEtBQUQsRUFBUUwsS0FBUjtBQUFBO0FBQW9CSyxNQUFBQSxLQUFLLEVBQUxBO0FBQXBCLE9BQThCTCxLQUE5QjtBQUFBLEdBQXhCOztBQUNBLE1BQU1pQixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCLENBQUFSLFFBQVE7QUFBQSxXQUFLO0FBQUNBLE1BQUFBLFFBQVEsRUFBUkE7QUFBRCxLQUFMO0FBQUEsR0FBaEM7O0FBQ0EsU0FBTyx5QkFBUU8sZUFBUixFQUF5QkMsZUFBekIsRUFBMENsQixTQUExQyxDQUFQO0FBQ0QsQyxDQUVEOzs7QUFDQSxTQUFTbUIsV0FBVCxDQUFxQkMsT0FBckIsRUFBOEJDLE9BQTlCLEVBQXVDO0FBQ3JDLE1BQU1DLFNBQVMsR0FBR0YsT0FBTyxDQUFDRyxNQUFSLENBQWUsQ0FBQ0YsT0FBRCxDQUFmLENBQWxCO0FBQ0EsU0FBT0csS0FBSyxDQUFDQyxPQUFOLENBQWNKLE9BQU8sQ0FBQ3hCLElBQXRCLEtBQStCd0IsT0FBTyxDQUFDeEIsSUFBUixDQUFhNkIsTUFBNUMsR0FDTEwsT0FBTyxDQUFDeEIsSUFBUixDQUFhOEIsTUFBYixDQUFvQixVQUFDQyxJQUFELEVBQU9DLEdBQVA7QUFBQSxXQUFlVixXQUFXLENBQUNTLElBQUQsRUFBT0MsR0FBUCxDQUExQjtBQUFBLEdBQXBCLEVBQTJEUCxTQUEzRCxDQURLLEdBRUxBLFNBRkY7QUFHRDs7QUFFRCxJQUFNUSxlQUFlLEdBQUdYLFdBQVcsQ0FBQyxFQUFELEVBQUt2QixnQkFBTCxDQUFuQyxDLENBRUE7O0FBQ08sSUFBTW1DLFdBQVcsR0FBR0QsZUFBZSxDQUN2Q0gsTUFEd0IsQ0FDakIsVUFBQ0ssR0FBRCxFQUFNWCxPQUFOO0FBQUEsU0FBa0JXLEdBQUcsQ0FBQ0MsT0FBSixDQUFZWixPQUFaLEVBQXFCQSxPQUFyQixDQUFsQjtBQUFBLENBRGlCLEVBQ2dDLHlCQURoQyxDQUFwQixDLENBR1A7Ozs7QUFDTyxTQUFTYSxnQkFBVCxDQUEwQkMsT0FBMUIsRUFBbUM7QUFDeEMsTUFBSSxDQUFDWCxLQUFLLENBQUNDLE9BQU4sQ0FBY1UsT0FBZCxDQUFMLEVBQTZCO0FBQzNCNUIsb0JBQVFDLEtBQVIsQ0FBY2pCLFFBQVEsQ0FBQ0UsU0FBVCwwQkFBMEIwQyxPQUExQixFQUFkOztBQUNBLFdBQU9KLFdBQVcsQ0FBQ0ssR0FBWixDQUFnQnhDLGdCQUFoQixDQUFQO0FBQ0Q7O0FBRUQsU0FBT3VDLE9BQU8sQ0FDWFIsTUFESSxDQUNHLFVBQUNLLEdBQUQsRUFBTUssTUFBTixFQUFpQjtBQUFBOztBQUN2QixRQUFJLENBQUNiLEtBQUssQ0FBQ0MsT0FBTixDQUFjVSxPQUFkLENBQUwsRUFBNkI7QUFDM0I1QixzQkFBUUMsS0FBUixDQUFjakIsUUFBUSxDQUFDSSxhQUF2Qjs7QUFDQSxhQUFPcUMsR0FBUDtBQUNELEtBSnNCLENBTXZCO0FBQ0E7OztBQUNBLFFBQU1NLGtCQUFrQixHQUFHbkIsV0FBVyxDQUFDLEVBQUQsRUFBS2tCLE1BQU0sQ0FBQyxDQUFELENBQVgsQ0FBdEM7QUFDQUwsSUFBQUEsR0FBRyxHQUFHTSxrQkFBa0IsQ0FDckJYLE1BREcsQ0FDSSxVQUFDWSxFQUFELEVBQUtsQixPQUFMO0FBQUEsYUFBaUJrQixFQUFFLENBQUNOLE9BQUgsQ0FBV1osT0FBWCxFQUFvQkEsT0FBcEIsQ0FBakI7QUFBQSxLQURKLEVBQ21EVyxHQURuRCxDQUFOO0FBR0EsV0FBTyxRQUFBQSxHQUFHLEVBQUNDLE9BQUosaURBQWVJLE1BQWYsRUFBUDtBQUNELEdBZEksRUFjRk4sV0FkRSxFQWVKSyxHQWZJLENBZUF4QyxnQkFmQSxDQUFQO0FBZ0JEOztBQUVELElBQU00QyxpQkFBaUIsR0FBR1QsV0FBVyxDQUFDSyxHQUFaLENBQWdCeEMsZ0JBQWhCLENBQTFCO2VBRWU0QyxpQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICdsb2Rhc2gubWVtb2l6ZSc7XG5pbXBvcnQge2NvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5pbXBvcnQge2luamVjdG9yfSBmcm9tICcuL2luamVjdG9yJztcbmltcG9ydCBLZXBsZXJHbEZhY3RvcnkgZnJvbSAnLi9rZXBsZXItZ2wnO1xuaW1wb3J0IHtmb3J3YXJkVG99IGZyb20gJ2FjdGlvbnMvYWN0aW9uLXdyYXBwZXInO1xuXG5pbXBvcnQge1xuICByZWdpc3RlckVudHJ5LFxuICBkZWxldGVFbnRyeSxcbiAgcmVuYW1lRW50cnlcbn0gZnJvbSAnYWN0aW9ucy9pZGVudGl0eS1hY3Rpb25zJztcblxuZXhwb3J0IGNvbnN0IGVycm9yTXNnID0ge1xuICBub1N0YXRlOlxuICAgIGBrZXBsZXIuZ2wgc3RhdGUgZG9lc250IGV4aXN0LiBgICtcbiAgICBgWW91IG1pZ2h0IGZvcmdldCB0byBtb3VudCBrZXBsZXJHbFJlZHVjZXIgaW4geW91ciByb290IHJlZHVjZXIuYCArXG4gICAgYElmIGl0IGlzIG5vdCBtb3VudGVkIGFzIHN0YXRlLmtlcGxlckdsIGJ5IGRlZmF1bHQsIHlvdSBuZWVkIHRvIHByb3ZpZGUgZ2V0U3RhdGUgYXMgYSBwcm9wYCxcblxuICB3cm9uZ1R5cGU6IHR5cGUgPT4gYGluamVjdENvbXBvbmVudHMgdGFrZXMgYW4gYXJyYXkgb2YgZmFjdG9yaWVzIHJlcGxhY2VtZW50IHBhaXJzIGFzIGlucHV0LCBgICtcbiAgICBgJHt0eXBlfSBpcyBwcm92aWRlZGAsXG5cbiAgd3JvbmdQYWlyVHlwZTogYGluamVjdENvbXBvbmVudHMgdGFrZXMgYW4gYXJyYXkgb2YgZmFjdG9yaWVzIHJlcGxhY2VtZW50IHBhaXJzIGFzIGlucHV0LCBgICtcbiAgYGVhY2ggcGFpciBiZSBhIGFycmF5IGFzIFtvcmlnaW5hbEZhY3RvcnksIHJlcGxhY2VtZW50XWBcbn07XG5cbkNvbnRhaW5lckZhY3RvcnkuZGVwcyA9IFtLZXBsZXJHbEZhY3RvcnldO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29udGFpbmVyRmFjdG9yeShLZXBsZXJHbCkge1xuICAvKiogQGxlbmRzIEtlcGxlckdsICovXG4gIC8qKlxuICAgICogTWFpbiBLZXBsZXIuZ2wgQ29tcG9uZW50XG4gICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcHMuaWQgLSBfcmVxdWlyZWRfXG4gICAgKlxuICAgICogLSBEZWZhdWx0OiBgbWFwYFxuICAgICogVGhlIGlkIG9mIHRoaXMgS2VwbGVyR2wgaW5zdGFuY2UuIGBpZGAgaXMgcmVxdWlyZWQgaWYgeW91IGhhdmUgbXVsdGlwbGVcbiAgICAqIEtlcGxlckdsIGluc3RhbmNlcyBpbiB5b3VyIGFwcC4gSXQgZGVmaW5lcyB0aGUgcHJvcCBuYW1lIG9mIHRoZSBLZXBsZXJHbCBzdGF0ZSB0aGF0IGlzXG4gICAgKiBzdG9yZWQgaW4gdGhlIEtlcGxlckdsIHJlZHVjZXIuIEZvciBleGFtcGxlLCB0aGUgc3RhdGUgb2YgdGhlIEtlcGxlckdsIGNvbXBvbmVudCB3aXRoIGlkIGBmb29gIGlzXG4gICAgKiBzdG9yZWQgaW4gYHN0YXRlLmtlcGxlckdsLmZvb2AuXG4gICAgKlxuICAgICogSW4gY2FzZSB5b3UgY3JlYXRlIG11bHRpcGxlIGtlcGxlci5nbCBpbnN0YW5jZXMgdXNpbmcgdGhlIHNhbWUgaWQsIHRoZSBrZXBsZXIuZ2wgc3RhdGUgZGVmaW5lZCBieSB0aGUgZW50cnkgd2lsbCBiZVxuICAgICogb3ZlcnJpZGRlbiBieSB0aGUgbGF0ZXN0IGluc3RhbmNlIGFuZCByZXNldCB0byBhIGJsYW5rIHN0YXRlLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuIC0gX3JlcXVpcmVkX1xuXG4gICAgKiBZb3UgY2FuIGNyZWF0ZSBhIGZyZWUgYWNjb3VudCBhdCBbd3d3Lm1hcGJveC5jb21dKHd3dy5tYXBib3guY29tKSBhbmQgY3JlYXRlIGEgdG9rZW4gYXRcbiAgICAqIFt3d3cubWFwYm94LmNvbS9hY2NvdW50L2FjY2Vzcy10b2tlbnNdKHd3dy5tYXBib3guY29tL2FjY291bnQvYWNjZXNzLXRva2VucylcbiAgICAqXG4gICAgKlxuICAgICogQHBhcmFtIHtOdW1iZXJ9IHByb3BzLndpZHRoIC0gX3JlcXVpcmVkXyBXaWR0aCBvZiB0aGUgS2VwbGVyR2wgVUkuXG4gICAgKiBAcHVibGljXG4gICAqL1xuICBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8vIGRlZmF1bHQgaWQgYW5kIGFkZHJlc3MgaWYgbm90IHByb3ZpZGVkXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIGlkOiAnbWFwJyxcbiAgICAgIGdldFN0YXRlOiBzdGF0ZSA9PiBzdGF0ZS5rZXBsZXJHbCxcbiAgICAgIG1pbnQ6IHRydWVcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGN0eCkge1xuICAgICAgc3VwZXIocHJvcHMsIGN0eCk7XG5cbiAgICAgIHRoaXMuZ2V0U2VsZWN0b3IgPSBtZW1vaXplKChpZCwgZ2V0U3RhdGUpID0+IHN0YXRlID0+IHtcbiAgICAgICAgaWYgKCFnZXRTdGF0ZShzdGF0ZSkpIHtcbiAgICAgICAgICAvLyBsb2cgZXJyb3JcbiAgICAgICAgICBDb25zb2xlLmVycm9yKGVycm9yTXNnLm5vU3RhdGUpO1xuXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdldFN0YXRlKHN0YXRlKVtpZF07XG4gICAgICB9KTtcbiAgICAgIHRoaXMuZ2V0RGlzcGF0Y2ggPSBtZW1vaXplKChpZCwgZGlzcGF0Y2gpID0+IGZvcndhcmRUbyhpZCwgZGlzcGF0Y2gpKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICBjb25zdCB7aWQsIG1pbnQsIG1hcGJveEFwaUFjY2Vzc1Rva2VufSA9IHRoaXMucHJvcHM7XG4gICAgICAvLyBhZGQgYSBuZXcgZW50cnkgdG8gcmVkdWNlclxuICAgICAgdGhpcy5wcm9wcy5kaXNwYXRjaChyZWdpc3RlckVudHJ5KHtpZCwgbWludCwgbWFwYm94QXBpQWNjZXNzVG9rZW59KSk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIC8vIGNoZWNrIGlmIGlkIGhhcyBjaGFuZ2VkLCBpZiB0cnVlLCBjb3B5IHN0YXRlIG92ZXJcbiAgICAgIGlmIChuZXh0UHJvcHMuaWQgJiYgbmV4dFByb3BzLmlkICE9PSB0aGlzLnByb3BzLmlkKSB7XG4gICAgICAgIHRoaXMucHJvcHMuZGlzcGF0Y2gocmVuYW1lRW50cnkodGhpcy5wcm9wcy5pZCwgbmV4dFByb3BzLmlkKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBpZiAodGhpcy5wcm9wcy5taW50ICE9PSBmYWxzZSkge1xuICAgICAgICAvLyBkZWxldGUgZW50cnkgaW4gcmVkdWNlclxuICAgICAgICB0aGlzLnByb3BzLmRpc3BhdGNoKGRlbGV0ZUVudHJ5KHRoaXMucHJvcHMuaWQpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7aWQsIGdldFN0YXRlLCBkaXNwYXRjaCwgc3RhdGV9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gdGhpcy5nZXRTZWxlY3RvcihpZCwgZ2V0U3RhdGUpO1xuXG4gICAgICBpZiAoIXNlbGVjdG9yIHx8ICFzZWxlY3RvcihzdGF0ZSkpIHtcbiAgICAgICAgLy8gaW5zdGFuY2Ugc3RhdGUgaGFzbid0IGJlZW4gbW91bnRlZCB5ZXRcbiAgICAgICAgcmV0dXJuIDxkaXYgLz47XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxLZXBsZXJHbFxuICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICBzZWxlY3Rvcj17c2VsZWN0b3J9XG4gICAgICAgICAgZGlzcGF0Y2g9e3RoaXMuZ2V0RGlzcGF0Y2goaWQsIGRpc3BhdGNoKX1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCBwcm9wcykgPT4gKHtzdGF0ZSwgLi4ucHJvcHN9KTtcbiAgY29uc3QgZGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4gKHtkaXNwYXRjaH0pO1xuICByZXR1cm4gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIGRpc3BhdGNoVG9Qcm9wcykoQ29udGFpbmVyKTtcbn1cblxuLy8gZW50cnlQb2ludFxuZnVuY3Rpb24gZmxhdHRlbkRlcHMoYWxsRGVwcywgZmFjdG9yeSkge1xuICBjb25zdCBhZGRUb0RlcHMgPSBhbGxEZXBzLmNvbmNhdChbZmFjdG9yeV0pO1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShmYWN0b3J5LmRlcHMpICYmIGZhY3RvcnkuZGVwcy5sZW5ndGggP1xuICAgIGZhY3RvcnkuZGVwcy5yZWR1Y2UoKGFjY3UsIGRlcCkgPT4gZmxhdHRlbkRlcHMoYWNjdSwgZGVwKSwgYWRkVG9EZXBzKSA6XG4gICAgYWRkVG9EZXBzO1xufVxuXG5jb25zdCBhbGxEZXBlbmRlbmNpZXMgPSBmbGF0dGVuRGVwcyhbXSwgQ29udGFpbmVyRmFjdG9yeSk7XG5cbi8vIHByb3ZpZGUgYWxsIGRlcGVuZGVuY2llcyB0byBhcHBJbmplY3RvclxuZXhwb3J0IGNvbnN0IGFwcEluamVjdG9yID0gYWxsRGVwZW5kZW5jaWVzXG4gIC5yZWR1Y2UoKGluaiwgZmFjdG9yeSkgPT4gaW5qLnByb3ZpZGUoZmFjdG9yeSwgZmFjdG9yeSksIGluamVjdG9yKCkpO1xuXG4vLyBIZWxwZXIgdG8gaW5qZWN0IGN1c3RvbSBjb21wb25lbnRzIGFuZCByZXR1cm4ga2VwbGVyLmdsIGNvbnRhaW5lclxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdENvbXBvbmVudHMocmVjaXBlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkocmVjaXBlcykpIHtcbiAgICBDb25zb2xlLmVycm9yKGVycm9yTXNnLndyb25nVHlwZSh0eXBlb2YocmVjaXBlcykpKTtcbiAgICByZXR1cm4gYXBwSW5qZWN0b3IuZ2V0KENvbnRhaW5lckZhY3RvcnkpO1xuICB9XG5cbiAgcmV0dXJuIHJlY2lwZXNcbiAgICAucmVkdWNlKChpbmosIHJlY2lwZSkgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlY2lwZXMpKSB7XG4gICAgICAgIENvbnNvbGUuZXJyb3IoZXJyb3JNc2cud3JvbmdQYWlyVHlwZSk7XG4gICAgICAgIHJldHVybiBpbmo7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbGxlY3QgZGVwZW5kZW5jaWVzIG9mIGN1c3RvbSBmYWN0b3JpZXMsIGlmIHRoZXJlIGlzIGFueS5cbiAgICAgIC8vIEFkZCB0aGVtIHRvIHRoZSBpbmplY3RvclxuICAgICAgY29uc3QgY3VzdG9tRGVwZW5kZW5jaWVzID0gZmxhdHRlbkRlcHMoW10sIHJlY2lwZVsxXSk7XG4gICAgICBpbmogPSBjdXN0b21EZXBlbmRlbmNpZXNcbiAgICAgICAgLnJlZHVjZSgoaWosIGZhY3RvcnkpID0+IGlqLnByb3ZpZGUoZmFjdG9yeSwgZmFjdG9yeSksIGluaik7XG5cbiAgICAgIHJldHVybiBpbmoucHJvdmlkZSguLi5yZWNpcGUpO1xuICAgIH0sIGFwcEluamVjdG9yKVxuICAgIC5nZXQoQ29udGFpbmVyRmFjdG9yeSk7XG59XG5cbmNvbnN0IEluamVjdGVkQ29udGFpbmVyID0gYXBwSW5qZWN0b3IuZ2V0KENvbnRhaW5lckZhY3RvcnkpO1xuXG5leHBvcnQgZGVmYXVsdCBJbmplY3RlZENvbnRhaW5lcjtcbiJdfQ==