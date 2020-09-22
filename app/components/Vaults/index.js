import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Vault from 'components/Vault';
import CountUp from 'react-countup';
import BigNumber from 'bignumber.js';

import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Totals = styled.div`
  margin-top: 50px;
`;

const EarningsLabel = styled.div`
  color: 0;
  font-size: 30px;
  font-weight: bold;
`;

const EarningsText = styled.div`
  font-weight: bold;
  font-size: 90px;
`;

const Earnings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Vaults = styled.div`
  margin-top: 50px;
`;

export default function Component() {
  const vaults = useSelector(s.selectVaults());
  const totals = useSelector(s.selectTotals());
  let totalCounter;

  const getFutureEarningsPerHour = (currentAmount, apy) => {
    const apyRatePerHour = apy / 365 / 24;
    const futureEarningsPerHour = currentAmount * apyRatePerHour;
    return futureEarningsPerHour;
  };

  if (totals) {
    const {
      totalVaultEarningsUsd,
      totalDepositedAmountUsd,
      aggregateApy,
    } = totals;
    const futureEarningsPerHour = getFutureEarningsPerHour(
      totalDepositedAmountUsd,
      aggregateApy,
    );
    const nbrSecondsInHour = 3600;
    const futureAmount = futureEarningsPerHour + totalVaultEarningsUsd;
    totalCounter = (
      <Earnings>
        <EarningsLabel>YOU YEARNED</EarningsLabel>
        <EarningsText>
          <span role="img" aria-label="party">
            🥳
          </span>
          {'  '}
          <CountUp
            start={totalVaultEarningsUsd}
            end={futureAmount}
            duration={nbrSecondsInHour}
            separator=","
            decimals={5}
          />
          ${' '}
          <span role="img" aria-label="party">
            🥳
          </span>
        </EarningsText>
      </Earnings>
    );
  }

  const sortedVaults = _.orderBy(
    vaults,
    [
      vault => new BigNumber(vault.depositedAmount).toNumber(),
      vault => new BigNumber(vault.earnings).toNumber(),
    ],
    ['desc', 'desc'],
  );

  const renderVault = (vault, idx) => <Vault key={idx} vault={vault} />;
  const vaultsEl = _.map(sortedVaults, renderVault);

  return (
    <Wrapper>
      <Totals>{totalCounter}</Totals>
      <Vaults>{vaultsEl}</Vaults>
    </Wrapper>
  );
}
