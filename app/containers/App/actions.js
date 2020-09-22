import * as c from './constants';

export function connectionConnected(account, connector, library, chainId) {
  return {
    type: c.CONNECTION_CONNECTED,
    account,
    connector,
    library,
    chainId,
  };
}

export function connectionUpdated(library, chainId, active) {
  return {
    type: c.CONNECTION_UPDATED,
    library,
    chainId,
    active,
  };
}

export function startLoadingVaults() {
  return {
    type: c.START_LOADING_VAULTS,
  };
}

export function vaultsLoaded(vaults) {
  return {
    type: c.VAULTS_LOADED,
    vaults,
  };
}

export function startLoadingPrices() {
  return {
    type: c.START_LOADING_PRICES,
  };
}

export function pricesLoaded(vaults) {
  return {
    type: c.PRICES_LOADED,
    vaults,
  };
}

export function showConnectorModal(showModal) {
  return {
    type: c.SHOW_CONNECTOR_MODAL,
    showModal,
  };
}
