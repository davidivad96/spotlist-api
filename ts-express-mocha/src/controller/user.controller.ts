import { RequestHandler, Response } from 'express';
import { getPaginationParams } from '../utils';
import { getAllUsers } from '../services/user.service';

const getUsers: RequestHandler = async (req, res): Promise<Response> => {
  const { limit: queryLimit, offset: queryOffset } = req.query;
  const limit = queryLimit ? Number(queryLimit) : undefined;
  const offset = queryOffset ? Number(queryOffset) : 0;
  const data = await getAllUsers(limit, offset);
  return res.status(200).json({
    data,
    ...getPaginationParams(data.length, offset, limit),
  });
};

export { getUsers };
