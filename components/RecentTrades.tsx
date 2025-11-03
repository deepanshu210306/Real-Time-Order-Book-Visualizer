import React, { memo, useState, useEffect } from 'react';
import { Trade } from '@/types';
import { TradeRow } from './TradeRow';

interface RecentTradesProps {
  trades: Trade[];
}

export const RecentTrades = memo<RecentTradesProps>(({ trades }) => {
  const [flashingId, setFlashingId] = useState<string | null>(null);

  useEffect(() => {
    if (trades.length > 0) {
      const latestId = trades[0].id;
      setFlashingId(latestId);
      const timer = setTimeout(() => setFlashingId(null), 300);
      return () => clearTimeout(timer);
    }
  }, [trades]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Recent Trades</h2>
      
      <div className="flex justify-between px-3 mb-2 text-xs font-semibold text-gray-400">
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
      
      <div className="space-y-px max-h-96 overflow-y-auto">
        {trades.map(trade => (
          <TradeRow 
            key={trade.id} 
            trade={trade} 
            isNew={trade.id === flashingId}
          />
        ))}
      </div>
    </div>
  );
});

RecentTrades.displayName = 'RecentTrades';