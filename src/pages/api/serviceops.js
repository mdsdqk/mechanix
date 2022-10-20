import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
	switch (req.method) {
		case 'GET':
			return getServiceOps(req, res);

		case 'POST':
			return await addServiceOp(req, res);

		case 'PUT':
			return await updateServiceOp(req, res);

		default:
			return res.status(405).json({ message: 'Method not allowed', success: false });
	}
}

async function getServiceOps(req, res) {
	try {
		const serviceOps = await prisma.serviceOp.findMany();

		return res.status(200).json(serviceOps, { success: true });
	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error retrieving Service Operators", success: false });
	}
}

async function addServiceOp(req, res) {
	const body = req.body;
	try {
		const newServiceOp = await prisma.serviceOp.create({
			data: {
				name: body.name,
				location: body.location
			}
		});

		return res.status(201).json(newServiceOp, { success: true });
	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error creating Service Operator", success: false });
	}
}

async function updateServiceOp(req, res) {
	const body = req.body;
	try {
		const updatedServiceOp = await prisma.serviceOp.update({
			where: {
				id: body.id
			},
			data: {
				name: body.name,
				location: body.location
			}
		});

		return res.status(201).json(updatedServiceOp, { success: true });
	}

	catch (err) {
		console.error("Request error", err);
		return res.status(500).json({ error: "Error updating Service Operator", success: false });
	}
}