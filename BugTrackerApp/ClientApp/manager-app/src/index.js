//Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Hooks
import AuthProvider from './context/AuthProvider';
import FlashMessageProvider from './context/FlashMessageProvider';
//Components
import App from './App';
import Users from './components/users-table-page';
import Login from './components/Login';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import AddUserModal from './components/users-table-page/AddUserModal';
import UpdateUserModal from './components/users-table-page/UpdateUserModal';
import Profile from './components/user-profile-page';
import AddProject from './components/add-project-page/index';
import ProjectView from './components/project-view-page';
import BugViewModal from './components/project-view-page/BugViewModal';
import AddBugModal from './components/project-view-page/AddBugModal';


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
              <Route path='/users/add' element={<RequireAuth allowedRoles={["Admin"]}><AddUserModal /></RequireAuth>} />
              <Route path='/users/:id' element={<RequireAuth allowedRoles={["Admin"]}><UpdateUserModal /></RequireAuth>} />
              <Route path='/profile/:id' element={<Profile />} />
              <Route path='/projects/add' element={<AddProject />} />
              <Route path='/projects/:id' element={<ProjectView />} />
              <Route path='/bugs/:id' element={<BugViewModal />} />
              <Route path='/bugs/add' element={<AddBugModal />} />
            </Route>
          </Routes>
        </AuthProvider>
      </FlashMessageProvider>
    </BrowserRouter>
);
