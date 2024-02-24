/** @format */

import { Cars } from '../../models/index.js';

export const getParams = async (_, res) => {
	const allCars = await Cars.find({});
	const price = new Set();
	const make = new Set();

	allCars.forEach(car => {
		const priceNum = parseFloat(car.rentalPrice.replace('$', ''));
		if (priceNum) price.add(priceNum);
		if (car.make) make.add(car.make);
	});

	const priceArray = Array.from(price);
	const minPrice = Math.min(...priceArray);
	const maxPrice = Math.max(...priceArray);

	const start = Math.floor(minPrice / 10);
	const finish = Math.floor(maxPrice / 10) + 1;
	const makes = Array.from(make).sort((a, b) => a.localeCompare(b));

	res.json({
		makes,
		price: {
			start,
			finish,
		},
	});
};
