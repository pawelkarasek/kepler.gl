"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _d3Array = require("d3-array");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _colorUtils = require("../../../utils/color-utils");

var _colorPalette = require("../../../constants/color-palette");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  flex-grow: 1;\n  height: ", ";\n  border-width: 1px;\n  border-style: solid;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  justify-content: space-between;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  padding: 12px;\n\n  :hover {\n    cursor: pointer;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  onSelectColor: _propTypes["default"].func.isRequired,
  // hex value
  selectedColor: _propTypes["default"].string.isRequired
};
var PALETTE_HEIGHT = '8px';
var ROWS = 16;

var StyledColorPalette = _styledComponents["default"].div(_templateObject());

var StyledColorColumn = _styledComponents["default"].div(_templateObject2());

var StyledColorBlock = _styledComponents["default"].div(_templateObject3(), PALETTE_HEIGHT);

var SingleColorPalette = function SingleColorPalette(_ref) {
  var selectedColor = _ref.selectedColor,
      onSelectColor = _ref.onSelectColor;
  return _react["default"].createElement(StyledColorPalette, {
    className: "single-color-palette"
  }, _colorPalette.Themes.map(function (theme, col) {
    return _react["default"].createElement(StyledColorColumn, {
      key: theme
    }, (0, _d3Array.range)(1, ROWS + 1, 1).map(function (key, i) {
      return _react["default"].createElement(StyledColorBlock, {
        style: {
          backgroundColor: _colorPalette.ColorsByTheme[theme][String(key)],
          borderColor: selectedColor === _colorPalette.ColorsByTheme[theme][String(key)].toUpperCase() ? 'white' : _colorPalette.ColorsByTheme[theme][String(key)]
        },
        key: "".concat(theme, "_").concat(key),
        selected: selectedColor === _colorPalette.ColorsByTheme[theme][String(key)].toUpperCase(),
        onClick: function onClick(e) {
          return onSelectColor((0, _colorUtils.hexToRgb)(_colorPalette.ColorsByTheme[theme][String(key)]), e);
        }
      });
    }));
  }));
};

SingleColorPalette.propTypes = propTypes;
var _default = SingleColorPalette;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItcGFuZWwvc2luZ2xlLWNvbG9yLXBhbGV0dGUuanMiXSwibmFtZXMiOlsicHJvcFR5cGVzIiwib25TZWxlY3RDb2xvciIsIlByb3BUeXBlcyIsImZ1bmMiLCJpc1JlcXVpcmVkIiwic2VsZWN0ZWRDb2xvciIsInN0cmluZyIsIlBBTEVUVEVfSEVJR0hUIiwiUk9XUyIsIlN0eWxlZENvbG9yUGFsZXR0ZSIsInN0eWxlZCIsImRpdiIsIlN0eWxlZENvbG9yQ29sdW1uIiwiU3R5bGVkQ29sb3JCbG9jayIsIlNpbmdsZUNvbG9yUGFsZXR0ZSIsIlRoZW1lcyIsIm1hcCIsInRoZW1lIiwiY29sIiwia2V5IiwiaSIsImJhY2tncm91bmRDb2xvciIsIkNvbG9yc0J5VGhlbWUiLCJTdHJpbmciLCJib3JkZXJDb2xvciIsInRvVXBwZXJDYXNlIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxHQUFHO0FBQ2hCQyxFQUFBQSxhQUFhLEVBQUVDLHNCQUFVQyxJQUFWLENBQWVDLFVBRGQ7QUFFaEI7QUFDQUMsRUFBQUEsYUFBYSxFQUFFSCxzQkFBVUksTUFBVixDQUFpQkY7QUFIaEIsQ0FBbEI7QUFNQSxJQUFNRyxjQUFjLEdBQUcsS0FBdkI7QUFDQSxJQUFNQyxJQUFJLEdBQUcsRUFBYjs7QUFFQSxJQUFNQyxrQkFBa0IsR0FBR0MsNkJBQU9DLEdBQVYsbUJBQXhCOztBQVdBLElBQU1DLGlCQUFpQixHQUFHRiw2QkFBT0MsR0FBVixvQkFBdkI7O0FBT0EsSUFBTUUsZ0JBQWdCLEdBQUdILDZCQUFPQyxHQUFWLHFCQUVWSixjQUZVLENBQXRCOztBQU9BLElBQU1PLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUI7QUFBQSxNQUFFVCxhQUFGLFFBQUVBLGFBQUY7QUFBQSxNQUFpQkosYUFBakIsUUFBaUJBLGFBQWpCO0FBQUEsU0FDekIsZ0NBQUMsa0JBQUQ7QUFBb0IsSUFBQSxTQUFTLEVBQUM7QUFBOUIsS0FDR2MscUJBQU9DLEdBQVAsQ0FBVyxVQUFDQyxLQUFELEVBQVFDLEdBQVI7QUFBQSxXQUNWLGdDQUFDLGlCQUFEO0FBQW1CLE1BQUEsR0FBRyxFQUFFRDtBQUF4QixPQUNHLG9CQUFNLENBQU4sRUFBU1QsSUFBSSxHQUFHLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCUSxHQUF0QixDQUEwQixVQUFDRyxHQUFELEVBQU1DLENBQU47QUFBQSxhQUN6QixnQ0FBQyxnQkFBRDtBQUNFLFFBQUEsS0FBSyxFQUFFO0FBQ0xDLFVBQUFBLGVBQWUsRUFBRUMsNEJBQWNMLEtBQWQsRUFBcUJNLE1BQU0sQ0FBQ0osR0FBRCxDQUEzQixDQURaO0FBRUxLLFVBQUFBLFdBQVcsRUFDVG5CLGFBQWEsS0FDYmlCLDRCQUFjTCxLQUFkLEVBQXFCTSxNQUFNLENBQUNKLEdBQUQsQ0FBM0IsRUFBa0NNLFdBQWxDLEVBREEsR0FFSSxPQUZKLEdBR0lILDRCQUFjTCxLQUFkLEVBQXFCTSxNQUFNLENBQUNKLEdBQUQsQ0FBM0I7QUFORCxTQURUO0FBU0UsUUFBQSxHQUFHLFlBQUtGLEtBQUwsY0FBY0UsR0FBZCxDQVRMO0FBVUUsUUFBQSxRQUFRLEVBQ05kLGFBQWEsS0FBS2lCLDRCQUFjTCxLQUFkLEVBQXFCTSxNQUFNLENBQUNKLEdBQUQsQ0FBM0IsRUFBa0NNLFdBQWxDLEVBWHRCO0FBYUUsUUFBQSxPQUFPLEVBQUUsaUJBQUFDLENBQUM7QUFBQSxpQkFDUnpCLGFBQWEsQ0FBQywwQkFBU3FCLDRCQUFjTCxLQUFkLEVBQXFCTSxNQUFNLENBQUNKLEdBQUQsQ0FBM0IsQ0FBVCxDQUFELEVBQThDTyxDQUE5QyxDQURMO0FBQUE7QUFiWixRQUR5QjtBQUFBLEtBQTFCLENBREgsQ0FEVTtBQUFBLEdBQVgsQ0FESCxDQUR5QjtBQUFBLENBQTNCOztBQTRCQVosa0JBQWtCLENBQUNkLFNBQW5CLEdBQStCQSxTQUEvQjtlQUVlYyxrQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtyYW5nZX0gZnJvbSAnZDMtYXJyYXknO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2hleFRvUmdifSBmcm9tICd1dGlscy9jb2xvci11dGlscyc7XG5cbmltcG9ydCB7Q29sb3JzQnlUaGVtZSwgVGhlbWVzfSBmcm9tICdjb25zdGFudHMvY29sb3ItcGFsZXR0ZSc7XG5cbmNvbnN0IHByb3BUeXBlcyA9IHtcbiAgb25TZWxlY3RDb2xvcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgLy8gaGV4IHZhbHVlXG4gIHNlbGVjdGVkQ29sb3I6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZFxufTtcblxuY29uc3QgUEFMRVRURV9IRUlHSFQgPSAnOHB4JztcbmNvbnN0IFJPV1MgPSAxNjtcblxuY29uc3QgU3R5bGVkQ29sb3JQYWxldHRlID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nOiAxMnB4O1xuXG4gIDpob3ZlciB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRDb2xvckNvbHVtbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZ3JvdzogMTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuYDtcblxuY29uc3QgU3R5bGVkQ29sb3JCbG9jayA9IHN0eWxlZC5kaXZgXG4gIGZsZXgtZ3JvdzogMTtcbiAgaGVpZ2h0OiAke1BBTEVUVEVfSEVJR0hUfTtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG5gO1xuXG5jb25zdCBTaW5nbGVDb2xvclBhbGV0dGUgPSAoe3NlbGVjdGVkQ29sb3IsIG9uU2VsZWN0Q29sb3J9KSA9PiAoXG4gIDxTdHlsZWRDb2xvclBhbGV0dGUgY2xhc3NOYW1lPVwic2luZ2xlLWNvbG9yLXBhbGV0dGVcIj5cbiAgICB7VGhlbWVzLm1hcCgodGhlbWUsIGNvbCkgPT4gKFxuICAgICAgPFN0eWxlZENvbG9yQ29sdW1uIGtleT17dGhlbWV9PlxuICAgICAgICB7cmFuZ2UoMSwgUk9XUyArIDEsIDEpLm1hcCgoa2V5LCBpKSA9PiAoXG4gICAgICAgICAgPFN0eWxlZENvbG9yQmxvY2tcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogQ29sb3JzQnlUaGVtZVt0aGVtZV1bU3RyaW5nKGtleSldLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjpcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbG9yID09PVxuICAgICAgICAgICAgICAgIENvbG9yc0J5VGhlbWVbdGhlbWVdW1N0cmluZyhrZXkpXS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICA/ICd3aGl0ZSdcbiAgICAgICAgICAgICAgICAgIDogQ29sb3JzQnlUaGVtZVt0aGVtZV1bU3RyaW5nKGtleSldXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAga2V5PXtgJHt0aGVtZX1fJHtrZXl9YH1cbiAgICAgICAgICAgIHNlbGVjdGVkPXtcbiAgICAgICAgICAgICAgc2VsZWN0ZWRDb2xvciA9PT0gQ29sb3JzQnlUaGVtZVt0aGVtZV1bU3RyaW5nKGtleSldLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e2UgPT5cbiAgICAgICAgICAgICAgb25TZWxlY3RDb2xvcihoZXhUb1JnYihDb2xvcnNCeVRoZW1lW3RoZW1lXVtTdHJpbmcoa2V5KV0pLCBlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9TdHlsZWRDb2xvckNvbHVtbj5cbiAgICApKX1cbiAgPC9TdHlsZWRDb2xvclBhbGV0dGU+XG4pO1xuXG5TaW5nbGVDb2xvclBhbGV0dGUucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuXG5leHBvcnQgZGVmYXVsdCBTaW5nbGVDb2xvclBhbGV0dGU7XG4iXX0=