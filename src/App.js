import React from 'react';
import useMetaMask from './hooks/useMetaMask';
import WalletConnection from './components/WalletConnection';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const {
    account,
    isConnected,
    isConnecting,
    connectWallet,
    disconnectWallet,
    formatAddress
  } = useMetaMask();

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Financial Assistant
          </h1>
          <p className="text-white/70 text-lg">
            AI-powered MetaMask Card & DeFi management
          </p>
        </header>

        {/* Main Content */}
        <main>
          {isConnected ? (
            <div>
              {/* Connected Wallet Info */}
              <WalletConnection
                isConnected={isConnected}
                account={account}
                isConnecting={isConnecting}
                onConnect={connectWallet}
                onDisconnect={disconnectWallet}
                formatAddress={formatAddress}
              />
              
              {/* Dashboard */}
              <Dashboard account={account} formatAddress={formatAddress} />
            </div>
          ) : (
            <WalletConnection
              isConnected={isConnected}
              account={account}
              isConnecting={isConnecting}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
              formatAddress={formatAddress}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 text-white/50">
          <p>Powered by MetaMask SDK & AI</p>
        </footer>
      </div>
    </div>
  );
}

export default App;