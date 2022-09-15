import axios from '../../apis/axiosInstance';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useState, useEffect } from 'react';
import React from 'react'
import { Button, Table, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import LoadingSpin from "react-loading-spin";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

const Employees = () => {
  const { auth } = useAuth();
  let navigate = useNavigate();
  const [employees, error, loading, axiosFetch] = useAxiosFunction();


  //cosmetic
  const [isPendingDelete, setIsPendingDelete] = useState(false);

  const getData = () => {
      axiosFetch({
          axiosInstance: axios,
          method: 'GET',
          url: '/api/employees',
      });
  }

  useEffect(() => {
      getData();
      // eslint-disable-next-line
  },[])

  const handleDelete = (id) => {
    setIsPendingDelete(true);
    axiosFetch({
        axiosInstance: axios,
        method: 'DELETE',
        url: `/api/employees/${id}`,
    })
    setTimeout(() => { getData() }, 500);
    setTimeout(() => { setIsPendingDelete(false) }, 500);
  }

  const navToUpdate = (id, employee) => {
    navigate(`/employees/${id}`, {state: employee})
  }

  return (
    <Card body>
			<div style={{ maxWidth: '100%' }}>
				{loading && <h1><LoadingSpin /></h1>}
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!loading && !error && employees &&
					<>
						<Table striped="columns">
							<thead>
								<tr>
									<th>
											{ auth?.role === "Admin" && <>
												<Button onClick={() => { navigate("/employees/add") }}>
													<FontAwesomeIcon icon={faPlus} />
												</Button>
											</>}
									</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Hiring Date</th>
								</tr>
							</thead>
							<tbody>
								{employees !== true && employees.map((employee) =>
									<tr key={employee.id}>
										<td>#</td>
										<td>{employee.firstName}</td>
										<td>{employee.lastName}</td>
										<td>{employee.hiringDate}</td>


										<td>
											{ auth?.role === "Admin" &&
												(!isPendingDelete ?
												<>
													<Button onClick={() => { navToUpdate(employee.id, employee) }}>
														<FontAwesomeIcon icon={faEdit} />
													</Button>
													<Button onClick={() => { handleDelete(employee.id) }}>
														<FontAwesomeIcon icon={faTrash} />
													</Button>
												</>
												:
												<><LoadingSpin
													width="6px"
													primaryColor="yellow"
													size="30px"
												/></>)}
										</td>
									</tr>
								)}
							</tbody>
						</Table>
					</>
				}
			</div>
		</Card>
  )
}

export default Employees