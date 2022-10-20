import { useState, useEffect } from "react";

export default function Appointments() {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {

		async function getAppointments() {
			const res = await fetch("/api/appointments");
			const data = await res.json();
			setAppointments(data);
		}

		getAppointments();
	}, []);

	return (
		<div>
			<h1 className="text-2xl text-slate-600 m-8 ">All bookings</h1>
			{
				appointments.length ?
					<table className="table-auto w-full text-sm text-left text-gray-600 m-4 p-2">
						<thead>
							<tr>
								<th>Appointment ID</th>
								<th>Service Operator ID</th>
								<th>Time</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{
								appointments.map((appointment) => {
									return (
										<tr key={appointment.id} >
											<td>{appointment.id}</td>
											<td>{appointment.serviceOpId}</td>
											<td>{new Date(appointment.time).toLocaleString()}</td>
											<td>{appointment.status}</td>
										</tr>
									);
								})
							}
						</tbody>
					</table>
					:
					<div> Loading Data </div>
			}

		</div>
	);
}