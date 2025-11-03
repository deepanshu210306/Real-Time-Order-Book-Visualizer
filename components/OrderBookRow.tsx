import React, { memo } from 'react';

interface OrderBookRowProps {
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
  isBid: boolean;
}

export const OrderBookRow = memo<OrderBookRowProps>(({ 
  price, 
  quantity, 
  total, 
  maxTotal, 
  isBid 
}) => {
  const percentage = (total / maxTotal) * 100;
  
  return (
    <div className="relative h-6 flex items-center text-xs font-mono">
      <div 
        className={`absolute top-0 bottom-0 ${isBid ? 'right-0 bg-green-500/20' : 'left-0 bg-red-500/20'}`}
        style={{ width: `${percentage}%` }}
      />
      <div className="relative z-10 flex w-full px-2 justify-between">
        <span className={isBid ? 'text-green-400' : 'text-red-400'}>
          {parseFloat(price).toFixed(2)}
        </span>
        <span className="text-gray-300">{parseFloat(quantity).toFixed(4)}</span>
        <span className="text-gray-400">{total.toFixed(4)}</span>
      </div>
    </div>
  );
});

OrderBookRow.displayName = 'OrderBookRow';