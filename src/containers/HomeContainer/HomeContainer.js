import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {isLoaded as isMatchesLoaded, load as loadMatches} from 'redux/modules/matches';
import * as matchesActions from 'redux/modules/matches';
import {isLoaded as isPlayersLoaded, load as loadPlayers} from 'redux/modules/players';
import {isLoaded as isHeroesLoaded, load as loadHeroes} from 'redux/modules/heroes';
import { asyncConnect } from 'redux-async-connect';
import { routeActions } from 'react-router-redux';
import { MatchesList, Home } from 'components';

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
  (state, props) => ({
    matches: state.matches.data,
    stats: matchesActions.getStats(state, props),
    players: state.players.data,
    heroes: state.heroes.data,
    error: state.matches.error,
    loading: state.matches.loading,
    matchesActions: matchesActions,
    pushState: routeActions.push
  }))
export default class HomeContainer extends Component {
  static propTypes = {
    matches: PropTypes.array,
    players: PropTypes.array,
    matchesActions: PropTypes.object,
    dispatch: PropTypes.func,
    computeStats: PropTypes.func,
    active: PropTypes.number,
    params: PropTypes.object,
    pushState: PropTypes.func,
    children: PropTypes.node
  };

  constructor(props) {
    super(props);

    this.handeMatchClick = this.handeMatchClick.bind(this);
    this.handleAllClick = this.handleAllClick.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, matchesActions: { load }, params: { active }, players } = this.props;
    const nextActive = nextProps.params.active;

    if (nextActive !== active) {
      dispatch(load(players[nextActive]._id));
    }
  }

  handeMatchClick(match) {
    const { dispatch, pushState, params } = this.props;
    dispatch(pushState('/stats/' + params.playerIds + '/' + params.active + '/matches/' + match._id ));
  }

  handleAllClick() {
    const { dispatch, computeStats, params: {active}, players, matches } = this.props;
    dispatch(computeStats(matches, players[active]._id));
  }

  handleTabChange(i) {
    const { dispatch, pushState, params } = this.props;
    dispatch(pushState('/stats/' + params.playerIds + '/' + i + '/matches'));
  }

  render() {
    const props = { ...this.props };
    delete props.children;

    return (
      <div>
        <MatchesList {...this.props}
          onMatchClick={this.handeMatchClick}
          onAllClick={this.handleAllClick}
        />
        <Home
          {...this.props}
          onTabChange={this.handleTabChange}
        >
          {React.Children.map(this.props.children, child => React.cloneElement(child, props) )}
        </Home>
      </div>
    );
  }
}
