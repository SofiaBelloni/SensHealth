import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button, Row, Col, Modal, Form } from "react-bootstrap";

import "./SendAlert.css";

import API from './Api.js';

export default function SendAlert(props) {

    const { callId } = useParams();

    const [department, setDepartment] = useState(null);
    const [departmentList, setDepartmentList] = useState([]);
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);

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
        if (description === "") props.handleSentNoDesc();
        else setShowModal(true);
    }

    // confirmation to the modal to send alert
    const confirmSend = () => {
        const send = async (des, call, dep) => {
            await API.sendAlert(des, call, dep);
        }

        send(description, callId, department);
        setShowModal(false);
        props.handleSent();
        props.handleClose();

    }

    // close the modal
    const discardSend = () => {
        setShowModal(false);
    }

    return (
        <>
            {departmentList ?
                <>
                    <Modal id='confirm' show={showModal} onHide={setShowModal} size="sm" centered >
                        <Modal.Header className='gray text-center'>
                            <Modal.Title className="title-small">Confirm Alert - Call#{callId}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="px-0 py-4 text-center gray">Are you sure to send the alert?</Modal.Body>
                        <Modal.Footer className="modal-footer gray">
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
                    <Modal id='discard' show={showDiscardModal} onHide={setShowDiscardModal} size="sm" centered>
                        <Modal.Header className="gray">
                            <Modal.Title className="title-small">Confirm Discard - Call#{callId}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="px-0 py-4 text-center gray">Are you sure to discard?</Modal.Body>
                        <Modal.Footer className="modal-footer gray">
                            <Row>
                                <Col className='text-left'>
                                    <Button variant="success" onClick={() => { props.handleClose(); props.handleDiscarded(); }}>
                                        Yes
                                    </Button>
                                </Col>
                                <Col className='text-end'>
                                    <Button variant="danger" onClick={() => setShowDiscardModal(false)}>
                                        No
                                    </Button>
                                </Col>
                            </Row>
                        </Modal.Footer>
                    </Modal>
                    <Modal id='alert' show={props.show} size="lg" centered>
                        <Modal.Header className="alerts-title">
                            <Modal.Title>Send an Alert - Call #{callId}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
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
                                            style={{ height: '100pt' }}
                                            required />
                                    </FloatingLabel>
                                </Form.Group>
                                <Row>
                                    <Col className='text-left ms-3'>
                                        <Button variant="success" onClick={handleSend}>
                                            Send
                                        </Button>
                                    </Col>
                                    <Col className='text-end me-3'>
                                        <Button variant="danger" onClick={() => setShowDiscardModal(true)}>
                                            Discard
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
                : false}
        </>
    );
}