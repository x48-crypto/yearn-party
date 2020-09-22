import React from 'react';
import ConnectionProvider from 'containers/ConnectionProvider';
import Dashboard from 'components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import pricesSaga from 'containers/App/sagas/pricesSaga';
import vaultsSaga from 'containers/App/sagas/vaultsSaga';
import reducer from 'containers/App/reducer';

import GlobalStyle from '../../global-styles';

export default function App() {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'pricesSaga', saga: pricesSaga });
  useInjectSaga({
    key: 'vaultsSaga',
    saga: vaultsSaga,
  });

  return (
    <React.Fragment>
      <GlobalStyle />
      <ConnectionProvider>
        <Dashboard />
      </ConnectionProvider>
    </React.Fragment>
  );
}
