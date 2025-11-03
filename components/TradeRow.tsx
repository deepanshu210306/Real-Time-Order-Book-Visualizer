import React, { memo } from 'react';
import { Trade } from '@/types';

interface TradeRowProps {
  trade: Trade;
  isNew: boolean;
}

export const TradeRow = memo<TradeRowProps>(({ trade, isNew }) => {
  const isBuy = !trade.isBuyerMaker;
  
  return (
    <div 
      className={`flex justify-between px-3 py-1 text-xs font-mono transition-colors duration-300 ${
        isNew ? (isBuy ? 'bg-green-500/30' : 'bg-red-500/30') : ''
      }`}
    >
      <span className={isBuy ? 'text-green-400' : 'text-red-400'}>
        {parseFloat(trade.price).toFixed(2)}
      </span>
      <span className="text-gray-300">{parseFloat(trade.quantity).toFixed(4)}</span>
      <span className="text-gray-400">
        {new Date(trade.time).toLocaleTimeString()}
      </span>
    </div>
  );
});

TradeRow.displayName = 'TradeRow';