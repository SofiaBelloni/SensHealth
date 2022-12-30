import { Row, Col} from 'react-bootstrap'
import CallsTable from './CallsTable';

function CallsView(props) {
  return (
    <>
      <Row>
        <Col>
          <br /><h1>Call List</h1>
          <CallsTable classname="calls-table" calls={props.calls} />
        </Col>
      </Row>
    </>
  );
}

export { CallsView }