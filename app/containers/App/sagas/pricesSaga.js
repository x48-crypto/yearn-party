import request from 'utils/request';
import * as r from 'redux-saga/effects';
import * as s from '../selectors';
import * as a from '../actions';
import * as c from '../constants';

// Polling disabled
// const pollPeriod = 30000;

export function* poll() {
  const vaults = yield r.select(s.selectVaults());
  const flatVaults = _.map(vaults, vault => vault);
  const reduceResponse = (acc, resp, tokenAddress) => {
    const vault = _.find(
      flatVaults,
      newVault =>
        newVault.tokenAddress.toLowerCase() === tokenAddress.toLowerCase(),
    );
    const { usd: priceUsd } = resp;
    acc.push({ priceUsd, address: vault.address });
    return acc;
  };

  try {
    const tokenAddresses = _.map(vaults, vault => vault.tokenAddress);
    const priceURL = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokenAddresses}&vs_currencies=usd`;
    const priceResponse = yield r.call(request, priceURL);
    const prices = _.reduce(priceResponse, reduceResponse, []);
    yield r.put(a.pricesLoaded(prices));
  } catch (err) {
    console.log('Error reading prices', err);
  }
}

export function* startLoadingPrices() {
  yield r.put(a.startLoadingPrices());
}

export default function* initialize() {
  yield r.takeLatest(c.VAULTS_LOADED, startLoadingPrices);
  yield r.takeLatest(c.START_LOADING_PRICES, poll);
}
