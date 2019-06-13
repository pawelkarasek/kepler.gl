"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledType = exports.StyledFilteredOption = exports.StyledExportSection = exports.StyledMapContainer = exports.StyledModalContent = exports.Table = exports.SelectionButton = exports.DatasetSquare = exports.ButtonGroup = exports.StyledPanelDropdown = exports.StyledPanelHeader = exports.InlineInput = exports.InputLight = exports.Input = exports.Button = exports.Tooltip = exports.SidePanelDivider = exports.SidePanelSection = exports.PanelContent = exports.PanelHeaderContent = exports.PanelHeaderTitle = exports.PanelLabelBold = exports.PanelLabelWrapper = exports.PanelLabel = exports.SBFlexboxItem = exports.SpaceBetweenFlexbox = exports.CenterFlexbox = exports.IconRoundSmall = exports.SelectTextBold = exports.SelectText = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _mediaBreakpoints = require("../../styles/media-breakpoints");

function _templateObject31() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-radius: 2px;\n  border: 1px solid ", ";\n  color: ", ";\n  cursor: pointer;\n  font-weight: 500;\n  height: 100px;\n  margin: 4px;\n  padding: 6px 10px;\n  width: 100px;\n\n  :hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject31 = function _templateObject31() {
    return data;
  };

  return data;
}

function _templateObject30() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  border-radius: 2px;\n  border: 1px solid ", ";\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  height: 60px;\n  justify-content: center;\n  margin: 4px;\n  padding: 8px 12px;\n  width: 140px;\n\n  :hover {\n    border: 1px solid ", ";\n  }\n\n  .filtered-title {\n    color: ", ";\n    font-size: 12px;\n    font-weight: 500;\n  }\n  .filtered-subtitle {\n    color: ", ";\n    font-size: 11px;\n  }\n"]);

  _templateObject30 = function _templateObject30() {
    return data;
  };

  return data;
}

function _templateObject29() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  flex-direction: row;\n  margin: 35px 0;\n  width: 100%;\n\n  .description {\n    width: 185px;\n\n    .title {\n      font-weight: 500;\n      color: ", ";\n      font-size: 12px;\n    }\n    .subtitle {\n      color: ", ";\n      font-size: 11px;\n    }\n  }\n\n  .selection {\n    display: flex;\n    flex-wrap: wrap;\n    flex: 1;\n    padding-left: 50px;\n\n    select {\n      background-color: white;\n      border-radius: 1px;\n      display: inline-block;\n      font: inherit;\n      line-height: 1.5em;\n      padding: 0.5em 3.5em 0.5em 1em;\n      margin: 0;\n      box-sizing: border-box;\n      appearance: none;\n      width: 250px;\n      height: 36px;\n\n      background-image:\n        linear-gradient(45deg, transparent 50%, gray 50%),\n        linear-gradient(135deg, gray 50%, transparent 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 20px) calc(1em + 2px),\n        calc(100% - 15px) calc(1em + 2px),\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n    }\n\n    select:focus {\n      background-image:\n        linear-gradient(45deg, green 50%, transparent 50%),\n        linear-gradient(135deg, transparent 50%, green 50%),\n        linear-gradient(to right, #ccc, #ccc);\n      background-position:\n        calc(100% - 15px) 1em,\n        calc(100% - 20px) 1em,\n        calc(100% - 2.5em) 4.5em;\n      background-size:\n        5px 5px,\n        5px 5px,\n        1px 1.5em;\n      background-repeat: no-repeat;\n      border-color: green;\n      outline: 0;\n    }\n  }\n"]);

  _templateObject29 = function _templateObject29() {
    return data;
  };

  return data;
}

function _templateObject28() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  .mapboxgl-map .mapboxgl-missing-css {\n    display: none;\n  }\n"]);

  _templateObject28 = function _templateObject28() {
    return data;
  };

  return data;
}

function _templateObject27() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n    flex-direction: column;\n    padding: 16px ", ";\n    margin: 0 -", ";\n  "]);

  _templateObject27 = function _templateObject27() {
    return data;
  };

  return data;
}

function _templateObject26() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  color: ", ";\n  display: flex;\n  flex-direction: row;\n  font-size: 10px;\n  padding: 24px ", ";\n  margin: 0 -", ";\n  justify-content: space-between;\n  ", ";\n"]);

  _templateObject26 = function _templateObject26() {
    return data;
  };

  return data;
}

function _templateObject25() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 100%;\n  border-spacing: 0;\n\n  thead {\n    tr th {\n      background: ", ";\n      color: ", ";\n      padding: 18px 12px;\n      text-align: start;\n    }\n  }\n\n  tbody {\n   tr td {\n     border-bottom: ", ";\n     padding: 12px;\n   }\n  }\n"]);

  _templateObject25 = function _templateObject25() {
    return data;
  };

  return data;
}

function _templateObject24() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-radius: 2px;\n  border: 1px solid ", ";\n  color: ", ";\n  cursor: pointer;\n  font-weight: 500;\n  margin-right: 6px;\n  padding: 6px 10px;\n\n  :hover {\n    color: ", ";\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  background-color: rgb(", ");\n  margin-right: 12px\n"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  .button {\n    border-radius: 0;\n    margin-left: 2px;\n  }\n  .button:first-child {\n    border-bottom-left-radius: ", ";\n    border-top-left-radius: ", ";\n    margin-left: 0;\n  }\n  .button:last-child {\n    border-bottom-right-radius: ", ";\n    border-top-right-radius: ", ";\n  }\n"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  background-color: ", ";\n  overflow-y: auto;\n  box-shadow: ", ";\n  border-radius: ", ";\n  margin-top: 2px;\n  max-height: 500px;\n  position: relative;\n  z-index: 999;\n"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  border-left: 3px solid\n    rgb(\n      ", "\n    );\n  padding: 0 10px 0 0;\n  height: ", "px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  transition: ", ";\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", ";\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", ";\n  color: ", ";\n  cursor: pointer;\n  display: inline-flex;\n  font-size: ", ";\n  font-weight: 500;\n  justify-content: center;\n  letter-spacing: 0.3px;\n  line-height: 14px;\n  outline: 0;\n  padding: ", ";\n  text-align: center;\n  transition: ", ";\n  vertical-align: middle;\n  width: ", ";\n  opacity: ", ";\n  pointer-events: ", ";\n\n  :hover,\n  :focus,\n  :active,\n  &.active {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  svg {\n    margin-right: 8px;\n  }\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  &.__react_component_tooltip {\n    font-size: 9.5px;\n    font-weight: 500;\n    padding: 7px 18px;\n\n    &.type-dark {\n      background-color: ", ";\n      color: ", ";\n      &.place-bottom {\n        :after {\n          border-bottom-color: ", ";\n        }\n      }\n\n      &.place-top {\n        :after {\n          border-top-color: ", ";\n        }\n      }\n\n      &.place-right {\n        :after {\n          border-right-color: ", ";\n        }\n      }\n\n      &.place-left {\n        :after {\n          border-left-color: ", ";\n        }\n      }\n    }\n  }\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  border-bottom: 1px solid ", ";\n  height: 12px;\n  margin-bottom: 12px;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  margin-bottom: 12px;\n  opacity: ", ";\n  pointer-events: ", ";\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background-color: ", ";\n  padding: 12px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n  color: ", ";\n  padding-left: 12px;\n\n  .icon {\n    color: ", ";\n    display: flex;\n    align-items: center;\n    margin-right: 12px;\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  text-transform: capitalize;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-weight: 500;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: self-start;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  display: inline-block;\n  font-size: 11px;\n  font-weight: 400;\n  margin-bottom: 4px;\n  text-transform: capitalize;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  flex-grow: 1;\n  margin-left: 16px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: space-between;\n  margin-left: -16px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  align-items: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: flex;\n  width: 18px;\n  height: 18px;\n  border-radius: 9px;\n  background-color: ", "; // updated after checking sketch file\n  color: ", ";\n  align-items: center;\n  justify-content: center;\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-weight: 500;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  font-size: ", ";\n  font-weight: 400;\n\n  i {\n    font-size: 13px;\n    margin-right: 6px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SelectText = _styledComponents["default"].span(_templateObject(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.selectFontSize;
});

exports.SelectText = SelectText;
var SelectTextBold = (0, _styledComponents["default"])(SelectText)(_templateObject2(), function (props) {
  return props.theme.textColor;
});
exports.SelectTextBold = SelectTextBold;

var IconRoundSmall = _styledComponents["default"].div(_templateObject3(), function (props) {
  return props.theme.secondaryBtnBgdHover;
}, function (props) {
  return props.theme.secondaryBtnColor;
}, function (props) {
  return props.theme.secondaryBtnBgdHover;
});

exports.IconRoundSmall = IconRoundSmall;

var CenterFlexbox = _styledComponents["default"].div(_templateObject4());

exports.CenterFlexbox = CenterFlexbox;

var SpaceBetweenFlexbox = _styledComponents["default"].div(_templateObject5());

exports.SpaceBetweenFlexbox = SpaceBetweenFlexbox;

var SBFlexboxItem = _styledComponents["default"].div(_templateObject6());

exports.SBFlexboxItem = SBFlexboxItem;

var PanelLabel = _styledComponents["default"].label.attrs({
  className: 'side-panel-panel__label'
})(_templateObject7(), function (props) {
  return props.theme.labelColor;
});

exports.PanelLabel = PanelLabel;

var PanelLabelWrapper = _styledComponents["default"].div.attrs({
  className: 'side-panel-panel__label-wrapper'
})(_templateObject8());

exports.PanelLabelWrapper = PanelLabelWrapper;
var PanelLabelBold = (0, _styledComponents["default"])(PanelLabel)(_templateObject9());
exports.PanelLabelBold = PanelLabelBold;

var PanelHeaderTitle = _styledComponents["default"].span.attrs({
  className: 'side-panel-panel__header__title'
})(_templateObject10(), function (props) {
  return props.theme.textColor;
});

exports.PanelHeaderTitle = PanelHeaderTitle;

var PanelHeaderContent = _styledComponents["default"].div(_templateObject11(), function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.labelColor;
});

exports.PanelHeaderContent = PanelHeaderContent;

var PanelContent = _styledComponents["default"].div.attrs({
  className: 'side-panel-panel__content'
})(_templateObject12(), function (props) {
  return props.theme.panelBackground;
});

exports.PanelContent = PanelContent;

var SidePanelSection = _styledComponents["default"].div.attrs({
  className: 'side-panel-section'
})(_templateObject13(), function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
});

exports.SidePanelSection = SidePanelSection;

var SidePanelDivider = _styledComponents["default"].div.attrs({
  className: 'side-panel-divider'
})(_templateObject14(), function (props) {
  return props.theme.panelBorderColor;
});

exports.SidePanelDivider = SidePanelDivider;
var Tooltip = (0, _styledComponents["default"])(_reactTooltip["default"])(_templateObject15(), function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipColor;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
}, function (props) {
  return props.theme.tooltipBg;
});
exports.Tooltip = Tooltip;

var Button = _styledComponents["default"].div.attrs({
  className: 'button'
})(_templateObject16(), function (props) {
  return props.negative ? props.theme.negativeBtnBgd : props.secondary ? props.theme.secondaryBtnBgd : props.link ? props.theme.linkBtnBgd : props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.negative ? props.theme.negativeBtnColor : props.secondary ? props.theme.secondaryBtnColor : props.link ? props.theme.linkBtnColor : props.theme.primaryBtnColor;
}, function (props) {
  return props.large ? '14px' : props.small ? '10px' : '11px';
}, function (props) {
  return props.large ? '14px 32px' : props.small ? '6px 9px' : '9px 12px';
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.width || 'auto';
}, function (props) {
  return props.disabled ? 0.4 : 1;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.negative ? props.theme.negativeBtnBgdHover : props.secondary ? props.theme.secondaryBtnBgdHover : props.link ? props.theme.linkBtnActBgdHover : props.theme.primaryBtnBgdHover;
}, function (props) {
  return props.negative ? props.theme.negativeBtnActColor : props.secondary ? props.theme.secondaryBtnActColor : props.link ? props.theme.linkBtnActColor : props.theme.primaryBtnActColor;
});

exports.Button = Button;

var Input = _styledComponents["default"].input(_templateObject17(), function (props) {
  return props.secondary ? props.theme.secondaryInput : props.theme.input;
});

exports.Input = Input;

var InputLight = _styledComponents["default"].input(_templateObject18(), function (props) {
  return props.theme.inputLT;
});

exports.InputLight = InputLight;
var InlineInput = (0, _styledComponents["default"])(Input)(_templateObject19(), function (props) {
  return props.theme.inlineInput;
});
exports.InlineInput = InlineInput;

var StyledPanelHeader = _styledComponents["default"].div(_templateObject20(), function (props) {
  return props.active ? props.theme.panelBackgroundHover : props.theme.panelBackground;
}, function (props) {
  return props.labelRCGColorValues ? props.labelRCGColorValues.join(',') : 'transparent';
}, function (props) {
  return props.theme.panelHeaderHeight;
}, function (props) {
  return props.theme.transition;
});

exports.StyledPanelHeader = StyledPanelHeader;

var StyledPanelDropdown = _styledComponents["default"].div(_templateObject21(), function (props) {
  return props.theme.panelDropdownScrollBar;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBoxShadow;
}, function (props) {
  return props.theme.panelBorderRadius;
});

exports.StyledPanelDropdown = StyledPanelDropdown;

var ButtonGroup = _styledComponents["default"].div(_templateObject22(), function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
}, function (props) {
  return props.theme.primaryBtnRadius;
});

exports.ButtonGroup = ButtonGroup;

var DatasetSquare = _styledComponents["default"].div(_templateObject23(), function (props) {
  return props.color.join(',');
});

exports.DatasetSquare = DatasetSquare;

var SelectionButton = _styledComponents["default"].div(_templateObject24(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

exports.SelectionButton = SelectionButton;

var Table = _styledComponents["default"].table(_templateObject25(), function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.titleColorLT;
}, function (props) {
  return props.theme.panelBorderLT;
});

exports.Table = Table;

var StyledModalContent = _styledComponents["default"].div(_templateObject26(), function (props) {
  return props.theme.panelBackgroundLT;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.modalLateralPadding;
}, function (props) {
  return props.theme.modalLateralPadding;
}, _mediaBreakpoints.media.portable(_templateObject27(), function (props) {
  return props.theme.modalPortableLateralPadding;
}, function (props) {
  return props.theme.modalPortableLateralPadding;
}));
/**
 * Newer versions of mapbox.gl display an error message banner on top of the map by default
 * which will cause the map to display points in the wrong locations
 * This workaround will hide the error banner.
 */


exports.StyledModalContent = StyledModalContent;

var StyledMapContainer = _styledComponents["default"].div(_templateObject28());

exports.StyledMapContainer = StyledMapContainer;

var StyledExportSection = _styledComponents["default"].div(_templateObject29(), function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
});

exports.StyledExportSection = StyledExportSection;

var StyledFilteredOption = _styledComponents["default"].div(_templateObject30(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.theme.primaryBtnBgd;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.textColor;
});

exports.StyledFilteredOption = StyledFilteredOption;

var StyledType = _styledComponents["default"].div(_templateObject31(), function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.selected ? props.theme.primaryBtnBgd : props.theme.selectBorderColorLT;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
}, function (props) {
  return props.available && props.theme.primaryBtnBgd;
});

exports.StyledType = StyledType;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9zdHlsZWQtY29tcG9uZW50cy5qcyJdLCJuYW1lcyI6WyJTZWxlY3RUZXh0Iiwic3R5bGVkIiwic3BhbiIsInByb3BzIiwidGhlbWUiLCJsYWJlbENvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJTZWxlY3RUZXh0Qm9sZCIsInRleHRDb2xvciIsIkljb25Sb3VuZFNtYWxsIiwiZGl2Iiwic2Vjb25kYXJ5QnRuQmdkSG92ZXIiLCJzZWNvbmRhcnlCdG5Db2xvciIsIkNlbnRlckZsZXhib3giLCJTcGFjZUJldHdlZW5GbGV4Ym94IiwiU0JGbGV4Ym94SXRlbSIsIlBhbmVsTGFiZWwiLCJsYWJlbCIsImF0dHJzIiwiY2xhc3NOYW1lIiwiUGFuZWxMYWJlbFdyYXBwZXIiLCJQYW5lbExhYmVsQm9sZCIsIlBhbmVsSGVhZGVyVGl0bGUiLCJQYW5lbEhlYWRlckNvbnRlbnQiLCJQYW5lbENvbnRlbnQiLCJwYW5lbEJhY2tncm91bmQiLCJTaWRlUGFuZWxTZWN0aW9uIiwiZGlzYWJsZWQiLCJTaWRlUGFuZWxEaXZpZGVyIiwicGFuZWxCb3JkZXJDb2xvciIsIlRvb2x0aXAiLCJSZWFjdFRvb2x0aXAiLCJ0b29sdGlwQmciLCJ0b29sdGlwQ29sb3IiLCJCdXR0b24iLCJuZWdhdGl2ZSIsIm5lZ2F0aXZlQnRuQmdkIiwic2Vjb25kYXJ5Iiwic2Vjb25kYXJ5QnRuQmdkIiwibGluayIsImxpbmtCdG5CZ2QiLCJwcmltYXJ5QnRuQmdkIiwicHJpbWFyeUJ0blJhZGl1cyIsIm5lZ2F0aXZlQnRuQ29sb3IiLCJsaW5rQnRuQ29sb3IiLCJwcmltYXJ5QnRuQ29sb3IiLCJsYXJnZSIsInNtYWxsIiwidHJhbnNpdGlvbiIsIndpZHRoIiwibmVnYXRpdmVCdG5CZ2RIb3ZlciIsImxpbmtCdG5BY3RCZ2RIb3ZlciIsInByaW1hcnlCdG5CZ2RIb3ZlciIsIm5lZ2F0aXZlQnRuQWN0Q29sb3IiLCJzZWNvbmRhcnlCdG5BY3RDb2xvciIsImxpbmtCdG5BY3RDb2xvciIsInByaW1hcnlCdG5BY3RDb2xvciIsIklucHV0IiwiaW5wdXQiLCJzZWNvbmRhcnlJbnB1dCIsIklucHV0TGlnaHQiLCJpbnB1dExUIiwiSW5saW5lSW5wdXQiLCJpbmxpbmVJbnB1dCIsIlN0eWxlZFBhbmVsSGVhZGVyIiwiYWN0aXZlIiwicGFuZWxCYWNrZ3JvdW5kSG92ZXIiLCJsYWJlbFJDR0NvbG9yVmFsdWVzIiwiam9pbiIsInBhbmVsSGVhZGVySGVpZ2h0IiwiU3R5bGVkUGFuZWxEcm9wZG93biIsInBhbmVsRHJvcGRvd25TY3JvbGxCYXIiLCJwYW5lbEJveFNoYWRvdyIsInBhbmVsQm9yZGVyUmFkaXVzIiwiQnV0dG9uR3JvdXAiLCJEYXRhc2V0U3F1YXJlIiwiY29sb3IiLCJTZWxlY3Rpb25CdXR0b24iLCJzZWxlY3RlZCIsInNlbGVjdEJvcmRlckNvbG9yTFQiLCJhdmFpbGFibGUiLCJUYWJsZSIsInRhYmxlIiwicGFuZWxCYWNrZ3JvdW5kTFQiLCJ0aXRsZUNvbG9yTFQiLCJwYW5lbEJvcmRlckxUIiwiU3R5bGVkTW9kYWxDb250ZW50IiwidGV4dENvbG9yTFQiLCJtb2RhbExhdGVyYWxQYWRkaW5nIiwibWVkaWEiLCJwb3J0YWJsZSIsIm1vZGFsUG9ydGFibGVMYXRlcmFsUGFkZGluZyIsIlN0eWxlZE1hcENvbnRhaW5lciIsIlN0eWxlZEV4cG9ydFNlY3Rpb24iLCJTdHlsZWRGaWx0ZXJlZE9wdGlvbiIsIlN0eWxlZFR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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WXFDLGFBQW5DO0FBQUEsQ0FiTixDQUFoQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IFJlYWN0VG9vbHRpcCBmcm9tICdyZWFjdC10b29sdGlwJztcbmltcG9ydCB7bWVkaWF9IGZyb20gJ3N0eWxlcy9tZWRpYS1icmVha3BvaW50cyc7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3RUZXh0ID0gc3R5bGVkLnNwYW5gXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0Rm9udFNpemV9O1xuICBmb250LXdlaWdodDogNDAwO1xuXG4gIGkge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDZweDtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFNlbGVjdFRleHRCb2xkID0gc3R5bGVkKFNlbGVjdFRleHQpYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3J9O1xuICBmb250LXdlaWdodDogNTAwO1xuYDtcblxuZXhwb3J0IGNvbnN0IEljb25Sb3VuZFNtYWxsID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgYm9yZGVyLXJhZGl1czogOXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkSG92ZXJ9OyAvLyB1cGRhdGVkIGFmdGVyIGNoZWNraW5nIHNrZXRjaCBmaWxlXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yfTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlCdG5CZ2RIb3Zlcn07XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBDZW50ZXJGbGV4Ym94ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmV4cG9ydCBjb25zdCBTcGFjZUJldHdlZW5GbGV4Ym94ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1sZWZ0OiAtMTZweDtcbmBcbmV4cG9ydCBjb25zdCBTQkZsZXhib3hJdGVtID0gc3R5bGVkLmRpdmBcbiAgZmxleC1ncm93OiAxO1xuICBtYXJnaW4tbGVmdDogMTZweDtcbmBcblxuZXhwb3J0IGNvbnN0IFBhbmVsTGFiZWwgPSBzdHlsZWQubGFiZWwuYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19sYWJlbCdcbn0pYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxMYWJlbFdyYXBwZXIgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1wYW5lbF9fbGFiZWwtd3JhcHBlcidcbn0pYFxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc2VsZi1zdGFydDtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbExhYmVsQm9sZCA9IHN0eWxlZChQYW5lbExhYmVsKWBcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBQYW5lbEhlYWRlclRpdGxlID0gc3R5bGVkLnNwYW4uYXR0cnMoe1xuICBjbGFzc05hbWU6ICdzaWRlLXBhbmVsLXBhbmVsX19oZWFkZXJfX3RpdGxlJ1xufSlgXG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxIZWFkZXJDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgcGFkZGluZy1sZWZ0OiAxMnB4O1xuXG4gIC5pY29uIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgUGFuZWxDb250ZW50ID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ3NpZGUtcGFuZWwtcGFuZWxfX2NvbnRlbnQnXG59KWBcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBwYWRkaW5nOiAxMnB4O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNpZGVQYW5lbFNlY3Rpb24gPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1zZWN0aW9uJ1xufSlgXG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gMC40IDogMSl9O1xuICBwb2ludGVyLWV2ZW50czogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnbm9uZScgOiAnYWxsJyl9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNpZGVQYW5lbERpdmlkZXIgPSBzdHlsZWQuZGl2LmF0dHJzKHtcbiAgY2xhc3NOYW1lOiAnc2lkZS1wYW5lbC1kaXZpZGVyJ1xufSlgXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm9yZGVyQ29sb3J9O1xuICBoZWlnaHQ6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG5gO1xuXG5leHBvcnQgY29uc3QgVG9vbHRpcCA9IHN0eWxlZChSZWFjdFRvb2x0aXApYFxuICAmLl9fcmVhY3RfY29tcG9uZW50X3Rvb2x0aXAge1xuICAgIGZvbnQtc2l6ZTogOS41cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBwYWRkaW5nOiA3cHggMThweDtcblxuICAgICYudHlwZS1kYXJrIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudG9vbHRpcEJnfTtcbiAgICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBDb2xvcn07XG4gICAgICAmLnBsYWNlLWJvdHRvbSB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICYucGxhY2UtdG9wIHtcbiAgICAgICAgOmFmdGVyIHtcbiAgICAgICAgICBib3JkZXItdG9wLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5wbGFjZS1yaWdodCB7XG4gICAgICAgIDphZnRlciB7XG4gICAgICAgICAgYm9yZGVyLXJpZ2h0LWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRvb2x0aXBCZ307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJi5wbGFjZS1sZWZ0IHtcbiAgICAgICAgOmFmdGVyIHtcbiAgICAgICAgICBib3JkZXItbGVmdC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50b29sdGlwQmd9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgQnV0dG9uID0gc3R5bGVkLmRpdi5hdHRycyh7XG4gIGNsYXNzTmFtZTogJ2J1dHRvbidcbn0pYFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMubmVnYXRpdmVcbiAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5CZ2RcbiAgICAgIDogcHJvcHMuc2Vjb25kYXJ5XG4gICAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkXG4gICAgICAgIDogcHJvcHMubGluayA/IHByb3BzLnRoZW1lLmxpbmtCdG5CZ2QgOiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgYm9yZGVyLXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5uZWdhdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5uZWdhdGl2ZUJ0bkNvbG9yXG4gICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICA/IHByb3BzLnRoZW1lLnNlY29uZGFyeUJ0bkNvbG9yXG4gICAgICAgIDogcHJvcHMubGluayA/IHByb3BzLnRoZW1lLmxpbmtCdG5Db2xvciA6IHByb3BzLnRoZW1lLnByaW1hcnlCdG5Db2xvcn07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGZvbnQtc2l6ZTogJHtwcm9wcyA9PlxuICAgIHByb3BzLmxhcmdlID9cbiAgICAgICcxNHB4J1xuICAgICAgOiBwcm9wcy5zbWFsbFxuICAgICAgICA/ICcxMHB4J1xuICAgICAgICA6ICcxMXB4J307XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XG4gIGxpbmUtaGVpZ2h0OiAxNHB4O1xuICBvdXRsaW5lOiAwO1xuICBwYWRkaW5nOiAke3Byb3BzID0+XG4gICAgcHJvcHMubGFyZ2UgP1xuICAgICAgJzE0cHggMzJweCdcbiAgICAgIDogcHJvcHMuc21hbGxcbiAgICAgICAgPyAnNnB4IDlweCdcbiAgICAgICAgOiAnOXB4IDEycHgnfTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0cmFuc2l0aW9uOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRyYW5zaXRpb259O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy53aWR0aCB8fCAnYXV0byd9O1xuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuNCA6IDEpfTtcbiAgcG9pbnRlci1ldmVudHM6ICR7cHJvcHMgPT4gKHByb3BzLmRpc2FibGVkID8gJ25vbmUnIDogJ2FsbCcpfTtcblxuICA6aG92ZXIsXG4gIDpmb2N1cyxcbiAgOmFjdGl2ZSxcbiAgJi5hY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5CZ2RIb3ZlclxuICAgICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQmdkSG92ZXJcbiAgICAgICAgICA6IHByb3BzLmxpbmtcbiAgICAgICAgICAgID8gcHJvcHMudGhlbWUubGlua0J0bkFjdEJnZEhvdmVyXG4gICAgICAgICAgICA6IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2RIb3Zlcn07XG4gICAgY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLm5lZ2F0aXZlXG4gICAgICAgID8gcHJvcHMudGhlbWUubmVnYXRpdmVCdG5BY3RDb2xvclxuICAgICAgICA6IHByb3BzLnNlY29uZGFyeVxuICAgICAgICAgID8gcHJvcHMudGhlbWUuc2Vjb25kYXJ5QnRuQWN0Q29sb3JcbiAgICAgICAgICA6IHByb3BzLmxpbmtcbiAgICAgICAgICAgID8gcHJvcHMudGhlbWUubGlua0J0bkFjdENvbG9yXG4gICAgICAgICAgICA6IHByb3BzLnRoZW1lLnByaW1hcnlCdG5BY3RDb2xvcn07XG4gIH1cblxuICBzdmcge1xuICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgSW5wdXQgPSBzdHlsZWQuaW5wdXRgXG4gICR7cHJvcHMgPT5cbiAgICBwcm9wcy5zZWNvbmRhcnkgPyBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dCA6IHByb3BzLnRoZW1lLmlucHV0fTtcbmA7XG5cbmV4cG9ydCBjb25zdCBJbnB1dExpZ2h0ID0gc3R5bGVkLmlucHV0YFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0TFR9XG5gO1xuXG5leHBvcnQgY29uc3QgSW5saW5lSW5wdXQgPSBzdHlsZWQoSW5wdXQpYFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlubGluZUlucHV0fTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRQYW5lbEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT5cbiAgICBwcm9wcy5hY3RpdmVcbiAgICAgID8gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJcbiAgICAgIDogcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZFxuICAgIHJnYihcbiAgICAgICR7cHJvcHMgPT5cbiAgICAgICAgcHJvcHMubGFiZWxSQ0dDb2xvclZhbHVlc1xuICAgICAgICAgID8gcHJvcHMubGFiZWxSQ0dDb2xvclZhbHVlcy5qb2luKCcsJylcbiAgICAgICAgICA6ICd0cmFuc3BhcmVudCd9XG4gICAgKTtcbiAgcGFkZGluZzogMCAxMHB4IDAgMDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsSGVhZGVySGVpZ2h0fXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvbn07XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkUGFuZWxEcm9wZG93biA9IHN0eWxlZC5kaXZgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxEcm9wZG93blNjcm9sbEJhcn1cbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQm94U2hhZG93fTtcbiAgYm9yZGVyLXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlclJhZGl1c307XG4gIG1hcmdpbi10b3A6IDJweDtcbiAgbWF4LWhlaWdodDogNTAwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogOTk5O1xuYDtcblxuZXhwb3J0IGNvbnN0IEJ1dHRvbkdyb3VwID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgLmJ1dHRvbiB7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBtYXJnaW4tbGVmdDogMnB4O1xuICB9XG4gIC5idXR0b246Zmlyc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucHJpbWFyeUJ0blJhZGl1c307XG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuUmFkaXVzfTtcbiAgICBtYXJnaW4tbGVmdDogMDtcbiAgfVxuICAuYnV0dG9uOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5SYWRpdXN9O1xuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnByaW1hcnlCdG5SYWRpdXN9O1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgRGF0YXNldFNxdWFyZSA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDhweDtcbiAgaGVpZ2h0OiA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigke3Byb3BzID0+IHByb3BzLmNvbG9yLmpvaW4oJywnKX0pO1xuICBtYXJnaW4tcmlnaHQ6IDEycHhcbmA7XG5cbmV4cG9ydCBjb25zdCBTZWxlY3Rpb25CdXR0b24gPSBzdHlsZWQuZGl2YFxuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMuc2VsZWN0ZWQgPyBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkIDogcHJvcHMudGhlbWUuc2VsZWN0Qm9yZGVyQ29sb3JMVH07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnNlbGVjdGVkID8gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZCA6IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIG1hcmdpbi1yaWdodDogNnB4O1xuICBwYWRkaW5nOiA2cHggMTBweDtcblxuICA6aG92ZXIge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLmF2YWlsYWJsZSAmJiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLmF2YWlsYWJsZSAmJiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFRhYmxlID0gc3R5bGVkLnRhYmxlYFxuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyLXNwYWNpbmc6IDA7XG5cbiAgdGhlYWQge1xuICAgIHRyIHRoIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGl0bGVDb2xvckxUfTtcbiAgICAgIHBhZGRpbmc6IDE4cHggMTJweDtcbiAgICAgIHRleHQtYWxpZ246IHN0YXJ0O1xuICAgIH1cbiAgfVxuXG4gIHRib2R5IHtcbiAgIHRyIHRkIHtcbiAgICAgYm9yZGVyLWJvdHRvbTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJvcmRlckxUfTtcbiAgICAgcGFkZGluZzogMTJweDtcbiAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZE1vZGFsQ29udGVudCA9IHN0eWxlZC5kaXZgXG4gIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kTFR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JMVH07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgcGFkZGluZzogMjRweCAke3Byb3BzID0+IHByb3BzLnRoZW1lLm1vZGFsTGF0ZXJhbFBhZGRpbmd9O1xuICBtYXJnaW46IDAgLSR7cHJvcHMgPT4gcHJvcHMudGhlbWUubW9kYWxMYXRlcmFsUGFkZGluZ307XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgJHttZWRpYS5wb3J0YWJsZWBcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIHBhZGRpbmc6IDE2cHggJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tb2RhbFBvcnRhYmxlTGF0ZXJhbFBhZGRpbmd9O1xuICAgIG1hcmdpbjogMCAtJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5tb2RhbFBvcnRhYmxlTGF0ZXJhbFBhZGRpbmd9O1xuICBgfTtcbmA7XG5cbi8qKlxuICogTmV3ZXIgdmVyc2lvbnMgb2YgbWFwYm94LmdsIGRpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSBiYW5uZXIgb24gdG9wIG9mIHRoZSBtYXAgYnkgZGVmYXVsdFxuICogd2hpY2ggd2lsbCBjYXVzZSB0aGUgbWFwIHRvIGRpc3BsYXkgcG9pbnRzIGluIHRoZSB3cm9uZyBsb2NhdGlvbnNcbiAqIFRoaXMgd29ya2Fyb3VuZCB3aWxsIGhpZGUgdGhlIGVycm9yIGJhbm5lci5cbiAqL1xuZXhwb3J0IGNvbnN0IFN0eWxlZE1hcENvbnRhaW5lciA9IHN0eWxlZC5kaXZgXG4gIC5tYXBib3hnbC1tYXAgLm1hcGJveGdsLW1pc3NpbmctY3NzIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkRXhwb3J0U2VjdGlvbiA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG1hcmdpbjogMzVweCAwO1xuICB3aWR0aDogMTAwJTtcblxuICAuZGVzY3JpcHRpb24ge1xuICAgIHdpZHRoOiAxODVweDtcblxuICAgIC50aXRsZSB7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgIH1cbiAgICAuc3VidGl0bGUge1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICB9XG4gIH1cblxuICAuc2VsZWN0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBmbGV4OiAxO1xuICAgIHBhZGRpbmctbGVmdDogNTBweDtcblxuICAgIHNlbGVjdCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGZvbnQ6IGluaGVyaXQ7XG4gICAgICBsaW5lLWhlaWdodDogMS41ZW07XG4gICAgICBwYWRkaW5nOiAwLjVlbSAzLjVlbSAwLjVlbSAxZW07XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgIHdpZHRoOiAyNTBweDtcbiAgICAgIGhlaWdodDogMzZweDtcblxuICAgICAgYmFja2dyb3VuZC1pbWFnZTpcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCA1MCUsIGdyYXkgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgZ3JheSA1MCUsIHRyYW5zcGFyZW50IDUwJSksXG4gICAgICAgIGxpbmVhci1ncmFkaWVudCh0byByaWdodCwgI2NjYywgI2NjYyk7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOlxuICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSBjYWxjKDFlbSArIDJweCksXG4gICAgICAgIGNhbGMoMTAwJSAtIDE1cHgpIGNhbGMoMWVtICsgMnB4KSxcbiAgICAgICAgY2FsYygxMDAlIC0gMi41ZW0pIDQuNWVtO1xuICAgICAgYmFja2dyb3VuZC1zaXplOlxuICAgICAgICA1cHggNXB4LFxuICAgICAgICA1cHggNXB4LFxuICAgICAgICAxcHggMS41ZW07XG4gICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgIH1cblxuICAgIHNlbGVjdDpmb2N1cyB7XG4gICAgICBiYWNrZ3JvdW5kLWltYWdlOlxuICAgICAgICBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIGdyZWVuIDUwJSwgdHJhbnNwYXJlbnQgNTAlKSxcbiAgICAgICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdHJhbnNwYXJlbnQgNTAlLCBncmVlbiA1MCUpLFxuICAgICAgICBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICNjY2MsICNjY2MpO1xuICAgICAgYmFja2dyb3VuZC1wb3NpdGlvbjpcbiAgICAgICAgY2FsYygxMDAlIC0gMTVweCkgMWVtLFxuICAgICAgICBjYWxjKDEwMCUgLSAyMHB4KSAxZW0sXG4gICAgICAgIGNhbGMoMTAwJSAtIDIuNWVtKSA0LjVlbTtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTpcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgNXB4IDVweCxcbiAgICAgICAgMXB4IDEuNWVtO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgIGJvcmRlci1jb2xvcjogZ3JlZW47XG4gICAgICBvdXRsaW5lOiAwO1xuICAgIH1cbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEZpbHRlcmVkT3B0aW9uID0gc3R5bGVkLmRpdmBcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnNlbGVjdGVkID8gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZCA6IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogNjBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbjogNHB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgd2lkdGg6IDE0MHB4O1xuXG4gIDpob3ZlciB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgfVxuXG4gIC5maWx0ZXJlZC10aXRsZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG4gIC5maWx0ZXJlZC1zdWJ0aXRsZSB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yfTtcbiAgICBmb250LXNpemU6IDExcHg7XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRUeXBlID0gc3R5bGVkLmRpdmBcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnNlbGVjdGVkID8gcHJvcHMudGhlbWUucHJpbWFyeUJ0bkJnZCA6IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5zZWxlY3RlZCA/IHByb3BzLnRoZW1lLnByaW1hcnlCdG5CZ2QgOiBwcm9wcy50aGVtZS5zZWxlY3RCb3JkZXJDb2xvckxUfTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250LXdlaWdodDogNTAwO1xuICBoZWlnaHQ6IDEwMHB4O1xuICBtYXJnaW46IDRweDtcbiAgcGFkZGluZzogNnB4IDEwcHg7XG4gIHdpZHRoOiAxMDBweDtcblxuICA6aG92ZXIge1xuICAgIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLmF2YWlsYWJsZSAmJiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLmF2YWlsYWJsZSAmJiBwcm9wcy50aGVtZS5wcmltYXJ5QnRuQmdkfTtcbiAgfVxuYDtcbiJdfQ==