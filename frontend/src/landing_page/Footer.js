import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250, 250, 250)" }}>
      <div className="container border-top mt-5">
        <div className="row mt-5">
          <div className="col">
            <img src="media/images/investo.png" style={{ width: "50%" }} />
            <p>
              &copy; 2025-2030, Investo Broking Ltd. All rights reserved.
            </p>
          </div>
          <div className="col">
            <p>Company</p>
            <a href="">About</a>
            <br />
            <a href="">Products</a>
            <br />
            <a href="">Pricing</a>
            <br />
            <a href="">Referral programme</a>
            <br />
            <a href="">Careers</a>
            <br />
            <a href="">Investo.tech</a>
            <br />
            <a href="">Press & media</a>
            <br />
            <a href="">Investo cares (CSR)</a>
            <br />
          </div>
          <div className="col">
            <p>Support</p>
            <a href="">Contact</a>
            <br />
            <a href="">Support portal</a>
            <br />
            <a href="">i-Connect blog</a>
            <br />
            <a href="">List of charges</a>
            <br />
            <a href="">Downloads & resources</a>
            <br />
          </div>
          <div className="col">
            <p>Account</p>
            <a href="">Open an account</a>
            <br />
            <a href="">Fund transfer</a>
            <br />
            <a href="">60 day challenge</a>
            <br />
          </div>
        </div>
        <div className="mt-5 text-muted" style={{ fontSize: "14px" }}>
        <p>
          Investo is a self-built educational project created to understand how a
          modern trading and investment platform works. This application is developed
          solely for learning and hands-on practice purposes, including frontend,
          backend, and database integration. Investo is not a registered broker, does
          not provide real trading services, and is not affiliated with NSE, BSE, SEBI,
          or any other financial institution.
        </p>

        <p>
          No real money transactions are supported on this platform. All data shown
          within the application is either mock, simulated, or used for demonstration
          purposes only.
        </p>

        <p>
          Investments in the securities market are subject to market risks. This
          project does not offer investment advice, stock tips, or portfolio
          management services.
        </p>

        <p>
          This project is independently developed by the creator for educational
          purposes. Any resemblance to real trading platforms is purely coincidental.
          Users are advised to use this application only for learning and practice.
        </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;