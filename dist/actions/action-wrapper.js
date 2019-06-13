"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._updateProperty = exports.forwardTo = exports._actionFor = exports.unwrap = exports.isForwardAction = exports.wrapTo = exports.getActionForwardAddress = exports.ADDRESS_PREFIX = exports.FORWARD = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _lodash = _interopRequireDefault(require("lodash.curry"));

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
var FORWARD = '@redux-forward/FORWARD';
exports.FORWARD = FORWARD;
var ADDRESS_PREFIX = '@@KG_';
exports.ADDRESS_PREFIX = ADDRESS_PREFIX;

var getActionForwardAddress = function getActionForwardAddress(id) {
  return "".concat(ADDRESS_PREFIX).concat(id.toUpperCase());
};
/**
 * Wrap an action into a forward action that only modify the state of a specific
 * kepler.gl instance. kepler.gl reducer will look for signatures in the action to
 * determine whether it needs to be forwarded to a specific instance reducer.
 *
 * wrapTo can be curried. You can create a curried action wrapper by only supply the `id` argument
 *
 * A forward action looks like this
 * ```js
 *  {
 *    type: "@@kepler.gl/LAYER_CONFIG_CHANGE",
 *    payload: {
 *      type: '@@kepler.gl/LAYER_CONFIG_CHANGE',
 *      payload: {},
 *      meta: {
 *       // id of instance
 *        _id_: id
 *       // other meta
 *      }
 *    },
 *    meta: {
 *      _forward_: '@redux-forward/FORWARD',
 *      _addr_: '@@KG_id'
 *    }
 *  };
 * ```
 *
 * @memberof forwardActions
 * @param {string} id - The id to forward to
 * @param {Object} action - the action object {type: string, payload: *}
 * @returns {{type: string, payload: {type: string: payload: *, meta: {_id_: string}, meta: {_forward_: string, _addr_: string}}}}
 * @public
 * @example
 *
 * import {wrapTo, togglePerspective} from 'kepler.gl/actions';
 *
 * // This action will only dispatch to the KeplerGl instance with `id: map_1`
 * this.props.dispatch(wrapTo('map_1', togglePerspective()));
 *
 * // You can also create a curried action for each instance
 * const wrapToMap1 = wrapTo('map_1');
 * this.props.dispatch(wrapToMap1(togglePerspective()));
 */


exports.getActionForwardAddress = getActionForwardAddress;
var wrapTo = (0, _lodash["default"])(function (id, action) {
  return {
    // keep original action.type
    type: action.type,
    // actual action
    payload: (0, _objectSpread3["default"])({}, action, {
      meta: (0, _objectSpread3["default"])({}, action.meta, {
        _id_: id
      })
    }),
    // add forward signature to meta
    meta: (0, _objectSpread3["default"])({}, action.meta || {}, {
      _forward_: FORWARD,
      _addr_: getActionForwardAddress(id)
    })
  };
});
/**
 * Whether an action is a forward action
 * @memberof forwardActions
 * @param {Object} action - the action object
 * @returns {boolean} boolean - whether the action is a forward action
 * @public
 */

exports.wrapTo = wrapTo;

var isForwardAction = function isForwardAction(action) {
  return Boolean(action && action.meta && action.meta._forward_ === FORWARD);
};
/**
 * Unwrap an action
 * @memberof forwardActions
 * @param {Object} action - the action object
 * @returns {Object} - unwrapped action
 * @public
 */


exports.isForwardAction = isForwardAction;

var unwrap = function unwrap(action) {
  return isForwardAction(action) ? unwrap(action.payload) : action;
};
/**
 * Given an id, returns the action for that id.
 * If the action is not a forward action, return the action
 * @memberof forwardActions
 * @param {String} id
 * @param {Object} action
 * @private
 */


exports.unwrap = unwrap;

var _actionFor = function _actionFor(id, action) {
  return isForwardAction(action) ? action.meta._addr_ === getActionForwardAddress(id) ? action.payload : {} : action;
};
/**
 * Returns an action dispatcher that wraps and forwards the actions to a specific instance
 * @memberof forwardActions
 * @param {string} id - instance id
 * @param {Function} dispatch - action dispatcher
 * @public
 * @example
 *
 * // action and forward dispatcher
 * import {toggleSplitMap, forwardTo} from 'kepler.gl/actions';
 * import {connect} from 'react-redux';
 *
 * const MapContainer = props => (
 *  <div>
 *   <button onClick={() => props.keplerGlDispatch(toggleSplitMap())}/>
 *  </div>
 * )
 *
 * const mapDispatchToProps = (dispatch, props) => ({
 *  dispatch,
 *  keplerGlDispatch: forwardTo(‘foo’, dispatch)
 * });
 *
 * export default connect(
 *  state => state,
 *  mapDispatchToProps
 * )(MapContainer);
 */


exports._actionFor = _actionFor;

var forwardTo = function forwardTo(id, dispatch) {
  return function (action) {
    return dispatch(wrapTo(id, action));
  };
};
/**
 * Update the state of a kepler.gl instance
 * @memberof forwardActions
 * @param {Object} state
 * @param {string} id
 * @param {Object} nextState
 * @private
 */


exports.forwardTo = forwardTo;

var _updateProperty = function _updateProperty(state, id, nextState) {
  return state[id] === nextState ? state : (0, _objectSpread3["default"])({}, state, (0, _defineProperty2["default"])({}, id, nextState));
};
/**
 * This declaration is needed to group actions in docs
 */

/**
 * A set of helpers to forward dispatch actions to a specific instance reducer
 * @public
 */

/* eslint-disable no-unused-vars */


exports._updateProperty = _updateProperty;
var forwardActions = null;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2FjdGlvbi13cmFwcGVyLmpzIl0sIm5hbWVzIjpbIkZPUldBUkQiLCJBRERSRVNTX1BSRUZJWCIsImdldEFjdGlvbkZvcndhcmRBZGRyZXNzIiwiaWQiLCJ0b1VwcGVyQ2FzZSIsIndyYXBUbyIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIiwibWV0YSIsIl9pZF8iLCJfZm9yd2FyZF8iLCJfYWRkcl8iLCJpc0ZvcndhcmRBY3Rpb24iLCJCb29sZWFuIiwidW53cmFwIiwiX2FjdGlvbkZvciIsImZvcndhcmRUbyIsImRpc3BhdGNoIiwiX3VwZGF0ZVByb3BlcnR5Iiwic3RhdGUiLCJuZXh0U3RhdGUiLCJmb3J3YXJkQWN0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQXVCQTs7QUF2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFTyxJQUFNQSxPQUFPLEdBQUcsd0JBQWhCOztBQUNBLElBQU1DLGNBQWMsR0FBRyxPQUF2Qjs7O0FBSUEsSUFBTUMsdUJBQXVCLEdBQUcsU0FBMUJBLHVCQUEwQixDQUFBQyxFQUFFO0FBQUEsbUJBQ3BDRixjQURvQyxTQUNuQkUsRUFBRSxDQUFDQyxXQUFILEVBRG1CO0FBQUEsQ0FBbEM7QUFHUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJDTyxJQUFNQyxNQUFNLEdBQUcsd0JBQU0sVUFBQ0YsRUFBRCxFQUFLRyxNQUFMO0FBQUEsU0FBaUI7QUFDM0M7QUFDQUMsSUFBQUEsSUFBSSxFQUFFRCxNQUFNLENBQUNDLElBRjhCO0FBSTNDO0FBQ0FDLElBQUFBLE9BQU8scUNBQ0ZGLE1BREU7QUFFTEcsTUFBQUEsSUFBSSxxQ0FDQ0gsTUFBTSxDQUFDRyxJQURSO0FBRUZDLFFBQUFBLElBQUksRUFBRVA7QUFGSjtBQUZDLE1BTG9DO0FBYTNDO0FBQ0FNLElBQUFBLElBQUkscUNBQ0VILE1BQU0sQ0FBQ0csSUFBUCxJQUFlLEVBRGpCO0FBRUZFLE1BQUFBLFNBQVMsRUFBRVgsT0FGVDtBQUdGWSxNQUFBQSxNQUFNLEVBQUVWLHVCQUF1QixDQUFDQyxFQUFEO0FBSDdCO0FBZHVDLEdBQWpCO0FBQUEsQ0FBTixDQUFmO0FBcUJQOzs7Ozs7Ozs7O0FBT08sSUFBTVUsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFBUCxNQUFNLEVBQUk7QUFDdkMsU0FBT1EsT0FBTyxDQUFDUixNQUFNLElBQUlBLE1BQU0sQ0FBQ0csSUFBakIsSUFBeUJILE1BQU0sQ0FBQ0csSUFBUCxDQUFZRSxTQUFaLEtBQTBCWCxPQUFwRCxDQUFkO0FBQ0QsQ0FGTTtBQUlQOzs7Ozs7Ozs7OztBQU9PLElBQU1lLE1BQU0sR0FBRyxTQUFUQSxNQUFTLENBQUFULE1BQU07QUFBQSxTQUMxQk8sZUFBZSxDQUFDUCxNQUFELENBQWYsR0FBMEJTLE1BQU0sQ0FBQ1QsTUFBTSxDQUFDRSxPQUFSLENBQWhDLEdBQW1ERixNQUR6QjtBQUFBLENBQXJCO0FBR1A7Ozs7Ozs7Ozs7OztBQVFPLElBQU1VLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNiLEVBQUQsRUFBS0csTUFBTDtBQUFBLFNBQ3hCTyxlQUFlLENBQUNQLE1BQUQsQ0FBZixHQUNJQSxNQUFNLENBQUNHLElBQVAsQ0FBWUcsTUFBWixLQUF1QlYsdUJBQXVCLENBQUNDLEVBQUQsQ0FBOUMsR0FBcURHLE1BQU0sQ0FBQ0UsT0FBNUQsR0FBc0UsRUFEMUUsR0FFSUYsTUFIb0I7QUFBQSxDQUFuQjtBQUtQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCTyxJQUFNVyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDZCxFQUFELEVBQUtlLFFBQUw7QUFBQSxTQUFrQixVQUFBWixNQUFNO0FBQUEsV0FDL0NZLFFBQVEsQ0FBQ2IsTUFBTSxDQUFDRixFQUFELEVBQUtHLE1BQUwsQ0FBUCxDQUR1QztBQUFBLEdBQXhCO0FBQUEsQ0FBbEI7QUFHUDs7Ozs7Ozs7Ozs7O0FBUU8sSUFBTWEsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFDQyxLQUFELEVBQVFqQixFQUFSLEVBQVlrQixTQUFaO0FBQUEsU0FDN0JELEtBQUssQ0FBQ2pCLEVBQUQsQ0FBTCxLQUFja0IsU0FBZCxHQUNJRCxLQURKLHNDQUdTQSxLQUhULHVDQUlPakIsRUFKUCxFQUlZa0IsU0FKWixFQUQ2QjtBQUFBLENBQXhCO0FBUVA7Ozs7QUFHQTs7Ozs7QUFJQTs7OztBQUNBLElBQU1DLGNBQWMsR0FBRyxJQUF2QjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuZXhwb3J0IGNvbnN0IEZPUldBUkQgPSAnQHJlZHV4LWZvcndhcmQvRk9SV0FSRCc7XG5leHBvcnQgY29uc3QgQUREUkVTU19QUkVGSVggPSAnQEBLR18nO1xuXG5pbXBvcnQgY3VycnkgZnJvbSAnbG9kYXNoLmN1cnJ5JztcblxuZXhwb3J0IGNvbnN0IGdldEFjdGlvbkZvcndhcmRBZGRyZXNzID0gaWQgPT5cbiAgYCR7QUREUkVTU19QUkVGSVh9JHtpZC50b1VwcGVyQ2FzZSgpfWA7XG5cbi8qKlxuICogV3JhcCBhbiBhY3Rpb24gaW50byBhIGZvcndhcmQgYWN0aW9uIHRoYXQgb25seSBtb2RpZnkgdGhlIHN0YXRlIG9mIGEgc3BlY2lmaWNcbiAqIGtlcGxlci5nbCBpbnN0YW5jZS4ga2VwbGVyLmdsIHJlZHVjZXIgd2lsbCBsb29rIGZvciBzaWduYXR1cmVzIGluIHRoZSBhY3Rpb24gdG9cbiAqIGRldGVybWluZSB3aGV0aGVyIGl0IG5lZWRzIHRvIGJlIGZvcndhcmRlZCB0byBhIHNwZWNpZmljIGluc3RhbmNlIHJlZHVjZXIuXG4gKlxuICogd3JhcFRvIGNhbiBiZSBjdXJyaWVkLiBZb3UgY2FuIGNyZWF0ZSBhIGN1cnJpZWQgYWN0aW9uIHdyYXBwZXIgYnkgb25seSBzdXBwbHkgdGhlIGBpZGAgYXJndW1lbnRcbiAqXG4gKiBBIGZvcndhcmQgYWN0aW9uIGxvb2tzIGxpa2UgdGhpc1xuICogYGBganNcbiAqICB7XG4gKiAgICB0eXBlOiBcIkBAa2VwbGVyLmdsL0xBWUVSX0NPTkZJR19DSEFOR0VcIixcbiAqICAgIHBheWxvYWQ6IHtcbiAqICAgICAgdHlwZTogJ0BAa2VwbGVyLmdsL0xBWUVSX0NPTkZJR19DSEFOR0UnLFxuICogICAgICBwYXlsb2FkOiB7fSxcbiAqICAgICAgbWV0YToge1xuICogICAgICAgLy8gaWQgb2YgaW5zdGFuY2VcbiAqICAgICAgICBfaWRfOiBpZFxuICogICAgICAgLy8gb3RoZXIgbWV0YVxuICogICAgICB9XG4gKiAgICB9LFxuICogICAgbWV0YToge1xuICogICAgICBfZm9yd2FyZF86ICdAcmVkdXgtZm9yd2FyZC9GT1JXQVJEJyxcbiAqICAgICAgX2FkZHJfOiAnQEBLR19pZCdcbiAqICAgIH1cbiAqICB9O1xuICogYGBgXG4gKlxuICogQG1lbWJlcm9mIGZvcndhcmRBY3Rpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgaWQgdG8gZm9yd2FyZCB0b1xuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiAtIHRoZSBhY3Rpb24gb2JqZWN0IHt0eXBlOiBzdHJpbmcsIHBheWxvYWQ6ICp9XG4gKiBAcmV0dXJucyB7e3R5cGU6IHN0cmluZywgcGF5bG9hZDoge3R5cGU6IHN0cmluZzogcGF5bG9hZDogKiwgbWV0YToge19pZF86IHN0cmluZ30sIG1ldGE6IHtfZm9yd2FyZF86IHN0cmluZywgX2FkZHJfOiBzdHJpbmd9fX19XG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIGltcG9ydCB7d3JhcFRvLCB0b2dnbGVQZXJzcGVjdGl2ZX0gZnJvbSAna2VwbGVyLmdsL2FjdGlvbnMnO1xuICpcbiAqIC8vIFRoaXMgYWN0aW9uIHdpbGwgb25seSBkaXNwYXRjaCB0byB0aGUgS2VwbGVyR2wgaW5zdGFuY2Ugd2l0aCBgaWQ6IG1hcF8xYFxuICogdGhpcy5wcm9wcy5kaXNwYXRjaCh3cmFwVG8oJ21hcF8xJywgdG9nZ2xlUGVyc3BlY3RpdmUoKSkpO1xuICpcbiAqIC8vIFlvdSBjYW4gYWxzbyBjcmVhdGUgYSBjdXJyaWVkIGFjdGlvbiBmb3IgZWFjaCBpbnN0YW5jZVxuICogY29uc3Qgd3JhcFRvTWFwMSA9IHdyYXBUbygnbWFwXzEnKTtcbiAqIHRoaXMucHJvcHMuZGlzcGF0Y2god3JhcFRvTWFwMSh0b2dnbGVQZXJzcGVjdGl2ZSgpKSk7XG4gKi9cbmV4cG9ydCBjb25zdCB3cmFwVG8gPSBjdXJyeSgoaWQsIGFjdGlvbikgPT4gKHtcbiAgLy8ga2VlcCBvcmlnaW5hbCBhY3Rpb24udHlwZVxuICB0eXBlOiBhY3Rpb24udHlwZSxcblxuICAvLyBhY3R1YWwgYWN0aW9uXG4gIHBheWxvYWQ6IHtcbiAgICAuLi5hY3Rpb24sXG4gICAgbWV0YToge1xuICAgICAgLi4uYWN0aW9uLm1ldGEsXG4gICAgICBfaWRfOiBpZFxuICAgIH1cbiAgfSxcblxuICAvLyBhZGQgZm9yd2FyZCBzaWduYXR1cmUgdG8gbWV0YVxuICBtZXRhOiB7XG4gICAgLi4uKGFjdGlvbi5tZXRhIHx8IHt9KSxcbiAgICBfZm9yd2FyZF86IEZPUldBUkQsXG4gICAgX2FkZHJfOiBnZXRBY3Rpb25Gb3J3YXJkQWRkcmVzcyhpZClcbiAgfVxufSkpO1xuXG4vKipcbiAqIFdoZXRoZXIgYW4gYWN0aW9uIGlzIGEgZm9yd2FyZCBhY3Rpb25cbiAqIEBtZW1iZXJvZiBmb3J3YXJkQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiAtIHRoZSBhY3Rpb24gb2JqZWN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYm9vbGVhbiAtIHdoZXRoZXIgdGhlIGFjdGlvbiBpcyBhIGZvcndhcmQgYWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBjb25zdCBpc0ZvcndhcmRBY3Rpb24gPSBhY3Rpb24gPT4ge1xuICByZXR1cm4gQm9vbGVhbihhY3Rpb24gJiYgYWN0aW9uLm1ldGEgJiYgYWN0aW9uLm1ldGEuX2ZvcndhcmRfID09PSBGT1JXQVJEKTtcbn07XG5cbi8qKlxuICogVW53cmFwIGFuIGFjdGlvblxuICogQG1lbWJlcm9mIGZvcndhcmRBY3Rpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIC0gdGhlIGFjdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9IC0gdW53cmFwcGVkIGFjdGlvblxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgdW53cmFwID0gYWN0aW9uID0+XG4gIGlzRm9yd2FyZEFjdGlvbihhY3Rpb24pID8gdW53cmFwKGFjdGlvbi5wYXlsb2FkKSA6IGFjdGlvbjtcblxuLyoqXG4gKiBHaXZlbiBhbiBpZCwgcmV0dXJucyB0aGUgYWN0aW9uIGZvciB0aGF0IGlkLlxuICogSWYgdGhlIGFjdGlvbiBpcyBub3QgYSBmb3J3YXJkIGFjdGlvbiwgcmV0dXJuIHRoZSBhY3Rpb25cbiAqIEBtZW1iZXJvZiBmb3J3YXJkQWN0aW9uc1xuICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgX2FjdGlvbkZvciA9IChpZCwgYWN0aW9uKSA9PlxuICBpc0ZvcndhcmRBY3Rpb24oYWN0aW9uKVxuICAgID8gYWN0aW9uLm1ldGEuX2FkZHJfID09PSBnZXRBY3Rpb25Gb3J3YXJkQWRkcmVzcyhpZCkgPyBhY3Rpb24ucGF5bG9hZCA6IHt9XG4gICAgOiBhY3Rpb247XG5cbi8qKlxuICogUmV0dXJucyBhbiBhY3Rpb24gZGlzcGF0Y2hlciB0aGF0IHdyYXBzIGFuZCBmb3J3YXJkcyB0aGUgYWN0aW9ucyB0byBhIHNwZWNpZmljIGluc3RhbmNlXG4gKiBAbWVtYmVyb2YgZm9yd2FyZEFjdGlvbnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIGluc3RhbmNlIGlkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCAtIGFjdGlvbiBkaXNwYXRjaGVyXG4gKiBAcHVibGljXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIGFjdGlvbiBhbmQgZm9yd2FyZCBkaXNwYXRjaGVyXG4gKiBpbXBvcnQge3RvZ2dsZVNwbGl0TWFwLCBmb3J3YXJkVG99IGZyb20gJ2tlcGxlci5nbC9hY3Rpb25zJztcbiAqIGltcG9ydCB7Y29ubmVjdH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuICpcbiAqIGNvbnN0IE1hcENvbnRhaW5lciA9IHByb3BzID0+IChcbiAqICA8ZGl2PlxuICogICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHByb3BzLmtlcGxlckdsRGlzcGF0Y2godG9nZ2xlU3BsaXRNYXAoKSl9Lz5cbiAqICA8L2Rpdj5cbiAqIClcbiAqXG4gKiBjb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gsIHByb3BzKSA9PiAoe1xuICogIGRpc3BhdGNoLFxuICogIGtlcGxlckdsRGlzcGF0Y2g6IGZvcndhcmRUbyjigJhmb2/igJksIGRpc3BhdGNoKVxuICogfSk7XG4gKlxuICogZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAqICBzdGF0ZSA9PiBzdGF0ZSxcbiAqICBtYXBEaXNwYXRjaFRvUHJvcHNcbiAqICkoTWFwQ29udGFpbmVyKTtcbiAqL1xuZXhwb3J0IGNvbnN0IGZvcndhcmRUbyA9IChpZCwgZGlzcGF0Y2gpID0+IGFjdGlvbiA9PlxuICBkaXNwYXRjaCh3cmFwVG8oaWQsIGFjdGlvbikpO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgYSBrZXBsZXIuZ2wgaW5zdGFuY2VcbiAqIEBtZW1iZXJvZiBmb3J3YXJkQWN0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBuZXh0U3RhdGVcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBjb25zdCBfdXBkYXRlUHJvcGVydHkgPSAoc3RhdGUsIGlkLCBuZXh0U3RhdGUpID0+XG4gIHN0YXRlW2lkXSA9PT0gbmV4dFN0YXRlXG4gICAgPyBzdGF0ZVxuICAgIDoge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW2lkXTogbmV4dFN0YXRlXG4gICAgICB9O1xuXG4vKipcbiAqIFRoaXMgZGVjbGFyYXRpb24gaXMgbmVlZGVkIHRvIGdyb3VwIGFjdGlvbnMgaW4gZG9jc1xuICovXG4vKipcbiAqIEEgc2V0IG9mIGhlbHBlcnMgdG8gZm9yd2FyZCBkaXNwYXRjaCBhY3Rpb25zIHRvIGEgc3BlY2lmaWMgaW5zdGFuY2UgcmVkdWNlclxuICogQHB1YmxpY1xuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xuY29uc3QgZm9yd2FyZEFjdGlvbnMgPSBudWxsXG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4iXX0=