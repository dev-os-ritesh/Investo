import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Summary = () => {
  const { availableMargin, usedMargin, openingBalance, stockPrices, userName } = useContext(GeneralContext);
  const [allHoldings, setAllHoldings] = useState([]);

  const fetchHoldings = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.get(`${apiUrl}/allHoldings`).then((res) => {
      setAllHoldings(res.data);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchHoldings();
    
    window.addEventListener("orderPlaced", fetchHoldings);
    return () => {
      window.removeEventListener("orderPlaced", fetchHoldings);
    };
  }, []);

  // Calculate holdings stats dynamically
  let totalInvestment = 0;
  let totalCurrentValue = 0;

  allHoldings.forEach((stock) => {
    const livePrice = stockPrices[stock.name] || stock.price || 0;
    totalInvestment += stock.avg * stock.qty;
    totalCurrentValue += livePrice * stock.qty;
  });

  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : "0.00";
  const isTotalProfit = totalPnL >= 0;

  // Format large numbers nicely (e.g. 3.74k or 29.88k)
  const formatK = (num) => {
    if (num === undefined || num === null || isNaN(num)) return "0.00";
    const absNum = Math.abs(num);
    if (absNum >= 1000) {
      return `${(num / 1000).toFixed(2)}k`;
    }
    return num.toFixed(2);
  };

  return (
    <>
      <div className="username" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h6>Hi, {userName}!</h6>
      </div>
      <hr className="divider" />

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatK(availableMargin)}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatK(usedMargin)}</span>{" "}
            </p>
            <p>
              Opening balance <span>{formatK(openingBalance)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isTotalProfit ? "profit" : "loss"} style={{ color: isTotalProfit ? "rgb(72, 194, 55)" : "rgb(250, 118, 78)" }}>
              {formatK(totalPnL)} <small style={{ color: isTotalProfit ? "rgb(72, 194, 55)" : "rgb(250, 118, 78)" }}>{isTotalProfit ? "+" : ""}{totalPnLPercent}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatK(totalCurrentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{formatK(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;