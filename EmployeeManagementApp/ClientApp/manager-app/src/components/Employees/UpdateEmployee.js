//Packages
import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
//Misc
import axios from "../../apis/axiosInstance";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useDateFormat from "../../hooks/useDateFormat";
//Css
import './updateEmployee.css'

function UpdateEmployee() {
  let navigate = useNavigate();
  const location = useLocation();
  const employee = location.state;
  const { id } = useParams();
  const [data, setData, error, loading, axiosFetch] = useAxiosFunction();
  const dateFormat = useDateFormat();

  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [hiringDate, setHiringDate] = useState(dateFormat(employee.hiringDate));

  const handleUpdate = (e) => {
    e.preventDefault();
    axiosFetch({
      axiosInstance: axios,
      method: "PUT",
      url: `/api/employees/${id}`,
      requestConfig: {
        Id: `${id}`,
        FirstName: `${firstName}`,
        LastName: `${lastName}`,
        HiringDate: `${hiringDate}`,
      },
    });
    navigate(-1);
  };

  return (
    <Container>
      <Card className="w-100">
        <Card.Title>Update employee</Card.Title>
        {!loading && !error && <Card.Body>
          <Form
            onSubmit={(e) => {
              handleUpdate(e);
            }}
            className="form"
          >
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Hiring Date:</Form.Label>
              <Form.Control
                type="date"
                value={hiringDate}
                onChange={(e) => setHiringDate(e.target.value)}
              />
            </Form.Group>
            {!loading && (
              <Button variant="primary" type="submit">
                Update employee
              </Button>
            )}

          </Form>
        </Card.Body>}
        {loading &&
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>}
      </Card>
    </Container>
  );
}

export default UpdateEmployee;