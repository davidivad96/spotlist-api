import { Router } from 'express';
import { createSong } from '../controllers/song.controller';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';
import isAuthorized from '../middlewares/isAuthorized';

const songRouter = Router().post('/users/:userId/lists/:listId/songs', isAuthorized, tryCatchWrapper(createSong));

export default songRouter;
