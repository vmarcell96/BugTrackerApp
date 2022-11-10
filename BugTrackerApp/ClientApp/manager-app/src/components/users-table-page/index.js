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
import DeleteUserModal from "./DeleteUserModal";
import AddUserModal from "./AddUserModal";
import UpdateUserModal from "./UpdateUserModal";
import { useRef } from "react";

const Users = () => {
  //hooks
  const { auth } = useAuth();
  let navigate = useNavigate();
  const { response: users, setResponse: setUsers, error, loading, axiosFetch} = useAxiosFunction();
  //Using imperative handle to set modal component's show state
  const deleteModalRef = useRef(null);
  const updateModalRef = useRef(null);
  const addModalRef = useRef(null);

  const getData = async () => {
    await axiosFetch({
      axiosInstance: axios,
      method: "GET",
      url: "/api/users",
    });

  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col className="p-2">
            <Card>
              <Card.Header><Card.Title className='page-title'><h2>Users</h2></Card.Title></Card.Header>
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
                {!loading && !error && users && (
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
                              <Button className='plus button' onClick={() => { addModalRef.current.alterShow(); }}>
                                <FontAwesomeIcon icon={faPlus} />
                              </Button>
                            </>}
                            {/* Admin privilige - Add user button */}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* User Data */}
                        {users && users.map((user) => (
                          <tr key={user.id}>
                            <td><Link to={`/profile/${user.id}`}>{user.userName}</Link></td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.role}</td>
                            <td>
                              {/* Admin privilige - Update,Delete user button */}
                              {auth?.role === "Admin" &&
                                <>
                                  {/* Edit Button */}
                                  <Button className='button' onClick={() => {
                                    updateModalRef.current.alterShow();
                                    updateModalRef.current.alterUserToUpdate(user);
                                  }}>
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Button>
                                  {/* Delete Button */}
                                  <Button className='button' onClick={() => {
                                      deleteModalRef.current.alterShow();
                                      deleteModalRef.current.alterUserId(user.id);
                                    }}>

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
      <DeleteUserModal
        users={users}
        setUsers={setUsers}
        ref={deleteModalRef}
      />
      <AddUserModal
        users={users}
        setUsers={setUsers}
        ref={addModalRef}
      />
      <UpdateUserModal
        users={users}
        setUsers={setUsers}
        ref={updateModalRef}
      />
    </>
  );
};

export default Users;
