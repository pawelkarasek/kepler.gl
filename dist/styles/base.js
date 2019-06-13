"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkboxHeight = exports.checkboxWidth = exports.secondarySwitchBtnBgd = exports.secondarySwitchTrackBgd = exports.switchBtnHeight = exports.switchBtnWidth = exports.switchBtnBorderRadius = exports.switchBtnBoxShadow = exports.switchBtnBgdActive = exports.switchBtnBgd = exports.switchTrackBorderRadius = exports.switchTrackBgdActive = exports.switchTrackBgd = exports.switchLabelMargin = exports.switchHeight = exports.switchWidth = exports.dropdownListBorderTop = exports.dropdownListBgd = exports.dropdownListShadow = exports.dropdownListHighlightBg = exports.selectBorder = exports.selectBorderRadius = exports.selectBorderColorLT = exports.selectBorderColor = exports.selectBackgroundHoverLT = exports.selectBackgroundLT = exports.selectBackgroundHover = exports.selectBackground = exports.selectColorPlaceHolder = exports.selectFontWeightBold = exports.selectFontWeight = exports.selectFontSize = exports.selectActiveBorderColor = exports.selectColorLT = exports.selectColor = exports.secondaryInputBorderActiveColor = exports.secondaryInputBorderColor = exports.secondaryInputColor = exports.secondaryInputBgdActive = exports.secondaryInputBgdHover = exports.secondaryInputBgd = exports.secondaryInputHeight = exports.inputPlaceholderFontWeight = exports.inputPlaceholderColor = exports.inputBorderRadius = exports.inputColor = exports.inputBorderActiveColor = exports.inputBorderHoverColor = exports.inputBorderColor = exports.inputBgdActive = exports.inputBgdHover = exports.inputBgd = exports.inputFontWeight = exports.inputFontSize = exports.inputPadding = exports.inputBoxHeight = exports.negativeBtnActColor = exports.negativeBtnColor = exports.negativeBtnBgdHover = exports.negativeBtnActBgd = exports.negativeBtnBgd = exports.linkBtnActBgdHover = exports.linkBtnActColor = exports.linkBtnColor = exports.linkBtnActBgd = exports.linkBtnBgd = exports.secondaryBtnBgdHover = exports.secondaryBtnActColor = exports.secondaryBtnColor = exports.secondaryBtnActBgd = exports.secondaryBtnBgd = exports.primaryBtnRadius = exports.primaryBtnBgdHover = exports.primaryBtnActColor = exports.primaryBtnColor = exports.primaryBtnActBgd = exports.primaryBtnBgd = exports.errorColor = exports.activeColorHover = exports.activeColor = exports.textColorHlLT = exports.textColorHl = exports.titleTextColor = exports.subtextColorActive = exports.subtextColorLT = exports.subtextColor = exports.titleColorLT = exports.textColorLT = exports.textColor = exports.labelColorLT = exports.labelHoverColor = exports.labelColor = exports.borderColorLight = exports.borderColor = exports.borderRadius = exports.boxSizing = exports.boxShadow = exports.transitionSlow = exports.transitionFast = exports.transition = void 0;
exports.themeLT = exports.theme = exports.modalScrollBar = exports.breakPoints = exports.textTruncate = exports.notificationPanelItemHeight = exports.notificationPanelItemWidth = exports.notificationPanelWidth = exports.notificationColors = exports.rangeBrushBgd = exports.sliderInputWidth = exports.sliderInputHeight = exports.sliderHandleShadow = exports.sliderHandleHoverColor = exports.sliderHandleColor = exports.sliderHandleWidth = exports.sliderHandleHeight = exports.sliderBarHeight = exports.sliderBarRadius = exports.sliderBarHoverColor = exports.sliderBarBgd = exports.sliderBarColor = exports.modalDialogColor = exports.modalDialogBgd = exports.modalPortableLateralPadding = exports.modalLateralPadding = exports.modalPadding = exports.modalImagePlaceHolder = exports.modalFooterBgd = exports.modalTitleFontSizeSmaller = exports.modalTitleFontSize = exports.modalTitleColor = exports.tooltipColor = exports.tooltipBg = exports.mapPanelHeaderBackgroundColor = exports.mapPanelBackgroundColor = exports.panelBorderLT = exports.panelBorder = exports.panelBorderColor = exports.panelBackgroundLT = exports.panelBorderRadius = exports.panelBoxShadow = exports.panelHeaderHeight = exports.panelHeaderIconActive = exports.panelHeaderIcon = exports.panelActiveBgLT = exports.panelActiveBg = exports.panelBackgroundHover = exports.panelBackground = exports.sideBarCloseBtnBgdHover = exports.sideBarCloseBtnColor = exports.sideBarCloseBtnBgd = exports.sidePanelBg = exports.sidePanelHeaderBg = exports.checkboxBoxBgdChecked = exports.checkboxBoxBgd = exports.checkboxBorderColorLT = exports.checkboxBorderRadius = exports.checkboxBorderColor = exports.checkboxMargin = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _styledComponents = require("styled-components");

var _defaultSettings = require("../constants/default-settings");

function _templateObject24() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ::-webkit-scrollbar {\n    width: 14px;\n    height: 16px;\n  }\n\n  ::-webkit-scrollbar-track {\n    background: white;\n  }\n  ::-webkit-scrollbar-track:horizontal {\n    background: ", ";\n  }\n  ::-webkit-scrollbar-thumb {\n    background: ", ";\n    border: 4px solid white;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb:hover {\n    background: #969da9;\n  }\n\n  ::-webkit-scrollbar-thumb:vertical {\n    border-radius: 7px;\n  }\n\n  ::-webkit-scrollbar-thumb:horizontal {\n    border-radius: 9px;\n    border: 4px solid ", ";\n  }\n"]);

  _templateObject24 = function _templateObject24() {
    return data;
  };

  return data;
}

function _templateObject23() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", "\n\n    :vertical:hover {\n      background: ", ";\n      cursor: pointer;\n    }\n\n    :horizontal:hover {\n      background: ", ";\n      cursor: pointer;\n    }\n  }\n}"]);

  _templateObject23 = function _templateObject23() {
    return data;
  };

  return data;
}

function _templateObject22() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", ";\n    :hover {\n      background: ", ";\n      cursor: pointer;\n    }\n  };\n"]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", ";\n\n    :hover {\n      background: ", ";\n      cursor: pointer;\n    }\n  };\n}"]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  overflow-y: auto;\n  max-height: 280px;\n  box-shadow: ", ";\n  border-radius: 2px;\n\n  .list__section {\n    ", ";\n  }\n  .list__header {\n    ", ";\n  }\n\n  .list__item {\n    ", ";\n  }\n\n  .list__item__anchor {\n    ", ";\n  }\n\n  ", ";\n"]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  padding: 0 0 4px 0;\n  margin-bottom: 4px;\n  border-bottom: 1px solid ", ";\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 11px;\n  padding: 5px 9px;\n  color: ", ";\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  font-size: 11px;\n  padding: 3px 9px;\n  font-weight: 500;\n\n  &.hover,\n  &:hover {\n    cursor: pointer;\n    background-color: ", ";\n\n    .list__item__anchor {\n      color: ", ";\n    }\n  }\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  color: ", ";\n  padding-left: 3px;\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ::-webkit-scrollbar {\n    height: 10px;\n    width: 10px;\n  }\n\n  ::-webkit-scrollbar-corner {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-track {\n    background: ", ";\n  }\n\n  ::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: ", ";\n    border: 3px solid ", ";\n  };\n\n  :vertical:hover {\n    background: ", ";\n    cursor: pointer;\n  }\n}"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  :before {\n    ", " background: ", ";\n  }\n\n  :after {\n    ", "\n    background: ", ";\n  }\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: inline-block;\n  position: relative;\n  padding-left: 32px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  vertical-align: middle;\n  cursor: pointer;\n  font-size: 12px;\n  color: ", ";\n  margin-left: -", "px;\n\n  :before {\n     ", ";\n  }\n\n  :after {\n    ", ";\n  }\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  width: 10px;\n  height: 5px;\n  border-bottom: 2px solid white;\n  border-left: 2px solid white;\n  top: 4px;\n  left: 3px;\n  transform: rotate(-45deg);\n  display: block;\n  position: absolute;\n  opacity: ", ";\n  content: \"\";\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: ", "px;\n  height: ", "px;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 2px;\n  content: '';\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  user-select: none;\n  cursor: pointer;\n  line-height: 0;\n  font-weight: 500;\n  font-size: 12px;\n  color: ", ";\n  position: relative;\n  display: inline-block;\n  padding-top: ", "px;\n  padding-right: 0;\n  padding-bottom: 0;\n  padding-left: ", "px;\n\n  :before {\n    ", ";\n  }\n\n  :after {\n    ", ";\n  }\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  transition: ", ";\n  position: absolute;\n  top: 0;\n  left: ", "px;\n  content: '';\n  display: block;\n  height: ", ";\n  width: ", ";\n  background: ", ";\n  box-shadow: ", ";\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  background: ", ";\n  position: absolute;\n  top: 0;\n  left: ", "px;\n  content: '';\n  display: block;\n  width: ", "px;\n  height: ", "px;\n  border-radius: ", ";\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", " color: ", ";\n  font-size: 13px;\n  letter-spacing: 0.43px;\n  line-height: 18px;\n  height: 24px;\n  font-weight: 400;\n  padding-left: 4px;\n  margin-left: -4px;\n  background-color: transparent;\n  border: 1px solid transparent;\n\n  :hover {\n    height: 24px;\n    cursor: text;\n    background-color: transparent;\n    border: 1px solid ", ";\n  }\n\n  :active,\n  .active,\n  :focus {\n    background-color: transparent;\n    border: 1px solid ", ";\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  cursor: pointer;\n  flex-wrap: wrap;\n  height: auto;\n  justify-content: start;\n  margin-bottom: 2px;\n  padding: 0px 7px 0px 4px;\n  white-space: normal;\n\n  .chickleted-input__placeholder {\n    line-height: 24px;\n    margin: 4px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n  color: ", ";\n  background-color: ", ";\n  height: ", ";\n  border: 1px solid\n    ", ";\n\n  :hover {\n    cursor: pointer;\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  :active,\n  &.active {\n    background-color: ", ";\n    border-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  ", "\n\n  background-color: ", ";\n  border: 1px solid\n  ", ";\n  color: ", ";\n  caret-color: ", ";\n\n  ::-webkit-input-placeholder {\n    color: ", ";\n    font-weight: 400;\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  :hover {\n    background-color: ", ";\n    cursor: ", ";\n    border-color: ", ";\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2["default"])(["\n  align-items: center;\n  background-color: ", ";\n  border: 1px solid\n    ", ";\n  border-radius: 2px;\n  caret-color: ", ";\n  color: ", ";\n  display: flex;\n  font-size: ", ";\n  font-weight: ", ";\n  height: ", ";\n  justify-content: space-between;\n  outline: none;\n  overflow: hidden;\n  padding: ", ";\n  text-overflow: ellipsis;\n  transition: ", ";\n  white-space: nowrap;\n  width: 100%;\n  word-wrap: normal;\n  pointer-events: ", ";\n  opacity: ", ";\n\n  :hover {\n    cursor: ", ";\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  :active,\n  :focus,\n  &.focus,\n  &.active {\n    background-color: ", ";\n    border-color: ", ";\n  }\n\n  ::placeholder {\n    color: ", ";\n    font-weight: ", ";\n  }\n\n  /* Disable Arrows on Number Inputs */\n  ::-webkit-inner-spin-button,\n  ::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var transition = 'all .4s ease';
exports.transition = transition;
var transitionFast = 'all .2s ease';
exports.transitionFast = transitionFast;
var transitionSlow = 'all .8s ease';
exports.transitionSlow = transitionSlow;
var boxShadow = '0 1px 2px 0 rgba(0,0,0,0.10)';
exports.boxShadow = boxShadow;
var boxSizing = 'border-box';
exports.boxSizing = boxSizing;
var borderRadius = '1px';
exports.borderRadius = borderRadius;
var borderColor = '#3A414C';
exports.borderColor = borderColor;
var borderColorLight = '#F1F1F1'; // TEXT

exports.borderColorLight = borderColorLight;
var labelColor = '#6A7485';
exports.labelColor = labelColor;
var labelHoverColor = '#C6C6C6';
exports.labelHoverColor = labelHoverColor;
var labelColorLT = '#6A7485';
exports.labelColorLT = labelColorLT;
var textColor = '#A0A7B4';
exports.textColor = textColor;
var textColorLT = '#3A414C';
exports.textColorLT = textColorLT;
var titleColorLT = '#29323C';
exports.titleColorLT = titleColorLT;
var subtextColor = '#6A7485';
exports.subtextColor = subtextColor;
var subtextColorLT = '#A0A7B4';
exports.subtextColorLT = subtextColorLT;
var subtextColorActive = '#FFFFFF';
exports.subtextColorActive = subtextColorActive;
var titleTextColor = '#FFFFFF';
exports.titleTextColor = titleTextColor;
var textColorHl = '#D3D8E0';
exports.textColorHl = textColorHl;
var textColorHlLT = '#F1F1F1';
exports.textColorHlLT = textColorHlLT;
var activeColor = '#1FBAD6';
exports.activeColor = activeColor;
var activeColorHover = '#108188';
exports.activeColorHover = activeColorHover;
var errorColor = '#F9042C'; // Button

exports.errorColor = errorColor;
var primaryBtnBgd = '#0F9668';
exports.primaryBtnBgd = primaryBtnBgd;
var primaryBtnActBgd = '#13B17B';
exports.primaryBtnActBgd = primaryBtnActBgd;
var primaryBtnColor = '#FFFFFF';
exports.primaryBtnColor = primaryBtnColor;
var primaryBtnActColor = '#FFFFFF';
exports.primaryBtnActColor = primaryBtnActColor;
var primaryBtnBgdHover = '#13B17B';
exports.primaryBtnBgdHover = primaryBtnBgdHover;
var primaryBtnRadius = '2px';
exports.primaryBtnRadius = primaryBtnRadius;
var secondaryBtnBgd = '#6A7485';
exports.secondaryBtnBgd = secondaryBtnBgd;
var secondaryBtnActBgd = '#A0A7B4';
exports.secondaryBtnActBgd = secondaryBtnActBgd;
var secondaryBtnColor = '#FFFFFF';
exports.secondaryBtnColor = secondaryBtnColor;
var secondaryBtnActColor = '#FFFFFF';
exports.secondaryBtnActColor = secondaryBtnActColor;
var secondaryBtnBgdHover = '#A0A7B4';
exports.secondaryBtnBgdHover = secondaryBtnBgdHover;
var linkBtnBgd = 'transparent';
exports.linkBtnBgd = linkBtnBgd;
var linkBtnActBgd = linkBtnBgd;
exports.linkBtnActBgd = linkBtnActBgd;
var linkBtnColor = '#A0A7B4';
exports.linkBtnColor = linkBtnColor;
var linkBtnActColor = textColorHlLT;
exports.linkBtnActColor = linkBtnActColor;
var linkBtnActBgdHover = linkBtnBgd;
exports.linkBtnActBgdHover = linkBtnActBgdHover;
var negativeBtnBgd = errorColor;
exports.negativeBtnBgd = negativeBtnBgd;
var negativeBtnActBgd = '#FF193E';
exports.negativeBtnActBgd = negativeBtnActBgd;
var negativeBtnBgdHover = '#FF193E';
exports.negativeBtnBgdHover = negativeBtnBgdHover;
var negativeBtnColor = '#FFFFFF';
exports.negativeBtnColor = negativeBtnColor;
var negativeBtnActColor = '#FFFFFF'; // Input

exports.negativeBtnActColor = negativeBtnActColor;
var inputBoxHeight = '34px';
exports.inputBoxHeight = inputBoxHeight;
var inputPadding = '4px 10px';
exports.inputPadding = inputPadding;
var inputFontSize = '11px';
exports.inputFontSize = inputFontSize;
var inputFontWeight = 500;
exports.inputFontWeight = inputFontWeight;
var inputBgd = '#29323C';
exports.inputBgd = inputBgd;
var inputBgdHover = '#3A414C';
exports.inputBgdHover = inputBgdHover;
var inputBgdActive = '#3A414C';
exports.inputBgdActive = inputBgdActive;
var inputBorderColor = '#29323C';
exports.inputBorderColor = inputBorderColor;
var inputBorderHoverColor = '#3A414C';
exports.inputBorderHoverColor = inputBorderHoverColor;
var inputBorderActiveColor = '#D3D8E0';
exports.inputBorderActiveColor = inputBorderActiveColor;
var inputColor = '#A0A7B4';
exports.inputColor = inputColor;
var inputBorderRadius = '1px';
exports.inputBorderRadius = inputBorderRadius;
var inputPlaceholderColor = '#6A7485';
exports.inputPlaceholderColor = inputPlaceholderColor;
var inputPlaceholderFontWeight = 400;
exports.inputPlaceholderFontWeight = inputPlaceholderFontWeight;
var secondaryInputHeight = '28px';
exports.secondaryInputHeight = secondaryInputHeight;
var secondaryInputBgd = '#242730';
exports.secondaryInputBgd = secondaryInputBgd;
var secondaryInputBgdHover = '#3A414C';
exports.secondaryInputBgdHover = secondaryInputBgdHover;
var secondaryInputBgdActive = '#3A414C';
exports.secondaryInputBgdActive = secondaryInputBgdActive;
var secondaryInputColor = '#A0A7B4';
exports.secondaryInputColor = secondaryInputColor;
var secondaryInputBorderColor = '#242730';
exports.secondaryInputBorderColor = secondaryInputBorderColor;
var secondaryInputBorderActiveColor = '#D3D8E0'; // Select

exports.secondaryInputBorderActiveColor = secondaryInputBorderActiveColor;
var selectColor = inputColor;
exports.selectColor = selectColor;
var selectColorLT = titleColorLT;
exports.selectColorLT = selectColorLT;
var selectActiveBorderColor = '#D3D8E0';
exports.selectActiveBorderColor = selectActiveBorderColor;
var selectFontSize = '11px';
exports.selectFontSize = selectFontSize;
var selectFontWeight = '400';
exports.selectFontWeight = selectFontWeight;
var selectFontWeightBold = '500';
exports.selectFontWeightBold = selectFontWeightBold;
var selectColorPlaceHolder = '#6A7485';
exports.selectColorPlaceHolder = selectColorPlaceHolder;
var selectBackground = inputBgd;
exports.selectBackground = selectBackground;
var selectBackgroundHover = inputBgdHover;
exports.selectBackgroundHover = selectBackgroundHover;
var selectBackgroundLT = '#FFFFFF';
exports.selectBackgroundLT = selectBackgroundLT;
var selectBackgroundHoverLT = '#F8F8F9';
exports.selectBackgroundHoverLT = selectBackgroundHoverLT;
var selectBorderColor = '#D3D8E0';
exports.selectBorderColor = selectBorderColor;
var selectBorderColorLT = '#D3D8E0';
exports.selectBorderColorLT = selectBorderColorLT;
var selectBorderRadius = '1px';
exports.selectBorderRadius = selectBorderRadius;
var selectBorder = 0;
exports.selectBorder = selectBorder;
var dropdownListHighlightBg = '#6A7485';
exports.dropdownListHighlightBg = dropdownListHighlightBg;
var dropdownListShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
exports.dropdownListShadow = dropdownListShadow;
var dropdownListBgd = '#3A414C';
exports.dropdownListBgd = dropdownListBgd;
var dropdownListBorderTop = '#242730'; // Switch

exports.dropdownListBorderTop = dropdownListBorderTop;
var switchWidth = 24;
exports.switchWidth = switchWidth;
var switchHeight = 12;
exports.switchHeight = switchHeight;
var switchLabelMargin = 12;
exports.switchLabelMargin = switchLabelMargin;
var switchTrackBgd = '#29323C';
exports.switchTrackBgd = switchTrackBgd;
var switchTrackBgdActive = activeColor;
exports.switchTrackBgdActive = switchTrackBgdActive;
var switchTrackBorderRadius = '1px';
exports.switchTrackBorderRadius = switchTrackBorderRadius;
var switchBtnBgd = '#6A7485';
exports.switchBtnBgd = switchBtnBgd;
var switchBtnBgdActive = '#D3D8E0';
exports.switchBtnBgdActive = switchBtnBgdActive;
var switchBtnBoxShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';
exports.switchBtnBoxShadow = switchBtnBoxShadow;
var switchBtnBorderRadius = '1px';
exports.switchBtnBorderRadius = switchBtnBorderRadius;
var switchBtnWidth = '12px';
exports.switchBtnWidth = switchBtnWidth;
var switchBtnHeight = '12px';
exports.switchBtnHeight = switchBtnHeight;
var secondarySwitchTrackBgd = '#242730';
exports.secondarySwitchTrackBgd = secondarySwitchTrackBgd;
var secondarySwitchBtnBgd = '#3A414C'; // Checkbox

exports.secondarySwitchBtnBgd = secondarySwitchBtnBgd;
var checkboxWidth = 16;
exports.checkboxWidth = checkboxWidth;
var checkboxHeight = 16;
exports.checkboxHeight = checkboxHeight;
var checkboxMargin = 12;
exports.checkboxMargin = checkboxMargin;
var checkboxBorderColor = selectBorderColor;
exports.checkboxBorderColor = checkboxBorderColor;
var checkboxBorderRadius = '2px';
exports.checkboxBorderRadius = checkboxBorderRadius;
var checkboxBorderColorLT = selectBorderColorLT;
exports.checkboxBorderColorLT = checkboxBorderColorLT;
var checkboxBoxBgd = 'white';
exports.checkboxBoxBgd = checkboxBoxBgd;
var checkboxBoxBgdChecked = primaryBtnBgd; // Side Panel

exports.checkboxBoxBgdChecked = checkboxBoxBgdChecked;
var sidePanelHeaderBg = '#29323C';
exports.sidePanelHeaderBg = sidePanelHeaderBg;
var sidePanelBg = '#242730';
exports.sidePanelBg = sidePanelBg;
var sideBarCloseBtnBgd = secondaryBtnBgd;
exports.sideBarCloseBtnBgd = sideBarCloseBtnBgd;
var sideBarCloseBtnColor = '#29323C';
exports.sideBarCloseBtnColor = sideBarCloseBtnColor;
var sideBarCloseBtnBgdHover = secondaryBtnActBgd;
exports.sideBarCloseBtnBgdHover = sideBarCloseBtnBgdHover;
var panelBackground = '#29323C';
exports.panelBackground = panelBackground;
var panelBackgroundHover = '#3A4552';
exports.panelBackgroundHover = panelBackgroundHover;
var panelActiveBg = '#3A4552';
exports.panelActiveBg = panelActiveBg;
var panelActiveBgLT = '#6A7485';
exports.panelActiveBgLT = panelActiveBgLT;
var panelHeaderIcon = '#6A7485';
exports.panelHeaderIcon = panelHeaderIcon;
var panelHeaderIconActive = '#A0A7B4';
exports.panelHeaderIconActive = panelHeaderIconActive;
var panelHeaderHeight = 48;
exports.panelHeaderHeight = panelHeaderHeight;
var panelBoxShadow = '0 6px 12px 0 rgba(0,0,0,0.16)';
exports.panelBoxShadow = panelBoxShadow;
var panelBorderRadius = '2px';
exports.panelBorderRadius = panelBorderRadius;
var panelBackgroundLT = '#f8f8f9';
exports.panelBackgroundLT = panelBackgroundLT;
var panelBorderColor = '#3A414C';
exports.panelBorderColor = panelBorderColor;
var panelBorder = "1px solid ".concat(borderColor);
exports.panelBorder = panelBorder;
var panelBorderLT = "1px solid ".concat(borderColorLight);
exports.panelBorderLT = panelBorderLT;
var mapPanelBackgroundColor = '#242730';
exports.mapPanelBackgroundColor = mapPanelBackgroundColor;
var mapPanelHeaderBackgroundColor = '#29323C';
exports.mapPanelHeaderBackgroundColor = mapPanelHeaderBackgroundColor;
var tooltipBg = '#F8F8F9';
exports.tooltipBg = tooltipBg;
var tooltipColor = '#333334'; // Modal

exports.tooltipColor = tooltipColor;
var modalTitleColor = '#3A414C';
exports.modalTitleColor = modalTitleColor;
var modalTitleFontSize = '24px';
exports.modalTitleFontSize = modalTitleFontSize;
var modalTitleFontSizeSmaller = '18px';
exports.modalTitleFontSizeSmaller = modalTitleFontSizeSmaller;
var modalFooterBgd = '#F8F8F9';
exports.modalFooterBgd = modalFooterBgd;
var modalImagePlaceHolder = '#DDDFE3';
exports.modalImagePlaceHolder = modalImagePlaceHolder;
var modalPadding = '10px 0';
exports.modalPadding = modalPadding;
var modalLateralPadding = '72px';
exports.modalLateralPadding = modalLateralPadding;
var modalPortableLateralPadding = '36px'; // Modal Dialog (Dark)

exports.modalPortableLateralPadding = modalPortableLateralPadding;
var modalDialogBgd = '#3A414C';
exports.modalDialogBgd = modalDialogBgd;
var modalDialogColor = textColorHl; // Slider

exports.modalDialogColor = modalDialogColor;
var sliderBarColor = '#6A7485';
exports.sliderBarColor = sliderBarColor;
var sliderBarBgd = '#3A414C';
exports.sliderBarBgd = sliderBarBgd;
var sliderBarHoverColor = '#D3D8E0';
exports.sliderBarHoverColor = sliderBarHoverColor;
var sliderBarRadius = '1px';
exports.sliderBarRadius = sliderBarRadius;
var sliderBarHeight = 4;
exports.sliderBarHeight = sliderBarHeight;
var sliderHandleHeight = 12;
exports.sliderHandleHeight = sliderHandleHeight;
var sliderHandleWidth = 12;
exports.sliderHandleWidth = sliderHandleWidth;
var sliderHandleColor = '#D3D8E0';
exports.sliderHandleColor = sliderHandleColor;
var sliderHandleHoverColor = '#FFFFFF';
exports.sliderHandleHoverColor = sliderHandleHoverColor;
var sliderHandleShadow = '0 2px 4px 0 rgba(0,0,0,0.40)';
exports.sliderHandleShadow = sliderHandleShadow;
var sliderInputHeight = 24;
exports.sliderInputHeight = sliderInputHeight;
var sliderInputWidth = 50; // Plot

exports.sliderInputWidth = sliderInputWidth;
var rangeBrushBgd = '#3A414C'; // Notification

exports.rangeBrushBgd = rangeBrushBgd;
var notificationColors = {
  info: '#276ef1',
  error: '#f25138',
  success: '#47b275',
  warning: '#ffc043'
};
exports.notificationColors = notificationColors;
var notificationPanelWidth = 240;
exports.notificationPanelWidth = notificationPanelWidth;
var notificationPanelItemWidth = notificationPanelWidth - 60;
exports.notificationPanelItemWidth = notificationPanelItemWidth;
var notificationPanelItemHeight = 60;
exports.notificationPanelItemHeight = notificationPanelItemHeight;
var textTruncate = {
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  wordWrap: 'normal'
}; // This breakpoints are used for responsive design

exports.textTruncate = textTruncate;
var breakPoints = {
  palm: 588,
  desk: 768
}; // theme is passed to kepler.gl when it's mounted,
// it is used by styled-components to pass along to
// all child components

exports.breakPoints = breakPoints;
var input = (0, _styledComponents.css)(_templateObject(), function (props) {
  return props.theme.inputBgd;
}, function (props) {
  return props.active ? props.theme.inputBorderActiveColor : props.error ? props.theme.errorColor : props.theme.inputBgd;
}, function (props) {
  return props.theme.inputBorderActiveColor;
}, function (props) {
  return props.theme.inputColor;
}, function (props) {
  return props.theme.inputFontSize;
}, function (props) {
  return props.theme.inputFontWeight;
}, function (props) {
  return props.theme.inputBoxHeight;
}, function (props) {
  return props.theme.inputPadding;
}, function (props) {
  return props.theme.transition;
}, function (props) {
  return props.disabled ? 'none' : 'all';
}, function (props) {
  return props.disabled ? 0.5 : 1;
}, function (props) {
  return props.type === 'number' ? 'text' : 'pointer';
}, function (props) {
  return props.active ? props.theme.inputBgdActive : props.theme.inputBgdHover;
}, function (props) {
  return props.active ? props.theme.inputBorderActiveColor : props.theme.inputBorderHoverColor;
}, function (props) {
  return props.theme.inputBgdActive;
}, function (props) {
  return props.theme.inputBorderActiveColor;
}, function (props) {
  return props.theme.inputPlaceholderColor;
}, function (props) {
  return props.theme.inputPlaceholderFontWeight;
});
var inputLT = (0, _styledComponents.css)(_templateObject2(), input, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return props.active ? props.theme.selectActiveBorderColor : props.error ? props.theme.errorColor : props.theme.selectBorderColorLT;
}, function (props) {
  return props.theme.selectColorLT;
}, function (props) {
  return props.theme.selectColorLT;
}, function (props) {
  return props.theme.subtextColorLT;
}, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return props.theme.textColorLT;
}, function (props) {
  return props.theme.selectBackgroundLT;
}, function (props) {
  return ['number', 'text'].includes(props.type) ? 'text' : 'pointer';
}, function (props) {
  return props.active ? props.theme.textColorLT : props.theme.subtextColor;
});
var secondaryInput = (0, _styledComponents.css)(_templateObject3(), function (props) {
  return props.theme.input;
}, function (props) {
  return props.theme.secondaryInputColor;
}, function (props) {
  return props.theme.secondaryInputBgd;
}, function (props) {
  return props.theme.secondaryInputHeight;
}, function (props) {
  return props.error ? props.theme.errorColor : props.theme.secondaryInputBorderColor;
}, function (props) {
  return props.theme.secondaryInputBgdHover;
}, function (props) {
  return props.theme.secondaryInputBgdHover;
}, function (props) {
  return props.theme.secondaryInputBgdActive;
}, function (props) {
  return props.theme.secondaryInputBorderActiveColor;
});
var chickletedInputContainer = (0, _styledComponents.css)(_templateObject4());
var chickletedInput = (0, _styledComponents.css)(_templateObject5(), function (props) {
  return props.theme.input;
}, function (props) {
  return props.theme.chickletedInputContainer;
});
var secondaryChickletedInput = (0, _styledComponents.css)(_templateObject6(), function (props) {
  return props.theme.secondaryInput;
}, function (props) {
  return props.theme.chickletedInputContainer;
});
var inlineInput = (0, _styledComponents.css)(_templateObject7(), function (props) {
  return props.theme.input;
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.inputBorderActiveColor;
});
var switchTrack = (0, _styledComponents.css)(_templateObject8(), function (props) {
  return props.checked ? props.theme.switchTrackBgdActive : props.theme.switchTrackBgd;
}, function (props) {
  return -props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.switchWidth;
}, function (props) {
  return props.theme.switchHeight;
}, function (props) {
  return props.theme.switchTrackBorderRadius;
});
var switchButton = (0, _styledComponents.css)(_templateObject9(), function (props) {
  return props.theme.transition;
}, function (props) {
  return (props.checked ? props.theme.switchWidth / 2 : -1) - props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.switchBtnHeight;
}, function (props) {
  return props.theme.switchBtnWidth;
}, function (props) {
  return props.checked ? props.theme.switchBtnBgdActive : props.theme.switchBtnBgd;
}, function (props) {
  return props.theme.switchBtnBoxShadow;
});
var inputSwitch = (0, _styledComponents.css)(_templateObject10(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.switchHeight / 2;
}, function (props) {
  return props.theme.switchWidth;
}, function (props) {
  return props.theme.switchTrack;
}, function (props) {
  return props.theme.switchButton;
}); // This is a light version checkbox

var checkboxBox = (0, _styledComponents.css)(_templateObject11(), function (props) {
  return props.theme.checkboxWidth;
}, function (props) {
  return props.theme.checkboxHeight;
}, function (props) {
  return props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBoxBgd;
}, function (props) {
  return props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBorderColor;
});
var checkboxCheck = (0, _styledComponents.css)(_templateObject12(), function (props) {
  return props.checked ? 1 : 0;
});
var inputCheckbox = (0, _styledComponents.css)(_templateObject13(), function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.switchLabelMargin;
}, function (props) {
  return props.theme.checkboxBox;
}, function (props) {
  return props.theme.checkboxCheck;
});
var secondarySwitch = (0, _styledComponents.css)(_templateObject14(), function (props) {
  return props.theme.inputSwitch;
}, function (props) {
  return props.theme.switchTrack;
}, function (props) {
  return props.checked ? props.theme.switchTrackBgdActive : props.theme.secondarySwitchTrackBgd;
}, function (props) {
  return props.theme.switchButton;
}, function (props) {
  return props.checked ? props.theme.switchBtnBgdActive : props.theme.secondarySwitchBtnBgd;
});
var dropdownScrollBar = (0, _styledComponents.css)(_templateObject15(), function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.dropdownListBgd;
}, function (props) {
  return props.theme.textColorHl;
});
var dropdownListAnchor = (0, _styledComponents.css)(_templateObject16(), function (props) {
  return props.theme.selectColor;
});
var dropdownListItem = (0, _styledComponents.css)(_templateObject17(), function (props) {
  return props.theme.dropdownListHighlightBg;
}, function (props) {
  return props.theme.textColorHl;
});
var dropdownListHeader = (0, _styledComponents.css)(_templateObject18(), function (props) {
  return props.theme.labelColor;
});
var dropdownListSection = (0, _styledComponents.css)(_templateObject19(), function (props) {
  return props.theme.labelColor;
});
var dropdownList = (0, _styledComponents.css)(_templateObject20(), function (props) {
  return props.theme.dropdownListShadow;
}, function (props) {
  return props.theme.dropdownListSection;
}, function (props) {
  return props.theme.dropdownListHeader;
}, function (props) {
  return props.theme.dropdownListItem;
}, function (props) {
  return props.theme.dropdownListAnchor;
}, function (props) {
  return props.theme.dropdownScrollBar;
});
var sidePanelScrollBar = (0, _styledComponents.css)(_templateObject21(), function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.panelBackgroundHover;
}, function (props) {
  return props.theme.sidePanelBg;
}, function (props) {
  return props.theme.labelColor;
});
var panelDropdownScrollBar = (0, _styledComponents.css)(_templateObject22(), function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackgroundHover;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.labelColor;
});
var scrollBar = (0, _styledComponents.css)(_templateObject23(), function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.labelColor;
}, function (props) {
  return props.theme.panelBackground;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});
var modalScrollBar = (0, _styledComponents.css)(_templateObject24(), function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.labelColorLT;
}, function (props) {
  return props.theme.textColorHl;
}, function (props) {
  return props.theme.textColorHl;
});
exports.modalScrollBar = modalScrollBar;
var theme = (0, _objectSpread2["default"])({}, _defaultSettings.DIMENSIONS, {
  // templates
  input: input,
  inputLT: inputLT,
  inlineInput: inlineInput,
  chickletedInput: chickletedInput,
  chickletedInputContainer: chickletedInputContainer,
  secondaryChickletedInput: secondaryChickletedInput,
  secondaryInput: secondaryInput,
  dropdownScrollBar: dropdownScrollBar,
  dropdownList: dropdownList,
  dropdownListItem: dropdownListItem,
  dropdownListAnchor: dropdownListAnchor,
  dropdownListHeader: dropdownListHeader,
  dropdownListSection: dropdownListSection,
  dropdownListShadow: dropdownListShadow,
  modalScrollBar: modalScrollBar,
  scrollBar: scrollBar,
  sidePanelScrollBar: sidePanelScrollBar,
  inputSwitch: inputSwitch,
  secondarySwitch: secondarySwitch,
  switchTrack: switchTrack,
  switchButton: switchButton,
  inputCheckbox: inputCheckbox,
  checkboxBox: checkboxBox,
  checkboxCheck: checkboxCheck,
  // Transitions
  transition: transition,
  transitionFast: transitionFast,
  transitionSlow: transitionSlow,
  // styles
  activeColor: activeColor,
  activeColorHover: activeColorHover,
  borderRadius: borderRadius,
  boxShadow: boxShadow,
  errorColor: errorColor,
  dropdownListHighlightBg: dropdownListHighlightBg,
  dropdownListBgd: dropdownListBgd,
  dropdownListBorderTop: dropdownListBorderTop,
  labelColor: labelColor,
  labelColorLT: labelColorLT,
  labelHoverColor: labelHoverColor,
  mapPanelBackgroundColor: mapPanelBackgroundColor,
  mapPanelHeaderBackgroundColor: mapPanelHeaderBackgroundColor,
  // Select
  selectActiveBorderColor: selectActiveBorderColor,
  selectBackground: selectBackground,
  selectBackgroundLT: selectBackgroundLT,
  selectBackgroundHover: selectBackgroundHover,
  selectBackgroundHoverLT: selectBackgroundHoverLT,
  selectBorder: selectBorder,
  selectBorderColor: selectBorderColor,
  selectBorderRadius: selectBorderRadius,
  selectBorderColorLT: selectBorderColorLT,
  selectColor: selectColor,
  selectColorPlaceHolder: selectColorPlaceHolder,
  selectFontSize: selectFontSize,
  selectFontWeight: selectFontWeight,
  selectColorLT: selectColorLT,
  selectFontWeightBold: selectFontWeightBold,
  // Input
  inputBgd: inputBgd,
  inputBgdHover: inputBgdHover,
  inputBgdActive: inputBgdActive,
  inputBoxHeight: inputBoxHeight,
  inputBorderColor: inputBorderColor,
  inputBorderActiveColor: inputBorderActiveColor,
  inputBorderHoverColor: inputBorderHoverColor,
  inputBorderRadius: inputBorderRadius,
  inputColor: inputColor,
  inputPadding: inputPadding,
  inputFontSize: inputFontSize,
  inputFontWeight: inputFontWeight,
  inputPlaceholderColor: inputPlaceholderColor,
  inputPlaceholderFontWeight: inputPlaceholderFontWeight,
  secondaryInputBgd: secondaryInputBgd,
  secondaryInputBgdHover: secondaryInputBgdHover,
  secondaryInputBgdActive: secondaryInputBgdActive,
  secondaryInputHeight: secondaryInputHeight,
  secondaryInputColor: secondaryInputColor,
  secondaryInputBorderColor: secondaryInputBorderColor,
  secondaryInputBorderActiveColor: secondaryInputBorderActiveColor,
  // Switch
  switchWidth: switchWidth,
  switchHeight: switchHeight,
  switchTrackBgd: switchTrackBgd,
  switchTrackBgdActive: switchTrackBgdActive,
  switchTrackBorderRadius: switchTrackBorderRadius,
  switchBtnBgd: switchBtnBgd,
  switchBtnBgdActive: switchBtnBgdActive,
  switchBtnBoxShadow: switchBtnBoxShadow,
  switchBtnBorderRadius: switchBtnBorderRadius,
  switchBtnWidth: switchBtnWidth,
  switchBtnHeight: switchBtnHeight,
  switchLabelMargin: switchLabelMargin,
  secondarySwitchTrackBgd: secondarySwitchTrackBgd,
  secondarySwitchBtnBgd: secondarySwitchBtnBgd,
  // Checkbox
  checkboxWidth: checkboxWidth,
  checkboxHeight: checkboxHeight,
  checkboxMargin: checkboxMargin,
  checkboxBorderColor: checkboxBorderColor,
  checkboxBorderRadius: checkboxBorderRadius,
  checkboxBorderColorLT: checkboxBorderColorLT,
  checkboxBoxBgd: checkboxBoxBgd,
  checkboxBoxBgdChecked: checkboxBoxBgdChecked,
  // Button
  primaryBtnBgd: primaryBtnBgd,
  primaryBtnActBgd: primaryBtnActBgd,
  primaryBtnColor: primaryBtnColor,
  primaryBtnActColor: primaryBtnActColor,
  primaryBtnBgdHover: primaryBtnBgdHover,
  primaryBtnRadius: primaryBtnRadius,
  secondaryBtnBgd: secondaryBtnBgd,
  secondaryBtnActBgd: secondaryBtnActBgd,
  secondaryBtnBgdHover: secondaryBtnBgdHover,
  secondaryBtnColor: secondaryBtnColor,
  secondaryBtnActColor: secondaryBtnActColor,
  negativeBtnBgd: negativeBtnBgd,
  negativeBtnActBgd: negativeBtnActBgd,
  negativeBtnBgdHover: negativeBtnBgdHover,
  negativeBtnColor: negativeBtnColor,
  negativeBtnActColor: negativeBtnActColor,
  linkBtnBgd: linkBtnBgd,
  linkBtnActBgd: linkBtnActBgd,
  linkBtnColor: linkBtnColor,
  linkBtnActColor: linkBtnActColor,
  linkBtnActBgdHover: linkBtnActBgdHover,
  // Modal
  modalTitleColor: modalTitleColor,
  modalTitleFontSize: modalTitleFontSize,
  modalTitleFontSizeSmaller: modalTitleFontSizeSmaller,
  modalFooterBgd: modalFooterBgd,
  modalImagePlaceHolder: modalImagePlaceHolder,
  modalPadding: modalPadding,
  modalDialogBgd: modalDialogBgd,
  modalDialogColor: modalDialogColor,
  modalLateralPadding: modalLateralPadding,
  modalPortableLateralPadding: modalPortableLateralPadding,
  // Side Panel
  sidePanelBg: sidePanelBg,
  sideBarCloseBtnBgd: sideBarCloseBtnBgd,
  sideBarCloseBtnColor: sideBarCloseBtnColor,
  sideBarCloseBtnBgdHover: sideBarCloseBtnBgdHover,
  sidePanelHeaderBg: sidePanelHeaderBg,
  // Side Panel Panel
  panelActiveBg: panelActiveBg,
  panelBackground: panelBackground,
  panelBackgroundHover: panelBackgroundHover,
  panelBackgroundLT: panelBackgroundLT,
  panelBoxShadow: panelBoxShadow,
  panelBorderRadius: panelBorderRadius,
  panelBorder: panelBorder,
  panelBorderColor: panelBorderColor,
  panelBorderLT: panelBorderLT,
  panelHeaderIcon: panelHeaderIcon,
  panelHeaderIconActive: panelHeaderIconActive,
  panelHeaderHeight: panelHeaderHeight,
  panelDropdownScrollBar: panelDropdownScrollBar,
  // Text
  textColor: textColor,
  textColorLT: textColorLT,
  textColorHl: textColorHl,
  titleTextColor: titleTextColor,
  subtextColor: subtextColor,
  subtextColorLT: subtextColorLT,
  subtextColorActive: subtextColorActive,
  textTruncate: textTruncate,
  titleColorLT: titleColorLT,
  tooltipBg: tooltipBg,
  tooltipColor: tooltipColor,
  // Slider
  sliderBarColor: sliderBarColor,
  sliderBarBgd: sliderBarBgd,
  sliderBarHoverColor: sliderBarHoverColor,
  sliderBarRadius: sliderBarRadius,
  sliderBarHeight: sliderBarHeight,
  sliderHandleHeight: sliderHandleHeight,
  sliderHandleWidth: sliderHandleWidth,
  sliderHandleColor: sliderHandleColor,
  sliderHandleHoverColor: sliderHandleHoverColor,
  sliderHandleShadow: sliderHandleShadow,
  sliderInputHeight: sliderInputHeight,
  sliderInputWidth: sliderInputWidth,
  // Plot
  rangeBrushBgd: rangeBrushBgd,
  // Notifications
  notificationColors: notificationColors,
  notificationPanelWidth: notificationPanelWidth,
  notificationPanelItemWidth: notificationPanelItemWidth,
  notificationPanelItemHeight: notificationPanelItemHeight,
  // Breakpoints
  breakPoints: breakPoints
});
exports.theme = theme;
var themeLT = (0, _objectSpread2["default"])({}, theme, {
  // template
  input: inputLT,
  textColor: textColorLT,
  sidePanelBg: '#ffffff',
  titleTextColor: '#000000',
  sidePanelHeaderBg: '#f7f7F7',
  subtextColorActive: '#2473bd',
  tooltipBg: '#1869b5',
  tooltipColor: '#ffffff',
  dropdownListBgd: '#ffffff',
  textColorHl: '#2473bd',
  inputBgd: '#f7f7f7',
  inputBgdHover: '#ffffff',
  inputBgdActive: '#ffffff',
  dropdownListHighlightBg: '#f0f0f0',
  panelBackground: '#f7f7F7',
  panelBackgroundHover: '#f7f7F7',
  panelBorderColor: '#D3D8E0',
  secondaryInputBgd: '#f7f7F7',
  secondaryInputBgdActive: '#f7f7F7',
  secondaryInputBgdHover: '#ffffff',
  panelActiveBg: '#f7f7F7',
  mapPanelBackgroundColor: '#ffffff',
  mapPanelHeaderBackgroundColor: '#f7f7F7',
  sliderBarBgd: '#D3D8E0',
  secondarySwitchBtnBgd: '#D3D8E0',
  switchTrackBgd: '#D3D8E0'
});
exports.themeLT = themeLT;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdHlsZXMvYmFzZS5qcyJdLCJuYW1lcyI6WyJ0cmFuc2l0aW9uIiwidHJhbnNpdGlvbkZhc3QiLCJ0cmFuc2l0aW9uU2xvdyIsImJveFNoYWRvdyIsImJveFNpemluZyIsImJvcmRlclJhZGl1cyIsImJvcmRlckNvbG9yIiwiYm9yZGVyQ29sb3JMaWdodCIsImxhYmVsQ29sb3IiLCJsYWJlbEhvdmVyQ29sb3IiLCJsYWJlbENvbG9yTFQiLCJ0ZXh0Q29sb3IiLCJ0ZXh0Q29sb3JMVCIsInRpdGxlQ29sb3JMVCIsInN1YnRleHRDb2xvciIsInN1YnRleHRDb2xvckxUIiwic3VidGV4dENvbG9yQWN0aXZlIiwidGl0bGVUZXh0Q29sb3IiLCJ0ZXh0Q29sb3JIbCIsInRleHRDb2xvckhsTFQiLCJhY3RpdmVDb2xvciIsImFjdGl2ZUNvbG9ySG92ZXIiLCJlcnJvckNvbG9yIiwicHJpbWFyeUJ0bkJnZCIsInByaW1hcnlCdG5BY3RCZ2QiLCJwcmltYXJ5QnRuQ29sb3IiLCJwcmltYXJ5QnRuQWN0Q29sb3IiLCJwcmltYXJ5QnRuQmdkSG92ZXIiLCJwcmltYXJ5QnRuUmFkaXVzIiwic2Vjb25kYXJ5QnRuQmdkIiwic2Vjb25kYXJ5QnRuQWN0QmdkIiwic2Vjb25kYXJ5QnRuQ29sb3IiLCJzZWNvbmRhcnlCdG5BY3RDb2xvciIsInNlY29uZGFyeUJ0bkJnZEhvdmVyIiwibGlua0J0bkJnZCIsImxpbmtCdG5BY3RCZ2QiLCJsaW5rQnRuQ29sb3IiLCJsaW5rQnRuQWN0Q29sb3IiLCJsaW5rQnRuQWN0QmdkSG92ZXIiLCJuZWdhdGl2ZUJ0bkJnZCIsIm5lZ2F0aXZlQnRuQWN0QmdkIiwibmVnYXRpdmVCdG5CZ2RIb3ZlciIsIm5lZ2F0aXZlQnRuQ29sb3IiLCJuZWdhdGl2ZUJ0bkFjdENvbG9yIiwiaW5wdXRCb3hIZWlnaHQiLCJpbnB1dFBhZGRpbmciLCJpbnB1dEZvbnRTaXplIiwiaW5wdXRGb250V2VpZ2h0IiwiaW5wdXRCZ2QiLCJpbnB1dEJnZEhvdmVyIiwiaW5wdXRCZ2RBY3RpdmUiLCJpbnB1dEJvcmRlckNvbG9yIiwiaW5wdXRCb3JkZXJIb3ZlckNvbG9yIiwiaW5wdXRCb3JkZXJBY3RpdmVDb2xvciIsImlucHV0Q29sb3IiLCJpbnB1dEJvcmRlclJhZGl1cyIsImlucHV0UGxhY2Vob2xkZXJDb2xvciIsImlucHV0UGxhY2Vob2xkZXJGb250V2VpZ2h0Iiwic2Vjb25kYXJ5SW5wdXRIZWlnaHQiLCJzZWNvbmRhcnlJbnB1dEJnZCIsInNlY29uZGFyeUlucHV0QmdkSG92ZXIiLCJzZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZSIsInNlY29uZGFyeUlucHV0Q29sb3IiLCJzZWNvbmRhcnlJbnB1dEJvcmRlckNvbG9yIiwic2Vjb25kYXJ5SW5wdXRCb3JkZXJBY3RpdmVDb2xvciIsInNlbGVjdENvbG9yIiwic2VsZWN0Q29sb3JMVCIsInNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yIiwic2VsZWN0Rm9udFNpemUiLCJzZWxlY3RGb250V2VpZ2h0Iiwic2VsZWN0Rm9udFdlaWdodEJvbGQiLCJzZWxlY3RDb2xvclBsYWNlSG9sZGVyIiwic2VsZWN0QmFja2dyb3VuZCIsInNlbGVjdEJhY2tncm91bmRIb3ZlciIsInNlbGVjdEJhY2tncm91bmRMVCIsInNlbGVjdEJhY2tncm91bmRIb3ZlckxUIiwic2VsZWN0Qm9yZGVyQ29sb3IiLCJzZWxlY3RCb3JkZXJDb2xvckxUIiwic2VsZWN0Qm9yZGVyUmFkaXVzIiwic2VsZWN0Qm9yZGVyIiwiZHJvcGRvd25MaXN0SGlnaGxpZ2h0QmciLCJkcm9wZG93bkxpc3RTaGFkb3ciLCJkcm9wZG93bkxpc3RCZ2QiLCJkcm9wZG93bkxpc3RCb3JkZXJUb3AiLCJzd2l0Y2hXaWR0aCIsInN3aXRjaEhlaWdodCIsInN3aXRjaExhYmVsTWFyZ2luIiwic3dpdGNoVHJhY2tCZ2QiLCJzd2l0Y2hUcmFja0JnZEFjdGl2ZSIsInN3aXRjaFRyYWNrQm9yZGVyUmFkaXVzIiwic3dpdGNoQnRuQmdkIiwic3dpdGNoQnRuQmdkQWN0aXZlIiwic3dpdGNoQnRuQm94U2hhZG93Iiwic3dpdGNoQnRuQm9yZGVyUmFkaXVzIiwic3dpdGNoQnRuV2lkdGgiLCJzd2l0Y2hCdG5IZWlnaHQiLCJzZWNvbmRhcnlTd2l0Y2hUcmFja0JnZCIsInNlY29uZGFyeVN3aXRjaEJ0bkJnZCIsImNoZWNrYm94V2lkdGgiLCJjaGVja2JveEhlaWdodCIsImNoZWNrYm94TWFyZ2luIiwiY2hlY2tib3hCb3JkZXJDb2xvciIsImNoZWNrYm94Qm9yZGVyUmFkaXVzIiwiY2hlY2tib3hCb3JkZXJDb2xvckxUIiwiY2hlY2tib3hCb3hCZ2QiLCJjaGVja2JveEJveEJnZENoZWNrZWQiLCJzaWRlUGFuZWxIZWFkZXJCZyIsInNpZGVQYW5lbEJnIiwic2lkZUJhckNsb3NlQnRuQmdkIiwic2lkZUJhckNsb3NlQnRuQ29sb3IiLCJzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlciIsInBhbmVsQmFja2dyb3VuZCIsInBhbmVsQmFja2dyb3VuZEhvdmVyIiwicGFuZWxBY3RpdmVCZyIsInBhbmVsQWN0aXZlQmdMVCIsInBhbmVsSGVhZGVySWNvbiIsInBhbmVsSGVhZGVySWNvbkFjdGl2ZSIsInBhbmVsSGVhZGVySGVpZ2h0IiwicGFuZWxCb3hTaGFkb3ciLCJwYW5lbEJvcmRlclJhZGl1cyIsInBhbmVsQmFja2dyb3VuZExUIiwicGFuZWxCb3JkZXJDb2xvciIsInBhbmVsQm9yZGVyIiwicGFuZWxCb3JkZXJMVCIsIm1hcFBhbmVsQmFja2dyb3VuZENvbG9yIiwibWFwUGFuZWxIZWFkZXJCYWNrZ3JvdW5kQ29sb3IiLCJ0b29sdGlwQmciLCJ0b29sdGlwQ29sb3IiLCJtb2RhbFRpdGxlQ29sb3IiLCJtb2RhbFRpdGxlRm9udFNpemUiLCJtb2RhbFRpdGxlRm9udFNpemVTbWFsbGVyIiwibW9kYWxGb290ZXJCZ2QiLCJtb2RhbEltYWdlUGxhY2VIb2xkZXIiLCJtb2RhbFBhZGRpbmciLCJtb2RhbExhdGVyYWxQYWRkaW5nIiwibW9kYWxQb3J0YWJsZUxhdGVyYWxQYWRkaW5nIiwibW9kYWxEaWFsb2dCZ2QiLCJtb2RhbERpYWxvZ0NvbG9yIiwic2xpZGVyQmFyQ29sb3IiLCJzbGlkZXJCYXJCZ2QiLCJzbGlkZXJCYXJIb3ZlckNvbG9yIiwic2xpZGVyQmFyUmFkaXVzIiwic2xpZGVyQmFySGVpZ2h0Iiwic2xpZGVySGFuZGxlSGVpZ2h0Iiwic2xpZGVySGFuZGxlV2lkdGgiLCJzbGlkZXJIYW5kbGVDb2xvciIsInNsaWRlckhhbmRsZUhvdmVyQ29sb3IiLCJzbGlkZXJIYW5kbGVTaGFkb3ciLCJzbGlkZXJJbnB1dEhlaWdodCIsInNsaWRlcklucHV0V2lkdGgiLCJyYW5nZUJydXNoQmdkIiwibm90aWZpY2F0aW9uQ29sb3JzIiwiaW5mbyIsImVycm9yIiwic3VjY2VzcyIsIndhcm5pbmciLCJub3RpZmljYXRpb25QYW5lbFdpZHRoIiwibm90aWZpY2F0aW9uUGFuZWxJdGVtV2lkdGgiLCJub3RpZmljYXRpb25QYW5lbEl0ZW1IZWlnaHQiLCJ0ZXh0VHJ1bmNhdGUiLCJtYXhXaWR0aCIsIm92ZXJmbG93IiwidGV4dE92ZXJmbG93Iiwid2hpdGVTcGFjZSIsIndvcmRXcmFwIiwiYnJlYWtQb2ludHMiLCJwYWxtIiwiZGVzayIsImlucHV0IiwiY3NzIiwicHJvcHMiLCJ0aGVtZSIsImFjdGl2ZSIsImRpc2FibGVkIiwidHlwZSIsImlucHV0TFQiLCJpbmNsdWRlcyIsInNlY29uZGFyeUlucHV0IiwiY2hpY2tsZXRlZElucHV0Q29udGFpbmVyIiwiY2hpY2tsZXRlZElucHV0Iiwic2Vjb25kYXJ5Q2hpY2tsZXRlZElucHV0IiwiaW5saW5lSW5wdXQiLCJzd2l0Y2hUcmFjayIsImNoZWNrZWQiLCJzd2l0Y2hCdXR0b24iLCJpbnB1dFN3aXRjaCIsImNoZWNrYm94Qm94IiwiY2hlY2tib3hDaGVjayIsImlucHV0Q2hlY2tib3giLCJzZWNvbmRhcnlTd2l0Y2giLCJkcm9wZG93blNjcm9sbEJhciIsImRyb3Bkb3duTGlzdEFuY2hvciIsImRyb3Bkb3duTGlzdEl0ZW0iLCJkcm9wZG93bkxpc3RIZWFkZXIiLCJkcm9wZG93bkxpc3RTZWN0aW9uIiwiZHJvcGRvd25MaXN0Iiwic2lkZVBhbmVsU2Nyb2xsQmFyIiwicGFuZWxEcm9wZG93blNjcm9sbEJhciIsInNjcm9sbEJhciIsIm1vZGFsU2Nyb2xsQmFyIiwiRElNRU5TSU9OUyIsInRoZW1lTFQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1BLFVBQVUsR0FBRyxjQUFuQjs7QUFDQSxJQUFNQyxjQUFjLEdBQUcsY0FBdkI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLGNBQXZCOztBQUVBLElBQU1DLFNBQVMsR0FBRyw4QkFBbEI7O0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFlBQWxCOztBQUNBLElBQU1DLFlBQVksR0FBRyxLQUFyQjs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsU0FBcEI7O0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsU0FBekIsQyxDQUVQOzs7QUFDTyxJQUFNQyxVQUFVLEdBQUcsU0FBbkI7O0FBQ0EsSUFBTUMsZUFBZSxHQUFHLFNBQXhCOztBQUNBLElBQU1DLFlBQVksR0FBRyxTQUFyQjs7QUFFQSxJQUFNQyxTQUFTLEdBQUcsU0FBbEI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLFNBQXBCOztBQUNBLElBQU1DLFlBQVksR0FBRyxTQUFyQjs7QUFFQSxJQUFNQyxZQUFZLEdBQUcsU0FBckI7O0FBQ0EsSUFBTUMsY0FBYyxHQUFHLFNBQXZCOztBQUNBLElBQU1DLGtC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QUFtQmxCQyxFQUFBQSxvQkFBb0IsRUFBRSxTQW5CSjtBQW9CbEJTLEVBQUFBLGdCQUFnQixFQUFFLFNBcEJBO0FBcUJsQjlELEVBQUFBLGlCQUFpQixFQUFFLFNBckJEO0FBc0JsQkUsRUFBQUEsdUJBQXVCLEVBQUUsU0F0QlA7QUF1QmxCRCxFQUFBQSxzQkFBc0IsRUFBRSxTQXZCTjtBQXdCbEJxRCxFQUFBQSxhQUFhLEVBQUUsU0F4Qkc7QUF5QmxCVyxFQUFBQSx1QkFBdUIsRUFBRSxTQXpCUDtBQTBCbEJDLEVBQUFBLDZCQUE2QixFQUFFLFNBMUJiO0FBMkJsQmMsRUFBQUEsWUFBWSxFQUFFLFNBM0JJO0FBNEJsQjFDLEVBQUFBLHFCQUFxQixFQUFFLFNBNUJMO0FBNkJsQlYsRUFBQUEsY0FBYyxFQUFFO0FBN0JFLEVBQWIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQge2Nzc30gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHtESU1FTlNJT05TfSBmcm9tICdjb25zdGFudHMvZGVmYXVsdC1zZXR0aW5ncyc7XG5cbmV4cG9ydCBjb25zdCB0cmFuc2l0aW9uID0gJ2FsbCAuNHMgZWFzZSc7XG5leHBvcnQgY29uc3QgdHJhbnNpdGlvbkZhc3QgPSAnYWxsIC4ycyBlYXNlJztcbmV4cG9ydCBjb25zdCB0cmFuc2l0aW9uU2xvdyA9ICdhbGwgLjhzIGVhc2UnO1xuXG5leHBvcnQgY29uc3QgYm94U2hhZG93ID0gJzAgMXB4IDJweCAwIHJnYmEoMCwwLDAsMC4xMCknO1xuZXhwb3J0IGNvbnN0IGJveFNpemluZyA9ICdib3JkZXItYm94JztcbmV4cG9ydCBjb25zdCBib3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBib3JkZXJDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBib3JkZXJDb2xvckxpZ2h0ID0gJyNGMUYxRjEnO1xuXG4vLyBURVhUXG5leHBvcnQgY29uc3QgbGFiZWxDb2xvciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBsYWJlbEhvdmVyQ29sb3IgPSAnI0M2QzZDNic7XG5leHBvcnQgY29uc3QgbGFiZWxDb2xvckxUID0gJyM2QTc0ODUnO1xuXG5leHBvcnQgY29uc3QgdGV4dENvbG9yID0gJyNBMEE3QjQnO1xuZXhwb3J0IGNvbnN0IHRleHRDb2xvckxUID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHRpdGxlQ29sb3JMVCA9ICcjMjkzMjNDJztcblxuZXhwb3J0IGNvbnN0IHN1YnRleHRDb2xvciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzdWJ0ZXh0Q29sb3JMVCA9ICcjQTBBN0I0JztcbmV4cG9ydCBjb25zdCBzdWJ0ZXh0Q29sb3JBY3RpdmUgPSAnI0ZGRkZGRic7XG5cbmV4cG9ydCBjb25zdCB0aXRsZVRleHRDb2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCB0ZXh0Q29sb3JIbCA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCB0ZXh0Q29sb3JIbExUID0gJyNGMUYxRjEnO1xuZXhwb3J0IGNvbnN0IGFjdGl2ZUNvbG9yID0gJyMxRkJBRDYnO1xuZXhwb3J0IGNvbnN0IGFjdGl2ZUNvbG9ySG92ZXIgPSAnIzEwODE4OCc7XG5leHBvcnQgY29uc3QgZXJyb3JDb2xvciA9ICcjRjkwNDJDJztcblxuLy8gQnV0dG9uXG5leHBvcnQgY29uc3QgcHJpbWFyeUJ0bkJnZCA9ICcjMEY5NjY4JztcbmV4cG9ydCBjb25zdCBwcmltYXJ5QnRuQWN0QmdkID0gJyMxM0IxN0InO1xuZXhwb3J0IGNvbnN0IHByaW1hcnlCdG5Db2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCBwcmltYXJ5QnRuQWN0Q29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3QgcHJpbWFyeUJ0bkJnZEhvdmVyID0gJyMxM0IxN0InO1xuZXhwb3J0IGNvbnN0IHByaW1hcnlCdG5SYWRpdXMgPSAnMnB4JztcblxuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUJ0bkJnZCA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlCdG5BY3RCZ2QgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5QnRuQ29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5QnRuQWN0Q29sb3IgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5QnRuQmdkSG92ZXIgPSAnI0EwQTdCNCc7XG5cbmV4cG9ydCBjb25zdCBsaW5rQnRuQmdkID0gJ3RyYW5zcGFyZW50JztcbmV4cG9ydCBjb25zdCBsaW5rQnRuQWN0QmdkID0gbGlua0J0bkJnZDtcbmV4cG9ydCBjb25zdCBsaW5rQnRuQ29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3QgbGlua0J0bkFjdENvbG9yID0gdGV4dENvbG9ySGxMVDtcbmV4cG9ydCBjb25zdCBsaW5rQnRuQWN0QmdkSG92ZXIgPSBsaW5rQnRuQmdkO1xuXG5leHBvcnQgY29uc3QgbmVnYXRpdmVCdG5CZ2QgPSBlcnJvckNvbG9yO1xuZXhwb3J0IGNvbnN0IG5lZ2F0aXZlQnRuQWN0QmdkID0gJyNGRjE5M0UnO1xuZXhwb3J0IGNvbnN0IG5lZ2F0aXZlQnRuQmdkSG92ZXIgPSAnI0ZGMTkzRSc7XG5leHBvcnQgY29uc3QgbmVnYXRpdmVCdG5Db2xvciA9ICcjRkZGRkZGJztcbmV4cG9ydCBjb25zdCBuZWdhdGl2ZUJ0bkFjdENvbG9yID0gJyNGRkZGRkYnO1xuXG4vLyBJbnB1dFxuZXhwb3J0IGNvbnN0IGlucHV0Qm94SGVpZ2h0ID0gJzM0cHgnO1xuZXhwb3J0IGNvbnN0IGlucHV0UGFkZGluZyA9ICc0cHggMTBweCc7XG5leHBvcnQgY29uc3QgaW5wdXRGb250U2l6ZSA9ICcxMXB4JztcbmV4cG9ydCBjb25zdCBpbnB1dEZvbnRXZWlnaHQgPSA1MDA7XG5leHBvcnQgY29uc3QgaW5wdXRCZ2QgPSAnIzI5MzIzQyc7XG5leHBvcnQgY29uc3QgaW5wdXRCZ2RIb3ZlciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJnZEFjdGl2ZSA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJvcmRlckNvbG9yID0gJyMyOTMyM0MnO1xuZXhwb3J0IGNvbnN0IGlucHV0Qm9yZGVySG92ZXJDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBpbnB1dEJvcmRlckFjdGl2ZUNvbG9yID0gJyNEM0Q4RTAnO1xuZXhwb3J0IGNvbnN0IGlucHV0Q29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3QgaW5wdXRCb3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBpbnB1dFBsYWNlaG9sZGVyQ29sb3IgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgaW5wdXRQbGFjZWhvbGRlckZvbnRXZWlnaHQgPSA0MDA7XG5cbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEhlaWdodCA9ICcyOHB4JztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJnZCA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJnZEhvdmVyID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUlucHV0QmdkQWN0aXZlID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHNlY29uZGFyeUlucHV0Q29sb3IgPSAnI0EwQTdCNCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5SW5wdXRCb3JkZXJDb2xvciA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBzZWNvbmRhcnlJbnB1dEJvcmRlckFjdGl2ZUNvbG9yID0gJyNEM0Q4RTAnO1xuXG4vLyBTZWxlY3RcbmV4cG9ydCBjb25zdCBzZWxlY3RDb2xvciA9IGlucHV0Q29sb3I7XG5leHBvcnQgY29uc3Qgc2VsZWN0Q29sb3JMVCA9IHRpdGxlQ29sb3JMVDtcblxuZXhwb3J0IGNvbnN0IHNlbGVjdEFjdGl2ZUJvcmRlckNvbG9yID0gJyNEM0Q4RTAnO1xuZXhwb3J0IGNvbnN0IHNlbGVjdEZvbnRTaXplID0gJzExcHgnO1xuZXhwb3J0IGNvbnN0IHNlbGVjdEZvbnRXZWlnaHQgPSAnNDAwJztcbmV4cG9ydCBjb25zdCBzZWxlY3RGb250V2VpZ2h0Qm9sZCA9ICc1MDAnO1xuXG5leHBvcnQgY29uc3Qgc2VsZWN0Q29sb3JQbGFjZUhvbGRlciA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBzZWxlY3RCYWNrZ3JvdW5kID0gaW5wdXRCZ2Q7XG5leHBvcnQgY29uc3Qgc2VsZWN0QmFja2dyb3VuZEhvdmVyID0gaW5wdXRCZ2RIb3ZlcjtcbmV4cG9ydCBjb25zdCBzZWxlY3RCYWNrZ3JvdW5kTFQgPSAnI0ZGRkZGRic7XG5leHBvcnQgY29uc3Qgc2VsZWN0QmFja2dyb3VuZEhvdmVyTFQgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3Qgc2VsZWN0Qm9yZGVyQ29sb3IgPSAnI0QzRDhFMCc7XG5leHBvcnQgY29uc3Qgc2VsZWN0Qm9yZGVyQ29sb3JMVCA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzZWxlY3RCb3JkZXJSYWRpdXMgPSAnMXB4JztcbmV4cG9ydCBjb25zdCBzZWxlY3RCb3JkZXIgPSAwO1xuXG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0SGlnaGxpZ2h0QmcgPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0U2hhZG93ID0gJzAgNnB4IDEycHggMCByZ2JhKDAsMCwwLDAuMTYpJztcbmV4cG9ydCBjb25zdCBkcm9wZG93bkxpc3RCZ2QgPSAnIzNBNDE0Qyc7XG5leHBvcnQgY29uc3QgZHJvcGRvd25MaXN0Qm9yZGVyVG9wID0gJyMyNDI3MzAnO1xuXG4vLyBTd2l0Y2hcbmV4cG9ydCBjb25zdCBzd2l0Y2hXaWR0aCA9IDI0O1xuZXhwb3J0IGNvbnN0IHN3aXRjaEhlaWdodCA9IDEyO1xuZXhwb3J0IGNvbnN0IHN3aXRjaExhYmVsTWFyZ2luID0gMTI7XG5cbmV4cG9ydCBjb25zdCBzd2l0Y2hUcmFja0JnZCA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBzd2l0Y2hUcmFja0JnZEFjdGl2ZSA9IGFjdGl2ZUNvbG9yO1xuZXhwb3J0IGNvbnN0IHN3aXRjaFRyYWNrQm9yZGVyUmFkaXVzID0gJzFweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuQmdkID0gJyM2QTc0ODUnO1xuZXhwb3J0IGNvbnN0IHN3aXRjaEJ0bkJnZEFjdGl2ZSA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzd2l0Y2hCdG5Cb3hTaGFkb3cgPSAnMCAycHggNHB4IDAgcmdiYSgwLDAsMCwwLjQwKSc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuQm9yZGVyUmFkaXVzID0gJzFweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuV2lkdGggPSAnMTJweCc7XG5leHBvcnQgY29uc3Qgc3dpdGNoQnRuSGVpZ2h0ID0gJzEycHgnO1xuXG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5U3dpdGNoVHJhY2tCZ2QgPSAnIzI0MjczMCc7XG5leHBvcnQgY29uc3Qgc2Vjb25kYXJ5U3dpdGNoQnRuQmdkID0gJyMzQTQxNEMnO1xuXG4vLyBDaGVja2JveFxuZXhwb3J0IGNvbnN0IGNoZWNrYm94V2lkdGggPSAxNjtcbmV4cG9ydCBjb25zdCBjaGVja2JveEhlaWdodCA9IDE2O1xuZXhwb3J0IGNvbnN0IGNoZWNrYm94TWFyZ2luID0gMTI7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3JkZXJDb2xvciA9IHNlbGVjdEJvcmRlckNvbG9yO1xuZXhwb3J0IGNvbnN0IGNoZWNrYm94Qm9yZGVyUmFkaXVzID0gJzJweCc7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3JkZXJDb2xvckxUID0gc2VsZWN0Qm9yZGVyQ29sb3JMVDtcbmV4cG9ydCBjb25zdCBjaGVja2JveEJveEJnZCA9ICd3aGl0ZSc7XG5leHBvcnQgY29uc3QgY2hlY2tib3hCb3hCZ2RDaGVja2VkID0gcHJpbWFyeUJ0bkJnZDtcblxuLy8gU2lkZSBQYW5lbFxuZXhwb3J0IGNvbnN0IHNpZGVQYW5lbEhlYWRlckJnID0gJyMyOTMyM0MnO1xuZXhwb3J0IGNvbnN0IHNpZGVQYW5lbEJnID0gJyMyNDI3MzAnO1xuZXhwb3J0IGNvbnN0IHNpZGVCYXJDbG9zZUJ0bkJnZCA9IHNlY29uZGFyeUJ0bkJnZDtcbmV4cG9ydCBjb25zdCBzaWRlQmFyQ2xvc2VCdG5Db2xvciA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBzaWRlQmFyQ2xvc2VCdG5CZ2RIb3ZlciA9IHNlY29uZGFyeUJ0bkFjdEJnZDtcblxuZXhwb3J0IGNvbnN0IHBhbmVsQmFja2dyb3VuZCA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCBwYW5lbEJhY2tncm91bmRIb3ZlciA9ICcjM0E0NTUyJztcbmV4cG9ydCBjb25zdCBwYW5lbEFjdGl2ZUJnID0gJyMzQTQ1NTInO1xuZXhwb3J0IGNvbnN0IHBhbmVsQWN0aXZlQmdMVCA9ICcjNkE3NDg1JztcbmV4cG9ydCBjb25zdCBwYW5lbEhlYWRlckljb24gPSAnIzZBNzQ4NSc7XG5leHBvcnQgY29uc3QgcGFuZWxIZWFkZXJJY29uQWN0aXZlID0gJyNBMEE3QjQnO1xuZXhwb3J0IGNvbnN0IHBhbmVsSGVhZGVySGVpZ2h0ID0gNDg7XG5leHBvcnQgY29uc3QgcGFuZWxCb3hTaGFkb3cgPSAnMCA2cHggMTJweCAwIHJnYmEoMCwwLDAsMC4xNiknO1xuZXhwb3J0IGNvbnN0IHBhbmVsQm9yZGVyUmFkaXVzID0gJzJweCc7XG5leHBvcnQgY29uc3QgcGFuZWxCYWNrZ3JvdW5kTFQgPSAnI2Y4ZjhmOSc7XG5cbmV4cG9ydCBjb25zdCBwYW5lbEJvcmRlckNvbG9yID0gJyMzQTQxNEMnO1xuZXhwb3J0IGNvbnN0IHBhbmVsQm9yZGVyID0gYDFweCBzb2xpZCAke2JvcmRlckNvbG9yfWA7XG5leHBvcnQgY29uc3QgcGFuZWxCb3JkZXJMVCA9IGAxcHggc29saWQgJHtib3JkZXJDb2xvckxpZ2h0fWA7XG5cbmV4cG9ydCBjb25zdCBtYXBQYW5lbEJhY2tncm91bmRDb2xvciA9ICcjMjQyNzMwJztcbmV4cG9ydCBjb25zdCBtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvciA9ICcjMjkzMjNDJztcbmV4cG9ydCBjb25zdCB0b29sdGlwQmcgPSAnI0Y4RjhGOSc7XG5leHBvcnQgY29uc3QgdG9vbHRpcENvbG9yID0gJyMzMzMzMzQnO1xuXG4vLyBNb2RhbFxuZXhwb3J0IGNvbnN0IG1vZGFsVGl0bGVDb2xvciA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBtb2RhbFRpdGxlRm9udFNpemUgPSAnMjRweCc7XG5leHBvcnQgY29uc3QgbW9kYWxUaXRsZUZvbnRTaXplU21hbGxlciA9ICcxOHB4JztcbmV4cG9ydCBjb25zdCBtb2RhbEZvb3RlckJnZCA9ICcjRjhGOEY5JztcbmV4cG9ydCBjb25zdCBtb2RhbEltYWdlUGxhY2VIb2xkZXIgPSAnI0REREZFMyc7XG5leHBvcnQgY29uc3QgbW9kYWxQYWRkaW5nID0gJzEwcHggMCc7XG5leHBvcnQgY29uc3QgbW9kYWxMYXRlcmFsUGFkZGluZyA9ICc3MnB4JztcbmV4cG9ydCBjb25zdCBtb2RhbFBvcnRhYmxlTGF0ZXJhbFBhZGRpbmcgPSAnMzZweCc7XG5cbi8vIE1vZGFsIERpYWxvZyAoRGFyaylcbmV4cG9ydCBjb25zdCBtb2RhbERpYWxvZ0JnZCA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBtb2RhbERpYWxvZ0NvbG9yID0gdGV4dENvbG9ySGw7XG5cbi8vIFNsaWRlclxuZXhwb3J0IGNvbnN0IHNsaWRlckJhckNvbG9yID0gJyM2QTc0ODUnO1xuZXhwb3J0IGNvbnN0IHNsaWRlckJhckJnZCA9ICcjM0E0MTRDJztcbmV4cG9ydCBjb25zdCBzbGlkZXJCYXJIb3ZlckNvbG9yID0gJyNEM0Q4RTAnO1xuZXhwb3J0IGNvbnN0IHNsaWRlckJhclJhZGl1cyA9ICcxcHgnO1xuZXhwb3J0IGNvbnN0IHNsaWRlckJhckhlaWdodCA9IDQ7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlSGVpZ2h0ID0gMTI7XG5leHBvcnQgY29uc3Qgc2xpZGVySGFuZGxlV2lkdGggPSAxMjtcbmV4cG9ydCBjb25zdCBzbGlkZXJIYW5kbGVDb2xvciA9ICcjRDNEOEUwJztcbmV4cG9ydCBjb25zdCBzbGlkZXJIYW5kbGVIb3ZlckNvbG9yID0gJyNGRkZGRkYnO1xuZXhwb3J0IGNvbnN0IHNsaWRlckhhbmRsZVNoYWRvdyA9ICcwIDJweCA0cHggMCByZ2JhKDAsMCwwLDAuNDApJztcbmV4cG9ydCBjb25zdCBzbGlkZXJJbnB1dEhlaWdodCA9IDI0O1xuZXhwb3J0IGNvbnN0IHNsaWRlcklucHV0V2lkdGggPSA1MDtcblxuLy8gUGxvdFxuZXhwb3J0IGNvbnN0IHJhbmdlQnJ1c2hCZ2QgPSAnIzNBNDE0Qyc7XG5cbi8vIE5vdGlmaWNhdGlvblxuZXhwb3J0IGNvbnN0IG5vdGlmaWNhdGlvbkNvbG9ycyA9IHtcbiAgaW5mbzogJyMyNzZlZjEnLFxuICBlcnJvcjogJyNmMjUxMzgnLFxuICBzdWNjZXNzOiAnIzQ3YjI3NScsXG4gIHdhcm5pbmc6ICcjZmZjMDQzJ1xufTtcblxuZXhwb3J0IGNvbnN0IG5vdGlmaWNhdGlvblBhbmVsV2lkdGggPSAyNDA7XG5leHBvcnQgY29uc3Qgbm90aWZpY2F0aW9uUGFuZWxJdGVtV2lkdGggPSBub3RpZmljYXRpb25QYW5lbFdpZHRoIC0gNjA7XG5leHBvcnQgY29uc3Qgbm90aWZpY2F0aW9uUGFuZWxJdGVtSGVpZ2h0ID0gNjA7XG5cbmV4cG9ydCBjb25zdCB0ZXh0VHJ1bmNhdGUgPSB7XG4gIG1heFdpZHRoOiAnMTAwJScsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgd29yZFdyYXA6ICdub3JtYWwnXG59O1xuXG4vLyBUaGlzIGJyZWFrcG9pbnRzIGFyZSB1c2VkIGZvciByZXNwb25zaXZlIGRlc2lnblxuZXhwb3J0IGNvbnN0IGJyZWFrUG9pbnRzID0ge1xuICBwYWxtOiA1ODgsXG4gIGRlc2s6IDc2OFxufTtcblxuLy8gdGhlbWUgaXMgcGFzc2VkIHRvIGtlcGxlci5nbCB3aGVuIGl0J3MgbW91bnRlZCxcbi8vIGl0IGlzIHVzZWQgYnkgc3R5bGVkLWNvbXBvbmVudHMgdG8gcGFzcyBhbG9uZyB0b1xuLy8gYWxsIGNoaWxkIGNvbXBvbmVudHNcblxuY29uc3QgaW5wdXQgPSBjc3NgXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCZ2R9O1xuICBib3JkZXI6IDFweCBzb2xpZFxuICAgICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLmFjdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3JcbiAgICAgICAgOiBwcm9wcy5lcnJvciA/IHByb3BzLnRoZW1lLmVycm9yQ29sb3IgOiBwcm9wcy50aGVtZS5pbnB1dEJnZH07XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgY2FyZXQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCb3JkZXJBY3RpdmVDb2xvcn07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Q29sb3J9O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRGb250U2l6ZX07XG4gIGZvbnQtd2VpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Rm9udFdlaWdodH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEJveEhlaWdodH07XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgb3V0bGluZTogbm9uZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFBhZGRpbmd9O1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgdHJhbnNpdGlvbjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50cmFuc2l0aW9ufTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgd2lkdGg6IDEwMCU7XG4gIHdvcmQtd3JhcDogbm9ybWFsO1xuICBwb2ludGVyLWV2ZW50czogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZWQgPyAnbm9uZScgOiAnYWxsJyl9O1xuICBvcGFjaXR5OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlZCA/IDAuNSA6IDEpfTtcblxuICA6aG92ZXIge1xuICAgIGN1cnNvcjogJHtwcm9wcyA9PiBwcm9wcy50eXBlID09PSAnbnVtYmVyJyA/ICd0ZXh0JyA6ICdwb2ludGVyJ307XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PlxuICAgICAgcHJvcHMuYWN0aXZlID8gcHJvcHMudGhlbWUuaW5wdXRCZ2RBY3RpdmUgOiBwcm9wcy50aGVtZS5pbnB1dEJnZEhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT5cbiAgICAgIHByb3BzLmFjdGl2ZVxuICAgICAgICA/IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3JcbiAgICAgICAgOiBwcm9wcy50aGVtZS5pbnB1dEJvcmRlckhvdmVyQ29sb3J9O1xuICB9XG5cbiAgOmFjdGl2ZSxcbiAgOmZvY3VzLFxuICAmLmZvY3VzLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dEJnZEFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0Qm9yZGVyQWN0aXZlQ29sb3J9O1xuICB9XG5cbiAgOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRQbGFjZWhvbGRlckNvbG9yfTtcbiAgICBmb250LXdlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFBsYWNlaG9sZGVyRm9udFdlaWdodH07XG4gIH1cblxuICAvKiBEaXNhYmxlIEFycm93cyBvbiBOdW1iZXIgSW5wdXRzICovXG4gIDo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbixcbiAgOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5gO1xuXG5jb25zdCBpbnB1dExUID0gY3NzYFxuICAke2lucHV0fVxuXG4gIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0QmFja2dyb3VuZExUfTtcbiAgYm9yZGVyOiAxcHggc29saWRcbiAgJHtwcm9wcyA9PlxuICAgIHByb3BzLmFjdGl2ZVxuICAgICAgPyBwcm9wcy50aGVtZS5zZWxlY3RBY3RpdmVCb3JkZXJDb2xvclxuICAgICAgOiBwcm9wcy5lcnJvclxuICAgICAgPyBwcm9wcy50aGVtZS5lcnJvckNvbG9yXG4gICAgICA6IHByb3BzLnRoZW1lLnNlbGVjdEJvcmRlckNvbG9yTFR9O1xuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RDb2xvckxUfTtcbiAgY2FyZXQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0Q29sb3JMVH07XG5cbiAgOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zdWJ0ZXh0Q29sb3JMVH07XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgfVxuXG4gIDphY3RpdmUsXG4gIDpmb2N1cyxcbiAgJi5mb2N1cyxcbiAgJi5hY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2VsZWN0QmFja2dyb3VuZExUfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9yTFR9O1xuICB9XG5cbiAgOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlbGVjdEJhY2tncm91bmRMVH07XG4gICAgY3Vyc29yOiAke3Byb3BzID0+IFsnbnVtYmVyJywgJ3RleHQnXS5pbmNsdWRlcyhwcm9wcy50eXBlKSA/ICd0ZXh0JyA6ICdwb2ludGVyJ307XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+XG4gICAgcHJvcHMuYWN0aXZlXG4gICAgICA/IHByb3BzLnRoZW1lLnRleHRDb2xvckxUXG4gICAgICA6IHByb3BzLnRoZW1lLnN1YnRleHRDb2xvcn07XG4gIH1cbmA7XG5cbmNvbnN0IHNlY29uZGFyeUlucHV0ID0gY3NzYFxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmlucHV0fVxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dENvbG9yfTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZH07XG4gIGhlaWdodDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEhlaWdodH07XG4gIGJvcmRlcjogMXB4IHNvbGlkXG4gICAgJHtwcm9wcyA9PiBwcm9wcy5lcnJvclxuICAgICAgICAgID8gcHJvcHMudGhlbWUuZXJyb3JDb2xvclxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCb3JkZXJDb2xvcn07XG5cbiAgOmhvdmVyIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZEhvdmVyfTtcbiAgICBib3JkZXItY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXRCZ2RIb3Zlcn07XG4gIH1cblxuICA6YWN0aXZlLFxuICAmLmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZX07XG4gICAgYm9yZGVyLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnNlY29uZGFyeUlucHV0Qm9yZGVyQWN0aXZlQ29sb3J9O1xuICB9XG5gO1xuXG5jb25zdCBjaGlja2xldGVkSW5wdXRDb250YWluZXIgPSBjc3NgXG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBoZWlnaHQ6IGF1dG87XG4gIGp1c3RpZnktY29udGVudDogc3RhcnQ7XG4gIG1hcmdpbi1ib3R0b206IDJweDtcbiAgcGFkZGluZzogMHB4IDdweCAwcHggNHB4O1xuICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuXG4gIC5jaGlja2xldGVkLWlucHV0X19wbGFjZWhvbGRlciB7XG4gICAgbGluZS1oZWlnaHQ6IDI0cHg7XG4gICAgbWFyZ2luOiA0cHg7XG4gIH1cbmA7XG5cbmNvbnN0IGNoaWNrbGV0ZWRJbnB1dCA9IGNzc2BcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dH1cbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jaGlja2xldGVkSW5wdXRDb250YWluZXJ9XG5gO1xuXG5jb25zdCBzZWNvbmRhcnlDaGlja2xldGVkSW5wdXQgPSBjc3NgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2Vjb25kYXJ5SW5wdXR9XG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2hpY2tsZXRlZElucHV0Q29udGFpbmVyfVxuYDtcblxuY29uc3QgaW5saW5lSW5wdXQgPSBjc3NgXG4gICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXR9IGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvcn07XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNDNweDtcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XG4gIGhlaWdodDogMjRweDtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgcGFkZGluZy1sZWZ0OiA0cHg7XG4gIG1hcmdpbi1sZWZ0OiAtNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XG5cbiAgOmhvdmVyIHtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgY3Vyc29yOiB0ZXh0O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIH1cblxuICA6YWN0aXZlLFxuICAuYWN0aXZlLFxuICA6Zm9jdXMge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuaW5wdXRCb3JkZXJBY3RpdmVDb2xvcn07XG4gIH1cbmA7XG5cbmNvbnN0IHN3aXRjaFRyYWNrID0gY3NzYFxuICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+XG4gICAgcHJvcHMuY2hlY2tlZFxuICAgICAgPyBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JnZEFjdGl2ZVxuICAgICAgOiBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JnZH07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAke3Byb3BzID0+IC1wcm9wcy50aGVtZS5zd2l0Y2hMYWJlbE1hcmdpbn1weDtcbiAgY29udGVudDogJyc7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB3aWR0aDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hXaWR0aH1weDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEhlaWdodH1weDtcbiAgYm9yZGVyLXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JvcmRlclJhZGl1c307XG5gO1xuXG5jb25zdCBzd2l0Y2hCdXR0b24gPSBjc3NgXG4gIHRyYW5zaXRpb246ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudHJhbnNpdGlvbn07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAke3Byb3BzID0+IChwcm9wcy5jaGVja2VkID8gcHJvcHMudGhlbWUuc3dpdGNoV2lkdGggLyAyIDogLTEpIC0gcHJvcHMudGhlbWUuc3dpdGNoTGFiZWxNYXJnaW59cHg7XG4gIGNvbnRlbnQ6ICcnO1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ0bkhlaWdodH07XG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ0bldpZHRofTtcbiAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy5jaGVja2VkID9cbiAgcHJvcHMudGhlbWUuc3dpdGNoQnRuQmdkQWN0aXZlIDogcHJvcHMudGhlbWUuc3dpdGNoQnRuQmdkfTtcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hCdG5Cb3hTaGFkb3d9O1xuYDtcblxuY29uc3QgaW5wdXRTd2l0Y2ggPSBjc3NgXG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGxpbmUtaGVpZ2h0OiAwO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZy10b3A6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc3dpdGNoSGVpZ2h0IC8gMn1weDtcbiAgcGFkZGluZy1yaWdodDogMDtcbiAgcGFkZGluZy1ib3R0b206IDA7XG4gIHBhZGRpbmctbGVmdDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hXaWR0aH1weDtcblxuICA6YmVmb3JlIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaFRyYWNrfTtcbiAgfVxuXG4gIDphZnRlciB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hCdXR0b259O1xuICB9XG5gO1xuXG4vLyBUaGlzIGlzIGEgbGlnaHQgdmVyc2lvbiBjaGVja2JveFxuY29uc3QgY2hlY2tib3hCb3ggPSBjc3NgXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2hlY2tib3hXaWR0aH1weDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNoZWNrYm94SGVpZ2h0fXB4O1xuICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLmNoZWNrZWQgPyBwcm9wcy50aGVtZS5jaGVja2JveEJveEJnZENoZWNrZWQgOiBwcm9wcy50aGVtZS5jaGVja2JveEJveEJnZH07XG4gIGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMuY2hlY2tlZCA/IHByb3BzLnRoZW1lLmNoZWNrYm94Qm94QmdkQ2hlY2tlZCA6IHByb3BzLnRoZW1lLmNoZWNrYm94Qm9yZGVyQ29sb3J9O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGNvbnRlbnQ6ICcnO1xuYDtcblxuY29uc3QgY2hlY2tib3hDaGVjayA9IGNzc2BcbiAgd2lkdGg6IDEwcHg7XG4gIGhlaWdodDogNXB4O1xuICBib3JkZXItYm90dG9tOiAycHggc29saWQgd2hpdGU7XG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgd2hpdGU7XG4gIHRvcDogNHB4O1xuICBsZWZ0OiAzcHg7XG4gIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG9wYWNpdHk6ICR7cHJvcHMgPT4gcHJvcHMuY2hlY2tlZCA/IDEgOiAwfTtcbiAgY29udGVudDogXCJcIjtcbmA7XG5cbmNvbnN0IGlucHV0Q2hlY2tib3ggPSBjc3NgXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nLWxlZnQ6IDMycHg7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gIG1hcmdpbi1sZWZ0OiAtJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hMYWJlbE1hcmdpbn1weDtcblxuICA6YmVmb3JlIHtcbiAgICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jaGVja2JveEJveH07XG4gIH1cblxuICA6YWZ0ZXIge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY2hlY2tib3hDaGVja307XG4gIH1cbmA7XG5cbmNvbnN0IHNlY29uZGFyeVN3aXRjaCA9IGNzc2BcbiAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5pbnB1dFN3aXRjaH1cbiAgOmJlZm9yZSB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja30gYmFja2dyb3VuZDogJHtwcm9wcyA9PlxuICAgICAgICBwcm9wcy5jaGVja2VkXG4gICAgICAgICAgPyBwcm9wcy50aGVtZS5zd2l0Y2hUcmFja0JnZEFjdGl2ZVxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5U3dpdGNoVHJhY2tCZ2R9O1xuICB9XG5cbiAgOmFmdGVyIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLnN3aXRjaEJ1dHRvbn1cbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLmNoZWNrZWRcbiAgICAgICAgICA/IHByb3BzLnRoZW1lLnN3aXRjaEJ0bkJnZEFjdGl2ZVxuICAgICAgICAgIDogcHJvcHMudGhlbWUuc2Vjb25kYXJ5U3dpdGNoQnRuQmdkfTtcbiAgfVxuYDtcblxuY29uc3QgZHJvcGRvd25TY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEJnZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgYm9yZGVyOiAzcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RCZ2R9O1xuICB9O1xuXG4gIDp2ZXJ0aWNhbDpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG59YDtcblxuY29uc3QgZHJvcGRvd25MaXN0QW5jaG9yID0gY3NzYFxuICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zZWxlY3RDb2xvcn07XG4gIHBhZGRpbmctbGVmdDogM3B4O1xuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0SXRlbSA9IGNzc2BcbiAgZm9udC1zaXplOiAxMXB4O1xuICBwYWRkaW5nOiAzcHggOXB4O1xuICBmb250LXdlaWdodDogNTAwO1xuXG4gICYuaG92ZXIsXG4gICY6aG92ZXIge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEhpZ2hsaWdodEJnfTtcblxuICAgIC5saXN0X19pdGVtX19hbmNob3Ige1xuICAgICAgY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0SGVhZGVyID0gY3NzYFxuICBmb250LXNpemU6IDExcHg7XG4gIHBhZGRpbmc6IDVweCA5cHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0U2VjdGlvbiA9IGNzc2BcbiAgcGFkZGluZzogMCAwIDRweCAwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmxhYmVsQ29sb3J9O1xuYDtcblxuY29uc3QgZHJvcGRvd25MaXN0ID0gY3NzYFxuICBvdmVyZmxvdy15OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiAyODBweDtcbiAgYm94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RTaGFkb3d9O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG5cbiAgLmxpc3RfX3NlY3Rpb24ge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0U2VjdGlvbn07XG4gIH1cbiAgLmxpc3RfX2hlYWRlciB7XG4gICAgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5kcm9wZG93bkxpc3RIZWFkZXJ9O1xuICB9XG5cbiAgLmxpc3RfX2l0ZW0ge1xuICAgICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZHJvcGRvd25MaXN0SXRlbX07XG4gIH1cblxuICAubGlzdF9faXRlbV9fYW5jaG9yIHtcbiAgICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duTGlzdEFuY2hvcn07XG4gIH1cblxuICAke3Byb3BzID0+IHByb3BzLnRoZW1lLmRyb3Bkb3duU2Nyb2xsQmFyfTtcbmA7XG5cbmNvbnN0IHNpZGVQYW5lbFNjcm9sbEJhciA9IGNzc2BcbiAgOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgaGVpZ2h0OiAxMHB4O1xuICAgIHdpZHRoOiAxMHB4O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci1jb3JuZXIge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsQmd9O1xuICB9XG5cbiAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XG4gICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5zaWRlUGFuZWxCZ307XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJ9O1xuICAgIGJvcmRlcjogM3B4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuc2lkZVBhbmVsQmd9O1xuXG4gICAgOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9O1xufWA7XG5cbmNvbnN0IHBhbmVsRHJvcGRvd25TY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kSG92ZXJ9O1xuICAgIGJvcmRlcjogM3B4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUucGFuZWxCYWNrZ3JvdW5kfTtcbiAgICA6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5sYWJlbENvbG9yfTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB9XG4gIH07XG5gO1xuXG5jb25zdCBzY3JvbGxCYXIgPSBjc3NgXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICAgIGhlaWdodDogMTBweDtcbiAgICB3aWR0aDogMTBweDtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnBhbmVsQmFja2dyb3VuZH07XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iIHtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvcn07XG4gICAgYm9yZGVyOiAzcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5wYW5lbEJhY2tncm91bmR9XG5cbiAgICA6dmVydGljYWw6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuXG4gICAgOmhvcml6b250YWw6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS50ZXh0Q29sb3JIbH07XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuICB9XG59YDtcblxuZXhwb3J0IGNvbnN0IG1vZGFsU2Nyb2xsQmFyID0gY3NzYFxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcbiAgICB3aWR0aDogMTRweDtcbiAgICBoZWlnaHQ6IDE2cHg7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgfVxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrOmhvcml6b250YWwge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUudGV4dENvbG9ySGx9O1xuICB9XG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xuICAgIGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUubGFiZWxDb2xvckxUfTtcbiAgICBib3JkZXI6IDRweCBzb2xpZCB3aGl0ZTtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItY29ybmVyIHtcbiAgICBiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgfVxuXG4gIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6ICM5NjlkYTk7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOnZlcnRpY2FsIHtcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XG4gIH1cblxuICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvcml6b250YWwge1xuICAgIGJvcmRlci1yYWRpdXM6IDlweDtcbiAgICBib3JkZXI6IDRweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLnRleHRDb2xvckhsfTtcbiAgfVxuYDtcblxuZXhwb3J0IGNvbnN0IHRoZW1lID0ge1xuICAuLi5ESU1FTlNJT05TLFxuICAvLyB0ZW1wbGF0ZXNcbiAgaW5wdXQsXG4gIGlucHV0TFQsXG4gIGlubGluZUlucHV0LFxuICBjaGlja2xldGVkSW5wdXQsXG4gIGNoaWNrbGV0ZWRJbnB1dENvbnRhaW5lcixcbiAgc2Vjb25kYXJ5Q2hpY2tsZXRlZElucHV0LFxuXG4gIHNlY29uZGFyeUlucHV0LFxuICBkcm9wZG93blNjcm9sbEJhcixcbiAgZHJvcGRvd25MaXN0LFxuICBkcm9wZG93bkxpc3RJdGVtLFxuICBkcm9wZG93bkxpc3RBbmNob3IsXG4gIGRyb3Bkb3duTGlzdEhlYWRlcixcbiAgZHJvcGRvd25MaXN0U2VjdGlvbixcbiAgZHJvcGRvd25MaXN0U2hhZG93LFxuICBtb2RhbFNjcm9sbEJhcixcbiAgc2Nyb2xsQmFyLFxuICBzaWRlUGFuZWxTY3JvbGxCYXIsXG4gIGlucHV0U3dpdGNoLFxuICBzZWNvbmRhcnlTd2l0Y2gsXG4gIHN3aXRjaFRyYWNrLFxuICBzd2l0Y2hCdXR0b24sXG4gIGlucHV0Q2hlY2tib3gsXG4gIGNoZWNrYm94Qm94LFxuICBjaGVja2JveENoZWNrLFxuXG4gIC8vIFRyYW5zaXRpb25zXG4gIHRyYW5zaXRpb24sXG4gIHRyYW5zaXRpb25GYXN0LFxuICB0cmFuc2l0aW9uU2xvdyxcblxuICAvLyBzdHlsZXNcbiAgYWN0aXZlQ29sb3IsXG4gIGFjdGl2ZUNvbG9ySG92ZXIsXG4gIGJvcmRlclJhZGl1cyxcbiAgYm94U2hhZG93LFxuICBlcnJvckNvbG9yLFxuICBkcm9wZG93bkxpc3RIaWdobGlnaHRCZyxcbiAgZHJvcGRvd25MaXN0QmdkLFxuICBkcm9wZG93bkxpc3RCb3JkZXJUb3AsXG5cbiAgbGFiZWxDb2xvcixcbiAgbGFiZWxDb2xvckxULFxuICBsYWJlbEhvdmVyQ29sb3IsXG4gIG1hcFBhbmVsQmFja2dyb3VuZENvbG9yLFxuICBtYXBQYW5lbEhlYWRlckJhY2tncm91bmRDb2xvcixcblxuICAvLyBTZWxlY3RcbiAgc2VsZWN0QWN0aXZlQm9yZGVyQ29sb3IsXG4gIHNlbGVjdEJhY2tncm91bmQsXG4gIHNlbGVjdEJhY2tncm91bmRMVCxcbiAgc2VsZWN0QmFja2dyb3VuZEhvdmVyLFxuICBzZWxlY3RCYWNrZ3JvdW5kSG92ZXJMVCxcbiAgc2VsZWN0Qm9yZGVyLFxuICBzZWxlY3RCb3JkZXJDb2xvcixcbiAgc2VsZWN0Qm9yZGVyUmFkaXVzLFxuICBzZWxlY3RCb3JkZXJDb2xvckxULFxuICBzZWxlY3RDb2xvcixcbiAgc2VsZWN0Q29sb3JQbGFjZUhvbGRlcixcbiAgc2VsZWN0Rm9udFNpemUsXG4gIHNlbGVjdEZvbnRXZWlnaHQsXG4gIHNlbGVjdENvbG9yTFQsXG4gIHNlbGVjdEZvbnRXZWlnaHRCb2xkLFxuXG4gIC8vIElucHV0XG4gIGlucHV0QmdkLFxuICBpbnB1dEJnZEhvdmVyLFxuICBpbnB1dEJnZEFjdGl2ZSxcbiAgaW5wdXRCb3hIZWlnaHQsXG4gIGlucHV0Qm9yZGVyQ29sb3IsXG4gIGlucHV0Qm9yZGVyQWN0aXZlQ29sb3IsXG4gIGlucHV0Qm9yZGVySG92ZXJDb2xvcixcbiAgaW5wdXRCb3JkZXJSYWRpdXMsXG4gIGlucHV0Q29sb3IsXG4gIGlucHV0UGFkZGluZyxcbiAgaW5wdXRGb250U2l6ZSxcbiAgaW5wdXRGb250V2VpZ2h0LFxuICBpbnB1dFBsYWNlaG9sZGVyQ29sb3IsXG4gIGlucHV0UGxhY2Vob2xkZXJGb250V2VpZ2h0LFxuXG4gIHNlY29uZGFyeUlucHV0QmdkLFxuICBzZWNvbmRhcnlJbnB1dEJnZEhvdmVyLFxuICBzZWNvbmRhcnlJbnB1dEJnZEFjdGl2ZSxcbiAgc2Vjb25kYXJ5SW5wdXRIZWlnaHQsXG4gIHNlY29uZGFyeUlucHV0Q29sb3IsXG4gIHNlY29uZGFyeUlucHV0Qm9yZGVyQ29sb3IsXG4gIHNlY29uZGFyeUlucHV0Qm9yZGVyQWN0aXZlQ29sb3IsXG5cbiAgLy8gU3dpdGNoXG4gIHN3aXRjaFdpZHRoLFxuICBzd2l0Y2hIZWlnaHQsXG4gIHN3aXRjaFRyYWNrQmdkLFxuICBzd2l0Y2hUcmFja0JnZEFjdGl2ZSxcbiAgc3dpdGNoVHJhY2tCb3JkZXJSYWRpdXMsXG4gIHN3aXRjaEJ0bkJnZCxcbiAgc3dpdGNoQnRuQmdkQWN0aXZlLFxuICBzd2l0Y2hCdG5Cb3hTaGFkb3csXG4gIHN3aXRjaEJ0bkJvcmRlclJhZGl1cyxcbiAgc3dpdGNoQnRuV2lkdGgsXG4gIHN3aXRjaEJ0bkhlaWdodCxcbiAgc3dpdGNoTGFiZWxNYXJnaW4sXG5cbiAgc2Vjb25kYXJ5U3dpdGNoVHJhY2tCZ2QsXG4gIHNlY29uZGFyeVN3aXRjaEJ0bkJnZCxcblxuICAvLyBDaGVja2JveFxuICBjaGVja2JveFdpZHRoLFxuICBjaGVja2JveEhlaWdodCxcbiAgY2hlY2tib3hNYXJnaW4sXG4gIGNoZWNrYm94Qm9yZGVyQ29sb3IsXG4gIGNoZWNrYm94Qm9yZGVyUmFkaXVzLFxuICBjaGVja2JveEJvcmRlckNvbG9yTFQsXG4gIGNoZWNrYm94Qm94QmdkLFxuICBjaGVja2JveEJveEJnZENoZWNrZWQsXG5cbiAgLy8gQnV0dG9uXG4gIHByaW1hcnlCdG5CZ2QsXG4gIHByaW1hcnlCdG5BY3RCZ2QsXG4gIHByaW1hcnlCdG5Db2xvcixcbiAgcHJpbWFyeUJ0bkFjdENvbG9yLFxuICBwcmltYXJ5QnRuQmdkSG92ZXIsXG4gIHByaW1hcnlCdG5SYWRpdXMsXG4gIHNlY29uZGFyeUJ0bkJnZCxcbiAgc2Vjb25kYXJ5QnRuQWN0QmdkLFxuICBzZWNvbmRhcnlCdG5CZ2RIb3ZlcixcbiAgc2Vjb25kYXJ5QnRuQ29sb3IsXG4gIHNlY29uZGFyeUJ0bkFjdENvbG9yLFxuXG4gIG5lZ2F0aXZlQnRuQmdkLFxuICBuZWdhdGl2ZUJ0bkFjdEJnZCxcbiAgbmVnYXRpdmVCdG5CZ2RIb3ZlcixcbiAgbmVnYXRpdmVCdG5Db2xvcixcbiAgbmVnYXRpdmVCdG5BY3RDb2xvcixcblxuICBsaW5rQnRuQmdkLFxuICBsaW5rQnRuQWN0QmdkLFxuICBsaW5rQnRuQ29sb3IsXG4gIGxpbmtCdG5BY3RDb2xvcixcbiAgbGlua0J0bkFjdEJnZEhvdmVyLFxuXG4gIC8vIE1vZGFsXG4gIG1vZGFsVGl0bGVDb2xvcixcbiAgbW9kYWxUaXRsZUZvbnRTaXplLFxuICBtb2RhbFRpdGxlRm9udFNpemVTbWFsbGVyLFxuICBtb2RhbEZvb3RlckJnZCxcbiAgbW9kYWxJbWFnZVBsYWNlSG9sZGVyLFxuICBtb2RhbFBhZGRpbmcsXG5cbiAgbW9kYWxEaWFsb2dCZ2QsXG4gIG1vZGFsRGlhbG9nQ29sb3IsXG5cbiAgbW9kYWxMYXRlcmFsUGFkZGluZyxcbiAgbW9kYWxQb3J0YWJsZUxhdGVyYWxQYWRkaW5nLFxuXG4gIC8vIFNpZGUgUGFuZWxcbiAgc2lkZVBhbmVsQmcsXG5cbiAgc2lkZUJhckNsb3NlQnRuQmdkLFxuICBzaWRlQmFyQ2xvc2VCdG5Db2xvcixcbiAgc2lkZUJhckNsb3NlQnRuQmdkSG92ZXIsXG4gIHNpZGVQYW5lbEhlYWRlckJnLFxuXG4gIC8vIFNpZGUgUGFuZWwgUGFuZWxcbiAgcGFuZWxBY3RpdmVCZyxcbiAgcGFuZWxCYWNrZ3JvdW5kLFxuICBwYW5lbEJhY2tncm91bmRIb3ZlcixcbiAgcGFuZWxCYWNrZ3JvdW5kTFQsXG4gIHBhbmVsQm94U2hhZG93LFxuICBwYW5lbEJvcmRlclJhZGl1cyxcbiAgcGFuZWxCb3JkZXIsXG4gIHBhbmVsQm9yZGVyQ29sb3IsXG4gIHBhbmVsQm9yZGVyTFQsXG4gIHBhbmVsSGVhZGVySWNvbixcbiAgcGFuZWxIZWFkZXJJY29uQWN0aXZlLFxuICBwYW5lbEhlYWRlckhlaWdodCxcbiAgcGFuZWxEcm9wZG93blNjcm9sbEJhcixcblxuICAvLyBUZXh0XG4gIHRleHRDb2xvcixcbiAgdGV4dENvbG9yTFQsXG4gIHRleHRDb2xvckhsLFxuICB0aXRsZVRleHRDb2xvcixcbiAgc3VidGV4dENvbG9yLFxuICBzdWJ0ZXh0Q29sb3JMVCxcbiAgc3VidGV4dENvbG9yQWN0aXZlLFxuICB0ZXh0VHJ1bmNhdGUsXG4gIHRpdGxlQ29sb3JMVCxcbiAgdG9vbHRpcEJnLFxuICB0b29sdGlwQ29sb3IsXG5cbiAgLy8gU2xpZGVyXG4gIHNsaWRlckJhckNvbG9yLFxuICBzbGlkZXJCYXJCZ2QsXG4gIHNsaWRlckJhckhvdmVyQ29sb3IsXG4gIHNsaWRlckJhclJhZGl1cyxcbiAgc2xpZGVyQmFySGVpZ2h0LFxuICBzbGlkZXJIYW5kbGVIZWlnaHQsXG4gIHNsaWRlckhhbmRsZVdpZHRoLFxuICBzbGlkZXJIYW5kbGVDb2xvcixcbiAgc2xpZGVySGFuZGxlSG92ZXJDb2xvcixcbiAgc2xpZGVySGFuZGxlU2hhZG93LFxuICBzbGlkZXJJbnB1dEhlaWdodCxcbiAgc2xpZGVySW5wdXRXaWR0aCxcblxuICAvLyBQbG90XG4gIHJhbmdlQnJ1c2hCZ2QsXG5cbiAgLy8gTm90aWZpY2F0aW9uc1xuICBub3RpZmljYXRpb25Db2xvcnMsXG4gIG5vdGlmaWNhdGlvblBhbmVsV2lkdGgsXG4gIG5vdGlmaWNhdGlvblBhbmVsSXRlbVdpZHRoLFxuICBub3RpZmljYXRpb25QYW5lbEl0ZW1IZWlnaHQsXG5cbiAgLy8gQnJlYWtwb2ludHNcbiAgYnJlYWtQb2ludHNcbn07XG5cbmV4cG9ydCBjb25zdCB0aGVtZUxUID0ge1xuICAuLi50aGVtZSxcblxuICAvLyB0ZW1wbGF0ZVxuICBpbnB1dDogaW5wdXRMVCxcbiAgdGV4dENvbG9yOiB0ZXh0Q29sb3JMVCxcbiAgc2lkZVBhbmVsQmc6ICcjZmZmZmZmJyxcbiAgdGl0bGVUZXh0Q29sb3I6ICcjMDAwMDAwJyxcbiAgc2lkZVBhbmVsSGVhZGVyQmc6ICcjZjdmN0Y3JyxcbiAgc3VidGV4dENvbG9yQWN0aXZlOiAnIzI0NzNiZCcsXG4gIHRvb2x0aXBCZzogJyMxODY5YjUnLFxuICB0b29sdGlwQ29sb3I6ICcjZmZmZmZmJyxcbiAgZHJvcGRvd25MaXN0QmdkOiAnI2ZmZmZmZicsXG4gIHRleHRDb2xvckhsOiAnIzI0NzNiZCcsXG4gIGlucHV0QmdkOiAnI2Y3ZjdmNycsXG4gIGlucHV0QmdkSG92ZXI6ICcjZmZmZmZmJyxcbiAgaW5wdXRCZ2RBY3RpdmU6ICcjZmZmZmZmJyxcbiAgZHJvcGRvd25MaXN0SGlnaGxpZ2h0Qmc6ICcjZjBmMGYwJyxcbiAgcGFuZWxCYWNrZ3JvdW5kOiAnI2Y3ZjdGNycsXG4gIHBhbmVsQmFja2dyb3VuZEhvdmVyOiAnI2Y3ZjdGNycsXG4gIHBhbmVsQm9yZGVyQ29sb3I6ICcjRDNEOEUwJyxcbiAgc2Vjb25kYXJ5SW5wdXRCZ2Q6ICcjZjdmN0Y3JyxcbiAgc2Vjb25kYXJ5SW5wdXRCZ2RBY3RpdmU6ICcjZjdmN0Y3JyxcbiAgc2Vjb25kYXJ5SW5wdXRCZ2RIb3ZlcjogJyNmZmZmZmYnLFxuICBwYW5lbEFjdGl2ZUJnOiAnI2Y3ZjdGNycsXG4gIG1hcFBhbmVsQmFja2dyb3VuZENvbG9yOiAnI2ZmZmZmZicsXG4gIG1hcFBhbmVsSGVhZGVyQmFja2dyb3VuZENvbG9yOiAnI2Y3ZjdGNycsXG4gIHNsaWRlckJhckJnZDogJyNEM0Q4RTAnLFxuICBzZWNvbmRhcnlTd2l0Y2hCdG5CZ2Q6ICcjRDNEOEUwJyxcbiAgc3dpdGNoVHJhY2tCZ2Q6ICcjRDNEOEUwJ1xufTtcbiJdfQ==