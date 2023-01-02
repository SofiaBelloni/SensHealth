import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { MyNavbar } from './MyNavbar';
import { SensorTable } from './SensorStatus';
import CallInfo from './CallInfo';
import { useEffect, useState } from 'react';
import API from './Api';
import { CallsView } from './CallsView';
import { Row } from 'react-bootstrap';

function App() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCalls = async () => {
    const callsList = await API.getAllCalls();
    setCalls(callsList);
  };

  const closeCall  = async (callId) => {
    await API.setStatusCall(callId, "Closed");
    getAllCalls();
  }

  const openCall  = async (callId) => {
    await API.setStatusCall(callId, "Active");
    getAllCalls();
  }

  const orderCallsbyId = async () => {
    const orderedCalls = await API.getAllCallsOrderbyId();
    setCalls(orderedCalls);
  }

  const orderCallsbyIdDesc = () => {
    getAllCalls();
  }

  const orderCallsbyActive = async () => {
    const orderedCalls = await API.getAllCallsOrderbyActive();
    setCalls(orderedCalls);
  }

  const orderCallsbyClosed = async () => {
    const orderedCalls = await API.getAllCallsOrderbyClosed();
    setCalls(orderedCalls);
  }

  useEffect(() => {
    setLoading(false);
    getAllCalls();
    setLoading(true);
  }, []);

  return (
    <BrowserRouter>
      <Row>
        <MyNavbar />
      </Row>
        <Routes>
          <Route path="/" element={<CallsView calls={calls} loading={loading} closeCall={closeCall} openCall={openCall} orderCallsbyId={orderCallsbyId} orderCallsbyIdDesc={orderCallsbyIdDesc} orderCallsbyActive={orderCallsbyActive} orderCallsbyClosed={orderCallsbyClosed}/>} />
          <Route path="/sensors" element={<SensorTable />} />
          <Route path="call/:callId" element={<CallInfo />} />
        </Routes>
    </BrowserRouter>
  );
}


export default App;
