import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Department from "./components/Department";
import Employees from "./components/Employees";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          Container
        </h3>
      <Navigation/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/department' element={<Department />}/>
        <Route path='/employees' element={<Employees />}/>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
