"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddDataButtonFactory = AddDataButtonFactory;
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

var _reactSortableHoc = require("react-sortable-hoc");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reselect = require("reselect");

var _arrayMove = _interopRequireDefault(require("array-move"));

var _layerPanel = _interopRequireDefault(require("./layer-panel/layer-panel"));

var _sourceDataCatalog = _interopRequireDefault(require("./source-data-catalog"));

var _icons = require("../common/icons");

var _itemSelector = _interopRequireDefault(require("../common/item-selector/item-selector"));

var _styledComponents2 = require("../common/styled-components");

var _defaultSettings = require("../../constants/default-settings");

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  z-index: 100;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .ui-sortable {\n    display: block;\n    position: relative;\n    overflow: visible;\n    user-select: none;\n\n    :before {\n      content: ' ';\n      display: table;\n    }\n\n    :after {\n      content: ' ';\n      display: table;\n    }\n  }\n\n  .ui-sortable-item.ui-sortable-dragging {\n    position: absolute;\n    z-index: 1688;\n    cursor: move;\n  }\n\n  .ui-sortable-item.ui-sortable-dragging:hover {\n    cursor: move;\n    opacity: 0.5;\n  }\n\n  .ui-sortable-placeholder {\n    display: none;\n  }\n\n  .ui-sortable-placeholder.visible {\n    display: block;\n    opacity: 0;\n    z-index: -1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var StyledSortable = _styledComponents["default"].div(_templateObject());

var LayerBlendingSelector = function LayerBlendingSelector(_ref) {
  var layerBlending = _ref.layerBlending,
      updateLayerBlending = _ref.updateLayerBlending;
  return _react["default"].createElement(_styledComponents2.SidePanelSection, null, _react["default"].createElement(_styledComponents2.PanelLabel, null, "Layer Blending"), _react["default"].createElement(_itemSelector["default"], {
    selectedItems: layerBlending,
    options: Object.keys(_defaultSettings.LAYER_BLENDINGS),
    multiSelect: false,
    searchable: false,
    onChange: updateLayerBlending
  }));
}; // make sure the element is always visible while is being dragged


var SortableStyledItem = _styledComponents["default"].div(_templateObject2());

function AddDataButtonFactory() {
  var AddDataButton = function AddDataButton(_ref2) {
    var onClick = _ref2.onClick,
        isInactive = _ref2.isInactive;
    return _react["default"].createElement(_styledComponents2.Button, {
      onClick: onClick,
      isInactive: !isInactive,
      width: "105px",
      secondary: true
    }, _react["default"].createElement(_icons.Add, {
      height: "12px"
    }), "Add Data");
  };

  return AddDataButton;
}

LayerManagerFactory.deps = [AddDataButtonFactory, _layerPanel["default"], _sourceDataCatalog["default"]];

function LayerManagerFactory(AddDataButton, LayerPanel, SourceDataCatalog) {
  var _class, _temp;

  // By wrapping layer panel using a sortable element we don't have to implement the drag and drop logic into the panel itself;
  // Developers can provide any layer panel implementation and it will still be sortable
  var SortableItem = (0, _reactSortableHoc.sortableElement)(function (_ref3) {
    var layer = _ref3.layer;
    return _react["default"].createElement(SortableStyledItem, null, _react["default"].createElement(LayerPanel, layer));
  });
  var SortableContainer = (0, _reactSortableHoc.sortableContainer)(function (_ref4) {
    var children = _ref4.children;
    return _react["default"].createElement("div", null, children);
  });
  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(LayerManager, _Component);

    function LayerManager() {
      var _getPrototypeOf2;

      var _this;

      (0, _classCallCheck2["default"])(this, LayerManager);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(LayerManager)).call.apply(_getPrototypeOf2, [this].concat(args)));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerClassSelector", function (props) {
        return props.layerClasses;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "layerTypeOptionsSelector", (0, _reselect.createSelector)(_this.layerClassSelector, function (layerClasses) {
        return Object.keys(layerClasses).map(function (key) {
          var layer = new layerClasses[key]();
          return {
            id: key,
            label: layer.name,
            icon: layer.layerIcon
          };
        });
      }));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_addEmptyNewLayer", function () {
        _this.props.addLayer();
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleSort", function (_ref5) {
        var oldIndex = _ref5.oldIndex,
            newIndex = _ref5.newIndex;

        _this.props.updateLayerOrder((0, _arrayMove["default"])(_this.props.layerOrder, oldIndex, newIndex));
      });
      return _this;
    }

    (0, _createClass2["default"])(LayerManager, [{
      key: "render",
      value: function render() {
        var _this$props = this.props,
            layers = _this$props.layers,
            datasets = _this$props.datasets,
            layerOrder = _this$props.layerOrder,
            openModal = _this$props.openModal;
        var defaultDataset = Object.keys(datasets)[0];
        var layerTypeOptions = this.layerTypeOptionsSelector(this.props);
        var layerActions = {
          layerConfigChange: this.props.layerConfigChange,
          layerVisualChannelConfigChange: this.props.layerVisualChannelConfigChange,
          layerTypeChange: this.props.layerTypeChange,
          layerVisConfigChange: this.props.layerVisConfigChange,
          layerTextLabelChange: this.props.layerTextLabelChange,
          removeLayer: this.props.removeLayer
        };
        var panelProps = {
          datasets: datasets,
          openModal: openModal,
          layerTypeOptions: layerTypeOptions
        };
        return _react["default"].createElement(StyledSortable, {
          className: "layer-manager"
        }, _react["default"].createElement(SourceDataCatalog, {
          datasets: datasets,
          showDatasetTable: this.props.showDatasetTable,
          removeDataset: this.props.removeDataset,
          showDeleteDataset: true
        }), _react["default"].createElement(AddDataButton, {
          onClick: this.props.showAddDataModal,
          isInactive: !defaultDataset
        }), _react["default"].createElement(_styledComponents2.SidePanelDivider, null), _react["default"].createElement(_styledComponents2.SidePanelSection, null, _react["default"].createElement(SortableContainer, {
          onSortEnd: this._handleSort,
          lockAxis: "y",
          useDragHandle: true
        }, layerOrder.map(function (layerIdx, index) {
          var layer = (0, _objectSpread2["default"])({}, panelProps, layerActions, {
            sortData: layerIdx,
            key: layers[layerIdx].id,
            idx: layerIdx,
            layer: layers[layerIdx]
          });
          return _react["default"].createElement(SortableItem, {
            key: "layer-".concat(layerIdx),
            index: index,
            layer: layer
          });
        }))), _react["default"].createElement(_styledComponents2.SidePanelSection, null, defaultDataset ? _react["default"].createElement(_styledComponents2.Button, {
          onClick: this._addEmptyNewLayer,
          width: "105px"
        }, _react["default"].createElement(_icons.Add, {
          height: "12px"
        }), "Add Layer") : null), _react["default"].createElement(LayerBlendingSelector, {
          layerBlending: this.props.layerBlending,
          updateLayerBlending: this.props.updateLayerBlending
        }));
      }
    }]);
    return LayerManager;
  }(_react.Component), (0, _defineProperty2["default"])(_class, "propTypes", {
    addLayer: _propTypes["default"].func.isRequired,
    datasets: _propTypes["default"].object.isRequired,
    layerBlending: _propTypes["default"].string.isRequired,
    layerClasses: _propTypes["default"].object.isRequired,
    layers: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
    layerConfigChange: _propTypes["default"].func.isRequired,
    layerTextLabelChange: _propTypes["default"].func.isRequired,
    layerVisualChannelConfigChange: _propTypes["default"].func.isRequired,
    layerTypeChange: _propTypes["default"].func.isRequired,
    layerVisConfigChange: _propTypes["default"].func.isRequired,
    openModal: _propTypes["default"].func.isRequired,
    removeLayer: _propTypes["default"].func.isRequired,
    removeDataset: _propTypes["default"].func.isRequired,
    showDatasetTable: _propTypes["default"].func.isRequired,
    updateLayerBlending: _propTypes["default"].func.isRequired,
    updateLayerOrder: _propTypes["default"].func.isRequired
  }), _temp;
}

var _default = LayerManagerFactory;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3NpZGUtcGFuZWwvbGF5ZXItbWFuYWdlci5qcyJdLCJuYW1lcyI6WyJTdHlsZWRTb3J0YWJsZSIsInN0eWxlZCIsImRpdiIsIkxheWVyQmxlbmRpbmdTZWxlY3RvciIsImxheWVyQmxlbmRpbmciLCJ1cGRhdGVMYXllckJsZW5kaW5nIiwiT2JqZWN0Iiwia2V5cyIsIkxBWUVSX0JMRU5ESU5HUyIsIlNvcnRhYmxlU3R5bGVkSXRlbSIsIkFkZERhdGFCdXR0b25GYWN0b3J5IiwiQWRkRGF0YUJ1dHRvbiIsIm9uQ2xpY2siLCJpc0luYWN0aXZlIiwiTGF5ZXJNYW5hZ2VyRmFjdG9yeSIsImRlcHMiLCJMYXllclBhbmVsRmFjdG9yeSIsIlNvdXJjZURhdGFDYXRhbG9nRmFjdG9yeSIsIkxheWVyUGFuZWwiLCJTb3VyY2VEYXRhQ2F0YWxvZyIsIlNvcnRhYmxlSXRlbSIsImxheWVyIiwiU29ydGFibGVDb250YWluZXIiLCJjaGlsZHJlbiIsInByb3BzIiwibGF5ZXJDbGFzc2VzIiwibGF5ZXJDbGFzc1NlbGVjdG9yIiwibWFwIiwia2V5IiwiaWQiLCJsYWJlbCIsIm5hbWUiLCJpY29uIiwibGF5ZXJJY29uIiwiYWRkTGF5ZXIiLCJvbGRJbmRleCIsIm5ld0luZGV4IiwidXBkYXRlTGF5ZXJPcmRlciIsImxheWVyT3JkZXIiLCJsYXllcnMiLCJkYXRhc2V0cyIsIm9wZW5Nb2RhbCIsImRlZmF1bHREYXRhc2V0IiwibGF5ZXJUeXBlT3B0aW9ucyIsImxheWVyVHlwZU9wdGlvbnNTZWxlY3RvciIsImxheWVyQWN0aW9ucyIsImxheWVyQ29uZmlnQ2hhbmdlIiwibGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlIiwibGF5ZXJUeXBlQ2hhbmdlIiwibGF5ZXJWaXNDb25maWdDaGFuZ2UiLCJsYXllclRleHRMYWJlbENoYW5nZSIsInJlbW92ZUxheWVyIiwicGFuZWxQcm9wcyIsInNob3dEYXRhc2V0VGFibGUiLCJyZW1vdmVEYXRhc2V0Iiwic2hvd0FkZERhdGFNb2RhbCIsIl9oYW5kbGVTb3J0IiwibGF5ZXJJZHgiLCJpbmRleCIsInNvcnREYXRhIiwiaWR4IiwiX2FkZEVtcHR5TmV3TGF5ZXIiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsIm9iamVjdCIsInN0cmluZyIsImFycmF5T2YiLCJhbnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFPQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLGNBQWMsR0FBR0MsNkJBQU9DLEdBQVYsbUJBQXBCOztBQXdDQSxJQUFNQyxxQkFBcUIsR0FBRyxTQUF4QkEscUJBQXdCO0FBQUEsTUFBRUMsYUFBRixRQUFFQSxhQUFGO0FBQUEsTUFBaUJDLG1CQUFqQixRQUFpQkEsbUJBQWpCO0FBQUEsU0FDNUIsZ0NBQUMsbUNBQUQsUUFDRSxnQ0FBQyw2QkFBRCx5QkFERixFQUVFLGdDQUFDLHdCQUFEO0FBQ0UsSUFBQSxhQUFhLEVBQUVELGFBRGpCO0FBRUUsSUFBQSxPQUFPLEVBQUVFLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZQyxnQ0FBWixDQUZYO0FBR0UsSUFBQSxXQUFXLEVBQUUsS0FIZjtBQUlFLElBQUEsVUFBVSxFQUFFLEtBSmQ7QUFLRSxJQUFBLFFBQVEsRUFBRUg7QUFMWixJQUZGLENBRDRCO0FBQUEsQ0FBOUIsQyxDQWFBOzs7QUFDQSxJQUFNSSxrQkFBa0IsR0FBR1IsNkJBQU9DLEdBQVYsb0JBQXhCOztBQUlPLFNBQVNRLG9CQUFULEdBQWdDO0FBQ3JDLE1BQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0I7QUFBQSxRQUFFQyxPQUFGLFNBQUVBLE9BQUY7QUFBQSxRQUFXQyxVQUFYLFNBQVdBLFVBQVg7QUFBQSxXQUNwQixnQ0FBQyx5QkFBRDtBQUNFLE1BQUEsT0FBTyxFQUFFRCxPQURYO0FBRUUsTUFBQSxVQUFVLEVBQUUsQ0FBQ0MsVUFGZjtBQUdFLE1BQUEsS0FBSyxFQUFDLE9BSFI7QUFJRSxNQUFBLFNBQVM7QUFKWCxPQU1FLGdDQUFDLFVBQUQ7QUFBSyxNQUFBLE1BQU0sRUFBQztBQUFaLE1BTkYsYUFEb0I7QUFBQSxHQUF0Qjs7QUFXQSxTQUFPRixhQUFQO0FBQ0Q7O0FBRURHLG1CQUFtQixDQUFDQyxJQUFwQixHQUEyQixDQUN6Qkwsb0JBRHlCLEVBRXpCTSxzQkFGeUIsRUFHekJDLDZCQUh5QixDQUEzQjs7QUFNQSxTQUFTSCxtQkFBVCxDQUE2QkgsYUFBN0IsRUFBNENPLFVBQTVDLEVBQXdEQyxpQkFBeEQsRUFBMkU7QUFBQTs7QUFDekU7QUFDQTtBQUNBLE1BQU1DLFlBQVksR0FBRyx1Q0FBZ0IsaUJBQWE7QUFBQSxRQUFYQyxLQUFXLFNBQVhBLEtBQVc7QUFDaEQsV0FDRSxnQ0FBQyxrQkFBRCxRQUNFLGdDQUFDLFVBQUQsRUFBZ0JBLEtBQWhCLENBREYsQ0FERjtBQUtELEdBTm9CLENBQXJCO0FBUUEsTUFBTUMsaUJBQWlCLEdBQUcseUNBQWtCLGlCQUFnQjtBQUFBLFFBQWRDLFFBQWMsU0FBZEEsUUFBYztBQUMxRCxXQUFPLDZDQUFNQSxRQUFOLENBQVA7QUFDRCxHQUZ5QixDQUExQjtBQUlBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsNkdBb0J1QixVQUFBQyxLQUFLO0FBQUEsZUFBSUEsS0FBSyxDQUFDQyxZQUFWO0FBQUEsT0FwQjVCO0FBQUEsbUhBcUI2Qiw4QkFDekIsTUFBS0Msa0JBRG9CLEVBRXpCLFVBQUFELFlBQVk7QUFBQSxlQUFJbkIsTUFBTSxDQUFDQyxJQUFQLENBQVlrQixZQUFaLEVBQTBCRSxHQUExQixDQUE4QixVQUFBQyxHQUFHLEVBQUk7QUFDbkQsY0FBTVAsS0FBSyxHQUFHLElBQUlJLFlBQVksQ0FBQ0csR0FBRCxDQUFoQixFQUFkO0FBQ0EsaUJBQU87QUFDTEMsWUFBQUEsRUFBRSxFQUFFRCxHQURDO0FBRUxFLFlBQUFBLEtBQUssRUFBRVQsS0FBSyxDQUFDVSxJQUZSO0FBR0xDLFlBQUFBLElBQUksRUFBRVgsS0FBSyxDQUFDWTtBQUhQLFdBQVA7QUFLSCxTQVBpQixDQUFKO0FBQUEsT0FGYSxDQXJCN0I7QUFBQSw0R0FnQ3NCLFlBQU07QUFDeEIsY0FBS1QsS0FBTCxDQUFXVSxRQUFYO0FBQ0QsT0FsQ0g7QUFBQSxzR0FvQ2dCLGlCQUEwQjtBQUFBLFlBQXhCQyxRQUF3QixTQUF4QkEsUUFBd0I7QUFBQSxZQUFkQyxRQUFjLFNBQWRBLFFBQWM7O0FBQ3RDLGNBQUtaLEtBQUwsQ0FBV2EsZ0JBQVgsQ0FBNEIsMkJBQVUsTUFBS2IsS0FBTCxDQUFXYyxVQUFyQixFQUFpQ0gsUUFBakMsRUFBMkNDLFFBQTNDLENBQTVCO0FBQ0QsT0F0Q0g7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSwrQkF3Q1c7QUFBQSwwQkFDMkMsS0FBS1osS0FEaEQ7QUFBQSxZQUNBZSxNQURBLGVBQ0FBLE1BREE7QUFBQSxZQUNRQyxRQURSLGVBQ1FBLFFBRFI7QUFBQSxZQUNrQkYsVUFEbEIsZUFDa0JBLFVBRGxCO0FBQUEsWUFDOEJHLFNBRDlCLGVBQzhCQSxTQUQ5QjtBQUVQLFlBQU1DLGNBQWMsR0FBR3BDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZaUMsUUFBWixFQUFzQixDQUF0QixDQUF2QjtBQUNBLFlBQU1HLGdCQUFnQixHQUFHLEtBQUtDLHdCQUFMLENBQThCLEtBQUtwQixLQUFuQyxDQUF6QjtBQUVBLFlBQU1xQixZQUFZLEdBQUc7QUFDbkJDLFVBQUFBLGlCQUFpQixFQUFFLEtBQUt0QixLQUFMLENBQVdzQixpQkFEWDtBQUVuQkMsVUFBQUEsOEJBQThCLEVBQUUsS0FBS3ZCLEtBQUwsQ0FBV3VCLDhCQUZ4QjtBQUduQkMsVUFBQUEsZUFBZSxFQUFFLEtBQUt4QixLQUFMLENBQVd3QixlQUhUO0FBSW5CQyxVQUFBQSxvQkFBb0IsRUFBRSxLQUFLekIsS0FBTCxDQUFXeUIsb0JBSmQ7QUFLbkJDLFVBQUFBLG9CQUFvQixFQUFFLEtBQUsxQixLQUFMLENBQVcwQixvQkFMZDtBQU1uQkMsVUFBQUEsV0FBVyxFQUFFLEtBQUszQixLQUFMLENBQVcyQjtBQU5MLFNBQXJCO0FBU0EsWUFBTUMsVUFBVSxHQUFHO0FBQUNaLFVBQUFBLFFBQVEsRUFBUkEsUUFBRDtBQUFXQyxVQUFBQSxTQUFTLEVBQVRBLFNBQVg7QUFBc0JFLFVBQUFBLGdCQUFnQixFQUFoQkE7QUFBdEIsU0FBbkI7QUFFQSxlQUNFLGdDQUFDLGNBQUQ7QUFBZ0IsVUFBQSxTQUFTLEVBQUM7QUFBMUIsV0FDRSxnQ0FBQyxpQkFBRDtBQUNFLFVBQUEsUUFBUSxFQUFFSCxRQURaO0FBRUUsVUFBQSxnQkFBZ0IsRUFBRSxLQUFLaEIsS0FBTCxDQUFXNkIsZ0JBRi9CO0FBR0UsVUFBQSxhQUFhLEVBQUUsS0FBSzdCLEtBQUwsQ0FBVzhCLGFBSDVCO0FBSUUsVUFBQSxpQkFBaUI7QUFKbkIsVUFERixFQU9FLGdDQUFDLGFBQUQ7QUFDRSxVQUFBLE9BQU8sRUFBRSxLQUFLOUIsS0FBTCxDQUFXK0IsZ0JBRHRCO0FBRUUsVUFBQSxVQUFVLEVBQUUsQ0FBQ2I7QUFGZixVQVBGLEVBV0UsZ0NBQUMsbUNBQUQsT0FYRixFQVlFLGdDQUFDLG1DQUFELFFBQ0UsZ0NBQUMsaUJBQUQ7QUFDRSxVQUFBLFNBQVMsRUFBRSxLQUFLYyxXQURsQjtBQUVFLFVBQUEsUUFBUSxFQUFDLEdBRlg7QUFHRSxVQUFBLGFBQWEsRUFBRTtBQUhqQixXQUtHbEIsVUFBVSxDQUFDWCxHQUFYLENBQWUsVUFBQzhCLFFBQUQsRUFBV0MsS0FBWCxFQUFxQjtBQUNuQyxjQUFNckMsS0FBSyxzQ0FDTitCLFVBRE0sRUFFTlAsWUFGTTtBQUdUYyxZQUFBQSxRQUFRLEVBQUVGLFFBSEQ7QUFJVDdCLFlBQUFBLEdBQUcsRUFBRVcsTUFBTSxDQUFDa0IsUUFBRCxDQUFOLENBQWlCNUIsRUFKYjtBQUtUK0IsWUFBQUEsR0FBRyxFQUFFSCxRQUxJO0FBTVRwQyxZQUFBQSxLQUFLLEVBQUVrQixNQUFNLENBQUNrQixRQUFEO0FBTkosWUFBWDtBQVFBLGlCQUNFLGdDQUFDLFlBQUQ7QUFDRSxZQUFBLEdBQUcsa0JBQVdBLFFBQVgsQ0FETDtBQUVFLFlBQUEsS0FBSyxFQUFFQyxLQUZUO0FBR0UsWUFBQSxLQUFLLEVBQUVyQztBQUhULFlBREY7QUFPRCxTQWhCQSxDQUxILENBREYsQ0FaRixFQXFDRSxnQ0FBQyxtQ0FBRCxRQUNHcUIsY0FBYyxHQUNiLGdDQUFDLHlCQUFEO0FBQVEsVUFBQSxPQUFPLEVBQUUsS0FBS21CLGlCQUF0QjtBQUF5QyxVQUFBLEtBQUssRUFBQztBQUEvQyxXQUNFLGdDQUFDLFVBQUQ7QUFBSyxVQUFBLE1BQU0sRUFBQztBQUFaLFVBREYsY0FEYSxHQUlYLElBTE4sQ0FyQ0YsRUE0Q0UsZ0NBQUMscUJBQUQ7QUFDRSxVQUFBLGFBQWEsRUFBRSxLQUFLckMsS0FBTCxDQUFXcEIsYUFENUI7QUFFRSxVQUFBLG1CQUFtQixFQUFFLEtBQUtvQixLQUFMLENBQVduQjtBQUZsQyxVQTVDRixDQURGO0FBbUREO0FBM0dIO0FBQUE7QUFBQSxJQUFrQ3lELGdCQUFsQyx5REFDcUI7QUFDakI1QixJQUFBQSxRQUFRLEVBQUU2QixzQkFBVUMsSUFBVixDQUFlQyxVQURSO0FBRWpCekIsSUFBQUEsUUFBUSxFQUFFdUIsc0JBQVVHLE1BQVYsQ0FBaUJELFVBRlY7QUFHakI3RCxJQUFBQSxhQUFhLEVBQUUyRCxzQkFBVUksTUFBVixDQUFpQkYsVUFIZjtBQUlqQnhDLElBQUFBLFlBQVksRUFBRXNDLHNCQUFVRyxNQUFWLENBQWlCRCxVQUpkO0FBS2pCMUIsSUFBQUEsTUFBTSxFQUFFd0Isc0JBQVVLLE9BQVYsQ0FBa0JMLHNCQUFVTSxHQUE1QixFQUFpQ0osVUFMeEI7QUFNakJuQixJQUFBQSxpQkFBaUIsRUFBRWlCLHNCQUFVQyxJQUFWLENBQWVDLFVBTmpCO0FBT2pCZixJQUFBQSxvQkFBb0IsRUFBRWEsc0JBQVVDLElBQVYsQ0FBZUMsVUFQcEI7QUFRakJsQixJQUFBQSw4QkFBOEIsRUFBRWdCLHNCQUFVQyxJQUFWLENBQWVDLFVBUjlCO0FBU2pCakIsSUFBQUEsZUFBZSxFQUFFZSxzQkFBVUMsSUFBVixDQUFlQyxVQVRmO0FBVWpCaEIsSUFBQUEsb0JBQW9CLEVBQUVjLHNCQUFVQyxJQUFWLENBQWVDLFVBVnBCO0FBV2pCeEIsSUFBQUEsU0FBUyxFQUFFc0Isc0JBQVVDLElBQVYsQ0FBZUMsVUFYVDtBQVlqQmQsSUFBQUEsV0FBVyxFQUFFWSxzQkFBVUMsSUFBVixDQUFlQyxVQVpYO0FBYWpCWCxJQUFBQSxhQUFhLEVBQUVTLHNCQUFVQyxJQUFWLENBQWVDLFVBYmI7QUFjakJaLElBQUFBLGdCQUFnQixFQUFFVSxzQkFBVUMsSUFBVixDQUFlQyxVQWRoQjtBQWVqQjVELElBQUFBLG1CQUFtQixFQUFFMEQsc0JBQVVDLElBQVYsQ0FBZUMsVUFmbkI7QUFnQmpCNUIsSUFBQUEsZ0JBQWdCLEVBQUUwQixzQkFBVUMsSUFBVixDQUFlQztBQWhCaEIsR0FEckI7QUE2R0Q7O2VBRWNuRCxtQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7c29ydGFibGVDb250YWluZXIsIHNvcnRhYmxlRWxlbWVudH0gZnJvbSAncmVhY3Qtc29ydGFibGUtaG9jJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtjcmVhdGVTZWxlY3Rvcn0gZnJvbSAncmVzZWxlY3QnO1xuaW1wb3J0IGFycmF5TW92ZSBmcm9tICdhcnJheS1tb3ZlJztcblxuaW1wb3J0IExheWVyUGFuZWxGYWN0b3J5IGZyb20gJy4vbGF5ZXItcGFuZWwvbGF5ZXItcGFuZWwnO1xuaW1wb3J0IFNvdXJjZURhdGFDYXRhbG9nRmFjdG9yeSBmcm9tICcuL3NvdXJjZS1kYXRhLWNhdGFsb2cnO1xuaW1wb3J0IHtBZGR9IGZyb20gJ2NvbXBvbmVudHMvY29tbW9uL2ljb25zJztcbmltcG9ydCBJdGVtU2VsZWN0b3IgZnJvbSAnY29tcG9uZW50cy9jb21tb24vaXRlbS1zZWxlY3Rvci9pdGVtLXNlbGVjdG9yJztcbmltcG9ydCB7XG4gIFBhbmVsTGFiZWwsXG4gIFNpZGVQYW5lbERpdmlkZXIsXG4gIFNpZGVQYW5lbFNlY3Rpb24sXG4gIEJ1dHRvblxufSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cyc7XG5cbmltcG9ydCB7TEFZRVJfQkxFTkRJTkdTfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmNvbnN0IFN0eWxlZFNvcnRhYmxlID0gc3R5bGVkLmRpdmBcbiAgLnVpLXNvcnRhYmxlIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IHZpc2libGU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG5cbiAgICA6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6ICcgJztcbiAgICAgIGRpc3BsYXk6IHRhYmxlO1xuICAgIH1cblxuICAgIDphZnRlciB7XG4gICAgICBjb250ZW50OiAnICc7XG4gICAgICBkaXNwbGF5OiB0YWJsZTtcbiAgICB9XG4gIH1cblxuICAudWktc29ydGFibGUtaXRlbS51aS1zb3J0YWJsZS1kcmFnZ2luZyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6IDE2ODg7XG4gICAgY3Vyc29yOiBtb3ZlO1xuICB9XG5cbiAgLnVpLXNvcnRhYmxlLWl0ZW0udWktc29ydGFibGUtZHJhZ2dpbmc6aG92ZXIge1xuICAgIGN1cnNvcjogbW92ZTtcbiAgICBvcGFjaXR5OiAwLjU7XG4gIH1cblxuICAudWktc29ydGFibGUtcGxhY2Vob2xkZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAudWktc29ydGFibGUtcGxhY2Vob2xkZXIudmlzaWJsZSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgb3BhY2l0eTogMDtcbiAgICB6LWluZGV4OiAtMTtcbiAgfVxuYDtcblxuY29uc3QgTGF5ZXJCbGVuZGluZ1NlbGVjdG9yID0gKHtsYXllckJsZW5kaW5nLCB1cGRhdGVMYXllckJsZW5kaW5nfSkgPT4gKFxuICA8U2lkZVBhbmVsU2VjdGlvbj5cbiAgICA8UGFuZWxMYWJlbD5MYXllciBCbGVuZGluZzwvUGFuZWxMYWJlbD5cbiAgICA8SXRlbVNlbGVjdG9yXG4gICAgICBzZWxlY3RlZEl0ZW1zPXtsYXllckJsZW5kaW5nfVxuICAgICAgb3B0aW9ucz17T2JqZWN0LmtleXMoTEFZRVJfQkxFTkRJTkdTKX1cbiAgICAgIG11bHRpU2VsZWN0PXtmYWxzZX1cbiAgICAgIHNlYXJjaGFibGU9e2ZhbHNlfVxuICAgICAgb25DaGFuZ2U9e3VwZGF0ZUxheWVyQmxlbmRpbmd9XG4gICAgLz5cbiAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuKTtcblxuLy8gbWFrZSBzdXJlIHRoZSBlbGVtZW50IGlzIGFsd2F5cyB2aXNpYmxlIHdoaWxlIGlzIGJlaW5nIGRyYWdnZWRcbmNvbnN0IFNvcnRhYmxlU3R5bGVkSXRlbSA9IHN0eWxlZC5kaXZgXG4gIHotaW5kZXg6IDEwMDtcbmA7XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGREYXRhQnV0dG9uRmFjdG9yeSgpIHtcbiAgY29uc3QgQWRkRGF0YUJ1dHRvbiA9ICh7b25DbGljaywgaXNJbmFjdGl2ZX0pID0+IChcbiAgICA8QnV0dG9uXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgaXNJbmFjdGl2ZT17IWlzSW5hY3RpdmV9XG4gICAgICB3aWR0aD1cIjEwNXB4XCJcbiAgICAgIHNlY29uZGFyeVxuICAgID5cbiAgICAgIDxBZGQgaGVpZ2h0PVwiMTJweFwiIC8+QWRkIERhdGFcbiAgICA8L0J1dHRvbj5cbiAgKTtcblxuICByZXR1cm4gQWRkRGF0YUJ1dHRvbjtcbn1cblxuTGF5ZXJNYW5hZ2VyRmFjdG9yeS5kZXBzID0gW1xuICBBZGREYXRhQnV0dG9uRmFjdG9yeSxcbiAgTGF5ZXJQYW5lbEZhY3RvcnksXG4gIFNvdXJjZURhdGFDYXRhbG9nRmFjdG9yeVxuXTtcblxuZnVuY3Rpb24gTGF5ZXJNYW5hZ2VyRmFjdG9yeShBZGREYXRhQnV0dG9uLCBMYXllclBhbmVsLCBTb3VyY2VEYXRhQ2F0YWxvZykge1xuICAvLyBCeSB3cmFwcGluZyBsYXllciBwYW5lbCB1c2luZyBhIHNvcnRhYmxlIGVsZW1lbnQgd2UgZG9uJ3QgaGF2ZSB0byBpbXBsZW1lbnQgdGhlIGRyYWcgYW5kIGRyb3AgbG9naWMgaW50byB0aGUgcGFuZWwgaXRzZWxmO1xuICAvLyBEZXZlbG9wZXJzIGNhbiBwcm92aWRlIGFueSBsYXllciBwYW5lbCBpbXBsZW1lbnRhdGlvbiBhbmQgaXQgd2lsbCBzdGlsbCBiZSBzb3J0YWJsZVxuICBjb25zdCBTb3J0YWJsZUl0ZW0gPSBzb3J0YWJsZUVsZW1lbnQoKHtsYXllcn0pID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPFNvcnRhYmxlU3R5bGVkSXRlbT5cbiAgICAgICAgPExheWVyUGFuZWwgey4uLmxheWVyfSAvPlxuICAgICAgPC9Tb3J0YWJsZVN0eWxlZEl0ZW0+XG4gICAgKTtcbiAgfSk7XG5cbiAgY29uc3QgU29ydGFibGVDb250YWluZXIgPSBzb3J0YWJsZUNvbnRhaW5lcigoe2NoaWxkcmVufSkgPT4ge1xuICAgIHJldHVybiA8ZGl2PntjaGlsZHJlbn08L2Rpdj47XG4gIH0pO1xuXG4gIHJldHVybiBjbGFzcyBMYXllck1hbmFnZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICBhZGRMYXllcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIGRhdGFzZXRzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICBsYXllckJsZW5kaW5nOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgICBsYXllckNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLmFueSkuaXNSZXF1aXJlZCxcbiAgICAgIGxheWVyQ29uZmlnQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgbGF5ZXJUZXh0TGFiZWxDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBsYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBsYXllclR5cGVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICBsYXllclZpc0NvbmZpZ0NoYW5nZTogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIG9wZW5Nb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHJlbW92ZUxheWVyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgcmVtb3ZlRGF0YXNldDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgIHNob3dEYXRhc2V0VGFibGU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICB1cGRhdGVMYXllckJsZW5kaW5nOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgdXBkYXRlTGF5ZXJPcmRlcjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICAgIH07XG5cbiAgICBsYXllckNsYXNzU2VsZWN0b3IgPSBwcm9wcyA9PiBwcm9wcy5sYXllckNsYXNzZXM7XG4gICAgbGF5ZXJUeXBlT3B0aW9uc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gICAgICB0aGlzLmxheWVyQ2xhc3NTZWxlY3RvcixcbiAgICAgIGxheWVyQ2xhc3NlcyA9PiBPYmplY3Qua2V5cyhsYXllckNsYXNzZXMpLm1hcChrZXkgPT4ge1xuICAgICAgICBjb25zdCBsYXllciA9IG5ldyBsYXllckNsYXNzZXNba2V5XSgpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiBrZXksXG4gICAgICAgICAgbGFiZWw6IGxheWVyLm5hbWUsXG4gICAgICAgICAgaWNvbjogbGF5ZXIubGF5ZXJJY29uXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gICAgX2FkZEVtcHR5TmV3TGF5ZXIgPSAoKSA9PiB7XG4gICAgICB0aGlzLnByb3BzLmFkZExheWVyKCk7XG4gICAgfTtcblxuICAgIF9oYW5kbGVTb3J0ID0gKHtvbGRJbmRleCwgbmV3SW5kZXh9KSA9PiB7XG4gICAgICB0aGlzLnByb3BzLnVwZGF0ZUxheWVyT3JkZXIoYXJyYXlNb3ZlKHRoaXMucHJvcHMubGF5ZXJPcmRlciwgb2xkSW5kZXgsIG5ld0luZGV4KSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgIGNvbnN0IHtsYXllcnMsIGRhdGFzZXRzLCBsYXllck9yZGVyLCBvcGVuTW9kYWx9ID0gdGhpcy5wcm9wcztcbiAgICAgIGNvbnN0IGRlZmF1bHREYXRhc2V0ID0gT2JqZWN0LmtleXMoZGF0YXNldHMpWzBdO1xuICAgICAgY29uc3QgbGF5ZXJUeXBlT3B0aW9ucyA9IHRoaXMubGF5ZXJUeXBlT3B0aW9uc1NlbGVjdG9yKHRoaXMucHJvcHMpO1xuXG4gICAgICBjb25zdCBsYXllckFjdGlvbnMgPSB7XG4gICAgICAgIGxheWVyQ29uZmlnQ2hhbmdlOiB0aGlzLnByb3BzLmxheWVyQ29uZmlnQ2hhbmdlLFxuICAgICAgICBsYXllclZpc3VhbENoYW5uZWxDb25maWdDaGFuZ2U6IHRoaXMucHJvcHMubGF5ZXJWaXN1YWxDaGFubmVsQ29uZmlnQ2hhbmdlLFxuICAgICAgICBsYXllclR5cGVDaGFuZ2U6IHRoaXMucHJvcHMubGF5ZXJUeXBlQ2hhbmdlLFxuICAgICAgICBsYXllclZpc0NvbmZpZ0NoYW5nZTogdGhpcy5wcm9wcy5sYXllclZpc0NvbmZpZ0NoYW5nZSxcbiAgICAgICAgbGF5ZXJUZXh0TGFiZWxDaGFuZ2U6IHRoaXMucHJvcHMubGF5ZXJUZXh0TGFiZWxDaGFuZ2UsXG4gICAgICAgIHJlbW92ZUxheWVyOiB0aGlzLnByb3BzLnJlbW92ZUxheWVyXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBwYW5lbFByb3BzID0ge2RhdGFzZXRzLCBvcGVuTW9kYWwsIGxheWVyVHlwZU9wdGlvbnN9O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8U3R5bGVkU29ydGFibGUgY2xhc3NOYW1lPVwibGF5ZXItbWFuYWdlclwiPlxuICAgICAgICAgIDxTb3VyY2VEYXRhQ2F0YWxvZ1xuICAgICAgICAgICAgZGF0YXNldHM9e2RhdGFzZXRzfVxuICAgICAgICAgICAgc2hvd0RhdGFzZXRUYWJsZT17dGhpcy5wcm9wcy5zaG93RGF0YXNldFRhYmxlfVxuICAgICAgICAgICAgcmVtb3ZlRGF0YXNldD17dGhpcy5wcm9wcy5yZW1vdmVEYXRhc2V0fVxuICAgICAgICAgICAgc2hvd0RlbGV0ZURhdGFzZXRcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxBZGREYXRhQnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLnNob3dBZGREYXRhTW9kYWx9XG4gICAgICAgICAgICBpc0luYWN0aXZlPXshZGVmYXVsdERhdGFzZXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8U2lkZVBhbmVsRGl2aWRlciAvPlxuICAgICAgICAgIDxTaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgICAgPFNvcnRhYmxlQ29udGFpbmVyXG4gICAgICAgICAgICAgIG9uU29ydEVuZD17dGhpcy5faGFuZGxlU29ydH1cbiAgICAgICAgICAgICAgbG9ja0F4aXM9XCJ5XCJcbiAgICAgICAgICAgICAgdXNlRHJhZ0hhbmRsZT17dHJ1ZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xheWVyT3JkZXIubWFwKChsYXllcklkeCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXllciA9IHtcbiAgICAgICAgICAgICAgICAgIC4uLnBhbmVsUHJvcHMsXG4gICAgICAgICAgICAgICAgICAuLi5sYXllckFjdGlvbnMsXG4gICAgICAgICAgICAgICAgICBzb3J0RGF0YTogbGF5ZXJJZHgsXG4gICAgICAgICAgICAgICAgICBrZXk6IGxheWVyc1tsYXllcklkeF0uaWQsXG4gICAgICAgICAgICAgICAgICBpZHg6IGxheWVySWR4LFxuICAgICAgICAgICAgICAgICAgbGF5ZXI6IGxheWVyc1tsYXllcklkeF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8U29ydGFibGVJdGVtXG4gICAgICAgICAgICAgICAgICAgIGtleT17YGxheWVyLSR7bGF5ZXJJZHh9YH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICBsYXllcj17bGF5ZXJ9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9Tb3J0YWJsZUNvbnRhaW5lcj5cbiAgICAgICAgICA8L1NpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgPFNpZGVQYW5lbFNlY3Rpb24+XG4gICAgICAgICAgICB7ZGVmYXVsdERhdGFzZXQgPyAoXG4gICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17dGhpcy5fYWRkRW1wdHlOZXdMYXllcn0gd2lkdGg9XCIxMDVweFwiPlxuICAgICAgICAgICAgICAgIDxBZGQgaGVpZ2h0PVwiMTJweFwiIC8+QWRkIExheWVyXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9TaWRlUGFuZWxTZWN0aW9uPlxuICAgICAgICAgIDxMYXllckJsZW5kaW5nU2VsZWN0b3JcbiAgICAgICAgICAgIGxheWVyQmxlbmRpbmc9e3RoaXMucHJvcHMubGF5ZXJCbGVuZGluZ31cbiAgICAgICAgICAgIHVwZGF0ZUxheWVyQmxlbmRpbmc9e3RoaXMucHJvcHMudXBkYXRlTGF5ZXJCbGVuZGluZ31cbiAgICAgICAgICAvPlxuICAgICAgICA8L1N0eWxlZFNvcnRhYmxlPlxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF5ZXJNYW5hZ2VyRmFjdG9yeTtcbiJdfQ==