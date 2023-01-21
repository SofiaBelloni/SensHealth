import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import "./SensorStatus.css";
import "./App.css";
import { AiFillInfoCircle } from "react-icons/ai";
import './CallsTable.css';
import { Card } from 'react-bootstrap';


function SensorTable() {
    const KitList = [
        {
            id: 1, name: "Kit #1", location: "Ambulance #1", maintenance: '2022-03-10', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"] },
                { name: "Sensor#2", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"] },
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%", additional: ["Need some maintenance", "Materials are degrading. Change it before 31 December 2022"] },
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%", additional: ["Need some maintenance", "Materials are degrading. Change it before 31 December 2022"] },
                { name: "Sensor#5", status: "BAD", details: "Battery level: 0%", additional: ["Need some maintenance", "Materials are degrading. Change it as soon as possible"] }
            ]
        },
        {
            id: 2, name: "Kit #2", location: "Ambulance #2", maintenance: '2022-04-17', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
                { name: "Sensor#2", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
                { name: "Sensor#3", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
                { name: "Sensor#4", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
                { name: "Sensor#5", status: "GOOD", details: "Battery level: 80%", additional: ["Change it before 31 December 2023"]}
            ]
        },
        {
            id: 3, name: "Kit #3", location: "Ambulance #3", maintenance: '2022-12-05', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
                { name: "Sensor#2", status: "EXCELLENT", details: "", additional: ["Change it before 31 December 2023"]},
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%", additional: ["Need some maintenance", "Change it before 31 December 2023"]},
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%", additional: ["Need some maintenance", "Change it before 31 May 2023"]},
                { name: "Sensor#5", status: "BAD", details: "Sensor unreachable", additional: ["Sensor unreachable"]}
            ]
        },

        {
            id: 4, name: "Kit #4", location: "Ambulance #4", maintenance: '2022-10-11', sensors: [
                { name: "Sensor#1", status: "MEDIUM", details: "Battery level: 40%", additional: ["Need some maintenance", "Change it before 31 December 2023"]},
                { name: "Sensor#2", status: "MEDIUM", details: "Battery level: 45%", additional: ["Need some maintenance", "Materials are degrading. Change it before 31 December 2022"] },
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%", additional: ["Change it before 31 December 2023"] },
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%", additional: ["Change it before 31 December 2023"]},
                { name: "Sensor#5", status: "BAD", details: "Calibrate the sensor", additional: ["Calibrate the sensor", "Change it before 31 December 2023"]}
            ]
        },

        {
            id: 5, name: "Kit #5", location: "Ambulance #5", maintenance: '2021-11-21', sensors: [
                { name: "Sensor#1", status: "MEDIUM", details: "Battery level: 30%", additional: ["Need some maintenance", "Change it before 31 June 2022"]},
                { name: "Sensor#2", status: "BAD", details: "Sensor unreachable", additional: ["Change it as soon as possible"]},
                { name: "Sensor#3", status: "BAD", details: "Battery level: 0%", additional: ["Need some maintenance", "Materials are degrading. Change it as soon as possible"] },
                { name: "Sensor#4", status: "BAD", details: "Sensor unreachable", additional: ["Change it as soon as possible"]},
                { name: "Sensor#5", status: "BAD", details: "Battery level: 0%", additional: ["Need some maintenance", "Materials are degrading. Change it as soon as possible"]}
            ]
        }
    ];

    const [show, setShow] = useState(false);
    const [kit, setKit] = useState("");

    function handleOpen(kitId) {
        const selectedKit = KitList.filter((kit) => kit.id === kitId);
        setKit(selectedKit[0]);
        setShow(true);
    }

    return (
        <>
            <div className='mt-3'>
                <h1 className='mt-4 text-center font'>Sensor status</h1>
            </div>
            <div className='border mt-3'>
                <ListGroup className='sensor-list table-1' as="ul">
                    <ListGroup.Item as="li" className="kit-title">KIT ID</ListGroup.Item>
                    {
                        KitList.map((kit) => <ListGroup.Item className='list-elem' action key={kit.id} as="li" onClick={() => handleOpen(kit.id)}>{kit.name}</ListGroup.Item>)
                    }
                </ListGroup>
                {show ? <Kit kit={kit} /> : <Instruction />}

            </div>
        </>
    );
}

function Instruction() {
    return (
        <Container id="kitContainer" className='instruction'>
                 

            <Table id="sensorTable" size='sm'>
                <thead>
                    <tr>
                        <th className='text-center bg wh'>How to see the status of a sensor</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='text-center'>
                            To see the status of a Kit, please select one of them on the left
                        </td>
                    </tr>
                </tbody>
            </Table>
           
        </Container>
    );
}


function Kit(props) {
    return (
        <>
            <Container id="kitContainer">
                <h1 id='title' className='m-2'>{props.kit.name}</h1>
                <Table id="sensorTable" striped size='sm'>
                    <thead className=''>
                        <tr>
                            <th className='text-center bg wh'>SENSOR</th>
                            <th className='text-center bg wh'>STATUS</th>
                            <th className='text-center bg wh'>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.kit.sensors.map((sens) => <SensorRow key={sens.id} sensor={sens} />)
                        }
                    </tbody>
                </Table>
                <div className='mt-4'>
                    <span >LOCATION: </span>
                    <span id='details'>{props.kit.location}</span>
                </div>
                <div className='mt-2 mb-4'>
                    <span >LAST MAINTENANCE: </span>
                    <span id='details'>{props.kit.maintenance}</span>
                </div>
            </Container>
        </>
    );
}
function SensorRow(props) {
    return (
        <tr><SensorData key={props.key + props.sensor.id} sensor={props.sensor} /></tr>
    );
}

function SensorData(props) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => {
        setShowModal(true);
    };

    return (
        <>
            <td>{props.sensor.name}</td>
            <td>{props.sensor.status} <AiFillInfoCircle onClick={handleShow} /></td>
            <td>{props.sensor.details}</td>
            {showModal ? <AdditionalInfoModal sensor={props.sensor} show={showModal} handleClose={handleClose} /> : false}
        </>
    );
}


function AdditionalInfoModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} >
            <Modal.Header className='modal-blue' closeButton>
                <Modal.Title>{props.sensor.name} - INFO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>STATUS: </span>
                <span id="details">{props.sensor.status}</span>
                {props.sensor.additional !== undefined ?
                    <ListGroup className='mt-3'>
                        <ListGroup.Item className="additional-details">ADDITIONAL DETAILS:</ListGroup.Item>
                        {
                            props.sensor.additional.map((info, index) => <ListGroup.Item className="additional-details-elem" as="li" key={index}>{info}</ListGroup.Item>)
                        }
                    </ListGroup>
                    : false}
            </Modal.Body>
        </Modal>
    );
}


export { SensorTable };