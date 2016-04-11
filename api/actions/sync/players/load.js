import {collection} from '../../../database';

export default function load(players) {
  console.log('load', players);
  const bulk = players.map(player => {
    return {
      insertOne: {document: player }
    };
  });

  return collection('players').bulkWrite(bulk, {ordered: false});
}
