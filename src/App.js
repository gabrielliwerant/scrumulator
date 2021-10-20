import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { reduce as _reduce } from 'lodash';

const useStyles = createUseStyles({
  '@global': {
    body: {
      margin: 0,
      fontFamily: '"Roboto", arial, sans-serif'
    }
  }
});

const PARTICIPANTS = [
  'Gabriel',
  'Ada',
  'Antonio',
  'Amanda',
  'Bill',
  'Carl',
  'Ciacci'
];

const App = () => {
  useStyles();
  const [participants, setParticipants] = useState(PARTICIPANTS);
  const [current, setCurrent] = useState('');

  const scrumluate = () => {
    if (!participants.length) return false;

    const index = Math.floor(Math.random() * participants.length);

    setCurrent(participants[index]);
    setParticipants(_reduce(participants, (acc, cur) => {
      if (cur !== participants[index]) return [ ...acc, cur ];
      return [ ...acc ];
    }, []));
  };

  return (
    <div>
      <p>Current: {current}</p>
      <p>Remaining:</p>
      <ul>
        {participants.map(p => <li key={p}>{p}</li>)}
      </ul>
      <button onClick={scrumluate}>Go!</button>
    </div>
  );
};

export default App;
