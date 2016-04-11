import Promise from 'bluebird';
import { convertor } from '../../../services/players';

export default function transform(players) {
  console.log('trasnform', players);
  return Promise.resolve(
    players.map(player => {
      return {
        ...player,
        _id: player.steamid,
        _id32: convertor.to32(player.steamid)
      };
    })
  );
}
