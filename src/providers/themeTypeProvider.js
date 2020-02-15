import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import getTheme from '../styles/themes';
import storage from '../utils/storage';
import { ThemeTypeContext } from '../contexts';

const ThemeTypeProvider = props => {
  const { defaultKey = 'light', children } = props;
  const currentTheme = storage.get('theme') || defaultKey;
  const [current, setCurrent] = useState(currentTheme);

  const theme = getTheme(current);
  return (
    <ThemeTypeContext.Provider
      value={{
        currentThemeType: current,
        setThemeType: key => setCurrent(key)
      }}
    >
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeTypeContext.Provider>
  );
};

ThemeTypeProvider.propTypes = {
  defaultKey: PropTypes.string,
  children: PropTypes.element
};

export default ThemeTypeProvider;
