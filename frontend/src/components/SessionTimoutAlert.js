import React from "react";
import Modal from "./Modal";

const SessionTimeoutAlert = ({ proceed, logout }) => (
  <Modal>
    <h1>Session timedout</h1>
    <p>Session expired. You have few seconds and you will be logged out</p>
    <div>
      <button>Yes, Logout</button>
      <button>Proceed</button>
    </div>
  </Modal>
);

export default SessionTimeoutAlert;
