import Link from "next/link";

export default function Confirmation({ id, date, time, refresh }) {
	return (
		<div className="text-center p-2">
			<div className="mt-1 mb-4">
				<p className="text-lg font-medium text-slate-600 m-2">Your appointment is confirmed for <span className="inline-block">{date} {time}</span></p>
				<p className="text-xs text-slate-500">Appointment ID: {id}</p>
			</div>
			<div className="flex flex-col">
				<button onClick={refresh} className="text-sm font-medium text-slate-500 underline hover:text-slate-700 my-2">Book another service</button>
				<p className="text-xs font-medium text-slate-400">(or)</p>
				<div className="text-sm font-medium text-slate-500 underline hover:text-slate-700 my-2">
					<Link href="/appointments">View all bookings</Link>
				</div>
			</div>
		</div>
	);
}