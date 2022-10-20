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
	const params = req.query;

	try {
		let appointments;

		if (params.serviceOpId) {
			appointments = await prisma.appointment.findMany({
				where: {
					serviceOpId: params.serviceOpId
				}
			});
		}
		else
			appointments = await prisma.appointment.findMany();

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
		if (!body.serviceOpId) {
			const availableServiceOps = await prisma.$queryRaw`SELECT s.id from ServiceOp as s where s.id NOT IN (
				SELECT a.serviceOpId from ServiceOp as s right join Appointment as a on a.id = s.id
				where a.time = ${new Date(body.time)}
			) limit 1`;

			//console.log(availableServiceOps);

			if (!availableServiceOps.length)
				return res.status(400).json({ error: "No service operators available", success: false });

			body.serviceOpId = availableServiceOps[0].id;
		}

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
				time: new Date(body.time),
				status: body.status
			}
		});

		return res.status(200).json(updatedAppointment, { success: true });
	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error updating Service Operator", success: false });
	}
}