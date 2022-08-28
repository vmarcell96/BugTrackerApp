import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import Employees from './components/Employees';
import AddEmployee from './components/AddEmployee';
import Users from './components/Users';
import Login from './components/Login';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/employees' element={<RequireAuth allowedRoles={["Admin","User"]}><Employees /></RequireAuth>}/>
            <Route path='/employees/add' element={<RequireAuth allowedRoles={["Admin"]}><AddEmployee /></RequireAuth>}/>
            <Route path='/users' element={<RequireAuth allowedRoles={["Admin"]}><Users /></RequireAuth>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
