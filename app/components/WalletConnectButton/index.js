import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';

import MetaMask from './icn-metamask.svg';
import TrustWallet from './trustWallet.png';
import Trezor from './trezor.png';
import Torus from './torus.jpg';
import Authereum from './authereum.svg';

const Wrapper = styled.button`
  width: 250px;
  height: 55px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin: 12px 0px;
  border-radius: 1rem;
  flex-wrap: wrap;
  border: 1px solid rgb(225, 225, 225);
  &:focus {
    border: 1px solid #666;
    border-radius: 1rem;
    outline: none;
  }
`;

const StyledImg = styled.img`
  width: 30px;
`;

export default function WalletConnectButton(props) {
  const { name, connector, onHide } = props;
  const { activate } = useWeb3React();

  const storeConnectorName = () => {
    localStorage.setItem('connectorName', name);
  };

  const connect = async () => {
    await activate(connector).then(storeConnectorName);
    onHide();
  };

  const icons = {
    MetaMask,
    TrustWallet,
    Trezor,
    Torus,
    Authereum,
  };
  const icon = icons[name];

  return (
    <Wrapper onClick={connect}>
      {name} <StyledImg src={icon} />
    </Wrapper>
  );
}
