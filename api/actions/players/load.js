import {findById} from '../../services/players';

export default function load(req, params) {
  return findById(params[0].split(','))
}
