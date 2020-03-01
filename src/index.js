import React from 'react';
import dva from 'dva';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import '@utils/i18n';
import sessopModel from './models/session';
import walletModel from './models/wallet';
import router from './router';

const app = dva({
  history: createBrowserHistory()
});

// app.use(showError);
// Router
app.router(router);

// model
app.model(sessopModel);
app.model(walletModel);
app.start('#root');

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
