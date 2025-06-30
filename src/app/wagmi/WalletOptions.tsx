import { useAccount, useConnect } from 'wagmi';

export default function WalletOptions() {
  const { connectors, connect } = useConnect();
  return (
    <div className='flex'>
      {connectors.map(connector => (
        <button
          className='button'
          key={connector.uid}
          onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  );
}
