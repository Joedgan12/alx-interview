#!/usr/bin/node
const request = require('request');

/**
 * Wrapper function for request object that allows it
 * to work with async and await
 * @param   {String} url - site url
 * @returns {Promise}    - promise object that resolves
 *                         with parsed JSON response
 *                         and rejects with the request error.
 */
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    request.get(url, (error, response, body) => {
      if (error) return reject(error);
      try {
        const data = JSON.parse(body);
        resolve(data);
      } catch (err) {
        reject(new Error('Failed to parse JSON'));
      }
    });
  });
}

/**
 * Entry point - makes requests to Star Wars API
 * for movie info based movie ID passed as a CLI parameter.
 * Retrieves movie character info then prints their names
 * in order of appearance in the initial response.
 */
async function main() {
  const args = process.argv;

  if (args.length < 3) {
    console.log("Usage: node script.js <MovieID>");
    return;
  }

  const movieId = args[2];
  const movieUrl = `https://swapi-api.alx-tools.com/api/films/ ${movieId}`;

  try {
    const movie = await makeRequest(movieUrl);

    if (!movie || !movie.characters || !Array.isArray(movie.characters)) {
      console.log("Invalid movie data");
      return;
    }

    for (const characterUrl of movie.characters) {
      try {
        const character = await makeRequest(characterUrl);
        console.log(character.name);
      } catch (err) {
        console.error(`Error fetching character: ${err.message}`);
      }
    }
  } catch (err) {
    console.error(`Error fetching movie: ${err.message}`);
  }
}

main();
