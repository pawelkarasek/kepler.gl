"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _sourceDataCatalog = require("../source-data-catalog");

var _styledComponents = require("../../common/styled-components");

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

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
function TooltipConfigFactory() {
  var TooltipConfig = function TooltipConfig(_ref) {
    var config = _ref.config,
        datasets = _ref.datasets,
        onChange = _ref.onChange;
    return _react["default"].createElement("div", null, Object.keys(config.fieldsToShow).map(function (dataId) {
      return _react["default"].createElement(_styledComponents.SidePanelSection, {
        key: dataId
      }, _react["default"].createElement(_sourceDataCatalog.DatasetTag, {
        dataset: datasets[dataId]
      }), _react["default"].createElement(_fieldSelector["default"], {
        fields: datasets[dataId].fields,
        value: config.fieldsToShow[dataId],
        onSelect: function onSelect(fieldsToShow) {
          var newConfig = (0, _objectSpread3["default"])({}, config, {
            fieldsToShow: (0, _objectSpread3["default"])({}, config.fieldsToShow, (0, _defineProperty2["default"])({}, dataId, fieldsToShow.map(function (d) {
              return d.name;
            })))
          });
          onChange(newConfig);
        },
        closeOnSelect: false,
        multiSelect: true,
        inputTheme: "secondary"
      }));
    }));
  };

  return TooltipConfig;
}

var _default = TooltipConfigFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwvdG9vbHRpcC1jb25maWcuanMiXSwibmFtZXMiOlsiVG9vbHRpcENvbmZpZ0ZhY3RvcnkiLCJUb29sdGlwQ29uZmlnIiwiY29uZmlnIiwiZGF0YXNldHMiLCJvbkNoYW5nZSIsIk9iamVjdCIsImtleXMiLCJmaWVsZHNUb1Nob3ciLCJtYXAiLCJkYXRhSWQiLCJmaWVsZHMiLCJuZXdDb25maWciLCJkIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQSxTQUFTQSxvQkFBVCxHQUFnQztBQUM5QixNQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCO0FBQUEsUUFBRUMsTUFBRixRQUFFQSxNQUFGO0FBQUEsUUFBVUMsUUFBVixRQUFVQSxRQUFWO0FBQUEsUUFBb0JDLFFBQXBCLFFBQW9CQSxRQUFwQjtBQUFBLFdBQ3BCLDZDQUNHQyxNQUFNLENBQUNDLElBQVAsQ0FBWUosTUFBTSxDQUFDSyxZQUFuQixFQUFpQ0MsR0FBakMsQ0FBcUMsVUFBQUMsTUFBTTtBQUFBLGFBQzFDLGdDQUFDLGtDQUFEO0FBQWtCLFFBQUEsR0FBRyxFQUFFQTtBQUF2QixTQUNFLGdDQUFDLDZCQUFEO0FBQVksUUFBQSxPQUFPLEVBQUVOLFFBQVEsQ0FBQ00sTUFBRDtBQUE3QixRQURGLEVBRUUsZ0NBQUMseUJBQUQ7QUFDRSxRQUFBLE1BQU0sRUFBRU4sUUFBUSxDQUFDTSxNQUFELENBQVIsQ0FBaUJDLE1BRDNCO0FBRUUsUUFBQSxLQUFLLEVBQUVSLE1BQU0sQ0FBQ0ssWUFBUCxDQUFvQkUsTUFBcEIsQ0FGVDtBQUdFLFFBQUEsUUFBUSxFQUFFLGtCQUFBRixZQUFZLEVBQUk7QUFDeEIsY0FBTUksU0FBUyxzQ0FDVlQsTUFEVTtBQUViSyxZQUFBQSxZQUFZLHFDQUNQTCxNQUFNLENBQUNLLFlBREEsdUNBRVRFLE1BRlMsRUFFQUYsWUFBWSxDQUFDQyxHQUFiLENBQWlCLFVBQUFJLENBQUM7QUFBQSxxQkFBSUEsQ0FBQyxDQUFDQyxJQUFOO0FBQUEsYUFBbEIsQ0FGQTtBQUZDLFlBQWY7QUFPQVQsVUFBQUEsUUFBUSxDQUFDTyxTQUFELENBQVI7QUFDRCxTQVpIO0FBYUUsUUFBQSxhQUFhLEVBQUUsS0FiakI7QUFjRSxRQUFBLFdBQVcsTUFkYjtBQWVFLFFBQUEsVUFBVSxFQUFDO0FBZmIsUUFGRixDQUQwQztBQUFBLEtBQTNDLENBREgsQ0FEb0I7QUFBQSxHQUF0Qjs7QUEyQkEsU0FBT1YsYUFBUDtBQUNEOztlQUVjRCxvQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0RhdGFzZXRUYWd9IGZyb20gJy4uL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuXG5pbXBvcnQge1NpZGVQYW5lbFNlY3Rpb259IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBGaWVsZFNlbGVjdG9yIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ZpZWxkLXNlbGVjdG9yJztcblxuZnVuY3Rpb24gVG9vbHRpcENvbmZpZ0ZhY3RvcnkoKSB7XG4gIGNvbnN0IFRvb2x0aXBDb25maWcgPSAoe2NvbmZpZywgZGF0YXNldHMsIG9uQ2hhbmdlfSkgPT4gKFxuICAgIDxkaXY+XG4gICAgICB7T2JqZWN0LmtleXMoY29uZmlnLmZpZWxkc1RvU2hvdykubWFwKGRhdGFJZCA9PiAoXG4gICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uIGtleT17ZGF0YUlkfT5cbiAgICAgICAgICA8RGF0YXNldFRhZyBkYXRhc2V0PXtkYXRhc2V0c1tkYXRhSWRdfSAvPlxuICAgICAgICAgIDxGaWVsZFNlbGVjdG9yXG4gICAgICAgICAgICBmaWVsZHM9e2RhdGFzZXRzW2RhdGFJZF0uZmllbGRzfVxuICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5maWVsZHNUb1Nob3dbZGF0YUlkXX1cbiAgICAgICAgICAgIG9uU2VsZWN0PXtmaWVsZHNUb1Nob3cgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBuZXdDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgICAgIGZpZWxkc1RvU2hvdzoge1xuICAgICAgICAgICAgICAgICAgLi4uY29uZmlnLmZpZWxkc1RvU2hvdyxcbiAgICAgICAgICAgICAgICAgIFtkYXRhSWRdOiBmaWVsZHNUb1Nob3cubWFwKGQgPT4gZC5uYW1lKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgb25DaGFuZ2UobmV3Q29uZmlnKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbG9zZU9uU2VsZWN0PXtmYWxzZX1cbiAgICAgICAgICAgIG11bHRpU2VsZWN0XG4gICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICApKX1cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gVG9vbHRpcENvbmZpZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcENvbmZpZ0ZhY3Rvcnk7XG4iXX0=