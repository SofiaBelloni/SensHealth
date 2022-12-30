import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';
import { MyNavbar } from './MyNavbar';
import { SensorTable } from './SensorStatus';
import CallInfo from './CallInfo';
import { useEffect, useState } from 'react';
import API from './Api';
import { CallsView } from './CallsView';
import { propTypes } from 'react-bootstrap/esm/Image';

function App() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState();

  const getAllCalls = async () => {
    setLoading(false);
    const callsList = await API.getAllCalls();
    console.log(callsList);
    setCalls(callsList);
    setLoading(true);
  };

  useEffect(() => {
    getAllCalls();
    console.log(calls);
  }, []);

  return (
    <BrowserRouter>
      <MyNavbar/>
      <br />
      <Container>
      <Routes>
        <Route path="/" element={<CallsView calls={propTypes.calls}/>} />
        <Route path="/sensors" element={<SensorTable />} />
        <Route path="call/:callId" element={<CallInfo />} />
      </Routes>
      </Container>
    </BrowserRouter>
  );
}


export default App;
