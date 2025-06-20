'use client';

import { useEffect, useState } from 'react';
import {
  ethers,
  formatEther,
  formatUnits,
  JsonRpcProvider,
  Contract
} from 'ethers';
import sign_abi from './sign_abi.json';

// 钱包私钥  从后端请求到
const METAMASK_ADDRESS = '0x3613823dB849e6c2f549B49c2b29fd4b7BbEca63';
const Account3 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const Account4 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const RPC_URL = 'http://127.0.0.1:8545';

const Account = () => {
  const [account, setAccount] = useState({
    address: '',
    value: ''
  });
  // 通过rpc连接
  async function linkByRPC() {
    const provider = new JsonRpcProvider(RPC_URL);
    // getAccount();
    // 合约调用
    invokeContractFunction();

    async function invokeContractFunction() {
      const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const signer = await provider.getSigner(Account3);
      const signContract = new Contract(CONTRACT_ADDRESS, sign_abi, signer);
      // const tx = await signContract.set('张三', '10');
      // await tx.wait();
      const name = await signContract.get();
      // const contractBalance = await signContract.;
      console.log(name);
    }
    async function getAccount() {
      const signer = await provider.getSigner(Account3);
      const balance = await provider.getBalance(signer.address); // 获取指定账户的余额
      setAccount({
        address: signer.address,
        value: formatEther(balance)
      });
      console.log('provider:', provider);
      console.log('signer:', signer);

      const accounts = await provider.listAccounts();
      console.log('accouns：', accounts);
    }
  }

  // 通过web钱包连接
  async function linkByWebWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log('getBlockNumber', await provider.getBlockNumber());
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(signer.address); // 获取当前钱包账户的余额
      setAccount({
        address: signer.address,
        value: formatUnits(balance, 'ether')
      });
      console.log('provider:', provider);
      console.log('signer:', signer);
      const accounts = await provider.listAccounts();
      console.log(accounts);
    }
  }

  useEffect(() => {
    linkByRPC();
    // linkByWebWallet();
  }, []);

  return (
    <div>
      <h1>Address: {account.address}</h1>
      <h1>Account: {account.value} ETH</h1>
    </div>
  );
};

export default Account;
