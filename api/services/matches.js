import {collection} from '../database';

function parseBulk(match){
  return { insertOne: {document: match }}
}

export function findByPlayerId(playerId, limit = 25, sort = -1) {
  return collection('matches')
    .find({ players: { $elemMatch: { _id: playerId }} })
    .limit(limit)
    .sort({start_time: sort})
    .toArrayAsync();
}

export function findById(matchId){
  return collection('matches').find({ _id: matchId }).toArrayAsync();
}

export function create(matches){
  return collection('matches').bulkWrite(matches.map(parseBulk), {ordered: false});
}

export function findAll(limit, sort) {
  return collection('matches').find().limit(limit).sort(sort).toArrayAsync();
}
