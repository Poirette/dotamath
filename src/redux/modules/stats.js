import _ from 'lodash';
import Promise from 'bluebird';

const COMPUTE = 'dotamath/stats/COMPUTE';
const COMPUTE_SUCCESS = 'dotamath/stats/COMPUTE_SUCCESS';
const COMPUTE_FAIL = 'dotamath/stats/COMPUTE_FAIL';

const initialState = {
  data: null
};

function findPlayerInMatch(match, playerId) {
  return match.players.find(player => {
    return player._id === playerId;
  });
}

function addStat(playerData, stats, key) {
  if (typeof stats[key] === 'undefined') stats[key] = 0;
  stats[key] += playerData[key];
}

function averageStat(stats, t, key) {
  if (typeof stats[key] === 'undefined') stats[key] = 0;
  stats[key] = stats[key] / t;
}

function summarize(matches, playerId) {
  return Promise.resolve().then(() => {
    const statsToSum = ['kills', 'deaths', 'assists', 'denies', 'gold', 'gold_spent', 'hero_damage', 'hero_healing', 'last_hits', 'level', 'tower_damage'];
    const statsToAverage = ['kills_per_min', 'deaths_per_min', 'assists_per_min', 'denies_per_min', 'gold_per_min', 'hero_damage_per_min', 'hero_healing_per_min', 'last_hits_per_min', 'tower_damage_per_min', 'xp_per_min'];
    const allStats = statsToSum.concat(statsToAverage);
    const stats = {
      win: 0,
      loss: 0
    };

    let matchesLen = matches.length;

    while (matchesLen--) {
      const match = matches[matchesLen];
      const playerData = findPlayerInMatch(match, playerId);
      // Win loss
      if (!!playerData.is_radiant === !!match.radiant_win) {
        stats.win++;
      } else {
        stats.loss++;
      }

      allStats.forEach(addStat.bind(this, playerData, stats));
    }

    statsToAverage.forEach(averageStat.bind(this, stats, matches.length));

    return [{
      sum: _.pick(stats, statsToSum),
      perMin: _.pick(stats, statsToAverage)
    }];
  });
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case COMPUTE:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: null
      };
    case COMPUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case COMPUTE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function computeStats(matches, playerId) {
  return {
    types: [COMPUTE, COMPUTE_SUCCESS, COMPUTE_FAIL],
    promise: summarize.bind(null, matches, playerId)
  };
}

