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
import FUNDME_ABI from './Fundme_abi.json';
import InfoCar from '@/components/InfoCard';

const PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

const ACCOUNT4_ADDRESS = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

const CONTRACT_ADDRESS = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';

const Transaction = () => {
  const [account3, setAccount3] = useState({
    name: 'anvil测试号',
    addr: '',
    balance: ''
  });
  const [provider, setProvider] = useState<BrowserProvider>();
  const [wallet, setWallet] = useState<Wallet>();
  const [transactionCount, setTc] = useState(0);
  const [contract, setContract] = useState<Contract>();
  const [contractBalance, setContractBalance] = useState('');

  async function init() {
    if (window.ethereum) {
      const provider = new BrowserProvider(window.ethereum);
      setProvider(provider);

      // 初始化钱包
      initWallet(provider);

      // 初始化账户3
      const signer = await initAccount(provider);
      // 初始化合约
      initContract(signer);
    } else {
      // provider = ethers.getDefaultProvider();
    }
  }

  async function initAccount(provider: BrowserProvider) {
    const signer = await provider.getSigner();
    const accountBalance = await provider.getBalance(signer.address);
    setAccount3({
      ...account3,
      addr: signer.address,
      balance: formatEther(accountBalance)
    });
    return signer;
  }

  async function initContract(signer: ethers.JsonRpcSigner) {
    const contract = new Contract(CONTRACT_ADDRESS, FUNDME_ABI, signer);
    setContract(contract);

    // 监听事件Transfer
    contract.on('Transfer', (from, to, _amount) => {
      const amount = formatEther(_amount);
      console.log(`监听： ${from} => ${to}: ${amount}`);
    });
  }

  async function initWallet(provider: BrowserProvider) {
    const wallet = new Wallet(PRIVATE_KEY, provider);
    setWallet(wallet);
    return wallet;
  }

  // 获取合约余额
  const getContractBalance = async () => {
    const amount = await contract!.getAddrToAmount(account3.addr);
    console.log(amount);
    const balance = await contract!.getBalance();
    console.log('balance:', formatEther(balance));
    setContractBalance(formatEther(balance));
  };
  //  获取链上交易次数
  const getTransactionCount = async () => {
    const transactionCount = await provider!.getTransactionCount(
      wallet!.address
    );
    setTc(transactionCount);
  };

  const sendToContract = async () => {
    // 将以太币数量转换为 wei
    const value = parseEther('1');
    console.log('ddd', value);
    const tx = await contract!.fund({ value });

    // 等待交易完成
    const receipt = await tx.wait();
    console.log('转账：', receipt);
  };

  const withdraw = async () => {
    const result = await contract!.withdraw();
    console.log('提现：', result);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (contract) getContractBalance();
  }, [contract]);

  return (
    <div className='p-8'>
      <InfoCar info={account3} />
      <InfoCar
        info={{ addr: CONTRACT_ADDRESS, balance: contractBalance }}
        isContract
      />

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
