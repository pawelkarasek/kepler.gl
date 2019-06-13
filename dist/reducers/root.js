"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provideInitialState = provideInitialState;
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _reduxActions = require("redux-actions");

var _actionWrapper = require("../actions/action-wrapper");

var _actions = require("../actions/actions");

var _core = require("./core");

var _actionTypes = _interopRequireDefault(require("../constants/action-types"));

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
// INITIAL_STATE
var initialCoreState = {};

function provideInitialState(initialState) {
  var coreReducer = (0, _core.coreReducerFactory)(initialState);

  var handleRegisterEntry = function handleRegisterEntry(state, _ref) {
    var _ref$payload = _ref.payload,
        id = _ref$payload.id,
        mint = _ref$payload.mint,
        mapboxApiAccessToken = _ref$payload.mapboxApiAccessToken;
    return (0, _objectSpread4["default"])({}, state, (0, _defineProperty2["default"])({}, id, state[id] && mint === false ? state[id] : (0, _objectSpread4["default"])({}, coreReducer(undefined, (0, _actions.keplerGlInit)({
      mapboxApiAccessToken: mapboxApiAccessToken
    })))));
  };

  var handleDeleteEntry = function handleDeleteEntry(state, _ref2) {
    var id = _ref2.payload;
    return Object.keys(state).reduce(function (accu, curr) {
      return (0, _objectSpread4["default"])({}, accu, curr === id ? {} : (0, _defineProperty2["default"])({}, curr, state[curr]));
    }, {});
  };

  var handleRenameEntry = function handleRenameEntry(state, _ref4) {
    var _ref4$payload = _ref4.payload,
        oldId = _ref4$payload.oldId,
        newId = _ref4$payload.newId;
    return Object.keys(state).reduce(function (accu, curr) {
      return (0, _objectSpread4["default"])({}, accu, (0, _defineProperty2["default"])({}, curr === oldId ? newId : curr, state[curr]));
    }, {});
  };

  return function () {
    var _handleActions;

    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialCoreState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    // update child states
    Object.keys(state).forEach(function (id) {
      var updateItemState = coreReducer(state[id], (0, _actionWrapper._actionFor)(id, action));
      state = (0, _actionWrapper._updateProperty)(state, id, updateItemState);
    }); // perform additional state reducing (e.g. switch action.type etc...)

    return (0, _reduxActions.handleActions)((_handleActions = {}, (0, _defineProperty2["default"])(_handleActions, _actionTypes["default"].REGISTER_ENTRY, handleRegisterEntry), (0, _defineProperty2["default"])(_handleActions, _actionTypes["default"].DELETE_ENTRY, handleDeleteEntry), (0, _defineProperty2["default"])(_handleActions, _actionTypes["default"].RENAME_ENTRY, handleRenameEntry), _handleActions), initialCoreState)(state, action);
  };
}

var _keplerGlReducer = provideInitialState();

function mergeInitialState() {
  var saved = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var provided = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var keys = ['mapState', 'mapStyle', 'visState', 'uiState']; // shallow merge each reducer

  return keys.reduce(function (accu, key) {
    return (0, _objectSpread4["default"])({}, accu, saved[key] && provided[key] ? (0, _defineProperty2["default"])({}, key, (0, _objectSpread4["default"])({}, saved[key], provided[key])) : (0, _defineProperty2["default"])({}, key, saved[key] || provided[key] || {}));
  }, {});
}

function decorate(target) {
  var savedInitialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var targetInitialState = savedInitialState;
  /**
   * Returns a kepler.gl reducer that will also pass each action through additional reducers spiecified.
   * The parameter should be either a reducer map or a reducer function.
   * The state passed into the additional action handler is the instance state.
   * It will include all the subreducers `visState`, `uiState`, `mapState` and `mapStyle`.
   * `.plugin` is only meant to be called once when mounting the keplerGlReducer to the store.
   * **Note** This is an advanced option to give you more freedom to modify the internal state of the kepler.gl instance.
   * You should only use this to adding additional actions instead of replacing default actions.
   *
   * @mixin keplerGlReducer.plugin
   * @memberof keplerGlReducer
   * @param {Object|Function} customReducer - A reducer map or a reducer
   * @public
   * @example
   * const myKeplerGlReducer = keplerGlReducer
   *  .plugin({
   *    // 1. as reducer map
   *    HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
   *      ...state,
   *      uiState: {
   *        ...state.uiState,
   *        readOnly: !state.uiState.readOnly
   *      }
   *    })
   *  })
   * .plugin(handleActions({
   *   // 2. as reducer
   *   'HIDE_MAP_CONTROLS': (state, action) => ({
   *     ...state,
   *     uiState: {
   *       ...state.uiState,
   *       mapControls: hiddenMapControl
   *     }
   *   })
   * }, {}));
   */

  target.plugin = function plugin(customReducer) {
    var _this = this;

    if ((0, _typeof2["default"])(customReducer) === 'object') {
      // if only provided a reducerMap, wrap it in a reducer
      customReducer = (0, _reduxActions.handleActions)(customReducer, {});
    } // use 'function' keyword to enable 'this'


    return decorate(function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var nextState = _this(state, action); // for each entry in the staten


      Object.keys(nextState).forEach(function (id) {
        // update child states
        nextState = (0, _actionWrapper._updateProperty)(nextState, id, customReducer(nextState[id], (0, _actionWrapper._actionFor)(id, action)));
      });
      return nextState;
    });
  };
  /**
   * Return a reducer that initiated with custom initial state.
   * The parameter should be an object mapping from `subreducer` name to custom subreducer state,
   * which will be shallow **merged** with default initial state.
   *
   * Default subreducer state:
   *  - [`visState`](./vis-state.md#INITIAL_VIS_STATE)
   *  - [`mapState`](./map-state.md#INITIAL_MAP_STATE)
   *  - [`mapStyle`](./map-style.md#INITIAL_MAP_STYLE)
   *  - [`uiState`](./ui-state.md#INITIAL_UI_STATE)
   * @mixin keplerGlReducer.initialState
   * @memberof keplerGlReducer
   * @param {Object} iniSt - custom state to be merged with default initial state
   * @public
   * @example
   * const myKeplerGlReducer = keplerGlReducer
   *  .initialState({
   *    uiState: {readOnly: true}
   *  });
   */


  target.initialState = function initialState(iniSt) {
    var merged = mergeInitialState(targetInitialState, iniSt);
    var targetReducer = provideInitialState(merged);
    return decorate(targetReducer, merged);
  };

  return target;
}
/**
 * Kepler.gl reducer to be mounted to your store. You can mount `keplerGlReducer` at property `keplerGl`, if you choose
 * to mount it at another address e.g. `foo` you will need to specify it when you mount `KeplerGl` component in your app with `getState: state => state.foo`
 * @public
 * @example
 * import keplerGlReducer from 'kepler.gl/reducers';
 * import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
 * import {taskMiddleware} from 'react-palm/tasks';
 *
 * const initialState = {};
 * const reducers = combineReducers({
 *   // <-- mount kepler.gl reducer in your app
 *   keplerGl: keplerGlReducer,
 *
 *   // Your other reducers here
 *   app: appReducer
 * });
 *
 * // using createStore
 * export default createStore(reducer, initialState, applyMiddleware(taskMiddleware));
 */


var keplerGlReducer = decorate(_keplerGlReducer);
var _default = keplerGlReducer;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yb290LmpzIl0sIm5hbWVzIjpbImluaXRpYWxDb3JlU3RhdGUiLCJwcm92aWRlSW5pdGlhbFN0YXRlIiwiaW5pdGlhbFN0YXRlIiwiY29yZVJlZHVjZXIiLCJoYW5kbGVSZWdpc3RlckVudHJ5Iiwic3RhdGUiLCJwYXlsb2FkIiwiaWQiLCJtaW50IiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJ1bmRlZmluZWQiLCJoYW5kbGVEZWxldGVFbnRyeSIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2N1IiwiY3VyciIsImhhbmRsZVJlbmFtZUVudHJ5Iiwib2xkSWQiLCJuZXdJZCIsImFjdGlvbiIsImZvckVhY2giLCJ1cGRhdGVJdGVtU3RhdGUiLCJBY3Rpb25UeXBlcyIsIlJFR0lTVEVSX0VOVFJZIiwiREVMRVRFX0VOVFJZIiwiUkVOQU1FX0VOVFJZIiwiX2tlcGxlckdsUmVkdWNlciIsIm1lcmdlSW5pdGlhbFN0YXRlIiwic2F2ZWQiLCJwcm92aWRlZCIsImtleSIsImRlY29yYXRlIiwidGFyZ2V0Iiwic2F2ZWRJbml0aWFsU3RhdGUiLCJ0YXJnZXRJbml0aWFsU3RhdGUiLCJwbHVnaW4iLCJjdXN0b21SZWR1Y2VyIiwibmV4dFN0YXRlIiwiaW5pU3QiLCJtZXJnZWQiLCJ0YXJnZXRSZWR1Y2VyIiwia2VwbGVyR2xSZWR1Y2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQXpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVNBO0FBQ0EsSUFBTUEsZ0JBQWdCLEdBQUcsRUFBekI7O0FBRU8sU0FBU0MsbUJBQVQsQ0FBNkJDLFlBQTdCLEVBQTJDO0FBQ2hELE1BQU1DLFdBQVcsR0FBRyw4QkFBbUJELFlBQW5CLENBQXBCOztBQUVB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WCxFQUFlYSxNQUFmLENBQWhCLENBSEgsQ0FBWjtBQUtELE9BUEQ7QUFTQSxhQUFPa0IsU0FBUDtBQUNELEtBZGMsQ0FBZjtBQWVELEdBdEJEO0FBd0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBTCxFQUFBQSxNQUFNLENBQUMvQixZQUFQLEdBQXNCLFNBQVNBLFlBQVQsQ0FBc0JxQyxLQUF0QixFQUE2QjtBQUNqRCxRQUFNQyxNQUFNLEdBQUdaLGlCQUFpQixDQUFDTyxrQkFBRCxFQUFxQkksS0FBckIsQ0FBaEM7QUFDQSxRQUFNRSxhQUFhLEdBQUd4QyxtQkFBbUIsQ0FBQ3VDLE1BQUQsQ0FBekM7QUFFQSxXQUFPUixRQUFRLENBQUNTLGFBQUQsRUFBZ0JELE1BQWhCLENBQWY7QUFDRCxHQUxEOztBQU9BLFNBQU9QLE1BQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCQSxJQUFNUyxlQUFlLEdBQUdWLFFBQVEsQ0FBQ0wsZ0JBQUQsQ0FBaEM7ZUFDZWUsZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7aGFuZGxlQWN0aW9uc30gZnJvbSAncmVkdXgtYWN0aW9ucyc7XG5cbmltcG9ydCB7X2FjdGlvbkZvciwgX3VwZGF0ZVByb3BlcnR5fSBmcm9tICcuLi9hY3Rpb25zL2FjdGlvbi13cmFwcGVyJztcbmltcG9ydCB7a2VwbGVyR2xJbml0fSBmcm9tICcuLi9hY3Rpb25zL2FjdGlvbnMnO1xuaW1wb3J0IHtjb3JlUmVkdWNlckZhY3Rvcnl9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgQWN0aW9uVHlwZXMgZnJvbSAnY29uc3RhbnRzL2FjdGlvbi10eXBlcyc7XG5cbi8vIElOSVRJQUxfU1RBVEVcbmNvbnN0IGluaXRpYWxDb3JlU3RhdGUgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVJbml0aWFsU3RhdGUoaW5pdGlhbFN0YXRlKSB7XG4gIGNvbnN0IGNvcmVSZWR1Y2VyID0gY29yZVJlZHVjZXJGYWN0b3J5KGluaXRpYWxTdGF0ZSk7XG5cbiAgY29uc3QgaGFuZGxlUmVnaXN0ZXJFbnRyeSA9IChzdGF0ZSwge3BheWxvYWQ6IHtpZCwgbWludCwgbWFwYm94QXBpQWNjZXNzVG9rZW59fSkgPT4gKHtcbiAgICAvLyByZWdpc3RlciBhIG5ldyBlbnRyeSB0byB2b3lhZ2VyIHJlZHVjZXJcbiAgICAvLyBieSBkZWZhdWx0LCBhbHdheXMgY3JlYXRlIGEgbWludCBzdGF0ZSBldmVuIGlmIHRoZSBzYW1lIGlkIGFscmVhZHkgZXhpc3RcbiAgICAvLyBpZiBzdGF0ZS5pZCBleGlzdCBhbmQgbWludD1mYWxzZSwga2VlcCB0aGUgZXhpc3Rpbmcgc3RhdGVcbiAgICAuLi5zdGF0ZSxcbiAgICBbaWRdOiBzdGF0ZVtpZF0gJiYgbWludCA9PT0gZmFsc2UgPyBzdGF0ZVtpZF0gOiB7XG4gICAgICAuLi5jb3JlUmVkdWNlcih1bmRlZmluZWQsIGtlcGxlckdsSW5pdCh7bWFwYm94QXBpQWNjZXNzVG9rZW59KSlcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZUVudHJ5ID0gKHN0YXRlLCB7cGF5bG9hZDogaWR9KSA9PlxuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5yZWR1Y2UoXG4gICAgICAoYWNjdSwgY3VycikgPT4gKHtcbiAgICAgICAgLi4uYWNjdSxcbiAgICAgICAgLi4uKGN1cnIgPT09IGlkID8ge30gOiB7W2N1cnJdOiBzdGF0ZVtjdXJyXX0pXG4gICAgICB9KSxcbiAgICAgIHt9XG4gICAgKTtcblxuICBjb25zdCBoYW5kbGVSZW5hbWVFbnRyeSA9IChzdGF0ZSwge3BheWxvYWQ6IHtvbGRJZCwgbmV3SWR9fSkgPT5cbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkucmVkdWNlKFxuICAgICAgKGFjY3UsIGN1cnIpID0+ICh7XG4gICAgICAgIC4uLmFjY3UsXG4gICAgICAgIC4uLntbY3VyciA9PT0gb2xkSWQgPyBuZXdJZCA6IGN1cnJdOiBzdGF0ZVtjdXJyXX1cbiAgICAgIH0pLFxuICAgICAge31cbiAgICApO1xuXG4gIHJldHVybiAoc3RhdGUgPSBpbml0aWFsQ29yZVN0YXRlLCBhY3Rpb24pID0+IHtcbiAgICAvLyB1cGRhdGUgY2hpbGQgc3RhdGVzXG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goaWQgPT4ge1xuICAgICAgY29uc3QgdXBkYXRlSXRlbVN0YXRlID0gY29yZVJlZHVjZXIoc3RhdGVbaWRdLCBfYWN0aW9uRm9yKGlkLCBhY3Rpb24pKTtcbiAgICAgIHN0YXRlID0gX3VwZGF0ZVByb3BlcnR5KHN0YXRlLCBpZCwgdXBkYXRlSXRlbVN0YXRlKTtcbiAgICB9KTtcblxuICAgIC8vIHBlcmZvcm0gYWRkaXRpb25hbCBzdGF0ZSByZWR1Y2luZyAoZS5nLiBzd2l0Y2ggYWN0aW9uLnR5cGUgZXRjLi4uKVxuICAgIHJldHVybiBoYW5kbGVBY3Rpb25zKFxuICAgICAge1xuICAgICAgICBbQWN0aW9uVHlwZXMuUkVHSVNURVJfRU5UUlldOiBoYW5kbGVSZWdpc3RlckVudHJ5LFxuICAgICAgICBbQWN0aW9uVHlwZXMuREVMRVRFX0VOVFJZXTogaGFuZGxlRGVsZXRlRW50cnksXG4gICAgICAgIFtBY3Rpb25UeXBlcy5SRU5BTUVfRU5UUlldOiBoYW5kbGVSZW5hbWVFbnRyeVxuICAgICAgfSxcbiAgICAgIGluaXRpYWxDb3JlU3RhdGVcbiAgICApKHN0YXRlLCBhY3Rpb24pO1xuICB9O1xufVxuXG5jb25zdCBfa2VwbGVyR2xSZWR1Y2VyID0gcHJvdmlkZUluaXRpYWxTdGF0ZSgpO1xuXG5mdW5jdGlvbiBtZXJnZUluaXRpYWxTdGF0ZShzYXZlZCA9IHt9LCBwcm92aWRlZCA9IHt9KSB7XG4gIGNvbnN0IGtleXMgPSBbJ21hcFN0YXRlJywgJ21hcFN0eWxlJywgJ3Zpc1N0YXRlJywgJ3VpU3RhdGUnXTtcblxuICAvLyBzaGFsbG93IG1lcmdlIGVhY2ggcmVkdWNlclxuICByZXR1cm4ga2V5cy5yZWR1Y2UoKGFjY3UsIGtleSkgPT4gKHtcbiAgICAuLi5hY2N1LFxuICAgIC4uLihzYXZlZFtrZXldICYmIHByb3ZpZGVkW2tleV0gP1xuICAgICAgICB7W2tleV06IHsuLi5zYXZlZFtrZXldLCAuLi5wcm92aWRlZFtrZXldfX0gOlxuICAgICAgICB7W2tleV06IHNhdmVkW2tleV0gfHwgcHJvdmlkZWRba2V5XSB8fCB7fX0pXG4gIH0pLCB7fSk7XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlKHRhcmdldCwgc2F2ZWRJbml0aWFsU3RhdGUgPSB7fSkge1xuICBjb25zdCB0YXJnZXRJbml0aWFsU3RhdGUgPSBzYXZlZEluaXRpYWxTdGF0ZTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIGtlcGxlci5nbCByZWR1Y2VyIHRoYXQgd2lsbCBhbHNvIHBhc3MgZWFjaCBhY3Rpb24gdGhyb3VnaCBhZGRpdGlvbmFsIHJlZHVjZXJzIHNwaWVjaWZpZWQuXG4gICAqIFRoZSBwYXJhbWV0ZXIgc2hvdWxkIGJlIGVpdGhlciBhIHJlZHVjZXIgbWFwIG9yIGEgcmVkdWNlciBmdW5jdGlvbi5cbiAgICogVGhlIHN0YXRlIHBhc3NlZCBpbnRvIHRoZSBhZGRpdGlvbmFsIGFjdGlvbiBoYW5kbGVyIGlzIHRoZSBpbnN0YW5jZSBzdGF0ZS5cbiAgICogSXQgd2lsbCBpbmNsdWRlIGFsbCB0aGUgc3VicmVkdWNlcnMgYHZpc1N0YXRlYCwgYHVpU3RhdGVgLCBgbWFwU3RhdGVgIGFuZCBgbWFwU3R5bGVgLlxuICAgKiBgLnBsdWdpbmAgaXMgb25seSBtZWFudCB0byBiZSBjYWxsZWQgb25jZSB3aGVuIG1vdW50aW5nIHRoZSBrZXBsZXJHbFJlZHVjZXIgdG8gdGhlIHN0b3JlLlxuICAgKiAqKk5vdGUqKiBUaGlzIGlzIGFuIGFkdmFuY2VkIG9wdGlvbiB0byBnaXZlIHlvdSBtb3JlIGZyZWVkb20gdG8gbW9kaWZ5IHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiB0aGUga2VwbGVyLmdsIGluc3RhbmNlLlxuICAgKiBZb3Ugc2hvdWxkIG9ubHkgdXNlIHRoaXMgdG8gYWRkaW5nIGFkZGl0aW9uYWwgYWN0aW9ucyBpbnN0ZWFkIG9mIHJlcGxhY2luZyBkZWZhdWx0IGFjdGlvbnMuXG4gICAqXG4gICAqIEBtaXhpbiBrZXBsZXJHbFJlZHVjZXIucGx1Z2luXG4gICAqIEBtZW1iZXJvZiBrZXBsZXJHbFJlZHVjZXJcbiAgICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGN1c3RvbVJlZHVjZXIgLSBBIHJlZHVjZXIgbWFwIG9yIGEgcmVkdWNlclxuICAgKiBAcHVibGljXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG15S2VwbGVyR2xSZWR1Y2VyID0ga2VwbGVyR2xSZWR1Y2VyXG4gICAqICAucGx1Z2luKHtcbiAgICogICAgLy8gMS4gYXMgcmVkdWNlciBtYXBcbiAgICogICAgSElERV9BTkRfU0hPV19TSURFX1BBTkVMOiAoc3RhdGUsIGFjdGlvbikgPT4gKHtcbiAgICogICAgICAuLi5zdGF0ZSxcbiAgICogICAgICB1aVN0YXRlOiB7XG4gICAqICAgICAgICAuLi5zdGF0ZS51aVN0YXRlLFxuICAgKiAgICAgICAgcmVhZE9ubHk6ICFzdGF0ZS51aVN0YXRlLnJlYWRPbmx5XG4gICAqICAgICAgfVxuICAgKiAgICB9KVxuICAgKiAgfSlcbiAgICogLnBsdWdpbihoYW5kbGVBY3Rpb25zKHtcbiAgICogICAvLyAyLiBhcyByZWR1Y2VyXG4gICAqICAgJ0hJREVfTUFQX0NPTlRST0xTJzogKHN0YXRlLCBhY3Rpb24pID0+ICh7XG4gICAqICAgICAuLi5zdGF0ZSxcbiAgICogICAgIHVpU3RhdGU6IHtcbiAgICogICAgICAgLi4uc3RhdGUudWlTdGF0ZSxcbiAgICogICAgICAgbWFwQ29udHJvbHM6IGhpZGRlbk1hcENvbnRyb2xcbiAgICogICAgIH1cbiAgICogICB9KVxuICAgKiB9LCB7fSkpO1xuICAgKi9cbiAgdGFyZ2V0LnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbihjdXN0b21SZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21SZWR1Y2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgLy8gaWYgb25seSBwcm92aWRlZCBhIHJlZHVjZXJNYXAsIHdyYXAgaXQgaW4gYSByZWR1Y2VyXG4gICAgICBjdXN0b21SZWR1Y2VyID0gaGFuZGxlQWN0aW9ucyhjdXN0b21SZWR1Y2VyLCB7fSk7XG4gICAgfVxuXG4gICAgLy8gdXNlICdmdW5jdGlvbicga2V5d29yZCB0byBlbmFibGUgJ3RoaXMnXG4gICAgcmV0dXJuIGRlY29yYXRlKChzdGF0ZSA9IHt9LCBhY3Rpb24gPSB7fSkgPT4ge1xuICAgICAgbGV0IG5leHRTdGF0ZSA9IHRoaXMoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgIC8vIGZvciBlYWNoIGVudHJ5IGluIHRoZSBzdGF0ZW5cbiAgICAgIE9iamVjdC5rZXlzKG5leHRTdGF0ZSkuZm9yRWFjaChpZCA9PiB7XG4gICAgICAgIC8vIHVwZGF0ZSBjaGlsZCBzdGF0ZXNcbiAgICAgICAgbmV4dFN0YXRlID0gX3VwZGF0ZVByb3BlcnR5KFxuICAgICAgICAgIG5leHRTdGF0ZSxcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBjdXN0b21SZWR1Y2VyKG5leHRTdGF0ZVtpZF0sIF9hY3Rpb25Gb3IoaWQsIGFjdGlvbikpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJuIGEgcmVkdWNlciB0aGF0IGluaXRpYXRlZCB3aXRoIGN1c3RvbSBpbml0aWFsIHN0YXRlLlxuICAgKiBUaGUgcGFyYW1ldGVyIHNob3VsZCBiZSBhbiBvYmplY3QgbWFwcGluZyBmcm9tIGBzdWJyZWR1Y2VyYCBuYW1lIHRvIGN1c3RvbSBzdWJyZWR1Y2VyIHN0YXRlLFxuICAgKiB3aGljaCB3aWxsIGJlIHNoYWxsb3cgKiptZXJnZWQqKiB3aXRoIGRlZmF1bHQgaW5pdGlhbCBzdGF0ZS5cbiAgICpcbiAgICogRGVmYXVsdCBzdWJyZWR1Y2VyIHN0YXRlOlxuICAgKiAgLSBbYHZpc1N0YXRlYF0oLi92aXMtc3RhdGUubWQjSU5JVElBTF9WSVNfU1RBVEUpXG4gICAqICAtIFtgbWFwU3RhdGVgXSguL21hcC1zdGF0ZS5tZCNJTklUSUFMX01BUF9TVEFURSlcbiAgICogIC0gW2BtYXBTdHlsZWBdKC4vbWFwLXN0eWxlLm1kI0lOSVRJQUxfTUFQX1NUWUxFKVxuICAgKiAgLSBbYHVpU3RhdGVgXSguL3VpLXN0YXRlLm1kI0lOSVRJQUxfVUlfU1RBVEUpXG4gICAqIEBtaXhpbiBrZXBsZXJHbFJlZHVjZXIuaW5pdGlhbFN0YXRlXG4gICAqIEBtZW1iZXJvZiBrZXBsZXJHbFJlZHVjZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IGluaVN0IC0gY3VzdG9tIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGRlZmF1bHQgaW5pdGlhbCBzdGF0ZVxuICAgKiBAcHVibGljXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG15S2VwbGVyR2xSZWR1Y2VyID0ga2VwbGVyR2xSZWR1Y2VyXG4gICAqICAuaW5pdGlhbFN0YXRlKHtcbiAgICogICAgdWlTdGF0ZToge3JlYWRPbmx5OiB0cnVlfVxuICAgKiAgfSk7XG4gICAqL1xuICB0YXJnZXQuaW5pdGlhbFN0YXRlID0gZnVuY3Rpb24gaW5pdGlhbFN0YXRlKGluaVN0KSB7XG4gICAgY29uc3QgbWVyZ2VkID0gbWVyZ2VJbml0aWFsU3RhdGUodGFyZ2V0SW5pdGlhbFN0YXRlLCBpbmlTdCk7XG4gICAgY29uc3QgdGFyZ2V0UmVkdWNlciA9IHByb3ZpZGVJbml0aWFsU3RhdGUobWVyZ2VkKTtcblxuICAgIHJldHVybiBkZWNvcmF0ZSh0YXJnZXRSZWR1Y2VyLCBtZXJnZWQpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuLyoqXG4gKiBLZXBsZXIuZ2wgcmVkdWNlciB0byBiZSBtb3VudGVkIHRvIHlvdXIgc3RvcmUuIFlvdSBjYW4gbW91bnQgYGtlcGxlckdsUmVkdWNlcmAgYXQgcHJvcGVydHkgYGtlcGxlckdsYCwgaWYgeW91IGNob29zZVxuICogdG8gbW91bnQgaXQgYXQgYW5vdGhlciBhZGRyZXNzIGUuZy4gYGZvb2AgeW91IHdpbGwgbmVlZCB0byBzcGVjaWZ5IGl0IHdoZW4geW91IG1vdW50IGBLZXBsZXJHbGAgY29tcG9uZW50IGluIHlvdXIgYXBwIHdpdGggYGdldFN0YXRlOiBzdGF0ZSA9PiBzdGF0ZS5mb29gXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IGtlcGxlckdsUmVkdWNlciBmcm9tICdrZXBsZXIuZ2wvcmVkdWNlcnMnO1xuICogaW1wb3J0IHtjcmVhdGVTdG9yZSwgY29tYmluZVJlZHVjZXJzLCBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2V9IGZyb20gJ3JlZHV4JztcbiAqIGltcG9ydCB7dGFza01pZGRsZXdhcmV9IGZyb20gJ3JlYWN0LXBhbG0vdGFza3MnO1xuICpcbiAqIGNvbnN0IGluaXRpYWxTdGF0ZSA9IHt9O1xuICogY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuICogICAvLyA8LS0gbW91bnQga2VwbGVyLmdsIHJlZHVjZXIgaW4geW91ciBhcHBcbiAqICAga2VwbGVyR2w6IGtlcGxlckdsUmVkdWNlcixcbiAqXG4gKiAgIC8vIFlvdXIgb3RoZXIgcmVkdWNlcnMgaGVyZVxuICogICBhcHA6IGFwcFJlZHVjZXJcbiAqIH0pO1xuICpcbiAqIC8vIHVzaW5nIGNyZWF0ZVN0b3JlXG4gKiBleHBvcnQgZGVmYXVsdCBjcmVhdGVTdG9yZShyZWR1Y2VyLCBpbml0aWFsU3RhdGUsIGFwcGx5TWlkZGxld2FyZSh0YXNrTWlkZGxld2FyZSkpO1xuICovXG5jb25zdCBrZXBsZXJHbFJlZHVjZXIgPSBkZWNvcmF0ZShfa2VwbGVyR2xSZWR1Y2VyKTtcbmV4cG9ydCBkZWZhdWx0IGtlcGxlckdsUmVkdWNlcjtcbiJdfQ==