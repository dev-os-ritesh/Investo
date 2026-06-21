import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const { 
    availableMargin, 
    usedMargin, 
    openingBalance, 
    addFunds, 
    withdrawFunds,
    commodityRequested,
    requestCommodity
  } = useContext(GeneralContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showCommodityModal, setShowCommodityModal] = useState(false);
  const [amount, setAmount] = useState("");

  const quickAmounts = [1000, 5000, 10000, 25000];

  const handleAddFunds = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      addFunds(parsedAmount);
      setAmount("");
      setShowAddModal(false);
    }
  };

  const handleWithdrawFunds = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      withdrawFunds(parsedAmount);
      setAmount("");
      setShowWithdrawModal(false);
    }
  };

  const handleConfirmCommodity = () => {
    if (requestCommodity) {
      requestCommodity();
    }
    setShowCommodityModal(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h3 className="title" style={{ margin: "0 0 5px 0", fontSize: "1.5rem" }}>Funds</h3>
          <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>Manage your account balance and margins</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ marginRight: "15px", fontSize: "0.85rem", color: "#666", margin: 0 }}>Instant, zero-cost fund transfers with UPI</p>
          <button 
            className="btn btn-green" 
            style={{ border: "none", cursor: "pointer", marginRight: "10px", fontWeight: "600", borderRadius: "4px" }}
            onClick={() => { setShowAddModal(true); setShowWithdrawModal(false); setAmount(""); }}
          >
            Add funds
          </button>
          <button 
            className="btn btn-blue" 
            style={{ border: "none", cursor: "pointer", fontWeight: "600", borderRadius: "4px" }}
            onClick={() => { setShowWithdrawModal(true); setShowAddModal(false); setAmount(""); }}
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* Interactive Modal/Form Overlay for Adding Funds */}
      {showAddModal && (
        <div className="funds-modal">
          <h4 className="deposit-title">Deposit Funds</h4>
          <p className="modal-desc">Fund your account via instant UPI transfer</p>
          <form onSubmit={handleAddFunds}>
            <div className="form-group">
              <label>Enter Amount (₹)</label>
              <input 
                type="number" 
                className="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 5,000"
                min="1"
                required
              />
            </div>
            
            <label className="quick-select-label">Quick Select:</label>
            <div className="quick-select-group">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(String(amt))}
                  className={`quick-select-btn ${amount === String(amt) ? "active-deposit" : ""}`}
                >
                  +₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="modal-btn modal-btn-cancel"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="modal-btn modal-btn-deposit"
              >
                Deposit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interactive Modal/Form Overlay for Withdrawing Funds */}
      {showWithdrawModal && (
        <div className="funds-modal">
          <h4 className="withdraw-title">Withdraw Funds</h4>
          <p className="modal-desc">Transfer cash back to your registered bank account</p>
          <form onSubmit={handleWithdrawFunds}>
            <div className="form-group">
              <label>Enter Amount (₹)</label>
              <input 
                type="number" 
                className="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Max ₹${Number(availableMargin || 0).toFixed(2)}`}
                max={availableMargin || 0}
                min="1"
                required
              />
            </div>

            <label className="quick-select-label">Quick Select:</label>
            <div className="quick-select-group">
              {quickAmounts.filter(amt => amt <= (availableMargin || 0)).map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(String(amt))}
                  className={`quick-select-btn ${amount === String(amt) ? "active-withdraw" : ""}`}
                >
                  ₹{amt.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                onClick={() => setShowWithdrawModal(false)}
                className="modal-btn modal-btn-cancel"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="modal-btn modal-btn-withdraw"
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Commodity Activation Confirmation Modal */}
      {showCommodityModal && (
        <div className="funds-modal">
          <h4 className="commodity-title">Commodity Activation</h4>
          <p className="modal-desc">
            To activate commodity trading on MCX, we will link your existing demat credentials. There are no additional annual maintenance fees.
          </p>
          <div className="modal-actions">
            <button 
              type="button" 
              onClick={() => setShowCommodityModal(false)}
              className="modal-btn modal-btn-cancel"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleConfirmCommodity}
              className="modal-btn modal-btn-commodity"
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {(showAddModal || showWithdrawModal || showCommodityModal) && (
        <div 
          onClick={() => { setShowAddModal(false); setShowWithdrawModal(false); setShowCommodityModal(false); }}
          className="modal-overlay"
        />
      )}

      <div className="row" style={{ marginTop: "10px", gap: "40px", alignItems: "flex-start" }}>
        <div className="col" style={{ flex: "1.2" }}>
          <span>
            <p style={{ fontWeight: "600", fontSize: "1.25rem", color: "#333", margin: "0 0 15px 0" }}>Equity Balance</p>
          </span>

          <div className="table" style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored" style={{ fontWeight: "600" }}>₹{Number(availableMargin || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp" style={{ fontWeight: "600" }}>₹{Number(usedMargin || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp" style={{ fontWeight: "600" }}>₹{Number(availableMargin || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p style={{ fontWeight: "500" }}>₹{Number(openingBalance || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="col" style={{ flex: "0.8", alignSelf: "flex-start" }}>
          {commodityRequested ? (
            <div className="commodity-active-card">
              <span style={{ fontSize: "2rem" }}>⏳</span>
              <h4>Activation Processing</h4>
              <p>
                Your MCX commodity trading account request is being verified. It will activate within 24 business hours.
              </p>
            </div>
          ) : (
            <div className="commodity-inactive-card">
              <div className="card-header">
                <span style={{ fontSize: "1.3rem" }}>👑</span>
                <h4>Commodity Trading</h4>
              </div>
              <p>
                Unlock MCX to trade oil futures, gold bullion, silver contracts, and agricultural commodity derivatives.
              </p>
              <div className="commodity-features">
                <div>✅ <strong>10x leverage</strong> on key derivatives</div>
                <div>✅ Direct MCX integration</div>
                <div>✅ Zero setup and annual maintenance fees</div>
              </div>
              <button 
                onClick={() => setShowCommodityModal(true)}
                className="commodity-btn-activate"
              >
                Activate Account
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Funds;