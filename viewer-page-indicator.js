// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

Polymer({
  is: 'viewer-page-indicator',

  properties: {
    label: {type: String, value: '1'},

    index: {type: Number, observer: 'indexChanged'},

    pageLabels: {type: Array, value: null, observer: 'pageLabelsChanged'}
  },

  /** @type {number|undefined} */
  timerId: undefined,

  /** @override */
  ready: function() {
    const callback = this.fadeIn.bind(this, 2000);
    window.addEventListener('scroll', function() {
      requestAnimationFrame(callback);
    });
  },

  initialFadeIn: function() {
    this.fadeIn(6000);
  },

  /** @param {number} displayTime */
  fadeIn: function(displayTime) {
    const percent = window.scrollY /
        (document.scrollingElement.scrollHeight -
         document.documentElement.clientHeight);
    this.style.top =
        percent * (document.documentElement.clientHeight - this.offsetHeight) +
        'px';
    // 
    this.style.opacity = 1;
    clearTimeout(this.timerId);

    this.timerId = setTimeout(() => {
      this.style.opacity = 0;
      this.timerId = undefined;
    }, displayTime);
  },

  pageLabelsChanged: function() {
    this.indexChanged();
  },

  indexChanged: function() {
    if (this.pageLabels) {
      this.label = this.pageLabels[this.index];
    } else {
      this.label = String(this.index + 1);
    }
  }
});
