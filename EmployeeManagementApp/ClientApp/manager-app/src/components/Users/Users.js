import axios from "../../apis/axiosInstance";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { useState, useEffect } from "react";
import React from "react";
import { Button, Table, Card } from "react-bootstrap";
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
    <Card body>
      <div style={{ maxWidth: "100%" }}>
        {loading && (
          <h1>
            <LoadingSpin />
          </h1>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && users && (
          <>
            <Table striped="columns">
              <thead>
                <tr>
                  <th>
                    {auth?.role === "Admin" && (
                      <>
                        <Button
                          onClick={() => {
                            navigate("/users/add");
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </Button>
                      </>
                    )}
                  </th>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>#</td>
                    <td>{user.userName}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.role}</td>
                    <td>
                      {auth?.role === "Admin" &&
                        (!isPendingDelete ? (
                          <>
                            <Button
                              onClick={() => {
                                navToUpdate(user.id, user);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                              onClick={() => {
                                handleDelete(user.id);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <LoadingSpin
                              width="6px"
                              primaryColor="yellow"
                              size="30px"
                            />
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
  );
};

export default Users;
