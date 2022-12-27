import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Table, Button, Row, Col, Card, Image} from "react-bootstrap";

import API from './Api.js';

export default function CallInfo() {
    const params = useParams();
    const [call, setCall] = useState('');
    useEffect(() => {
        const retrieveInfo = async(callId) => {
            const call = await API.getCallById(callId);
            setCall(call[0]);
        }
        retrieveInfo(params.callId)
        
    }, [])

    return <>
    <Row>
        <Col>
        <br></br>
        <br></br>
        <br></br>
        <Table hover>
            <thead>
                <tr>
                    <th>Vitals</th>
                </tr>
            </thead>
            <tbody>
                <Image src="C:\Users\ferla\Documents\GitHub\SensHealth\server\src_images\9_main.png" fluid></Image>
            </tbody>
        </Table>
        </Col>
    </Row>
    </>
}