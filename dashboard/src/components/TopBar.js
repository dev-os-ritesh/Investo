import React, { useContext, useState, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import Menu from "./Menu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const LiveNumber = ({ value }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    if (value > prevValue) {
      setFlashClass("index-flash-up");
    } else if (value < prevValue) {
      setFlashClass("index-flash-down");
    }
    setPrevValue(value);

    const timer = setTimeout(() => {
      setFlashClass("");
    }, 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <span className={flashClass} style={{ transition: "all 0.3s ease", display: "inline-block", fontWeight: "700" }}>
      {value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
};

const TopBar = () => {
  const { nifty, sensex } = useContext(GeneralContext);
  
  const niftyBase = 22300.00;
  const niftyDiff = nifty - niftyBase;
  const niftyPercent = ((niftyDiff / niftyBase) * 100).toFixed(2);
  const isNiftyUp = niftyDiff >= 0;
  
  const sensexBase = 73300.00;
  const sensexDiff = sensex - sensexBase;
  const sensexPercent = ((sensexDiff / sensexBase) * 100).toFixed(2);
  const isSensexUp = sensexDiff >= 0;

  return (
    <div className="topbar-container">
      <div className="indices-container">
        {/* NIFTY 50 Card */}
        <div className="index-card">
          <div className="index-header">
            <span className="index-title">NIFTY 50</span>
            <span className={`index-change ${isNiftyUp ? "up" : "down"}`}>
              {isNiftyUp ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
              {isNiftyUp ? "+" : ""}{niftyPercent}%
            </span>
          </div>
          <div className="index-data-row">
            <span className="index-value">
              <LiveNumber value={nifty} />
            </span>
            <span className={`index-diff ${isNiftyUp ? "up" : "down"}`}>
              {isNiftyUp ? "+" : ""}{niftyDiff.toFixed(2)}
            </span>
          </div>
        </div>

        {/* SENSEX Card */}
        <div className="index-card">
          <div className="index-header">
            <span className="index-title">SENSEX</span>
            <span className={`index-change ${isSensexUp ? "up" : "down"}`}>
              {isSensexUp ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
              {isSensexUp ? "+" : ""}{sensexPercent}%
            </span>
          </div>
          <div className="index-data-row">
            <span className="index-value">
              <LiveNumber value={sensex} />
            </span>
            <span className={`index-diff ${isSensexUp ? "up" : "down"}`}>
              {isSensexUp ? "+" : ""}{sensexDiff.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;