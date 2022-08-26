import axios from '../apis/axiosInstance';
import useAxiosFunction from '../hooks/useAxiosFunction';
import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Table, Card } from 'react-bootstrap';

const Employees = () => {
    const [employees, error, loading, axiosFetch] = useAxiosFunction();

    const getData = () => {
        axiosFetch({
            axiosInstance: axios,
            method: 'GET',
            url: '/api/employees'
        });
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    },[])


    const handleSubmit = () => {
        axiosFetch({
            axiosInstance: axios,
            method: 'POST',
            url: '/api/employees',
            requestConfig: {
                "FirstName": "Sándor",
                "LastName": "Petőfi",
                "HiringDate": "2022-08-25T10:45:38.749Z"
            }
        })
        setTimeout(()=>{getData()}, 500);
    }

  return (
    <article>
      <h2>Employee List</h2><br />
      {loading && <p>Loading...</p>}
      {!loading && error && <p className="errMsg">{error}</p>}
      {!loading && !error && employees?.length && (
        <>
          <Table striped="columns">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Hiring Date</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.hiringDate}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button onClick={()=>{getData()}}>Refetch</Button>
          <Button onClick={()=>{handleSubmit()}}>Submit</Button>
        </>
      )}
      {!loading && !error && !employees && <p>"No employees to display"</p>}
    </article>
  )
}

export default Employees