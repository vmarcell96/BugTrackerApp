//Packages
import React from "react";
import { useEffect } from "react";
import { Button, Table, Card, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
//Hooks
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useAuth from "../../hooks/useAuth";
//Misc
import axios from "../../apis/axiosInstance";
//Css
import './users.css'

const Users = () => {
  const { auth } = useAuth();
  let navigate = useNavigate();
  const [data, setData, error, loading, axiosFetch] = useAxiosFunction();

  const getData = () => {
    axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/api/users",
    });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const handleDelete = (id) => {
    const filteredData = data.filter(e => e.id !== id);
    axiosFetch({
      axiosInstance: axios,
      method: 'DELETE',
      url: `/api/users/${id}`,
    })
    setData(filteredData);
  };

  const navToUpdate = (id, user) => {
    navigate(`/users/${id}`, { state: user });
  };

  return (
    <Container>
      <Row>
        <Col className="p-2">
          <Card>
            <Card.Title className='page-title'><h2>Users</h2></Card.Title>
            <Card.Body>
              {/* Loading Spin */}
              {loading && (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {/* Loading Spin */}
              {/* Error */}
              {!loading && error && <p style={{ color: "red" }}>{error}</p>}
              {/* Error */}
              {/* Table */}
              {!loading && !error && data && (
                <>
                  <Table responsive hover className="table">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>
                          {/* Admin privilige - Add user button */}
                          {auth?.role === "Admin" && <>
                            <Button className='plus button' onClick={() => { navigate("/users/add") }}>
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </>}
                          {/* Admin privilige - Add user button */}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* User Data */}
                      {data && data.map((user) => (
                        <tr key={user.id}>
                          <td><Link to={`/profile/${user.id}`}>{user.userName}</Link></td>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.role}</td>
                          <td>
                            {/* Admin privilige - Update,Delete user button */}
                            {auth?.role === "Admin" &&
                              <>
                                <Button className='button' onClick={() => { navToUpdate(user.id, user) }}>
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button className='button' onClick={() => { handleDelete(user.id) }}>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Button>
                              </>
                            }
                            {/* Admin privilige - Update,Delete user button */}
                          </td>
                        </tr>
                      ))}
                      {/* User Data */}
                    </tbody>
                  </Table>
                </>
              )}
              {/* Table */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
