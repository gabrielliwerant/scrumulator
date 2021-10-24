/**
 * utils.js
 *
 * Separate exportable, reusable utilities.
 */

/**
 * Create ids for new participants
 *
 * @returns {string}
 */
const makeId = () => `${Math.floor(Math.random() * 1000000)}`;

export { makeId };
