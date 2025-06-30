import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const ensName = useEnsName({ address });
  const ensAvatar = useEnsAvatar({ name: ensName.data! });
  console.log('ensName: ', ensName);
  console.log('ensAvatar: ', ensAvatar);
  return (
    <>
      {ensAvatar.data && <img alt='ENS Avatar' src={ensAvatar.data} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <button className='button' onClick={() => disconnect()}>
        Disconnect
      </button>
    </>
  );
}
