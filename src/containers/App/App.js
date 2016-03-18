import React, { Component, PropTypes } from 'react';
import {AppBar} from 'react-toolbox';
import Helmet from 'react-helmet';
import config from '../../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    params: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <AppBar className={styles.topBar}><h2>dotamath.io</h2></AppBar>
        {this.props.children}
      </div>
    );
  }
}
