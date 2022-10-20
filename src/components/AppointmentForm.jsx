import { useState, useEffect } from "react";

export default function AppointmentForm() {
	const [serviceOps, setServiceOps] = useState(["SOP1", "SOP2", "SOP3"]);
	const [timeslots, setTimeslots] = useState(["00:00", "01:00", "02:00", "03:00", "04:00", "05:00"]);
	const bookedslots = ["02:00"];

	useEffect(() => {
		//setServiceOps

	}, []);

	return (
		<div className="max-w-md mx-auto m-2 p-2 border border-gray-100 rounded-sm shadow-2xl bg-white">
			<h2 className="m-2 md:m-4 text-center font-medium text-xl md:text-2xl text-slate-700">Book a service</h2>
			<form className="m-2">
				<div className="mb-6">
					<label htmlFor="serviceOps" className="block mb-2 text-sm font-medium text-gray-900">Service Operator</label>
					<select name="serviceOps" id="serviceOps" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
						<option value="" className="p-2">Choose a Service Operator</option>
						{
							serviceOps.map((serviceOp) => {
								return <option key={serviceOp} value={serviceOp} className="p-2">{serviceOp}</option>;
							})
						}
					</select>
				</div>
				<div className="mb-6">
					<label htmlFor="appointmentDate" className="block mb-2 text-sm font-medium text-gray-900">Appointment Date</label>
					<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd">
								</path>
							</svg>
						</div>
						<input type="date" id="appointmentDate" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-2.5" placeholder="Select date" />
					</div>
				</div>
				<div className="mb-6">
					<label htmlFor="timeslots" className="block mb-2 text-sm font-medium text-gray-900">Time Slot</label>
					<select name="timeslots" id="timeslots" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
						<option value="" className="p-2">Choose a Timeslot</option>
						{
							timeslots.map((timeslot) => {
								if (!bookedslots.includes(timeslot))
									return <option key={timeslot} value={timeslot} className="p-2">{timeslot}</option>;
							})
						}
					</select>
				</div>
				<button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Book Appointment</button>
			</form>
		</div>
	);
}