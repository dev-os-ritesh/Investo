import React, { useState, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const { stockPrices } = useContext(GeneralContext);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const data = {
    labels: watchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stockPrices[stock.name] || stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(201, 203, 207, 0.5)",
          "rgba(255, 99, 71, 0.5)",
          "rgba(60, 179, 113, 0.5)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
          "rgba(255, 99, 71, 1)",
          "rgba(60, 179, 113, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="counts"> {filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>

      <div style={{ padding: "20px" }}>
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

export default WatchList;

const MarketDepth = ({ symbol, price }) => {
  // Bids and Asks generated around the price
  const bids = [
    { price: price - 0.05, qty: 120 },
    { price: price - 0.10, qty: 450 },
    { price: price - 0.15, qty: 320 },
    { price: price - 0.20, qty: 780 },
    { price: price - 0.25, qty: 1100 }
  ];
  const asks = [
    { price: price + 0.05, qty: 180 },
    { price: price + 0.10, qty: 250 },
    { price: price + 0.15, qty: 620 },
    { price: price + 0.20, qty: 980 },
    { price: price + 0.25, qty: 850 }
  ];

  return (
    <div className="market-depth" style={{ padding: "10px", background: "#f9f9f9", border: "1px solid #eee", borderRadius: "4px", fontSize: "0.75rem", margin: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "600", borderBottom: "1px solid #eee", paddingBottom: "4px", marginBottom: "4px" }}>
        <span style={{ color: "rgb(72, 194, 55)", flex: 1 }}>Bid Qty</span>
        <span style={{ color: "rgb(72, 194, 55)", flex: 1, textAlign: "right" }}>Bid Price</span>
        <span style={{ color: "rgb(250, 118, 78)", flex: 1, textAlign: "left", paddingLeft: "12px" }}>Ask Price</span>
        <span style={{ color: "rgb(250, 118, 78)", flex: 1, textAlign: "right" }}>Ask Qty</span>
      </div>
      {bids.map((bid, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", margin: "2px 0", color: "#555" }}>
          <span style={{ flex: 1 }}>{bid.qty}</span>
          <span style={{ flex: 1, textAlign: "right", color: "rgb(72, 194, 55)" }}>{bid.price.toFixed(2)}</span>
          <span style={{ flex: 1, textAlign: "left", paddingLeft: "12px", color: "rgb(250, 118, 78)" }}>{asks[i].price.toFixed(2)}</span>
          <span style={{ flex: 1, textAlign: "right" }}>{asks[i].qty}</span>
        </div>
      ))}
    </div>
  );
};

const StockAnalytics = ({ symbol, price }) => {
  return (
    <div style={{ padding: "12px", background: "#f3f7ff", border: "1px solid #d0e0fc", borderRadius: "4px", fontSize: "0.8rem", margin: "10px 0" }}>
      <p style={{ margin: "0 0 8px 0", fontWeight: "bold", color: "#4184f3" }}>{symbol} Analytics Profile</p>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 0" }}>
        <span>Day High:</span>
        <span style={{ fontWeight: "600" }}>₹{(price * 1.02).toFixed(2)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 0" }}>
        <span>Day Low:</span>
        <span style={{ fontWeight: "600" }}>₹{(price * 0.98).toFixed(2)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 0" }}>
        <span>Volume:</span>
        <span style={{ fontWeight: "600" }}>{(price * 1234).toFixed(0)}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "4px 0" }}>
        <span>52W High:</span>
        <span style={{ fontWeight: "600" }}>₹{(price * 1.45).toFixed(2)}</span>
      </div>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const { stockPrices } = useContext(GeneralContext);
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const [showMarketDepth, setShowMarketDepth] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const livePrice = stockPrices[stock.name] || stock.price;
  const initialPrice = stock.price;
  const priceDiff = livePrice - initialPrice;
  const isDown = priceDiff < 0;
  const percentChange = ((priceDiff / initialPrice) * 100).toFixed(2);
  const percentText = `${priceDiff >= 0 ? "+" : ""}${percentChange}%`;

  const handleMouseEnter = (e) => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = (e) => {
    setShowWatchlistActions(false);
  };

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ display: "block" }}>
      <div className="item">
        <p className={isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{percentText}</span>
          {isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{livePrice.toFixed(2)}</span>
        </div>
      </div>
      {showWatchlistActions && (
        <WatchListActions
          uid={stock.name}
          onMoreClick={() => setShowMarketDepth(!showMarketDepth)}
          onAnalyticsClick={() => setShowAnalytics(!showAnalytics)}
        />
      )}
      {showMarketDepth && <MarketDepth symbol={stock.name} price={livePrice} />}
      {showAnalytics && <StockAnalytics symbol={stock.name} price={livePrice} />}
    </li>
  );
};

const WatchListActions = ({ uid, onMoreClick, onAnalyticsClick }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, "SELL");
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={onAnalyticsClick}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action" onClick={onMoreClick}>
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};