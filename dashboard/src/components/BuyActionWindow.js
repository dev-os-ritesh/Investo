/**
 * BuyActionWindow.js - Trade Order Execution Popup
 *
 * This is the modal popup that appears when a user clicks "Buy" or "Sell" on a stock
 * in the WatchList. It is rendered by GeneralContext.Provider when `isBuyWindowOpen` is true.
 *
 * Props:
 * - uid {string}: The stock ticker symbol being traded (e.g., "INFY")
 * - mode {string}: "BUY" or "SELL" - controls the color theme and button label
 *
 * Trade Execution Flow:
 * 1. User opens popup (by clicking a stock in WatchList) -> GeneralContext sets uid and mode
 * 2. BuyActionWindow pre-fills the price from GeneralContext's live stockPrices
 * 3. User adjusts qty/price and clicks "Buy"/"Sell"
 * 4. handleBuyClick() sends a POST /newOrder to the backend with the order details
 * 5. Backend creates an order record and updates Holdings + Positions in MongoDB
 * 6. updateMarginOnOrder() is called to update the user's available/used funds locally
 * 7. A "orderPlaced" event is dispatched on the window so other components can refresh
 * 8. closeBuyWindow() hides this popup
 */
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

/**
 * BuyActionWindow component
 * @param {string} uid - Stock ticker symbol (e.g., "TCS")
 * @param {string} mode - "BUY" or "SELL"
 */
const BuyActionWindow = ({ uid, mode }) => {
  // Pull live prices and window control functions from global state
  const { stockPrices, closeBuyWindow, updateMarginOnOrder } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);        // Default qty = 1 share
  const [stockPrice, setStockPrice] = useState(0.0);            // Pre-filled from live prices

  // On mount, set the price input to the current live market price of this stock
  useEffect(() => {
    if (uid && stockPrices[uid]) {
      setStockPrice(stockPrices[uid]);
    }
  }, [uid]);

  /**
   * handleBuyClick - Sends the order to the backend when user confirms the trade.
   * Step 1: Calculate total cost.
   * Step 2: POST the order to the backend API (/newOrder).
   * Step 3: On success, update local margin state and fire an event for other components.
   * Step 4: Close the popup window.
   */
  const handleBuyClick = () => {
    const cost = Number(stockQuantity) * Number(stockPrice);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.post(`${apiUrl}/newOrder`, {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: mode, // "BUY" or "SELL"
    }).then(() => {
      // Update the local available/used margin after the trade
      if (updateMarginOnOrder) {
        updateMarginOnOrder(cost, mode);
      }
      // Fire a custom event so components like Holdings/Positions can re-fetch their data
      window.dispatchEvent(new Event("orderPlaced"));
    });

    closeBuyWindow();
  };

  /** handleCancelClick - Simply closes the popup without placing any order. */
  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true" style={{ height: "auto", paddingBottom: "20px" }}>
      {/* Header bar - blue for BUY, red/orange for SELL */}
      <div className="header" style={{ backgroundColor: mode === "BUY" ? "#4184f3" : "#ff5722", padding: "16px", color: "#fff" }}>
        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{mode === "BUY" ? "Buy" : "Sell"} {uid}</h3>
        {/* LTP = Last Traded Price - shows the current live price */}
        <span style={{ fontSize: "0.8rem" }}>LTP: ₹{(stockPrices[uid] || stockPrice || 0).toFixed(2)}</span>
      </div>

      <div className="regular-order">
        <div className="inputs">
          {/* Quantity input - user sets how many shares to buy/sell */}
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          {/* Price input - pre-filled with live price, user can modify for limit orders */}
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        {/* Shows the total cost/proceeds for the trade before confirming */}
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
          {/* Confirm button - color matches mode (blue=buy, orange=sell) */}
          <button
            className="btn"
            style={{ backgroundColor: mode === "BUY" ? "#4184f3" : "#ff5722", border: "none", cursor: "pointer" }}
            onClick={handleBuyClick}
          >
            {mode === "BUY" ? "Buy" : "Sell"}
          </button>
          <button
            className="btn btn-grey"
            style={{ border: "none", cursor: "pointer" }}
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;