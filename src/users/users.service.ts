import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    const saltRounds: number = 10;
    const salt: string = bcrypt.genSaltSync(saltRounds);
    const hashPassword: string = bcrypt.hashSync(password, salt);
    const user = this.usersRepo.create({ email, password: hashPassword, name });
    return this.usersRepo.save(user);
  }
}
