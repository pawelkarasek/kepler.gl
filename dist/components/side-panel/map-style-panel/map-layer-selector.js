"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread4 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _panelHeaderAction = _interopRequireDefault(require("../panel-header-action"));

var _icons = require("../../common/icons");

var _styledComponents2 = require("../../common/styled-components");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 10px;\n  display: flex;\n  justify-content: space-between;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  .layer-group__visibility-toggle {\n    margin-right: 12px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding-bottom: 12px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledInteractionPanel = _styledComponents["default"].div(_templateObject());

var StyledLayerGroupItem = _styledComponents["default"].div(_templateObject2());

var LayerLabel = (0, _styledComponents["default"])(_styledComponents2.PanelLabelBold)(_templateObject3(), function (props) {
  return props.active ? props.theme.textColor : props.theme.labelColor;
});

function LayerGroupSelectorFactory() {
  var LayerGroupSelector = function LayerGroupSelector(_ref) {
    var layers = _ref.layers,
        editableLayers = _ref.editableLayers,
        onChange = _ref.onChange,
        topLayers = _ref.topLayers;
    return _react["default"].createElement(StyledInteractionPanel, {
      className: "map-style__layer-group__selector"
    }, _react["default"].createElement("div", {
      className: "layer-group__header"
    }, _react["default"].createElement(_styledComponents2.PanelLabel, null, "Map Layers")), _react["default"].createElement(_styledComponents2.PanelContent, {
      className: "map-style__layer-group"
    }, editableLayers.map(function (slug) {
      return _react["default"].createElement(StyledLayerGroupItem, {
        className: "layer-group__select",
        key: slug
      }, _react["default"].createElement(_styledComponents2.PanelLabelWrapper, null, _react["default"].createElement(_panelHeaderAction["default"], {
        className: "layer-group__visibility-toggle",
        id: "".concat(slug, "-toggle"),
        tooltip: layers[slug] ? 'hide' : 'show',
        onClick: function onClick() {
          return onChange({
            visibleLayerGroups: (0, _objectSpread4["default"])({}, layers, (0, _defineProperty2["default"])({}, slug, !layers[slug]))
          });
        },
        IconComponent: layers[slug] ? _icons.EyeSeen : _icons.EyeUnseen,
        active: layers[slug],
        flush: true
      }), _react["default"].createElement(LayerLabel, {
        active: layers[slug]
      }, slug)), _react["default"].createElement(_styledComponents2.CenterFlexbox, {
        className: "layer-group__bring-top"
      }, _react["default"].createElement(_panelHeaderAction["default"], {
        id: "".concat(slug, "-top"),
        tooltip: "Move to top of data layers",
        disabled: !layers[slug],
        IconComponent: _icons.Upload,
        active: topLayers[slug],
        onClick: function onClick() {
          return onChange({
            topLayerGroups: (0, _objectSpread4["default"])({}, topLayers, (0, _defineProperty2["default"])({}, slug, !topLayers[slug]))
          });
        }
      })));
    })));
  };

  return LayerGroupSelector;
}

var _default = LayerGroupSelectorFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbWFwLXN0eWxlLXBhbmVsL21hcC1sYXllci1zZWxlY3Rvci5qcyJdLCJuYW1lcyI6WyJTdHlsZWRJbnRlcmFjdGlvblBhbmVsIiwic3R5bGVkIiwiZGl2IiwiU3R5bGVkTGF5ZXJHcm91cEl0ZW0iLCJMYXllckxhYmVsIiwiUGFuZWxMYWJlbEJvbGQiLCJwcm9wcyIsImFjdGl2ZSIsInRoZW1lIiwidGV4dENvbG9yIiwibGFiZWxDb2xvciIsIkxheWVyR3JvdXBTZWxlY3RvckZhY3RvcnkiLCJMYXllckdyb3VwU2VsZWN0b3IiLCJsYXllcnMiLCJlZGl0YWJsZUxheWVycyIsIm9uQ2hhbmdlIiwidG9wTGF5ZXJzIiwibWFwIiwic2x1ZyIsInZpc2libGVMYXllckdyb3VwcyIsIkV5ZVNlZW4iLCJFeWVVbnNlZW4iLCJVcGxvYWQiLCJ0b3BMYXllckdyb3VwcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOztBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLElBQU1BLHNCQUFzQixHQUFHQyw2QkFBT0MsR0FBVixtQkFBNUI7O0FBSUEsSUFBTUMsb0JBQW9CLEdBQUdGLDZCQUFPQyxHQUFWLG9CQUExQjs7QUFjQSxJQUFNRSxVQUFVLEdBQUcsa0NBQU9DLGlDQUFQLENBQUgscUJBQ0wsVUFBQUMsS0FBSztBQUFBLFNBQ1pBLEtBQUssQ0FBQ0MsTUFBTixHQUFlRCxLQUFLLENBQUNFLEtBQU4sQ0FBWUMsU0FBM0IsR0FBdUNILEtBQUssQ0FBQ0UsS0FBTixDQUFZRSxVQUR2QztBQUFBLENBREEsQ0FBaEI7O0FBS0EsU0FBU0MseUJBQVQsR0FBcUM7QUFDbkMsTUFBTUMsa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQjtBQUFBLFFBQUVDLE1BQUYsUUFBRUEsTUFBRjtBQUFBLFFBQVVDLGNBQVYsUUFBVUEsY0FBVjtBQUFBLFFBQTBCQyxRQUExQixRQUEwQkEsUUFBMUI7QUFBQSxRQUFvQ0MsU0FBcEMsUUFBb0NBLFNBQXBDO0FBQUEsV0FDekIsZ0NBQUMsc0JBQUQ7QUFBd0IsTUFBQSxTQUFTLEVBQUM7QUFBbEMsT0FDRTtBQUFLLE1BQUEsU0FBUyxFQUFDO0FBQWYsT0FDRSxnQ0FBQyw2QkFBRCxxQkFERixDQURGLEVBSUUsZ0NBQUMsK0JBQUQ7QUFBYyxNQUFBLFNBQVMsRUFBQztBQUF4QixPQUNHRixjQUFjLENBQUNHLEdBQWYsQ0FBbUIsVUFBQUMsSUFBSTtBQUFBLGFBQ3RCLGdDQUFDLG9CQUFEO0FBQXNCLFFBQUEsU0FBUyxFQUFDLHFCQUFoQztBQUFzRCxRQUFBLEdBQUcsRUFBRUE7QUFBM0QsU0FDRSxnQ0FBQyxvQ0FBRCxRQUNFLGdDQUFDLDZCQUFEO0FBQ0UsUUFBQSxTQUFTLEVBQUMsZ0NBRFo7QUFFRSxRQUFBLEVBQUUsWUFBS0EsSUFBTCxZQUZKO0FBR0UsUUFBQSxPQUFPLEVBQUVMLE1BQU0sQ0FBQ0ssSUFBRCxDQUFOLEdBQWUsTUFBZixHQUF3QixNQUhuQztBQUlFLFFBQUEsT0FBTyxFQUFFO0FBQUEsaUJBQ1BILFFBQVEsQ0FBQztBQUNQSSxZQUFBQSxrQkFBa0IscUNBQ2JOLE1BRGEsdUNBRWZLLElBRmUsRUFFUixDQUFDTCxNQUFNLENBQUNLLElBQUQsQ0FGQztBQURYLFdBQUQsQ0FERDtBQUFBLFNBSlg7QUFZRSxRQUFBLGFBQWEsRUFBRUwsTUFBTSxDQUFDSyxJQUFELENBQU4sR0FBZUUsY0FBZixHQUF5QkMsZ0JBWjFDO0FBYUUsUUFBQSxNQUFNLEVBQUVSLE1BQU0sQ0FBQ0ssSUFBRCxDQWJoQjtBQWNFLFFBQUEsS0FBSztBQWRQLFFBREYsRUFpQkUsZ0NBQUMsVUFBRDtBQUFZLFFBQUEsTUFBTSxFQUFFTCxNQUFNLENBQUNLLElBQUQ7QUFBMUIsU0FBbUNBLElBQW5DLENBakJGLENBREYsRUFvQkUsZ0NBQUMsZ0NBQUQ7QUFBZSxRQUFBLFNBQVMsRUFBQztBQUF6QixTQUNFLGdDQUFDLDZCQUFEO0FBQ0UsUUFBQSxFQUFFLFlBQUtBLElBQUwsU0FESjtBQUVFLFFBQUEsT0FBTyxFQUFDLDRCQUZWO0FBR0UsUUFBQSxRQUFRLEVBQUUsQ0FBQ0wsTUFBTSxDQUFDSyxJQUFELENBSG5CO0FBSUUsUUFBQSxhQUFhLEVBQUVJLGFBSmpCO0FBS0UsUUFBQSxNQUFNLEVBQUVOLFNBQVMsQ0FBQ0UsSUFBRCxDQUxuQjtBQU1FLFFBQUEsT0FBTyxFQUFFO0FBQUEsaUJBQ1BILFFBQVEsQ0FBQztBQUNQUSxZQUFBQSxjQUFjLHFDQUNUUCxTQURTLHVDQUVYRSxJQUZXLEVBRUosQ0FBQ0YsU0FBUyxDQUFDRSxJQUFELENBRk47QUFEUCxXQUFELENBREQ7QUFBQTtBQU5YLFFBREYsQ0FwQkYsQ0FEc0I7QUFBQSxLQUF2QixDQURILENBSkYsQ0FEeUI7QUFBQSxHQUEzQjs7QUFrREEsU0FBT04sa0JBQVA7QUFDRDs7ZUFFY0QseUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUGFuZWxIZWFkZXJBY3Rpb24gZnJvbSAnY29tcG9uZW50cy9zaWRlLXBhbmVsL3BhbmVsLWhlYWRlci1hY3Rpb24nO1xuaW1wb3J0IHtFeWVTZWVuLCBFeWVVbnNlZW4sIFVwbG9hZH0gZnJvbSAnY29tcG9uZW50cy9jb21tb24vaWNvbnMnO1xuXG5pbXBvcnQge1xuICBQYW5lbExhYmVsLFxuICBQYW5lbENvbnRlbnQsXG4gIFBhbmVsTGFiZWxCb2xkLFxuICBQYW5lbExhYmVsV3JhcHBlcixcbiAgQ2VudGVyRmxleGJveFxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmNvbnN0IFN0eWxlZEludGVyYWN0aW9uUGFuZWwgPSBzdHlsZWQuZGl2YFxuICBwYWRkaW5nLWJvdHRvbTogMTJweDtcbmA7XG5cbmNvbnN0IFN0eWxlZExheWVyR3JvdXBJdGVtID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXG4gICY6bGFzdC1jaGlsZCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuXG4gIC5sYXllci1ncm91cF9fdmlzaWJpbGl0eS10b2dnbGUge1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgfVxuYDtcblxuY29uc3QgTGF5ZXJMYWJlbCA9IHN0eWxlZChQYW5lbExhYmVsQm9sZClgXG4gIGNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUudGV4dENvbG9yIDogcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG5gO1xuXG5mdW5jdGlvbiBMYXllckdyb3VwU2VsZWN0b3JGYWN0b3J5KCkge1xuICBjb25zdCBMYXllckdyb3VwU2VsZWN0b3IgPSAoe2xheWVycywgZWRpdGFibGVMYXllcnMsIG9uQ2hhbmdlLCB0b3BMYXllcnN9KSA9PiAoXG4gICAgPFN0eWxlZEludGVyYWN0aW9uUGFuZWwgY2xhc3NOYW1lPVwibWFwLXN0eWxlX19sYXllci1ncm91cF9fc2VsZWN0b3JcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGF5ZXItZ3JvdXBfX2hlYWRlclwiPlxuICAgICAgICA8UGFuZWxMYWJlbD5NYXAgTGF5ZXJzPC9QYW5lbExhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8UGFuZWxDb250ZW50IGNsYXNzTmFtZT1cIm1hcC1zdHlsZV9fbGF5ZXItZ3JvdXBcIj5cbiAgICAgICAge2VkaXRhYmxlTGF5ZXJzLm1hcChzbHVnID0+IChcbiAgICAgICAgICA8U3R5bGVkTGF5ZXJHcm91cEl0ZW0gY2xhc3NOYW1lPVwibGF5ZXItZ3JvdXBfX3NlbGVjdFwiIGtleT17c2x1Z30+XG4gICAgICAgICAgICA8UGFuZWxMYWJlbFdyYXBwZXI+XG4gICAgICAgICAgICAgIDxQYW5lbEhlYWRlckFjdGlvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxheWVyLWdyb3VwX192aXNpYmlsaXR5LXRvZ2dsZVwiXG4gICAgICAgICAgICAgICAgaWQ9e2Ake3NsdWd9LXRvZ2dsZWB9XG4gICAgICAgICAgICAgICAgdG9vbHRpcD17bGF5ZXJzW3NsdWddID8gJ2hpZGUnIDogJ3Nob3cnfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIHZpc2libGVMYXllckdyb3Vwczoge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLmxheWVycyxcbiAgICAgICAgICAgICAgICAgICAgICBbc2x1Z106ICFsYXllcnNbc2x1Z11cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgSWNvbkNvbXBvbmVudD17bGF5ZXJzW3NsdWddID8gRXllU2VlbiA6IEV5ZVVuc2Vlbn1cbiAgICAgICAgICAgICAgICBhY3RpdmU9e2xheWVyc1tzbHVnXX1cbiAgICAgICAgICAgICAgICBmbHVzaFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8TGF5ZXJMYWJlbCBhY3RpdmU9e2xheWVyc1tzbHVnXX0+e3NsdWd9PC9MYXllckxhYmVsPlxuICAgICAgICAgICAgPC9QYW5lbExhYmVsV3JhcHBlcj5cbiAgICAgICAgICAgIDxDZW50ZXJGbGV4Ym94IGNsYXNzTmFtZT1cImxheWVyLWdyb3VwX19icmluZy10b3BcIj5cbiAgICAgICAgICAgICAgPFBhbmVsSGVhZGVyQWN0aW9uXG4gICAgICAgICAgICAgICAgaWQ9e2Ake3NsdWd9LXRvcGB9XG4gICAgICAgICAgICAgICAgdG9vbHRpcD1cIk1vdmUgdG8gdG9wIG9mIGRhdGEgbGF5ZXJzXCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWxheWVyc1tzbHVnXX1cbiAgICAgICAgICAgICAgICBJY29uQ29tcG9uZW50PXtVcGxvYWR9XG4gICAgICAgICAgICAgICAgYWN0aXZlPXt0b3BMYXllcnNbc2x1Z119XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wTGF5ZXJHcm91cHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi50b3BMYXllcnMsXG4gICAgICAgICAgICAgICAgICAgICAgW3NsdWddOiAhdG9wTGF5ZXJzW3NsdWddXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9DZW50ZXJGbGV4Ym94PlxuICAgICAgICAgIDwvU3R5bGVkTGF5ZXJHcm91cEl0ZW0+XG4gICAgICAgICkpfVxuICAgICAgPC9QYW5lbENvbnRlbnQ+XG4gICAgPC9TdHlsZWRJbnRlcmFjdGlvblBhbmVsPlxuICApO1xuXG4gIHJldHVybiBMYXllckdyb3VwU2VsZWN0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExheWVyR3JvdXBTZWxlY3RvckZhY3Rvcnk7XG4iXX0=