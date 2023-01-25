import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { Table, Button, Row, Col, Card, Image, Modal, Form } from "react-bootstrap";
import { AiFillWarning } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Shake } from 'reshake'
import SendAlert from './SendAlert';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import { AlertsModal } from './AlertsModal';

import './CallInfo.css';

import API from './Api.js';
import { VocalAssistant } from "./VocalAssistant";

export default function CallInfo(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [call, setCall] = useState('');
    const [showClose, setShowClose] = useState(false);
    const [customize, setCustomize] = useState(false);
    const [showCloseCustomize, setShowCloseCustomize] = useState(false);
    const [editParameters, setEditParameters] = useState(false);
    const [parameters, setParameters] = useState([]);
    const [discardCustomize, setDiscardCustomize] = useState(false);

    /*
    List of parameters that actually are present in our screenshots:
        hr
        spo2
        pa
        etco2
        nibp
        temp
    */


    const [showAlertModalA, setShowAlertModalA] = useState(false);
    const handleCloseAlertA = () => setShowAlertModalA(false);
    const handleShowAlertA = (callId) => {
        setShowAlertModalA(true);
    };



    const [showAlertModal, setShowAlertModal] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [newPath, setNewPath] = useState();

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [colorToast, setColorToast] = useState('success');

    useEffect(() => {
        const retrieveInfo = async (callId) => {
            const call = await API.getCallById(callId);
            setCall(call);
        }

        retrieveInfo(params.callId)


    }, [])

    const handleCloseAlert = () => {
        setShowAlertModal(false);
    }

    const handleDiscarded = () => {
        setColorToast("warning");
        setSuccessMessage("Alert correctly discarded");
        setShowSuccess(true);
    }


    const handleSent = () => {
        setColorToast("success");
        setSuccessMessage("Alert correctly sent");
        setShowSuccess(true);
    }

    const handleSentNoDesc = () => {
        setColorToast("danger");
        setSuccessMessage("Write a Description!");
        setShowSuccess(true);
    }

    const handleShowAlert = (event) => {
        setShowAlertModal(true);
    };

    // open the modal to close the call 
    const handleCloseCall = () => {
        setShowClose(true);
    }

    // confirmation to the modal to close the call
    const confirmCloseCall = () => {
        props.closeCall(call.id)
        setShowClose(false);
    }
    // abort to the modal to close the call
    const discardClose = () => {
        setShowClose(false);
    }

    // open the customize mode of the call
    const handleCustomize = (event) => {
        setCustomize(true);
        const getParams = async () => {
            // Split the string in order to obtain the list of parameters currently setted
            // Firstly, split according to "/" and take the last element of the string
            const filename = await call.img.split("/")[3];
            // Then, split again accoring to "_" in order to obtain the list of the current params
            let params = filename.split("_");
            // Finally, remove the extension from the last element of the list
            params[params.length - 1] = params[params.length - 1].split(".")[0];
            setParameters(params);
        }
        getParams();
        event.preventDefault();
    }

    // open the modal to confirm the customize
    const handleConfirmCustomize = () => {
        setShowCloseCustomize(true);
    }

    // confirmation to the customize mode of the call
    const confirmCustomize = (location) => {
        setShowCloseCustomize(false);
        setCustomize(false);
        window.location.reload();
    }

    // abort to the modal to customize the view of the call
    const discardCloseCustomize = () => {
        setShowCloseCustomize(false);
        setDiscardCustomize(false);
        setCustomize(false)
        setNewPath();
    }

    const handleEditParameters = () => {
        setEditParameters(true);
    }

    const discardEditParameters = () => {
        setEditParameters(false);
        setNewPath();
    }
    const handleDiscardCustomize = () => {
        setDiscardCustomize(true);
    }
    const discardDiscardCustomize = () => {
        setDiscardCustomize(false);
    }

    const confirmEditParameters = async (event) => {
        setEditParameters(false);
        let array_of_chosen_parameters = document.querySelectorAll("*");
        // Filter only them who are checked and i take only the names
        array_of_chosen_parameters = Array.from(array_of_chosen_parameters).filter((e) => e.checked).map((e) => e.name.toLowerCase());
        setParameters(array_of_chosen_parameters);
        // Now I can create the string
        let new_filename = `/images/${call.id}/${Array.from(array_of_chosen_parameters).join('_')}`;
        new_filename = new_filename + ".jpg";
        // I'll update my state in order to get the view effective
        setNewPath(new_filename);
        // Now I can call the API which update my DB
        await API.setPath(call.id, new_filename);
        event.preventDefault();
    }


    if (call.status === 'Closed') {
        navigate('/')
    } else {
        if (customize) {
            return <>
                <Modal show={editParameters} onHide={setEditParameters}>
                    <Modal.Header>
                        <Modal.Title>
                            Edit parameters -- Call#{call.id}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Check type="switch" className="check" label="HR" name="HR" checked disabled />
                            <Form.Check type="switch" className="check" label="SPO2" name="SPO2" checked disabled />
                            {parameters.includes('pa') ? <Form.Check type="switch" className="check" label="PA" name="PA" defaultChecked /> : <Form.Check type="switch" className="check" label="PA" name="PA" />}
                            {parameters.includes('etco2') ? <Form.Check type="switch" className="check" label="ETCO2" name="ETCO2" defaultChecked /> : <Form.Check type="switch" className="check" label="ETCO2" name="ETCO2" />}
                            {parameters.includes('nibp') ? <Form.Check type="switch" className="check" label="NIBP" name="NIBP" defaultChecked /> : <Form.Check type="switch" className="check" label="NIBP" name="NIBP" />}
                            {parameters.includes('temp') ? <Form.Check type="switch" className="check" label="TEMP" name="TEMP" defaultChecked /> : <Form.Check type="switch" className="check" label="TEMP" name="TEMP" />}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={confirmEditParameters}>
                            Yes
                        </Button>
                        <Button variant="danger" onClick={discardEditParameters}>
                            No
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal id='close-call-popup' show={showCloseCustomize} onHide={setShowCloseCustomize}>
                    <Modal.Header>
                        <Modal.Title>Confirm customize -- Call#{call.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text-center my-2'>Are you sure to edit the view of the Call#{call.id}?</Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col className='text-left'>
                                <Button variant="success width" onClick={confirmCustomize}>
                                    Yes
                                </Button>
                            </Col>
                            <Col className='text-end'>
                                <Button variant="danger" onClick={discardCloseCustomize}>
                                    No
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>

                <Modal show={discardCustomize} onHide={setDiscardCustomize}>
                    <Modal.Header>
                        <Modal.Title>Discard customize -- Call#{call.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text-center my-2'>Are you sure to discard the previous edits of the Call#{call.id}?</Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col className='text-left'>
                                <Button variant="success" onClick={discardCloseCustomize}>
                                    Yes
                                </Button>
                            </Col>
                            <Col className='text-end'>
                                <Button variant="danger" onClick={discardDiscardCustomize}>
                                    No
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>


                <Row className="nomargin">
                    <Col xs={8}>
                        <Shake v={3} h={3} r={1}>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Vitals</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!newPath ? <Image src={call.img} ></Image> : <Image src={newPath}></Image>}                                   
                                     <Button className="editparameters" onClick={handleEditParameters}>Edit parameters</Button>
                                </tbody>
                            </Table>
                        </Shake>
                    </Col>
                    <Col xs={4}>
                        <Card className='cardCustomize shadow'>
                            <Card.Header><b>Call #{call.id}</b></Card.Header>
                            <Card.Body>
                                <Card.Title>Name</Card.Title>
                                <Card.Text>{call.name}</Card.Text>
                                <Card.Title>Surname</Card.Title>
                                <Card.Text>{call.surname}</Card.Text>
                                <Card.Title>Code</Card.Title>
                                <Card.Text>{call.colorCode}</Card.Text>
                                <Card.Title>Status</Card.Title>
                                <Card.Text>{call.ambStatus}</Card.Text>
                            </Card.Body>
                        </Card>
                        <Button className="confirm" style={{ backgroundColor: "green", border: "green" }} onClick={handleConfirmCustomize}>Confirm edit</Button>

                        <Button variant="danger" className="discardDanger" onClick={handleDiscardCustomize}>Discard edit</Button>


                    </Col>
                </Row>
            </>
        }
        else {
            return <>
                {showSuccess ?  //Success toast
                    (<div className="position-relative">
                        <ToastContainer position='top-center'>
                            <Toast bg={colorToast} onClose={() => { setShowSuccess(false); }} show={showSuccess} delay={2000} autohide>
                                <Toast.Body className='text-white text-center'>{successMessage}</Toast.Body>
                            </Toast>
                        </ToastContainer>
                    </div>)
                    : false}
                <Modal id='close-call-popup' show={showClose} onHide={setShowClose}>
                    <Modal.Header>
                        <Modal.Title>Close Call -- Call#{call.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='text-center my-2'>Are you sure to close the Call#{call.id}?</Modal.Body>
                    <Modal.Footer>
                        <Row>
                            <Col className='text-left'>
                                <NavLink to={"/"}>
                                    <Button variant="success" onClick={confirmCloseCall}>
                                        Yes
                                    </Button>
                                </NavLink>
                            </Col>
                            <Col className='text-end'>
                                <Button variant="danger" onClick={discardClose}>
                                    No
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
                {showAlertModal ? <SendAlert callId={call._id} show={showAlertModal} handleClose={handleCloseAlert} handleSent={handleSent} handleDiscarded={handleDiscarded} handleSentNoDesc={handleSentNoDesc}/> : false}
                <Row className="nomargin">
                    <Col xs={8}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Vitals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!newPath ? <Image src={call.img} ></Image> : <Image src={newPath}></Image>}
                            </tbody>
                        </Table>
                    </Col>
                    <Col xs={4}>
                        <Card className='cardInfo shadow'>

                            <Card.Header><b>Call #{call.id}</b></Card.Header>
                            <Card.Body>
                                <Card.Title>Name</Card.Title>
                                <Card.Text>{call.name}</Card.Text>
                                <Card.Title>Surname</Card.Title>
                                <Card.Text>{call.surname}</Card.Text>
                                <Card.Title>Code</Card.Title>
                                <Card.Text>{call.colorCode}</Card.Text>
                                <Card.Title>Status</Card.Title>
                                <Card.Text>{call.ambStatus}</Card.Text>
                            </Card.Body>
                        </Card>
                        <Button variant="danger" className="closecall" onClick={handleCloseCall}>Close Call</Button>
                        <Button className="customize" style={{ backgroundColor: "black", border: "black" }} onClick={handleCustomize}>Customize view</Button>
                        <Button className="showalerts" style={{ backgroundColor: "orange", border: "orange" }} onClick={() => { handleShowAlertA(call.id) }}> Show Alerts</Button>

                    </Col>
                </Row>
                <br/>
                <Row className="nomargin text-sm-center mt-2">
                {showAlertModalA ? <AlertsModal callId={call.id} show={showAlertModalA} handleClose={handleCloseAlertA}/> : false}
                    <Col>
                        <Button
                            variant='primary'
                            className='vocal'
                            onClick={() => setModalShow(true)}>
                            Vocal Assistant
                            <BsFillMicFill size={20} />
                        </Button>
                        <VocalAssistant
                            closecall={confirmCloseCall}
                            sendalert={handleShowAlert}
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            callsActive={props.callsActive}
                            setModalShow={setModalShow}
                        />
                    </Col>
                    <Col>
                        <NavLink to={"/"}><Button variant="secondary" className="returncall">Return to call list</Button></NavLink>
                    </Col>
                    <Col>
                        <Button variant="warning" className="sendalert" onClick={handleShowAlert}>
                            <AiFillWarning size={30}>  </AiFillWarning>
                            Send an alert
                        </Button>
                    </Col>
                </Row>
            </>
        }
    }
}
