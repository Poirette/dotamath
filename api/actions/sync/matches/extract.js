import Promise from 'bluebird';
import { collection } from '../../../database';
import request from '../../../services/request';

const API_KEY = '585FB03A761590C8FEF33EF3C4B35D41';
const HOST    = 'http://api.steampowered.com';

function getMatchDetail(match) {
  return request
    .get(HOST + '/IDOTA2Match_570/GetMatchDetails/V001/?key=' + API_KEY + '&match_id=' + match.match_id)
    .then(response => {
      if(response.result.players.length !== 10) {
        throw { error: 'Players missing, only' + String(response.result.players.length) };
      }

      return {
        match: match,
        details: response.result
      };
    })
    .catch(err => {
      return null;
    });
}

function getMatches(params) {
  let url = '';

  if (params.playerIds) {
    url = HOST + '/IDOTA2Match_570/GetMatchHistory/V001/?key=' + API_KEY + '&account_id=' + params.playerIds;
  } else if (params.skill) {
    url = HOST + '/IDOTA2Match_570/GetMatchHistory/V001/?key=' + API_KEY + '&skill=' + params.skill;
  }

  return request
    .get(url)
    .then(function(response){
      return response.result.matches;
    });
}

function getMatchesInDatabase(params) {
  let query = {};

  if (params.playerIds) {
    query = { players: { $elemMatch: { _id: params.playerIds } } };
  } else if (params.skill) {
    query = {};
  }

  return collection('matches').find(query)
    .sort({start_time: -1})
    .toArrayAsync();
}

function substractMatches(steamMatches, dbMatches) {
  return steamMatches.filter(steamMatch =>
    !dbMatches.find(dbMatch => steamMatch.match_id === dbMatch._id)
  )
}

export default function extract(params) {
  return Promise.join(
    getMatches(params),
    getMatchesInDatabase(params),
    substractMatches
  )
  .mapSeries(getMatchDetail)
  .catch(err => {
    console.log(err);
  });
};
