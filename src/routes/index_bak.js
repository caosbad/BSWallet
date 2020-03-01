import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { useSelector, useDispatch } from 'dva';
import { UserSession, AppConfig } from 'blockstack';

import Box from '@material-ui/core/Box';
// import Notifier from '@components/Notifier';
// import TitleBar from './components/TitleBar';
// import Paper from 'material-ui/Paper';

const useStyles = makeStyles(theme => {
  // const isMobileQuery = theme.breakpoints.down('md');
  // const isPadQuery = '@media (min-width:960px) and (max-width:1280px)';
  const backgroundColor = theme.palette.background.default;

  return {
    rootContainer: {
      background: backgroundColor
    },
    container: {
      display: 'grid',
      gridTemplateColumns: '3fr 2fr 432px',
      gridTemplateRows: 'auto 160px 138px',
      gridGap: theme.spacing(5),
      minHeight: `calc(100vh - 64px)`,
      padding: `${theme.spacing(1.25)}px ${theme.spacing(5)}px ${theme.spacing(
        5
      )}px`
      //   [isMobileQuery]: {
      //     gridTemplateColumns: '100%',
      //     gridTemplateRows: 'repeat(5, auto)',
      //     padding: theme.spacing(1.5),
      //     gridGap: `${theme.spacing(4.5)}px 0`
      //   },
      //   [isPadQuery]: {
      //     gridTemplateColumns: 'calc(100% - 472px) 432px',
      //     gridTemplateRows: 'auto 170px 158px 368px',
      //     gridGap: theme.spacing(5),
      //     padding: theme.spacing(5)
      //   }
    }
    // chartPanel: {
    //   gridColumn: '1/3',
    //   gridRow: '1/2',
    //   width: '100%',
    //   minHeight: '400px',
    //   [isMobileQuery]: {
    //     ...mobileItemStyle(1)
    //   },
    //   [isPadQuery]: {
    //     gridColumn: '1/2',
    //     gridRow: '1/2'
    //   }
    // },
    // tradePanel: {
    //   gridColumn: '3/4',
    //   gridRow: '1/4',
    //   [isMobileQuery]: {
    //     ...mobileItemStyle(2)
    //   },
    //   [isPadQuery]: {
    //     gridColumn: '2/3',
    //     gridRow: '1/5'
    //   }
    // },
    // statsPanel: {
    //   gridColumn: '1/2',
    //   gridRow: '2/3',
    //   alignSelf: 'stretch',
    //   [isMobileQuery]: {
    //     ...mobileItemStyle(3)
    //   },
    //   [isPadQuery]: {
    //     gridColumn: '1/2',
    //     gridRow: '2/3'
    //   }
    // },
    // statsList: {
    //   gridColumn: '2/3',
    //   gridRow: '2/4',
    //   [isMobileQuery]: {
    //     ...mobileItemStyle(4)
    //   },
    //   [isPadQuery]: {
    //     gridColumn: '1/2',
    //     gridRow: '4/5'
    //   }
    // },
  };
});

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig: appConfig });
console.log(userSession);
// configure({
//   apiServer: 'http://localhost:1260',
//   userSession
// });

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Box className={classes.rootContainer}>
      {/* <TitleBar /> */}
      <Box className={classes.container} mt={8}>
        1234
      </Box>
      {/* <Notifier /> */}
    </Box>
  );
};

export default withWidth()(Home);
