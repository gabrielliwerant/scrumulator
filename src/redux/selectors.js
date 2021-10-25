/**
 * selectors.js
 *
 * Creates selectors for use in redux state bindings.
 */

import { getState } from './config';

// Participants
const getParticipants = () => getState('participants');
const getParticipant = id => getParticipants()[id];
const getParticipantName = id => getParticipant(id).name;
const getParticipantEdit = id => getParticipant(id).edit;
const getParticipantDraft = id => getParticipantEdit(id).draft;
const getIsEditActive = id => getParticipant(id).isEditActive;

// Ordering
const getOrdering = () => getState('ordering');

// Current
const getCurrent = () => getState('current');
const getCurrentName = () => !!getCurrent() ? getParticipantName(getCurrent()) : '';

// Status
const getStatus = () => getState('status');
const getIsScrumulating = () => getStatus().isScrumulating;

export {
  getParticipants,
  getParticipant,
  getParticipantName,
  getParticipantDraft,
  getIsEditActive,

  getOrdering,

  getCurrent,
  getCurrentName,

  getIsScrumulating
};
