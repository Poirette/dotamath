import {collection} from '../../../database';

export default function load(matches) {
  const bulk = matches.map(match => {
    return {
      insertOne: {document: match }
    };
  });

  return collection('matches').bulkWrite(bulk, {ordered: false});
}
