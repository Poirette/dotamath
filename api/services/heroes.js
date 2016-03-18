import {collection} from '../../src/database';

export function findAll(){
  return collection('heroes').find().toArrayAsync();
}