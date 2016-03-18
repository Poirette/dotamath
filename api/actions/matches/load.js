import {findByPlayerId} from '../../services/matches';

export default function load(req, params) {
  return findByPlayerId(params[0]);
}