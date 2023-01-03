import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import {Table, Button, Row, Col, Card, Image, Modal, Nav} from "react-bootstrap";
import {AiFillWarning } from "react-icons/ai";
import {BsFillMicFill} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Shake, ShakeLittle, ShakeSlow } from 'reshake'

import './CallInfo.css';

import API from './Api.js';

export default function CallInfo(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [call, setCall] = useState('');
    const [showClose, setShowClose] = useState(false);
    const [customize, setCustomize] = useState(false);
    const [showCloseCustomize, setShowCloseCustomize] = useState(false);

    useEffect(() => {
        const retrieveInfo = async(callId) => {
            const call = await API.getCallById(callId);
            setCall(call);
        }
        retrieveInfo(params.callId)
    }, [])

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
        event.preventDefault();
    }

    // open the modal to confirm the customize
    const handleConfirmCustomize = () => {
        setShowCloseCustomize(true);
    }

    // confirmation to the customize mode of the call
    const confirmCustomize = (event) =>{
        setShowCloseCustomize(false);
        setCustomize(false);
        event.preventDefault();
    }

    // abort to the modal to customize the view of the call
    const discardCloseCustomize = () => {
        setShowCloseCustomize(false);
    }
    

    if (customize) {
        return <>
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
                            <Button>Edit parameters</Button>
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
        <Button
            variant='outline-primary'
            className='vocal'>
            Vocal Assistant
            <BsFillMicFill size={20}/>
          </Button>
        </Col>
        <Col>
            <Button variant="outline-secondary" className="returncall">Return to call list</Button>
        </Col>
        <Col>
            <Button variant="outline-warning" className="sendalert">
                <AiFillWarning size={30}>  </AiFillWarning>
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
            <Button variant="outline-warning" className="sendalert" onClick={() => navigate('/alert/' + call.id)}>
                <AiFillWarning size={30}>  </AiFillWarning>
                Send an alert    
            </Button>
        </Col>
    </Row>
    </>
    }
}