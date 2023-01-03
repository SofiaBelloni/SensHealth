import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button, Row, Col, Card, Modal, Nav, Container, Form } from "react-bootstrap";
import { AiFillWarning } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Shake, ShakeLittle, ShakeSlow } from 'reshake'

import './CallInfo.css';

import API from './Api.js';

function SendAlert(props) {

    const { callId } = useParams();
    const navigate = useNavigate();

    const [department, setDepartment] = useState('2');
    const [departmentList, setDepartmentList] = useState(null);
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    // open the modal 
    const handleSend = () => {
        setShowModal(true);
    }


    // confirmation to the modal to send alert
    const confirmSend = () => {
        //props.closeCall(call.id)
        setShowModal(false);
    }
    // abort to the modal
    const discardSend = () => {
        setShowModal(false);
    }

    return (
        <Container className="p-0">

            <Modal id='close-call-popup' show={showModal} onHide={setShowModal}>
                <Modal.Header>
                    <Modal.Title>Confirm Alert -- Call#{callId}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-0 py-1 my-4 text-center">Are you sure to send the alert to department {department}?</Modal.Body>
                <Modal.Footer className="modal-footer">
                    <Row>
                        <Col className='text-left'>
                            <Button variant="success" onClick={confirmSend}>
                                Yes
                            </Button>
                        </Col>
                        <Col className='text-end'>
                            <Button variant="danger" onClick={discardSend}>
                                No
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
            <Card className="mt-4">
                <Card.Header><b>Send an Alert - Call #{callId}</b></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <FloatingLabel className="m-3 mb-4" controlId="floatingSelect" label="Choose department">
                                <Form.Select value={department} onChange={(event) => { setDepartment(event.target.value); }}>
                                    <option value='1' >Dep 1</option>
                                    <option value='2' >Dep2</option>
                                    {
                                        // Object.keys(Condition).map(k => <option key={k} value={Condition[k]} >{Condition[k]}</option>)
                                    }
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Write here a description..."
                                className="m-3"
                            >
                                <Form.Control
                                    as="textarea" type="text"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                    style={{ height: '100px' }} />
                            </FloatingLabel>
                        </Form.Group>
                        <Row>
                            <Col className='text-left ms-3'>
                                <Button variant="success" onClick={handleSend}>
                                    Send
                                </Button>
                            </Col>
                            <Col className='text-end me-3'>
                                <Button variant="danger" onClick={() => console.log('discard')}>
                                    Discard
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </Container >
    );
}

export default SendAlert;