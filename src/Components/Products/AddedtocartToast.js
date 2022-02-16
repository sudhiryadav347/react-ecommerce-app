import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";


const ExampleToast = ({ children }) => {
    const [show, toggleShow] = useState(false);
  
    return (
      <div>
        {!show && <Button onClick={() => toggleShow(true)} variant="secondary">Show Toast</Button>}
        <Toast show={show} onClose={() => toggleShow(false)} className="my-3">
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{children}</Toast.Body>
        </Toast>
      </div>
    );
  };

  export default ExampleToast;