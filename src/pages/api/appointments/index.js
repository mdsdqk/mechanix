import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getAppointments(req, res);

		case 'POST':
			return await createAppointment(req, res);

		case 'PUT':
			return await updateAppointment(req, res);

		default:
			return res.status(405).json({ message: 'Method not allowed', success: false });
	}
}

async function getAppointments(req, res) {
	try {
		const appointments = await prisma.appointment.findMany();
		return res.status(200).json(appointments, { success: true });
	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error retrieving Appointments", success: false });
	}
}

async function createAppointment(req, res) {
	const body = req.body;
	console.log(body);
	try {
		const newAppointment = await prisma.appointment.create({
			data: {
				//TODO: Add (backend) validation to time
				serviceOpId: body.serviceOpId,
				time: new Date(body.time),
				status: body.status || "Active"
			}
		});

		return res.status(201).json(newAppointment, { success: true });
	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error creating appointment", success: false });
	}
}

async function updateAppointment(req, res) {
	const body = req.body;
	try {
		const updatedAppointment = await prisma.appointment.update({
			where: {
				id: body.id
			},
			data: {
				//TODO: Add (backend) validation to time and service operator change
				serviceOpId: body.serviceOpId,
				time: body.time,
				status: body.status
			}
		});

		return res.status(200).json(updatedAppointment, { success: true });
	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error updating the appointment", success: false });
	}
}