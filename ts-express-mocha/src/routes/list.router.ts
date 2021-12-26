import { Router } from 'express';
import { getLists, getList, createList } from '../controllers/list.controller';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';

const listRouter = Router()
  .get('/users/:userId/lists', tryCatchWrapper(getLists))
  .get('/users/:userId/lists/:listId', tryCatchWrapper(getList))
  .post('/users/:userId/lists', tryCatchWrapper(createList));

export default listRouter;
