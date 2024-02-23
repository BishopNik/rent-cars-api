/** @format */

import { Router } from 'express';

import { getCars } from '../../controllers/cars/index.js';
import { ctrlWrapper } from '../../utils/index.js';

const carsRouter = Router();

carsRouter.get('/', ctrlWrapper(getCars));

export default carsRouter;
