import { UserSession, AppConfig } from 'blockstack';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig: appConfig });

export const putFile = async (fileName, data, options = { encrypt: false }) => {
  return await userSession.putFile(fileName, JSON.stringify(data), options);
};

export const getFile = async (fileName, options = { decrypt: false }) => {
  const file = await userSession.getFile(fileName, options);
  const data = JSON.parse(file);
  return data;
};

export const signOut = () => {
  userSession.signUserOut(window.location.origin);
};

export const signIn = () => {
  return userSession.redirectToSignIn();
};

export const loadUserData = () => {
  return userSession.loadUserData();
};

export const isSignedIn = () => {
  return userSession.isUserSignedIn();
};
