import { useAccount } from '@ant-design/web3';
import { Button, message } from 'antd';
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';
import { parseEther } from 'viem';
import { useEffect } from 'react';

const NFT_CONTRACT_ADDRESS = '0xEcd0D12E21805803f70de03B72B1C162dB0898d9';
const abi_balanceOf = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }]
  }
];
const abi_mint = [
  {
    type: 'function',
    name: 'mint',
    stateMutability: 'payable',
    inputs: [
      {
        internalType: 'uint256',
        name: 'quantity',
        type: 'uint256'
      }
    ],
    outputs: []
  }
];
export default function CallTest() {
  const { account } = useAccount();
  const contract = useReadContract({
    abi: abi_balanceOf,
    address: NFT_CONTRACT_ADDRESS,
    functionName: 'balanceOf',
    args: [account?.address]
  });
  console.log('contract: ', contract);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash });
  useEffect(() => {
    if (isSuccess) {
      message.success('Mint Success');
      contract.refetch();
    }
  }, [isSuccess]);
  return (
    <div>
      余额：{contract.data?.toString()}
      <Button
        loading={isLoading}
        onClick={() =>
          writeContract(
            {
              abi: abi_mint,
              address: NFT_CONTRACT_ADDRESS,
              functionName: 'mint',
              args: [BigInt(1)],
              value: parseEther('0.01')
            },
            {
              onSuccess: () => {
                message.success('Mint Success');
              },
              onError: err => {
                message.error(err.message);
              }
            }
          )
        }>
        mint
      </Button>
    </div>
  );
}
