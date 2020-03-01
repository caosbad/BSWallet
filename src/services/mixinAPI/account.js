import storage from '@utils/storage'
function Account(api) {
  this.api = api;
}

Account.prototype = {

  cacheUser: function (user, privateKey) {
    storage.set('uid', user.user_id);
    storage.set('sid', user.session_id);
    storage.set('pintoken', user.pin_token);
    storage.set('prvkey', privateKey);
  },

  pinToken: function () {
    return storage.get('pintoken');
  },

  userId: function () {
    return storage.get('uid');
  },

  sessionId: function () {
    return storage.get('sid');
  },

  privateKey: function () {
    return storage.get('prvkey');
  },

  loggedIn: function() {
    if (this.privateKey()) {
      return true
    }
    return false;
  },

  clear: function (callback) {
    storage.clear();
    if (typeof callback === 'function') {
      callback();
    }
  }

};

export default Account;
