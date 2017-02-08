/*
 * Custom functionality for this fork of pdf.js.
 */


'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs-web/customize_viewer', ['exports', 'pdfjs-web/dom_events'],
     factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./dom_events.js'));
  } else {
    factory((root.pdfjsWebCustomizeViewer = {}), root.pdfjsWebDOMEvents);
  }
}(this, function (exports, DOMEvents) {
  var eventBus = DOMEvents.getGlobalEventBus();

  eventBus.on('pagechange', function(ev) {
    var pageNumberDisplay = document.getElementById('pageNumberDisplay');
    pageNumberDisplay.innerText = ev.pageNumber;
  });

}));
