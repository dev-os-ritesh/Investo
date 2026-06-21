import React, { useState, useEffect } from "react";
import axios from "axios";

import BuyActionWindow from "./BuyActionWindow";

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
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [actionMode, setActionMode] = useState("BUY");

  // Initialize user details as null
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState("User");

  // Funds Management
  const [availableMargin, setAvailableMargin] = useState(4043.10);
  const [usedMargin, setUsedMargin] = useState(3757.30);
  const [openingBalance, setOpeningBalance] = useState(4043.10);
  const [commodityRequested, setCommodityRequested] = useState(false);
  const [activeApps, setActiveApps] = useState([]);

  // Live Prices
  const [stockPrices, setStockPrices] = useState(initialPrices);
  const [nifty, setNifty] = useState(22350.50);
  const [sensex, setSensex] = useState(73500.20);

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
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        logout();
      }
    });

    const interval = setInterval(() => {
      // Fluctuate nifty & sensex
      setNifty(prev => +(prev + (Math.random() - 0.5) * 15).toFixed(2));
      setSensex(prev => +(prev + (Math.random() - 0.5) * 50).toFixed(2));

      // Fluctuate individual stock prices
      setStockPrices(prev => {
        const nextPrices = { ...prev };
        Object.keys(nextPrices).forEach(key => {
          const changePercent = (Math.random() - 0.5) * 0.003; // max 0.15% change
          nextPrices[key] = +(nextPrices[key] * (1 + changePercent)).toFixed(2);
        });
        return nextPrices;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setActionMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

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

  const requestCommodity = () => {
    setCommodityRequested(true);
    axios.post(`${apiUrl}/user/update-commodity`, {
      email: userEmail,
      commodityRequested: true
    }).catch(err => console.error(err));
  };

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

  const logout = () => {
    localStorage.removeItem("token");
    const frontendUrl = process.env.REACT_APP_FRONTEND_URL || `http://localhost:${window.location.port === "3000" ? "3001" : "3000"}`;
    window.location.href = `${frontendUrl}/login`;
  };

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
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode={actionMode} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;