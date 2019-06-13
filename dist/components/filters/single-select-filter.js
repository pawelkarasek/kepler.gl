"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _itemSelector = _interopRequireDefault(require("../common/item-selector/item-selector"));

var _styledComponents = require("../common/styled-components");

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
var SingleSelectFilter = function SingleSelectFilter(_ref) {
  var filter = _ref.filter,
      setFilter = _ref.setFilter;
  return _react["default"].createElement(_styledComponents.SidePanelSection, null, _react["default"].createElement(_styledComponents.PanelLabel, null, "Value equals"), _react["default"].createElement(_itemSelector["default"], {
    selectedItems: filter.value,
    placeholder: "Select a Value",
    options: filter.domain,
    multiSelect: false,
    searchable: false,
    displayOption: function displayOption(d) {
      return String(d);
    },
    getOptionValue: function getOptionValue(d) {
      return d;
    },
    onChange: setFilter,
    inputTheme: "secondary"
  }));
};

var _default = SingleSelectFilter;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2ZpbHRlcnMvc2luZ2xlLXNlbGVjdC1maWx0ZXIuanMiXSwibmFtZXMiOlsiU2luZ2xlU2VsZWN0RmlsdGVyIiwiZmlsdGVyIiwic2V0RmlsdGVyIiwidmFsdWUiLCJkb21haW4iLCJkIiwiU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTUEsSUFBTUEsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQjtBQUFBLE1BQUVDLE1BQUYsUUFBRUEsTUFBRjtBQUFBLE1BQVVDLFNBQVYsUUFBVUEsU0FBVjtBQUFBLFNBQ3pCLGdDQUFDLGtDQUFELFFBQ0UsZ0NBQUMsNEJBQUQsdUJBREYsRUFFRSxnQ0FBQyx3QkFBRDtBQUNFLElBQUEsYUFBYSxFQUFFRCxNQUFNLENBQUNFLEtBRHhCO0FBRUUsSUFBQSxXQUFXLEVBQUMsZ0JBRmQ7QUFHRSxJQUFBLE9BQU8sRUFBRUYsTUFBTSxDQUFDRyxNQUhsQjtBQUlFLElBQUEsV0FBVyxFQUFFLEtBSmY7QUFLRSxJQUFBLFVBQVUsRUFBRSxLQUxkO0FBTUUsSUFBQSxhQUFhLEVBQUUsdUJBQUFDLENBQUM7QUFBQSxhQUFJQyxNQUFNLENBQUNELENBQUQsQ0FBVjtBQUFBLEtBTmxCO0FBT0UsSUFBQSxjQUFjLEVBQUUsd0JBQUFBLENBQUM7QUFBQSxhQUFJQSxDQUFKO0FBQUEsS0FQbkI7QUFRRSxJQUFBLFFBQVEsRUFBRUgsU0FSWjtBQVNFLElBQUEsVUFBVSxFQUFDO0FBVGIsSUFGRixDQUR5QjtBQUFBLENBQTNCOztlQWlCZUYsa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEl0ZW1TZWxlY3RvciBmcm9tICcuLi9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcbmltcG9ydCB7UGFuZWxMYWJlbCwgU2lkZVBhbmVsU2VjdGlvbn0gZnJvbSAnLi4vY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcblxuY29uc3QgU2luZ2xlU2VsZWN0RmlsdGVyID0gKHtmaWx0ZXIsIHNldEZpbHRlcn0pID0+IChcbiAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgPFBhbmVsTGFiZWw+VmFsdWUgZXF1YWxzPC9QYW5lbExhYmVsPlxuICAgIDxJdGVtU2VsZWN0b3JcbiAgICAgIHNlbGVjdGVkSXRlbXM9e2ZpbHRlci52YWx1ZX1cbiAgICAgIHBsYWNlaG9sZGVyPVwiU2VsZWN0IGEgVmFsdWVcIlxuICAgICAgb3B0aW9ucz17ZmlsdGVyLmRvbWFpbn1cbiAgICAgIG11bHRpU2VsZWN0PXtmYWxzZX1cbiAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgZGlzcGxheU9wdGlvbj17ZCA9PiBTdHJpbmcoZCl9XG4gICAgICBnZXRPcHRpb25WYWx1ZT17ZCA9PiBkfVxuICAgICAgb25DaGFuZ2U9e3NldEZpbHRlcn1cbiAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgIC8+XG4gIDwvU2lkZVBhbmVsU2VjdGlvbj5cbik7XG5cbmV4cG9ydCBkZWZhdWx0IFNpbmdsZVNlbGVjdEZpbHRlcjtcbiJdfQ==