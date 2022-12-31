import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import './App.css';
import { NavLink } from 'react-router-dom';


function CallsTable(props) {
  const [id, setCallId] = useState();

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

  return (<>
    <div className='table-container'>
      <Modal id='close-call-popup' show={showClose} onHide={handleCloseClose}>
        <Modal.Header>
          <Modal.Title>Close Call -- Call#{id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to close the Call#{id}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseClose}>
            Yes
          </Button>
          <Button variant="danger" onClick={closePopups}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal id='openagain-call-popup' show={showOpen} onHide={handleCloseOpen}>
        <Modal.Header>
          <Modal.Title>Open again Call -- Call#{id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to open again the Call#{id}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseOpen}>
            Yes
          </Button>
          <Button variant="danger" onClick={closePopups}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      <Table border='dot' hover size='sm' className='table-1'>
        <thead>
          <tr>
            <th>Call ID</th>
            <th>Status</th>
            <th>Location</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            props.calls.map((c) =>
              <CallRow call={c} key={`call-${c.id}`} handleShowClose={handleShowClose} handleShowOpen={handleShowOpen} />)
          }
        </tbody>
      </Table>
      <hr/>
    </div>
    
    <div className='table-legend'>
      <Table className='table-2' border='dot' size='sm'>
        <thead>
          <tr>
            <th>Legend</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><div><Button size='sm' disabled className='button-l' variant='success'>Open</Button> : Click to <b>open</b> the call's page </div></td></tr>
          <tr><td><Button size='sm' disabled className='button-l' variant='danger' >Close</Button> : Click to <b>terminate</b> the call</td></tr>
          <tr><td><Button size='sm' disabled className='button-l' variant='warning'>Alerts</Button> : Click to show call's <b>alerts</b></td></tr>
          <tr><td><Button size='sm' disabled className='button-l' variant='primary'>Open Again</Button> : Click to <b>open again</b> a closed call (it does NOT open the call page)</td></tr>
        </tbody>
      </Table>
    </div>
  </>
  );
}

function CallRow(props) {
  return (
    <CallData c={props.call} handleShowClose={props.handleShowClose} handleShowOpen={props.handleShowOpen} />
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
            <NavLink to={'call/' + props.c.id}><Button className='button' variant='success'>Open</Button></NavLink>
            <Button className='button' variant='danger' onClick={() => { props.handleShowClose(props.c.id) }}>Close</Button>
            <Button className='button' variant='warning'>Alerts</Button>
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