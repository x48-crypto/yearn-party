import request from 'utils/request';
import * as r from 'redux-saga/effects';
import * as s from '../selectors';
import * as a from '../actions';
import * as c from '../constants';

// Polling disabled
// const pollPeriod = 30000;

export function* poll() {
  const account = yield r.select(s.selectAccount());
  try {
    const url = `https://dev-api.yearn.tools/user/${account}/vaults?apy=true&statistics=true`;
    const vaults = yield r.call(request, url);
    yield r.put(a.vaultsLoaded(vaults));
  } catch (err) {
    console.log('Error reading prices', err);
  }
}

export default function* initialize() {
  yield r.takeLatest(c.CONNECTION_CONNECTED, poll);
}
