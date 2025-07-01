import { message } from 'antd';
import {
  useAccount,
  useBalance,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSignMessage
} from 'wagmi';
import { formatUnits } from 'viem';
import { SIGN_MESSAGE } from '../api/signatureCheck/route';

export default function Account() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { disconnect } = useDisconnect();

  const ensName = useEnsName({ address });
  const ensAvatar = useEnsAvatar({ name: ensName.data! });
  console.log('ensName: ', ensName);
  console.log('ensAvatar: ', ensAvatar);
  console.log('balance: ', balance);

  // 签名
  const { signMessageAsync } = useSignMessage();
  const sign = async () => {
    const signature = await signMessageAsync({ message: SIGN_MESSAGE });
    const response = await fetch('/api/signatureCheck', {
      method: 'POST',
      body: JSON.stringify({
        signature,
        address
      })
    });
    const res = await response.json();
    console.log('res: ', res);
    if (res.data) message.success('Signature verified');
    else message.error('Signature verification failed');
  };
  return (
    <>
      {ensAvatar.data && <img alt='ENS Avatar' src={ensAvatar.data} />}
      {address && (
        <div>{ensName.data ? `${ensName.data} (${address})` : address}</div>
      )}
      <div>
        balance:
        {formatUnits(balance?.value ?? BigInt(0), balance?.decimals ?? 18)}
      </div>
      <button className='button' onClick={() => disconnect()}>
        Disconnect
      </button>
      <button className='button' disabled={!address} onClick={sign}>
        签名
      </button>
    </>
  );
}
