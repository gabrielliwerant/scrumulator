import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import {
  orderingSlice,
  participantsSlice,
  currentSlice,
  statusSlice
} from '../redux/reducers';
import {
  getParticipants,
  getOrdering,
  getIsScrumulating
} from '../redux/selectors';
import { makeId } from '../utils';

import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Refresh from '@mui/icons-material/Refresh';

const useStyles = createUseStyles({
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  loadingText: {
    marginRight: '8px'
  }
});

const PrimaryMenu = props => {
  const {
    participants,
    ordering,
    isScrumulating,
    addOrdering,
    refreshOrdering,
    select,
    refreshCurrent,
    setCurrent,
    addParticipant,
    setOff,
    setOn
  } = props;
  const classes = useStyles();
  const onClickAdd = () => {
    const id = makeId();
    addParticipant(id);
    addOrdering(id);
  };
  const onClickRefresh = () => {
    refreshOrdering(participants);
    refreshCurrent();
  };

  const scrumuluate = () => {
    if (!ordering.length) return false;

    setOn();
    const index = Math.floor(Math.random() * ordering.length);

    window.setTimeout(() => {
      setCurrent(ordering[index]);
      select(ordering[index]);
      setOff();
    }, 1500);
  };

  return (
    <nav className={classes.navContainer}>
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

      <nav>
        <IconButton
          aria-label="add"
          size="small"
          color="primary"
          onClick={onClickAdd}
        >
          <AddCircle fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="add"
          size="small"
          color="primary"
          onClick={onClickRefresh}
        >
          <Refresh fontSize="large" />
        </IconButton>
      </nav>
    </nav>
  );
};

PrimaryMenu.propTypes = {
  participants: PropTypes.object.isRequired,
  ordering: PropTypes.arrayOf(PropTypes.string).isRequired,
  isScrumulating: PropTypes.bool.isRequired,
  addOrdering: PropTypes.func.isRequired,
  refreshOrdering: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
  refreshCurrent: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
  addParticipant: PropTypes.func.isRequired,
  setOff: PropTypes.func.isRequired,
  setOn: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({
  participants: getParticipants(),
  ordering: getOrdering(),
  isScrumulating: getIsScrumulating()
});

const mapDispatchToProps = dispatch => ({
  addOrdering: id => dispatch(orderingSlice.actions.add({ id })),
  refreshOrdering: participants => dispatch(orderingSlice.actions.refresh({ participants })),
  select: id => dispatch(orderingSlice.actions.remove({ id })),
  refreshCurrent: () => dispatch(currentSlice.actions.refresh()),
  setCurrent: id => dispatch(currentSlice.actions.set({ id })),
  addParticipant: id => dispatch(participantsSlice.actions.add({ id })),
  setOff: () => dispatch(statusSlice.actions.setOff()),
  setOn: () => dispatch(statusSlice.actions.setOn())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryMenu);
