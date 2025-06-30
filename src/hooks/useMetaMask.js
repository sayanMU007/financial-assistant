import { useState, useEffect } from 'react';
import { MetaMaskSDK } from '@metamask/sdk';

const useMetaMask = () => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [sdk, setSdk] = useState(null);

  useEffect(() => {
    const initSDK = async () => {
      try {
        const MMSDK = new MetaMaskSDK({
          dappMetadata: {
            name: "Financial Assistant",
            url: window.location.href,
          },
          infuraAPIKey: process.env.REACT_APP_INFURA_API_KEY,
        });

        setSdk(MMSDK);

        // Check if already connected
        if (MMSDK.isConnected()) {
          const accounts = await MMSDK.connect();
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
            setIsConnected(true);
          }
        }
      } catch (error) {
        console.error('Failed to initialize MetaMask SDK:', error);
      }
    };

    initSDK();
  }, []);

  const connectWallet = async () => {
    if (!sdk) {
      console.error('MetaMask SDK not initialized');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await sdk.connect();
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    if (sdk) {
      sdk.terminate();
    }
    setAccount(null);
    setIsConnected(false);
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return {
    account,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    formatAddress,
    sdk
  };
};

export default useMetaMask;