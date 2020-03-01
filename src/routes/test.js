import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  const backgroundColor = theme.palette.background.default;
  return {
    rootContainer: {
      height: '100%',
      width: '100%',
      background: 'gray'
    }
  };
});

const Test = () => {
  const classes = useStyles();
  console.log(' test page load =================================')
  return (
    <Box className={classes.rootContainer}>
      <Box className={classes.container} mt={8}>
        12345678
      </Box>
    </Box>
  );
};

export default Test;
