import { WALLETCONNECT_PROJECT_ID } from '@/config';
import { createConfig, http } from 'wagmi';
import { anvil, mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia, anvil],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http('http://localhost:8545')
  },
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: WALLETCONNECT_PROJECT_ID })
  ]
});
