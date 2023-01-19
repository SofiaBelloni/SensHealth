import { Modal, Button, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import API from './Api.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { HiBellAlert } from "react-icons/hi2";
import './VocalAssistant.css'
import { AlertsModal } from "./AlertsModal.js";

function VocalAssistant(props) {
    const navigate = useNavigate();
    const [confirmSelection, setConfirmSelection] = useState("");
    const [open, setOpen] = useState(false);
    const [alertsList, setAlertsList] = useState([]);
    const [callAlert, setCallAlert] = useState(0);
    const [show,setShow]=useState(true);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const handleCloseAlert = () => {setShowAlertModal(false)}

    const handleShowAlert = () => {
            setShowAlertModal(true);
        };

    useEffect(() => {
        const retrieveInfo = async () => {
            const list = await API.getAlerts(callAlert);
            setAlertsList(list);
        }
        retrieveInfo();
    }, [callAlert]);
    useEffect(() => {
        setTimeout(() => setShow(true), 10000);
      }, [show]);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                onExit={() => { setOpen(false); setConfirmSelection(""); setCallAlert(0); setAlertsList([]) }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Vocal Assistant
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Card border="primary" body style={{ width: '600px' , borderRadius: '10%'}}>

                        <p>
                            What do you want me to do?
                        </p>


                        <Button onClick={() => { setOpen(!open); setConfirmSelection("send"); props.sendalert(); props.onHide() }}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            >Send an alert for this call</Button>{' '}
                        <Button onClick={() => { setOpen(!open); setConfirmSelection("alert"); setShow(false)}} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            >Show alerts of a call</Button>{' '}
                        <Button onClick={() => { navigate('/'); }} disabled={open}>Show call list </Button>{' '}
                        <br />                    <br />

                        <Button onClick={() => { setOpen(!open); setConfirmSelection("open") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            >View call number # </Button>{' '}
                        <Button onClick={() => { setOpen(!open); setConfirmSelection("close") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            >
                            Close this call </Button>{' '}
                    </Card>
                    <br />

                    <div style={{ minHeight: '150px' }}>

                        {(confirmSelection === 'send') ?
                            <>
                                <Collapse in={open} dimension="width">
                                    <div id="example-collapse-text">
                                        <Card border="secondary" body style={{ width: '200px' ,borderRadius: '20%'}}>
                                            Send an alert
                                        </Card>
                                    </div>
                                </Collapse>
                                <br />
                                {/*
                                <Collapse in={open} dimension="width">
                                    <div id="example-collapse-text">
                                        <Card border="primary" body style={{ width: '400px' }}>
                                            Are you sure to send an Alert?
                                            <br />
                                            <br />

                                            <Button onClick={() => { props.sendalert(); props.onHide() }}>Yes</Button>{' '}
                                            <Button onClick={() => { props.onHide(); setConfirmSelection("") }}>No</Button>{' '}
                                        </Card>
                                    </div>
                                </Collapse>*/
                                }
                            </> :
                            (confirmSelection === 'alert') ?

                                <>
                                    <div>

                                        <Card className="prova" border="secondary" body style={{ width: '200px',borderRadius: '20%' }}>
                                            Show alert of a call
                                        </Card>
                                    </div>
                                    <br />
                                    <Collapse in={open} dimension="width">
                                        <div id="example-collapse-text">
                                            <Card border="primary" body style={{ width: '400px' , borderRadius: '10%'}}>
                                                Which call's number?
                                                <br />
                                                <br />

                                                {
                                                    props.callsActive.map((c) => <><Button onClick={() => { setCallAlert(c.id);}} >{c.id}</Button>{' '}

                                                    </>)

                                                }

                                            </Card>
                                        </div>
                                    </Collapse>
                                    <br />

                                    {(callAlert == 0) ? false :
                                    
                                        (alertsList.length > 0) ?
                                            <>
                                                <div>
                                                    {show && <Card border="secondary" body style={{ width: '200px' }}>
                                                        {callAlert}
                                                    </Card>}
                                                    
                                                </div>
                                                <br />
                                                <Card border="primary" body style={{ width: '400px' }}>
                                                    <ListGroup >
                                                        {
                                                            alertsList.map((alert, index) => <ListGroup.Item className="additional-details" as="li" key={index}> <p className='mb-1 bold'><HiBellAlert /> ALERT #{index + 1}:</p>
                                                                <div className='ms-4'>
                                                                    <span>DEPARTMENT: </span>
                                                                    <span className='bold'>{alert.department} </span>
                                                                </div>
                                                                <div className='ms-4'>
                                                                    <span>DESCRIPTION: </span>
                                                                    <span>{alert.description} </span>
                                                                </div>
                                                                <hr /></ListGroup.Item>)
                                                        }
                                                    </ListGroup></Card></> : <>
                                                <Card border="secondary" body style={{ width: '200px' }}>
                                                    <p className='mt-2 no-alert'>No alerts sent</p></Card></>
                                                  
                                    }
<AlertsModal callId={callAlert} show={showAlertModal} handleClose={handleCloseAlert}/>
                                </>
                                :
                                (confirmSelection === 'open') ? <>
                                    <div>

                                        <Card border="secondary" body style={{ width: '200px',borderRadius: '20%' }}>
                                            View call number
                                        </Card>
                                        <br />
                                    </div>
                                    <Collapse in={open} dimension="width">
                                        <div id="example-collapse-text">
                                            <Card border="primary" body style={{ width: '400px' ,borderRadius: '10%'}}>
                                                Which call's number?
                                                <br />
                                                <br />

                                                {
                                                    props.callsActive.map((c) => <><Button onClick={() => { navigate(`/call/${c.id}`); window.location.reload() }}>{c.id}</Button>{' '}</>)
                                                }
                                            </Card>
                                        </div>
                                    </Collapse></> :
                                    (confirmSelection === 'close') ?
                                        <>
                                            <div>

                                                <Card border="secondary" body style={{ width: '200px' ,borderRadius: '20%'}}>
                                                    Close call
                                                </Card>
                                                <br />
                                            </div>

                                            <Collapse in={open} dimension="width">
                                                <div id="example-collapse-text">
                                                    <Card border="primary" body style={{ width: '400px' ,borderRadius: '10%'}}>
                                                        Are you sure to Close the call?

                                                        <br />
                                                        <br />
                                                        <Button onClick={() => {
                                                            props.closecall();
                                                            navigate('/');
                                                        }}>Yes</Button>{' '}
                                                        <Button onClick={() => { props.onHide(); setConfirmSelection("") }}>No</Button>{' '}
                                                    </Card>
                                                </div>
                                            </Collapse>
                                        </>
                                        :
                                        false}
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    {/*<Button onClick={props.onHide}>Close</Button>*/}
                    <Form>
                        <Form.Control placeholder="I'm listening..." disabled />
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export { VocalAssistant }