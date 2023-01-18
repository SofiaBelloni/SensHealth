import { Modal, Button, Card, Form } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { NavLink, useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import API from './Api.js';
import Info from './AlertsModal';
import ListGroup from 'react-bootstrap/ListGroup';
import { HiBellAlert } from "react-icons/hi2";



function VocalAssistant(props) {
    const navigate = useNavigate();
    const [confirmSelection, setConfirmSelection] = useState("");
    const [open, setOpen] = useState(false);
    const [alertsList, setAlertsList] = useState([]);
    const [callAlert, setCallAlert] = useState(0);


    useEffect(() => {
        const retrieveInfo = async () => {
            const list = await API.getAlerts(callAlert);
            setAlertsList(list);
        }
        retrieveInfo();
    }, [callAlert]);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onExit={() => { setOpen(false); setConfirmSelection("") }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Vocal Assistant
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card border="primary" body style={{ width: '600px' }}>

                        <p>
                            What do you want me to do?
                        </p>


                        <Button onClick={() => { setOpen(!open); setConfirmSelection("send") }}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>Send an alert for this call</Button>{' '}
                        <Button onClick={() => { setOpen(!open); setConfirmSelection("alert") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>Show alert for this call</Button>{' '}
                        <Button onClick={() => { navigate('/'); }} disabled={open}>Show call list </Button>{' '}
                        <br />                    <br />

                        <Button onClick={() => { setOpen(!open); setConfirmSelection("open") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>View call number # </Button>{' '}
                        <Button onClick={() => { setOpen(!open); setConfirmSelection("close") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>
                            Close this call </Button>{' '}
                    </Card>
                    <br />

                    <div style={{ minHeight: '150px' }}>

                        {(confirmSelection === 'send') ?
                            <>
                                <Collapse in={open} dimension="width">
                                    <div id="example-collapse-text">
                                        <Card border="secondary" body style={{ width: '200px' }}>
                                            Send an alert
                                        </Card>
                                    </div>
                                </Collapse>
                                <br />

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
                                </Collapse>

                            </> :
                            (confirmSelection === 'alert') ?

                                <>
                                    <div>

                                        <Card border="secondary" body style={{ width: '200px' }}>
                                            Show alert of a call
                                        </Card>
                                    </div>
                                    <br />
                                    <Collapse in={open} dimension="width">
                                        <div id="example-collapse-text">
                                            <Card border="primary" body style={{ width: '400px' }}>
                                                Which call's number?
                                                <br />
                                                <br />

                                                {
                                                    props.callsActive.map((c) => <><Button onClick={() => { setCallAlert(c.id) }} disabled={callAlert !== 0}>{c.id}</Button>{' '}

                                                    </>)

                                                }

                                            </Card>
                                        </div>
                                    </Collapse>
                                    <br />

                                    {(alertsList.length !== 0) ? <>
                                        <div>

                                            <Card border="secondary" body style={{ width: '200px' }}>
                                                {callAlert}
                                            </Card>
                                        </div>
                                        <br/>
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
                                            <p className='mt-2 no-alert'>No alerts sent</p></Card></>}

                                </>
                                :
                                (confirmSelection === 'open') ? <>
                                    <div>

                                        <Card border="secondary" body style={{ width: '200px' }}>
                                            Open call number
                                        </Card>
                                    </div>
                                    <Collapse in={open} dimension="width">
                                        <div id="example-collapse-text">
                                            <Card border="primary" body style={{ width: '400px' }}>
                                                Which call's number?
                                                <br />
                                                <br />

                                                {
                                                    props.callsActive.map((c) => <><Button onClick={() => { navigate(`/call/${c.id}`) }}>{c.id}</Button>{' '}</>)
                                                }
                                            </Card>
                                        </div>
                                    </Collapse></> :
                                    (confirmSelection === 'close') ?
                                        <>
                                            <div>

                                                <Card border="secondary" body style={{ width: '200px' }}>
                                                    Close call
                                                </Card>
                                            </div>

                                            <Collapse in={open} dimension="width">
                                                <div id="example-collapse-text">
                                                    <Card border="primary" body style={{ width: '400px' }}>
                                                        Are you sure to Close the call?


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