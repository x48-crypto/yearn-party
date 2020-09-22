import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  line-height: 25px;
  font-size: ${props => (props.big ? '24px' : '24px')};
`;

const Label = styled.div`
  color: rgba(43, 57, 84, 0.5);
  font-size: 16px;
  font-weight: bold;
`;

export default function Pair(props) {
  const { label, big, value } = props;
  return (
    <Wrapper>
      <Label big={big}>{label}</Label>
      <div>{value}</div>
    </Wrapper>
  );
}
