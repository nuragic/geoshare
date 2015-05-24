'use strict';

import React from 'react';
import stampit from 'react-stampit';

import leafletMixin from './leafletMixin';

export default stampit(React, {
  componentWillMount() {
    this._leafletEvents = this.extractLeafletEvents(this.props);
  },

  componentDidMount() {
    this.bindLeafletEvents(this._leafletEvents);
  },

  componentWillReceiveProps(nextProps) {
    const next = this.extractLeafletEvents(nextProps);
    this._leafletEvents = this.bindLeafletEvents(next, this._leafletEvents);
  },

  componentWillUnmount() {
    const el = this.leafletElement;
    if (!el) {
      return;
    }

    Object.keys(this._leafletEvents).forEach((ev) => {
      el.off(ev, this._leafletEvents[ev]);
    });
  },
}).compose(leafletMixin);
