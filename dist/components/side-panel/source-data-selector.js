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

var _reselect = require("reselect");

var _styledComponents = require("../common/styled-components");

var _itemSelector = _interopRequireDefault(require("../common/item-selector/item-selector"));

var _sourceDataCatalog = require("./source-data-catalog");

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
var defaultPlaceHolder = 'Select A Data Source';

var DatasetItem = function DatasetItem(_ref) {
  var value = _ref.value;
  return _react["default"].createElement(_sourceDataCatalog.DatasetTag, {
    dataset: value
  });
};

var SourceDataSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(SourceDataSelector, _Component);

  function SourceDataSelector() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, SourceDataSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(SourceDataSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "datasetsSelector", function (props) {
      return props.datasets;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dsOptionsSelector", (0, _reselect.createSelector)(_this.datasetsSelector, function (datasets) {
      return Object.values(datasets).map(function (ds) {
        return {
          label: ds.label,
          value: ds.id,
          color: ds.color
        };
      });
    }));
    return _this;
  }

  (0, _createClass2["default"])(SourceDataSelector, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          dataId = _this$props.dataId,
          disabled = _this$props.disabled,
          onSelect = _this$props.onSelect,
          _this$props$defaultVa = _this$props.defaultValue,
          defaultValue = _this$props$defaultVa === void 0 ? defaultPlaceHolder : _this$props$defaultVa,
          inputTheme = _this$props.inputTheme;
      var dsOptions = this.dsOptionsSelector(this.props);
      return _react["default"].createElement(_styledComponents.SidePanelSection, {
        className: "data-source-selector"
      }, _react["default"].createElement(_styledComponents.PanelLabel, null, "Data Source"), _react["default"].createElement(_itemSelector["default"], {
        inputTheme: inputTheme,
        selectedItems: dataId ? this.props.datasets[dataId] : null,
        options: dsOptions,
        getOptionValue: 'value',
        filterOption: 'label',
        multiSelect: false,
        onChange: onSelect,
        placeholder: defaultValue,
        disabled: disabled,
        displayOption: 'label',
        DropDownLineItemRenderComponent: DatasetItem
      }));
    }
  }]);
  return SourceDataSelector;
}(_react.Component);

exports["default"] = SourceDataSelector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvc291cmNlLWRhdGEtc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiZGVmYXVsdFBsYWNlSG9sZGVyIiwiRGF0YXNldEl0ZW0iLCJ2YWx1ZSIsIlNvdXJjZURhdGFTZWxlY3RvciIsInByb3BzIiwiZGF0YXNldHMiLCJkYXRhc2V0c1NlbGVjdG9yIiwiT2JqZWN0IiwidmFsdWVzIiwibWFwIiwiZHMiLCJsYWJlbCIsImlkIiwiY29sb3IiLCJkYXRhSWQiLCJkaXNhYmxlZCIsIm9uU2VsZWN0IiwiZGVmYXVsdFZhbHVlIiwiaW5wdXRUaGVtZSIsImRzT3B0aW9ucyIsImRzT3B0aW9uc1NlbGVjdG9yIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUVBOztBQUlBOztBQUNBOztBQTVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVlBLElBQU1BLGtCQUFrQixHQUFHLHNCQUEzQjs7QUFFQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYztBQUFBLE1BQUVDLEtBQUYsUUFBRUEsS0FBRjtBQUFBLFNBQWEsZ0NBQUMsNkJBQUQ7QUFBWSxJQUFBLE9BQU8sRUFBRUE7QUFBckIsSUFBYjtBQUFBLENBQXBCOztJQUVxQkMsa0I7Ozs7Ozs7Ozs7Ozs7Ozs7O3lHQUdBLFVBQUFDLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNDLFFBQVY7QUFBQSxLOzBHQUNKLDhCQUFlLE1BQUtDLGdCQUFwQixFQUFzQyxVQUFBRCxRQUFRO0FBQUEsYUFDaEVFLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSCxRQUFkLEVBQXdCSSxHQUF4QixDQUE0QixVQUFBQyxFQUFFO0FBQUEsZUFBSztBQUNqQ0MsVUFBQUEsS0FBSyxFQUFFRCxFQUFFLENBQUNDLEtBRHVCO0FBRWpDVCxVQUFBQSxLQUFLLEVBQUVRLEVBQUUsQ0FBQ0UsRUFGdUI7QUFHakNDLFVBQUFBLEtBQUssRUFBRUgsRUFBRSxDQUFDRztBQUh1QixTQUFMO0FBQUEsT0FBOUIsQ0FEZ0U7QUFBQSxLQUE5QyxDOzs7Ozs7NkJBUVg7QUFBQSx3QkFPSCxLQUFLVCxLQVBGO0FBQUEsVUFFTFUsTUFGSyxlQUVMQSxNQUZLO0FBQUEsVUFHTEMsUUFISyxlQUdMQSxRQUhLO0FBQUEsVUFJTEMsUUFKSyxlQUlMQSxRQUpLO0FBQUEsOENBS0xDLFlBTEs7QUFBQSxVQUtMQSxZQUxLLHNDQUtVakIsa0JBTFY7QUFBQSxVQU1Ma0IsVUFOSyxlQU1MQSxVQU5LO0FBUVAsVUFBTUMsU0FBUyxHQUFHLEtBQUtDLGlCQUFMLENBQXVCLEtBQUtoQixLQUE1QixDQUFsQjtBQUVBLGFBQ0UsZ0NBQUMsa0NBQUQ7QUFBa0IsUUFBQSxTQUFTLEVBQUM7QUFBNUIsU0FDRSxnQ0FBQyw0QkFBRCxzQkFERixFQUVFLGdDQUFDLHdCQUFEO0FBQ0UsUUFBQSxVQUFVLEVBQUVjLFVBRGQ7QUFFRSxRQUFBLGFBQWEsRUFBRUosTUFBTSxHQUFHLEtBQUtWLEtBQUwsQ0FBV0MsUUFBWCxDQUFvQlMsTUFBcEIsQ0FBSCxHQUFpQyxJQUZ4RDtBQUdFLFFBQUEsT0FBTyxFQUFFSyxTQUhYO0FBSUUsUUFBQSxjQUFjLEVBQUUsT0FKbEI7QUFLRSxRQUFBLFlBQVksRUFBRSxPQUxoQjtBQU1FLFFBQUEsV0FBVyxFQUFFLEtBTmY7QUFPRSxRQUFBLFFBQVEsRUFBRUgsUUFQWjtBQVFFLFFBQUEsV0FBVyxFQUFFQyxZQVJmO0FBU0UsUUFBQSxRQUFRLEVBQUVGLFFBVFo7QUFVRSxRQUFBLGFBQWEsRUFBRSxPQVZqQjtBQVdFLFFBQUEsK0JBQStCLEVBQUVkO0FBWG5DLFFBRkYsQ0FERjtBQWtCRDs7O0VBeEM2Q29CLGdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5cbmltcG9ydCB7XG4gIFBhbmVsTGFiZWwsXG4gIFNpZGVQYW5lbFNlY3Rpb25cbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IEl0ZW1TZWxlY3RvciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3InO1xuaW1wb3J0IHtEYXRhc2V0VGFnfSBmcm9tICcuL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuXG5jb25zdCBkZWZhdWx0UGxhY2VIb2xkZXIgPSAnU2VsZWN0IEEgRGF0YSBTb3VyY2UnO1xuXG5jb25zdCBEYXRhc2V0SXRlbSA9ICh7dmFsdWV9KSA9PiA8RGF0YXNldFRhZyBkYXRhc2V0PXt2YWx1ZX0gLz47XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNvdXJjZURhdGFTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG4gIC8qIHNlbGVjdG9ycyAqL1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1pbnZhbGlkLXRoaXMgKi9cbiAgZGF0YXNldHNTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmRhdGFzZXRzO1xuICBkc09wdGlvbnNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKHRoaXMuZGF0YXNldHNTZWxlY3RvciwgZGF0YXNldHMgPT5cbiAgICBPYmplY3QudmFsdWVzKGRhdGFzZXRzKS5tYXAoZHMgPT4gKHtcbiAgICAgIGxhYmVsOiBkcy5sYWJlbCxcbiAgICAgIHZhbHVlOiBkcy5pZCxcbiAgICAgIGNvbG9yOiBkcy5jb2xvclxuICAgIH0pKVxuICApO1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBkYXRhSWQsXG4gICAgICBkaXNhYmxlZCxcbiAgICAgIG9uU2VsZWN0LFxuICAgICAgZGVmYXVsdFZhbHVlID0gZGVmYXVsdFBsYWNlSG9sZGVyLFxuICAgICAgaW5wdXRUaGVtZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGRzT3B0aW9ucyA9IHRoaXMuZHNPcHRpb25zU2VsZWN0b3IodGhpcy5wcm9wcyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFNpZGVQYW5lbFNlY3Rpb24gY2xhc3NOYW1lPVwiZGF0YS1zb3VyY2Utc2VsZWN0b3JcIj5cbiAgICAgICAgPFBhbmVsTGFiZWw+RGF0YSBTb3VyY2U8L1BhbmVsTGFiZWw+XG4gICAgICAgIDxJdGVtU2VsZWN0b3JcbiAgICAgICAgICBpbnB1dFRoZW1lPXtpbnB1dFRoZW1lfVxuICAgICAgICAgIHNlbGVjdGVkSXRlbXM9e2RhdGFJZCA/IHRoaXMucHJvcHMuZGF0YXNldHNbZGF0YUlkXSA6IG51bGx9XG4gICAgICAgICAgb3B0aW9ucz17ZHNPcHRpb25zfVxuICAgICAgICAgIGdldE9wdGlvblZhbHVlPXsndmFsdWUnfVxuICAgICAgICAgIGZpbHRlck9wdGlvbj17J2xhYmVsJ31cbiAgICAgICAgICBtdWx0aVNlbGVjdD17ZmFsc2V9XG4gICAgICAgICAgb25DaGFuZ2U9e29uU2VsZWN0fVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtkZWZhdWx0VmFsdWV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgIGRpc3BsYXlPcHRpb249eydsYWJlbCd9XG4gICAgICAgICAgRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudD17RGF0YXNldEl0ZW19XG4gICAgICAgIC8+XG4gICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgKTtcbiAgfVxufVxuIl19