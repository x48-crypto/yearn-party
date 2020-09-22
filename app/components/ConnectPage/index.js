import React from 'react';
import styled from 'styled-components';
import ConnectButton from 'components/ConnectButton';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Component() {
  return (
    <Wrapper>
      <ConnectButton />
    </Wrapper>
  );
}
