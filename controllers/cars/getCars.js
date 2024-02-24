/** @format */

import { Cars } from '../../models/index.js';

export const getCars = async ({ query }, res) => {
	const { page = 1, perPage = 12, make = '', price = '', from = '', to = '' } = query;
	const params = [];
	if (make !== '') {
		params.push({ make: { $eq: make } });
	}

	if (price !== '') {
		params.push({ rentalPriceNumeric: { $gte: parseFloat(price) } });
	}

	if (from !== '' || to !== '') {
		if (from !== '') {
			params.push({ mileage: { $gte: parseFloat(from) } });
		}

		if (to !== '') {
			params.push({ mileage: { $lte: parseFloat(to) } });
		}
	}

	const data = await Cars.aggregate([
		{
			$addFields: {
				rentalPriceNumeric: { $toDouble: { $substr: ['$rentalPrice', 1, -1] } },
			},
		},
		{
			$match: {
				$and: params,
			},
		},
		{
			$facet: {
				totalCars: [{ $count: 'total' }],
				data: [{ $skip: (page - 1) * perPage }, { $limit: perPage }],
			},
		},
	]);

	const totalCars = data[0].totalCars[0].total;
	const cars = data[0].data;

	res.json({ totalCars, data: cars });
};
