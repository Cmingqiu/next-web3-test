'use client';

import { useAccount, WagmiProvider } from 'wagmi';
import { config } from './wagmi.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import WalletOptions from './WalletOptions';
import Account from './account';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1_000 * 10
    }
  }
});

const ConnectWallet = () => {
  const { isConnected } = useAccount();
  return isConnected ? <Account /> : <WalletOptions />;
};
export default function Wagmi() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
