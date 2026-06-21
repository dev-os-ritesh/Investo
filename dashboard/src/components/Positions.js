import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const { stockPrices } = useContext(GeneralContext);

  const fetchPositions = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.get(`${apiUrl}/allPositions`).then((res) => {
      setAllPositions(res.data);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchPositions();
    
    // Listen for order placements to update positions
    window.addEventListener("orderPlaced", fetchPositions);
    return () => {
      window.removeEventListener("orderPlaced", fetchPositions);
    };
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allPositions.map((stock, index) => {
              const livePrice = stockPrices[stock.name] || stock.price || 0;
              const curValue = livePrice * stock.qty;
              const costBasis = stock.avg * stock.qty;
              const pnl = curValue - costBasis;
              const isProfit = pnl >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              
              // Dynamic day change
              const priceDiff = livePrice - stock.avg;
              const isLoss = priceDiff < 0;
              const dayClass = isLoss ? "loss" : "profit";
              const percentText = `${priceDiff >= 0 ? "+" : ""}${((priceDiff / (stock.avg || 1)) * 100).toFixed(2)}%`;

              return (
                <tr key={index}>
                  <td>{stock.product}</td>
                  <td style={{ textAlign: "left", fontWeight: "600" }}>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{(stock.avg || 0).toFixed(2)}</td>
                  <td>{(livePrice || 0).toFixed(2)}</td>
                  <td className={profClass}>
                    {(pnl || 0).toFixed(2)}
                  </td>
                  <td className={dayClass}>{percentText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;