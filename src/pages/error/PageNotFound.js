import React from "react";
import "../../styles/PageNotFound.css";
import erro_img from "../../assets/undraw_404.svg";

function PageNotFound() {
  return (
    <>
      <main className="error-main-container">
        <div className="">
          <img alt="error_404" src={erro_img} className="error-img"></img>
          <h1 className="error-title">Page not found</h1>
          <p className="error-msg-content">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="redirect-links">
            <a href="/home" className="redirect-home">
              Go back home
            </a>
            <div className="redirect-support">
              <a href="/support">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PageNotFound;
