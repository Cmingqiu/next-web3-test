'use client';

import { useEffect, useState } from 'react';
import { BrowserProvider, ethers, Wallet } from 'ethers';

const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

const ACCOUNT4_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

const Transaction = () => {
  const [addr, setAddr] = useState('');
  const [provider, setProvider] = useState<BrowserProvider>();
  const [wallet, setWallet] = useState<Wallet>();
  const [transactionCount, setTc] = useState(0);

  async function init() {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      setProvider(provider);
      const wallet = new Wallet(PRIVATE_KEY, provider);
      const signer = await provider.getSigner();
      setAddr(signer.address);
      setWallet(wallet);
    } else {
      // provider = ethers.getDefaultProvider();
    }
  }

  const sendTransaction = async () => {
    const tx = await wallet!.sendTransaction({
      to: ACCOUNT4_ADDRESS,
      value: ethers.parseEther('1')
    });
    const receipt = await tx.wait();
    console.log(receipt);
  };

  const getTransactionCount = async () => {
    const transactionCount = await provider!.getTransactionCount(
      wallet!.address
    );
    setTc(transactionCount);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1>账户：{addr}</h1>

      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2'
        onClick={sendTransaction}>
        发送交易
      </button>

      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2'
        onClick={getTransactionCount}>
        链上交易次数:{transactionCount}
      </button>
    </div>
  );
};
export default Transaction;
