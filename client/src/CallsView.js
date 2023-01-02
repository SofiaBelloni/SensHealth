import { Row, Col, Toast, ToastContainer } from 'react-bootstrap'
import CallsTable from './CallsTable';
import './App.css'

function CallsView(props) {
  return (
    <>
      <Row>
      <ToastContainer position='top-end'>
      <Toast className='toast-1' onClose={() => props.setShow(false)} show={props.show} delay={3000} autohide>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">
            { props.action[1] === "Closed" ?
                'Call closed!'
              :
                'Call opened again!'
            }
          </strong>
          <small>now</small>
        </Toast.Header>
        <Toast.Body>Call #{props.action[0]} now <b>{props.action[1]}</b>!</Toast.Body>
      </Toast>
      </ToastContainer>
        <Col>
          {props.loading ?
            <div><br /><h1 className='title-list'>CALL LIST</h1>
              <CallsTable classname="calls-table" calls={props.calls} openCall={props.openCall} closeCall={props.closeCall} orderCallsbyId={props.orderCallsbyId} orderCallsbyIdDesc={props.orderCallsbyIdDesc} orderCallsbyActive={props.orderCallsbyActive} orderCallsbyClosed={props.orderCallsbyClosed} /></div>
            :
            <div />}
        </Col>
      </Row>
    </>
  );
}

export { CallsView }