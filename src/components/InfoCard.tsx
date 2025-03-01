import { ethers } from 'ethers';

interface InfoCarType {
  name?: string;
  signer?: ethers.JsonRpcSigner;
  addr: string;
  balance: string;
}
function InfoCar({
  info,
  isContract
}: {
  info: InfoCarType;
  isContract?: boolean;
}) {
  return (
    <div className='p-8   shadow-2xl shadow-amber-400 mb-8'>
      <h1>{isContract ? '合约' : '钱包'}信息</h1>
      <dl>
        <dt>
          账户({info.name}) : {info.addr}
        </dt>
        <dd> 余额 : {info.balance} ETH</dd>
      </dl>
    </div>
  );
}
export default InfoCar;
