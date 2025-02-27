'use client';

import { useEffect, useState } from 'react';
import {
  BrowserProvider,
  ethers,
  formatEther,
  parseEther,
  Wallet
} from 'ethers';
import { Contract } from 'ethers';
import SIMPLESTORAGE_ABI from './SimpleStorage_abi.json';

const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

const ACCOUNT4_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

const CONTRACT_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

const Transaction = () => {
  const [addr, setAddr] = useState('');
  const [provider, setProvider] = useState<BrowserProvider>();
  const [wallet, setWallet] = useState<Wallet>();
  const [transactionCount, setTc] = useState(0);
  const [contract, setContract] = useState<Contract>();
  const [contractBalance, setContractBalance] = useState('');

  async function init() {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      setProvider(provider);

      const signer = await provider.getSigner();
      setAddr(signer.address);

      const contract = new Contract(
        CONTRACT_ADDRESS,
        SIMPLESTORAGE_ABI,
        signer
      );
      setContract(contract);

      const wallet = new Wallet(PRIVATE_KEY, provider);
      setWallet(wallet);
    } else {
      // provider = ethers.getDefaultProvider();
    }
  }

  const getContractBalance = async () => {
    const balance = await contract!.getBalance();
    setContractBalance(formatEther(balance));
  };

  const getTransactionCount = async () => {
    const transactionCount = await provider!.getTransactionCount(
      wallet!.address
    );
    setTc(transactionCount);
  };

  const sendToContract = async () => {
    console.log('222', contract);
    const result = await contract!.fund(parseEther('1'));
    console.log('转账：', result);
  };

  const withdraw = async () => {
    const result = await contract!.withdraw(1);
    console.log('提现：', result);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className='p-8'>
      <h1>钱包账户：{addr}</h1>
      <h1>合约信息</h1>
      <dl>
        <dt> 账户 : {CONTRACT_ADDRESS}</dt>
        <dd> 余额 : {contractBalance} ETH</dd>
      </dl>

      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2 m-4'
        onClick={getContractBalance}>
        查看合约余额
      </button>

      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2 m-4'
        onClick={getTransactionCount}>
        链上交易次数:{transactionCount}
      </button>

      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2 m-4'
        onClick={sendToContract}>
        向合约转账
      </button>

      <button
        className='border border-teal-700 border-solid rounded-xl px-4 py-2 m-4'
        onClick={withdraw}>
        合约提现
      </button>
    </div>
  );
};
export default Transaction;
