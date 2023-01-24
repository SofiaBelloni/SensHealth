import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import { HiBellAlert } from "react-icons/hi2";
import { useEffect, useState } from "react"
import "./AlertModal.css";
import API from './Api.js';

function AlertsModal(props) {

    const [alertsList, setAlertsList] = useState([]);

    useEffect(() => {
        const retrieveInfo = async () => {
            const list = await API.getAlerts(props.callId);
            setAlertsList(list);
        }
        retrieveInfo();
    }, [props.callId]);

    return (
        <Modal show={props.show} onHide={props.handleClose} scrollable>
            <Modal.Header className="alerts-title" closeButton>
                <Modal.Title>CALL #{props.callId} - ALERTS SENT</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(alertsList !== undefined && alertsList.length > 0 )?
                    <ListGroup >
                        {
                            alertsList.map((alert, index) => <ListGroup.Item className="additional-details" as="li" key={index}><Info index={index} alert={alert}/></ListGroup.Item>)
                        }
                    </ListGroup>
                    : <p className='mt-2 no-alert'>No alerts sent</p>}
            </Modal.Body>
        </Modal>
    );
}

function Info(props) {
    return (
        <>
            <p className='mb-1 bold'><HiBellAlert /> ALERT #{props.index+1}:</p>
            <div className='ms-4'>
                <span>DEPARTMENT: </span>
                <span className='bold'>{props.alert.department} </span>
            </div>
            <div className='ms-4'>
                <span>DESCRIPTION: </span>
                <span>{props.alert.description} </span>
            </div>
            <hr/>
        </>
    );
}


export { AlertsModal ,Info };