import extend from 'dva-model-extend';
import storage from '../utils/storage';
import base from './commons/base';
import API from '../services/mixinAPI';
import KJUR from 'jsrsasign';
import { getFile, putFile } from '@services/blockStack';
import { WALLET } from '@config/files';
import { routerRedux } from 'dva/router';

import _ from 'lodash';

const api = new API();

export default extend(base, {
  namespace: 'wallet',
  state: {
    wallet: undefined,
    assets: [],
    assetsInfoMap: {},
    assetsList: undefined
  },
  effects: {
    *getWallet({ payload }, { call, put }) {
      const fileData = yield getFile(WALLET, { decrypt: true });
      if (fileData) {
        // yield put({
        //   type: 'cacheWallet',
        //   payload: {
        //     fileData: fileData
        //   }
        // });
        const { user, wallet } = fileData;
        if (payload && payload.cb) {
          payload.cb(user, wallet);
        }
      } else {
        yield put({ type: 'createWallet', payload });
      }
    },

    *storeWallet({ payload }, { call, put }) {
      const { mixinUserData, wallet } = payload;
      // api.account.cacheUser(wallet, wallet.privateKey);
      const walletJson = { user: mixinUserData, wallet };
      yield put({
        type: 'update',
        payload: {
          wallet
        }
      });
      yield putFile(WALLET, walletJson, { encrypt: true });
    },

    *cacheWallet({ payload }, { call, put }) {
      const { user, wallet } = payload.fileData;
      api.account.cacheUser(wallet, wallet.privateKey);
      yield put({
        type: 'update',
        payload: {
          wallet: wallet
        }
      });
      yield put({
        type: 'session/update',
        payload: {
          mixinUserData: user
        }
      });
      // console.log(wallet)
    },

    *createWallet({ payload }, { call, select }) {
      const self = this;
      const { userData } = yield select(state => state.session);
      const { username } = userData;
      console.log(userData);
      const pin = Math.random()
        .toString()
        .slice(-6); // 随机 pin 码

      // if (pin.length !== 6) {
      //   self.api.notify('error', i18n.t('wallet.errors.pin'));
      //   return;
      // }

      var keyPair = KJUR.KEYUTIL.generateKeypair('RSA', 1024);
      keyPair.prvKeyObj.isPrivate = true;
      var privateKey = KJUR.KEYUTIL.getPEM(keyPair.prvKeyObj, 'PKCS1PRV');
      var publicKey = KJUR.KEYUTIL.getPEM(keyPair.pubKeyObj);

      yield api.mixin.createUser(
        (res, walletData) => {
          if (!res.error && payload && payload.cb) {
            payload.cb(res.data, walletData);
          }
        },
        privateKey,
        publicKey,
        pin,
        username
      );
    },
    *getAssets({ payload = {} }, { call, put, select }) {
      // TODO
      const { cb = _.noop } = payload;

      const assets = yield api.mixin.assets(cb);
    },
    *storeAssets({ payload = { asset: [] } }, { call, put, select }) {
      const { assets = [] } = payload;
      let assetsList = yield select(state => state.assetsList);
      let assetsInfoMap = {};
      if (!assetsList) {
        const arr = api.asset.preset();
        arr.forEach(asset => {
          const { asset_id } = asset;
          assetsInfoMap[asset_id] = asset;
        });
      }
      // fill asset in assetlist
      assets.forEach(asset => {
        const { asset_id } = asset;
        assetsInfoMap[asset_id] = asset;
      });
      assetsList = _.values(assetsInfoMap);

      yield put({
        type: 'update',
        payload: {
          assetsInfoMap,
          assets,
          assetsList
        }
      });
    },
    *getAsset({ payload }, { call, put }) {
      const { assetId, cb = _.noop } = payload;
      yield api.mixin.asset(cb, assetId);
    }
  },
  subscriptions: {
    initDat({ dispatch }) {
      dispatch({
        type: 'wallet/storeAssets'
      });
    }
  }
});
