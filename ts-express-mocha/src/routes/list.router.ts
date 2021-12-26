import { Router } from 'express';
import { validate } from 'express-validation';
import { getLists, getList, createList } from '../controllers/list.controller';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';
import { listCreateValidation } from '../utils/validation';
import isAuthorized from '../middlewares/isAuthorized';

const listRouter = Router()
  .get('/users/:userId/lists', isAuthorized, tryCatchWrapper(getLists))
  .get('/users/:userId/lists/:listId', isAuthorized, tryCatchWrapper(getList))
  .post('/users/:userId/lists', isAuthorized, validate(listCreateValidation), tryCatchWrapper(createList));

export default listRouter;
