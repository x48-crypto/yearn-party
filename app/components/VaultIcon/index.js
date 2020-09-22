import React from 'react';
import ReactImageFallback from 'react-image-fallback';

const imageStyles = `
  max-width: 40px;
  align-self: center;
  min-width: 40px;
  margin-top: 7px;
`;

export default function VaultIcon(props) {
  const { vault, className } = props;
  const { vaultIcon, tokenIcon } = vault;
  const imageUrl = vaultIcon || tokenIcon;
  return (
    <ReactImageFallback
      className={className}
      css={imageStyles}
      src={imageUrl}
      fallbackImage="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
    />
  );
}
