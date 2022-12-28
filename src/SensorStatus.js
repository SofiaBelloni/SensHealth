import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row } from 'react-bootstrap';
import React, { useState } from 'react';
import "./SensorStatus.css";

function SensorTable() {
    const KitList = [
        {
            id: 1, name: "Kit #1", location: "Ambulance #1", maintenance: '2022-03-10', sensors: [
                { name: "Sensor#1", status: "EXCELLENT", details: "" },
                { name: "Sensor#2", status: "EXCELLENT", details: "" },
                { name: "Sensor#3", status: "GOOD", details: "Battery level: 60%" },
                { name: "Sensor#4", status: "MEDIUM", details: "Battery level: 30%" },
                { name: "Sensor#5", status: "BAD", details: "Battery level: 0%" }
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
        console.log(kitId);
        const selectedKit = KitList.filter((kit) => kit.id === kitId);
        setKit(selectedKit[0]);
        setShow(true);
        console.log(kit);
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
                {show ? <Kit kit={kit} /> : <Instruction/>}

            </div>
        </>
    );
}

function Instruction() {
    return (
        <Container id="kitContainer"  className='instruction'>
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
    return (
        <>
            <td>{props.sensor.name}</td>
            <td>{props.sensor.status}</td>
            <td>{props.sensor.details}</td>
        </>
    );
}


export { SensorTable };