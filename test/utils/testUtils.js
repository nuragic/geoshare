/**
 * Extends Reacts test utils to
 * allow testing stamp components
 */

'use strict';

import React from 'react/addons';

export default Object.assign(React.addons.TestUtils, {
  isCompositeComponentWithType: function(inst, type) {
    // stampit sets function name to factory
    if (type.name === 'factory') {
      return !!(this.isCompositeComponent(inst) &&
               (inst.__proto__ === type.fixed.methods));
    } else {
      return !!(this.isCompositeComponent(inst) &&
               (inst.constructor === type));
    }
  }
});
