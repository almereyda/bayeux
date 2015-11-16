'use strict';

angular.module('htckApp').factory('hPages', function (hExport, hSave) {
  var scope = {};
  var pages = [];
  var currentPageIndex;

  function init(parent){
    scope = parent.$new();
    currentPageIndex = 0;
  }

  function saveCurrent() {
    var json = hExport.exportOneJSON(scope.$parent.paper);

    pages[currentPageIndex] = json;
  }

  function goto(idx) {
    if(pages[idx]) {
      currentPageIndex = idx;
      hSave.import(pages[idx]);
    }
    else {
      // TODO Error
    }
  }

  function next() {
    saveCurrent();
    goto(currentPageIndex + 1);
  }
  function prev() {
    saveCurrent();
    goto(currentPageIndex - 1);
  }

  function create(json) {
    saveCurrent();
    if(!json) {
      // TODO
      json = '[{"data":{"background":true},"type":"rect","attrs":{"x":0,"y":0,"width":900,"height":675,"rx":0,"ry":0,"fill":"url(content//images/backgrounds/background_1.jpg)","stroke":"none","fill-opacity":"1"},"transform":"","id":0}]';
    }

    pages.splice(currentPageIndex+1, 0, json);
    goto(currentPageIndex+1);
  }

  function createByCopy() {
    saveCurrent();
    create(pages[currentPageIndex]);
  }

  function deletePage () {
    pages.splice(currentPageIndex, 1);
    currentPageIndex = (currentPageIndex <= 0) ? (0) : (currentPageIndex - 1);
    goto(currentPageIndex);
  }

  return {
    init: init,
    pages: pages,
    index: currentPageIndex,

    saveCurrent: saveCurrent,
    goto: goto,
    create: create,
    delete: deletePage,
    next: next,
    prev: prev,
    createByCopy: createByCopy
  };
});