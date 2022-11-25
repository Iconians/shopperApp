import React from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import InputBase from "../InputBase/InputBase";
import "./ConfirmationComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ConfirmationComponent = ({ backPage }) => {
  return (
    <div className="confirmation-comp-parent-div">
      <div className="confirmation-title">
        <h4>CONFIRMATION</h4>
        <hr />
      </div>
      <div className="confirmation-body">
        <div className="checkmark">
          {<FontAwesomeIcon className="checkMark" icon={faCheckCircle} />}
        </div>
        <div className="main-text-body">
          <h3>
            Congratutions. <br /> Your Order is accepted.
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            dolor assumenda neque ipsam, in aliquam animi nulla, quis ducimus
          </p>
        </div>
        <div className="track-order-btn">
          <InputBase type="submit" value="TRACK ORDER" />
        </div>
        <div className="back-home-btn">
          <InputBase
            type="submit"
            value="BACK TO HOME PAGE"
            onClick={backPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationComponent;
