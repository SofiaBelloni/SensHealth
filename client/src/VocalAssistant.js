import { Modal, Button, Card } from "react-bootstrap";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { NavLink, useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import Collapse from 'react-bootstrap/Collapse'
function VocalAssistant(props) {
    const navigate = useNavigate();
    const [confirmSelection, setConfirmSelection] = useState("");
    const [open, setOpen] = useState(false);

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
                    <h4>I'm listening...</h4>
                    <Card border="primary" body style={{ width: '600px' }}>

                        <p>
                            What do you want me to do?
                        </p>


                        <Button onClick={() => { setOpen(!open); setConfirmSelection("send") }}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>Send an alert</Button>{' '}
                        <Button onClick={() => { setOpen(!open); setConfirmSelection("alert") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>Show alert of a call</Button>{' '}
                        <Button onClick={() => { navigate('/'); }} disabled={open}>Show call list </Button>{' '}
                        <br />                    <br />

                        <Button onClick={() => { setOpen(!open); setConfirmSelection("open") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>Open call number # </Button>{' '}
                        <Button onClick={() => { setOpen(!open); setConfirmSelection("close") }} aria-controls="example-collapse-text"
                            aria-expanded={open}
                            disabled={open}>
                            Close call number # </Button>{' '}
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


                                                <Button>1</Button>{' '}
                                                <Button>2</Button>{' '}
                                            </Card>
                                        </div>
                                    </Collapse></>
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

                                                <Button>1</Button>{' '}
                                                <Button>2</Button>{' '}
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
                </Modal.Footer>
            </Modal>
        </>
    );
}
export { VocalAssistant }