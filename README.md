# YEARN PARTY

View historical and current vault earnings in real time

![alt Recycler](https://i.imgur.com/7XRIVXO.png)

## Interact

https://yearnparty.com

## How it works

- Deposits, withdrawals and token transfer events are extracted from the Yearn subgraph using Yearn API
- API endpoint: https://api.yearn.tools/user/{userAddress}/vaults?statistics=true&apy=true
- Vault earnings are calculated using the following formula: `(currentDepositAmount - totalDeposits + totalWithdrawals - totalTransfersIn + totalTransfersOut) / 10 ** 18`
- Current user vault balance is calculated using Yearn API
- ROI (weekly) of each vault is calcuated using Yearn API
- Future earnings are estimated using current user vault balance and ROI
- Estimated Future earnings are shown in real-time using a continuous counter
- All vault earnings are normalized to USD using current asset prices (poll coingecko)
- All vault APYs are aggregated using weighted APYs: `Σ((vaultBalanceUsd/totalVaultBalanceUsd) * vaultApy) = totalVaultBalanceUsd @ aggregateApy%`
- Aggregate earnings are calculated using normalized vault earnings and aggregated weighted vault APY
- Watch your vault balance increase in USD 🎉

## Installation

```
npm install
npm start
```
