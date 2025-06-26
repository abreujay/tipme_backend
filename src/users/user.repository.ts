// user.repository.ts
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './create-user.dto';

export class UserRepository extends Repository<User> {
  async createUser(userData: CreateUserDTO): Promise<User> {
    const user = this.create(userData);
    return this.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { userMail: email } });
  }
}
