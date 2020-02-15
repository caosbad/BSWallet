import extend from 'dva-model-extend';
import storage from '../utils/storage';
import base from './commons/base';
import { UserSession, AppConfig } from 'blockstack';
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig: appConfig });

export default extend(base, {
  namespace: 'wallet',
  state: {
    wallet: undefined
  },
  effects: {
    *logout(_, { call }) {
      userSession.signUserOut(window.location.origin);
      window.location.href = '/';
    },
    *logIn(_, { put }) {
      console.log('login');
      userSession.redirectToSignIn();
    }
  },
  subscriptions: {}
});
