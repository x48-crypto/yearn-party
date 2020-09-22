import produce from 'immer';
import BigNumber from 'bignumber.js';
import * as c from './constants';

// The initial state of the App
export const initialState = {
  vaults: [],
  connected: false,
  ready: false,
  loading: {
    vaultPrices: true,
    vaults: true,
  },
};

const mergeByAddress = (oldData, newData) => {
  const mergedData = _.merge(
    _.keyBy(oldData, 'address'),
    _.keyBy(newData, 'address'),
  );
  return mergedData;
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    const getTotalDepositedUsd = (acc, vault) => {
      const { depositedAmountUsd } = vault;
      if (depositedAmountUsd) {
        acc = acc.plus(depositedAmountUsd);
      }
      return acc;
    };

    const addEarningsAndDepositsUsd = vault => {
      const { priceUsd, earnings, depositedAmount } = vault;
      if (priceUsd && earnings) {
        vault.earningsUsd = new BigNumber(earnings).times(priceUsd).toFixed();
      }
      if (depositedAmount) {
        vault.depositedAmountUsd = new BigNumber(depositedAmount)
          .dividedBy(10 ** 18)
          .times(priceUsd)
          .toFixed();
      }
      return vault;
    };

    const getAggregateApy = (acc, vault, totalDepositedAmountUsd) => {
      const { depositedAmountUsd, apyOneWeekSample } = vault;
      let ratio;
      if (totalDepositedAmountUsd !== '0') {
        ratio = depositedAmountUsd / totalDepositedAmountUsd;
      } else {
        // divide by zero
        ratio = 1;
      }
      const weightedApy = ratio * parseFloat(apyOneWeekSample);
      acc += weightedApy;
      return acc;
    };

    const addEarnings = vaults => {
      const newVaults = _.map(vaults, addEarningsAndDepositsUsd);

      const totalDepositedAmountUsd = _.reduce(
        newVaults,
        getTotalDepositedUsd,
        new BigNumber(0),
      ).toFixed();

      const aggregateApy = _.reduce(
        newVaults,
        (acc, vault) => getAggregateApy(acc, vault, totalDepositedAmountUsd),
        0,
      );

      const getTotalVaultEarningsUsd = (acc, vault) => {
        const { earningsUsd } = vault;
        if (!earningsUsd) {
          return acc;
        }
        acc = acc.plus(earningsUsd);
        return acc;
      };

      const totalVaultEarningsUsd = _.reduce(
        vaults,
        getTotalVaultEarningsUsd,
        new BigNumber(0),
      ).toNumber();

      draft.totals = {
        totalVaultEarningsUsd,
        totalDepositedAmountUsd,
        aggregateApy,
      };
    };

    switch (action.type) {
      case c.CONNECTION_CONNECTED:
        draft.account = action.account;
        draft.connector = action.connector;
        draft.library = action.library;
        draft.chainId = action.chainId;
        draft.connected = true;
        draft.ready = false;
        break;
      case c.CONNECTION_UPDATED:
        draft.library = action.library;
        draft.chainId = action.chainId;
        draft.connected = action.active;
        break;
      case c.PRICES_LOADED: {
        const oldVaults = state.vaults;
        const updatedVaults = action.vaults;
        const mergedVaults = mergeByAddress(oldVaults, updatedVaults);
        draft.vaults = mergedVaults;
        addEarnings(mergedVaults);
        draft.loading.vaultPrices = false;
        break;
      }
      case c.VAULTS_LOADED: {
        const oldVaults = _.clone(state.vaults);
        const updatedVaults = [
          {
            controllerAddress: '0x9E65Ad11b299CA0Abefc2799dDB6314Ef2d91080',
            tokenIcon:
              'https://assets.coingecko.com/coins/images/11858/large/yCrv.png?1595203628',
            controllerName: 'Controller',
            symbol: 'yyDAI+yUSDC+yUSDT+yTUSD',
            timestamp: 1600762801825,
            address: '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c',
            strategyAddress: '0xc999fb87AcA383A63D804A575396F65A55aa5aC8',
            name: 'yearn Curve.fi yDAI/yUSDC/yUSDT/yTUSD',
            vaultAlias: 'yUSD Vault',
            delegated: false,
            tokenAddress: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
            tokenName: 'Curve.fi yDAI/yUSDC/yUSDT/yTUSD',
            tokenSymbol: 'yDAI+yUSDC+yUSDT+yTUSD',
            tokenSymbolAlias: 'yCRV',
            symbolAlias: 'yUSD',
            decimals: 18,
            vaultIcon:
              'https://assets.coingecko.com/coins/images/12210/large/yUSD.png?1600166557',
            strategyName: 'StrategyCurveYCRVVoter',
            wrapped: false,
            apyOneWeekSample: 18.389875280469848,
            apyInceptionSample: 69.20628081223127,
            apyOneMonthSample: 47.87688226812791,
            totalDeposits: '31040130299999999999998',
            totalWithdrawals: '32551547207174188582424',
            totalTransferredIn: '0',
            totalTransferredOut: '0',
            depositedShares: '40702473720021',
            depositedAmount: '1200443360773534603246',
            earnings: '1511.41695194518787818766',
          },
          {
            controllerAddress: '0x9E65Ad11b299CA0Abefc2799dDB6314Ef2d91080',
            tokenIcon:
              'https://assets.coingecko.com/coins/images/11958/large/Curvefi_sbtcCrv_32.png?1596436054',
            controllerName: 'Controller',
            symbol: 'ycrvRenWSBTC',
            timestamp: 1600762850556,
            address: '0x7Ff566E1d69DEfF32a7b244aE7276b9f90e9D0f6',
            strategyAddress: '0x134c08fAeE4F902999a616e31e0B7e42114aE320',
            name: 'yearn Curve.fi renBTC/wBTC/sBTC',
            vaultAlias: 'crvBTC Vault',
            delegated: false,
            tokenAddress: '0x075b1bb99792c9E1041bA13afEf80C91a1e70fB3',
            tokenName: 'Curve.fi renBTC/wBTC/sBTC',
            tokenSymbol: 'crvRenWSBTC',
            tokenSymbolAlias: 'crvBTC',
            symbolAlias: 'ycrvBTC',
            decimals: 18,
            strategyName: 'StrategyCurveBTCVoterProxy',
            wrapped: false,
            apyOneWeekSample: 16.848218508254302,
            apyInceptionSample: 36.77398919487813,
            apyOneMonthSample: 36.77398919487813,
            totalDeposits: '3443360773534603246',
            totalWithdrawals: '0',
            totalTransferredIn: '509814031618954600',
            totalTransferredOut: '0',
            depositedShares: '3886689595445743849',
            depositedAmount: '3990497287468911017',
            earnings: '0.03732248231535317072',
          },
          {
            controllerAddress: '0x9E65Ad11b299CA0Abefc2799dDB6314Ef2d91080',
            tokenIcon:
              'https://assets.coingecko.com/coins/images/11849/large/yfi-192x192.png?1598325330',
            controllerName: 'Controller',
            symbol: 'yYFI',
            timestamp: 1600762835382,
            address: '0xBA2E7Fed597fd0E3e70f5130BcDbbFE06bB94fe1',
            strategyAddress: '0x40BD98e3ccE4F34c087a73DD3d05558733549afB',
            name: 'yearn yearn.finance',
            vaultAlias: 'YFI Vault',
            delegated: false,
            tokenAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
            tokenName: 'yearn.finance',
            tokenSymbol: 'YFI',
            tokenSymbolAlias: 'YFI',
            symbolAlias: 'yYFI',
            decimals: 18,
            strategyName: 'StrategyCreamYFI',
            wrapped: false,
            apyOneWeekSample: 0.0010391510209644523,
            apyInceptionSample: 1.6653494694564572,
            apyOneMonthSample: 1.1788380651301567,
            totalDeposits: '2072499999999999999',
            totalWithdrawals: '2075558817951940219',
            totalTransferredIn: '0',
            totalTransferredOut: '0',
            depositedShares: '0',
            depositedAmount: '0',
            earnings: '0.00305881795194022',
          },
        ];
        const mergedVaults = mergeByAddress(oldVaults, updatedVaults);
        addEarnings(mergedVaults);
        draft.vaults = mergedVaults;
        draft.loading.vaults = false;
        break;
      }
      case c.SHOW_CONNECTOR_MODAL:
        draft.showConnectorModal = action.showModal;
        break;
    }
  });

export default appReducer;
