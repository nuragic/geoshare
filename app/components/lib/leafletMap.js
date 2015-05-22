'use strict';

import leafletMixin from './leafletMixin';
import stampit from 'stampit';
import { Component } from 'react';

const reactStamp = stampit.convertConstructor(Component);

export default stampit.compose(reactStamp, leafletMixin).methods({
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
  }
});
