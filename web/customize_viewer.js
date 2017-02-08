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

// If we are running this after `gulp generic`, DOMContentLoaded will not have
// fired yet. If we run it from `gulp server`, it will have fired.
if (document.readyState === "complete" || document.readyState === "loaded" ||
 document.readyState === "interactive") {
  initialize();
} else {
  document.addEventListener('DOMContentLoaded', initialize);
}

function initialize() {
  var eventBus = DOMEvents.getGlobalEventBus();

  var pageNumberDisplay = document.getElementById('pageNumberDisplay');
  eventBus.on('pagechange', function(ev) {
    pageNumberDisplay.innerText = ev.pageNumber;
  });

  // The standard viewer only supports a rotate button in the dropdown.
  var pageRotateCw = document.getElementById('toolbarPageRotateCw');
  pageRotateCw.addEventListener('click', function (e) {
    eventBus.dispatch('rotatecw');
  });
};

}));
