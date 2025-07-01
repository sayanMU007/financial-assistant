import React, { useState, useEffect } from 'react';

// Dashboard component to display financial data
const Dashboard = ({ account, formatAddress }) => {
  // State variables to manage loading, error, and financial data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchFinancialData = async () => {
      try {
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate a successful data fetch
        const dummyData = {
          balance: '$12,345.67',
          currency: 'USD',
          transactions: [
            { id: 1, description: 'Coffee Shop', amount: '-$5.50', date: '2025-06-30', type: 'expense' },
            { id: 2, description: 'Online Purchase', amount: '-$49.99', date: '2025-06-29', type: 'expense' },
            { id: 3, description: 'Salary Deposit', amount: '+$2,500.00', date: '2025-06-28', type: 'income' },
            { id: 4, description: 'Subscription Renewal', amount: '-$12.99', date: '2025-06-27', type: 'expense' },
            { id: 5, description: 'Freelance Payment', amount: '+$500.00', date: '2025-06-26', type: 'income' },
          ],
          portfolioValue: '$50,000.00',
          defiPositions: [
            { id: 1, protocol: 'Uniswap', asset: 'ETH-USDC LP', value: '$10,000.00' },
            { id: 2, protocol: 'Aave', asset: 'USDT Lending', value: '$5,000.00' },
            { id: 3, protocol: 'Compound', asset: 'DAI Borrowing', value: '-$2,000.00' },
          ],
        };

        setCardData(dummyData); // Set the fetched data
      } catch (err) {
        // Handle any errors during the fetch
        setError('Failed to load financial data. Please try again later.');
        console.error('Error fetching financial data:', err);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchFinancialData(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 w-full max-w-4xl mx-auto shadow-2xl border border-purple-700 mt-8 transform transition-all duration-300 hover:scale-[1.005]">
      {/* Display connected account info within the dashboard for context */}
      <div className="bg-purple-800 bg-opacity-70 rounded-xl p-4 mb-8 flex items-center justify-between shadow-lg border border-purple-600">
        <div className="flex items-center">
          <div className="bg-green-500 rounded-full p-2 mr-3 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Connected Wallet:</p>
            <p className="text-sm text-gray-300">{account ? formatAddress(account) : 'Not Connected'}</p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400 mx-auto mb-4"></div>
          <p className="text-2xl text-purple-300 font-medium">Loading financial insights...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-400">
          <p className="text-2xl font-semibold">{error}</p>
          <p className="text-lg text-red-300 mt-2">Please check your connection and try again.</p>
        </div>
      )}

      {cardData && !loading && !error && (
        <div className="space-y-10 text-white">
          <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            Your Financial Overview
          </h2>

          {/* Current Balance */}
          <div className="bg-purple-800 bg-opacity-70 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-xl border border-purple-600 transform transition-all duration-300 hover:scale-[1.01] hover:bg-purple-700">
            <div className="flex items-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-2xl font-semibold text-gray-200">Current Balance:</p>
            </div>
            <p className="text-5xl font-extrabold text-green-300">
              {cardData.balance} <span className="text-3xl text-gray-400">{cardData.currency}</span>
            </p>
          </div>

          {/* Portfolio Value */}
          <div className="bg-purple-800 bg-opacity-70 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-xl border border-purple-600 transform transition-all duration-300 hover:scale-[1.01] hover:bg-purple-700">
            <div className="flex items-center mb-4 md:mb-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 6h8m-2 2v8m0-8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2zm2 4H9a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2z" />
              </svg>
              <p className="text-2xl font-semibold text-gray-200">Portfolio Value:</p>
            </div>
            <p className="text-4xl font-extrabold text-yellow-300">
              {cardData.portfolioValue}
            </p>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-purple-200 text-center">Recent Transactions</h3>
            <div className="space-y-4">
              {cardData.transactions.map(transaction => (
                <div key={transaction.id} className="bg-purple-800 bg-opacity-70 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center shadow-md border border-purple-600 transform transition-all duration-300 hover:scale-[1.01] hover:bg-purple-700">
                  <div className="flex items-center mb-2 sm:mb-0">
                    {transaction.type === 'expense' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )}
                    <div>
                      <p className="text-xl font-medium text-gray-100">{transaction.description}</p>
                      <p className="text-sm text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`text-2xl font-bold ${transaction.amount.startsWith('-') ? 'text-red-300' : 'text-green-300'}`}>
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* DeFi Positions */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-purple-200 text-center">DeFi Positions</h3>
            <div className="space-y-4">
              {cardData.defiPositions.map(position => (
                <div key={position.id} className="bg-purple-800 bg-opacity-70 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-center shadow-md border border-purple-600 transform transition-all duration-300 hover:scale-[1.01] hover:bg-purple-700">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.033 3-9s-1.343-9-3-9m0 18v-9" />
                    </svg>
                    <div>
                      <p className="text-xl font-medium text-gray-100">{position.protocol}</p>
                      <p className="text-sm text-gray-400">{position.asset}</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-blue-300">
                    {position.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
