import extend from 'dva-model-extend';
import {} from '../services/sso';
// import storage from '@utils/storage';
// import { getUrlParams } from '@utils/helper';
import base from './commons/base';
import { UserSession, AppConfig } from 'blockstack';
import { routerRedux } from 'dva/router';
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig: appConfig });

export default extend(base, {
  namespace: 'session',
  state: {
    userData: undefined // 登录状态null为未登录
  },
  effects: {
    *checkUserSession(action, { call, select, put }) {
      const isSignedIn = userSession.isUserSignedIn();
      if (isSignedIn) {
        const userData = userSession.loadUserData();
        console.log(userData);
        yield put({ type: 'update', payload: { userData } });
        yield put(routerRedux.push('/wallet'));
      } else {
        const pending = userSession.isSignInPending();
        if (pending) {
          const data = yield userSession.handlePendingSignIn();
          yield put({ type: 'update', payload: { userData: data } });
          yield put(routerRedux.push('/wallet'));
        } else {
          yield put(routerRedux.push('/signIn'));
        }
      }
    },

    *logout(_, { call }) {
      userSession.signUserOut(window.location.origin);
      window.location.href = '/';
    },
    *logIn(_, { put }) {
      // yield put({
      //   type: 'update',
      //   payload: {
      //     loginInvalid: true
      //   }
      // });
      console.log('login');
      userSession.redirectToSignIn();
    },

    *putFile({ payload }) {
      try {
        const { fileName, options = { encrypt: false }, data } = payload;
        yield userSession.putFile(fileName, JSON.stringify(data), options);
        console.log('put file ', `encrypt ${options.encrypt} ...`);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    *getFile({ payload }) {
      try {
        const { fileName, options = { decrypt: false } } = payload;
        const file = yield userSession.getFile(fileName, options);
        console.log('get file ', `decrypt ${options.decrypt} ...`);
        return file;
      } catch (error) {
        console.error(error);
      }
    }
  },
  subscriptions: {
    initApp({ dispatch }) {
      dispatch({
        type: 'checkUserSession'
      });
    },
    checkVersion({ history, dispatch }) {
      if (process.env.NODE_ENV !== 'development') {
        history.listen(() => {
          dispatch({
            type: 'checkVersion'
          });
        });
      }
    }
  }
});
