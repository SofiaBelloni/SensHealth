import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button, Row, Col, Card, Modal, Container, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

import './CallInfo.css';

import API from './Api.js';

function SendAlert(props) {

    const { callId } = useParams();
    const navigate = useNavigate();

    const [department, setDepartment] = useState(null);
    const [departmentList, setDepartmentList] = useState([]);
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const retrieveInfo = async () => {
            const dep = await API.getAllDepartments();
            setDepartmentList(dep);
            setDepartment(dep[0].id);
        }
        retrieveInfo()
    }, [])

    // open the modal 
    const handleSend = () => {
        setShowModal(true);
    }

    // confirmation to the modal to send alert
    const confirmSend = () => {
        const send = async (des, call, dep) => {
            await API.sendAlert(des, call, dep);
        }
        send(description, callId, department);
        setShowModal(false);
        setSuccessMessage("Alert correctly sent");
        setShowSuccess(true);
        
    }

    // close the modal
    const discardSend = () => {
        setShowModal(false);
    }

    return (
        <Container className="p-0">
            {showSuccess ?  //Success toast
                (<div className="position-relative">
                    <ToastContainer position='top-center'>
                        <Toast bg='success' onClose={() => {setShowSuccess(false); navigate('/call/' + callId)}} show={showSuccess} delay={1500} autohide>
                            <Toast.Body className='text-white'>{successMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>)
                : false}
            {departmentList ?
                <>
                    <Modal id='close-call-popup' show={showModal} onHide={setShowModal}>
                        <Modal.Header>
                            <Modal.Title>Confirm Alert -- Call#{callId}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="px-0 py-1 my-4 text-center">Are you sure to send the alert?</Modal.Body>
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
                                            {
                                                departmentList.map(dep => <option key={dep.id} value={dep.id} >{dep.name}</option>)
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
                                        <Button variant="danger" onClick={() => navigate('/call/' + callId)}>
                                            Discard
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
                : false}
        </Container >
    );
}

export default SendAlert;