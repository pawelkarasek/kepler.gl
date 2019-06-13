"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _window = _interopRequireDefault(require("global/window"));

var _document = _interopRequireDefault(require("global/document"));

var _console = _interopRequireDefault(require("global/console"));

var _miniSvgDataUri = _interopRequireDefault(require("mini-svg-data-uri"));

var _userFeedbacks = require("../constants/user-feedbacks");

// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This file is copied from https://github.com/tsayen/dom-to-image
 * Modified by heshan0131 to allow loading external stylesheets and inline webfonts
 */
var util = newUtil();
var inliner = newInliner();
var fontFaces = newFontFaces();
var images = newImages(); // Default impl options

var defaultOptions = {
  // Default is to fail on error, no placeholder
  imagePlaceholder: undefined,
  // Default cache bust is false, it will use the cache
  cacheBust: false
};
var domtoimage = {
  toSvg: toSvg,
  toPng: toPng,
  toJpeg: toJpeg,
  toBlob: toBlob,
  toPixelData: toPixelData,
  impl: {
    fontFaces: fontFaces,
    images: images,
    util: util,
    inliner: inliner,
    options: {}
  }
};
/**
   * @param {Node} node - The DOM Node object to render
   * @param {Object} options - Rendering options
   * @param {Function} options.filter - Should return true if passed node should be included in the output
   *          (excluding node means excluding it's children as well). Not called on the root node.
   * @param {String} options.bgcolor - color for the background, any valid CSS color value.
   * @param {Number} options.width - width to be applied to node before rendering.
   * @param {Number} options.height - height to be applied to node before rendering.
   * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
   * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
              defaults to 1.0.
    * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
    * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
    * @return {Promise} - A promise that is fulfilled with a SVG image data URL
    * */

function toSvg(node, options) {
  options = options || {};
  copyOptions(options);
  return Promise.resolve(node).then(function (nd) {
    return cloneNode(nd, options.filter, true);
  }).then(embedFonts).then(inlineImages).then(applyOptions).then(function (clone) {
    return makeSvgDataUri(clone, options.width || util.width(node), options.height || util.height(node));
  });

  function applyOptions(clone) {
    if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;
    if (options.width) clone.style.width = "".concat(options.width, "px");
    if (options.height) clone.style.height = "".concat(options.height, "px");
    if (options.style) Object.keys(options.style).forEach(function (property) {
      clone.style[property] = options.style[property];
    });
    return clone;
  }
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
 * */


function toPixelData(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.getContext('2d').getImageData(0, 0, util.width(node), util.height(node)).data;
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image data URL
 * */


function toPng(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.toDataURL();
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
 * */


function toJpeg(node, options) {
  options = options || {};
  return draw(node, options).then(function (canvas) {
    return canvas.toDataURL('image/jpeg', options.quality || 1.0);
  });
}
/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image blob
 * */


function toBlob(node, options) {
  return draw(node, options || {}).then(util.canvasToBlob);
}

function copyOptions(options) {
  // Copy options to impl options for use in impl
  if (typeof options.imagePlaceholder === 'undefined') {
    domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
  } else {
    domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
  }

  if (typeof options.cacheBust === 'undefined') {
    domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
  } else {
    domtoimage.impl.options.cacheBust = options.cacheBust;
  }
}

function draw(domNode, options) {
  return toSvg(domNode, options).then(util.makeImage).then(util.delay(100)).then(function (image) {
    var canvas = newCanvas(domNode);
    canvas.getContext('2d').drawImage(image, 0, 0);
    return canvas;
  });

  function newCanvas(dNode) {
    var canvas = _document["default"].createElement('canvas');

    canvas.width = options.width || util.width(dNode);
    canvas.height = options.height || util.height(dNode);

    if (options.bgcolor) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = options.bgcolor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  }
}

function cloneNode(node, filter, root) {
  if (!root && filter && !filter(node)) {
    return Promise.resolve();
  }

  return Promise.resolve(node).then(makeNodeCopy).then(function (clone) {
    return cloneChildren(node, clone, filter);
  }).then(function (clone) {
    return processClone(node, clone);
  });

  function makeNodeCopy(nd) {
    if (nd instanceof _window["default"].HTMLCanvasElement) {
      return util.makeImage(nd.toDataURL());
    }

    return nd.cloneNode(false);
  }

  function cloneChildren(original, clone, flt) {
    var children = original.childNodes;

    if (children.length === 0) {
      return Promise.resolve(clone);
    }

    return cloneChildrenInOrder(clone, util.asArray(children)).then(function () {
      return clone;
    });

    function cloneChildrenInOrder(parent, arrChildren) {
      var done = Promise.resolve();
      arrChildren.forEach(function (child) {
        done = done.then(function () {
          return cloneNode(child, flt);
        }).then(function (childClone) {
          if (childClone) parent.appendChild(childClone);
        });
      });
      return done;
    }
  }

  function processClone(original, clone) {
    if (!(clone instanceof _window["default"].Element)) {
      return clone;
    }

    ;
    return Promise.resolve().then(cloneStyle).then(clonePseudoElements).then(copyUserInput).then(fixSvg).then(function () {
      return clone;
    });

    function cloneStyle() {
      var originalStyle = _window["default"].getComputedStyle(original);

      copyStyle(originalStyle, clone.style);

      function copyStyle(source, target) {
        if (source.cssText) {
          target.cssText = source.cssText; // add additional copy of composite styles

          if (source.font) {
            target.font = source.font;
          }
        } else {
          copyProperties(source, target);
        }

        function copyProperties(sourceStyle, targetStyle) {
          var propertyKeys = util.asArray(sourceStyle);
          propertyKeys.forEach(function (name) {
            targetStyle.setProperty(name, sourceStyle.getPropertyValue(name), sourceStyle.getPropertyPriority(name));
          });
        }
      }
    }

    function clonePseudoElements() {
      [':before', ':after'].forEach(function (element) {
        return clonePseudoElement(element);
      });

      function clonePseudoElement(element) {
        var style = _window["default"].getComputedStyle(original, element);

        var content = style.getPropertyValue('content');

        if (content === '' || content === 'none') {
          return;
        }

        var className = util.uid();
        clone.className = "".concat(clone.className, " ").concat(className);

        var styleElement = _document["default"].createElement('style');

        styleElement.appendChild(formatPseudoElementStyle(className, element, style));
        clone.appendChild(styleElement);

        function formatPseudoElementStyle(cln, elm, stl) {
          var selector = ".".concat(cln, ":").concat(elm);
          var cssText = stl.cssText ? formatCssText(stl) : formatCssProperties(stl);
          return _document["default"].createTextNode("".concat(selector, "{").concat(cssText, "}"));

          function formatCssText(stl1) {
            var cnt = stl1.getPropertyValue('content');
            return "".concat(stl.cssText, " content: ").concat(cnt, ";");
          }

          function formatCssProperties(stl2) {
            return "".concat(util.asArray(stl2).map(formatProperty).join('; '), ";");

            function formatProperty(name) {
              return "".concat(name, ":").concat(stl.getPropertyValue(name)).concat(stl.getPropertyPriority(name) ? ' !important' : '');
            }
          }
        }
      }
    }

    function copyUserInput() {
      if (original instanceof _window["default"].HTMLTextAreaElement) clone.innerHTML = original.value;
      if (original instanceof _window["default"].HTMLInputElement) clone.setAttribute('value', original.value);
    }

    function fixSvg() {
      if (!(clone instanceof _window["default"].SVGElement)) return;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      if (!(clone instanceof _window["default"].SVGRectElement)) return;
      ['width', 'height'].forEach(function (attribute) {
        var value = clone.getAttribute(attribute);
        if (!value) return;
        clone.style.setProperty(attribute, value);
      });
    }
  }
}

function embedFonts(node) {
  return fontFaces.resolveAll().then(function (cssText) {
    var styleNode = _document["default"].createElement('style');

    node.appendChild(styleNode);
    styleNode.appendChild(_document["default"].createTextNode(cssText));
    return node;
  });
}

function inlineImages(node) {
  return images.inlineAll(node).then(function () {
    return node;
  });
}

function makeSvgDataUri(node, width, height) {
  return Promise.resolve(node).then(function (nd) {
    nd.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    var serializedString = new _window["default"].XMLSerializer().serializeToString(nd);
    var xhtml = util.escapeXhtml(serializedString);
    var foreignObject = "<foreignObject x=\"0\" y=\"0\" width=\"100%\" height=\"100%\">".concat(xhtml, "</foreignObject>");
    var svgStr = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"".concat(width, "\" height=\"").concat(height, "\">").concat(foreignObject, "</svg>"); // Optimizing SVGs in data URIs
    // see https://codepen.io/tigt/post/optimizing-svgs-in-data-uris
    // the best way of encoding SVG in a data: URI is data:image/svg+xml,[actual data].
    // We don’t need the ;charset=utf-8 parameter because the given SVG is ASCII.

    return (0, _miniSvgDataUri["default"])(svgStr);
  });
}

function newUtil() {
  return {
    escape: escape,
    parseExtension: parseExtension,
    mimeType: mimeType,
    dataAsUrl: dataAsUrl,
    isDataUrl: isDataUrl,
    isSrcAsDataUrl: isSrcAsDataUrl,
    canvasToBlob: canvasToBlob,
    resolveUrl: resolveUrl,
    getAndEncode: getAndEncode,
    uid: uid(),
    delay: delay,
    asArray: asArray,
    escapeXhtml: escapeXhtml,
    makeImage: makeImage,
    width: width,
    height: height
  };

  function mimes() {
    /*
    * Only WOFF and EOT mime types for fonts are 'real'
    * see http://www.iana.org/assignments/media-types/media-types.xhtml
    */
    var WOFF = 'application/font-woff';
    var JPEG = 'image/jpeg';
    return {
      woff: WOFF,
      woff2: WOFF,
      ttf: 'application/font-truetype',
      eot: 'application/vnd.ms-fontobject',
      png: 'image/png',
      jpg: JPEG,
      jpeg: JPEG,
      gif: 'image/gif',
      tiff: 'image/tiff',
      svg: 'image/svg+xml'
    };
  }

  function parseExtension(url) {
    var match = /\.([^\.\/]*?)$/g.exec(url);

    if (match) {
      return match[1];
    }

    return '';
  }

  function mimeType(url) {
    var extension = parseExtension(url).toLowerCase();
    return mimes()[extension] || '';
  }

  function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
  }

  function isSrcAsDataUrl(text) {
    var DATA_URL_REGEX = /url\(['"]?(data:)([^'"]+?)['"]?\)/;
    return text.search(DATA_URL_REGEX) !== -1;
  }

  function cvToBlob(canvas) {
    return new Promise(function (resolve) {
      var binaryString = _window["default"].atob(canvas.toDataURL().split(',')[1]);

      var length = binaryString.length;
      var binaryArray = new Uint8Array(length);

      for (var i = 0; i < length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }

      resolve(new _window["default"].Blob([binaryArray], {
        type: 'image/png'
      }));
    });
  }

  function canvasToBlob(canvas) {
    if (canvas.toBlob) return new Promise(function (resolve) {
      canvas.toBlob(resolve);
    });
    return cvToBlob(canvas);
  }

  function resolveUrl(url, baseUrl) {
    var doc = _document["default"].implementation.createHTMLDocument();

    var base = doc.createElement('base');
    doc.head.appendChild(base);
    var a = doc.createElement('a');
    doc.body.appendChild(a);
    base.href = baseUrl;
    a.href = url;
    return a.href;
  }

  function fourRandomChars() {
    /* see http://stackoverflow.com/a/6248722/2519373 */
    return "0000".concat((Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  }

  function uid() {
    var index = 0;
    return function () {
      return "u".concat(fourRandomChars()).concat(index++);
    };
  }

  function makeImage(uri) {
    return new Promise(function (resolve, reject) {
      var image = new _window["default"].Image();

      image.onload = function () {
        resolve(image);
      };

      image.onerror = function (err) {
        var message = _userFeedbacks.IMAGE_EXPORT_ERRORS.dataUri;

        _console["default"].log(uri); // error is an Event Object
        // https://www.w3schools.com/jsref/obj_event.asp


        reject({
          event: err,
          message: message
        });
      };

      image.src = uri;
    });
  }

  function getAndEncode(url) {
    var TIMEOUT = 30000;

    if (domtoimage.impl.options.cacheBust) {
      // Cache bypass so we dont have CORS issues with cached images
      // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
      url += (/\?/.test(url) ? '&' : '?') + new Date().getTime();
    }

    return new Promise(function (resolve) {
      var request = new _window["default"].XMLHttpRequest();
      request.onreadystatechange = done;
      request.ontimeout = timeout;
      request.responseType = 'blob';
      request.timeout = TIMEOUT;
      request.open('GET', url, true);
      request.send();
      var placeholder;

      if (domtoimage.impl.options.imagePlaceholder) {
        var split = domtoimage.impl.options.imagePlaceholder.split(/,/);

        if (split && split[1]) {
          placeholder = split[1];
        }
      }

      function done() {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
          if (placeholder) {
            resolve(placeholder);
          } else {
            fail("cannot fetch resource: ".concat(url, ", status: ").concat(request.status));
          }

          return;
        }

        var encoder = new _window["default"].FileReader();

        encoder.onloadend = function () {
          var content = encoder.result.split(/,/)[1];
          resolve(content);
        };

        encoder.readAsDataURL(request.response);
      }

      function timeout() {
        if (placeholder) {
          resolve(placeholder);
        } else {
          fail("timeout of ".concat(TIMEOUT, "ms occurred while fetching resource: ").concat(url));
        }
      }

      function fail(message) {
        _console["default"].error(message);

        resolve('');
      }
    });
  }

  function dataAsUrl(content, type) {
    return "data:".concat(type, ";base64,").concat(content);
  }

  function escape(string) {
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
  }

  function delay(ms) {
    return function (arg) {
      return new Promise(function (resolve) {
        _window["default"].setTimeout(function () {
          resolve(arg);
        }, ms);
      });
    };
  }

  function asArray(arrayLike) {
    var array = [];
    var length = arrayLike.length;

    for (var i = 0; i < length; i++) {
      array.push(arrayLike[i]);
    }

    return array;
  }

  function escapeXhtml(string) {
    return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
  }

  function width(node) {
    var leftBorder = px(node, 'border-left-width');
    var rightBorder = px(node, 'border-right-width');
    return node.scrollWidth + leftBorder + rightBorder;
  }

  function height(node) {
    var topBorder = px(node, 'border-top-width');
    var bottomBorder = px(node, 'border-bottom-width');
    return node.scrollHeight + topBorder + bottomBorder;
  }

  function px(node, styleProperty) {
    var value = _window["default"].getComputedStyle(node).getPropertyValue(styleProperty);

    return parseFloat(value.replace('px', ''));
  }
}

function newInliner() {
  var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
  return {
    inlineAll: inlineAll,
    shouldProcess: shouldProcess,
    impl: {
      readUrls: readUrls,
      inline: inline
    }
  };

  function shouldProcess(string) {
    return string.search(URL_REGEX) !== -1;
  }

  function readUrls(string) {
    var result = [];
    var match;

    while ((match = URL_REGEX.exec(string)) !== null) {
      result.push(match[1]);
    }

    return result.filter(function (url) {
      return !util.isDataUrl(url);
    });
  }

  function inline(string, url, baseUrl, get) {
    return Promise.resolve(url).then(function (ul) {
      return baseUrl ? util.resolveUrl(ul, baseUrl) : ul;
    }).then(get || util.getAndEncode).then(function (data) {
      return util.dataAsUrl(data, util.mimeType(url));
    }).then(function (dataUrl) {
      return string.replace(urlAsRegex(url), "$1".concat(dataUrl, "$3"));
    });

    function urlAsRegex(url0) {
      return new RegExp("(url\\(['\"]?)(".concat(util.escape(url0), ")(['\"]?\\))"), 'g');
    }
  }

  function inlineAll(string, baseUrl, get) {
    if (nothingToInline() || util.isSrcAsDataUrl(string)) {
      return Promise.resolve(string);
    }

    return Promise.resolve(string).then(readUrls).then(function (urls) {
      var done = Promise.resolve(string);
      urls.forEach(function (url) {
        done = done.then(function (str) {
          return inline(str, url, baseUrl, get);
        });
      });
      return done;
    });

    function nothingToInline() {
      return !shouldProcess(string);
    }
  }
}

function newFontFaces() {
  return {
    resolveAll: resolveAll,
    impl: {
      readAll: readAll
    }
  };

  function resolveAll() {
    return readAll(_document["default"]).then(function (webFonts) {
      return Promise.all(webFonts.map(function (webFont) {
        return webFont.resolve();
      }));
    }).then(function (cssStrings) {
      return cssStrings.join('\n');
    });
  }

  function readAll() {
    return Promise.resolve(util.asArray(_document["default"].styleSheets)).then(loadExternalStyleSheets).then(getCssRules).then(selectWebFontRules).then(function (rules) {
      return rules.map(newWebFont);
    });

    function selectWebFontRules(cssRules) {
      return cssRules.filter(function (rule) {
        return rule.type === _window["default"].CSSRule.FONT_FACE_RULE;
      }).filter(function (rule) {
        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
      });
    }

    function loadExternalStyleSheets(styleSheets) {
      return Promise.all(styleSheets.map(function (sheet) {
        if (sheet.href) {
          // cloudfont doesn't have allow origin header properly set
          // error response will remain in cache
          var cache = sheet.href.includes('uber-fonts') ? 'no-cache' : 'default';
          return _window["default"].fetch(sheet.href, {
            credentials: 'omit',
            cache: cache
          }).then(toText).then(setBaseHref(sheet.href)).then(toStyleSheet)["catch"](function (err) {
            // Handle any error that occurred in any of the previous
            // promises in the chain. stylesheet failed to load should not stop
            // the process, hence result in only a warning, instead of reject
            _console["default"].warn(_userFeedbacks.IMAGE_EXPORT_ERRORS.styleSheet, sheet.href);

            _console["default"].log(err);

            return;
          });
        }

        return Promise.resolve(sheet);
      }));

      function toText(response) {
        return response.text();
      }

      function setBaseHref(base) {
        base = base.split('/');
        base.pop();
        base = base.join('/');
        return function (text) {
          return util.isSrcAsDataUrl(text) ? text : text.replace(/url\(['"]?([^'"]+?)['"]?\)/g, addBaseHrefToUrl);
        };

        function addBaseHrefToUrl(match, p1) {
          var url = /^http/i.test(p1) ? p1 : concatAndResolveUrl(base, p1);
          return "url('".concat(url, "')");
        } // Source: http://stackoverflow.com/a/2676231/3786856


        function concatAndResolveUrl(url, concat) {
          var url1 = url.split('/');
          var url2 = concat.split('/');
          var url3 = [];

          for (var i = 0, l = url1.length; i < l; i++) {
            if (url1[i] === '..') {
              url3.pop();
            } else if (url1[i] !== '.') {
              url3.push(url1[i]);
            }
          }

          for (var _i = 0, _l = url2.length; _i < _l; _i++) {
            if (url2[_i] === '..') {
              url3.pop();
            } else if (url2[_i] !== '.') {
              url3.push(url2[_i]);
            }
          }

          return url3.join('/');
        }
      }

      function toStyleSheet(text) {
        var doc = _document["default"].implementation.createHTMLDocument('');

        var styleElement = _document["default"].createElement('style');

        styleElement.textContent = text;
        doc.body.appendChild(styleElement);
        return styleElement.sheet;
      }
    }

    function getCssRules(styleSheets) {
      var cssRules = [];
      styleSheets.forEach(function (sheet) {
        // try...catch because browser may not able to enumerate rules for cross-domain sheets
        if (!sheet) {
          return;
        }

        var rules;

        try {
          rules = sheet.rules || sheet.cssRules;
        } catch (e) {
          _console["default"].log("'Can't read the css rules of: ".concat(sheet.href), e);

          return;
        }

        if (rules && (0, _typeof2["default"])(rules) === 'object') {
          try {
            util.asArray(rules || []).forEach(cssRules.push.bind(cssRules));
          } catch (e) {
            _console["default"].log("Error while reading CSS rules from ".concat(sheet.href), e);

            return;
          }
        } else {
          _console["default"].log('getCssRules can not find cssRules');

          return;
        }
      });
      return cssRules;
    }

    function newWebFont(webFontRule) {
      return {
        resolve: function resolve() {
          var baseUrl = (webFontRule.parentStyleSheet || {}).href;
          return inliner.inlineAll(webFontRule.cssText, baseUrl);
        },
        src: function src() {
          return webFontRule.style.getPropertyValue('src');
        }
      };
    }
  }
}

function newImages() {
  return {
    inlineAll: inlineAll,
    impl: {
      newImage: newImage
    }
  };

  function newImage(element) {
    return {
      inline: inline
    };

    function inline(get) {
      if (util.isDataUrl(element.src)) {
        return Promise.resolve();
      }

      return Promise.resolve(element.src).then(get || util.getAndEncode).then(function (data) {
        return util.dataAsUrl(data, util.mimeType(element.src));
      }).then(function (dataUrl) {
        return new Promise(function (resolve, reject) {
          element.onload = resolve;
          element.onerror = reject;
          element.src = dataUrl;
        });
      });
    }
  }

  function inlineAll(node) {
    if (!(node instanceof Element)) {
      return Promise.resolve(node);
    }

    return inlineBackground(node).then(function () {
      if (node instanceof HTMLImageElement) {
        return newImage(node).inline();
      }

      return Promise.all(util.asArray(node.childNodes).map(function (child) {
        return inlineAll(child);
      }));
    });

    function inlineBackground(nd) {
      var background = nd.style.getPropertyValue('background');

      if (!background) {
        return Promise.resolve(nd);
      }

      return inliner.inlineAll(background).then(function (inlined) {
        nd.style.setProperty('background', inlined, nd.style.getPropertyPriority('background'));
      }).then(function () {
        return nd;
      });
    }
  }
}

var _default = domtoimage;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb20tdG8taW1hZ2UuanMiXSwibmFtZXMiOlsidXRpbCIsIm5ld1V0aWwiLCJpbmxpbmVyIiwibmV3SW5saW5lciIsImZvbnRGYWNlcyIsIm5ld0ZvbnRGYWNlcyIsImltYWdlcyIsIm5ld0ltYWdlcyIsImRlZmF1bHRPcHRpb25zIiwiaW1hZ2VQbGFjZWhvbGRlciIsInVuZGVmaW5lZCIsImNhY2hlQnVzdCIsImRvbXRvaW1hZ2UiLCJ0b1N2ZyIsInRvUG5nIiwidG9KcGVnIiwidG9CbG9iIiwidG9QaXhlbERhdGEiLCJpbXBsIiwib3B0aW9ucyIsIm5vZGUiLCJjb3B5T3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsIm5kIiwiY2xvbmVOb2RlIiwiZmlsdGVyIiwiZW1iZWRGb250cyIsImlubGluZUltYWdlcyIsImFwcGx5T3B0aW9ucyIsImNsb25lIiwibWFrZVN2Z0RhdGFVcmkiLCJ3aWR0aCIsImhlaWdodCIsImJnY29sb3IiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHJvcGVydHkiLCJkcmF3IiwiY2FudmFzIiwiZ2V0Q29udGV4dCIsImdldEltYWdlRGF0YSIsImRhdGEiLCJ0b0RhdGFVUkwiLCJxdWFsaXR5IiwiY2FudmFzVG9CbG9iIiwiZG9tTm9kZSIsIm1ha2VJbWFnZSIsImRlbGF5IiwiaW1hZ2UiLCJuZXdDYW52YXMiLCJkcmF3SW1hZ2UiLCJkTm9kZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImN0eCIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwicm9vdCIsIm1ha2VOb2RlQ29weSIsImNsb25lQ2hpbGRyZW4iLCJwcm9jZXNzQ2xvbmUiLCJ3aW5kb3ciLCJIVE1MQ2FudmFzRWxlbWVudCIsIm9yaWdpbmFsIiwiZmx0IiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiY2xvbmVDaGlsZHJlbkluT3JkZXIiLCJhc0FycmF5IiwicGFyZW50IiwiYXJyQ2hpbGRyZW4iLCJkb25lIiwiY2hpbGQiLCJjaGlsZENsb25lIiwiYXBwZW5kQ2hpbGQiLCJFbGVtZW50IiwiY2xvbmVTdHlsZSIsImNsb25lUHNldWRvRWxlbWVudHMiLCJjb3B5VXNlcklucHV0IiwiZml4U3ZnIiwib3JpZ2luYWxTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJjb3B5U3R5bGUiLCJzb3VyY2UiLCJ0YXJnZXQiLCJjc3NUZXh0IiwiZm9udCIsImNvcHlQcm9wZXJ0aWVzIiwic291cmNlU3R5bGUiLCJ0YXJnZXRTdHlsZSIsInByb3BlcnR5S2V5cyIsIm5hbWUiLCJzZXRQcm9wZXJ0eSIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRQcm9wZXJ0eVByaW9yaXR5IiwiZWxlbWVudCIsImNsb25lUHNldWRvRWxlbWVudCIsImNvbnRlbnQiLCJjbGFzc05hbWUiLCJ1aWQiLCJzdHlsZUVsZW1lbnQiLCJmb3JtYXRQc2V1ZG9FbGVtZW50U3R5bGUiLCJjbG4iLCJlbG0iLCJzdGwiLCJzZWxlY3RvciIsImZvcm1hdENzc1RleHQiLCJmb3JtYXRDc3NQcm9wZXJ0aWVzIiwiY3JlYXRlVGV4dE5vZGUiLCJzdGwxIiwiY250Iiwic3RsMiIsIm1hcCIsImZvcm1hdFByb3BlcnR5Iiwiam9pbiIsIkhUTUxUZXh0QXJlYUVsZW1lbnQiLCJpbm5lckhUTUwiLCJ2YWx1ZSIsIkhUTUxJbnB1dEVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJTVkdFbGVtZW50IiwiU1ZHUmVjdEVsZW1lbnQiLCJhdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJyZXNvbHZlQWxsIiwic3R5bGVOb2RlIiwiaW5saW5lQWxsIiwic2VyaWFsaXplZFN0cmluZyIsIlhNTFNlcmlhbGl6ZXIiLCJzZXJpYWxpemVUb1N0cmluZyIsInhodG1sIiwiZXNjYXBlWGh0bWwiLCJmb3JlaWduT2JqZWN0Iiwic3ZnU3RyIiwiZXNjYXBlIiwicGFyc2VFeHRlbnNpb24iLCJtaW1lVHlwZSIsImRhdGFBc1VybCIsImlzRGF0YVVybCIsImlzU3JjQXNEYXRhVXJsIiwicmVzb2x2ZVVybCIsImdldEFuZEVuY29kZSIsIm1pbWVzIiwiV09GRiIsIkpQRUciLCJ3b2ZmIiwid29mZjIiLCJ0dGYiLCJlb3QiLCJwbmciLCJqcGciLCJqcGVnIiwiZ2lmIiwidGlmZiIsInN2ZyIsInVybCIsIm1hdGNoIiwiZXhlYyIsImV4dGVuc2lvbiIsInRvTG93ZXJDYXNlIiwic2VhcmNoIiwidGV4dCIsIkRBVEFfVVJMX1JFR0VYIiwiY3ZUb0Jsb2IiLCJiaW5hcnlTdHJpbmciLCJhdG9iIiwic3BsaXQiLCJiaW5hcnlBcnJheSIsIlVpbnQ4QXJyYXkiLCJpIiwiY2hhckNvZGVBdCIsIkJsb2IiLCJ0eXBlIiwiYmFzZVVybCIsImRvYyIsImltcGxlbWVudGF0aW9uIiwiY3JlYXRlSFRNTERvY3VtZW50IiwiYmFzZSIsImhlYWQiLCJhIiwiYm9keSIsImhyZWYiLCJmb3VyUmFuZG9tQ2hhcnMiLCJNYXRoIiwicmFuZG9tIiwicG93IiwidG9TdHJpbmciLCJzbGljZSIsImluZGV4IiwidXJpIiwicmVqZWN0IiwiSW1hZ2UiLCJvbmxvYWQiLCJvbmVycm9yIiwiZXJyIiwibWVzc2FnZSIsIklNQUdFX0VYUE9SVF9FUlJPUlMiLCJkYXRhVXJpIiwiY29uc29sZSIsImxvZyIsImV2ZW50Iiwic3JjIiwiVElNRU9VVCIsInRlc3QiLCJEYXRlIiwiZ2V0VGltZSIsInJlcXVlc3QiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsIm9udGltZW91dCIsInRpbWVvdXQiLCJyZXNwb25zZVR5cGUiLCJvcGVuIiwic2VuZCIsInBsYWNlaG9sZGVyIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImZhaWwiLCJlbmNvZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZGVuZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJyZXNwb25zZSIsImVycm9yIiwic3RyaW5nIiwicmVwbGFjZSIsIm1zIiwiYXJnIiwic2V0VGltZW91dCIsImFycmF5TGlrZSIsImFycmF5IiwicHVzaCIsImxlZnRCb3JkZXIiLCJweCIsInJpZ2h0Qm9yZGVyIiwic2Nyb2xsV2lkdGgiLCJ0b3BCb3JkZXIiLCJib3R0b21Cb3JkZXIiLCJzY3JvbGxIZWlnaHQiLCJzdHlsZVByb3BlcnR5IiwicGFyc2VGbG9hdCIsIlVSTF9SRUdFWCIsInNob3VsZFByb2Nlc3MiLCJyZWFkVXJscyIsImlubGluZSIsImdldCIsInVsIiwiZGF0YVVybCIsInVybEFzUmVnZXgiLCJ1cmwwIiwiUmVnRXhwIiwibm90aGluZ1RvSW5saW5lIiwidXJscyIsInN0ciIsInJlYWRBbGwiLCJ3ZWJGb250cyIsImFsbCIsIndlYkZvbnQiLCJjc3NTdHJpbmdzIiwic3R5bGVTaGVldHMiLCJsb2FkRXh0ZXJuYWxTdHlsZVNoZWV0cyIsImdldENzc1J1bGVzIiwic2VsZWN0V2ViRm9udFJ1bGVzIiwicnVsZXMiLCJuZXdXZWJGb250IiwiY3NzUnVsZXMiLCJydWxlIiwiQ1NTUnVsZSIsIkZPTlRfRkFDRV9SVUxFIiwic2hlZXQiLCJjYWNoZSIsImluY2x1ZGVzIiwiZmV0Y2giLCJjcmVkZW50aWFscyIsInRvVGV4dCIsInNldEJhc2VIcmVmIiwidG9TdHlsZVNoZWV0Iiwid2FybiIsInN0eWxlU2hlZXQiLCJwb3AiLCJhZGRCYXNlSHJlZlRvVXJsIiwicDEiLCJjb25jYXRBbmRSZXNvbHZlVXJsIiwiY29uY2F0IiwidXJsMSIsInVybDIiLCJ1cmwzIiwibCIsInRleHRDb250ZW50IiwiZSIsImJpbmQiLCJ3ZWJGb250UnVsZSIsInBhcmVudFN0eWxlU2hlZXQiLCJuZXdJbWFnZSIsImlubGluZUJhY2tncm91bmQiLCJIVE1MSW1hZ2VFbGVtZW50IiwiYmFja2dyb3VuZCIsImlubGluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBeUJBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQTdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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TyxDQUNYa0ksU0FESSxDQUNNMkssVUFETixFQUVKdlIsSUFGSSxDQUVDLFVBQUF3UixPQUFPLEVBQUk7QUFDZnZSLFFBQUFBLEVBQUUsQ0FBQ1csS0FBSCxDQUFTOEQsV0FBVCxDQUNFLFlBREYsRUFFRThNLE9BRkYsRUFHRXZSLEVBQUUsQ0FBQ1csS0FBSCxDQUFTZ0UsbUJBQVQsQ0FBNkIsWUFBN0IsQ0FIRjtBQUtELE9BUkksRUFTSjVFLElBVEksQ0FTQztBQUFBLGVBQU1DLEVBQU47QUFBQSxPQVRELENBQVA7QUFVRDtBQUNGO0FBQ0Y7O2VBRWNiLFUiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTkgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIFRoaXMgZmlsZSBpcyBjb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdHNheWVuL2RvbS10by1pbWFnZVxuICogTW9kaWZpZWQgYnkgaGVzaGFuMDEzMSB0byBhbGxvdyBsb2FkaW5nIGV4dGVybmFsIHN0eWxlc2hlZXRzIGFuZCBpbmxpbmUgd2ViZm9udHNcbiAqL1xuXG5pbXBvcnQgd2luZG93IGZyb20gJ2dsb2JhbC93aW5kb3cnO1xuaW1wb3J0IGRvY3VtZW50IGZyb20gJ2dsb2JhbC9kb2N1bWVudCc7XG5pbXBvcnQgY29uc29sZSBmcm9tICdnbG9iYWwvY29uc29sZSc7XG5pbXBvcnQgc3ZnVG9NaW5pRGF0YVVSSSBmcm9tICdtaW5pLXN2Zy1kYXRhLXVyaSc7XG5pbXBvcnQge0lNQUdFX0VYUE9SVF9FUlJPUlN9IGZyb20gJ2NvbnN0YW50cy91c2VyLWZlZWRiYWNrcyc7XG5cbmNvbnN0IHV0aWwgPSBuZXdVdGlsKCk7XG5jb25zdCBpbmxpbmVyID0gbmV3SW5saW5lcigpO1xuY29uc3QgZm9udEZhY2VzID0gbmV3Rm9udEZhY2VzKCk7XG5jb25zdCBpbWFnZXMgPSBuZXdJbWFnZXMoKTtcbi8vIERlZmF1bHQgaW1wbCBvcHRpb25zXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgLy8gRGVmYXVsdCBpcyB0byBmYWlsIG9uIGVycm9yLCBubyBwbGFjZWhvbGRlclxuICBpbWFnZVBsYWNlaG9sZGVyOiB1bmRlZmluZWQsXG4gIC8vIERlZmF1bHQgY2FjaGUgYnVzdCBpcyBmYWxzZSwgaXQgd2lsbCB1c2UgdGhlIGNhY2hlXG4gIGNhY2hlQnVzdDogZmFsc2Vcbn07XG5cbmNvbnN0IGRvbXRvaW1hZ2UgPSB7XG4gIHRvU3ZnLFxuICB0b1BuZyxcbiAgdG9KcGVnLFxuICB0b0Jsb2IsXG4gIHRvUGl4ZWxEYXRhLFxuICBpbXBsOiB7XG4gICAgZm9udEZhY2VzLFxuICAgIGltYWdlcyxcbiAgICB1dGlsLFxuICAgIGlubGluZXIsXG4gICAgb3B0aW9uczoge31cbiAgfVxufTtcblxuLyoqXG4gICAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBET00gTm9kZSBvYmplY3QgdG8gcmVuZGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5maWx0ZXIgLSBTaG91bGQgcmV0dXJuIHRydWUgaWYgcGFzc2VkIG5vZGUgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSBvdXRwdXRcbiAgICogICAgICAgICAgKGV4Y2x1ZGluZyBub2RlIG1lYW5zIGV4Y2x1ZGluZyBpdCdzIGNoaWxkcmVuIGFzIHdlbGwpLiBOb3QgY2FsbGVkIG9uIHRoZSByb290IG5vZGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmJnY29sb3IgLSBjb2xvciBmb3IgdGhlIGJhY2tncm91bmQsIGFueSB2YWxpZCBDU1MgY29sb3IgdmFsdWUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLndpZHRoIC0gd2lkdGggdG8gYmUgYXBwbGllZCB0byBub2RlIGJlZm9yZSByZW5kZXJpbmcuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIGhlaWdodCB0byBiZSBhcHBsaWVkIHRvIG5vZGUgYmVmb3JlIHJlbmRlcmluZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuc3R5bGUgLSBhbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyB0byBiZSBjb3BpZWQgdG8gbm9kZSdzIHN0eWxlIGJlZm9yZSByZW5kZXJpbmcuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLnF1YWxpdHkgLSBhIE51bWJlciBiZXR3ZWVuIDAgYW5kIDEgaW5kaWNhdGluZyBpbWFnZSBxdWFsaXR5IChhcHBsaWNhYmxlIHRvIEpQRUcgb25seSksXG4gICAgICAgICAgICAgIGRlZmF1bHRzIHRvIDEuMC5cbiAgICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmltYWdlUGxhY2Vob2xkZXIgLSBkYXRhVVJMIHRvIHVzZSBhcyBhIHBsYWNlaG9sZGVyIGZvciBmYWlsZWQgaW1hZ2VzLCBkZWZhdWx0IGJlaGF2aW91ciBpcyB0byBmYWlsIGZhc3Qgb24gaW1hZ2VzIHdlIGNhbid0IGZldGNoXG4gICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuY2FjaGVCdXN0IC0gc2V0IHRvIHRydWUgdG8gY2FjaGUgYnVzdCBieSBhcHBlbmRpbmcgdGhlIHRpbWUgdG8gdGhlIHJlcXVlc3QgdXJsXG4gICAgKiBAcmV0dXJuIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIGEgU1ZHIGltYWdlIGRhdGEgVVJMXG4gICAgKiAqL1xuZnVuY3Rpb24gdG9Tdmcobm9kZSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgY29weU9wdGlvbnMob3B0aW9ucyk7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobm9kZSlcbiAgICAudGhlbihuZCA9PiBjbG9uZU5vZGUobmQsIG9wdGlvbnMuZmlsdGVyLCB0cnVlKSlcbiAgICAudGhlbihlbWJlZEZvbnRzKVxuICAgIC50aGVuKGlubGluZUltYWdlcylcbiAgICAudGhlbihhcHBseU9wdGlvbnMpXG4gICAgLnRoZW4oY2xvbmUgPT5cbiAgICAgIG1ha2VTdmdEYXRhVXJpKFxuICAgICAgICBjbG9uZSxcbiAgICAgICAgb3B0aW9ucy53aWR0aCB8fCB1dGlsLndpZHRoKG5vZGUpLFxuICAgICAgICBvcHRpb25zLmhlaWdodCB8fCB1dGlsLmhlaWdodChub2RlKVxuICAgICAgKVxuICAgICk7XG5cbiAgZnVuY3Rpb24gYXBwbHlPcHRpb25zKGNsb25lKSB7XG4gICAgaWYgKG9wdGlvbnMuYmdjb2xvcikgY2xvbmUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iZ2NvbG9yO1xuXG4gICAgaWYgKG9wdGlvbnMud2lkdGgpIGNsb25lLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1weGA7XG4gICAgaWYgKG9wdGlvbnMuaGVpZ2h0KSBjbG9uZS5zdHlsZS5oZWlnaHQgPSBgJHtvcHRpb25zLmhlaWdodH1weGA7XG5cbiAgICBpZiAob3B0aW9ucy5zdHlsZSlcbiAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMuc3R5bGUpLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICAgIGNsb25lLnN0eWxlW3Byb3BlcnR5XSA9IG9wdGlvbnMuc3R5bGVbcHJvcGVydHldO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgRE9NIE5vZGUgb2JqZWN0IHRvIHJlbmRlclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBSZW5kZXJpbmcgb3B0aW9ucywgQHNlZSB7QGxpbmsgdG9Tdmd9XG4gKiBAcmV0dXJuIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIGEgVWludDhBcnJheSBjb250YWluaW5nIFJHQkEgcGl4ZWwgZGF0YS5cbiAqICovXG5mdW5jdGlvbiB0b1BpeGVsRGF0YShub2RlLCBvcHRpb25zKSB7XG4gIHJldHVybiBkcmF3KG5vZGUsIG9wdGlvbnMgfHwge30pLnRoZW4oY2FudmFzID0+XG4gICAgY2FudmFzXG4gICAgICAuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgLmdldEltYWdlRGF0YSgwLCAwLCB1dGlsLndpZHRoKG5vZGUpLCB1dGlsLmhlaWdodChub2RlKSkuZGF0YVxuICApO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBET00gTm9kZSBvYmplY3QgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLCBAc2VlIHtAbGluayB0b1N2Z31cbiAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBQTkcgaW1hZ2UgZGF0YSBVUkxcbiAqICovXG5mdW5jdGlvbiB0b1BuZyhub2RlLCBvcHRpb25zKSB7XG4gIHJldHVybiBkcmF3KG5vZGUsIG9wdGlvbnMgfHwge30pLnRoZW4oY2FudmFzID0+IGNhbnZhcy50b0RhdGFVUkwoKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIERPTSBOb2RlIG9iamVjdCB0byByZW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnMsIEBzZWUge0BsaW5rIHRvU3ZnfVxuICogQHJldHVybiB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2l0aCBhIEpQRUcgaW1hZ2UgZGF0YSBVUkxcbiAqICovXG5mdW5jdGlvbiB0b0pwZWcobm9kZSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgcmV0dXJuIGRyYXcobm9kZSwgb3B0aW9ucykudGhlbihjYW52YXMgPT4gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycsIG9wdGlvbnMucXVhbGl0eSB8fCAxLjApKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgRE9NIE5vZGUgb2JqZWN0IHRvIHJlbmRlclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBSZW5kZXJpbmcgb3B0aW9ucywgQHNlZSB7QGxpbmsgdG9Tdmd9XG4gKiBAcmV0dXJuIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIGEgUE5HIGltYWdlIGJsb2JcbiAqICovXG5mdW5jdGlvbiB0b0Jsb2Iobm9kZSwgb3B0aW9ucykge1xuICByZXR1cm4gZHJhdyhub2RlLCBvcHRpb25zIHx8IHt9KS50aGVuKHV0aWwuY2FudmFzVG9CbG9iKTtcbn1cblxuZnVuY3Rpb24gY29weU9wdGlvbnMob3B0aW9ucykge1xuICAvLyBDb3B5IG9wdGlvbnMgdG8gaW1wbCBvcHRpb25zIGZvciB1c2UgaW4gaW1wbFxuICBpZiAodHlwZW9mIG9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkb210b2ltYWdlLmltcGwub3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyID1cbiAgICAgIGRlZmF1bHRPcHRpb25zLmltYWdlUGxhY2Vob2xkZXI7XG4gIH0gZWxzZSB7XG4gICAgZG9tdG9pbWFnZS5pbXBsLm9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlciA9IG9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlcjtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5jYWNoZUJ1c3QgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZG9tdG9pbWFnZS5pbXBsLm9wdGlvbnMuY2FjaGVCdXN0ID0gZGVmYXVsdE9wdGlvbnMuY2FjaGVCdXN0O1xuICB9IGVsc2Uge1xuICAgIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmNhY2hlQnVzdCA9IG9wdGlvbnMuY2FjaGVCdXN0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXcoZG9tTm9kZSwgb3B0aW9ucykge1xuICByZXR1cm4gdG9TdmcoZG9tTm9kZSwgb3B0aW9ucylcbiAgICAudGhlbih1dGlsLm1ha2VJbWFnZSlcbiAgICAudGhlbih1dGlsLmRlbGF5KDEwMCkpXG4gICAgLnRoZW4oaW1hZ2UgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gbmV3Q2FudmFzKGRvbU5vZGUpO1xuICAgICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgIHJldHVybiBjYW52YXM7XG4gICAgfSk7XG5cbiAgZnVuY3Rpb24gbmV3Q2FudmFzKGROb2RlKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gb3B0aW9ucy53aWR0aCB8fCB1dGlsLndpZHRoKGROb2RlKTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgdXRpbC5oZWlnaHQoZE5vZGUpO1xuXG4gICAgaWYgKG9wdGlvbnMuYmdjb2xvcikge1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gb3B0aW9ucy5iZ2NvbG9yO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9uZU5vZGUobm9kZSwgZmlsdGVyLCByb290KSB7XG4gIGlmICghcm9vdCAmJiBmaWx0ZXIgJiYgIWZpbHRlcihub2RlKSkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobm9kZSlcbiAgICAudGhlbihtYWtlTm9kZUNvcHkpXG4gICAgLnRoZW4oY2xvbmUgPT4gY2xvbmVDaGlsZHJlbihub2RlLCBjbG9uZSwgZmlsdGVyKSlcbiAgICAudGhlbihjbG9uZSA9PiBwcm9jZXNzQ2xvbmUobm9kZSwgY2xvbmUpKTtcblxuICBmdW5jdGlvbiBtYWtlTm9kZUNvcHkobmQpIHtcbiAgICBpZiAobmQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiB1dGlsLm1ha2VJbWFnZShuZC50b0RhdGFVUkwoKSk7XG4gICAgfVxuICAgIHJldHVybiBuZC5jbG9uZU5vZGUoZmFsc2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvbmVDaGlsZHJlbihvcmlnaW5hbCwgY2xvbmUsIGZsdCkge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gb3JpZ2luYWwuY2hpbGROb2RlcztcbiAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGNsb25lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmVDaGlsZHJlbkluT3JkZXIoY2xvbmUsIHV0aWwuYXNBcnJheShjaGlsZHJlbikpXG4gICAgLnRoZW4oKCkgPT4gY2xvbmUpO1xuXG4gICAgZnVuY3Rpb24gY2xvbmVDaGlsZHJlbkluT3JkZXIocGFyZW50LCBhcnJDaGlsZHJlbikge1xuICAgICAgbGV0IGRvbmUgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIGFyckNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBkb25lID0gZG9uZVxuICAgICAgICAgIC50aGVuKCgpID0+IGNsb25lTm9kZShjaGlsZCwgZmx0KSlcbiAgICAgICAgICAudGhlbihjaGlsZENsb25lID0+IHtcbiAgICAgICAgICAgIGlmIChjaGlsZENsb25lKSBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGRDbG9uZSk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkb25lO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NDbG9uZShvcmlnaW5hbCwgY2xvbmUpIHtcbiAgICBpZiAoIShjbG9uZSBpbnN0YW5jZW9mIHdpbmRvdy5FbGVtZW50KSkge1xuICAgICAgcmV0dXJuIGNsb25lXG4gICAgfTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgLnRoZW4oY2xvbmVTdHlsZSlcbiAgICAgIC50aGVuKGNsb25lUHNldWRvRWxlbWVudHMpXG4gICAgICAudGhlbihjb3B5VXNlcklucHV0KVxuICAgICAgLnRoZW4oZml4U3ZnKVxuICAgICAgLnRoZW4oKCkgPT4gY2xvbmUpO1xuXG4gICAgZnVuY3Rpb24gY2xvbmVTdHlsZSgpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShvcmlnaW5hbCk7XG4gICAgICBjb3B5U3R5bGUob3JpZ2luYWxTdHlsZSwgY2xvbmUuc3R5bGUpO1xuICAgICAgZnVuY3Rpb24gY29weVN0eWxlKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICAgIGlmIChzb3VyY2UuY3NzVGV4dCkge1xuICAgICAgICAgIHRhcmdldC5jc3NUZXh0ID0gc291cmNlLmNzc1RleHQ7XG4gICAgICAgICAgLy8gYWRkIGFkZGl0aW9uYWwgY29weSBvZiBjb21wb3NpdGUgc3R5bGVzXG4gICAgICAgICAgaWYgKHNvdXJjZS5mb250KSB7XG4gICAgICAgICAgICB0YXJnZXQuZm9udCA9IHNvdXJjZS5mb250O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3B5UHJvcGVydGllcyhzb3VyY2UsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY29weVByb3BlcnRpZXMoc291cmNlU3R5bGUsIHRhcmdldFN0eWxlKSB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHlLZXlzID0gdXRpbC5hc0FycmF5KHNvdXJjZVN0eWxlKTtcbiAgICAgICAgICBwcm9wZXJ0eUtleXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIHRhcmdldFN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICBzb3VyY2VTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpLFxuICAgICAgICAgICAgICBzb3VyY2VTdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KG5hbWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmVQc2V1ZG9FbGVtZW50cygpIHtcbiAgICAgIFsnOmJlZm9yZScsICc6YWZ0ZXInXS5mb3JFYWNoKGVsZW1lbnQgPT4gY2xvbmVQc2V1ZG9FbGVtZW50KGVsZW1lbnQpKTtcblxuICAgICAgZnVuY3Rpb24gY2xvbmVQc2V1ZG9FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShvcmlnaW5hbCwgZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50Jyk7XG5cbiAgICAgICAgaWYgKGNvbnRlbnQgPT09ICcnIHx8IGNvbnRlbnQgPT09ICdub25lJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHV0aWwudWlkKCk7XG4gICAgICAgIGNsb25lLmNsYXNzTmFtZSA9IGAke2Nsb25lLmNsYXNzTmFtZX0gJHtjbGFzc05hbWV9YDtcbiAgICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgIGZvcm1hdFBzZXVkb0VsZW1lbnRTdHlsZShjbGFzc05hbWUsIGVsZW1lbnQsIHN0eWxlKVxuICAgICAgICApO1xuICAgICAgICBjbG9uZS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdFBzZXVkb0VsZW1lbnRTdHlsZShjbG4sIGVsbSwgc3RsKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgLiR7Y2xufToke2VsbX1gO1xuICAgICAgICAgIGNvbnN0IGNzc1RleHQgPSBzdGwuY3NzVGV4dFxuICAgICAgICAgICAgPyBmb3JtYXRDc3NUZXh0KHN0bClcbiAgICAgICAgICAgIDogZm9ybWF0Q3NzUHJvcGVydGllcyhzdGwpO1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtzZWxlY3Rvcn17JHtjc3NUZXh0fX1gKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdENzc1RleHQoc3RsMSkge1xuICAgICAgICAgICAgY29uc3QgY250ID0gc3RsMS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50Jyk7XG4gICAgICAgICAgICByZXR1cm4gYCR7c3RsLmNzc1RleHR9IGNvbnRlbnQ6ICR7Y250fTtgO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdENzc1Byb3BlcnRpZXMoc3RsMikge1xuICAgICAgICAgICAgcmV0dXJuIGAke3V0aWwuYXNBcnJheShzdGwyKS5tYXAoZm9ybWF0UHJvcGVydHkpLmpvaW4oJzsgJyl9O2A7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBgJHtuYW1lfToke3N0bC5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpfSR7c3RsLmdldFByb3BlcnR5UHJpb3JpdHkobmFtZSkgPyAnICFpbXBvcnRhbnQnIDogJyd9YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvcHlVc2VySW5wdXQoKSB7XG4gICAgICBpZiAob3JpZ2luYWwgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTFRleHRBcmVhRWxlbWVudClcbiAgICAgICAgY2xvbmUuaW5uZXJIVE1MID0gb3JpZ2luYWwudmFsdWU7XG4gICAgICBpZiAob3JpZ2luYWwgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElucHV0RWxlbWVudClcbiAgICAgICAgY2xvbmUuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG9yaWdpbmFsLnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaXhTdmcoKSB7XG4gICAgICBpZiAoIShjbG9uZSBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgY2xvbmUuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuXG4gICAgICBpZiAoIShjbG9uZSBpbnN0YW5jZW9mIHdpbmRvdy5TVkdSZWN0RWxlbWVudCkpIHJldHVybjtcbiAgICAgIFsnd2lkdGgnLCAnaGVpZ2h0J10uZm9yRWFjaChhdHRyaWJ1dGUgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNsb25lLmdldEF0dHJpYnV0ZShhdHRyaWJ1dGUpO1xuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICAgICAgY2xvbmUuc3R5bGUuc2V0UHJvcGVydHkoYXR0cmlidXRlLCB2YWx1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1iZWRGb250cyhub2RlKSB7XG4gIHJldHVybiBmb250RmFjZXMucmVzb2x2ZUFsbCgpLnRoZW4oKGNzc1RleHQpID0+IHtcbiAgICBjb25zdCBzdHlsZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIG5vZGUuYXBwZW5kQ2hpbGQoc3R5bGVOb2RlKTtcbiAgICBzdHlsZU5vZGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzVGV4dCkpO1xuICAgIHJldHVybiBub2RlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5saW5lSW1hZ2VzKG5vZGUpIHtcbiAgcmV0dXJuIGltYWdlcy5pbmxpbmVBbGwobm9kZSkudGhlbigoKSA9PiBub2RlKTtcbn1cblxuZnVuY3Rpb24gbWFrZVN2Z0RhdGFVcmkobm9kZSwgd2lkdGgsIGhlaWdodCkge1xuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5vZGUpXG4gICAgLnRoZW4obmQgPT4ge1xuICAgICAgbmQuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyk7XG4gICAgICBjb25zdCBzZXJpYWxpemVkU3RyaW5nID0gIG5ldyB3aW5kb3cuWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKG5kKTtcblxuICAgICAgY29uc3QgeGh0bWwgPSB1dGlsLmVzY2FwZVhodG1sKHNlcmlhbGl6ZWRTdHJpbmcpO1xuICAgICAgY29uc3QgZm9yZWlnbk9iamVjdCA9IGA8Zm9yZWlnbk9iamVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPiR7eGh0bWx9PC9mb3JlaWduT2JqZWN0PmA7XG4gICAgICBjb25zdCBzdmdTdHIgPSBgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIke3dpZHRofVwiIGhlaWdodD1cIiR7aGVpZ2h0fVwiPiR7Zm9yZWlnbk9iamVjdH08L3N2Zz5gO1xuXG4gICAgICAvLyBPcHRpbWl6aW5nIFNWR3MgaW4gZGF0YSBVUklzXG4gICAgICAvLyBzZWUgaHR0cHM6Ly9jb2RlcGVuLmlvL3RpZ3QvcG9zdC9vcHRpbWl6aW5nLXN2Z3MtaW4tZGF0YS11cmlzXG4gICAgICAvLyB0aGUgYmVzdCB3YXkgb2YgZW5jb2RpbmcgU1ZHIGluIGEgZGF0YTogVVJJIGlzIGRhdGE6aW1hZ2Uvc3ZnK3htbCxbYWN0dWFsIGRhdGFdLlxuICAgICAgLy8gV2UgZG9u4oCZdCBuZWVkIHRoZSA7Y2hhcnNldD11dGYtOCBwYXJhbWV0ZXIgYmVjYXVzZSB0aGUgZ2l2ZW4gU1ZHIGlzIEFTQ0lJLlxuICAgICAgcmV0dXJuIHN2Z1RvTWluaURhdGFVUkkoc3ZnU3RyKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbmV3VXRpbCgpIHtcbiAgcmV0dXJuIHtcbiAgICBlc2NhcGUsXG4gICAgcGFyc2VFeHRlbnNpb24sXG4gICAgbWltZVR5cGUsXG4gICAgZGF0YUFzVXJsLFxuICAgIGlzRGF0YVVybCxcbiAgICBpc1NyY0FzRGF0YVVybCxcbiAgICBjYW52YXNUb0Jsb2IsXG4gICAgcmVzb2x2ZVVybCxcbiAgICBnZXRBbmRFbmNvZGUsXG4gICAgdWlkOiB1aWQoKSxcbiAgICBkZWxheSxcbiAgICBhc0FycmF5LFxuICAgIGVzY2FwZVhodG1sLFxuICAgIG1ha2VJbWFnZSxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHRcbiAgfTtcblxuICBmdW5jdGlvbiBtaW1lcygpIHtcbiAgICAvKlxuICAgICogT25seSBXT0ZGIGFuZCBFT1QgbWltZSB0eXBlcyBmb3IgZm9udHMgYXJlICdyZWFsJ1xuICAgICogc2VlIGh0dHA6Ly93d3cuaWFuYS5vcmcvYXNzaWdubWVudHMvbWVkaWEtdHlwZXMvbWVkaWEtdHlwZXMueGh0bWxcbiAgICAqL1xuICAgIGNvbnN0IFdPRkYgPSAnYXBwbGljYXRpb24vZm9udC13b2ZmJztcbiAgICBjb25zdCBKUEVHID0gJ2ltYWdlL2pwZWcnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHdvZmY6IFdPRkYsXG4gICAgICB3b2ZmMjogV09GRixcbiAgICAgIHR0ZjogJ2FwcGxpY2F0aW9uL2ZvbnQtdHJ1ZXR5cGUnLFxuICAgICAgZW90OiAnYXBwbGljYXRpb24vdm5kLm1zLWZvbnRvYmplY3QnLFxuICAgICAgcG5nOiAnaW1hZ2UvcG5nJyxcbiAgICAgIGpwZzogSlBFRyxcbiAgICAgIGpwZWc6IEpQRUcsXG4gICAgICBnaWY6ICdpbWFnZS9naWYnLFxuICAgICAgdGlmZjogJ2ltYWdlL3RpZmYnLFxuICAgICAgc3ZnOiAnaW1hZ2Uvc3ZnK3htbCdcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VFeHRlbnNpb24odXJsKSB7XG4gICAgY29uc3QgbWF0Y2ggPSAvXFwuKFteXFwuXFwvXSo/KSQvZy5leGVjKHVybCk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgfVxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIG1pbWVUeXBlKHVybCkge1xuICAgIGNvbnN0IGV4dGVuc2lvbiA9IHBhcnNlRXh0ZW5zaW9uKHVybCkudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gbWltZXMoKVtleHRlbnNpb25dIHx8ICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNEYXRhVXJsKHVybCkge1xuICAgIHJldHVybiB1cmwuc2VhcmNoKC9eKGRhdGE6KS8pICE9PSAtMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3JjQXNEYXRhVXJsKHRleHQpIHtcbiAgICBjb25zdCBEQVRBX1VSTF9SRUdFWCA9IC91cmxcXChbJ1wiXT8oZGF0YTopKFteJ1wiXSs/KVsnXCJdP1xcKS87XG5cbiAgICByZXR1cm4gdGV4dC5zZWFyY2goREFUQV9VUkxfUkVHRVgpICE9PSAtMTtcbiAgfVxuICBmdW5jdGlvbiBjdlRvQmxvYihjYW52YXMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCBiaW5hcnlTdHJpbmcgPSB3aW5kb3cuYXRvYihjYW52YXMudG9EYXRhVVJMKCkuc3BsaXQoJywnKVsxXSk7XG4gICAgICBjb25zdCBsZW5ndGggPSBiaW5hcnlTdHJpbmcubGVuZ3RoO1xuICAgICAgY29uc3QgYmluYXJ5QXJyYXkgPSBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgICAgICBiaW5hcnlBcnJheVtpXSA9IGJpbmFyeVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuXG4gICAgICByZXNvbHZlKFxuICAgICAgICBuZXcgd2luZG93LkJsb2IoW2JpbmFyeUFycmF5XSwge3R5cGU6ICdpbWFnZS9wbmcnfSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjYW52YXNUb0Jsb2IoY2FudmFzKSB7XG4gICAgaWYgKGNhbnZhcy50b0Jsb2IpXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNhbnZhcy50b0Jsb2IocmVzb2x2ZSk7XG4gICAgICB9KTtcblxuICAgIHJldHVybiBjdlRvQmxvYihjYW52YXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZVVybCh1cmwsIGJhc2VVcmwpIHtcbiAgICBjb25zdCBkb2MgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5jcmVhdGVIVE1MRG9jdW1lbnQoKTtcbiAgICBjb25zdCBiYXNlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2Jhc2UnKTtcbiAgICBkb2MuaGVhZC5hcHBlbmRDaGlsZChiYXNlKTtcbiAgICBjb25zdCBhID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBiYXNlLmhyZWYgPSBiYXNlVXJsO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICByZXR1cm4gYS5ocmVmO1xuICB9XG5cbiAgZnVuY3Rpb24gZm91clJhbmRvbUNoYXJzKCkge1xuICAgIC8qIHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82MjQ4NzIyLzI1MTkzNzMgKi9cbiAgICByZXR1cm4gYDAwMDAkeygoTWF0aC5yYW5kb20oKSAqIE1hdGgucG93KDM2LCA0KSkgPDwgMCkudG9TdHJpbmcoMzYpfWAuc2xpY2UoLTQpO1xuICB9XG5cbiAgZnVuY3Rpb24gdWlkKCkge1xuICAgIGxldCBpbmRleCA9IDA7XG5cbiAgICByZXR1cm4gKCkgPT4gYHUke2ZvdXJSYW5kb21DaGFycygpfSR7aW5kZXgrK31gO1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZUltYWdlKHVyaSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICB9O1xuICAgICAgaW1hZ2Uub25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IElNQUdFX0VYUE9SVF9FUlJPUlMuZGF0YVVyaTtcbiAgICAgICAgY29uc29sZS5sb2codXJpKTtcbiAgICAgICAgLy8gZXJyb3IgaXMgYW4gRXZlbnQgT2JqZWN0XG4gICAgICAgIC8vIGh0dHBzOi8vd3d3Lnczc2Nob29scy5jb20vanNyZWYvb2JqX2V2ZW50LmFzcFxuICAgICAgICByZWplY3Qoe2V2ZW50OiBlcnIsIG1lc3NhZ2V9KTtcbiAgICAgIH07XG4gICAgICBpbWFnZS5zcmMgPSB1cmk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbmRFbmNvZGUodXJsKSB7XG4gICAgY29uc3QgVElNRU9VVCA9IDMwMDAwO1xuICAgIGlmIChkb210b2ltYWdlLmltcGwub3B0aW9ucy5jYWNoZUJ1c3QpIHtcbiAgICAgIC8vIENhY2hlIGJ5cGFzcyBzbyB3ZSBkb250IGhhdmUgQ09SUyBpc3N1ZXMgd2l0aCBjYWNoZWQgaW1hZ2VzXG4gICAgICAvLyBTb3VyY2U6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9Vc2luZ19YTUxIdHRwUmVxdWVzdCNCeXBhc3NpbmdfdGhlX2NhY2hlXG4gICAgICB1cmwgKz0gKC9cXD8vLnRlc3QodXJsKSA/ICcmJyA6ICc/JykgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGRvbmU7XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIHJlcXVlc3QudGltZW91dCA9IFRJTUVPVVQ7XG4gICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICByZXF1ZXN0LnNlbmQoKTtcblxuICAgICAgbGV0IHBsYWNlaG9sZGVyO1xuICAgICAgaWYgKGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmltYWdlUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgY29uc3Qgc3BsaXQgPSBkb210b2ltYWdlLmltcGwub3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyLnNwbGl0KC8sLyk7XG4gICAgICAgIGlmIChzcGxpdCAmJiBzcGxpdFsxXSkge1xuICAgICAgICAgIHBsYWNlaG9sZGVyID0gc3BsaXRbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICByZXNvbHZlKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmFpbChgY2Fubm90IGZldGNoIHJlc291cmNlOiAke3VybH0sIHN0YXR1czogJHtyZXF1ZXN0LnN0YXR1c31gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlbmNvZGVyID0gbmV3IHdpbmRvdy5GaWxlUmVhZGVyKCk7XG4gICAgICAgIGVuY29kZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBlbmNvZGVyLnJlc3VsdC5zcGxpdCgvLC8pWzFdO1xuICAgICAgICAgIHJlc29sdmUoY29udGVudCk7XG4gICAgICAgIH07XG4gICAgICAgIGVuY29kZXIucmVhZEFzRGF0YVVSTChyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdGltZW91dCgpIHtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgcmVzb2x2ZShwbGFjZWhvbGRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFpbChcbiAgICAgICAgICAgIGB0aW1lb3V0IG9mICR7VElNRU9VVH1tcyBvY2N1cnJlZCB3aGlsZSBmZXRjaGluZyByZXNvdXJjZTogJHt1cmx9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZmFpbChtZXNzYWdlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICAgIHJlc29sdmUoJycpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0YUFzVXJsKGNvbnRlbnQsIHR5cGUpIHtcbiAgICByZXR1cm4gYGRhdGE6JHt0eXBlfTtiYXNlNjQsJHtjb250ZW50fWA7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8oWy4qKz9eJHt9KCl8XFxbXFxdXFwvXFxcXF0pL2csICdcXFxcJDEnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlbGF5KG1zKSB7XG4gICAgcmV0dXJuIGFyZyA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoYXJnKTtcbiAgICAgICAgfSwgbXMpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFzQXJyYXkoYXJyYXlMaWtlKSB7XG4gICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBhcnJheUxpa2UubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIGFycmF5LnB1c2goYXJyYXlMaWtlW2ldKTtcbiAgICByZXR1cm4gYXJyYXk7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVYaHRtbChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyMvZywgJyUyMycpLnJlcGxhY2UoL1xcbi9nLCAnJTBBJyk7XG4gIH1cblxuICBmdW5jdGlvbiB3aWR0aChub2RlKSB7XG4gICAgY29uc3QgbGVmdEJvcmRlciA9IHB4KG5vZGUsICdib3JkZXItbGVmdC13aWR0aCcpO1xuICAgIGNvbnN0IHJpZ2h0Qm9yZGVyID0gcHgobm9kZSwgJ2JvcmRlci1yaWdodC13aWR0aCcpO1xuICAgIHJldHVybiBub2RlLnNjcm9sbFdpZHRoICsgbGVmdEJvcmRlciArIHJpZ2h0Qm9yZGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gaGVpZ2h0KG5vZGUpIHtcbiAgICBjb25zdCB0b3BCb3JkZXIgPSBweChub2RlLCAnYm9yZGVyLXRvcC13aWR0aCcpO1xuICAgIGNvbnN0IGJvdHRvbUJvcmRlciA9IHB4KG5vZGUsICdib3JkZXItYm90dG9tLXdpZHRoJyk7XG4gICAgcmV0dXJuIG5vZGUuc2Nyb2xsSGVpZ2h0ICsgdG9wQm9yZGVyICsgYm90dG9tQm9yZGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gcHgobm9kZSwgc3R5bGVQcm9wZXJ0eSkge1xuICAgIGNvbnN0IHZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZVByb3BlcnR5KTtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZS5yZXBsYWNlKCdweCcsICcnKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3SW5saW5lcigpIHtcbiAgY29uc3QgVVJMX1JFR0VYID0gL3VybFxcKFsnXCJdPyhbXidcIl0rPylbJ1wiXT9cXCkvZztcblxuICByZXR1cm4ge1xuICAgIGlubGluZUFsbCxcbiAgICBzaG91bGRQcm9jZXNzLFxuICAgIGltcGw6IHtcbiAgICAgIHJlYWRVcmxzLFxuICAgICAgaW5saW5lXG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIHNob3VsZFByb2Nlc3Moc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5zZWFyY2goVVJMX1JFR0VYKSAhPT0gLTE7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkVXJscyhzdHJpbmcpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBsZXQgbWF0Y2g7XG4gICAgd2hpbGUgKChtYXRjaCA9IFVSTF9SRUdFWC5leGVjKHN0cmluZykpICE9PSBudWxsKSB7XG4gICAgICByZXN1bHQucHVzaChtYXRjaFsxXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuZmlsdGVyKCh1cmwpID0+IHtcbiAgICAgIHJldHVybiAhdXRpbC5pc0RhdGFVcmwodXJsKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZShzdHJpbmcsIHVybCwgYmFzZVVybCwgZ2V0KSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cmwpXG4gICAgICAudGhlbih1bCA9PiBiYXNlVXJsID8gdXRpbC5yZXNvbHZlVXJsKHVsLCBiYXNlVXJsKSA6IHVsKVxuICAgICAgLnRoZW4oZ2V0IHx8IHV0aWwuZ2V0QW5kRW5jb2RlKVxuICAgICAgLnRoZW4oZGF0YSA9PiB1dGlsLmRhdGFBc1VybChkYXRhLCB1dGlsLm1pbWVUeXBlKHVybCkpKVxuICAgICAgLnRoZW4oZGF0YVVybCA9PiBzdHJpbmcucmVwbGFjZSh1cmxBc1JlZ2V4KHVybCksIGAkMSR7ZGF0YVVybH0kM2ApKTtcblxuICAgIGZ1bmN0aW9uIHVybEFzUmVnZXgodXJsMCkge1xuICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICAgIGAodXJsXFxcXChbXFwnXCJdPykoJHt1dGlsLmVzY2FwZSh1cmwwKX0pKFtcXCdcIl0/XFxcXCkpYCxcbiAgICAgICAgJ2cnXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZUFsbChzdHJpbmcsIGJhc2VVcmwsIGdldCkge1xuICAgIGlmIChub3RoaW5nVG9JbmxpbmUoKSB8fCB1dGlsLmlzU3JjQXNEYXRhVXJsKHN0cmluZykpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RyaW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzdHJpbmcpXG4gICAgICAudGhlbihyZWFkVXJscylcbiAgICAgIC50aGVuKHVybHMgPT4ge1xuICAgICAgICBsZXQgZG9uZSA9IFByb21pc2UucmVzb2x2ZShzdHJpbmcpO1xuICAgICAgICB1cmxzLmZvckVhY2godXJsID0+IHtcbiAgICAgICAgICBkb25lID0gZG9uZS50aGVuKHN0ciA9PiBpbmxpbmUoc3RyLCB1cmwsIGJhc2VVcmwsIGdldCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRvbmU7XG4gICAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG5vdGhpbmdUb0lubGluZSgpIHtcbiAgICAgIHJldHVybiAhc2hvdWxkUHJvY2VzcyhzdHJpbmcpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBuZXdGb250RmFjZXMoKSB7XG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZUFsbCxcbiAgICBpbXBsOiB7cmVhZEFsbH1cbiAgfTtcblxuICBmdW5jdGlvbiByZXNvbHZlQWxsKCkge1xuICAgIHJldHVybiByZWFkQWxsKGRvY3VtZW50KVxuICAgICAgLnRoZW4od2ViRm9udHMgPT4ge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgICAgd2ViRm9udHMubWFwKHdlYkZvbnQgPT4gd2ViRm9udC5yZXNvbHZlKCkpXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLnRoZW4oY3NzU3RyaW5ncyA9PiBjc3NTdHJpbmdzLmpvaW4oJ1xcbicpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBbGwoKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1dGlsLmFzQXJyYXkoZG9jdW1lbnQuc3R5bGVTaGVldHMpKVxuICAgICAgLnRoZW4obG9hZEV4dGVybmFsU3R5bGVTaGVldHMpXG4gICAgICAudGhlbihnZXRDc3NSdWxlcylcbiAgICAgIC50aGVuKHNlbGVjdFdlYkZvbnRSdWxlcylcbiAgICAgIC50aGVuKHJ1bGVzID0+IHJ1bGVzLm1hcChuZXdXZWJGb250KSk7XG5cbiAgICBmdW5jdGlvbiBzZWxlY3RXZWJGb250UnVsZXMoY3NzUnVsZXMpIHtcbiAgICAgIHJldHVybiBjc3NSdWxlc1xuICAgICAgICAuZmlsdGVyKHJ1bGUgPT4gcnVsZS50eXBlID09PSB3aW5kb3cuQ1NTUnVsZS5GT05UX0ZBQ0VfUlVMRSlcbiAgICAgICAgLmZpbHRlcihydWxlID0+IGlubGluZXIuc2hvdWxkUHJvY2VzcyhydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3NyYycpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZEV4dGVybmFsU3R5bGVTaGVldHMoc3R5bGVTaGVldHMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgc3R5bGVTaGVldHMubWFwKHNoZWV0ID0+IHtcbiAgICAgICAgICBpZiAoc2hlZXQuaHJlZikge1xuICAgICAgICAgICAgLy8gY2xvdWRmb250IGRvZXNuJ3QgaGF2ZSBhbGxvdyBvcmlnaW4gaGVhZGVyIHByb3Blcmx5IHNldFxuICAgICAgICAgICAgLy8gZXJyb3IgcmVzcG9uc2Ugd2lsbCByZW1haW4gaW4gY2FjaGVcbiAgICAgICAgICAgIGNvbnN0IGNhY2hlID0gc2hlZXQuaHJlZi5pbmNsdWRlcygndWJlci1mb250cycpID8gJ25vLWNhY2hlJyA6ICdkZWZhdWx0JztcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZmV0Y2goc2hlZXQuaHJlZiwge2NyZWRlbnRpYWxzOiAnb21pdCcsIGNhY2hlfSlcbiAgICAgICAgICAgICAgLnRoZW4odG9UZXh0KVxuICAgICAgICAgICAgICAudGhlbihzZXRCYXNlSHJlZihzaGVldC5ocmVmKSlcbiAgICAgICAgICAgICAgLnRoZW4odG9TdHlsZVNoZWV0KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgb2NjdXJyZWQgaW4gYW55IG9mIHRoZSBwcmV2aW91c1xuICAgICAgICAgICAgICAgIC8vIHByb21pc2VzIGluIHRoZSBjaGFpbi4gc3R5bGVzaGVldCBmYWlsZWQgdG8gbG9hZCBzaG91bGQgbm90IHN0b3BcbiAgICAgICAgICAgICAgICAvLyB0aGUgcHJvY2VzcywgaGVuY2UgcmVzdWx0IGluIG9ubHkgYSB3YXJuaW5nLCBpbnN0ZWFkIG9mIHJlamVjdFxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihJTUFHRV9FWFBPUlRfRVJST1JTLnN0eWxlU2hlZXQsIHNoZWV0LmhyZWYpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzaGVldCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBmdW5jdGlvbiB0b1RleHQocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0QmFzZUhyZWYoYmFzZSkge1xuICAgICAgICBiYXNlID0gYmFzZS5zcGxpdCgnLycpO1xuICAgICAgICBiYXNlLnBvcCgpO1xuICAgICAgICBiYXNlID0gYmFzZS5qb2luKCcvJyk7XG5cbiAgICAgICAgcmV0dXJuIHRleHQgPT4ge1xuICAgICAgICAgIHJldHVybiB1dGlsLmlzU3JjQXNEYXRhVXJsKHRleHQpXG4gICAgICAgICAgICA/IHRleHRcbiAgICAgICAgICAgIDogdGV4dC5yZXBsYWNlKC91cmxcXChbJ1wiXT8oW14nXCJdKz8pWydcIl0/XFwpL2csIGFkZEJhc2VIcmVmVG9VcmwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEJhc2VIcmVmVG9VcmwobWF0Y2gsIHAxKSB7XG4gICAgICAgICAgY29uc3QgdXJsID0gL15odHRwL2kudGVzdChwMSkgPyBwMSA6IGNvbmNhdEFuZFJlc29sdmVVcmwoYmFzZSwgcDEpO1xuICAgICAgICAgIHJldHVybiBgdXJsKCcke3VybH0nKWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NzYyMzEvMzc4Njg1NlxuICAgICAgICBmdW5jdGlvbiBjb25jYXRBbmRSZXNvbHZlVXJsKHVybCwgY29uY2F0KSB7XG4gICAgICAgICAgY29uc3QgdXJsMSA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgICAgIGNvbnN0IHVybDIgPSBjb25jYXQuc3BsaXQoJy8nKTtcbiAgICAgICAgICBjb25zdCB1cmwzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1cmwxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVybDFbaV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsMVtpXSAhPT0gJy4nKSB7XG4gICAgICAgICAgICAgIHVybDMucHVzaCh1cmwxW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1cmwyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVybDJbaV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsMltpXSAhPT0gJy4nKSB7XG4gICAgICAgICAgICAgIHVybDMucHVzaCh1cmwyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVybDMuam9pbignLycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRvU3R5bGVTaGVldCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gc3R5bGVFbGVtZW50LnNoZWV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzKSB7XG4gICAgICBjb25zdCBjc3NSdWxlcyA9IFtdO1xuICAgICAgc3R5bGVTaGVldHMuZm9yRWFjaCgoc2hlZXQpID0+IHtcbiAgICAgICAgLy8gdHJ5Li4uY2F0Y2ggYmVjYXVzZSBicm93c2VyIG1heSBub3QgYWJsZSB0byBlbnVtZXJhdGUgcnVsZXMgZm9yIGNyb3NzLWRvbWFpbiBzaGVldHNcbiAgICAgICAgaWYgKCFzaGVldCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcnVsZXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcnVsZXMgPSBzaGVldC5ydWxlcyB8fCBzaGVldC5jc3NSdWxlcztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGAnQ2FuJ3QgcmVhZCB0aGUgY3NzIHJ1bGVzIG9mOiAke3NoZWV0LmhyZWZ9YCwgZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJ1bGVzICYmIHR5cGVvZiBydWxlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXRpbFxuICAgICAgICAgICAgICAuYXNBcnJheShydWxlcyB8fCBbXSlcbiAgICAgICAgICAgICAgLmZvckVhY2goY3NzUnVsZXMucHVzaC5iaW5kKGNzc1J1bGVzKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYEVycm9yIHdoaWxlIHJlYWRpbmcgQ1NTIHJ1bGVzIGZyb20gJHtzaGVldC5ocmVmfWAsIGUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0Q3NzUnVsZXMgY2FuIG5vdCBmaW5kIGNzc1J1bGVzJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGNzc1J1bGVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld1dlYkZvbnQod2ViRm9udFJ1bGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc29sdmU6ICgpID0+IHtcbiAgICAgICAgICBjb25zdCBiYXNlVXJsID0gKHdlYkZvbnRSdWxlLnBhcmVudFN0eWxlU2hlZXQgfHwge30pLmhyZWY7XG4gICAgICAgICAgcmV0dXJuIGlubGluZXIuaW5saW5lQWxsKHdlYkZvbnRSdWxlLmNzc1RleHQsIGJhc2VVcmwpO1xuICAgICAgICB9LFxuICAgICAgICBzcmM6ICgpID0+IHdlYkZvbnRSdWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3NyYycpXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBuZXdJbWFnZXMoKSB7XG4gIHJldHVybiB7XG4gICAgaW5saW5lQWxsLFxuICAgIGltcGw6IHtcbiAgICAgIG5ld0ltYWdlXG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIG5ld0ltYWdlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5saW5lXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlubGluZShnZXQpIHtcbiAgICAgIGlmICh1dGlsLmlzRGF0YVVybChlbGVtZW50LnNyYykpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShlbGVtZW50LnNyYylcbiAgICAgICAgLnRoZW4oZ2V0IHx8IHV0aWwuZ2V0QW5kRW5jb2RlKVxuICAgICAgICAudGhlbihkYXRhID0+IHV0aWwuZGF0YUFzVXJsKGRhdGEsIHV0aWwubWltZVR5cGUoZWxlbWVudC5zcmMpKSlcbiAgICAgICAgLnRoZW4oZGF0YVVybCA9PlxuICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQub25sb2FkID0gcmVzb2x2ZTtcbiAgICAgICAgICAgIGVsZW1lbnQub25lcnJvciA9IHJlamVjdDtcbiAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gZGF0YVVybDtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlubGluZUFsbChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBpbmxpbmVCYWNrZ3JvdW5kKG5vZGUpLnRoZW4oKCkgPT4ge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBuZXdJbWFnZShub2RlKS5pbmxpbmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgdXRpbC5hc0FycmF5KG5vZGUuY2hpbGROb2RlcykubWFwKGNoaWxkID0+IGlubGluZUFsbChjaGlsZCkpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaW5saW5lQmFja2dyb3VuZChuZCkge1xuICAgICAgY29uc3QgYmFja2dyb3VuZCA9IG5kLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQnKTtcblxuICAgICAgaWYgKCFiYWNrZ3JvdW5kKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5saW5lclxuICAgICAgICAuaW5saW5lQWxsKGJhY2tncm91bmQpXG4gICAgICAgIC50aGVuKGlubGluZWQgPT4ge1xuICAgICAgICAgIG5kLnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgJ2JhY2tncm91bmQnLFxuICAgICAgICAgICAgaW5saW5lZCxcbiAgICAgICAgICAgIG5kLnN0eWxlLmdldFByb3BlcnR5UHJpb3JpdHkoJ2JhY2tncm91bmQnKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IG5kKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZG9tdG9pbWFnZTtcbiJdfQ==