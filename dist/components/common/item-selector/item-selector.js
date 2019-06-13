"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

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

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.uniq"));

var _reactOnclickoutside = _interopRequireDefault(require("react-onclickoutside"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _accessor = _interopRequireDefault(require("./accessor"));

var _chickletedInput = _interopRequireDefault(require("./chickleted-input"));

var _typeahead = _interopRequireDefault(require("./typeahead"));

var _icons = require("../icons");

var _dropdownList = _interopRequireWildcard(require("./dropdown-list"));

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border: 0;\n  width: 100%;\n  left: 0;\n  z-index: 100;\n  position: absolute;\n  bottom: ", ";\n  margin-top: ", ";\n  margin-bottom: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-left: 6px;\n  display: flex;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  overflow: hidden;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n\n  .list__item__anchor {\n    ", ";\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/**
 * Converts non-arrays to arrays.  Leaves arrays alone.  Converts
 * undefined values to empty arrays ([] instead of [undefined]).
 * Otherwise, just returns [item] for non-array items.
 *
 * @param {*} item
 * @returns {array} boom! much array. very indexed. so useful.
 */
function _toArray(item) {
  if (Array.isArray(item)) {
    return item;
  }

  if (typeof item === 'undefined' || item === null) {
    return [];
  }

  return [item];
}

var StyledDropdownSelect = _styledComponents["default"].div(_templateObject(), function (props) {
  return props.inputTheme === 'secondary' ? props.theme.secondaryInput : props.theme.input;
}, function (props) {
  return props.theme.dropdownListAnchor;
});

var DropdownSelectValue = _styledComponents["default"].span(_templateObject2(), function (props) {
  return props.hasPlaceholder ? props.theme.selectColorPlaceHolder : props.theme.selectColor;
});

var DropdownSelectErase = _styledComponents["default"].div(_templateObject3());

var DropdownWrapper = _styledComponents["default"].div(_templateObject4(), function (props) {
  return props.placement === 'top' ? props.theme.inputBoxHeight : 'auto';
}, function (props) {
  return props.placement === 'bottom' ? '4px' : 'auto';
}, function (props) {
  return props.placement === 'top' ? '4px' : 'auto';
});

var ItemSelector =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2["default"])(ItemSelector, _Component);

  function ItemSelector() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, ItemSelector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(ItemSelector)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      showTypeahead: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClickOutside", function () {
      _this._hideTypeahead();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onBlur", function () {
      // note: chickleted input is not a real form element so we call onBlur()
      // when we feel the events are appropriate
      if (_this.props.onBlur) {
        _this.props.onBlur();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_removeItem", function (item, e) {
      // only used when multiSelect = true
      e.preventDefault();
      e.stopPropagation();
      var selectedItems = _this.props.selectedItems;
      var index = selectedItems.findIndex(function (t) {
        return t === item;
      });

      if (index < 0) {
        return;
      }

      var items = [].concat((0, _toConsumableArray2["default"])(selectedItems.slice(0, index)), (0, _toConsumableArray2["default"])(selectedItems.slice(index + 1, selectedItems.length)));

      _this.props.onChange(items);

      if (_this.props.closeOnSelect) {
        _this.setState({
          showTypeahead: false
        });

        _this._onBlur();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_selectItem", function (item) {
      var getValue = _accessor["default"].generateOptionToStringFor(_this.props.getOptionValue || _this.props.displayOption);

      var previousSelected = _toArray(_this.props.selectedItems);

      if (_this.props.multiSelect) {
        var items = (0, _lodash["default"])(previousSelected.concat(_toArray(item).map(getValue)));

        _this.props.onChange(items);
      } else {
        _this.props.onChange(getValue(item));
      }

      if (_this.props.closeOnSelect) {
        _this.setState({
          showTypeahead: false
        });

        _this._onBlur();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onErase", function (e) {
      e.stopPropagation();

      _this.props.onChange(null);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_showTypeahead", function () {
      if (!_this.props.disabled) {
        _this.setState({
          showTypeahead: true
        });
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(ItemSelector, [{
    key: "_hideTypeahead",
    value: function _hideTypeahead() {
      this.setState({
        showTypeahead: false
      });

      this._onBlur();
    }
  }, {
    key: "_renderDropdown",
    value: function _renderDropdown() {
      return _react["default"].createElement(DropdownWrapper, {
        placement: this.props.placement
      }, _react["default"].createElement(_typeahead["default"], {
        customClasses: {
          results: 'list-selector',
          input: 'typeahead__input',
          listItem: 'list__item',
          listAnchor: 'list__item__anchor'
        },
        options: this.props.options,
        filterOption: this.props.filterOption,
        fixedOptions: this.props.fixedOptions,
        placeholder: "Search",
        onOptionSelected: this._selectItem,
        customListComponent: this.props.DropDownRenderComponent,
        customListHeaderComponent: this.props.DropdownHeaderComponent,
        customListItemComponent: this.props.DropDownLineItemRenderComponent,
        displayOption: _accessor["default"].generateOptionToStringFor(this.props.displayOption),
        searchable: this.props.searchable,
        showOptionsWhenEmpty: true,
        selectedItems: _toArray(this.props.selectedItems)
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var selected = _toArray(this.props.selectedItems);

      var hasValue = selected.length;

      var displayOption = _accessor["default"].generateOptionToStringFor(this.props.displayOption);

      var dropdownSelectProps = {
        className: (0, _classnames["default"])("item-selector__dropdown", {
          active: this.state.showTypeahead
        }),
        disabled: this.props.disabled,
        onClick: this._showTypeahead,
        onFocus: this._showPopover,
        error: this.props.isError,
        inputTheme: this.props.inputTheme
      };
      return _react["default"].createElement("div", {
        className: "item-selector"
      }, _react["default"].createElement("div", {
        style: {
          position: 'relative'
        }
      }, this.props.multiSelect ? _react["default"].createElement(_chickletedInput["default"], (0, _extends2["default"])({}, dropdownSelectProps, {
        selectedItems: _toArray(this.props.selectedItems),
        placeholder: this.props.placeholder,
        displayOption: displayOption,
        removeItem: this._removeItem
      })) : _react["default"].createElement(StyledDropdownSelect, dropdownSelectProps, _react["default"].createElement(DropdownSelectValue, {
        hasPlaceholder: !hasValue,
        className: "item-selector__dropdown__value"
      }, hasValue ? _react["default"].createElement(this.props.DropDownLineItemRenderComponent, {
        displayOption: displayOption,
        value: selected[0]
      }) : this.props.placeholder), this.props.erasable && hasValue ? _react["default"].createElement(DropdownSelectErase, null, _react["default"].createElement(_icons.Delete, {
        height: "12px",
        onClick: this._onErase
      })) : null), this.state.showTypeahead && this._renderDropdown()));
    }
  }]);
  return ItemSelector;
}(_react.Component);

(0, _defineProperty2["default"])(ItemSelector, "propTypes", {
  // required properties
  selectedItems: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].bool, _propTypes["default"].object]),
  onChange: _propTypes["default"].func.isRequired,
  options: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  // optional properties
  fixedOptions: _propTypes["default"].arrayOf(_propTypes["default"].any),
  erasable: _propTypes["default"].bool,
  displayOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  getOptionValue: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  filterOption: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),
  placement: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  isError: _propTypes["default"].bool,
  multiSelect: _propTypes["default"].bool,
  inputTheme: _propTypes["default"].string,
  onBlur: _propTypes["default"].func,
  placeholder: _propTypes["default"].string,
  closeOnSelect: _propTypes["default"].bool,
  DropdownHeaderComponent: _propTypes["default"].func,
  DropDownRenderComponent: _propTypes["default"].func,
  DropDownLineItemRenderComponent: _propTypes["default"].func
});
(0, _defineProperty2["default"])(ItemSelector, "defaultProps", {
  erasable: false,
  placement: 'bottom',
  selectedItems: [],
  displayOption: null,
  getOptionValue: null,
  filterOption: null,
  fixedOptions: null,
  inputTheme: 'primary',
  multiSelect: true,
  placeholder: 'Enter a value',
  closeOnSelect: true,
  searchable: true,
  dropdownHeader: null,
  DropdownHeaderComponent: null,
  DropDownRenderComponent: _dropdownList["default"],
  DropDownLineItemRenderComponent: _dropdownList.ListItem
});
;

var _default = (0, _reactOnclickoutside["default"])(ItemSelector);

exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9pdGVtLXNlbGVjdG9yL2l0ZW0tc2VsZWN0b3IuanMiXSwibmFtZXMiOlsiX3RvQXJyYXkiLCJpdGVtIiwiQXJyYXkiLCJpc0FycmF5IiwiU3R5bGVkRHJvcGRvd25TZWxlY3QiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsImlucHV0VGhlbWUiLCJ0aGVtZSIsInNlY29uZGFyeUlucHV0IiwiaW5wdXQiLCJkcm9wZG93bkxpc3RBbmNob3IiLCJEcm9wZG93blNlbGVjdFZhbHVlIiwic3BhbiIsImhhc1BsYWNlaG9sZGVyIiwic2VsZWN0Q29sb3JQbGFjZUhvbGRlciIsInNlbGVjdENvbG9yIiwiRHJvcGRvd25TZWxlY3RFcmFzZSIsIkRyb3Bkb3duV3JhcHBlciIsInBsYWNlbWVudCIsImlucHV0Qm94SGVpZ2h0IiwiSXRlbVNlbGVjdG9yIiwic2hvd1R5cGVhaGVhZCIsIl9oaWRlVHlwZWFoZWFkIiwib25CbHVyIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWRJdGVtcyIsImluZGV4IiwiZmluZEluZGV4IiwidCIsIml0ZW1zIiwic2xpY2UiLCJsZW5ndGgiLCJvbkNoYW5nZSIsImNsb3NlT25TZWxlY3QiLCJzZXRTdGF0ZSIsIl9vbkJsdXIiLCJnZXRWYWx1ZSIsIkFjY2Vzc29yIiwiZ2VuZXJhdGVPcHRpb25Ub1N0cmluZ0ZvciIsImdldE9wdGlvblZhbHVlIiwiZGlzcGxheU9wdGlvbiIsInByZXZpb3VzU2VsZWN0ZWQiLCJtdWx0aVNlbGVjdCIsImNvbmNhdCIsIm1hcCIsImRpc2FibGVkIiwicmVzdWx0cyIsImxpc3RJdGVtIiwibGlzdEFuY2hvciIsIm9wdGlvbnMiLCJmaWx0ZXJPcHRpb24iLCJmaXhlZE9wdGlvbnMiLCJfc2VsZWN0SXRlbSIsIkRyb3BEb3duUmVuZGVyQ29tcG9uZW50IiwiRHJvcGRvd25IZWFkZXJDb21wb25lbnQiLCJEcm9wRG93bkxpbmVJdGVtUmVuZGVyQ29tcG9uZW50Iiwic2VhcmNoYWJsZSIsInNlbGVjdGVkIiwiaGFzVmFsdWUiLCJkcm9wZG93blNlbGVjdFByb3BzIiwiY2xhc3NOYW1lIiwiYWN0aXZlIiwic3RhdGUiLCJvbkNsaWNrIiwiX3Nob3dUeXBlYWhlYWQiLCJvbkZvY3VzIiwiX3Nob3dQb3BvdmVyIiwiZXJyb3IiLCJpc0Vycm9yIiwicG9zaXRpb24iLCJwbGFjZWhvbGRlciIsIl9yZW1vdmVJdGVtIiwiZXJhc2FibGUiLCJfb25FcmFzZSIsIl9yZW5kZXJEcm9wZG93biIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsImFycmF5Iiwic3RyaW5nIiwibnVtYmVyIiwiYm9vbCIsIm9iamVjdCIsImZ1bmMiLCJpc1JlcXVpcmVkIiwiYXJyYXlPZiIsImFueSIsImRyb3Bkb3duSGVhZGVyIiwiRHJvcGRvd25MaXN0IiwiTGlzdEl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztBQVFBLFNBQVNBLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3RCLE1BQUlDLEtBQUssQ0FBQ0MsT0FBTixDQUFjRixJQUFkLENBQUosRUFBeUI7QUFDdkIsV0FBT0EsSUFBUDtBQUNEOztBQUVELE1BQUksT0FBT0EsSUFBUCxLQUFnQixXQUFoQixJQUErQkEsSUFBSSxLQUFLLElBQTVDLEVBQWtEO0FBQ2hELFdBQU8sRUFBUDtBQUNEOztBQUVELFNBQU8sQ0FBQ0EsSUFBRCxDQUFQO0FBQ0Q7O0FBRUQsSUFBTUcsb0JBQW9CLEdBQUdDLDZCQUFPQyxHQUFWLG9CQUN0QixVQUFBQyxLQUFLO0FBQUEsU0FDTEEsS0FBSyxDQUFDQyxVQUFOLEtBQXFCLFdBQXJC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RUFBRXdFLHNCQUFVRyxNQXRCTDtBQXVCakIxRCxFQUFBQSxNQUFNLEVBQUV1RCxzQkFBVU8sSUF2QkQ7QUF3QmpCYixFQUFBQSxXQUFXLEVBQUVNLHNCQUFVRyxNQXhCTjtBQXlCakI5QyxFQUFBQSxhQUFhLEVBQUUyQyxzQkFBVUssSUF6QlI7QUEwQmpCM0IsRUFBQUEsdUJBQXVCLEVBQUVzQixzQkFBVU8sSUExQmxCO0FBMkJqQjlCLEVBQUFBLHVCQUF1QixFQUFFdUIsc0JBQVVPLElBM0JsQjtBQTRCakI1QixFQUFBQSwrQkFBK0IsRUFBRXFCLHNCQUFVTztBQTVCMUIsQztpQ0FEZmpFLFksa0JBZ0NrQjtBQUNwQnNELEVBQUFBLFFBQVEsRUFBRSxLQURVO0FBRXBCeEQsRUFBQUEsU0FBUyxFQUFFLFFBRlM7QUFHcEJTLEVBQUFBLGFBQWEsRUFBRSxFQUhLO0FBSXBCZSxFQUFBQSxhQUFhLEVBQUUsSUFKSztBQUtwQkQsRUFBQUEsY0FBYyxFQUFFLElBTEk7QUFNcEJXLEVBQUFBLFlBQVksRUFBRSxJQU5NO0FBT3BCQyxFQUFBQSxZQUFZLEVBQUUsSUFQTTtBQVFwQi9DLEVBQUFBLFVBQVUsRUFBRSxTQVJRO0FBU3BCc0MsRUFBQUEsV0FBVyxFQUFFLElBVE87QUFVcEI0QixFQUFBQSxXQUFXLEVBQUUsZUFWTztBQVdwQnJDLEVBQUFBLGFBQWEsRUFBRSxJQVhLO0FBWXBCdUIsRUFBQUEsVUFBVSxFQUFFLElBWlE7QUFhcEIrQixFQUFBQSxjQUFjLEVBQUUsSUFiSTtBQWNwQmpDLEVBQUFBLHVCQUF1QixFQUFFLElBZEw7QUFlcEJELEVBQUFBLHVCQUF1QixFQUFFbUMsd0JBZkw7QUFnQnBCakMsRUFBQUEsK0JBQStCLEVBQUVrQztBQWhCYixDO0FBcUx2Qjs7ZUFFYyxxQ0FBc0J2RSxZQUF0QixDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE5IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4vLyBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgdW5pcSBmcm9tICdsb2Rhc2gudW5pcSc7XG5pbXBvcnQgbGlzdGVuc1RvQ2xpY2tPdXRzaWRlIGZyb20gJ3JlYWN0LW9uY2xpY2tvdXRzaWRlJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgQWNjZXNzb3IgZnJvbSAnLi9hY2Nlc3Nvcic7XG5pbXBvcnQgQ2hpY2tsZXRlZElucHV0IGZyb20gJy4vY2hpY2tsZXRlZC1pbnB1dCc7XG5pbXBvcnQgVHlwZWFoZWFkIGZyb20gJy4vdHlwZWFoZWFkJztcbmltcG9ydCB7RGVsZXRlfSBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9pY29ucyc7XG5pbXBvcnQgRHJvcGRvd25MaXN0LCB7TGlzdEl0ZW19IGZyb20gJy4vZHJvcGRvd24tbGlzdCc7XG5cbi8qKlxuICogQ29udmVydHMgbm9uLWFycmF5cyB0byBhcnJheXMuICBMZWF2ZXMgYXJyYXlzIGFsb25lLiAgQ29udmVydHNcbiAqIHVuZGVmaW5lZCB2YWx1ZXMgdG8gZW1wdHkgYXJyYXlzIChbXSBpbnN0ZWFkIG9mIFt1bmRlZmluZWRdKS5cbiAqIE90aGVyd2lzZSwganVzdCByZXR1cm5zIFtpdGVtXSBmb3Igbm9uLWFycmF5IGl0ZW1zLlxuICpcbiAqIEBwYXJhbSB7Kn0gaXRlbVxuICogQHJldHVybnMge2FycmF5fSBib29tISBtdWNoIGFycmF5LiB2ZXJ5IGluZGV4ZWQuIHNvIHVzZWZ1bC5cbiAqL1xuZnVuY3Rpb24gX3RvQXJyYXkoaXRlbSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIHJldHVybiBpdGVtO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBpdGVtID09PSAndW5kZWZpbmVkJyB8fCBpdGVtID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcmV0dXJuIFtpdGVtXTtcbn1cblxuY29uc3QgU3R5bGVkRHJvcGRvd25TZWxlY3QgPSBzdHlsZWQuZGl2YFxuICAke3Byb3BzID0+XG4gICAgcHJvcHMuaW5wdXRUaGVtZSA9PT0gJ3NlY29uZGFyeSdcbiAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRcbiAgICAgIDogcHJvcHMudGhlbWUuaW5wdXR9O1xuXG4gIC5saXN0X19pdGVtX19hbmNob3Ige1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0QW5jaG9yfTtcbiAgfVxuYDtcblxuY29uc3QgRHJvcGRvd25TZWxlY3RWYWx1ZSA9IHN0eWxlZC5zcGFuYFxuICBjb2xvcjogJHtwcm9wcyA9PlxuICAgIHByb3BzLmhhc1BsYWNlaG9sZGVyXG4gICAgICA/IHByb3BzLnRoZW1lLnNlbGVjdENvbG9yUGxhY2VIb2xkZXJcbiAgICAgIDogcHJvcHMudGhlbWUuc2VsZWN0Q29sb3J9O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuYDtcblxuY29uc3QgRHJvcGRvd25TZWxlY3RFcmFzZSA9IHN0eWxlZC5kaXZgXG4gIG1hcmdpbi1sZWZ0OiA2cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG5gO1xuXG5jb25zdCBEcm9wZG93bldyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBib3JkZXI6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAxMDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAke3Byb3BzID0+XG4gICAgcHJvcHMucGxhY2VtZW50ID09PSAndG9wJyA/IHByb3BzLnRoZW1lLmlucHV0Qm94SGVpZ2h0IDogJ2F1dG8nfTtcbiAgbWFyZ2luLXRvcDogJHtwcm9wcyA9PiAocHJvcHMucGxhY2VtZW50ID09PSAnYm90dG9tJyA/ICc0cHgnIDogJ2F1dG8nKX07XG4gIG1hcmdpbi1ib3R0b206ICR7cHJvcHMgPT4gKHByb3BzLnBsYWNlbWVudCA9PT0gJ3RvcCcgPyAnNHB4JyA6ICdhdXRvJyl9O1xuYDtcblxuY2xhc3MgSXRlbVNlbGVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvLyByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gICAgc2VsZWN0ZWRJdGVtczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuYXJyYXksXG4gICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIFByb3BUeXBlcy5ib29sLFxuICAgICAgUHJvcFR5cGVzLm9iamVjdFxuICAgIF0pLFxuICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5hbnkpLmlzUmVxdWlyZWQsXG5cbiAgICAvLyBvcHRpb25hbCBwcm9wZXJ0aWVzXG4gICAgZml4ZWRPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuYW55KSxcbiAgICBlcmFzYWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgZGlzcGxheU9wdGlvbjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBnZXRPcHRpb25WYWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICBmaWx0ZXJPcHRpb246IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgcGxhY2VtZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBpc0Vycm9yOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBtdWx0aVNlbGVjdDogUHJvcFR5cGVzLmJvb2wsXG4gICAgaW5wdXRUaGVtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvbkJsdXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsb3NlT25TZWxlY3Q6IFByb3BUeXBlcy5ib29sLFxuICAgIERyb3Bkb3duSGVhZGVyQ29tcG9uZW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBEcm9wRG93blJlbmRlckNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgRHJvcERvd25MaW5lSXRlbVJlbmRlckNvbXBvbmVudDogUHJvcFR5cGVzLmZ1bmNcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGVyYXNhYmxlOiBmYWxzZSxcbiAgICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICAgIHNlbGVjdGVkSXRlbXM6IFtdLFxuICAgIGRpc3BsYXlPcHRpb246IG51bGwsXG4gICAgZ2V0T3B0aW9uVmFsdWU6IG51bGwsXG4gICAgZmlsdGVyT3B0aW9uOiBudWxsLFxuICAgIGZpeGVkT3B0aW9uczogbnVsbCxcbiAgICBpbnB1dFRoZW1lOiAncHJpbWFyeScsXG4gICAgbXVsdGlTZWxlY3Q6IHRydWUsXG4gICAgcGxhY2Vob2xkZXI6ICdFbnRlciBhIHZhbHVlJyxcbiAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxuICAgIHNlYXJjaGFibGU6IHRydWUsXG4gICAgZHJvcGRvd25IZWFkZXI6IG51bGwsXG4gICAgRHJvcGRvd25IZWFkZXJDb21wb25lbnQ6IG51bGwsXG4gICAgRHJvcERvd25SZW5kZXJDb21wb25lbnQ6IERyb3Bkb3duTGlzdCxcbiAgICBEcm9wRG93bkxpbmVJdGVtUmVuZGVyQ29tcG9uZW50OiBMaXN0SXRlbVxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIHNob3dUeXBlYWhlYWQ6IGZhbHNlXG4gIH07XG5cbiAgaGFuZGxlQ2xpY2tPdXRzaWRlID0gKCkgPT4ge1xuICAgIHRoaXMuX2hpZGVUeXBlYWhlYWQoKTtcbiAgfTtcblxuICBfaGlkZVR5cGVhaGVhZCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtzaG93VHlwZWFoZWFkOiBmYWxzZX0pO1xuICAgIHRoaXMuX29uQmx1cigpO1xuICB9XG5cbiAgX29uQmx1ciA9ICgpID0+IHtcbiAgICAvLyBub3RlOiBjaGlja2xldGVkIGlucHV0IGlzIG5vdCBhIHJlYWwgZm9ybSBlbGVtZW50IHNvIHdlIGNhbGwgb25CbHVyKClcbiAgICAvLyB3aGVuIHdlIGZlZWwgdGhlIGV2ZW50cyBhcmUgYXBwcm9wcmlhdGVcbiAgICBpZiAodGhpcy5wcm9wcy5vbkJsdXIpIHtcbiAgICAgIHRoaXMucHJvcHMub25CbHVyKCk7XG4gICAgfVxuICB9O1xuXG4gIF9yZW1vdmVJdGVtID0gKGl0ZW0sIGUpID0+IHtcbiAgICAvLyBvbmx5IHVzZWQgd2hlbiBtdWx0aVNlbGVjdCA9IHRydWVcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCB7c2VsZWN0ZWRJdGVtc30gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IGluZGV4ID0gc2VsZWN0ZWRJdGVtcy5maW5kSW5kZXgodCA9PiB0ID09PSBpdGVtKTtcblxuICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtcyA9IFtcbiAgICAgIC4uLnNlbGVjdGVkSXRlbXMuc2xpY2UoMCwgaW5kZXgpLFxuICAgICAgLi4uc2VsZWN0ZWRJdGVtcy5zbGljZShpbmRleCArIDEsIHNlbGVjdGVkSXRlbXMubGVuZ3RoKVxuICAgIF07XG5cbiAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGl0ZW1zKTtcblxuICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dUeXBlYWhlYWQ6IGZhbHNlfSk7XG4gICAgICB0aGlzLl9vbkJsdXIoKTtcbiAgICB9XG4gIH07XG5cbiAgX3NlbGVjdEl0ZW0gPSBpdGVtID0+IHtcbiAgICBjb25zdCBnZXRWYWx1ZSA9IEFjY2Vzc29yLmdlbmVyYXRlT3B0aW9uVG9TdHJpbmdGb3IoXG4gICAgICB0aGlzLnByb3BzLmdldE9wdGlvblZhbHVlIHx8IHRoaXMucHJvcHMuZGlzcGxheU9wdGlvblxuICAgICk7XG5cbiAgICBjb25zdCBwcmV2aW91c1NlbGVjdGVkID0gX3RvQXJyYXkodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zKTtcblxuICAgIGlmICh0aGlzLnByb3BzLm11bHRpU2VsZWN0KSB7XG4gICAgICBjb25zdCBpdGVtcyA9IHVuaXEocHJldmlvdXNTZWxlY3RlZC5jb25jYXQoX3RvQXJyYXkoaXRlbSkubWFwKGdldFZhbHVlKSkpO1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShpdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZ2V0VmFsdWUoaXRlbSkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLmNsb3NlT25TZWxlY3QpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe3Nob3dUeXBlYWhlYWQ6IGZhbHNlfSk7XG4gICAgICB0aGlzLl9vbkJsdXIoKTtcbiAgICB9XG4gIH07XG5cbiAgX29uRXJhc2UgPSBlID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucHJvcHMub25DaGFuZ2UobnVsbCk7XG4gIH07XG5cbiAgX3Nob3dUeXBlYWhlYWQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2hvd1R5cGVhaGVhZDogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9yZW5kZXJEcm9wZG93bigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPERyb3Bkb3duV3JhcHBlciBwbGFjZW1lbnQ9e3RoaXMucHJvcHMucGxhY2VtZW50fT5cbiAgICAgICAgPFR5cGVhaGVhZFxuICAgICAgICAgIGN1c3RvbUNsYXNzZXM9e3tcbiAgICAgICAgICAgIHJlc3VsdHM6ICdsaXN0LXNlbGVjdG9yJyxcbiAgICAgICAgICAgIGlucHV0OiAndHlwZWFoZWFkX19pbnB1dCcsXG4gICAgICAgICAgICBsaXN0SXRlbTogJ2xpc3RfX2l0ZW0nLFxuICAgICAgICAgICAgbGlzdEFuY2hvcjogJ2xpc3RfX2l0ZW1fX2FuY2hvcidcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMub3B0aW9uc31cbiAgICAgICAgICBmaWx0ZXJPcHRpb249e3RoaXMucHJvcHMuZmlsdGVyT3B0aW9ufVxuICAgICAgICAgIGZpeGVkT3B0aW9ucz17dGhpcy5wcm9wcy5maXhlZE9wdGlvbnN9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2hcIlxuICAgICAgICAgIG9uT3B0aW9uU2VsZWN0ZWQ9e3RoaXMuX3NlbGVjdEl0ZW19XG4gICAgICAgICAgY3VzdG9tTGlzdENvbXBvbmVudD17dGhpcy5wcm9wcy5Ecm9wRG93blJlbmRlckNvbXBvbmVudH1cbiAgICAgICAgICBjdXN0b21MaXN0SGVhZGVyQ29tcG9uZW50PXt0aGlzLnByb3BzLkRyb3Bkb3duSGVhZGVyQ29tcG9uZW50fVxuICAgICAgICAgIGN1c3RvbUxpc3RJdGVtQ29tcG9uZW50PXt0aGlzLnByb3BzLkRyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnR9XG4gICAgICAgICAgZGlzcGxheU9wdGlvbj17QWNjZXNzb3IuZ2VuZXJhdGVPcHRpb25Ub1N0cmluZ0ZvcihcbiAgICAgICAgICAgIHRoaXMucHJvcHMuZGlzcGxheU9wdGlvblxuICAgICAgICAgICl9XG4gICAgICAgICAgc2VhcmNoYWJsZT17dGhpcy5wcm9wcy5zZWFyY2hhYmxlfVxuICAgICAgICAgIHNob3dPcHRpb25zV2hlbkVtcHR5XG4gICAgICAgICAgc2VsZWN0ZWRJdGVtcz17X3RvQXJyYXkodGhpcy5wcm9wcy5zZWxlY3RlZEl0ZW1zKX1cbiAgICAgICAgLz5cbiAgICAgIDwvRHJvcGRvd25XcmFwcGVyPlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSBfdG9BcnJheSh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMpO1xuICAgIGNvbnN0IGhhc1ZhbHVlID0gc2VsZWN0ZWQubGVuZ3RoO1xuICAgIGNvbnN0IGRpc3BsYXlPcHRpb24gPSBBY2Nlc3Nvci5nZW5lcmF0ZU9wdGlvblRvU3RyaW5nRm9yKFxuICAgICAgdGhpcy5wcm9wcy5kaXNwbGF5T3B0aW9uXG4gICAgKTtcblxuICAgIGNvbnN0IGRyb3Bkb3duU2VsZWN0UHJvcHMgPSB7XG4gICAgICBjbGFzc05hbWU6IGNsYXNzbmFtZXMoYGl0ZW0tc2VsZWN0b3JfX2Ryb3Bkb3duYCwge1xuICAgICAgICBhY3RpdmU6IHRoaXMuc3RhdGUuc2hvd1R5cGVhaGVhZFxuICAgICAgfSksXG4gICAgICBkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZCxcbiAgICAgIG9uQ2xpY2s6IHRoaXMuX3Nob3dUeXBlYWhlYWQsXG4gICAgICBvbkZvY3VzOiB0aGlzLl9zaG93UG9wb3ZlcixcbiAgICAgIGVycm9yOiB0aGlzLnByb3BzLmlzRXJyb3IsXG4gICAgICBpbnB1dFRoZW1lOiB0aGlzLnByb3BzLmlucHV0VGhlbWVcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbS1zZWxlY3RvclwiPlxuICAgICAgICA8ZGl2IHN0eWxlPXt7cG9zaXRpb246ICdyZWxhdGl2ZSd9fT5cbiAgICAgICAgICB7LyogdGhpcyBwYXJ0IGlzIHVzZWQgdG8gZGlzcGxheSB0aGUgbGFiZWwgKi99XG4gICAgICAgICAge3RoaXMucHJvcHMubXVsdGlTZWxlY3QgPyAoXG4gICAgICAgICAgICA8Q2hpY2tsZXRlZElucHV0XG4gICAgICAgICAgICAgIHsuLi5kcm9wZG93blNlbGVjdFByb3BzfVxuICAgICAgICAgICAgICBzZWxlY3RlZEl0ZW1zPXtfdG9BcnJheSh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbXMpfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cbiAgICAgICAgICAgICAgZGlzcGxheU9wdGlvbj17ZGlzcGxheU9wdGlvbn1cbiAgICAgICAgICAgICAgcmVtb3ZlSXRlbT17dGhpcy5fcmVtb3ZlSXRlbX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxTdHlsZWREcm9wZG93blNlbGVjdCB7Li4uZHJvcGRvd25TZWxlY3RQcm9wc30+XG4gICAgICAgICAgICAgIDxEcm9wZG93blNlbGVjdFZhbHVlIGhhc1BsYWNlaG9sZGVyPXshaGFzVmFsdWV9IGNsYXNzTmFtZT1cIml0ZW0tc2VsZWN0b3JfX2Ryb3Bkb3duX192YWx1ZVwiPlxuICAgICAgICAgICAgICAgIHtoYXNWYWx1ZSA/IChcbiAgICAgICAgICAgICAgICAgIDx0aGlzLnByb3BzLkRyb3BEb3duTGluZUl0ZW1SZW5kZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheU9wdGlvbj17ZGlzcGxheU9wdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkWzBdfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5wbGFjZWhvbGRlclxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvRHJvcGRvd25TZWxlY3RWYWx1ZT5cbiAgICAgICAgICAgICAge3RoaXMucHJvcHMuZXJhc2FibGUgJiYgaGFzVmFsdWUgPyAoXG4gICAgICAgICAgICAgICAgPERyb3Bkb3duU2VsZWN0RXJhc2U+XG4gICAgICAgICAgICAgICAgICA8RGVsZXRlIGhlaWdodD1cIjEycHhcIiBvbkNsaWNrPXt0aGlzLl9vbkVyYXNlfSAvPlxuICAgICAgICAgICAgICAgIDwvRHJvcGRvd25TZWxlY3RFcmFzZT5cbiAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8L1N0eWxlZERyb3Bkb3duU2VsZWN0PlxuICAgICAgICAgICl9XG4gICAgICAgICAgey8qIHRoaXMgcGFydCBpcyB1c2VkIHRvIGJ1aWx0IHRoZSBsaXN0ICovfVxuICAgICAgICAgIHt0aGlzLnN0YXRlLnNob3dUeXBlYWhlYWQgJiYgdGhpcy5fcmVuZGVyRHJvcGRvd24oKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBsaXN0ZW5zVG9DbGlja091dHNpZGUoSXRlbVNlbGVjdG9yKTtcbiJdfQ==