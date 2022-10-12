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
import useDateFormat from '../../hooks/useDateFormat';

const Employees = () => {
	const { auth } = useAuth();
	const dateFormat = useDateFormat();
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
	}, [])

	const handleDelete = (id) => {
		setIsPendingDelete(true);
		axiosFetch({
			axiosInstance: axios,
			method: 'DELETE',
			url: `/api/employees/${id}`,
		})
		setTimeout(() => { getData() }, 1000);
		setTimeout(() => { setIsPendingDelete(false) }, 1000);
	}

	const navToUpdate = (id, employee) => {
		navigate(`/employees/${id}`, { state: employee })
	}

	return (
		<Card>
			<div className="table-responsive" style={{ maxWidth: '100%' }}>
				{loading &&
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>}
				{error && <p style={{ color: "red" }}>{error}</p>}
				{!loading && !error && employees &&
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
								{employees !== true && employees.map((employee) =>
									<tr key={employee.id}>
										<td>{employee.firstName}</td>
										<td>{employee.lastName}</td>
										<td>{dateFormat(employee.hiringDate)}</td>


										<td>
											{auth?.role === "Admin" &&
												(!isPendingDelete ?
													<>
														<Button className='button' onClick={() => { navToUpdate(employee.id, employee) }}>
															<FontAwesomeIcon icon={faEdit} />
														</Button>
														<Button className='button' onClick={() => { handleDelete(employee.id) }}>
															<FontAwesomeIcon icon={faTrash} />
														</Button>
													</>
													:
													<><div className="d-flex justify-content-center">
														<div className="spinner-border" role="status">
															<span className="sr-only">Loading...</span>
														</div>
													</div></>)}
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