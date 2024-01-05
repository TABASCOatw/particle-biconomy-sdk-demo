import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { notification } from 'antd';

import {
  ParticleAuthModule,
  ParticleProvider,
  BiconomyAccountModule,
} from "@biconomy/particle-auth";

import './App.css';

const App = () => {

  const config = {
    projectId: process.env.REACT_APP_PROJECT_ID!,
    clientKey: process.env.REACT_APP_CLIENT_KEY!,
    appId: process.env.REACT_APP_APP_ID!,
  }

  const particle = new ParticleAuthModule.ParticleNetwork({
    ...config,
    chainName: "Ethereum",
    chainId: 5,
  });

  const smartAccount = new BiconomyAccountModule.SmartAccount(new ParticleProvider(particle.auth), {
    ...config,
    networkConfig: [
      {
        dappAPIKey: process.env.REACT_APP_DAPP_API_KEY,
        chainId: 5,
      },
    ],
  });

  const customProvider = new ethers.providers.Web3Provider(new BiconomyAccountModule.BiconomyWrapProvider(smartAccount, BiconomyAccountModule.SendTransactionMode.Gasless), "any");

  const [balance, setBalance] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
  }, [userInfo, smartAccount, customProvider]);

  const fetchBalance = async () => {
    const balanceResponse = await customProvider.getBalance(await smartAccount.getAddress());
    setBalance(ethers.utils.formatEther(balanceResponse));
    setAddress(await smartAccount.getAddress());
  };

  const handleLogin = async (preferredAuthType) => {
    const user = !particle.auth.isLogin() ? await particle.auth.login({preferredAuthType}) : particle.auth.getUserInfo();
    setUserInfo(user);
  }

  const executeUserOp = async () => {
    notification.info({
      message: "Constructing transaction..."
    });
    
    const signer = customProvider.getSigner();
    const tx = {
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.utils.parseEther("0.001"),
    };
    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();

    notification.success({
      message: 'Transaction Successful',
      description: (
        <div>
          Transaction Hash: <a href={`https://goerli.etherscan.io/tx/${txReceipt.transactionHash}`} target="_blank" rel="noopener noreferrer">{txReceipt.transactionHash}</a>
        </div>
      )
    });
  };

  return (
      <div className="App">
        <div className="logos-section">
          <img src="https://lever-client-logos.s3.us-west-2.amazonaws.com/73c89f44-01e6-4d0a-9354-9661e253e4bf-1685457360524.png" alt="Biconomy Logo" className="biconomy-logo" />
          <img src="https://i.imgur.com/2btL79J.png" alt="Particle Network Logo" className="particle-logo" />
        </div>
        {!userInfo ? (
        <div className="login-section">
          <button className="sign-button google-button" onClick={() => handleLogin('google')}>
            <img src="https://i.imgur.com/nIN9P4A.png" alt="Google" className="icon"/>
            Sign in with Google
          </button>
          <button className="sign-button twitter-button" onClick={() => handleLogin('twitter')}>
            <img src="https://i.imgur.com/afIaQJC.png" alt="Twitter" className="icon"/>
            Sign in with X
          </button>
          <button className="sign-button other-button" onClick={() => handleLogin('')}>
            <img src="https://i.imgur.com/VRftF1b.png" alt="Twitter" className="icon"/>
          </button>
        </div>
        ) : (
          <div className="profile-card">
            <h2>{userInfo.name}</h2>
            <h6>{address}</h6>
            <div className="balance-section">
              <small>{balance} ETH</small>
              <button className="sign-message-button" onClick={executeUserOp}>Execute User Operation</button>
            </div>
          </div>
        )}
      </div>
  );
};

export default App;