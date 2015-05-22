'use strict';

import AltContainer from 'alt/AltContainer';
import React from 'react';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import { compose, convertConstructor, extend } from 'stampit';

import alt from '../alt';
import App from './App';
import AppActions from '../actions/AppActions';
import AppStore from '../stores/AppStore';
import theme from '../style/themes/default-theme';

// webpack
require('../style/app.less');

const reactComp = convertConstructor(React.Component);
const themeManager = new ThemeManager();
themeManager.setTheme(theme);

let wrapper = compose(reactComp)
  .methods({
    getChildContext() {
      return Object.assign(
        {}, this.props.initData.ctx, { muiTheme: themeManager.getCurrentTheme() }
      );
    },

    componentWillMount() {
      alt.bootstrap(JSON.stringify(this.props.initData.state));

      // force state update this render cycle
      this.setState(AppStore.getState());
    },

    render() {
      return (
        <AltContainer actions={AppActions} store={AppStore} >
          <App />
        </AltContainer>
      );
    },
  });

export default extend(wrapper, {
  childContextTypes: {
    tag: React.PropTypes.string.isRequired,
    loggedIn: React.PropTypes.bool.isRequired,
    muiTheme: React.PropTypes.object,
    repoUrl: React.PropTypes.string.isRequired,
  },

  propTypes: {
    initData: React.PropTypes.object.isRequired,
  },
});
