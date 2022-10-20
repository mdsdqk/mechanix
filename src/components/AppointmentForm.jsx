import { useState, useEffect } from "react";

export default function AppointmentForm() {
	const [serviceOps, setServiceOps] = useState([]);
	const [timeslots, setTimeslots] = useState([]);
	const [form, setForm] = useState({
		serviceOp: "",
		appointmentDate: "",
		timeslot: ""
	});

	useEffect(() => {
		getServiceOps();
	}, []);

	useEffect(() => {
		async function getTimeslots() {
			const res = await fetch(`/api/appointments/slots?serviceOpId=${form.serviceOp}&date=${form.appointmentDate}`);
			const data = await res.json();
			console.log(data);
			setTimeslots(data);
		}

		if (form.appointmentDate)
			getTimeslots();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.appointmentDate]);

	async function getServiceOps() {
		const res = await fetch("/api/serviceops");
		const data = await res.json();
		setServiceOps(data);
	}



	function handleChange(evt) {
		const updatedFrom = {
			...form,
			[evt.target.id]: evt.target.value
		};

		setForm(updatedFrom);
	};

	function setDate(evt) {
		const updatedFrom = {
			...form,
			appointmentDate: evt.target.value
		};

		setForm(updatedFrom);
	}

	function onSubmit(evt) {
		evt.preventDefault();
		console.log(form);
	}

	return (
		<div className="max-w-md mx-auto m-2 p-2 border border-gray-100 rounded-sm shadow-2xl bg-white">
			<h2 className="m-2 md:m-4 text-center font-medium text-xl md:text-2xl text-slate-700">Book a service</h2>
			<form className="m-2" onSubmit={onSubmit}>
				<div className="mb-6">
					<label htmlFor="serviceOp" className="block mb-2 text-sm font-medium text-gray-900">Service Operator</label>
					<select name="serviceOp" id="serviceOp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
						onChange={handleChange}
					>
						<option value="" className="p-2">Choose a Service Operator</option>
						{
							serviceOps.map((serviceOp) => {
								return <option key={serviceOp.id} value={serviceOp.id} className="p-2">{serviceOp.name}</option>;
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
						<input type="date" id="appointmentDate" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-2.5"
							placeholder="Select date" onChange={setDate} min={new Date().toISOString().split("T")[0]}
						/>
					</div>
				</div>
				<div className="mb-6">
					<label htmlFor="timeslot" className="block mb-2 text-sm font-medium text-gray-900">Time Slot</label>
					<select name="timeslot" id="timeslot" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
						<option value="" className="p-2">Choose a Timeslot</option>
						{
							timeslots.map((timeslot) => {
								if (timeslot.booked)
									return (
										<option disabled key={timeslot.slot} value={timeslot} className="p-2 flex justify-between">
											<p>{`${timeslot.slot.toString().padStart(2, '0')}:00`}</p>
											<p> (Booked)</p>
										</option>
									);

								else
									return <option key={timeslot.slot} value={timeslot} className="p-2">{`${timeslot.slot.toString().padStart(2, '0')}:00`}</option>;
							})
						}
					</select>
				</div>
				<button type="submit" className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Book Appointment</button>
			</form>
		</div>
	);
}