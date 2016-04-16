import Promise from 'bluebird';
import { convertor } from '../../../services/players';

export default function transform(matches) {
  const cleanMatches = matches.filter(o => !!o);

  return cleanMatches.map(o => {
    const { match, details } = o;
    const durationMin = Number(details.duration) / 60;

    return {
      ...match,
      ...details,
      _id: match.match_id,
      match_id: null,
      players: details.players.map(player => {
        return {
          ...player,
          _id32: player.account_id,
          _id: convertor.to64(player.account_id),
          is_radiant: !(player.player_slot > 100),
          deaths_per_min: Number(player.deaths) / durationMin,
          kills_per_min: Number(player.kills) / durationMin,
          assists_per_min: Number(player.assists)/ durationMin,
          denies_per_min : Number(player.denies)/ durationMin,
          hero_damage_per_min : Number(player.hero_damage)/ durationMin,
          tower_damage_per_min: Number(player.tower_damage)/ durationMin,
          hero_healing_per_min: Number(player.hero_healing)/ durationMin,
          last_hits_per_min: Number(player.last_hits)/ durationMin
        }
      })
    }
  });
}
