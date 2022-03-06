import { Alert } from 'react-bootstrap';

export default function DismissableAlert(props) {

  return (
    <>
      {props.showAlert && (
        <Alert
          onClose={props.closeAlert}
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
