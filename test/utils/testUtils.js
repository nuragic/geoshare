/**
 * Extends Reacts test utils to
 * allow testing stamp components
 */

'use strict';

import React from 'react/addons';
import ReactInstanceMap from 'react/lib/ReactInstanceMap';

export default Object.assign(React.addons.TestUtils, {
  isCompositeComponentWithType(inst, type) {
    var internalInstance = ReactInstanceMap.get(inst);
    var constructor = internalInstance
      ._currentElement
      .type;

    return !!(this.isCompositeComponent(inst) &&
             (constructor === type));
  },
});
