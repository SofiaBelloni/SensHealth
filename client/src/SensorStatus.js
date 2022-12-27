import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import "./SensorStatus.css";

function SensorTable() {
    return (
        <>
            <div className='mt-5'>
                <h1 id='title'>SENSORS STATUS</h1>
            </div>
            <div className='border'>
                <ListGroup className='sensor-list mt-3' as="ul">
                    <ListGroup.Item as="li" className="kit-title">KIT ID</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #1</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #2</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #3</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #4</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #5</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #6</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #7</ListGroup.Item>
                    <ListGroup.Item as="li">KIT #8</ListGroup.Item>
                </ListGroup>
                <Kit />
            </div>
        </>
    );
}

function Kit() {
    return (
        <>
            <Table id="sensorTable">
                <thead>
                    <tr>
                        <th className='th kit text-center bg'>KIT ID</th>
                        <th className='th'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className='td kit'>KIT #1</td>
                        <td className='td' rowSpan={8}></td>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #2</td>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #3</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}


export { SensorTable };