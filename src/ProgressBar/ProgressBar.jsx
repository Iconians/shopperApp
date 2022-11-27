import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ index }) => {
  return (
    <div className="step-progress-bar-wrapper">
      <div
        className={
          "step-item completed " +
          (index === 4 ? "active " : null) +
          (index >= 5 ? " completed " : null)
        }
      >
        <div
          className={
            "step-counter " + (index === 4 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name">Cart</div>
      </div>
      <div
        className={
          "step-item " +
          (index === 5 ? "active " : null) +
          (index >= 6 ? " completed " : null)
        }
      >
        <div
          className={
            "step-counter " + (index === 5 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name ">Delivery</div>
      </div>
      <div
        className={
          "step-item " +
          (index === 6 ? "active " : null) +
          (index === 7 ? " completed " : null)
        }
      >
        <div
          className={
            "step-counter " + (index === 6 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name ">Payment</div>
      </div>
      <div className={"step-item " + (index === 6 ? "active " : null)}>
        <div
          className={
            "step-counter " + (index === 7 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name ">Confirmation</div>
      </div>
    </div>
  );
};

export default ProgressBar;
