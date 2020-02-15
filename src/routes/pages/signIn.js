import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'dva';

const useStyles = makeStyles(theme => {
  const backgroundColor = theme.palette.background.default;
  return {};
});

const SignIn = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <Box className={classes.rootContainer}>
      <Box className={classes.container} mt={8}>
        <Button onClick={() => dispatch({ type: 'session/logIn' })}>
          {t('signIn')}
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
