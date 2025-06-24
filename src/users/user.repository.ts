//imports

import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
    
    async createUser(userData: CreateUserDto): Promise<User> {

        const user = this.create(userData);
        const password = await bcrypt.hash(userData.userPassword, 10)
        return this.save(user)

    }

  }

