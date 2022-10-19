//Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Hooks
import AuthProvider from './context/AuthProvider';
import FlashMessageProvider from './context/FlashMessageProvider';
//Components
import App from './App';
import Employees from './components/Employees/Employees';
import AddEmployee from './components/Employees/AddEmployee';
import Users from './components/Users/Users';
import Login from './components/Login';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import UpdateEmployee from './components/Employees/UpdateEmployee';
import AddUser from './components/Users/AddUser';
import UpdateUser from './components/Users/UpdateUser';
import Profile from './components/Profile//Profile';
//Css
// import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FlashMessageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/employees' element={<RequireAuth allowedRoles={["Admin", "User"]}><Employees /></RequireAuth>} />
            <Route path='/employees/add' element={<RequireAuth allowedRoles={["Admin"]}><AddEmployee /></RequireAuth>} />
            <Route path='/employees/:id' element={<RequireAuth allowedRoles={["Admin"]}><UpdateEmployee /></RequireAuth>} />
            <Route path='/users' element={<RequireAuth allowedRoles={["Admin"]}><Users /></RequireAuth>} />
            <Route path='/users/add' element={<RequireAuth allowedRoles={["Admin"]}><AddUser /></RequireAuth>} />
            <Route path='/users/:id' element={<RequireAuth allowedRoles={["Admin"]}><UpdateUser /></RequireAuth>} />
            <Route path='/profile/:id' element={<Profile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </FlashMessageProvider>
  </BrowserRouter>
);
