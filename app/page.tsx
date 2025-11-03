'use client';

import React, { useState } from 'react';
import { useBinanceSocket } from '@/hooks/useBinanceSocket';
import { OrderBook } from '@/components/OrderBook';
import { RecentTrades } from '@/components/RecentTrades';

export default function Home() {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const { trades, bids, asks, connected } = useBinanceSocket(symbol);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Real-Time Order Book</h1>
            <p className="text-gray-400 mt-1">Live market data from Binance</p>
          </div>
          
          <div className="flex items-center gap-4">
            <select 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="BTCUSDT">BTC/USDT</option>
              <option value="ETHUSDT">ETH/USDT</option>
              <option value="BNBUSDT">BNB/USDT</option>
              <option value="SOLUSDT">SOL/USDT</option>
            </select>
            
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-400">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderBook bids={bids} asks={asks} />
          </div>
          
          <div>
            <RecentTrades trades={trades} />
          </div>
        </div>
      </div>
    </div>
  );
}