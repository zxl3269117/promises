/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('../bare_minimum/promiseConstructor.js');
var promisification = require('../bare_minimum/promisification.js');




var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then((profileName) => {
      return promisification.getGitHubProfileAsync(profileName);
    })
    .then((body) => {
      var newBody = JSON.stringify(body);
      return new Promise ((resolve, reject) => {
        fs.writeFile(writeFilePath, newBody, (err) => {
          if (!err) {
            resolve(newBody);
          } else {
            reject(err);
          }
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
