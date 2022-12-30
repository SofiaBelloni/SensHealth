import 'bootstrap-icons/font/bootstrap-icons.css';

import { Table } from 'react-bootstrap';
import './App.css';


function CallsTable(props) {

  return (<>
    <div className='table-container'>
      <Table border={'dot'} hover size='sm' className='table'>
        <thead>
          <tr>
            <th>Call ID</th>
            <th>Status</th>
            <th>Location</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            props.courses.map((c) =>
              <CallRow call={c} key={`call-${c.id}`}/>)
          }
        </tbody>
      </Table>
    </div>
  </>
  );
}

function CallRow(props) {

  return (
    <>
      <tr>
        <CallData course={props.course} />
      </tr>
    </>

  );
}

function CallData(props) {
  return (
    <>
      <td>{props.call.id}</td>
      <td>{props.call.status}</td>
      <td>{props.call.location}</td>
      <td>{props.call.time}</td>
      <td></td>
    </>
  );
}

export default CallsTable;