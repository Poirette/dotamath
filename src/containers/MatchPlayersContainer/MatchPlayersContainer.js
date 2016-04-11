import React, { Component, PropTypes } from 'react';
import { Hero } from 'components';

export default class MatchPlayersContainer extends Component {
  static propTypes = {
    match: PropTypes.object,
    heroes: PropTypes.array,
    dispatch: PropTypes.func,
    params: PropTypes.object,
    pushState: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.handleHeroClick = this.handleHeroClick.bind(this);
  }

  handleHeroClick(slot) {
    const { dispatch, pushState, params } = this.props;
    dispatch(pushState('/stats/' + params.playerIds + '/' + params.active + '/matches/' + params.matchId + '/slot/' + slot ));
  }

  render() {
    const styles = require('./MatchPlayers.scss');
    const { match, heroes } = this.props;

    if (!match) return null;

    return (
      <div>
        {match.players.map((player, key) => {
          const heroData = heroes.find(h => {
            return player.hero_id === h._id;
          });

          return (
            <div key={player.hero_id} className={styles.wrpHeroes}>
              {key === 5 ? <span className={styles.versus}>Vs</span> : null}
              <Hero
                name={heroData.name}
                slot={player.player_slot}
                onHeroClick={this.handleHeroClick}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
