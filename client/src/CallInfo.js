import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Table, Button, Row, Col, Card, Image} from "react-bootstrap";

import API from './Api.js';

export default function CallInfo() {
    const params = useParams();
    const [call, setCall] = useState('');
    const [image, setImage] = useState('');
    useEffect(() => {
        const retrieveInfo = async(callId) => {
            const call = await API.getCallById(callId);
            setCall(call[0]);
            setImage(call[0].img);
        }
        retrieveInfo(params.callId)
        document.getElementById("params").src = image;
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
            <Image id="params" src="" fluid></Image>
            </tbody>
        </Table>
        </Col>
        <Col xs={3}>
            <Card>
                <Card.Header>Call #9</Card.Header>
                <Card.Body>
                    <Card.Title>Name</Card.Title>
                    <Card.Text>{call['name']}</Card.Text>
                    <Card.Title>Surname</Card.Title>
                    <Card.Text>{call['surname']}</Card.Text>
                    <Card.Title>Code</Card.Title>
                    <Card.Text>{call['colorCode']}</Card.Text>
                    <Card.Title>Status</Card.Title>
                    <Card.Text>{call['ambStatus']}</Card.Text>
                </Card.Body>
            </Card>
            <Button>Close Call</Button>
        </Col>
    </Row>
    </>
}