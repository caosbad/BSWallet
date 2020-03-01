const { localStorage } = window;

export default {
  get: key => {
    if (!localStorage) {
      return null;
    }

    const data = localStorage.getItem(key);

    return JSON.parse(data);
  },
  set: (key, data) => {
    if (localStorage) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  },
  remove: key => {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  }
};
