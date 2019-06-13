"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateHashId = generateHashId;
exports.isChrome = isChrome;
exports.isPlainObject = isPlainObject;
exports.notNullorUndefined = notNullorUndefined;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.camelToTitle = camelToTitle;

var _window = _interopRequireDefault(require("global/window"));

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
 * Generate a hash string based on number of character
 * @param {number} count
 * @returns {string} hash string
 */
function generateHashId() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
  return Math.random().toString(36).substr(count);
}
/**
 * Detect chrome
 * @returns {boolean} - yes or no
 */


function isChrome() {
  // Chrome 1+
  return _window["default"].chrome && _window["default"].chrome.webstore;
}
/**
 * whether is an object
 * @returns {boolean} - yes or no
 */


function isPlainObject(obj) {
  return obj === Object(obj) && typeof obj !== 'function' && !Array.isArray(obj);
}
/**
 * whether null or undefined
 * @returns {boolean} - yes or no
 */


function notNullorUndefined(d) {
  return d !== undefined && d !== null;
}
/**
 * Capitalize first letter of a string
 * @param {string} str
 * @returns {string}
 */


function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Convert camel style names to title
 * strokeColor -> Stroke Color
 * @param {string} str
 * @returns {string}
 */


function camelToTitle(str) {
  var breakWord = str.replace(/([A-Z])/g, " $1");
  return capitalizeFirstLetter(breakWord);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91dGlscy5qcyJdLCJuYW1lcyI6WyJnZW5lcmF0ZUhhc2hJZCIsImNvdW50IiwiTWF0aCIsInJhbmRvbSIsInRvU3RyaW5nIiwic3Vic3RyIiwiaXNDaHJvbWUiLCJ3aW5kb3ciLCJjaHJvbWUiLCJ3ZWJzdG9yZSIsImlzUGxhaW5PYmplY3QiLCJvYmoiLCJPYmplY3QiLCJBcnJheSIsImlzQXJyYXkiLCJub3ROdWxsb3JVbmRlZmluZWQiLCJkIiwidW5kZWZpbmVkIiwiY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIiwic3RyIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImNhbWVsVG9UaXRsZSIsImJyZWFrV29yZCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQXBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJQTs7Ozs7QUFLTyxTQUFTQSxjQUFULEdBQW1DO0FBQUEsTUFBWEMsS0FBVyx1RUFBSCxDQUFHO0FBQ3hDLFNBQU9DLElBQUksQ0FBQ0MsTUFBTCxHQUNKQyxRQURJLENBQ0ssRUFETCxFQUVKQyxNQUZJLENBRUdKLEtBRkgsQ0FBUDtBQUdEO0FBRUQ7Ozs7OztBQUlPLFNBQVNLLFFBQVQsR0FBb0I7QUFDekI7QUFDQSxTQUFPQyxtQkFBT0MsTUFBUCxJQUFpQkQsbUJBQU9DLE1BQVAsQ0FBY0MsUUFBdEM7QUFDRDtBQUVEOzs7Ozs7QUFJTyxTQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QjtBQUNqQyxTQUNFQSxHQUFHLEtBQUtDLE1BQU0sQ0FBQ0QsR0FBRCxDQUFkLElBQXVCLE9BQU9BLEdBQVAsS0FBZSxVQUF0QyxJQUFvRCxDQUFDRSxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsR0FBZCxDQUR2RDtBQUdEO0FBRUQ7Ozs7OztBQUlPLFNBQVNJLGtCQUFULENBQTRCQyxDQUE1QixFQUErQjtBQUNwQyxTQUFPQSxDQUFDLEtBQUtDLFNBQU4sSUFBbUJELENBQUMsS0FBSyxJQUFoQztBQUNEO0FBRUQ7Ozs7Ozs7QUFLTyxTQUFTRSxxQkFBVCxDQUErQkMsR0FBL0IsRUFBb0M7QUFDekMsU0FBT0EsR0FBRyxDQUFDQyxNQUFKLENBQVcsQ0FBWCxFQUFjQyxXQUFkLEtBQThCRixHQUFHLENBQUNHLEtBQUosQ0FBVSxDQUFWLENBQXJDO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNTyxTQUFTQyxZQUFULENBQXNCSixHQUF0QixFQUEwQjtBQUMvQixNQUFNSyxTQUFTLEdBQUdMLEdBQUcsQ0FBQ00sT0FBSixDQUFhLFVBQWIsRUFBeUIsS0FBekIsQ0FBbEI7QUFDQSxTQUFPUCxxQkFBcUIsQ0FBQ00sU0FBRCxDQUE1QjtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGhhc2ggc3RyaW5nIGJhc2VkIG9uIG51bWJlciBvZiBjaGFyYWN0ZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjb3VudFxuICogQHJldHVybnMge3N0cmluZ30gaGFzaCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSGFzaElkKGNvdW50ID0gNikge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKVxuICAgIC50b1N0cmluZygzNilcbiAgICAuc3Vic3RyKGNvdW50KTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgY2hyb21lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSB5ZXMgb3Igbm9cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAvLyBDaHJvbWUgMStcbiAgcmV0dXJuIHdpbmRvdy5jaHJvbWUgJiYgd2luZG93LmNocm9tZS53ZWJzdG9yZTtcbn1cblxuLyoqXG4gKiB3aGV0aGVyIGlzIGFuIG9iamVjdFxuICogQHJldHVybnMge2Jvb2xlYW59IC0geWVzIG9yIG5vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1BsYWluT2JqZWN0KG9iaikge1xuICByZXR1cm4gKFxuICAgIG9iaiA9PT0gT2JqZWN0KG9iaikgJiYgdHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJyAmJiAhQXJyYXkuaXNBcnJheShvYmopXG4gICk7XG59XG5cbi8qKlxuICogd2hldGhlciBudWxsIG9yIHVuZGVmaW5lZFxuICogQHJldHVybnMge2Jvb2xlYW59IC0geWVzIG9yIG5vXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3ROdWxsb3JVbmRlZmluZWQoZCkge1xuICByZXR1cm4gZCAhPT0gdW5kZWZpbmVkICYmIGQgIT09IG51bGw7XG59XG5cbi8qKlxuICogQ2FwaXRhbGl6ZSBmaXJzdCBsZXR0ZXIgb2YgYSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyKSB7XG4gIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbi8qKlxuICogQ29udmVydCBjYW1lbCBzdHlsZSBuYW1lcyB0byB0aXRsZVxuICogc3Ryb2tlQ29sb3IgLT4gU3Ryb2tlIENvbG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FtZWxUb1RpdGxlKHN0cil7XG4gIGNvbnN0IGJyZWFrV29yZCA9IHN0ci5yZXBsYWNlKCAvKFtBLVpdKS9nLCBcIiAkMVwiICk7XG4gIHJldHVybiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoYnJlYWtXb3JkKTtcbn1cbiJdfQ==