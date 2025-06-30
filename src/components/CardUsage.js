import React from 'react';
import { CreditCard, TrendingUp, DollarSign, Calendar } from 'lucide-react';

const CardUsage = ({ cardData = {}, transactions = [] }) => {
  // Provide default values to prevent errors
  const {
    balance = 0,
    currency = 'USD',
    monthlySpending = 0,
    availableCredit = 0
  } = cardData;

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <div className="card-gradient p-6 rounded-xl text-white hover-scale">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">MetaMask Card</h3>
              <p className="text-white/70 text-sm">•••• •••• •••• 4321</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${balance.toLocaleString()}</p>
            <p className="text-white/70 text-sm">{currency} Balance</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Monthly Spending</span>
            </div>
            <p className="text-lg font-semibold">${monthlySpending.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Available Credit</span>
            </div>
            <p className="text-lg font-semibold">${availableCredit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.slice(0, 4).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {transaction.amount > 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    ) : (
                      <DollarSign className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{transaction.merchant}</p>
                    <p className="text-white/60 text-sm">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-white'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-white/60 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-white/60">
              <p>No transactions available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardUsage;