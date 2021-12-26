import { Router } from 'express';
import { createSong } from '../controllers/song.controller';
import { tryCatchWrapper } from '../utils/tryCatchWrapper';

const songRouter = Router().post('/users/:userId/lists/:listId/songs', tryCatchWrapper(createSong));

export default songRouter;
