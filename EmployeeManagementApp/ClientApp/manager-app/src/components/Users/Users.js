import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Table, Card, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import LoadingSpin from "react-loading-spin";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Users = () => {
  const { auth } = useAuth();
  let navigate = useNavigate();
  const [users, error, loading, axiosFetch] = useAxiosFunction();

  //cosmetic
  const [isPendingDelete, setIsPendingDelete] = useState(false);

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
    setIsPendingDelete(true);
    axiosFetch({
      axiosInstance: axios,
      method: "DELETE",
      url: `/api/users/${id}`,
    });
    setTimeout(() => {
      getData();
    }, 500);
    setTimeout(() => {
      setIsPendingDelete(false);
    }, 500);
  };

  const navToUpdate = (id, user) => {
    navigate(`/users/${id}`, { state: user });
  };

  return (
    <Container>
    <Card>
      <div className="table-responsive" style={{ maxWidth: "100%" }}>
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && users && (
          <>
            <Table borderless>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>
                    {auth?.role === "Admin" && (
                      <>
                        <Button className="button plus"
                          onClick={() => {
                            navigate("/users/add");
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users !== true && users?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.userName}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td>
                      {auth?.role === "Admin" &&
                        (!isPendingDelete ? (
                          <>
                            <Button className='button'
                              onClick={() => {
                                navToUpdate(user.id, user);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button className='button'
                              onClick={() => {
                                handleDelete(user.id);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <div className="d-flex justify-content-center">
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            </div>
                          </>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </Card>
    </Container>
  );
};

export default Users;
