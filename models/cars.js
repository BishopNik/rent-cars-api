/** @format */

import { Schema, model } from 'mongoose';

const carsSchema = new Schema(
	{
		id: {
			type: Number,
		},
		year: {
			type: Number,
		},
		make: {
			type: String,
		},
		model: {
			type: String,
		},
		type: {
			type: String,
		},
		img: {
			type: String,
		},
		description: {
			type: String,
		},
		fuelConsumption: {
			type: String,
		},
		engineSize: {
			type: String,
		},
		accessories: [
			{
				type: String,
			},
		],
		functionalities: [
			{
				type: String,
			},
		],
		rentalPrice: {
			type: String,
		},
		rentalCompany: {
			type: String,
		},
		address: {
			type: String,
		},
		rentalConditions: {
			type: String,
		},
		mileage: {
			type: Number,
		},
	},
	{ versionKey: false }
);

export const Cars = model('car', carsSchema);
