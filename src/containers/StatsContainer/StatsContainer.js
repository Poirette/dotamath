import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import * as matchesActions from 'redux/modules/matches';
import { Stats } from 'components';

@connect(
  (state, props) => ({
    stats: matchesActions.getStats(state, props),
    matchesActions: matchesActions
  }))
export default class StatsContainer extends Component {
  static propTypes = {
    stats: PropTypes.array,
    params: PropTypes.object,
    matchesActions: PropTypes.object
  }

  render() {
    if (!this.props.stats) return <span />;

    return (
      <Stats stats={this.props.stats} {...this.props} />
    );
  }
}
