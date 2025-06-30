# Personalized Financial Assistant

An AI-powered MetaMask Card and DeFi management application built with React and MetaMask SDK.

## Features

- 🔗 MetaMask wallet integration
- 💳 MetaMask Card usage tracking
- 💰 USDC balance display
- 🤖 AI-powered financial suggestions
- ⚡ One-click portfolio optimization
- 📱 Mobile-responsive design
- 🎨 Modern glassmorphism UI

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Wallet Integration**: MetaMask SDK
- **Icons**: Lucide React
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension

### Installation

1. **Create the project directory**
   ```bash
   mkdir financial-assistant
   cd financial-assistant
   ```

2. **Initialize React app**
   ```bash
   npx create-react-app .
   ```

3. **Install dependencies**
   ```bash
   npm install @metamask/sdk lucide-react
   ```

4. **Create folder structure**
   ```bash
   mkdir -p src/components src/hooks src/utils
   ```

5. **Copy the provided files into their respective folders:**

   - Copy `package.json` to root directory
   - Copy `public/index.html` to `public/` folder
   - Copy all `src/` files to their respective folders:
     - `src/index.js`
     - `src/App.js`
     - `src/App.css`
     - `src/components/WalletConnection.js`
     - `src/components/Dashboard.js`
     - `src/components/CardUsage.js`
     - `src/components/AISuggestions.js`
     - `src/components/OptimizeButton.js`
     - `src/hooks/useMetaMask.js`
     - `src/utils/mockData.js`

6. **Start the development server**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## Project Structure

```
financial-assistant/
├── public/
│   └── index.html              # HTML template with Tailwind CDN
├── src/
│   ├── components/
│   │   ├── WalletConnection.js # Wallet connection component
│   │   ├── Dashboard.js        # Main dashboard
│   │   ├── CardUsage.js        # Card usage and transactions
│   │   ├── AISuggestions.js    # AI recommendations
│   │   └── OptimizeButton.js   # One-click optimization
│   ├── hooks/
│   │   └── useMetaMask.js      # MetaMask SDK integration
│   ├── utils/
│   │   └── mockData.js         # Mock data for demo
│   ├── App.js                  # Main app component
│   ├── App.css                 # Custom styles
│   └── index.js                # App entry point
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Key Components

### WalletConnection
- Handles MetaMask wallet connection/disconnection
- Shows connection status and wallet address

### Dashboard
- Main user interface after wallet connection
- Displays welcome message and user stats

### CardUsage
- Shows MetaMask Card balance and transactions
- Displays spending patterns and credit information

### AISuggestions
- AI-powered financial recommendations
- Categorized suggestions with confidence levels

### OptimizeButton
- One-click portfolio optimization
- Animated loading states and success feedback

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_INFURA_API_KEY=your_infura_api_key_here
```

## Features Demonstration

1. **Wallet Connection**: Click "Connect MetaMask" to connect your wallet
2. **Card Dashboard**: View your MetaMask Card balance and recent transactions
3. **AI Suggestions**: See personalized financial recommendations
4. **One-Click Optimize**: Use the optimize button to improve your financial portfolio
5. **Mobile Responsive**: Works seamlessly on all device sizes

## Development Notes

- Uses mock data for demonstration purposes
- MetaMask SDK integration is production-ready
- Responsive design with Tailwind CSS
- Modern UI with glassmorphism effects
- Smooth animations and hover effects

## Next Steps for Production

1. Integrate real MetaMask Card API
2. Connect to actual DeFi protocols
3. Implement real AI recommendation engine
4. Add user authentication and data persistence
5. Deploy to production environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details