import {collection} from '../../src/database';

export function findById(ids){
  return collection('players').find({ _id: {$in: ids} }).toArrayAsync();
}