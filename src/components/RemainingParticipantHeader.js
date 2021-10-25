import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { orderingSlice, currentSlice, statusSlice } from '../redux/reducers';
import {
  getParticipants,
  getOrdering,
  getIsScrumulating
} from '../redux/selectors';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const useStyles = createUseStyles({
  singleGrid: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  loadingText: {
    marginRight: '8px'
  }
});

const RemainingParticipantHeader = props => {
  const { ordering, isScrumulating, select, setCurrent, setOff, setOn } = props;
  const classes = useStyles();
  const [plural, setPlural] = useState(ordering.length ? 's' : '');

  const scrumuluate = () => {
    if (!ordering.length) return false;

    setOn();
    const index = Math.floor(Math.random() * ordering.length);

    window.setTimeout(() => {
      setCurrent(ordering[index]);
      select(ordering[index]);
      setOff();

      // KLUDGE: With two remaining, one will remain after reduce
      if (ordering.length === 2) setPlural('');
    }, 1500);
  };

  return (
    <>
      <ListItem key='remaining' className={classes.singleGrid}>
        <ListItemText primary={`Remaining Participant${plural}:`} />
        <Button
          variant='contained'
          onClick={scrumuluate}
          disabled={!ordering.length}
        >
          {isScrumulating && (
            <>
              <span className={classes.loadingText}>
                Scrumulating...
              </span>
              <CircularProgress size={20} sx={{ color: 'white' }} />
            </>
          )}
          {!isScrumulating && <>Scrumulate!</>}
        </Button>
      </ListItem>
      {!!ordering.length && <Divider />}
    </>
  );
};

RemainingParticipantHeader.propTypes = {
  participants: PropTypes.object.isRequired,
  ordering: PropTypes.arrayOf(PropTypes.string).isRequired,
  isScrumulating: PropTypes.bool.isRequired,
  select: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  setOff: PropTypes.func.isRequired,
  setOn: PropTypes.func.isRequired
};

const mapStateToProps = () => ({
  participants: getParticipants(),
  ordering: getOrdering(),
  isScrumulating: getIsScrumulating()
});

const mapDispatchToProps = dispatch => ({
  select: id => dispatch(orderingSlice.actions.remove({ id })),
  setCurrent: id => dispatch(currentSlice.actions.set({ id })),
  setOff: () => dispatch(statusSlice.actions.setOff()),
  setOn: () => dispatch(statusSlice.actions.setOn())
});

export default connect(mapStateToProps, mapDispatchToProps)(RemainingParticipantHeader);
