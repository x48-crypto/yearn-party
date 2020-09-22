import React from 'react';
import styled from 'styled-components';
import VaultIconAndName from 'components/VaultIconAndName';
import CountUp from 'react-countup';
import ValueWithLabel from 'components/ValueWithLabel';
import { balanceTransform, roundFloat } from 'utils/string';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const VaultNameWrapper = styled.div`
  width: 220px;
`;

const Apy = styled.div`
  width: 100px;
`;

const VaultSummary = styled.div`
  display: flex;
  grid-gap: 50px;
`;

const Earnings = styled.div`
  width: 300px;
`;

const Deposits = styled.div`
  width: 200px;
`;

const AmountCounter = styled.div``;

export default function Component(props) {
  const { vault } = props;
  const {
    tokenSymbolAlias,
    earnings,
    apyOneWeekSample,
    depositedAmount,
  } = vault;

  const apyRatePerHour = apyOneWeekSample / 365 / 24;
  const nbrSecondsInHour = 3600;

  const addSymbol = amount => `${amount} ${tokenSymbolAlias}`;

  const amountTransform = (amount, decimals) => {
    const nbrDecimals = decimals || 10;
    let newAmount = amount;
    newAmount = balanceTransform(newAmount);
    newAmount = roundFloat(newAmount, nbrDecimals);
    newAmount = addSymbol(newAmount);
    return newAmount;
  };

  const getFutureEarningsPerHour = () => {
    const currentAmount = balanceTransform(depositedAmount);
    const futureEarningsPerHour = currentAmount * apyRatePerHour;
    return futureEarningsPerHour;
  };
  const futureEarningsPerHour = getFutureEarningsPerHour();

  const deposited = amountTransform(depositedAmount, 4);

  const currentEarnings = earnings * 1;
  const futureEarnings = futureEarningsPerHour + currentEarnings;
  const vaultEarnings = (
    <AmountCounter>
      <CountUp
        start={currentEarnings}
        end={futureEarnings}
        duration={nbrSecondsInHour}
        separator=","
        decimals={6}
      />{' '}
      {tokenSymbolAlias}
    </AmountCounter>
  );

  return (
    <Wrapper>
      <VaultSummary>
        <VaultNameWrapper>
          <VaultIconAndName vault={vault} />
        </VaultNameWrapper>
        <Apy>
          <ValueWithLabel
            label="ROI:"
            value={`${roundFloat(apyOneWeekSample, 2)}%`}
          />
        </Apy>
        <Deposits>
          <ValueWithLabel label="Deposited:" value={deposited} />
        </Deposits>
        <Earnings>
          <ValueWithLabel label="Earnings:" value={vaultEarnings} />
        </Earnings>
      </VaultSummary>
    </Wrapper>
  );
}
