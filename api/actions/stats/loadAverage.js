import { collection } from '../../database';
import { findAll } from '../../services/matches';

export default function loadAverage() {
  return collection('matches')
    .find()
    .limit(100)
    .sort({ start_time: -1 })
    .toArrayAsync()
    .then(matches => {
      const statsToAverage = [
        'kills_per_min',
        'deaths_per_min',
        'assists_per_min',
        'denies_per_min',
        'gold_per_min',
        'hero_damage_per_min',
        'hero_healing_per_min',
        'last_hits_per_min',
        'tower_damage_per_min',
        'xp_per_min'
      ];

      let sum = {};
      let playersLength = 0;
      matches.forEach(match => {
        match.players.forEach(player => {
          if (player._id !== '76561202255233023' && player.leaver_status === 0 && match.duration > (60 * 15)) { //Public profile
            playersLength++;
            statsToAverage.forEach(stat => {
              if (isNaN(player[stat])) {
                console.log(match);
                console.log(player);
              }
              if (typeof sum[stat] === 'undefined') sum[stat] = 0;
              sum[stat] += player[stat];
            });
          }
        });
      });

      Object.keys(sum).forEach(stat => {
        console.log(stat, sum[stat] / playersLength);
      })
    });
}