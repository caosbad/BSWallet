import React from 'react';
// import { useSelector, useDispatch } from 'dva';
// import { makeStyles } from '@material-ui/core/styles';
import { Box, CssBaseline } from '@material-ui/core';
import ThemeTypeProvider from './providers/themeTypeProvider';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'dva/router';
import { Assets, Asset, Wallet, SignIn, Test } from './routes';
import TitleBar from '@components/TitleBar';
// configure({
//   apiServer: 'http://localhost:1260',
//   userSession
// });

function App() {
  return (
    <ThemeTypeProvider>
      <Box>
        <CssBaseline />
        <TitleBar></TitleBar>
        <Router>
          <Switch>
            {/* <Route path='/signIn' component={SignIn} />
            <Route path='/wallet' component={Wallet} />
            <Route path='/assets' component={Assets} />
            <Route path='/test' component={Test} /> */}
            {/* <Route path='/asset/:id' component={Asset} /> */}
            <Redirect to={`/`} />
          </Switch>
        </Router>
      </Box>
    </ThemeTypeProvider>
  );
}

export default App;
