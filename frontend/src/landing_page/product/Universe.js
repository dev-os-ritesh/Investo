import React from "react";
import { Link } from "react-router-dom";


function Universe() {
  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Investo Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
        
      <div className="row text-center justify-content-center">
        <div className="col-4 p-3 mt-5">
          <img src="media/images/smallcaseLogo.png" />
          <p className="text-small text-muted mt-3">Thematic investment platform</p>
        </div>

        <div className="col-4 p-3 mt-5 " style={{ width: "160px", height: "100px" }}>
            <img
              src="media/images/streakLogo.png"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />         
          <p className="text-small text-muted mb-5 text-nowrap mt-4">Algo & strategy platform</p>
        </div>


        <div className="col-4 p-3 mt-5"> 
          <img src="media/images/sensibullLogo.svg" />
          <p className="text-small text-muted text-nowrap mt-4">Options Trading platform</p>
        </div>
        </div>
      
        <div className="row text-center justify-content-center">
        <div className="col-4 p-3 mt-5 " style={{ width: "160px", height: "100px" }}>
          <img
              src="media/images/zerodhaFundhouse.png"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            /> 
          <p className="text-small text-muted text-nowrap mt-4"> Asset Management</p>
        </div>


        <div className="col-4 p-3 mt-5">
          <img src="media/images/goldenpiLogo.png" />
          <p className="text-small text-muted mt-3">Bonds trading platform</p>
        </div>


        <div className="col-4 p-3 mt-5" style={{ width: "160px", height: "100px" }}>
           <img
              src="media/images/dittoLogo.png"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            /> 
          <p className="text-small text-muted mt-2">Insurance</p>
        </div>
        </div>

       <Link
         to="/signup"
        className="p-2 btn btn-primary fs-5"
        style={{ width: "20%", margin: "0 auto" }}
          >
        Signup Now
        </Link>

      </div>
    </div>
  );
}

export default Universe;