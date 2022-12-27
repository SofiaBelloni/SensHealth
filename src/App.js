import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Container } from 'react-bootstrap';
import { Home } from './Home';
import { MyNavbar } from './MyNavbar';
import { SensorTable } from './SensorStatus';

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  )
}

function MainApp() {
  return (
    <>
      <MyNavbar/>
      <br />
      <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/sensors" element={<SensorTable />} />
      </Routes>
      </Container>
    </>
  );
}


export default App;
