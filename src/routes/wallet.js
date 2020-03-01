import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'dva';
import API from '@services/mixinAPI';

const api = new API();

const useStyles = makeStyles(theme => {
  const backgroundColor = theme.palette.background.default;
  return {};
});

const Wallet = ({ history }) => {
  const classes = useStyles();
  const { wallet } = useSelector(state => state.wallet);
  const dispatch = useDispatch();

  // console.log();

  // cache wallet callback
  const callback = async (res, walletData) => {
    // console.log(res, walletData);
    await dispatch({
      type: 'session/update',
      payload: {
        mixinUserData: res
      }
    });
    await dispatch({
      type: 'wallet/storeWallet',
      payload: {
        wallet: walletData,
        mixinUserData: res
      }
    });
    console.log('store wallet done ...');
    // if (walletData && res) {
    //   routerRedux.push('/assets');
    // }
    history.push('/assets')
  };

  useEffect(() => {
    dispatch({
      type: 'wallet/getWallet',
      payload: {
        cb: callback
      }
    });
  }, []);

  // const getWallet = async () => {
  //   dispatch({
  //     type: 'wallet/getWallet',
  //     payload: {
  //       cb: callback
  //     }
  //   });
  // };
  // const createWallet = () => {
  //   dispatch({
  //     type: 'wallet/createWallet',
  //     payload: {
  //       cb: callback
  //     }
  //   });
  // };
  // const exportFunc = () => {
  //   const base64 = Buffer.from(
  //     JSON.stringify({
  //       key: api.account.privateKey(),
  //       uid: api.account.userId(),
  //       pintoken: api.account.pinToken(),
  //       sid: api.account.sessionId()
  //     })
  //   ).toString('base64');
  //   console.log(base64);
  // };
  return (
    <Box className={classes.rootContainer}>
      <Box className={classes.container} mt={8}>
        {/* <Button onClick={getWallet}>导入</Button>
        <Button onClick={createWallet}>生成钱包</Button>
        <Button onClick={exportFunc}>导出私钥</Button> */}
      </Box>
    </Box>
  );
};

export default Wallet;
