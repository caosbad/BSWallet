import React from 'react';
// import { useSelector, useDispatch } from 'dva';
// import { makeStyles } from '@material-ui/core/styles';
import { Box, CssBaseline } from '@material-ui/core';
import ThemeTypeProvider from './providers/themeTypeProvider';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'dva/router';
import Index from './routes';
import SignIn from './routes/pages/signIn';
import Wallet from './routes/pages/wallet';


// configure({
//   apiServer: 'http://localhost:1260',
//   userSession
// });

function App() {
  return (
    <ThemeTypeProvider>
      <Box>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path='/signIn' component={SignIn} />
            <Route path='/wallet' component={Wallet} />
            <Route path='/' component={Index} />
            <Redirect to={`/`} />
          </Switch>
        </Router>
      </Box>
  </ThemeTypeProvider>
  );
}

export default App;
