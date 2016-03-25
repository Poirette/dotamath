import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'react-toolbox';

export default class Home extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onTabChange: PropTypes.func.isRequired,
    stats: PropTypes.array,
    players: PropTypes.array,
    params: PropTypes.object,
    match: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./Home.scss');

    const { players, params: {active}, onTabChange } = this.props;

    return (
      <div className={styles.home}>
        <Tabs index={Number(active)} onChange={onTabChange}>
          {players.map(player => {
            return (
              <Tab key={'tab_' + player._id} label={player.personaname}>
                {React.Children.map(this.props.children, child => React.cloneElement(child) )}
              </Tab>
            );
          })}
        </Tabs>
      </div>
    );
  }
}
