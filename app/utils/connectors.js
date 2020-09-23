import { InjectedConnector } from '@web3-react/injected-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { AuthereumConnector } from '@web3-react/authereum-connector';

export const Injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const MetaMask = Injected;

const TrustWallet = Injected;

const POLLING_INTERVAL = 12000;
const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/bd80ce1ca1f94da48e151bb6868bb150',
  4: 'https://rinkeby.infura.io/v3/bd80ce1ca1f94da48e151bb6868bb150',
};

export const Trezor = new TrezorConnector({
  chainId: 1,
  url: RPC_URLS[1],
  pollingInterval: POLLING_INTERVAL,
  manifestEmail: 'dummy@abc.xyz',
  manifestAppUrl: 'https://8rg3h.csb.app/',
});

export const Torus = new TorusConnector({ chainId: 1 });
export const Authereum = new AuthereumConnector({ chainId: 1 });

const connectors = {
  MetaMask,
  TrustWallet,
  Torus,
  Trezor,
  Authereum,
};

export default connectors;
