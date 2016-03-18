import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import {Navigation, List, ListSubHeader } from 'react-toolbox';
import { ListItem } from 'components';

export default class MatchesList extends Component {
  static propTypes = {
    matches: PropTypes.array,
    heroes: PropTypes.array,
    players: PropTypes.array,
    activePlayer: PropTypes.string,
    onMatchClick: PropTypes.func,
    onAllClick: PropTypes.func,
    params: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.findPlayer = this.findPlayer.bind(this);
    this.findHero = this.findHero.bind(this);
    this.getMatches = this.getMatches.bind(this);
    this.isWonMatch = this.isWonMatch.bind(this);
  }

  getMatches() {
    const { matches, heroes, onMatchClick } = this.props;

    if (!(matches && matches.length)) return <span />;

    return matches.map(match => {
      const date = moment.unix(match.start_time).format('DD/MM/YYYY');
      const player = match.players.filter(this.findPlayer)[0];
      const hero = heroes.filter(this.findHero.bind(this, player))[0];

      return (
        <ListItem
          onClick={onMatchClick.bind(this, match)}
          key={match._id}
          avatar="https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg"
          caption={hero.localized_name}
          legend={date}
          rightIcon={this.isWonMatch(player, match) ? 'thumb_up' : 'thumb_down'}
        />
      );
    });
  }

  findPlayer(player) {
    const { params: {active}, players } = this.props;
    return String(player._id) === String(players[active]._id);
  }

  findHero(player, hero) {
    return hero._id === player.hero_id;
  }

  isWonMatch(player, match) {
    return !!player.is_radiant === !!match.radiant_win;
  }

  render() {
    const styles = require('./MatchesList.scss');
    const { onAllClick } = this.props;

    return (
      <Navigation type="vertical" className={styles.navigation}>
        <div className={styles.options} onClick={onAllClick}>
          All Matches
        </div>
        <div className={styles.list}>
          <List selectable ripple>
            <ListSubHeader caption="Matches" />
            {this.getMatches()}
          </List>
        </div>
      </Navigation>
    );
  }
}