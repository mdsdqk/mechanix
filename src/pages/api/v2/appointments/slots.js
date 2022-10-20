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
			let slotMap = {
				"0": 0
			};

			let prevHr = 0;

			new Array(24).fill(0).forEach((_, index) => {
				if (bookedSlots.includes(index)) {
					slotMap[index] = -1;
					prevHr = index + 1;
					if (prevHr < 24) slotMap[prevHr] = index + 1;
				}

				else {
					slotMap[prevHr]++;
				}

				//console.log(index, slotMap);
			});

			//console.log(bookedSlots, slotMap);

			const slots = Object.entries(slotMap).filter(slot => slot[1] != -1).map((slot) => `${slot[0]} - ${slot[1]}`);

			return res.status(200).json(slots, { success: true });
		}

		return res.status(400).json({ error: "Please provide valid parameters", success: false });

	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error retrieving Service Operators", success: false });
	}
}