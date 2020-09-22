import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectApp = state => state.app || initialState;

export const selectAccount = () =>
  createSelector(
    selectApp,
    substate => substate.account,
  );

export const selectLoading = () =>
  createSelector(
    selectApp,
    substate => substate.loading,
  );

export const selectContract = () =>
  createSelector(
    selectApp,
    substate => substate.contract,
  );

export const selectConnected = () =>
  createSelector(
    selectApp,
    substate => substate.connected,
  );

export const selectShowConnectorModal = () =>
  createSelector(
    selectApp,
    substate => substate.showConnectorModal,
  );

export const selectVaults = () =>
  createSelector(
    selectApp,
    substate => substate.vaults,
  );

export const selectTotals = () =>
  createSelector(
    selectApp,
    substate => substate.totals,
  );
