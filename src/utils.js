/**
 * utils.js
 *
 * Separate exportable, reusable utilities.
 */

/**
  * Create ids for new participants
  *
  * @param {array} arr
  * @returns {number}
  */
const getRandomIndex = arr => Math.floor(Math.random() * arr.length);

/**
 * Create ids for new participants
 *
 * @returns {string}
 */
const makeId = () => `${Math.floor(Math.random() * 1000000)}`;

export { getRandomIndex, makeId };
