import { createSlice } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_KEY } from '../constants';

/**
 * Create new participants
 *
 * @param {string} name
 * @returns {object}
 */
const makeNewParticipant = name => ({
  name,
  isEditActive: false,
  edit: {
    draft: name,
    final: name
  }
});

/**
 * Get new ordering from participant keys
 *
 * @param {object} participants
 * @returns {array}
 */
const setOrdering = participants => Object.keys(participants);

/**
 * Retrieve data from local storage or initial data structure.
 *
 * Data format:
 *
 * {
 *   participants: {
 *     id: {
 *       name: '',
 *       isEditActive: false,
 *       edit: {
 *         draft: '',
 *         final: ''
 *       }
 *     }
 *   },
 *   ordering: [],
 *   current: id,
 *   status: {
 *     isScrumulating: false
 *   }
 * }
 *
 * @returns {object}
 */
const getInitialState = () => {
  const local = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const initial = {
    participants: {},
    ordering: [],
    current: '',
    status: { isScrumulating: false }
  };

  if (local) {
    const localJson = JSON.parse(local);
    localJson.ordering = setOrdering(localJson.participants);
    return localJson;
  }

  return initial;
};

const initialState = getInitialState();

const participantsSlice = createSlice({
  name: 'participants',
  initialState: initialState.participants,
  reducers: {
    add: (state, action) => {
      const id = action.payload.id;
      state[id] = makeNewParticipant('(New Participant)');
    },
    edit: (state, action) => {
      state[action.payload.id].isEditActive = true;
    },
    change: (state, action) => {
      state[action.payload.id].edit.draft = action.payload.text;
    },
    save: (state, action) => {
      state[action.payload.id].isEditActive = false;
      state[action.payload.id].name = action.payload.text;
      state[action.payload.id].edit.final = action.payload.text;
      state[action.payload.id].edit.draft = action.payload.text;
    },
    cancel: (state, action) => {
      const final = state[action.payload.id].edit.final;
      state[action.payload.id].isEditActive = false;
      state[action.payload.id].edit.draft = final;
    },
    remove: (state, action) => {
      delete state[action.payload.id];
    }
  }
});

const orderingSlice = createSlice({
  name: 'ordering',
  initialState: initialState.ordering,
  reducers: {
    add: (state, action) => {
      state.push(action.payload.id);
    },
    refresh: (state, action) => setOrdering(action.payload.participants),
    remove: (state, action) => state.filter(id => id !== action.payload.id)
  }
});

const currentSlice = createSlice({
  name: 'current',
  initialState: initialState.current,
  reducers: {
    set: (state, action) => action.payload.id,
    refresh: () => ''
  }
});

const statusSlice = createSlice({
  name: 'status',
  initialState: initialState.status,
  reducers: {
    setOn: state => {
      state.isScrumulating = true;
    },
    setOff: state => {
      state.isScrumulating = false;
    }
  }
});

export { participantsSlice, orderingSlice, currentSlice, statusSlice };
