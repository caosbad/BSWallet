import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'dva';

const useStyles = makeStyles(theme => {
  const backgroundColor = theme.palette.background.default;
  return {};
});

const Wallet = () => {
  const classes = useStyles();

  return (
    <Box className={classes.rootContainer}>
      <Box className={classes.container} mt={8}>
        123
      </Box>
    </Box>
  );
};

export default Wallet;
