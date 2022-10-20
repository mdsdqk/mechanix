import Link from "next/link";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

export default function Appointments() {
	const [appointments, setAppointments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		async function getAppointments() {
			const res = await fetch("/api/appointments");
			const data = await res.json();
			setAppointments(data);
			setIsLoading(false);
		}

		getAppointments();
	}, []);

	return (
		<div>
			<NavBar />
			<h1 className="text-2xl text-slate-600 my-8 mx-4">All bookings</h1>
			{
				isLoading ?
					<div className="my-8 mx-4"> Loading Data </div>
					:
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
						<div className="text-lg font-medium text-slate-700">No appointments, please book a service!</div>
			}

			<div className="mx-4 my-8 py-2 px-4 border w-max rounded-md cursor-pointer hover:bg-gray-600 hover:text-white">
				<Link href="/">Back to home</Link>
			</div>

		</div>
	);
}