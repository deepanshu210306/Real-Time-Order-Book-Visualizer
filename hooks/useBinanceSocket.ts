import { useState, useEffect } from 'react';
import { Trade } from '@/types';

export function useBinanceSocket(symbol: string) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [bids, setBids] = useState<Map<string, string>>(new Map());
  const [asks, setAsks] = useState<Map<string, string>>(new Map());
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const lower = symbol.toLowerCase();
    const tradeSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${lower}@aggTrade`);
    const depthSocket = new WebSocket(`wss://stream.binance.com:9443/ws/${lower}@depth@100ms`);

    tradeSocket.onopen = () => setConnected(true);
    tradeSocket.onclose = () => setConnected(false);

    tradeSocket.onmessage = (e) => {
      const d = JSON.parse(e.data);
      const trade: Trade = { id: d.a, price: d.p, quantity: d.q, time: d.T, isBuyerMaker: d.m };
      setTrades(prev => [trade, ...prev.slice(0, 49)]);
    };

    depthSocket.onmessage = (e) => {
      const d = JSON.parse(e.data);
      setBids(prev => {
        const map = new Map(prev);
        d.b.forEach(([p, q]: [string, string]) => parseFloat(q) ? map.set(p, q) : map.delete(p));
        return map;
      });
      setAsks(prev => {
        const map = new Map(prev);
        d.a.forEach(([p, q]: [string, string]) => parseFloat(q) ? map.set(p, q) : map.delete(p));
        return map;
      });
    };

    return () => {
      tradeSocket.close();
      depthSocket.close();
    };
  }, [symbol]);

  return { trades, bids, asks, connected };
}
