import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.0em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/images/ritesh.png"
            alt="Creator"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">Ritesh Ranbaware</h4>
          <h6>Full-Stack Developer</h6>
        </div>

        <div className="col-6 p-3">
          <p>
            Investo is independently designed and developed as a full-stack
            learning project to understand how modern trading and investment
            platforms work from an engineering perspective.
          </p>

          <p>
            The project focuses on building scalable frontend interfaces,
            backend APIs, and database-driven workflows using modern web
            technologies.
          </p>

          <p>
            This platform is built purely for educational purposes and hands-on
            practice.
          </p>

          <p>
            Connect on{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              GitHub
            </a>{" "}
            /{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
