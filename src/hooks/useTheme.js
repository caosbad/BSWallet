import { useContext } from 'react';
import { ThemeTypeContext } from '../contexts';

export default () => {
  const themeValue = useContext(ThemeTypeContext);
  return [themeValue.currentThemeType, themeValue.setThemeType];
};
