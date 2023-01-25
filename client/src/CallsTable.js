import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Card, OverlayTrigger, Table, Tooltip, Row, Col } from 'react-bootstrap';
import './App.css';
import { NavLink } from 'react-router-dom';
import { AlertsModal } from './AlertsModal';
import './CallsTable.css';

function CallsTable(props) {
  const [id, setCallId] = useState();
  const [filterId, setFilterId] = useState(false);
  const [filterStatus, setFilterStatus] = useState(true);

  /* Tooltip used for headers */
  const renderTooltipIdAscending = (props) => (
    <Tooltip id="button-tooltip" {...props}>Click for ascending order</Tooltip>
  );

  const renderTooltipDescending = (props) => (
    <Tooltip id="button-tooltip" {...props}>Click for descending order</Tooltip>
  );

  const renderTooltipLocation = (props) => (
    <Tooltip id="button-tooltip" {...props}>This is the Location where the Ambulance arrived</Tooltip>
  );

  const renderTooltipTime = (props) => (
    <Tooltip id="button-tooltip" {...props}>This is the time when calls were <b>first</b> opened </Tooltip>
  );

  const renderTooltipActions = (props) => (
    <Tooltip id="button-tooltip" {...props}>These are the actions possible for each call. See the legend down below</Tooltip>
  );


  const handleFilterId = () => {
    setFilterId(!filterId);
    if (!filterId) props.orderCallsbyId();
    else props.orderCallsbyIdDesc();
  }

  const handleFilterStatus = () => {
    setFilterStatus(!filterStatus);
    if (!filterStatus) props.orderCallsbyClosed();
    else props.orderCallsbyActive();
  }



  /* 2 modal to save changes (Close & Open Again) */
  const [showClose, setShowClose] = useState(false);
  const handleCloseClose = () => {
    props.closeCall(id);
    setShowClose(false);
  }
  const handleShowClose = (callId) => {
    setShowClose(true);
    setCallId(callId);
  }

  const [showOpen, setShowOpen] = useState(false);
  const handleCloseOpen = () => {
    props.openCall(id);
    setShowOpen(false);
  }
  const handleShowOpen = (callId) => {
    setShowOpen(true);
    setCallId(callId);
  }

  const closePopups = () => {
    setShowClose(false);
    setShowOpen(false);
  }

  const [showAlertModal, setShowAlertModal] = useState(false);
  const handleCloseAlert = () => setShowAlertModal(false);
  const handleShowAlert = (callId) => {
    setShowAlertModal(true);
    setCallId(callId);
  };

  return (<>
    <div className='table-container'>
      <Modal id='close-call-popup' show={showClose} onHide={closePopups}>
        <Modal.Header>
          <Modal.Title>Close Call -- Call#{id}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center my-2'>Are you sure to close the Call#{id}?</Modal.Body>
        <Modal.Footer>
          <Row>
            <Col className='text-left'>
              <Button variant="success" onClick={handleCloseClose}>
                Yes
              </Button>
            </Col>
            <Col className='text-end'>
              <Button variant="danger" onClick={closePopups}>
                No
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      <Modal id='openagain-call-popup' show={showOpen} onHide={closePopups}>
        <Modal.Header>
          <Modal.Title>Open again Call -- Call#{id}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center my-2'>Are you sure to open again the Call#{id}?</Modal.Body>
        <Modal.Footer>
          <Row>
            <Col className='text-left'>
              <Button variant="success" onClick={handleCloseOpen}>
                Yes
              </Button>
            </Col>
            <Col className='text-end'>
              <Button variant="danger" onClick={closePopups}>
                No
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      {showAlertModal ? <AlertsModal callId={id} show={showAlertModal} handleClose={handleCloseAlert}/> : false}
      <Card className='cardMain shadow'>
      <Table hover size='sm' className='table-1' borderless responsive="md" striped>
        <thead>
          <tr>
            <th>Call ID
              {filterId ?
                <OverlayTrigger placement="top" delay={{ show: 150, hide: 200 }} overlay={renderTooltipIdAscending} >
                  <Button variant='text' onClick={handleFilterId}><i className="bi bi-sort-numeric-up"></i></Button>
                </OverlayTrigger>
                :
                <OverlayTrigger placement="top" delay={{ show: 150, hide: 200 }} overlay={renderTooltipDescending} >
                  <Button variant='text' onClick={handleFilterId}><i className="bi bi-sort-numeric-down-alt"></i></Button>
                </OverlayTrigger>
              }
            </th>
            <th>Status
              {filterStatus ?
                <OverlayTrigger placement="top" delay={{ show: 150, hide: 200 }} overlay={renderTooltipIdAscending} >
                  <Button variant='text' onClick={handleFilterStatus} ><i className="bi bi-sort-alpha-up"></i></Button>
                </OverlayTrigger>
                :
                <OverlayTrigger placement="top" delay={{ show: 150, hide: 200 }} overlay={renderTooltipDescending} >
                  <Button variant='text' onClick={handleFilterStatus}><i className="bi bi-sort-alpha-down-alt"></i></Button>
                </OverlayTrigger>
              }
            </th>
            <th>Location
              <OverlayTrigger placement="top" delay={{ show: 150, hide: 200 }} overlay={renderTooltipLocation} >
                <Button variant='text' ><i className="bi bi-info-circle"></i></Button>
              </OverlayTrigger>
            </th>
            <th>Time
              <OverlayTrigger placement="top" delay={{ show: 150, hide: 200 }} overlay={renderTooltipTime} >
                <Button variant='text' ><i className="bi bi-info-circle"></i></Button>
              </OverlayTrigger>
            </th>
            <th>Actions
              <OverlayTrigger placement="top" delay={{ show: 150, hide: 200 }} overlay={renderTooltipActions} >
                <Button variant='text'><i className="bi bi-info-circle"></i></Button>
              </OverlayTrigger>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            props.calls.map((c) =>
              <CallRow call={c} key={`call-${c.id}`} handleShowClose={handleShowClose} handleShowOpen={handleShowOpen} handleShowAlert={handleShowAlert}/>)
          }
        </tbody>
      </Table>
      </Card>
      <hr />
    </div>

    <div className='table-legend'>
    <Card className='cardMain shadow'>

      <Table className='table-2' borderless size='sm' >
        <thead>
          <tr>
            <th>Legend</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><div><Button size='sm' disabled className='button-l' variant='success'>View</Button> : Click to <b>view</b> the call's page </div></td></tr>
          <tr><td><Button size='sm' disabled className='button-l' variant='danger' >Close</Button> : Click to <b>terminate</b> the call</td></tr>
          <tr><td><Button size='sm' disabled className='button-l' variant='warning'>Alerts</Button> : Click to show call's <b>alerts</b></td></tr>
          <tr><td><Button size='sm' disabled className='button-l' variant='primary'>Open Again</Button> : Click to <b>open again</b> a closed call (it does NOT open the call page)</td></tr>
        </tbody>
      </Table>
      </Card>
    </div>
  </>
  );
}

function CallRow(props) {
  return (
    <CallData c={props.call} handleShowClose={props.handleShowClose} handleShowOpen={props.handleShowOpen} handleShowAlert={props.handleShowAlert}/>
  );
}

function CallData(props) {
  return (
    <tr>
      <td>{props.c.id}</td>
      <td>{props.c.status}</td>
      <td>{props.c.location}</td>
      <td>{props.c.time}</td>
      <td>
        {props.c.status === 'Active' ?
          <div>
            <NavLink to={'call/' + props.c.id}><Button className='button' variant='success'>View</Button></NavLink>
            <Button className='button' variant='danger' onClick={() => { props.handleShowClose(props.c.id) }}>Close</Button>
            <Button className='button' variant='warning' onClick={() => { props.handleShowAlert(props.c.id) }}>Alerts</Button>
          </div>
          :
          <div>
            <Button className='button' variant='primary' onClick={() => { props.handleShowOpen(props.c.id) }}>Open Again</Button>
          </div>
        }
      </td>
    </tr>
  );
}

export default CallsTable;