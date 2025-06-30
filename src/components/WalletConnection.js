import React from 'react';
import { Wallet, LogOut } from 'lucide-react';

const WalletConnection = ({ 
  isConnected, 
  account, 
  isConnecting, 
  onConnect, 
  onDisconnect, 
  formatAddress 
}) => {
  if (isConnected) {
    return (
      <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-medium">Connected</p>
            <p className="text-white/70 text-sm">{formatAddress(account)}</p>
          </div>
        </div>
        <button
          onClick={onDisconnect}
          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <Wallet className="w-10 h-10 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
      <p className="text-white/70 mb-8 max-w-sm mx-auto">
        Connect your MetaMask wallet to access your personalized financial assistant
      </p>
      <button
        onClick={onConnect}
        disabled={isConnecting}
        className={`px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
          isConnecting ? 'animate-pulse' : ''
        }`}
      >
        {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
      </button>
    </div>
  );
};

export default WalletConnection;