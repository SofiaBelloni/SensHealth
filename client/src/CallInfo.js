import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import {Table, Button, Row, Col, Card, Image, Modal, Nav, Form} from "react-bootstrap";
import {AiFillWarning } from "react-icons/ai";
import {BsFillMicFill} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Shake, ShakeLittle, ShakeSlow } from 'reshake'
import SendAlert from './SendAlert';

import './CallInfo.css';

import API from './Api.js';

export default function CallInfo(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [call, setCall] = useState('');
    const [showClose, setShowClose] = useState(false);
    const [customize, setCustomize] = useState(false);
    const [showCloseCustomize, setShowCloseCustomize] = useState(false);
    const [editParameters, setEditParameters] = useState(false);
    const [parameters, setParameters] = useState([]);

    /*
    List of parameters that actually are present in our screenshots:
        hr
        spo2
        pa
        etco2
        nibp
        temp
    */

    const [showAlertModal, setShowAlertModal] = useState(false);

    useEffect(() => {
        const retrieveInfo = async (callId) => {
            const call = await API.getCallById(callId);
            setCall(call);
        }
        
        retrieveInfo(params.callId)
        console.log(call);
        
    }, [])

    const handleCloseAlert = () => setShowAlertModal(false);

    const handleShowAlert = () => {
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
        console.log(parameters)
        console.log(parameters.includes('hr'));
        event.preventDefault();
    }

    // open the modal to confirm the customize
    const handleConfirmCustomize = () => {
        setShowCloseCustomize(true);
    }

    // confirmation to the customize mode of the call
    const confirmCustomize = (location) =>{
        setShowCloseCustomize(false);
        setCustomize(false);
        window.location.reload();
    }

    // abort to the modal to customize the view of the call
    const discardCloseCustomize = () => {
        setShowCloseCustomize(false);
    }

    const handleEditParameters = () => {
        setEditParameters(true);
    }

    const discardEditParameters = () => {
        setEditParameters(false);
    }

    const confirmEditParameters = async(event) => {
        setEditParameters(false);
        let array_of_chosen_parameters = document.querySelectorAll("*");
        // Filter only them who are checked and i take only the names
        array_of_chosen_parameters = Array.from(array_of_chosen_parameters).filter((e) => e.checked).map((e) => e.name.toLowerCase());
        // Now I can create the string
        let new_filename = `/images/${call.id}/${Array.from(array_of_chosen_parameters).join('_')}`;
        new_filename = new_filename + ".jpg";
        // Now I can call the API which update my DB
        await API.setPath(call.id, new_filename);
        event.preventDefault();
    }
    

    if(call.status === 'Closed') {
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
                        {parameters.includes('hr') ? <Form.Check type="switch" className="check" label="HR" name="HR" defaultChecked/> : <Form.Check type="switch" className="check" label="HR" name="HR" />}
                        {parameters.includes('spo2') ? <Form.Check type="switch" className="check" label="SPO2" name="SPO2" defaultChecked /> : <Form.Check type="switch" className="check" label="SPO2" name="SPO2" />}
                        {parameters.includes('pa') ? <Form.Check type="switch" className="check" label="PA" name="PA" defaultChecked/> : <Form.Check type="switch" className="check" label="PA" name="PA"/>}
                        {parameters.includes('etco2') ? <Form.Check type="switch" className="check" label="ETCO2" name="ETCO2" defaultChecked/> : <Form.Check type="switch" className="check" label="ETCO2" name="ETCO2"/>}
                        {parameters.includes('nibp') ? <Form.Check type="switch" className="check" label="NIBP" name="NIBP" defaultChecked/> : <Form.Check type="switch" className="check" label="NIBP" name="NIBP"/>}
                        {parameters.includes('temp') ? <Form.Check type="switch" className="check" label="TEMP" name="TEMP" defaultChecked/> : <Form.Check type="switch" className="check" label="TEMP" name="TEMP"/>}
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
                <Modal.Body>Are you sure to edit the view of the Call#{call.id}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={confirmCustomize}>
                        Yes
                    </Button>
                    <Button variant="danger" onClick={discardCloseCustomize}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col xs={9}>
                    <Shake v={3} h={3} r={1}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Vitals</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Image src={call.img} fluid></Image>
                                <Button onClick={handleEditParameters}>Edit parameters</Button>
                            </tbody>
                        </Table>
                    </Shake>
                </Col>
                <Col xs={3}>
                    <Card>
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
                    <Shake v={3} h={3} r={1}>
                        <Button variant="danger"> Close Call</Button>
                    </Shake>
                    <Button variant="info" onClick={handleConfirmCustomize}>Confirm</Button>
                </Col>
            </Row>
            <Shake v={0} h={1} r={1}>
                <Row>
                    <Col>
                        <BsFillMicFill></BsFillMicFill>
                    </Col>
                    <Col>
                        <Button variant="secondary">Return to call list</Button>
                    </Col>
                    <Col>
                        <Button variant="warning">
                            <AiFillWarning>  </AiFillWarning>
                            Send an alert    
                        </Button>
                    </Col>
                </Row>
            </Shake>
            </>
        }
        else {
            return <>
            <Modal id='close-call-popup' show={showClose} onHide={setShowClose}>
                <Modal.Header>
                    <Modal.Title>Close Call -- Call#{call.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to close the Call#{call.id}</Modal.Body>
                <Modal.Footer>
                    <NavLink to={"/"}>
                        <Button variant="success" onClick={confirmCloseCall}>
                            Yes
                        </Button>
                    </NavLink>
                    <Button variant="danger" onClick={discardClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
          <Row>
            <Col xs={9}>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Vitals</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Image src={call.img} fluid></Image>
                    </tbody>
                </Table>
            </Col>
            <Col xs={3}>
                <Card>
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
                <Button variant="danger" onClick={handleCloseCall}>Close Call</Button>
                <Button variant="info" onClick={handleCustomize}>Customize view</Button>
            </Col>
        </Row>
        <Row>
            <Col>        
            <Button
                variant='outline-primary'
                className='vocal'>
                Vocal Assistant
                <BsFillMicFill size={20}/>
              </Button>
            </Col>
            <Col>
                <NavLink to={"/"}><Button variant="outline-secondary" className="returncall">Return to call list</Button></NavLink>
            </Col>
            <Col>
                <Button variant="outline-warning" className="sendalert">
                    <AiFillWarning size={30}>  </AiFillWarning>
                    Send an alert    
                </Button>
            </Col>
        </Row>
        </>
        }
    }
}
    