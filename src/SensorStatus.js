import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import "./SensorStatus.css";
import { AiFillInfoCircle } from "react-icons/ai";


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
            id: 2, name: "Kit #2", location: "Ambulance #1", maintenance: '2022-04-17', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "" },
                { name: "Sensor#2", status: "EXCELLENT", details: "" },
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%" },
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%" },
                { name: "Sensor#5", status: "BAD", details: "Battery level: 0%" }
            ]
        },
        {
            id: 3, name: "Kit #3", location: "Ambulance #1", maintenance: '2022-12-05', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "" },
                { name: "Sensor#2", status: "EXCELLENT", details: "" },
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%" },
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%" },
                { name: "Sensor#5", status: "BAD", details: "Battery level: 0%" }
            ]
        },

        {
            id: 4, name: "Kit #4", location: "Ambulance #1", maintenance: '2022-10-11', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "" },
                { name: "Sensor#2", status: "EXCELLENT", details: "" },
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%" },
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%" },
                { name: "Sensor#5", status: "BAD", details: "Battery level: 0%" }
            ]
        },

        {
            id: 5, name: "Kit #5", location: "Ambulance #1", maintenance: '2021-11-21', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "" },
                { name: "Sensor#2", status: "EXCELLENT", details: "" },
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%" },
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%" },
                { name: "Sensor#5", status: "BAD", details: "Battery level: 0%" }
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
            <div className='mt-5'>
                <h1 id='title'>SENSORS STATUS</h1>
            </div>
            <div className='border mt-3'>
                <ListGroup className='sensor-list' as="ul">
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
                        <th className='text-center bg'>How to see the status of a sensor</th>
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
                            <th className='text-center bg'>SENSOR</th>
                            <th className='text-center bg'>STATUS</th>
                            <th className='text-center bg'>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.kit.sensors.map((sens) => <SensorRow key={sens.id} sensor={sens} />)
                        }
                    </tbody>
                </Table>
                <div className='mt-5'>
                    <p id='details'>LOCATION: {props.kit.location}</p>
                    <p id='details'>LAST MAINTENANCE: {props.kit.maintenance}</p>
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
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.sensor.name} - INFO</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>STATUS: {props.sensor.status}</p>
                {props.sensor.additional !== undefined ?
                    <ListGroup>
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