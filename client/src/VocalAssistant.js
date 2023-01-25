import { Modal, Button, Card, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import API from './Api.js';
import ListGroup from 'react-bootstrap/ListGroup';
import { HiBellAlert } from "react-icons/hi2";
import './VocalAssistant.css'
import { AlertsModal } from "./AlertsModal.js";


function VocalAssistant(props) {
    const navigate = useNavigate();
    const [confirmSelection, setConfirmSelection] = useState("");

    const [alertsList, setAlertsList] = useState([]);
    const [callAlert, setCallAlert] = useState(0);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const handleCloseAlert = () => { setShowAlertModal(false) }


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
                scrollable
                onExit={() => {setConfirmSelection(""); setCallAlert(0); setAlertsList([]) }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Vocal Assistant
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col xs={12} md={8}>
                            <Card border="primary" body style={{ width: '600px', borderRadius: '30px' , backgroundColor:'rgb(238, 243, 243)'}}>

                                <p>
                                    What do you want me to do?
                                </p>


                                <Button onClick={() => {setConfirmSelection("send"); props.sendalert(); props.onHide() }}
                                >Send an alert for this call</Button>{' '}
                                <Button onClick={() => {setConfirmSelection("alert"); }} 
                                >Show alerts of a call</Button>{' '}
                                <Button onClick={() => { navigate('/'); }}>Show call list </Button>{' '}
                                <br />                    <br />

                                <Button onClick={() => {setConfirmSelection("open") }}
                                >View call number # </Button>{' '}
                                <Button onClick={() => {setConfirmSelection("close") }}
                                >
                                    Close this call </Button>{' '}
                            </Card>
                        </Col>
                    </Row>
                    <br />

                    <div style={{ minHeight: '150px' }}>

                        {
                            (confirmSelection === 'alert') ?

                                <>

                                    <Row>
                                        <Col xs={12} md={8}></Col>
                                        <Col xs={6} md={4}>

                                            <Card className="prova" border="secondary" body style={{ width: '200px', borderRadius: '30px' , backgroundColor:'rgb(208, 213, 213)' }}>
                                                Show alert of a call
                                            </Card>
                                        </Col>
                                    </Row>

                                    <br />
                                            <Card border="primary" body style={{ width: '400px',borderRadius: '30px' , backgroundColor:'rgb(238, 243, 243)' }}>
                                                Which call's number?
                                                <br />
                                                <br />

                                                {
                                                    props.callsActive.map((c) => <><Button onClick={() => { setCallAlert(c.id); }} >{c.id}</Button>{' '}

                                                    </>)

                                                }

                                            </Card>

                                    {(callAlert === 0) ? false :

                                        (alertsList.length > 0) ?
                                            <>

                                                <Row>
                                                    <Col xs={12} md={8}></Col>
                                                    <Col xs={6} md={4}>
                                                        {<Card className="prova" border="secondary" body style={{ width: '200px', borderRadius: '30px' , backgroundColor:'rgb(208, 213, 213)' }}>
                                                            {callAlert}
                                                        </Card>}
                                                    </Col>
                                                </Row>


                                                <br />
                                                <Card border="primary" body style={{ width: '400px' , borderRadius: '5%'}}>
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
                                                <Row>
                                                    <Col xs={12} md={8}></Col>
                                                    <Col xs={6} md={4}>
                                                        {<Card  className="prova" border="secondary" body style={{ width: '200px' }}>
                                                            {callAlert}
                                                        </Card>}
                                                    </Col>
                                                </Row>
                                                <Card className="prova" border="secondary" body style={{ width: '200px' }}>
                                                    <p className='mt-2 no-alert'>No alerts sent</p></Card></>

                                    }
                                    <AlertsModal callId={callAlert} show={showAlertModal} handleClose={handleCloseAlert} />
                                </>
                                :
                                (confirmSelection === 'open') ? <>
                                    <div>
                                        <Row>
                                            <Col xs={12} md={8}></Col>
                                            <Col xs={6} md={4}>
                                                <Card border="secondary" body style={{ width: '200px',  borderRadius: '30px' , backgroundColor:'rgb(208, 213, 213)' }}>
                                                    View call number
                                                </Card>
                                            </Col>
                                        </Row>
                                        <br />
                                    </div>
                                            <Card border="primary" body style={{ width: '400px', borderRadius: '30px' , backgroundColor:'rgb(238, 243, 243)'}}>
                                                Which call's number?
                                                <br />
                                                <br />

                                                {
                                                    props.callsActive.map((c) => <><Button onClick={() => { navigate(`/call/${c.id}`); window.location.reload() }}>{c.id}</Button>{' '}</>)
                                                }
                                            </Card>
                                        </> :
                                    (confirmSelection === 'close') ?
                                        <>
                                            <div>
                                                <Row>
                                                    <Col xs={12} md={8}></Col>
                                                    <Col xs={6} md={4}>
                                                        <Card border="secondary" body style={{ width: '200px', borderRadius: '30px' , backgroundColor:'rgb(208, 213, 213)' }}>
                                                            Close call
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <br />
                                            </div>

                                                    <Card border="primary" body style={{ width: '400px',borderRadius: '30px' , backgroundColor:'rgb(238, 243, 243)'}}>
                                                        Are you sure to Close the call?

                                                        <br />
                                                        <br />
                                                        <Button onClick={() => {
                                                            props.closecall();
                                                            navigate('/');
                                                        }}>Yes</Button>{' '}
                                                        <Button onClick={() => { props.onHide(); setConfirmSelection("") }}>No</Button>{' '}
                                                    </Card>

                                        </>
                                        :
                                        false}
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Form>
                        <Form.Control placeholder="I'm listening..." disabled />
                        
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export { VocalAssistant }