"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

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

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _switch = _interopRequireDefault(require("../../common/switch"));

var _brushConfig = _interopRequireDefault(require("./brush-config"));

var _tooltipConfig = _interopRequireDefault(require("./tooltip-config"));

var _styledComponents2 = require("../../common/styled-components");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding-bottom: 6px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-top: 1px solid ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledPanelContent = (0, _styledComponents["default"])(_styledComponents2.PanelContent)(_templateObject(), function (props) {
  return props.theme.panelBorderColor;
});

var StyledInteractionPanel = _styledComponents["default"].div(_templateObject2());

InteractionPanelFactory.deps = [_tooltipConfig["default"], _brushConfig["default"]];

function InteractionPanelFactory(TooltipConfig, BrushConfig) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(InteractionPanel, _Component);

    function InteractionPanel() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, InteractionPanel);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(InteractionPanel)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
        isConfigActive: false
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_updateConfig", function (newProp) {
        _this.props.onConfigChange((0, _objectSpread2["default"])({}, _this.props.config, newProp));
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_enableConfig", function () {
        _this.setState({
          isConfigActive: !_this.state.isConfigActive
        });
      });
      return _this;
    }

    (0, _createClass2["default"])(InteractionPanel, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            config = _this$props.config,
            datasets = _this$props.datasets;

        var onChange = function onChange(newConfig) {
          return _this2._updateConfig({
            config: newConfig
          });
        };

        var template = null;

        switch (config.id) {
          case 'tooltip':
            template = _react["default"].createElement(TooltipConfig, {
              datasets: datasets,
              config: config.config,
              onChange: onChange
            });
            break;

          case 'brush':
            template = _react["default"].createElement(BrushConfig, {
              config: config.config,
              onChange: onChange
            });
            break;

          default:
            break;
        }

        return _react["default"].createElement(StyledInteractionPanel, {
          className: "interaction-panel"
        }, _react["default"].createElement(_styledComponents2.StyledPanelHeader, {
          className: "interaction-panel__header",
          onClick: this._enableConfig
        }, _react["default"].createElement(_styledComponents2.PanelHeaderContent, {
          className: "interaction-panel__header__content"
        }, _react["default"].createElement("div", {
          className: "interaction-panel__header__icon icon"
        }, _react["default"].createElement(config.iconComponent, {
          height: "12px"
        })), _react["default"].createElement("div", {
          className: "interaction-panel__header__title"
        }, _react["default"].createElement(_styledComponents2.PanelHeaderTitle, null, config.id))), _react["default"].createElement("div", {
          className: "interaction-panel__header__actions"
        }, _react["default"].createElement(_switch["default"], {
          checked: config.enabled,
          id: "".concat(config.id, "-toggle"),
          onChange: function onChange() {
            return _this2._updateConfig({
              enabled: !config.enabled
            });
          },
          secondary: true
        }))), config.enabled && _react["default"].createElement(StyledPanelContent, {
          className: "interaction-panel__content"
        }, template));
      }
    }]);
    return InteractionPanel;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    datasets: _propTypes["default"].object.isRequired,
    config: _propTypes["default"].object.isRequired,
    onConfigChange: _propTypes["default"].func.isRequired
  }), _temp;
}

var _default = InteractionPanelFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwvaW50ZXJhY3Rpb24tcGFuZWwuanMiXSwibmFtZXMiOlsiU3R5bGVkUGFuZWxDb250ZW50IiwiUGFuZWxDb250ZW50IiwicHJvcHMiLCJ0aGVtZSIsInBhbmVsQm9yZGVyQ29sb3IiLCJTdHlsZWRJbnRlcmFjdGlvblBhbmVsIiwic3R5bGVkIiwiZGl2IiwiSW50ZXJhY3Rpb25QYW5lbEZhY3RvcnkiLCJkZXBzIiwiVG9vbHRpcENvbmZpZ0ZhY3RvcnkiLCJCcnVzaENvbmZpZ0ZhY3RvcnkiLCJUb29sdGlwQ29uZmlnIiwiQnJ1c2hDb25maWciLCJpc0NvbmZpZ0FjdGl2ZSIsIm5ld1Byb3AiLCJvbkNvbmZpZ0NoYW5nZSIsImNvbmZpZyIsInNldFN0YXRlIiwic3RhdGUiLCJkYXRhc2V0cyIsIm9uQ2hhbmdlIiwibmV3Q29uZmlnIiwiX3VwZGF0ZUNvbmZpZyIsInRlbXBsYXRlIiwiaWQiLCJfZW5hYmxlQ29uZmlnIiwiZW5hYmxlZCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsImlzUmVxdWlyZWQiLCJmdW5jIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLElBQU1BLGtCQUFrQixHQUFHLGtDQUFPQywrQkFBUCxDQUFILG9CQUNFLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsZ0JBQWhCO0FBQUEsQ0FEUCxDQUF4Qjs7QUFJQSxJQUFNQyxzQkFBc0IsR0FBR0MsNkJBQU9DLEdBQVYsb0JBQTVCOztBQUlBQyx1QkFBdUIsQ0FBQ0MsSUFBeEIsR0FBK0IsQ0FDN0JDLHlCQUQ2QixFQUU3QkMsdUJBRjZCLENBQS9COztBQUtBLFNBQVNILHVCQUFULENBQWlD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RlI7QUFHakJmLElBQUFBLGNBQWMsRUFBRWEsc0JBQVVHLElBQVYsQ0FBZUQ7QUFIZCxHQURyQjtBQTRFRDs7ZUFFY3ZCLHVCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgU3dpdGNoIGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL3N3aXRjaCc7XG5cbmltcG9ydCBCcnVzaENvbmZpZ0ZhY3RvcnkgZnJvbSAnLi9icnVzaC1jb25maWcnO1xuaW1wb3J0IFRvb2x0aXBDb25maWdGYWN0b3J5IGZyb20gJy4vdG9vbHRpcC1jb25maWcnO1xuXG5pbXBvcnQge1xuICBTdHlsZWRQYW5lbEhlYWRlcixcbiAgUGFuZWxIZWFkZXJUaXRsZSxcbiAgUGFuZWxIZWFkZXJDb250ZW50LFxuICBQYW5lbENvbnRlbnRcbn0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5jb25zdCBTdHlsZWRQYW5lbENvbnRlbnQgPSBzdHlsZWQoUGFuZWxDb250ZW50KWBcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCb3JkZXJDb2xvcn07XG5gO1xuXG5jb25zdCBTdHlsZWRJbnRlcmFjdGlvblBhbmVsID0gc3R5bGVkLmRpdmBcbiAgcGFkZGluZy1ib3R0b206IDZweDtcbmA7XG5cbkludGVyYWN0aW9uUGFuZWxGYWN0b3J5LmRlcHMgPSBbXG4gIFRvb2x0aXBDb25maWdGYWN0b3J5LFxuICBCcnVzaENvbmZpZ0ZhY3Rvcnlcbl07XG5cbmZ1bmN0aW9uIEludGVyYWN0aW9uUGFuZWxGYWN0b3J5KFRvb2x0aXBDb25maWcsIEJydXNoQ29uZmlnKSB7XG4gIHJldHVybiBjbGFzcyBJbnRlcmFjdGlvblBhbmVsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgZGF0YXNldHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIGNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgb25Db25maWdDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWRcbiAgICB9O1xuXG4gICAgc3RhdGUgPSB7aXNDb25maWdBY3RpdmU6IGZhbHNlfTtcblxuICAgIF91cGRhdGVDb25maWcgPSBuZXdQcm9wID0+IHtcbiAgICAgIHRoaXMucHJvcHMub25Db25maWdDaGFuZ2Uoe1xuICAgICAgICAuLi50aGlzLnByb3BzLmNvbmZpZyxcbiAgICAgICAgLi4ubmV3UHJvcFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIF9lbmFibGVDb25maWcgPSAoKSA9PiB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtpc0NvbmZpZ0FjdGl2ZTogIXRoaXMuc3RhdGUuaXNDb25maWdBY3RpdmV9KTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge2NvbmZpZywgZGF0YXNldHN9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IG9uQ2hhbmdlID0gbmV3Q29uZmlnID0+IHRoaXMuX3VwZGF0ZUNvbmZpZyh7Y29uZmlnOiBuZXdDb25maWd9KTtcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IG51bGw7XG5cbiAgICAgIHN3aXRjaCAoY29uZmlnLmlkKSB7XG4gICAgICAgIGNhc2UgJ3Rvb2x0aXAnOlxuICAgICAgICAgIHRlbXBsYXRlID0gKFxuICAgICAgICAgICAgPFRvb2x0aXBDb25maWdcbiAgICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgICBjb25maWc9e2NvbmZpZy5jb25maWd9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdicnVzaCc6XG4gICAgICAgICAgdGVtcGxhdGUgPSA8QnJ1c2hDb25maWcgY29uZmlnPXtjb25maWcuY29uZmlnfSBvbkNoYW5nZT17b25DaGFuZ2V9IC8+O1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxTdHlsZWRJbnRlcmFjdGlvblBhbmVsIGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsXCI+XG4gICAgICAgICAgPFN0eWxlZFBhbmVsSGVhZGVyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9faGVhZGVyXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX2VuYWJsZUNvbmZpZ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGFuZWxIZWFkZXJDb250ZW50IGNsYXNzTmFtZT1cImludGVyYWN0aW9uLXBhbmVsX19oZWFkZXJfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbnRlcmFjdGlvbi1wYW5lbF9faGVhZGVyX19pY29uIGljb25cIj5cbiAgICAgICAgICAgICAgICA8Y29uZmlnLmljb25Db21wb25lbnQgaGVpZ2h0PVwiMTJweFwiLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2hlYWRlcl9fdGl0bGVcIj5cbiAgICAgICAgICAgICAgICA8UGFuZWxIZWFkZXJUaXRsZT57Y29uZmlnLmlkfTwvUGFuZWxIZWFkZXJUaXRsZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L1BhbmVsSGVhZGVyQ29udGVudD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2hlYWRlcl9fYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8U3dpdGNoXG4gICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLmVuYWJsZWR9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake2NvbmZpZy5pZH0tdG9nZ2xlYH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdGhpcy5fdXBkYXRlQ29uZmlnKHtlbmFibGVkOiAhY29uZmlnLmVuYWJsZWR9KX1cbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvU3R5bGVkUGFuZWxIZWFkZXI+XG4gICAgICAgICAge2NvbmZpZy5lbmFibGVkICYmIChcbiAgICAgICAgICAgIDxTdHlsZWRQYW5lbENvbnRlbnQgY2xhc3NOYW1lPVwiaW50ZXJhY3Rpb24tcGFuZWxfX2NvbnRlbnRcIj5cbiAgICAgICAgICAgICAge3RlbXBsYXRlfVxuICAgICAgICAgICAgPC9TdHlsZWRQYW5lbENvbnRlbnQ+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9TdHlsZWRJbnRlcmFjdGlvblBhbmVsPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJhY3Rpb25QYW5lbEZhY3Rvcnk7XG4iXX0=