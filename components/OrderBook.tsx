
import React, { memo, useMemo } from 'react';
import { OrderBookRow } from './OrderBookRow';

interface OrderBookProps {
  bids: Map<string, string>;
  asks: Map<string, string>;
}

export const OrderBook = memo<OrderBookProps>(({ bids, asks }) => {
  const processedBids = useMemo(() => {
    const sorted = Array.from(bids.entries())
      .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
      .slice(0, 15);
    
    let cumulative = 0;
    const withTotals = sorted.map(([price, qty]) => {
      cumulative += parseFloat(qty);
      return { price, quantity: qty, total: cumulative };
    });
    
    return withTotals;
  }, [bids]);

  const processedAsks = useMemo(() => {
    const sorted = Array.from(asks.entries())
      .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
      .slice(0, 15);
    
    let cumulative = 0;
    const withTotals = sorted.map(([price, qty]) => {
      cumulative += parseFloat(qty);
      return { price, quantity: qty, total: cumulative };
    });
    
    return withTotals;
  }, [asks]);

  const maxBidTotal = useMemo(() => 
    Math.max(...processedBids.map(b => b.total), 1),
    [processedBids]
  );

  const maxAskTotal = useMemo(() => 
    Math.max(...processedAsks.map(a => a.total), 1),
    [processedAsks]
  );

  const spread = useMemo(() => {
    if (processedAsks.length === 0 || processedBids.length === 0) return 0;
    return parseFloat(processedAsks[0].price) - parseFloat(processedBids[0].price);
  }, [processedAsks, processedBids]);

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Order Book</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Bids */}
        <div>
          <div className="flex justify-between px-2 mb-2 text-xs font-semibold text-gray-400">
            <span>Price</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="space-y-px">
            {processedBids.map(bid => (
              <OrderBookRow
                key={bid.price}
                price={bid.price}
                quantity={bid.quantity}
                total={bid.total}
                maxTotal={maxBidTotal}
                isBid={true}
              />
            ))}
          </div>
        </div>

        {/* Asks */}
        <div>
          <div className="flex justify-between px-2 mb-2 text-xs font-semibold text-gray-400">
            <span>Price</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          <div className="space-y-px">
            {processedAsks.map(ask => (
              <OrderBookRow
                key={ask.price}
                price={ask.price}
                quantity={ask.quantity}
                total={ask.total}
                maxTotal={maxAskTotal}
                isBid={false}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Spread */}
      <div className="mt-4 text-center">
        <span className="text-gray-400 text-sm">Spread: </span>
        <span className="text-yellow-400 font-mono font-bold">
          ${spread.toFixed(2)}
        </span>
      </div>
    </div>
  );
});

OrderBook.displayName = 'OrderBook';