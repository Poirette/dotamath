import React, { Component, PropTypes } from 'react';
import { MatchPlayersContainer } from 'containers';

export default class MatchContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    stats: PropTypes.array,
    params: PropTypes.object,
    matches: PropTypes.array,
    heroes: PropTypes.array
  }

  render() {
    const { stats, params, matches, heroes, children } = this.props;
    const matchData = matches.find(match => {
      return String(match._id) === String(params.matchId);
    });

    if (!stats) {
      return null;
    }

    return (
      <div>
        <MatchPlayersContainer
          {...this.props}
          heroes={heroes}
          match={matchData}
        />
        {children}
      </div>
    );
  }
}
