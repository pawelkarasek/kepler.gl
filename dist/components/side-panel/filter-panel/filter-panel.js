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

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _panelHeaderAction = _interopRequireDefault(require("../panel-header-action"));

var _fieldSelector = _interopRequireDefault(require("../../common/field-selector"));

var _icons = require("../../common/icons");

var _sourceDataSelector = _interopRequireDefault(require("../source-data-selector"));

var _styledComponents2 = require("../../common/styled-components");

var Filters = _interopRequireWildcard(require("../../filters"));

var _filterUtils = require("../../../utils/filter-utils");

var _defaultSettings = require("../../../constants/default-settings");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  padding: 12px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  cursor: pointer;\n  padding: 10px 12px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  border-radius: 1px;\n\n  .filter-panel__filter {\n    margin-top: 24px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledFilterPanel = _styledComponents["default"].div(_templateObject());

var StyledFilterHeader = (0, _styledComponents["default"])(_styledComponents2.StyledPanelHeader)(_templateObject2());

var StyledFilterContent = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.theme.panelBackground;
});

function FilterPanelFactory() {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(FilterPanel, _Component);

    function FilterPanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, FilterPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(FilterPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldsSelector", function (props) {
        return props.filter.dataId && props.datasets[props.filter.dataId].fields || [];
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "filterSelector", function (props) {
        return props.filters;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "nameSelector", function (props) {
        return props.filter.name;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "dataIdSelector", function (props) {
        return props.filter.dataId;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableFieldsSelector", (0, _reselect.createSelector)(_this.fieldsSelector, _this.filterSelector, _this.nameSelector, _this.dataIdSelector, function (fields, filters, name, dataId) {
        return fields.filter(function (f) {
          return f.type && f.type !== _defaultSettings.ALL_FIELD_TYPES.geojson && (f.name === name || !filters.find(function (d) {
            return d.name === f.name && d.dataId === dataId;
          }));
        });
      }));
      return _this;
    }

    (0, _createClass2["default"])(FilterPanel, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            datasets = _this$props.datasets,
            enlargeFilter = _this$props.enlargeFilter,
            filter = _this$props.filter,
            idx = _this$props.idx,
            isAnyFilterAnimating = _this$props.isAnyFilterAnimating,
            removeFilter = _this$props.removeFilter,
            _setFilter = _this$props.setFilter,
            toggleAnimation = _this$props.toggleAnimation;
        var name = filter.name,
            enlarged = filter.enlarged,
            type = filter.type,
            dataId = filter.dataId;
        var FilterComponent = type && Filters[_filterUtils.FILTER_COMPONENTS[type]];
        var allAvailableFields = this.availableFieldsSelector(this.props);
        return _react["default"].createElement(StyledFilterPanel, {
          className: "filter-panel"
        }, _react["default"].createElement(StyledFilterHeader, {
          className: "filter-panel__header",
          labelRCGColorValues: datasets[dataId].color
        }, _react["default"].createElement("div", {
          style: {
            flexGrow: 1
          }
        }, _react["default"].createElement(_fieldSelector["default"], {
          inputTheme: "secondary",
          fields: allAvailableFields,
          value: name,
          erasable: false,
          onSelect: function onSelect(value) {
            return _setFilter(idx, 'name', value.name);
          }
        })), _react["default"].createElement(_panelHeaderAction["default"], {
          id: filter.id,
          tooltip: "delete",
          tooltipType: "error",
          onClick: removeFilter,
          hoverColor: 'errorColor',
          IconComponent: _icons.Trash
        }), type === _filterUtils.FILTER_TYPES.timeRange && _react["default"].createElement(_panelHeaderAction["default"], {
          id: filter.id,
          onClick: enlargeFilter,
          tooltip: "Time Playback",
          IconComponent: _icons.Clock,
          active: enlarged
        })), _react["default"].createElement(StyledFilterContent, {
          className: "filter-panel__content"
        }, Object.keys(datasets).length > 1 && _react["default"].createElement(_sourceDataSelector["default"], {
          inputTheme: "secondary",
          datasets: datasets,
          disabled: filter.freeze,
          dataId: filter.dataId,
          onSelect: function onSelect(value) {
            return _setFilter(idx, 'dataId', value);
          }
        }), type && !enlarged && _react["default"].createElement("div", {
          className: "filter-panel__filter"
        }, _react["default"].createElement(FilterComponent, {
          filter: filter,
          idx: idx,
          isAnyFilterAnimating: isAnyFilterAnimating,
          toggleAnimation: toggleAnimation,
          setFilter: function setFilter(value) {
            return _setFilter(idx, 'value', value);
          }
        }))));
      }
    }]);
    return FilterPanel;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    idx: _propTypes["default"].number,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    filter: _propTypes["default"].object.isRequired,
    setFilter: _propTypes["default"].func.isRequired,
    removeFilter: _propTypes["default"].func.isRequired,
    enlargeFilter: _propTypes["default"].func.isRequired,
    toggleAnimation: _propTypes["default"].func.isRequired,
    datasets: _propTypes["default"].object,
    showDatasetTable: _propTypes["default"].func,
    isAnyFilterAnimating: _propTypes["default"].bool
  }), _temp;
}

var _default = FilterPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvZmlsdGVyLXBhbmVsL2ZpbHRlci1wYW5lbC5qcyJdLCJuYW1lcyI6WyJTdHlsZWRGaWx0ZXJQYW5lbCIsInN0eWxlZCIsImRpdiIsIlN0eWxlZEZpbHRlckhlYWRlciIsIlN0eWxlZFBhbmVsSGVhZGVyIiwiU3R5bGVkRmlsdGVyQ29udGVudCIsInByb3BzIiwidGhlbWUiLCJwYW5lbEJhY2tncm91bmQiLCJGaWx0ZXJQYW5lbEZhY3RvcnkiLCJmaWx0ZXIiLCJkYXRhSWQiLCJkYXRhc2V0cyIsImZpZWxkcyIsImZpbHRlcnMiLCJuYW1lIiwiZmllbGRzU2VsZWN0b3IiLCJmaWx0ZXJTZWxlY3RvciIsIm5hbWVTZWxlY3RvciIsImRhdGFJZFNlbGVjdG9yIiwiZiIsInR5cGUiLCJBTExfRklFTERfVFlQRVMiLCJnZW9qc29uIiwiZmluZCIsImQiLCJlbmxhcmdlRmlsdGVyIiwiaWR4IiwiaXNBbnlGaWx0ZXJBbmltYXRpbmciLCJyZW1vdmVGaWx0ZXIiLCJzZXRGaWx0ZXIiLCJ0b2dnbGVBbmltYXRpb24iLCJlbmxhcmdlZCIsIkZpbHRlckNvbXBvbmVudCIsIkZpbHRlcnMiLCJGSUxURVJfQ09NUE9ORU5UUyIsImFsbEF2YWlsYWJsZUZpZWxkcyIsImF2YWlsYWJsZUZpZWxkc1NlbGVjdG9yIiwiY29sb3IiLCJmbGV4R3JvdyIsInZhbHVlIiwiaWQiLCJUcmFzaCIsIkZJTFRFUl9UWVBFUyIsInRpbWVSYW5nZSIsIkNsb2NrIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImZyZWV6ZSIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm51bWJlciIsImFycmF5T2YiLCJhbnkiLCJpc1JlcXVpcmVkIiwib2JqZWN0IiwiZnVuYyIsInNob3dEYXRhc2V0VGFibGUiLCJib29sIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7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SUFBQUEsYUFBYSxFQUFFeUIsc0JBQVVNLElBQVYsQ0FBZUYsVUFOYjtBQU9qQnhCLElBQUFBLGVBQWUsRUFBRW9CLHNCQUFVTSxJQUFWLENBQWVGLFVBUGY7QUFRakIzQyxJQUFBQSxRQUFRLEVBQUV1QyxzQkFBVUssTUFSSDtBQVNqQkUsSUFBQUEsZ0JBQWdCLEVBQUVQLHNCQUFVTSxJQVRYO0FBVWpCN0IsSUFBQUEsb0JBQW9CLEVBQUV1QixzQkFBVVE7QUFWZixHQURyQjtBQThHRDs7ZUFFY2xELGtCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUGFuZWxIZWFkZXJBY3Rpb24gZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3BhbmVsLWhlYWRlci1hY3Rpb24nO1xuaW1wb3J0IEZpZWxkU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vZmllbGQtc2VsZWN0b3InO1xuaW1wb3J0IHtUcmFzaCwgQ2xvY2t9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBTb3VyY2VEYXRhU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3NvdXJjZS1kYXRhLXNlbGVjdG9yJztcbmltcG9ydCB7U3R5bGVkUGFuZWxIZWFkZXJ9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCAqIGFzIEZpbHRlcnMgZnJvbSAnY29tcG9uZW50cy9maWx0ZXJzJztcblxuaW1wb3J0IHtGSUxURVJfVFlQRVMsIEZJTFRFUl9DT01QT05FTlRTfSBmcm9tICd1dGlscy9maWx0ZXItdXRpbHMnO1xuaW1wb3J0IHtBTExfRklFTERfVFlQRVN9IGZyb20gJ2NvbnN0YW50cy9kZWZhdWx0LXNldHRpbmdzJztcblxuY29uc3QgU3R5bGVkRmlsdGVyUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG5cbiAgLmZpbHRlci1wYW5lbF9fZmlsdGVyIHtcbiAgICBtYXJnaW4tdG9wOiAyNHB4O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRGaWx0ZXJIZWFkZXIgPSBzdHlsZWQoU3R5bGVkUGFuZWxIZWFkZXIpYFxuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDEwcHggMTJweDtcbmA7XG5cbmNvbnN0IFN0eWxlZEZpbHRlckNvbnRlbnQgPSBzdHlsZWQuZGl2YFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIHBhZGRpbmc6IDEycHg7XG5gO1xuXG5mdW5jdGlvbiBGaWx0ZXJQYW5lbEZhY3RvcnkoKSB7XG4gIHJldHVybiBjbGFzcyBGaWx0ZXJQYW5lbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgIGlkeDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGZpbHRlcnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG4gICAgICBmaWx0ZXI6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIHNldEZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJlbW92ZUZpbHRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGVubGFyZ2VGaWx0ZXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB0b2dnbGVBbmltYXRpb246IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBkYXRhc2V0czogUHJvcFR5cGVzLm9iamVjdCxcbiAgICAgIHNob3dEYXRhc2V0VGFibGU6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgaXNBbnlGaWx0ZXJBbmltYXRpbmc6IFByb3BUeXBlcy5ib29sXG4gICAgfTtcblxuICAgIC8qIHNlbGVjdG9ycyAqL1xuICAgIGZpZWxkc1NlbGVjdG9yID0gcHJvcHMgPT5cbiAgICAgIChwcm9wcy5maWx0ZXIuZGF0YUlkICYmIHByb3BzLmRhdGFzZXRzW3Byb3BzLmZpbHRlci5kYXRhSWRdLmZpZWxkcykgfHwgW107XG4gICAgZmlsdGVyU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5maWx0ZXJzO1xuICAgIG5hbWVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmZpbHRlci5uYW1lO1xuICAgIGRhdGFJZFNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMuZmlsdGVyLmRhdGFJZDtcblxuICAgIC8vIG9ubHkgc2hvdyBjdXJyZW50IGZpZWxkIGFuZCBmaWVsZCB0aGF0J3Mgbm90IGFscmVhZHkgYmVlbiB1c2VkIGFzIGEgZmlsdGVyXG4gICAgYXZhaWxhYmxlRmllbGRzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHRoaXMuZmllbGRzU2VsZWN0b3IsXG4gICAgICB0aGlzLmZpbHRlclNlbGVjdG9yLFxuICAgICAgdGhpcy5uYW1lU2VsZWN0b3IsXG4gICAgICB0aGlzLmRhdGFJZFNlbGVjdG9yLFxuICAgICAgKGZpZWxkcywgZmlsdGVycywgbmFtZSwgZGF0YUlkKSA9PlxuICAgICAgICBmaWVsZHMuZmlsdGVyKFxuICAgICAgICAgIGYgPT5cbiAgICAgICAgICAgIGYudHlwZSAmJlxuICAgICAgICAgICAgZi50eXBlICE9PSBBTExfRklFTERfVFlQRVMuZ2VvanNvbiAmJlxuICAgICAgICAgICAgKGYubmFtZSA9PT0gbmFtZSB8fFxuICAgICAgICAgICAgICAhZmlsdGVycy5maW5kKGQgPT4gZC5uYW1lID09PSBmLm5hbWUgJiYgZC5kYXRhSWQgPT09IGRhdGFJZCkpXG4gICAgICAgIClcbiAgICApO1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgZW5sYXJnZUZpbHRlcixcbiAgICAgICAgZmlsdGVyLFxuICAgICAgICBpZHgsXG4gICAgICAgIGlzQW55RmlsdGVyQW5pbWF0aW5nLFxuICAgICAgICByZW1vdmVGaWx0ZXIsXG4gICAgICAgIHNldEZpbHRlcixcbiAgICAgICAgdG9nZ2xlQW5pbWF0aW9uXG4gICAgICB9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IHtuYW1lLCBlbmxhcmdlZCwgdHlwZSwgZGF0YUlkfSA9IGZpbHRlcjtcbiAgICAgIGNvbnN0IEZpbHRlckNvbXBvbmVudCA9IHR5cGUgJiYgRmlsdGVyc1tGSUxURVJfQ09NUE9ORU5UU1t0eXBlXV07XG4gICAgICBjb25zdCBhbGxBdmFpbGFibGVGaWVsZHMgPSB0aGlzLmF2YWlsYWJsZUZpZWxkc1NlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkRmlsdGVyUGFuZWwgY2xhc3NOYW1lPVwiZmlsdGVyLXBhbmVsXCI+XG4gICAgICAgICAgPFN0eWxlZEZpbHRlckhlYWRlciBjbGFzc05hbWU9XCJmaWx0ZXItcGFuZWxfX2hlYWRlclwiXG4gICAgICAgICAgICBsYWJlbFJDR0NvbG9yVmFsdWVzPXtkYXRhc2V0c1tkYXRhSWRdLmNvbG9yfT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tmbGV4R3JvdzogMX19PlxuICAgICAgICAgICAgICA8RmllbGRTZWxlY3RvclxuICAgICAgICAgICAgICAgIGlucHV0VGhlbWU9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgICAgIGZpZWxkcz17YWxsQXZhaWxhYmxlRmllbGRzfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtuYW1lfVxuICAgICAgICAgICAgICAgIGVyYXNhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBvblNlbGVjdD17dmFsdWUgPT4gc2V0RmlsdGVyKGlkeCwgJ25hbWUnLCB2YWx1ZS5uYW1lKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPFBhbmVsSGVhZGVyQWN0aW9uXG4gICAgICAgICAgICAgIGlkPXtmaWx0ZXIuaWR9XG4gICAgICAgICAgICAgIHRvb2x0aXA9XCJkZWxldGVcIlxuICAgICAgICAgICAgICB0b29sdGlwVHlwZT1cImVycm9yXCJcbiAgICAgICAgICAgICAgb25DbGljaz17cmVtb3ZlRmlsdGVyfVxuICAgICAgICAgICAgICBob3ZlckNvbG9yPXsnZXJyb3JDb2xvcid9XG4gICAgICAgICAgICAgIEljb25Db21wb25lbnQ9e1RyYXNofVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIHt0eXBlID09PSBGSUxURVJfVFlQRVMudGltZVJhbmdlICYmIChcbiAgICAgICAgICAgICAgPFBhbmVsSGVhZGVyQWN0aW9uXG4gICAgICAgICAgICAgICAgaWQ9e2ZpbHRlci5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtlbmxhcmdlRmlsdGVyfVxuICAgICAgICAgICAgICAgIHRvb2x0aXA9XCJUaW1lIFBsYXliYWNrXCJcbiAgICAgICAgICAgICAgICBJY29uQ29tcG9uZW50PXtDbG9ja31cbiAgICAgICAgICAgICAgICBhY3RpdmU9e2VubGFyZ2VkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L1N0eWxlZEZpbHRlckhlYWRlcj5cbiAgICAgICAgICA8U3R5bGVkRmlsdGVyQ29udGVudCBjbGFzc05hbWU9XCJmaWx0ZXItcGFuZWxfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgIHtPYmplY3Qua2V5cyhkYXRhc2V0cykubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgICAgIDxTb3VyY2VEYXRhU2VsZWN0b3JcbiAgICAgICAgICAgICAgICBpbnB1dFRoZW1lPVwic2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICBkYXRhc2V0cz17ZGF0YXNldHN9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2ZpbHRlci5mcmVlemV9XG4gICAgICAgICAgICAgICAgZGF0YUlkPXtmaWx0ZXIuZGF0YUlkfVxuICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiBzZXRGaWx0ZXIoaWR4LCAnZGF0YUlkJywgdmFsdWUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHt0eXBlICYmXG4gICAgICAgICAgICAhZW5sYXJnZWQgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1wYW5lbF9fZmlsdGVyXCI+XG4gICAgICAgICAgICAgICAgPEZpbHRlckNvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgZmlsdGVyPXtmaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICBpZHg9e2lkeH1cbiAgICAgICAgICAgICAgICAgIGlzQW55RmlsdGVyQW5pbWF0aW5nPXtpc0FueUZpbHRlckFuaW1hdGluZ31cbiAgICAgICAgICAgICAgICAgIHRvZ2dsZUFuaW1hdGlvbj17dG9nZ2xlQW5pbWF0aW9ufVxuICAgICAgICAgICAgICAgICAgc2V0RmlsdGVyPXt2YWx1ZSA9PiBzZXRGaWx0ZXIoaWR4LCAndmFsdWUnLCB2YWx1ZSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvU3R5bGVkRmlsdGVyQ29udGVudD5cbiAgICAgICAgPC9TdHlsZWRGaWx0ZXJQYW5lbD5cbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlclBhbmVsRmFjdG9yeTtcbiJdfQ==