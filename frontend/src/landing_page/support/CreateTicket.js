import React from "react";
import {
  FaUserPlus,
  FaUser,
  FaChartBar,
  FaWallet,
  FaDesktop,
  FaCoins,
} from "react-icons/fa";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 mb-5">
          To create a ticket, select a relevant topic
        </h1>

        {/* ROW 1 */}

        <div className="col-4 p-4">
          <h4 className="d-flex align-items-center mb-3">
            <FaUserPlus className="me-2 text-primary" />
            Account Opening
            <span className="ms-2 text-muted fs-6"></span>
          </h4>

          <a href="#" className="d-block lh-lg text-decoration-none">
            Online Account Opening
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Offline Account Opening
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Company, Partnership and HUF Account Opening
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            NRI Account Opening
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Charges at Investo
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Investo IDFC FIRST Bank 3-in-1 Account
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Getting Started
          </a>
        </div>

        <div className="col-4 p-4">
          <h4 className="d-flex align-items-center mb-3">
            <FaUser className="me-2 text-primary" />
            Your Investo Account
            <span className="ms-2 text-muted fs-6"></span>
          </h4>

          <a href="#" className="d-block lh-lg text-decoration-none">
            Login Credentials
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Account Modification and Segment Addition
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            DP ID and Bank Details
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Your Profile
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Transfer and Conversion of Shares
          </a>
        </div>

        <div className="col-4 p-4">
          <h4 className="d-flex align-items-center mb-3">
            <FaChartBar className="me-2 text-primary" />
            Trading and Markets
            <span className="ms-2 text-muted fs-6"></span>
          </h4>

          <a href="#" className="d-block lh-lg text-decoration-none">
            Margin, Product and Order Types
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Web and Mobile Trading
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Trading FAQs
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Corporate Actions
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            APIs and Integrations
          </a>
        </div>

        {/* ROW 2 */}

        <div className="col-4 p-4 mt-4">
          <h4 className="d-flex align-items-center mb-3">
            <FaWallet className="me-2 text-primary" />
            Funds
            <span className="ms-2 text-muted fs-6"></span>
          </h4>

          <a href="#" className="d-block lh-lg text-decoration-none">
            Adding Funds
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Fund Withdrawal
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            eMandates
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Adding Bank Accounts
          </a>
        </div>

        <div className="col-4 p-4 mt-4">
          <h4 className="d-flex align-items-center mb-3">
            <FaDesktop className="me-2 text-primary" />
            Console
            <span className="ms-2 text-muted fs-6"></span>
          </h4>

          <a href="#" className="d-block lh-lg text-decoration-none">
            Reports
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Ledger
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Portfolio
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            IPO
          </a>
        </div>

        <div className="col-4 p-4 mt-4">
          <h4 className="d-flex align-items-center mb-3">
            <FaCoins className="me-2 text-primary" />
            Coin
            <span className="ms-2 text-muted fs-6"></span>
          </h4>

          <a href="#" className="d-block lh-lg text-decoration-none">
            Understanding Mutual Funds
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Buying and Selling
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            SIPs
          </a>
          <a href="#" className="d-block lh-lg text-decoration-none">
            Managing Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
