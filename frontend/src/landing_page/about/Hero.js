import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        <h1 className="fs-2 text-center">
          Built to understand modern investing platforms
          <br />
          Driven by learning, technology, and real-world practice.
        </h1>
      </div>

      <div
        className="row p-5 mt-5 border-top text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.0em" }}
      >
        <div className="col-6 p-5">
          <p>
            Investo is a self-developed full-stack project created to explore how
            trading and investment platforms are designed and built. The goal of
            this project is to break down complex financial systems into
            understandable, hands-on components.
          </p>

          <p>
            The platform focuses on implementing core concepts such as user
            flows, order handling logic, API design, and database integration
            using modern web technologies.
          </p>

          <p>
            Through this project, real-world challenges in scalability,
            performance, and system architecture are explored in a controlled
            learning environment.
          </p>
        </div>

        <div className="col-6 p-5">
          <p>
            Investo also serves as a practical playground to experiment with UI
            design, backend services, and secure data handling commonly used in
            financial applications.
          </p>

          <p>
            The project is continuously improved by adding new simulated
            features, refining workflows, and following best practices in
            full-stack development.
          </p>

          <p>
            Investo is built purely for educational purposes and is not intended
            for real trading or financial transactions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
