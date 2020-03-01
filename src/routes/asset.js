import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode-react';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'dva';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { withSnackbar } from 'notistack';

const useStyles = makeStyles(theme => {
  const backgroundColor = theme.palette.background.default;
  return {
    drawer: {
      padding: theme.spacing(3)
    }
  };
});

const Asset = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [asset, setAsset] = useState({});
  const [modalShow, setModal] = useState(false);
  const { assetsInfoMap } = useSelector(state => state.wallet);
  const smMatches = useMediaQuery('(max-width:960px)');

  const {
    match: { params },
    enqueueSnackbar
  } = props;
  const dispatch = useDispatch();
  const callback = res => {
    // console.log(res);
    const { data } = res;
    setAsset(data);
  };

  useEffect(() => {
    setAsset(assetsInfoMap[params.id]);
  }, [params, assetsInfoMap]);

  useEffect(() => {
    if (params && params.id) {
      dispatch({
        type: 'wallet/getAsset',
        payload: {
          assetId: params.id,
          cb: callback
        }
      });
    }
  }, [params, dispatch]);

  const handleReciveModal = flag => {
    setModal(flag);
  };
  const {
    icon_url = '',
    symbol = '',
    balance = 0,
    price_usd = 0,
    destination
  } = asset;
  return (
    <Box p={2} className={classes.rootContainer}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label='recipe'
              className={classes.avatar}
              src={icon_url}
            ></Avatar>
          }
          title={`${balance} ${symbol}`}
          subheader={`≈ ${balance * price_usd} USD`}
        />
        <CardContent>
          <CardActions>
            <Button
              size='small'
              color='primary'
              onClick={() => handleReciveModal(true)}
            >
              转入
            </Button>
            <Button size='small' color='primary'>
              转出
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Drawer open={modalShow} onClose={() => handleReciveModal(false)}>
        <Box
          style={{ width: smMatches ? '100vw' : '472px' }}
          className={classes.drawer}
        >
          <QRCode value={destination} />
          <CopyToClipboard
            text={destination}
            onCopy={() => enqueueSnackbar('copy success')}
          >
            <IconButton edge='end' aria-label=''>
              <FileCopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Box>
      </Drawer>
    </Box>
  );
};

export default withSnackbar(Asset);
