//Packages
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useEffect } from 'react';
import React from 'react'
import { Button, Table, Card, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
//Misc
import axios from '../../apis/axiosInstance';
//Hooks
import useAuth from '../../hooks/useAuth';
import useDateFormat from '../../hooks/useDateFormat';
//Css
import './employees.css'

const Employees = () => {
  const { auth } = useAuth();
  const dateFormat = useDateFormat();
  let navigate = useNavigate();
  const [data, setData, error, loading, axiosFetch] = useAxiosFunction();

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axios,
      method: 'GET',
      url: '/api/employees',
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [])

  const handleDelete = async (id) => {
    const filteredData = data.filter(e => e.id !== id);
    await axiosFetch({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/employees/${id}`,
    })
    setData(filteredData);
  }

  const navToUpdate = (id, employee) => {
    navigate(`/employees/${id}`, { state: employee })
  }

  return (
    <>
      <Container>
        <Card>
          <Card.Title className='page-title'><h2>Employees</h2></Card.Title>
          <Card.Body>
            <div className="table-responsive" style={{ maxWidth: '100%' }}>
              {loading &&
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>}
              {!loading && error && <p style={{ color: "red" }}>{error}</p>}
              {!loading && !error && data &&
                <>
                  <Table borderless>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Hiring Date</th>
                        <th>
                          {auth?.role === "Admin" && <>
                            <Button className='button plus' onClick={() => { navigate("/employees/add") }}>
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </>}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {data && data.map((employee) =>
                        <tr key={employee.id}>
                          <td>{employee.firstName}</td>
                          <td>{employee.lastName}</td>
                          <td>{dateFormat(employee.hiringDate)}</td>


                          <td>
                            {auth?.role === "Admin" &&
                              <>
                                <Button className='button' onClick={() => { navToUpdate(employee.id, employee) }}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button className='button' onClick={() => { handleDelete(employee.id) }}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </>
                            }
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </>
              }
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default Employees