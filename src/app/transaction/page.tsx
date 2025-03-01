'use client';

import { useEffect, useState } from 'react';
import { BrowserProvider, ethers, formatEther, Wallet } from 'ethers';
import InfoCar from '@/components/InfoCard';

const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

const ACCOUNT4_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

interface Account {
  name: string;
  signer: ethers.JsonRpcSigner;
  addr: string;
  balance: string;
}

const Transaction = () => {
  const [account3, setAccount3] = useState<Account>();

  const [account4, setAccount4] = useState({
    name: '账户4',
    addr: ACCOUNT4_ADDRESS,
    balance: ''
  });

  const [provider, setProvider] = useState<BrowserProvider>();
  const [wallet, setWallet] = useState<Wallet>();
  const [transactionCount, setTc] = useState(0);

  async function init() {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      setProvider(provider);
      initAccount4(provider);

      // const wallet = new Wallet(PRIVATE_KEY, provider);
      // setWallet(wallet);
    } else {
      // provider = ethers.getDefaultProvider();
    }
  }

  async function initAccount4(provider: BrowserProvider) {
    const b = await provider.getBalance(ACCOUNT4_ADDRESS);
    setAccount4({
      ...account4,
      balance: formatEther(b)
    });
  }

  const sendTransaction = async () => {
    const tx = await account3!.signer.sendTransaction({
      to: ACCOUNT4_ADDRESS,
      value: ethers.parseEther('1')
    });
    const receipt = await tx.wait();
    console.log(receipt);
    initAccount4(provider!);

    /*  const tx = await wallet!.sendTransaction({
      to: ACCOUNT4_ADDRESS,
      value: ethers.parseEther('1')
    });
    const receipt = await tx.wait();
    console.log(receipt); */
  };

  async function login() {
    const signer = await provider!.getSigner();
    const balance = await provider!.getBalance(signer.address);
    setAccount3({
      name: '当前账户3',
      signer,
      addr: signer.address,
      balance: formatEther(balance)
    });
  }

  const getTransactionCount = async () => {
    const transactionCount = await provider!.getTransactionCount(
      account3!.addr
      // wallet!.address
    );
    setTc(transactionCount);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      {account3 && <InfoCar info={account3!} />}
      {!account3 && (
        <button
          className='border border-teal-700 border-solid rounded-xl px-4 py-2 m-4'
          onClick={login}>
          登录
        </button>
      )}
      <InfoCar info={account4} />

      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2 m-4'
        onClick={sendTransaction}>
        发送交易
      </button>
      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2 m-4'
        onClick={getTransactionCount}>
        链上交易次数:{transactionCount}
      </button>
    </div>
  );
};
export default Transaction;
