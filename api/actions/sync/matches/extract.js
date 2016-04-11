import Promise from 'bluebird';
import { collection } from '../../../database';
import request from '../../../services/request';

const API_KEY = '585FB03A761590C8FEF33EF3C4B35D41';
const HOST    = 'http://api.steampowered.com';

function getMatchDetail(match) {
  return request
    .get(HOST + '/IDOTA2Match_570/GetMatchDetails/V001/?key=' + API_KEY + '&match_id=' + match.match_id)
    .then(function(response){
      return {
        match: match,
        details: response.result
      }
    });
}

function getMatches(playerId64) {
  return request
    .get(HOST + '/IDOTA2Match_570/GetMatchHistory/V001/?key=' + API_KEY + '&account_id=' + playerId64)
    .then(function(response){
      return response.result.matches;
    });
}

function getMatchesInDatabase(playerId64) {
  return collection('matches').find({ players: { $elemMatch: { _id: playerId64 } } })
    .sort({start_time: -1})
    .toArrayAsync();
}

function substractMatches(steamMatches, dbMatches) {
  return steamMatches.filter(steamMatch =>
    !dbMatches.find(dbMatch => steamMatch.match_id === dbMatch._id)
  )
}

export default function extract(playerId64) {
  return Promise.join(
    getMatches(playerId64),
    getMatchesInDatabase(playerId64),
    substractMatches
  )
  .mapSeries(getMatchDetail);
};
