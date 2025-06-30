export const mockCardData = {
  balance: 2500.75,
  currency: 'USD',
  monthlySpending: 1847.32,
  creditLimit: 5000,
  availableCredit: 2499.25,
  interestRate: 18.9,
  minimumPayment: 125.50,
  dueDate: '2025-07-15',
  cardNumber: '**** **** **** 4532',
  cardType: 'Visa',
  rewards: {
    cashback: 127.45,
    points: 2540
  }
};

export const mockTransactions = [
  {
    id: 1,
    date: '2025-06-28',
    merchant: 'Amazon',
    amount: -89.99,
    category: 'Shopping',
    description: 'Online purchase',
    pending: false
  },
  {
    id: 2,
    date: '2025-06-27',
    merchant: 'Starbucks',
    amount: -12.45,
    category: 'Food & Dining',
    description: 'Coffee',
    pending: false
  }
];

export const mockAISuggestions = [
  {
    id: 1,
    type: 'savings',
    title: 'Switch to High-Yield Savings',
    description: 'You could earn an extra $156/year',
    impact: '+$156/year',
    priority: 'high',
    icon: '💰'
  }
];