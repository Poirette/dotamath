import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'react-toolbox';
import { Radar } from 'components';

function limit(value) {
  if (value > 1) return 1;
  if (value < 0) return 0;
  return value;
}

export default class Stats extends Component {
  static propTypes = {
    data: PropTypes.array,
    active: PropTypes.number,
    onTabChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.parseData = this.parseData.bind(this);
  }

  parseData(datas) {
    if (!(datas && datas.length)) return null;

    return datas.map(data => {
      const parsedDatas = {
        'xp_per_min': limit(data.perMin.xp_per_min / 780 * 1.05),
        'gold_per_min': limit(data.perMin.gold_per_min / 580 * 1.05),
        'hero_damage_per_min': limit(data.perMin.hero_damage_per_min / 700 * 1.05),
        'deaths_per_min': limit(1 - (data.perMin.deaths_per_min / 0.27) * 1.05),
        'tower_damage_per_min': limit(data.perMin.tower_damage_per_min / 90 * 1.05),
        'hero_healing_per_min': limit(data.perMin.hero_healing_per_min / 45 * 1.05),
        'assists_per_min': limit(data.perMin.assists_per_min / 0.5 * 1.05),
        'kills_per_min': limit(data.perMin.kills_per_min / 0.3 * 1.05),
      };

      return parsedDatas;
    });
  }

  render() {
    const styles = require('./Stats.scss');

    const { data, active, onTabChange } = this.props;

    const radarData = this.parseData(data);
    const x = 400;
    const y = 400;
    const padding = 50;
    const r = Math.min(x, y) / 2;
    const labels = [
      'Experience',
      'Gold',
      'Hero damage',
      'Life span',
      'Tower damage',
      'Hero healing',
      'Assists',
      'Kills',
    ];

    return (
      <div className={styles.stats}>
        <Tabs index={active} onChange={onTabChange}>
          <Tab label="Test" />
          <Tab label="Test 1" />
          <Tab label="Test 2" />
        </Tabs>
        <Radar
          data={radarData}
          labels={labels}
          padding={padding}
          fill ="#d81b60"
          stroke ="#37474f"
          labelColor ="#78909c"
          x={x}
          y={y}
          r={r}
        />
      </div>
    );
  }
}
