'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'd4f2471a08f6f43bd4cab0c8849df18b',
  chains: [mainnet, polygon, optimism, arbitrum, base]
  // ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function RainbowKot() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
