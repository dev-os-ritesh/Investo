/**
 * Dashboard.js - Main Content Layout
 *
 * This component defines the two-panel layout of the main dashboard area:
 *   LEFT:  <WatchList /> - a persistent sidebar showing live prices for tracked stocks.
 *   RIGHT: <Routes />    - the main content area, which swaps views based on the URL path.
 *
 * Sub-routes (all nested under the Home "/" wildcard route):
 *   /           -> <Summary />   - Portfolio overview with P&L summary and charts
 *   /orders     -> <Orders />    - History of all past BUY/SELL orders
 *   /holdings   -> <Holdings />  - Long-term stock holdings
 *   /positions  -> <Positions /> - Currently open/active trading positions
 *   /funds      -> <Funds />     - Account funds management (add/withdraw)
 *   /apps       -> <Apps />      - Third-party app integrations directory
 *
 * Navigation between these views is handled by the <Menu /> component inside <TopBar />.
 */
import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Persistent left sidebar showing live stock prices */}
      <WatchList />
      {/* Main content area - renders different components based on the URL */}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;