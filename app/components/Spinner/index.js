import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: ${props => (props.size === 'small' ? '3px' : '6px')} solid
    rgba(47, 128, 237, 0.5);
  border-top: ${props => (props.size === 'small' ? '3px' : '6px')} solid
    rgba(47, 128, 237, 1);
  border-radius: 50%;
  width: ${props => (props.size === 'small' ? '23px' : '40px')};
  height: ${props => (props.size === 'small' ? '23px' : '40px')};
  animation: ${spin} 0.8s linear infinite;
  margin: 0 auto;
`;

function LoadingSpinner(props) {
  const { size } = props;
  return <Spinner size={size} />;
}

LoadingSpinner.propTypes = {};

export default LoadingSpinner;
