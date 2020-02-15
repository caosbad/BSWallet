import React from 'react';
import { SnackbarProvider } from 'notistack';
import { AppContext } from './contexts';
import App from './App';

// eslint-disable-next-line
export default function routerConfig({ app }) {
  return (
    <AppContext.Provider value={app}>
      <SnackbarProvider maxSnack={5}>
        <App />
      </SnackbarProvider>
    </AppContext.Provider>
  );
}
