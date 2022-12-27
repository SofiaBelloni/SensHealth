import Table from 'react-bootstrap/Table';
import "./SensorStatus.css";

function SensorTable() {
    return (
        <>
            <div className='mt-5'>
                <h1 id='title'>SENSORS STATUS</h1>
            </div>
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
                        <Kit/>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #2</td>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #3</td>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #4</td>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #5</td>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #6</td>
                    </tr>
                    <tr>
                        <td className='td kit'>KIT #7</td>
                    </tr>
                    <tr>
                        <td className='td kit<'>KIT #8</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

function Kit() {
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
                <td className='td'rowSpan={8}></td>
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
}


export { SensorTable };