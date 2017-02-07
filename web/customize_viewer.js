/*
 * Custom functionality for this fork of pdf.js.
 */


'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs-web/customize_viewer', ['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory((root.pdfjsWebCustomizeViewer = {}));
  }
}(this, function (exports) {

console.log('test');

}));
