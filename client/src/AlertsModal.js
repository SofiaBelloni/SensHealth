import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { HiBellAlert } from "react-icons/hi2";
import { useEffect, useState } from "react"
import "./App.css";
import API from './Api.js';

function AlertsModal(props) {

    const [alertsList, setAlertsList] = useState([]);

    useEffect(() => {
        const retrieveInfo = async () => {
            const list = await API.getAlerts(props.callId);
            setAlertsList(list);
        }
        //retrieveInfo()
    }, []);

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>CALL #{props.callId} - ALERTS SENT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {alertsList !== undefined ?
                    <ListGroup className='mt-3'>
                        <ListGroup.Item className="additional-details">ALERTS #1:</ListGroup.Item>
                        <ListGroup.Item className="additional-details-elem" as="li"><Info /></ListGroup.Item>
                        {
                            //props.sensor.additional.map((info, index) => <ListGroup.Item className="additional-details-elem" as="li" key={index}><Info/></ListGroup.Item>)
                        }
                    </ListGroup>
                    : false}
            </Modal.Body>
        </Modal>
    );
}

function Info(props) {
    return (
        <>
            <div className='mt-4'>
                <span>DEPARTMENT: </span>
            </div>
            <div className='mt-2 mb-4'>
                <span>MESSAGE: </span>
            </div>
        </>
    );
}


export { AlertsModal };