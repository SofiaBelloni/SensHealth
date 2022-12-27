import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
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
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/sensors" element={<SensorTable />} />
      </Routes>
    </>
  );
}


export default App;
