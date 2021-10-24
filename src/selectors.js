import { getState } from './config';

const getParticipants = () => getState('participants');
const getParticipant = id => getParticipants()[id];
const getParticipantName = id => getParticipant(id).name;
const getParticipantEdit = id => getParticipant(id).edit;
const getParticipantDraft = id => getParticipantEdit(id).draft;
const getIsEditActive = id => getParticipant(id).isEditActive;

const getOrdering = () => getState('ordering');

const getCurrent = () => getState('current');
const getCurrentName = () => !!getCurrent() ? getParticipantName(getCurrent()) : '';

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
