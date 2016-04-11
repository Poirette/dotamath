import extract from './extract';
import transform from './transform';
import load from './load';

export default function run(req) {
  return extract(req.query.playerIds)
    .then(transform)
    .then(load);
}
