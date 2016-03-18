import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {isLoaded as isMatchesLoaded, load as loadMatches} from 'redux/modules/matches';
import * as statsActions from 'redux/modules/stats';
import {isLoaded as isPlayersLoaded, load as loadPlayers} from 'redux/modules/players';
import {isLoaded as isHeroesLoaded, load as loadHeroes} from 'redux/modules/heroes';
import { asyncConnect } from 'redux-async-connect';
import { routeActions } from 'react-router-redux';
import { MatchesList, Stats } from 'components';

@asyncConnect([{
  deferred: true,
  promise: ({params: { playerIds }, store: {dispatch, getState}}) => {
    if (!isPlayersLoaded(getState())) {
      return dispatch(loadPlayers(playerIds));
    }
  }
}, {
  deferred: true,
  promise: ({params: { playerIds, active }, store: {dispatch, getState}}) => {
    const playerId = playerIds.split(',')[active];

    if (!isMatchesLoaded(getState())) {
      return dispatch(loadMatches(playerId));
    }
  }
}, {
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isHeroesLoaded(getState())) {
      return dispatch(loadHeroes());
    }
  }
}])
@connect(
  (state) => ({
    matches: state.matches.data,
    players: state.players.data,
    heroes: state.heroes.data,
    error: state.matches.error,
    loading: state.matches.loading,
    stats: state.stats.data,
  }),
  { pushState: routeActions.push, ...statsActions })
export default class Home extends Component {
  static propTypes = {
    matches: PropTypes.array,
    players: PropTypes.array,
    heroes: PropTypes.array,
    matchesActions: PropTypes.object,
    dispatch: PropTypes.func,
    computeStats: PropTypes.func,
    activePlayer: PropTypes.number,
    stats: PropTypes.array,
    params: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.handeMatchClick = this.handeMatchClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
  }

  handeMatchClick(match) {
    const { dispatch, computeStats, params: {active}, players } = this.props;
    dispatch(computeStats([match], players[active]._id));
  }

  handleAllClick() {
    const { dispatch, computeStats, params: {active}, players, matches } = this.props;
    dispatch(computeStats(matches, players[active]._id));
  }

  render() {
    return (
      <div>
        <MatchesList {...this.props}
          onMatchClick={this.handeMatchClick}
          onAllClick={this.handleAllClick}
        />
        <Stats data={this.props.stats}/>
      </div>
    );
  }
}
