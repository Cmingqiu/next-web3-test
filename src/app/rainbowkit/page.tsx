'use client';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  darkTheme,
  lightTheme,
  midnightTheme,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  anvil,
  localhost
} from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WALLETCONNECT_PROJECT_ID } from '@/config';

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base, anvil, localhost]
  // ssr: true, // If your dApp uses server side rendering (SSR)
});
const queryClient = new QueryClient();

export default function RainbowKot() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: 'HHHHHHHH',
            learnMoreUrl: 'https://www.baidu.com'
          }}
          coolMode
          showRecentTransactions={true}
          theme={{
            lightMode: lightTheme(),
            darkMode: darkTheme()
          }}>
          <ConnectButton />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
