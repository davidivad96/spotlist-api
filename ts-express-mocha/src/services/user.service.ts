import User from '../db/models/user.model';

const getAllUsers = async (limit?: number, offset = 0): Promise<User[]> => User.findAll({ limit, offset });

export { getAllUsers };
