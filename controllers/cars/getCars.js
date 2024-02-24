/** @format */

import { Cars } from '../../models/index.js';

export const getCars = async ({ query }, res) => {
	const { page = 1, perPage = 12, make = '', price = '', from = '', to = '' } = query;
	const params = [];
	if (make !== '') {
		params.push({ make: { $eq: make } });
	}

	if (price !== '') {
		params.push({ rentalPriceNumeric: { $lte: parseFloat(price) } });
	}

	if (from !== '' || to !== '') {
		if (from !== '') {
			params.push({ mileage: { $gte: parseFloat(from) } });
		}

		if (to !== '') {
			params.push({ mileage: { $lte: parseFloat(to) } });
		}
	}

	const queryLine = [
		{
			$addFields: {
				rentalPriceNumeric: { $toDouble: { $substr: ['$rentalPrice', 1, -1] } },
			},
		},
	];

	if (params.length > 0) {
		queryLine.push({
			$match: {
				$and: params,
			},
		});
	}

	queryLine.push({
		$facet: {
			totalCars: [{ $count: 'total' }],
			data: [{ $skip: (page - 1) * perPage }, { $limit: perPage }],
		},
	});

	const data = await Cars.aggregate(queryLine);

	const totalCars = data[0]?.totalCars[0]?.total || 0;
	const cars = data[0]?.data || [];

	res.json({ totalCars, data: cars });
};
