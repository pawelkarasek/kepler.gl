"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _window = require("global/window");

var _redux = require("redux");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reselect = require("reselect");

var _keplerglConnect = require("../connect/keplergl-connect");

var VisStateActions = _interopRequireWildcard(require("../actions/vis-state-actions"));

var MapStateActions = _interopRequireWildcard(require("../actions/map-state-actions"));

var MapStyleActions = _interopRequireWildcard(require("../actions/map-style-actions"));

var UIStateActions = _interopRequireWildcard(require("../actions/ui-state-actions"));

var _defaultSettings = require("../constants/default-settings");

var _userFeedbacks = require("../constants/user-feedbacks");

var _sidePanel = _interopRequireDefault(require("./side-panel"));

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _bottomWidget = _interopRequireDefault(require("./bottom-widget"));

var _modalContainer = _interopRequireDefault(require("./modal-container"));

var _plotContainer = _interopRequireDefault(require("./plot-container"));

var _notificationPanel = _interopRequireDefault(require("./notification-panel"));

var _utils = require("../utils/utils");

var _mapboxUtils = require("../utils/mapbox-utils");

var _base = require("../styles/base");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-family: ff-clan-web-pro, 'Helvetica Neue', Helvetica, sans-serif;\n  font-weight: 400;\n  font-size: 0.875em;\n  line-height: 1.71429;\n\n  *,\n  *:before,\n  *:after {\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n  }\n\n  ul {\n    margin: 0;\n    padding: 0;\n  }\n\n  li {\n    margin: 0;\n  }\n\n  a {\n    text-decoration: none;\n    color: ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

// Maybe we should think about exporting this or creating a variable
// as part of the base.js theme
var GlobalStyle = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.theme.labelColor;
});

KeplerGlFactory.deps = [_bottomWidget["default"], _mapContainer["default"], _modalContainer["default"], _sidePanel["default"], _plotContainer["default"], _notificationPanel["default"]];

function KeplerGlFactory(BottomWidget, MapContainer, ModalWrapper, SidePanel, PlotContainer, NotificationPanel) {
  var KeplerGL =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(KeplerGL, _Component);

    function KeplerGL() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, KeplerGL);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(KeplerGL)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "themeSelector", function (props) {
        return props.theme;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "availableThemeSelector", (0, _reselect.createSelector)(_this.themeSelector, function (theme) {
        return (0, _typeof2["default"])(theme) === 'object' ? (0, _objectSpread2["default"])({}, _base.theme, theme) : theme === _defaultSettings.THEME.light ? _base.themeLT : theme;
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_loadMapStyle", function () {
        var defaultStyles = Object.values(_this.props.mapStyle.mapStyles); // add id to custom map styles if not given

        var customStyles = (_this.props.mapStyles || []).map(function (ms) {
          return (0, _objectSpread2["default"])({}, ms, {
            id: ms.id || (0, _utils.generateHashId)()
          });
        });
        var allStyles = [].concat((0, _toConsumableArray2["default"])(customStyles), (0, _toConsumableArray2["default"])(defaultStyles)).reduce(function (accu, style) {
          var hasStyleObject = style.style && (0, _typeof2["default"])(style.style) === 'object';
          accu[hasStyleObject ? 'toLoad' : 'toRequest'][style.id] = style;
          return accu;
        }, {
          toLoad: {},
          toRequest: {}
        });

        _this.props.mapStyleActions.loadMapStyles(allStyles.toLoad);

        _this.props.mapStyleActions.requestMapStyles(allStyles.toRequest);
      });
      return _this;
    }

    (0, _createClass2["default"])(KeplerGL, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this._validateMapboxToken();

        this._loadMapStyle(this.props.mapStyles);

        this._handleResize(this.props);
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if ( // if dimension props has changed
        this.props.height !== nextProps.height || this.props.width !== nextProps.width || // react-map-gl will dispatch updateViewport after this._handleResize is called
        // here we check if this.props.mapState.height is sync with props.height
        nextProps.height !== this.props.mapState.height) {
          this._handleResize(nextProps);
        }
      }
      /* selector */

    }, {
      key: "_validateMapboxToken",
      value: function _validateMapboxToken() {
        var mapboxApiAccessToken = this.props.mapboxApiAccessToken;

        if (!(0, _mapboxUtils.validateToken)(mapboxApiAccessToken)) {
          _window.console.warn(_userFeedbacks.MISSING_MAPBOX_TOKEN);
        }
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(_ref) {
        var width = _ref.width,
            height = _ref.height;

        if (!Number.isFinite(width) || !Number.isFinite(height)) {
          _window.console.warn('width and height is required');

          return;
        }

        this.props.mapStateActions.updateMap({
          width: width / (1 + Number(this.props.mapState.isSplit)),
          height: height
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _this$props = this.props,
            id = _this$props.id,
            appName = _this$props.appName,
            version = _this$props.version,
            onSaveMap = _this$props.onSaveMap,
            onViewStateChange = _this$props.onViewStateChange,
            width = _this$props.width,
            height = _this$props.height,
            mapboxApiAccessToken = _this$props.mapboxApiAccessToken,
            getMapboxRef = _this$props.getMapboxRef,
            mapStyle = _this$props.mapStyle,
            mapState = _this$props.mapState,
            uiState = _this$props.uiState,
            visState = _this$props.visState,
            visStateActions = _this$props.visStateActions,
            mapStateActions = _this$props.mapStateActions,
            mapStyleActions = _this$props.mapStyleActions,
            uiStateActions = _this$props.uiStateActions;
        var filters = visState.filters,
            layers = visState.layers,
            splitMaps = visState.splitMaps,
            layerOrder = visState.layerOrder,
            layerBlending = visState.layerBlending,
            layerClasses = visState.layerClasses,
            interactionConfig = visState.interactionConfig,
            datasets = visState.datasets,
            layerData = visState.layerData,
            hoverInfo = visState.hoverInfo,
            clicked = visState.clicked;
        var notificationPanelFields = {
          removeNotification: uiStateActions.removeNotification,
          notifications: uiState.notifications
        };
        var sideFields = {
          appName: appName,
          version: version,
          datasets: datasets,
          filters: filters,
          layers: layers,
          layerOrder: layerOrder,
          layerClasses: layerClasses,
          interactionConfig: interactionConfig,
          mapStyle: mapStyle,
          layerBlending: layerBlending,
          onSaveMap: onSaveMap,
          uiState: uiState,
          mapStyleActions: mapStyleActions,
          visStateActions: visStateActions,
          uiStateActions: uiStateActions,
          width: this.props.sidePanelWidth
        };
        var mapFields = {
          datasets: datasets,
          mapboxApiAccessToken: mapboxApiAccessToken,
          mapState: mapState,
          mapStyle: mapStyle,
          mapControls: uiState.mapControls,
          layers: layers,
          layerOrder: layerOrder,
          layerData: layerData,
          layerBlending: layerBlending,
          interactionConfig: interactionConfig,
          hoverInfo: hoverInfo,
          clicked: clicked,
          toggleMapControl: uiStateActions.toggleMapControl,
          onViewStateChange: onViewStateChange,
          uiStateActions: uiStateActions,
          visStateActions: visStateActions,
          mapStateActions: mapStateActions
        };
        var isSplit = splitMaps && splitMaps.length > 1;
        var containerW = mapState.width * (Number(isSplit) + 1);
        var mapContainers = !isSplit ? [_react["default"].createElement(MapContainer, (0, _extends2["default"])({
          key: 0,
          index: 0
        }, mapFields, {
          mapLayers: isSplit ? splitMaps[0].layers : null,
          getMapboxRef: getMapboxRef
        }))] : splitMaps.map(function (settings, index) {
          return _react["default"].createElement(MapContainer, (0, _extends2["default"])({
            key: index,
            index: index
          }, mapFields, {
            mapLayers: splitMaps[index].layers,
            getMapboxRef: getMapboxRef
          }));
        });
        var isExporting = uiState.currentModal === _defaultSettings.EXPORT_IMAGE_ID;
        var theme = this.availableThemeSelector(this.props);
        return _react["default"].createElement(_styledComponents.ThemeProvider, {
          theme: theme
        }, _react["default"].createElement(GlobalStyle, {
          style: {
            position: 'relative',
            width: "".concat(width, "px"),
            height: "".concat(height, "px")
          },
          className: "kepler-gl",
          id: "kepler-gl__".concat(id),
          ref: function ref(node) {
            _this2.root = node;
          }
        }, _react["default"].createElement(NotificationPanel, notificationPanelFields), !uiState.readOnly && _react["default"].createElement(SidePanel, sideFields), _react["default"].createElement("div", {
          className: "maps",
          style: {
            display: 'flex'
          }
        }, mapContainers), isExporting && _react["default"].createElement(PlotContainer, {
          width: width,
          height: height,
          exportImageSetting: uiState.exportImage,
          mapFields: mapFields,
          addNotification: uiStateActions.addNotification,
          startExportingImage: uiStateActions.startExportingImage,
          setExportImageDataUri: uiStateActions.setExportImageDataUri,
          setExportImageError: uiStateActions.setExportImageError
        }), _react["default"].createElement(BottomWidget, {
          filters: filters,
          datasets: datasets,
          uiState: uiState,
          visStateActions: visStateActions,
          sidePanelWidth: uiState.readOnly ? 0 : this.props.sidePanelWidth + _defaultSettings.DIMENSIONS.sidePanel.margin.left,
          containerW: containerW
        }), _react["default"].createElement(ModalWrapper, {
          mapStyle: mapStyle,
          visState: visState,
          mapState: mapState,
          uiState: uiState,
          mapboxApiAccessToken: mapboxApiAccessToken,
          visStateActions: visStateActions,
          uiStateActions: uiStateActions,
          mapStyleActions: mapStyleActions,
          rootNode: this.root,
          containerW: containerW,
          containerH: mapState.height
        })));
      }
    }]);
    return KeplerGL;
  }(_react.Component);

  (0, _defineProperty2["default"])(KeplerGL, "defaultProps", {
    mapStyles: [],
    width: 800,
    height: 800,
    appName: _defaultSettings.KEPLER_GL_NAME,
    version: _defaultSettings.KEPLER_GL_VERSION,
    sidePanelWidth: _defaultSettings.DIMENSIONS.sidePanel.width,
    theme: {}
  });
  return (0, _keplerglConnect.connect)(mapStateToProps, makeMapDispatchToProps)((0, _styledComponents.withTheme)(KeplerGL));
}

function mapStateToProps(state, props) {
  return (0, _objectSpread2["default"])({}, props, {
    visState: state.visState,
    mapStyle: state.mapStyle,
    mapState: state.mapState,
    uiState: state.uiState
  });
}

var defaultUserActions = {};

var getDispatch = function getDispatch(dispatch) {
  return dispatch;
};

var getUserActions = function getUserActions(dispatch, props) {
  return props.actions || defaultUserActions;
};

function makeGetActionCreators() {
  return (0, _reselect.createSelector)([getDispatch, getUserActions], function (dispatch, userActions) {
    var _map = [VisStateActions, MapStateActions, MapStyleActions, UIStateActions].map(function (actions) {
      return (0, _redux.bindActionCreators)(mergeActions(actions, userActions), dispatch);
    }),
        _map2 = (0, _slicedToArray2["default"])(_map, 4),
        visStateActions = _map2[0],
        mapStateActions = _map2[1],
        mapStyleActions = _map2[2],
        uiStateActions = _map2[3];

    return {
      visStateActions: visStateActions,
      mapStateActions: mapStateActions,
      mapStyleActions: mapStyleActions,
      uiStateActions: uiStateActions,
      dispatch: dispatch
    };
  });
}

function makeMapDispatchToProps() {
  var getActionCreators = makeGetActionCreators();

  var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
    var groupedActionCreators = getActionCreators(dispatch, ownProps);
    return (0, _objectSpread2["default"])({}, groupedActionCreators, {
      dispatch: dispatch
    });
  };

  return mapDispatchToProps;
}
/**
 * Override default kepler.gl actions with user defined actions using the same key
 */


function mergeActions(actions, userActions) {
  var overrides = {};

  for (var key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return (0, _objectSpread2["default"])({}, actions, overrides);
}

var _default = KeplerGlFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2tlcGxlci1nbC5qcyJdLCJuYW1lcyI6WyJHbG9iYWxTdHlsZSIsInN0eWxlZCIsImRpdiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwiS2VwbGVyR2xGYWN0b3J5IiwiZGVwcyIsIkJvdHRvbVdpZGdldEZhY3RvcnkiLCJNYXBDb250YWluZXJGYWN0b3J5IiwiTW9kYWxDb250YWluZXJGYWN0b3J5IiwiU2lkZVBhbmVsRmFjdG9yeSIsIlBsb3RDb250YWluZXJGYWN0b3J5IiwiTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IiwiQm90dG9tV2lkZ2V0IiwiTWFwQ29udGFpbmVyIiwiTW9kYWxXcmFwcGVyIiwiU2lkZVBhbmVsIiwiUGxvdENvbnRhaW5lciIsIk5vdGlmaWNhdGlvblBhbmVsIiwiS2VwbGVyR0wiLCJ0aGVtZVNlbGVjdG9yIiwiYmFzaWNUaGVtZSIsIlRIRU1FIiwibGlnaHQiLCJ0aGVtZUxUIiwiZGVmYXVsdFN0eWxlcyIsIk9iamVjdCIsInZhbHVlcyIsIm1hcFN0eWxlIiwibWFwU3R5bGVzIiwiY3VzdG9tU3R5bGVzIiwibWFwIiwibXMiLCJpZCIsImFsbFN0eWxlcyIsInJlZHVjZSIsImFjY3UiLCJzdHlsZSIsImhhc1N0eWxlT2JqZWN0IiwidG9Mb2FkIiwidG9SZXF1ZXN0IiwibWFwU3R5bGVBY3Rpb25zIiwibG9hZE1hcFN0eWxlcyIsInJlcXVlc3RNYXBTdHlsZXMiLCJfdmFsaWRhdGVNYXBib3hUb2tlbiIsIl9sb2FkTWFwU3R5bGUiLCJfaGFuZGxlUmVzaXplIiwibmV4dFByb3BzIiwiaGVpZ2h0Iiwid2lkdGgiLCJtYXBTdGF0ZSIsIm1hcGJveEFwaUFjY2Vzc1Rva2VuIiwiQ29uc29sZSIsIndhcm4iLCJNSVNTSU5HX01BUEJPWF9UT0tFTiIsIk51bWJlciIsImlzRmluaXRlIiwibWFwU3RhdGVBY3Rpb25zIiwidXBkYXRlTWFwIiwiaXNTcGxpdCIsImFwcE5hbWUiLCJ2ZXJzaW9uIiwib25TYXZlTWFwIiwib25WaWV3U3RhdGVDaGFuZ2UiLCJnZXRNYXBib3hSZWYiLCJ1aVN0YXRlIiwidmlzU3RhdGUiLCJ2aXNTdGF0ZUFjdGlvbnMiLCJ1aVN0YXRlQWN0aW9ucyIsImZpbHRlcnMiLCJsYXllcnMiLCJzcGxpdE1hcHMiLCJsYXllck9yZGVyIiwibGF5ZXJCbGVuZGluZyIsImxheWVyQ2xhc3NlcyIsImludGVyYWN0aW9uQ29uZmlnIiwiZGF0YXNldHMiLCJsYXllckRhdGEiLCJob3ZlckluZm8iLCJjbGlja2VkIiwibm90aWZpY2F0aW9uUGFuZWxGaWVsZHMiLCJyZW1vdmVOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb25zIiwic2lkZUZpZWxkcyIsInNpZGVQYW5lbFdpZHRoIiwibWFwRmllbGRzIiwibWFwQ29udHJvbHMiLCJ0b2dnbGVNYXBDb250cm9sIiwibGVuZ3RoIiwiY29udGFpbmVyVyIsIm1hcENvbnRhaW5lcnMiLCJzZXR0aW5ncyIsImluZGV4IiwiaXNFeHBvcnRpbmciLCJjdXJyZW50TW9kYWwiLCJFWFBPUlRfSU1BR0VfSUQiLCJhdmFpbGFibGVUaGVtZVNlbGVjdG9yIiwicG9zaXRpb24iLCJub2RlIiwicm9vdCIsInJlYWRPbmx5IiwiZGlzcGxheSIsImV4cG9ydEltYWdlIiwiYWRkTm90aWZpY2F0aW9uIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsInNldEV4cG9ydEltYWdlRXJyb3IiLCJESU1FTlNJT05TIiwic2lkZVBhbmVsIiwibWFyZ2luIiwibGVmdCIsIkNvbXBvbmVudCIsIktFUExFUl9HTF9OQU1FIiwiS0VQTEVSX0dMX1ZFUlNJT04iLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYWtlTWFwRGlzcGF0Y2hUb1Byb3BzIiwic3RhdGUiLCJkZWZhdWx0VXNlckFjdGlvbnMiLCJnZXREaXNwYXRjaCIsImRpc3BhdGNoIiwiZ2V0VXNlckFjdGlvbnMiLCJhY3Rpb25zIiwibWFrZUdldEFjdGlvbkNyZWF0b3JzIiwidXNlckFjdGlvbnMiLCJWaXNTdGF0ZUFjdGlvbnMiLCJNYXBTdGF0ZUFjdGlvbnMiLCJNYXBTdHlsZUFjdGlvbnMiLCJVSVN0YXRlQWN0aW9ucyIsIm1lcmdlQWN0aW9ucyIsImdldEFjdGlvbkNyZWF0b3JzIiwibWFwRGlzcGF0Y2hUb1Byb3BzIiwib3duUHJvcHMiLCJncm91cGVkQWN0aW9uQ3JlYXRvcnMiLCJvdmVycmlkZXMiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBLElBQU1BLFdBQVcsR0FBR0MsNkJBQU9DLEdBQVYsb0JBeUJKLFVBQUFDLEtBQUs7QUFBQSxTQUFJQSxLQUFLLENBQUNDLEtBQU4sQ0FBWUMsVUFBaEI7QUFBQSxDQXpCRCxDQUFqQjs7QUE2QkFDLGVBQWUsQ0FBQ0MsSUFBaEIsR0FBdUIsQ0FDckJDLHdCQURxQixFQUVyQkMsd0JBRnFCLEVBR3JCQywwQkFIcUIsRUFJckJDLHFCQUpxQixFQUtyQkMseUJBTHFCLEVBTXJCQyw2QkFOcUIsQ0FBdkI7O0FBU0EsU0FBU1AsZUFBVCxDQUNFUSxZQURGLEVBRUVDLFlBRkYsRUFHRUMsWUFIRixFQUlFQyxTQUpGLEVBS0VDLGFBTEYsRUFNRUMsaUJBTkYsRUFPRTtBQUFBLE1BQ01DLFFBRE47QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx3R0FnQ2tCLFVBQUFqQixLQUFLO0FBQUEsZUFBSUEsS0FBSyxDQUFDQyxLQUFWO0FBQUEsT0FoQ3ZCO0FBQUEsaUhBaUMyQiw4QkFDdkIsTUFBS2lCLGFBRGtCLEVBRXZC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VCxDQUFzQlAsT0FBdEIsRUFBK0JFLFdBQS9CLEVBQTRDO0FBQzFDLE1BQU1VLFNBQVMsR0FBRyxFQUFsQjs7QUFDQSxPQUFLLElBQU1DLEdBQVgsSUFBa0JYLFdBQWxCLEVBQStCO0FBQzdCLFFBQUlBLFdBQVcsQ0FBQ1ksY0FBWixDQUEyQkQsR0FBM0IsS0FBbUNiLE9BQU8sQ0FBQ2MsY0FBUixDQUF1QkQsR0FBdkIsQ0FBdkMsRUFBb0U7QUFDbEVELE1BQUFBLFNBQVMsQ0FBQ0MsR0FBRCxDQUFULEdBQWlCWCxXQUFXLENBQUNXLEdBQUQsQ0FBNUI7QUFDRDtBQUNGOztBQUVELDRDQUFXYixPQUFYLEVBQXVCWSxTQUF2QjtBQUNEOztlQUVjaEksZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25zb2xlIGFzIENvbnNvbGV9IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IHtiaW5kQWN0aW9uQ3JlYXRvcnN9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBzdHlsZWQsIHtUaGVtZVByb3ZpZGVyLCB3aXRoVGhlbWV9ICBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge2NyZWF0ZVNlbGVjdG9yfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQge2Nvbm5lY3QgYXMga2VwbGVyR2xDb25uZWN0fSBmcm9tICdjb25uZWN0L2tlcGxlcmdsLWNvbm5lY3QnO1xuXG5pbXBvcnQgKiBhcyBWaXNTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy92aXMtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdGF0ZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3RhdGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBNYXBTdHlsZUFjdGlvbnMgZnJvbSAnYWN0aW9ucy9tYXAtc3R5bGUtYWN0aW9ucyc7XG5pbXBvcnQgKiBhcyBVSVN0YXRlQWN0aW9ucyBmcm9tICdhY3Rpb25zL3VpLXN0YXRlLWFjdGlvbnMnO1xuXG5pbXBvcnQge0VYUE9SVF9JTUFHRV9JRCwgRElNRU5TSU9OUyxcbiAgS0VQTEVSX0dMX05BTUUsIEtFUExFUl9HTF9WRVJTSU9OLCBUSEVNRX0gZnJvbSAnY29uc3RhbnRzL2RlZmF1bHQtc2V0dGluZ3MnO1xuaW1wb3J0IHtNSVNTSU5HX01BUEJPWF9UT0tFTn0gZnJvbSAnY29uc3RhbnRzL3VzZXItZmVlZGJhY2tzJztcblxuaW1wb3J0IFNpZGVQYW5lbEZhY3RvcnkgZnJvbSAnLi9zaWRlLXBhbmVsJztcbmltcG9ydCBNYXBDb250YWluZXJGYWN0b3J5IGZyb20gJy4vbWFwLWNvbnRhaW5lcic7XG5pbXBvcnQgQm90dG9tV2lkZ2V0RmFjdG9yeSBmcm9tICcuL2JvdHRvbS13aWRnZXQnO1xuaW1wb3J0IE1vZGFsQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21vZGFsLWNvbnRhaW5lcic7XG5pbXBvcnQgUGxvdENvbnRhaW5lckZhY3RvcnkgZnJvbSAnLi9wbG90LWNvbnRhaW5lcic7XG5pbXBvcnQgTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5IGZyb20gJy4vbm90aWZpY2F0aW9uLXBhbmVsJztcblxuaW1wb3J0IHtnZW5lcmF0ZUhhc2hJZH0gZnJvbSAndXRpbHMvdXRpbHMnO1xuaW1wb3J0IHt2YWxpZGF0ZVRva2VufSBmcm9tICd1dGlscy9tYXBib3gtdXRpbHMnO1xuXG5pbXBvcnQge3RoZW1lIGFzIGJhc2ljVGhlbWUsIHRoZW1lTFR9IGZyb20gJ3N0eWxlcy9iYXNlJztcblxuLy8gTWF5YmUgd2Ugc2hvdWxkIHRoaW5rIGFib3V0IGV4cG9ydGluZyB0aGlzIG9yIGNyZWF0aW5nIGEgdmFyaWFibGVcbi8vIGFzIHBhcnQgb2YgdGhlIGJhc2UuanMgdGhlbWVcbmNvbnN0IEdsb2JhbFN0eWxlID0gc3R5bGVkLmRpdmBcbiAgZm9udC1mYW1pbHk6IGZmLWNsYW4td2ViLXBybywgJ0hlbHZldGljYSBOZXVlJywgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LXNpemU6IDAuODc1ZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjcxNDI5O1xuXG4gICosXG4gICo6YmVmb3JlLFxuICAqOmFmdGVyIHtcbiAgICAtd2Via2l0LWJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgLW1vei1ib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIH1cblxuICB1bCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cblxuICBsaSB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICB9XG5gO1xuXG5LZXBsZXJHbEZhY3RvcnkuZGVwcyA9IFtcbiAgQm90dG9tV2lkZ2V0RmFjdG9yeSxcbiAgTWFwQ29udGFpbmVyRmFjdG9yeSxcbiAgTW9kYWxDb250YWluZXJGYWN0b3J5LFxuICBTaWRlUGFuZWxGYWN0b3J5LFxuICBQbG90Q29udGFpbmVyRmFjdG9yeSxcbiAgTm90aWZpY2F0aW9uUGFuZWxGYWN0b3J5XG5dO1xuXG5mdW5jdGlvbiBLZXBsZXJHbEZhY3RvcnkoXG4gIEJvdHRvbVdpZGdldCxcbiAgTWFwQ29udGFpbmVyLFxuICBNb2RhbFdyYXBwZXIsXG4gIFNpZGVQYW5lbCxcbiAgUGxvdENvbnRhaW5lcixcbiAgTm90aWZpY2F0aW9uUGFuZWxcbikge1xuICBjbGFzcyBLZXBsZXJHTCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgIG1hcFN0eWxlczogW10sXG4gICAgICB3aWR0aDogODAwLFxuICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICBhcHBOYW1lOiBLRVBMRVJfR0xfTkFNRSxcbiAgICAgIHZlcnNpb246IEtFUExFUl9HTF9WRVJTSU9OLFxuICAgICAgc2lkZVBhbmVsV2lkdGg6IERJTUVOU0lPTlMuc2lkZVBhbmVsLndpZHRoLFxuICAgICAgdGhlbWU6IHt9XG4gICAgfTtcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRlTWFwYm94VG9rZW4oKTtcbiAgICAgIHRoaXMuX2xvYWRNYXBTdHlsZSh0aGlzLnByb3BzLm1hcFN0eWxlcyk7XG4gICAgICB0aGlzLl9oYW5kbGVSZXNpemUodGhpcy5wcm9wcyk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgLy8gaWYgZGltZW5zaW9uIHByb3BzIGhhcyBjaGFuZ2VkXG4gICAgICAgIHRoaXMucHJvcHMuaGVpZ2h0ICE9PSBuZXh0UHJvcHMuaGVpZ2h0IHx8XG4gICAgICAgIHRoaXMucHJvcHMud2lkdGggIT09IG5leHRQcm9wcy53aWR0aCB8fFxuICAgICAgICAvLyByZWFjdC1tYXAtZ2wgd2lsbCBkaXNwYXRjaCB1cGRhdGVWaWV3cG9ydCBhZnRlciB0aGlzLl9oYW5kbGVSZXNpemUgaXMgY2FsbGVkXG4gICAgICAgIC8vIGhlcmUgd2UgY2hlY2sgaWYgdGhpcy5wcm9wcy5tYXBTdGF0ZS5oZWlnaHQgaXMgc3luYyB3aXRoIHByb3BzLmhlaWdodFxuICAgICAgICBuZXh0UHJvcHMuaGVpZ2h0ICE9PSB0aGlzLnByb3BzLm1hcFN0YXRlLmhlaWdodFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZVJlc2l6ZShuZXh0UHJvcHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qIHNlbGVjdG9yICovXG4gICAgdGhlbWVTZWxlY3RvciA9IHByb3BzID0+IHByb3BzLnRoZW1lO1xuICAgIGF2YWlsYWJsZVRoZW1lU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHRoaXMudGhlbWVTZWxlY3RvcixcbiAgICAgIHRoZW1lID0+IHR5cGVvZiB0aGVtZSA9PT0gJ29iamVjdCcgPyAoe1xuICAgICAgICAuLi5iYXNpY1RoZW1lLFxuICAgICAgICAuLi50aGVtZVxuICAgICAgfSkgOiB0aGVtZSA9PT0gVEhFTUUubGlnaHQgPyB0aGVtZUxUIDogdGhlbWVcbiAgICApO1xuXG4gICAgX3ZhbGlkYXRlTWFwYm94VG9rZW4oKSB7XG4gICAgICBjb25zdCB7bWFwYm94QXBpQWNjZXNzVG9rZW59ID0gdGhpcy5wcm9wcztcbiAgICAgIGlmICghdmFsaWRhdGVUb2tlbihtYXBib3hBcGlBY2Nlc3NUb2tlbikpIHtcbiAgICAgICAgQ29uc29sZS53YXJuKE1JU1NJTkdfTUFQQk9YX1RPS0VOKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfaGFuZGxlUmVzaXplKHt3aWR0aCwgaGVpZ2h0fSkge1xuICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICFOdW1iZXIuaXNGaW5pdGUoaGVpZ2h0KSkge1xuICAgICAgICBDb25zb2xlLndhcm4oJ3dpZHRoIGFuZCBoZWlnaHQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5tYXBTdGF0ZUFjdGlvbnMudXBkYXRlTWFwKHtcbiAgICAgICAgd2lkdGg6IHdpZHRoIC8gKDEgKyBOdW1iZXIodGhpcy5wcm9wcy5tYXBTdGF0ZS5pc1NwbGl0KSksXG4gICAgICAgIGhlaWdodFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2xvYWRNYXBTdHlsZSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZXMgPSBPYmplY3QudmFsdWVzKHRoaXMucHJvcHMubWFwU3R5bGUubWFwU3R5bGVzKTtcbiAgICAgIC8vIGFkZCBpZCB0byBjdXN0b20gbWFwIHN0eWxlcyBpZiBub3QgZ2l2ZW5cbiAgICAgIGNvbnN0IGN1c3RvbVN0eWxlcyA9ICh0aGlzLnByb3BzLm1hcFN0eWxlcyB8fCBbXSkubWFwKG1zID0+ICh7XG4gICAgICAgIC4uLm1zLFxuICAgICAgICBpZDogbXMuaWQgfHwgZ2VuZXJhdGVIYXNoSWQoKVxuICAgICAgfSkpO1xuXG4gICAgICBjb25zdCBhbGxTdHlsZXMgPSBbLi4uY3VzdG9tU3R5bGVzLCAuLi5kZWZhdWx0U3R5bGVzXS5yZWR1Y2UoKGFjY3UsIHN0eWxlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaGFzU3R5bGVPYmplY3QgPSBzdHlsZS5zdHlsZSAmJiB0eXBlb2Ygc3R5bGUuc3R5bGUgPT09ICdvYmplY3QnO1xuICAgICAgICAgIGFjY3VbaGFzU3R5bGVPYmplY3QgPyAndG9Mb2FkJyA6ICd0b1JlcXVlc3QnXVtzdHlsZS5pZF0gPSBzdHlsZTtcblxuICAgICAgICAgIHJldHVybiBhY2N1O1xuICAgICAgICB9LCB7dG9Mb2FkOiB7fSwgdG9SZXF1ZXN0OiB7fX1cbiAgICAgICk7XG5cbiAgICAgIHRoaXMucHJvcHMubWFwU3R5bGVBY3Rpb25zLmxvYWRNYXBTdHlsZXMoYWxsU3R5bGVzLnRvTG9hZCk7XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlQWN0aW9ucy5yZXF1ZXN0TWFwU3R5bGVzKGFsbFN0eWxlcy50b1JlcXVlc3QpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIC8vIHByb3BzXG4gICAgICAgIGlkLFxuICAgICAgICBhcHBOYW1lLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICBvblNhdmVNYXAsXG4gICAgICAgIG9uVmlld1N0YXRlQ2hhbmdlLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbixcbiAgICAgICAgZ2V0TWFwYm94UmVmLFxuXG4gICAgICAgIC8vIHJlZHV4IHN0YXRlXG4gICAgICAgIG1hcFN0eWxlLFxuICAgICAgICBtYXBTdGF0ZSxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgdmlzU3RhdGUsXG5cbiAgICAgICAgLy8gYWN0aW9ucyxcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnNcbiAgICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICBjb25zdCB7XG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgc3BsaXRNYXBzLCAvLyB0aGlzIHdpbGwgc3RvcmUgc3VwcG9ydCBmb3Igc3BsaXQgbWFwIHZpZXcgaXMgbmVjZXNzYXJ5XG4gICAgICAgIGxheWVyT3JkZXIsXG4gICAgICAgIGxheWVyQmxlbmRpbmcsXG4gICAgICAgIGxheWVyQ2xhc3NlcyxcbiAgICAgICAgaW50ZXJhY3Rpb25Db25maWcsXG4gICAgICAgIGRhdGFzZXRzLFxuICAgICAgICBsYXllckRhdGEsXG4gICAgICAgIGhvdmVySW5mbyxcbiAgICAgICAgY2xpY2tlZFxuICAgICAgfSA9IHZpc1N0YXRlO1xuXG4gICAgICBjb25zdCBub3RpZmljYXRpb25QYW5lbEZpZWxkcyA9IHtcbiAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9uOiB1aVN0YXRlQWN0aW9ucy5yZW1vdmVOb3RpZmljYXRpb24sXG4gICAgICAgIG5vdGlmaWNhdGlvbnM6IHVpU3RhdGUubm90aWZpY2F0aW9uc1xuICAgICAgfTtcblxuICAgICAgY29uc3Qgc2lkZUZpZWxkcyA9IHtcbiAgICAgICAgYXBwTmFtZSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgICAgZGF0YXNldHMsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJDbGFzc2VzLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgbWFwU3R5bGUsXG4gICAgICAgIGxheWVyQmxlbmRpbmcsXG4gICAgICAgIG9uU2F2ZU1hcCxcbiAgICAgICAgdWlTdGF0ZSxcbiAgICAgICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHVpU3RhdGVBY3Rpb25zLFxuICAgICAgICB3aWR0aDogdGhpcy5wcm9wcy5zaWRlUGFuZWxXaWR0aFxuICAgICAgfTtcblxuICAgICAgY29uc3QgbWFwRmllbGRzID0ge1xuICAgICAgICBkYXRhc2V0cyxcbiAgICAgICAgbWFwYm94QXBpQWNjZXNzVG9rZW4sXG4gICAgICAgIG1hcFN0YXRlLFxuICAgICAgICBtYXBTdHlsZSxcbiAgICAgICAgbWFwQ29udHJvbHM6IHVpU3RhdGUubWFwQ29udHJvbHMsXG4gICAgICAgIGxheWVycyxcbiAgICAgICAgbGF5ZXJPcmRlcixcbiAgICAgICAgbGF5ZXJEYXRhLFxuICAgICAgICBsYXllckJsZW5kaW5nLFxuICAgICAgICBpbnRlcmFjdGlvbkNvbmZpZyxcbiAgICAgICAgaG92ZXJJbmZvLFxuICAgICAgICBjbGlja2VkLFxuICAgICAgICB0b2dnbGVNYXBDb250cm9sOiB1aVN0YXRlQWN0aW9ucy50b2dnbGVNYXBDb250cm9sLFxuICAgICAgICBvblZpZXdTdGF0ZUNoYW5nZSxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIHZpc1N0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3RhdGVBY3Rpb25zXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBpc1NwbGl0ID0gc3BsaXRNYXBzICYmIHNwbGl0TWFwcy5sZW5ndGggPiAxO1xuICAgICAgY29uc3QgY29udGFpbmVyVyA9IG1hcFN0YXRlLndpZHRoICogKE51bWJlcihpc1NwbGl0KSArIDEpO1xuXG4gICAgICBjb25zdCBtYXBDb250YWluZXJzID0gIWlzU3BsaXRcbiAgICAgICAgPyBbXG4gICAgICAgICAgICA8TWFwQ29udGFpbmVyXG4gICAgICAgICAgICAgIGtleT17MH1cbiAgICAgICAgICAgICAgaW5kZXg9ezB9XG4gICAgICAgICAgICAgIHsuLi5tYXBGaWVsZHN9XG4gICAgICAgICAgICAgIG1hcExheWVycz17aXNTcGxpdCA/IHNwbGl0TWFwc1swXS5sYXllcnMgOiBudWxsfVxuICAgICAgICAgICAgICBnZXRNYXBib3hSZWY9e2dldE1hcGJveFJlZn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgXVxuICAgICAgICA6IHNwbGl0TWFwcy5tYXAoKHNldHRpbmdzLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPE1hcENvbnRhaW5lclxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICBpbmRleD17aW5kZXh9XG4gICAgICAgICAgICAgIHsuLi5tYXBGaWVsZHN9XG4gICAgICAgICAgICAgIG1hcExheWVycz17c3BsaXRNYXBzW2luZGV4XS5sYXllcnN9XG4gICAgICAgICAgICAgIGdldE1hcGJveFJlZj17Z2V0TWFwYm94UmVmfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKTtcblxuICAgICAgY29uc3QgaXNFeHBvcnRpbmcgPSB1aVN0YXRlLmN1cnJlbnRNb2RhbCA9PT0gRVhQT1JUX0lNQUdFX0lEO1xuXG4gICAgICBjb25zdCB0aGVtZSA9IHRoaXMuYXZhaWxhYmxlVGhlbWVTZWxlY3Rvcih0aGlzLnByb3BzKTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgICA8R2xvYmFsU3R5bGVcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgICAgICBoZWlnaHQ6IGAke2hlaWdodH1weGBcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJrZXBsZXItZ2xcIlxuICAgICAgICAgICAgaWQ9e2BrZXBsZXItZ2xfXyR7aWR9YH1cbiAgICAgICAgICAgIHJlZj17bm9kZSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucm9vdCA9IG5vZGU7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxOb3RpZmljYXRpb25QYW5lbCB7Li4ubm90aWZpY2F0aW9uUGFuZWxGaWVsZHN9IC8+XG4gICAgICAgICAgICB7IXVpU3RhdGUucmVhZE9ubHkgJiYgPFNpZGVQYW5lbCB7Li4uc2lkZUZpZWxkc30gLz59XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcHNcIiBzdHlsZT17e2Rpc3BsYXk6ICdmbGV4J319PlxuICAgICAgICAgICAgICB7bWFwQ29udGFpbmVyc31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2lzRXhwb3J0aW5nICYmXG4gICAgICAgICAgICAgIDxQbG90Q29udGFpbmVyXG4gICAgICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICAgICAgICAgIGV4cG9ydEltYWdlU2V0dGluZz17dWlTdGF0ZS5leHBvcnRJbWFnZX1cbiAgICAgICAgICAgICAgICBtYXBGaWVsZHM9e21hcEZpZWxkc31cbiAgICAgICAgICAgICAgICBhZGROb3RpZmljYXRpb249e3VpU3RhdGVBY3Rpb25zLmFkZE5vdGlmaWNhdGlvbn1cbiAgICAgICAgICAgICAgICBzdGFydEV4cG9ydGluZ0ltYWdlPXt1aVN0YXRlQWN0aW9ucy5zdGFydEV4cG9ydGluZ0ltYWdlfVxuICAgICAgICAgICAgICAgIHNldEV4cG9ydEltYWdlRGF0YVVyaT17dWlTdGF0ZUFjdGlvbnMuc2V0RXhwb3J0SW1hZ2VEYXRhVXJpfVxuICAgICAgICAgICAgICAgIHNldEV4cG9ydEltYWdlRXJyb3I9e3VpU3RhdGVBY3Rpb25zLnNldEV4cG9ydEltYWdlRXJyb3J9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA8Qm90dG9tV2lkZ2V0XG4gICAgICAgICAgICAgIGZpbHRlcnM9e2ZpbHRlcnN9XG4gICAgICAgICAgICAgIGRhdGFzZXRzPXtkYXRhc2V0c31cbiAgICAgICAgICAgICAgdWlTdGF0ZT17dWlTdGF0ZX1cbiAgICAgICAgICAgICAgdmlzU3RhdGVBY3Rpb25zPXt2aXNTdGF0ZUFjdGlvbnN9XG4gICAgICAgICAgICAgIHNpZGVQYW5lbFdpZHRoPXtcbiAgICAgICAgICAgICAgICB1aVN0YXRlLnJlYWRPbmx5ID8gMCA6IHRoaXMucHJvcHMuc2lkZVBhbmVsV2lkdGggKyBESU1FTlNJT05TLnNpZGVQYW5lbC5tYXJnaW4ubGVmdFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRhaW5lclc9e2NvbnRhaW5lcld9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPE1vZGFsV3JhcHBlclxuICAgICAgICAgICAgICBtYXBTdHlsZT17bWFwU3R5bGV9XG4gICAgICAgICAgICAgIHZpc1N0YXRlPXt2aXNTdGF0ZX1cbiAgICAgICAgICAgICAgbWFwU3RhdGU9e21hcFN0YXRlfVxuICAgICAgICAgICAgICB1aVN0YXRlPXt1aVN0YXRlfVxuICAgICAgICAgICAgICBtYXBib3hBcGlBY2Nlc3NUb2tlbj17bWFwYm94QXBpQWNjZXNzVG9rZW59XG4gICAgICAgICAgICAgIHZpc1N0YXRlQWN0aW9ucz17dmlzU3RhdGVBY3Rpb25zfVxuICAgICAgICAgICAgICB1aVN0YXRlQWN0aW9ucz17dWlTdGF0ZUFjdGlvbnN9XG4gICAgICAgICAgICAgIG1hcFN0eWxlQWN0aW9ucz17bWFwU3R5bGVBY3Rpb25zfVxuICAgICAgICAgICAgICByb290Tm9kZT17dGhpcy5yb290fVxuICAgICAgICAgICAgICBjb250YWluZXJXPXtjb250YWluZXJXfVxuICAgICAgICAgICAgICBjb250YWluZXJIPXttYXBTdGF0ZS5oZWlnaHR9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvR2xvYmFsU3R5bGU+XG4gICAgICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtlcGxlckdsQ29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1ha2VNYXBEaXNwYXRjaFRvUHJvcHMpKHdpdGhUaGVtZShLZXBsZXJHTCkpO1xufVxuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUsIHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgdmlzU3RhdGU6IHN0YXRlLnZpc1N0YXRlLFxuICAgIG1hcFN0eWxlOiBzdGF0ZS5tYXBTdHlsZSxcbiAgICBtYXBTdGF0ZTogc3RhdGUubWFwU3RhdGUsXG4gICAgdWlTdGF0ZTogc3RhdGUudWlTdGF0ZVxuICB9O1xufVxuXG5jb25zdCBkZWZhdWx0VXNlckFjdGlvbnMgPSB7fTtcbmNvbnN0IGdldERpc3BhdGNoID0gKGRpc3BhdGNoKSA9PiBkaXNwYXRjaFxuY29uc3QgZ2V0VXNlckFjdGlvbnMgPSAoZGlzcGF0Y2gsIHByb3BzKSA9PiBwcm9wcy5hY3Rpb25zIHx8IGRlZmF1bHRVc2VyQWN0aW9ucztcblxuZnVuY3Rpb24gbWFrZUdldEFjdGlvbkNyZWF0b3JzKCkge1xuICByZXR1cm4gY3JlYXRlU2VsZWN0b3IoXG4gICAgW2dldERpc3BhdGNoLCBnZXRVc2VyQWN0aW9uc10sXG4gICAgKGRpc3BhdGNoLCB1c2VyQWN0aW9ucykgPT4ge1xuICAgICAgY29uc3QgW1xuICAgICAgICB2aXNTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0YXRlQWN0aW9ucyxcbiAgICAgICAgbWFwU3R5bGVBY3Rpb25zLFxuICAgICAgICB1aVN0YXRlQWN0aW9uc1xuICAgICAgXSA9IFtcbiAgICAgICAgVmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBNYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIE1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgVUlTdGF0ZUFjdGlvbnNcbiAgICAgIF0ubWFwKGFjdGlvbnMgPT5cbiAgICAgICAgYmluZEFjdGlvbkNyZWF0b3JzKG1lcmdlQWN0aW9ucyhhY3Rpb25zLCB1c2VyQWN0aW9ucyksIGRpc3BhdGNoKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmlzU3RhdGVBY3Rpb25zLFxuICAgICAgICBtYXBTdGF0ZUFjdGlvbnMsXG4gICAgICAgIG1hcFN0eWxlQWN0aW9ucyxcbiAgICAgICAgdWlTdGF0ZUFjdGlvbnMsXG4gICAgICAgIGRpc3BhdGNoXG4gICAgICB9O1xuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gbWFrZU1hcERpc3BhdGNoVG9Qcm9wcygpIHtcbiAgY29uc3QgZ2V0QWN0aW9uQ3JlYXRvcnMgPSBtYWtlR2V0QWN0aW9uQ3JlYXRvcnMoKTtcbiAgY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoLCBvd25Qcm9wcykgPT4ge1xuICAgIGNvbnN0IGdyb3VwZWRBY3Rpb25DcmVhdG9ycyA9IGdldEFjdGlvbkNyZWF0b3JzKGRpc3BhdGNoLCBvd25Qcm9wcyk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uZ3JvdXBlZEFjdGlvbkNyZWF0b3JzLFxuICAgICAgZGlzcGF0Y2hcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG1hcERpc3BhdGNoVG9Qcm9wcztcbn1cblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IGtlcGxlci5nbCBhY3Rpb25zIHdpdGggdXNlciBkZWZpbmVkIGFjdGlvbnMgdXNpbmcgdGhlIHNhbWUga2V5XG4gKi9cbmZ1bmN0aW9uIG1lcmdlQWN0aW9ucyhhY3Rpb25zLCB1c2VyQWN0aW9ucykge1xuICBjb25zdCBvdmVycmlkZXMgPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgaW4gdXNlckFjdGlvbnMpIHtcbiAgICBpZiAodXNlckFjdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBhY3Rpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG92ZXJyaWRlc1trZXldID0gdXNlckFjdGlvbnNba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gey4uLmFjdGlvbnMsIC4uLm92ZXJyaWRlc307XG59XG5cbmV4cG9ydCBkZWZhdWx0IEtlcGxlckdsRmFjdG9yeTtcbiJdfQ==