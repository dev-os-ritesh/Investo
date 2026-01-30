import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-5">
        <div className="col-6 p-5">
          <h1 className="fs-2 mb-5">Trust with confidence</h1>
          <h2 className="fs-4">Customer-first always</h2>
          <p className="text-muted">
            Investo is a learning-focused trading platform built to explore how modern
            investment applications work. It is designed as a hands-on project to
            understand real-world product flows and system architecture.
          </p>

          <h2 className="fs-4">The Investo ecosystem</h2>
          <p className="text-muted">
            Investo is more than a single screen—it represents an end-to-end full-stack
            implementation, covering frontend, backend APIs, and database integration
            to simulate a real-world platform.
          </p>

          <h2 className="fs-4">Learn to manage money better</h2>
          <p className="text-muted">
            Through simulated features and controlled workflows, Investo helps users
            understand investing concepts, risk awareness, and responsible decision
            making in a practical environment.
          </p>

        </div>
        <div className="col-6 p-5">
          <img src="media/images/ecosystem.png" style={{ width: "90%" }} />
          <div className="text-center">
            <a href="" className="mx-5" style={{ textDecoration: "none" }}>
              Explore our products{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="" style={{ textDecoration: "none" }}>
              Try Kite demo{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;