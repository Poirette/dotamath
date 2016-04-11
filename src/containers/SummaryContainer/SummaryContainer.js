import React, { Component, PropTypes } from 'react';
import { Stats } from 'components';

export default class SummaryContainer extends Component {
  static propTypes = {
    stats: PropTypes.array
  }

  render() {
    if (!this.props.stats) {
      return null;
    }

    return <Stats {...this.props} />;
  }
}
