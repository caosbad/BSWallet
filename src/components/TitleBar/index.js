import React, { useEffect, useCallback } from 'react';

import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Button,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LightIcon from '@material-ui/icons/WbSunny';
import logoutIcon from '@material-ui/icons/PowerSettingsNew';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useTheme from '@hooks/useTheme';
import { createBrowserHistory } from 'history';


import storage from '@utils/storage';
import { useSelector, useDispatch } from 'dva';


const useStyles = makeStyles(theme => {
  const backgroundColor = theme.palette.background.default;
  return {
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  };
});

const TitleBar = ( ) => {
  const classes = useStyles();
  const [themeType, setTheme] = useTheme();
  const history = createBrowserHistory();
  const dispatch = useDispatch();
  const toggleTheme = useCallback(() => {
    let nextTheme = 'light';
    if (themeType === 'light') {
      nextTheme = 'dark';
    }
    setTheme(nextTheme);
    storage.set('theme', nextTheme);
  }, [setTheme, themeType]);

  const logout = () => {
    
  }

  return (
    <Box className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' align='center' className={classes.title}>
            BsWallet
          </Typography>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={() => history.push('/profile')}
          >
            <AccountCircleIcon />
          </IconButton>
          {/* <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={() => history.push('/profile')}
          >
            <AccountCircleIcon />
          </IconButton>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            onClick={logout}
          >
            <logoutIcon />
          </IconButton> */}
         
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TitleBar;
