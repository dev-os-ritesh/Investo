import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const { stockPrices } = useContext(GeneralContext);

  const fetchHoldings = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.get(`${apiUrl}/allHoldings`).then((res) => {
      setAllHoldings(res.data);
    }).catch(console.error);
  };

  useEffect(() => {
    fetchHoldings();
    
    // Listen for order updates in case holding changes
    window.addEventListener("orderPlaced", fetchHoldings);
    return () => {
      window.removeEventListener("orderPlaced", fetchHoldings);
    };
  }, []);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stockPrices[stock.name] || stock.price),
        backgroundColor: "rgba(65, 132, 243, 0.5)",
      },
    ],
  };

  // Calculate totals dynamically
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

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
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
                  <td style={{ textAlign: "left", fontWeight: "600" }}>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{(stock.avg || 0).toFixed(2)}</td>
                  <td>{(livePrice || 0).toFixed(2)}</td>
                  <td>{(curValue || 0).toFixed(2)}</td>
                  <td className={profClass}>
                    {(pnl || 0).toFixed(2)}
                  </td>
                  <td className={profClass}>{percentText}</td>
                  <td className={dayClass}>{percentText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {totalInvestment.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {totalCurrentValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={isTotalProfit ? "profit" : "loss"} style={{ color: isTotalProfit ? "rgb(72, 194, 55)" : "rgb(250, 118, 78)" }}>
            {totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({isTotalProfit ? "+" : ""}{totalPnLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;