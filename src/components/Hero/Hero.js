import React, { Component, PropTypes } from 'react';
import { Avatar } from 'react-toolbox';

export default class MatchesList extends Component {
  static propTypes = {
    name: PropTypes.string,
    slot: PropTypes.number,
    onHeroClick: PropTypes.func
  };

  render() {
    const styles = require('./Hero.scss');
    const { name, onHeroClick, slot } = this.props;

    return (
      <Avatar className={styles.avatar} onClick={onHeroClick.bind(this, slot)} >
        <img
          src={'http://cdn.dota2.com/apps/dota2/images/heroes/' + name.substring(14, 50) + '_lg.png'}
          alt={name.substring(14, 50)}
        />
      </Avatar>
    );
  }
}
