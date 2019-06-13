"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _rangeSlider = _interopRequireDefault(require("../../common/range-slider"));

var _styledComponents = require("../../common/styled-components");

var _interactionUtils = require("../../../utils/interaction-utils");

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
function BrushConfigFactory() {
  var BrushConfig = function BrushConfig(_ref) {
    var config = _ref.config,
        _onChange = _ref.onChange;
    return _react["default"].createElement(_styledComponents.SidePanelSection, null, _react["default"].createElement(_styledComponents.PanelLabel, null, "Brush Radius (km)"), _react["default"].createElement(_rangeSlider["default"], {
      range: _interactionUtils.BRUSH_CONFIG.range,
      value0: 0,
      value1: config.size || 10 / 2,
      step: 0.1,
      isRanged: false,
      onChange: function onChange(value) {
        return _onChange((0, _objectSpread2["default"])({}, config, {
          size: value[1]
        }));
      },
      inputTheme: "secondary"
    }));
  };

  return BrushConfig;
}

var _default = BrushConfigFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwvYnJ1c2gtY29uZmlnLmpzIl0sIm5hbWVzIjpbIkJydXNoQ29uZmlnRmFjdG9yeSIsIkJydXNoQ29uZmlnIiwiY29uZmlnIiwib25DaGFuZ2UiLCJCUlVTSF9DT05GSUciLCJyYW5nZSIsInNpemUiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBRUE7O0FBSUE7O0FBM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBV0EsU0FBU0Esa0JBQVQsR0FBOEI7QUFDNUIsTUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQWM7QUFBQSxRQUFFQyxNQUFGLFFBQUVBLE1BQUY7QUFBQSxRQUFVQyxTQUFWLFFBQVVBLFFBQVY7QUFBQSxXQUNsQixnQ0FBQyxrQ0FBRCxRQUNFLGdDQUFDLDRCQUFELDRCQURGLEVBRUUsZ0NBQUMsdUJBQUQ7QUFDRSxNQUFBLEtBQUssRUFBRUMsK0JBQWFDLEtBRHRCO0FBRUUsTUFBQSxNQUFNLEVBQUUsQ0FGVjtBQUdFLE1BQUEsTUFBTSxFQUFFSCxNQUFNLENBQUNJLElBQVAsSUFBZSxLQUFLLENBSDlCO0FBSUUsTUFBQSxJQUFJLEVBQUUsR0FKUjtBQUtFLE1BQUEsUUFBUSxFQUFFLEtBTFo7QUFNRSxNQUFBLFFBQVEsRUFBRSxrQkFBQUMsS0FBSztBQUFBLGVBQUlKLFNBQVEsb0NBQUtELE1BQUw7QUFBYUksVUFBQUEsSUFBSSxFQUFFQyxLQUFLLENBQUMsQ0FBRDtBQUF4QixXQUFaO0FBQUEsT0FOakI7QUFPRSxNQUFBLFVBQVUsRUFBQztBQVBiLE1BRkYsQ0FEa0I7QUFBQSxHQUFwQjs7QUFlQSxTQUFPTixXQUFQO0FBQ0Q7O2VBRWNELGtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSYW5nZVNsaWRlciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9yYW5nZS1zbGlkZXInO1xuXG5pbXBvcnQge1xuICBQYW5lbExhYmVsLFxuICBTaWRlUGFuZWxTZWN0aW9uXG59IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7QlJVU0hfQ09ORklHfSBmcm9tICd1dGlscy9pbnRlcmFjdGlvbi11dGlscyc7XG5cbmZ1bmN0aW9uIEJydXNoQ29uZmlnRmFjdG9yeSgpIHtcbiAgY29uc3QgQnJ1c2hDb25maWcgPSAoe2NvbmZpZywgb25DaGFuZ2V9KSA9PiAoXG4gICAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgICA8UGFuZWxMYWJlbD5CcnVzaCBSYWRpdXMgKGttKTwvUGFuZWxMYWJlbD5cbiAgICAgIDxSYW5nZVNsaWRlclxuICAgICAgICByYW5nZT17QlJVU0hfQ09ORklHLnJhbmdlfVxuICAgICAgICB2YWx1ZTA9ezB9XG4gICAgICAgIHZhbHVlMT17Y29uZmlnLnNpemUgfHwgMTAgLyAyfVxuICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgIGlzUmFuZ2VkPXtmYWxzZX1cbiAgICAgICAgb25DaGFuZ2U9e3ZhbHVlID0+IG9uQ2hhbmdlKHsuLi5jb25maWcsIHNpemU6IHZhbHVlWzFdfSl9XG4gICAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgICAgLz5cbiAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICk7XG5cbiAgcmV0dXJuIEJydXNoQ29uZmlnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBCcnVzaENvbmZpZ0ZhY3Rvcnk7XG4iXX0=