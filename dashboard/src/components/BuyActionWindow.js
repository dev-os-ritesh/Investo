import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode }) => {
  const { stockPrices, closeBuyWindow, updateMarginOnOrder } = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  useEffect(() => {
    if (uid && stockPrices[uid]) {
      setStockPrice(stockPrices[uid]);
    }
  }, [uid]);

  const handleBuyClick = () => {
    const cost = Number(stockQuantity) * Number(stockPrice);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.post(`${apiUrl}/newOrder`, {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: mode,
    }).then(() => {
      if (updateMarginOnOrder) {
        updateMarginOnOrder(cost, mode);
      }
      // Trigger a window reload or trigger a reload event for data components
      window.dispatchEvent(new Event("orderPlaced"));
    });

    closeBuyWindow();
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true" style={{ height: "auto", paddingBottom: "20px" }}>
      <div className="header" style={{ backgroundColor: mode === "BUY" ? "#4184f3" : "#ff5722", padding: "16px", color: "#fff" }}>
        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{mode === "BUY" ? "Buy" : "Sell"} {uid}</h3>
        <span style={{ fontSize: "0.8rem" }}>LTP: ₹{(stockPrices[uid] || stockPrice || 0).toFixed(2)}</span>
      </div>

      <div className="regular-order">
        <div className="inputs">
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
        <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
        <div>
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