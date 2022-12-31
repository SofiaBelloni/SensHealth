import { Row, Col} from 'react-bootstrap'
import CallsTable from './CallsTable';
import './App.css'

function CallsView(props) {
  return (
    <>
      <Row>
        <Col>
          {props.loading ? 
          <div><br /><h1 className='title-list'>CALL LIST</h1>
          <CallsTable classname="calls-table" calls={props.calls} openCall={props.openCall} closeCall={props.closeCall} /></div>
          :
          <div/>}
        </Col>
      </Row>
    </>
  );
}

export { CallsView }