import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import LoadingSpin from "react-loading-spin";
import { Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";

function UpdateEmployee() {
  let navigate = useNavigate();
  const location = useLocation();
  const employee = location.state;
  const { id } = useParams();
  const [employees, error, loading, axiosFetch] = useAxiosFunction();

  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [hiringDate, setHiringDate] = useState(employee.hiringDate);

  const [isPendingUpdate, setIsPendingUpdate] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsPendingUpdate(true);
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
    setTimeout(() => {
      setIsPendingUpdate(false);
    }, 1000);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <Card body>
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
          <Form.Control
            type="date"
            name="duedate"
            placeholder="Hiring Date"
            value={hiringDate}
            onChange={(e) => setHiringDate(e.target.value)}
          />
        </Form.Group>
        {!isPendingUpdate && (
          <Button variant="primary" type="submit">
            Update employee
          </Button>
        )}
        {isPendingUpdate && (
          <button>
            <LoadingSpin />
          </button>
        )}
      </Form>
    </Card>
  );
}

export default UpdateEmployee;
