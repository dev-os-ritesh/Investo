/**
 * TopBar.js - Top Navigation Bar with Live Market Indices
 *
 * This component renders the top horizontal bar of the dashboard.
 * It has two main parts:
 * 1. A live market indices ticker (NIFTY 50 and SENSEX) with color-coded up/down arrows.
 * 2. The <Menu /> component (left-side vertical nav) rendered at the right end.
 *
 * Data Source:
 * - `nifty` and `sensex` values come from GeneralContext, where a setInterval
 *   updates them every 3 seconds to simulate a live market feed.
 *
 * Sub-components:
 * - <LiveNumber /> - A helper component that flashes green/red when a value changes,
 *   providing a visual "ticker" animation effect.
 */
import React, { useContext, useState, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import Menu from "./Menu";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

/**
 * LiveNumber - Animated number display for market index values.
 * Watches for value changes and briefly applies a flash CSS class
 * ("index-flash-up" for green, "index-flash-down" for red) to provide
 * a visual pulse effect like a real stock ticker.
 *
 * @param {number} value - The current numeric value to display
 */
const LiveNumber = ({ value }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    // Detect direction of change to pick the correct flash color
    if (value > prevValue) {
      setFlashClass("index-flash-up");   // Green flash
    } else if (value < prevValue) {
      setFlashClass("index-flash-down"); // Red flash
    }
    setPrevValue(value);

    // Remove the flash class after 1 second to reset the animation
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
  // Pull live index values from the global context (updated every 3 seconds by GeneralContext)
  const { nifty, sensex } = useContext(GeneralContext);
  
  // --- NIFTY 50 calculations ---
  const niftyBase = 22300.00; // Hardcoded baseline to calculate day's change
  const niftyDiff = nifty - niftyBase;
  const niftyPercent = ((niftyDiff / niftyBase) * 100).toFixed(2);
  const isNiftyUp = niftyDiff >= 0;
  
  // --- SENSEX calculations ---
  const sensexBase = 73300.00; // Hardcoded baseline to calculate day's change
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
            {/* Color-coded change badge with up/down arrow icon */}
            <span className={`index-change ${isNiftyUp ? "up" : "down"}`}>
              {isNiftyUp ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
              {isNiftyUp ? "+" : ""}{niftyPercent}%
            </span>
          </div>
          <div className="index-data-row">
            {/* LiveNumber provides the animated price ticker effect */}
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

      {/* The left vertical navigation menu is rendered inside the TopBar container */}
      <Menu />
    </div>
  );
};

export default TopBar;