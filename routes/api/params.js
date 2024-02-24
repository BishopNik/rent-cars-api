/** @format */

import { Router } from 'express';

import { getParams } from '../../controllers/params/index.js';
import { ctrlWrapper } from '../../utils/index.js';

const paramsRouter = Router();

paramsRouter.get('/', ctrlWrapper(getParams));

export default paramsRouter;
