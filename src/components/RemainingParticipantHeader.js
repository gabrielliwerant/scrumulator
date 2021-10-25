/**
 * RemainingParticipantHeader
 *
 * Header section of the remaining participants list
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

import { getOrdering } from '../redux/selectors';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const useStyles = createUseStyles({
  singleGrid: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const RemainingParticipantHeader = props => {
  const { ordering } = props;
  const classes = useStyles();

  return (
    <>
      <ListItem key='remaining' className={classes.singleGrid}>
        <ListItemText
          primary={`Remaining Participant${ordering.length > 1 ? 's' : ''}:`}
          primaryTypographyProps={{ fontWeight: 'bold' }}
        />
      </ListItem>
      {!!ordering.length && <Divider />}
    </>
  );
};

RemainingParticipantHeader.propTypes = {
  ordering: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = () => ({
  ordering: getOrdering()
});

export default connect(mapStateToProps, null)(RemainingParticipantHeader);
