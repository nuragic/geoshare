'use strict';

import reactStamp from 'react-stamp';
import stampit from 'stampit';

import leafletMixin from './leafletMixin';

export default stampit.compose(reactStamp)
  .methods(leafletMixin)
  .methods({
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
  });
