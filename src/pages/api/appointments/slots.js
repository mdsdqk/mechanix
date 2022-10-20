import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getSlots(req, res);

		default:
			return res.status(405).json({ message: 'Method not allowed', success: false });
	}
}

async function getSlots(req, res) {
	const params = req.query;

	try {
		if (Object.entries(params).length) {
			const date = new Date(params.date + "T00:00");
			let nextDate = new Date(date);
			nextDate = new Date(nextDate.setDate(date.getDate() + 1));

			let bookedSlots = await prisma.appointment.findMany({
				where: {
					serviceOpId: params.serviceOpId,
					time: {
						gte: date,
						lt: nextDate
					},
					status: "Active"
				},
				select: {
					time: true
				}
			});

			bookedSlots = bookedSlots.map(x => x.time.getHours());

			const slots = new Array(24).fill(0).map((_, index) => {
				const slot = index.toString().padStart(2, '0') + ":00";
				return bookedSlots.includes(index)
					? { slot: slot, booked: true }
					: { slot: slot, booked: false };
			});

			return res.status(200).json(slots, { success: true });
		}

		return res.status(400).json({ error: "Please provide valid parameters", success: false });

	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error retrieving Service Operators", success: false });
	}
}