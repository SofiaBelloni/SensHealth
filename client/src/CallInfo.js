import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Table, Button, Row, Col, Card, Image} from "react-bootstrap";
import {AiFillWarning } from "react-icons/ai";
import {BsFillMicFill} from "react-icons/bs";

import API from './Api.js';

export default function CallInfo() {
    const params = useParams();
    const [call, setCall] = useState('');
    useEffect(() => {
        const retrieveInfo = async(callId) => {
            const call = await API.getCallById(callId);
            setCall(call);
        }
        console.log(call.img)
        retrieveInfo(params.callId)
    }, [])

    return <>
    <br></br>
    <br></br>
    <br></br>
    <Row>
        <Col xs={9}>
        <Table hover>
            <thead>
                <tr>
                    <th>Vitals</th>
                </tr>
            </thead>
            <tbody>
            <Image id="params" src={call.img} fluid></Image>
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
            <Button>Close Call</Button>
        </Col>
    </Row>
    <Row>
        <Col>
        <BsFillMicFill></BsFillMicFill>
        </Col>
        <Col>
            <Button>Return to call list</Button>
        </Col>
        <Col>
            <Button>
                <AiFillWarning></AiFillWarning>
                Send an alert    
            </Button>
        </Col>
    </Row>
    </>
}