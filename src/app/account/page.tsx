'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ethers,
  BrowserProvider,
  formatEther,
  formatUnits,
  JsonRpcProvider,
  Contract,
  Wallet,
  isError,
  parseEther
} from 'ethers';
import { Button, message } from 'antd';

import sign_abi from './sign_abi.json';

// 钱包私钥  从后端请求到
const TEST_ACCOUNT = '0x3613823dB849e6c2f549B49c2b29fd4b7BbEca63';
const Account3 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const Account4 = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
const ANVIL_RPC_URL = 'http://127.0.0.1:8545';

interface Wallet {
  name: string;
  installed: boolean;
  icon: string;
  provider?: any;
  uuid?: string;
}
const Account = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const signer = useRef<ethers.JsonRpcSigner>(undefined);

  const [account, setAccount] = useState({
    address: '',
    value: ''
  });
  // 通过rpc连接
  async function linkByRPC() {
    const provider = new JsonRpcProvider(ANVIL_RPC_URL);
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
  function loginByWebWallet(wallet: Wallet) {
    return async () => {
      if (wallet.installed) {
        try {
          // 使用 EIP-6963 提供的钱包提供者
          const provider = new BrowserProvider(wallet.provider);
          const accounts = await provider.send('eth_requestAccounts', []);
          console.log('accounts', accounts);

          // const wallet = new Wallet()
          signer.current = await provider.getSigner();
          const balance = await provider.getBalance(signer.current.address); // 获取当前钱包账户的余额
          setAccount({
            address: signer.current.address,
            value: formatUnits(balance, 'ether')
          });

          const nonce = await signer.current.getNonce();
          const getBlockNumber = await provider.getBlockNumber();
          const listAccounts = await provider.listAccounts();
          const network = await provider.getNetwork();

          console.log('nonce', nonce);
          console.log('getBlockNumber', getBlockNumber);
          console.log('listAccounts: ', listAccounts);
          console.log('network: ', network);
        } catch (error) {
          console.log('error: ', error);
          if (isError(error, 'ACTION_REJECTED')) {
            message.error('用户拒绝授权');
          }
        }
      } else {
        message.error(`请安装${wallet.name}钱包`);
      }
    };
  }

  async function transfer() {
    const tx = await signer.current?.sendTransaction({
      to: Account4,
      value: parseEther('1')
    });
    await tx?.wait();
    console.log(`交易已发送: ${tx?.hash}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const announceProviderHandler = (e: any) => {
    const { info, provider } = e.detail;
    const { name, icon, uuid } = info;
    setWallets(oldWallets => {
      const neWallets = [...oldWallets];
      const existWallet = neWallets.find(w => w.name === name);
      if (existWallet) {
        existWallet.provider = provider;
        existWallet.icon = icon;
        existWallet.uuid = uuid;
        existWallet.installed = true;
      } else {
        neWallets.push({
          name,
          installed: true,
          icon,
          provider,
          uuid
        });
      }
      console.log('neWallets: ', neWallets);
      return neWallets;
    });
  };

  useEffect(() => {
    // linkByRPC();
    // loginByWebWallet();

    window.dispatchEvent(new Event('eip6963:requestProvider'));
    window.addEventListener(
      'eip6963:announceProvider',
      announceProviderHandler
    );

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        console.log('切换账号了', accounts);
      });
      window.ethereum.on('chainChanged', chainId => {
        console.log(`切换网络: ${chainId}`);
      });
      window.ethereum.on('disconnect', () => {
        console.log('断开连接了');
      });
      window.ethereum.on('connect', (...message) => {
        console.log('连接了: ', message);
      });
    }

    return () => {
      // 会不监听了
      // window.removeEventListener(
      //   'eip6963:announceProvider',
      //   announceProviderHandler
      // );
    };
  }, []);
  return (
    <div>
      {account.address ? (
        <>
          <h1>Address: {account.address}</h1>
          <h1>Account: {account.value} ETH</h1>
        </>
      ) : (
        wallets.map(wallet => {
          return (
            <Button onClick={loginByWebWallet(wallet)} key={wallet.uuid}>
              <Image src={wallet.icon!} width={20} height={20} alt='' />
              登录
            </Button>
          );
        })
      )}

      <div>
        <Button onClick={transfer}>转账</Button>
      </div>
    </div>
  );
};

export default Account;
