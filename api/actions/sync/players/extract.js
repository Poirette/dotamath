import request from '../../../services/request';

const API_KEY = '585FB03A761590C8FEF33EF3C4B35D41';
const HOST    = 'http://api.steampowered.com';

export default function extract(playerIds64) {
  console.log('extract', HOST + '/ISteamUser/GetPlayerSummaries/v0002/?key=' + API_KEY + '&steamids=' + playerIds64);
  return request
    .get(HOST + '/ISteamUser/GetPlayerSummaries/v0002/?key=' + API_KEY + '&steamids=' + playerIds64)
    .then(function(results){
      return results.response.players;
    });
};