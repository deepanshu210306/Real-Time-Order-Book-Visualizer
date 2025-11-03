# 🧩 Real-Time Order Book Visualizer

A high-performance, real-time **stock order book visualizer** built with **Next.js + TypeScript**, streaming **live Binance market data**.

This project demonstrates handling high-frequency data, efficient React state management, and smooth UI updates — simulating a real-world financial trading interface.

---

## 🚀 Features

### 🔹 Live Binance WebSocket Feed
- Connects directly to the **Binance WebSocket API**.
- Subscribes to:
  - **Aggregate Trades (`aggTrade`)** — for recent trades.
  - **Order Book Deltas (`depth@100ms`)** — for live bid/ask updates.
- Automatically removes zero-quantity levels.

### 🔹 Order Book Component
- Displays real-time **bids** (buyers) and **asks** (sellers).
- **Sorted**:
  - Bids → Descending order (highest at top)
  - Asks → Ascending order (lowest at top)
- **Columns**:
  - Price | Amount | Total (cumulative)
- **Spread** dynamically shown between bids and asks.
- **Depth visualization** via gradient bars (green/red).

### 🔹 Recent Trades Component
- Displays the **50 most recent trades**.
- Each new trade **flashes**:
  - 🟩 Green → Market buy  
  - 🟥 Red → Market sell  

---
#  Install dependencies
- npm install

#  Run development server
- npm run dev

# Access the PRoject here
- https://real-time-order-book-visualizer-flame.vercel.app/
