import { Modal, Button, Card, Form, Row, Col } from "react-bootstrap";
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
    const [openA, setOpenA] = useState(false);
    const [openB, setOpenB] = useState(false);
    const [openC, setOpenC] = useState(false);
    const [openD, setOpenD] = useState(false);


    const [alertsList, setAlertsList] = useState([]);
    const [callAlert, setCallAlert] = useState(0);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const handleCloseAlert = () => { setShowAlertModal(false) }

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


    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                onExit={() => { setOpenA(false); setOpenB(false); setOpenC(false); setOpenD(false); setConfirmSelection(""); setCallAlert(0); setAlertsList([]) }}
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


                                <Button onClick={() => { setOpenA(!openA); setOpenB(false); setOpenC(false); setOpenD(false); setConfirmSelection("send"); props.sendalert(); props.onHide() }}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={openA}
                                >Send an alert for this call</Button>{' '}
                                <Button onClick={() => { setOpenB(!openB); setOpenA(false); setOpenC(false); setOpenD(false); setConfirmSelection("alert"); }} aria-controls="example-collapse-text"
                                    aria-expanded={openB}
                                >Show alerts of a call</Button>{' '}
                                <Button onClick={() => { navigate('/'); }}>Show call list </Button>{' '}
                                <br />                    <br />

                                <Button onClick={() => { setOpenC(!openC); setOpenA(false); setOpenB(false); setOpenD(false); setConfirmSelection("open") }} aria-controls="example-collapse-text"
                                    aria-expanded={openC}
                                >View call number # </Button>{' '}
                                <Button onClick={() => { setOpenD(!openD); setOpenA(false); setOpenB(false); setOpenC(false); setConfirmSelection("close") }} aria-controls="example-collapse-text"
                                    aria-expanded={openD}
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
                                    <Collapse in={openB} dimension="width">
                                        <div id="example-collapse-text">
                                            <Card border="primary" body style={{ width: '400px',borderRadius: '30px' , backgroundColor:'rgb(238, 243, 243)' }}>
                                                Which call's number?
                                                <br />
                                                <br />

                                                {
                                                    props.callsActive.map((c) => <><Button onClick={() => { setCallAlert(c.id); }} >{c.id}</Button>{' '}

                                                    </>)

                                                }

                                            </Card>
                                        </div>
                                    </Collapse>
                                    <br />

                                    {(callAlert == 0) ? false :

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
                                    <Collapse in={openC} dimension="width">
                                        <div id="example-collapse-text">
                                            <Card border="primary" body style={{ width: '400px', borderRadius: '30px' , backgroundColor:'rgb(238, 243, 243)'}}>
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

                                            <Collapse in={openD} dimension="width">
                                                <div id="example-collapse-text">
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