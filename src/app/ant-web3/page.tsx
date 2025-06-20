'use client';
import { Address, ConnectButton, Connector, NFTCard } from '@ant-design/web3';
import {
  Mainnet,
  MetaMask,
  WagmiWeb3ConfigProvider
} from '@ant-design/web3-wagmi';
import { http } from 'viem';

import { ZAN_RPC_URL } from '@/config';
import CallTest from './CallTest';

export default function AntWeb3() {
  return (
    <WagmiWeb3ConfigProvider
      eip6963={{ autoAddInjectedWallets: true }}
      wallets={[MetaMask()]}
      transports={{
        [Mainnet.id]: http(ZAN_RPC_URL)
      }}>
      <div
        style={{
          height: '100vh',
          padding: 64
        }}>
        {/* <Address format address='0xEcd0D12E21805803f70de03B72B1C162dB0898d9' />;
        <NFTCard
          address='0xEcd0D12E21805803f70de03B72B1C162dB0898d9'
          tokenId={641}
        /> */}
        <Connector>
          <ConnectButton />
        </Connector>
        <CallTest />
      </div>
    </WagmiWeb3ConfigProvider>
  );
}
