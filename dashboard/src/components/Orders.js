import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";
    axios.get(`${apiUrl}/allOrders`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  };

  useEffect(() => {
    fetchOrders();

    // Listen for new orders being placed so we reload live
    window.addEventListener("orderPlaced", fetchOrders);
    return () => {
      window.removeEventListener("orderPlaced", fetchOrders);
    };
  }, []);

  return (
    <div className="orders" style={{ height: "auto", minHeight: "80vh" }}>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <>
          <h3 className="title">Orders ({orders.length})</h3>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Price</th>
                  <th>Mode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const modeClass = order.mode === "BUY" ? "profit" : "loss";
                  return (
                    <tr key={index}>
                      <td style={{ textAlign: "left", fontWeight: "600" }}>{order.name}</td>
                      <td>{order.qty}</td>
                      <td>₹{Number(order.price || 0).toFixed(2)}</td>
                      <td className={modeClass} style={{ fontWeight: "600" }}>
                        {order.mode}
                      </td>
                      <td style={{ color: "#4184f3", fontWeight: "600" }}>COMPLETED</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;