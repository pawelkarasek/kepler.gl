"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = require("../common/styled-components");

var _icons = require("../common/icons");

var _sourceDataCatalog = _interopRequireDefault(require("./source-data-catalog"));

var _filterPanel = _interopRequireDefault(require("./filter-panel/filter-panel"));

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
FilterManagerFactory.deps = [_sourceDataCatalog["default"], _filterPanel["default"]];

function FilterManagerFactory(SourceDataCatalog, FilterPanel) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(FilterManager, _Component);

    function FilterManager() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, FilterManager);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(FilterManager)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "datasetsSelector", function (state) {
        return state.datasets;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "defaultDatasetSelector", (0, _reselect.createSelector)(_this.datasetsSelector, function (datasets) {
        return Object.keys(datasets).length && Object.keys(datasets)[0] || null;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_addFilter", function () {
        var defaultDataset = _this.defaultDatasetSelector(_this.props);

        _this.props.addFilter(defaultDataset);
      });
      return _this;
    }

    (0, _createClass2["default"])(FilterManager, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            filters = _this$props.filters,
            datasets = _this$props.datasets;
        var isAnyFilterAnimating = filters.some(function (f) {
          return f.isAnimating;
        });
        var hadEmptyFilter = filters.some(function (f) {
          return !f.name;
        });
        var hadDataset = Object.keys(datasets).length;
        return _react["default"].createElement("div", {
          className: "filter-manager"
        }, _react["default"].createElement(SourceDataCatalog, {
          datasets: datasets,
          showDatasetTable: this.props.showDatasetTable
        }), _react["default"].createElement(_styledComponents.SidePanelDivider, null), _react["default"].createElement(_styledComponents.SidePanelSection, null, filters && filters.map(function (filter, idx) {
          return _react["default"].createElement(FilterPanel, {
            key: "".concat(filter.id, "-").concat(idx),
            idx: idx,
            filters: filters,
            filter: filter,
            datasets: datasets,
            isAnyFilterAnimating: isAnyFilterAnimating,
            removeFilter: function removeFilter() {
              return _this2.props.removeFilter(idx);
            },
            enlargeFilter: function enlargeFilter() {
              return _this2.props.enlargeFilter(idx);
            },
            toggleAnimation: function toggleAnimation() {
              return _this2.props.toggleAnimation(idx);
            },
            setFilter: _this2.props.setFilter
          });
        })), _react["default"].createElement(_styledComponents.Button, {
          inactive: hadEmptyFilter || !hadDataset,
          width: "105px",
          onClick: this._addFilter
        }, _react["default"].createElement(_icons.Add, {
          height: "12px"
        }), "Add Filter"));
      }
    }]);
    return FilterManager;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    datasets: _propTypes["default"].object,
    addFilter: _propTypes["default"].func.isRequired,
    removeFilter: _propTypes["default"].func.isRequired,
    enlargeFilter: _propTypes["default"].func.isRequired,
    toggleAnimation: _propTypes["default"].func.isRequired,
    setFilter: _propTypes["default"].func.isRequired,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    showDatasetTable: _propTypes["default"].func,
    // fields can be undefined when dataset is not selected
    fields: _propTypes["default"].arrayOf(_propTypes["default"].any)
  }), _temp;
}

var _default = FilterManagerFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZmlsdGVyLW1hbmFnZXIuanMiXSwibmFtZXMiOlsiRmlsdGVyTWFuYWdlckZhY3RvcnkiLCJkZXBzIiwiU291cmNlRGF0YUNhdGFsb2dGYWN0b3J5IiwiRmlsdGVyUGFuZWxGYWN0b3J5IiwiU291cmNlRGF0YUNhdGFsb2ciLCJGaWx0ZXJQYW5lbCIsInN0YXRlIiwiZGF0YXNldHMiLCJkYXRhc2V0c1NlbGVjdG9yIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImRlZmF1bHREYXRhc2V0IiwiZGVmYXVsdERhdGFzZXRTZWxlY3RvciIsInByb3BzIiwiYWRkRmlsdGVyIiwiZmlsdGVycyIsImlzQW55RmlsdGVyQW5pbWF0aW5nIiwic29tZSIsImYiLCJpc0FuaW1hdGluZyIsImhhZEVtcHR5RmlsdGVyIiwibmFtZSIsImhhZERhdGFzZXQiLCJzaG93RGF0YXNldFRhYmxlIiwibWFwIiwiZmlsdGVyIiwiaWR4IiwiaWQiLCJyZW1vdmVGaWx0ZXIiLCJlbmxhcmdlRmlsdGVyIiwidG9nZ2xlQW5pbWF0aW9uIiwic2V0RmlsdGVyIiwiX2FkZEZpbHRlciIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImZpZWxkcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFLQTs7QUFDQTs7QUFDQTs7QUE5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFjQUEsb0JBQW9CLENBQUNDLElBQXJCLEdBQTRCLENBQzFCQyw2QkFEMEIsRUFFMUJDLHVCQUYwQixDQUE1Qjs7QUFLQSxTQUFTSCxvQkFBVCxDQUE4QkksaUJBQTlCLEVBQWlEQyxXQUFqRCxFQUE4RDtBQUFBOztBQUM1RDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLDJHQWdCcUIsVUFBQUMsS0FBSztBQUFBLGVBQUlBLEtBQUssQ0FBQ0MsUUFBVjtBQUFBLE9BaEIxQjtBQUFBLGlIQWlCMkIsOEJBQ3ZCLE1BQUtDLGdCQURrQixFQUV2QixVQUFBRCxRQUFRO0FBQUEsZUFDTEUsTUFBTSxDQUFDQyxJQUFQLENBQVlILFFBQVosRUFBc0JJLE1BQXRCLElBQWdDRixNQUFNLENBQUNDLElBQVAsQ0FBWUgsUUFBWixFQUFzQixDQUF0QixDQUFqQyxJQUE4RCxJQUR4RDtBQUFBLE9BRmUsQ0FqQjNCO0FBQUEscUdBd0JlLFlBQU07QUFDakIsWUFBTUssY0FBYyxHQUFHLE1BQUtDLHNCQUFMLENBQTRCLE1BQUtDLEtBQWpDLENBQXZCOztBQUNBLGNBQUtBLEtBQUwsQ0FBV0MsU0FBWCxDQUFxQkgsY0FBckI7QUFDRCxPQTNCSDtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLCtCQTZCVztBQUFBOztBQUFBLDBCQUNxQixLQUFLRSxLQUQxQjtBQUFBLFlBQ0FFLE9BREEsZUFDQUEsT0FEQTtBQUFBLFlBQ1NULFFBRFQsZUFDU0EsUUFEVDtBQUVQLFlBQU1VLG9CQUFvQixHQUFHRCxPQUFPLENBQUNFLElBQVIsQ0FBYSxVQUFBQyxDQUFDO0FBQUEsaUJBQUlBLENBQUMsQ0FBQ0MsV0FBTjtBQUFBLFNBQWQsQ0FBN0I7QUFDQSxZQUFNQyxjQUFjLEdBQUdMLE9BQU8sQ0FBQ0UsSUFBUixDQUFhLFVBQUFDLENBQUM7QUFBQSxpQkFBSSxDQUFDQSxDQUFDLENBQUNHLElBQVA7QUFBQSxTQUFkLENBQXZCO0FBQ0EsWUFBTUMsVUFBVSxHQUFHZCxNQUFNLENBQUNDLElBQVAsQ0FBWUgsUUFBWixFQUFzQkksTUFBekM7QUFFQSxlQUNFO0FBQUssVUFBQSxTQUFTLEVBQUM7QUFBZixXQUNFLGdDQUFDLGlCQUFEO0FBQ0UsVUFBQSxRQUFRLEVBQUVKLFFBRFo7QUFFRSxVQUFBLGdCQUFnQixFQUFFLEtBQUtPLEtBQUwsQ0FBV1U7QUFGL0IsVUFERixFQUtFLGdDQUFDLGtDQUFELE9BTEYsRUFNRSxnQ0FBQyxrQ0FBRCxRQUNHUixPQUFPLElBQ05BLE9BQU8sQ0FBQ1MsR0FBUixDQUFZLFVBQUNDLE1BQUQsRUFBU0MsR0FBVDtBQUFBLGlCQUNWLGdDQUFDLFdBQUQ7QUFDRSxZQUFBLEdBQUcsWUFBS0QsTUFBTSxDQUFDRSxFQUFaLGNBQWtCRCxHQUFsQixDQURMO0FBRUUsWUFBQSxHQUFHLEVBQUVBLEdBRlA7QUFHRSxZQUFBLE9BQU8sRUFBRVgsT0FIWDtBQUlFLFlBQUEsTUFBTSxFQUFFVSxNQUpWO0FBS0UsWUFBQSxRQUFRLEVBQUVuQixRQUxaO0FBTUUsWUFBQSxvQkFBb0IsRUFBRVUsb0JBTnhCO0FBT0UsWUFBQSxZQUFZLEVBQUU7QUFBQSxxQkFBTSxNQUFJLENBQUNILEtBQUwsQ0FBV2UsWUFBWCxDQUF3QkYsR0FBeEIsQ0FBTjtBQUFBLGFBUGhCO0FBUUUsWUFBQSxhQUFhLEVBQUU7QUFBQSxxQkFBTSxNQUFJLENBQUNiLEtBQUwsQ0FBV2dCLGFBQVgsQ0FBeUJILEdBQXpCLENBQU47QUFBQSxhQVJqQjtBQVNFLFlBQUEsZUFBZSxFQUFFO0FBQUEscUJBQU0sTUFBSSxDQUFDYixLQUFMLENBQVdpQixlQUFYLENBQTJCSixHQUEzQixDQUFOO0FBQUEsYUFUbkI7QUFVRSxZQUFBLFNBQVMsRUFBRSxNQUFJLENBQUNiLEtBQUwsQ0FBV2tCO0FBVnhCLFlBRFU7QUFBQSxTQUFaLENBRkosQ0FORixFQXVCRSxnQ0FBQyx3QkFBRDtBQUNFLFVBQUEsUUFBUSxFQUFFWCxjQUFjLElBQUksQ0FBQ0UsVUFEL0I7QUFFRSxVQUFBLEtBQUssRUFBQyxPQUZSO0FBR0UsVUFBQSxPQUFPLEVBQUUsS0FBS1U7QUFIaEIsV0FLRSxnQ0FBQyxVQUFEO0FBQUssVUFBQSxNQUFNLEVBQUM7QUFBWixVQUxGLGVBdkJGLENBREY7QUFpQ0Q7QUFwRUg7QUFBQTtBQUFBLElBQW1DQyxnQkFBbkMseURBQ3FCO0FBQ2pCM0IsSUFBQUEsUUFBUSxFQUFFNEIsc0JBQVVDLE1BREg7QUFFakJyQixJQUFBQSxTQUFTLEVBQUVvQixzQkFBVUUsSUFBVixDQUFlQyxVQUZUO0FBR2pCVCxJQUFBQSxZQUFZLEVBQUVNLHNCQUFVRSxJQUFWLENBQWVDLFVBSFo7QUFJakJSLElBQUFBLGFBQWEsRUFBRUssc0JBQVVFLElBQVYsQ0FBZUMsVUFKYjtBQUtqQlAsSUFBQUEsZUFBZSxFQUFFSSxzQkFBVUUsSUFBVixDQUFlQyxVQUxmO0FBTWpCTixJQUFBQSxTQUFTLEVBQUVHLHNCQUFVRSxJQUFWLENBQWVDLFVBTlQ7QUFPakJ0QixJQUFBQSxPQUFPLEVBQUVtQixzQkFBVUksT0FBVixDQUFrQkosc0JBQVVLLEdBQTVCLEVBQWlDRixVQVB6QjtBQVFqQmQsSUFBQUEsZ0JBQWdCLEVBQUVXLHNCQUFVRSxJQVJYO0FBVWpCO0FBQ0FJLElBQUFBLE1BQU0sRUFBRU4sc0JBQVVJLE9BQVYsQ0FBa0JKLHNCQUFVSyxHQUE1QjtBQVhTLEdBRHJCO0FBc0VEOztlQUVjeEMsb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQge1xuICBTaWRlUGFuZWxTZWN0aW9uLFxuICBTaWRlUGFuZWxEaXZpZGVyLFxuICBCdXR0b25cbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtBZGR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBTb3VyY2VEYXRhQ2F0YWxvZ0ZhY3RvcnkgZnJvbSAnLi9zb3VyY2UtZGF0YS1jYXRhbG9nJztcbmltcG9ydCBGaWx0ZXJQYW5lbEZhY3RvcnkgZnJvbSAnLi9maWx0ZXItcGFuZWwvZmlsdGVyLXBhbmVsJztcblxuRmlsdGVyTWFuYWdlckZhY3RvcnkuZGVwcyA9IFtcbiAgU291cmNlRGF0YUNhdGFsb2dGYWN0b3J5LFxuICBGaWx0ZXJQYW5lbEZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIEZpbHRlck1hbmFnZXJGYWN0b3J5KFNvdXJjZURhdGFDYXRhbG9nLCBGaWx0ZXJQYW5lbCkge1xuICByZXR1cm4gY2xhc3MgRmlsdGVyTWFuYWdlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgYWRkRmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgcmVtb3ZlRmlsdGVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgZW5sYXJnZUZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHRvZ2dsZUFuaW1hdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHNldEZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGZpbHRlcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBzaG93RGF0YXNldFRhYmxlOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgICAgLy8gZmllbGRzIGNhbiBiZSB1bmRlZmluZWQgd2hlbiBkYXRhc2V0IGlzIG5vdCBzZWxlY3RlZFxuICAgICAgZmllbGRzOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KVxuICAgIH07XG5cbiAgICAvKiBzZWxlY3RvcnMgKi9cbiAgICBkYXRhc2V0c1NlbGVjdG9yID0gc3RhdGUgPT4gc3RhdGUuZGF0YXNldHM7XG4gICAgZGVmYXVsdERhdGFzZXRTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICAgICAgdGhpcy5kYXRhc2V0c1NlbGVjdG9yLFxuICAgICAgZGF0YXNldHMgPT5cbiAgICAgICAgKE9iamVjdC5rZXlzKGRhdGFzZXRzKS5sZW5ndGggJiYgT2JqZWN0LmtleXMoZGF0YXNldHMpWzBdKSB8fCBudWxsXG4gICAgKTtcblxuICAgIC8qIGFjdGlvbnMgKi9cbiAgICBfYWRkRmlsdGVyID0gKCkgPT4ge1xuICAgICAgY29uc3QgZGVmYXVsdERhdGFzZXQgPSB0aGlzLmRlZmF1bHREYXRhc2V0U2VsZWN0b3IodGhpcy5wcm9wcyk7XG4gICAgICB0aGlzLnByb3BzLmFkZEZpbHRlcihkZWZhdWx0RGF0YXNldCk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtmaWx0ZXJzLCBkYXRhc2V0c30gPSB0aGlzLnByb3BzO1xuICAgICAgY29uc3QgaXNBbnlGaWx0ZXJBbmltYXRpbmcgPSBmaWx0ZXJzLnNvbWUoZiA9PiBmLmlzQW5pbWF0aW5nKTtcbiAgICAgIGNvbnN0IGhhZEVtcHR5RmlsdGVyID0gZmlsdGVycy5zb21lKGYgPT4gIWYubmFtZSk7XG4gICAgICBjb25zdCBoYWREYXRhc2V0ID0gT2JqZWN0LmtleXMoZGF0YXNldHMpLmxlbmd0aDtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItbWFuYWdlclwiPlxuICAgICAgICAgIDxTb3VyY2VEYXRhQ2F0YWxvZ1xuICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZT17dGhpcy5wcm9wcy5zaG93RGF0YXNldFRhYmxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNpZGVQYW5lbERpdmlkZXIgLz5cbiAgICAgICAgICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICAgICAgICAgIHtmaWx0ZXJzICYmXG4gICAgICAgICAgICAgIGZpbHRlcnMubWFwKChmaWx0ZXIsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgIDxGaWx0ZXJQYW5lbFxuICAgICAgICAgICAgICAgICAga2V5PXtgJHtmaWx0ZXIuaWR9LSR7aWR4fWB9XG4gICAgICAgICAgICAgICAgICBpZHg9e2lkeH1cbiAgICAgICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgICAgICBmaWx0ZXI9e2ZpbHRlcn1cbiAgICAgICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgICAgIGlzQW55RmlsdGVyQW5pbWF0aW5nPXtpc0FueUZpbHRlckFuaW1hdGluZ31cbiAgICAgICAgICAgICAgICAgIHJlbW92ZUZpbHRlcj17KCkgPT4gdGhpcy5wcm9wcy5yZW1vdmVGaWx0ZXIoaWR4KX1cbiAgICAgICAgICAgICAgICAgIGVubGFyZ2VGaWx0ZXI9eygpID0+IHRoaXMucHJvcHMuZW5sYXJnZUZpbHRlcihpZHgpfVxuICAgICAgICAgICAgICAgICAgdG9nZ2xlQW5pbWF0aW9uPXsoKSA9PiB0aGlzLnByb3BzLnRvZ2dsZUFuaW1hdGlvbihpZHgpfVxuICAgICAgICAgICAgICAgICAgc2V0RmlsdGVyPXt0aGlzLnByb3BzLnNldEZpbHRlcn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgaW5hY3RpdmU9e2hhZEVtcHR5RmlsdGVyIHx8ICFoYWREYXRhc2V0fVxuICAgICAgICAgICAgd2lkdGg9XCIxMDVweFwiXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9hZGRGaWx0ZXJ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEFkZCBoZWlnaHQ9XCIxMnB4XCIgLz5BZGQgRmlsdGVyXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlck1hbmFnZXJGYWN0b3J5O1xuIl19