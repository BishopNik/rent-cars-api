/** @format */

import { Cars } from '../../models/index.js';

export const getCars = async ({ query }, res) => {
	const { page = 1, perPage = 12 } = query;
	const skip = (page - 1) * perPage;

	const totalCars = await Cars.countDocuments({});

	const data = await Cars.find({}, null, {
		skip,
		limit: perPage,
	});

	res.json({ countCars: totalCars, data });
};
