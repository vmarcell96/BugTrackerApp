# BugTrackerApp

# Description

This is an implementation of an issue tracker application. First it started as a simple employee manager application but later I expanded its functionality by converting it to a bug tracker application. So far only bug tracking is supported, but later i want to implement general tasks. The application is deployed to azure, you can find the login info down, or on the homepage of the application.


## Sprints

#### First sprint

- Implementing EmployeesController class on back-end
- Using repository-service-controller pattern
- Implementing basic github actions

#### Second sprint

- Creating front-end react app with CRUD operations
- Implementing UsersController class on back-end
- Implementing JWT authentication with access tokens
- Implementing protected routes on front-end
- Implementing role-based authorization
- Login/Logout
- Basic unit tests for EmployeesController with Moq,AutoFixture

#### Third sprint

- Implementing refresh tokens
- Bug fixes
- Front-end refactor

#### Forth Sprint

- Implement Footer
- Create landing page
- Improve css
- Create profile page
- Deployment to Azure
- Project creation
- Bug creation

#### Fifth Sprint

- Improve Bug view page
- Implement CI/CD pipeline
- Run tests in github action flow on backend
- Run tests in github action flow on frontend
- Rename everything from employeemanager to Bugtracker
- Improve error handling on backend
- Edit bugs
- Implemented modals on frontend

## Stack
- ASP.NET Core
- Entity framework
- React
- Axios
- Moq
- AutoFixture

## Features
- Login/Logout
- CRUD operations on users, when logged in with Admin role user
- Protected react routes
- Protected API routes
- JWT access, refresh token validation
- Persisted users,projects,bugs,team members

### Login info

### Admin role user:
Username: Admin
Password: 12345678

### User role user:
Username: User
Password: 12345678

## Production build

[Deployed to Azure.](https://wonderful-water-041ca0803.2.azurestaticapps.net)(Login takes some time because of Azure's server speed)

## Run Locally
##### Prerequisites

- Microsoft Visual Studio to run ASP .NET backend
- Node.js to run React frontend

Clone the project and navigate to the project folder

```bash
  git clone https://github.com/vmarcell96/EmployeeManagementApp
  cd .\EmployeeManagementApp
```

Starting the backend:

- Open BugTrackerApp.sln in Microsoft Visual studio
- Run IIS Express server


Starting frontend:
Go back to the root directory of the repository and navigate to:

```bash
  cd .\EmployeeManagementApp\BugTrackerApp\ClientApp\manager-app
```

Install packages

```bash
  npm i
```

Start the application 

```bash
  npm start
```
Client should be available at `localhost:3000`



## Roadmap

- Deploy as a container
- Reliability improvements (error handling, UI consistency)
- Improve application design (CSS)
- Bug fixes
- Further testing on controllers
- Testing services

