//Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Hooks
import AuthProvider from './context/AuthProvider';
import FlashMessageProvider from './context/FlashMessageProvider';
//Components
import App from './App';
import Users from './components/Users/Users';
import Login from './components/Login';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import AddUser from './components/Users/AddUser';
import UpdateUser from './components/Users/UpdateUser';
import Profile from './components/Profile//Profile';
import AddProject from './components/Projects/AddProject';
import ProjectView from './components/Projects/ProjectView';
import BugView from './components/Bugs/BugView';
import AddBug from './components/Bugs/AddBug';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <FlashMessageProvider>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/users' element={<RequireAuth allowedRoles={["Admin"]}><Users /></RequireAuth>} />
              <Route path='/users/add' element={<RequireAuth allowedRoles={["Admin"]}><AddUser /></RequireAuth>} />
              <Route path='/users/:id' element={<RequireAuth allowedRoles={["Admin"]}><UpdateUser /></RequireAuth>} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/projects/add' element={<AddProject />} />
              <Route path='/projects/:id' element={<ProjectView />} />
              <Route path='/bugs/:id' element={<BugView />} />
              <Route path='/bugs/add' element={<AddBug />} />
            </Route>
          </Routes>
      </AuthProvider>
    </FlashMessageProvider>
  </BrowserRouter>
);
