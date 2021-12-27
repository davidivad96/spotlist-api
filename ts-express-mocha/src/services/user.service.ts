import { User } from '../db/models/user.model';
import { listRepository, userRepository } from '../repositories';

class UserService {
  public static async findAll(): Promise<User[]> {
    return await userRepository.findAll({ include: [listRepository] });
  }

  public static async findByPk(userId: string): Promise<User> {
    return await userRepository.findByPk(userId);
  }

  public static async findOne(name: string): Promise<User> {
    return await userRepository.findOne({ where: { name }, include: [listRepository] });
  }

  public static async create(name: string, password: string): Promise<User> {
    return await userRepository.create({ name, password });
  }
}

export default UserService;
