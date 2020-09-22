import React from 'react';
import styled from 'styled-components';
import VaultIcon from 'components/VaultIcon';
import ValueWithLabel from 'components/ValueWithLabel';

const Wrapper = styled.div`
  display: flex;
`;
const Name = styled.div`
  margin-left: 15px;
`;

export default function VaultIconAndName(props) {
  const { vault } = props;
  const { vaultAlias } = vault;
  return (
    <Wrapper>
      <VaultIcon vault={vault} />
      <Name>
        <ValueWithLabel label="Vault:" value={vaultAlias} />
      </Name>
    </Wrapper>
  );
}
