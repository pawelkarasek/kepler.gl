"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PlotContainerFactory;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reselect = require("reselect");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactMapGl = require("react-map-gl");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _window = _interopRequireDefault(require("global/window"));

var _notificationsUtils = require("../utils/notifications-utils");

var _mapContainer = _interopRequireDefault(require("./map-container"));

var _exportImageUtils = require("../utils/export-image-utils");

var _mapboxGlStyleEditor = require("../utils/map-style-utils/mapbox-gl-style-editor");

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .mapboxgl-ctrl-bottom-left,\n  .mapboxgl-ctrl-bottom-right {\n    display: none;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var propTypes = {
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  exportImageSetting: _propTypes["default"].object.isRequired,
  addNotification: _propTypes["default"].func.isRequired,
  mapFields: _propTypes["default"].object.isRequired
};
PlotContainerFactory.deps = [_mapContainer["default"]]; // Remove mapbox logo in exported map, because it contains non-ascii characters

var StyledPlotContainer = _styledComponents["default"].div(_templateObject());

function PlotContainerFactory(MapContainer) {
  var PlotContainer =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(PlotContainer, _Component);

    function PlotContainer(_props) {
      var _this;

      (0, _classCallCheck2["default"])(this, PlotContainer);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(PlotContainer).call(this, _props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "mapStyleSelector", function (props) {
        return props.mapFields.mapStyle;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "resolutionSelector", function (props) {
        return props.exportImageSetting.resolution;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "scaledMapStyleSelector", (0, _reselect.createSelector)(_this.mapStyleSelector, _this.resolutionSelector, function (mapStyle, resolution) {
        return (0, _objectSpread2["default"])({}, mapStyle, {
          bottomMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.bottomMapStyle, resolution),
          topMapStyle: (0, _mapboxGlStyleEditor.scaleMapStyleByResolution)(mapStyle.topMapStyle, resolution)
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onMapRender", function (map) {
        if (map.isStyleLoaded()) {
          _this._retrieveNewScreenshot();
        }
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onRetrievingFinish", function (devicePixelRatio) {
        _window["default"].devicePixelRatio = devicePixelRatio;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_retrieveNewScreenshot", function () {
        if (_this.plottingAreaRef) {
          // setting windowDevicePixelRatio to 1
          // so that large mapbox base map will load in full
          var savedDevicePixelRatio = _window["default"].devicePixelRatio;
          _window["default"].devicePixelRatio = 1;

          _this.props.startExportingImage();

          var filter = function filter(node) {
            return node.className !== 'mapboxgl-control-container';
          };

          (0, _exportImageUtils.convertToPng)(_this.plottingAreaRef, {
            filter: filter
          }).then(function (dataUri) {
            _this.props.setExportImageDataUri(dataUri);

            _this._onRetrievingFinish(savedDevicePixelRatio);
          })["catch"](function (err) {
            _this.props.setExportImageError(err);

            _this.props.addNotification((0, _notificationsUtils.exportImageError)({
              err: err
            }));

            _this._onRetrievingFinish(savedDevicePixelRatio);
          });
        }
      });
      _this._onMapRender = (0, _lodash["default"])(_this._onMapRender, 500);
      return _this;
    }

    (0, _createClass2["default"])(PlotContainer, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        this.props.startExportingImage();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(newProps) {
        var _this2 = this;

        // re-fetch the new screenshot only when ratio legend or resolution changes
        var checks = ['ratio', 'resolution', 'legend'];
        var shouldRetrieveScreenshot = checks.some(function (item) {
          return _this2.props.exportImageSetting[item] !== newProps.exportImageSetting[item];
        });

        if (shouldRetrieveScreenshot) {
          this._retrieveNewScreenshot();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var _this$props = this.props,
            width = _this$props.width,
            height = _this$props.height,
            exportImageSetting = _this$props.exportImageSetting,
            mapFields = _this$props.mapFields;
        var ratio = exportImageSetting.ratio,
            resolution = exportImageSetting.resolution,
            legend = exportImageSetting.legend;
        var exportImageSize = (0, _exportImageUtils.calculateExportImageSize)({
          width: width,
          height: height,
          ratio: ratio,
          resolution: resolution
        });
        var mapProps = (0, _objectSpread2["default"])({}, mapFields, {
          mapStyle: this.scaledMapStyleSelector(this.props),
          // override viewport based on export settings
          mapState: (0, _objectSpread2["default"])({}, mapFields.mapState, exportImageSize, {
            zoom: mapFields.mapState.zoom + exportImageSize.zoomOffset
          }),
          mapControls: {
            // override map legend visibility
            mapLegend: {
              show: legend,
              active: true
            }
          },
          MapComponent: _reactMapGl.StaticMap
        });
        return _react["default"].createElement(StyledPlotContainer, {
          style: {
            position: 'absolute',
            top: -9999,
            left: -9999
          }
        }, _react["default"].createElement("div", {
          ref: function ref(element) {
            _this3.plottingAreaRef = element;
          },
          style: {
            width: exportImageSize.width,
            height: exportImageSize.height
          }
        }, _react["default"].createElement(MapContainer, (0, _extends2["default"])({
          index: 0,
          onMapRender: this._onMapRender,
          isExport: true
        }, mapProps))));
      }
    }]);
    return PlotContainer;
  }(_react.Component);

  PlotContainer.propsTypes = propTypes;
  return PlotContainer;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL3Bsb3QtY29udGFpbmVyLmpzIl0sIm5hbWVzIjpbInByb3BUeXBlcyIsIndpZHRoIiwiUHJvcFR5cGVzIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImhlaWdodCIsImV4cG9ydEltYWdlU2V0dGluZyIsIm9iamVjdCIsImFkZE5vdGlmaWNhdGlvbiIsImZ1bmMiLCJtYXBGaWVsZHMiLCJQbG90Q29udGFpbmVyRmFjdG9yeSIsImRlcHMiLCJNYXBDb250YWluZXJGYWN0b3J5IiwiU3R5bGVkUGxvdENvbnRhaW5lciIsInN0eWxlZCIsImRpdiIsIk1hcENvbnRhaW5lciIsIlBsb3RDb250YWluZXIiLCJwcm9wcyIsIm1hcFN0eWxlIiwicmVzb2x1dGlvbiIsIm1hcFN0eWxlU2VsZWN0b3IiLCJyZXNvbHV0aW9uU2VsZWN0b3IiLCJib3R0b21NYXBTdHlsZSIsInRvcE1hcFN0eWxlIiwibWFwIiwiaXNTdHlsZUxvYWRlZCIsIl9yZXRyaWV2ZU5ld1NjcmVlbnNob3QiLCJkZXZpY2VQaXhlbFJhdGlvIiwid2luZG93IiwicGxvdHRpbmdBcmVhUmVmIiwic2F2ZWREZXZpY2VQaXhlbFJhdGlvIiwic3RhcnRFeHBvcnRpbmdJbWFnZSIsImZpbHRlciIsIm5vZGUiLCJjbGFzc05hbWUiLCJ0aGVuIiwiZGF0YVVyaSIsInNldEV4cG9ydEltYWdlRGF0YVVyaSIsIl9vblJldHJpZXZpbmdGaW5pc2giLCJlcnIiLCJzZXRFeHBvcnRJbWFnZUVycm9yIiwiX29uTWFwUmVuZGVyIiwibmV3UHJvcHMiLCJjaGVja3MiLCJzaG91bGRSZXRyaWV2ZVNjcmVlbnNob3QiLCJzb21lIiwiaXRlbSIsInJhdGlvIiwibGVnZW5kIiwiZXhwb3J0SW1hZ2VTaXplIiwibWFwUHJvcHMiLCJzY2FsZWRNYXBTdHlsZVNlbGVjdG9yIiwibWFwU3RhdGUiLCJ6b29tIiwiem9vbU9mZnNldCIsIm1hcENvbnRyb2xzIiwibWFwTGVnZW5kIiwic2hvdyIsImFjdGl2ZSIsIk1hcENvbXBvbmVudCIsIlN0YXRpY01hcCIsInBvc2l0aW9uIiwidG9wIiwibGVmdCIsImVsZW1lbnQiLCJDb21wb25lbnQiLCJwcm9wc1R5cGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUc7QUFDaEJDLEVBQUFBLEtBQUssRUFBRUMsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBRFI7QUFFaEJDLEVBQUFBLE1BQU0sRUFBRUgsc0JBQVVDLE1BQVYsQ0FBaUJDLFVBRlQ7QUFHaEJFLEVBQUFBLGtCQUFrQixFQUFFSixzQkFBVUssTUFBVixDQUFpQkgsVUFIckI7QUFJaEJJLEVBQUFBLGVBQWUsRUFBRU4sc0JBQVVPLElBQVYsQ0FBZUwsVUFKaEI7QUFLaEJNLEVBQUFBLFNBQVMsRUFBRVIsc0JBQVVLLE1BQVYsQ0FBaUJIO0FBTFosQ0FBbEI7QUFRQU8sb0JBQW9CLENBQUNDLElBQXJCLEdBQTRCLENBQUNDLHdCQUFELENBQTVCLEMsQ0FFQTs7QUFDQSxJQUFNQyxtQkFBbUIsR0FBR0MsNkJBQU9DLEdBQVYsbUJBQXpCOztBQU9lLFNBQVNMLG9CQUFULENBQThCTSxZQUE5QixFQUE0QztBQUFBLE1BQ25EQyxhQURtRDtBQUFBO0FBQUE7QUFBQTs7QUFFdkQsMkJBQVlDLE1BQVosRUFBbUI7QUFBQTs7QUFBQTtBQUNqQiwySEFBTUEsTUFBTjtBQURpQiwyR0FzQkEsVUFBQUEsS0FBSztBQUFBLGVBQUlBLEtBQUssQ0FBQ1QsU0FBTixDQUFnQlUsUUFBcEI7QUFBQSxPQXRCTDtBQUFBLDZHQXVCRSxVQUFBRCxLQUFLO0FBQUEsZUFBSUEsS0FBSyxDQUFDYixrQkFBTixDQUF5QmUsVUFBN0I7QUFBQSxPQXZCUDtBQUFBLGlIQXdCTSw4QkFDdkIsTUFBS0MsZ0JBRGtCLEVBRXZCLE1BQUtD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S0FBSyxFQUFFLENBRFQ7QUFFRSxVQUFBLFdBQVcsRUFBRSxLQUFLc0MsWUFGcEI7QUFHRSxVQUFBLFFBQVE7QUFIVixXQUlNUyxRQUpOLEVBVEYsQ0FIRixDQURGO0FBc0JEO0FBNUhzRDtBQUFBO0FBQUEsSUFDN0JlLGdCQUQ2Qjs7QUErSHpEakQsRUFBQUEsYUFBYSxDQUFDa0QsVUFBZCxHQUEyQnBFLFNBQTNCO0FBQ0EsU0FBT2tCLGFBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbi8vIGxpYnJhcmllc1xuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQge1N0YXRpY01hcH0gZnJvbSAncmVhY3QtbWFwLWdsJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuaW1wb3J0IHdpbmRvdyBmcm9tICdnbG9iYWwvd2luZG93JztcbmltcG9ydCB7ZXhwb3J0SW1hZ2VFcnJvcn0gZnJvbSAndXRpbHMvbm90aWZpY2F0aW9ucy11dGlscyc7XG5pbXBvcnQgTWFwQ29udGFpbmVyRmFjdG9yeSBmcm9tICcuL21hcC1jb250YWluZXInO1xuaW1wb3J0IHtjYWxjdWxhdGVFeHBvcnRJbWFnZVNpemUsIGNvbnZlcnRUb1BuZ30gZnJvbSAndXRpbHMvZXhwb3J0LWltYWdlLXV0aWxzJztcbmltcG9ydCB7c2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbn0gZnJvbSAndXRpbHMvbWFwLXN0eWxlLXV0aWxzL21hcGJveC1nbC1zdHlsZS1lZGl0b3InO1xuXG5jb25zdCBwcm9wVHlwZXMgPSB7XG4gIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBleHBvcnRJbWFnZVNldHRpbmc6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgYWRkTm90aWZpY2F0aW9uOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBtYXBGaWVsZHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcblxuUGxvdENvbnRhaW5lckZhY3RvcnkuZGVwcyA9IFtNYXBDb250YWluZXJGYWN0b3J5XTtcblxuLy8gUmVtb3ZlIG1hcGJveCBsb2dvIGluIGV4cG9ydGVkIG1hcCwgYmVjYXVzZSBpdCBjb250YWlucyBub24tYXNjaWkgY2hhcmFjdGVyc1xuY29uc3QgU3R5bGVkUGxvdENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIC5tYXBib3hnbC1jdHJsLWJvdHRvbS1sZWZ0LFxuICAubWFwYm94Z2wtY3RybC1ib3R0b20tcmlnaHQge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBsb3RDb250YWluZXJGYWN0b3J5KE1hcENvbnRhaW5lcikge1xuICBjbGFzcyBQbG90Q29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgdGhpcy5fb25NYXBSZW5kZXIgPSBkZWJvdW5jZSh0aGlzLl9vbk1hcFJlbmRlciwgNTAwKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICB0aGlzLnByb3BzLnN0YXJ0RXhwb3J0aW5nSW1hZ2UoKTtcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAvLyByZS1mZXRjaCB0aGUgbmV3IHNjcmVlbnNob3Qgb25seSB3aGVuIHJhdGlvIGxlZ2VuZCBvciByZXNvbHV0aW9uIGNoYW5nZXNcbiAgICAgIGNvbnN0IGNoZWNrcyA9IFsncmF0aW8nLCAncmVzb2x1dGlvbicsICdsZWdlbmQnXTtcbiAgICAgIGNvbnN0IHNob3VsZFJldHJpZXZlU2NyZWVuc2hvdCA9IGNoZWNrcy5zb21lKFxuICAgICAgICBpdGVtID0+XG4gICAgICAgICAgdGhpcy5wcm9wcy5leHBvcnRJbWFnZVNldHRpbmdbaXRlbV0gIT09XG4gICAgICAgICAgbmV3UHJvcHMuZXhwb3J0SW1hZ2VTZXR0aW5nW2l0ZW1dXG4gICAgICApO1xuICAgICAgaWYgKHNob3VsZFJldHJpZXZlU2NyZWVuc2hvdCkge1xuICAgICAgICB0aGlzLl9yZXRyaWV2ZU5ld1NjcmVlbnNob3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtYXBTdHlsZVNlbGVjdG9yID0gcHJvcHMgPT4gcHJvcHMubWFwRmllbGRzLm1hcFN0eWxlO1xuICAgIHJlc29sdXRpb25TZWxlY3RvciA9IHByb3BzID0+IHByb3BzLmV4cG9ydEltYWdlU2V0dGluZy5yZXNvbHV0aW9uO1xuICAgIHNjYWxlZE1hcFN0eWxlU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHRoaXMubWFwU3R5bGVTZWxlY3RvcixcbiAgICAgIHRoaXMucmVzb2x1dGlvblNlbGVjdG9yLFxuICAgICAgKG1hcFN0eWxlLCByZXNvbHV0aW9uKSA9PiAoe1xuICAgICAgICAuLi5tYXBTdHlsZSxcbiAgICAgICAgYm90dG9tTWFwU3R5bGU6IHNjYWxlTWFwU3R5bGVCeVJlc29sdXRpb24oXG4gICAgICAgICAgbWFwU3R5bGUuYm90dG9tTWFwU3R5bGUsXG4gICAgICAgICAgcmVzb2x1dGlvblxuICAgICAgICApLFxuICAgICAgICB0b3BNYXBTdHlsZTogc2NhbGVNYXBTdHlsZUJ5UmVzb2x1dGlvbihtYXBTdHlsZS50b3BNYXBTdHlsZSwgcmVzb2x1dGlvbilcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIF9vbk1hcFJlbmRlciA9IG1hcCA9PiB7XG4gICAgICBpZiAobWFwLmlzU3R5bGVMb2FkZWQoKSkge1xuICAgICAgICB0aGlzLl9yZXRyaWV2ZU5ld1NjcmVlbnNob3QoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgX29uUmV0cmlldmluZ0ZpbmlzaCA9IChkZXZpY2VQaXhlbFJhdGlvKSA9PiB7XG4gICAgICB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA9IGRldmljZVBpeGVsUmF0aW87XG4gICAgfTtcblxuICAgIF9yZXRyaWV2ZU5ld1NjcmVlbnNob3QgPSAoKSA9PiB7XG5cbiAgICAgIGlmICh0aGlzLnBsb3R0aW5nQXJlYVJlZikge1xuICAgICAgLy8gc2V0dGluZyB3aW5kb3dEZXZpY2VQaXhlbFJhdGlvIHRvIDFcbiAgICAgIC8vIHNvIHRoYXQgbGFyZ2UgbWFwYm94IGJhc2UgbWFwIHdpbGwgbG9hZCBpbiBmdWxsXG4gICAgICAgIGNvbnN0IHNhdmVkRGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA9IDE7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5zdGFydEV4cG9ydGluZ0ltYWdlKCk7XG4gICAgICAgIGNvbnN0IGZpbHRlciA9IG5vZGUgPT4gbm9kZS5jbGFzc05hbWUgIT09ICdtYXBib3hnbC1jb250cm9sLWNvbnRhaW5lcic7XG5cbiAgICAgICAgY29udmVydFRvUG5nKHRoaXMucGxvdHRpbmdBcmVhUmVmLCB7ZmlsdGVyfSkudGhlbihkYXRhVXJpID0+IHtcbiAgICAgICAgICB0aGlzLnByb3BzLnNldEV4cG9ydEltYWdlRGF0YVVyaShkYXRhVXJpKTtcbiAgICAgICAgICB0aGlzLl9vblJldHJpZXZpbmdGaW5pc2goc2F2ZWREZXZpY2VQaXhlbFJhdGlvKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgdGhpcy5wcm9wcy5zZXRFeHBvcnRJbWFnZUVycm9yKGVycik7XG4gICAgICAgICAgdGhpcy5wcm9wcy5hZGROb3RpZmljYXRpb24oZXhwb3J0SW1hZ2VFcnJvcih7ZXJyfSkpO1xuICAgICAgICAgIHRoaXMuX29uUmV0cmlldmluZ0ZpbmlzaChzYXZlZERldmljZVBpeGVsUmF0aW8pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyKCkge1xuICAgICAgY29uc3Qge3dpZHRoLCBoZWlnaHQsIGV4cG9ydEltYWdlU2V0dGluZywgbWFwRmllbGRzfSA9IHRoaXMucHJvcHM7XG4gICAgICBjb25zdCB7cmF0aW8sIHJlc29sdXRpb24sIGxlZ2VuZH0gPSBleHBvcnRJbWFnZVNldHRpbmc7XG4gICAgICBjb25zdCBleHBvcnRJbWFnZVNpemUgPSBjYWxjdWxhdGVFeHBvcnRJbWFnZVNpemUoe1xuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICByYXRpbyxcbiAgICAgICAgcmVzb2x1dGlvblxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG1hcFByb3BzID0ge1xuICAgICAgICAuLi5tYXBGaWVsZHMsXG4gICAgICAgIG1hcFN0eWxlOiB0aGlzLnNjYWxlZE1hcFN0eWxlU2VsZWN0b3IodGhpcy5wcm9wcyksXG5cbiAgICAgICAgLy8gb3ZlcnJpZGUgdmlld3BvcnQgYmFzZWQgb24gZXhwb3J0IHNldHRpbmdzXG4gICAgICAgIG1hcFN0YXRlOiB7XG4gICAgICAgICAgLi4ubWFwRmllbGRzLm1hcFN0YXRlLFxuICAgICAgICAgIC4uLmV4cG9ydEltYWdlU2l6ZSxcbiAgICAgICAgICB6b29tOiBtYXBGaWVsZHMubWFwU3RhdGUuem9vbSArIGV4cG9ydEltYWdlU2l6ZS56b29tT2Zmc2V0XG4gICAgICAgIH0sXG4gICAgICAgIG1hcENvbnRyb2xzOiB7XG4gICAgICAgICAgLy8gb3ZlcnJpZGUgbWFwIGxlZ2VuZCB2aXNpYmlsaXR5XG4gICAgICAgICAgbWFwTGVnZW5kOiB7XG4gICAgICAgICAgICBzaG93OiBsZWdlbmQsXG4gICAgICAgICAgICBhY3RpdmU6IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIE1hcENvbXBvbmVudDogU3RhdGljTWFwXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkUGxvdENvbnRhaW5lclxuICAgICAgICAgIHN0eWxlPXt7cG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogLTk5OTksIGxlZnQ6IC05OTk5fX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHRoaXMucGxvdHRpbmdBcmVhUmVmID0gZWxlbWVudDtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICB3aWR0aDogZXhwb3J0SW1hZ2VTaXplLndpZHRoLFxuICAgICAgICAgICAgICBoZWlnaHQ6IGV4cG9ydEltYWdlU2l6ZS5oZWlnaHRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1hcENvbnRhaW5lclxuICAgICAgICAgICAgICBpbmRleD17MH1cbiAgICAgICAgICAgICAgb25NYXBSZW5kZXI9e3RoaXMuX29uTWFwUmVuZGVyfVxuICAgICAgICAgICAgICBpc0V4cG9ydFxuICAgICAgICAgICAgICB7Li4ubWFwUHJvcHN9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1N0eWxlZFBsb3RDb250YWluZXI+XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIFBsb3RDb250YWluZXIucHJvcHNUeXBlcyA9IHByb3BUeXBlcztcbiAgcmV0dXJuIFBsb3RDb250YWluZXI7XG59XG4iXX0=