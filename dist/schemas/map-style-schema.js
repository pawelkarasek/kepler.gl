"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.propertiesV0 = exports.customMapStylePropsV1 = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _versions = require("./versions");

var _schema = _interopRequireDefault(require("./schema"));

var _mapStyleSchema;

var customMapStylePropsV1 = {
  accessToken: null,
  custom: null,
  icon: null,
  id: null,
  label: null,
  url: null
};
exports.customMapStylePropsV1 = customMapStylePropsV1;
var CustomMapStyleSchema = new _schema["default"]({
  version: _versions.VERSIONS.v1,
  key: 'customStyle',
  properties: customMapStylePropsV1
});

var MapStyleSchemaV1 =
/*#__PURE__*/
function (_Schema) {
  (0, _inherits2["default"])(MapStyleSchemaV1, _Schema);

  function MapStyleSchemaV1() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, MapStyleSchemaV1);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(MapStyleSchemaV1)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "version", _versions.VERSIONS.v1);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "key", 'mapStyles');
    return _this;
  }

  (0, _createClass2["default"])(MapStyleSchemaV1, [{
    key: "save",
    value: function save(mapStyles) {
      // save all custom styles
      var saveCustomStyle = Object.keys(mapStyles).reduce(function (accu, key) {
        return (0, _objectSpread2["default"])({}, mapStyles[key].custom ? (0, _defineProperty2["default"])({}, key, CustomMapStyleSchema.save(mapStyles[key]).customStyle) : {});
      }, {});
      return (0, _defineProperty2["default"])({}, this.key, saveCustomStyle);
    }
  }, {
    key: "load",
    value: function load(mapStyles) {
      // If mapStyle is an empty object, do not load it
      return (0, _typeof2["default"])(mapStyles) === 'object' && Object.keys(mapStyles).length ? (0, _defineProperty2["default"])({}, this.key, mapStyles) : {};
    }
  }]);
  return MapStyleSchemaV1;
}(_schema["default"]); // version v0


var propertiesV0 = {
  styleType: null,
  topLayerGroups: null,
  visibleLayerGroups: null,
  buildingLayer: null,
  mapStyles: new MapStyleSchemaV1()
};
exports.propertiesV0 = propertiesV0;
var mapStyleSchema = (_mapStyleSchema = {}, (0, _defineProperty2["default"])(_mapStyleSchema, _versions.VERSIONS.v0, new _schema["default"]({
  version: _versions.VERSIONS.v0,
  properties: propertiesV0,
  key: 'mapStyle'
})), (0, _defineProperty2["default"])(_mapStyleSchema, _versions.VERSIONS.v1, new _schema["default"]({
  version: _versions.VERSIONS.v1,
  properties: propertiesV0,
  key: 'mapStyle'
})), _mapStyleSchema);
var _default = mapStyleSchema;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL21hcC1zdHlsZS1zY2hlbWEuanMiXSwibmFtZXMiOlsiY3VzdG9tTWFwU3R5bGVQcm9wc1YxIiwiYWNjZXNzVG9rZW4iLCJjdXN0b20iLCJpY29uIiwiaWQiLCJsYWJlbCIsInVybCIsIkN1c3RvbU1hcFN0eWxlU2NoZW1hIiwiU2NoZW1hIiwidmVyc2lvbiIsIlZFUlNJT05TIiwidjEiLCJrZXkiLCJwcm9wZXJ0aWVzIiwiTWFwU3R5bGVTY2hlbWFWMSIsIm1hcFN0eWxlcyIsInNhdmVDdXN0b21TdHlsZSIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhY2N1Iiwic2F2ZSIsImN1c3RvbVN0eWxlIiwibGVuZ3RoIiwicHJvcGVydGllc1YwIiwic3R5bGVUeXBlIiwidG9wTGF5ZXJHcm91cHMiLCJ2aXNpYmxlTGF5ZXJHcm91cHMiLCJidWlsZGluZ0xheWVyIiwibWFwU3R5bGVTY2hlbWEiLCJ2MCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBOztBQUNBOzs7O0FBRU8sSUFBTUEscUJBQXFCLEdBQUc7QUFDbkNDLEVBQUFBLFdBQVcsRUFBRSxJQURzQjtBQUVuQ0MsRUFBQUEsTUFBTSxFQUFFLElBRjJCO0FBR25DQyxFQUFBQSxJQUFJLEVBQUUsSUFINkI7QUFJbkNDLEVBQUFBLEVBQUUsRUFBRSxJQUorQjtBQUtuQ0MsRUFBQUEsS0FBSyxFQUFFLElBTDRCO0FBTW5DQyxFQUFBQSxHQUFHLEVBQUU7QUFOOEIsQ0FBOUI7O0FBU1AsSUFBTUMsb0JBQW9CLEdBQUcsSUFBSUMsa0JBQUosQ0FBVztBQUN0Q0MsRUFBQUEsT0FBTyxFQUFFQyxtQkFBU0MsRUFEb0I7QUFFdENDLEVBQUFBLEdBQUcsRUFBRSxhQUZpQztBQUd0Q0MsRUFBQUEsVUFBVSxFQUFFYjtBQUgwQixDQUFYLENBQTdCOztJQU1NYyxnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0dBQ01KLG1CQUFTQyxFOzRGQUNiLFc7Ozs7Ozt5QkFDREksUyxFQUFXO0FBQ2Q7QUFDQSxVQUFNQyxlQUFlLEdBQUdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxTQUFaLEVBQXVCSSxNQUF2QixDQUE4QixVQUFDQyxJQUFELEVBQU9SLEdBQVA7QUFBQSxrREFDaERHLFNBQVMsQ0FBQ0gsR0FBRCxDQUFULENBQWVWLE1BQWYsd0NBQ0VVLEdBREYsRUFDUUwsb0JBQW9CLENBQUNjLElBQXJCLENBQTBCTixTQUFTLENBQUNILEdBQUQsQ0FBbkMsRUFBMENVLFdBRGxELElBQ2lFLEVBRmpCO0FBQUEsT0FBOUIsRUFJcEIsRUFKb0IsQ0FBeEI7QUFNQSxrREFBUyxLQUFLVixHQUFkLEVBQW9CSSxlQUFwQjtBQUNEOzs7eUJBRUlELFMsRUFBVztBQUNkO0FBQ0EsYUFBTyx5QkFBT0EsU0FBUCxNQUFxQixRQUFyQixJQUFpQ0UsTUFBTSxDQUFDQyxJQUFQLENBQVlILFNBQVosRUFBdUJRLE1BQXhELHdDQUFtRSxLQUFLWCxHQUF4RSxFQUE4RUcsU0FBOUUsSUFBMkYsRUFBbEc7QUFDRDs7O0VBakI0QlAsa0IsR0FvQi9COzs7QUFDTyxJQUFNZ0IsWUFBWSxHQUFHO0FBQzFCQyxFQUFBQSxTQUFTLEVBQUUsSUFEZTtBQUUxQkMsRUFBQUEsY0FBYyxFQUFFLElBRlU7QUFHMUJDLEVBQUFBLGtCQUFrQixFQUFFLElBSE07QUFJMUJDLEVBQUFBLGFBQWEsRUFBRSxJQUpXO0FBSzFCYixFQUFBQSxTQUFTLEVBQUUsSUFBSUQsZ0JBQUo7QUFMZSxDQUFyQjs7QUFRUCxJQUFNZSxjQUFjLDRFQUNqQm5CLG1CQUFTb0IsRUFEUSxFQUNILElBQUl0QixrQkFBSixDQUFXO0FBQ3hCQyxFQUFBQSxPQUFPLEVBQUVDLG1CQUFTb0IsRUFETTtBQUV4QmpCLEVBQUFBLFVBQVUsRUFBRVcsWUFGWTtBQUd4QlosRUFBQUEsR0FBRyxFQUFFO0FBSG1CLENBQVgsQ0FERyxxREFNakJGLG1CQUFTQyxFQU5RLEVBTUgsSUFBSUgsa0JBQUosQ0FBVztBQUN4QkMsRUFBQUEsT0FBTyxFQUFFQyxtQkFBU0MsRUFETTtBQUV4QkUsRUFBQUEsVUFBVSxFQUFFVyxZQUZZO0FBR3hCWixFQUFBQSxHQUFHLEVBQUU7QUFIbUIsQ0FBWCxDQU5HLG1CQUFwQjtlQWFlaUIsYyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgMjAxOSBVYmVyIFRlY2hub2xvZ2llcywgSW5jLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cbmltcG9ydCB7VkVSU0lPTlN9IGZyb20gJy4vdmVyc2lvbnMnO1xuaW1wb3J0IFNjaGVtYSBmcm9tICcuL3NjaGVtYSc7XG5cbmV4cG9ydCBjb25zdCBjdXN0b21NYXBTdHlsZVByb3BzVjEgPSB7XG4gIGFjY2Vzc1Rva2VuOiBudWxsLFxuICBjdXN0b206IG51bGwsXG4gIGljb246IG51bGwsXG4gIGlkOiBudWxsLFxuICBsYWJlbDogbnVsbCxcbiAgdXJsOiBudWxsXG59O1xuXG5jb25zdCBDdXN0b21NYXBTdHlsZVNjaGVtYSA9IG5ldyBTY2hlbWEoe1xuICB2ZXJzaW9uOiBWRVJTSU9OUy52MSxcbiAga2V5OiAnY3VzdG9tU3R5bGUnLFxuICBwcm9wZXJ0aWVzOiBjdXN0b21NYXBTdHlsZVByb3BzVjFcbn0pO1xuXG5jbGFzcyBNYXBTdHlsZVNjaGVtYVYxIGV4dGVuZHMgU2NoZW1hIHtcbiAgdmVyc2lvbiA9IFZFUlNJT05TLnYxO1xuICBrZXkgPSAnbWFwU3R5bGVzJztcbiAgc2F2ZShtYXBTdHlsZXMpIHtcbiAgICAvLyBzYXZlIGFsbCBjdXN0b20gc3R5bGVzXG4gICAgY29uc3Qgc2F2ZUN1c3RvbVN0eWxlID0gT2JqZWN0LmtleXMobWFwU3R5bGVzKS5yZWR1Y2UoKGFjY3UsIGtleSkgPT4gKHtcbiAgICAgIC4uLihtYXBTdHlsZXNba2V5XS5jdXN0b20gP1xuICAgICAgICAgIHtba2V5XTogQ3VzdG9tTWFwU3R5bGVTY2hlbWEuc2F2ZShtYXBTdHlsZXNba2V5XSkuY3VzdG9tU3R5bGV9IDoge31cbiAgICAgIClcbiAgICB9KSwge30pO1xuXG4gICAgcmV0dXJuIHtbdGhpcy5rZXldOiBzYXZlQ3VzdG9tU3R5bGV9O1xuICB9XG5cbiAgbG9hZChtYXBTdHlsZXMpIHtcbiAgICAvLyBJZiBtYXBTdHlsZSBpcyBhbiBlbXB0eSBvYmplY3QsIGRvIG5vdCBsb2FkIGl0XG4gICAgcmV0dXJuIHR5cGVvZiBtYXBTdHlsZXMgPT09ICdvYmplY3QnICYmIE9iamVjdC5rZXlzKG1hcFN0eWxlcykubGVuZ3RoID8ge1t0aGlzLmtleV06IG1hcFN0eWxlc30gOiB7fTtcbiAgfVxufVxuXG4vLyB2ZXJzaW9uIHYwXG5leHBvcnQgY29uc3QgcHJvcGVydGllc1YwID0ge1xuICBzdHlsZVR5cGU6IG51bGwsXG4gIHRvcExheWVyR3JvdXBzOiBudWxsLFxuICB2aXNpYmxlTGF5ZXJHcm91cHM6IG51bGwsXG4gIGJ1aWxkaW5nTGF5ZXI6IG51bGwsXG4gIG1hcFN0eWxlczogbmV3IE1hcFN0eWxlU2NoZW1hVjEoKVxufTtcblxuY29uc3QgbWFwU3R5bGVTY2hlbWEgPSB7XG4gIFtWRVJTSU9OUy52MF06IG5ldyBTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYwLFxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNWMCxcbiAgICBrZXk6ICdtYXBTdHlsZSdcbiAgfSksXG4gIFtWRVJTSU9OUy52MV06IG5ldyBTY2hlbWEoe1xuICAgIHZlcnNpb246IFZFUlNJT05TLnYxLFxuICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNWMCxcbiAgICBrZXk6ICdtYXBTdHlsZSdcbiAgfSlcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFN0eWxlU2NoZW1hO1xuIl19