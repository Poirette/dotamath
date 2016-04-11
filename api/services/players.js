import {collection} from '../database';
import BigNumber from 'big-number';

export const convertor = {
  to64(id) {
    return BigNumber(id).plus("76561197960265728").toString();
  },

  to32(id){
    return BigNumber(id).minus("76561197960265728").toString();
  }
}

export function findById(ids){
  return collection('players').find({ _id: {$in: ids} }).toArrayAsync();
}