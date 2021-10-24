import { createSlice } from '@reduxjs/toolkit';

import { LOCAL_STORAGE_KEY } from './constants';

/**
 * Create new participants
 *
 * @param {string} final
 * @returns {object}
 */
const makeNewParticipant = name => ({
  name,
  isEditActive: false,
  isRemoved: false,
  edit: {
    draft: name,
    final: name
  }
});

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
 *       isRemoved: false,
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
    participants: {
      1: makeNewParticipant('Gabriel'),
      2: makeNewParticipant('Ada'),
      3: makeNewParticipant('Antonio'),
      4: makeNewParticipant('Amanda'),
      5: makeNewParticipant('Bill'),
      6: makeNewParticipant('Carl'),
      7: makeNewParticipant('Ciacci')
    },
    ordering: [1, 2, 3, 4, 5, 6, 7],
    current: null,
    status: { isScrumulating: false }
  };

  //if (local) return JSON.parse(local);
  return initial;
};

const initialState = getInitialState();

const participantsSlice = createSlice({
  name: 'participants',
  initialState: initialState.participants,
  reducers: {
    add: (state, action) => {
      const id = action.payload.id;
      state[id] = makeNewParticipant(id, '');
    },
    edit: (state, action) => {
      state[action.payload.id].isEditActive = true;
    },
    change: (state, action) => {
      state[action.payload.id].edit.draft = action.payload.text;
    },
    save: (state, action) => {
      state[action.payload.id].isEditActive = false;
      state[action.payload.id].edit.final = action.payload.text;
    },
    cancel: (state, action) => {
      const final = state[action.payload.id].edit.final;
      state[action.payload.id].isEditActive = false;
      state[action.payload.id].edit.draft = final;
    },
    remove: (state, action) => {
      state[action.payload.id].isRemoved = true;
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
    remove: (state, action) => state.filter(id => id !== action.payload.id)
  }
});

const currentSlice = createSlice({
  name: 'current',
  initialState: initialState.current,
  reducers: {
    set: (state, action) => action.payload.id
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
