/**
 * PrimaryMenu
 *
 * Handles the main menu actions for the app.
 */

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
import { getRandomIndex, makeId } from '../utils';

import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import Refresh from '@mui/icons-material/Refresh';

const classNames = require('classnames');

const useStyles = createUseStyles({
  container: {
    justifyContent: 'space-between',
    marginBottom: '16px',
    paddingInlineStart: 0
  },
  menu: {
    display: 'flex',
    listStyle: 'none'
  },
  rightSeparator: {
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
    remove,
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
    const index = getRandomIndex(ordering);

    window.setTimeout(() => {
      setCurrent(ordering[index]);
      setOff();

      window.setTimeout(() => {
        remove(ordering[index]);
      }, 500);
    }, 1500);
  };

  return (
    <ul
      className={classNames({
        [classes.container]: true,
        [classes.menu]: true
      })}
      role='menu'
    >
      <li role='menuitem'>
        <Button
          variant='contained'
          onClick={scrumuluate}
          disabled={!ordering.length}
        >
          {isScrumulating && (
            <>
              <span className={classes.rightSeparator}>
                Scrumulating...
              </span>
              <CircularProgress size={20} sx={{ color: 'white' }} />
            </>
          )}
          {!isScrumulating && <>Scrumulate!</>}
        </Button>
      </li>

      <ul role='menu' className={classes.menu}>
        <li role='menuitem'>
          <Fab
            color="primary"
            aria-label="add"
            size="small"
            onClick={onClickAdd}
            className={classes.rightSeparator}
          >
            <Add />
          </Fab>
        </li>
        <li role='menuitem'>
          <Fab
            color="primary"
            aria-label="refresh"
            size="small"
            onClick={onClickRefresh}
          >
            <Refresh />
          </Fab>
        </li>
      </ul>
    </ul>
  );
};

PrimaryMenu.propTypes = {
  participants: PropTypes.object.isRequired,
  ordering: PropTypes.arrayOf(PropTypes.string).isRequired,
  isScrumulating: PropTypes.bool.isRequired,
  addOrdering: PropTypes.func.isRequired,
  refreshOrdering: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
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
  remove: id => dispatch(orderingSlice.actions.remove({ id })),
  refreshCurrent: () => dispatch(currentSlice.actions.refresh()),
  setCurrent: id => dispatch(currentSlice.actions.set({ id })),
  addParticipant: id => dispatch(participantsSlice.actions.add({ id })),
  setOff: () => dispatch(statusSlice.actions.setOff()),
  setOn: () => dispatch(statusSlice.actions.setOn())
});

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryMenu);
