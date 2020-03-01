import React from 'react';
// import { Link } from 'dva/router';
// import Button from 'material-ui/Button';
import { makeStyles } from '@material-ui/core/styles';
import useTheme from '@hooks/useTheme';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';
import { ReactComponent as LogoLight } from '@/assets/images/logo_light.svg';

// const symbol = 'XBTUSDM';
const useStyles = makeStyles(theme => {
  const animation = {
    animationName: '$beat',
    animationDuration: '1s',
    animationTimingFunction: 'ease',
    animationIterationCount: 'infinite'
  };
  const backgroundColor = theme.palette.background.default;
  const styles = {
    '@keyframes beat': {
      '0%': {
        transform: 'scale(1)'
      },
      '50%': {
        transform: 'scale(1.5)'
      },
      '100%': {
        transform: 'scale(1)'
      }
    },
    logo: {
      background: backgroundColor,
      width: '10vw',
      ...animation
    },
    loading: {
      backgroundColor,
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };
  return styles;
});

const AppLoading = () => {
  const classes = useStyles();
  const [themeType] = useTheme();

  // const toggleTheme = () => {
  //   let nextTheme = 'light';
  //   if (themeType === 'light') {
  //     nextTheme = 'dark';
  //   }
  //   setTheme(nextTheme);
  // };

  return (
    <div className={classes.loading}>
      {themeType === 'dark' ? (
        <Logo edge="start" className={classes.logo} />
      ) : (
        <LogoLight edge="start" className={classes.logo} />
      )}
    </div>
  );
};

export default AppLoading;
