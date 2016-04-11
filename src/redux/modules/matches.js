import _ from 'lodash';

const LOAD = 'dotamath/matches/LOAD';
const LOAD_SUCCESS = 'dotamath/matches/LOAD_SUCCESS';
const LOAD_FAIL = 'dotamath/matches/LOAD_FAIL';

const initialState = {
  loaded: false
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
  // return Promise.resolve().then(() => {
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

    if (!playerData) continue;

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
  // });
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        data: []
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
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

export function isLoaded(globalState) {
  return globalState.matches && globalState.matches.loaded;
}

export function load(playerId) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/matches/load/' + playerId)
  };
}

export function getStats(state, props) {
  const { matches } = state;
  const { playerIds, active, matchId, slot } = props.params;

  if (!(matches && matches.data)) return null;

  if (!matchId) {
    return summarize(matches.data, playerIds.split(',')[active]);
  }

  const matchData = matches.data.find(match => String(match._id) === String(matchId));

  const playerData = !!slot ? (
    matchData.players.find(player => Number(player.player_slot) === Number(slot))
  ) : (
    {_id: playerIds.split(',')[active] }
  );

  if (!matchData) {
    return null;
  }

  return summarize([matchData], playerData._id);
}
