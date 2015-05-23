'use strict';

import React from 'react';
import stampit from 'stampit';

import leafletMap from './leafletMap';

export default stampit.compose(leafletMap)
  .methods({
    componentDidMount() {
      leafletMap.fixed.methods.componentDidMount.call(this);

      this.props.map.addLayer(this.leafletElement);
    },

    componentWillUnmount() {
      leafletMap.fixed.methods.componentWillUnmount.call(this);

      this.props.map.removeLayer(this.leafletElement);
    },

    getClonedChildrenWithMap(extra) {
      const {children, map} = this.props;
      const props = Object.assign({map}, extra);

      return React.Children.map(children, child => {
        return child ? React.cloneElement(child, props) : null;
      });
    },
  });
