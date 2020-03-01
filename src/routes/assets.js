import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import withWidth from '@material-ui/core/withWidth';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'dva';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import Box from '@material-ui/core/Box';
// import { createBrowserHistory } from 'history';
import { withRouter } from 'dva/router';
const useStyles = makeStyles(theme => {
  const backgroundColor = theme.palette.background.default;
  return {
    listBox: {
      width: '90%'
    }
  };
});

const Assets = props => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { history } = props;
  const callback = res => {
    const { data } = res;
    dispatch({
      type: 'wallet/storeAssets',
      payload: {
        assets: data
      }
    });
  };

  useEffect(() => {
    dispatch({
      type: 'wallet/getAssets',
      payload: {
        cb: callback
      }
    });
  }, []);

  const dispatch = useDispatch();
  const { asssets, assetsInfoMap, assetsList = [] } = useSelector(
    state => state.wallet
  );

  const openAsset = assetId => {
    history.push(`/asset/${assetId}`);
  };

  const renderAssets = () => {
    return assetsList.map(asset => {
      const { asset_id, name, symbol, icon_url } = asset;
      return (
        <ListItem
          key={asset_id}
          divider
          button
          onClick={() => openAsset(asset_id)}
        >
          <ListItemAvatar>
            <Avatar alt='' src={icon_url}></Avatar>
          </ListItemAvatar>
          <ListItemText primary={symbol}></ListItemText>
          <ListItemSecondaryAction>
            <IconButton edge='end' aria-label=''>
              <InboxIcon />
            </IconButton>
            <IconButton ml={1} edge='end' aria-label=''>
              <SendIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  return (
    <Grid item xs={12} md={12} justify='center' container space={1}>
      {/* <Typography variant='h6' className={classes.title}>
        Avatar with text and icon
      </Typography> */}
      <Box className={classes.listBox}>
        <List>{renderAssets()}</List>
      </Box>
    </Grid>
  );
};

export default withRouter(Assets);
