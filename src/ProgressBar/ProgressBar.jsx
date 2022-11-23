import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({ index }) => {
  return (
    <div className="step-progress-bar-wrapper">
      <div
        className={
          "step-item completed " +
          (index === 1 ? "active " : null) +
          (index >= 2 ? " completed " : null)
        }
      >
        <div
          className={
            "step-counter " + (index === 1 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name">Cart</div>
      </div>
      <div
        className={
          "step-item " +
          (index === 2 ? "active " : null) +
          (index >= 3 ? " completed " : null)
        }
      >
        <div
          className={
            "step-counter " + (index === 2 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name ">Delivery</div>
      </div>
      <div
        className={
          "step-item " +
          (index === 3 ? "active " : null) +
          (index === 4 ? " completed " : null)
        }
      >
        <div
          className={
            "step-counter " + (index === 3 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name ">Payment</div>
      </div>
      <div className={"step-item " + (index === 3 ? "active " : null)}>
        <div
          className={
            "step-counter " + (index === 3 ? "step-counter-active " : null)
          }
        ></div>
        <div className="step-name ">Confirmation</div>
      </div>
    </div>
  );
};

export default ProgressBar;
