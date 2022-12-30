import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from 'react-bootstrap/Button';
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
            props.calls.map((c) =>
              <CallRow call={c} key={`call-${c.id}`} />)
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
        <CallData c={props.call} />
      </tr>
    </>

  );
}

function CallData(props) {
  return (
    <>
      <td>{props.c.id}</td>
      <td>{props.c.status}</td>
      <td>{props.c.location}</td>
      <td>{props.c.time}</td>
      <td>
        {props.c.status == 'Active' ?
        <div>
          <Button className='button' variant='success'>Open</Button>
          <Button className='button' variant='danger'>Close</Button>
          <Button className='button' variant='warning'>Alerts</Button>
        </div>
        :
        <div>
          <Button className='button' variant='success'>Open Again</Button>
        </div>
        }
      </td>
    </>
  );
}

export default CallsTable;