/**
 * GeneralContext.js - Global State Provider (The "Brain" of the Dashboard)
 *
 * This is the most important file in the dashboard. It uses React Context to provide
 * a single source of truth for ALL shared state in the app. Every dashboard component
 * (WatchList, Holdings, Funds, etc.) reads from this context instead of managing
 * its own independent state.
 *
 * What this file provides to child components:
 * - openBuyWindow / closeBuyWindow: Show/hide the trade order popup
 * - availableMargin, usedMargin, openingBalance: User's financial state
 * - addFunds / withdrawFunds: Modify the user's balance
 * - stockPrices: Live (simulated) prices for all tracked stocks
 * - nifty, sensex: Live (simulated) market index values
 * - updateMarginOnOrder: Adjusts available/used margin after a trade
 * - commodityRequested / requestCommodity: Commodity access request tracking
 * - activeApps / toggleApp: Manage installed apps from the App Directory
 * - userEmail, userName: Logged-in user identity
 * - logout: Clears auth token and redirects to the login page
 *
 * Data Flow:
 *   Backend API (/user) -> GeneralContextProvider (on mount) -> React state -> Child Components
 *   User Action (buy/sell/add funds) -> GeneralContextProvider functions -> Backend API + React state update
 */
import React, { useState, useEffect } from "react";
import axios from "axios";

import BuyActionWindow from "./BuyActionWindow";

/**
 * initialPrices - Starting stock prices for the live price simulator.
 * These match the stocks seeded in the database.
 * The price simulator (inside useEffect) fluctuates these values every 3 seconds.
 */
const initialPrices = {
  INFY: 1555.45,
  ONGC: 116.80,
  TCS: 3194.80,
  KPITTECH: 266.45,
  QUICKHEAL: 308.55,
  WIPRO: 577.75,
  "M&M": 779.80,
  RELIANCE: 2112.40,
  HUL: 512.40,
  BHARTIARTL: 541.15,
  HDFCBANK: 1522.35,
  HINDUNILVR: 2417.40,
  ITC: 207.90,
  SBIN: 430.20,
  SGBMAY29: 4719.00,
  TATAPOWER: 124.15,
  EVEREADY: 312.35,
  JUBLFOOD: 3082.65
};

/**
 * GeneralContext - The React context object.
 * The default values here are just type hints/documentation - they are NEVER actually used
 * at runtime because <GeneralContextProvider> always wraps the app before any consumer reads.
 */
const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
  availableMargin: 4043.10,
  usedMargin: 3757.30,
  openingBalance: 4043.10,
  addFunds: (amount) => {},
  withdrawFunds: (amount) => {},
  stockPrices: initialPrices,
  nifty: 22350.50,
  sensex: 73500.20,
  actionMode: "BUY",
  updateMarginOnOrder: (cost, mode) => {},
  commodityRequested: false,
  requestCommodity: () => {},
  activeApps: [],
  toggleApp: (appName) => {},
  userEmail: null,
  userName: "User",
  logout: () => {}
});

// The backend API URL - reads from environment variable or falls back to localhost
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";

/**
 * GeneralContextProvider - The actual state manager component.
 * This wraps the entire dashboard (see Home.js) and makes all state
 * available to any nested component via the useContext(GeneralContext) hook.
 */
export const GeneralContextProvider = (props) => {
  // --- Buy/Sell Window State ---
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false); // Is the trade popup visible?
  const [selectedStockUID, setSelectedStockUID] = useState("");  // Which stock is being traded?
  const [actionMode, setActionMode] = useState("BUY");           // "BUY" or "SELL"

  // --- User Identity State ---
  const [userEmail, setUserEmail] = useState(null);   // null until data loads from backend
  const [userName, setUserName] = useState("User");

  // --- Financial State ---
  const [availableMargin, setAvailableMargin] = useState(4043.10);
  const [usedMargin, setUsedMargin] = useState(3757.30);
  const [openingBalance, setOpeningBalance] = useState(4043.10);
  const [commodityRequested, setCommodityRequested] = useState(false);
  const [activeApps, setActiveApps] = useState([]);

  // --- Live Market Data State ---
  const [stockPrices, setStockPrices] = useState(initialPrices);
  const [nifty, setNifty] = useState(22350.50);
  const [sensex, setSensex] = useState(73500.20);

  /**
   * On component mount:
   * 1. Fetch the logged-in user's profile from the backend to load their financial state.
   * 2. Start a 3-second interval to simulate live market price fluctuations.
   */
  useEffect(() => {
    // Load profile from backend on mount
    axios.get(`${apiUrl}/user`).then((res) => {
      if (res.data) {
        setUserEmail(res.data.email);
        setUserName(res.data.name || "User");
        setAvailableMargin(res.data.availableMargin ?? 4043.10);
        setUsedMargin(res.data.usedMargin ?? 3757.30);
        setOpeningBalance(res.data.openingBalance ?? 4043.10);
        setCommodityRequested(res.data.commodityRequested || false);
        setActiveApps(res.data.activeApps || []);
      }
    }).catch(err => {
      console.error("Error loading user profile:", err);
      // If unauthorized (token expired/invalid), log the user out
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        logout();
      }
    });

    // Live price simulator: runs every 3 seconds
    const interval = setInterval(() => {
      // Fluctuate nifty & sensex by a small random amount
      setNifty(prev => +(prev + (Math.random() - 0.5) * 15).toFixed(2));
      setSensex(prev => +(prev + (Math.random() - 0.5) * 50).toFixed(2));

      // Fluctuate each individual stock price by a max of 0.15% per tick
      setStockPrices(prev => {
        const nextPrices = { ...prev };
        Object.keys(nextPrices).forEach(key => {
          const changePercent = (Math.random() - 0.5) * 0.003; // max 0.15% change
          nextPrices[key] = +(nextPrices[key] * (1 + changePercent)).toFixed(2);
        });
        return nextPrices;
      });
    }, 3000);

    // Cleanup: stop the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  /**
   * openBuyWindow - Called by WatchList items when user clicks Buy or Sell.
   * @param {string} uid - The stock ticker symbol (e.g., "INFY")
   * @param {string} mode - "BUY" or "SELL"
   */
  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setActionMode(mode);
  };

  /** closeBuyWindow - Hides the BuyActionWindow popup and resets the selected stock. */
  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  /**
   * addFunds - Adds funds to the user's account (called from Funds page).
   * Updates both availableMargin and openingBalance, then persists to the backend.
   * @param {number} amount - The amount to add
   */
  const addFunds = (amount) => {
    setAvailableMargin(prev => {
      const nextAvailable = +(prev + amount).toFixed(2);
      setOpeningBalance(prevOpening => {
        const nextOpening = +(prevOpening + amount).toFixed(2);
        axios.post(`${apiUrl}/user/update-margin`, {
          email: userEmail,
          availableMargin: nextAvailable,
          openingBalance: nextOpening
        }).catch(err => console.error(err));
        return nextOpening;
      });
      return nextAvailable;
    });
  };

  /**
   * withdrawFunds - Withdraws funds from the user's account (called from Funds page).
   * Only reduces availableMargin (cannot withdraw below 0).
   * @param {number} amount - The amount to withdraw
   */
  const withdrawFunds = (amount) => {
    setAvailableMargin(prev => {
      const nextAvailable = +(Math.max(0, prev - amount)).toFixed(2);
      axios.post(`${apiUrl}/user/update-margin`, {
        email: userEmail,
        availableMargin: nextAvailable
      }).catch(err => console.error(err));
      return nextAvailable;
    });
  };

  /**
   * updateMarginOnOrder - Called by BuyActionWindow immediately after a trade is placed.
   * For BUY: moves cost from availableMargin -> usedMargin.
   * For SELL: moves cost from usedMargin -> availableMargin (user gets funds back).
   * Persists the updated values to the backend.
   * @param {number} cost - Total order cost (qty * price)
   * @param {string} mode - "BUY" or "SELL"
   */
  const updateMarginOnOrder = (cost, mode) => {
    if (mode === "BUY") {
      setAvailableMargin(prevAvail => {
        const nextAvail = +(prevAvail - cost).toFixed(2);
        setUsedMargin(prevUsed => {
          const nextUsed = +(prevUsed + cost).toFixed(2);
          axios.post(`${apiUrl}/user/update-margin`, {
            email: userEmail,
            availableMargin: nextAvail,
            usedMargin: nextUsed
          }).catch(err => console.error(err));
          return nextUsed;
        });
        return nextAvail;
      });
    } else if (mode === "SELL") {
      setAvailableMargin(prevAvail => {
        const nextAvail = +(prevAvail + cost).toFixed(2);
        setUsedMargin(prevUsed => {
          const nextUsed = +(Math.max(0, prevUsed - cost)).toFixed(2);
          axios.post(`${apiUrl}/user/update-margin`, {
            email: userEmail,
            availableMargin: nextAvail,
            usedMargin: nextUsed
          }).catch(err => console.error(err));
          return nextUsed;
        });
        return nextAvail;
      });
    }
  };

  /**
   * requestCommodity - Marks the user as having requested commodity trading access.
   * Updates local state and persists to backend. One-way operation (cannot undo).
   */
  const requestCommodity = () => {
    setCommodityRequested(true);
    axios.post(`${apiUrl}/user/update-commodity`, {
      email: userEmail,
      commodityRequested: true
    }).catch(err => console.error(err));
  };

  /**
   * toggleApp - Installs or uninstalls an app from the App Directory.
   * Sends the app name to the backend which toggles it in the user's activeApps array,
   * then updates local state with the response.
   * @param {string} appName - The name of the app to toggle (e.g., "Sensibull")
   */
  const toggleApp = (appName) => {
    axios.post(`${apiUrl}/user/toggle-app`, {
      email: userEmail,
      appName
    }).then(res => {
      if (res.data) {
        setActiveApps(res.data.activeApps || []);
      }
    }).catch(err => console.error(err));
  };

  /**
   * logout - Clears the user's session and redirects to the login page.
   * Removes the JWT token from localStorage to invalidate the session,
   * then redirects to the Frontend app's /login route.
   */
  const logout = () => {
    localStorage.removeItem("token");
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL || `http://localhost:${window.location.port === "3000" ? "3001" : "3000"}`;
    window.location.href = `${frontendUrl}/login`;
  };

  /**
   * Auth Guard: If userEmail is not yet loaded (backend call pending or failed),
   * render nothing. This prevents child components from rendering without valid user data.
   * The GeneralContextProvider itself returns null, effectively showing a blank screen
   * until the user data is confirmed.
   */
  if (!userEmail) {
    return null;
  }

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        availableMargin,
        usedMargin,
        openingBalance,
        addFunds,
        withdrawFunds,
        stockPrices,
        nifty,
        sensex,
        actionMode,
        updateMarginOnOrder,
        commodityRequested,
        requestCommodity,
        activeApps,
        toggleApp,
        userEmail,
        userName,
        logout
      }}
    >
      {props.children}
      {/* Conditionally render the buy/sell popup overlay when a user clicks a stock */}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode={actionMode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
