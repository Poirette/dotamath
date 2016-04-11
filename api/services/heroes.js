import {collection} from '../database';

export function findAll(){
  return collection('heroes').find().toArrayAsync();
}