import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

export default function DismissableAlert(props) {
  const [Show, setShow] = useState(false);
  // TODO:Unable to use dismissible property in the Alert component.
  // Upon closing the alert the Show state gets set to false & new alert
  // fails to appear.

  useEffect(() => {
    setShow(props.showAlert);
  }, [props.showAlert]);

  return (
    <>
      {Show && (
        <Alert
          onClose={() => setShow(false)}
          variant={props.variant}
          dismissible={props.dismissible}
        >
		{(props.variant==='success') && <Alert.Heading>Great. This went through smoothly!</Alert.Heading>}
		{(props.variant==='danger') && <Alert.Heading>Oh snap! You got an error!</Alert.Heading>}
		{(props.variant==='info') && <Alert.Heading>Ah! Check the info below.</Alert.Heading>}

          <p>{props.message}</p>
        </Alert>
      )}
    </>
  );
}
