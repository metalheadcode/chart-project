# Stock Charting Application

## Introduction

A modern React application for visualizing stock market data with interactive charts. This project combines the power of React, TypeScript, D3.js, and Chart.js to create a comprehensive stock charting solution. It features real-time data visualization, technical indicators, and a responsive design built with Tailwind CSS.

Demo: [Live Demo](https://chart-project-cyan.vercel.app)

## Features

- Interactive stock charts with zoom and pan capabilities
- Real-time data updates
- Multiple technical indicators
- Responsive design with Tailwind CSS
- Redux state management with TypeScript support
- Redux Saga for side effects
- Modern React hooks implementation
- Type-safe development with TypeScript

## Tech Stack

- React 18
- TypeScript
- Redux & Redux Saga
- D3.js & Chart.js
- Tailwind CSS
- Axios for API calls
- Financial Modeling Prep API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Financial Modeling Prep API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/chart-project.git
cd chart-project
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your API credentials:

```env
REACT_APP_API_URL=https://financialmodelingprep.com/api/v3
REACT_APP_API_KEY=your_api_key_here
```

To obtain an API key:

1. Register at [Financial Modeling Prep](https://site.financialmodelingprep.com/)
2. Navigate to your dashboard
3. Copy your API key
4. Add it to the `.env` file

### Running the Application

1. Start the development server:

```bash
npm start
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## TypeScript Features

The application is built with TypeScript, providing:

- Type-safe state management with Redux
- Proper type definitions for all components
- Type-safe API calls and data handling
- Enhanced developer experience with better IDE support
- Reduced runtime errors through compile-time type checking

## Usage

1. Enter a NASDAQ stock symbol in the search bar
2. The chart will automatically load and display the stock data
3. Use the controls to:
   - Toggle different technical indicators
   - Zoom in/out of the chart
   - Pan across different time periods
   - Adjust the time frame

## Project Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Main application screens
├── redux/          # Redux store and reducers
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── services/       # API services and data fetching
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. When contributing:

1. Ensure all new code is written in TypeScript
2. Add appropriate type definitions
3. Follow the existing code style
4. Add tests for new features
5. Update documentation as needed

## License

This project is licensed under the MIT License - see the LICENSE file for details.
