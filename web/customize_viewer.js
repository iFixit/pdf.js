/*
 * Custom functionality for this fork of pdf.js.
 */


'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs-web/customize_viewer', ['exports', 'pdfjs-web/dom_events',
    'pdfjs-web/app'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('./dom_events.js'), require('./app.js'));
  } else {
    factory((root.pdfjsWebCustomizeViewer = {}), root.pdfjsWebDOMEvents,
     root.pdfjsWebApp);
  }
}(this, function (exports, DOMEvents, pdfjsWebApp) {

/*
 * If we are running this after `gulp generic`, DOMContentLoaded will not have
 * fired yet. If we run it from `gulp server`, it will have fired.
 */
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

  /*
   * Add a "landscape" class to mainContainer when the pages are displayed in
   * landscape. This can be used to style the rotate button.
   */
  var mainContainer = document.getElementById('mainContainer');
  function isLandscape() {
    return pdfjsWebApp.PDFViewerApplication.pdfViewer.isLandscape();
  }
  eventBus.on('pagesloaded', function() {
    if (isLandscape()) {
      // Set initial value.
      mainContainer.classList.add('landscape');
    }
  });
  eventBus.on('rotatecw', function() {
    // This will be called before rotating, so negate isLandscape to get the
    // value after rotating.
    if (!isLandscape()) {
      mainContainer.classList.add('landscape');
    } else {
      mainContainer.classList.remove('landscape');
    }
  });

  // The standard viewer only supports a rotate button in the dropdown.
  var pageRotateCw = document.getElementById('toolbarPageRotateCw');
  pageRotateCw.addEventListener('click', function (e) {
    eventBus.dispatch('rotatecw');
  });
};

}));
