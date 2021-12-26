import { Router } from 'express';
import { addSongToList } from '../controllers/song.controller';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';
import isAuthorized from '../middlewares/isAuthorized';

const songRouter = Router().post('/users/:userId/lists/:listId/songs', isAuthorized, tryCatchWrapper(addSongToList));

export default songRouter;
