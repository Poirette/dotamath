import request from 'superagent';

/**
 * Wrapper for calling a API
 */
export default {
  get(url) {
    return new Promise(function(resolve, reject){
      request
        .get(url)
        .end(function(err, res) {
          if (err) {
            reject();
          } else {
            resolve(JSON.parse(res.text));
          }
        });
    });
  }
};