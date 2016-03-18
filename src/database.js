import Promise from 'bluebird';
import mongodb from 'mongodb';

Promise.promisifyAll(mongodb);

const url = 'mongodb://MacBook-Pro-de-NFS.local:27017/dotamath';
let pool;

export function connect(){
  if(pool) return pool;

  return mongodb.MongoClient
    .connectAsync(url)
    .then(function(db){
      pool = db;
      return pool;
    })
}

export function getConnection(){
  return pool;
}

export function collection(collection) {
  return pool.collection(collection);
}