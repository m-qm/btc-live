import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { SnackbarProvider } from 'notistack';
import { theme } from './Shared/Theme';
import { Routing } from './Shared/Router/Routing';
import store from './Shared/Store/Store';

function App() {
  const persistor = persistStore(store);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Routing />
          </PersistGate>
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
